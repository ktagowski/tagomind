# 002 — Fast, asymmetric press feedback that the magnetic pull can't override

- **Status**: TODO
- **Commit**: d96bd3c (plus uncommitted section-motion work on main)
- **Severity**: HIGH
- **Category**: Physicality / Interruptibility
- **Estimated scope**: 2 files, about 15 lines

## Problem

```css
/* assets/css/main.css:289-292 — current */
.btn { … transition: transform .25s cubic-bezier(.16,1,.3,1), box-shadow .3s, background-color .2s, border-color .2s, color .2s; }
.btn:hover { transform: translateY(-1px); … }
.btn:active { transform: translateY(0) scale(0.98); }
/* main.css:1039 */
.is-magnetic { transition: transform .25s cubic-bezier(.16,1,.3,1), … }
/* main.css:962-963 */
.practice-project-link { … transition: transform .2s; }
.practice-project-link:hover { transform: rotate(8deg); }
```

```js
/* assets/js/app.js:846 — current */
el.style.transform = "translate(" + (dx * 8).toFixed(1) + "px," + (dy * 6).toFixed(1) + "px)";
```

Three issues:
- **Slow press.** Press-in runs at 250ms, symmetric with release. The budget is 100–160ms.
- **Override.** On `.btn-primary` and `.practice-project-link`, the inline magnetic `transform` beats `.btn:active` and `:hover { rotate(8deg) }`. So primary buttons have no press feedback, and the project arrow's rotation snaps away on the first pointermove.
- **No press state.** `.icon-btn`, `.segmented button`, `.practice-project-link` and `.video-play span` have no `:active` state.

## Target

- **Magnetic pull** writes the individual `translate` property, which composes with `transform`:
  ```js
  el.style.translate = (dx * 8).toFixed(1) + "px " + (dy * 6).toFixed(1) + "px";
  /* pointerleave: */ el.style.translate = "";
  ```
- **Press is fast in, normal out** (asymmetric):
  ```css
  .btn:active, .icon-btn:active, .segmented button:active, .practice-project-link:active, .video-play:active span { transition-duration: .12s; }
  .icon-btn:active, .segmented button:active { transform: scale(.97); }
  .practice-project-link:active { transform: rotate(8deg) scale(.94); }
  .video-play:active span { transform: scale(.97); }
  ```
- **The magnetic transition** animates `translate` with `.25s cubic-bezier(.23,1,.32,1)` in addition to the existing list. The reduced-motion rule `.is-magnetic { transform: none !important; }` becomes `.is-magnetic { translate: none !important; }`.

## Steps

1. In `app.js` `initMagnetic`, swap `style.transform` for `style.translate` (two places).
2. In `main.css:1039`, prepend `translate .25s cubic-bezier(.23,1,.32,1), ` to the `.is-magnetic` transition. In the reduced-motion block (main.css:1057), change `transform` to `translate`.
3. Append the press rules from the Target after the `.btn:active` rule. They sit inside the same `@layer components`.
4. Give `.icon-btn` and `.segmented button` `transition: transform .2s cubic-bezier(.23,1,.32,1)`, unless they already have a transform transition. Append, don't replace, existing properties.

## Boundaries

- Do NOT remove the magnetic effect or the 8° hover rotation.
- Do NOT change colours or sizes.

## Verification

- **Mechanical**: `node --check assets/js/app.js`, `hugo --gc --minify`, `npm run motion:check`.
- **Feel check**:
  - Press and hold "Collaborate" in the topbar: it visibly dips to 0.98 within about 120ms while still pulled toward the cursor. Release eases back over 250ms.
  - Hover the round project arrow: it rotates 8° and stays rotated while the pointer moves.
  - Press the theme toggle: it dips to 0.97.
- **Done when**: `grep -n "style.transform" assets/js/app.js` no longer matches in `initMagnetic`.
