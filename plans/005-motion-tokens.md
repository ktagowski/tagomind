# 005 — One easing token, one reveal; card hover transitions stop snapping

- **Status**: TODO
- **Commit**: d96bd3c (plus uncommitted section-motion work on main)
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file, about 40 replacements

## Problem

There are three hand-typed ease-out curves for one job: `cubic-bezier(.16,1,.3,1)` ×26, `cubic-bezier(.23,1,.32,1)` ×5, and `cubic-bezier(.2,.7,.2,1)` ×1 (`.fx-rise`, main.css:879). None are tokens.

The `.fx-scroll-soft` reveal is defined twice with different curves and durations:

```css
/* main.css:883 */ .fx-scroll, .fx-scroll-soft { transition: opacity .45s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
/* main.css:1437-1439 (unlayered) */
:is(.card, .pub-card, .collab-card, .research-interest, .pub-row, .panel, .exp-row, .footer-col).fx-scroll-soft {
  transition: opacity .5s cubic-bezier(.23,1,.32,1), transform .8s cubic-bezier(.23,1,.32,1);
}
```

The unlayered rule also replaces `.card, .pub-row { transition: border-color .2s, box-shadow .25s; }` (main.css:389-391). So on revealed cards, the border and shadow hover changes snap instead of easing.

Two smaller issues:
- `.path li` uses bare `ease` on an entrance (main.css:1124: `transition: opacity .5s ease, …`).
- The plate draw-in stagger is 110ms (main.css:1336), outside the 30–80ms band.

## Target

```css
:root { --ease-out: cubic-bezier(0.23, 1, 0.32, 1); --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); }
```

- Every `cubic-bezier(.16,1,.3,1)`, `cubic-bezier(.23,1,.32,1)` and `cubic-bezier(.2,.7,.2,1)` in main.css becomes `var(--ease-out)`. The pinned `pk{k}` keyframes in layouts/index.html keep their own scroll curve.
- The card reveal keeps its stronger travel (32px plus scale .975), and its transition list includes the hover properties:
  `transition: opacity .5s var(--ease-out), transform .8s var(--ease-out), border-color .2s, box-shadow .25s;`
- `.path li`: `transition: opacity .5s var(--ease-out), transform .6s var(--ease-out);`
- Plate stagger: `animation-delay: calc(.12s + var(--k, 0) * 70ms);`

## Steps

1. Add the two tokens to the first `:root` block (main.css:18).
2. `sed -i '' -e 's/cubic-bezier(\.16,1,\.3,1)/var(--ease-out)/g' -e 's/cubic-bezier(\.23,1,\.32,1)/var(--ease-out)/g' -e 's/cubic-bezier(\.2,\.7,\.2,1)/var(--ease-out)/g' assets/css/main.css`
3. Apply the three edits in the Target.

## Boundaries

- Do NOT change any duration except those listed. Do NOT touch `layouts/index.html`.

## Verification

- **Mechanical**: `grep -c "cubic-bezier" assets/css/main.css` shows only the two token definitions. `npm run motion:check` passes.
- **Feel check**: hover a project card on /projects/ after it has revealed; the border colour eases in over about 200ms. The reveals look unchanged, since the curves differ only marginally.
