import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { preconnect } from "react-dom";
import { BookButton } from "@/components/BookButton";
import { BookingPreload } from "@/components/BookingPreload";
import { StickyCta } from "@/components/StickyCta";
import logo from "@/assets/sidekick-logo-navy-480.png";
import oliver from "@/assets/clients/OLIVER.png";
import oren from "@/assets/clients/Oren.jpeg";
import phaibion from "@/assets/clients/Phaibion.jpg";
import samSaifi from "@/assets/clients/sam-saif.webp";
import usman from "@/assets/clients/USMAN.webp";
import andreas from "@/assets/clients/ANDREAS.png";
import logo2 from "@/assets/logos/2.png";
import logo3 from "@/assets/logos/3.png";
import logo4 from "@/assets/logos/4.png";
import logoMadx from "@/assets/logos/madx.svg";
import logo7 from "@/assets/logos/7.png";
import logo8 from "@/assets/logos/8.png";
import logo9 from "@/assets/logos/9.png";
import logo10 from "@/assets/logos/10.png";
import logoGuidedGrowth from "@/assets/logos/guided-growth.png";
import logoPlutus from "@/assets/logos/plutus-media.png";

// Client images are static imports, so their URLs carry the /founders basePath
// in dev and prod alike. The files are resized copies of shared-assets/.

/* ── Content still to come ─────────────────────────────────────────────────── */

// Registered office for the footer. Left out of the page until it is set.
const REGISTERED_ADDRESS: string | null = null;
const COMPANY_NUMBER = "12250170";

// Lives on the profit audit zone at the domain root, and covers this page.
const PRIVACY_URL = "/privacy";

/* ── Final copy ────────────────────────────────────────────────────────────── */

const credibility = [
  "ICAEW Chartered Accountants",
  "100+ clients helped",
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
  {
    title: "Bookkeeping and monthly reporting",
    body: "Xero or QuickBooks kept up to date, with a clear monthly view of profit, cash and what to set aside for tax.",
    icon: (
      <>
        <path d="M4 20h16" />
        <rect x="5.5" y="11" width="3" height="6" rx="0.5" />
        <rect x="10.5" y="7" width="3" height="10" rx="0.5" />
        <rect x="15.5" y="4" width="3" height="13" rx="0.5" />
      </>
    ),
  },
];

// Verbatim from the Foundations page. No photo means an initial avatar.
const testimonials: { quote: string; name: string; role: string; photo?: StaticImageData }[] = [
  {
    quote:
      "We've always got the information we need to make decisions quickly. We've saved £10k in taxes since working with Sidekick. They're not your usual accountant.",
    name: "Oliver L",
    role: "CEO, Authority Agency",
    photo: oliver,
  },
  {
    quote:
      "Sidekick is brilliant. Highly responsive and up for tackling complex challenges. I feel confident in our numbers with their expertise at hand.",
    name: "Oren G",
    role: "Managing Director, Kurve",
    photo: oren,
  },
  {
    quote: "They take the stress out of taxes, and deal with it all in a professional and timely manner.",
    name: "Lauren H",
    role: "Founder, LBHPT",
  },
  {
    quote:
      "Everybody wants clarity. My stress levels have decreased and I'm able to operate at a higher level, the biz is performing much better as a result.",
    name: "Phaibion R",
    role: "CEO, Royal Energy",
    photo: phaibion,
  },
  {
    quote: "Thoroughly enjoy working with Sidekick. They've been a game-changer for my business.",
    name: "Sam Saifi",
    role: "Founder, Revenue Labz",
    photo: samSaifi,
  },
  {
    quote: "I cannot recommend Sidekick enough. They have helped me understand my numbers and save taxes.",
    name: "Anonymous",
    role: "CEO",
  },
];

const results = [
  {
    stat: "+$200K monthly revenue at a 77.25% net margin, around $154K a month in extra cash in the bank.",
    name: "Usman",
    company: "Guided Growth",
    photo: usman,
  },
  {
    stat: "£250K+ of new bottom-line profit this year, with +21% revenue and +12% margin growth.",
    name: "Andreas",
    company: "Be Creative",
    photo: andreas,
  },
];

// `scale` sizes stacked marks (symbol above name) up so they read at the same
// visual weight as the one-line wordmarks.
const logos: { src: StaticImageData; alt: string; scale?: number }[] = [
  { src: logoGuidedGrowth, alt: "Guided Growth", scale: 1.5 },
  { src: logo2, alt: "Kurve" },
  { src: logo3, alt: "be Broadcast" },
  { src: logo4, alt: "Creative Content Agency" },
  { src: logoPlutus, alt: "Plutus Media", scale: 1.6 },
  { src: logoMadx, alt: "MADX", scale: 0.8 },
  { src: logo7, alt: "Kurogo" },
  { src: logo8, alt: "Client logo" },
  { src: logo9, alt: "Lock & Quay Collective" },
  { src: logo10, alt: "Authority Agency" },
];

const steps = [
  "You tell us where the business is and what you're trying to do.",
  "We look at your numbers and where your tax position stands today.",
  "You leave knowing what's worth changing, and whether we're the right people to help with it.",
];

