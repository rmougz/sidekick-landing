import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're Booked | Sidekick Accounting Ltd",
  description: "Your Agency Foundations Review is confirmed. We look forward to speaking with you.",
};

export default function ThankYou() {
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 py-20 text-center">
        <div className="mx-auto max-w-[600px]">
          <div className="mb-10 flex justify-center">
            <Image
              src="/sidekick-logo-navy.png"
              alt="Sidekick Accounting"
              width={1921}
              height={422}
              className="h-7 w-auto"
              priority
            />
          </div>

          <div className="mb-8 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-mint/25">
              <span className="text-4xl font-bold text-navy">✓</span>
            </div>
          </div>

          <h1 className="mb-4 text-[clamp(28px,4vw,40px)] font-bold leading-[1.12] tracking-heading text-navy">
            You&apos;re booked in
          </h1>
          <p className="mb-3 text-lg leading-[1.7] text-ink-soft max-sm:text-base">
            Thanks for booking your Agency Foundations Review. Check your inbox for the calendar invite and any prep details.
          </p>
          <p className="text-lg leading-[1.7] text-ink-soft max-sm:text-base">
            Looking forward to the call.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] bg-navy-deep px-6 py-8 text-center">
        <p className="mx-auto max-w-[600px] text-xs leading-[1.8] text-white/35">
          Sidekick Accounting Ltd. All rights reserved.
        </p>
      </footer>
    </>
  );
}
