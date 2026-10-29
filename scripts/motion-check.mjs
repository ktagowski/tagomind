#!/usr/bin/env node
// Motion gold standards: scrolls each page with real Chrome scroll gestures (with fling momentum) and fails on
// anything that makes scrolling lag or jump. Run against a dev server or a static build:
//   npm run dev            # in another terminal (http://127.0.0.1:1313)
//   npm run motion:check   # or: node scripts/motion-check.mjs [baseUrl] [--pages /,/projects/]
// Standards and thresholds are documented in docs/motion.md ("Gold standards").
import { chromium } from "playwright";

const args = process.argv.slice(2);
const BASE = (args.find(a => /^https?:/.test(a)) || "http://127.0.0.1:1313").replace(/\/$/, "");
const pagesArg = args.includes("--pages") ? args[args.indexOf("--pages") + 1] : null;
const PAGES = pagesArg ? pagesArg.split(",") : ["/", "/projects/", "/projects/ai-tax/", "/publications/", "/publications/schematize/", "/research/", "/about/", "/services/"];
const VIEWPORT = { width: 1440, height: 900 };

// Instrumentation injected before any page script runs.
const INSTRUMENT = () => {
  const m = (window.__mc = { cls: 0, longTasks: 0, prevented: 0, scrollWrites: 0, frames: [], phase: "load" });
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) m.cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  try { new PerformanceObserver(l => { if (m.phase === "scroll") m.longTasks += l.getEntries().length; }).observe({ type: "longtask" }); } catch (e) {}
  const pd = Event.prototype.preventDefault;
  Event.prototype.preventDefault = function () {
    if (m.phase === "scroll" && (this.type === "wheel" || this.type === "touchmove") && Math.abs(this.deltaY || 0) >= Math.abs(this.deltaX || 0)) m.prevented++;
    return pd.call(this);
  };
  const wrap = (obj, name) => { const f = obj[name]; obj[name] = function () { if (m.phase === "scroll") m.scrollWrites++; return f.apply(this, arguments); }; };
  wrap(window, "scrollTo"); wrap(window, "scrollBy"); wrap(Element.prototype, "scrollIntoView");
  const desc = Object.getOwnPropertyDescriptor(Element.prototype, "scrollTop");
  Object.defineProperty(Element.prototype, "scrollTop", { get: desc.get, set(v) { if (m.phase === "scroll" && (this === document.documentElement || this === document.body)) m.scrollWrites++; desc.set.call(this, v); }, configurable: true });
  // Per-frame samples: scroll position, block positions (in-flow blocks must move exactly with the scroll),
  // and the pinned panel (must move with the scroll or not at all).
  function sample(t) {
    if (m.phase === "scroll") {
      // Only boxes that render (a <style> tag or display:none element has no box and would read as "not moving").
      const blocks = [...document.querySelectorAll("main > *, main > * > section, footer")].filter(el => el.getClientRects().length && !/^(fixed|sticky)$/.test(getComputedStyle(el).position) && !el.matches(".fx-scroll, .fx-scroll-soft")).slice(0, 40).map(el => el.getBoundingClientRect().top);
      const sticky = document.querySelector(".practice-sticky");
      // Late reveals: revealed content whose top has reached 60% of the viewport must be (almost) fully visible.
      const vh = innerHeight; let late = 0;
      for (const el of document.querySelectorAll(".fx-scroll, .fx-scroll-soft")) {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.6 && r.bottom > 80 && parseFloat(getComputedStyle(el).opacity) < 0.9) late++;
      }
      m.late = (m.late || 0) + (late ? 1 : 0);
      m.frames.push({ t, y: window.scrollY, blocks, sticky: sticky ? sticky.getBoundingClientRect().top : null, h: document.documentElement.scrollHeight });
    }
    requestAnimationFrame(sample);
  }
  requestAnimationFrame(sample);
};

