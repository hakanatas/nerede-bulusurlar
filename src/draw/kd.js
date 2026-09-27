/* Shared layout + Nokta helpers for "Nerede Buluşurlar?". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? {
          CX: { x: 0, y: -770, s: 44, w: 960 },
          NL: { x0: -450, x1: 450, y: -470, n: 36, lab: 20, step: 2, h4: 45, h6: 95 },
          W: { x: 0, y: [-300, -220, -140, -60], s: 42, w: 960 },
          BAR: { x0: -396, u: 44, y: [-600, -470], h: 40, lab: 36 },
          TAB: { y: [-600, -470], gap: 84, s: 44 },
          SUM: { x: 0, y: [-560, -460, -360, -260], s: 48, w: 960 },
          nx: -360, gy: 560, s: 1.15 }
        : {
          CX: { x: 60, y: -440, s: 50, w: 1300 },
          NL: { x0: -560, x1: 820, y: -120, n: 36, lab: 24, step: 1, h4: 60, h6: 130 },
          W: { x: 100, y: [0, 78, 156, 234], s: 50, w: 1250 },
          BAR: { x0: -420, u: 50, y: [-280, -160], h: 44, lab: 40 },
          TAB: { y: [-280, -160], gap: 104, s: 50 },
          SUM: { x: 100, y: [-230, -140, -50, 60], s: 56, w: 1250 },
          nx: -800, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
