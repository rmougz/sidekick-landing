"use client";

import { useEffect, useState } from "react";
import { PopupButton } from "@typeform/embed-react";

// Canonical form id for https://sidekickaccounting.typeform.com/profitaudit —
// the embed loads form.typeform.com/to/<id>, which rejects the vanity alias.
const TYPEFORM_ID = "FNnck2Hf";

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

export default function CTAButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  // Read in an effect, not during render: window is not available on the
  // server and reading it inline would risk a hydration mismatch.
  const [hidden, setHidden] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next: Record<string, string> = { sk_id: getSubmissionId() };
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) next[key] = value;
    }
    setHidden(next);
  }, []);

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
      hidden={hidden}
      transitiveSearchParams
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </PopupButton>
  );
}
