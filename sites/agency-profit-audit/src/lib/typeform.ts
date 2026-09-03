// The application form: its id, the origins its popup fetches from, and the
// warm-up that lets the popup open quickly on a cold mobile connection.
//
// Background (measured 2026-09-02): the embed SDK ships inside the page
// bundle, but everything the form itself needs is fetched only when the popup
// opens — the form document from form.typeform.com, ~600 KB of renderer
// JavaScript from renderer-assets.typeform.com and the Inter font files from
// font.typeform.com. Cold, on a Slow 4G profile, that chain takes 7–9 s from
// tap to visible form. The renderer JS is cached for 28 days and the fonts for
// 5, so fetching them ahead of the tap is what makes the popup fast.

export const TYPEFORM_ID = "FNnck2Hf";

export const TYPEFORM_ORIGINS = {
  form: "https://form.typeform.com",
  assets: "https://renderer-assets.typeform.com",
  fonts: "https://font.typeform.com",
} as const;

declare global {
  interface Window {
    // Set by cta-prehydrate-script.tsx: the CTA that was tapped before React
    // hydrated, so the hydrated button can open the form for that tap.
    __skTfPendingClick?: Element | null;
  }
}

/** Consumes a pre-hydration tap recorded against this button, if any. */
export function takePendingClick(button: Element): boolean {
  if (typeof window === "undefined" || window.__skTfPendingClick !== button) {
    return false;
  }
  window.__skTfPendingClick = null;
  return true;
}

// ---------------------------------------------------------------------------
// Warm-up
//
// Loads the form once in a hidden iframe so its renderer, chunks and fonts are
// in the HTTP cache before the visitor taps. The iframe is a sibling of the
// real popup's iframe (same top-level site, same frame site), which matters:
// Chromium partitions the HTTP cache by both, so a prefetch issued from the
// page itself would land in a partition the popup never reads.
//
// The warm-up URL carries disable-tracking and enable-sandbox. Verified on
// 2026-09-02 against the live form: with them the renderer loads every asset
// the real popup loads but sends no view event
// (POST /forms/<id>/insights/performance/view-form-open) and no telemetry
// (tracking.typeform.com, rudderlabs) — so Typeform's view/start/completion
// numbers only ever count real opens. The form has no pixel integration of its
// own, and nothing here touches the Meta pixel or the CAPI route.
//
// It never runs before the window load event, so it cannot delay first paint,
// DOMContentLoaded or load. After load it starts on whichever comes first:
//
// - a sign of intent — the first scroll, touch, pointer or key, or a CTA
//   scrolling into view — which starts it at once, ahead of the video gate
//   below: someone moving towards the button is about to press it;
// - the page going idle, which starts it once the hero video has released its
//   gate (holdTypeformWarmup): the video gets the connection to itself for its
//   first bytes, but only until its first frame paints or it is refused, never
//   for a fixed span of playback. Starting late is worse than running slowly —
//   a late warm-up is simply not there when the tap comes.

type WarmupState = "unarmed" | "armed" | "waiting" | "started" | "skipped";

let state: WarmupState = "unarmed";
let observer: IntersectionObserver | null = null;
const disarmers: Array<() => void> = [];

// The idle trigger yields to the hero video: hero-video.tsx holds the warm-up
// until the video's first frame has painted (or autoplay was refused, or a
// short timeout passes). Intent triggers ignore the gate. The gate is read at
// fire time so it works whichever component mounts first.
let warmupGate: Promise<void> = Promise.resolve();

/** Delays the idle-triggered start of the warm-up until `until` resolves. */
export function holdTypeformWarmup(until: Promise<void>) {
  warmupGate = until;
}

// Scrolling by less than this is jitter, not intent.
const INTENT_SCROLL_PX = 40;

function whenLoaded(fn: () => void) {
  if (document.readyState === "complete") fn();
  else window.addEventListener("load", fn, { once: true });
}

function onIdle(fn: () => void, timeout: number) {
  // requestIdleCallback is missing on iOS before 16.4 (the in-app browsers
  // Meta ships use the system WebKit), so fall back to a short timer.
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(() => fn(), { timeout });
  } else {
    window.setTimeout(fn, Math.min(timeout, 1500));
  }
}

function disarm() {
  disarmers.splice(0).forEach((fn) => fn());
}

/**
 * Arms the warm-up for a CTA. Safe to call once per button: the first call
 * installs the triggers, later calls only add the button to the viewport
 * trigger. Nothing happens on the server.
 */
