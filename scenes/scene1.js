/* SAHNE 1 — İKİ OTOBÜS (0–10 s)  One leaves every 4 minutes, the other every 6.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, outBack } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  /** timed lines at one place: [start, end, text, amber?] */
  function lines(ctx, t, P, list) {
    const f = F();
    list.forEach(([a, b, s, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.fit(ctx, s, P.x, P.y, P.s, P.w, Object.assign({ alpha: al, halo: true, p: seg(t, a, a + 1.2) }, hot ? f.AMB : {}));
    });
  }
  const at = (W, k, y) => ({ x: W.x, y: y ?? W.y[k], s: W.s, w: W.w });

  function context(ctx, env, t) {
    lines(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'İki otobüs aynı duraktan kalkıyor'],
      [10.6, 21.6, '4’er ve 6’şar atlayalım'],
      [21.8, 31.8, 'İkisinin de uğradığı sayılar: ortak katlar', true],
      [32.4, 43.6, 'Otobüsler ne zaman yine birlikte kalkar?'],
      [44.4, 56.4, '12 cm ve 18 cm’lik iki kurdele: artık kalmadan eşit parçalar'],
      [56.8, 65.8, 'Tabloyla bakalım: iki sayıyı da bölenler'],
      [66.4, 75.2, 'Bir problem daha'],
      [75.6, 79.8, 'Ortak katlar sonsuz, ortak bölenler sınırlı', true],
    ]);
  }

  /* ── common multiples on the number line (10–44 s) ── */
  function multiples(ctx, env, t) {
    const L = KD.L(env), NL = L.NL, f = F(), W = L.W;
    const a = seg(t, 10.2, 10.6) * (1 - seg(t, 43.4, 44.2));
    if (a > 0) {
      f.numberLine(ctx, NL, a, seg(t, 10.2, 11.4));
      for (let k = 0; k < 9; k++) { const ts = 11.6 + k * 0.5, v = 4 * k + 4; f.jump(ctx, NL, v - 4, v, NL.h4, seg(t, ts, ts + 0.4), a, false, 120 + k); f.mark(ctx, NL, v, seg(t, ts + 0.3, ts + 0.5), a, false); }
      for (let k = 0; k < 6; k++) { const ts = 16.6 + k * 0.75, v = 6 * k + 6; f.jump(ctx, NL, v - 6, v, NL.h6, seg(t, ts, ts + 0.6), a, true, 140 + k); f.mark(ctx, NL, v, seg(t, ts + 0.5, ts + 0.7), a, true); }
      [12, 24, 36].forEach((v, j) => {
        const r = seg(t, 21.8 + j * 0.4, 22.4 + j * 0.4); if (r > 0) A.arc(ctx, [f.nlx(NL, v), NL.y], 22, 90, 450, { p: r, alpha: a, w: 5, seed: 50 + j });
        const ta = seg(t, 34.2 + j * 0.6, 34.6 + j * 0.6) * a; if (ta > 0) f.T(ctx, ['09.12', '09.24', '09.36'][j], f.nlx(NL, v), NL.y + 72, Object.assign({ size: NL.lab * 1.1, alpha: ta }, f.AMB));
      });
      const t0 = seg(t, 33.6, 34.0) * a; if (t0 > 0) f.T(ctx, '09.00', f.nlx(NL, 0), NL.y + 72, { size: NL.lab * 1.1, alpha: t0 });
    }
    lines(ctx, t, at(W, 0), [[5.0, 10.2, 'Mavi otobüs 4 dakikada bir, turuncu otobüs 6 dakikada bir kalkıyor'],
      [16.2, 31.8, '4’ün katları: 4, 8, 12, 16, 20, 24, 28, 32, 36'], [34.0, 43.6, 'İlk ortak kat 12: 12 dakika sonra, 09.12’de']]);
    lines(ctx, t, at(W, 1), [[7.0, 10.2, '09.00’da birlikte kalktılar. Yine ne zaman?', true], [21.0, 31.8, '6’nın katları: 6, 12, 18, 24, 30, 36', true],
      [37.0, 43.6, 'Sonra 09.24’te, 09.36’da... ortak katlar bitmez']]);
    lines(ctx, t, at(W, 2), [[23.4, 31.8, 'Ortak katlar: 12, 24, 36, ...'], [40.0, 43.6, 'Ortak kat: iki sayının da katı olan sayı', true]]);
    lines(ctx, t, at(W, 3), [[25.8, 31.8, 'En küçük ortak kat: 12', true]]);
  }

  /* ── common divisors: ribbons, then a table (44–66 s) ── */
  const PHASES = [[46.6, 2], [50.0, 4], [53.6, 6]];
  function ribbons(ctx, env, t) {
    const L = KD.L(env), B = L.BAR, f = F();
    const a = seg(t, 44.6, 45.0) * (1 - seg(t, 56.2, 57.0));
    if (a > 0) {
      let d = 0, cut = 0;
      PHASES.forEach(([ts, dd], i) => { const te = i + 1 < PHASES.length ? PHASES[i + 1][0] : 99; if (t >= ts && t < te) { d = dd; cut = seg(t, ts, ts + 1.0) * (1 - seg(t, te - 0.3, te)); } });
      f.ribbon(ctx, B, 0, 12, d, seg(t, 44.8, 45.8), a, cut);
      f.ribbon(ctx, B, 1, 18, d, seg(t, 45.2, 46.2), a, cut);
    }
    lines(ctx, t, at(L.W, 0), [[46.6, 49.8, '2’şer cm: 12 ÷ 2 = 6 parça, 18 ÷ 2 = 9 parça'], [50.0, 53.4, '4’er cm: 12 ÷ 4 = 3 parça, ama 18 cm’den 2 cm artar', true],
      [53.6, 56.8, '6’şar cm: 2 parça ve 3 parça, artık yok']]);
  }

  /** a row of divisors with a label; common ones get an amber ring */
  function divRow(ctx, env, t, y, label, n, other, t0, tr, a) {
    if (a <= 0) return;
    const f = F(), P = KD.L(env).TAB, nums = f.divisors(n), lw = f.width(ctx, label, P.s * 0.8);
    const tot = lw + 40 + (nums.length - 1) * P.gap + 40, x0 = (env.V ? 0 : 100) - tot / 2;
    f.T(ctx, label, x0 + lw, y, { size: P.s * 0.8, alpha: a * seg(t, t0, t0 + 0.4), align: 'right', halo: true });
    let c = 0;
    nums.forEach((v, i) => {
      const k = seg(t, t0 + 0.2 + i * 0.1, t0 + 0.6 + i * 0.1); if (k <= 0) return;
      const x = x0 + lw + 60 + i * P.gap, common = other % v === 0, r = common ? seg(t, tr + c * 0.3, tr + 0.5 + c * 0.3) : 0;
      if (common) c++;
      f.T(ctx, String(v), x, y - 12 * (1 - outBack(k)), Object.assign({ size: P.s, alpha: a * k }, r > 0.5 ? f.AMB : {}));
      if (r > 0) A.arc(ctx, [x, y - 2], P.s * 0.62, 90, 450, { p: r, alpha: a, w: 4, seed: 40 + v + n });
    });
  }
  function table(ctx, env, t) {
    const L = KD.L(env), P = L.TAB, a = seg(t, 56.8, 57.2) * (1 - seg(t, 65.4, 66.2));
    divRow(ctx, env, t, P.y[0], '12’nin bölenleri', 12, 18, 57.0, 59.0, a);
    divRow(ctx, env, t, P.y[1], '18’in bölenleri', 18, 12, 57.8, 59.4, a);
    lines(ctx, t, at(L.W, 0), [[61.4, 65.8, 'Ortak bölenler: 1, 2, 3, 6 · en büyüğü 6', true]]);
    lines(ctx, t, at(L.W, 1), [[63.0, 65.8, 'Ortak bölen: iki sayıyı da tam bölen sayı']]);
  }

  /* ── one more problem (66–80 s) ── */
  function problem(ctx, env, t) {
    const L = KD.L(env), f = F(), Y = env.V ? [-620, -520, -420, -320] : [-290, -200, -110, -20];
    const d24 = f.divisors(24), d36 = f.divisors(36), com = d24.filter((v) => 36 % v === 0);
    lines(ctx, t, at(L.W, 0, Y[0]), [[67.0, 79.8, '24 kalem ve 36 silgi, artmadan eşit paketlere ayrılacak']]);
    lines(ctx, t, at(L.W, 1, Y[1]), [[69.0, 79.8, `24’ün bölenleri: ${d24.join(', ')}`]]);
    lines(ctx, t, at(L.W, 2, Y[2]), [[70.6, 79.8, `36’nın bölenleri: ${d36.join(', ')}`]]);
    lines(ctx, t, at(L.W, 3, Y[3]), [[72.6, 79.8, `Ortak bölenler: ${com.join(', ')} · en çok ${com[com.length - 1]} paket`, true]]);
    const pk = seg(t, 74.2, 74.6) * (1 - seg(t, 79.4, 79.8));
    if (pk > 0) lines(ctx, t, at(L.W, 0, env.V ? -220 : 70), [[74.2, 79.8, 'Her pakette 2 kalem ve 3 silgi']]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Ortak kat: iki sayının da katı', 80.6], ['Ortak bölen: iki sayıyı da tam böler', 81.6], ['4 ve 6: ortak katlar 12, 24, 36, ...', 82.6], ['12 ve 18: ortak bölenler 1, 2, 3, 6', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.fit(ctx, s, S.x, S.y[i], S.s, S.w, Object.assign({ alpha: al, halo: true, p: seg(t, t0, t0 + 1.2) }, hot ? f.AMB : {}));
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); multiples(ctx, env, t); ribbons(ctx, env, t); table(ctx, env, t); problem(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Two buses', nameTr: 'İki otobüs', concept: 'Every 4 and every 6 minutes', conceptTr: '4 ve 6 dakikada bir', render });
})(window.LI = window.LI || {});
