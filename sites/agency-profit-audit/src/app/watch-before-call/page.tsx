import type { Metadata } from "next";
import WatchContent from "@/components/watch-content";

export const metadata: Metadata = {
  title: "Before Your Call | Sidekick Accounting Ltd",
  description:
    "You're booked. Five minutes of context before your Agency Profit Audit call.",
  robots: { index: false, follow: false },
};

// Pre-call context page linked from booking confirmations. No conversion
// events fire here — tracking lives on /call-confirmed only.
export default function WatchBeforeCall() {
  return <WatchContent />;
}
