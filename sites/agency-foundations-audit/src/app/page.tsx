"use client";

import Image from "next/image";
import Script from "next/script";

// Dedicated Agency Foundations Review booking event, embedded inline below.
const BOOKING_URL =
  "https://calendly.com/sidekick-accounting/agency-foundations-review?hide_event_type_details=1&hide_gdpr_banner=1";

// Featured client wins - traditional testimonial quotes (verbatim from
// sidekickaccounting.co.uk/client-wins + the VSL script). First item is featured.
const wins = [
  {
    quote:
      "We've always got the information we need to make decisions quickly. We've saved £10k in taxes since working with Sidekick. They're not your usual accountant.",
    name: "Oliver L",
    role: "CEO, Authority Agency",
    photo: "/clients/OLIVER.png",
    result: "£10K saved in tax",
  },
  {
    quote:
      "Rayhaan is brilliant. Highly responsive and up for tackling complex challenges. I feel confident in our numbers with his expertise at hand.",
    name: "Oren G",
    role: "Managing Director, Kurve",
    photo: "/clients/Oren.jpeg",
  },
  {
    quote:
      "They take the stress out of taxes, and deal with it all in a professional and timely manner.",
    name: "Lauren H",
    role: "Founder, LBHPT",
  },
  {
    quote:
      "Everybody wants clarity. My stress levels have decreased and I'm able to operate at a higher level, the biz is performing much better as a result.",
    name: "Phaibion R",
    role: "CEO, Royal Energy",
    photo: "/clients/Phaibion.jpg",
  },
];

