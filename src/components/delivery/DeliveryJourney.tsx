import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package, Bike, Warehouse, Plane, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { journeySteps } from '@/data/journeySteps';
import { useScrollStore } from '@/stores/scrollStore';
import { DeliveryPackage } from './DeliveryPackage';
import { Step2CourierHandover } from './stages/Step2CourierHandover';
import { Step3WarehouseTransit } from './stages/Step3WarehouseTransit';
import { Step4AirLoading } from './stages/Step4AirLoading';
import { Step6LocalCourier } from './stages/Step6LocalCourier';
import { Step7CustomerDelivered } from './stages/Step7CustomerDelivered';

gsap.registerPlugin(ScrollTrigger);

// Scene lengths follow the storyboard's relative scroll budgets.
const SCENES = [
  { weight: 4, kind: 'feature', cards: ['30-minute deliveries', 'Closer than you think', '10 to 10,000 orders', 'Always on duty'], direction: 'right' as const },
  { weight: 1.2, kind: 'catch' },
  { weight: 2, kind: 'warehouse' },
  { weight: 4.5, kind: 'feature', cards: ['Integrates with your favorite tools', 'One dashboard', 'Pick your couriers', 'Real-time tracking', 'Better rates'], direction: 'left' as const },
  { weight: 2, kind: 'air' },
  { weight: 4.5, kind: 'feature', cards: ['Sign up', 'Set up your store', 'Stock your dark store', 'Shipment ready', 'Track and scale'], direction: 'right' as const },
  { weight: 1, kind: 'handoff' },
  { weight: 2.5, kind: 'delivered' },
];
const TOTAL_WEIGHT = SCENES.reduce((sum, scene) => sum + scene.weight, 0);
const ICONS = [Package, Bike, Warehouse, Package, Plane, Sparkles, Bike, CheckCircle2];

function getScene(progress: number) {
  let cursor = 0;
  for (let i = 0; i < SCENES.length; i += 1) {
    const scene = SCENES[i];
    const end = cursor + scene.weight / TOTAL_WEIGHT;
    if (progress < end || i === SCENES.length - 1) {
      return { index: i, local: Math.min(1, Math.max(0, (progress - cursor) / (scene.weight / TOTAL_WEIGHT))) };
    }
    cursor = end;
  }
  return { index: 0, local: 0 };
}

const FeatureShowcase: React.FC<{ progress: number; cards: string[]; direction: 'left' | 'right' }> = ({ progress, cards, direction }) => {
  const fromRight = direction === 'right';
  const arrival = Math.min(1, progress / 0.22);
  const ease = arrival * arrival * (3 - 2 * arrival);
  const x = (fromRight ? 1 : -1) * (1 - ease) * Math.min(window.innerWidth * 0.34, 480);
  const cardIndex = Math.min(cards.length - 1, Math.floor(Math.max(0, progress - 0.24) / 0.7 * cards.length));
  const cardOpacity = progress < 0.24 ? 0 : Math.min(1, Math.min((progress - 0.24) * 7, (1 - progress) * 8));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(249,115,22,0.16),transparent_56%)]" />
      <div className="absolute inset-x-0 bottom-[16%] h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />
      <div className="relative flex items-center justify-center" style={{ transform: `translate3d(${x}px, ${Math.sin(progress * Math.PI * 2) * 8}px, 0) scale(${0.86 + ease * 0.14})`, opacity: 0.35 + ease * 0.65, willChange: 'transform' }}>
        <div className="relative rounded-[28px] border border-orange-200/40 bg-gradient-to-br from-[#d4a373] via-[#bc8a5f] to-[#805638] p-5 sm:p-8 shadow-[0_35px_110px_rgba(0,0,0,.8),0_0_70px_rgba(249,115,22,.25)] w-[min(72vw,780px)] aspect-[1.42/1]">
          <div className="absolute inset-y-0 left-[44%] w-[12%] bg-gradient-to-r from-[#f97316] via-[#ff9b38] to-[#e35b09] shadow-[0_0_28px_rgba(249,115,22,.35)]" />
          <div className="absolute inset-3 sm:inset-5 border border-black/15 rounded-2xl pointer-events-none" />
          <div className="absolute left-[6%] top-[8%] text-black/75 font-black text-xs sm:text-lg tracking-tight">JIFFY <span className="font-medium">EXPRESS</span></div>
          <div className="absolute left-[7%] bottom-[8%] text-black/60 font-mono text-[8px] sm:text-xs">#JFY-9082 · PRIORITY</div>
          <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-20">
            <div className="rounded-2xl border border-white/30 bg-neutral-950/90 backdrop-blur-xl px-5 sm:px-10 py-4 sm:py-7 text-center shadow-2xl transition-all duration-300" style={{ opacity: cardOpacity, transform: `translateY(${(1 - cardOpacity) * 16}px)` }}>
              <div className="text-[9px] sm:text-xs font-mono uppercase tracking-[0.24em] text-orange-300 mb-2">Jiffy · {String(cardIndex + 1).padStart(2, '0')}</div>
              <div className="text-lg sm:text-3xl md:text-4xl font-extrabold text-white">{cards[cardIndex]}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[22%] flex gap-2" aria-hidden="true">
        {cards.map((card, i) => <span key={card} className={`h-1 rounded-full transition-all duration-300 ${i === cardIndex ? 'w-8 bg-orange-400' : 'w-2 bg-white/30'}`} />)}
      </div>
      <div className="absolute bottom-[12%] text-[10px] sm:text-xs font-mono tracking-[0.25em] text-white/45 uppercase">Scroll to explore</div>
    </div>
  );
};

