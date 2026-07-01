# Brand Kit — Sidekick Accounting

The single source of truth for theming any Sidekick lead magnet or site. The
lead-magnet-creator skill themes its scaffold entirely through CSS variables —
map the values below straight onto them.

## Colour palette

| Token            | Hex        | Role |
|------------------|------------|------|
| Navy             | `#0e2d48`  | Primary brand colour. Default page background, headings on light. |
| Navy (dark)      | `#091e30`  | Deeper navy for alternating dark sections, cards, footer. |
| **Coral**        | `#fd605b`  | **The one accent.** Every CTA, eyebrow labels, "before/✗" marks. Use sparingly. |
| Mint             | `#99ddcc`  | Positive / "after / ✓" / success accent. Pairs with coral as the optimistic counterpoint. |
| Pink             | `#ffcecd`  | Soft accent used in hero/closing gradients only. Not for text. |
| Grey             | `#eee8e8`  | Light section background (breaks up the dark sections). |
| Body text (dark) | `#d4d4d4`  | Body copy on navy backgrounds. |
| Muted            | `#8a9bb5`  | Secondary / caption text on dark. |
| Border (dark)    | `#1a3a55`  | Hairline borders/dividers on navy. |
| White            | `#ffffff`  | Headings and high-contrast text on dark. |

**Accent discipline:** coral is the only attention colour. If everything is
coral, nothing is. Mint is the *positive* signal, not a second CTA colour.

### Signature gradients (from the landing hero + closing)
- Hero: `linear-gradient(0deg, #eee8e8 0%, #ffcecd 25%, #0e2d48 54%)`
- Closing band: `linear-gradient(0deg, #0e2d48 7%, #ffcecd 50%, #0e2d48 93%)`

## Typography

- **Font family:** Plus Jakarta Sans (Google Fonts), weights 400 / 500 / 600 / 700 / 800.
- Headings: 800 (extrabold), tight line-height (~1.15).
- Body: 400–500.
- Eyebrow labels: ~13px, 700, UPPERCASE, letter-spacing ~2–3px, coloured coral (or mint).

## Logo

- White wordmark: `shared-assets/logo/sidekick-logo-white.png` (use on navy/dark backgrounds).
- Renders ~200×48 in the hero.
- No dark-on-light variant on file yet — request one if a lead magnet needs a light background header.

## Mapping onto the lead-magnet-creator scaffold

When theming `assets/scaffold.html` CSS variables:

- Primary accent → **coral `#fd605b`**
- Background → **navy `#0e2d48`** (with `#091e30` for alternating sections)
- Text colour → **white** for headings, `#d4d4d4` for body on dark
- Secondary/success accent → **mint `#99ddcc`**
- Font → **Plus Jakarta Sans**
- Logo → `shared-assets/logo/sidekick-logo-white.png`

See [[voice-and-tone]] for copy style, [[proof-assets]] for imagery to drop in.
