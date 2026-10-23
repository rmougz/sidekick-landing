import Image from "next/image";
import type { ReactNode } from "react";
import { preconnect } from "react-dom";
import { BookButton } from "@/components/BookButton";
import { BookingPreload } from "@/components/BookingPreload";
import { StickyCta } from "@/components/StickyCta";
import logo from "@/assets/sidekick-logo-navy-480.png";

/* ── Content still to come (marked [PLACEHOLDER] in the brief) ─────────────── */

// Hero photo of the Sidekick team. Drop the file in public/ and set the path
// and its pixel size here; until then the hero shows an empty frame.
const HERO_PHOTO: { src: string; width: number; height: number; alt: string } | null = null;

// Three short quotes from the "Proof Bank - client words 2020-2026" doc.
// `placeholder: true` renders the card in a muted "to come" style.
const QUOTES: { quote: string; name: string; business: string; placeholder?: boolean }[] = [
  { quote: "Client quote to come.", name: "First name", business: "business type", placeholder: true },
  { quote: "Client quote to come.", name: "First name", business: "business type", placeholder: true },
  { quote: "Client quote to come.", name: "First name", business: "business type", placeholder: true },
];

// Registered office for the footer. Left out of the page until it is set.
const REGISTERED_ADDRESS: string | null = null;
const COMPANY_NUMBER = "12250170";

// Lives on the profit audit zone at the domain root, and covers this page.
const PRIVACY_URL = "/privacy";

/* ── Final copy ────────────────────────────────────────────────────────────── */

const credibility = [
  "ICAEW Chartered Accountants",
  "Founded by an ex-EY Chartered Accountant",
  "Working with UK founders since 2020",
];

const services: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Tax planning",
    body: "How you pay yourself, how profit comes out of the company and how it's structured, planned before the year starts rather than after.",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h3M13 11h3M8 15h3M13 15h3" />
      </>
    ),
  },
  {
    title: "Accounts and tax returns",
    body: "Year-end accounts, corporation tax, self assessment, VAT and payroll, done properly and on time.",
    icon: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 14l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Moving abroad",
    body: "Your UK residency, your company's position and the timing, worked out before you book the flight.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
      </>
    ),
  },
  {
    title: "Property tax",
    body: "Buying, holding or incorporating property, with the numbers run both ways before you commit.",
    icon: (
      <>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 9.5V20h14V9.5M10 20v-6h4v6" />
      </>
    ),
  },
  {
    title: "CFO and exit planning",
    body: "Forecasts, growth decisions and a plan to make your business worth buying when the time comes.",
    icon: (
      <>
        <path d="M4 4v16h16" />
        <path d="M8 15l4-4 3 3 5-6" />
        <path d="M16 8h4v4" />
      </>
    ),
  },
];

const steps = [
  "You tell us where the business is and what you're trying to do.",
  "We look at your numbers and where your tax position stands today.",
  "You leave knowing what's worth changing, and whether we're the right people to help with it.",
];

/* ── Primitives ────────────────────────────────────────────────────────────── */

/** Coral full stop, echoing the wordmark. */
function Stop() {
  return <span className="text-coral">.</span>;
}

/** Section heading: navy (or white on dark) 800, coral full stop, short coral rule. */
function SectionHeading({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <div>
      <h2
        className={`text-[32px] font-extrabold leading-[1.08] tracking-heading text-balance md:text-[44px] ${
          onDark ? "text-white" : "text-navy"
        }`}
      >
        {children}
        <Stop />
      </h2>
      <span aria-hidden className="mt-5 block h-[3px] w-10 rounded-full bg-coral" />
    </div>
  );
}

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1100px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

function LineIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-navy"
    >
      {children}
    </svg>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function Page() {
  // DNS and TLS for the form's origins go into <head>, so the popup starts warm.
  preconnect("https://form.typeform.com");
  preconnect("https://renderer-assets.typeform.com");
  preconnect("https://font.typeform.com", { crossOrigin: "anonymous" });

  return (
    <>
      <header>
        <Container className="flex h-[72px] items-center md:h-[88px]">
          <Image
            src={logo}
            alt="Sidekick Accounting"
            unoptimized
            className="h-7 w-auto md:h-8"
            priority
          />
        </Container>
      </header>

      <main>
        {/* 1. Hero */}
        <section id="hero" className="pb-14 pt-4 md:pb-24 md:pt-10">
          <Container className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-eyebrow text-coral">
                ICAEW Chartered Accountants
              </p>
              <h1 className="mt-4 text-[40px] font-extrabold leading-[1.02] tracking-headline text-navy text-balance sm:text-[52px] lg:text-[64px]">
                Pay less tax, build wealth and plan your exit
                <Stop />
              </h1>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-ink-soft md:text-[18px]">
                A lot of founders have someone filing their tax and nobody planning it, so the big
                decisions on pay, property and selling get made first and the tax gets added up
                afterwards. We help UK founders plan those decisions before they&rsquo;re made.
              </p>
              <div className="mt-8">
                <BookButton className="w-full sm:w-auto" />
                <p className="mt-3 text-[14px] text-ink-soft">
                  Takes two minutes. Free, with no obligation.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-hairline bg-paper-deep md:aspect-[4/5]">
              {HERO_PHOTO ? (
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt}
                  width={HERO_PHOTO.width}
                  height={HERO_PHOTO.height}
                  sizes="(min-width: 768px) 480px, 100vw"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[13px] font-medium text-ink-soft/70">
                  Team photo to come
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* 2. Credibility strip */}
        <section aria-label="About Sidekick" className="border-y border-hairline">
          <Container>
            <ul className="grid divide-y divide-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
              {credibility.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 py-5 text-[15px] font-semibold text-navy md:justify-center md:px-6 md:py-7 md:text-center"
                >
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-coral md:hidden" />
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* 3. Where we help */}
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading>Where we help</SectionHeading>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.6] text-ink-soft md:text-[18px]">
              We sit down with you before the year starts and plan it with you, so the decisions
              that set your tax bill are made on purpose.
            </p>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s.title} className="rounded-[20px] border border-hairline p-6 md:p-7">
                  <LineIcon>{s.icon}</LineIcon>
                  <h3 className="mt-5 text-[19px] font-extrabold tracking-[-0.02em] text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft">{s.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <BookButton className="w-full sm:w-auto" />
            </div>
          </Container>
        </section>

        {/* 4. What happens on the call */}
        <section className="bg-navy py-20 text-white md:py-28">
          <Container>
            <SectionHeading onDark>What happens on the call</SectionHeading>
            <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((step, i) => (
                <li key={step} className="border-t border-white/15 pt-6">
                  <span className="text-[15px] font-extrabold tabular-nums text-white/60">
                    0{i + 1}
                  </span>
                  <p className="mt-3 text-[18px] font-medium leading-[1.5] text-white md:text-[19px]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-12 max-w-[620px] text-[16px] leading-[1.6] text-white/75">
              The call is free and takes 15 to 30 minutes, depending on the size of your business.
            </p>
          </Container>
        </section>

        {/* 5. What clients say */}
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading>What clients say</SectionHeading>
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {QUOTES.map((q, i) => (
                <li
                  key={i}
                  className={`flex flex-col rounded-[20px] border p-6 md:p-7 ${
                    q.placeholder ? "border-dashed border-hairline" : "border-hairline"
                  }`}
                >
                  <figure className="flex h-full flex-col">
                    <blockquote
                      className={`text-[17px] leading-[1.55] ${
                        q.placeholder ? "text-ink-soft/70" : "text-ink"
                      }`}
                    >
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 border-t border-hairline pt-4 text-[14px]">
                      <span className="font-bold text-navy">{q.name}</span>
                      <span className="text-ink-soft">, {q.business}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>

            {/* Trustpilot widget goes here once the review count is live. */}
            <div id="trustpilot" className="empty:hidden" />
          </Container>
        </section>

        {/* 6. Final call to action */}
        <section id="closing" className="bg-navy py-20 text-white md:py-28">
          <Container>
            <SectionHeading onDark>Know what&rsquo;s coming before it arrives</SectionHeading>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.6] text-white/80 md:text-[18px]">
              If you&rsquo;d like to know where you stand and what&rsquo;s worth changing this year,
              book a free review and we&rsquo;ll go through it together.
            </p>
            <div className="mt-9">
              <BookButton onDark className="w-full sm:w-auto" />
            </div>
          </Container>
        </section>
      </main>

      {/* 7. Footer. Extra bottom padding on phones clears the sticky bar. */}
      <footer className="py-12 pb-28 md:pb-12">
        <Container className="space-y-3 text-[13px] leading-[1.7] text-ink-soft">
          <p>
            Sidekick Accounting Ltd is a firm of Chartered Accountants regulated by the ICAEW.
            Company number {COMPANY_NUMBER}.{REGISTERED_ADDRESS ? ` Registered office: ${REGISTERED_ADDRESS}.` : ""}
          </p>
          <p>The content on this page is general information and your own position will differ.</p>
          <p>
            <a href={PRIVACY_URL} className="font-semibold text-navy underline underline-offset-4 hover:text-coral">
              Privacy policy
            </a>
          </p>
        </Container>
      </footer>

      <StickyCta />
      <BookingPreload />
    </>
  );
}
