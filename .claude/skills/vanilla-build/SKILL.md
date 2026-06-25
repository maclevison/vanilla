---
name: vanilla-build
description: Use to build or extend product UI (dashboards, panels, admin tools, app screens) in the Vanilla design family. Reads the vanilla-brief.md for the product's soul and the fixed skin (design.md, tokens.css, theme.css), then builds with real visual hierarchy, headless primitives (Base UI / Reka UI), and Lucide icons. The skin is decided; creativity goes into layout, hierarchy, and the product's signature.
---

# Vanilla Build

Build product UI on the **fixed Vanilla skin**, from the **soul in the brief**. The hard visual decisions (palette, type, surfaces) are already made — so this is not about inventing a look. It's about applying the skin with real craft and spending creativity where it counts: layout, hierarchy, and the product's signature.

## Inputs — load these first

1. **`vanilla-brief.md`** (the soul) from the project's `docs/vanilla/`. If it's missing, run the `vanilla-discovery` skill first — don't build without a brief. Any documents you generate also go under `docs/vanilla/`.
2. **The skin:** `references/design.md` (semantic) + `references/tokens.css` (canonical values). Plus `references/theme.css` if the project uses Tailwind, and `references/motion.md` whenever the screen has any movement.
3. **If present, `docs/vanilla/vanilla-direction.md`** — the character plan from `vanilla-direction`; read it alongside the brief and let it guide how far to push the signature, layout, and motion.

## The skin is decided — don't reinvent it

Non-negotiable, taken from the family: the palette/colors, **Inter** type, the lavender accent (used sparingly), the surface ladder, the radius and spacing scales, and **Lucide** icons. Bind everything to tokens — never hardcode a hex or a px that a token already covers. Reinventing any of these is the most common way to break the family.

## Spend creativity here — the soul

Free per product, driven by the brief: **layout, composition, hierarchy/focus, density within range, and the signature.** Build the brief's signature *for real* — it's the one thing this product will be remembered by. A build with no signature has failed even if every token is correct.

## Visual hierarchy & composition (what makes it look designed)

This is the highest-leverage craft, and now the main place creativity lives.

- **One focal point per view.** Name the one thing the user came to do; make it win through size, contrast, position, or surrounding space. Demote everything else deliberately. A parking lot where everything competes equally reads as generated.
- **Weight + color do more than size.** A single 14px size holds three tiers via weight + the ink ramp (`ink` → `ink-muted` → `ink-subtle`). Build hierarchy from size, weight, and color together — never size alone. Squint: if you can't tell headline from body from label, it's too flat.
- **Density is a decision, in px.** Pick it from the brief's feel (tight/balanced/airy) and hold the same numbers everywhere.
- **Rhythm — breathe unevenly.** Group tightly-related things, then put real air between groups. Monotone layouts (same card, gap, density everywhere) are the sound of no one deciding.
- **Proportions speak.** A 280px sidebar vs full content says "nav serves content"; 360px says "peers". Choose widths that state a relationship.
- **Restraint (~60/30/10).** Mostly neutral surface, some secondary tone, the lavender accent ≤ ~10%. Color communicates (status/action), it doesn't decorate.

## Subtle layering (the backbone)

- Use the **surface ladder** from tokens: `canvas` → `surface-1` → `surface-2` → ... Each step is a whisper — a few percent of lightness. Stacked, hierarchy emerges; in isolation you barely see one step.
- **Hairline borders** (`hairline`, `hairline-strong`) define edges without shouting.
- **Sidebars share the canvas** (a border separates them), not a different color.
- **Inputs sit slightly inset/darker**, not lighter.
- **Squint test:** blur your eyes — you still perceive structure, but nothing jumps out harshly.

## Use what exists (controls, styling, icons)

