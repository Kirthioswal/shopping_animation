import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package, Bike, Warehouse, Plane, CheckCircle2, ChevronRight, Sparkles, MapPin } from 'lucide-react';
import { journeySteps } from '@/data/journeySteps';
import { useScrollStore } from '@/stores/scrollStore';
import { DeliveryPackage } from './DeliveryPackage';
import { Step2CourierHandover } from './stages/Step2CourierHandover';
import { Step3WarehouseTransit } from './stages/Step3WarehouseTransit';
import { Step4AirLoading } from './stages/Step4AirLoading';
import { Step6LocalCourier } from './stages/Step6LocalCourier';
import { Step7CustomerDelivered } from './stages/Step7CustomerDelivered';
import { useViewportCoordinates } from '@/hooks/useViewportCoordinates';
import { packageFocusScale, smootherstep } from '@/utils/viewportCoordinates';

gsap.registerPlugin(ScrollTrigger);

class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Delivery scene failed to render:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-neutral-950 px-6 text-center">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-orange-300">Shipment in progress</p>
            <p className="mt-3 text-lg font-semibold text-white">Continue scrolling to see the next delivery update.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Scene lengths follow the storyboard's relative scroll budgets.
const SCENES = [
  { weight: 4, kind: 'packageCards' },
  { weight: 1.8, kind: 'catch' },
  { weight: 2.6, kind: 'warehouse' },
  { weight: 4.5, kind: 'feature', cards: ['Streamline business processes', 'Bring your favorite tools and AI helpers together', 'AI for business', 'Make working with integrations easier than ever'], direction: 'left' as const },
  { weight: 2.6, kind: 'air' },
  { weight: 4.5, kind: 'feature', cards: ['Step 1: Sign Up', 'Step 2: Setup Store', 'Step 3: Dark Store Stockup', 'Step 4: Shipment is Ready', 'Step 5: Track & Scale'], direction: 'right' as const },
  { weight: 1.6, kind: 'handoff' },
  { weight: 3, kind: 'delivered' },
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
  const coords = useViewportCoordinates();
  // One deliberate side-to-side pass per scene. Ease into the center, pause
  // there for the product moment, then ease out to the opposite side.
  const startsOnLeft = direction === 'right';
  const startX = startsOnLeft ? coords.LEFT_POSITION : coords.RIGHT_POSITION;
  const endX = startsOnLeft ? coords.RIGHT_POSITION : coords.LEFT_POSITION;
  const centerIn = 0.42;
  const centerOut = 0.60;
  const x = progress < centerIn
    ? startX * (1 - smootherstep(progress / centerIn))
    : progress <= centerOut
      ? 0
      : endX * smootherstep((progress - centerOut) / (1 - centerOut));
  const scale = packageFocusScale(x, coords);
  const centerProximity = 1 - Math.min(1, Math.abs(x) / Math.max(Math.abs(coords.LEFT_POSITION), Math.abs(coords.RIGHT_POSITION)));
  const cardPosition = progress * cards.length;
  const cardIndex = Math.min(cards.length - 1, Math.floor(cardPosition));
  const cardPhase = cardPosition - Math.floor(cardPosition);
  const cardFade = smootherstep(Math.min(1, cardPhase / 0.2))
    * smootherstep(Math.min(1, (1 - cardPhase) / 0.2));
  const cardOpacity = Math.max(0, cardFade) * (1 - centerProximity * 0.72);
  const copyOnLeft = startsOnLeft;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_54%,rgba(249,115,22,0.08),transparent_56%)]" />
      <div className="absolute inset-x-0 bottom-[16%] h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />
      <div className={`absolute top-1/2 -translate-y-1/2 w-[min(40vw,460px)] px-5 sm:px-10 ${copyOnLeft ? 'left-0 sm:left-[4%] text-left' : 'right-0 sm:right-[4%] text-right'}`}>
        <div className="mb-3 text-[9px] sm:text-xs font-mono uppercase tracking-[0.24em] text-orange-300" style={{ opacity: cardOpacity }}>Jiffy · {String(cardIndex + 1).padStart(2, '0')}</div>
        <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,.8)]" style={{ opacity: cardOpacity, transform: `translate3d(0,${(1 - cardOpacity) * 10}px,0)` }}>{cards[cardIndex]}</div>
        <div className={`mt-5 flex gap-1.5 ${copyOnLeft ? '' : 'justify-end'}`} aria-hidden="true">
          {cards.map((card, i) => <span key={card} className={`h-1 rounded-full ${i === cardIndex ? 'w-8 bg-orange-400' : 'w-2 bg-white/30'}`} />)}
        </div>
      </div>
      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ transform: `translate3d(calc(-50% + ${x}px), -50%, 0)`, willChange: 'transform' }}
      >
        <DeliveryPackage scale={scale} className="!transition-none drop-shadow-[0_18px_40px_rgba(0,0,0,.65)]" />
      </div>
      <div className="absolute bottom-[12%] inset-x-0 text-center text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">Follow the parcel</div>
    </div>
  );
};

