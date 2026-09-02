"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { preconnect } from "react-dom";
import { holdTypeformWarmup, onTypeformOpen } from "@/lib/typeform";

// The landing page VSL (SidekickVSL-v3-master, 3:19, 16:9).
//
// It autoplays muted with captions on. Click-to-play kills cold traffic: over
// the two days before this shipped Wistia recorded 28 plays from 1,259 visits
// (a 3% play rate), so 97% of visitors never heard the pitch. Autoplay is
// muted three ways over — `autoplay` + `muted` + `silent-autoplay` — so it can
// never start with sound; the pill below the picture is the way to get sound.
const MEDIA_ID = "i72bt3lrdz";
const ASPECT = 16 / 9;
const SWATCH = `https://fast.wistia.com/embed/medias/${MEDIA_ID}/swatch`;

// Player script and media delivery hosts. Preconnected from the head so the
// post-load fetches skip DNS and TLS.
const WISTIA_ORIGINS = [
  "https://fast.wistia.com",
  "https://fast.wistia.net",
  "https://embed-ssl.wistia.com",
];

// The Typeform warm-up (src/lib/typeform.ts) is held until the video has
// played this much, so the player's ~500 KB of scripts and the first segments
// get the connection to themselves (on Slow 4G that phase runs 10–14 s after
// load). It is released early if autoplay is refused, and unconditionally
// this long after the load event, so a failed player never holds it hostage.
const VIDEO_HEAD_START_SECONDS = 3;
const WARMUP_HOLD_MAX_MS = 25_000;

// Autoplay-refused detection (iOS Low Power Mode, Data Saver, a webview
// policy). The player's own state stays "beforeplay" while the first segments
// buffer, which on Slow 4G is several seconds, so that alone cannot tell
// "refused" from "loading". The underlying <video> can: a refused play() leaves
// it paused, an accepted one leaves it un-paused while it buffers. Checked
// from this long after the player is ready, with a hard cap after which the
// prompt turns into a play button regardless.
const REFUSAL_CHECK_AFTER_MS = 2_500;
const REFUSAL_CHECK_EVERY_MS = 500;
const REFUSAL_HARD_CAP_MS = 30_000;

// Highest rendition the player may pick. 720p is already more than the
// 390px-wide frame every paid visitor sees, and it stops the adaptive
// streamer from grabbing the 1080p/2160p renditions (1.8–7.3 Mbps) that would
// saturate a cellular link and starve the application popup.
const QUALITY_MAX = 720;

// The <wistia-player> element after player.js has upgraded it. Only the parts
// used here; see docs.wistia.com/docs/player-attributes-and-properties.
type PlayerElement = HTMLElement & {
  whenApiReady: () => Promise<unknown>;
  play: () => Promise<unknown> | void;
  pause: () => void;
  muted: boolean;
  volume: number;
  captionsEnabled: boolean;
  state: string;
};

type Prompt = "none" | "sound" | "play";

// The player markup, as one module-level object. React 19 re-applies
// dangerouslySetInnerHTML whenever the object identity changes, and a fresh
// object per render would wipe and re-create the player every time the prompt
// state changed — mid-playback. The :not(:defined) style shows the media's
// blurred swatch until the custom element upgrades. preload="auto" so a
// refused autoplay still starts instantly on tap; it must be set before the
// player embeds.
const PLAYER_MARKUP = {
  __html: `
    <style>wistia-player[media-id='${MEDIA_ID}']:not(:defined){background:center/contain no-repeat url('${SWATCH}');display:block;filter:blur(5px);padding-top:${100 / ASPECT}%}</style>
    <wistia-player media-id="${MEDIA_ID}" aspect="${ASPECT}" autoplay="true" muted="true" silent-autoplay="true" preload="auto" quality-max="${QUALITY_MAX}"></wistia-player>
  `,
};

