import React from 'react';
import { motion } from 'framer-motion';
import { DeliveryPackage } from '../DeliveryPackage';
import {
  PackageCheck,
  Bike,
  Navigation,
  CheckCircle2,
  Zap,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import packedDeliveryImg from '@/assets/journey/packed-delivery.jpg';
import { useViewportCoordinates } from '@/hooks/useViewportCoordinates';
import { smootherstep } from '@/utils/viewportCoordinates';

interface Step6Props {
  progress: number; // 0 to 1 for this step
}

export const Step6LocalCourier: React.FC<Step6Props> = ({ progress }) => {
  const coords = useViewportCoordinates();

  // ─── SCROLL PACING & CHOREOGRAPHY (RIGHT -> CENTER -> LEFT) ───
  // 0.00 → 0.22: Package arrives from Regional Hub (RIGHT: RIGHT_POSITION) toward CENTER (0)
  // 0.22 → 0.72: CENTER STORY MOMENT (50% generous dwell zone)
  //              • Package held fully visible at CENTER (0)
  //              • "Packed Delivery" message revealed on LEFT side
  //              • Delivery/packing confirmation & Rider Marco details active
  //              • Packing inspection & dispatch verified
  // 0.72 → 0.88: Package visibly continues from CENTER (0) toward LEFT (LEFT_POSITION) toward Packed Delivery hub
  // 0.88 → 1.00: Package reaches LEFT (LEFT_POSITION), breathing space before Stage 7 (Customer Doorstep) begins

  const isAtCenter = progress >= 0.22 && progress <= 0.72;
  const isPackedAndConfirmed = progress >= 0.32;
  const isAssignedToRider = progress >= 0.45;

  // Package horizontal movement: RIGHT (RIGHT_POSITION) → CENTER (0) → LEFT (LEFT_POSITION)
  let packageX = coords.CENTER_POSITION;
  if (progress < 0.22) {
    const t = progress / 0.22;
    packageX = coords.RIGHT_POSITION * (1 - smootherstep(t));
  } else if (progress <= 0.72) {
    packageX = coords.CENTER_POSITION;
  } else if (progress < 0.90) {
    const t = (progress - 0.72) / 0.18;
    packageX = coords.LEFT_POSITION * smootherstep(t);
  } else {
    packageX = coords.LEFT_POSITION;
  }

  // Vertical gentle float
  const packageY = progress < 0.22
    ? Math.sin((progress / 0.22) * Math.PI) * -12
    : Math.sin(progress * Math.PI * 2) * -6;

  const packageScale = isAtCenter ? 1.08 : 0.96;

  // Left-side Packed Delivery Panel appearance
  let panelOpacity = 0;
  let panelX = -30;
  if (progress < 0.14) {
    panelOpacity = 0;
    panelX = -30;
  } else if (progress < 0.26) {
    const t = (progress - 0.14) / 0.12;
    const s = smootherstep(t);
    panelOpacity = s;
    panelX = -30 * (1 - s);
  } else if (progress <= 0.80) {
    panelOpacity = 1;
    panelX = 0;
  } else if (progress < 0.94) {
    const t = (progress - 0.80) / 0.14;
    const s = smootherstep(t);
    panelOpacity = Math.max(0, 1 - s * 1.2);
    panelX = -s * 20;
  } else {
    panelOpacity = 0;
    panelX = -20;
  }

  // Right-side Outbound Regional Hub origin badge (fades out smoothly as package settles at center)
  const rightOriginOpacity = Math.max(0, 1 - smootherstep(progress * 4.5));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* City sunset / evening streets ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-orange-950/25 to-black pointer-events-none" />

      {/* Subtle warm street lights / ambiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(249,115,22,0.15)_0%,transparent_60%)]"
          style={{ transform: `translateX(${-progress * 60}px)` }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(251,146,60,0.12)_0%,transparent_60%)]"
          style={{ transform: `translateX(${progress * 60}px)` }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. RIGHT SIDE: OUTBOUND FROM REGIONAL HUB (Transitional bridge from Step 5)
          Fades out quickly as package arrives at center
          ───────────────────────────────────────────────────────────── */}
      {rightOriginOpacity > 0.01 && (
        <div
          className="absolute right-6 sm:right-12 lg:right-16 top-[56%] -translate-y-1/2 z-20 pointer-events-none max-w-xs"
          style={{
            opacity: rightOriginOpacity,
            transform: `translate3d(${progress * 40}px, -50%, 0)`,
          }}
        >
          <div className="bg-neutral-950/90 border border-neutral-800 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl text-left">
            <div className="flex items-center gap-2 mb-1.5 text-emerald-400 font-mono text-xs font-bold">
              <ArrowLeft className="w-4 h-4 animate-pulse" />
              <span>OUTBOUND REGIONAL HUB</span>
            </div>
            <p className="text-xs text-neutral-300 font-semibold leading-relaxed">
              Dispatched from Bay #08 for local delivery...
            </p>
            <div className="mt-2 text-[10px] font-mono text-neutral-400 flex justify-between border-t border-neutral-800 pt-1.5">
              <span>DESTINATION:</span>
              <span className="text-orange-400 font-bold">PACKED FOR FINAL MILE</span>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. LEFT SIDE: PACKED DELIVERY PANEL
          Positioned on the LEFT side of the screen
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-6 sm:left-10 lg:left-14 -translate-y-1/2 z-30 pointer-events-auto max-w-xs sm:max-w-sm lg:max-w-md"
        style={{
          top: coords.CENTER_Y,
          opacity: panelOpacity,
          transform: `translate3d(${panelX}px, -50%, 0)`,
          willChange: 'transform, opacity',
        }}
      >
        <div className="relative w-[290px] sm:w-[330px] lg:w-[360px] rounded-3xl overflow-hidden border-2 border-orange-500/70 bg-neutral-950/95 shadow-[0_20px_50px_rgba(249,115,22,0.35),0_0_30px_rgba(249,115,22,0.15)] backdrop-blur-2xl">
          {/* Top Info Bar */}
          <div className="px-3.5 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="text-[9.5px] font-mono font-bold text-orange-400 tracking-wider uppercase">
                Final-Mile Staging // Bay #04
              </span>
            </div>
            <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
              #JFY-9082
            </span>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 1: "PACKED DELIVERY" MESSAGE (LEFT SIDE)
              ───────────────────────────────────────────────────────── */}
          <div className="p-3.5 sm:p-4 pb-2.5 text-left border-b border-neutral-800/80 bg-neutral-950/90">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/40 shrink-0 mt-0.5">
                <PackageCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-white leading-tight tracking-tight">
                  Packed Delivery
                </h3>
                <p className="text-[10.5px] sm:text-[11px] text-neutral-300 mt-0.5 leading-snug">
                  Package verified, secured, and packed for final-mile doorstep delivery.
                </p>
              </div>
            </div>

            {/* Subtle Delivery/Packing Confirmation Badges */}
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                Security Seal Verified ✓
              </span>
              <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold text-orange-300 bg-orange-500/20 border border-orange-500/40 px-2.5 py-0.5 rounded-full">
                <Zap className="w-2.5 h-2.5 text-orange-400 animate-pulse" />
                Express Dispatch Ready
              </span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 2: LOCAL COURIER PARTNER (Rider Marco) DETAILS
              ───────────────────────────────────────────────────────── */}
          <div className="px-3.5 py-2 bg-neutral-900/70 border-b border-neutral-800 flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                  Local Courier Rider Marco
                </h4>
                <p className="text-[9px] font-mono text-neutral-400">
                  Jiffy Express E-Bike #M-102
                </p>
              </div>
            </div>

            <motion.span
              animate={
                isAssignedToRider
                  ? {
                      scale: [1, 1.08, 1],
                      boxShadow: [
                        '0 0 0px rgba(249,115,22,0)',
                        '0 0 16px rgba(249,115,22,0.6)',
                        '0 2px 10px rgba(249,115,22,0.3)',
                      ],
                    }
                  : {}
              }
              transition={{ type: 'spring', stiffness: 450, damping: 18 }}
              className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                isAssignedToRider
                  ? 'bg-emerald-500/25 text-emerald-200 border-emerald-500/60 shadow-lg shadow-emerald-500/30'
                  : 'bg-orange-500/20 text-orange-300 border-orange-500/50'
              }`}
            >
              {isAssignedToRider ? 'PACKED & ASSIGNED 🛵' : 'STAGING DISPATCH...'}
            </motion.span>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 3: RELEVANT PACKED DELIVERY 3D VISUAL
              Shows dispatch bay, courier e-bike, and packaged parcel
              ───────────────────────────────────────────────────────── */}
          <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-neutral-900">
            <img
              src={packedDeliveryImg}
              alt="Packed Delivery Dispatch Bay"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
            />
            {/* Visual Overlays & Highlights */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

            {/* Live Visual HUD Tag */}
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-neutral-200 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-neutral-800">
              <span className="flex items-center gap-1.5 text-orange-400 font-bold">
                <Navigation className="w-3 h-3 text-orange-400" />
                Target: 42 Nova Way
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                ETA 2 Mins
              </span>
            </div>
          </div>

          {/* Bottom Confirmation Footer */}
          <div className="px-3.5 py-2 bg-neutral-950 flex items-center justify-between text-[9px] font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              Ready for Doorstep Delivery
            </span>
            <span className="text-neutral-500">
              Bay #04
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MOVING PACKAGE: (RIGHT -> CENTER -> LEFT)
          Exact same package (#JFY-9082) moving seamlessly
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute z-30 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${packageX}px, ${packageY}px, 0)`,
          willChange: 'transform',
        }}
      >
        <DeliveryPackage
          scale={packageScale}
          statusText={
            progress < 0.22
              ? 'Arriving from Regional Hub ←'
              : isAssignedToRider
              ? 'Packed & Ready with Rider Marco 🛵'
              : isPackedAndConfirmed
              ? 'Packed Delivery Verified ✓'
              : 'Staging in Dispatch Bay'
          }
          badgeColor={isAssignedToRider ? 'emerald' : 'orange'}
        />
      </div>
    </div>
  );
};