const testimonials = [
  {
    quote:
      "The support received has been invaluable for the business. Rayhaan has helped us to build a robust financial plan which has unlocked new revenue sources.",
    name: "Lewis Baxter",
    role: "COO, Kurogo",
    photo: "/clients/Lewis.jpg",
  },
  {
    quote:
      "Before working with them I never knew how much I was actually making or what my margins were. If you really want to scale your agency you need to make decisions based on data, and Rayhaan and the team make that easy whilst guiding us on the best path forward.",
    name: "Sam Winsbury",
    role: "Founder, Kurogo",
    photo: "/clients/SAM.jpeg",
  },
  {
    quote:
      "Thoroughly enjoy working with Rayhaan. He's been a game-changer for my business.",
    name: "Sam Saifi",
    role: "Founder, Revenue Labz",
    photo: "/clients/sam-saif.webp",
  },
  {
    quote:
      "I cannot recommend Sidekick enough. They have helped me understand my numbers and save taxes.",
    name: "Anonymous",
    role: "CEO, SMMA",
  },
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

// The three things the Agency Foundations Review measures against (from the VSL).
const pillars = [
  {
    title: "Clean foundations",
    body: "Up-to-date books, VAT, payroll and compliance, with nothing ever late.",
    status: "Most agencies: about three-quarters built",
  },
  {
    title: "An agency-specific setup",
    body: "Your books built the way an agency actually works, so retainers, project margin, pass-through media and freelancers all sit where they should.",
    status: "Most agencies: not in place at all",
  },
  {
    title: "Proactive tax planning",
    body: "Knowing your tax bill before year end, taking money out tax-efficiently, and claiming what you're owed so you're never caught out.",
    status: "Most agencies: never had it on the table",
  },
];

// Growth proof - what follows once the foundations are solid (VSL close).
const results = [
  {
    name: "Usman",
    company: "Guided Growth",
    photo: "/clients/USMAN.webp",
    stat: "+$200K monthly revenue at a 77.25% net margin, around $154K a month in extra cash in the bank.",
  },
  {
    name: "Andreas",
    company: "Be Creative",
    photo: "/clients/ANDREAS.png",
    stat: "£250K+ of new bottom-line profit this year, with +21% revenue and +12% margin expansion.",
  },
];

function CTAButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const base =
    "inline-block rounded-md px-10 py-[18px] text-[15px] font-bold uppercase tracking-wider transition-colors cursor-pointer max-sm:px-7 max-sm:text-[13px]";
  const variants = {
    primary:
      "bg-sk-coral text-white border-2 border-sk-coral hover:bg-white hover:text-sk-navy hover:border-white",
    outline:
      "bg-transparent text-sk-navy border-2 border-sk-navy hover:bg-sk-navy hover:text-white",
  };
  return (
    <a
      href="#book"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
      }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

// Light, traditional testimonial card (white card, navy text) with an optional
// result chip. Used for the featured "Client wins" band.
function WinCard({
  win,
  featured = false,
}: {
  win: (typeof wins)[number];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-sk-navy/10 bg-white shadow-lg ${featured ? "px-10 py-9 max-sm:px-6 max-sm:py-7" : "px-7 py-7"}`}
    >
      {/* Decorative opening quote mark */}
      <span
        className={`absolute font-extrabold leading-none text-sk-coral/15 ${featured ? "top-3 left-5 text-[150px] max-sm:text-[100px]" : "top-1 left-3 text-[90px] max-sm:text-[72px]"}`}
      >
        &quot;
      </span>

      <div className="relative flex flex-1 flex-col">
        {win.result && (
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-sk-mint/25 px-3.5 py-1.5 text-[13px] font-bold text-sk-navy">
            <span className="text-sk-navy">✓</span>
            {win.result}
          </span>
        )}

        <p
          className={`mb-6 flex-1 leading-relaxed text-sk-navy/90 ${featured ? "text-[24px] font-medium max-sm:text-lg" : "text-[17px] max-sm:text-[15px]"}`}
        >
          {win.quote}
        </p>

        <div className="flex items-center gap-3 mt-auto">
          {win.photo ? (
            <Image
              src={win.photo}
              alt={win.name}
              width={56}
              height={56}
              className={`shrink-0 rounded-full border-2 border-sk-navy/10 object-cover ${featured ? "h-14 w-14" : "h-11 w-11"}`}
            />
          ) : (
            <div
              className={`flex shrink-0 items-center justify-center rounded-full bg-sk-coral font-bold text-white ${featured ? "h-14 w-14 text-xl" : "h-11 w-11 text-base"}`}
            >
              {win.name.charAt(0)}
            </div>
          )}
          <div>
            <div
              className={`font-bold text-sk-navy ${featured ? "text-[17px]" : "text-[15px]"}`}
            >
              {win.name}
            </div>
            <div className="text-[13px] text-sk-navy/50">{win.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        &quot;
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
      {/* Calendly inline widget assets */}
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      {/* Hero */}
      <section
        className="px-5 pb-20 pt-15 text-center"
        style={{
          background:
            "linear-gradient(0deg, #eee8e8 0%, #ffcecd 25%, #0e2d48 54%)",
        }}
      >
        <div className="mx-auto max-w-[1170px]">
          <div className="mb-10 flex justify-center">
            <Image
              src="/sidekick-logo-white.png"
              alt="Sidekick Accounting"
              width={200}
              height={48}
              priority
            />
          </div>

          <h1 className="mx-auto mb-5 max-w-[900px] text-[42px] font-extrabold leading-[1.15] text-white max-sm:text-[26px]">
            Your agency is profitable, but the corporation tax bill always lands bigger than you expected.
          </h1>
          <p className="mx-auto mb-3 max-w-[720px] text-lg leading-relaxed text-sk-text max-sm:text-sm">
            And the cash to cover it never seems ready. Watch this 2 minute 40 second video to fix it.
          </p>
          <div className="mx-auto mb-10 max-w-[800px] rounded-[10px] bg-sk-navy-dark p-2.5">
            {/* Agency Foundations Review VSL */}
            <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
            <Script src="https://fast.wistia.com/embed/9teqqcn04w.js" strategy="lazyOnload" />
            <div
              className="w-full rounded-md overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: `
                  <style>wistia-player[media-id='9teqqcn04w']:not(:defined){background:center/contain no-repeat url('https://fast.wistia.com/embed/medias/9teqqcn04w/swatch');display:block;filter:blur(5px);padding-top:56.25%}</style>
                  <wistia-player media-id="9teqqcn04w" aspect="1.7777777777777777"></wistia-player>
                `,
              }}
            />
          </div>

          <CTAButton>Book your Agency Foundations Review</CTAButton>
        </div>
      </section>

      {/* Problem - why a generalist accountant leaves tax on the table */}
      <section className="bg-sk-navy px-5 py-20 max-sm:py-14">
        <div className="mx-auto max-w-[920px]">
          <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-[3px] text-sk-coral">
            Why this keeps happening
          </p>
          <h2 className="mb-6 text-center text-[32px] font-extrabold leading-[1.15] text-white max-sm:text-2xl">
            Your accountant keeps you compliant. Lowering your tax was never their job.
          </h2>
          <p className="mx-auto mb-12 max-w-[760px] text-center text-[17px] leading-relaxed text-sk-text max-sm:text-[15px]">
            You&apos;ve got an accountant, you&apos;re on Xero or QuickBooks, your VAT is
            filed on time and your year-end accounts go in. And yet you still don&apos;t
            fully trust your numbers, you&apos;re still chasing for answers, and you still
            feel like you&apos;re overpaying tax. There is a structural reason for that.
          </p>
          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            <div className="rounded-2xl border border-sk-border bg-sk-navy-dark px-7 py-8">
              <h3 className="mb-3 text-[19px] font-bold text-white">
                Generalists don&apos;t speak agency
              </h3>
              <p className="text-[15px] leading-relaxed text-sk-muted">
                On most accountants&apos; books your agency sits next to a builder, a cafe
                and a salon owner. They&apos;ll keep you compliant, but they don&apos;t
                understand retainers, project margin, pass-through media or freelancers. So
                your accounts end up accurate and useless at the same time.
              </p>
            </div>
            <div className="rounded-2xl border border-sk-border bg-sk-navy-dark px-7 py-8">
              <h3 className="mb-3 text-[19px] font-bold text-white">
                Traditional accounting only looks backwards
              </h3>
              <p className="text-[15px] leading-relaxed text-sk-muted">
                It records what&apos;s already happened so you can file. Nobody is looking
                forwards: planning your tax before year end, getting your salary and
                dividend mix right, or claiming everything you&apos;re owed. That is a
                different job, and it&apos;s the one almost no agency has.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The three things - Agency Foundations Review framework */}
      <section className="bg-sk-grey px-5 py-20 max-sm:py-14">
        <div className="mx-auto max-w-[1170px]">
          <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-[3px] text-sk-coral">
            What the review covers
          </p>
          <h2 className="mb-4 text-center text-[32px] font-extrabold leading-[1.15] text-sk-navy max-sm:text-2xl">
            Every agency needs three things right
          </h2>
          <p className="mx-auto mb-14 max-w-[680px] text-center text-[15px] leading-relaxed text-sk-navy/60">
            The Agency Foundations Review is a structured look at your accounting and tax
            against these three. Most agencies are strong on the first and have never had
            the other two on the table.
          </p>

          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="flex h-full flex-col rounded-2xl border border-sk-navy/10 bg-white px-8 py-9 shadow-sm"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-sk-navy text-[17px] font-extrabold text-white">
                  {i + 1}
                </div>
                <h3 className="mb-3 text-[20px] font-bold text-sk-navy">
                  {pillar.title}
                </h3>
                <p className="mb-6 flex-1 text-[15px] leading-relaxed text-sk-navy/70">
                  {pillar.body}
                </p>
                <span className="inline-flex w-fit items-center rounded-full bg-sk-coral/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-sk-coral">
                  {pillar.status}
                </span>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-[760px] text-center text-[17px] font-medium leading-relaxed text-sk-navy max-sm:text-[15px]">
            When these are missing, tax becomes an event you react to instead of a decision
            you make, and the bill creeps up every year as you grow. Done right, tax stops
            being stressful.
          </p>
        </div>
      </section>

      {/* Founder credibility */}
      <section className="bg-sk-navy-dark px-5 py-20 max-sm:py-14">
        <div className="mx-auto max-w-[920px]">
          <div className="rounded-2xl border border-sk-border bg-sk-navy px-10 py-10 max-sm:px-6 max-sm:py-8">
            <p className="mb-6 text-[13px] font-bold uppercase tracking-[3px] text-sk-coral">
              Who runs your review
            </p>
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sk-coral text-2xl font-extrabold text-white">
                R
              </div>
              <div>
                <h2 className="mb-1 text-[24px] font-extrabold leading-tight text-white max-sm:text-[20px]">
                  Rayhaan, Founder
                </h2>
                <p className="text-[14px] font-semibold text-sk-muted">
                  Chartered accountant, Sidekick Accounting
                </p>
              </div>
            </div>
            <p className="mt-7 text-[17px] leading-relaxed text-sk-text max-sm:text-[15px]">
              I trained in the Big Four, ran finance for HSBC on a £50m project, and led a
              £10m digital transformation at a London bank. Today I run an accounting and
              tax firm built only for agencies doing between £20k and £500k a month. There
              is no pitch. It&apos;s the same structured review I&apos;d run before taking
              on any agency.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                "Chartered accountant",
                "Big Four trained",
                "£50m HSBC project",
                "£10m bank transformation",
                "Agencies £20k-£500k / mo",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-sk-border bg-sk-navy-dark px-3.5 py-1.5 text-[13px] font-semibold text-sk-text"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats + Logos */}
      <section className="bg-sk-grey px-5 py-20 max-sm:py-14">
        <div className="mx-auto max-w-[1170px]">
          <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-[3px] text-sk-coral">
            Track record
          </p>
          <h2 className="mb-14 text-center text-[32px] font-extrabold leading-[1.15] text-sk-navy max-sm:text-2xl">
            Built only for agencies
          </h2>

          <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1 max-sm:gap-4">
            <div className="rounded-2xl border border-sk-navy/10 bg-white px-8 py-10 text-center shadow-sm max-sm:px-6 max-sm:py-7">
              <div className="text-[56px] font-extrabold leading-none text-sk-navy max-sm:text-[44px]">
                50+
              </div>
              <div className="mt-3 text-[15px] font-semibold text-sk-navy/50">
                Agencies helped
              </div>
            </div>
            <div className="rounded-2xl border border-sk-navy/10 bg-white px-8 py-10 text-center shadow-sm max-sm:px-6 max-sm:py-7">
              <div className="text-[56px] font-extrabold leading-none text-sk-coral max-sm:text-[44px]">
                95%
              </div>
              <div className="mt-3 text-[15px] font-semibold text-sk-navy/50">
                Of UK firms overpay tax
              </div>
            </div>
            <div className="rounded-2xl border border-sk-navy/10 bg-white px-8 py-10 text-center shadow-sm max-sm:px-6 max-sm:py-7">
              <div className="text-[56px] font-extrabold leading-none text-sk-navy max-sm:text-[44px]">
                6 yrs
              </div>
              <div className="mt-3 text-[15px] font-semibold text-sk-navy/50">
                Specialising in agencies
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 flex max-w-[1000px] flex-wrap items-center justify-center gap-x-10 gap-y-5 max-sm:mt-10 max-sm:gap-x-8 max-sm:gap-y-7">
            {logos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={40}
                className="h-9 w-auto object-contain opacity-50 max-sm:h-5"
                style={{ filter: "brightness(0) saturate(100%) invert(14%) sepia(30%) saturate(1000%) hue-rotate(175deg) brightness(95%)" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Client wins - featured testimonials */}
      <section className="bg-sk-navy-dark px-5 py-15 max-sm:py-12">
        <div className="mx-auto max-w-[1170px]">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[2px] text-sk-coral">
            Client wins
          </p>
          <h2 className="mb-4 text-center text-[32px] font-extrabold leading-[1.15] text-white max-sm:text-2xl">
            Straight from the founders
          </h2>
          <p className="mx-auto mb-12 max-w-[620px] text-center text-[15px] text-sk-muted">
            What changes once an agency has books it can trust, and someone
            planning the tax ahead.
          </p>

          {/* Featured win */}
          <div className="mb-6">
            <WinCard win={wins[0]} featured />
          </div>

          {/* Supporting wins */}
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {wins.slice(1).map((w) => (
              <WinCard key={w.name} win={w} />
            ))}
          </div>
        </div>
      </section>

      {/* Once foundations are solid - growth proof */}
      <section className="bg-sk-grey px-5 py-20 max-sm:py-14">
        <div className="mx-auto max-w-[1170px]">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[2px] text-sk-coral">
            And once the foundations are solid
          </p>
          <h2 className="mb-4 text-center text-[32px] font-extrabold leading-[1.15] text-sk-navy max-sm:text-2xl">
            The bigger results follow
          </h2>
          <p className="mx-auto mb-12 max-w-[640px] text-center text-[15px] leading-relaxed text-sk-navy/60">
            Clean books and forward planning are not the finish line. They are what makes
            real growth possible. None of it starts with clever tax tricks. It starts with
            clean foundations and looking forwards.
          </p>

          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            {results.map((r) => (
              <div
                key={r.name}
                className="flex items-start gap-5 rounded-2xl border border-sk-navy/10 bg-white px-8 py-8 shadow-sm max-sm:flex-col"
              >
                <Image
                  src={r.photo}
                  alt={r.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-full border-2 border-sk-navy/10 object-cover"
                />
                <div>
                  <p className="mb-3 text-[18px] font-bold leading-snug text-sk-navy max-sm:text-[16px]">
                    {r.stat}
                  </p>
                  <div className="text-[14px] font-semibold text-sk-navy/50">
                    {r.name}, {r.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sk-navy px-5 py-15 max-sm:py-12">
        <div className="mx-auto max-w-[1170px]">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[2px] text-sk-coral">
            Why our clients love us
          </p>
          <h2 className="mb-12 text-center text-[32px] font-extrabold leading-[1.15] text-white max-sm:text-2xl">
            In their words
          </h2>

          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        className="px-5 py-20 max-sm:py-14 text-center"
        style={{
          background:
            "linear-gradient(0deg, #eee8e8 0%, #ffcecd 12%, #ffcecd 90%, #0e2d48 100%)",
        }}
      >
        <div className="mx-auto max-w-[1170px]">
          <p className="mx-auto mb-9 max-w-[700px] text-[28px] font-extrabold leading-snug text-sk-navy max-sm:text-[22px]">
            These are just a few of the agency founders we&apos;ve worked with.
            Want to know exactly where your accounts and tax setup is costing
            you?
          </p>
          <CTAButton variant="outline">
            Book your Agency Foundations Review
          </CTAButton>
          <p className="mt-4 text-sm text-sk-navy/60">
            45 minutes. No pitch. You&apos;ll leave knowing what&apos;s solid,
            what&apos;s missing, and where you&apos;re likely overpaying HMRC.
          </p>
        </div>
      </section>

      {/* Booking - dedicated Agency Foundations Review calendar (inline Calendly) */}
      <section id="book" className="scroll-mt-8 bg-sk-grey px-5 py-20 max-sm:py-14">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="mb-3 text-center text-[32px] font-extrabold leading-[1.15] text-sk-navy max-sm:text-2xl">
            Book your Agency Foundations Review
          </h2>
          <p className="mx-auto mb-10 max-w-[620px] text-center text-[15px] leading-relaxed text-sk-navy/60">
            Pick a time that works. 45 minutes, no pitch. You&apos;ll leave knowing
            what&apos;s solid, what&apos;s missing, and where you&apos;re likely overpaying
            HMRC.
          </p>
          <div
            className="calendly-inline-widget mx-auto overflow-hidden rounded-2xl border border-sk-navy/10 bg-white shadow-sm"
            data-url={BOOKING_URL}
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sk-navy-dark px-5 py-8 text-center">
        <p className="mx-auto max-w-[800px] text-xs leading-[1.8] text-sk-muted">
          Sidekick Accounting Ltd. This website and its content are for
          informational purposes only and do not constitute regulated financial
          or legal advice. All content, frameworks, and diagnostic tools
          presented on this website, including the Agency Foundations
          Review&trade;, are the intellectual property of Sidekick Accounting Ltd
          and may not be copied, reproduced, or distributed without written
          permission. The information provided is for general informational
          purposes only and does not constitute legal, financial, or regulated
          business advice. No guarantees of specific outcomes or results are
          made. Any reference to potential improvements, performance, or return
          is illustrative only and will vary by business.
        </p>
      </footer>
    </>
  );
}
