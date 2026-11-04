# Perplexity AI — Style Reference & Design System
> scholar's parchment behind clean glass

**Theme:** light

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position.

Perplexity's interface reads as a warm-paper research desk: an off-white parchment canvas (#faf8f5) with quiet ink-dark text, hairline warm-gray dividers, and a single restrained teal that signals navigation and active states. Components stay compact and low-elevation — soft 16px-radius cards, ghost buttons, pill chips — letting the central search/prompt input dominate as the focal artifact. Type uses Apple San Francisco Pro (SF Pro Display / SF Pro Text) at modest weights (400–500) with generous line-height, producing a calm, readable surface that trusts content density over chrome.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Parchment | `#faf8f5` | `--color-parchment` | Page canvas, card surfaces, nav backgrounds — warm off-white that replaces pure white as the base layer everywhere |
| Soft Paper | `#fdfbfa` | `--color-soft-paper` | Slightly elevated card surface (one step above the canvas) — used on suggestion cards |
| Warm Mist | `#d1d1cd` | `--color-warm-mist` | Hairline card and input borders — warm gray that reads as a pencil line on parchment |
| Ash | `#92918b` | `--color-ash` | Muted helper text, secondary labels — warmer than #72706b |
| Graphite | `#72706b` | `--color-graphite` | Nav icons, secondary button text, inactive labels — the dominant neutral text color |
| Ink | `#27251e` | `--color-ink` | Primary text, icon fills, button backgrounds — deep warm-black (not pure #000) carries the brand's brownish undertone |
| Pure Black | `#000000` | `--color-pure-black` | High-contrast text and icon accents — used sparingly where maximum weight is needed |
| Deep Teal | `#016a71` | `--color-deep-teal` | Active nav item background, selected state fill, brand-signaling accent — single chromatic color carrying all navigational emphasis |

## Tokens — Typography (Apple San Francisco Pro)

- **Mandatory Apple Font Family:** `'SF Pro Display', 'SF Pro Text', -apple-system, sans-serif`
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold - used minimally)
- **Sizes:** 11px, 12px, 14px, 16px, 20px, 28px
- **Line heights:** 1.00, 1.25, 1.33, 1.43, 1.50, 2.00
- **Rule:** NO OTHER FONTS ALLOWED. Only Apple San Francisco Pro fonts.

## Tokens — Spacing & Shapes

**Base unit:** 4px
**Density:** compact

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 32 | 32px | `--spacing-32` |

### Border Radius
| Element | Value |
|---------|-------|
| cards | 16px |
| chips | 9999px |
| inputs | 12px |
| buttons | 6px |

### Shadows
| Name | Value | Token |
|------|-------|-------|
| subtle | `rgba(0, 0, 0, 0.08) 0px 1px 2px 0px` | `--shadow-subtle` |

### Layout
- **Page max-width:** 900px (hero/reading sections) or flexible responsive grid for studio workspaces
- **Section gap:** 32px
- **Card padding:** 16px
- **Element gap:** 8px

### Iconography
- **Library:** Lucide Icons (`lucide-react`)
- **Stroke width:** 2.75px (or 2.5px consistent with ChatGPT/Perplexity aesthetic)
- **Color:** `--color-ink` (#27251e) or `--color-graphite` (#72706b)
