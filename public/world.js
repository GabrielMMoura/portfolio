/*
  The building (DESIGN.md, 18/11/2026): pixel scenes on canvas, the elevator that follows the
  scroll, and the coffee game. Plain JS, no dependencies. Every word on the page is HTML; this
  file only draws pictures and moves overlays that the scenes anchor in their own pixel grid.
*/
(() => {
  "use strict";
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FPS = 12;

  /* ---------- palette ---------- */
  const C = {
    sky0: "#0a171d", sky1: "#0d1f26", sky2: "#11282f", sky3: "#163339", sky4: "#1d4043",
    star: "#f7e7c4", moon: "#f3e3b5", moonD: "#d9c58f",
    far: "#14303a", farWin: "#2a4d55", near: "#1a3a43", nearWin: "#d79a4a", nearWinOff: "#244650",
    brick: "#a8482f", brickL: "#c0603f", brickD: "#7a321f", mortar: "#5e2a1c",
    stone: "#d8cdb8", stoneD: "#a89c86",
    winOff: "#1c2f37", winOffL: "#25404a", amber: "#ffbe5c", amberL: "#ffd98f", amberD: "#e8953a", amberDD: "#c4732a",
    wall: "#f4ead7", wall2: "#e9dcc2", wain: "#dcc6a0", wainD: "#c4ab80",
    floor: "#b9784a", floorD: "#9a6139", floorL: "#cf8f5d",
    wood: "#b9784a", woodL: "#d39563", woodD: "#7d4c2c", woodDD: "#5a3720",
    metal: "#8c8f8c", metalL: "#c4c6c1", metalD: "#4f5250", metalDD: "#2f3231",
    screen: "#16303a", code: "#7fd1a8", code2: "#ffbe5c",
    paper: "#fffaf0", paperD: "#e6dccb", ink: "#221a15", red: "#c8473a", green: "#3fae67", greenL: "#8be0a6", greenD: "#1f6b3c",
    teal: "#2f6f7a", tealD: "#245760", blue: "#3d6fa8", yellow: "#f2c84b",
    leaf: "#4f8a4b", leafL: "#6aa860", leafD: "#356a35", pot: "#b8452a", potD: "#8a321f",
    sidewalk: "#6f6862", sidewalkL: "#857d73", curb: "#4a4541", road: "#1b2124", lane: "#b8923a", pole: "#2c2a28",
    cork: "#c48b55", white: "#f7f4ee", whiteD: "#dcd8cf", lobbyWall: "#2c4a52", lobbyWallD: "#21393f",
    marble: "#e8e2d6", marbleD: "#cfc6b5",
  };

  /* ---------- drawing helpers (all coordinates are whole pixels of the scene's grid) ---------- */
  const R = (g, x, y, w, h, c) => {
    g.fillStyle = c;
    g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  };
  function spr(g, rows, pal, x, y, flip) {
    x = Math.round(x);
    y = Math.round(y);
    for (let j = 0; j < rows.length; j++) {
      const r = rows[j];
      for (let i = 0; i < r.length; i++) {
        const c = pal[r[i]];
        if (!c) continue;
        g.fillStyle = c;
        g.fillRect(flip ? x + r.length - 1 - i : x + i, y + j, 1, 1);
      }
    }
  }
  function disc(g, cx, cy, r, c) {
    for (let dy = -r; dy <= r; dy++)
      for (let dx = -r; dx <= r; dx++) if (dx * dx + dy * dy <= r * r + r * 0.6) R(g, cx + dx, cy + dy, 1, 1, c);
  }
  function line(g, x0, y0, x1, y1, c) {
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let e = dx + dy;
    for (;;) {
      R(g, x0, y0, 1, 1, c);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * e;
      if (e2 >= dy) { e += dy; x0 += sx; }
      if (e2 <= dx) { e += dx; y0 += sy; }
    }
  }
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => {
      s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  }
  const ease = (p) => (p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3));
  const lerp = (a, b, p) => a + (b - a) * p;

  /* ---------- people ---------- */
  const HEAD = ["..hhhhh..", ".hhhhhhh.", ".hhhhhhhh", ".hhsssss.", ".hskkskk.", ".hssssss.", "..sssds..", "...sss..."];
  const BODY = ["..ttttt..", ".ttttttt.", ".ttttttt.", ".stttttts", ".sppppps."];
  const LEGS = [
    ["..pp.pp..", "..pp.pp..", "..pp.pp..", "..bb.bbb."],
    ["..pp..pp.", ".pp....pp", ".pp....pp", "bb.....bb"],
    ["..pp.pp..", "..ppp.p..", "..pp..pp.", "..bb..bb."],
  ];
  const SIT = [
    ["..hhhh..", ".hhhhhh.", "hhhhhhh.", ".ssshhh.", ".kssshh.", ".sssshh.", "..sss...", "..ttttt.", "sstttttt", "..ttttt.", "pppppp..", "pp......", "bb......"],
    ["..hhhh..", ".hhhhhh.", "hhhhhhh.", ".ssshhh.", ".kssshh.", ".sssshh.", "..sss...", "..ttttt.", ".stttttt", "..ttttt.", "pppppp..", "pp......", "bb......"],
  ];
  const GABRIEL = { h: C.ink, s: "#d29a6c", d: "#9a6440", k: "#1a1a1a", t: C.teal, p: "#2f3d57", b: "#1a1412" };
  const PEOPLE = [
    { h: "#e3cf9a", s: "#e8b98e", d: "#b07a50", k: "#2a1d16", t: C.leaf, p: "#3b3a46", b: "#1a1412" },
    { h: "#c96f2d", s: "#d29a6c", d: "#9a6440", k: "#2a1d16", t: C.red, p: "#2f3d57", b: "#1a1412" },
    { h: "#121212", s: "#8d5a38", d: "#5e3a22", k: "#121212", t: C.yellow, p: "#3b3a46", b: "#1a1412" },
    { h: "#4b2e1e", s: "#e8b98e", d: "#b07a50", k: "#2a1d16", t: C.blue, p: "#2b2b2b", b: "#1a1412" },
  ];
  function person(g, x, y, pal, flip, step) {
    // x, y: top-left; 9 x 17 px, feet on y + 17
    spr(g, HEAD, pal, x, y, flip);
    spr(g, BODY, pal, x, y + 8, flip);
    spr(g, LEGS[step || 0], pal, x, y + 13, flip);
  }
  function seated(g, x, y, pal, typing, flip) {
    // facing left by default; 8 x 13 px, feet on y + 13; draws its chair
    const cx = flip ? x - 1 : x;
    R(g, flip ? cx : cx + 6, y + 4, 2, 7, C.metalDD);
    R(g, cx + 1, y + 11, 7, 1, C.metalDD);
    R(g, cx + 4, y + 12, 1, 1, C.metalDD);
    R(g, cx + 2, y + 12, 5, 1, C.metalD);
    spr(g, SIT[typing ? 1 : 0], pal, x, y, flip);
  }

  /* ---------- furniture ---------- */
  function room(g, W, H, floorY, o = {}) {
    R(g, 0, 0, W, floorY, o.wall || C.wall);
    R(g, 0, 0, W, 3, o.wall2 || C.wall2);
    if (!o.noWain) {
      R(g, 0, floorY - 12, W, 12, o.wain || C.wain);
      R(g, 0, floorY - 13, W, 1, o.wainD || C.wainD);
      for (let x = 8; x < W; x += 16) R(g, x, floorY - 11, 1, 10, o.wainD || C.wainD);
    }
    R(g, 0, floorY, W, H - floorY, o.floor || C.floor);
    R(g, 0, floorY, W, 1, o.floorD || C.floorD);
    for (let y = floorY + 4; y < H; y += 4) R(g, 0, y, W, 1, o.floorD || C.floorD);
    for (let y = floorY + 1, k = 0; y < H; y += 4, k++)
      for (let x = (k % 2) * 14; x < W; x += 28) R(g, x, y, 1, 3, o.floorD || C.floorD);
  }
  function desk(g, x, top, w, floorY) {
    R(g, x, top, w, 2, C.woodL);
    R(g, x, top + 2, w, 1, C.woodD);
    R(g, x + 1, top + 3, 2, floorY - top - 3, C.woodD);
    R(g, x + w - 3, top + 3, 2, floorY - top - 3, C.woodD);
  }
  function monitor(g, x, y, t, seed, hot) {
    // 11 x 9, sits on y + 9
    R(g, x, y, 11, 7, C.metalDD);
    R(g, x + 1, y + 1, 9, 5, C.screen);
    for (let i = 0; i < 3; i++) {
      const len = 2 + ((Math.floor(t / (hot ? 1 : 2)) + i * 3 + seed) % 7);
      R(g, x + 2, y + 2 + i * 1.5, Math.min(len, 7), 1, i === 1 && hot ? C.code2 : C.code);
    }
    R(g, x + 5, y + 7, 1, 1, C.metalDD);
    R(g, x + 3, y + 8, 5, 1, C.metalDD);
  }
  function plant(g, x, floorY, tall) {
    const h = tall ? 14 : 9;
    R(g, x + 1, floorY - 5, 6, 5, C.pot);
    R(g, x, floorY - 6, 8, 1, C.potD);
    const top = floorY - 6 - h;
    for (let i = 0; i < h; i++) {
      const sway = i % 3 === 0 ? 1 : 0;
      R(g, x + 3, top + i, 2, 1, C.leafD);
      if (i % 2 === 0) R(g, x + 1 - sway, top + i, 2, 1, C.leaf);
      if (i % 2 === 1) R(g, x + 5 + sway, top + i, 2, 1, C.leafL);
    }
    R(g, x + 2, top - 1, 4, 1, C.leafL);
  }
  function clock(g, cx, cy, r, t) {
    disc(g, cx, cy, r + 1, C.ink);
    disc(g, cx, cy, r, C.paper);
    const a = (t / 12) * Math.PI * 2 / 60, b = (t / 12) * Math.PI * 2 / 6;
    line(g, cx, cy, cx + Math.round(Math.sin(a) * (r - 1)), cy - Math.round(Math.cos(a) * (r - 1)), C.ink);
    line(g, cx, cy, cx + Math.round(Math.sin(b) * (r - 3)), cy - Math.round(Math.cos(b) * (r - 3)), C.red);
  }
  function nightWindow(g, x, y, w, h, t, seed) {
    R(g, x - 2, y - 2, w + 4, h + 4, C.woodD);
    R(g, x, y, w, h, C.sky1);
    R(g, x, y + h - Math.floor(h / 2.4), w, Math.floor(h / 2.4), C.sky3);
    const r = rng(seed);
    let bx = x;
    while (bx < x + w) {
      const bw = 3 + Math.floor(r() * 5), bh = 5 + Math.floor(r() * (h / 2));
      R(g, bx, y + h - bh, Math.min(bw, x + w - bx), bh, C.near);
      for (let wy = y + h - bh + 2; wy < y + h - 1; wy += 3)
        for (let wx = bx + 1; wx < Math.min(bx + bw, x + w) - 1; wx += 2)
          if (r() > 0.55) R(g, wx, wy, 1, 1, C.nearWin);
      bx += bw + 1;
    }
    if (((t >> 3) + seed) % 9 === 0) R(g, x + 3, y + 3, 1, 1, C.star);
    R(g, x + 3, y + 4, 1, 1, C.star);
    R(g, x + w - 5, y + 2, 1, 1, C.star);
    R(g, x + Math.floor(w / 2) - 1, y, 2, h, C.woodD);
    R(g, x - 3, y + h + 2, w + 6, 2, C.stone);
  }
  function paperSheet(g, x, y, stamped) {
    R(g, x, y, 6, 7, C.paper);
    R(g, x, y + 7, 6, 1, C.paperD);
    R(g, x + 1, y + 1, 4, 1, C.metal);
    R(g, x + 1, y + 3, 3, 1, C.metal);
    if (stamped) { R(g, x + 2, y + 4, 3, 2, C.green); R(g, x + 3, y + 5, 1, 1, C.greenL); }
  }

  /* ---------- the scenes ---------- */
  const SCENES = {};

  /* Street: the facade at night. Its width follows the hero's shape. */
  SCENES.facade = {
    layout(W, H, overlay) {
      const bw = 124;
      const wide = overlay;
      const x0 = wide ? W - bw - Math.round(W * (W >= 280 ? 0.07 : 0.03)) : Math.round((W - bw) / 2);
      const door = x0 + Math.round(bw / 2);
      const L = { W, H, bw, x0, top: 42, street: H - 20, door, lamp: Math.min(W - 6, x0 + bw + 9), bench: x0 + 8 };
      this.L = L;
      const r = rng(7);
      this.order = Array.from({ length: 15 }, (_, i) => i).sort(() => r() - 0.5);
      this.stars = Array.from({ length: Math.round(W / 6) }, () => [Math.floor(r() * W), Math.floor(r() * 90), r()]);
      this.far = [];
      for (let x = -10; x < W + 20; ) { const w = 10 + Math.floor(r() * 16); this.far.push([x, w, 36 + Math.floor(r() * 56)]); x += w; }
      this.near = [];
      for (let x = -6; x < W + 20; ) { const w = 14 + Math.floor(r() * 20); this.near.push([x, w, 20 + Math.floor(r() * 46), r()]); x += w + 2; }
      this.people = Array.from({ length: 15 }, () => r());
      return {
        anchors: { "mug-bench": [L.bench + 20, L.street - 13], "mug-awning": [door + 14, L.street - 33] },
        boxes: { sign: [x0 + 10, L.top - 26, bw - 20, 19] },
      };
    },
    back(g, t) {
      const { W, H } = this.L;
      const bands = [C.sky0, C.sky1, C.sky2, C.sky3, C.sky4];
      const bh = Math.ceil((H - 20) / bands.length);
      bands.forEach((c, i) => {
        R(g, 0, i * bh, W, bh, c);
        if (i) for (let x = (i % 2); x < W; x += 2) R(g, x, i * bh, 1, 1, bands[i - 1]);
      });
      for (const [x, y, k] of this.stars) {
        const on = reduce || ((t + Math.floor(k * 40)) % 40) > 3;
        if (on) R(g, x, y, 1, 1, k > 0.85 ? C.amberL : C.star);
      }
      const L = this.L;
      const mx = L.x0 > 120 ? Math.round(L.x0 - 34) : W - 30, my = 26;
      disc(g, mx, my, 9, C.moon);
      R(g, mx - 3, my - 2, 2, 2, C.moonD); R(g, mx + 3, my + 3, 3, 2, C.moonD); R(g, mx + 1, my - 5, 1, 1, C.moonD);
      const base = H - 20;
      for (const [x, w, h] of this.far) {
        R(g, x, base - h, w, h, C.far);
        for (let wy = base - h + 3; wy < base - 2; wy += 4)
          for (let wx = x + 2; wx < x + w - 2; wx += 3) R(g, wx, wy, 1, 2, C.farWin);
      }
    },
    front(g, t) {
      const L = this.L, { W, H, bw, x0, top, street, door } = L;
      g.clearRect(0, 0, W, H);
      // near skyline, between the far city and the building
      for (const [x, w, h, k] of this.near) {
        if (x + w > x0 - 2 && x < x0 + bw + 2) continue;
        R(g, x, street - h, w, h, C.near);
        R(g, x, street - h, w, 1, "#21454f");
        for (let wy = street - h + 3; wy < street - 3; wy += 5)
          for (let wx = x + 2; wx < x + w - 2; wx += 4)
            R(g, wx, wy, 2, 3, ((wx * 7 + wy * 3 + Math.floor(k * 10)) % 5 === 0) ? C.nearWin : C.nearWinOff);
      }
      // rooftop sign: backing and legs (the letters are HTML on top)
      R(g, x0 + 6, top - 28, bw - 12, 23, C.ink);
      R(g, x0 + 7, top - 27, bw - 14, 21, "#2b211b");
      for (let i = 0; i < 4; i++) {
        const lx = x0 + 14 + Math.round(i * (bw - 30) / 3);
        R(g, lx, top - 6, 2, 6, C.metalDD);
        R(g, lx - 2, top - 5, 6, 1, C.metalDD);
      }
      for (let i = 0; i < 9; i++) R(g, x0 + 10 + Math.round(i * (bw - 22) / 8), top - 30, 2, 2, (i + (t >> 2)) % 3 === 0 && !reduce ? C.amberL : C.amberD);
      // brick body
      R(g, x0, top, bw, street - top, C.brick);
      for (let y = top + 2, k = 0; y < street; y += 4, k++) {
        R(g, x0, y + 3, bw, 1, C.mortar);
        for (let x = x0 + (k % 2 ? 4 : 0); x < x0 + bw; x += 8) R(g, x, y, 1, 3, C.mortar);
        if (k % 3 === 0) R(g, x0 + ((k * 13) % (bw - 10)), y, 5, 1, C.brickL);
      }
      R(g, x0 - 2, top - 2, bw + 4, 4, C.stone);
      R(g, x0 - 2, top + 2, bw + 4, 1, C.stoneD);
      R(g, x0, top + 3, bw, 2, C.brickD);
      // windows: 3 floors x 5, lit one by one (agents coming online)
      const cols = 5, ww = 14, wh = 18, gap = Math.floor((bw - 12 - cols * ww) / (cols - 1));
      for (let row = 0; row < 3; row++) {
        for (let c = 0; c < cols; c++) {
          const k = row * cols + c, wx = x0 + 6 + c * (ww + gap), wy = top + 12 + row * 30;
          const idx = this.order.indexOf(k);
          let lit = reduce || t > 6 + idx * 4;
          if (!reduce && t > 80 && ((t >> 4) + k * 5) % 23 === 0) lit = false;
          R(g, wx - 1, wy - 3, ww + 2, 2, C.stone);
          R(g, wx - 1, wy + wh, ww + 2, 2, C.stone);
          R(g, wx, wy, ww, wh, lit ? C.amber : C.winOff);
          if (lit) {
            R(g, wx, wy, ww, 3, C.amberL);
            const p = this.people[k];
            if (p > 0.45) {
              const px = wx + 3 + Math.floor(p * 5);
              R(g, px, wy + wh - 9, 4, 4, C.amberDD);
              R(g, px - 1, wy + wh - 5, 6, 5, C.amberDD);
              R(g, px + 6, wy + wh - 7, 4, 3, C.amberDD);
            } else if (p > 0.25) {
              R(g, wx + 9, wy + wh - 6, 3, 6, C.leafD);
              R(g, wx + 8, wy + wh - 8, 5, 2, C.leaf);
            }
          } else {
            R(g, wx, wy, ww, 2, C.winOffL);
          }
          R(g, wx + Math.floor(ww / 2), wy, 1, wh, C.stoneD);
          R(g, wx, wy + Math.floor(wh / 2), ww, 1, C.stoneD);
        }
      }
      // ground floor: shop windows, awning, door
      const gy = top + 98;
      R(g, x0, gy - 2, bw, 2, C.stone);
      R(g, x0 + 6, gy + 6, door - x0 - 22, street - gy - 10, C.amber);
      R(g, door + 16, gy + 6, x0 + bw - door - 22, street - gy - 10, C.amber);
      R(g, x0 + 6, gy + 6, door - x0 - 22, 3, C.amberL);
      R(g, door + 16, gy + 6, x0 + bw - door - 22, 3, C.amberL);
      plant(g, x0 + 10, street - 4, true);
      plant(g, x0 + bw - 20, street - 4, false);
      // awning
      for (let i = 0; i < 34; i++) R(g, door - 17 + i, street - 30, 1, 6, Math.floor(i / 4) % 2 ? C.paper : C.teal);
      R(g, door - 18, street - 31, 36, 1, C.tealD);
      for (let i = 0; i < 34; i += 4) R(g, door - 17 + i, street - 24, 2, 1, C.tealD);
      // the door, opening when someone comes in
      const walk = this.walker(t);
      const open = walk.phase === "enter";
      R(g, door - 11, street - 22, 22, 22, C.woodD);
      R(g, door - 9, street - 20, 18, 20, open ? C.amberL : C.amberDD);
      if (!open) {
        R(g, door - 9, street - 20, 18, 20, C.amber);
        R(g, door - 1, street - 20, 2, 20, C.woodD);
        R(g, door - 4, street - 11, 1, 3, C.ink);
        R(g, door + 3, street - 11, 1, 3, C.ink);
      }
      R(g, door - 12, street, 24, 2, C.stoneD);
      // sidewalk, curb, road
      R(g, 0, street, W, 6, C.sidewalk);
      R(g, 0, street, W, 1, C.sidewalkL);
      for (let x = (W % 16); x < W; x += 16) R(g, x, street + 1, 1, 5, C.curb);
      R(g, 0, street + 6, W, 2, C.curb);
      R(g, 0, street + 8, W, H - street - 8, C.road);
      for (let x = -(t * (reduce ? 0 : 0)) % 18; x < W; x += 18) R(g, x, street + 13, 8, 1, C.lane);
      // street lamp and its light
      const lx = L.lamp;
      g.globalAlpha = 0.14;
      g.fillStyle = C.amber;
      g.beginPath(); g.moveTo(lx + 1, street - 44); g.lineTo(lx - 16, street + 6); g.lineTo(lx + 20, street + 6); g.closePath(); g.fill();
      g.globalAlpha = 1;
      R(g, lx, street - 46, 2, 46, C.pole);
      R(g, lx - 2, street - 2, 6, 2, C.pole);
      R(g, lx - 3, street - 48, 8, 3, C.pole);
      R(g, lx - 2, street - 45, 6, 2, C.amberL);
      // bench
      const bx = L.bench;
      R(g, bx, street - 6, 26, 2, C.woodL);
      R(g, bx, street - 10, 26, 2, C.wood);
      R(g, bx + 2, street - 4, 2, 4, C.pole);
      R(g, bx + 22, street - 4, 2, 4, C.pole);
      // a car now and then
      const cp = (t % 260);
      if (!reduce && cp < 70) {
        const cx = W + 10 - cp * ((W + 60) / 70);
        R(g, cx, street + 9, 30, 6, C.red);
        R(g, cx + 6, street + 5, 16, 5, C.red);
        R(g, cx + 8, street + 6, 5, 3, C.sky2);
        R(g, cx + 15, street + 6, 5, 3, C.sky2);
        R(g, cx + 3, street + 14, 5, 3, C.ink);
        R(g, cx + 21, street + 14, 5, 3, C.ink);
        R(g, cx - 1, street + 10, 2, 2, C.amberL);
        g.globalAlpha = 0.18; R(g, cx - 18, street + 9, 17, 4, C.amberL); g.globalAlpha = 1;
      }
      // pixel Gabriel walking to work
      if (walk.phase !== "inside") person(g, walk.x, street - 16, GABRIEL, false, walk.step);
    },
    walker(t) {
      const { door } = this.L;
      const end = door - 5;
      const start = -12;
      const walkT = Math.ceil((end - start) / 1.5);
      const P = walkT + 40;
      if (reduce) return { phase: "walk", x: end - 30, step: 0 };
      const k = t % P;
      if (k < walkT) return { phase: "walk", x: start + k * 1.5, step: [0, 1, 0, 2][Math.floor(k / 2) % 4] };
      if (k < walkT + 8) return { phase: "enter", x: end, step: 0 };
      return { phase: "inside" };
    },
  };

  /* 3F AgentOffice: agents at desks, a ticket in the tube, a draft stamped and sent */
  SCENES.office = {
    W: 256, H: 96, still: 92,
    anchors: {
      "agent-0": [99, 61], "agent-1": [139, 61], "agent-2": [179, 61], tray: [224, 66],
      "mug-screen": [33, 64], "mug-sill": [243, 60],
    },
    boxes: { screen: [12, 18, 64, 36] },
    draw(g, t) {
      const W = this.W, H = this.H, F = 84;
      room(g, W, H, F);
      // the real product on the wall
      R(g, 7, 13, 74, 46, C.woodDD);
      R(g, 9, 15, 70, 42, C.ink);
      R(g, 12, 18, 64, 36, C.screen);
      R(g, 40, 59, 8, 3, C.metalD);
      // sideboard with a plant and files
      R(g, 14, 68, 60, 16, C.woodD);
      R(g, 15, 69, 58, 2, C.woodL);
      R(g, 43, 73, 2, 9, C.woodDD);
      R(g, 20, 76, 4, 1, C.metalL); R(g, 50, 76, 4, 1, C.metalL);
      plant(g, 62, 68, false);
      R(g, 20, 63, 3, 5, C.blue); R(g, 23, 64, 3, 4, C.red); R(g, 26, 62, 3, 6, C.yellow);
      // the task queue: a tube under the ceiling
      R(g, 84, 6, 150, 7, C.metalL);
      R(g, 84, 7, 150, 5, "#d9eef0");
      R(g, 84, 6, 150, 1, C.metal); R(g, 84, 12, 150, 1, C.metal);
      for (let x = 96; x < 234; x += 24) R(g, x, 5, 2, 9, C.metal);
      R(g, 82, 4, 6, 11, C.metalD);
      R(g, 181, 13, 6, 3, C.metal);
      clock(g, 152, 28, 6, t);
      // the window at the end of the floor
      nightWindow(g, 233, 20, 18, 36, t, 3);
      plant(g, 84, F, true);
      const P = 120, k = reduce ? this.still : t % P;
      // three agents, the third gets the ticket
      for (let i = 0; i < 3; i++) {
        const dx = 92 + i * 40;
        desk(g, dx, 78, 22, F);
        const hot = i === 2 && k > 44 && k < 72;
        monitor(g, dx + 3, 69, t + i * 5, i * 3, hot);
        seated(g, dx + 21, 71, PEOPLE[i], hot ? t % 2 === 0 : (t + i * 3) % 6 < 3);
      }
      // the approval stand and pixel Gabriel
      R(g, 214, 76, 16, 2, C.woodL);
      R(g, 220, 78, 4, 6, C.woodD);
      R(g, 217, 83, 10, 1, C.woodD);
      R(g, 215, 74, 13, 2, C.metalD);
      const stampDown = (k >= 84 && k < 88) || (k >= 90 && k < 94);
      person(g, 202, 67, GABRIEL, false, 0);
      R(g, 210, stampDown ? 69 : 64, 3, 3, C.red);
      R(g, 211, stampDown ? 72 : 67, 1, 3, C.woodD);
      // the ticket: tube, then down to the third desk
      if (k < 36) {
        const x = lerp(86, 182, ease(k / 36));
        R(g, x, 8, 5, 3, C.paper); R(g, x + 1, 9, 3, 1, C.red);
      } else if (k < 44) {
        const y = lerp(13, 76, (k - 36) / 8);
        R(g, 182, y, 5, 3, C.paper); R(g, 183, y + 1, 3, 1, C.red);
      }
      // the draft: from the agent to the stand, stamped, then out of the window
      if (k >= 70 && k < 82) {
        const p = ease((k - 70) / 12);
        paperSheet(g, lerp(186, 216, p), lerp(72, 67, p) - Math.sin(p * Math.PI) * 10, false);
      } else if (k >= 82 && k < 100) {
        paperSheet(g, 216, 67, k >= 86);
      } else if (k >= 100 && k < 114) {
        const p = ease((k - 100) / 14);
        paperSheet(g, lerp(216, 240, p), lerp(67, 26, p), true);
      }
    },
    overlay(stage, t) {
      const k = reduce ? this.still : t % 120;
      const chip = stage.querySelector(".chip");
      if (chip) chip.classList.toggle("is-on", k >= 86 && k < 112);
    },
  };

  /* 2F CRN: a shop counter, PIX at the till, the tax invoice printing */
  SCENES.store = {
    W: 256, H: 96, still: 70,
    anchors: { nfe: [165, 42], sefaz: [212, 16], "mug-shelf": [57, 21], "mug-counter": [100, 62] },
    shelf: (() => {
      const r = rng(21), out = [];
      const cols = [C.red, C.teal, C.yellow, C.leaf, C.blue, C.paper, C.amberD];
      for (let s = 0; s < 3; s++) for (let x = 8; x < 70; ) {
        const w = 3 + Math.floor(r() * 4), h = 5 + Math.floor(r() * 7);
        out.push([s, x, w, h, cols[Math.floor(r() * cols.length)], r()]);
        x += w + 1;
      }
      return out;
    })(),
    draw(g, t) {
      const W = this.W, H = this.H, F = 84;
      room(g, W, H, F, { wain: "#cfe0d3", wainD: "#a9c4b1" });
      // shelves of goods
      R(g, 4, 18, 70, 66, C.woodDD);
      R(g, 6, 20, 66, 64, "#e2d2b3");
      for (const [s, x, w, h, c, k] of this.shelf) {
        const sy = 38 + s * 20;
        R(g, x, sy - h, w, h, c);
        if (k > 0.6) R(g, x, sy - h, w, 1, C.ink);
        if (k < 0.3) R(g, x + 1, sy - h + 2, w - 2, 1, C.paper);
      }
      for (let s = 0; s < 3; s++) R(g, 4, 38 + s * 20, 70, 2, C.wood);
      // a SEFAZ jack on the wall, cable to the till
      R(g, 208, 18, 9, 9, C.metalD);
      R(g, 210, 20, 5, 5, C.metalL);
      line(g, 212, 27, 212, 48, C.metalDD);
      line(g, 212, 48, 176, 48, C.metalDD);
      // the shop door with the street behind it
      R(g, 226, 26, 28, 58, C.woodD);
      R(g, 229, 29, 22, 52, C.sky1);
      R(g, 229, 64, 22, 17, C.sidewalk);
      R(g, 231, 31, 6, 22, C.sky2);
      R(g, 229, 29, 22, 1, C.sky3); R(g, 239, 34, 1, 1, C.star); R(g, 245, 40, 1, 1, C.star);
      R(g, 233, 66, 1, 4, C.amber);
      R(g, 248, 52, 1, 6, C.metalL);
      // counter, back side first, then the owner, then its front
      R(g, 96, 64, 84, 3, C.woodL);
      person(g, 118, 47, PEOPLE[3], false, 0);
      // the till and the printer
      R(g, 140, 54, 16, 10, C.metalDD);
      R(g, 141, 55, 14, 7, C.screen);
      R(g, 143, 57, 6, 1, C.code); R(g, 143, 59, 9, 1, C.code2);
      R(g, 146, 64, 4, 1, C.metalDD);
      R(g, 158, 58, 14, 6, C.metalD);
      R(g, 159, 58, 12, 1, C.metalDD);
      // PIX sign on the counter
      R(g, 100, 54, 10, 10, C.paper);
      R(g, 100, 54, 10, 1, C.teal);
      const qr = [0b11101, 0b10101, 0b11011, 0b00101, 0b11110];
      qr.forEach((row, j) => { for (let i = 0; i < 5; i++) if (row & (1 << i)) R(g, 102 + i + (i > 2 ? 1 : 0), 56 + j + (j > 2 ? 1 : 0), 1, 1, C.ink); });
      R(g, 96, 67, 84, 17, C.woodD);
      for (let x = 100; x < 176; x += 19) R(g, x, 70, 15, 11, C.wood);
      // customer comes in, pays with PIX, takes the invoice
      const P = 150, k = reduce ? this.still : t % P;
      let cx, step = 0;
      if (k < 40) { cx = lerp(232, 184, ease(k / 40)); step = Math.floor(k / 2) % 3; }
      else if (k < 110) cx = 184;
      else { cx = lerp(184, 262, (k - 110) / 40); step = Math.floor(k / 2) % 3; }
      const leaving = k >= 110;
      person(g, cx, 67, PEOPLE[1], !leaving, step);
      if (k >= 44 && k < 70) {
        R(g, cx - 3, 70, 4, 6, C.ink);
        R(g, cx - 2, 71, 2, 4, k >= 58 ? C.greenL : C.paper);
      }
      // the invoice comes out of the printer
      const len = k < 62 ? 0 : k < 92 ? Math.floor((k - 62) / 2) : 15;
      if (len) {
        R(g, 161, 58 - len, 8, len, C.paper);
        for (let y = 58 - len + 2; y < 58; y += 2) R(g, 162, y, 4 + ((y >> 1) % 3), 1, C.metal);
      }
      if (leaving) R(g, cx + (leaving ? -2 : 8), 75, 5, 6, C.paperD);
      // the clock above the door
      clock(g, 240, 14, 5, t);
    },
    overlay(stage, t) {
      const lamp = stage.querySelector(".tag--lamp");
      if (lamp) lamp.classList.toggle("is-off", !reduce && t % 600 > 540);
    },
  };

  /* The elevator: doors open on pixel Gabriel between floors */
  SCENES.elevator = {
    W: 120, H: 96, still: 60,
    anchors: { "mug-lift": [92, 88] },
    draw(g, t) {
      const W = this.W, H = this.H;
      R(g, 0, 0, W, H, C.lobbyWall);
      for (let x = 0; x < W; x += 12) R(g, x, 0, 1, 88, C.lobbyWallD);
      R(g, 0, 88, W, 8, C.marbleD);
      R(g, 0, 88, W, 1, C.marble);
      const P = 100, k = reduce ? this.still : t % P;
      const open = k < 30 ? 0 : k < 40 ? (k - 30) / 10 : k < 80 ? 1 : k < 90 ? 1 - (k - 80) / 10 : 0;
      // floor lamps
      R(g, 36, 4, 48, 8, C.metalDD);
      for (let i = 0; i < 4; i++) {
        const on = Math.floor(k / 25) % 4 === i;
        R(g, 40 + i * 11, 6, 7, 4, on ? C.amber : "#3a3a36");
      }
      // frame and car
      R(g, 28, 14, 64, 74, C.metalL);
      R(g, 32, 18, 56, 70, C.metal);
      R(g, 34, 20, 52, 68, "#f2d79c");
      R(g, 34, 20, 52, 3, C.amberL);
      R(g, 34, 80, 52, 8, "#c9a46a");
      // pixel Gabriel waving
      const wave = !reduce && Math.floor(t / 3) % 2 === 0;
      person(g, 56, 63, GABRIEL, false, 0);
      R(g, 64, wave ? 62 : 64, 1, 5, GABRIEL.s);
      R(g, 64, wave ? 61 : 63, 2, 2, GABRIEL.s);
      R(g, 36, 56, 3, 12, C.metalL);
      // the doors
      const half = 26, slide = Math.round(half * open);
      R(g, 34 - slide, 20, half, 68, C.metalL);
      R(g, 60 + slide, 20, half, 68, C.metalL);
      R(g, 34 - slide + half - 1, 20, 1, 68, C.metalD);
      R(g, 60 + slide, 20, 1, 68, C.metalD);
      R(g, 28, 14, 6, 74, C.metalL);
      R(g, 86, 14, 6, 74, C.metalL);
      R(g, 28, 14, 64, 6, C.metalL);
      R(g, 96, 46, 6, 10, C.metalDD);
      R(g, 98, 48, 2, 2, C.amber); R(g, 98, 52, 2, 2, "#3a3a36");
    },
  };

  /* 1F Emporio Agent: the tests run, the board goes green */
  SCENES.emporio = {
    W: 256, H: 96, still: 58,
    anchors: { "ci-0": [210, 29], "ci-1": [210, 45], "mug-jars": [36, 25] },
    draw(g, t) {
      const W = this.W, H = this.H, F = 84;
      room(g, W, H, F);
      // jars on the shelf of the emporium
      const lids = [C.red, C.yellow, C.leaf, C.teal, C.amberD, C.red, C.blue];
      const fills = ["#e9c46a", "#b5651d", "#f4f1de", "#8d5a38", "#d9b38c", "#c96f2d", "#f2e0b5"];
      for (let s = 0; s < 2; s++) {
        R(g, 6, 28 + s * 22, 72, 2, C.wood);
        R(g, 8, 30 + s * 22, 2, 3, C.woodD); R(g, 74, 30 + s * 22, 2, 3, C.woodD);
        for (let i = 0; i < 7; i++) {
          const x = 9 + i * 10, h = 9 + ((i + s) % 3) * 2, y = 28 + s * 22 - h;
          R(g, x, y + 2, 8, h - 2, "#dfe9ec");
          R(g, x + 1, y + 4, 6, h - 5, fills[(i + s * 2) % 7]);
          R(g, x + 1, y + 3, 1, h - 4, C.white);
          R(g, x, y, 8, 2, lids[(i + s) % 7]);
        }
      }
      // the CI board
      R(g, 178, 14, 66, 42, C.woodDD);
      R(g, 180, 16, 62, 38, "#1d2a2e");
      const P = 96, k = reduce ? this.still : t % P;
      const done = k >= 50;
      for (let i = 0; i < 2; i++) {
        const lit = done || (i === 0 && k > 20);
        R(g, 184, 23 + i * 16, 5, 5, lit ? C.green : (t % 4 < 2 ? C.amber : C.amberDD));
      }
      // workbench, laptop, phone
      desk(g, 92, 72, 80, F);
      R(g, 134, 56, 32, 16, C.metalDD);
      R(g, 136, 58, 28, 12, C.screen);
      R(g, 130, 72, 40, 2, C.metalD);
      // 133 tests as dots, filling up
      const n = Math.min(133, Math.floor((k / 50) * 133));
      for (let i = 0; i < 133; i++) {
        const x = 137 + (i % 26), y = 59 + Math.floor(i / 26) * 2;
        R(g, x, y, 1, 1, i < n ? C.greenL : "#2c4650");
      }
      if (done) R(g, 137, 69, 26, 1, C.greenL);
      R(g, 112, 60, 9, 12, C.ink);
      R(g, 113, 61, 7, 10, "#f1ede4");
      R(g, 115, 62, 4, 2, C.green); R(g, 114, 65, 4, 2, C.paper); R(g, 115, 68, 4, 2, C.green);
      seated(g, 170, 71, GABRIEL, k < 50 ? t % 2 === 0 : false, false);
      plant(g, 230, F, true);
      R(g, 186, 74, 18, 10, C.woodD);
      R(g, 186, 74, 18, 2, C.woodL);
      R(g, 189, 60, 11, 14, C.metalDD);
      R(g, 190, 61, 9, 3, C.red);
      R(g, 192, 66, 5, 6, C.amberDD);
      R(g, 193, 67, 3, 2, C.amber);
      if (!reduce && t % 6 < 3) R(g, 194, 56, 1, 3, C.whiteD);
    },
  };

  /* Mezzanine, Mini CRM: a sticky note moves on, the AI writes on it */
  SCENES.crm = {
    W: 256, H: 96, still: 52,
    anchors: { "mug-tray": [204, 64] },
    draw(g, t) {
      const W = this.W, H = this.H, F = 84;
      room(g, W, H, F);
      // filing cabinet with a lock (each workspace sees only its own)
      R(g, 8, 50, 22, 34, C.metalD);
      for (let i = 0; i < 3; i++) { R(g, 10, 52 + i * 11, 18, 9, C.metal); R(g, 16, 55 + i * 11, 6, 1, C.metalDD); }
      R(g, 17, 43, 4, 4, C.amberD); R(g, 16, 46, 6, 5, C.amber); R(g, 18, 48, 2, 2, C.ink);
      // whiteboard
      R(g, 40, 10, 176, 52, C.metalL);
      R(g, 42, 12, 172, 48, C.white);
      for (let i = 1; i < 4; i++) R(g, 42 + i * 43, 14, 1, 44, C.whiteD);
      for (let i = 0; i < 4; i++) R(g, 48 + i * 43, 15, 22, 2, [C.blue, C.amberD, C.teal, C.green][i]);
      R(g, 40, 62, 176, 3, C.metal);
      R(g, 60, 61, 10, 1, C.red); R(g, 74, 61, 10, 1, C.blue);
      const notes = [
        [0, 0, C.yellow], [0, 1, "#ffd1a8"],
        [1, 0, "#cfeec2"], [1, 1, C.yellow],
        [2, 0, "#ffd1a8"], [2, 1, "#cfeec2"],
        [3, 0, C.yellow],
      ];
      const note = (x, y, c, lines) => {
        R(g, x + 1, y + 1, 16, 12, "rgba(34,26,21,0.18)");
        R(g, x, y, 16, 12, c);
        for (let i = 0; i < lines; i++) R(g, x + 2, y + 3 + i * 3, i === lines - 1 ? 7 : 11, 1, "#6b5d4e");
      };
      for (const [col, row, c] of notes) note(48 + col * 43, 20 + row * 14, c, 2);
      const P = 96, k = reduce ? this.still : t % P;
      const p = ease(Math.min(1, k / 24));
      const mx = lerp(48, 91, p), my = lerp(48, 48, p) - Math.sin(p * Math.PI) * 8;
      const lines = k < 26 ? 0 : Math.min(3, Math.floor((k - 26) / 6));
      note(Math.round(mx), Math.round(my), "#ffe48a", lines);
      if (k >= 26 && k < 46) {
        const sx = Math.round(mx) + 14, sy = Math.round(my) - 3;
        const blink = t % 2 === 0;
        R(g, sx, sy - 2, 1, 5, blink ? C.amberD : C.amber);
        R(g, sx - 2, sy, 5, 1, blink ? C.amberD : C.amber);
      }
      person(g, 226, 67, GABRIEL, true, 0);
      R(g, 224, 72, 3, 1, GABRIEL.s);
      plant(g, 244, F, false);
    },
  };

  /* Lobby: reception and three doors out */
  SCENES.lobby = {
    W: 256, H: 96, still: 0,
    anchors: { "gabriel-say": [151, 50], "mug-plant": [129, 59] },
    boxes: { "door-0": [12, 34, 36, 50], "door-1": [56, 34, 36, 50], "door-2": [208, 34, 36, 50], gabriel: [145, 52, 13, 18] },
    draw(g, t) {
      const W = this.W, H = this.H, F = 84;
      R(g, 0, 0, W, F, C.lobbyWall);
      for (let x = 0; x < W; x += 16) R(g, x, 0, 1, F, C.lobbyWallD);
      R(g, 0, F - 14, W, 14, C.woodD);
      R(g, 0, F - 15, W, 1, C.woodL);
      for (let x = 0; x < W; x += 8) for (let y = F; y < H; y += 4) R(g, x + ((y >> 2) % 2) * 4, y, 4, 4, ((x >> 3) + (y >> 2)) % 2 ? C.marble : C.marbleD);
      const doors = [12, 56, 208];
      doors.forEach((dx, i) => {
        R(g, dx - 2, 32, 40, 52, C.woodDD);
        R(g, dx, 34, 36, 50, C.wood);
        R(g, dx + 3, 37, 30, 18, C.amber);
        R(g, dx + 3, 37, 30, 3, C.amberL);
        R(g, dx + 17, 37, 2, 18, C.woodD);
        R(g, dx + 3, 59, 13, 21, C.woodL); R(g, dx + 20, 59, 13, 21, C.woodL);
        R(g, dx + 29, 66, 2, 4, C.amberD);
        const glow = !reduce && ((t >> 3) + i * 2) % 7 === 0;
        R(g, dx + 14, 26, 8, 3, glow ? C.amberL : C.amber);
        R(g, dx + 16, 24, 4, 2, C.metalDD);
      });
      // reception desk with pixel Gabriel behind it
      clock(g, 151, 20, 7, t);
      person(g, 146, 53, GABRIEL, false, 0);
      if (!reduce && t % 48 < 6) R(g, 149, 57, 5, 1, GABRIEL.s);
      R(g, 118, 66, 66, 18, C.woodD);
      R(g, 116, 64, 70, 3, C.woodL);
      for (let x = 122; x < 180; x += 14) R(g, x, 70, 10, 11, C.wood);
      R(g, 166, 58, 8, 6, C.amberD); R(g, 168, 54, 4, 4, C.amber);
      R(g, 124, 60, 10, 4, C.paper);
      plant(g, 192, F, true);
      plant(g, 102, F, false);
    },
  };

  /* ---------- mounting, the loop, the overlays ---------- */
  const scenes = [];
  const live = new Set();

  function place(stage, W, H, anchors = {}, boxes = {}) {
    stage.querySelectorAll("[data-anchor]").forEach((el) => {
      const a = anchors[el.dataset.anchor];
      if (!a) return;
      el.style.left = (a[0] / W) * 100 + "%";
      el.style.top = (a[1] / H) * 100 + "%";
      el.classList.add("is-placed");
    });
    stage.querySelectorAll("[data-anchor-box]").forEach((el) => {
      const b = boxes[el.dataset.anchorBox];
      if (!b) return;
      el.style.left = (b[0] / W) * 100 + "%";
      el.style.top = (b[1] / H) * 100 + "%";
      el.style.width = (b[2] / W) * 100 + "%";
      el.style.height = (b[3] / H) * 100 + "%";
      el.classList.add("is-placed");
    });
  }

  function fitSign(sign) {
    if (!sign || !sign.offsetWidth) return;
    sign.style.fontSize = "100px";
    const k = Math.min((sign.clientWidth * 0.9) / sign.scrollWidth, (sign.clientHeight * 0.95) / 100);
    sign.style.fontSize = Math.max(8, Math.floor(100 * k)) + "px";
  }

  function mountFacade(stage) {
    const def = SCENES.facade;
    const back = stage.querySelector('[data-layer="back"]');
    const front = stage.querySelector('[data-layer="front"]');
    const sign = stage.querySelector(".sign");
    const s = { stage, def, t0: 0 };
    s.layout = () => {
      const w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h) return;
      const H = 180, W = Math.max(200, Math.min(440, Math.round((H * w) / h)));
      back.width = front.width = W;
      back.height = front.height = H;
      s.bg = back.getContext("2d");
      s.fg = front.getContext("2d");
      const overlay = getComputedStyle(stage).position === "absolute";
      const { anchors, boxes } = def.layout(W, H, overlay);
      place(stage, W, H, anchors, boxes);
      fitSign(sign);
      s.render(s.last || 0);
    };
    s.render = (t) => {
      s.last = t;
      if (!s.bg) return;
      def.back(s.bg, t);
      def.front(s.fg, t);
    };
    s.layout();
    return s;
  }

  function mountRoom(stage, def) {
    const cv = stage.querySelector("canvas");
    cv.width = def.W;
    cv.height = def.H;
    const g = cv.getContext("2d");
    place(stage, def.W, def.H, def.anchors, def.boxes);
    const s = {
      stage, def,
      render(t) {
        def.draw(g, t);
        if (def.overlay) def.overlay(stage, t);
      },
      layout() {},
    };
    s.render(reduce ? def.still || 0 : 0);
    return s;
  }

  document.querySelectorAll("[data-scene]").forEach((stage) => {
    const name = stage.dataset.scene;
    if (!SCENES[name]) return;
    const s = name === "facade" ? mountFacade(stage) : mountRoom(stage, SCENES[name]);
    scenes.push(s);
  });

  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const s = scenes.find((x) => x.stage === e.target);
        if (s) e.isIntersecting ? live.add(s) : live.delete(s);
      }
    }, { rootMargin: "80px" });
    scenes.forEach((s) => io.observe(s.stage));
    let last = 0, tick = 0;
    const loop = (ts) => {
      if (ts - last >= 1000 / FPS) {
        last = ts;
        tick++;
        live.forEach((s) => s.render(tick));
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  } else {
    scenes.forEach((s) => s.render(s.def.still || 0));
  }

  let rz;
  addEventListener("resize", () => {
    clearTimeout(rz);
    rz = setTimeout(() => scenes.forEach((s) => s.layout()), 120);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fitSign(document.querySelector(".sign")));

  /* parallax: the far city drifts a little slower than the street */
  const back = document.querySelector('[data-layer="back"]');
  const header = document.querySelector(".top");
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = scrollY;
    if (header) header.classList.toggle("is-stuck", y > 40);
    if (back && !reduce && y < innerHeight * 1.2) back.style.transform = `translate3d(0, ${Math.round(y * 0.25)}px, 0)`;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* status bubbles take turns */
  if (!reduce) {
    document.querySelectorAll(".bubble[data-lines]").forEach((b, i) => {
      let lines;
      try { lines = JSON.parse(b.dataset.lines); } catch { return; }
      let n = 0;
      setTimeout(() => setInterval(() => {
        b.classList.add("is-swapping");
        setTimeout(() => { n = (n + 1) % lines.length; b.textContent = lines[n]; b.classList.remove("is-swapping"); }, 250);
      }, 3600), i * 1100);
    });
  }

  /* the HUD and the elevator follow the floor in view */
  const hud = document.querySelector(".hud");
  const hudFloor = hud && hud.querySelector(".hud__floor");
  const car = document.querySelector(".car");
  const carNum = car && car.querySelector(".car__num");
  if (hud) hud.hidden = false;
  const floors = [...document.querySelectorAll("[data-floor]")];
  if ("IntersectionObserver" in window) {
    const where = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const label = e.target.dataset.floor;
        if (hudFloor) hudFloor.textContent = label;
        if (carNum) {
          const short = label.includes(" · ") ? label.split(" · ")[0] : label.charAt(0);
          if (carNum.textContent !== short) {
            carNum.textContent = short;
            car.classList.add("is-moving");
            setTimeout(() => car.classList.remove("is-moving"), 600);
          }
        }
      });
    }, { rootMargin: "-48% 0px -48% 0px" });
    floors.forEach((f) => where.observe(f));
  }

  /* the coffee game */
  const KEY = "gm-coffee";
  let found = [];
  try { found = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { found = []; }
  const count = hud && hud.querySelector(".hud__coffee b");
  const coffeeBtn = hud && hud.querySelector(".hud__coffee");
  const tip = hud && hud.querySelector(".hud__tip");
  const doneBox = hud && hud.querySelector(".hud__done");
  const live$ = hud && hud.querySelector("[data-coffee-live]");
  const mugs = [...document.querySelectorAll(".mug")];
  const total = mugs.length;
  const show = () => {
    if (count) count.textContent = String(found.length);
    if (coffeeBtn) coffeeBtn.setAttribute("aria-label", `${coffeeBtn.getAttribute("aria-label").split(":")[0]}: ${found.length}/${total}`);
  };
  mugs.forEach((m) => {
    const id = Number(m.dataset.mug);
    if (found.includes(id)) return;
    m.hidden = false;
    m.addEventListener("click", () => {
      if (found.includes(id)) return;
      found.push(id);
      try { localStorage.setItem(KEY, JSON.stringify(found)); } catch {}
      m.classList.add("is-found");
      setTimeout(() => m.classList.add("is-gone"), 620);
      show();
      if (coffeeBtn) { coffeeBtn.classList.remove("is-bump"); void coffeeBtn.offsetWidth; coffeeBtn.classList.add("is-bump"); }
      if (live$) live$.textContent = `${live$.dataset.found}: ${found.length}/${total}`;
      if (found.length === total && doneBox) { if (tip) tip.hidden = true; doneBox.hidden = false; }
    });
  });
  show();
  if (coffeeBtn) coffeeBtn.addEventListener("click", () => {
    const box = found.length === total ? doneBox : tip;
    if (!box) return;
    box.hidden = !box.hidden;
    coffeeBtn.setAttribute("aria-expanded", String(!box.hidden));
  });

  /* pixel Gabriel talks */
  document.querySelectorAll(".talk[data-lines]").forEach((btn) => {
    let lines;
    try { lines = JSON.parse(btn.dataset.lines); } catch { return; }
    const say = btn.parentElement.querySelector(".bubble--talk");
    let n = -1, hide;
    btn.hidden = false;
    btn.addEventListener("click", () => {
      n = (n + 1) % lines.length;
      if (say) {
        say.textContent = lines[n];
        clearTimeout(hide);
        hide = setTimeout(() => { say.textContent = ""; }, 7000);
      }
    });
  });

  /* copy the e-mail */
  document.querySelectorAll("[data-copy]").forEach((b) => {
    if (!navigator.clipboard) return;
    b.hidden = false;
    const label = b.textContent;
    b.addEventListener("click", () => {
      navigator.clipboard.writeText(b.dataset.copy).then(() => {
        b.textContent = b.dataset.copied;
        setTimeout(() => { b.textContent = label; }, 2000);
      }, () => {});
    });
  });
})();
