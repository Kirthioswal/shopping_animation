import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/stores/scrollStore';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up GSAP ScrollTrigger instances for each journey section.
 * Each section gets a ScrollTrigger that:
 * 1. Tracks progress (0→1) as the user scrolls through the section
 * 2. Updates the Zustand store so the 3D canvas knows what to animate
 *
 * @param totalSteps - The number of journey steps (default 8)
 */
export function useJourneyAnimation(totalSteps: number = 8) {
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const {
    setActiveStep,
    setStepProgress,
    setGlobalProgress,
    setIsScrolling,
    setIsHeroVisible,
  } = useScrollStore();

  useEffect(() => {
    // Clean up any previous triggers
    triggersRef.current.forEach((t) => t.kill());
    triggersRef.current = [];

    // Hero visibility via IntersectionObserver (avoids duplicate ScrollTrigger on hero)
    const heroEl = document.getElementById('hero-section');
    let heroObserver: IntersectionObserver | null = null;
    if (heroEl) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          setIsHeroVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      heroObserver.observe(heroEl);
    }

    // GSAP context for journey step ScrollTriggers only
    const ctx = gsap.context(() => {
      // Create a ScrollTrigger for each journey step section
      for (let i = 0; i < totalSteps; i++) {
        const sectionEl = document.getElementById(`journey-step-${i}`);
        if (!sectionEl) continue;

        const trigger = ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: false,
          onUpdate: (self) => {
            setActiveStep(i);
            setStepProgress(self.progress);
            setIsScrolling(true);

            // Global progress: combine step index with step progress
            const global = (i + self.progress) / totalSteps;
            setGlobalProgress(global);
          },
          onLeave: () => {
            setIsScrolling(false);
          },
          onLeaveBack: () => {
            setIsScrolling(false);
          },
        });

        triggersRef.current.push(trigger);
      }
    });

    return () => {
      ctx.revert();
      triggersRef.current = [];
      heroObserver?.disconnect();
    };
  }, [totalSteps, setActiveStep, setStepProgress, setGlobalProgress, setIsScrolling, setIsHeroVisible]);
}

