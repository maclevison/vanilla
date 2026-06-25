---
name: vanilla-discovery
description: Use at the start of building a new product UI with Vanilla (greenfield), before any code, to capture the product's soul. Runs a short interview — user, task, domain, feel, signature, stack — and writes a vanilla-brief.md to the project root. That brief is the input for building and the anchor that keeps each product distinct within the Vanilla family.
---

# Vanilla Discovery

The skin is fixed (Vanilla). This skill captures the **soul** — what makes *this* product itself — so the build doesn't collapse into a generic template. Output: a `vanilla-brief.md` in the project root.

## When to run

- Greenfield: before building any UI, when there is no `vanilla-brief.md` yet.
- The `vanilla` hub invokes this at step 1. It can also be run directly.

## How to interview

Keep it **short and respectful of the developer's time**. Don't ask twenty questions. Work one area at a time, and for each: propose a sensible default or 2–4 options inferred from the product name and context, then let them confirm or correct. Stop as soon as you can write a confident brief — the `Feel` and `Signature` are the parts worth pushing on; the rest can often be inferred.

Cover these dimensions (they are the brief's sections):

1. **Product** — what is it, in one line.
2. **User** — the real person (not "users"): who, where they are, what they did 5 minutes before and will do 5 minutes after.
3. **Task** — the verb; the one thing they come to do.
4. **Domain** — 5+ concepts, metaphors, and vocabulary from this product's world.
5. **Feel** — in words that mean something. Reject "clean/modern". Push for "calm like a reading app", "dense like a trading floor", "warm like a notebook".
6. **Signature** — the one element (visual, structural, or interaction) that could only exist for THIS product. If you can't name one, keep probing.
7. **Density** — tight / balanced / airy, within the family range.
8. **Key surfaces** — the main screens/areas that exist.
9. **Stack** — framework (React or Vue), Tailwind (yes/no). Primitives follow the framework (Base UI for React, Reka UI for Vue); icons are always Lucide.

## Before writing

Show the developer a draft of the brief and get a confirmation or edits. Only then write the file.

## Where to write

Write `vanilla-brief.md` to the **target project root** (the product's repo). If the current directory is the Vanilla skill repo itself (it contains `.claude/skills/vanilla/SKILL.md` and no product code), do NOT write a stray file — say that there is no target product here, and offer to treat the run as an example (printing the brief without saving) or to take a path.

## The brief template

Write exactly this structure (fill every section; keep it concise — it's an anchor, not an essay):

```markdown
# Vanilla Brief — <Product Name>

> The soul of this product, captured by vanilla-discovery. The skin is fixed (Vanilla); this brief is what makes this product itself. Build and review read from here.

## Product
<one line: what it is>

## User
<the real person — who, where, what they did 5 min before / will do 5 min after>

## Task
<the verb — the one thing they come to do>

## Domain
<5+ concepts, metaphors, vocabulary from this product's world>

## Feel
<words that mean something — not "clean/modern">

## Signature
<the one element that could only exist for THIS product>

## Density
<tight | balanced | airy>

## Key surfaces
<the main screens/areas that exist>

## Stack
- Framework: <React | Vue>
- Tailwind: <yes | no>
- Primitives: <Base UI (React) | Reka UI (Vue)>
- Icons: Lucide
```

## Handoff

After writing `vanilla-brief.md`, return to the flow: the `vanilla` hub continues to the build step (`vanilla-build`), now guided by the brief.

## Portability

Plain Markdown, works in Claude Code and OpenCode. No agent-specific tools, slash commands, or hardcoded paths.
