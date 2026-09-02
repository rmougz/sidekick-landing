"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { createPopup, type Popup } from "@typeform/embed";
import {
  TYPEFORM_ID,
  TYPEFORM_ORIGINS,
  armTypeformWarmup,
  markTypeformOpened,
  takePendingClick,
} from "@/lib/typeform";

// Attribution carried from the ad click into the application, so the answer
// lands in the CRM against the ad that produced it. Each name must exist as a
// hidden field on the Typeform or the value is silently dropped.
const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "ad_id",
  "fbclid",
] as const;

// One id per page load, shared by every CTA on the page. It rides through the
// Typeform's hidden fields onto the confirmation URL, where it becomes the
// Meta event_id — so repeated views of one submission deduplicate. Not
// persisted: a fresh page load is a fresh application.
let submissionId: string | null = null;
function getSubmissionId(): string {
  submissionId ??= crypto.randomUUID();
  return submissionId;
}

// Read at open time, never during render: window is not available on the
// server and reading it inline would risk a hydration mismatch.
function readHiddenFields(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const hidden: Record<string, string> = { sk_id: getSubmissionId() };
  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key);
    if (value) hidden[key] = value;
  }
  return hidden;
}

// If the form never reports ready (Typeform outage, dropped connection), give
// the button back so the visitor can retry rather than leaving it stuck.
const OPENING_TIMEOUT_MS = 20_000;

export default function CTAButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  // Resource hints for the form's origins. Called during render so they are
  // emitted into <head> by the server: DNS and TLS are done before anyone
  // taps. The font files are fetched in CORS mode, hence crossOrigin.
  preconnect(TYPEFORM_ORIGINS.form);
  preconnect(TYPEFORM_ORIGINS.assets);
  preconnect(TYPEFORM_ORIGINS.fonts, { crossOrigin: "anonymous" });

  const [opening, setOpening] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<Popup | null>(null);
  const timerRef = useRef<number | null>(null);

  const settle = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setOpening(false);
  }, []);

  const open = useCallback(() => {
    setOpening(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(settle, OPENING_TIMEOUT_MS);
    markTypeformOpened();
    // Created on first use so the hidden fields reflect the URL as it is now.
    // One popup per button: each createPopup call registers its own message
    // listeners, so this must not happen on every render.
    popupRef.current ??= createPopup(TYPEFORM_ID, {
      hidden: readHiddenFields(),
      transitiveSearchParams: true,
      onReady: settle,
      onClose: settle,
    });
    popupRef.current.open();
  }, [settle]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    // Tells the pre-hydration script this button is now handled by React.
    button.setAttribute("data-tf-live", "");
    armTypeformWarmup(button);
    // A tap that landed before hydration is honoured now rather than dropped.
    if (takePendingClick(button)) open();
    return () => {
      popupRef.current?.unmount();
      popupRef.current = null;
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [open]);

  const base =
    "inline-block rounded-md px-10 py-[18px] text-[15px] font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:cursor-progress max-sm:px-7 max-sm:text-[13px]";
  const variants = {
    primary:
      "bg-sk-coral-dark text-white border-2 border-sk-coral-dark hover:bg-white hover:text-sk-navy hover:border-white",
    outline:
      "bg-transparent text-sk-navy border-2 border-sk-navy hover:bg-sk-navy hover:text-white",
  };
  return (
    <button
      ref={buttonRef}
      type="button"
      data-tf-cta=""
      aria-busy={opening || undefined}
      disabled={opening}
      onClick={open}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {opening ? (
        <>
          <span aria-hidden className="tf-cta-spinner" />
          Opening your application…
        </>
      ) : (
        children
      )}
    </button>
  );
}
