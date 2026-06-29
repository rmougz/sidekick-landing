# Agency Foundations Review — landing page

The Sidekick Accounting landing page for the **Agency Foundations Review** — a
free 45-minute review of an agency's accounting and tax setup (clean foundations
-> agency-specific books -> proactive tax planning). Next.js 16 (App Router) +
Tailwind v4, deployed on Vercel.

This is one asset inside the [Sidekick Lead Magnets](../../README.md) workspace,
cloned from `sites/agency-profit-audit` and re-copied for the tax/foundations
offer. Brand, voice, proof, and conversion context live in
[`../../context/`](../../context).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Key files

- `src/app/page.tsx` — the landing page. Sections, top to bottom: hero (VSL +
  CTA), the generalist-accountant problem, the three-pillar foundations
  scorecard, founder credibility, track-record stats + logos, client wins,
  "bigger results follow" growth proof, testimonials, closing CTA, and the inline
  Calendly booking section (`#book`). All CTAs scroll to `#book`.
- `src/app/thank-you/page.tsx` — post-booking confirmation (mirrors the live
  `audit.sidekickaccounting.co.uk/thank-you`).
- `src/app/layout.tsx` — fonts (Plus Jakarta Sans), metadata, GA4 (`G-CD60YKH4S1`).
- `src/app/globals.css` — brand CSS variables (see `../../context/brand-kit.md`).
- `public/` — this app's own copy of logo, `logos/`, and `clients/` imagery.

## Before going live

- **Booking link** — done. `BOOKING_URL` in `src/app/page.tsx` points at the
  dedicated `sidekick-accounting/agency-foundations-review` Calendly event,
  embedded inline in the `#book` section.
- **VSL video** — done. The hero embeds the Foundations Review Wistia video
  (`media-id="9teqqcn04w"`).
- **Calendly redirect (the one remaining manual step)** — in the
  `agency-foundations-review` event's settings, set the post-booking redirect to
  `https://<your-domain>/thank-you` so bookers land on the confirmation page.
- **Naming note** — the page, metadata, and footer ™ now brand the offer as the
  Agency Foundations **Review** to match the VSL narration and the Calendly event
  slug. The folder/package name and Vercel Root Directory stay
  `sites/agency-foundations-audit` (an internal identifier only; no need to rename).

## Deploy (Vercel)

Deploys as its **own Vercel project** (separate from the Agency Profit Audit).
The `.vercel/` link folder was intentionally not cloned, so link a new project on
first deploy.

> **Important:** set the new Vercel project's **Root Directory** to
> `sites/agency-foundations-audit` so the build finds the app.

The conversion action is the inline Calendly booking in `#book`. See
`../../context/conversion.md`.
