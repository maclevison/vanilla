---
name: vanilla-review
description: Use to review a product UI built with Vanilla — strictly, before it ships or merges. Judges three bars: craft (would a design lead put their name on it), family conformance (unmistakably Vanilla — tokens, Inter, surface ladder, Lucide, headless primitives), and soul (does it carry the brief's signature, or could it be any product). Judges by default; rebuilds only when asked.
---

# Vanilla Review

An unusually strict review. Most generated UI is *correct* (it renders, it aligns) and *not crafted* (nothing was decided, the hierarchy is flat). On top of craft, a Vanilla build must also be *of the family* (unmistakably Vanilla) and *have a soul* (the brief's signature). This review pulls a build toward all three, scores what's wrong by how much it matters, and blocks what isn't there yet.

**Judges by default.** Report findings and a verdict; rebuild only when the user asks. Keep the review and the mutation separate.

## The three bars

1. **Craft** — would a design lead at Linear or Apple put their name on this? Real hierarchy, restraint, polish.
2. **Family** — is this unmistakably Vanilla? Bound to tokens, Inter, surface ladder, lavender used sparingly, Lucide icons, headless primitives — no skin violation.
3. **Soul** — does the brief's signature actually exist and do work? Or could this be any Vanilla product (convergence)?

## Inputs — load first

- `docs/vanilla/vanilla-brief.md` — the soul (for the uniqueness test). If absent, review craft + family only and note the gap.
- `references/design.md` + `references/tokens.css` — the skin (for the family test).
- The build under review (a screen, a component, or a branch's UI changes).

## How to run it

Five steps, in order. The procedure is what keeps the review honest.

### 1. Scope & intent
Bound what's under review. The intent is **given, not inferred** — read the brief for the user, task, feel, and signature; read the skin (`design.md`/`tokens.css`). Review against the product's own intent, not a generic ideal.

### 2. See the whole first
Look at the rendered output as a user would (use a render/screenshot tool if available; otherwise read the layout holistically). Squint:
- Does one thing lead, or is it a parking lot where everything competes equally?
- Does it read as *Vanilla* (dark canvas, Inter, lavender restraint, quiet surfaces)?
- Is the brief's **signature** visible and alive?

### 3. Run the lenses (independently — one concern at a time)
- **A · Hierarchy** — name the focal element; does it win (size, weight, contrast, isolation)? Are tiers (primary / secondary / meta) distinct via size + weight + the ink ramp, not size alone?
- **B · Family conformance** — bound to tokens, or hardcoded hex/px? Inter, or a stray font? Surface ladder + hairlines, or ad-hoc colors/borders? Lavender ≤ ~10% (focus / CTA / selection), or decorative? Lucide icons, or another set? Controls from headless primitives, or a styled UI kit? If the brief is "both", squint-test in both themes; confirm the toggle persists and there is no theme flash on reload. On light, elevation must read (shadow, not a flat ladder) and the lavender must hold AA.
- **C · Surfaces & depth** — quiet elevation (the surface ladder), findable-not-harsh hairlines, one committed depth strategy?
- **D · Composition & rhythm** — does it breathe unevenly, or is it monotone (same card, gap, density everywhere)? Do proportions state a relationship?
- **E · States, polish & motion** — every interactive element has default / hover / active / focus / disabled; every data view has loading / empty / error? Concentric radius, tabular-nums, ≥44px hit areas? Motion < 300ms, ease-out, `prefers-reduced-motion` respected?
- **F · Structure & reuse** — native → headless primitive (Base UI / Reka UI) → hand-roll? Any reinvented control missing keyboard / focus / ARIA? Hardcoded literals where tokens exist?
- **G · Soul / uniqueness** — read the brief's signature; is it present and doing real work? Strip the product name: could this screen be any Vanilla product? If yes, the soul is missing.

### 4. Score & filter
Severity per finding:
- **Blocker** — reads as generic or broken, OR violates the family, OR has no signature. Fails the bar.
- **Should-fix** — a real craft gap, but the screen still functions.
- **Note** — minor; mention once.

Then drop false positives: taste (a coherent choice you'd merely make differently), a bold choice working as intended, out-of-scope, ratified by the brief or the skin, or a lint/compile concern. If you can't say *why a finding costs the user or breaks the family*, cut it. Prefer a few high-conviction findings over a long cosmetic list.

### 5. Report & verdict
Synthesize across lenses, prioritized: hierarchy → family violations → surfaces/composition → states & polish → structure → soul. For each finding give: what defaulted or violated, why it costs the user or breaks the family, the specific fix (the decision, not a patch), and its severity. Then state the verdict against the bar.

## Approval bar

To pass, all three must hold:
- **Craft:** a clear focal point and readable hierarchy (survives the squint test); real size + weight + color hierarchy; restrained, meaningful color; quiet layering; complete states; purposeful sub-300ms motion; no structural hacks.
- **Family:** binds to tokens (no hardcoded skin), Inter, the surface ladder, lavender sparingly, Lucide icons, headless primitives — no styled UI kit, no reinvented skin.
- **Soul:** the brief's signature is present and doing work; the screen could not be mistaken for a different product.

**Presumptive blockers** (unless justified against the brief): no focal point · size-only or defaulted hierarchy · monotone layout · harsh or fragmented surfaces · missing states · structural hacks · an inaccessible hand-rolled control · **skin violation** (hardcoded palette/font, a styled UI kit, non-Lucide icons) · **missing signature** (generic — could be any product). Any one present → **not approved**; leave explicit, actionable feedback.

## Applying fixes

Only when the user asks. Then rebuild the flagged parts **from the decision, not as patches**: re-derive the focal point, restore the token binding, build the signature for real. Start with blockers, then should-fix.

## Portability

Plain Markdown, works in Claude Code and OpenCode. No agent-specific tools, slash commands, or hardcoded paths; "if a render tool is available" stays conditional.
