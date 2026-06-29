import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're Booked | Sidekick Accounting Ltd",
  description: "Your Agency Foundations Review is confirmed. We look forward to speaking with you.",
};

export default function ThankYou() {
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center px-5 py-20 text-center">
        <div className="mx-auto max-w-[600px]">
          <div className="mb-10 flex justify-center">
            <Image
              src="/sidekick-logo-white.png"
              alt="Sidekick Accounting"
              width={180}
              height={43}
              priority
            />
          </div>

          <div className="mb-8 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sk-mint/15">
              <span className="text-4xl font-bold text-sk-mint">✓</span>
            </div>
          </div>

          <h1 className="mb-4 text-[36px] font-extrabold leading-[1.15] text-white max-sm:text-[28px]">
            You&apos;re booked in.
          </h1>
          <p className="mb-3 text-lg leading-relaxed text-sk-text max-sm:text-base">
            Thanks for booking your Agency Foundations Review. Check your inbox for the calendar invite and any prep details.
          </p>
          <p className="text-lg leading-relaxed text-sk-text max-sm:text-base">
            Looking forward to the call.
          </p>
        </div>
      </section>

      <footer className="bg-sk-navy-dark px-5 py-8 text-center">
        <p className="mx-auto max-w-[600px] text-xs leading-[1.8] text-sk-muted">
          Sidekick Accounting Ltd. All rights reserved.
        </p>
      </footer>
    </>
  );
}
