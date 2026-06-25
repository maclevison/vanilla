---
name: vanilla-audit
description: Use to run the mechanical, measurable quality pass on a Vanilla build — the evidence sibling of vanilla-review. Where vanilla-review judges taste, family, and soul, vanilla-audit verifies what can be measured: WCAG contrast on both themes (via references/contrast.mjs), token fidelity (no hardcoded hex/px, no undefined vars, no off-scale type/space), responsive and touch targets, complete interaction/data states, and family-mechanical conformance (Lucide, headless primitives, surface ladder). Reports findings by severity; fixes only when asked.
---

# Vanilla Audit

`vanilla-review` judges what only a person can judge — does it have craft, does it read as family, does it carry the soul. **This skill judges what a machine can verify.** Most "looks done" builds carry measurable defects the squint test misses: a muted gray that fails AA by 0.3, a `var(--vanilla-text-button)` that never resolved, a 30px tap target, an empty state nobody triggered. Audit catches those with evidence, not opinion.

Run **both**: review for taste, audit for evidence. A build that passes review but fails audit is pretty and broken; one that passes audit but fails review is correct and characterless. Ship only when both clear.

> **Detector output and clean scripts are evidence of *absence of one defect*, never proof the build is strong.** A green `contrast.mjs` says the curated pairs pass — not that *this* screen's gray-on-tint does. Always gather browser evidence and walk the real interaction path.

## Inputs — load first

