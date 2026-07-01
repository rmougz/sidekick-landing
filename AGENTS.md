# Lead Magnets — Sidekick Accounting workspace

This repo is a **workspace for Sidekick Accounting's lead magnets and conversion
assets**, not a single site. The Agency Profit Audit landing page is the first
asset; future lead magnets (blueprints, authority guides, diagnostics) are added
as siblings.

## Read this before creating any lead magnet

The reusable brand/strategy context lives in **`context/`**. Read the relevant
files first - they answer everything the lead-magnet-creator skill asks for, so
you should rarely need to ask the user for brand, voice, ICP, proof, or the
conversion action.

- `context/brand-kit.md` — colours, fonts, logo, and how to theme the skill scaffold.
- `context/voice-and-tone.md` — how Sidekick writes (incl. hard rules: no em dashes, no hype).
- `context/icp.md` — who each asset is for, and who to repel.
- `context/proof-assets.md` — real numbers, named case studies, testimonials, imagery paths.
- `context/conversion.md` — the single CTA (Agency Profit Audit / Calendly), UTM + GA4 conventions.

Shared brand imagery (logo, client logos, client photos) lives in
**`shared-assets/`** - copy what you need into a new asset's own folder.

## Structure

```
.
├── context/                 # reusable brand + strategy context (read these first)
├── shared-assets/           # logo, client logos (logos/), client photos (clients/)
└── sites/
    ├── agency-profit-audit/ # the Next.js landing page (deployed on Vercel)
    └── <new-lead-magnet>/   # each new lead magnet = its own self-contained folder
```

## Creating a new lead magnet

1. Use the **lead-magnet-creator** skill. It scaffolds a single self-contained
   `index.html`.
2. Theme it from `context/brand-kit.md`; write copy in the voice from
   `context/voice-and-tone.md`; target the reader in `context/icp.md`.
3. Pull concrete proof from `context/proof-assets.md`; copy any imagery needed
   from `shared-assets/` into the new asset's folder so it stays self-contained.
4. Route every CTA to the action in `context/conversion.md` with the UTM convention there.
5. Put the finished asset in `sites/<slug>/` and deploy it independently.

## Deployment

- **Agency Profit Audit landing** (`sites/agency-profit-audit/`) deploys to Vercel
  via the GitHub repo `rmougz/sidekick-landing`. **The Vercel project's Root
  Directory must be set to `sites/agency-profit-audit`** (it moved from the repo
  root during the workspace restructure). That app has its own `AGENTS.md` with
  Next.js-specific rules - read it before editing the landing.
- **Standalone lead magnets** are plain static HTML and deploy independently (e.g.
  Netlify Drop, or as static files on Vercel).
