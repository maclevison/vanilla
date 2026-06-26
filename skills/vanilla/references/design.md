---
version: alpha
name: Vanilla-design-analysis
description: A near-black product-focused canvas built around the deepest dark surface in the system (the canvas), light gray text (ink), and a signature Vanilla lavender-blue (the primary accent) used as the single chromatic accent. The system reads as software-craft documentation: dense, technical, and quietly luxurious. Display type is set in Inter at 500–700 with measured negative tracking. Cards live as charcoal panels (surface-1) with hairline borders. The accent lavender appears on the brand mark, focus rings, and a few intentional CTAs — never decoratively. Page rhythm leans on product UI screenshots framed in dark panels rather than atmospheric color.
---

> Values are canonical in `tokens.css` (default) and may be overridden per client by `brand.css`. This document defines the **semantics and rules** — what each token means and how to use it — never the literal values. To see current values, read `tokens.css`.

## Overview

Vanilla's canvas is the deepest dark surface in the system — `--vanilla-canvas` is essentially pure black with a faint blue tint. On top sits a four-step surface ladder (`--vanilla-surface-1` through `--vanilla-surface-4`) for cards, panels, and lifted tiles, with hairline borders running from `--vanilla-hairline` up through `--vanilla-hairline-strong` and `--vanilla-hairline-tertiary`. Light gray text (`--vanilla-ink`) carries the body and headlines.

The single chromatic accent is **Vanilla lavender-blue** `--vanilla-primary` — used on the brand mark, focus rings, and the primary CTA button. A lighter hover state (`--vanilla-primary-hover`) and a focus-tinted variant (`--vanilla-primary-focus`) extend the same hue. Vanilla avoids saturated greens, oranges, reds, etc. on the canvas — the only semantic color is `--vanilla-success` for status pills and the rare success indicator.

Display type runs **Inter** at weight 500–700 with negative letter-spacing scaling from -3.0px at the largest display size down to 0 at body. Body sizes also run Inter, and JetBrains Mono is reserved for code snippets in product screenshots.

The page rhythm is **dense product screenshots** — Vanilla leads with high-fidelity captures of the product UI (issue list, project view, dashboard) framed in `--vanilla-surface-1` panels with `--vanilla-radius-xl` corners. The chrome is intentionally minimal so the app screenshots can do the heavy lifting.

**Key Characteristics:**
- **Dark-canvas system** — `--vanilla-canvas` is the deepest dark in the system, a near-black surface.
- **Lavender-blue brand accent** (`--vanilla-primary`) — used scarcely on brand mark, focus, and the primary CTA.
- Four-step surface ladder (canvas → surface-1 → surface-2 → surface-3 → surface-4) carries hierarchy without shadow.
- Display tracking pulls aggressively negative (-3.0px at the largest size); body holds at -0.05px.
- Cards use `--vanilla-radius-lg` corners with 1px hairline borders — never pill, rarely the screenshot radius.
- **Product UI screenshots** dominate the page. The chrome is a dark frame for the app.
- No second chromatic color. No atmospheric gradients. No spotlight cards.

## Colors

> Source: Vanilla design system — base tokens for dashboards and panels.

### Brand & Accent
- **Lavender-Blue** (`--vanilla-primary`): The signature Vanilla accent — primary CTA, brand mark, link emphasis.
- **Lavender Hover** (`--vanilla-primary-hover`): Lighter lavender — hovered state of the primary CTA.
- **Lavender Focus** (`--vanilla-primary-focus`): Focus-ring tint — focused inputs, focused buttons.
- **Brand Secure** (`--vanilla-brand-secure`): Muted lavender-gray — used in "Vanilla Security" surfaces.