- **Controls: native → headless primitive → hand-roll (last resort).** Use `<button>`/`<a>`/`<input>` where they fit. For anything stateful (select, combobox, dialog, popover, tooltip, tabs, date picker) compose a headless primitive — **Base UI for React, Reka UI for Vue** — then style it to the skin. Never ship a styled UI kit (Material, Vuetify, Chakra, Ant): it brings its own skin and hijacks the family. Hand-roll only if no primitive fits, and then owe the full a11y contract (keyboard, focus trap/return, ARIA, click-outside, scroll-lock).
- **Styling:** if the project uses **Tailwind**, import `theme.css` and use the family utilities (`bg-canvas`, `text-ink`, `border-hairline`, `rounded-md`, `text-display-md`). If **not Tailwind**, import `tokens.css` and style with the custom properties (`var(--vanilla-canvas)`, etc.). Either way: bind to tokens, never hardcode literals; extract a component on the second reuse.
- **Icons: Lucide only** (`lucide-react` / `lucide-vue-next`). Icons inherit `currentColor`, so they respect the ink ramp automatically.

## Theme (from the brief's Stack)

The skin ships dark + light as two fixed states; the brief picks which the product exposes. Never re-paint — only switch.

- **Dark or Light (fixed):** set (or omit) `data-theme="light"` on `<html>`. No toggle.
- **Both:** build a toggle (Lucide `sun` / `moon`) that flips `document.documentElement.dataset.theme` and persists to `localStorage` under the fixed key **`vanilla-theme`**. First load with nothing saved → **dark**. `prefers-color-scheme` is opt-in per project, not the default.
- **No FOUC:** when "both", put this inline script in `<head>` **before any CSS/JS**, reading the same `vanilla-theme` key:

  ```html
  <script>try{if(localStorage.getItem('vanilla-theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}</script>
  ```

- **Elevation:** use `var(--vanilla-shadow-1)` / `--vanilla-shadow-2` for lifted cards/popovers — they resolve to a real shadow on light and to `none` on dark, so the same component reads correctly in both. Don't hardcode shadows.

## Brand override (optional)

If the project provides a reference `design.md` (any `@google/design.md`-format skin — e.g. a client's brand), apply a **light brand override**: adjust only a few axes, keep everything else Vanilla. This is not adopting the other skin — it's giving Vanilla the brand's color and shape.

Take **only** these from the reference, by name (the names are consistent across skins):

- **Primary/accent** — `colors.primary` (derive hover/focus) → redefine `--vanilla-primary`, `--vanilla-primary-hover`, `--vanilla-primary-focus`.
- **Secondary colors** — brand accent extras and semantic status (`success` / `warning` / `error`) if present → redefine the matching tokens (e.g. `--vanilla-success`) or add brand extras as `--vanilla-x-<name>`.
- **Spacing scale** — `spacing.*` → redefine `--vanilla-space-*` (density).
- **Radius scale** — `rounded.*` → redefine `--vanilla-radius-*` (geometry: flat / medium / pill).

Emit a small `:root` override block applied **after** the base `tokens.css` (cascade wins) — e.g. `docs/vanilla/brand-overrides.css`, imported right after the skin. **Everything else stays Vanilla:** surfaces/canvas, dark + light, **Inter**, the ink ramp, components, craft, polish, primitives.

Rules: never pull typography, surfaces, components, or the depth model from the reference; never normalize its whole vocabulary; check the brand accent for AA on the active theme. This is a revisable suggestion — show the result and let the dev adjust. A few tokens, not a new skin.

## Polish & motion (ship-quality)

- **States are not optional.** Every interactive element: default, hover, active, focus, disabled. Every data view: loading, empty, error. Missing states are the fastest tell of unfinished work.
- **Concentric radius:** nested rounded elements use `outer = inner + padding`.
- **Tabular numbers** on any dynamic figure (counters, metrics, tables): `font-variant-numeric: tabular-nums`.
- **Hit areas ≥ 44×44px** (40 minimum); extend small controls with a pseudo-element.
- **Optical alignment & text:** nudge icons/glyphs that look off-center (~2px); `text-wrap: balance` on headings and `text-wrap: pretty` on body to kill orphans; `-webkit-font-smoothing: antialiased` on the root.
- **Motion — decide *whether* before *how*.** The first question is never "how do I animate this", it's "should this move at all?" Match motion to frequency: **100+×/day or keyboard-initiated → no animation, ever**; tens/day → reduce; occasional (modals, drawers, toasts) → standard; rare/first-time → delight (and that delight is `vanilla-direction`'s job, not the default). Every animation must answer *why it moves* (feedback, spatial consistency, state, preventing a jarring change) — "looks cool" is not a reason. When in doubt, the strongest move is to delete it. The full decision tables, curves, and rules live in `references/motion.md`.
- **Motion is felt, not watched (the family defaults).** Bind to the motion tokens, never hardcode a curve or ms: easing `var(--vanilla-ease-out)` (or the `ease-out` utility on Tailwind), never `ease-in`; durations from `--vanilla-duration-fast/base/slow` (UI < 300ms; only drawers/modals earn `--vanilla-duration-drawer`). Press feedback `transform: scale(0.97)`; animate only `transform`/`opacity` (never `transition: all`); never animate from `scale(0)` (start at 0.95 + opacity 0); popovers/dropdowns scale from their trigger (origin-aware; modals stay centered); use transitions (not keyframes) for anything rapidly re-fired; stagger entrances 30–80ms; respect `prefers-reduced-motion` (gentler, not zero) and gate `:hover` motion behind `@media (hover: hover) and (pointer: fine)`.

