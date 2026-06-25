# Vanilla

Vanilla is Vanilla's design-system skill. Activate it and the interfaces you build
belong to the same visual family — recognizably Vanilla — while each product keeps
its own layout and signature. **The skin is Vanilla; the soul is the product's.**

It is a set of portable `SKILL.md` skills that work in **both Claude Code and
OpenCode**.

## What's here

- `.claude/skills/vanilla/` — the hub skill (entry point).
  - `references/design.md` — the design system (canonical, agnostic source).
  - `references/tokens.css` — canonical CSS custom properties.
  - `references/theme.css` — Tailwind v4 preset (references tokens.css).
- `.claude/skills/vanilla-discovery/` — the soul interview; writes `vanilla-brief.md` to a product's repo.
- Satellites (`vanilla-build`, `vanilla-review`, `vanilla-direction`) — added in later phases.

## Install

Copy the skills into a project or your home config:

- **Per project:** copy `.claude/skills/` into the target repo root.
- **Global (both tools):** copy the `vanilla*` folders into `~/.claude/skills/`.

Claude Code and OpenCode both read `.claude/skills/` and `~/.claude/skills/`.

## Activate

Ask the agent to use the `vanilla` skill when building product UI. It loads the
family from `references/` and walks the discover → build → review flow.

## Develop

Run the validator after editing skills or tokens:

```bash
node scripts/validate-skills.mjs
```

It checks skill-name portability (kebab-case, matches folder, no `:`) and the
token chain (`theme.css` must reference `tokens.css`, never redeclare values).

> Note: this repo ships a `.gitignore` that overrides the user's global
> `**/.claude/` ignore, so `.claude/skills/` is versioned here.

## Specs & plans

- Spec: `docs/superpowers/specs/2026-06-25-vanilla-design-system-skill.md`
- Plans: `docs/superpowers/plans/`
