import React from 'react';
import { motion } from 'framer-motion';
import { DeliveryPackage } from '../DeliveryPackage';
import {
  CheckCircle2,
  Navigation,
  ShieldCheck,
  Radio,
  ArrowRightLeft,
  ArrowLeft,
  ArrowRight,
  Truck,
} from 'lucide-react';
import courierHandoverImg from '@/assets/journey/courier-handover.jpg';
import courierPartnerImg from '@/assets/journey/courier-partner.jpg';
import astronautCourierImg from '@/assets/astronaut/astronaut-courier-partner.jpg';
import { useViewportCoordinates } from '@/hooks/useViewportCoordinates';
import { smootherstep } from '@/utils/viewportCoordinates';

interface Step2Props {
  progress: number; // 0 to 1 for this step
}

export const Step2CourierHandover: React.FC<Step2Props> = ({ progress }) => {
  const coords = useViewportCoordinates();

  // Step 2 contains two seamlessly connected scenes:
  //
  // ─── SCENE 1: 0:13 COURIER TRANSFER (progress 0.00 → 0.48) ───
  // • Message on LEFT: "Courier Transfer Book" (positioned safely below top HUD)
  // • Package moves directly RIGHT → LEFT, with the handover on the left side
  //
  // ─── SCENE 2: 0:17 COURIER PARTNER & ASTRONAUT COURIER (progress 0.48 → 1.00) ───
  // • Courier Partner appears on RIGHT (existing character position kept, "Leo" removed)
  // • Package approaches from LEFT to CENTER
  // • Astronaut courier man is visible alongside package (communicates Courier Partner / Delivery Person)
  // • Courier interaction & shipment accepted (subtle interaction, scan beam, confirmation aura)
  // • "Courier Partner" label is visible on RIGHT
  // • Brief hold / generous dwell zone before continuing to next stage

  const isPhase1 = progress < 0.48;
  const isPhase2 = progress >= 0.48;

  // ─────────────────────────────────────────────────────────────
  // PHASE 1 VARIABLES (0:13 COURIER TRANSFER)
  // ─────────────────────────────────────────────────────────────
  const p1 = Math.min(Math.max(progress / 0.48, 0), 1);
  const isP1AtCenter = p1 >= 0.68 && p1 <= 0.88;
  const isP1HandoverComplete = p1 >= 0.36;
  const showTransferMessage = isPhase1 && p1 >= 0.28 && p1 <= 0.88;
  const isP1Scanning = isPhase1 && p1 >= 0.18 && p1 < 0.42;

  let p1PackageX = coords.CENTER_POSITION;
  if (p1 < 0.20) {
    const t = p1 / 0.20;
    p1PackageX = coords.RIGHT_POSITION * (1 - smootherstep(t));
  } else if (p1 <= 0.88) {
    const t = (p1 - 0.20) / 0.68;
    p1PackageX = coords.RIGHT_POSITION + (coords.LEFT_POSITION - coords.RIGHT_POSITION) * smootherstep(t);
  } else {
    p1PackageX = coords.LEFT_POSITION;
  }

  let p1StationOpacity = 1;
  let p1StationX = coords.LEFT_POSITION;
  if (p1 < 0.14) {
    const t = p1 / 0.14;
    const s = smootherstep(t);
    p1StationOpacity = s;
    p1StationX = coords.LEFT_POSITION + (1 - s) * 20;
  } else if (p1 <= 0.72) {
    p1StationOpacity = 1;
    p1StationX = coords.LEFT_POSITION;
  } else if (p1 < 0.86) {
    const t = (p1 - 0.72) / 0.14;
    const s = smootherstep(t);
    p1StationOpacity = Math.max(0, 1 - s * 1.3);
    p1StationX = coords.LEFT_POSITION - s * 15;
  } else {
    p1StationOpacity = 0;
    p1StationX = coords.LEFT_POSITION - 15;
  }

  // ─────────────────────────────────────────────────────────────
  // PHASE 2 VARIABLES (0:17 COURIER PARTNER & ASTRONAUT COURIER)
  // ─────────────────────────────────────────────────────────────
  const p2 = Math.min(Math.max((progress - 0.48) / 0.52, 0), 1);
  const isP2AtCenter = p2 >= 0.22 && p2 <= 0.76;
  const isAcceptedByCourierPartner = p2 >= 0.36;

  // Package X position: LEFT (LEFT_POSITION) → CENTER (0) → smoothly exits LEFT (LEFT_POSITION) toward Warehouse Transit
  let p2PackageX = coords.CENTER_POSITION;
  if (p2 < 0.22) {
    const t = p2 / 0.22;
    p2PackageX = coords.LEFT_POSITION * (1 - smootherstep(t));
  } else if (p2 <= 0.74) {
    p2PackageX = coords.CENTER_POSITION;
  } else if (p2 < 0.92) {
    const t = (p2 - 0.74) / 0.18;
    p2PackageX = coords.LEFT_POSITION * smootherstep(t);
  } else {
    p2PackageX = coords.LEFT_POSITION;
  }

  // Existing Courier Partner panel on RIGHT side (kept in position, "Leo" removed)
  let courierPartnerOpacity = 0;
  let courierPartnerX = 30;
  if (p2 < 0.14) {
    const t = p2 / 0.14;
    const s = smootherstep(t);
    courierPartnerOpacity = s;
    courierPartnerX = 30 * (1 - s);
  } else if (p2 <= 0.78) {
    courierPartnerOpacity = 1;
    courierPartnerX = 0;
  } else if (p2 < 0.92) {
    const t = (p2 - 0.78) / 0.14;
    const s = smootherstep(t);
    courierPartnerOpacity = Math.max(0, 1 - s * 1.2);
    courierPartnerX = s * 20;
  } else {
    courierPartnerOpacity = 0;
    courierPartnerX = 20;
  }

  // Astronaut Courier Man (positioned naturally on left-center, accompanying package to handover)
  let astronautCourierOpacity = 0;
  let astronautCourierX = -25;
  if (p2 >= 0.18 && p2 < 0.32) {
    const t = (p2 - 0.18) / 0.14;
    const s = smootherstep(t);
    astronautCourierOpacity = s;
    astronautCourierX = -25 + s * 25;
  } else if (p2 >= 0.32 && p2 <= 0.76) {
    astronautCourierOpacity = 1;
    astronautCourierX = 0;
  } else if (p2 > 0.76 && p2 < 0.90) {
    const t = (p2 - 0.76) / 0.14;
    const s = smootherstep(t);
    astronautCourierOpacity = Math.max(0, 1 - s * 1.3);
    astronautCourierX = -s * 20;
  } else {
    astronautCourierOpacity = 0;
  }

  // Unified Package parameters
  const currentPackageX = isPhase1 ? p1PackageX : p2PackageX;
  const packageY = Math.sin(progress * Math.PI * 2) * -7;
  const currentPackageScale =
    (isPhase1 && isP1AtCenter) || (isPhase2 && isP2AtCenter) ? 1.08 : 0.98;
  const currentRotation =
    isPhase1
      ? isP1HandoverComplete
        ? Math.sin(p1 * Math.PI * 2) * -1.2
        : 0
      : isAcceptedByCourierPartner
      ? Math.sin(p2 * Math.PI * 2) * 1.5
      : 0;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Ambient courier bay glow */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/10 via-black to-black pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          1. 0:13 MESSAGE: "COURIER TRANSFER BOOK" (LEFT SIDE)
          ───────────────────────────────────────────────────────────── */}
      {isPhase1 && (
        <div
          className="absolute top-48 sm:top-52 left-6 sm:left-12 lg:left-16 z-50 pointer-events-none max-w-xs sm:max-w-sm"
          style={{
            opacity: showTransferMessage
              ? p1 < 0.76
                ? 1
                : Math.max(0, 1 - (p1 - 0.76) / 0.12)
              : 0,
            transform: `translate3d(${showTransferMessage ? 0 : -30}px, 0, 0) scale(${showTransferMessage ? 1 : 0.92})`,
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
                  Logistics Handover // Dock 02
                </span>
              </div>
              <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
                #JFY-9082
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 shrink-0 mt-0.5">
                <ArrowRightLeft className="w-5 h-5 stroke-[2.5]" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-black text-white leading-tight tracking-tight">
                  Courier Transfer Book
                </h3>
                <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
                  The package is now being transferred to the courier partner.
                </p>

                <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Custody Verified ✓
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                    <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                    Fleet #CF-408
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. 0:13 VISUAL: HANDOVER DOCK STATION (CENTER)
          ───────────────────────────────────────────────────────────── */}
      {isPhase1 && (
        <div
          className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-7 lg:gap-8 max-w-5xl mx-auto px-4 pointer-events-auto"
          style={{
            transform: `translate3d(${p1StationX}px, 0, 0)`,
            opacity: p1StationOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <div className="relative w-[270px] sm:w-[310px] lg:w-[340px] rounded-3xl overflow-hidden border border-neutral-800/90 bg-neutral-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            <div className="px-3.5 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono font-bold text-neutral-300 tracking-wider">
                  HANDOVER DOCK // COURIER BAY
                </span>
              </div>
              <span
                className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border transition-colors duration-300 ${
                  isP1HandoverComplete
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30 animate-pulse'
                }`}
              >
                {isP1HandoverComplete ? 'TRANSFERRED ✓' : 'SCANNING MANIFEST...'}
              </span>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
              <img
                src={courierHandoverImg}
                alt="Courier receiving and scanning the package at the transfer dock"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

              {isP1Scanning && (
                <motion.div
                  initial={{ top: '15%' }}
                  animate={{ top: ['15%', '85%', '15%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.9)] pointer-events-none"
                />
              )}

              <div className="absolute bottom-2.5 inset-x-2.5 bg-neutral-950/90 border border-neutral-800/80 rounded-xl p-2 backdrop-blur-md flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md">
                  <Navigation className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[11px] font-bold text-white leading-tight truncate">
                    {isP1HandoverComplete ? 'Custody Transferred to Courier' : 'Scanning Parcel Barcode...'}
                  </p>
                  <p className="text-[9.5px] text-neutral-400 truncate">
                    {isP1HandoverComplete
                      ? 'Courier Partner verified · Transfer book recorded'
                      : 'Optical target verified · #JFY-9082'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. 0:17 ASTRONAUT COURIER MAN (LEFT-CENTER // BESIDE PACKAGE)
          Positioned naturally in relation to existing courier partner & package
          ───────────────────────────────────────────────────────────── */}
      {isPhase2 && (
        <div
          className="absolute left-6 sm:left-12 lg:left-24 -translate-y-1/2 z-20 pointer-events-auto"
          style={{
            top: coords.CENTER_Y,
            opacity: astronautCourierOpacity,
            transform: `translate3d(${astronautCourierX}px, -50%, 0)`,
            willChange: 'transform, opacity',
          }}
        >
          <div className="relative w-[210px] sm:w-[240px] lg:w-[260px] rounded-3xl overflow-hidden border border-orange-500/50 bg-neutral-950/95 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            {/* Header */}
            <div className="px-3 py-1.5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[9.5px] font-mono font-bold text-neutral-300 tracking-wider">
                  ASTRONAUT COURIER
                </span>
              </div>
              <span className="text-[8.5px] font-mono font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-full">
                DISPATCH
              </span>
            </div>

            {/* Astronaut Courier Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
              <img
                src={astronautCourierImg}
                alt="Astronaut Courier delivery person participating in package handover"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10 pointer-events-none" />

              <div className="absolute bottom-2 inset-x-2 bg-neutral-950/90 border border-neutral-800/80 rounded-xl p-1.5 backdrop-blur-md flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  👨‍🚀
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[10px] font-bold text-white leading-tight truncate">
                    Astronaut Courier
                  </p>
                  <p className="text-[8.5px] text-neutral-400 truncate">
                    Handing over to Courier Partner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. 0:17 COURIER PARTNER PANEL (RIGHT SIDE - "LEO" REMOVED, "COURIER PARTNER" ONLY)
          ───────────────────────────────────────────────────────────── */}
      {isPhase2 && (
        <div
          className="absolute right-6 sm:right-10 lg:right-14 -translate-y-1/2 z-30 pointer-events-auto max-w-xs sm:max-w-sm"
          style={{
            top: coords.CENTER_Y,
            opacity: courierPartnerOpacity,
            transform: `translate3d(${courierPartnerX}px, -50%, 0)`,
            willChange: 'transform, opacity',
          }}
        >
          <div className="relative w-[280px] sm:w-[320px] lg:w-[340px] rounded-3xl overflow-hidden border-2 border-orange-500/70 bg-neutral-950/95 shadow-[0_20px_50px_rgba(249,115,22,0.35),0_0_30px_rgba(249,115,22,0.15)] backdrop-blur-2xl">
            {/* Top Bar */}
            <div className="px-3.5 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>
                <span className="text-[9.5px] font-mono font-bold text-orange-400 tracking-wider uppercase">
                  Courier Bay // Fleet #CF-408
                </span>
              </div>
              <span
                className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border transition-colors duration-300 ${
                  isAcceptedByCourierPartner
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : 'text-orange-400 bg-orange-500/10 border-orange-500/30 animate-pulse'
                }`}
              >
                {isAcceptedByCourierPartner ? 'ACCEPTED ✓' : 'AWAITING HANDOVER'}
              </span>
            </div>

            {/* 1. "COURIER PARTNER" MESSAGE TEXT ("LEO" COMPLETELY REMOVED) */}
            <div className="p-3.5 pb-2.5 text-left border-b border-neutral-800/80 bg-neutral-950/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/40 shrink-0">
                  <Truck className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight tracking-tight">
                    Courier Partner
                  </h3>
                  <p className="text-[10.5px] text-neutral-300 mt-0.5 leading-snug">
                    Package received and accepted by our dedicated courier partner.
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold text-orange-300 bg-orange-500/20 border border-orange-500/40 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-2.5 h-2.5 text-orange-400" />
                  Package Accepted ✓
                </span>
                <span className="inline-flex items-center gap-1 text-[8.5px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                  Courier Partner
                </span>
              </div>
            </div>

            {/* 2. RELEVANT COURIER PARTNER VISUAL (CHARACTER POSITION & APPEARANCE KEPT) */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
              <img
                src={courierPartnerImg}
                alt="Courier Partner receiving customer parcel at dispatch dock"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

              {/* Laser scanning beam during acceptance */}
              {isAcceptedByCourierPartner && (
                <motion.div
                  initial={{ top: '20%' }}
                  animate={{ top: ['20%', '80%', '20%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_14px_rgba(249,115,22,0.9)] pointer-events-none"
                />
              )}

              {/* Status bar over courier image ("Leo" removed) */}
              <div className="absolute bottom-2 inset-x-2 bg-neutral-950/90 border border-neutral-800/80 rounded-xl p-2 backdrop-blur-md flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-md">
                  <Navigation className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[10px] font-bold text-white leading-tight truncate">
                    {isAcceptedByCourierPartner
                      ? 'Courier Partner Accepted Parcel'
                      : 'Courier Partner Ready'}
                  </p>
                  <p className="text-[9px] text-neutral-400 truncate">
                    {isAcceptedByCourierPartner
                      ? 'Loaded onto express transit fleet #CF-408'
                      : 'Awaiting package handover at center'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. PHYSICAL PACKAGE (SHARED CONTINUOUS SCROLL)
          • In Phase 1 (0:13): RIGHT → CENTER → LEFT
          • In Phase 2 (0:17): LEFT → CENTER (focus) → RIGHT (accepted)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="relative z-40 transition-transform duration-75 ease-out flex flex-col items-center"
        style={{
          transform: `translate3d(${currentPackageX}px, ${packageY}px, 0)`,
          willChange: 'transform',
        }}
      >
        {/* Custody / Acceptance Confirmation Flash */}
        {((isPhase1 && isP1HandoverComplete) || (isPhase2 && isAcceptedByCourierPartner)) && (
          <motion.div
            key={isPhase1 ? 'p1-flash' : 'p2-flash'}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.75, 0], scale: [0.8, 1.25, 1.4] }}
            transition={{ duration: 0.6 }}
            className={`absolute -inset-4 rounded-3xl blur-xl pointer-events-none z-40 ${
              isPhase1
                ? 'bg-gradient-to-r from-cyan-500/40 via-emerald-400/50 to-teal-500/40'
                : 'bg-gradient-to-r from-orange-500/40 via-amber-400/50 to-orange-500/40'
            }`}
          />
        )}

        <DeliveryPackage
          scale={currentPackageScale}
          rotation={currentRotation}
          statusText={
            isPhase1
              ? p1 < 0.20
                ? 'Approaching Courier Handover ←'
                : isP1HandoverComplete
                ? p1 < 0.72
                  ? 'Courier Transfer Booked ✓'
                  : 'Proceeding to Courier Partner ←'
                : 'Scanning Barcode & Custody 🔍'
              : p2 < 0.22
              ? 'Approaching Courier Partner →'
              : isAcceptedByCourierPartner
              ? p2 < 0.74
                ? 'Courier Partner Accepted ✓'
                : 'Departing to Sorting Terminal →'
              : 'Courier Partner Receiving... 📦'
          }
          badgeColor={
            isPhase1
              ? isP1HandoverComplete
                ? 'emerald'
                : 'cyan'
              : isAcceptedByCourierPartner
              ? 'orange'
              : 'cyan'
          }
        />

        {/* Small Confirmation Badge under package ("Leo" removed) */}
        {((isPhase1 && isP1HandoverComplete) || (isPhase2 && isAcceptedByCourierPartner)) && (
          <motion.div
            key={isPhase1 ? 'badge-p1' : 'badge-p2'}
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className="mt-3 z-40 whitespace-nowrap pointer-events-none"
          >
            <div
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md border ${
                isPhase1
                  ? 'bg-emerald-950/90 border-emerald-500/80 text-emerald-300 shadow-[0_4px_15px_rgba(16,185,129,0.4)]'
                  : 'bg-orange-950/90 border-orange-500/80 text-orange-300 shadow-[0_4px_15px_rgba(249,115,22,0.4)]'
              }`}
            >
              <CheckCircle2
                className={`w-3 h-3 ${isPhase1 ? 'text-emerald-400' : 'text-orange-400'}`}
              />
              <span>
                {isPhase1
                  ? 'COURIER TRANSFER BOOKED · CUSTODY CONFIRMED'
                  : 'COURIER PARTNER ACCEPTED · EN ROUTE TO HUB'}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Directional Exit Hints */}
      {isPhase1 && (
        <div
          className="absolute left-6 sm:left-16 bottom-16 sm:bottom-20 z-20 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: p1 >= 0.74 ? Math.min(1, (p1 - 0.74) * 4) : 0,
          }}
        >
          <div className="flex items-center gap-2 bg-neutral-900/85 border border-emerald-500/30 px-3.5 py-2 rounded-2xl backdrop-blur-md shadow-lg">
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-neutral-300 font-bold">
              Courier Partner Dock
            </span>
          </div>
        </div>
      )}

      {isPhase2 && (
        <div
          className="absolute right-6 sm:right-16 bottom-16 sm:bottom-20 z-20 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: p2 >= 0.74 ? Math.min(1, (p2 - 0.74) * 4) : 0,
          }}
        >
          <div className="flex items-center gap-2 bg-neutral-900/85 border border-orange-500/30 px-3.5 py-2 rounded-2xl backdrop-blur-md shadow-lg">
            <span className="text-[11px] font-mono text-neutral-300 font-bold">
              Logistics Sorting Hub
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};
