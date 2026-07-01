"use client";

import Image from "next/image";
import Script from "next/script";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const caseStudies = [
  {
    title:
      "Usman added $200K of monthly revenue at a 77% net margin — that's an extra $154K/month in his bank account.",
    before: [
      "No visibility on client-level profitability",
      "Decisions made on gut feel",
      "Revenue growing, profit unclear",
    ],
    after: [
      "+$200K monthly revenue",
      "77.25% net profit margin",
      "$154K/month of extra cash in the bank",
    ],
  },
  {
    title:
      "Paul grew net margin by 26.72% in 12 months — with the same team, same clients, same revenue base.",
    before: [
      "Profitable on paper, cash always tight",
      "No pod-level margin tracking",
      "Financial foundations half-built",
    ],
    after: [
      "Net margin up 26.72% in 12 months",
      "Clear visibility on cost-to-serve",
      "Pricing restructured on real data",
    ],
  },
  {
    title:
      "Andreas added over £250K of new profit to the bottom line this year — 21% revenue growth with 12% margin expansion.",
    before: [
      "Scaling revenue without scaling profit",
      "Hiring on panic, not capacity plans",
      "No forward-looking financial layer",
    ],
    after: [
      "+21% revenue, +12% net margin",
      "£250K+ of new profit this year",
      "Hiring against real capacity data",
    ],
  },
];

