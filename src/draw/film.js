/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   Two buses leave every 4 and every 6 minutes: jumps on a number line
   meet at the common multiples. Two ribbons of 12 cm and 18 cm are cut
   into equal pieces with nothing left over: the common divisors.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, outBack, outCubic, inOut, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;

  const T = (ctx, s, x, y, o = {}) => A.text(ctx, s, x, y, Object.assign({ size: 48 }, o));
  const AMB = { color: A.amber };
  /** text width in the brush font */
  function width(ctx, s, size) { ctx.save(); ctx.font = `${size}px "LI Brush", "Comic Sans MS", cursive`; const w = ctx.measureText(s).width; ctx.restore(); return w; }
  /** write text, shrinking it to fit width w */
  function fit(ctx, s, x, y, size, w, o = {}) { const m = width(ctx, s, size); T(ctx, s, x, y, Object.assign({ size: m > w ? size * w / m : size }, o)); }
  /** a hand-drawn check mark at (x, y) */
  function tick(ctx, x, y, p, a = 1) {
    if (p <= 0 || a <= 0) return;
    Ink.path(ctx, [[x, y], [x + 12, y + 14], [x + 38, y - 20]], { w: 7, p, alpha: a, color: LI.AMBER_RGB, seed: 401, taper: [0.05, 0.3] });
  }
  /** a hand-drawn cross over (x, y) */
  function cross(ctx, x, y, r, p, a = 1) {
    if (p <= 0 || a <= 0) return;
    Ink.path(ctx, [[x - r, y - r], [x + r, y + r]], { w: 6, p: clamp(p * 2), alpha: a, color: LI.AMBER_RGB, seed: 411, taper: [0.1, 0.3] });
    Ink.path(ctx, [[x + r, y - r], [x - r, y + r]], { w: 6, p: clamp(p * 2 - 1), alpha: a, color: LI.AMBER_RGB, seed: 412, taper: [0.1, 0.3] });
  }

  const divisors = (n) => { const d = []; for (let k = 1; k <= n; k++) if (n % k === 0) d.push(k); return d; };

  /* ── number line with two kinds of jumps ────────────────── */
  const nlx = (NL, v) => NL.x0 + (NL.x1 - NL.x0) * v / NL.n;
  function numberLine(ctx, NL, a, p = 1) {
    if (a <= 0) return;
    Ink.path(ctx, [[NL.x0 - 20, NL.y], [NL.x1 + 30, NL.y]], { w: 5, p, alpha: a, seed: 61, taper: [0, 0.2], wob: 0.1 });
    for (let v = 0; v <= NL.n; v++) {
      const g = seg(p, v / NL.n * 0.9, v / NL.n * 0.9 + 0.1); if (g <= 0) continue;
      const x = nlx(NL, v), big = v % 6 === 0 || v % 4 === 0;
      Ink.path(ctx, [[x, NL.y - (big ? 11 : 7)], [x, NL.y + (big ? 11 : 7)]], { w: 3, alpha: a * g, seed: 62 + v, taper: [0, 0] });
      if (v % NL.step === 0) T(ctx, String(v), x, NL.y + 32, { size: NL.lab, alpha: a * g * 0.8 });
    }
  }
  /** a jump from u to v, arc height h; amber or ink */
  function jump(ctx, NL, u, v, h, p, a, amber, seed) {
    if (p <= 0 || a <= 0) return;
    const x0 = nlx(NL, u), x1 = nlx(NL, v), pts = [];
    for (let s = 0; s <= 24; s++) { const k = s / 24; pts.push([lerp(x0, x1, k), NL.y - 8 - h * Math.sin(Math.PI * k)]); }
    Ink.path(ctx, pts, { w: amber ? 5 : 4, p, alpha: a * (amber ? 1 : 0.8), color: amber ? LI.AMBER_RGB : undefined, seed, taper: [0.1, 0.1], wob: 0.1 });
  }
  function mark(ctx, NL, v, k, a, amber, r = 9) {
    if (k <= 0 || a <= 0) return;
    ctx.fillStyle = amber ? `rgba(${LI.AMBER_RGB},${a})` : `rgba(${LI.INK_RGB},${0.85 * a})`;
    ctx.beginPath(); ctx.arc(nlx(NL, v), NL.y, r * outBack(clamp(k)), 0, Math.PI * 2); ctx.fill();
  }

  /* ── ribbons cut into equal pieces ───────────────────────── */
  /** a ribbon of length len (units) cut every d units; the leftover glows amber */
  function ribbon(ctx, B, row, len, d, k, a, cut) {
    if (a <= 0) return;
    const x0 = B.x0, y = B.y[row], w = len * B.u * outCubic(clamp(k)), h = B.h;
    ctx.fillStyle = `rgba(${LI.INK_RGB},${0.1 * a})`; ctx.fillRect(x0, y - h / 2, w, h);
    Ink.path(ctx, [[x0, y - h / 2], [x0 + w, y - h / 2], [x0 + w, y + h / 2], [x0, y + h / 2], [x0, y - h / 2]], { w: 4, alpha: a, seed: 90 + row, taper: [0, 0], wob: 0.12 });
    T(ctx, `${len} cm`, x0 - 20, y, { size: B.lab, alpha: a * clamp(k), align: 'right' });
    if (!d || cut <= 0) return;
    const n = Math.floor(len / d), left = len - n * d;
    for (let i = 1; i <= n; i++) {
      if (i === n && left === 0) break;
      const x = x0 + i * d * B.u, g = seg(cut, (i - 1) / Math.max(1, n) * 0.7, (i - 1) / Math.max(1, n) * 0.7 + 0.3);
      if (g > 0) Ink.path(ctx, [[x, y - h / 2 - 8], [x, y + h / 2 + 8]], { w: 4, p: g, alpha: a, seed: 100 + i + row * 20, taper: [0, 0] });
    }
    if (left > 0) {
      const g = seg(cut, 0.8, 1), xl = x0 + n * d * B.u;
      ctx.fillStyle = `rgba(${LI.AMBER_RGB},${0.45 * a * g})`; ctx.fillRect(xl, y - h / 2, left * B.u, h);
    }
  }

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    KD.look(p, [(L.NL.x0 + L.NL.x1) / 2, L.NL.y]);
    if (t > 44 && t < 66) KD.look(p, [L.BAR.x0 + 400, (L.BAR.y[0] + L.BAR.y[1]) / 2]);
    if ((t > 33 && t < 44) || (t > 66 && t < 80)) KD.look(p, [L.W.x, L.W.y[1]]);
    if (t > 80 && t < 84) KD.look(p, [L.SUM.x, L.SUM.y[1]]);
    if (t > 2.9 && t < 5.6) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(11.0, 12.6); pointing(16.4, 18.0); pointing(21.8, 23.6); pointing(34.0, 35.8); pointing(46.6, 48.2); pointing(53.6, 55.2); pointing(58.6, 60.4); pointing(72.6, 74.2); pointing(80.6, 82.4);
    const think = seg(t, 7.0, 7.4) * (1 - seg(t, 9.4, 9.7));
    if (think > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.5 * think; p.mouth = 0; p.lookY -= 0.3; }
    if (t > 50.4 && t < 51.6) { p.mouthOpen = 0.55; p.eyeScale = 1.1; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(25.6, 27.2); joy(41.0, 42.6); joy(62.0, 63.6); joy(76.0, 77.6);
    if (t > 84.0) {
      const j = (t - 84.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 18.0, 18.15), hump(t, 33.0, 33.15), hump(t, 50.0, 50.15), hump(t, 70.0, 70.15), hump(t, 81.0, 81.15));
    return p;
  }

  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  LI.Film = { T, AMB, width, fit, tick, cross, divisors, nlx, numberLine, jump, mark, ribbon, nokta, base };
})(window.LI = window.LI || {});
