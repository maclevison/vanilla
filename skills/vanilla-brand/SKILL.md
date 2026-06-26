---
name: vanilla-brand
description: Use once per client/company to capture their visual identity into a brand pack, so every Vanilla product built for them shares that brand coherently. Runs a short interview — accent, neutrals, type, radii, density, elevation — and writes a brand.css (override of the --vanilla-* tokens) to the project's docs/vanilla/. The Vanilla default skin stays intact; a client that never runs this keeps the default. The engine (craft, accessible primitives, AA contrast, the surface-ladder model, the discover→build→review flow) is invariant — only values change. AA is enforced by vanilla-audit over the effective tokens.
---

# Vanilla Brand

The skin is no longer global — it is **per client**. This skill captures a client's
**brand** (the values: color, type, radii, density, elevation) into a `brand.css` that
overrides the default `--vanilla-*` tokens. Everything that makes Vanilla *Vanilla* — the
engine — is invariant and is **not** asked about here. Output: a `brand.css` in the
project's `docs/vanilla/` folder.

## When to run

- Once per client/company, before building their first product (or to revise the brand).
- The `vanilla` hub offers this when a project has no `brand.css`. A client that wants the
  default Vanilla skin simply never runs it.
- Reused across every product for that client — define once, inherit everywhere.

## What is fixed vs asked

**Never asked (the invariant engine):** craft and polish, headless primitives, AA contrast,
the surface-ladder *model*, the type-scale ratios, the 4px spacing base, the process flow.
**Asked (the values):** see below. A light re-skin overrides a few; a full identity
overrides many. Both use the same mechanism.

## How to interview

Keep it short. Work one axis at a time; propose a sensible default (the Vanilla value) and
let them confirm or replace. Stop as soon as you can write a confident `brand.css`.

1. **Primary theme** — does the brand live in dark or light? (Vanilla default: dark.) The
   opposite theme is **derived** (hue preserved, surface/ink relationship inverted) and the
   client may review it.
2. **Accent / primary** — the brand color. Derive `hover`/`focus` (value nudged); confirm.
3. **Neutrals** — canvas + the surface ladder (surface-1..4) + hairlines. Capture from two
   anchors (canvas + top surface) and interpolate the ladder, or take explicit values.
4. **Ink** — text ramp (ink / muted / subtle / tertiary); default to deriving from contrast
   against the surfaces, let them override.
5. **Type** — keep Inter, or swap the sans family (and mono). Scale ratios stay fixed.
6. **Radii** — a single character (sharp → round) mapped to the radius scale, or explicit.
7. **Density** — compact / default / roomy (the applied spacing range; the 4px base stays).
8. **Elevation** — hairlines (Vanilla default) or shadows, per theme.

## Before writing

Show a draft summary (the brand brief line + which tokens will be overridden) and get
confirmation. Only then write the file.

## Where to write

Write to **`docs/vanilla/brand.css`** in the target project (create `docs/vanilla/` if
needed). This is the single canonical brand file. If the current directory is the Vanilla
skill repo itself (it contains `skills/vanilla/SKILL.md` and no product code), do NOT write
a stray file — say there is no target product here, and offer to print the brand.css as an
example or take a path.

## The brand.css contract

Follow `references/brand.css.example` exactly:
- A header comment with the brand brief (client, primary theme, one-line character).
- A `:root` block overriding only the tokens the brand changes.
- A `:root[data-theme="<opposite>"]` block for the derived theme.
- Omit any token the brand keeps from Vanilla — it falls through to `tokens.css`.
- **AA is checked by `vanilla-audit`**, not hand-tuned here:
  `contrast.mjs --brand docs/vanilla/brand.css` validates both themes and prints a
  hue-preserving suggested value for any failing pair, which you apply back into this file.

## Handoff

After writing `brand.css`, return to the flow: the `vanilla` hub continues. Tell the user to
run `vanilla-audit` so contrast is verified (and auto-corrected) over the effective tokens
before shipping.

## Portability

Plain Markdown, works in Claude Code and OpenCode. No agent-specific tools, slash commands,
or hardcoded paths beyond the skill's own `references/`.
