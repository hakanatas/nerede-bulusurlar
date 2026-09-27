/* SAHNE 2 — ORTAK KATLAR (10–32 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 2, start: 10, end: 32, name: 'Common multiples', nameTr: 'Ortak katlar', concept: 'Jumps of 4 and 6 meet', conceptTr: '4’er ve 6’şar atlamalar buluşur', render });
})(window.LI = window.LI || {});
