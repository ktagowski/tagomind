# 004 — Reduced motion: hover feedback keeps colour, drops movement

- **Status**: TODO
- **Commit**: d96bd3c (plus uncommitted section-motion work on main)
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file, about 8 lines

## Problem

These hover transforms have no `prefers-reduced-motion` handling. Under reduced motion they still move, and the glyph snaps because only its transition is removed:

```css
/* assets/css/main.css — current */
.btn:hover { transform: translateY(-1px); }                         /* :291 */
.wordmark:hover .glyph { transform: rotate(-10deg) scale(1.06); }   /* :275 */
.link-arrow:hover svg { transform: translateX(3px); }               /* :507 */
.pager-tile:hover small svg { transform: translateX(-3px); }        /* :725 */
.pager-tile.is-next:hover small svg { transform: translateX(3px); } /* :726 */
.practice-project-link:hover { transform: rotate(8deg); }           /* :963 */
.video-play:hover span { transform: scale(1.04); }                  /* :1179 */
/* reduce block, main.css:1056-1061 */
.wordmark .glyph { transition: none; }
```

## Target

Reduced motion means fewer, gentler animations, not zero. Keep the colour and border feedback and drop the position changes. Append this next to the existing `(hover: none), (pointer: coarse)` reset (main.css:1386):

```css
@media (prefers-reduced-motion: reduce) {
  .btn:hover, .btn-primary:hover, .wordmark:hover .glyph, .link-arrow:hover svg, .pager-tile:hover small svg,
  .pager-tile.is-next:hover small svg, .practice-project-link:hover, .video-play:hover span { transform: none; }
}
```

## Steps

1. Append the Target block directly after the coarse-pointer hover reset.

## Boundaries

- Do NOT gate or change the hover colour changes.
- Do NOT touch press (`:active`) rules (plan 002 owns those).

## Verification

- **Feel check**: DevTools Rendering → emulate `prefers-reduced-motion: reduce`. Hovering buttons, the logo, link arrows and pager tiles changes colour or border only, with nothing moving.
- **Mechanical**: `npm run motion:check` (G10 stays PASS).