export function armTypeformWarmup(cta: Element) {
  if (typeof window === "undefined") return;
  if (state === "armed") {
    observer?.observe(cta);
    return;
  }
  if (state !== "unarmed") return;
  state = "armed";

  // Honour Data Saver: the button's loading state still covers a cold open.
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  if (connection?.saveData) {
    state = "skipped";
    return;
  }

  const start = () => {
    if (state !== "armed" && state !== "waiting") return;
    state = "started";
    disarm();
    runWarmup();
  };
  // Intent: go now (after load), whatever the video is doing.
  const onIntent = () => whenLoaded(start);
  // Idle: go once the video has released its gate.
  const onIdle_ = () => {
    if (state !== "armed") return;
    state = "waiting";
    void warmupGate.then(() => {
      if (state === "waiting") start();
    });
  };

  // 1. Page idle after load.
  whenLoaded(() => onIdle(onIdle_, 2000));

  // 2. First sign of intent: a touch, pointer or key anywhere, a mouse moving
  //    at all (desktop links are fast enough that eager is fine), or a real
  //    scroll.
  const intentEvents = ["touchstart", "pointerdown", "keydown", "mousemove"] as const;
  for (const type of intentEvents) {
    window.addEventListener(type, onIntent, { once: true, passive: true });
  }
  const onScroll = () => {
    if (Math.abs(window.scrollY) < INTENT_SCROLL_PX) return;
    window.removeEventListener("scroll", onScroll);
    onIntent();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  disarmers.push(() => {
    for (const type of intentEvents) window.removeEventListener(type, onIntent);
    window.removeEventListener("scroll", onScroll);
  });

  // 3. A CTA scrolling into view. The first observation reports the initial
  //    state, which is not a scroll; only a later entry counts.
  if ("IntersectionObserver" in window) {
    let initial = true;
    observer = new IntersectionObserver((entries) => {
      const entered = entries.some((entry) => entry.isIntersecting);
      if (initial) {
        initial = false;
        return;
      }
      if (entered) onIntent();
    });
    observer.observe(cta);
    disarmers.push(() => {
      observer?.disconnect();
      observer = null;
    });
  }
}

const openListeners = new Set<() => void>();

/**
 * Runs `listener` every time the application popup is opened — the hero video
 * uses it to pause, so a playing stream neither talks over the form nor
 * starves its load. Returns the unsubscribe function.
 */
export function onTypeformOpen(listener: () => void): () => void {
  openListeners.add(listener);
  return () => {
    openListeners.delete(listener);
  };
}

/** The real popup has opened: its own load fills the cache, so stand down. */
export function markTypeformOpened() {
  if (state === "armed" || state === "waiting") {
    state = "skipped";
    disarm();
  }
  openListeners.forEach((listener) => listener());
}

function runWarmup() {
  // Mirrors the URL the embed SDK builds for the popup (see buildIframeSrc in
  // @typeform/embed), with tracking off and sandbox on. A distinct embed id
  // keeps the SDK's message handlers for the real popup from ever matching
  // messages from this frame.
  const embedId = String(Math.random()).split(".")[1] ?? String(Date.now());
  const params = new URLSearchParams({
    "typeform-embed-id": embedId,
    "typeform-embed": "popup-blank",
    "typeform-source": window.location.hostname,
    "typeform-medium": "embed-sdk",
    "typeform-medium-version": "next",
    "typeform-embed-handles-redirect": "1",
    "disable-tracking": "true",
    "enable-sandbox": "true",
  });

  const iframe = document.createElement("iframe");
  iframe.src = `${TYPEFORM_ORIGINS.form}/to/${TYPEFORM_ID}?${params.toString()}`;
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  iframe.loading = "eager";
  iframe.dataset.tfWarmup = "";
  iframe.style.cssText =
    "position:absolute;top:0;left:0;width:0;height:0;border:0;visibility:hidden;pointer-events:none";

  const remove = () => {
    window.removeEventListener("message", onMessage);
    iframe.remove();
  };
  const onMessage = (event: MessageEvent) => {
    const data: unknown = event.data;
    if (
      typeof data === "object" &&
      data !== null &&
      (data as { type?: unknown }).type === "form-ready" &&
      String((data as { embedId?: unknown }).embedId) === embedId
    ) {
      // The renderer asks for its question chunks and fonts just after
      // form-ready; give them a moment to land in the cache, then free the
      // frame's memory.
      window.setTimeout(remove, 4000);
    }
  };
  window.addEventListener("message", onMessage);
  window.setTimeout(remove, 60_000);

  document.body.append(iframe);
}