### Surface
- **Canvas** (`--vanilla-canvas`): Default page background — near-pure black with a faint blue tint.
- **Surface 1** (`--vanilla-surface-1`): One step above canvas — feature cards, pricing cards, product screenshot panels.
- **Surface 2** (`--vanilla-surface-2`): Two steps above — featured pricing card, hovered cards.
- **Surface 3** (`--vanilla-surface-3`): Three steps above — line-tertiary backgrounds, sub-nav.
- **Surface 4** (`--vanilla-surface-4`): Four steps above — bg-level-3, deepest lifted surface.
- **Hairline** (`--vanilla-hairline`): 1px borders on cards and dividers.
- **Hairline Strong** (`--vanilla-hairline-strong`): Stronger 1px borders — input focus rings.
- **Hairline Tertiary** (`--vanilla-hairline-tertiary`): Tertiary borders for nested surfaces.
- **Inverse Canvas** (`--vanilla-inverse-canvas`): Pure white — surface of the inverse pill CTA on a small set of section openers.
- **Inverse Surface 1** (`--vanilla-inverse-surface-1`): One step above inverse canvas.
- **Inverse Surface 2** (`--vanilla-inverse-surface-2`): Two steps above inverse canvas.

### Text
- **Ink** (`--vanilla-ink`): All headlines and emphasized body type — light gray.
- **Ink Muted** (`--vanilla-ink-muted`): Secondary type — meta info on hero panels.
- **Ink Subtle** (`--vanilla-ink-subtle`): Tertiary type — deselected pricing tabs, footer columns.
- **Ink Tertiary** (`--vanilla-ink-tertiary`): Quaternary — disabled, footnotes.

### Semantic
- **Success Green** (`--vanilla-success`): Status pills, success indicators. The only semantic color on the canvas.
- **Overlay** (`--vanilla-overlay`): Pure black overlay scrim for modals.

## Typography

### Font Family

- **Inter** (`--vanilla-font-sans`) — the system typeface; fallback `Inter, -apple-system, system-ui, Segoe UI, Roboto`. Carries everything from display-xl through captions and button labels.
- **JetBrains Mono** (`--vanilla-font-mono`) — monospace cut; fallback `ui-monospace, SF Mono, Menlo`. Used for code snippets in product screenshots and for status / ID tokens.

The surface treats display and body sizes as one continuous voice; the size change is silent.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `--vanilla-text-display-xl` | 80px | 600 | 1.05 | -3.0px | Largest hero headline |
| `--vanilla-text-display-lg` | 56px | 600 | 1.10 | -1.8px | Section opener headlines |
| `--vanilla-text-display-md` | 40px | 600 | 1.15 | -1.0px | Sub-section headlines |
| `--vanilla-text-headline` | 28px | 600 | 1.20 | -0.6px | Pricing tier titles, CTA banner heading |
| `--vanilla-text-card-title` | 22px | 500 | 1.25 | -0.4px | Feature card title |
| `--vanilla-text-subhead` | 20px | 400 | 1.40 | -0.2px | Lead body, intro paragraphs |
| `--vanilla-text-body-lg` | 18px | 400 | 1.50 | -0.1px | Hero subhead, lead paragraphs |
| `--vanilla-text-body` | 16px | 400 | 1.50 | -0.05px | Default body |
| `--vanilla-text-body-sm` | 14px | 400 | 1.50 | 0 | Card body, footer columns |
| `--vanilla-text-caption` | 12px | 400 | 1.40 | 0 | Captions, meta, status |
| (button label) | 14px | 500 | 1.20 | 0 | All button labels |
| `--vanilla-text-eyebrow` | 13px | 500 | 1.30 | 0.4px | Section eyebrow (slight positive tracking) |
| `--vanilla-text-mono` | 13px | 400 | 1.50 | 0 | JetBrains Mono for code in product screenshots |

### Principles

- **Aggressive negative tracking on display** (-3.0px at 80px ≈ 4% of size).
- **Single voice from display to body.** Display-xl at 600 → body at 400 — same family (Inter), narrower weights.
- **Eyebrow uses positive tracking** (+0.4px) — contrast against the negative-tracked display marks the eyebrow as taxonomy.
- **Mono only in code contexts.** JetBrains Mono lives inside product screenshots — not on the chrome.

### Note on Fonts

**Inter** is the canonical Vanilla typeface — free, variable, and widely available (Google Fonts / self-hosted). Use weights 500 / 600 / 700 for display and 400 for body. On macOS, `-apple-system, system-ui` is an acceptable fallback. For mono, **JetBrains Mono** at weight 400 is the standard; **Geist Mono** is a viable alternative.

