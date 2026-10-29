# 003 — Remove the invisible second backdrop blur from the sticky topbar

- **Status**: TODO
- **Commit**: d96bd3c (plus uncommitted section-motion work on main)
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file, 2 lines

## Problem

```css
/* assets/css/main.css:236-255 — current */
.topbar { position: sticky; … background: color-mix(in oklch, var(--background) 72%, transparent);
  backdrop-filter: blur(12px) saturate(140%); -webkit-backdrop-filter: blur(12px) saturate(140%); }
.topbar-inner { … background: color-mix(in oklch, var(--background) 80%, transparent);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
```

`.topbar-inner` is a child of `.topbar` (layouts/partials/topbar.html:1-2). An element with `backdrop-filter` is a Backdrop Root, so the inner filter only sees the outer bar's own flat translucent fill, never the page. Blurring a flat fill produces no visible change. Yet the browser still runs a second blur pass every scroll frame, on every page, under a sticky element. Safari is especially affected.

## Target

Delete the two `backdrop-filter` lines from `.topbar-inner` only. The outer bar keeps its blur and saturation, so the result looks the same.

## Steps

1. In `main.css`, remove `backdrop-filter: blur(12px);` and `-webkit-backdrop-filter: blur(12px);` from the `.topbar-inner` rule.

## Boundaries

- Do NOT touch `.topbar`, `.toolbar`, `.video-play span` or the mobile nav blur.

## Verification

- **Mechanical**: `npm run motion:check` passes.
- **Feel check**: compare screenshots of the topbar over the hero canvas and over a card, before and after, in both themes. They should be identical to the eye.
- **Done when**: `grep -n "backdrop-filter" assets/css/main.css` no longer lists the `.topbar-inner` lines.
