"use client";

import { useEffect } from "react";
import { preloadBookingSdk, TYPEFORM_FORM_ID } from "@/lib/booking";
import { armTypeformWarmup } from "@/lib/typeform-warmup";

/**
 * After the page has loaded, fetch the embed SDK and warm the form's own
 * assets in a hidden, tracking-disabled iframe, so the first tap opens the
 * popup in under a second on a cold phone connection. Renders nothing.
 */
export function BookingPreload() {
  useEffect(() => {
    const prefetch = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(preloadBookingSdk, { timeout: 2000 });
      } else {
        window.setTimeout(preloadBookingSdk, 1200);
      }
    };
    if (document.readyState === "complete") prefetch();
    else window.addEventListener("load", prefetch, { once: true });
    armTypeformWarmup(TYPEFORM_FORM_ID);
    return () => window.removeEventListener("load", prefetch);
  }, []);
  return null;
}
