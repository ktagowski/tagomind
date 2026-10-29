# 001 — Make the project chapter build interruptible (transitions, no forced layout)

- **Status**: TODO
- **Commit**: d96bd3c (plus uncommitted section-motion work on main)
- **Severity**: HIGH
- **Category**: Interruptibility / Performance
- **Estimated scope**: 2 files, about 30 lines

## Problem

When the homepage "Selected projects" pin crosses into a new chapter, `show()` restarts a keyframe build on the incoming card. It does this by forcing a synchronous layout in the same frame that the 0.7s translate transition starts:

```js
/* assets/js/app.js:721-724 — current */
if (changed && entering && !reduceMotion) {
  var cur = cards[i];
  cur.classList.remove("is-entering"); void cur.offsetWidth; cur.classList.add("is-entering"); // restart the build
}
```

```css
/* assets/css/main.css:1279-1285 — current */
.practice-card.is-current.is-entering .practice-copy > * { animation: chapter-rise .5s cubic-bezier(.16,1,.3,1) both; }
.practice-card.is-current.is-entering .practice-copy > :nth-child(1) { animation-delay: .12s; }
… (nth-child 2–5: .16s, .2s, .24s, .28s)
.practice-card.is-current.is-entering .study-motif svg > * { animation: motif-in .55s cubic-bezier(.16,1,.3,1) both; animation-delay: calc(.15s + var(--k, 0) * 45ms); }
/* main.css:1367 */
.js:not(.is-still) .practice-card.is-current.is-entering .study-motif > svg { animation: drawing-rise .8s cubic-bezier(.16,1,.3,1) both; }
```

This causes two problems:
1. `void cur.offsetWidth` forces a full layout on the exact frame where the user watches a transition begin. That is a hitch at the moment that matters most.
2. Keyframes restart from `opacity: 0` on every crossing. Scrolling back and forth, rapid dot clicks or holding an arrow key blanks the copy mid-transition instead of retargeting it.

## Target

Express the build as CSS **transitions** keyed on `.is-current`. Non-current cards hold the "before" state. The current card transitions to rest with a staggered delay, and leaving uses no delay. Transitions retarget from the current value, so interruption never blanks. No JS restart and no layout read are needed.

```css
@media (hover: hover) and (pointer: fine) {
  .practice-copy > *, .practice-card .study-motif svg > * { transition: opacity .5s cubic-bezier(.23,1,.32,1), transform .5s cubic-bezier(.23,1,.32,1); }
  .practice-card .study-motif > svg { transition: translate .8s cubic-bezier(.23,1,.32,1); }
  .js .practice-card:not(.is-current) .practice-copy > * { opacity: 0; transform: translateY(14px); transition-duration: .25s; }
  .js .practice-card:not(.is-current) .study-motif svg > * { opacity: 0; transition-duration: .25s; }
  .js .practice-card:not(.is-current) .study-motif > svg { translate: 0 10px; }
  .practice-card.is-current .practice-copy > :nth-child(1) { transition-delay: .12s; } /* … .16s .2s .24s .28s */
  .practice-card.is-current .study-motif svg > * { transition-delay: calc(.15s + var(--k, 0) * 45ms); }
}
@media (prefers-reduced-motion: reduce) { .practice-copy > *, .practice-card .study-motif svg > *, .practice-card .study-motif > svg { transition: none !important; } }
```

SVG parts carry their designed opacity as presentation attributes. Removing the `opacity: 0` override returns each part to its own designed value, so the shading survives.

## Repo conventions to follow

- Motion rules for the slider live in the "Selected projects: timed chapter transitions" block (`main.css` around line 1268). Edit that block in place.
- The exemplar for retargetable state is `.stage-item` / `.stage-item.is-active` (`main.css:1045-1046`).

## Steps

1. In `main.css`, replace the five `.is-entering .practice-copy` rules and the `.is-entering .study-motif svg > *` rule with the Target transition rules. Keep the `--k` nth-child rules.
2. Change the `drawing-rise` selector list (main.css:1365-1367) by dropping the `.practice-card.is-current.is-entering` line. The svg rise now comes from the Target `translate` transition.
3. In the reduced-motion block below `@keyframes chapter-rise`, keep the existing lines and add the transition reset from the Target.
4. In `app.js` `show()`, delete the `is-entering` restart (lines 721-724) and the `c.classList.remove("is-entering")` line. `is-current` is the only state now.

## Boundaries

- Do NOT touch the generated `pk{k}` keyframes in `layouts/index.html` or the card `translate`/`scale`/`opacity` chapter transitions.
- Do NOT change snapping, `jump()`, dots, or the wheel handler.
- If the code doesn't match these excerpts, STOP and report.

## Verification

- **Mechanical**: `node --check assets/js/app.js`, then `hugo --gc --minify` builds clean, then `npm run motion:check` passes G1–G12 on all pages.
- **Feel check**: on the homepage at 1440×900, scroll through all five projects.
  - Copy rises line by line on each new project, and the plate parts settle one after another.
  - Scroll quickly back and forth across one boundary: the copy never blinks to empty, and it reverses from wherever it is.
  - Hold → on the focused slider: no replay flicker.
  - DevTools Animations at 10%: the transitions start on the same frame as the card glide, with no layout bar in Performance at the crossing.
  - With reduced motion on, cards switch with no movement.
- **Done when**: `grep -n "is-entering" assets/` returns nothing and the gold check passes.
