import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import "@/story/story.css";
import { Astronaut, type AstroVariant } from "@/story/characters/Astronaut";
import { idle, rig, setPose, type PoseName } from "@/story/motion";
import { Package, FeatureCard } from "@/story/props/Package";
import { OrderPhone, OrderPopup } from "@/story/props/OrderPhone";
import { CargoPlane, House, PackingTable, Warehouse } from "@/story/props/Scenery";
import { COPY, SHOWCASES, TONES } from "@/story/content";
import { CopyBlock } from "@/story/ui/StageUI";

/**
 * /design — the design board (mockup) for the Jiffy motion site.
 * Everything here is the real component the site uses, so what is approved
 * here is exactly what ships.
 */

const Section = ({ n, title, note, children }: { n: string; title: string; note?: string; children: ReactNode }) => (
  <section className="border-t border-white/[0.06] py-16">
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="font-display text-sm font-semibold text-jiffy-400">{n}</span>
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
    {note && <p className="mt-2 max-w-3xl text-ink-muted">{note}</p>}
    <div className="mt-8">{children}</div>
  </section>
);

const Posed = ({ variant, pose = "rest", happy = false, label }: { variant: AstroVariant; pose?: PoseName; happy?: boolean; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const r = rig(ref.current!);
    setPose(r, pose);
    if (r.handPhone) gsap.set(r.handPhone, { scale: pose === "phone" ? 1 : 0 });
    if (r.phoneNew) gsap.set(r.phoneNew, { opacity: pose === "phone" ? 1 : 0 });
    if (happy) gsap.set([r.eyes, r.mouth], { autoAlpha: 0 }), gsap.set([r.happyEyes, r.mouthOpen], { autoAlpha: 1 });
    const stop = idle(r, Math.random() * 10);
    return stop;
  }, [pose, happy]);
  return (
    <figure className="flex flex-col items-center">
      <div ref={ref} className="h-[260px] w-[174px]">
        <Astronaut variant={variant} name={`board-${variant}-${pose}`} className="h-full w-full overflow-visible" />
      </div>
      <figcaption className="mt-3 text-center text-sm text-ink-muted">{label}</figcaption>
    </figure>
  );
};

const PackageState = ({ state }: { state: "open" | "sealed" | "showcase" }) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current!;
    const p = (n: string) => el.querySelector(`[data-part="${n}"]`);
    gsap.set(el.querySelector(".pkg"), { autoAlpha: 1 });
    gsap.set(el.querySelectorAll("[data-card]"), { autoAlpha: 0 });
    gsap.set(el.querySelectorAll("[data-dots]"), { autoAlpha: 0 });
    if (state === "open") {
      gsap.set(p("tapeTop"), { scaleX: 0 });
      gsap.set(p("tapeFront"), { scaleY: 0 });
      gsap.set(p("label"), { autoAlpha: 0 });
      gsap.set(p("item"), { autoAlpha: 1, yPercent: -40 });
    }
    if (state === "sealed") {
      gsap.set([p("flapBack"), p("flapFront")], { scaleY: 0 });
    }
    if (state === "showcase") {
      gsap.set([p("flapBack"), p("flapFront")], { scaleY: 0 });
      gsap.set([p("decor"), p("tapeFront")], { autoAlpha: 0 });
      gsap.set(el.querySelector("[data-showcase='why'] [data-card]"), { autoAlpha: 1 });
      gsap.set(el.querySelector("[data-dots='why']"), { autoAlpha: 1 });
      gsap.set(el.querySelector("[data-dots='why'] .pkg-dot-fill"), { scale: 1 });
    }
  }, [state]);
  return (
    <div ref={ref} className="board-pkg relative" style={{ ["--box-ar" as string]: 1.6 }}>
      <Package />
    </div>
  );
};