const scorecards = [
  {
    name: "Usman",
    company: "Guided Growth",
    photo: "/clients/USMAN.webp",
    stats: [
      { label: "Revenue added", value: "+$200K" },
      { label: "Net margin", value: "77.25%" },
      { label: "Extra cash/mo", value: "$154K" },
    ],
    intangibles: [
      "Group level P&L",
      "Finance team trained",
      "Automated systems",
    ],
  },
  {
    name: "Sam Winsbury",
    company: "Kurogo",
    photo: "/clients/SAM.jpeg",
    stats: [
      { label: "Revenue growth", value: "+100%" },
      { label: "Net margin growth", value: "+25%" },
    ],
    intangibles: [
      "Pod level profitability",
      "Pricing optimised",
      "Financial modelling",
    ],
  },
  {
    name: "Andreas",
    company: "Be Creative",
    photo: "/clients/ANDREAS.png",
    stats: [
      { label: "New profit added", value: "£250K+" },
      { label: "Revenue growth", value: "+21%" },
      { label: "Margin expansion", value: "+12%" },
    ],
    intangibles: [
      "Financial modelling",
      "Proactive decision making",
      "Scalable infrastructure",
    ],
  },
  {
    name: "Paul",
    company: "Literal Humans",
    photo: "/clients/PAUL.png",
    stats: [
      { label: "Net margin growth", value: "+26.72%" },
    ],
    intangibles: [
      "Real time cash forecast",
      "Client level profitability",
      "Funding secured",
    ],
  },
  {
    name: "Tobi",
    company: "Everboost",
    photo: "/clients/TOBI.jpg",
    stats: [
      { label: "Revenue growth", value: "+63%" },
      { label: "Net margin growth", value: "+14.48%" },
    ],
    intangibles: [
      "Monthly P&L review",
      "Competitor benchmarking",
      "Systems set up",
    ],
  },
  {
    name: "Milimo",
    company: "Tap In Media",
    photo: "/clients/MILS.png",
    stats: [{ label: "Outcome", value: "Exited" }],
    intangibles: [
      "Financial infrastructure built",
      "Strategic layer in place",
      "Business optimised for exit",
    ],
  },
  {
    name: "Oliver Duffy Lee",
    company: "Authority Agency",
    photo: "/clients/OLIVER.png",
    stats: [{ label: "Outcome", value: "Exited" }],
    intangibles: [
      "All three financial layers complete",
      "Ops linkage established",
      "Buyer-ready business valuation",
    ],
  },
];

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
      href=""
      onClick={(e) => {
        e.preventDefault();
        window.Calendly?.initPopupWidget({ url: "https://calendly.com/sidekick-accounting/sidekickcfodiscovery" });
      }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

function CaseStudyCard({
  study,
}: {
  study: (typeof caseStudies)[number];
}) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-sk-navy-dark">
      <div className="border-b-2 border-sk-coral bg-sk-navy px-7 py-5 text-xl font-bold leading-snug text-white max-sm:text-[17px]">
        {study.title}
      </div>
      <div className="grid grid-cols-2 max-sm:grid-cols-1">
        <div className="border-r border-sk-border px-7 py-6 max-sm:border-b max-sm:border-r-0">
          <p className="mb-4 text-xs font-bold uppercase tracking-[2px] text-sk-coral">
            Before
          </p>
          <ul className="space-y-1">
            {study.before.map((item) => (
              <li
                key={item}
                className="relative pl-6 text-[15px] leading-8 text-sk-text"
              >
                <span className="absolute left-0 font-bold text-sk-coral">
                  ✗
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-7 py-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[2px] text-sk-mint">
            After
          </p>
          <ul className="space-y-1">
            {study.after.map((item) => (
              <li
                key={item}
                className="relative pl-6 text-[15px] leading-8 text-sk-text"
              >
                <span className="absolute left-0 font-bold text-sk-mint">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ScorecardItem({
  scorecard,
  wide = false,
}: {
  scorecard: (typeof scorecards)[number];
  wide?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-[3px] border-sk-navy bg-white shadow-lg">
      {/* Person header — photo + name + company on light bg */}
      <div className="flex items-center gap-4 border-b border-sk-grey bg-sk-grey/60 px-6 py-5">
        <Image
          src={scorecard.photo}
          alt={scorecard.name}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full border-[3px] border-sk-navy object-cover"
        />
        <div className="min-w-0">
          <div className="text-xl font-extrabold text-sk-navy truncate">
            {scorecard.name}
          </div>
          <div className="text-sm font-medium text-sk-navy/50">
            {scorecard.company}
          </div>
        </div>
      </div>

      <div className={wide ? "grid grid-cols-2 max-md:grid-cols-1" : ""}>
        {/* Stats row */}
        <div className={`px-6 pt-6 pb-2 ${wide ? "border-r border-sk-grey max-md:border-r-0 max-md:border-b" : ""}`}>
          <p className="mb-5 text-[13px] font-bold uppercase tracking-[3px] text-sk-coral">
            Key results
          </p>
          <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-2">
            {scorecard.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-[30px] font-extrabold leading-none text-sk-navy max-sm:text-[24px]">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-[13px] font-medium text-sk-navy/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intangible benefits */}
        <div className={`px-6 pb-6 ${wide ? "pt-6" : ""}`}>
          {!wide && <div className="my-4 h-px bg-sk-grey" />}
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[3px] text-sk-mint">
            What changed
          </p>
          <ul className={wide ? "grid grid-cols-3 gap-3 max-md:grid-cols-1 max-md:space-y-0" : "space-y-3"}>
            {scorecard.intangibles.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[15px] leading-snug text-sk-navy/75"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sk-mint/20 text-[10px] font-bold text-sk-navy">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
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
      {/* Calendly popup widget */}
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
            The average agency we work with improves margins by 19.5% — without adding a single new client.
          </h1>
          <p className="mx-auto mb-3 max-w-[700px] text-lg leading-relaxed text-sk-text max-sm:text-sm">
            See how in a free 45-minute Agency Profit Audit.
          </p>
          <div className="mx-auto mb-10 max-w-[800px] rounded-[10px] bg-sk-navy-dark p-2.5">
            <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
            <Script src="https://fast.wistia.com/embed/hfdiorpng4.js" strategy="lazyOnload" />
            <div
              className="w-full rounded-md overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: `
                  <style>wistia-player[media-id='hfdiorpng4']:not(:defined){background:center/contain no-repeat url('https://fast.wistia.com/embed/medias/hfdiorpng4/swatch');display:block;filter:blur(5px);padding-top:56.25%}</style>
                  <wistia-player media-id="hfdiorpng4" aspect="1.7777777777777777"></wistia-player>
                `,
              }}
            />
          </div>

          <CTAButton>Book your Agency Profit Audit</CTAButton>
        </div>
      </section>

      {/* Stats + Logos */}
      <section className="bg-sk-grey px-5 py-20">
        <div className="mx-auto max-w-[1170px]">
          <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-[3px] text-sk-coral">
            Track record
          </p>
          <h2 className="mb-14 text-center text-[32px] font-extrabold leading-[1.15] text-sk-navy max-sm:text-2xl">
            Built on real agency results
          </h2>

          <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1">
            <div className="rounded-2xl border border-sk-navy/10 bg-white px-8 py-10 text-center shadow-sm">
              <div className="text-[56px] font-extrabold leading-none text-sk-navy max-sm:text-[44px]">
                50+
              </div>
              <div className="mt-3 text-[15px] font-semibold text-sk-navy/50">
                Agencies helped
              </div>
            </div>
            <div className="rounded-2xl border border-sk-navy/10 bg-white px-8 py-10 text-center shadow-sm">
              <div className="text-[56px] font-extrabold leading-none text-sk-coral max-sm:text-[44px]">
                +19.5%
              </div>
              <div className="mt-3 text-[15px] font-semibold text-sk-navy/50">
                Avg. margin improvement
              </div>
            </div>
            <div className="rounded-2xl border border-sk-navy/10 bg-white px-8 py-10 text-center shadow-sm">
              <div className="text-[56px] font-extrabold leading-none text-sk-navy max-sm:text-[44px]">
                6 yrs
              </div>
              <div className="mt-3 text-[15px] font-semibold text-sk-navy/50">
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
      <section className="bg-sk-navy-dark px-5 py-15">
        <div className="mx-auto max-w-[1170px]">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[2px] text-sk-coral">
            The scoreboard
          </p>
          <h2 className="mb-4 text-center text-[32px] font-extrabold leading-[1.15] text-white max-sm:text-2xl">
            Results at a glance
          </h2>
          <p className="mx-auto mb-12 max-w-[600px] text-center text-[15px] text-sk-muted">
            The results speak for themselves. Here&apos;s what changed when we
            built the financial layer underneath.
          </p>

          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {scorecards.map((sc, i) => (
              <div key={sc.name} className={i === 0 ? "col-span-2 max-md:col-span-1" : ""}>
                <ScorecardItem scorecard={sc} wide={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <footer className="bg-sk-navy-dark px-5 py-8 text-center">
        <p className="mx-auto max-w-[800px] text-xs leading-[1.8] text-sk-muted">
          Sidekick Accounting Ltd. This website and its content are for
          informational purposes only and do not constitute regulated financial
          or legal advice. All content, frameworks, and diagnostic tools
          presented on this website&mdash;including the Agency Profit
          Audit&trade;&mdash;are the intellectual property of Sidekick Accounting
          Ltd and may not be copied, reproduced, or distributed without written
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
