# Motion plans

Written by the `improve-animations` audit at d96bd3c. Gold standards G1–G12 (`npm run motion:check`) must stay green after each plan. Nothing listed in docs/motion.md as signature motion is removed.

| # | Plan | Severity | Status |
|---|---|---|---|
| 001 | [Interruptible project chapter build](001-interruptible-project-chapters.md) | HIGH | DONE (gold check pending) |
| 002 | [Fast, asymmetric press feedback](002-press-feedback.md) | HIGH | DONE (gold check pending) |
| 003 | [Topbar double backdrop blur](003-topbar-double-backdrop.md) | MEDIUM | DONE (gold check pending) |
| 004 | [Reduced-motion hover](004-hover-reduced-motion.md) | MEDIUM | DONE (gold check pending) |
| 005 | [Easing token, one reveal, card hover](005-motion-tokens.md) | MEDIUM | DONE (gold check pending) |

**Order:** 001, 002, 003, 004, then 005 last. 005 rewrites every curve, so run it after the others to avoid excerpt drift.

**Not planned (rejected or deferred at vetting):**
- **Removal suggestions** for the page-head double rise, the header glow drift, the plate hover lift and the magnetic pull on the nav CTA. They conflict with the standing rule that nothing is removed unless asked.
- **The hero canvas O(N²) neighbour search and per-edge strokes.** Measured frame p95 is 16.7ms, so this is not a real cost.
- **`--slide` on the parent.** It changes once per chapter, across 5 children.
- **Permanent `will-change` on the pinned cards.** They are animated by the view timeline throughout the pin.

**Missed opportunities (additive, not planned yet):**
- Explorer filter, sort and view switches teleport. They could use a 150ms opacity-only settle.
- The theme toggle recolours the page in one frame. A View Transition crossfade would fit, since view transitions are already on.
- The mobile nav drawer appears with no motion.
- The BibTeX disclosure snaps open and pushes content down.
