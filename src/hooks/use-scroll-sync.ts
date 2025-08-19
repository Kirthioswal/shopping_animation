import { useEffect, useRef, useCallback } from 'react';

interface UseScrollSyncOptions {
  onScroll: (progress: number) => void;
  containerRef: React.RefObject<HTMLElement>;
  animationHeight?: number; // Height in viewport units over which animation completes
  enabled?: boolean;
}

export const useScrollSync = ({
  onScroll,
  containerRef,
  animationHeight = 1, // Default: animation completes in 1 viewport height
  enabled = true
}: UseScrollSyncOptions) => {
  const animationFrameRef = useRef<number>();
  const tickingRef = useRef(false);

  const updateProgress = useCallback(() => {
    if (!containerRef.current) {
      tickingRef.current = false;
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top;
    const viewportHeight = window.innerHeight;
    const scrollEnd = viewportHeight * animationHeight;
    
    let progress = 0;
    
    if (containerTop <= 0) {
      const scrolledDistance = Math.abs(containerTop);
      progress = Math.min(scrolledDistance / scrollEnd, 1);
    }
    
    onScroll(progress);
    tickingRef.current = false;
  }, [onScroll, containerRef, animationHeight]);

  const handleScroll = useCallback(() => {
    if (!enabled || tickingRef.current) return;
    
    animationFrameRef.current = requestAnimationFrame(updateProgress);
    tickingRef.current = true;
  }, [enabled, updateProgress]);

  useEffect(() => {
    if (!enabled) return;

    // Initial call
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, handleScroll, updateProgress]);

  return { updateProgress };
};
