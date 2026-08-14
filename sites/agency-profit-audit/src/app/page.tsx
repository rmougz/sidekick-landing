import Image from "next/image";
import Script from "next/script";
import CTAButton from "@/components/cta-button";
import FaqAccordion from "@/components/faq-accordion";
import NextSteps from "@/components/next-steps";
import ResultsSection from "@/components/results-section";
import SiteFooter from "@/components/site-footer";
import { landingFaqs } from "@/lib/faqs";

const testimonials = [
  {
    quote:
      "Rayhaan and the team have made scaling my agency simple. Before working with them I never knew how much I was actually making, what my margins were or the most effective route to grow. When you're a one man band you can get away with that, but if you really want to scale your agency you need to make decisions based on data. Rayhaan and the team make that easy whilst guiding us on the best path forward.",
    name: "Sam Winsbury",
    role: "Founder, Kurogo",
    photo: "/clients/SAM.jpeg",
  },
  {
    quote:
      "The support received has been invaluable for the business, Rayhaan has helped us to build a robust financial plan which has unlocked new revenue sources.",
    name: "Lewis Baxter",
    role: "COO",
    photo: "/clients/Lewis.jpg",
  },
  {
    quote:
      "Everybody wants clarity. My stress levels have decreased and I'm able to operate at a higher level, the biz is performing much better as a result.",
    name: "Phaibion R",
    role: "CEO, Royal Energy",
    photo: "/clients/Phaibion.jpg",
  },
  {
    quote:
      "Rayhaan is brilliant. Highly responsive & up for tackling complex challenges.",
    name: "Oren G",
    role: "Managing Director, Kurve",
    photo: "/clients/Oren.jpeg",
  },
  {
    quote:
      "I've been able to spend more on growing my business as a result of investing in Sidekick. Highly recommend to every agency owner that feels like they could be losing money but don't know where. We've scaled from $300k to $500k MRR while working with Rayhaan.",
    name: "Anonymous",
    role: "B2B Agency Founder",
  },
  {
    quote:
      "One of the absolute best in the game. He's been a game-changer for my business.",
    name: "Sam Saifi",
    role: "Founder, Revenue Labz",
    photo: "/clients/sam-saif.webp",
  },
];

const credibility = [
  "EY & banking background",
  "Team of ACA-qualified accountants (CPA equivalent)",
  "100+ agencies served",
  "Onboarding 3 new clients a month",
];

const logos = [
  { src: "/logos/1.png", alt: "Literal Humans" },
  { src: "/logos/2.png", alt: "Kurve" },
  { src: "/logos/3.png", alt: "be Broadcast" },
  { src: "/logos/4.png", alt: "Creative Content Agency" },
  { src: "/logos/5.png", alt: "Breakout Media" },
  { src: "/logos/6.png", alt: "Influence Engine" },
  { src: "/logos/7.png", alt: "Kurogo" },
  { src: "/logos/8.png", alt: "Client Logo" },
  { src: "/logos/9.png", alt: "Lock & Quay Collective" },
  { src: "/logos/10.png", alt: "AuthorityAgency" },
];