export const DeliveryJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [, forceUpdate] = useState(0);
  const { setActiveStep, setStepProgress, setGlobalProgress, setIsScrolling } = useScrollStore();

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => { rafRef.current = 0; forceUpdate((c) => c + 1); });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1400%',
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const current = getScene(self.progress);
          setActiveStep(current.index);
          setStepProgress(current.local);
          setGlobalProgress(self.progress);
          setIsScrolling(true);
          scheduleUpdate();
        },
        onLeave: () => setIsScrolling(false),
        onLeaveBack: () => setIsScrolling(false),
      });
    }, containerRef);
    return () => { ctx.revert(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [scheduleUpdate, setActiveStep, setStepProgress, setGlobalProgress, setIsScrolling]);

  const globalProgress = progressRef.current;
  const { index, local } = getScene(globalProgress);
  const currentStep = journeySteps[index];
  const scene = SCENES[index];
  const Icon = ICONS[index];
  const stageView = (() => {
    switch (scene.kind) {
      case 'feature': return <FeatureShowcase progress={local} cards={scene.cards!} direction={scene.direction!} />;
      case 'catch': return <Step2CourierHandover progress={local} />;
      case 'warehouse': return <Step3WarehouseTransit progress={local} />;
      case 'air': return <Step4AirLoading progress={local} />;
      case 'handoff': return <Step6LocalCourier progress={local} />;
      default: return <Step7CustomerDelivered progress={local} />;
    }
  })();

  return (
    <div id="delivery-journey-section" ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden select-none">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {journeySteps.map((step, i) => {
          const opacity = Math.max(0, 1 - Math.abs(index + local - i)) * 0.32;
          return opacity > 0.01 ? <img key={i} src={step.backgroundImage} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity, filter: 'brightness(.55) contrast(1.08)' }} /> : null;
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/55" />
      </div>

      <div className="absolute top-0 inset-x-0 z-40 pt-20 px-4 sm:px-12 max-w-7xl mx-auto pointer-events-none">
        <div className="flex items-center justify-between gap-1 sm:gap-2 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl p-2 backdrop-blur-xl shadow-2xl overflow-hidden">
          {journeySteps.map((step, i) => {
            const StageIcon = ICONS[i];
            return <div key={step.stepNumber} className={`flex min-w-0 items-center gap-1.5 px-2 py-1.5 rounded-xl ${i === index ? 'bg-orange-500/20 border border-orange-500/50 text-white' : i < index ? 'text-emerald-400' : 'text-neutral-500 opacity-60'}`}>
              <span className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center ${i === index ? 'bg-orange-500' : 'bg-neutral-800'}`}><StageIcon className="w-3.5 h-3.5" /></span>
              <span className="hidden lg:block min-w-0"><span className="block text-[8px] font-mono tracking-widest uppercase">{step.category}</span><span className="block text-[10px] font-bold truncate max-w-[100px]">{step.headlineOrange}</span></span>
              {i < journeySteps.length - 1 && <ChevronRight className="hidden xl:block w-3 h-3 text-neutral-600" />}
            </div>;
          })}
        </div>
        <div className="mt-3 flex justify-between items-end gap-3">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-extrabold text-orange-300 uppercase tracking-widest bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">Scene {String(index + 1).padStart(2, '0')} · {currentStep.category}</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1 leading-tight">{currentStep.headlineWhite} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">{currentStep.headlineOrange}</span></h2>
          </div>
          <span className="hidden sm:block text-right font-mono text-[10px] text-white/55">{currentStep.subLocation}</span>
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">{stageView}</div>

      <div className="absolute bottom-5 inset-x-0 z-40 px-4 sm:px-12 max-w-7xl mx-auto flex items-center justify-between text-neutral-400 font-mono text-[10px] pointer-events-none">
        <span className="text-white font-bold tracking-wide">{currentStep.badgeText}</span>
        <div className="w-28 sm:w-72 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800"><div className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 rounded-full" style={{ width: `${globalProgress * 100}%` }} /></div>
        <span>{Math.round(globalProgress * 100)}%</span>
      </div>
    </div>
  );
};

export default DeliveryJourney;
