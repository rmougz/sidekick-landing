import Image from "next/image";

// The landing page's "Results at a glance" scorecard section, extracted so the
// pre-call watch pages can reuse it verbatim. Rendered by src/app/page.tsx and
// src/components/watch-content.tsx — keep markup identical to the landing.

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
                <span
                  aria-hidden
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sk-mint/20 text-[10px] font-bold text-sk-navy"
                >
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

export default function ResultsSection() {
  return (
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
  );
}
