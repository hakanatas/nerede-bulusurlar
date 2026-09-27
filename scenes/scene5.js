/* SAHNE 5 — BİR PROBLEM DAHA (66–80 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 5, start: 66, end: 80, name: 'One more problem', nameTr: 'Bir problem daha', concept: '24 pens, 36 erasers', conceptTr: '24 kalem, 36 silgi', render });
})(window.LI = window.LI || {});