async function scrollThrough(page, cdp) {
  const maxY = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const dirs = [];
  for (let guard = 0; guard < 40; guard++) {
    const y0 = await page.evaluate(() => scrollY);
    if (y0 >= maxY - 2) break;
    const before = await page.evaluate(() => window.__mc.frames.length);
    await cdp.send("Input.synthesizeScrollGesture", { x: VIEWPORT.width / 2, y: VIEWPORT.height / 2, yDistance: -650, speed: 1600, gestureSourceType: "mouse", preventFling: false });
    await page.waitForTimeout(500);
    const ya = await page.evaluate(() => scrollY); await page.waitForTimeout(700); const yb = await page.evaluate(() => scrollY);
    dirs.push({ from: before, to: await page.evaluate(() => window.__mc.frames.length), dir: 1, drift: Math.abs(yb - ya), at: Math.round(ya) });
    const y1 = await page.evaluate(() => scrollY);
    if (y1 <= y0 + 1) { dirs.push({ stuck: true, at: Math.round(y0) }); break; }
  }
  for (let k = 0; k < 4; k++) {
    const before = await page.evaluate(() => window.__mc.frames.length);
    await cdp.send("Input.synthesizeScrollGesture", { x: VIEWPORT.width / 2, y: VIEWPORT.height / 2, yDistance: 650, speed: 1600, gestureSourceType: "mouse", preventFling: false });
    await page.waitForTimeout(500);
    const ya = await page.evaluate(() => scrollY); await page.waitForTimeout(700); const yb = await page.evaluate(() => scrollY);
    dirs.push({ from: before, to: await page.evaluate(() => window.__mc.frames.length), dir: -1, drift: Math.abs(yb - ya), at: Math.round(ya) });
  }
  return dirs;
}

function analyse(frames, gestures) {
  let reversals = 0, blockJumps = 0, stickyJumps = 0, worstBlock = 0, worstSticky = 0, stuck = gestures.filter(g => g.stuck).map(g => g.at);
  for (const g of gestures.filter(g => !g.stuck)) {
    for (let i = g.from + 1; i < g.to; i++) {
      const a = frames[i - 1], b = frames[i];
      if (!a || !b) continue;
      const dy = b.y - a.y;
      if (g.dir * dy < -2) reversals++;
      if (a.h !== b.h) continue; // document height changed: counted by CLS instead
      const n = Math.min(a.blocks.length, b.blocks.length);
      for (let j = 0; j < n; j++) {
        const err = Math.abs((b.blocks[j] - a.blocks[j]) + dy);
        if (err > 1.5) { blockJumps++; worstBlock = Math.max(worstBlock, err); break; }
      }
      if (a.sticky !== null && b.sticky !== null) {
        const d = b.sticky - a.sticky, err = Math.min(Math.abs(d), Math.abs(d + dy));
        if (err > 1.5) { stickyJumps++; worstSticky = Math.max(worstSticky, err); }
      }
    }
  }
  const iv = frames.slice(1).map((f, i) => f.t - frames[i].t).sort((x, y) => x - y);
  const p95 = iv.length ? iv[Math.floor(iv.length * 0.95)] : 0;
  const drifts = gestures.filter(g => g.drift > 2).map(g => `${Math.round(g.drift)}px@${g.at}`);
  return { reversals, blockJumps, worstBlock, stickyJumps, worstSticky, stuck, p95, drifts };
}

