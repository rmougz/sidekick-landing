// Warm-up for the booking popup on phones, ported from the profit audit app
// (sites/agency-profit-audit/src/lib/typeform.ts, where it took a cold Slow 4G
// tap-to-visible-form from 7-9 s to under 1 s).
//
// The embed SDK ships in the page bundle, but everything the form itself needs
// is fetched only when the popup opens: the form document from
// form.typeform.com, ~600 KB of renderer JavaScript from
// renderer-assets.typeform.com (cached 28 days) and the fonts from
// font.typeform.com (cached 5 days). Loading the form once in a hidden iframe
// puts those in the cache before the tap. It has to be an iframe on
// form.typeform.com, a sibling of the real popup's: Chromium partitions the HTTP
// cache by (top-level site, frame site), so a prefetch issued from the page
// itself would land in a partition the popup never reads.
//
// The warm-up URL carries disable-tracking and enable-sandbox, which load every
// asset but send no view event and no telemetry, so Typeform's view, start and
// completion numbers only count real opens.
//
// Desktop doesn't need this: the inline widget loads the form on its own.
//
// It never runs before the window load event, so it cannot delay first paint
// or load. After load it starts on whichever comes first: the page going idle,
// or a sign of intent (the first touch, pointer, key or real scroll).

type WarmupState = "unarmed" | "armed" | "started" | "skipped";

let state: WarmupState = "unarmed";
const disarmers: Array<() => void> = [];

// Scrolling by less than this is jitter, not intent.
const INTENT_SCROLL_PX = 40;

function whenLoaded(fn: () => void) {
  if (document.readyState === "complete") fn();
  else window.addEventListener("load", fn, { once: true });
}

function onIdle(fn: () => void, timeout: number) {
  // requestIdleCallback is missing on iOS before 16.4 (in-app browsers use the
  // system WebKit), so fall back to a short timer.
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(() => fn(), { timeout });
  } else {
    window.setTimeout(fn, Math.min(timeout, 1500));
  }
}

function disarm() {
  disarmers.splice(0).forEach((fn) => fn());
}

/** Arms the warm-up for `formId`. Only the first call does anything. */
export function armTypeformWarmup(formId: string) {
  if (typeof window === "undefined" || state !== "unarmed") return;
  state = "armed";

  // Honour Data Saver: the button's loading state still covers a cold open.
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  if (connection?.saveData) {
    state = "skipped";
    return;
  }

  const start = () => {
    if (state !== "armed") return;
    state = "started";
    disarm();
    runWarmup(formId);
  };
  const startAfterLoad = () => whenLoaded(start);

  // 1. Page idle after load.
  whenLoaded(() => onIdle(start, 2000));

  // 2. First sign of intent.
  const intentEvents = ["touchstart", "pointerdown", "keydown"] as const;
  for (const type of intentEvents) {
    window.addEventListener(type, startAfterLoad, { once: true, passive: true });
  }
  const onScroll = () => {
    if (Math.abs(window.scrollY) < INTENT_SCROLL_PX) return;
    window.removeEventListener("scroll", onScroll);
    startAfterLoad();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  disarmers.push(() => {
    for (const type of intentEvents) window.removeEventListener(type, startAfterLoad);
    window.removeEventListener("scroll", onScroll);
  });
}

/** The real popup has opened: its own load fills the cache, so stand down. */
export function markTypeformOpened() {
  if (state === "armed") {
    state = "skipped";
    disarm();
  }
}

function runWarmup(formId: string) {
  // Mirrors the URL the embed SDK builds for a popup (buildIframeSrc in
  // @typeform/embed), with tracking off and sandbox on. A distinct embed id
  // keeps the SDK's message handlers for the real popup from matching this frame.
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
  iframe.src = `https://form.typeform.com/to/${formId}?${params.toString()}`;
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
