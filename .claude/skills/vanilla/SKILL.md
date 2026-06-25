---
name: vanilla
description: Use when building product UI, dashboards, panels, admin tools, or app screens for Vanilla, so the result belongs to the shared Vanilla design family. Loads the fixed visual skin (dark canvas, Inter, lavender accent, surface ladder, Lucide icons, headless primitives) from references/, and guides the discover-build-review flow. Creativity goes into the product's domain, layout, hierarchy, and signature — never the skin.
---

# Vanilla

Vanilla makes every Vanilla interface belong to the same family: recognizable skin, product-specific soul. **The skin is Vanilla; the soul is the product's.**

## The skin is non-negotiable (load it first)

Read these files, relative to this skill, before designing anything:

- `references/design.md` — the semantic design system (the "why").
- `references/tokens.css` — the canonical token values. Import directly when the project is not on Tailwind.
- `references/theme.css` — the Tailwind v4 preset. Import when the project uses Tailwind.
- `references/motion.md` — the family's motion layer (the "why" behind movement); curves and durations live as tokens in `tokens.css`. Load when a value, rule, or decision about animation is needed.

Non-negotiable skin (never reinvent): the palette/colors, **Inter** type, the lavender accent used sparingly, the surface ladder, the radius and spacing scales, **Lucide** icons, the **motion defaults** (strong custom curves, sub-300ms, the decision-before-how discipline in `motion.md`), and the use of **headless primitives** for controls (Base UI for React, Reka UI for Vue) — never a styled UI kit (Material, Vuetify, Chakra, Ant).

## The soul is the product's (this is where creativity goes)

Free per product: layout, composition, hierarchy/focus, density within range, which screens/components exist, content, and the **signature** — one element that could only exist for this product.

## Flow

1. **Discover the product** — for greenfield (if the repo isn't initialized yet, offer `git init` first), invoke the `vanilla-discovery` skill: it interviews the developer and writes `docs/vanilla/vanilla-brief.md` capturing the user, task, domain, feel, and the one signature. The brief also records the theme (dark / light / both). For an existing project, read `docs/vanilla/vanilla-brief.md` if present, else infer from the code.
2. **Load the family** — read `references/design.md` + `references/tokens.css` (and `theme.css` if Tailwind); read `references/motion.md` when the screen has any movement.
3. **Build** — invoke the `vanilla-build` skill, guided by `vanilla-brief.md`. If Tailwind is present, import `theme.css`; otherwise import `tokens.css`. Controls from headless primitives; icons from Lucide.
4. **Review** — invoke the `vanilla-review` skill: craft bar + family test (does it read as Vanilla?) + uniqueness test (does it have a signature, or could it be any Vanilla product?).

Invoke `vanilla-direction` in step 1–2 only when the product needs stronger visual character — always within the skin.

> **Convention:** every document the Vanilla skills generate (the brief, notes, reports) lives in the project's `docs/vanilla/` — never scattered in the root.

> The satellite skills (`vanilla-discovery`, `vanilla-build`, `vanilla-review`, `vanilla-direction`) are invoked by name as the flow reaches each step.

## Portability

This skill is plain Markdown + referenced files, and works in both Claude Code and OpenCode. It uses no agent-specific tools, slash commands, or hardcoded paths beyond its own `references/`.