- The build under audit (a screen, component, or a branch's UI changes).
- `references/tokens.css` (+ `theme.css` if Tailwind) — the token source of truth.
- `references/contrast.mjs` — the WCAG checker (runs against `tokens.css`).
- `docs/vanilla/vanilla-brief.md` if present — for the declared theme (dark / light / both) and stack.

## How to run it

Five dimensions, each scored **0–4**. Don't fix here; document for `vanilla-build` to address. Gather browser evidence (render at desktop + mobile widths; trigger the non-happy states) before scoring — a dimension you didn't *see* is unscored, not 4.

### 1 · Contrast & accessibility

- **Run the skin audit:** `node references/contrast.mjs` — clears AA on both themes, or names the failing pair. Regression guard for anyone who edits `tokens.css`.
- **Check product-specific pairs the skin audit can't know** — any text on a tinted/colored surface (status seals, chips, accent fills, gray on a hover tint). Resolve `color-mix()` to hex and run ad-hoc: `node references/contrast.mjs '#6c7079' '#eef0f3' --theme light`. Body text ≥ 4.5:1; large/bold ≥ 3:1; placeholders ≥ 4.5:1.
- **ARIA & semantics:** interactive elements have roles/labels/states; one logical heading order; landmarks present; real `<button>`/`<a>`, not click-divs.
- **Keyboard:** every control reachable and operable; visible `:focus-visible`; no traps; logical tab order; focus returns after dialogs.

**0**=fails WCAG A · **2**=AA effort with real gaps · **3**=AA met, minor gaps · **4**=AA clean both themes, keyboard complete.

### 2 · Token fidelity

The skin lives in tokens; drift is measurable. From the project's style/source root:

- **Hardcoded skin values** that a token covers:
  `grep -rnE '#[0-9a-fA-F]{3,6}' src` (allow only token *definitions*) and spot-check `px` font-sizes/colors against the scale.
- **Undefined Vanilla vars** (silently dropped, e.g. the `var(--vanilla-text-button)` that never existed):
  `grep -rhoE 'var\(--vanilla-[a-z0-9-]+' src | sort -u` then confirm each exists in `tokens.css`/`theme.css`.
- **Off-scale type/space:** font-sizes outside the scale (display-xl…caption, eyebrow, mono) and gaps/padding not on the 4px/space tokens. Bespoke wordmark sizing is an allowed exception; body/label/meta text is not.

**0**=hardcoded everywhere · **2**=tokens exist, used inconsistently · **3**=tokens used, a few literals · **4**=fully bound, no undefined vars, on-scale.

### 3 · Responsive & touch

- **Touch targets:** interactive elements ≥ 44×44px on touch (skin floor: CTAs ≥ 40px, pills ≥ 36px, touch grows to ≥ 44px). Extend small controls with a pseudo-element rather than growing the visual.
- **No horizontal overflow** at any width: confirm `documentElement.scrollWidth === innerWidth` (note: some headless browsers clamp viewport width to ~500px min — measure, don't trust a cropped screenshot).
- **Breakpoints** present and sane (skin grid: 3-up → 2-up at ~1024 → 1-up at ~640); headings don't overflow their container at any width.
- **No real text below the caption floor (12px).** 11/10px hardcoded labels are drift.

**0**=desktop-only · **2**=works on mobile, rough edges · **3**=responsive, minor target/overflow issues · **4**=fluid, proper targets, zero overflow.

### 4 · States & motion

- **Every interactive element** has default / hover / active / focus-visible / disabled. **Verify by triggering**, not by reading code.
- **Every data view** has loading / empty / error — not just the happy path. Trigger the empty state (search for nothing, filter to zero) and screenshot it.
- **Motion:** durations < 300ms; custom ease-out (`cubic-bezier(0.23, 1, 0.32, 1)`), never ease-in/bounce/elastic; animates only `transform`/`opacity`; `prefers-reduced-motion` has an alternative.
- **Theme (if brief says "both"):** toggle persists to `vanilla-theme`; the inline no-FOUC script is present in `<head>` before CSS; reload in light shows no dark flash. (If the brief is dark-only or light-only, confirm the fixed `data-theme` and that there's no dead toggle.)

**0**=happy path only · **2**=most interactive states, data states missing · **3**=states present, motion rough · **4**=all states triggered-and-verified, motion purposeful, reduced-motion honored.

### 5 · Family-mechanical

The measurable half of family conformance (the *taste* half belongs to `vanilla-review`):

- **Icons:** Lucide only (`lucide-react` / `lucide-vue-next`) — `grep` for any other icon import (heroicons, material-icons, font-awesome, tabler) → finding.
- **Controls:** native or headless primitive (Base UI / Reka UI). `grep` package imports for a styled kit (`@mui`, `vuetify`, `@chakra-ui`, `antd`, `react-bootstrap`) → blocker; it ships its own skin.
- **Depth:** surface ladder + hairlines; shadows resolve via `--vanilla-shadow-*` (real on light, `none` on dark) — no hardcoded `box-shadow` on dark, no ad-hoc border colors.

**0**=styled kit / foreign icons · **2**=mostly family, some foreign deps · **3**=family, minor depth drift · **4**=Lucide + primitives + ladder, clean.

## Severity

Tag every finding:

- **P0 Blocking** — broken or inaccessible: AA failure on body text, undefined var dropping a style, a styled UI kit, horizontal overflow, an inoperable-by-keyboard control.
- **P1 Major** — WCAG AA gap on non-body, missing data state, touch target < 40px, foreign icon set.
- **P2 Minor** — off-scale value, a missing hover/active, motion easing wrong.
- **P3 Polish** — sub-pixel optical nits, redundant rules.

## Report

```
Vanilla Audit — <target>

Score   1 Contrast/a11y  ?/4   · 2 Tokens ?/4 · 3 Responsive ?/4
        4 States/motion  ?/4   · 5 Family-mechanical ?/4      Total ??/20

Evidence  <render widths seen; states triggered; contrast.mjs result>

Findings  (by severity, P0 first)
  [P?] <name> — <file:line> — <dim> — <impact> — <fix: the decision> — <standard>

Systemic  <recurring root causes, e.g. "ink-tertiary used for real text in 4 spots">
Working   <what to keep>
```

**Bands:** 18–20 ship · 14–17 fix weak dims · 10–13 significant work · ≤9 overhaul.

## Applying fixes

Only when asked. Then hand to `vanilla-build` and fix **from the decision, not the symptom**: patch the token (or add the missing one), swap to the shared primitive, re-derive the state. Start at P0. Re-run `contrast.mjs` and re-trigger the states to confirm. Then re-audit to watch the score move.

## Relationship to vanilla-review

Same target, two passes, no overlap:

- **vanilla-review** — craft · family-as-read · soul/signature. *Would a design lead sign it? Could it be any product?* Judgment.
- **vanilla-audit** — contrast · tokens · responsive/touch · states · family-as-measured. *Does it pass, resolve, fit, and not break?* Evidence.

Lead with whichever the moment needs; clear both before merge.

## Portability

Plain Markdown. `contrast.mjs` needs Node; if Node is unavailable, fall back to the checklist (compute ratios by hand, grep for drift) and say so. No agent-specific tools, slash commands, or hardcoded paths beyond the skill's own `references/`.
