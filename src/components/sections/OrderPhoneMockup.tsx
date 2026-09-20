import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  MapPin,
  CheckCircle2,
  Package,
  Sparkles,
  ArrowRight,
  Clock,
} from 'lucide-react';
import logoImg from '@/assets/logo.png';

interface OrderPhoneMockupProps {
  onOrderPlaced?: () => void;
  forceOrderPlaced?: boolean;
  scrollProgress?: number;
}

export const OrderPhoneMockup = ({
  onOrderPlaced,
  forceOrderPlaced,
  scrollProgress,
}: OrderPhoneMockupProps) => {
  const [orderStep, setOrderStep] = useState<0 | 1>(0);

  // Scroll-driven state when scrollProgress is provided
  useEffect(() => {
    if (scrollProgress !== undefined) {
      if (scrollProgress >= 0.18 && orderStep === 0) {
        setOrderStep(1);
        onOrderPlaced?.();
      } else if (scrollProgress < 0.14 && orderStep === 1) {
        setOrderStep(0);
      }
    }
  }, [scrollProgress, orderStep, onOrderPlaced]);

  // Fallback for initial auto-trigger if user does not scroll
  useEffect(() => {
    if (scrollProgress !== undefined) return;
    const timer = setTimeout(() => {
      setOrderStep(1);
      onOrderPlaced?.();
    }, 2400);

    return () => clearTimeout(timer);
  }, [onOrderPlaced, scrollProgress]);

  // If parent forces order placed
  useEffect(() => {
    if (scrollProgress === undefined && forceOrderPlaced && orderStep === 0) {
      setOrderStep(1);
      onOrderPlaced?.();
    }
  }, [forceOrderPlaced, orderStep, onOrderPlaced, scrollProgress]);

  // Slider scrub position: smoothly slides across 0.09 -> 0.18 while phone is firmly centered
  const sliderPercent = scrollProgress !== undefined
    ? Math.min(Math.max((scrollProgress - 0.09) / 0.09, 0), 1)
    : undefined;

  return (
    <div className="relative group flex items-center justify-center pt-2 sm:pt-4">
      {/* Outer Glow Effect around Phone */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#F97316]/40 via-[#FF6B35]/20 to-[#F97316]/40 rounded-[54px] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-pulse" />

      {/* Phone Chassis Container — responsive height to fit all viewports */}
      <div className="relative w-[280px] sm:w-[310px] h-[500px] sm:h-[560px] max-h-[72vh] bg-neutral-950 rounded-[44px] border-[6px] border-neutral-800 shadow-2xl overflow-hidden flex flex-col justify-between select-none transform transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Phone Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-neutral-900 rounded-b-xl z-30 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neutral-950 border border-neutral-800" />
          <div className="w-2 h-2 rounded-full bg-neutral-900" />
        </div>

        {/* Top Status Bar */}
        <div className="relative z-20 pt-2 px-6 flex justify-between items-center text-[10px] text-neutral-400 font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold tracking-tighter">5G</span>
            <div className="w-4.5 h-2.5 border border-neutral-500 rounded-xs p-0.5 flex items-center">
              <div className="h-full w-2.5 bg-neutral-300 rounded-xs" />
            </div>
          </div>
        </div>

        {/* App Header Bar inside Phone */}
        <div className="relative z-20 px-4 pt-3 pb-2 border-b border-neutral-800/60 bg-neutral-900/60 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Jiffy" className="h-5 w-auto" />
            <span className="text-xs font-bold text-white tracking-wide">Express</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
            <MapPin className="w-2.5 h-2.5" />
            <span>Dark Store #04</span>
          </div>
        </div>

        {/* Screen Content - Animated Order Flow */}
        <div className="relative flex-1 p-4 overflow-hidden flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {orderStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col justify-between"
              >
                {/* Product Details Card */}
                <div className="space-y-3">
                  <div className="relative rounded-2xl bg-neutral-900/90 border border-neutral-800 p-3 overflow-hidden shadow-lg">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-orange-500/10 rounded-full blur-xl" />
                    
                    <div className="flex items-start gap-3">
                      <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0">
                        <Package className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-orange-400 font-bold tracking-wide uppercase">Priority Order</span>
                          <span className="text-xs font-extrabold text-white">$24.99</span>
                        </div>
                        <h4 className="text-xs font-bold text-white leading-tight mt-0.5 truncate">Jiffy Ultra Parcel Box</h4>
                        <p className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-orange-400" /> Instant 10-min dispatch
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Rows */}
                  <div className="rounded-xl bg-neutral-900/50 border border-neutral-800/80 p-3 space-y-2 text-[11px]">
                    <div className="flex justify-between text-neutral-400">
                      <span>Express Delivery</span>
                      <span className="text-emerald-400 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Processing Fee</span>
                      <span className="text-white">$0.00</span>
                    </div>
                    <div className="border-t border-neutral-800/80 pt-2 flex justify-between font-bold text-white">
                      <span>Total Amount</span>
                      <span className="text-orange-400">$24.99</span>
                    </div>
                  </div>
                </div>

                {/* Animated Order Button (Scroll-scrubbed or timed) */}
                <div className="mt-auto pt-3">
                  <div className="relative h-11 rounded-2xl bg-neutral-900 border border-orange-500/40 p-1 flex items-center overflow-hidden">
                    {/* Progress track */}
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500/20 to-orange-500/60 rounded-2xl transition-all duration-75"
                      style={{
                        width: sliderPercent !== undefined
                          ? `${15 + sliderPercent * 85}%`
                          : '100%',
                      }}
                    />
                    
                    {/* Knob */}
                    <div
                      className="relative z-10 w-9 h-9 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/40 transition-transform duration-75"
                      style={{
                        transform: sliderPercent !== undefined
                          ? `translateX(${sliderPercent * 185}px)`
                          : 'translateX(185px)',
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-orange-200 pointer-events-none pl-6">
                      {sliderPercent !== undefined && sliderPercent > 0.8
                        ? 'Confirming Order...'
                        : 'Placing Order...'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {orderStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-2"
              >
                {/* Glowing Checkmark */}
                <div className="relative mb-3">
                  <motion.div
                    className="absolute inset-0 bg-orange-500/40 rounded-full blur-xl"
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-18 h-18 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-xl shadow-orange-500/40 relative z-10"
                    initial={{ scale: 0, rotate: -60 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  >
                    <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                  </motion.div>
                </div>

                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[9px] uppercase font-extrabold tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20 mb-1.5"
                >
                  Order Confirmed
                </motion.span>

                <h3 className="text-sm font-bold text-white">Order #JFY-9082</h3>
                <p className="text-[11px] text-neutral-400 mt-0.5 max-w-[190px]">
                  Assigned to nearest rider at Dark Hub #04
                </p>

                {/* Status Timeline */}
                <div className="w-full mt-5 bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 text-left space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-neutral-200 font-medium">Order Confirmed</span>
                    <span className="text-[9px] text-neutral-500 ml-auto">Just now</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-[10px] text-neutral-200 font-semibold">Packed & Sealed</span>
                    <span className="text-[9px] text-orange-400 ml-auto font-bold">Active</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-40">
                    <div className="w-2 h-2 rounded-full bg-neutral-600" />
                    <span className="text-[10px] text-neutral-400">Handed to Courier</span>
                    <span className="text-[9px] text-neutral-500 ml-auto">Pending</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="relative z-20 pb-3 pt-1 px-8 border-t border-neutral-800/40 bg-neutral-900/80 backdrop-blur-md flex justify-between items-center text-neutral-500">
          <div className="flex flex-col items-center gap-0.5 text-orange-400">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="text-[8px] font-semibold">Order</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 hover:text-neutral-300">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[8px] font-semibold">Track</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 hover:text-neutral-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[8px] font-semibold">Perks</span>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-neutral-600 rounded-full z-30" />
      </div>
    </div>
  );
};
