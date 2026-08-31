// Shared Meta pixel bootstrap. Used by the base pixel on the landing page and
// by the Schedule event on /call-confirmed, so there is one implementation of
// the stub-and-load dance rather than a copy per surface.

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export interface Fbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
}

type FbqWindow = Window & { fbq?: Fbq; _fbq?: Fbq };

// The standard Meta pixel bootstrap: install a queueing stub, then load
// fbevents.js, which drains the queue. Safe to call more than once — the
// script is only injected on the first call.
export function ensurePixel(pixelId: string): Fbq {
  const w = window as FbqWindow;
  if (!w.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    }) as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    w.fbq = fbq;
    if (!w._fbq) w._fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  w.fbq("init", pixelId);
  return w.fbq;
}

export function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// Click id for CAPI user_data. Order matters:
//  1. _fbc, which Meta's own pixel writes once it has run on a click landing.
//  2. sk_fbc, the first-party cookie proxy.ts writes from fbclid at click
//     time. This is the path that survives an ad blocker killing fbevents.js.
//  3. an fbclid on the current URL, for a direct hit on this page.
export function getFbc(): string | undefined {
  const fromPixel = readCookie("_fbc");
  if (fromPixel) return fromPixel;
  const fromProxy = readCookie("sk_fbc");
  if (fromProxy) return fromProxy;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}
