import gsap from "gsap";

/* =========================================================================
   RIG: pivots + poses for the Astronaut SVG (viewBox 240x360)
   ========================================================================= */

// svgOrigin for every jointed part, in the astronaut's own SVG units.
const PIVOTS: Record<string, string> = {
  root: "120 350",
  legL: "104 262",
  legR: "136 262",
  breath: "120 262",
  armL: "84 186",
  armR: "156 186",
  head: "120 166",
  headIdle: "120 166",
  eyes: "120 112",
  happyEyes: "120 112",
  handPhone: "169 254",
};

export type Rig = Record<string, SVGGElement> & { el: HTMLElement };

/** Collect the named parts of an astronaut inside `el` and pin their pivots. */
export function rig(el: HTMLElement): Rig {
  const parts = { el } as Rig;
  el.querySelectorAll<SVGGElement>("[data-part]").forEach((node) => {
    const name = node.dataset.part!;
    parts[name] = node;
    if (PIVOTS[name]) gsap.set(node, { svgOrigin: PIVOTS[name] });
  });
  return parts;
}

// Arm angles (deg, clockwise) for each pose.
export const POSES = {
  rest: { armL: 0, armR: 0 },
  carry: { armL: -3, armR: 3 },
  phone: { armL: 0, armR: -112 },
  catch: { armL: 128, armR: -128 },
  cheer: { armL: 142, armR: -142 },
  give: { armL: 28, armR: 28 }, // both hands reach to the viewer's left
  receive: { armL: -28, armR: -28 }, // both hands reach to the viewer's right
} as const;
export type PoseName = keyof typeof POSES;

/** Add a pose change to `tl` at `at`. */
export function pose(tl: gsap.core.Timeline, r: Rig, name: PoseName, at: number | string, dur = 0.18, ease = "back.out(1.6)") {
  const p = POSES[name];
  tl.to(r.armL, { rotation: p.armL, duration: dur, ease }, at);
  tl.to(r.armR, { rotation: p.armR, duration: dur, ease }, at);
}

/** Static pose (design board, initial states). */
export function setPose(r: Rig, name: PoseName) {
  const p = POSES[name];
  gsap.set(r.armL, { rotation: p.armL });
  gsap.set(r.armR, { rotation: p.armR });
}

/** Happy face on/off (eyes become ^ ^, mouth opens). */
export function mood(tl: gsap.core.Timeline, r: Rig, happy: boolean, at: number | string, dur = 0.08) {
  tl.to(r.eyes, { autoAlpha: happy ? 0 : 1, duration: dur }, at);
  tl.to(r.happyEyes, { autoAlpha: happy ? 1 : 0, duration: dur }, at);
  tl.to(r.mouth, { autoAlpha: happy ? 0 : 1, duration: dur }, at);
  tl.to(r.mouthOpen, { autoAlpha: happy ? 1 : 0, duration: dur }, at);
}

/** Walk cycle: legs swing, body bobs. `steps` swings over `dur`. */
export function walk(tl: gsap.core.Timeline, r: Rig, at: number | string, dur: number, steps = 6) {
  const step = dur / (steps + 1);
  const w = gsap.timeline();
  for (let i = 0; i < steps; i++) {
    const s = i % 2 === 0 ? 1 : -1;
    w.to(r.legL, { rotation: 17 * s, duration: step, ease: "sine.inOut" }, i * step);
    w.to(r.legR, { rotation: -17 * s, duration: step, ease: "sine.inOut" }, i * step);
    w.to(r.root, { y: -6, duration: step / 2, ease: "sine.out", yoyo: true, repeat: 1 }, i * step);
  }
  w.to([r.legL, r.legR], { rotation: 0, duration: step, ease: "sine.out" }, steps * step);
  tl.add(w, at);
}

/** Small celebratory hop(s). */
export function hop(tl: gsap.core.Timeline, r: Rig, at: number | string, times = 2, height = 18, dur = 0.12) {
  const h = gsap.timeline();
  for (let i = 0; i < times; i++) {
    h.to(r.root, { y: -height, duration: dur, ease: "power2.out" });
    h.to(r.root, { y: 0, duration: dur, ease: "power2.in" });
  }
  tl.add(h, at);
}

/** Squash on landing/catching. */
export function squash(tl: gsap.core.Timeline, r: Rig, at: number | string) {
  tl.fromTo(r.root, { scaleX: 1, scaleY: 1 }, { scaleX: 1.06, scaleY: 0.92, duration: 0.05, ease: "power2.out", immediateRender: false }, at);
  tl.to(r.root, { scaleX: 1, scaleY: 1, duration: 0.12, ease: "elastic.out(1, 0.45)" }, `>`);
}

/** Time-based life: breathing, blinking, head bob, beacon. Independent of scroll. */
export function idle(r: Rig, seed = 0) {
  const rnd = (a: number, b: number) => a + ((Math.sin(seed * 9.13 + a * 3.7) + 1) / 2) * (b - a);
  const tls: gsap.core.Animation[] = [];
  tls.push(gsap.to(r.breath, { y: -2.6, duration: rnd(1.4, 1.8), ease: "sine.inOut", yoyo: true, repeat: -1 }));
  tls.push(gsap.to(r.headIdle, { rotation: 2.4, y: -1.5, duration: rnd(2.6, 3.4), ease: "sine.inOut", yoyo: true, repeat: -1, delay: rnd(0, 0.8) }));
  const blink = gsap.timeline({ repeat: -1, repeatDelay: rnd(2.2, 3.6), delay: rnd(0.5, 2) });
  blink.to(r.eyes, { scaleY: 0.08, duration: 0.07, ease: "power1.in" }).to(r.eyes, { scaleY: 1, duration: 0.1, ease: "power1.out" });
  tls.push(blink);
  if (r.beacon) tls.push(gsap.to(r.beacon, { opacity: 0.35, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: -1 }));
  return () => tls.forEach((t) => t.kill());
}

