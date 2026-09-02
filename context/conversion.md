# Conversion — the one action every asset routes to

Every Sidekick lead magnet points to a single conversion action. Do not dilute it
with newsletter signups, social follows, or secondary CTAs.

## The conversion action

**Book the Agency Profit Audit** — a free 45-minute diagnostic call.

- **Booking URL (Calendly):** `https://calendly.com/sidekick-accounting/agencyprofitaudit`
  (the older `sidekickcfodiscovery` event was deleted and 404s).
- **Implementation on the existing landing:** a Typeform application popup
  (`@typeform/embed` `createPopup`, form id `FNnck2Hf`), which qualifies the
  lead and then embeds the Calendly event above on its final question. The
  landing page preconnects to the Typeform origins and warms the form's
  renderer in a hidden, tracking-disabled iframe after load, so the popup
  opens fast on in-app mobile traffic (`src/lib/typeform.ts`). Standalone HTML
  lead magnets can link directly to the Typeform or the Calendly URL.
- **Positioning copy:** "45 minutes. No pitch. You'll leave with a clear financial
  picture of your business."
- **Primary CTA label:** "Book your Agency Profit Audit".

## Post-conversion

- Qualified bookers land on `/call-confirmed` (pre-call videos + FAQ). The old
  `/thank-you` page has been removed and 301s there.
- Applicants below the revenue threshold land on `/application-received`, which
  routes them to the self-serve benchmark tool. No email is sent to that group.

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
