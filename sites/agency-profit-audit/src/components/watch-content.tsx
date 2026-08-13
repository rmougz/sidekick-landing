import Image from "next/image";
import WistiaPlayer from "./wistia-player";
import ResultsSection from "./results-section";
import { watchVideos } from "@/lib/videos";

// Shared content for /watch-before-call and /call-confirmed. Single-purpose
// pre-call page: no site nav, no full site footer. Most traffic arrives from
// SMS links, so everything stacks mobile-first.
export default function WatchContent() {
  return (
    <>
      <section className="px-5 pb-16 pt-12 text-center">
        <div className="mx-auto max-w-[1170px]">
          <div className="mb-8 flex justify-center">
            <Image
              src="/sidekick-logo-white.png"
              alt="Sidekick Accounting"
              width={180}
              height={43}
              priority
            />
          </div>

          {/* Spec keeps the visible eyebrow small; give screen readers a real
              page heading instead of an 11px micro-label. */}
          <h1 className="sr-only">
            You&apos;re booked. Five minutes of context before we talk.
          </h1>
          <p
            aria-hidden
            className="mb-6 text-[13px] font-bold uppercase tracking-[3px] text-sk-coral max-sm:text-[11px]"
          >
            You&apos;re booked. Five minutes of context before we talk.
          </p>

          <div className="mx-auto max-w-[800px] rounded-[10px] bg-sk-navy-dark p-2.5">
            <WistiaPlayer
              slot={watchVideos.hero.slot}
              mediaId={watchVideos.hero.mediaId}
            />
          </div>

          <div className="mx-auto mt-8 grid max-w-[1000px] grid-cols-3 gap-6 max-md:grid-cols-1">
            {watchVideos.breakouts.map((video) => (
              <div
                key={video.slot}
                className="rounded-[10px] bg-sk-navy-dark p-2.5 text-left"
              >
                <WistiaPlayer slot={video.slot} mediaId={video.mediaId} lazy />
                <p className="px-2 pb-2 pt-3 text-[15px] font-semibold leading-snug text-white/90">
                  {video.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ResultsSection />

      <section className="px-5 py-10 text-center">
        <p className="text-[13px] text-sk-muted">
          Need to move the call? The reschedule link is in your confirmation
          email.
        </p>
      </section>
    </>
  );
}