## Layout

### Spacing System

- **Base unit**: 4px.
- **Tokens**: `--vanilla-space-xxs` · `--vanilla-space-xs` · `--vanilla-space-sm` · `--vanilla-space-md` · `--vanilla-space-lg` · `--vanilla-space-xl` · `--vanilla-space-xxl` · `--vanilla-space-section`.
- Card interior padding: `--vanilla-space-lg` on feature/pricing cards; `--vanilla-space-xl` on testimonial cards; `--vanilla-space-xxl` on CTA banners.
- Pill button padding: `--vanilla-space-xs` vertical · 14px horizontal — Vanilla's compact button spec.
- Form input padding: `--vanilla-space-xs` vertical · `--vanilla-space-sm` horizontal.

### Grid & Container

- Max content width sits around 1280px.
- Card grids are 3-up at desktop, 2-up at tablet, 1-up at mobile.
- Pricing tier grid is 3-up; comparison strip below shows checkmarks per tier.
- Product screenshot panels span full content width — they're the protagonist.

### Whitespace Philosophy

The dark canvas IS the whitespace. Sections separate by lift onto surface-1 panels, not by gaps in white. Within a panel, generous `--vanilla-space-lg` gaps between content blocks; `--vanilla-space-section` between sections.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow, no border | Default for body type, hero text, footer |
| 1 (charcoal lift) | `--vanilla-surface-1` background on canvas, 1px `--vanilla-hairline` | Default cards, product panels |
| 2 (surface-2 lift) | `--vanilla-surface-2` background, 1px `--vanilla-hairline-strong` | Featured pricing card, hovered cards |
| 3 (surface-3 lift) | `--vanilla-surface-3` background | Sub-nav, dropdown menus |
| 4 (focus ring) | 2px `--vanilla-primary-focus` outline at 50% opacity | Focused input, focused button |

Vanilla's depth is carried by surface ladder + hairline borders. The system resists drop shadows on dark almost entirely.

### Decorative Depth

- **Product UI screenshots** dominate as decorative depth.
- **No atmospheric gradients, no spotlight cards.**
- **Subtle white edge highlight** on the top edge of lifted panels — gives the dark surface a faint "pixel rendered" feel.

## Shapes

### Border Radius Scale

| Token | Use |
|---|---|
| `--vanilla-radius-xs` | Small chips, status badges |
| `--vanilla-radius-sm` | Inline tags |
| `--vanilla-radius-md` | All buttons, form inputs |
| `--vanilla-radius-lg` | Pricing cards, feature cards, testimonial cards |
| `--vanilla-radius-xl` | Product screenshot panels |
| `--vanilla-radius-xxl` | Oversized CTA banners (rare) |
| `--vanilla-radius-pill` | Pricing tab toggles, status pills |
| `--vanilla-radius-full` | Avatar circles |

### Photography & Illustration Geometry

- Product UI screenshots dominate; they sit in `--vanilla-radius-xl` tiles with `--vanilla-space-lg` outer padding.
- Customer logo tiles render at small sizes (~24px logo height) on `--vanilla-canvas` with no border.
- Avatar circles in testimonial cards use `--vanilla-radius-full` at 32–40px sizes.

## Components

### Buttons

**`button-primary`** — Lavender CTA. The default primary CTA across all pages.
- Background `--vanilla-primary`, text `--vanilla-on-primary`, button-label type, padding `--vanilla-space-xs` 14px, rounded `--vanilla-radius-md`.
- Pressed state shifts the background to `--vanilla-primary-focus`.
- Hover state shifts the background to `--vanilla-primary-hover` (lighter lavender).

**`button-secondary`** — Charcoal button. Used for secondary CTAs ("Sign in", "Read changelog").
- Background `--vanilla-surface-1`, text `--vanilla-ink`, button-label type, padding `--vanilla-space-xs` 14px, rounded `--vanilla-radius-md`. 1px `--vanilla-hairline` border.

**`button-tertiary`** — Plain text button.
- Background `--vanilla-canvas`, text `--vanilla-ink`, button-label type, rounded `--vanilla-radius-md`, padding `--vanilla-space-xs` 14px.

