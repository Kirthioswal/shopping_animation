import { useState, useEffect, useRef } from 'react';
import {
  ViewportCoordinates,
  calculateViewportCoordinates,
} from '@/utils/viewportCoordinates';

/**
 * Hook to provide real-time viewport dimensions and calculated coordinate zones
 * Updates dynamically on window resize using requestAnimationFrame
 */
export function useViewportCoordinates(): ViewportCoordinates {
  const [coords, setCoords] = useState<ViewportCoordinates>(() => {
    if (typeof window !== 'undefined') {
      return calculateViewportCoordinates(window.innerWidth, window.innerHeight);
    }
    return calculateViewportCoordinates(1400, 749);
  });

  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setCoords(calculateViewportCoordinates(window.innerWidth, window.innerHeight));
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    // Also perform an initial calculation to ensure accurate runtime viewport values
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return coords;
}
