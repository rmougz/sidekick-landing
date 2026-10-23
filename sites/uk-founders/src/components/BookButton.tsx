"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { openBooking } from "@/lib/booking";

// If the form never reports ready (Typeform outage, dropped connection), give
// the button back so the visitor can try again.
const OPENING_TIMEOUT_MS = 20_000;

/** Every "Book a free review" button. Opens the shared Typeform popup. */
export function BookButton({
  children = "Book a free review",
  onDark = false,
  className = "",
}: {
  children?: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  const [opening, setOpening] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const settle = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    setOpening(false);
  };

  const onClick = () => {
    if (opening) return;
    setOpening(true);
    timer.current = window.setTimeout(settle, OPENING_TIMEOUT_MS);
    void openBooking(settle);
  };

  // Navy fill on paper, white fill on navy. Coral only on hover.
  const tone = onDark
    ? "bg-white text-navy hover:bg-coral hover:text-white"
    : "bg-navy text-white hover:bg-coral";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-busy={opening || undefined}
      className={`inline-flex min-h-[54px] cursor-pointer items-center justify-center gap-2.5 rounded-full px-8 text-[16px] font-bold tracking-[-0.01em] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 aria-busy:cursor-progress ${
        onDark ? "focus-visible:ring-offset-navy" : "focus-visible:ring-offset-paper"
      } ${tone} ${className}`}
    >
      {opening ? (
        <>
          <span
            aria-hidden
            className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          />
          Opening the form…
        </>
      ) : (
        children
      )}
    </button>
  );
}
