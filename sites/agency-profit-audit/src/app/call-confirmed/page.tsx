import type { Metadata } from "next";
import WatchContent from "@/components/watch-content";
import ScheduleTracker from "@/components/schedule-tracker";

export const metadata: Metadata = {
  title: "Call Confirmed | Sidekick Accounting Ltd",
  description:
    "You're booked. Five minutes of context before your Agency Profit Audit call.",
  robots: { index: false, follow: false },
};

// Booking-redirect destination: identical content to /watch-before-call, plus
// the once-per-session Meta Schedule event (pixel + CAPI). Never linked from
// anywhere on the site.
export default function CallConfirmed() {
  return (
    <>
      <ScheduleTracker />
      <WatchContent />
    </>
  );
}
