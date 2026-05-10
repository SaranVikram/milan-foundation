// utils/lenis.ts
import Lenis from '@studio-freight/lenis';

type EasingFn = (t: number) => number; // input 0..1 -> output 0..1 [web:2]
type RAFTime = DOMHighResTimeStamp;    // per rAF callback typing [web:7]

// If @studio-freight/lenis exports types, prefer those.
// Fall back to Record<string, unknown> and narrow as needed.
export const initLenis = (options: Record<string, unknown> = {}) => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))) as EasingFn, // [web:2]
    smooth: true,
    ...options,
  } as any);

  function raf(time: RAFTime) {       // timestamp from rAF [web:7]
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return lenis;
};
