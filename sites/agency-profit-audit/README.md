# Agency Profit Audit — landing page

The Sidekick Accounting landing page for the **Agency Profit Audit**. Next.js 16
(App Router) + Tailwind v4, deployed on Vercel.

This is one asset inside the [Sidekick Lead Magnets](../../README.md) workspace.
Brand, voice, proof, and conversion context live in [`../../context/`](../../context).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Key files

- `src/app/page.tsx` — the landing page (hero, stats, scorecards, testimonials, CTAs).
- `src/app/thank-you/page.tsx` — post-booking confirmation.
- `src/app/layout.tsx` — fonts (Plus Jakarta Sans), metadata, GA4 (`G-CD60YKH4S1`).
- `src/app/globals.css` — brand CSS variables (see `../../context/brand-kit.md`).
- `public/` — this app's own copy of logo, `logos/`, and `clients/` imagery.

## Deploy (Vercel)

Deploys from the GitHub repo `rmougz/sidekick-landing`.

> **Important:** this app moved from the repo root into `sites/agency-profit-audit/`
> during the workspace restructure. Set the Vercel project's **Root Directory** to
> `sites/agency-profit-audit` so the build finds the app. Do this before the next
> push to `main`, or the deploy will fail.

The conversion action is a Calendly popup
(`calendly.com/sidekick-accounting/sidekickcfodiscovery`). See
`../../context/conversion.md`.
