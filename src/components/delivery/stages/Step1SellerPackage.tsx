import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeliveryPackage } from '../DeliveryPackage';
import { CheckCircle2, ShieldCheck, ArrowLeft, Box } from 'lucide-react';
import astronautPackingImg from '@/assets/astronaut/astronaut-front.png';
import { useViewportCoordinates } from '@/hooks/useViewportCoordinates';
import { smootherstep } from '@/utils/viewportCoordinates';

interface Step1Props {
  progress: number; // 0 to 1 for this step
}

export const Step1SellerPackage: React.FC<Step1Props> = ({ progress }) => {
  const coords = useViewportCoordinates();

  // Pacing sequence:
  // 0.00 → 0.16: Astronaut + package appears at center
  // 0.16 → 0.36: Astronaut packs package (active packing state)
  // 0.36 → 0.46: Package gets sealed (sealing tape applied, seal confirmation flash)
  // 0.46 → 0.52: "Order Packed and Sealed" appears in UPPER-RIGHT area
  // 0.52 → 0.78: Brief visual hold (storytelling moment, generous dwell zone)
  // 0.78 → 0.90: Package proceeds toward RIGHT to Courier Handover; Astronaut station fades
  // 0.90 → 1.00: Breathing space before Stage 2

  const isPackingPhase = progress < 0.34;
  const isSealed = progress >= 0.34;
  const showSealedMessage = progress >= 0.42 && progress <= 0.88;
  const isZoomPhase = progress >= 0.34 && progress <= 0.76;

  // Zoom sub-progress for details
  const zoomSubProgress = isZoomPhase
    ? Math.min(Math.max((progress - 0.34) / 0.35, 0), 1)
    : 0;

  // Scale: 1.0 -> subtle zoom 1.15 when sealed and held -> 1.0
  let packageScale = 1;
  if (progress < 0.34) {
    packageScale = 1;
  } else if (progress < 0.46) {
    const t = (progress - 0.34) / 0.12;
    packageScale = 1 + smootherstep(t) * 0.15;
  } else if (progress <= 0.74) {
    packageScale = 1.15;
  } else if (progress < 0.86) {
    const t = (progress - 0.74) / 0.12;
    packageScale = 1.15 - smootherstep(t) * 0.15;
  } else {
    packageScale = 1;
  }

  // Workstation container position & opacity:
  // Starts centered and visible right from stage entry (0.00 -> 0.76 hold), fades out smoothly at 0.76 -> 0.90
  let workstationX = 0;
  let workstationOpacity = 1;
  if (progress < 0.08) {
    const t = progress / 0.08;
    const s = smootherstep(t);
    workstationX = -Math.round(coords.viewportWidth * 0.01) * (1 - s);
    workstationOpacity = 0.85 + s * 0.15;
  } else if (progress <= 0.76) {
    workstationX = 0;
    workstationOpacity = 1;
  } else if (progress < 0.90) {
    const t = (progress - 0.76) / 0.14;
    const s = smootherstep(t);
    workstationX = -s * Math.round(coords.viewportWidth * 0.02);
    workstationOpacity = Math.max(0, 1 - s * 1.4);
  } else {
    workstationOpacity = 0;
    workstationX = -Math.round(coords.viewportWidth * 0.02);
  }

  // Package X position:
  // Held in center beside astronaut during 0.16 -> 0.76
  // Glides smoothly toward RIGHT (CENTER_POSITION -> RIGHT_POSITION) during 0.76 -> 0.92 to seamlessly hand over to Stage 2
  let packageExitX = coords.CENTER_POSITION;
  if (progress > 0.76) {
    const t = Math.min((progress - 0.76) / 0.16, 1);
    packageExitX = coords.RIGHT_POSITION * smootherstep(t);
  }

  const packageY = Math.sin(progress * Math.PI) * -8;
  const rotation = isSealed ? Math.sin(progress * Math.PI * 2) * 1.5 : 0;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Ambient workstation glow */}
      <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 via-black to-black pointer-events-none" />

      {/* 1. "ORDER PACKED AND SEALED" MESSAGE (RIGHT SIDE / UPPER-RIGHT AREA) */}
      <div
        className="absolute top-24 sm:top-28 right-6 sm:right-12 lg:right-16 z-50 pointer-events-none max-w-xs sm:max-w-sm"
        style={{
          opacity: showSealedMessage
            ? progress < 0.78
              ? 1
              : Math.max(0, 1 - (progress - 0.78) / 0.10)
            : 0,
          transform: `translate3d(${showSealedMessage ? 0 : 30}px, 0, 0) scale(${showSealedMessage ? 1 : 0.92})`,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out',
        }}
      >
        <div className="bg-neutral-950/95 border-2 border-emerald-500/70 shadow-[0_20px_50px_rgba(16,185,129,0.35),0_0_30px_rgba(16,185,129,0.2)] rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 backdrop-blur-2xl text-left">
          <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[9.5px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Dark Store #04 // Station Leo
              </span>
            </div>
            <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
              #JFY-9082
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-black text-white leading-tight tracking-tight">
                Order Packed and Sealed
              </h3>
              <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
                Customer parcel packed and sealed with tamper-proof security tape.
              </p>

              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Tamper-Proof Tape Applied ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2 & 3. CENTER PACKING WORKSTATION: ASTRONAUT PACKING + CONNECTED PACKAGE */}
      <div
        className="relative z-30 flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-7 lg:gap-8 max-w-5xl mx-auto px-4 pointer-events-auto"
        style={{
          transform: `translate3d(${workstationX}px, ${packageY}px, 0)`,
          opacity: workstationOpacity,
          willChange: 'transform, opacity',
        }}
      >
        {/* ASTRONAUT PACKING STATION CARD */}
        <div className="relative w-[270px] sm:w-[310px] lg:w-[340px] rounded-3xl overflow-hidden border border-neutral-800/90 bg-neutral-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
          {/* Workstation Top Bar */}
          <div className="px-3.5 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-[10px] font-mono font-bold text-neutral-300 tracking-wider">
                PACKING STATION // LEO
              </span>
            </div>
            <span
              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border transition-colors duration-300 ${
                isSealed
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                  : 'text-orange-400 bg-orange-500/10 border-orange-500/30 animate-pulse'
              }`}
            >
              {isSealed ? 'SEALED ✓' : 'PACKING...'}
            </span>
          </div>

          {/* Astronaut Image actively packing the parcel */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
            <img
              src={astronautPackingImg}
              alt="Astronaut Leo packing and sealing the customer's order into the package"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

            {/* Active packing status bar over astronaut */}
            <div className="absolute bottom-2.5 inset-x-2.5 bg-neutral-950/90 border border-neutral-800/80 rounded-xl p-2 backdrop-blur-md flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md">
                👨‍🚀
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[11px] font-bold text-white leading-tight truncate">
                  {isSealed ? 'Order #JFY-9082 Sealed!' : 'Astronaut Leo Packing Box...'}
                </p>
                <p className="text-[9.5px] text-neutral-400 truncate">
                  {isSealed
                    ? 'Tamper-proof tape applied & ready'
                    : 'Placing customer item into parcel box'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PHYSICAL PACKAGE (CONNECTED TO ASTRONAUT'S PACKING ACTION) */}
        <div
          className="relative transition-transform duration-75 ease-out flex flex-col items-center"
          style={{
            transform: `translate3d(${packageExitX}px, 0, 0)`,
            willChange: 'transform',
          }}
        >
          {/* Sealing Confirmation Flash & Aura */}
          {isSealed && (
            <motion.div
              key="seal-flash"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.25, 1.4] }}
              transition={{ duration: 0.6 }}
              className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/40 via-emerald-400/50 to-orange-500/40 blur-xl pointer-events-none z-40"
            />
          )}

          <DeliveryPackage
            scale={packageScale}
            rotation={rotation}
            isZoomed={isZoomPhase}
            zoomProgress={zoomSubProgress}
            statusText={
              !isSealed
                ? 'Astronaut Packing Order... 📦'
                : progress < 0.78
                ? 'Order Packed & Sealed ✓'
                : 'Routing to Courier Partner →'
            }
            badgeColor={isSealed ? 'emerald' : 'orange'}
          />

          {/* Small "SEALED" Confirmation Badge under package */}
          {isSealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="mt-3 z-40 whitespace-nowrap pointer-events-none"
            >
              <div className="bg-emerald-950/90 border border-emerald-500/80 shadow-[0_4px_15px_rgba(16,185,129,0.4)] px-3 py-1 rounded-full text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1.5 backdrop-blur-md">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>SEALED WITH TAMPER-PROOF TAPE</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Directional hint towards Courier Handover (Stage 2) */}
      <div
        className="absolute right-6 sm:right-16 bottom-16 sm:bottom-20 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: progress >= 0.75 ? Math.min(1, (progress - 0.75) * 4) : 0,
        }}
      >
        <div className="flex items-center gap-2 bg-neutral-900/85 border border-orange-500/30 px-3.5 py-2 rounded-2xl backdrop-blur-md shadow-lg">
          <span className="text-[11px] font-mono text-neutral-300 font-bold">
            Courier Transfer Dock
          </span>
          <ArrowLeft className="w-3.5 h-3.5 text-orange-400 animate-pulse rotate-180" />
        </div>
      </div>
    </div>
  );
};

