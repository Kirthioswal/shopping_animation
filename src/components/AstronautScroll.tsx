import { useEffect, useRef, useState, useCallback } from 'react';
import { useScrollSync } from '@/hooks/use-scroll-sync';

interface AstronautScrollProps {
  videoSrc: string;
  className?: string;
  containerHeight?: string;
  animationHeight?: number; // Height in viewport units over which animation completes
}

const AstronautScroll = ({ 
  videoSrc, 
  className = '',
  containerHeight = 'min-h-[200vh]',
  animationHeight = 1
}: AstronautScrollProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Preload and setup video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      // Ensure video is paused and at start
      video.pause();
      video.currentTime = 0;
    };

    const handleLoadedMetadata = () => {
      // Video metadata is loaded, ready for scrubbing
      video.pause();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Preload the video
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoSrc]);

  // Handle video time updates based on scroll progress
  const handleScrollProgress = useCallback((progress: number) => {
    const video = videoRef.current;
    if (!video || !isVideoLoaded) return;

    const videoDuration = video.duration;
    if (videoDuration && !isNaN(videoDuration)) {
      const targetTime = progress * videoDuration;
      
      // Only update if there's a meaningful difference to avoid excessive updates
      if (Math.abs(video.currentTime - targetTime) > 0.1) {
        video.currentTime = targetTime;
      }
    }
  }, [isVideoLoaded]);

  // Use the scroll sync hook
  useScrollSync({
    onScroll: handleScrollProgress,
    containerRef,
    animationHeight,
    enabled: isVideoLoaded
  });

  return (
    <div 
      ref={containerRef}
      className={`relative ${containerHeight}`}
    >
      {/* Fixed video background */}
      <div className={`${className} w-full h-full overflow-hidden`}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          muted
          playsInline
          preload="metadata"
          style={{
            opacity: isVideoLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            
          }}
        />
        
        {/* Loading state */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-background flex items-center justify-center">
            <div className="text-muted-foreground">Loading astronaut...</div>
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