## Copy is part of the build (it ships in the UI)

Words render alongside pixels; sloppy copy reads as unfinished just like a missing hover. Hold the same bar:

- **No em dashes or `--` in UI strings.** Use a comma, colon, period, or parentheses. (Prose in docs is fine; product copy is not.)
- **No marketing buzzwords** — streamline / empower / supercharge / leverage / seamless / world-class / next-generation. Name the specific noun and the verb the thing actually does.
- **Button labels = verb + object.** "Salvar alterações" beats "OK"; "Excluir post" beats "Sim". The label says what will happen.
- **Link text stands alone.** "Ver planos" beats "clique aqui" — screen readers announce links out of context.
- **One noun per concept, consistent casing.** The same thing is called the same name everywhere; pick sentence case or Title Case and hold it. This includes **seed/mock data** — it ships in screenshots, so no `LiaNogueira` or `Caio REIS`.
- **Empty / error copy says what happened and the way out**, not just "Nada aqui".

## Before writing each component — checkpoint

State (briefly): **Intent** (from the brief) · **Focal element** (and how it wins) · **Tokens used** · **Surface level** · **Primitive or native** · **Icons**. If you can't say *why* for each, you're defaulting — stop and think.

## Build flow

1. **Ensure the brief** — read `docs/vanilla/vanilla-brief.md`; if absent, run `vanilla-discovery` first.
2. **Load the skin** — `design.md` + `tokens.css` (and `theme.css` if Tailwind).
3. **Build screen by screen, signature first** — make the brief's signature real before filling in the rest.
4. **Run the checks** (below).
5. **Hand off to review:** `vanilla-review` for taste/family/soul, and `vanilla-audit` for the measurable pass (contrast, tokens, states, touch). Clear both before merge.

## The checks (before showing)

- **Squint test** — hierarchy readable, nothing harsh?
- **States** — every interactive element and data view has its states?
- **Primitives** — every non-native control is a headless primitive, not hand-rolled, not a styled kit?
- **Tokens** — no hardcoded hex/px that a token covers?
- **Signature** — is the brief's signature actually present and doing work? If a generic version of this screen would look the same, the soul is missing.
- **Copy** — UI strings and seed data clean (no em dashes, buzzwords, "click here" links, or inconsistent names)?
- **Contrast** — text on tints/fills clears AA? Run `references/contrast.mjs` for the skin pairs, and `node references/contrast.mjs '<fg>' '<bg>'` for any product-specific pair (status seals, gray on a hover tint).
- **Render it and walk it** if a render/screenshot tool is available — verify at desktop and mobile widths, and **trigger the non-happy states** (empty, error) rather than assuming them. A clean compile is not evidence; the rendered screen is. Otherwise read the layout holistically.

## Avoid

- Reinventing the skin (new palette, font, radius scale).
- A styled UI kit instead of headless primitives.
- Hardcoded hex/px where a token exists.
- Flat hierarchy; monotone layout; missing states.
- Mixed depth strategies (the family uses surface ladder + hairlines).
- Ignoring the brief's signature — the most important failure.

## Portability

Plain Markdown, works in Claude Code and OpenCode. No agent-specific tools, slash commands, or hardcoded paths; "if a render tool is available" stays conditional.
