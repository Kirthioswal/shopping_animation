import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Package, Sparkles, Monitor, Cpu, Radio } from 'lucide-react';
import astronautImg from '@/assets/astronaut/astronaut-computer-reading.jpg';

interface DarkStoreTerminalProps {
  progress: number; // 0 to 1 scroll progress from HeroSection
  orderReceived: boolean; // true once notification arrives inside computer (progress >= 0.75)
}

export const DarkStoreTerminal = ({ progress, orderReceived }: DarkStoreTerminalProps) => {
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
            {orderReceived ? 'ORDER TRANSMITTED' : 'ONLINE // STANDBY'}
          </span>
        </div>
      </div>

      {/* Main Visual: Astronaut at Packing Station reading computer */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
        <img
          src={astronautImg}
          alt="Astronaut teammate in dark store fulfillment center reading incoming order on computer"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Subtle dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Live Interactive Computer Monitor HUD (Overlays the computer area — sized to not obscure astronaut) */}
        <div className="absolute top-[12%] right-[4%] w-[38%] sm:w-[36%] aspect-[1.3/1] z-20 pointer-events-none flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!orderReceived ? (
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
              /* Active Order Received Screen (Triggered when notification enters computer) */
              <motion.div
                key="received-screen"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="w-full h-full rounded-xl bg-gradient-to-br from-neutral-950/95 via-neutral-900/95 to-neutral-950/95 border-2 border-emerald-500/70 p-2.5 flex flex-col justify-between backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.35)]"
              >
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-1">
                  <span className="text-[9px] font-mono text-emerald-400 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    NEW ORDER #JFY-9082
                  </span>
                  <span className="text-[7.5px] font-mono text-emerald-300 bg-emerald-500/20 px-1 py-0.5 rounded font-bold">
                    TRANSMITTED
                  </span>
                </div>

                <div className="my-auto space-y-1 py-0.5">
                  <div className="flex items-center justify-between text-[8px] font-mono">
                    <span className="text-neutral-400">Item:</span>
                    <span className="text-white font-bold">Ultra Parcel Box</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono">
                    <span className="text-neutral-400">Target ETA:</span>
                    <span className="text-orange-400 font-bold">10 MINS</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono">
                    <span className="text-neutral-400">Packer:</span>
                    <span className="text-cyan-400 font-bold">Astronaut Leo</span>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded py-0.5 px-1.5 flex items-center justify-between">
                  <span className="text-[7.5px] font-mono font-bold text-emerald-300 uppercase">
                    Status: Packing in progress
                  </span>
                  <span className="text-[7.5px] text-emerald-400 font-bold animate-pulse">
                    ● ACTIVE
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