function TestimonialCard({
  testimonial,
  featured = false,
}: {
  testimonial: (typeof testimonials)[number];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-sk-border bg-sk-navy-dark ${featured ? "px-10 py-10 max-sm:px-6 max-sm:py-7" : "px-7 py-7"}`}
    >
      {/* Decorative opening quote mark */}
      <span
        className={`absolute font-extrabold leading-none text-sk-coral/10 ${featured ? "top-2 left-4 text-[160px] max-sm:text-[100px]" : "top-0 left-3 text-[100px] max-sm:text-[72px]"}`}
      >
        &ldquo;
      </span>

      <div className="relative flex flex-1 flex-col">
        <p
          className={`mb-6 flex-1 leading-relaxed text-white/90 ${featured ? "text-[22px] font-medium max-sm:text-lg" : "text-[17px] max-sm:text-[15px]"}`}
        >
          {testimonial.quote}
        </p>

        <div className="flex items-center gap-3 mt-auto">
          {testimonial.photo ? (
            <Image
              src={testimonial.photo}
              alt={testimonial.name}
              width={56}
              height={56}
              className={`shrink-0 rounded-full object-cover ${featured ? "h-14 w-14" : "h-11 w-11"}`}
            />
          ) : (
            <div
              className={`flex shrink-0 items-center justify-center rounded-full bg-sk-coral font-bold text-white ${featured ? "h-14 w-14 text-xl" : "h-11 w-11 text-base"}`}
            >
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <div
              className={`font-bold text-white ${featured ? "text-[17px]" : "text-[15px]"}`}
            >
              {testimonial.name}
            </div>
            <div className="text-[13px] text-sk-muted">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      {/* Mobile spacing is tightened (pt, logo and video margins) so the CTA
          clears the fold on a 390x844 phone. */}
      <section
        className="px-5 pb-20 pt-15 text-center max-sm:pt-10"
        style={{
          background:
            "linear-gradient(0deg, #eee8e8 0%, #ffcecd 25%, #0e2d48 54%)",
        }}
      >
        <div className="mx-auto max-w-[1170px]">
          <div className="mb-10 flex justify-center max-sm:mb-6">
            <Image
              src="/sidekick-logo-white.png"
              alt="Sidekick Accounting"
              width={200}
              height={48}
              priority
            />
          </div>

          <p className="mb-4 text-[13px] font-bold uppercase tracking-[3px] text-sk-coral max-sm:text-[12px]">
            For agencies and consultants doing $1M+ in revenue
          </p>
          <h1 className="mx-auto mb-5 max-w-[900px] text-[42px] font-extrabold leading-[1.15] text-white max-sm:text-[26px]">
            Get the whole finance function: a CFO-level lead, a controller and
            a bookkeeper, for one monthly fee.
          </h1>
          <p className="mx-auto mb-3 max-w-[700px] text-lg leading-relaxed text-sk-text max-sm:text-sm">
            Agencies with us twelve months or more improve margins by 19.5% on
            average.
          </p>
          <ul className="mx-auto mb-8 mt-5 flex max-w-[960px] flex-wrap items-center justify-center gap-x-6 gap-y-2.5 max-sm:w-fit max-sm:flex-col max-sm:items-start">
            {credibility.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[12px] font-semibold text-white/80"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sk-coral" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mx-auto mb-10 max-w-[800px] rounded-[10px] bg-sk-navy-dark p-2.5 max-sm:mb-6">
            <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
            <Script src="https://fast.wistia.com/embed/i72bt3lrdz.js" strategy="lazyOnload" />
            {/* Aspect ratio is locked on the wrapper so the box keeps its
                height when the Wistia custom element upgrades. Without it the
                player resizes on definition and everything below it shifts. */}
            <div
              className="w-full rounded-md overflow-hidden"
              style={{ aspectRatio: "16 / 9" }}
              dangerouslySetInnerHTML={{
                __html: `
                  <style>wistia-player[media-id='i72bt3lrdz']:not(:defined){background:center/contain no-repeat url('https://fast.wistia.com/embed/medias/i72bt3lrdz/swatch');display:block;filter:blur(5px);padding-top:56.25%}</style>
                  <wistia-player media-id="i72bt3lrdz" aspect="1.7777777777777777" preload="none"></wistia-player>
                `,
              }}
            />
          </div>

          <CTAButton>Book your Agency Profit Audit</CTAButton>

          {/* Sits under the CTA rather than after the hero: it only adds
              content below the button, so nothing above it moves down. */}
          <NextSteps />
        </div>
      </section>

      {/* Stats + Logos */}
      <section className="bg-sk-grey px-5 py-20">
        <div className="mx-auto max-w-[1170px]">
          <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-[3px] text-sk-coral-dark">
            Track record
          </p>
          <h2 className="mb-14 text-center text-[32px] font-extrabold leading-[1.15] text-sk-navy max-sm:text-2xl">
            Built on real agency results
          </h2>

          <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1">
            <div className="rounded-2xl border border-sk-navy/10 bg-white px-8 py-10 text-center shadow-sm">
              <div className="text-[56px] font-extrabold leading-none text-sk-navy max-sm:text-[44px]">
                100+
              </div>
              <div className="mt-3 text-[15px] font-semibold text-sk-navy/70">
                Agencies helped
              </div>
            </div>
            <div className="rounded-2xl border border-sk-navy/10 bg-white px-8 py-10 text-center shadow-sm">
              <div className="text-[56px] font-extrabold leading-none text-sk-coral-dark max-sm:text-[44px]">
                +19.5%
              </div>
              <div className="mt-3 text-[15px] font-semibold text-sk-navy/70">
                Avg. margin improvement
              </div>
            </div>
            <div className="rounded-2xl border border-sk-navy/10 bg-white px-8 py-10 text-center shadow-sm">
              <div className="text-[56px] font-extrabold leading-none text-sk-navy max-sm:text-[44px]">
                6 yrs
              </div>
              <div className="mt-3 text-[15px] font-semibold text-sk-navy/70">
                Working with agencies
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 flex max-w-[1000px] flex-wrap items-center justify-center gap-x-10 gap-y-5 max-sm:gap-x-6">
            {logos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={40}
                className="h-9 w-auto object-contain opacity-50 max-sm:h-6"
                style={{ filter: "brightness(0) saturate(100%) invert(14%) sepia(30%) saturate(1000%) hue-rotate(175deg) brightness(95%)" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Scorecards */}
      <ResultsSection />

      {/* Testimonials */}
      <section className="bg-sk-navy px-5 py-15">
        <div className="mx-auto max-w-[1170px]">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[2px] text-sk-coral">
            Why our clients love us
          </p>
          <h2 className="mb-12 text-center text-[32px] font-extrabold leading-[1.15] text-white max-sm:text-2xl">
            In their words
          </h2>

          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sk-grey px-5 py-15">
        <div className="mx-auto max-w-[820px]">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[2px] text-sk-coral-dark">
            Common questions
          </p>
          <h2 className="mb-10 text-center text-[32px] font-extrabold leading-[1.15] text-sk-navy max-sm:text-2xl">
            Answered before you ask
          </h2>
          <FaqAccordion faqs={landingFaqs} />
        </div>
      </section>

      {/* Closing CTA */}
      <section
        className="px-5 py-20 text-center"
        style={{
          background:
            "linear-gradient(0deg, #0e2d48 7%, #ffcecd 50%, #0e2d48 93%)",
        }}
      >
        <div className="mx-auto max-w-[1170px]">
          <p className="mx-auto mb-9 max-w-[700px] text-[28px] font-extrabold leading-snug text-sk-navy max-sm:text-[22px]">
            These are just a few of the agency founders we&apos;ve worked with.
            Want to see where your profit is leaking?
          </p>
          <CTAButton variant="outline">
            Book your Agency Profit Audit
          </CTAButton>
          <p className="mt-4 text-sm text-sk-navy/60">
            45 minutes. No pitch. You&apos;ll leave with a clear financial
            picture of your business.
          </p>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </>
  );
}
