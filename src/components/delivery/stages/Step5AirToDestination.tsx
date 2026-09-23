import React from 'react';
import { motion } from 'framer-motion';
import { DeliveryPackage } from '../DeliveryPackage';
import { Building2, MapPin, CheckCircle2, Plane, ArrowRight, ArrowLeft, Radio, Activity } from 'lucide-react';
import regionalHubImg from '@/assets/journey/regional-hub.jpg';
import { useViewportCoordinates } from '@/hooks/useViewportCoordinates';
import { smootherstep } from '@/utils/viewportCoordinates';

interface Step5Props {
  progress: number; // 0 to 1 for this step
}

export const Step5AirToDestination: React.FC<Step5Props> = ({ progress }) => {
  const coords = useViewportCoordinates();

  // ─── SCROLL PACING & CHOREOGRAPHY (LEFT -> CENTER -> RIGHT) ───
  // 0.00 → 0.22: Package arrives from Flight touchdown (LEFT: LEFT_POSITION) toward CENTER (0)
  // 0.22 → 0.72: CENTER STORY MOMENT (50% generous dwell zone)
  //              • Package held fully visible at CENTER (0)
  //              • "Arrived at Warehouse" message revealed on RIGHT side
  //              • "Regional Hub" box and visual active directly below it
  //              • Arrival verified & sorting staged
  // 0.72 → 0.88: Package visibly continues from CENTER (0) toward RIGHT (RIGHT_POSITION) into the Regional Hub
  // 0.88 → 1.00: Breathing space before Stage 6 (Local Courier) begins

  const isAtCenter = progress >= 0.22 && progress <= 0.72;
  const isLandedAtDestination = progress >= 0.28;
  const isEnteringHub = progress > 0.72;

  // Package horizontal movement: LEFT (LEFT_POSITION) → CENTER (0) → RIGHT (RIGHT_POSITION)
  let packageX = coords.CENTER_POSITION;
  if (progress < 0.22) {
    const t = progress / 0.22;
    packageX = coords.LEFT_POSITION * (1 - smootherstep(t));
  } else if (progress <= 0.72) {
    packageX = coords.CENTER_POSITION;
  } else if (progress < 0.90) {
    const t = (progress - 0.72) / 0.18;
    packageX = coords.RIGHT_POSITION * smootherstep(t);
  } else {
    packageX = coords.RIGHT_POSITION;
  }

  // Vertical floating / descent touchdown
  const packageY = progress < 0.22
    ? Math.sin((progress / 0.22) * Math.PI) * -16
    : Math.sin(progress * Math.PI * 2) * -7;

  const packageScale = isAtCenter ? 1.08 : 0.96;

  // Right-side Regional Hub Panel appearance
  let hubOpacity = 0;
  let hubX = 30;
  if (progress < 0.14) {
    hubOpacity = 0;
    hubX = 30;
  } else if (progress < 0.26) {
    const t = (progress - 0.14) / 0.12;
    const s = smootherstep(t);
    hubOpacity = s;
    hubX = 30 * (1 - s);
  } else if (progress <= 0.80) {
    hubOpacity = 1;
    hubX = 0;
  } else if (progress < 0.94) {
    const t = (progress - 0.80) / 0.14;
    const s = smootherstep(t);
    hubOpacity = Math.max(0, 1 - s * 1.2);
    hubX = s * 20;
  } else {
    hubOpacity = 0;
    hubX = 20;
  }

  // Left-side Flight Inbound origin badge (fades out smoothly as package settles at center)
  const leftOriginOpacity = Math.max(0, 1 - smootherstep(progress * 4.5));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Night Sky / Clouds gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950/40 to-black pointer-events-none" />

      {/* Subtle cloud mist layers */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(147,197,253,0.15)_0%,transparent_60%)]"
          style={{ transform: `translateX(${-progress * 100}px)` }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(249,115,22,0.12)_0%,transparent_60%)]"
          style={{ transform: `translateX(${progress * 80}px)` }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. LEFT SIDE: INBOUND FROM FLIGHT (Transitional bridge from Step 4)
          Fades out quickly as package arrives at center
          ───────────────────────────────────────────────────────────── */}
      {leftOriginOpacity > 0.01 && (
        <div
          className="absolute left-6 sm:left-12 lg:left-16 top-[56%] -translate-y-1/2 z-20 pointer-events-none max-w-xs"
          style={{
            opacity: leftOriginOpacity,
            transform: `translate3d(${-progress * 40}px, -50%, 0)`,
          }}
        >
          <div className="bg-neutral-950/90 border border-neutral-800 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl text-left">
            <div className="flex items-center gap-2 mb-1.5 text-sky-400 font-mono text-xs font-bold">
              <Plane className="w-4 h-4 -rotate-45" />
              <span>FLIGHT INBOUND</span>
            </div>
            <p className="text-xs text-neutral-300 font-semibold leading-relaxed">
              Flight JF-702 touchdown complete.
            </p>
            <div className="mt-2 text-[10px] font-mono text-neutral-400 flex justify-between border-t border-neutral-800 pt-1.5">
              <span>DESTINATION:</span>
              <span className="text-emerald-400 font-bold">REGIONAL HUB #08</span>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. RIGHT SIDE: ARRIVED AT WAREHOUSE / REGIONAL HUB PANEL
          Hierarchy:
            "Arrived at Warehouse" (MESSAGE ABOVE)
            ↓
            "Regional Hub" (BOX & VISUAL BELOW)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute right-6 sm:right-10 lg:right-14 -translate-y-1/2 z-30 pointer-events-auto max-w-xs sm:max-w-sm lg:max-w-md"
        style={{
          top: coords.CENTER_Y,
          opacity: hubOpacity,
          transform: `translate3d(${hubX}px, -50%, 0)`,
          willChange: 'transform, opacity',
        }}
      >
        <div className="relative w-[290px] sm:w-[330px] lg:w-[360px] rounded-3xl overflow-hidden border-2 border-emerald-500/70 bg-neutral-950/95 shadow-[0_20px_50px_rgba(16,185,129,0.35),0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-2xl">
          {/* Top Info Bar */}
          <div className="px-3.5 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[9.5px] font-mono font-bold text-emerald-400 tracking-wider uppercase">
                Arrival Gate // Bay #08
              </span>
            </div>
            <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
              #JFY-9082
            </span>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 1: "ARRIVED AT WAREHOUSE" (MESSAGE ABOVE)
              ───────────────────────────────────────────────────────── */}
          <div className="p-3.5 sm:p-4 pb-2.5 text-left border-b border-neutral-800/80 bg-neutral-950/90">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 shrink-0 mt-0.5">
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-white leading-tight tracking-tight">
                  Arrived at Warehouse
                </h3>
                <p className="text-[10.5px] sm:text-[11px] text-neutral-300 mt-0.5 leading-snug">
                  Package has completed its flight and arrived at the regional distribution center.
                </p>
              </div>
            </div>

            {/* Status Tags */}
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                Flight Completed ✓
              </span>
              <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold text-teal-300 bg-teal-500/20 border border-teal-500/40 px-2.5 py-0.5 rounded-full">
                <MapPin className="w-2.5 h-2.5 text-teal-400" />
                Inbound Scanned
              </span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 2: "REGIONAL HUB" (BELOW MESSAGE)
              ───────────────────────────────────────────────────────── */}
          <div className="px-3.5 py-2 bg-neutral-900/70 border-b border-neutral-800 flex items-center justify-between text-left">
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                Regional Hub
              </h4>
              <p className="text-[9px] font-mono text-neutral-400">
                Metro Distribution Terminal · Bay #08
              </p>
            </div>

            <motion.span
              animate={
                isLandedAtDestination
                  ? {
                      scale: [1, 1.08, 1],
                      boxShadow: [
                        '0 0 0px rgba(16,185,129,0)',
                        '0 0 16px rgba(16,185,129,0.6)',
                        '0 2px 10px rgba(16,185,129,0.3)',
                      ],
                    }
                  : {}
              }
              transition={{ type: 'spring', stiffness: 450, damping: 18 }}
              className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                isLandedAtDestination
                  ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/60 shadow-lg shadow-emerald-500/30'
                  : 'bg-neutral-800 text-neutral-400 border-neutral-700'
              }`}
            >
              {isLandedAtDestination ? 'ARRIVED AT HUB ✓' : 'APPROACHING RUNWAY'}
            </motion.span>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 3: RELEVANT REGIONAL HUB VISUAL
              Shows regional warehouse interior, glowing conveyors, delivery staging
              ───────────────────────────────────────────────────────── */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
            <img
              src={regionalHubImg}
              alt="Destination Regional Hub distribution warehouse with automated sorting lines"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

            {/* Inbound scanning laser line */}
            {isLandedAtDestination && (
              <motion.div
                initial={{ top: '15%' }}
                animate={{ top: ['15%', '85%', '15%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_14px_rgba(52,211,153,0.95)] pointer-events-none"
              />
            )}

            {/* Regional Hub Telemetry Bar */}
            <div className="absolute bottom-2 inset-x-2 bg-neutral-950/90 border border-neutral-800/80 rounded-xl p-2 backdrop-blur-md flex items-center gap-2 text-left">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-md">
                <Activity className="w-3.5 h-3.5 text-white animate-spin" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-white leading-tight truncate">
                  {isLandedAtDestination ? 'Unloading Bay #08 Active' : 'Touchdown Clearance Pending'}
                </p>
                <p className="text-[9px] text-neutral-400 truncate">
                  {isLandedAtDestination
                    ? 'Staged for Final-Mile Courier Dispatch'
                    : 'Awaiting cargo transfer from runway'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MOVING PACKAGE (LEFT -> CENTER -> RIGHT)
          Visibly arrives from flight and enters the Regional Hub
          ───────────────────────────────────────────────────────────── */}
      <div
        className="relative z-40 transition-transform duration-75 ease-out flex flex-col items-center"
        style={{
          transform: `translate3d(${packageX}px, ${packageY}px, 0)`,
          willChange: 'transform',
        }}
      >
        {/* Arrival Verification Aura when at Center */}
        {isLandedAtDestination && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.95, 1.2, 0.95] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 rounded-3xl blur-xl pointer-events-none z-20 bg-gradient-to-r from-emerald-500/40 via-teal-400/50 to-emerald-500/40"
          />
        )}

        <DeliveryPackage
          scale={packageScale}
          statusText={
            progress < 0.22
              ? 'Arriving from Flight Touchdown ←'
              : isEnteringHub
              ? 'Entering Regional Hub →'
              : isLandedAtDestination
              ? 'Arrived at Warehouse 🏁'
              : 'Flight JF-702 Touchdown'
          }
          badgeColor={isLandedAtDestination ? 'emerald' : 'cyan'}
        />

        {/* Confirmation Badge under Package at Center */}
        {isLandedAtDestination && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className="mt-3 z-40 whitespace-nowrap pointer-events-none"
          >
            <div className="px-3 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md border bg-emerald-950/90 border-emerald-500/80 text-emerald-300 shadow-[0_4px_15px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>ARRIVED AT WAREHOUSE · REGIONAL HUB VERIFIED</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. DIRECTIONAL EXIT HINT (TOWARD LOCAL COURIER DISPATCH)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute right-6 sm:right-16 bottom-16 sm:bottom-20 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: progress >= 0.74 ? Math.min(1, (progress - 0.74) * 4) : 0,
        }}
      >
        <div className="flex items-center gap-2 bg-neutral-900/85 border border-emerald-500/30 px-3.5 py-2 rounded-2xl backdrop-blur-md shadow-lg">
          <span className="text-[11px] font-mono text-neutral-300 font-bold">
            Local Courier Dispatch
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

