import React from 'react';
import { motion } from 'framer-motion';
import { DeliveryPackage } from '../DeliveryPackage';
import {
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Bike,
  UserCheck,
} from 'lucide-react';
import astronautCourierPartnerImg from '@/assets/astronaut/astronaut-courier-partner.jpg';
import { useViewportCoordinates } from '@/hooks/useViewportCoordinates';
import { smootherstep } from '@/utils/viewportCoordinates';

interface Step7Props {
  progress: number; // 0 to 1 for this step
}

export const Step7CustomerDelivered: React.FC<Step7Props> = ({ progress }) => {
  const coords = useViewportCoordinates();

  // ─── SCROLL PACING & CHOREOGRAPHY (LEFT -> CENTER -> RIGHT) ───
  // 0.00 → 0.25: Package arrives from LEFT (LEFT_POSITION) toward CENTER (0)
  //              Delivery person becomes visible on RIGHT side.
  //              Status: "Out for Delivery"
  // 0.25 → 0.60: CENTER STORY MOMENT (35% generous dwell zone)
  //              Package held fully visible at CENTER (0).
  //              Status: "Arriving at your doorstep"
  //              Delivery interaction staged.
  // 0.60 → 0.75: Package continues from CENTER (0) toward RIGHT (customer handover).
  //              Delivery person moves to meet the package in handover motion.
  //              Interaction: Delivery Person → Package → Customer.
  // 0.75 → 1.00: FINAL "DELIVERED ✓" MOMENT & BREATHING ROOM (25% hold)
  //              Customer visibly receives the SAME package.
  //              Package gently scales up with subtle highlight glow.
  //              Clean final confirmation "Delivered ✓" appears.

  const isAtCenter = progress >= 0.22 && progress <= 0.60;
  const isMovingToCustomer = progress > 0.60 && progress < 0.76;
  const isDelivered = progress >= 0.76;

  // Final handover target point safely inside RIGHT zone
  const customerTargetX = Math.round(coords.RIGHT_POSITION * 0.75);

  // Package horizontal movement: LEFT (LEFT_POSITION) → CENTER (0) → RIGHT (customerTargetX)
  let packageX = coords.CENTER_POSITION;
  if (progress < 0.22) {
    const t = progress / 0.22;
    packageX = coords.LEFT_POSITION * (1 - smootherstep(t));
  } else if (progress <= 0.60) {
    packageX = coords.CENTER_POSITION;
  } else if (progress < 0.76) {
    const t = (progress - 0.60) / 0.16;
    packageX = customerTargetX * smootherstep(t);
  } else {
    packageX = customerTargetX; // Handed over to customer on RIGHT
  }

  // Subtle floating motion
  const packageY = progress < 0.22
    ? Math.sin((progress / 0.22) * Math.PI) * -12
    : isDelivered
    ? -4
    : Math.sin(progress * Math.PI * 2) * -6;

  // Emotional payoff: gentle scale up when delivered
  let packageScale = 0.98;
  if (isAtCenter) {
    packageScale = 1.08;
  } else if (isMovingToCustomer) {
    packageScale = 1.04;
  } else if (isDelivered) {
    packageScale = 1.12; // subtle scale up on completed delivery
  }

  // Delivery Person (RIGHT side) entrance and handover movement
  let deliveryPersonOpacity = 0;
  let deliveryPersonX = 40;
  if (progress < 0.12) {
    const s = smootherstep(progress / 0.12);
    deliveryPersonOpacity = s;
    deliveryPersonX = 40 * (1 - s);
  } else {
    deliveryPersonOpacity = 1;
    if (progress < 0.60) {
      deliveryPersonX = 0;
    } else if (progress < 0.76) {
      const s = smootherstep((progress - 0.60) / 0.16);
      // Steps forward smoothly to hand over package
      deliveryPersonX = -s * 20;
    } else {
      deliveryPersonX = -20;
    }
  }

  // Final "Delivered ✓" card opacity & slide
  let finalCardOpacity = 0;
  let finalCardX = -30;
  if (progress >= 0.74) {
    const s = smootherstep((progress - 0.74) / 0.14);
    finalCardOpacity = s;
    finalCardX = -30 * (1 - s);
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Warm ambient sunset and doorstep evening glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-950/20 via-black to-black pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          1. MINIMAL STORY STATUS INDICATOR (TOP / CENTER)
          Clear, minimal, not overloaded
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-[22%] sm:top-[24%] inset-x-0 flex justify-center z-30 pointer-events-none">
        <motion.div
          animate={{
            scale: isDelivered ? [1, 1.06, 1] : 1,
          }}
          transition={{ duration: 0.4 }}
          className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-xl shadow-lg transition-all duration-300 ${
            isDelivered
              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-emerald-500/20'
              : isAtCenter
              ? 'bg-orange-500/20 border-orange-500/60 text-orange-300 shadow-orange-500/20'
              : 'bg-neutral-900/90 border-neutral-800 text-neutral-300'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isDelivered ? 'bg-emerald-400' : 'bg-orange-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isDelivered ? 'bg-emerald-500' : 'bg-orange-500'
              }`}
            />
          </span>
          <span className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider">
            {isDelivered
              ? 'Delivered ✓'
              : isAtCenter
              ? 'Arriving at your doorstep'
              : 'Out for Delivery'}
          </span>
          <span className="text-[10px] font-mono text-neutral-400 border-l border-neutral-700 pl-2">
            42 Nova Way
          </span>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. RIGHT SIDE: DELIVERY PERSON
          Local delivery person responsible for handing package to customer.
          Consistent with astronaut/courier style.
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute right-6 sm:right-10 lg:right-14 -translate-y-1/2 z-20 pointer-events-auto max-w-xs sm:max-w-sm"
        style={{
          top: coords.CENTER_Y,
          opacity: deliveryPersonOpacity,
          transform: `translate3d(${deliveryPersonX}px, -50%, 0)`,
          willChange: 'transform, opacity',
        }}
      >
        <div className="relative w-[280px] sm:w-[320px] rounded-3xl overflow-hidden border-2 border-orange-500/60 bg-neutral-950/95 shadow-[0_20px_50px_rgba(249,115,22,0.3),0_0_30px_rgba(249,115,22,0.12)] backdrop-blur-2xl">
          {/* Header */}
          <div className="px-3.5 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                <Bike className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9.5px] font-mono font-bold text-orange-400 uppercase tracking-wider">
                Local Delivery Person
              </span>
            </div>
            <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
              #M-102
            </span>
          </div>

          {/* Courier Info */}
          <div className="p-3 text-left border-b border-neutral-800/80 bg-neutral-950/90 flex items-center justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                Astronaut Marco
              </h4>
              <p className="text-[9px] font-mono text-neutral-400">
                Jiffy Final-Mile Express
              </p>
            </div>

            <span
              className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border transition-colors duration-300 ${
                isDelivered
                  ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/60'
                  : isMovingToCustomer
                  ? 'bg-orange-500/25 text-orange-300 border-orange-500/60 animate-pulse'
                  : 'bg-neutral-800 text-neutral-400 border-neutral-700'
              }`}
            >
              {isDelivered
                ? 'Handover Completed ✓'
                : isMovingToCustomer
                ? 'Handing Over →'
                : 'At Doorstep'}
            </span>
          </div>

          {/* Courier Character Visual */}
          <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-neutral-900">
            <img
              src={astronautCourierPartnerImg}
              alt="Astronaut Local Delivery Person"
              className="w-full h-full object-cover object-top transform transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

            {/* Interaction Tag on Visual */}
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-neutral-200 bg-neutral-950/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-neutral-800">
              <span className="flex items-center gap-1 text-neutral-300">
                <UserCheck className="w-3 h-3 text-emerald-400" />
                Customer: Kirti Oswal
              </span>
              <span className="text-orange-400 font-bold">
                Doorstep
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-3.5 py-2 bg-neutral-950 flex items-center justify-between text-[9px] font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              Verified Handover
            </span>
            <span className="text-neutral-500">
              42 Nova Way
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MOVING PACKAGE: (LEFT -> CENTER -> RIGHT)
          Exact same package (#JFY-9082) moving seamlessly
          Delivery Person → Package → Customer
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute z-30 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${packageX}px, ${packageY}px, 0)`,
          willChange: 'transform',
        }}
      >
        <div
          className={`transition-all duration-300 rounded-3xl ${
            isDelivered
              ? 'p-2 shadow-[0_0_40px_rgba(16,185,129,0.55),0_0_15px_rgba(249,115,22,0.35)]'
              : ''
          }`}
        >
          <DeliveryPackage
            scale={packageScale}
            statusText={
              isDelivered
                ? 'Delivered to Customer ✓'
                : isMovingToCustomer
                ? 'Handover to Customer →'
                : isAtCenter
                ? 'Arriving at your doorstep'
                : 'Out for Delivery ←'
            }
            badgeColor={isDelivered ? 'emerald' : 'orange'}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. LEFT / CENTER-LEFT: FINAL "DELIVERED ✓" CONFIRMATION CARD
          Clean payoff of the entire animation.
          No excessive confetti - premium, satisfying, ample breathing room.
          ───────────────────────────────────────────────────────────── */}
      {isDelivered && (
        <div
          className="absolute left-6 sm:left-12 lg:left-16 -translate-y-1/2 w-[310px] sm:w-[380px] z-25 pointer-events-auto"
          style={{
            top: coords.CENTER_Y,
            opacity: finalCardOpacity,
            transform: `translate3d(${finalCardX}px, -50%, 0)`,
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
          }}
        >
          <div className="relative bg-neutral-950/95 border-2 border-emerald-500/80 rounded-3xl p-5 sm:p-6 backdrop-blur-2xl text-center shadow-[0_30px_60px_-12px_rgba(0,0,0,0.9),0_0_35px_rgba(16,185,129,0.35)]">
            {/* Outer Subtle Halo Glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-500/20 blur-2xl -z-10" />

            {/* 3D Checkmark badge */}
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/50 mb-2.5 sm:mb-3 border-t border-white/40">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Delivered ✓
            </h3>
            <p className="text-[11px] sm:text-xs text-neutral-300 mt-1 max-w-sm mx-auto leading-relaxed">
              Order <span className="text-white font-bold">#JFY-9082</span> received by{' '}
              <span className="text-emerald-400 font-bold">Kirti Oswal</span> at 42 Nova Way.
            </p>

            {/* Delivery Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 my-3.5">
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2 shadow-inner">
                <span className="text-[9px] font-mono text-neutral-400 block">TOTAL TIME</span>
                <span className="text-xs sm:text-sm font-black text-emerald-400">18 Mins</span>
              </div>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2 shadow-inner">
                <span className="text-[9px] font-mono text-neutral-400 block">STATUS</span>
                <span className="text-xs sm:text-sm font-black text-white">100% On-Time</span>
              </div>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2 shadow-inner">
                <span className="text-[9px] font-mono text-neutral-400 block">RATING</span>
                <span className="text-xs sm:text-sm font-black text-amber-400">5.0 ★</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-2.5">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-500/25 hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer border-t border-white/30"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Replay Journey
              </button>
              <a
                href="#integration-section"
                className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
              >
                Explore Platform <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
