// One Typeform popup for the whole page. Every "Book a free review" button
// opens the same instance so visitors never leave the page.
//
// The embed SDK is imported on demand rather than shipped in the first bundle,
// which keeps the initial JavaScript small for Instagram's in-app browser. It
// is prefetched when the page goes idle (see preloadBookingSdk), so a tap
// almost never waits on it.
import type { Popup } from "@typeform/embed";
import { markTypeformOpened } from "./typeform-warmup";

// "Sidekick enquiry (UK founders)". Unpublished as of 2026-10-23; it must be
// published before launch or the popup shows Typeform's "form not found" page.
export const TYPEFORM_FORM_ID = "ee08Bj1i";

let sdk: Promise<typeof import("@typeform/embed")> | null = null;
let popup: Popup | null = null;
let settleOpener: (() => void) | null = null;

function loadSdk() {
  sdk ??= import("@typeform/embed");
  return sdk;
}

export function preloadBookingSdk() {
  void loadSdk();
}

function settle() {
  settleOpener?.();
  settleOpener = null;
}

/** Opens the popup. `onSettled` runs once the form is ready or is closed. */
export async function openBooking(onSettled: () => void) {
  settle();
  settleOpener = onSettled;
  markTypeformOpened();
  try {
    const { createPopup } = await loadSdk();
    popup ??= createPopup(TYPEFORM_FORM_ID, {
      transitiveSearchParams: true,
      iframeProps: { title: "Book a free review" },
      onReady: settle,
      onClose: settle,
    });
    popup.open();
  } catch {
    // The SDK chunk failed to load (dropped connection). Fall back to the
    // hosted form in the same tab, carrying the page's UTM parameters.
    sdk = null;
    settle();
    window.location.href = `https://form.typeform.com/to/${TYPEFORM_FORM_ID}${window.location.search}`;
  }
}