/* =========================================================================
   STAGE ANCHORS
   Every hand-off reads live element positions each frame, so the package
   always lands exactly on the hand / table / door it is meant for — at any
   viewport size and whatever else is moving.
   ========================================================================= */

export type Pt = { x: number; y: number };

export class Stage {
  constructor(public el: HTMLElement) {}

  q<T extends Element = HTMLElement>(sel: string): T {
    const n = this.el.querySelector<T>(sel);
    if (!n) throw new Error(`Stage element not found: ${sel}`);
    return n;
  }
  anchor(name: string) {
    return this.q<Element>(`[data-anchor="${name}"]`);
  }

  get w() {
    return this.el.clientWidth;
  }
  get h() {
    return this.el.clientHeight;
  }

  /** Center of an element, in stage pixels. */
  center(el: Element): Pt {
    const r = el.getBoundingClientRect();
    const s = this.el.getBoundingClientRect();
    return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
  }
  /** Top-center of an element, in stage pixels. */
  topCenter(el: Element): Pt {
    const r = el.getBoundingClientRect();
    const s = this.el.getBoundingClientRect();
    return { x: r.left - s.left + r.width / 2, y: r.top - s.top };
  }
}

/** A target position for a moving thing of scale `s` (lets surfaces align the thing's bottom). */
export type Anchor = (s: number) => Pt;

interface Segment {
  at: number;
  dur: number;
  ease: (k: number) => number;
  apply: (k: number) => void;
}

/**
 * Moves one element (the package, the popup) through a list of segments.
 * Position is a pure function of timeline time and is rendered from the
 * master timeline's onUpdate — i.e. after every other tween this frame — so
 * whatever it follows has already moved and there is no one-frame lag.
 */
export class Mover {
  private set: (v: gsap.TweenVars) => void;
  private segs: Segment[] = [];

  constructor(public stage: Stage, public el: HTMLElement) {
    gsap.set(el, { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" });
    this.set = gsap.quickSetter(el, "css") as (v: gsap.TweenVars) => void;
  }

  place(p: Pt, s: number, rot = 0) {
    this.set({ x: p.x, y: p.y, scaleX: s, scaleY: s, rotation: rot });
  }

  /** Render the segment active at time `t` (or the nearest one). */
  render(t: number) {
    if (!this.segs.length) return;
    let seg = this.segs[0];
    for (const s of this.segs) {
      if (s.at <= t) seg = s;
      else break;
    }
    const k = seg.dur > 0 ? Math.min(Math.max((t - seg.at) / seg.dur, 0), 1) : 1;
    seg.apply(seg.ease(k));
  }

  private push(at: number, dur: number, ease: string, apply: (k: number) => void) {
    this.segs.push({ at, dur, ease: gsap.parseEase(ease), apply });
    this.segs.sort((a, b) => a.at - b.at);
  }

  /** Anchor at an element's center. */
  on(el: () => Element): Anchor {
    return () => this.stage.center(el());
  }
  /** Anchor resting on top of a surface element (bottom of the mover touches it). */
  onTop(el: () => Element, nudge = 0): Anchor {
    return (s) => {
      const p = this.stage.topCenter(el());
      return { x: p.x, y: p.y - (this.el.offsetHeight * s) / 2 + nudge };
    };
  }
  /** Fixed point, as fractions of the stage. */
  at(fx: number, fy: number): Anchor {
    return () => ({ x: this.stage.w * fx, y: this.stage.h * fy });
  }

  /**
   * Fly along an arc from one anchor to another. The arc is a quadratic curve
   * whose control point sits `lift` stage-heights above the higher endpoint,
   * so right→center and center→left flights are exact mirror images.
   */
  fly(
    at: number,
    dur: number,
    o: { from: Anchor; to: Anchor; s0: () => number; s1: () => number; lift?: number; tilt?: number; ease?: string },
  ) {
    const lift = o.lift ?? 0.22;
    const tilt = o.tilt ?? 0;
    this.push(at, dur, o.ease ?? "power2.inOut", (k) => {
      const sa = o.s0();
      const sb = o.s1();
      const s = sa + (sb - sa) * k;
      const a = o.from(sa);
      const b = o.to(sb);
      const c = { x: (a.x + b.x) / 2, y: Math.min(a.y, b.y) - this.stage.h * lift };
      const u = 1 - k;
      this.place(
        { x: u * u * a.x + 2 * u * k * c.x + k * k * b.x, y: u * u * a.y + 2 * u * k * c.y + k * k * b.y },
        s,
        Math.sin(Math.min(Math.max(k, 0), 1) * Math.PI) * tilt,
      );
    });
  }

  /** Stay locked to a (possibly moving) anchor. */
  hold(at: number, dur: number, o: { to: Anchor; s: () => number }) {
    this.push(at, dur, "none", () => {
      const s = o.s();
      this.place(o.to(s), s);
    });
  }
}
