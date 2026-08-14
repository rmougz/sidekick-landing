import CTAButton from "./cta-button";

// "What happens next" — a friction-reducer that sits directly under the hero
// CTA so the reader knows what clicking it does before they scroll into proof.
//
// Deliberately quiet: no cards, borders or colour blocks, so it does not
// compete with the VSL above it or the results scoreboard below. It renders on
// the pale end of the hero gradient, hence navy type rather than white.
const steps = [
  { title: "Apply.", body: "A few questions about your agency. Two minutes." },
  { title: "Pick a time.", body: "Choose a slot on the next screen." },
  {
    title: "The call.",
    body: "45 minutes with Rayhaan. No pitch. You leave with a clear picture of where profit is leaking.",
  },
];

export default function NextSteps() {
  return (
    <div className="mx-auto mt-12 max-w-[900px]">
      <ol className="grid grid-cols-3 gap-8 text-left max-md:grid-cols-1 max-md:gap-5">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-3">
            {/* Ordinal is decorative: the <ol> already conveys sequence. */}
            <span
              aria-hidden
              className="text-[15px] font-extrabold leading-6 text-sk-navy/55"
            >
              {i + 1}
            </span>
            <div>
              <p className="text-[15px] font-bold leading-6 text-sk-navy">
                {step.title}
              </p>
              <p className="mt-1 text-[14px] leading-relaxed text-sk-navy/70">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <CTAButton>Book your Agency Profit Audit</CTAButton>
      </div>
    </div>
  );
}
