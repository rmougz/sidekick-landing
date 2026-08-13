import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Received | Sidekick Accounting Ltd",
  description: "Everything you need is in your email.",
  robots: { index: false, follow: false },
};

// Thin confirmation page — no videos, no conversion events, no site footer.
export default function ApplicationReceived() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-5 py-20 text-center">
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

        <h1 className="mb-4 text-[36px] font-extrabold leading-[1.15] text-white max-sm:text-[28px]">
          Application received.
        </h1>
        <p className="text-lg leading-relaxed text-sk-text max-sm:text-base">
          Everything you need is in your email. If nothing lands within five
          minutes, check spam.
        </p>
      </div>
    </section>
  );
}