/* ── Primitives ────────────────────────────────────────────────────────────── */

/** Coral full stop, echoing the wordmark. Pulled in slightly: at this weight and
 *  tracking the glyph's side bearing reads as a space before the stop. */
function Stop() {
  return <span className="-ml-[0.06em] text-coral">.</span>;
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

function Avatar({ name, photo, size }: { name: string; photo?: StaticImageData; size: number }) {
  const box = { width: size, height: size };
  return photo ? (
    <Image
      src={photo}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className="shrink-0 rounded-full border border-hairline object-cover"
      style={box}
    />
  ) : (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full bg-navy font-bold text-white"
      style={{ ...box, fontSize: size * 0.4 }}
    >
      {name.charAt(0)}
    </span>
  );
}

function Stars() {
  return (
    <div role="img" aria-label="Five stars" className="flex gap-1 text-coral">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} aria-hidden viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

/** Client logos in greyscale. Desktop (1024px+): one row. Phones and tablets: a
 *  slow, endless sideways scroll (a swipeable static row when reduced motion is on). */
function LogoStrip() {
  const row = (hidden: boolean) =>
    logos.map((l) => (
      <li key={`${l.alt}${hidden ? "-dup" : ""}`} aria-hidden={hidden || undefined} className={`shrink-0 ${hidden ? "lg:hidden" : ""}`}>
        <Image
          src={l.src}
          alt={hidden ? "" : l.alt}
          height={32}
          sizes="200px"
          loading="eager"
          className="h-[calc(28px*var(--s))] w-auto object-contain opacity-60 grayscale mix-blend-multiply lg:h-[calc(24px*var(--s))] xl:h-[calc(28px*var(--s))]"
          style={{ "--s": l.scale ?? 1 } as CSSProperties}
        />
      </li>
    ));
  return (
    <div className="logo-marquee overflow-hidden max-lg:[mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <ul className="logo-track flex w-max items-center gap-10 lg:w-full lg:justify-between lg:gap-6">
        {row(false)}
        {row(true)}
      </ul>
    </div>
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
                Pay less tax<span className="-ml-[0.06em]">,</span> build wealth and plan your exit
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

            <figure className="rounded-[20px] border border-hairline bg-white p-7 md:p-9">
              <Stars />
              <blockquote className="mt-5 text-[22px] font-semibold leading-[1.35] tracking-[-0.015em] text-navy md:text-[26px]">
                &ldquo;We&rsquo;ve saved £10k in taxes since working with Sidekick. They&rsquo;re not your
                usual accountant.&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3.5 border-t border-hairline pt-6">
                <Avatar name="Oliver L" photo={oliver} size={52} />
                <span>
                  <span className="block text-[16px] font-bold text-navy">Oliver L</span>
                  <span className="block text-[14px] text-ink-soft">CEO, Authority Agency</span>
                </span>
              </figcaption>
            </figure>
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

        {/* 2b. Client logos */}
        <section aria-labelledby="logos-label" className="pt-12 md:pt-14">
          <Container>
            <p id="logos-label" className="text-[12px] font-bold uppercase tracking-eyebrow text-ink-soft">
              Trusted by UK founders
            </p>
          </Container>
          <div className="mt-6 lg:mx-auto lg:max-w-[1100px] lg:px-8">
            <LogoStrip />
          </div>
        </section>

        {/* 3. Where we help */}
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading>Where we help</SectionHeading>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.6] text-ink-soft md:text-[18px]">
              We sit down with you before the year starts and plan it with you, so the decisions
              that set your tax bill are made on purpose.
            </p>

            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

        {/* 4b. Results */}
        <section className="pt-20 md:pt-28">
          <Container>
            <SectionHeading>The bigger results follow</SectionHeading>
            <ul className="mt-12 grid gap-4 md:grid-cols-2">
              {results.map((r) => (
                <li
                  key={r.name}
                  className="flex flex-col gap-5 rounded-[20px] border border-hairline bg-white p-6 sm:flex-row sm:items-start md:p-8"
                >
                  <Avatar name={r.name} photo={r.photo} size={64} />
                  <div>
                    <p className="text-[18px] font-semibold leading-[1.45] text-navy md:text-[19px]">{r.stat}</p>
                    <p className="mt-3 text-[14px] text-ink-soft">
                      <span className="font-bold text-navy">{r.name}</span>, {r.company}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* 5. What clients say */}
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading>What clients say</SectionHeading>
            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <li key={t.name} className="rounded-[20px] border border-hairline bg-white p-6 md:p-7">
                  <figure className="flex h-full flex-col">
                    <blockquote className="flex-1 text-[16px] leading-[1.6] text-ink">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                      <Avatar name={t.name} photo={t.photo} size={44} />
                      <span>
                        <span className="block text-[15px] font-bold text-navy">{t.name}</span>
                        <span className="block text-[13px] text-ink-soft">{t.role}</span>
                      </span>
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
          <p>
            This website and its content are for informational purposes only and do not constitute
            regulated financial or legal advice. No guarantees of specific outcomes or results are
            made. Any reference to potential improvements or results is illustrative only and will
            vary by business.
          </p>
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