**`button-inverse`** — White-on-dark inverse CTA.
- Background `--vanilla-inverse-canvas`, text `--vanilla-inverse-ink`, button-label type, rounded `--vanilla-radius-md`, padding `--vanilla-space-xs` 14px.

### Pricing Tabs

**`pricing-tab-default`** + **`pricing-tab-selected`** — Pill-toggle on `/pricing`.
- Default: `--vanilla-canvas` background, `--vanilla-ink-subtle` text, rounded `--vanilla-radius-pill`, padding 6px 14px.
- Selected: `--vanilla-surface-2` background, `--vanilla-ink` text — selected = surface lift.

### Cards & Containers

**`pricing-card`** — Each tier on `/pricing`.
- Background `--vanilla-surface-1`, text `--vanilla-ink`, body type, rounded `--vanilla-radius-lg`, padding `--vanilla-space-lg`. 1px `--vanilla-hairline` border.

**`pricing-card-featured`** — Recommended tier — surface lift to surface-2.
- Background `--vanilla-surface-2`, otherwise identical structure.

**`feature-card`** — Generic feature highlight tile.
- Background `--vanilla-surface-1`, text `--vanilla-ink`, body type, rounded `--vanilla-radius-lg`, padding `--vanilla-space-lg`.

**`product-screenshot-card`** — The dominant card type — frames a high-fidelity Vanilla app UI screenshot.
- Background `--vanilla-surface-1`, text `--vanilla-ink`, body type, rounded `--vanilla-radius-xl`, padding `--vanilla-space-lg`.

**`testimonial-card`** — Customer quote with avatar + name + role.
- Background `--vanilla-surface-1`, text `--vanilla-ink`, body-lg type, rounded `--vanilla-radius-lg`, padding `--vanilla-space-xl`.

**`customer-logo-tile`** — Small tile in the customer marquee.
- Background `--vanilla-canvas`, text `--vanilla-ink-subtle`, caption type, rounded `--vanilla-radius-xs`, padding `--vanilla-space-md`.

**`cta-banner`** — Closing CTA panel near page bottom.
- Background `--vanilla-surface-1`, text `--vanilla-ink`, headline type, rounded `--vanilla-radius-lg`, padding `--vanilla-space-xxl`.

### Inputs & Forms

**`text-input`** + **`text-input-focused`** — Form fields on `/contact/sales` and signup overlays.
- Background `--vanilla-surface-1`, text `--vanilla-ink`, body type, rounded `--vanilla-radius-md`, padding `--vanilla-space-xs` `--vanilla-space-sm`.
- Focused state retains the same surface; the focus ring is a 2px `--vanilla-primary-focus` outline at 50% opacity.

### Status & Build Page

**`changelog-row`** — Each row in `/build` (changelog page) listing version, date, and changes.
- Background `--vanilla-canvas`, text `--vanilla-ink`, body type, rounded `--vanilla-radius-xs`, padding `--vanilla-space-lg` 0. 1px `--vanilla-hairline` bottom rule.

**`status-badge`** — Small status pill.
- Background `--vanilla-surface-2`, text `--vanilla-ink-muted`, caption type, rounded `--vanilla-radius-pill`, padding 2px `--vanilla-space-xs`.

### Navigation

**`top-nav`** — Sticky dark bar with the Vanilla wordmark left, primary nav links centered, and a `button-secondary` ("Sign in") + `button-primary` ("Get started") pair right.
- Background `--vanilla-canvas`, text `--vanilla-ink`, body-sm type, height 56px.

### Footer

**`footer`** — Dense link grid on `--vanilla-canvas` with the Vanilla wordmark left.
- Background `--vanilla-canvas`, text `--vanilla-ink-subtle`, caption type, padding 64px `--vanilla-space-xl`.

## Do's and Don'ts

### Do

- Reserve `--vanilla-canvas` as the system's anchor surface — the faint blue tint is intentional.
- Use `--vanilla-primary` lavender ONLY for: brand mark, primary CTA, focus ring, link emphasis.
- Use the four-step surface ladder for hierarchy. Avoid skipping levels.
- Pair display weight 600 with body weight 400 — Vanilla resists 700+ display weights.
- Apply negative letter-spacing aggressively on display.
- Use product UI screenshots as the protagonist of every section.
- Compose CTAs as `--vanilla-radius-md` corners.

