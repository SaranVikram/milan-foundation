// components/SmoothScrolling.tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';

type RAFTime = DOMHighResTimeStamp;

interface LenisInstance {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (target: number | string | Element, options?: { immediate?: boolean }) => void;
}

export default function SmoothScrolling(): null {
  const lenisRef = useRef<LenisInstance | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new (Lenis as unknown as new (opts?: any) => LenisInstance)({
      // Replace unsupported 'smooth' with supported options
      lerp: 0.1, // lower = smoother [web:35]
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Optional, depending on version/types:
      smoothWheel: true,
      // smoothTouch: false,
      // wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: RAFTime) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
