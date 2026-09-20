import { create } from 'zustand';

interface ScrollState {
  /** Current active step index (0-7) */
  activeStep: number;
  /** Progress within current step (0 → 1) */
  stepProgress: number;
  /** Overall page scroll progress (0 → 1) */
  globalProgress: number;
  /** Whether scroll is currently active */
  isScrolling: boolean;
  /** Whether the hero section is still in view */
  isHeroVisible: boolean;

  setActiveStep: (step: number) => void;
  setStepProgress: (progress: number) => void;
  setGlobalProgress: (progress: number) => void;
  setIsScrolling: (scrolling: boolean) => void;
  setIsHeroVisible: (visible: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  activeStep: 0,
  stepProgress: 0,
  globalProgress: 0,
  isScrolling: false,
  isHeroVisible: true,

  setActiveStep: (step) => set({ activeStep: step }),
  setStepProgress: (progress) => set({ stepProgress: progress }),
  setGlobalProgress: (progress) => set({ globalProgress: progress }),
  setIsScrolling: (scrolling) => set({ isScrolling: scrolling }),
  setIsHeroVisible: (visible) => set({ isHeroVisible: visible }),
}));
