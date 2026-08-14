import Image from "next/image";
import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Application Received | Sidekick Accounting Ltd",
  description: "Thanks for taking the time. We've got your answers.",
  robots: { index: false, follow: false },
};

// Destination for applicants below the revenue threshold. No email is sent to
// this group, so the page must not promise one — it routes them to the
// self-serve benchmark tool on the main site instead.
export default function ApplicationReceived() {
  return (
    <>
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
          <p className="mb-4 text-lg leading-relaxed text-sk-text max-sm:text-base">
            Thanks for taking the time &mdash; we&apos;ve got your answers.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-sk-text max-sm:text-base">
            While you&apos;re here: most agencies have never seen how their
            numbers compare to the ones making the most money. This takes 90
            seconds and gives you real figures, not percentages you have to
            interpret.
          </p>

          <a
            href="https://sidekickaccounting.co.uk/agency-benchmarks"
            className="inline-block rounded-md border-2 border-sk-coral-dark bg-sk-coral-dark px-10 py-[18px] text-[15px] font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white hover:text-sk-navy max-sm:px-7 max-sm:text-[13px]"
          >
            See your agency benchmarks &rarr;
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
