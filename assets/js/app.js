/* TagoMind — client runtime
   Self-contained, no dependencies. Each module no-ops if its DOM is absent.
   Sections: theme toggle · mobile nav · graph background · the Explorer. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // HSL→RGB (h,s,l in 0..1) → [r,g,b] 0..255. Shared by the accent switcher + network.
  function hslToRgb(h, s, l) {
    if (s === 0) { var v = Math.round(l * 255); return [v, v, v]; }
    var hue2rgb = function (p, q, t) {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [Math.round(hue2rgb(p, q, h + 1 / 3) * 255), Math.round(hue2rgb(p, q, h) * 255), Math.round(hue2rgb(p, q, h - 1 / 3) * 255)];
  }

  // Pluralize using [one, few, many] forms (Slavic-aware; English uses one + other).
  function tmPlural(n, f) {
    if (n === 1) return f[0];
    var d = n % 10, h = n % 100;
    if (d >= 2 && d <= 4 && !(h >= 12 && h <= 14)) return f[1] || f[0];
    return f[2] || f[1] || f[0];
  }
  var ready = function (fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  };

  /* ───────────────────────── Theme toggle ───────────────────────── */
  function initTheme() {
    var btns = document.querySelectorAll("[data-theme-toggle]");
    if (!btns.length) return;
    var sync = function () {
      var dark = document.documentElement.classList.contains("dark");
      btns.forEach(function (b) {
        b.setAttribute("aria-pressed", String(dark));
        b.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      });
    };
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var dark = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", dark);
        try { localStorage.setItem("tm-theme", dark ? "dark" : "light"); } catch (e) {}
        sync();
        window.dispatchEvent(new CustomEvent("tm:themechange"));
      });
    });
    sync();
  }

  /* ───────────────────────── Accent switcher ────────────────────── */
  function initAccent() {
    var sw = document.querySelector("[data-accent-switch]");
    if (!sw) return;
    var root = document.documentElement;
    var btn = sw.querySelector("[data-accent-btn]");
    var menu = sw.querySelector("[data-accent-menu]");
    var dots = sw.querySelectorAll("[data-accent-set]");
    var slider = sw.querySelector("[data-hue-slider]");
    var CUSTOM = ["--brand", "--brand-strong", "--brand-2", "--ring", "--brand-foreground"];
    var open = function (s) { menu.hidden = !s; btn.setAttribute("aria-expanded", String(s)); };
    var mark = function () {
      var c = root.getAttribute("data-accent") || "mono";
      dots.forEach(function (d) { d.classList.toggle("is-active", d.getAttribute("data-accent-set") === c); });
    };
    function clearCustom() { CUSTOM.forEach(function (pp) { root.style.removeProperty(pp); }); root.removeAttribute("data-accent-hue"); }
    function applyCustom(h, silent) {
      var dark = root.classList.contains("dark"), L = dark ? 62 : 45, s = 70;
      root.style.setProperty("--brand", "hsl(" + h + " " + s + "% " + L + "%)");
      root.style.setProperty("--brand-strong", "hsl(" + h + " " + s + "% " + (L - 9) + "%)");
      root.style.setProperty("--brand-2", "hsl(" + h + " " + (s - 8) + "% " + (L + 14) + "%)");
      root.style.setProperty("--ring", "hsl(" + h + " " + s + "% " + L + "%)");
      root.style.setProperty("--brand-foreground", (h >= 38 && h <= 95) ? "oklch(0.18 0.03 " + h + ")" : "oklch(0.99 0 0)");
      root.setAttribute("data-accent", "custom");
      root.setAttribute("data-accent-hue", h);
      mark();
      if (!silent) {
        try { localStorage.setItem("tm-accent", "custom"); localStorage.setItem("tm-accent-hue", String(h)); } catch (e) {}
        window.dispatchEvent(new CustomEvent("tm:themechange"));
      }
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); open(menu.hidden); });
    dots.forEach(function (d) {
      d.addEventListener("click", function () {
        var v = d.getAttribute("data-accent-set");
        clearCustom();
        if (v === "mono") root.removeAttribute("data-accent"); else root.setAttribute("data-accent", v);
        try { localStorage.setItem("tm-accent", v); localStorage.removeItem("tm-accent-hue"); } catch (e) {}
        mark(); open(false);
        window.dispatchEvent(new CustomEvent("tm:themechange"));
      });
    });
    if (slider) {
      var onHue = function () { applyCustom(parseInt(slider.value, 10), false); };
      slider.addEventListener("input", onHue);
      slider.addEventListener("change", onHue);
      slider.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    }
    document.addEventListener("click", function (e) { if (!sw.contains(e.target)) open(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") open(false); });
    window.addEventListener("tm:themechange", function () {
      if (root.getAttribute("data-accent") === "custom") applyCustom(parseInt(root.getAttribute("data-accent-hue"), 10) || 210, true);
    });
    if (root.getAttribute("data-accent") === "custom") {
      var sh = parseInt(root.getAttribute("data-accent-hue"), 10);
      if (isNaN(sh)) { try { sh = parseInt(localStorage.getItem("tm-accent-hue"), 10); } catch (e) {} }
      if (isNaN(sh)) sh = 210;
      if (slider) slider.value = sh;
      applyCustom(sh, true);
    }
    mark();
  }

  /* ───────────────────────── Mobile nav ─────────────────────────── */
  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var drawer = document.getElementById("mobile-nav");
    if (!toggle || !drawer) return;
    var open = function (state) {
      drawer.classList.toggle("is-open", state);
      toggle.setAttribute("aria-expanded", String(state));
      document.body.style.overflow = state ? "hidden" : "";
    };
    toggle.addEventListener("click", function () { open(!drawer.classList.contains("is-open")); });
    drawer.addEventListener("click", function (e) {
      if (e.target === drawer || e.target.closest("[data-nav-close]") || e.target.closest("a")) open(false);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") open(false); });
  }

  /* ─────────────────────── Graph background ─────────────────────── */
  function initGraph() {
    var canvas = document.getElementById("graph-bg");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var W = 0, H = 0, DPR = 1, nodes = [], aur = [], pulses = [], edges = [], pal;
    var sprNode = null, sprPulse = null, blend = "lighter", t = 0;
    var edgeSet = new Set(), nb_i = [], nb_d = [], cn_i = [], cn_d = [];
    var mouse = { x: 0, y: 0, px: -1, py: -1, on: false };

    function makeGlow(rgb, soft) {
      var s = 64, oc = document.createElement("canvas");
      oc.width = oc.height = s;
      var o = oc.getContext("2d");
      var g = o.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ",1)");
      g.addColorStop(0.22, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + (0.5 * soft) + ")");
      g.addColorStop(1, "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ",0)");
      o.fillStyle = g; o.fillRect(0, 0, s, s);
      return oc;
    }

    // Accent base RGBs (dark `d` / light `l`) — keep in sync with the CSS [data-accent] blocks.
    var ACCENTS = {
      mono:    { d: [226, 233, 248], l: [44, 52, 70] },
      blue:    { d: [78, 134, 240], l: [30, 80, 198] },
      violet:  { d: [176, 150, 255], l: [104, 84, 232] },
      emerald: { d: [74, 222, 168], l: [16, 158, 108] },
      amber:   { d: [244, 196, 116], l: [176, 120, 40] }
    };
    function mix(a, b, k) {
      return [Math.round(a[0] + (b[0] - a[0]) * k), Math.round(a[1] + (b[1] - a[1]) * k), Math.round(a[2] + (b[2] - a[2]) * k)];
    }
    function setPalette() {
      var dark = document.documentElement.classList.contains("dark");
      var acc = document.documentElement.getAttribute("data-accent") || "mono";
      var base;
      if (acc === "custom") {
        var hh = parseInt(document.documentElement.getAttribute("data-accent-hue"), 10);
        if (isNaN(hh)) hh = 210;
        base = hslToRgb(hh / 360, 0.72, dark ? 0.7 : 0.46);
      } else {
        var def = ACCENTS[acc] || ACCENTS.mono;
        base = dark ? def.d : def.l;
      }
      var white = [255, 255, 255], ink = [16, 18, 26];
      blend = dark ? "lighter" : "source-over";
      pal = dark
        ? { aur: [mix(base, [150, 158, 184], 0.55), mix(base, [176, 182, 206], 0.55)], aurA: 0.05,
            node: mix(base, white, 0.12), nodeA: 0.8, line: base, lineA: 0.32,
            pulse: mix(base, white, 0.55), cursorA: 0.6, glowSoft: 0.85 }
        : { aur: [mix(base, [122, 130, 152], 0.45)], aurA: 0.04,
            node: base, nodeA: 0.78, line: mix(base, white, 0.22), lineA: 0.26,
            pulse: mix(base, ink, 0.15), cursorA: 0.45, glowSoft: 0.45 };
      sprNode = makeGlow(pal.node, pal.glowSoft);
      sprPulse = makeGlow(pal.pulse, 1);
    }
    setPalette();

    var lastW = 0, lastH = 0;
    function resize() {
      W = canvas.clientWidth; H = canvas.clientHeight;
      DPR = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(W * DPR)); canvas.height = Math.max(1, Math.round(H * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      if (mouse.px < 0) { mouse.px = W / 2; mouse.py = H / 2; }
      // Rebuild the graph only on first run / real resize — NOT on minor scrollbar or
      // URL-bar shifts, which would re-randomize the field and read as a jarring "zoom".
      if (nodes.length && Math.abs(W - lastW) < 64 && Math.abs(H - lastH) < 130) return;
      lastW = W; lastH = H;
      // Knowledge graph: sparse nodes + a few hubs. Edges are k-nearest (deliberate paths, not a mesh).
      var count = Math.max(40, Math.min(104, Math.round(W * H / 14500)));
      nodes = [];
      for (var j = 0; j < count; j++) {
        var isHub = Math.random() < 0.14;
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.14,
          z: isHub ? (0.85 + Math.random() * 0.3) : (0.42 + Math.random() * 0.42),
          ph: Math.random() * 6.2832, wob: 0.4 + Math.random() * 0.9, hub: isHub
        });
      }
      // Signal-pulse pool — bright dots that travel along edges (data flowing the graph).
      pulses = [];
      var pc = Math.max(7, Math.min(20, Math.round(count / 4.5)));
      for (var q = 0; q < pc; q++) pulses.push({ a: 0, b: 0, p: 1, spd: 0, life: 0 });
    }

    var TH = 234, TH2 = TH * TH;

    function spawnPulse(pl) {
      if (!edges.length) { pl.life = 0; return; }
      var e = edges[(Math.random() * edges.length) | 0];
      pl.a = e[0]; pl.b = e[1]; pl.p = 0;
      pl.spd = 0.004 + Math.random() * 0.0075;
      pl.life = 1;
    }

    var raf = null;
    function frame() {
      raf = (!reduceMotion && !document.hidden) ? requestAnimationFrame(frame) : null;
      t++;
      // Self-heal: if the stylesheet landed after init (deferred CSS), the bitmap was sized
      // off the 300×150 canvas default and CSS stretches it — giant blurry nodes and a
      // mouse-coordinate space that no longer matches the viewport. Re-sync when it drifts.
      if ((t & 31) === 0 && (canvas.clientWidth !== W || canvas.clientHeight !== H)) resize();
      var tx = mouse.on ? mouse.x : W * 0.5, ty = mouse.on ? mouse.y : H * 0.42;
      // Snappy-but-smooth cursor follow; idle drift back to centre stays slow.
      var ease = mouse.on ? 0.16 : 0.045;
      mouse.px += (tx - mouse.px) * ease;
      mouse.py += (ty - mouse.py) * ease;
      var ox = (mouse.px - W / 2), oy = (mouse.py - H / 2);

      ctx.clearRect(0, 0, W, H);

      // ── Update nodes: organic drift + depth parallax ──
      var n, p;
      for (n = 0; n < nodes.length; n++) {
        p = nodes[n];
        if (!reduceMotion) {
          p.x += p.vx * p.z + Math.sin(t * 0.005 + p.ph) * 0.05 * p.wob;
          p.y += p.vy * p.z + Math.cos(t * 0.004 + p.ph) * 0.05 * p.wob;
        }
        if (p.x < -24) p.x = W + 24; else if (p.x > W + 24) p.x = -24;
        if (p.y < -24) p.y = H + 24; else if (p.y > H + 24) p.y = -24;
        p.dx = p.x;
        p.dy = p.y;
        // Magnetic lean: nodes near the cursor reach toward it. Display-only offset —
        // the underlying positions never change, so the field can't drift or warp.
        if (mouse.on && !reduceMotion) {
          var mdx = mouse.px - p.x, mdy = mouse.py - p.y, md2 = mdx * mdx + mdy * mdy;
          if (md2 < 49284 && md2 > 1) { // 222px reach
            var md = Math.sqrt(md2);
            var pull = (1 - md / 222) * 16 * p.z; // up to ~16px on hubs
            p.dx = p.x + (mdx / md) * pull;
            p.dy = p.y + (mdy / md) * pull;
          }
        }
      }

      // ── Edges: k-nearest-neighbour graph — each node links to its 2 closest (hubs to 4),
      //    so the result reads as deliberate pathways + hub clusters, not a uniform cobweb. ──
      ctx.globalCompositeOperation = "source-over";
      edges.length = 0; edgeSet.clear();
      var lr = pal.line[0], lg = pal.line[1], lb = pal.line[2];
      var N = nodes.length;
      for (var a = 0; a < N; a++) {
        var pa = nodes[a];
        var K = pa.hub ? 4 : 2;
        nb_i.length = 0; nb_d.length = 0;
        for (var c = 0; c < N; c++) {
          if (c === a) continue;
          var pb = nodes[c];
          var ex = pa.dx - pb.dx, ey = pa.dy - pb.dy, dd = ex * ex + ey * ey;
          if (dd >= TH2) continue;
          var pos = nb_d.length;
          while (pos > 0 && nb_d[pos - 1] > dd) pos--;
          if (pos < K) {
            nb_d.splice(pos, 0, dd); nb_i.splice(pos, 0, c);
            if (nb_d.length > K) { nb_d.pop(); nb_i.pop(); }
          }
        }
        for (var m = 0; m < nb_i.length; m++) {
          var bi = nb_i[m], key = a < bi ? a * 4096 + bi : bi * 4096 + a;
          if (edgeSet.has(key)) continue;
          edgeSet.add(key); edges.push([a, bi]);
        }
      }
      for (var ei = 0; ei < edges.length; ei++) {
        var ea = nodes[edges[ei][0]], eb = nodes[edges[ei][1]];
        var gx = ea.dx - eb.dx, gy = ea.dy - eb.dy, gd = Math.sqrt(gx * gx + gy * gy);
        var al = pal.lineA * (1 - gd / TH * 0.62);
        if (al < 0.012) continue;
        ctx.strokeStyle = "rgba(" + lr + "," + lg + "," + lb + "," + al.toFixed(3) + ")";
        ctx.lineWidth = 0.55 + 0.5 * ((ea.z + eb.z) * 0.5);
        ctx.beginPath(); ctx.moveTo(ea.dx, ea.dy); ctx.lineTo(eb.dx, eb.dy); ctx.stroke();
      }

      // ── Cursor: link only to its few nearest nodes (a focus, not a fan) ──
      if (mouse.on && !reduceMotion) {
        cn_i.length = 0; cn_d.length = 0;
        for (n = 0; n < N; n++) {
          p = nodes[n];
          var cx = mouse.px - p.dx, cy = mouse.py - p.dy, cd2 = cx * cx + cy * cy;
          if (cd2 > 96100) continue;
          var cp = cn_d.length;
          while (cp > 0 && cn_d[cp - 1] > cd2) cp--;
          if (cp < 5) { cn_d.splice(cp, 0, cd2); cn_i.splice(cp, 0, n); if (cn_d.length > 5) { cn_d.pop(); cn_i.pop(); } }
        }
        for (var ci = 0; ci < cn_i.length; ci++) {
          p = nodes[cn_i[ci]];
          var d3 = Math.sqrt(cn_d[ci]), ca = pal.cursorA * (1 - d3 / 312);
          ctx.strokeStyle = "rgba(" + lr + "," + lg + "," + lb + "," + ca.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(mouse.px, mouse.py); ctx.lineTo(p.dx, p.dy); ctx.stroke();
        }
      }

      // ── Signal pulses travelling along edges (data flowing the graph) ──
      ctx.globalCompositeOperation = blend;
      for (var u = 0; u < pulses.length; u++) {
        var pl = pulses[u];
        if (pl.life <= 0 || pl.p >= 1) spawnPulse(pl);
        if (pl.life <= 0) continue;
        var na = nodes[pl.a], nb = nodes[pl.b];
        var sx = na.dx - nb.dx, sy = na.dy - nb.dy;
        if (sx * sx + sy * sy > TH2 * 1.5) { pl.life = 0; continue; }
        if (!reduceMotion) pl.p += pl.spd;
        var ppx = na.dx + (nb.dx - na.dx) * pl.p, ppy = na.dy + (nb.dy - na.dy) * pl.p;
        var fade = Math.sin(pl.p * Math.PI), ps = 8 + 8 * fade;
        ctx.globalAlpha = 0.92 * fade;
        ctx.drawImage(sprPulse, ppx - ps / 2, ppy - ps / 2, ps, ps);
      }
      ctx.globalAlpha = 1;

      // ── Nodes: soft glow + crisp core, gentle breathing ──
      for (var k = 0; k < nodes.length; k++) {
        p = nodes[k];
        var zz = Math.min(1, p.z);
        var breathe = 0.72 + 0.28 * Math.sin(t * 0.02 + p.ph);
        var coreA = pal.nodeA * zz * breathe;
        var gs = 3.0 + p.z * 1.3;
        ctx.globalCompositeOperation = blend;
        ctx.globalAlpha = coreA * 0.4;
        ctx.drawImage(sprNode, p.dx - gs / 2, p.dy - gs / 2, gs, gs);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(" + pal.node[0] + "," + pal.node[1] + "," + pal.node[2] + "," + coreA.toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(p.dx, p.dy, 0.75 + p.z * 0.55, 0, 6.2832); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    function start() { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }

    window.addEventListener("resize", function () { resize(); if (reduceMotion) requestAnimationFrame(frame); });
    window.addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; }, { passive: true });
    window.addEventListener("blur", function () { mouse.on = false; });
    document.addEventListener("mouseleave", function () { mouse.on = false; });
    document.addEventListener("visibilitychange", function () { if (!document.hidden && !reduceMotion) start(); });
    window.addEventListener("tm:themechange", function () { setPalette(); scrollFade(); if (reduceMotion) requestAnimationFrame(frame); });
    window.addEventListener("scroll", scrollFade, { passive: true });

    // Fade the canvas out as the hero scrolls away → network stays a hero-only signature.
    function scrollFade() {
      var vh = window.innerHeight || 800;
      var f = Math.max(0, Math.min(1, 1 - (window.pageYOffset || 0) / (vh * 0.55)));
      var dark = document.documentElement.classList.contains("dark");
      canvas.style.opacity = ((dark ? 0.95 : 0.72) * f).toFixed(3);
    }

    resize();
    scrollFade();
    // Re-measure the moment layout actually gives the canvas its real size (deferred CSS,
    // font swaps, orientation changes) — not just on window resize events.
    if ("ResizeObserver" in window) {
      new ResizeObserver(function () {
        if (canvas.clientWidth !== W || canvas.clientHeight !== H) {
          resize();
          if (reduceMotion) requestAnimationFrame(frame);
        }
      }).observe(canvas);
    }
    if (reduceMotion) requestAnimationFrame(frame); else start();
  }

  /* ───────────────────────────── Explorer ───────────────────────── */
  function initExplorer() {
    var root = document.getElementById("explorer");
    if (!root) return;
    var grid = document.getElementById("explorer-grid");
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".js-card"));
    var search = document.getElementById("explorer-search");
    var sortSel = document.getElementById("explorer-sort");
    var countEl = document.getElementById("explorer-count");
    var emptyEl = document.getElementById("explorer-empty");
    var clearBtn = document.getElementById("explorer-clear");
    var pillsEl = document.getElementById("explorer-pills");
    var chips = Array.prototype.slice.call(root.querySelectorAll("[data-filter-field]"));
    var viewBtns = Array.prototype.slice.call(root.querySelectorAll("[data-view]"));

    var meta = new Map();
    cards.forEach(function (c, idx) {
      meta.set(c, {
        idx: idx,
        title: (c.dataset.title || "").toLowerCase(),
        hay: (c.dataset.search || "").toLowerCase(),
        fields: (c.dataset.fields || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean),
        year: parseInt(c.dataset.year || "0", 10) || 0,
        impact: parseInt(c.dataset.impact || "0", 10) || 0
      });
    });
    var fieldLabels = {};
    chips.forEach(function (ch) { fieldLabels[ch.dataset.field] = ch.dataset.label || ch.dataset.field; });

    var state = { q: "", fields: new Set(), sort: sortSel ? sortSel.value : "year_desc", view: "grid" };

    function readURL() {
      var p = new URLSearchParams(location.search);
      if (p.has("q")) state.q = p.get("q");
      if (p.has("fields")) p.get("fields").split(",").filter(Boolean).forEach(function (f) { state.fields.add(f); });
      if (p.has("sort")) state.sort = p.get("sort");
      if (p.has("view")) state.view = p.get("view");
    }
    var urlTimer = null;
    function writeURL() {
      if (urlTimer) clearTimeout(urlTimer);
      urlTimer = setTimeout(function () {
        var p = new URLSearchParams();
        if (state.q) p.set("q", state.q);
        if (state.fields.size) p.set("fields", Array.from(state.fields).join(","));
        if (state.sort && state.sort !== "year_desc") p.set("sort", state.sort);
        if (state.view && state.view !== "grid") p.set("view", state.view);
        var qs = p.toString();
        history.replaceState(null, "", qs ? "?" + qs : location.pathname);
      }, 250);
    }

    function matches(m) {
      if (state.q) {
        var q = state.q.toLowerCase();
        if (m.title.indexOf(q) === -1 && m.hay.indexOf(q) === -1) return false;
      }
      if (state.fields.size) {
        for (var f of state.fields) { if (m.fields.indexOf(f) === -1) return false; }
      }
      return true;
    }

    function sortCards(list) {
      var s = state.sort;
      return list.sort(function (x, y) {
        var a = meta.get(x), b = meta.get(y);
        switch (s) {
          case "year_asc": return a.year - b.year || a.title.localeCompare(b.title);
          case "impact_desc": return b.impact - a.impact || b.year - a.year;
          case "az": return a.title.localeCompare(b.title);
          default: // year_desc — newest first
            return b.year - a.year || a.title.localeCompare(b.title);
        }
      });
    }

    function renderPills() {
      if (!pillsEl) return;
      pillsEl.innerHTML = "";
      var frag = document.createDocumentFragment();
      state.fields.forEach(function (f) {
        var el = document.createElement("span");
        el.className = "pill";
        el.innerHTML = "<span>" + (fieldLabels[f] || f) + "</span>";
        var x = document.createElement("button");
        x.type = "button"; x.setAttribute("aria-label", "Remove " + (fieldLabels[f] || f));
        x.innerHTML = "&times;";
        x.addEventListener("click", function () { state.fields.delete(f); apply(); });
        el.appendChild(x);
        frag.appendChild(el);
      });
      pillsEl.appendChild(frag);
      var any = state.fields.size > 0 || state.q;
      if (clearBtn) clearBtn.hidden = !any;
    }

    function apply() {
      // chips reflect state
      chips.forEach(function (ch) { ch.setAttribute("aria-pressed", String(state.fields.has(ch.dataset.field))); });
      // view
      grid.classList.toggle("is-list", state.view === "list");
      viewBtns.forEach(function (vb) { vb.setAttribute("aria-pressed", String(vb.dataset.view === state.view)); });

      var visible = [];
      cards.forEach(function (c) {
        var ok = matches(meta.get(c));
        c.hidden = !ok;
        if (ok) visible.push(c);
      });
      sortCards(visible).forEach(function (c, i) {
        c.style.order = String(i);
        c.style.setProperty("--i", String(Math.min(i, 12)));
      });

      if (countEl) {
        var forms = (countEl.dataset.forms || "project|projects|projects").split("|");
        countEl.textContent = visible.length + " " + tmPlural(visible.length, forms);
      }
      if (emptyEl) emptyEl.hidden = visible.length !== 0;
      renderPills();
      writeURL();
    }

    // wire events
    var sTimer = null;
    if (search) {
      search.value = state.q;
      search.addEventListener("input", function () {
        if (sTimer) clearTimeout(sTimer);
        sTimer = setTimeout(function () { state.q = search.value.trim(); apply(); }, 120);
      });
    }
    chips.forEach(function (ch) {
      ch.addEventListener("click", function () {
        var f = ch.dataset.field;
        if (state.fields.has(f)) state.fields.delete(f); else state.fields.add(f);
        apply();
      });
    });
    if (sortSel) { sortSel.value = state.sort; sortSel.addEventListener("change", function () { state.sort = sortSel.value; apply(); }); }
    viewBtns.forEach(function (vb) { vb.addEventListener("click", function () { state.view = vb.dataset.view; apply(); }); });
    if (clearBtn) clearBtn.addEventListener("click", function () {
      state.q = ""; state.fields.clear(); if (search) search.value = ""; apply();
    });

    // keyboard: "/" focuses search
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && search && document.activeElement !== search && !/input|textarea|select/i.test(document.activeElement.tagName)) {
        e.preventDefault(); search.focus();
      }
    });

    readURL();
    apply();
  }

  /* ─────────────────── Scroll reveal + progress bar ─────────────── */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".fx-scroll, .fx-scroll-soft"));
    if (!els.length) return;
    var still = /[?&]still=1/.test(location.search); // screenshot/no-motion mode
    if (reduceMotion || still || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("is-in"); });
      return;
    }
    // gentle stagger among matching siblings
    els.forEach(function (e) {
      var sibs = e.parentNode ? e.parentNode.children : null, idx = 0, k = 0;
      if (sibs) {
        for (var j = 0; j < sibs.length; j++) {
          var s = sibs[j];
          if (s === e) { idx = k; break; }
          if (s.classList && (s.classList.contains("fx-scroll") || s.classList.contains("fx-scroll-soft"))) k++;
        }
      }
      e.style.transitionDelay = Math.min(idx, 6) * 70 + "ms";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    els.forEach(function (e) { io.observe(e); });
  }

  function initScrollProgress() {
    var bar = document.querySelector(".scroll-progress > span");
    if (!bar) return;
    var ticking = false;
    function update() {
      ticking = false;
      var de = document.documentElement;
      var max = de.scrollHeight - de.clientHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? de.scrollTop / max : 0) + ")";
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ─────────────────── Publications slider nav ──────────────────── */
  function initPubSlider() {
    var s = document.getElementById("pub-slider");
    if (!s) return;
    function step(dir) {
      var card = s.querySelector(".pub-card");
      var w = card ? card.offsetWidth + 16 : 340;
      s.scrollBy({ left: dir * w, behavior: "smooth" });
    }
    var p = document.querySelector("[data-pub-prev]"), n = document.querySelector("[data-pub-next]");
    if (p) p.addEventListener("click", function () { step(-1); });
    if (n) n.addEventListener("click", function () { step(1); });
  }

  /* ─────────────────────────── boot ─────────────────────────────── */
  ready(function () {
    // Screenshot / no-motion mode: freeze load + scroll animations at their final frame.
    if (reduceMotion || /[?&]still=1/.test(location.search)) document.documentElement.classList.add("is-still");
    if (/[?&]fxdemo=1/.test(location.search)) { var _c = document.querySelectorAll(".js-card"); if (_c[1]) _c[1].classList.add("is-hover"); }
    initTheme();
    initAccent();
    initNav();
    initGraph();
    initReveal();
    initScrollProgress();
    initExplorer();
    initPubSlider();
    initHeroProof();
    initBibtex();
  });

  /* ───────── BibTeX disclosure + copy ───────── */
  function initBibtex() {
    document.querySelectorAll("[data-bibtex-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var art = btn.closest("article");
        var block = art && art.querySelector(".bibtex-block");
        if (!block) return;
        var hidden = block.hasAttribute("hidden");
        if (hidden) { block.removeAttribute("hidden"); btn.setAttribute("aria-expanded", "true"); }
        else { block.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false"); }
      });
    });
    document.querySelectorAll("[data-bibtex-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var code = btn.parentNode.querySelector("code");
        if (!code || !navigator.clipboard) return;
        navigator.clipboard.writeText(code.textContent.trim()).then(function () {
          var label = btn.querySelector("span");
          if (!label) return;
          var prev = label.textContent; label.textContent = "Copied";
          setTimeout(function () { label.textContent = prev; }, 1400);
        }).catch(function () {});
      });
    });
  }

  /* ───────── Hero proof line — calm crossfade through real accomplishments ───────── */
  function initHeroProof() {
    var track = document.querySelector(".hero-proof-track");
    if (!track) return;
    var items = track.querySelectorAll(".hero-proof-item");
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var i = 0, paused = false;
    var host = track.closest(".hero-proof");
    if (host) {
      host.addEventListener("mouseenter", function () { paused = true; });
      host.addEventListener("mouseleave", function () { paused = false; });
    }
    setInterval(function () {
      if (paused || document.hidden) return;
      items[i].classList.remove("is-active");
      i = (i + 1) % items.length;
      items[i].classList.add("is-active");
    }, 3800);
  }
})();
