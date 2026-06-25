# Vanilla Shell Archetypes

The **app shell** is the navigation frame around the product's surfaces: sidebar, top bar, page shape. The structure of a shell is a *solved problem* — these five archetypes are proven starting points so no one reinvents the frame each time. Pick one in `vanilla-discovery`, record it in the brief, and build it in `vanilla-build`.

> **An archetype is the frame, not the product.** It decides the navigation structure only. The signature, content, hierarchy, density, and domain still come from the brief — **two Console apps should not look alike.** If they do, the soul is missing, not the shell. Archetypes fight wasted effort, never differentiation.

All measurements bind to the skin: the sidebar **shares the `canvas`** (a `hairline` separates it, never a different fill), the active nav item is a quiet surface lift + weight (lavender only as a thin accent), bars are thin bands with a hairline edge, and elevation uses the shadow tokens. Mix or deviate when the brief asks — name the deviation in the brief.

## Console — sidebar + top bar, full-width

**For:** dashboards, admin, monitoring, anything with many sections.
**Frame:** left sidebar (~240–280px, sections, collapsible) + a thin top bar (breadcrumb/context left; search, primary action, profile, theme toggle right). Content is full-width with consistent gutters.
**Watch:** the top bar must not compete with the page's focal point; the sidebar serves the content (width says so), it isn't a peer.

## Focused — top bar only, contained

**For:** single-purpose tools, wizards, forms, checkout, onboarding.
**Frame:** minimal top bar (wordmark + exit/progress), no sidebar. One centered column at a narrow max-width (~560–720px). Everything points at the single task.
**Watch:** resist adding nav "just in case" — the absence of chrome *is* the design.

## Workbench — split (list + detail)

**For:** inbox, CRM, triage, editors — navigate items, then work one.
**Frame:** a list column (~320–400px) beside a detail panel; an optional thin sidebar for sections/filters. Selection persists; the detail panel is the focus. Higher density than Console.
**Watch:** one clear selected state in the list; the detail leads, the list supports.

## Reader — centered, minimal chrome

**For:** docs, long-form content, articles, simple settings.
**Frame:** a single reading measure (~680–760px), generous type and whitespace, no sidebar (an unobtrusive TOC at most), little-to-no top bar.
**Watch:** typography and rhythm carry this one; quiet is the point, not emptiness — still give it a focal point and a signature.

## Canvas — full-bleed with floating panels

**For:** visual editors, maps, boards, diagram/design tools.
**Frame:** the work surface fills the viewport; floating panels (toolbar, inspector, layers) sit over it with a surface lift + shadow. Optional thin top bar. The canvas is the product.
**Watch:** panels float without crowding the work; depth (shadow tokens) separates them from the canvas, not heavy borders.
