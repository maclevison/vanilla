# Vanilla

[![install](https://img.shields.io/badge/install-plugin_%7C_curl-8b5cf6)](#install)
![license](https://img.shields.io/badge/license-MIT-blue)
![release](https://img.shields.io/github/v/release/maclevison/vanilla)

**Vanilla is a design system you turn on.** The interfaces you build instantly belong to one visual family — recognizable at a glance — while every product keeps its own layout and personality.

> **The skin is Vanilla; the soul is the product's.**

- **One family, many products** — every UI is unmistakably the same system, yet never a clone.
- **Product-grade craft, built in** — real hierarchy, motion, complete states, accessible primitives. No "AI-generated" look.
- **Fixed skin, free soul** — color, type, depth, and icons are locked; layout, domain, and each product's *signature* are yours.

Vanilla ships as a set of plain `SKILL.md` skills — **portable across Claude Code, OpenCode, and claude.ai** — and, for Claude Code, as an optional **plugin** that adds native updates and a soft review nudge on top of the same skills.

---

## Install

Same design system — pick how you deliver it.

### As a Claude Code plugin — recommended

```
/plugin marketplace add maclevison/vanilla
/plugin install vanilla@vanilla
```

You get the same skills **plus** native `/plugin` updates and a **soft review nudge**: when you change UI in a Vanilla project and finish a turn, the plugin reminds the agent to run `vanilla-review` before wrapping up — once per session, never a hard gate.

### As portable skills — Claude Code · OpenCode · claude.ai

One command, no clone needed (installs to `~/.claude/skills/`, which both Claude Code and OpenCode read):

```bash
curl -fsSL https://raw.githubusercontent.com/maclevison/vanilla/main/install.sh | bash
```

Then ask your agent to **use the `vanilla` skill**. The two delivery methods coexist — the plugin is a thin wrapper over these same skills, not a dependency.

<details>
<summary><b>More install options</b> — per-project, OpenCode's native folder, from a clone, manual, updates</summary>

**Per-project** — into a target repo's `.claude/skills/`:

```bash
curl -fsSL https://raw.githubusercontent.com/maclevison/vanilla/main/install.sh | bash -s -- --project ./my-app
```

**Pick the destination layout** with `--target` (the skills are identical, only the folder differs):

| `--target` | Global | Per-project |
|---|---|---|
| `claude` *(default)* | `~/.claude/skills/` | `./.claude/skills/` |
| `opencode` | `~/.config/opencode/skills/` | `./.opencode/skills/` |
| `agents` | `~/.agents/skills/` | `./.agents/skills/` |

OpenCode reads **all** of these, so `claude` already works there — `opencode` only matters when you want an OpenCode-only project to stay free of a `.claude/` folder.

**From a clone** (for contributors, or to track updates with a symlink):

```bash
git clone https://github.com/maclevison/vanilla.git
cd vanilla
./install.sh                    # global, into ~/.claude/skills/
./install.sh --project .        # into ./.claude/skills/
./install.sh --link             # symlink instead of copy — pull to update
```

**Manual** — copy the `vanilla*` folders from `skills/` into the target repo's `.claude/skills/` (or `~/.claude/skills/` for a global install).

**Updates** — plugin users update with `/plugin`. Skill users run `install.sh --check` (or ask the agent to use the `vanilla-update` skill), which compares the installed version against the latest release and prints the update command.

</details>

---

## How it works

![The Vanilla flow — discover → build → review & audit, with optional direction, all under the vanilla hub](assets/flow.svg)

1. **Discover** — a short interview captures the product's *soul* into a `vanilla-brief.md`.
2. **Direction** *(optional)* — amplify character within the fixed skin.
3. **Build** — assemble the UI on top of the skin, guided by the brief.
4. **Review & audit** — taste (`vanilla-review`) plus evidence (`vanilla-audit`). Ship when both clear.

The agent runs this under the **`vanilla` hub** — ask it to *use the vanilla skill* and it invokes the right satellites in order.

---

## The skills

| Skill | Role | When to use |
|---|---|---|
| **`vanilla`** | Hub / orchestrator | Entry point for building any product UI |
| **`vanilla-discovery`** | Interview the soul | Start of a new project, before any code |
| **`vanilla-brand`** | Brand the skin per client | Once per company — capture their identity into `brand.css` |
| **`vanilla-build`** | Construction | Build or extend the UI from the brief |
| **`vanilla-direction`** | Extra character | When the product needs stronger visual personality |
| **`vanilla-review`** | Taste pass | Judge craft, family, and soul before merge |
| **`vanilla-audit`** | Evidence pass | Verify the measurable quality before merge |
| **`vanilla-update`** | Stay current | Update the installed skills to the latest release |

<details>
<summary><b>What each skill does</b></summary>

- **`vanilla` — the hub.** Loads the family (`design.md`, `tokens.css`, `theme.css`, `motion.md`) and runs the `discover → build → review & audit` flow (+ direction on demand). It orchestrates; it doesn't duplicate.
- **`vanilla-discovery` — the soul.** A short interview capturing the real user, task, domain, *feel*, **signature**, and stack, persisted to `vanilla-brief.md` in the project's `docs/vanilla/`. The main antidote to convergence. Offers `git init` on a new project.
- **`vanilla-brand` — the per-client skin.** Run once per client to capture their identity (accent, neutrals, type, radii, density, elevation) into a `brand.css` that overrides only the `--vanilla-*` tokens they change. A client that never runs it keeps the default skin; the engine stays invariant. AA is enforced over the effective tokens by `vanilla-audit`.
- **`vanilla-build` — the construction.** Builds from the brief with real craft: hierarchy (weight + color + ink ramp), the surface ladder, motion < 300ms, complete states. Uses headless primitives (Base UI / Reka UI) and Lucide icons, applies the theme, and inherits the client's `brand.css` if present.
- **`vanilla-direction` — the character.** On demand, decides *where to spend boldness within the fixed skin* — signature, layout, motion, density, expressive Inter — in one place. Never repaints the skin.
- **`vanilla-review` — the taste pass.** A strict review against three bars: **craft** (would a design lead sign it?), **family** (unmistakably Vanilla?), **soul** (does it carry the brief's signature?). Judges by default; rebuilds only when asked.
- **`vanilla-audit` — the evidence pass.** The measurable sibling of review: WCAG contrast on both themes, token fidelity (no hardcoded hex/px, no undefined vars), responsive/touch targets, complete states, family-mechanical conformance. Run both before merge.
- **`vanilla-update` — stay current.** Updates the installed skills to the latest release (detects the install, compares versions, runs the installer).

</details>

---

## Concept — skin vs soul

**Non-negotiable (the skin — identical across every project):** palette and color · **Inter** type · lavender accent · the *surface ladder* (canvas → surface-1..4) and hairlines · radius and spacing scales · **Lucide** icons · **headless primitives** (Base UI / Reka UI) — never a styled UI kit.

**Free (the soul — decided per product):** layout, composition, hierarchy, and focus · density within range · which screens exist · content and voice · the **signature** — the one element that could only exist in *this* product.

> Rule of thumb: if the change alters *what the brand looks like*, it's skin (fixed). If it alters *what this product does*, it's soul (free).

---

<details>
<summary><b>The skin — internals, themes, and per-client brand</b></summary>

### The skin

The skin lives in `skills/vanilla/references/`:

- **`design.md`** — the semantic source (the "why" behind each decision).
- **`tokens.css`** — the canonical technical source: CSS custom properties (`--vanilla-*`).
- **`theme.css`** — the **Tailwind v4** preset (`@theme`) that *references* `tokens.css` (never redeclaring values).
- **`motion.md`** — the family's motion layer (curves, durations, decision-before-how).
- **`shells.md`** — app-shell archetypes (Console / Focused / Workbench / Reader / Canvas).
- **`contrast.mjs`** — the WCAG contrast checker over the tokens (used by `vanilla-audit`).

The `design.md → tokens.css → theme.css` chain makes Tailwind **inherit the skin at runtime**: change one value in `tokens.css` and it propagates everywhere, no rebuild.

### Themes (dark / light)

Dark is the default and the family's face. Light is the **same skin inverted** (`:root[data-theme="light"]`): same Inter, same lavender (tuned to pass AA), inverted surface ladder + shadows. Choose per project at discovery: **dark / light / both**. "Both" generates a toggle (Lucide sun/moon) with persistence and an anti-FOUC script.

### Brand (per client)

A client's identity lives in a per-client **`brand.css`** from [`vanilla-brand`](#the-skills), loaded **last** (`tokens.css` → `theme.css` → `brand.css`) so it wins by cascade with no rebuild; everything it omits falls through to the default skin. AA over the effective tokens is checked by `vanilla-audit` (`contrast.mjs --brand`), which suggests a hue-preserving fix for any failing pair.

</details>

<details>
<summary><b>Default stack</b></summary>

| Layer | Choice | Note |
|---|---|---|
| Type | **Inter** (+ JetBrains Mono) | Fixed part of the skin |
| CSS | **Tailwind v4** (`theme.css` preset) | Recommended, not required — without Tailwind, import `tokens.css` |
| Primitives | **Base UI** (React) · **Reka UI** (Vue) | Headless; never a styled UI kit (Material/Vuetify/Chakra/Ant) |
| Icons | **Lucide** | `lucide-react` / `lucide-vue-next` — same icons in both frameworks |

</details>

<details>
<summary><b>Repository layout</b></summary>

```
.claude-plugin/
├── plugin.json          plugin manifest (wires the Stop hook)
└── marketplace.json     marketplace entry (root-as-plugin, source "./")
hooks/
├── hooks.json           Stop hook (asyncRewake)
└── nudge-review.sh      the review nudge (pure bash + git)
skills/
├── vanilla/             hub
│   ├── SKILL.md
│   └── references/      design.md · tokens.css · theme.css · motion.md · shells.md · contrast.mjs
├── vanilla-discovery/
├── vanilla-brand/
├── vanilla-build/
├── vanilla-direction/
├── vanilla-review/
├── vanilla-audit/
└── vanilla-update/
install.sh               installer (skills → Claude Code / OpenCode / claude.ai)
scripts/                 zero-dep tests + the skills validator
```

The skills are versioned at `skills/` in the repo root. The plugin (root-as-plugin) auto-discovers them; `install.sh` copies or symlinks them into each agent's skills directory — so the repo itself carries no `.claude/` folder.

</details>

---

## Contributing

Run the validator after editing skills or tokens (zero dependencies):

```bash
node scripts/validate-skills.mjs
```

It checks skill portability (kebab-case names, OpenCode-compatible), the `theme.css → tokens.css` token chain, the brief template, the build/review/direction references, and the light-theme block.

Audit the skin's contrast directly:

```bash
node skills/vanilla/references/contrast.mjs                  # check the skin pairs on both themes
node skills/vanilla/references/contrast.mjs '#8a8f98' '#010102'   # ad-hoc pair (quote hex — # is special in the shell)
```

```text
  #8a8f98 on #010102  →  6.42:1  [AA]
  AA normal (4.5): PASS   AA large (3.0): PASS
```

The plugin's manifests and Stop hook have their own zero-dep tests: `node scripts/test-plugin-manifests.mjs` and `node scripts/test-nudge-hook.mjs`.

---

<sub>Flow diagram source: [`assets/flow.mmd`](assets/flow.mmd) — regenerate with `npx -y @mermaid-js/mermaid-cli -i assets/flow.mmd -o assets/flow.svg -b "#010102"`.</sub>
