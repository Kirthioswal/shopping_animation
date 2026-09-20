import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { journeySteps } from '@/data/journeySteps';
import { useScrollStore } from '@/stores/scrollStore';

import { Step1SellerPackage } from './stages/Step1SellerPackage';
import { Step2CourierHandover } from './stages/Step2CourierHandover';
import { Step3WarehouseTransit } from './stages/Step3WarehouseTransit';
import { Step4AirLoading } from './stages/Step4AirLoading';
import { Step5AirToDestination } from './stages/Step5AirToDestination';
import { Step6LocalCourier } from './stages/Step6LocalCourier';
import { Step7CustomerDelivered } from './stages/Step7CustomerDelivered';

import {
  Package,
  Bike,
  Building2,
  Plane,
  Warehouse,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STAGE_ICONS = [
  Package,
  Bike,
  Warehouse,
  Plane,
  Building2,
  Bike,
  CheckCircle2,
];

export const DeliveryJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [, forceUpdate] = useState(0);

  const { setActiveStep, setStepProgress, setGlobalProgress, setIsScrolling } = useScrollStore();

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      forceUpdate((c) => c + 1);
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1400%',
        pin: true,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;

          const totalStages = 7;
          const rawStage = self.progress * totalStages;
          const currentStage = Math.min(Math.floor(rawStage), totalStages - 1);
          const stageLocalProgress = Math.min(Math.max(rawStage - currentStage, 0), 1);

          setActiveStep(currentStage);
          setStepProgress(stageLocalProgress);
          setGlobalProgress(self.progress);
          setIsScrolling(true);

          scheduleUpdate();
        },
        onLeave: () => setIsScrolling(false),
        onLeaveBack: () => setIsScrolling(false),
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleUpdate, setActiveStep, setStepProgress, setGlobalProgress, setIsScrolling]);

  const globalProgress = progressRef.current;
  const totalStages = 7;
  const rawStage = globalProgress * totalStages;
  const currentStageIndex = Math.min(Math.floor(rawStage), totalStages - 1);
  const stageProgress = Math.min(Math.max(rawStage - currentStageIndex, 0), 1);

  const currentStepData = journeySteps[currentStageIndex] || journeySteps[0];

  return (
    <div
      id="delivery-journey-section"
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      {/* BACKGROUND IMAGES WITH SEAMLESS CROSSFADES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {journeySteps.map((step, idx) => {
          // Distance from current stage position
          const diff = Math.abs(rawStage - idx);
          const opacity = Math.max(0, 1 - diff) * 0.45;

          if (opacity <= 0.01) return null;

          return (
            <img
              key={idx}
              src={step.backgroundImage}
              alt={step.category}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity,
                filter: 'brightness(0.7) contrast(1.15)',
                willChange: 'opacity',
              }}
            />
          );
        })}

        {/* Cinematic Vignette & Ambient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* TOP HUD: Step Indicator & Story Header */}
      <div className="absolute top-0 inset-x-0 z-40 pt-20 px-6 sm:px-12 max-w-7xl mx-auto pointer-events-auto">
        {/* Breadcrumb Steps Bar */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 bg-neutral-950/85 border border-neutral-800/80 rounded-2xl p-2 sm:p-2.5 backdrop-blur-xl shadow-2xl overflow-x-auto scrollbar-none">
          {journeySteps.map((step, i) => {
            const Icon = STAGE_ICONS[i] || Package;
            const isActive = i === currentStageIndex;
            const isPast = i < currentStageIndex;

            return (
              <div
                key={i}
                className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-300 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/50 text-white shadow-md shadow-orange-500/20'
                    : isPast
                    ? 'text-emerald-400 opacity-80'
                    : 'text-neutral-500 opacity-40'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/50'
                      : isPast
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="hidden md:flex flex-col text-left">
                  <span className="text-[9px] font-mono tracking-widest uppercase font-bold">
                    {step.stepNumber} // {step.category}
                  </span>
                  <span className="text-[10px] font-bold truncate max-w-[110px]">
                    {step.headlineOrange}
                  </span>
                </div>

                {i < journeySteps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-neutral-600 hidden lg:block ml-1" />
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Headline for Current Stage */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-extrabold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
              <span>STAGE {currentStepData.stepNumber} // {currentStepData.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-0.5 leading-tight tracking-tight">
              {currentStepData.headlineWhite}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                {currentStepData.headlineOrange}
              </span>
            </h2>
          </div>

          <div className="text-right font-mono text-xs text-neutral-400 hidden sm:block">
            <span className="text-neutral-500 block text-[10px]">CURRENT LOCATION</span>
            <span className="text-white font-bold">{currentStepData.subLocation}</span>
          </div>
        </div>
      </div>

      {/* MAIN STAGE ANIMATION CANVAS (STAGES 1 - 7): Absolute Inset-0 for perfect viewport centering */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        {currentStageIndex === 0 && (
          <Step1SellerPackage progress={stageProgress} />
        )}
        {currentStageIndex === 1 && (
          <Step2CourierHandover progress={stageProgress} />
        )}
        {currentStageIndex === 2 && (
          <Step3WarehouseTransit progress={stageProgress} />
        )}
        {currentStageIndex === 3 && (
          <Step4AirLoading progress={stageProgress} />
        )}
        {currentStageIndex === 4 && (
          <Step5AirToDestination progress={stageProgress} />
        )}
        {currentStageIndex === 5 && (
          <Step6LocalCourier progress={stageProgress} />
        )}
        {currentStageIndex === 6 && (
          <Step7CustomerDelivered progress={stageProgress} />
        )}
      </div>

      {/* BOTTOM HUD: Continuous Scroll Progress Tracker */}
      <div className="absolute bottom-6 inset-x-0 z-40 px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-between text-neutral-400 font-mono text-[11px] pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-bold tracking-wide">
            {currentStepData.badgeText}
          </span>
        </div>

        {/* Continuous Progress Bar */}
        <div className="w-48 sm:w-72 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 rounded-full transition-all duration-75"
            style={{ width: `${globalProgress * 100}%` }}
          />
        </div>

        <div className="text-neutral-400 font-bold">
          {Math.round(globalProgress * 100)}% COMPLETE
        </div>
      </div>
    </div>
  );
};

export default DeliveryJourney;
