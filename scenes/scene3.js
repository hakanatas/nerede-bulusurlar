/* SAHNE 3 — OTOBÜSLER (32–44 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 3, start: 32, end: 44, name: 'The buses', nameTr: 'Otobüsler', concept: 'Every 12 minutes together', conceptTr: '12 dakikada bir birlikte', render });
})(window.LI = window.LI || {});
