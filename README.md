# Sidekick Lead Magnets

A workspace for Sidekick Accounting's lead magnets and conversion assets. Each
asset filters the right agency founder, proves expertise with real numbers, lets
them self-diagnose, and routes them to one action: **booking the Agency Profit
Audit**.

## Layout

| Path | What it is |
|------|------------|
| `context/` | Reusable brand, voice, ICP, proof, and conversion context. **Read first.** |
| `shared-assets/` | Brand imagery shared across assets: `logo/`, `logos/`, `clients/`. |
| `sites/agency-profit-audit/` | The Agency Profit Audit landing page (Next.js, deployed on Vercel). |
| `sites/<slug>/` | Each future lead magnet, as its own self-contained site. |

## Adding a lead magnet

See [`AGENTS.md`](./AGENTS.md) for the full workflow. In short: use the
lead-magnet-creator skill, theme and write from `context/`, route every CTA to
the Agency Profit Audit, and drop the finished asset in `sites/<slug>/`.

## Deploying the landing page

The landing lives in `sites/agency-profit-audit/` and deploys to Vercel from the
GitHub repo `rmougz/sidekick-landing`.

> **Important:** after the workspace restructure, the Vercel project's **Root
> Directory** must be set to `sites/agency-profit-audit`. See
> [`sites/agency-profit-audit/README.md`](./sites/agency-profit-audit/README.md)
> for the app's own dev/build instructions.
