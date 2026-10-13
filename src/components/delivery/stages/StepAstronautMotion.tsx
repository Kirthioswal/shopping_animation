import React from 'react';
import astronautRunningImg from '@/assets/astronaut-running.png';
import { useViewportCoordinates } from '@/hooks/useViewportCoordinates';
import { smootherstep } from '@/utils/viewportCoordinates';

interface StepAstronautMotionProps {
  progress: number;
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/** Scroll-driven three-hop zigzag, followed by a short running exit. */
export const StepAstronautMotion: React.FC<StepAstronautMotionProps> = ({ progress }) => {
  const coords = useViewportCoordinates();
  const hopStart = 0.06;
  const hopEnd = 0.72;
  const hopProgress = clamp01((progress - hopStart) / (hopEnd - hopStart));
  const hopPosition = hopProgress * 3;
  const hopIndex = Math.min(2, Math.floor(hopPosition));
  const hopPhase = hopPosition - hopIndex;

  // The astronaut changes direction on each hop: left, right, left, then right.
  const path = [coords.LEFT_POSITION * 0.72, coords.RIGHT_POSITION * 0.66, coords.LEFT_POSITION * 0.28, coords.RIGHT_POSITION * 0.60];
  const hopX = path[hopIndex] + (path[hopIndex + 1] - path[hopIndex]) * smootherstep(hopPhase);
  const jumpY = -Math.sin(hopPhase * Math.PI) * 28;
  const runProgress = smootherstep(clamp01((progress - hopEnd) / (1 - hopEnd)));
  const runX = path[3] + (coords.RIGHT_POSITION + coords.viewportWidth * 0.24 - path[3]) * runProgress;
  const isRunning = progress > hopEnd;
  const x = isRunning ? runX : hopX;
  const runCycle = Math.sin(progress * Math.PI * 18);
  const y = isRunning ? runCycle * 5 : jumpY;
  const tilt = isRunning ? runCycle * 1.8 : (hopIndex % 2 === 0 ? -1 : 1) * Math.sin(hopPhase * Math.PI) * 1.2;
  const fadeIn = smootherstep(clamp01(progress / 0.08));
  const fadeOut = 1 - smootherstep(clamp01((progress - 0.88) / 0.12));
  const opacity = fadeIn * fadeOut;

  return (
    <div
      className="absolute left-1/2 top-[58%] z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{
        opacity,
        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotate(${tilt}deg)`,
        willChange: 'transform, opacity',
      }}
    >
      <img
        src={astronautRunningImg}
        alt="Astronaut courier hopping in a zigzag while carrying a package"
        className="h-auto max-h-[46vh] w-[min(46vw,310px)] object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,.55)]"
        draggable={false}
      />
      <div className="-mt-1 rounded-full border border-orange-400/30 bg-neutral-950/85 px-3 py-1 text-[9px] font-mono font-bold tracking-[0.16em] text-orange-200 shadow-lg sm:text-[10px]">
        ASTRONAUT LEO · ON THE MOVE
      </div>
    </div>
  );
};

export default StepAstronautMotion;
