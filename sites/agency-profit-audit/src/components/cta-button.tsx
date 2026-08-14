"use client";

import { PopupButton } from "@typeform/embed-react";

// Canonical form id for https://sidekickaccounting.typeform.com/profitaudit —
// the embed loads form.typeform.com/to/<id>, which rejects the vanity alias.
const TYPEFORM_ID = "FNnck2Hf";

// Extracted from the landing page so the "What happens next" strip can repeat
// the same CTA without a second copy of the Typeform wiring.
export default function CTAButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const base =
    "inline-block rounded-md px-10 py-[18px] text-[15px] font-bold uppercase tracking-wider transition-colors cursor-pointer max-sm:px-7 max-sm:text-[13px]";
  const variants = {
    primary:
      "bg-sk-coral-dark text-white border-2 border-sk-coral-dark hover:bg-white hover:text-sk-navy hover:border-white",
    outline:
      "bg-transparent text-sk-navy border-2 border-sk-navy hover:bg-sk-navy hover:text-white",
  };
  return (
    <PopupButton
      id={TYPEFORM_ID}
      transitiveSearchParams
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </PopupButton>
  );
}
