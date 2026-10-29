# Motion on tagomind.com

Part 1 is the rules every animation on the site follows. Part 2 reviews what the site does today against those rules, with evidence and a verdict for each item. Part 3 is the fix list in priority order.

Reviewed on 2026-10-29, after commit `184454d`. Measurements come from Playwright against the dev server; see "How to verify" at the end.

---

## Part 1. Guidelines

### Principles

1. **Motion explains a change.** Every animation must answer one question: what changed, where it came from, or what belongs together. If it answers none, cut it.
2. **One orchestrated moment per view.** Each page gets one entrance (the title) and one signature (the study plates and paper figures drawing in). Everything else is quiet.
3. **Reading text is never hidden behind a reveal.** Body copy, lists, facts and links must be visible without JavaScript, after an anchor jump, in find-in-page and in print. Reveals are for media, figures and cards only.
4. **Never write to scroll.** No wheel hijacking, no scroll-jacking, no snapping on the page itself. Scroll-linked effects read the scroll position and never change it. On mouse and trackpad devices, do not put a sideways scroll box in the path of vertical reading: browsers lock a whole trackpad gesture to it as soon as the gesture has any sideways movement, and the page stops. Carousels use `overflow: clip` and `translate` there; touch devices may keep native horizontal scrolling.
5. **Animate paint, never layout.** Use `transform`, `opacity`, `filter` and `clip-path`. Never animate `height`, `top`, `margin` or `font-size`. An element in normal flow (the sticky top bar) may change colour and shadow on scroll, never size.
6. **Ambient motion is rare and bounded.** At most one ambient (looping) layer per page, only in the home hero. It pauses when offscreen and when the tab is hidden. Inner pages have no infinite loops; status cues (live badge, scroll cue) stop after three loops or on first interaction.
7. **Reduced motion keeps all information.** Under `prefers-reduced-motion: reduce` and `?still=1`, every element shows its end state instantly. Movement is removed, never content. Counters show their final value; drawn lines are drawn.
8. **Pointer effects are a bonus.** Spotlight, magnetic pull and hover lifts run only on `(hover: hover) and (pointer: fine)`. Nothing is understandable only on hover. Magnetic pull is at most 8px and only on the one or two primary actions in a view.
9. **Progressive enhancement for new platform features.** View transitions and scroll-driven animations sit behind `@supports` or degrade silently. The page must look finished without them.

### Tokens

