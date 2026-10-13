import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Tiny registry so the header can jump to story moments and sections.
let lenis: Lenis | null = null;
let storyTrigger: ScrollTrigger | null = null;
let storyTotal = 1;

export function registerStory(st: ScrollTrigger | null, total: number) {
  storyTrigger = st;
  storyTotal = total;
}

export function scrollToY(y: number, duration = 1.6) {
  if (lenis) lenis.scrollTo(y, { duration, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/** Scroll to a moment of the story timeline (in timeline units). */
export function scrollToStory(time: number) {
  if (!storyTrigger) return;
  const y = storyTrigger.start + (time / storyTotal) * (storyTrigger.end - storyTrigger.start);
  scrollToY(y + 2);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  scrollToY(el.getBoundingClientRect().top + window.scrollY - 72);
}

/** Lenis smooth scrolling, driven by GSAP's ticker and synced to ScrollTrigger. */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis = l;
    l.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      lenis = null;
    };
  }, [enabled]);
}
