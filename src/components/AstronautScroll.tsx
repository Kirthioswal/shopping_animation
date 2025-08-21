import { useEffect, useRef, useState, useCallback } from 'react';
import { useScrollSync } from '@/hooks/use-scroll-sync';

interface AstronautScrollProps {
  className?: string;
  containerHeight?: string;
  animationHeight?: number; // Height in viewport units over which animation completes
}

const AstronautScroll = ({ 
  className = '',
  containerHeight = 'min-h-[200vh]',
  animationHeight = 1
}: AstronautScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: HTMLImageElement }>({});

  const TOTAL_FRAMES = 198;

  // Preload images for smooth animation
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises: Promise<HTMLImageElement>[] = [];
      const imageMap: { [key: number]: HTMLImageElement } = {};

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          const frameNumber = i.toString().padStart(4, '0');
          // img.src = `/assets/ezgif-split/ezgif-frame-${frameNumber}.jpg`;
          img.src = new URL(`../assets/documents/aspose_video_134001594189285917_out${frameNumber}.png`, import.meta.url).href;
          img.onload = () => {
            imageMap[i] = img;
            resolve(img);
          };
          img.onerror = reject;
        });
        imagePromises.push(promise);
      }
      try {
        await Promise.all(imagePromises);
        setLoadedImages(imageMap);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to preload images:', error);
      }
    };

    preloadImages();
  }, []);

  // Handle frame updates based on scroll progress
  const handleScrollProgress = useCallback((progress: number) => {
    if (!imagesLoaded) return;

    // Map progress (0-1) to frame number (1-198)
    // Ensure we reach frame 198 at 100% progress
    const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + (progress * (TOTAL_FRAMES - 1)))));
    
    // Only update if frame actually changed to avoid excessive re-renders
    if (targetFrame !== currentFrame) {
      setCurrentFrame(targetFrame);
    }
  }, [imagesLoaded, currentFrame, TOTAL_FRAMES]);

  // Use the scroll sync hook
  useScrollSync({
    onScroll: handleScrollProgress,
    containerRef,
    animationHeight,
    enabled: imagesLoaded
  });

  return (
    <div 
      ref={containerRef}
      className={`relative ${containerHeight}`}
    >
      {/* Fixed image sequence background */}
      <div className={`${className} w-full h-full overflow-hidden`}>
        {imagesLoaded && loadedImages[currentFrame] && (
          <img
            src={loadedImages[currentFrame].src}
            alt={`Astronaut frame ${currentFrame}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: 1,
              transition: 'opacity 0.1s ease-out',
              objectPosition: 'center center',
              transform: 'translateY(-5%)'
            }}
          />
        )}
        
        {/* Loading state */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-background flex items-center justify-center">
            <div className="text-muted-foreground">Loading astronaut frames...</div>
          </div>
        )}
        
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      {/* Content area - positioned relative to allow scrolling */}
      <div className="relative z-10 h-full">
        {/* This creates the scrollable space */}
        <div className="h-full" />
      </div>
    </div>
  );
};

export default AstronautScroll;
