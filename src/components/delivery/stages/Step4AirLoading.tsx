import React from 'react';
import { motion } from 'framer-motion';
import { DeliveryPackage } from '../DeliveryPackage';
import { Plane, CheckCircle2, ArrowLeft, Radio, Gauge, ArrowRight } from 'lucide-react';
import airCargoImg from '@/assets/journey/air-cargo.jpg';

interface Step4Props {
  progress: number; // 0 to 1 for this step
}

export const Step4AirLoading: React.FC<Step4Props> = ({ progress }) => {
  // ─── SCROLL PACING & CHOREOGRAPHY (RIGHT -> CENTER -> LEFT) ───
  // 0.00 → 0.22: Package leaves warehouse dock (RIGHT: +35vw) toward tarmac at CENTER (0vw)
  // 0.22 → 0.72: CENTER STORY MOMENT (50% generous dwell zone)
  //              • Package held fully visible at CENTER (0vw)
  //              • "Air Cargo" message revealed on LEFT side
  //              • Cargo Freighter Flight JF-702 visual active
  //              • Package loaded & cargo hold secured
  // 0.72 → 0.88: Package visibly travels toward LEFT (-35vw) with the air-cargo flight stage
  // 0.88 → 1.00: Breathing space before Stage 5 (Destination Hub) begins

  const isAtCenter = progress >= 0.22 && progress <= 0.72;
  const isLoadedInAirplane = progress >= 0.28;
  const isFlyingLeft = progress > 0.72;

  // Quintic smootherstep for C2-continuous motion (zero jerk, zero velocity at boundaries)
  const smootherstep = (t: number) => {
    const c = Math.max(0, Math.min(1, t));
    return c * c * c * (c * (c * 6 - 15) + 10);
  };

  // Package movement: RIGHT (+35vw) → CENTER (0vw) → LEFT (-35vw)
  let packageX = 0;
  if (progress < 0.22) {
    const t = progress / 0.22;
    packageX = 35 * (1 - smootherstep(t)); // +35vw -> 0vw
  } else if (progress <= 0.72) {
    packageX = 0; // CENTER DWELL
  } else if (progress < 0.90) {
    const t = (progress - 0.72) / 0.18;
    packageX = -35 * smootherstep(t); // 0vw -> -35vw
  } else {
    packageX = -35; // at flight area on left
  }

  // Vertical floating / gentle climb into cargo hold
  const packageY = isAtCenter
    ? Math.sin(progress * Math.PI * 2) * -7
    : isFlyingLeft
    ? -smootherstep((progress - 0.72) / 0.18) * 12
    : Math.sin(progress * Math.PI * 2) * -7;

  const packageScale = isAtCenter ? 1.08 : 0.96;

  // Left-side Air Cargo Panel appearance
  let airCargoOpacity = 0;
  let airCargoX = -30;
  if (progress < 0.14) {
    airCargoOpacity = 0;
    airCargoX = -30;
  } else if (progress < 0.26) {
    const t = (progress - 0.14) / 0.12;
    const s = smootherstep(t);
    airCargoOpacity = s;
    airCargoX = -30 * (1 - s);
  } else if (progress <= 0.80) {
    airCargoOpacity = 1;
    airCargoX = 0;
  } else if (progress < 0.94) {
    const t = (progress - 0.80) / 0.14;
    const s = smootherstep(t);
    airCargoOpacity = Math.max(0, 1 - s * 1.2);
    airCargoX = -s * 20;
  } else {
    airCargoOpacity = 0;
    airCargoX = -20;
  }

  // Right-side Outbound Warehouse origin badge (fades out smoothly as package reaches center)
  const rightOriginOpacity = Math.max(0, 1 - smootherstep(progress * 4.5));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Tarmac and runway ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-l from-black via-slate-950 to-black pointer-events-none" />

      {/* Runway lights line at bottom */}
      <div className="absolute bottom-16 inset-x-0 h-1 flex items-center justify-between px-8 pointer-events-none opacity-60">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i % 2 === 0 ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
            }`}
          />
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. RIGHT SIDE: OUTBOUND FROM WAREHOUSE (Transitional bridge from Step 3)
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
            <div className="flex items-center gap-2 mb-1.5 text-orange-400 font-mono text-xs font-bold">
              <ArrowLeft className="w-4 h-4 animate-pulse" />
              <span>OUTBOUND WAREHOUSE</span>
            </div>
            <p className="text-xs text-neutral-300 font-semibold leading-relaxed">
              Transferring to tarmac conveyor...
            </p>
            <div className="mt-2 text-[10px] font-mono text-neutral-400 flex justify-between border-t border-neutral-800 pt-1.5">
              <span>DESTINATION:</span>
              <span className="text-sky-400 font-bold">TARMAC GATE 12</span>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. LEFT SIDE: AIR CARGO PANEL
          Positioned on the LEFT side of the screen
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-6 sm:left-10 lg:left-14 top-[60%] sm:top-[62%] -translate-y-1/2 z-30 pointer-events-auto max-w-xs sm:max-w-sm lg:max-w-md"
        style={{
          opacity: airCargoOpacity,
          transform: `translate3d(${airCargoX}px, -50%, 0)`,
          willChange: 'transform, opacity',
        }}
      >
        <div className="relative w-[290px] sm:w-[330px] lg:w-[360px] rounded-3xl overflow-hidden border-2 border-sky-500/70 bg-neutral-950/95 shadow-[0_20px_50px_rgba(14,165,233,0.35),0_0_30px_rgba(14,165,233,0.15)] backdrop-blur-2xl">
          {/* Top Info Bar */}
          <div className="px-3.5 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              <span className="text-[9.5px] font-mono font-bold text-sky-400 tracking-wider uppercase">
                Flight JF-702 // Gate 12
              </span>
            </div>
            <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
              #JFY-9082
            </span>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 1: "AIR CARGO" MESSAGE (LEFT SIDE)
              ───────────────────────────────────────────────────────── */}
          <div className="p-3.5 sm:p-4 pb-2.5 text-left border-b border-neutral-800/80 bg-neutral-950/90">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/40 shrink-0 mt-0.5">
                <Plane className="w-5 h-5 -rotate-45 stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-white leading-tight tracking-tight">
                  Air Cargo
                </h3>
                <p className="text-[10.5px] sm:text-[11px] text-neutral-300 mt-0.5 leading-snug">
                  Package loaded into cargo freighter for high-speed cross-region transit.
                </p>
              </div>
            </div>

            {/* Status Tags */}
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold text-sky-300 bg-sky-500/20 border border-sky-500/40 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-2.5 h-2.5 text-sky-400" />
                Hold Secured ✓
              </span>
              <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/40 px-2.5 py-0.5 rounded-full">
                <Radio className="w-2.5 h-2.5 text-indigo-400 animate-pulse" />
                Cross-Region Express
              </span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 2: AIRPLANE / FREIGHTER INFO
              ───────────────────────────────────────────────────────── */}
          <div className="px-3.5 py-2 bg-neutral-900/70 border-b border-neutral-800 flex items-center justify-between text-left">
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                Cargo Freighter JF-702
              </h4>
              <p className="text-[9px] font-mono text-neutral-400">
                Tarmac Bay #02 · Direct Air Corridor
              </p>
            </div>

            <motion.span
              animate={
                isLoadedInAirplane
                  ? {
                      scale: [1, 1.08, 1],
                      boxShadow: [
                        '0 0 0px rgba(14,165,233,0)',
                        '0 0 16px rgba(14,165,233,0.6)',
                        '0 2px 10px rgba(14,165,233,0.3)',
                      ],
                    }
                  : {}
              }
              transition={{ type: 'spring', stiffness: 450, damping: 18 }}
              className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                isLoadedInAirplane
                  ? 'bg-sky-500/25 text-sky-200 border-sky-500/60 shadow-lg shadow-sky-500/30'
                  : 'bg-neutral-800 text-neutral-400 border-neutral-700'
              }`}
            >
              {isLoadedInAirplane ? 'CARGO LOADED ✓' : 'BOARDING RAMP ACTIVE'}
            </motion.span>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 3: RELEVANT FLIGHT / AIRPLANE VISUAL
              Shows cargo freighter on tarmac, scissor lift loader, open cargo bay
              ───────────────────────────────────────────────────────── */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
            <img
              src={airCargoImg}
              alt="Express air cargo airplane loading package on airport tarmac"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

            {/* Flight loading beam / ramp indicator */}
            {isLoadedInAirplane && (
              <motion.div
                initial={{ top: '15%' }}
                animate={{ top: ['15%', '85%', '15%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_14px_rgba(56,189,248,0.95)] pointer-events-none"
              />
            )}

            {/* Flight Telemetry Bar */}
            <div className="absolute bottom-2 inset-x-2 bg-neutral-950/90 border border-neutral-800/80 rounded-xl p-2 backdrop-blur-md flex items-center gap-2 text-left">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-md">
                <Gauge className="w-3.5 h-3.5 text-white animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-white leading-tight truncate">
                  {isLoadedInAirplane ? 'Cargo Bay Locked & Pressurized' : 'Tarmac Loading Ramp Active'}
                </p>
                <p className="text-[9px] text-neutral-400 truncate">
                  {isLoadedInAirplane
                    ? 'Target Altitude: 34,000 FT · Gate 12 Cleared'
                    : 'Awaiting parcel transfer from warehouse dock'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MOVING PACKAGE (RIGHT -> CENTER -> LEFT)
          Visibly travels from warehouse into the airplane cargo bay
          ───────────────────────────────────────────────────────────── */}
      <div
        className="relative z-40 transition-transform duration-75 ease-out flex flex-col items-center"
        style={{
          transform: `translate3d(${packageX}vw, ${packageY}px, 0)`,
          willChange: 'transform',
        }}
      >
        {/* Air Cargo Loading Aura when at Center */}
        {isLoadedInAirplane && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.95, 1.2, 0.95] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 rounded-3xl blur-xl pointer-events-none z-20 bg-gradient-to-r from-sky-500/40 via-indigo-400/50 to-sky-500/40"
          />
        )}

        <DeliveryPackage
          scale={packageScale}
          statusText={
            progress < 0.22
              ? 'Tarmac Transit toward Airplane ←'
              : isFlyingLeft
              ? 'Flight JF-702 Airborne ←'
              : isLoadedInAirplane
              ? 'Air Cargo Hold Secured ✈️'
              : 'Climbing Boarding Ramp...'
          }
          badgeColor={isLoadedInAirplane ? 'emerald' : 'cyan'}
        />

        {/* Confirmation Badge under Package at Center */}
        {isLoadedInAirplane && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className="mt-3 z-40 whitespace-nowrap pointer-events-none"
          >
            <div className="px-3 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md border bg-sky-950/90 border-sky-500/80 text-sky-300 shadow-[0_4px_15px_rgba(14,165,233,0.4)]">
              <CheckCircle2 className="w-3 h-3 text-sky-400" />
              <span>AIR CARGO LOADED · FLIGHT JF-702 READY</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. DIRECTIONAL EXIT HINT (FLIGHT DEPARTURE TO DESTINATION)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-6 sm:left-16 bottom-16 sm:bottom-20 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: progress >= 0.74 ? Math.min(1, (progress - 0.74) * 4) : 0,
        }}
      >
        <div className="flex items-center gap-2 bg-neutral-900/85 border border-sky-500/30 px-3.5 py-2 rounded-2xl backdrop-blur-md shadow-lg">
          <ArrowLeft className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span className="text-[11px] font-mono text-neutral-300 font-bold">
            En Route to Destination Hub
          </span>
        </div>
      </div>
    </div>
  );
};