export default function HeroVideo() {
  for (const origin of WISTIA_ORIGINS) preconnect(origin);

  const holderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerElement | null>(null);
  const [prompt, setPrompt] = useState<Prompt>("none");

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;
    let disposed = false;
    const timers: number[] = [];
    const cleanups: Array<() => void> = [];

    // Hold the Typeform warm-up until the video has had its head start.
    let releaseWarmup = () => {};
    holdTypeformWarmup(
      new Promise<void>((resolve) => {
        releaseWarmup = resolve;
      })
    );
    const armTimeout = () =>
      timers.push(window.setTimeout(releaseWarmup, WARMUP_HOLD_MAX_MS));
    if (document.readyState === "complete") armTimeout();
    else window.addEventListener("load", armTimeout, { once: true });

    const setup = async () => {
      const element = holder.querySelector("wistia-player");
      if (!element) return;
      // The scripts load lazily after the load event; the element upgrades in
      // place once player.js defines it.
      await customElements.whenDefined("wistia-player");
      const player = element as PlayerElement;
      await player.whenApiReady();
      if (disposed) return;
      playerRef.current = player;

      // Silent autoplay is only worth anything with captions on screen.
      player.captionsEnabled = true;

      const on = (type: string, handler: (event: Event) => void) => {
        player.addEventListener(type, handler);
        cleanups.push(() => player.removeEventListener(type, handler));
      };
      on("play", () => setPrompt(player.muted ? "sound" : "none"));
      on("pause", () => setPrompt("none"));
      on("ended", () => setPrompt("none"));
      on("mute-change", (event) => {
        const { isMuted } = (event as CustomEvent<{ isMuted: boolean }>).detail;
        if (!isMuted) setPrompt("none");
      });
      on("second-change", (event) => {
        const { second } = (event as CustomEvent<{ second: number }>).detail;
        if (second >= VIDEO_HEAD_START_SECONDS) releaseWarmup();
      });
      const readyAt = performance.now();
      const refused = () => {
        // Nothing is streaming, so the warm-up may go.
        setPrompt("play");
        releaseWarmup();
      };
      const check = () => {
        if (disposed || player.state !== "beforeplay") return;
        const elapsed = performance.now() - readyAt;
        const video = player.shadowRoot?.querySelector("video");
        if (elapsed >= REFUSAL_HARD_CAP_MS || (elapsed >= REFUSAL_CHECK_AFTER_MS && (!video || video.paused))) {
          refused();
          return;
        }
        timers.push(window.setTimeout(check, REFUSAL_CHECK_EVERY_MS));
      };
      timers.push(window.setTimeout(check, REFUSAL_CHECK_AFTER_MS));
      // The application popup covers the page: a stream behind it would talk
      // over the form once unmuted and compete with the form's own load.
      cleanups.push(
        onTypeformOpen(() => {
          if (player.state === "playing") player.pause();
        })
      );
    };
    void setup();

    return () => {
      disposed = true;
      timers.forEach((id) => window.clearTimeout(id));
      cleanups.forEach((fn) => fn());
      releaseWarmup();
    };
  }, []);

  // A tap is a user gesture, so sound is allowed from here.
  const onPrompt = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.muted = false;
    player.volume = 1;
    if (player.state !== "playing") void player.play();
    setPrompt("none");
  }, []);

  return (
    <div
      ref={holderRef}
      className="relative w-full overflow-hidden rounded-md max-sm:rounded-none"
      style={{ aspectRatio: `${ASPECT}` }}
    >
      <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
      <Script src={`https://fast.wistia.com/embed/${MEDIA_ID}.js`} strategy="lazyOnload" />
      {/* The aspect ratio on the wrapper keeps the box from resizing when the
          custom element upgrades. */}
      <div dangerouslySetInnerHTML={PLAYER_MARKUP} />
      {prompt !== "none" && (
        <button
          type="button"
          data-vsl-unmute=""
          onClick={onPrompt}
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-3 text-[14px] font-bold text-sk-navy shadow-[0_4px_20px_rgba(0,0,0,0.45)] transition-colors hover:bg-sk-pink max-sm:bottom-8 max-sm:px-4 max-sm:py-2.5 max-sm:text-[13px]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 fill-current"
            aria-hidden
          >
            {prompt === "sound" ? (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
          {prompt === "sound" ? "Tap for sound" : "Tap to play"}
        </button>
      )}
    </div>
  );
}
