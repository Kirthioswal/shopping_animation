import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Clock,
  MapPin,
  Tag,
} from 'lucide-react';
import logoImg from '@/assets/logo.png';

export interface DeliveryPackageProps {
  /** Scale factor of the box */
  scale?: number;
  /** Rotation angle in degrees */
  rotation?: number;
  /** Whether the package is in foreground zoom state with expanded UI details */
  isZoomed?: boolean;
  /** Progress within the zoom state (0 to 1) */
  zoomProgress?: number;
  /** Custom extra classes */
  className?: string;
  /** Custom status text displayed on holographic badge */
  statusText?: string;
  /** Optional badge color scheme */
  badgeColor?: 'orange' | 'emerald' | 'cyan';
}

export const DeliveryPackage: React.FC<DeliveryPackageProps> = ({
  scale = 1,
  rotation = 0,
  isZoomed = false,
  zoomProgress = 0,
  className = '',
  statusText,
  badgeColor = 'orange',
}) => {
  return (
    <div
      className={`relative select-none pointer-events-none transition-transform duration-300 ${className}`}
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
      }}
    >
      {/* Dynamic 3D Box Container */}
      <div className="relative w-[190px] sm:w-[220px] aspect-[1.25/1] rounded-2xl bg-gradient-to-br from-[#d4a373] via-[#bc8a5f] to-[#a47148] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#e6b98a]/50 overflow-visible group">
        {/* Box Top Flap / 3D Bevel Highlight */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-b from-white/35 to-transparent rounded-t-2xl pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-white/20 to-transparent rounded-l-2xl pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-2 bg-black/25 rounded-r-2xl pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-black/35 rounded-b-2xl pointer-events-none" />

        {/* Central Jiffy Orange Sealing Tape */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-9 sm:w-10 bg-gradient-to-b from-[#FF7A00] via-[#F97316] to-[#E05300] shadow-[0_0_12px_rgba(249,115,22,0.4)] flex flex-col items-center justify-between py-1.5 z-10 border-x border-[#FFA048]/60">
          {/* Subtle tape seam perforation line */}
          <div className="w-[1px] h-full bg-white/25 border-dashed" />
          <div className="absolute top-2 text-[7px] font-black tracking-widest text-black/60 uppercase rotate-90 origin-center whitespace-nowrap">
            JIFFY TAPE
          </div>
          <div className="absolute bottom-3 text-[7px] font-black tracking-widest text-black/60 uppercase rotate-90 origin-center whitespace-nowrap">
            SEALED
          </div>
        </div>

        {/* Left Side: Jiffy Stamp & Handling Icons */}
        <div className="relative z-10 w-[42%] flex flex-col justify-between h-full text-black/80">
          <div className="flex items-center gap-1">
            <img src={logoImg} alt="Jiffy" className="h-4 sm:h-5 w-auto drop-shadow-sm brightness-90" />
            <span className="text-[9px] font-black tracking-tight text-neutral-900">EXPRESS</span>
          </div>

          <div className="space-y-1 my-auto">
            <div className="inline-flex items-center gap-1 bg-black/10 px-1.5 py-0.5 rounded border border-black/10">
              <span className="text-[7.5px] font-mono font-black text-neutral-900 tracking-tighter">
                #JFY-9082
              </span>
            </div>
            <div className="flex items-center gap-1 text-[7px] font-bold text-neutral-800">
              <span>↑↑ THIS WAY UP</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[6.5px] font-mono font-bold text-neutral-700">
            <ShieldCheck className="w-2.5 h-2.5 text-orange-950" />
            <span>INSURED 100%</span>
          </div>
        </div>

        {/* Right Side: Official Shipping Label */}
        <div className="absolute top-2.5 right-2.5 bottom-2.5 w-[44%] bg-white rounded-lg shadow-md border border-neutral-300 p-1.5 flex flex-col justify-between z-10 text-neutral-900">
          {/* Label Header */}
          <div className="flex items-center justify-between border-b border-neutral-300 pb-0.5">
            <span className="text-[6.5px] font-extrabold tracking-wider bg-black text-white px-1 rounded-xs">
              PRIORITY
            </span>
            <span className="text-[6px] font-mono text-neutral-600">AIR/LAST-MILE</span>
          </div>

          {/* Recipient Address Snippet */}
          <div className="text-[6px] font-sans leading-tight text-neutral-800 py-0.5">
            <div className="font-extrabold text-[6.5px] text-neutral-950 truncate">CUSTOMER DESTINATION</div>
            <div className="truncate text-neutral-600">42 Nova Heights</div>
            <div className="font-bold text-orange-600">ETA: 10 MINS</div>
          </div>

          {/* Barcode & QR Code representation */}
          <div className="pt-0.5 border-t border-neutral-200 flex items-center justify-between">
            {/* SVG Barcode */}
            <div className="h-4 flex items-center gap-[1.5px] overflow-hidden">
              <div className="w-[1.5px] h-full bg-black" />
              <div className="w-[1px] h-full bg-black" />
              <div className="w-[2.5px] h-full bg-black" />
              <div className="w-[1px] h-full bg-black" />
              <div className="w-[2px] h-full bg-black" />
              <div className="w-[1px] h-full bg-black" />
              <div className="w-[3px] h-full bg-black" />
              <div className="w-[1px] h-full bg-black" />
              <div className="w-[2px] h-full bg-black" />
              <div className="w-[1px] h-full bg-black" />
            </div>

            <QrCode className="w-3.5 h-3.5 text-neutral-900 stroke-[2.5]" />
          </div>

          {/* Scanning laser beam effect when zoomed */}
          {isZoomed && (
            <motion.div
              className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-red-500 via-orange-400 to-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]"
              animate={{ top: ['5%', '90%', '5%'] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            />
          )}
        </div>

        {/* Ambient Cardboard Corner Creases */}
        <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-black/20 pointer-events-none rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-black/20 pointer-events-none rounded-bl-2xl" />
      </div>

      {/* Floating 3D Popping Status Badge */}
      {statusText && (
        <div
          key={statusText}
          className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 whitespace-nowrap z-40 pointer-events-none"
          style={{ perspective: 1000 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 15, rotateX: 45 }}
            animate={{
              opacity: 1,
              scale: [0.4, 1.25, 1],
              y: 0,
              rotateX: [45, -10, 0],
            }}
            transition={{
              type: 'spring',
              stiffness: 480,
              damping: 20,
              mass: 0.7,
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
            className="relative"
          >
            {/* Outer 3D Glow Shockwave */}
            <div
              className={`absolute -inset-1 rounded-full blur-md -z-10 ${
                badgeColor === 'emerald'
                  ? 'bg-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.6)]'
                  : badgeColor === 'cyan'
                  ? 'bg-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                  : 'bg-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.6)]'
              }`}
            />

            {/* 3D Beveled Pill */}
            <div
              className={`px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider backdrop-blur-2xl border-2 flex items-center gap-2 ${
                badgeColor === 'emerald'
                  ? 'bg-neutral-950/95 text-emerald-300 border-emerald-500/80 shadow-[0_12px_30px_rgba(16,185,129,0.5)]'
                  : badgeColor === 'cyan'
                  ? 'bg-neutral-950/95 text-cyan-200 border-cyan-500/80 shadow-[0_12px_30px_rgba(6,182,212,0.5)]'
                  : 'bg-neutral-950/95 text-orange-300 border-orange-500/80 shadow-[0_12px_30px_rgba(249,115,22,0.5)]'
              }`}
              style={{
                boxShadow:
                  '0 15px 30px -5px rgba(0,0,0,0.9), inset 0 1.5px 2px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.7)',
              }}
            >
              {/* 3D Pulsing Gem Indicator */}
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    badgeColor === 'emerald'
                      ? 'bg-emerald-400'
                      : badgeColor === 'cyan'
                      ? 'bg-cyan-400'
                      : 'bg-orange-400'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 shadow-sm ${
                    badgeColor === 'emerald'
                      ? 'bg-gradient-to-tr from-emerald-600 via-emerald-400 to-white'
                      : badgeColor === 'cyan'
                      ? 'bg-gradient-to-tr from-cyan-600 via-cyan-400 to-white'
                      : 'bg-gradient-to-tr from-orange-600 via-orange-400 to-white'
                  }`}
                />
              </span>

              <span className="drop-shadow-sm font-extrabold tracking-wide">
                {statusText}
              </span>
            </div>
          </motion.div>
        </div>
      )}

      {/* EXPANDED ZOOM HUD OVERLAY (Step 1 E-Commerce Inspection Effect) */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute -inset-16 sm:-inset-24 pointer-events-none z-40"
          >
            {/* Holographic Glowing Field around Box */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/15 via-cyan-500/10 to-orange-500/15 blur-2xl -z-10" />

            {/* TOP-LEFT CARD: Order Confirmed & Packing Status (Reveals first) */}
            <div
              className={`absolute -top-6 -left-12 sm:-left-24 bg-neutral-900/95 border border-emerald-500/70 shadow-[0_10px_30px_rgba(16,185,129,0.3)] rounded-2xl p-2.5 sm:p-3 backdrop-blur-xl w-44 sm:w-52 text-left transition-all duration-300 ${
                zoomProgress >= 0.15
                  ? 'opacity-100 translate-x-0 translate-y-0'
                  : 'opacity-0 -translate-x-4 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="flex items-center gap-1.5 text-emerald-400 text-[9.5px] font-mono font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ORDER CONFIRMED & PACKED</span>
              </div>
              <div className="text-[12px] font-extrabold text-white leading-tight">
                Jiffy Ultra Parcel Box
              </div>
              <div className="flex items-center justify-between text-[9px] text-neutral-400 mt-1 font-mono">
                <span>Qty: 1 Unit</span>
                <span className="text-orange-400 font-bold">$24.99 USD</span>
              </div>
            </div>

            {/* TOP-RIGHT CARD: Shipping Label Details & Destination (Reveals second) */}
            <div
              className={`absolute -top-6 -right-12 sm:-right-24 bg-neutral-900/95 border border-orange-500/70 shadow-[0_10px_30px_rgba(249,115,22,0.3)] rounded-2xl p-2.5 sm:p-3 backdrop-blur-xl w-44 sm:w-52 text-left transition-all duration-300 ${
                zoomProgress >= 0.35
                  ? 'opacity-100 translate-x-0 translate-y-0'
                  : 'opacity-0 translate-x-4 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between text-[9px] font-mono text-orange-400 mb-1 font-bold">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" /> SHIPPING LABEL
                </span>
                <span className="bg-orange-500/20 px-1 rounded text-[8px]">AIR/GROUND</span>
              </div>
              <div className="text-[11px] font-bold text-white leading-tight">
                Tracking: #JFY-9082
              </div>
              <div className="text-[9px] text-neutral-300 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                <span className="truncate">Destination: 42 Nova Way</span>
              </div>
            </div>

            {/* BOTTOM-LEFT CARD: Seller & Station Verification (Reveals third) */}
            <div
              className={`absolute -bottom-6 -left-12 sm:-left-24 bg-neutral-900/95 border border-cyan-500/60 shadow-[0_10px_30px_rgba(6,182,212,0.25)] rounded-2xl p-2.5 sm:p-3 backdrop-blur-xl w-44 sm:w-52 text-left transition-all duration-300 ${
                zoomProgress >= 0.55
                  ? 'opacity-100 translate-x-0 translate-y-0'
                  : 'opacity-0 -translate-x-4 translate-y-2 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400 mb-1 font-bold">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> FULFILLMENT STATION
                </span>
              </div>
              <div className="text-[11px] font-bold text-white leading-tight">
                Dark Store #04 (Hub 4)
              </div>
              <div className="text-[9px] text-neutral-400 mt-1 font-mono">
                Packed by Astronaut Leo 👨‍🚀
              </div>
            </div>

            {/* BOTTOM-RIGHT CARD: Ready for Pickup Pill (Reveals fourth) */}
            <div
              className={`absolute -bottom-6 -right-12 sm:-right-24 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_10px_30px_rgba(249,115,22,0.4)] rounded-2xl p-2.5 sm:p-3 backdrop-blur-xl w-44 sm:w-52 text-left transition-all duration-300 ${
                zoomProgress >= 0.70
                  ? 'opacity-100 translate-x-0 translate-y-0'
                  : 'opacity-0 translate-x-4 translate-y-2 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between text-[9px] font-bold tracking-wider uppercase text-black/80">
                <span>STAGE 01 COMPLETE</span>
                <Clock className="w-3 h-3 text-black" />
              </div>
              <div className="text-[12px] font-black text-white leading-tight mt-0.5">
                Ready for Pickup →
              </div>
              <div className="text-[9px] text-black/90 font-medium mt-0.5 truncate">
                Routing to Courier Partner
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeliveryPackage;
