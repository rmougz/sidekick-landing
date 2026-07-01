# Conversion — the one action every asset routes to

Every Sidekick lead magnet points to a single conversion action. Do not dilute it
with newsletter signups, social follows, or secondary CTAs.

## The conversion action

**Book the Agency Profit Audit** — a free 45-minute diagnostic call.

- **Booking URL (Calendly):** `https://calendly.com/sidekick-accounting/sidekickcfodiscovery`
- **Implementation on the existing landing:** Calendly popup widget (loads
  `widget.css` + `widget.js`, opens via `window.Calendly.initPopupWidget({ url })`).
  Standalone HTML lead magnets can either open the same popup or link directly to
  the Calendly URL.
- **Positioning copy:** "45 minutes. No pitch. You'll leave with a clear financial
  picture of your business."
- **Primary CTA label:** "Book your Agency Profit Audit".

## Post-conversion

- Thank-you page exists in the landing app at `/thank-you` ("You're booked in.").

## UTM convention (tag every CTA by position)

The lead-magnet-creator skill wires 4+ CTA positions plus the quiz result. Tag
each so we can see which position converts. Pattern:

```
?utm_source=lead-magnet&utm_medium=<asset-slug>&utm_campaign=<asset-slug>&utm_content=<position>
```

- `utm_medium` / `utm_campaign` = the lead magnet's slug (e.g. `agency-profit-blueprint`).
- `utm_content` = position: `hero`, `mid`, `quiz-result`, `closing`, `nav`.

> Note: Calendly preserves UTM params when appended to the booking URL, so tag the
> link/popup URL per position.

## Analytics

- **GA4 measurement ID:** `G-CD60YKH4S1` (used on the landing via
  `@next/third-parties`). Reuse on new assets for unified reporting.

See [[icp]] for who we're routing, [[voice-and-tone]] for CTA copy style.