const results = [];
const browser = await chromium.launch();
for (const path of PAGES) {
  const page = await browser.newPage({ viewport: VIEWPORT });
  await page.addInitScript(INSTRUMENT);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Performance.enable");
  await page.goto(BASE + path + (path.includes("?") ? "&" : "?") + "theme=light", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const m0 = Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map(x => [x.name, x.value]));
  await page.evaluate(() => { window.__mc.phase = "scroll"; });
  const gestures = await scrollThrough(page, cdp);
  await page.evaluate(() => { window.__mc.phase = "done"; });
  const m1 = Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map(x => [x.name, x.value]));
  const mc = await page.evaluate(() => window.__mc);
  const a = analyse(mc.frames, gestures);
  // Off-screen work at the bottom of the page: canvas redraws and infinite CSS animations.
  const offscreen = await page.evaluate(() => new Promise(res => {
    window.scrollTo(0, document.documentElement.scrollHeight);
    setTimeout(() => {
      let draws = 0; const c = document.getElementById("graph-bg"); let restore = null;
      if (c) { const ctx = c.getContext("2d"), f = ctx.clearRect.bind(ctx); ctx.clearRect = function () { draws++; return f.apply(this, arguments); }; restore = () => (ctx.clearRect = f); }
      setTimeout(() => {
        if (restore) restore();
        const inf = document.getAnimations().filter(x => x.playState === "running" && x.effect && x.effect.getComputedTiming().iterations === Infinity).length;
        res({ draws, inf });
      }, 1000);
    }, 400);
  }));
  const frames = mc.frames.length || 1;
  const layoutsPerFrame = (m1.LayoutCount - m0.LayoutCount) / frames;
  results.push({ path, ...a, late: mc.late || 0, cls: mc.cls, longTasks: mc.longTasks, prevented: mc.prevented, scrollWrites: mc.scrollWrites, layoutsPerFrame, offDraws: offscreen.draws, offInfinite: offscreen.inf, frames });
  await page.close();
}
// Reduced motion: nothing may run.
const rm = await browser.newPage({ viewport: VIEWPORT, reducedMotion: "reduce" });
await rm.goto(BASE + "/?theme=light", { waitUntil: "networkidle" });
await rm.waitForTimeout(1500);
const rmRunning = await rm.evaluate(() => document.getAnimations().filter(a => a.playState === "running").length);
await browser.close();

const STANDARDS = [
  ["G1 no scroll takeover (vertical wheel preventDefault)", r => r.prevented === 0, r => r.prevented],
  ["G2 no script writes to scroll during user scroll", r => r.scrollWrites === 0, r => r.scrollWrites],
  ["G3 never stuck, never reverses mid-gesture", r => r.reversals === 0 && r.stuck.length === 0, r => r.stuck.length ? "stuck@" + r.stuck.join(",") : r.reversals],
  ["G4 zero layout shift (CLS ≤ 0.001)", r => r.cls <= 0.001, r => r.cls.toFixed(4)],
  ["G5 in-flow blocks move exactly with scroll", r => r.blockJumps === 0, r => r.blockJumps ? `${r.blockJumps} frames (worst ${r.worstBlock.toFixed(0)}px)` : 0],
  ["G6 pinned panel never jumps", r => r.stickyJumps === 0, r => r.stickyJumps ? `${r.stickyJumps} frames (worst ${r.worstSticky.toFixed(0)}px)` : 0],
  ["G7 no long tasks while scrolling", r => r.longTasks === 0, r => r.longTasks],
  ["G8 no forced layout per frame (≤ 0.05 layouts/frame)", r => r.layoutsPerFrame <= 0.05, r => r.layoutsPerFrame.toFixed(3)],
  ["G11 nothing moves after the gesture ends (no snap pull)", r => r.drifts.length === 0, r => r.drifts.length ? r.drifts.join(", ") : 0],
  ["G12 no late reveals (content ≥90% visible before mid-screen)", r => r.late === 0, r => r.late ? r.late + " frames" : 0],
  ["G9 nothing animates off screen", r => r.offDraws === 0 && r.offInfinite === 0, r => `canvas ${r.offDraws}, infinite ${r.offInfinite}`],
];
let failed = 0;
for (const r of results) {
  console.log(`\n${r.path}  (${r.frames} frames sampled, frame p95 ${r.p95.toFixed(1)}ms)`);
  for (const [name, ok, val] of STANDARDS) {
    const pass = ok(r); if (!pass) failed++;
    console.log(`  ${pass ? "PASS" : "FAIL"}  ${name}: ${val(r)}`);
  }
}
const rmPass = rmRunning === 0; if (!rmPass) failed++;
console.log(`\nG10 reduced motion: ${rmPass ? "PASS" : "FAIL"} (${rmRunning} animations running on the home page)`);
console.log(failed ? `\n${failed} gold-standard failure(s).` : "\nAll gold standards pass.");
process.exit(failed ? 1 : 0);