Use these instead of ad-hoc values. They match what already reads well on the site.

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(.16, 1, .3, 1)` | Everything that enters or settles |
| `--ease-inout` | `cubic-bezier(.65, 0, .35, 1)` | Crossfades, stage swaps |
| `--dur-press` | 120ms | Press, focus, colour change |
| `--dur-ui` | 240ms | Hover, toggles, menus |
| `--dur-reveal` | 500ms | Card and media reveals |
| `--dur-entrance` | 900ms | Title entrance, motif draw-in, count-up |
| `--stagger` | 45–80ms per item | Words, list items, motif parts |
| Stagger cap | 600ms total | No sequence waits longer before its last item starts |
| Reveal distance | 10–14px | Vertical offset for reveals |

Infinite durations (`linear` loops) are allowed only for the hero canvas.

### Support (as of 2026)

| Feature | Chrome / Edge | Safari | Firefox | Site behaviour without it |
|---|---|---|---|---|
| Scroll-driven animations (`animation-timeline: view()`) | Yes, since 115 | Yes, since 26 | Behind a flag | Plates do not drift on scroll |
| Cross-document view transitions (`@view-transition`) | Yes, since 126 | Yes, since 18.2 | No | Plain page load |

Sources: [Chrome docs on cross-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document), [web-features explorer](https://web-platform-dx.github.io/web-features-explorer/features/cross-document-view-transitions), [scroll-driven animations guide](https://camoa.github.io/dev-guides/css/modern-css/scroll-driven-animations), [Mozilla Connect thread on Firefox status](https://connect.mozilla.org/t5/ideas/implement-css-scroll-driven-animations-animation-timeline/idc-p/116613). Firefox status for scroll-driven animations was not confirmed by an official source; recheck before relying on it.

### Checklist for any new motion

- Which question from principle 1 does it answer?
- Does it hide reading content before it plays? If yes, move it to a figure or drop it.
- Does it touch layout properties or scroll position? If yes, redesign it.
- Is it infinite? If yes, it must be the hero canvas, or stop after three loops.
- What does it look like with reduced motion and with `?still=1`? Both must show the final state.
- Does it run offscreen? Pause it with an `IntersectionObserver`.
- Does it fit the tokens above?

---

## Gold standards (automated)

Every change to motion must pass `npm run motion:check` (scripts/motion-check.mjs) against a running dev server. It scrolls eight pages with real Chrome scroll gestures, momentum included, and fails on any of the following.

| # | Standard | Threshold | Why it matters |
|---|---|---|---|
| G1 | No scroll takeover: vertical wheel or touch input is never `preventDefault`ed | 0 | Taking over the wheel always feels sticky at the edges of the taken-over area |
| G2 | No script writes to the scroll position while the user scrolls | 0 | Programmatic scrolling fights the user's momentum and reads as a jump |
| G3 | Scrolling never gets stuck and never reverses mid-gesture | 0 | A stuck or reversing page is the most visible kind of jank |
| G4 | Layout shift during load and scroll | CLS ≤ 0.001 | Shifts read as jumps; the italic headline face is preloaded for this reason |
| G5 | In-flow blocks move exactly with the scroll | 0 frames off by more than 1.5px | Catches late layout changes, height toggles and transforms on whole sections |
| G6 | The pinned projects panel never jumps | 0 frames | It must either stay put or move exactly with the scroll |
| G7 | No long tasks while scrolling | 0 | A task over 50ms drops frames |
| G8 | No layout work during scroll | ≤ 0.05 layouts per frame | Layout reads after style writes force a full layout every frame; scroll handlers read cached geometry only (ResizeObserver refreshes it), and SVG parts animate opacity only |
| G9 | Nothing animates off screen | 0 canvas redraws, 0 running infinite animations | Off-screen loops cost battery and frames; the hero network stops when scrolled away, glows and badges pause via `initAmbientPause` |
| G10 | Reduced motion | 0 running time-based animations | Everything shows its end state instantly; scroll-driven indicators (the progress bar) only move with the user's own scroll |
| G11 | Nothing moves after a gesture ends | 0 drift | Catches snap pull and late programmatic scrolling |
| G12 | No late reveals | 0 frames | Revealed content is at least 90% visible before its top reaches 60% of the viewport; reveals start 12% below the fold |

Rules that keep these green:
- Animate only `transform`, `translate`, `scale` and `opacity`. On SVG parts, animate `opacity` only; move the whole drawing instead.
- Scroll handlers do arithmetic on cached geometry. Measure on load, resize, font load and through a `ResizeObserver` on the body, never per frame.
- Pointer effects ignore the synthetic zero-movement `pointermove` Chrome sends after each scroll step.
- Loops pause off screen. Anything that writes the scroll position or prevents wheel input needs a new standard first.


> **Status after the restore (2026-10-29).** The cuts recommended in Parts 2 and 3 were applied once and then reverted. Removing motion was the wrong response to the review. The motion is back (reveals, title words, glows and drift, draw-ins, progress bar, scroll cue, spotlight, count-up), rebuilt so every gold standard above passes. Count-up skips ranks and fractions ("Top 2", "4 of 7") so it never shows a false intermediate value.

### Motion skills

Four skills in `~/.claude/skills` hold the craft bar these standards enforce. Use them on any motion change:

| Skill | Use it to |
|---|---|
| `review-animations` (Emil Kowalski; run it yourself as `/review-animations`) | Review a motion diff: easing, duration budgets, origin, interruptibility, reduced motion |
| `improve-animations` (Emil Kowalski) | Audit all motion and write prioritized plans |
| `apple-design` (Emil Kowalski) | Apple-style fluid motion: springs, momentum, interruptibility, materials |
| `fixing-motion-performance` (ibelick) | Find and fix jank: scroll-linked motion, layout thrash, layers, blur |

Applied on 2026-10-29: scroll-linked motion (progress bar, hero canvas fade, research reading lines) moved from scroll events to CSS scroll and view timelines; hover motion gated to fine pointers; plate hover 0.35s, dots 0.3s, path line 0.9s, path stagger 80ms.

## Part 2. Review of the current site

Verdicts: **keep** as is, **tune** (keep the idea, change parameters), **cut**.

### Fixed during this review

| Issue | Evidence | Fix |
|---|---|---|
| Wheel over the projects slider was captured and turned into card steps | Page moved 0px for 1,200px of wheel; slider jumped 2,432px sideways | Removed the wheel handler (commit `184454d`) |
| Scrolled top bar shrank by 10px | All content jumped 10px when crossing 24px of scroll | Bar now changes paint only |
| Hero keep-out lagged during fast scroll | Re-measured every 16 frames with layout reads in the scroll handler | Measured in document coordinates, offset by scroll each frame |
| Trackpad scrolling stopped over the projects slider | Any vertical gesture with 1px of sideways movement over the slider moved the page 0px. Chrome latches the gesture to the nearest box that can scroll sideways, even an `overflow: hidden` one | On mouse and trackpad devices the slider is `overflow: clip` (not a scroll box) and cards move with `translate`; sideways swipes, shift-wheel, arrows and arrow keys flip one card. Touch keeps native swiping |

### Entrances (play once on load)

| Motion | Where | Verdict | Why |
|---|---|---|---|
| Headline words rise out of blur, 80ms stagger | Home hero | **Keep** | The one orchestrated moment on the home page |
| Lead, author line, buttons follow the headline | Home hero | **Keep** | Same sequence, reads as one entrance |
| Title words rise, 45ms stagger, capped | Every inner page and paper | **Tune** | The title block also rises as a whole (`fx-rise` on the page head), so titles move twice. Keep the words, drop the block rise |
| Header glow fades in | Inner pages, papers | **Keep** | Quiet, one-shot |

### Ambient (loops)

| Motion | Where | Verdict | Why |
|---|---|---|---|
| Network canvas with pulses and cursor lean | Home hero | **Tune** | It is the signature, but it renders 60 frames per second after fading to invisible mid-page. Pause it when the hero leaves the viewport |
| Hero halo drifts forever (16s) | Home hero | **Cut the drift** | Second ambient layer behind the canvas; nobody can see it move. Keep the static wash |
| Header glow drifts forever (18s) | Every inner page and paper | **Cut the drift** | Infinite motion on reading pages breaks principle 6 |
| Live badge pulses forever | Explorer cards, project pages | **Tune** | Three running at once on the Explorer. Pulse three times, then stay solid |
| Scroll cue bobs forever | Home hero | **Tune** | Stop after three loops or on first scroll |

### Scroll-triggered

| Motion | Where | Verdict | Why |
|---|---|---|---|
| Study plates and paper figures draw in part by part | Slider, Explorer, figures | **Keep** | The site's signature. It shows how each system is built |
| LEPISZCZE tiles twinkle in | Plates and figures | **Keep** | Same signature, suits a grid |
| Plate motif drifts with scroll (Chromium, Safari) | Slider, Explorer cards | **Keep** | Read-only, small, degrades to static |
| Research stage follows the row being read | Home research directions | **Keep** | Explains which figure belongs to which question |
| Reading line fills along each research row | Home research directions | **Keep** | Same, and it is paint-only |
| Count-up on numbers and facts | Home numbers, paper facts | **Keep** | Draws the eye to real figures; final value is exact and shown instantly with reduced motion |
| Path line draws, items stagger in | Home path | **Tune** | Last item waits 1s. Cap the stagger at 600ms |
| Fade-and-rise reveal on section heads, rows and blocks | 30 elements across 10 templates, 16 of them on the home page | **Tune** | This is the generic "everything slides up" pattern, and it hides reading content: paper body, Problem and Key finding, facts, publication rows, notes rows, expertise, process steps. Keep reveals only on cards and media with a figure; show text immediately |

### Pointer

| Motion | Where | Verdict | Why |
|---|---|---|---|
| Cursor spotlight on card surfaces | All cards and panels | **Keep** | Fine-pointer only, paint-only, feels tactile |
| Magnetic pull, 8px | Every primary button | **Tune** | Includes the top-bar Collaborate and the PDF button on papers. Limit to the hero buttons and the collaborate cards |
| Hover lifts, arrow nudges, logo tilt, poster zoom | Throughout | **Keep** | Small, consistent, answer the hover |

### Navigation

| Motion | Where | Verdict | Why |
|---|---|---|---|
| Cross-document crossfade, 220ms | All pages | **Keep** | Cheap, degrades to a normal load in Firefox |
| Named title transition | Detail pages only | **Tune** | List pages do not name their titles, so the list-to-detail morph never happens. Name the card title on hover-target cards, or drop the name |
| Smooth scroll for in-page links | All pages | **Keep** | Turned off under reduced motion |
| Slider: cards slide with `translate` on mouse and trackpad, native snap scrolling on touch | Home projects | **Keep** | Never captures vertical scrolling. Verified with synthetic wheel input; confirm with a real trackpad |

### Consistency

Six easing curves and durations from 150ms to 1.6s are in use. The tokens in Part 1 replace them.

---

## Part 3. Fix list

| Priority | Change | Files |
|---|---|---|
| 1 | Pause the hero canvas loop when the hero is offscreen | `assets/js/app.js` |
| 1 | Remove reveals from reading content; keep them on cards and media | page templates |
| 2 | Remove the infinite drift from the hero halo and header glows | `assets/css/main.css` |
| 2 | Live badge and scroll cue stop after three loops | `assets/css/main.css` |
| 2 | Titles animate once (words only) | page templates |
| 3 | Magnetic pull only on hero and collaborate primary buttons | `assets/js/app.js` |
| 3 | Introduce the easing and duration tokens and migrate | `assets/css/main.css` |
| 3 | Cap the path stagger at 600ms | `assets/css/main.css` |
| 3 | Name card titles for the list-to-detail view transition, or drop the name | templates, CSS |

---

## How to verify

```sh
# overflow, contrast, small text, running and reduced-motion animations, per page and viewport
node ~/.claude/skills/ui-measure/scripts/measure.mjs \
  --url http://127.0.0.1:1313 --pages "/,/publications/schematize/,/projects/" \
  --viewports 1440x900,390x844 --query "still=1" --out /tmp/ui-measure
```

- `?still=1` must show every end state; `?theme=dark` and `?theme=light` force the theme.
- Emulate reduced motion in DevTools (Rendering panel) and confirm nothing moves and nothing is missing.
- For scroll behaviour, wheel over every slider and sticky region: the page must keep scrolling.