const DesignBoard = () => (
  <div className="min-h-screen bg-night-950 text-ink">
    <style>{`
      .board-pkg .pkg { position: relative; width: 100%; transform: none; visibility: visible; }
      .board-pkg { padding-top: 14%; }
    `}</style>
    <div className="container py-16">
      <Link to="/" className="text-sm text-jiffy-400 hover:underline">
        ← Back to the site
      </Link>
      <h1 className="mt-6 text-[clamp(40px,6vw,84px)] font-bold leading-none">
        Jiffy motion <span className="text-jiffy-500">design board</span>
      </h1>
      <p className="mt-5 max-w-3xl text-lg text-ink-muted">
        A night-time "Jiffy World": deep space-navy stage, Jiffy orange as the hero colour, the live site's violet / blue /
        amber as feature-card tones, and a cast of rigged astronauts built from individual vector parts.
      </p>

      <Section n="01" title="Colour" note="Night stage + Jiffy orange. Card tones come from the live jiffy.world feature blocks.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {[
            ["Night 950", "#06050B"],
            ["Night 800", "#161226"],
            ["Jiffy 500", "#F97316"],
            ["Jiffy 300", "#FDBA74"],
            ["Ink", "#F5F3EE"],
            ["Ink muted", "#A9A4BD"],
            ["Kraft", "#D29A5E"],
            ["Mint", "#34D399"],
          ].map(([n, c]) => (
            <div key={n}>
              <div className="h-20 rounded-2xl border border-white/10" style={{ background: c }} />
              <div className="mt-2 text-sm font-semibold">{n}</div>
              <div className="text-xs text-ink-dim">{c}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {Object.entries(TONES).map(([n, g]) => (
            <div key={n}>
              <div className="h-14 rounded-2xl" style={{ background: g }} />
              <div className="mt-2 text-sm capitalize text-ink-muted">{n}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section n="02" title="Type" note="Outfit (display) echoes the geometric Jiffy wordmark; Inter carries body copy.">
        <div className="space-y-4">
          <div className="font-display text-7xl font-bold leading-none">
            Get it in a <span className="text-jiffy-500">Jiffy.</span>
          </div>
          <div className="font-display text-4xl font-bold">Your Logistics Crew, Always On Duty.</div>
          <p className="max-w-xl text-lg text-ink-muted">
            From dark stores to doorsteps, Jiffy makes quick commerce logistics effortless—delivering products to your
            customers in record time.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="btn-primary">Get Started</span>
            <span className="btn-ghost">Log in</span>
            <span className="eyebrow">Order confirmed</span>
            <span className="chip">Live GPS</span>
          </div>
        </div>
      </Section>

      <Section n="03" title="The crew" note="One rig, three variants. Each breathes, blinks and bobs on its own; scroll drives poses (arms, head, face, hops, walking).">
        <div className="grid grid-cols-2 gap-8 rounded-3xl bg-gradient-to-b from-night-800 to-night-900 p-8 sm:grid-cols-3 lg:grid-cols-6">
          <Posed variant="seller" label="Seller · idle" />
          <Posed variant="seller" pose="phone" happy label="Seller · new order!" />
          <Posed variant="courier" pose="carry" label="Courier · carry" />
          <Posed variant="courier" pose="catch" happy label="Courier · catch" />
          <Posed variant="homemaker" pose="receive" label="Homemaker · receive" />
          <Posed variant="homemaker" pose="cheer" happy label="Homemaker · delivered" />
        </div>
      </Section>

      <Section n="04" title="The package" note="One box travels the whole story. It is drawn at full showcase size and scaled down when carried, so card text stays crisp.">
        <div className="grid gap-10 md:grid-cols-2">
          {(["open", "sealed", "showcase"] as const).map((s) => (
            <div key={s} className={s === "showcase" ? "md:col-span-2 md:mx-auto md:w-3/4" : ""}>
              <PackageState state={s} />
              <div className="mt-4 text-sm capitalize text-ink-muted">{s}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section n="05" title="Feature cards" note="Printed on the box while it holds the centre. 4 + 5 + 5 cards, all copy from jiffy.world.">
        <div className="space-y-10">
          {SHOWCASES.map((sc) => (
            <div key={sc.id}>
              <div className="mb-3 font-display text-lg font-semibold">{sc.label}</div>
              <div className="grid gap-6 lg:grid-cols-2">
                {sc.cards.map((c, i) => (
                  <div key={i} className="relative" style={{ containerType: "inline-size", aspectRatio: "1.6" }}>
                    <div className="absolute inset-0 [&_.fcard]:!visible">
                      <FeatureCard card={c} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section n="06" title="Scenery" note="Each prop is its own SVG with moving parts: roller door, cargo ramp, front door.">
        <div className="grid gap-8 rounded-3xl bg-gradient-to-b from-night-800 to-night-900 p-8 md:grid-cols-2">
          <figure>
            <Warehouse />
            <figcaption className="mt-2 text-sm text-ink-muted">Dark store · roller door</figcaption>
          </figure>
          <figure>
            <House />
            <figcaption className="mt-2 text-sm text-ink-muted">Customer home · front door</figcaption>
          </figure>
          <figure className="md:col-span-2">
            <CargoPlane />
            <figcaption className="mt-2 text-sm text-ink-muted">Jiffy Air Cargo · rear ramp</figcaption>
          </figure>
          <figure className="md:col-span-2 mx-auto w-1/2 pt-10">
            <PackingTable />
            <figcaption className="mt-2 text-sm text-ink-muted">Packing table</figcaption>
          </figure>
        </div>
      </Section>

      <Section n="07" title="Phone, popup & copy" note="The customer's phone places the order on load; the popup flies to the seller; centre copy scrolls between scenes.">
        <div className="grid items-center gap-10 lg:grid-cols-[300px_1fr]">
          <div className="h-[600px] w-[294px]">
            <OrderPhone />
          </div>
          <div className="space-y-10">
            <div className="relative w-[268px] [&_.popup]:!visible [&_.popup]:!relative">
              <OrderPopup />
            </div>
            <div className="relative [&_.copy-block]:!visible [&_.copy-block]:!relative [&_.copy-block]:!transform-none">
              <CopyBlock data={COPY.darkstores} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  </div>
);

export default DesignBoard;