### Don't

- Don't use lavender as a section background or card fill.
- Don't introduce a second chromatic accent (orange, pink, green).
- Don't add atmospheric gradients or spotlight cards.
- Don't pill-round CTAs.
- Don't use true black (`--vanilla-overlay` is reserved for scrims, not the canvas) as the canvas.
- Don't combine multiple bright accents in product screenshot mockups.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop-XL | 1440px | Default desktop layout |
| Desktop | 1280px | Card grid 3-up maintained |
| Tablet | 1024px | Card grid 3-up → 2-up |
| Mobile-Lg | 768px | Pricing comparison becomes accordion; nav hamburger |
| Mobile | 480px | Single-column; display-xl scales 80px → ~36px |

### Touch Targets

- CTAs hold ≥40px tap height across viewports.
- Pricing tab pills hold ≥36px tap height; touch viewports grow to ≥44px.
- Form inputs hold ≥44px tap target on touch.

### Collapsing Strategy

- **Top nav**: links collapse to hamburger below 768px.
- **Card grids**: 3-up → 2-up at 1024px → 1-up below 768px.
- **Pricing comparison**: per-tier accordion below 768px.
- **Display type**: `--vanilla-text-display-xl` scales toward `--vanilla-text-display-md` on mobile.

### Image Behavior

- Product UI screenshots maintain aspect ratio and never crop.
- Customer logos in the marquee may collapse from 6-up to 3-up below 768px.

## Light Theme

Vanilla ships dark by default and a light counterpart as the *same skin inverted* — not a different identity. Same Inter, same lavender as the single accent, same surface-ladder + hairline model. Only surfaces, ink, hairlines, the accent value (for legibility), and the depth strategy change.

- **Activation:** `<html data-theme="light">`. No attribute = dark. Tokens are redefined under `:root[data-theme="light"]` in `tokens.css`; `theme.css` (Tailwind) inherits via the vars, no rebuild.
- **Surfaces invert:** `--vanilla-canvas` becomes off-white (not pure white); cards lift toward white; `--vanilla-ink` is dark in four levels; hairlines are light.
- **Accent stays lavender, value nudged:** the default `--vanilla-primary` fails AA on light surfaces, so the light theme redefines `--vanilla-primary` darker (hue preserved, ≥4.5:1 as text and as fill). The accent's identity is the hue; the value carries the function — the same way the system desaturates semantic colors per theme.
- **Depth inverts:** dark carries elevation through the surface ladder + hairlines, with almost no shadow. On light the ladder (white-on-off-white) is too subtle, so elevation adds **shadow** (`--vanilla-shadow-1` / `--vanilla-shadow-2`), which resolve to `none` in dark. The white edge-highlight on lifted panels is a dark-only trick; on light it is replaced by the shadow. The `--vanilla-inverse-*` pill CTA is dark-only.

Light is a *state* of the fixed skin, chosen per project (dark / light / both) — never a per-product re-paint.

## Iteration Guide

1. Focus on ONE component at a time and reference it by its component name.
2. When introducing a section, decide first which surface lift it lives on.
3. Default body to `--vanilla-text-body` at weight 400.
4. Run `node scripts/validate-skills.mjs` after edits.
5. Add new variants as separate component entries.
6. Treat lavender as scarce: brand mark, primary CTA, focus, link emphasis.
7. Lead every section with a product UI screenshot.

## Known Gaps

- The four-step surface ladder is Vanilla's canonical surface spec (`bg-level-3`, `line-tint`, etc.) — treat its tokens as the base for any dashboard.
- Form-field error and validation styling is not yet documented.
- Light mode is an official second state of the skin — see "Light Theme". Dark remains the default and the family's face.
- A richer color-tag palette (red, orange, yellow, green, blue, purple) for priorities and labels lives in the in-product surfaces shown in mockups, not on the marketing chrome.
- Inter and JetBrains Mono are the canonical, freely-distributed Vanilla typefaces.
</content>
</invoke>
