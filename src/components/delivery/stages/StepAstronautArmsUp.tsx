import React from 'react';
import astronautArmsDown from '@/assets/astronaut-arms-down.png';
import astronautArmsUp from '@/assets/astronaut-arms-up.png';
import { smootherstep } from '@/utils/viewportCoordinates';

interface StepAstronautArmsUpProps {
  progress: number;
}

/** Scroll-linked pose change: Leo starts at rest and raises both arms overhead. */
export const StepAstronautArmsUp: React.FC<StepAstronautArmsUpProps> = ({ progress }) => {
  const raiseProgress = smootherstep(Math.max(0, Math.min(1, progress / 0.78)));
  const settle = Math.sin(progress * Math.PI * 2) * 2.5 * raiseProgress;
  const downArms = 'M370 588 C320 606 284 650 263 711 L230 813 C217 854 236 897 267 933 L302 991 C320 1021 359 1020 378 989 L379 915 L390 814 C400 730 409 650 370 588 Z';
  const upArms = 'M380 625 C331 593 299 521 258 458 L205 413 C173 391 138 364 113 331 C88 299 94 261 120 231 C151 196 205 208 238 236 C270 264 285 303 276 337 L254 379 L310 426 C355 474 385 525 409 576 L411 626 Z';
  const mirror = (path: string) => path.replace(/([MLC])([^MLCZ]+)/g, (_match, command: string, rawCoords: string) => {
    const coords = (rawCoords.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
    return `${command}${coords.map((value, index) => (index % 2 === 0 ? 1146 - value : value)).join(' ')}`;
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_58%,rgba(249,115,22,0.16),transparent_48%)]" />
      <div
        className="relative flex h-[min(68vh,620px)] w-[min(78vw,480px)] items-center justify-center"
        style={{ transform: `translate3d(0,${settle}px,0)`, willChange: 'transform' }}
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1146 1372" role="img" aria-label="Astronaut Leo raises both arms overhead">
          <defs>
            <mask id="leo-rest-body-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1146" height="1372">
              <rect width="1146" height="1372" fill="white" />
              <path d={downArms} fill="black" />
              <path d={mirror(downArms)} fill="black" />
            </mask>
            <clipPath id="leo-rest-arms-clip" clipPathUnits="userSpaceOnUse">
              <path d={downArms} />
              <path d={mirror(downArms)} />
            </clipPath>
            <clipPath id="leo-raised-arms-clip" clipPathUnits="userSpaceOnUse">
              <path d={upArms} />
              <path d={mirror(upArms)} />
            </clipPath>
          </defs>
          <image href={astronautArmsDown} x="0" y="0" width="1146" height="1372" mask="url(#leo-rest-body-mask)" />
          <image href={astronautArmsDown} x="0" y="0" width="1146" height="1372" clipPath="url(#leo-rest-arms-clip)" opacity={1 - raiseProgress} />
          <image href={astronautArmsUp} x="0" y="0" width="1146" height="1372" clipPath="url(#leo-raised-arms-clip)" opacity={raiseProgress} />
        </svg>
      </div>
      <div className="absolute bottom-[16%] rounded-full border border-orange-400/30 bg-neutral-950/85 px-4 py-2 text-[9px] font-mono font-bold tracking-[0.18em] text-orange-200 shadow-lg sm:text-[10px]">
        {progress < 0.55 ? 'READY, LEO?' : 'HANDS UP · LET’S GO!'}
      </div>
    </div>
  );
};

export default StepAstronautArmsUp;
