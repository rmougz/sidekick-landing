import type { Faq } from "@/lib/faqs";

// The landing page's FAQ accordion, extracted so the pre-call watch pages use
// the identical component rather than a copy. Markup is unchanged from the
// original inline version on the landing.
//
// Only the list is owned here. The section wrapper, eyebrow and heading stay
// with the caller, because the landing sits this on a light band while the
// watch pages sit it on the dark page background.
//
// Padding sits on the summary rather than the details so the whole visible row
// is the tap target. With it on the details, only the text line toggled, which
// is a 24px target on single-line questions.
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <details
          key={faq.q}
          className="group rounded-xl border border-sk-navy/10 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[17px] font-bold text-sk-navy [&::-webkit-details-marker]:hidden max-sm:text-[15px]">
            {faq.q}
            <span className="text-2xl leading-none text-sk-coral-dark transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="px-6 pb-5 text-[15px] leading-relaxed text-sk-navy/75">
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  );
}
