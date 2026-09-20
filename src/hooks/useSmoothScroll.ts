import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scrolling and syncs it with GSAP's ScrollTrigger.
 * This must be called once at the app level (inside Index page).
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
    });

    // Sync Lenis scroll position with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis's RAF loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);
}
