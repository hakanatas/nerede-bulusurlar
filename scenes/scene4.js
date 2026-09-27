/* SAHNE 4 — ORTAK BÖLENLER (44–66 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 4, start: 44, end: 66, name: 'Common divisors', nameTr: 'Ortak bölenler', concept: 'Ribbons and a table', conceptTr: 'Kurdeleler ve tablo', render });
})(window.LI = window.LI || {});
