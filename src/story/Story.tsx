import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import "./story.css";
import { COPY } from "./content";
import { Astronaut } from "./characters/Astronaut";
import { OrderPhone, OrderPopup } from "./props/OrderPhone";
import { Package } from "./props/Package";
import { CargoPlane, House, PackingTable, Warehouse } from "./props/Scenery";
import { Backdrop, CopyBlock, HeroBlock, JourneyHud, ScrollHint } from "./ui/StageUI";
import { buildStory } from "./timeline";
import { buildIntro } from "./intro";

gsap.registerPlugin(ScrollTrigger);

const CONFETTI_COLORS = ["#F97316", "#FDBA74", "#7C5CFC", "#34D399", "#F472B6", "#FACC15", "#60A5FA"];

/**
 * The pinned, scroll-driven story stage. Layers (back → front):
 * backdrop · buildings/vehicles · characters + phone · center copy ·
 * dim/spotlight · package · popup · effects · HUD.
 */
const Story = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let story: ReturnType<typeof buildStory> | undefined;
    let intro: ReturnType<typeof buildIntro> | undefined;
    const ctx = gsap.context(() => {
      story = buildStory(stage, { reduce });
      intro = buildIntro(stage, { reduce });
      story.setIntro(intro.tl);
    }, stage);

    // fonts change text metrics → re-measure once they are in
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      intro?.cleanup();
      story?.cleanup();
      ctx.revert();
    };
  }, []);

  return (
    <section id="story" aria-label="Follow a Jiffy order from tap to doorstep">
      <div ref={stageRef} className="stage">
        <Backdrop />

        {/* buildings & vehicles */}
        <div className="stage-layer" style={{ zIndex: 10 }}>
          <div className="slot slot-warehouse">
            <div className="actor" data-actor="warehouse">
              <Warehouse />
            </div>
          </div>
          <div className="slot slot-house">
            <div className="actor" data-actor="house">
              <House />
            </div>
          </div>
          <div className="slot slot-plane">
            <div className="actor" data-actor="plane">
              <CargoPlane />
            </div>
          </div>
        </div>

        {/* characters & the customer's phone */}
        <div className="stage-layer" style={{ zIndex: 20 }}>
          <div className="slot slot-char slot-homemaker">
            <div className="actor" data-actor="homemaker">
              <Astronaut variant="homemaker" name="homemaker" />
            </div>
          </div>
          <div className="slot slot-char slot-l">
            <div className="actor" data-actor="courier">
              <Astronaut variant="courier" name="courier" />
            </div>
          </div>
          <div className="slot slot-char slot-r">
            <div className="actor" data-actor="seller">
              <Astronaut variant="seller" name="seller" />
            </div>
          </div>
          <div className="slot slot-table">
            <div className="actor" data-actor="table">
              <PackingTable />
            </div>
          </div>
          <div className="slot slot-phone">
            <div className="actor" data-actor="phone">
              <div data-phone-intro className="h-full w-full">
                <OrderPhone />
              </div>
            </div>
          </div>
        </div>

        {/* center copy */}
        <div className="copy-col">
          <HeroBlock />
          {Object.values(COPY).map((c) => (
            <CopyBlock key={c.id} data={c} />
          ))}
        </div>

        <div className="dim" data-dim />
        <div className="spot" data-spot />

        <Package />
        <OrderPopup />

        <div className="fx-layer" aria-hidden="true">
          {Array.from({ length: 26 }, (_, i) => (
            <span
              key={i}
              data-confetti
              className="confetti"
              style={{ background: CONFETTI_COLORS[i % CONFETTI_COLORS.length], borderRadius: i % 3 === 0 ? "999px" : 2 }}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <svg key={i} data-heart className="heart" viewBox="0 0 24 24">
              <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.2 0 3.6 1.2 4.4 2.5.8-1.3 2.2-2.5 4.4-2.5 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21z" fill={i === 1 ? "#F472B6" : "#F97316"} />
            </svg>
          ))}
          <div data-badge className="absolute left-0 top-0 flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 font-display text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(34,197,94,0.7)]" style={{ visibility: "hidden" }}>
            <CheckCircle2 className="h-4 w-4" /> Delivered in 30 min
          </div>
        </div>

        <JourneyHud />
        <ScrollHint />
      </div>
    </section>
  );
};

export default Story;