const PACKAGE_STORY_CARDS = [
  { label: 'ORDER CONFIRMED', title: 'Your order is in.', description: 'Jiffy has received your order and tracking is live.', Icon: CheckCircle2 },
  { label: 'PACKED & SEALED', title: 'Packed with care.', description: 'Your parcel is protected and ready for its journey.', Icon: Package },
  { label: 'COURIER ASSIGNED', title: 'A rider is on the way.', description: 'A delivery partner is ready to take your package.', Icon: Bike },
  { label: 'OUT FOR DELIVERY', title: 'Almost at your door.', description: 'Your shipment is on the final route to its destination.', Icon: MapPin },
];

const PackageCardShowcase: React.FC<{ progress: number }> = ({ progress }) => {
  const coords = useViewportCoordinates();
  const position = Math.min(PACKAGE_STORY_CARDS.length - 1, progress * (PACKAGE_STORY_CARDS.length - 1));
  const fromIndex = Math.floor(position);
  const toIndex = Math.min(PACKAGE_STORY_CARDS.length - 1, fromIndex + 1);
  const blend = smootherstep(position - fromIndex);
  const packageScale = coords.isMobile ? 0.76 : 1.1;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_68%,rgba(249,115,22,0.12),transparent_48%)]" />

      <div className="absolute left-1/2 top-[31%] w-[min(88vw,620px)] -translate-x-1/2">
        {PACKAGE_STORY_CARDS.map((card, index) => {
          const opacity = index === fromIndex ? 1 - blend : index === toIndex ? blend : 0;
          if (opacity < 0.01) return null;
          const Icon = card.Icon;

          return (
            <div
              key={card.label}
              className="absolute inset-x-0 top-0 rounded-2xl border border-white/15 bg-neutral-950/90 p-4 shadow-[0_18px_60px_rgba(0,0,0,.55)] backdrop-blur-xl sm:rounded-3xl sm:p-6"
              style={{ opacity, transform: `translate3d(0,${(1 - opacity) * 12}px,0)` }}
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-500/15 text-orange-300 sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[9px] font-mono font-bold tracking-[0.2em] text-orange-300 sm:text-[11px]">{card.label}</p>
                    <span className="shrink-0 text-[9px] font-mono text-white/45 sm:text-[10px]">{String(index + 1).padStart(2, '0')} / 04</span>
                  </div>
                  <h3 className="mt-1 text-lg font-extrabold leading-tight text-white sm:text-2xl">{card.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-300 sm:mt-2 sm:text-sm">{card.description}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1.5 sm:mt-5" aria-hidden="true">
                {PACKAGE_STORY_CARDS.map((item, dotIndex) => (
                  <span key={item.label} className={`h-1 rounded-full transition-[width,background-color] duration-200 ${dotIndex === index ? 'w-8 bg-orange-400' : 'w-2 bg-white/25'}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="absolute left-1/2 top-[70%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ transform: `translate3d(-50%, calc(-50% + ${Math.sin(progress * Math.PI * 3) * 5}px), 0)` }}
      >
        <DeliveryPackage scale={packageScale} className="drop-shadow-[0_18px_40px_rgba(0,0,0,.7)]" />
      </div>

      <div className="absolute bottom-[12%] inset-x-0 text-center text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase sm:text-[10px]">Scroll to follow your order</div>
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
        end: '+=2100%',
        pin: true,
        scrub: 1.35,
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
      case 'packageCards': return <PackageCardShowcase progress={local} />;
      case 'feature': return <FeatureShowcase progress={local} cards={scene.cards!} direction={scene.direction!} />;
      case 'catch': return <Step2CourierHandover progress={local} />;
      case 'warehouse': return <Step3WarehouseTransit progress={local} />;
      case 'air': return <Step4AirLoading progress={local} />;
      case 'handoff': return <Step6LocalCourier progress={local} />;
      default: return <Step7CustomerDelivered progress={local} />;
    }
  })();

  return (
    <div id="delivery-journey-section" ref={containerRef} className="relative w-full h-screen scroll-mt-24 bg-black overflow-hidden select-none">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {scene.kind !== 'feature' && journeySteps.map((step, i) => {
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

      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <SceneErrorBoundary key={index}>{stageView}</SceneErrorBoundary>
      </div>

      <div className="absolute bottom-5 inset-x-0 z-40 px-4 sm:px-12 max-w-7xl mx-auto flex items-center justify-between text-neutral-400 font-mono text-[10px] pointer-events-none">
        <span className="text-white font-bold tracking-wide">{currentStep.badgeText}</span>
        <div className="w-28 sm:w-72 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800"><div className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 rounded-full" style={{ width: `${globalProgress * 100}%` }} /></div>
        <span>{Math.round(globalProgress * 100)}%</span>
      </div>
    </div>
  );
};

export default DeliveryJourney;
