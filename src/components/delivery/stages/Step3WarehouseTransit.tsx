import React from 'react';
import { motion } from 'framer-motion';
import { DeliveryPackage } from '../DeliveryPackage';
import {
  Warehouse,
  Truck,
  Activity,
  ArrowRight,
  Scan,
  CheckCircle2,
  Radio,
} from 'lucide-react';
import warehouseImg from '@/assets/journey/warehouse-processing.jpg';
import { useViewportCoordinates } from '@/hooks/useViewportCoordinates';
import { smootherstep } from '@/utils/viewportCoordinates';

interface Step3Props {
  progress: number; // 0 to 1 for this step
}

export const Step3WarehouseTransit: React.FC<Step3Props> = ({ progress }) => {
  const coords = useViewportCoordinates();

  // ─── SCROLL PACING & CHOREOGRAPHY ───
  // 0.00 → 0.22: Package approaches from Courier (LEFT: LEFT_POSITION) to CENTER (0)
  // 0.22 → 0.72: CENTER STORY MOMENT (50% generous dwell zone)
  //              • Package held fully visible at CENTER
  //              • "Processing in Warehouse" revealed on RIGHT side
  //              • "Connect Logistics Warehouse" box & visual active
  //              • Scanning lasers and conveyor telemetry active
  // 0.72 → 0.88: Package continues from CENTER (0) toward RIGHT (RIGHT_POSITION) into the warehouse
  // 0.88 → 1.00: Brief hold & small breathing space before Stage 4 (Air Cargo) begins

  const isAtCenter = progress >= 0.22 && progress <= 0.72;
  const isProcessing = progress >= 0.28;
  const isEnteringWarehouse = progress > 0.72;

  // Package horizontal movement (LEFT -> CENTER -> RIGHT)
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

  // Vertical floating bobbing
  const packageY = Math.sin(progress * Math.PI * 2) * -8;
  const packageScale = isAtCenter ? 1.08 : 0.96;

  // Right-side Warehouse Panel appearance
  let warehouseOpacity = 0;
  let warehouseX = 30;
  if (progress < 0.14) {
    warehouseOpacity = 0;
    warehouseX = 30;
  } else if (progress < 0.26) {
    const t = (progress - 0.14) / 0.12;
    const s = smootherstep(t);
    warehouseOpacity = s;
    warehouseX = 30 * (1 - s);
  } else if (progress <= 0.80) {
    warehouseOpacity = 1;
    warehouseX = 0;
  } else if (progress < 0.94) {
    const t = (progress - 0.80) / 0.14;
    const s = smootherstep(t);
    warehouseOpacity = Math.max(0, 1 - s * 1.2);
    warehouseX = s * 20;
  } else {
    warehouseOpacity = 0;
    warehouseX = 20;
  }

  // Left-side Inbound Courier origin badge (fades out smoothly as package arrives at center)
  const leftOriginOpacity = Math.max(0, 1 - smootherstep(progress * 4.5));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Background road/transit streaks */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-orange-950/20 to-black pointer-events-none" />

      {/* Subtle speed streaks in the background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-44 overflow-hidden pointer-events-none opacity-25">
        <div
          className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_60px,rgba(249,115,22,0.25)_60px,rgba(249,115,22,0.25)_120px)]"
          style={{ transform: `translateX(${-progress * 180}px)` }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. LEFT SIDE: INBOUND FROM COURIER (Transitional bridge from Step 2)
          Fades out quickly as package settles at center
          ───────────────────────────────────────────────────────────── */}
      {leftOriginOpacity > 0.01 && (
        <div
          className="absolute left-6 sm:left-12 lg:left-16 top-[56%] -translate-y-1/2 z-20 pointer-events-none max-w-xs"
          style={{
            opacity: leftOriginOpacity,
            transform: `translate3d(${-progress * 40}px, -50%, 0)`,
          }}
        >
          <div className="bg-neutral-950/90 border border-neutral-800 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-1.5 text-orange-400 font-mono text-xs font-bold">
              <Truck className="w-4 h-4" />
              <span>COURIER INBOUND</span>
            </div>
            <p className="text-xs text-neutral-300 font-semibold leading-relaxed">
              Arriving from courier partner dispatch.
            </p>
            <div className="mt-2 text-[10px] font-mono text-neutral-400 flex justify-between border-t border-neutral-800 pt-1.5">
              <span>DESTINATION:</span>
              <span className="text-emerald-400 font-bold">LOGISTICS HUB #07</span>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. RIGHT SIDE: WAREHOUSE PANEL
          Hierarchy:
            "Processing in Warehouse" (MESSAGE ABOVE)
            ↓
            "Connect Logistics Warehouse" (WAREHOUSE BOX & VISUAL BELOW)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute right-6 sm:right-10 lg:right-14 -translate-y-1/2 z-30 pointer-events-auto max-w-xs sm:max-w-sm lg:max-w-md"
        style={{
          top: coords.CENTER_Y,
          opacity: warehouseOpacity,
          transform: `translate3d(${warehouseX}px, -50%, 0)`,
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
                Dock Bay #14 // Sorting Hub #07
              </span>
            </div>
            <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
              #JFY-9082
            </span>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 1: "PROCESSING IN WAREHOUSE" (MESSAGE ABOVE)
              Positioned on the RIGHT side, ABOVE Connect Logistics Warehouse
              ───────────────────────────────────────────────────────── */}
          <div className="p-3.5 sm:p-4 pb-2.5 text-left border-b border-neutral-800/80 bg-neutral-950/90">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/40 shrink-0 mt-0.5">
                <Warehouse className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-white leading-tight tracking-tight">
                  Processing in Warehouse
                </h3>
                <p className="text-[10.5px] sm:text-[11px] text-neutral-300 mt-0.5 leading-snug">
                  Package received after courier handover and being processed through automated sorting lines.
                </p>
              </div>
            </div>

            {/* Status Tags */}
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold text-orange-300 bg-orange-500/20 border border-orange-500/40 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-2.5 h-2.5 text-orange-400" />
                Inbound Scanned ✓
              </span>
              <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                <Scan className="w-2.5 h-2.5 text-emerald-400" />
                Optical Sort Active
              </span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 2: "CONNECT LOGISTICS WAREHOUSE" (BELOW MESSAGE)
              ───────────────────────────────────────────────────────── */}
          <div className="px-3.5 py-2 bg-neutral-900/70 border-b border-neutral-800 flex items-center justify-between text-left">
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                Connect Logistics Warehouse
              </h4>
              <p className="text-[9px] font-mono text-neutral-400">
                Metro Sortation Center · Conveyor Lane 7
              </p>
            </div>

            <motion.span
              animate={
                isProcessing
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
                isProcessing
                  ? 'bg-orange-500/25 text-orange-300 border-orange-500/60 shadow-lg shadow-orange-500/30'
                  : 'bg-neutral-800 text-neutral-400 border-neutral-700'
              }`}
            >
              {isProcessing ? 'INBOUND SORTING ✓' : 'STANDBY'}
            </motion.span>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECTION 3: RELEVANT WAREHOUSE / LOGISTICS VISUAL
              Shows automated sortation conveyor, laser scanning, and packages
              ───────────────────────────────────────────────────────── */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
            <img
              src={warehouseImg}
              alt="Connect Logistics Warehouse package scanning and automated sortation lines"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

            {/* Laser scanning beam during processing */}
            {isProcessing && (
              <motion.div
                initial={{ top: '15%' }}
                animate={{ top: ['15%', '85%', '15%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_14px_rgba(239,68,68,0.95)] pointer-events-none"
              />
            )}

            {/* Conveyor / Sorter Telemetry Bar */}
            <div className="absolute bottom-2 inset-x-2 bg-neutral-950/90 border border-neutral-800/80 rounded-xl p-2 backdrop-blur-md flex items-center gap-2 text-left">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-md">
                <Activity className="w-3.5 h-3.5 text-white animate-spin" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-white leading-tight truncate">
                  {isProcessing ? 'Automated High-Speed Sorter Active' : 'Dock Bay Ready'}
                </p>
                <p className="text-[9px] text-neutral-400 truncate">
                  {isProcessing
                    ? 'Optical sort verified · Conveyor Lane 7 staged'
                    : 'Awaiting parcel from courier dispatch'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MOVING PACKAGE (COURIER [LEFT] -> CENTER -> RIGHT / WAREHOUSE)
          Visibly travels into the warehouse without sudden appearance/disappearance
          ───────────────────────────────────────────────────────────── */}
      <div
        className="relative z-40 transition-transform duration-75 ease-out flex flex-col items-center"
        style={{
          transform: `translate3d(${packageX}px, ${packageY}px, 0)`,
          willChange: 'transform',
        }}
      >
        {/* Optical Scanning / Processing Aura when at Center */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.95, 1.2, 0.95] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 rounded-3xl blur-xl pointer-events-none z-20 bg-gradient-to-r from-orange-500/40 via-amber-400/50 to-orange-500/40"
          />
        )}

        <DeliveryPackage
          scale={packageScale}
          statusText={
            progress < 0.22
              ? 'Arriving from Courier ←'
              : isEnteringWarehouse
              ? 'Entering Logistics Warehouse →'
              : isProcessing
              ? 'Processing in Warehouse 🏢'
              : 'Inbound Docking...'
          }
          badgeColor={isProcessing ? 'orange' : 'cyan'}
        />

        {/* Confirmation Badge under Package at Center */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className="mt-3 z-40 whitespace-nowrap pointer-events-none"
          >
            <div className="px-3 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md border bg-orange-950/90 border-orange-500/80 text-orange-300 shadow-[0_4px_15px_rgba(249,115,22,0.4)]">
              <CheckCircle2 className="w-3 h-3 text-orange-400" />
              <span>PROCESSING IN WAREHOUSE · SORTING ACTIVE</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. DIRECTIONAL EXIT HINT TOWARD WAREHOUSE / AIR CARGO
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute right-6 sm:right-16 bottom-16 sm:bottom-20 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: progress >= 0.74 ? Math.min(1, (progress - 0.74) * 4) : 0,
        }}
      >
        <div className="flex items-center gap-2 bg-neutral-900/85 border border-orange-500/30 px-3.5 py-2 rounded-2xl backdrop-blur-md shadow-lg">
          <span className="text-[11px] font-mono text-neutral-300 font-bold">
            Air Cargo Departure Bay
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

