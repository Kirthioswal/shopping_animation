import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Package, Sparkles, Monitor, Cpu, Radio } from 'lucide-react';
import sellerAtComputerImg from '@/assets/astronaut/seller-at-computer.png';
import packingImg from '@/assets/astronaut/astronaut-packing-focus.png';
import packingCloseupImg from '@/assets/astronaut/astronaut-hands-box.png';
import packedImg from '@/assets/journey/step-02-packed.png';

interface DarkStoreTerminalProps {
  progress: number; // 0 to 1 scroll progress from HeroSection
  orderReceived: boolean; // true once notification arrives inside computer (progress >= 0.75)
}

export const DarkStoreTerminal = ({ progress, orderReceived }: DarkStoreTerminalProps) => {
  // The packing sequence is scrubbed by the hero's scroll progress so every
  // action can be revisited naturally when the user scrolls back.
  const packingProgress = Math.min(Math.max((progress - 0.62) / 0.20, 0), 1);
  const packingFrames = [sellerAtComputerImg, packingImg, packingCloseupImg, packedImg];
  const packingFrame = Math.min(Math.floor(packingProgress * packingFrames.length), packingFrames.length - 1);
  const packingLabels = ['Order received', 'Placing item in parcel', 'Sealing the package', 'Packed and ready'];
  const packingPercent = Math.round(packingProgress * 100);
  const arrivalProgress = Math.min(Math.max((progress - 0.50) / 0.08, 0), 1);
  const isReceivingOrder = progress >= 0.50;
  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden border border-neutral-800/90 bg-neutral-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl group">
      {/* Ambient workstation glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-cyan-500/10 to-orange-500/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />

      {/* Terminal Top Window Bar */}
      <div className="relative z-20 px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600" />
          <span className="text-xs font-mono font-bold text-neutral-400 ml-2 tracking-wide flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5 text-orange-400" />
            DARK STORE #04 // FULFILLMENT TERMINAL
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
            {orderReceived ? 'ORDER RECEIVED' : isReceivingOrder ? 'INCOMING ORDER' : 'ONLINE // STANDBY'}
          </span>
        </div>
      </div>

      {/* Main visual advances from order review through packing and sealing. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={packingFrame}
            src={packingFrames[packingFrame]}
            alt={packingFrame === 0 ? 'Seller checking the incoming order at the workstation' : 'Seller packing and sealing the order'}
            initial={{ opacity: 0, y: 10, scale: 1.015 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Subtle dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Live Interactive Computer Monitor HUD (Overlays the computer area — sized to not obscure astronaut) */}
        <div id="terminal-computer-screen" className="absolute top-[12%] right-[4%] w-[38%] sm:w-[36%] aspect-[1.3/1] z-20 pointer-events-none flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!isReceivingOrder ? (
              /* Standby / Listening Screen */
              <motion.div
                key="standby-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full rounded-xl bg-neutral-950/80 border border-orange-500/30 p-2.5 flex flex-col justify-between backdrop-blur-md shadow-lg shadow-orange-500/10"
              >
                <div className="flex items-center justify-between border-b border-orange-500/20 pb-1">
                  <span className="text-[8.5px] font-mono text-orange-400/90 font-bold flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5 animate-pulse text-orange-400" />
                    RADAR ACTIVE
                  </span>
                  <span className="text-[7.5px] font-mono text-neutral-400">HUB-04</span>
                </div>

                <div className="my-auto text-center py-1">
                  <div className="inline-block w-2.5 h-2.5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mb-1" />
                  <p className="text-[8.5px] font-mono text-neutral-300 font-semibold tracking-wide">
                    Waiting for customer orders...
                  </p>
                </div>

                <div className="text-[7.5px] font-mono text-neutral-400 text-right">
                  READY TO PACK
                </div>
              </motion.div>
            ) : (
              /* Order details enrich in place as the notification lands. */
              <motion.div
                key="incoming-screen"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className={`w-full h-full rounded-xl bg-gradient-to-br from-neutral-950/95 via-neutral-900/95 to-neutral-950/95 p-2.5 flex flex-col justify-between backdrop-blur-md transition-colors duration-200 ${orderReceived ? 'border-2 border-emerald-500/70 shadow-[0_0_30px_rgba(16,185,129,0.35)]' : 'border border-orange-400/70 shadow-[0_0_24px_rgba(249,115,22,0.25)]'}`}
              >
                <div className={`flex items-center justify-between border-b pb-1 ${orderReceived ? 'border-emerald-500/30' : 'border-orange-500/30'}`}>
                  <span className={`text-[9px] font-mono font-extrabold flex items-center gap-1 ${orderReceived ? 'text-emerald-400' : 'text-orange-300'}`}>
                    {orderReceived ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Radio className="w-3 h-3 animate-pulse" />}
                    {arrivalProgress < 0.45 ? 'ORDER ARRIVING' : 'NEW ORDER #JFY-9082'}
                  </span>
                  <span className={`text-[7.5px] font-mono px-1 py-0.5 rounded font-bold ${orderReceived ? 'text-emerald-300 bg-emerald-500/20' : 'text-orange-200 bg-orange-500/15'}`}>
                    {orderReceived ? 'RECEIVED' : 'SYNCING'}
                  </span>
                </div>

                <div className="my-auto space-y-1 py-0.5">
                  <div className="flex items-center justify-between text-[8px] font-mono" style={{ opacity: 0.35 + arrivalProgress * 0.65 }}>
                    <span className="text-neutral-400">Item:</span>
                    <span className="text-white font-bold">{arrivalProgress > 0.2 ? 'Ultra Parcel Box' : 'Receiving details…'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono transition-opacity duration-200" style={{ opacity: Math.max(0, (arrivalProgress - 0.25) / 0.75) }}>
                    <span className="text-neutral-400">Target ETA:</span>
                    <span className="text-orange-400 font-bold">10 MINS</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono transition-opacity duration-200" style={{ opacity: Math.max(0, (arrivalProgress - 0.5) / 0.5) }}>
                    <span className="text-neutral-400">Packer:</span>
                    <span className="text-cyan-400 font-bold">Astronaut Leo</span>
                  </div>
                </div>

                <div className={`rounded py-0.5 px-1.5 flex items-center justify-between transition-colors duration-200 ${orderReceived ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
                  <span className={`text-[7.5px] font-mono font-bold uppercase ${orderReceived ? 'text-emerald-300' : 'text-orange-200'}`}>
                    Status: {orderReceived ? 'Ready to pack' : 'Waiting for order data'}
                  </span>
                  <span className={`text-[7.5px] font-bold animate-pulse ${orderReceived ? 'text-emerald-400' : 'text-orange-300'}`}>
                    ● {orderReceived ? 'ACTIVE' : 'SYNCING'}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {orderReceived && (
          <div className="absolute top-[12%] left-[4%] z-20 w-[43%] rounded-xl border border-orange-400/45 bg-neutral-950/90 px-2.5 py-2 text-left shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between gap-2 text-[8px] font-mono font-bold uppercase tracking-wide text-orange-300">
              <span>Fulfillment</span><span>{packingPercent}%</span>
            </div>
            <p className="mt-1 text-[9px] font-semibold text-white">{packingLabels[packingFrame]}</p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-neutral-800">
              <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-400" style={{ width: `${packingPercent}%` }} />
            </div>
          </div>
        )}

        {/* Astronaut Speech/Status Tag */}
        <AnimatePresence>
          {orderReceived && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none"
            >
              <div className="bg-neutral-900/95 border border-orange-500/50 shadow-xl rounded-2xl p-3 backdrop-blur-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-orange-500/30 shrink-0">
                  👨‍🚀
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Astronaut Leo</span>
                    <span className="text-[9px] text-orange-400 bg-orange-500/10 px-1.5 py-0.2 rounded font-mono font-semibold">
                      Dark Store #04
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 truncate mt-0.5 font-medium">
                    Order #JFY-9082 received on terminal! Packing box now... 📦👟
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal Footer Bar */}
      <div className="relative z-20 px-4 py-2.5 bg-neutral-900/90 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-orange-400" />
          <span>Jiffy Instant Fulfillment Protocol</span>
        </div>
        <div className="text-neutral-500">
          Dark Store System v2.4
        </div>
      </div>
    </div>
  );
};
