// FAQ copy shared between the landing page and the pre-call watch pages.
//
// The three questions that appear in both places are declared once and
// referenced from both lists, so editing an answer here updates it everywhere
// it is published. The remaining questions are exclusive to one surface: the
// landing keeps the ones that sell the offer, the watch pages keep the ones
// about the call itself (the rest is covered by the videos on those pages).

export type Faq = { q: string; a: string };

const whatHappensOnTheCall: Faq = {
  q: "What actually happens on the call?",
  a: "45 minutes. No pitch. We go through your numbers and you leave with a clear financial picture of your business and where profit is leaking. If it makes sense to go further, we'll show you what that looks like. Either way, you keep the findings.",
};

const alreadyHaveAnAccountant: Faq = {
  q: "We already have an accountant. Why would we need this?",
  a: "Your accountant looks backwards: compliance, tax, year-end. This is the forward-looking financial layer: client-level profitability, a rolling cash forecast, capacity planning and pricing decisions. Different job. The two work side by side.",
};

// "every result on this page" holds on both surfaces: the watch pages render
// the same ResultsSection scoreboard as the landing.
const qualifiedForUsAgencies: Faq = {
  q: "Are you qualified to work with US agencies?",
  a: "The team are all ACA-qualified chartered accountants, the UK equivalent of a CPA, led by a founder with an EY and banking background. Our clients span the US and the UK, and every result on this page is quoted in the currency the client earns in.",
};

export const landingFaqs: Faq[] = [
  alreadyHaveAnAccountant,
  {
    q: "How is this different from a fractional CFO we've tried before?",
    a: "Most fractional CFOs give advice and leave the work with you. We install financial infrastructure you own: the reporting structure, the forecast, the monthly management pack and the decision rhythm around them. And it's a team of qualified accountants, not one person spread across ten clients.",
  },
  {
    q: "We're not planning to sell. Is this still relevant?",
    a: "Yes. The same infrastructure that makes an agency buyer-ready is what makes it calm to run: clear margins, predictable cash, decisions made on data instead of gut feel. If you do sell one day, it's already built.",
  },
  {
    q: "Who is this for?",
    a: "Founder-led agencies and consultancies doing $1M+ in revenue. That's where the offer is built to bite: enough complexity that visibility pays for itself many times over.",
  },
  qualifiedForUsAgencies,
  whatHappensOnTheCall,
];

export const watchFaqs: Faq[] = [
  whatHappensOnTheCall,
  alreadyHaveAnAccountant,
  qualifiedForUsAgencies,
  {
    q: "Do I need to prepare anything?",
    a: "No. Come with the honest version of where the numbers are. That's the whole prep.",
  },
  {
    q: "Who should be on the call?",
    a: "Whoever makes the decision with you. If there's a co-founder or a partner involved, get them on the call rather than repeating it later.",
  },
];
