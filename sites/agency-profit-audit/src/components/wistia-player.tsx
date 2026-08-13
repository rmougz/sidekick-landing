"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Same Wistia web-component embed as the landing page VSL (src/app/page.tsx).
// The :not(:defined) style shows the media's blurred swatch as a poster until
// the custom element upgrades. With `lazy`, scripts and markup are deferred
// until the player scrolls near the viewport.
export default function WistiaPlayer({
  mediaId,
  slot,
  lazy = false,
  aspect = 1.7777777777777777,
}: {
  mediaId: string;
  slot: string;
  lazy?: boolean;
  aspect?: number;
}) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(!lazy);

  useEffect(() => {
    if (!lazy || active) return;
    const el = holderRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lazy, active]);

  const padding = `${100 / aspect}%`;

  if (!mediaId) {
    // Placeholder until the media ID is dropped into src/lib/videos.ts / env
    return (
      <div
        className="relative w-full overflow-hidden rounded-md bg-sk-navy"
        style={{ paddingTop: padding }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 max-sm:h-11 max-sm:w-11">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-6 w-6 fill-white/60 max-sm:h-5 max-sm:w-5"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="px-4 text-[11px] font-bold uppercase tracking-[2px] text-sk-muted">
            {slot}
          </span>
        </div>
      </div>
    );
  }

  const swatch = `https://fast.wistia.com/embed/medias/${mediaId}/swatch`;

  return (
    <div ref={holderRef} className="w-full overflow-hidden rounded-md">
      {active ? (
        <>
          <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
          <Script
            src={`https://fast.wistia.com/embed/${mediaId}.js`}
            strategy="lazyOnload"
          />
          <div
            dangerouslySetInnerHTML={{
              __html: `
                <style>wistia-player[media-id='${mediaId}']:not(:defined){background:center/contain no-repeat url('${swatch}');display:block;filter:blur(5px);padding-top:${padding}}</style>
                <wistia-player media-id="${mediaId}" aspect="${aspect}"></wistia-player>
              `,
            }}
          />
        </>
      ) : (
        <div
          className="w-full"
          style={{
            paddingTop: padding,
            background: `center/contain no-repeat url('${swatch}')`,
            filter: "blur(5px)",
          }}
        />
      )}
    </div>
  );
}
