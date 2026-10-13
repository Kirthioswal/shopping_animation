import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MILESTONES, SHOWCASES } from "./content";
import { Mover, Stage, hop, idle, mood, pose, rig, squash, walk, type Rig } from "./motion";
import { registerStory } from "./scroll";

gsap.registerPlugin(ScrollTrigger);

/*
 * THE STORY — one pinned stage, one scroll-scrubbed timeline.
 * 1 timeline unit = 1 viewport height of scrolling.
 *
 *  S1  0.0  order confirmed: popup flies phone → seller's phone (right)
 *  S2  1.6  seller packs + tapes the box on his table
 *  S3  3.35 box flies right → center, 4 "Why Jiffy" cards
 *  S4  7.6  box flies center → left, courier catches it
 *  S5  9.0  warehouse slides in, courier carries the box inside
 *  S6 11.0  box comes out → center, 5 "Platform" cards
 *  S7 15.6  box → right into the cargo plane, plane takes off
 *  S8 17.85 plane lands, box → center, 5 "How to Jiffy" cards
 *  S9 22.65 box → left to the courier
 *  S10 23.8 house slides in, courier hands the box to the homemaker
 */
export const TOTAL = 27;
export const MOMENTS = { why: 4.2, platform: 12.1, how: 19.5, delivered: 25.2 };

const CONFETTI = 26;

export function buildStory(root: HTMLElement, opts: { reduce: boolean }) {
  const S = new Stage(root);
  const actor = (n: string) => S.q<HTMLElement>(`[data-actor="${n}"]`);
  const part = <T extends Element = HTMLElement>(scope: Element, n: string) => scope.querySelector(`[data-part="${n}"]`) as T;
  const all = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

  // ---- cast ----------------------------------------------------------------
  const seller = rig(actor("seller"));
  const courier = rig(actor("courier"));
  const homemaker = rig(actor("homemaker"));
  const phoneA = actor("phone");
  const tableA = actor("table");
  const whA = actor("warehouse");
  const houseA = actor("house");
  const planeA = actor("plane");
  const whDoor = part<SVGGElement>(whA, "door");
  const houseDoor = part<SVGGElement>(houseA, "door");
  const ramp = part<SVGGElement>(planeA, "ramp");
  gsap.set(whDoor, { svgOrigin: "264 178" });
  gsap.set(houseDoor, { svgOrigin: "194 272" });
  gsap.set(ramp, { svgOrigin: "240 300" });
  gsap.set([seller.el, courier.el, homemaker.el, tableA, whA, houseA, planeA, phoneA], { transformOrigin: "50% 100%" });

  const pkgEl = S.q<HTMLElement>("[data-pkg]");
  const pk = {
    flapBack: part(pkgEl, "flapBack"),
    flapFront: part(pkgEl, "flapFront"),
    tapeTop: part(pkgEl, "tapeTop"),
    tapeFront: part(pkgEl, "tapeFront"),
    decor: part(pkgEl, "decor"),
    label: part(pkgEl, "label"),
    item: part(pkgEl, "item"),
    tapeGun: part(pkgEl, "tapeGun"),
  };
  const popEl = S.q<HTMLElement>("[data-popup]");
  const pkg = new Mover(S, pkgEl);
  const pop = new Mover(S, popEl);

  const dim = S.q("[data-dim]");
  const spot = S.q("[data-spot]");
  const hint = S.q("[data-scroll-hint] > div");
  const block = (id: string) => S.q(`[data-copy="${id}"]`);
  const inner = (id: string) => block(id).firstElementChild as HTMLElement;

  // ---- sizes & anchors (read live) ---------------------------------------
  const small = () => (seller.el.offsetWidth * 0.38) / pkgEl.offsetWidth;
  const one = () => 1;
  const anchorEl = (n: string) => () => S.anchor(n);
  const A = {
    table: pkg.onTop(anchorEl("table-top")),
    center: pkg.at(0.5, 0.5),
    courier: pkg.on(anchorEl("courier-hands")),
    homemaker: pkg.on(anchorEl("homemaker-hands")),
    whDoor: pkg.on(anchorEl("wh-door")),
    ramp: pkg.on(anchorEl("plane-ramp")),
    hold: pkg.on(anchorEl("plane-hold")),
    phoneTop: pop.on(anchorEl("phone-top")),
    sellerPhone: pop.on(anchorEl("seller-phone")),
  };
  const courierScale = () => small() * (gsap.getProperty(courier.el, "scale") as number);

  // ---- timeline ------------------------------------------------------------
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });
  const W = () => S.w;
  const H = () => S.h;

  // Initial state. Applied directly (not as t=0 sets, which a paused,
  // scrubbed timeline would revert) and re-applied on every refresh so
  // offscreen offsets are re-measured for the new viewport.
  const initial = () => {
    gsap.set(seller.el, { x: () => W() * 0.6 });
    gsap.set(tableA, { x: () => W() * 0.6 });
    gsap.set(courier.el, { x: () => -W() * 0.6, autoAlpha: 1, scale: 1, y: 0 });
    gsap.set(homemaker.el, { autoAlpha: 0, scale: 0.88 });
    gsap.set([whA, houseA], { x: () => -W() * 0.85 });
    gsap.set(planeA, { x: () => W() * 0.9, y: () => -H() * 0.4, rotation: -10 });
    gsap.set(phoneA, { x: 0, rotation: 0 });
    gsap.set([whDoor], { scaleY: 1 });
    gsap.set([houseDoor], { scaleX: 1 });
    gsap.set(ramp, { rotation: 0 });
    gsap.set([pkgEl, popEl], { autoAlpha: 0 });
    gsap.set([dim, spot], { opacity: 0 });
    gsap.set(all("[data-copy]:not([data-copy='hero'])"), { autoAlpha: 0 });
    gsap.set(block("hero"), { autoAlpha: 1 });
    gsap.set(inner("hero"), { y: 0 });
    for (const r of [seller, courier, homemaker]) {
      gsap.set([r.armL, r.armR, r.head], { rotation: 0 });
      gsap.set([r.eyes, r.mouth], { autoAlpha: 1 });
      gsap.set([r.happyEyes, r.mouthOpen], { autoAlpha: 0 });
    }
    gsap.set(seller.handPhone, { scale: 0 });
    gsap.set(seller.phoneNew, { opacity: 0 });
    gsap.set([pk.flapBack, pk.flapFront], { scaleY: 1 });
    gsap.set(pk.tapeTop, { scaleX: 0 });
    gsap.set(pk.tapeFront, { scaleY: 0, autoAlpha: 1 });
    gsap.set(pk.label, { autoAlpha: 0 });
    gsap.set(pk.item, { autoAlpha: 0, yPercent: -160 });
    gsap.set(pk.tapeGun, { autoAlpha: 0, xPercent: 0 });
    gsap.set(pk.decor, { autoAlpha: 1 });
    gsap.set(all("[data-card]"), { autoAlpha: 0 });
    gsap.set(all("[data-dots]"), { autoAlpha: 0 });
    gsap.set(all(".pkg-dot-fill"), { scale: 0 });
  };
  initial();

  // ---- helpers -------------------------------------------------------------
  const copyIn = (id: string, at: number, dur = 0.45) => {
    tl.fromTo(block(id), { autoAlpha: 0 }, { autoAlpha: 1, duration: dur * 0.6 }, at);
    tl.fromTo(inner(id), { y: () => H() * 0.22 }, { y: 0, duration: dur, ease: "power2.out" }, at);
  };
  const copyOut = (id: string, at: number, dur = 0.4) => {
    tl.to(inner(id), { y: () => -H() * 0.22, duration: dur, ease: "power2.in" }, at);
    tl.to(block(id), { autoAlpha: 0, duration: dur * 0.6 }, at + dur * 0.4);
  };
  const enter = (el: HTMLElement, from: "l" | "r", at: number, dur = 0.5) =>
    tl.fromTo(el, { x: () => (from === "l" ? -1 : 1) * W() * 0.6 }, { x: 0, duration: dur, ease: "power2.out" }, at);
  const dimIn = (at: number) => tl.to([dim, spot], { opacity: 1, duration: 0.45 }, at);
  const dimOut = (at: number) => tl.to([dim, spot], { opacity: 0, duration: 0.45 }, at);
  const wave = (r: Rig, at: number, times = 3) => {
    const w = gsap.timeline();
    w.to(r.armR, { rotation: -135, duration: 0.1, ease: "power2.out" });
    for (let i = 0; i < times; i++) w.to(r.armR, { rotation: i % 2 ? -135 : -108, duration: 0.07, ease: "sine.inOut" });
    tl.add(w, at);
  };

  /** Feature cards appear and disappear one by one on the box face. */
  const showcase = (id: string, at: number, per: number) => {
    const sc = S.q(`[data-showcase="${id}"]`);
    const dots = S.q(`[data-dots="${id}"]`);
    const cards = Array.from(sc.querySelectorAll<HTMLElement>("[data-card]"));
    const fills = Array.from(dots.querySelectorAll<HTMLElement>(".pkg-dot-fill"));
    tl.to(pk.decor, { autoAlpha: 0, duration: 0.12 }, at - 0.15);
    tl.to(pk.tapeFront, { autoAlpha: 0, duration: 0.12 }, at - 0.15);
    tl.to(dots, { autoAlpha: 1, duration: 0.1 }, at - 0.05);
    cards.forEach((c, i) => {
      const t0 = at + i * per;
      tl.fromTo(
        c,
        { autoAlpha: 0, yPercent: 10, rotation: -2.5, scale: 0.94 },
        { autoAlpha: 1, yPercent: 0, rotation: 0, scale: 1, duration: 0.2, ease: "back.out(1.4)" },
        t0,
      );
      tl.to(fills[i], { scale: 1, duration: 0.12, ease: "back.out(2)" }, t0 + 0.05);
      tl.to(c, { autoAlpha: 0, yPercent: -10, scale: 0.97, duration: 0.16, ease: "power2.in" }, t0 + per - 0.18);
    });
    const end = at + cards.length * per;
    tl.to(dots, { autoAlpha: 0, duration: 0.1 }, end - 0.02);
    tl.to(pk.decor, { autoAlpha: 1, duration: 0.12 }, end);
    tl.to(pk.tapeFront, { autoAlpha: 1, duration: 0.12 }, end);
    return end;
  };

  // ======================= S1 · ORDER CONFIRMED =============================
  tl.to(hint, { autoAlpha: 0, duration: 0.12 }, 0);
  tl.to(inner("hero"), { y: () => -H() * 0.3, duration: 0.5, ease: "power1.in" }, 0.05);
  tl.to(block("hero"), { autoAlpha: 0, duration: 0.3 }, 0.25);

  enter(seller.el, "r", 0.05, 0.55);
  walk(tl, seller, 0.05, 0.55, 6);

  tl.to(popEl, { autoAlpha: 1, duration: 0.08 }, 0.15);
  pop.fly(0.15, 0.2, { from: A.phoneTop, to: A.phoneTop, s0: () => 0.55, s1: one, lift: 0, ease: "back.out(2)" });
  pop.hold(0.35, 0.1, { to: A.phoneTop, s: one });

  pose(tl, seller, "phone", 0.5, 0.2);
  tl.to(seller.handPhone, { scale: 1, duration: 0.15, ease: "back.out(2)" }, 0.52);
  tl.to(seller.head, { rotation: 6, duration: 0.2 }, 0.55);

  pop.fly(0.45, 0.6, { from: A.phoneTop, to: A.sellerPhone, s0: one, s1: () => 0.13, lift: 0.3, tilt: 8 });
  tl.to(popEl, { autoAlpha: 0, duration: 0.06 }, 1.02);
  tl.to(seller.phoneNew, { opacity: 1, duration: 0.05 }, 1.0);
  mood(tl, seller, true, 1.06);
  hop(tl, seller, 1.08, 2, 16, 0.08);
  mood(tl, seller, false, 1.5);

  copyIn("crew", 0.55);

  // ======================= S2 · PACKING =====================================
  tl.to(phoneA, { x: () => -W() * 0.6, rotation: -12, duration: 0.45, ease: "power2.in" }, 1.55);
  tl.to(seller.handPhone, { scale: 0, duration: 0.12 }, 1.6);
  pose(tl, seller, "rest", 1.6, 0.16, "power2.out");
  tl.to(seller.head, { rotation: 0, duration: 0.16 }, 1.6);
  enter(tableA, "r", 1.62, 0.35);
  copyOut("crew", 1.95);

  tl.to(pkgEl, { autoAlpha: 1, duration: 0.04 }, 1.9);
  pkg.fly(1.9, 0.15, { from: A.table, to: A.table, s0: () => small() * 0.3, s1: small, lift: 0, ease: "back.out(2)" });
  pkg.hold(2.05, 1.3, { to: A.table, s: small });

  tl.fromTo(pk.item, { autoAlpha: 1, yPercent: -160 }, { yPercent: 40, duration: 0.3, ease: "power2.in" }, 2.05);
  tl.set(pk.item, { autoAlpha: 0 }, 2.36);
  tl.to(seller.head, { rotation: -4, duration: 0.15 }, 2.05);
  tl.to(pk.flapFront, { scaleY: 0, duration: 0.14, ease: "power2.in" }, 2.4);
  tl.to(pk.flapBack, { scaleY: 0, duration: 0.14, ease: "power2.in" }, 2.5);

  copyIn("packed", 2.25);

  tl.to(seller.armL, { rotation: -45, duration: 0.12, ease: "power2.out" }, 2.55);
  tl.set(pk.tapeGun, { autoAlpha: 1 }, 2.65);
  tl.fromTo(pk.tapeGun, { xPercent: 0 }, { xPercent: 410, duration: 0.45 }, 2.65);
  tl.fromTo(pk.tapeTop, { scaleX: 0 }, { scaleX: 1, duration: 0.45 }, 2.65);
  tl.to(seller.armL, { rotation: -95, duration: 0.45 }, 2.67);
  tl.to(pk.tapeGun, { autoAlpha: 0, duration: 0.05 }, 3.1);
  tl.fromTo(pk.tapeFront, { scaleY: 0 }, { scaleY: 1, duration: 0.1 }, 3.08);
  pose(tl, seller, "rest", 3.12, 0.12, "power2.out");
  tl.to(seller.head, { rotation: 0, duration: 0.12 }, 3.12);
  tl.fromTo(pk.label, { autoAlpha: 0, scale: 1.5, rotation: -10 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.12, ease: "back.out(2)" }, 3.15);
  mood(tl, seller, true, 3.2);
  hop(tl, seller, 3.2, 1, 14, 0.08);
  mood(tl, seller, false, 3.5);

  // ======================= S3 · SHOWCASE "WHY JIFFY" ========================
  copyOut("packed", 3.25);
  pose(tl, seller, "catch", 3.3, 0.12, "power3.out");
  pkg.fly(3.35, 0.8, { from: A.table, to: A.center, s0: small, s1: one, lift: 0.3, tilt: -8 });
  dimIn(3.45);
  pose(tl, seller, "rest", 3.62, 0.15, "power2.out");
  wave(seller, 3.8);
  pose(tl, seller, "rest", 4.2, 0.12, "power2.out");
  pkg.hold(4.15, 3.45, { to: A.center, s: one });
  showcase("why", MOMENTS.why, 0.8); // → 7.4

  // ======================= S4 · THE CATCH ===================================
  enter(courier.el, "l", 7.1, 0.5);
  walk(tl, courier, 7.1, 0.5, 6);
  pkg.fly(7.6, 0.8, { from: A.center, to: A.courier, s0: one, s1: small, lift: 0.3, tilt: 8 });
  dimOut(7.65);
  pose(tl, courier, "catch", 7.95, 0.15);
  pose(tl, courier, "carry", 8.38, 0.08, "power2.out");
  squash(tl, courier, 8.38);
  mood(tl, courier, true, 8.38);
  mood(tl, courier, false, 8.85);
  pkg.hold(8.4, 2.6, { to: A.courier, s: courierScale });
  copyIn("pickup", 8.2);
  copyOut("pickup", 9.15);

  // ======================= S5 · INTO THE WAREHOUSE ==========================
  enter(whA, "l", 9.0, 0.5);
  tl.to(whDoor, { scaleY: 0.06, duration: 0.25, ease: "power1.inOut" }, 9.5);
  walk(tl, courier, 9.8, 0.55, 5);
  tl.to(
    courier.el,
    {
      x: () => S.center(S.anchor("wh-door")).x - S.center(courier.el.parentElement!).x,
      y: () => -H() * 0.035,
      scale: 0.6,
      duration: 0.55,
      ease: "power1.in",
    },
    9.8,
  );
  tl.to([courier.el, pkgEl], { autoAlpha: 0, duration: 0.15 }, 10.2);
  tl.to(whDoor, { scaleY: 1, duration: 0.25, ease: "power1.inOut" }, 10.4);
  copyIn("darkstores", 9.35);
  copyOut("darkstores", 10.95);

  // ======================= S6 · SHOWCASE "PLATFORM" =========================
  tl.to(whDoor, { scaleY: 0.06, duration: 0.2 }, 11.0);
  pkg.hold(11.0, 0.2, { to: A.whDoor, s: () => small() * 0.6 });
  tl.to(pkgEl, { autoAlpha: 1, duration: 0.05 }, 11.15);
  pkg.fly(11.2, 0.8, { from: A.whDoor, to: A.center, s0: () => small() * 0.6, s1: one, lift: 0.3, tilt: 8 });
  dimIn(11.3);
  tl.to(whDoor, { scaleY: 1, duration: 0.2 }, 11.6);
  pkg.hold(12.0, 3.6, { to: A.center, s: one });
  // backstage changes while the box fills the screen
  tl.to(whA, { x: () => -W() * 0.85, duration: 0.5, ease: "power2.in" }, 12.1);
  tl.set(courier.el, { x: () => -W() * 0.6, y: 0, scale: 1 }, 12.6);
  wave(seller, 12.1, 2);
  tl.to([seller.el, tableA], { x: () => W() * 0.6, duration: 0.5, ease: "power2.in" }, 12.35);
  walk(tl, seller, 12.35, 0.5, 5);
  const endB = showcase("platform", MOMENTS.platform, 0.66); // → 15.4

  // ======================= S7 · AIR CARGO ===================================
  tl.fromTo(
    planeA,
    { x: () => W() * 0.9, y: () => -H() * 0.4, rotation: -10 },
    { x: 0, y: 0, rotation: 0, duration: 0.6, ease: "power2.out" },
    endB - 0.5,
  );
  tl.to(ramp, { rotation: -81, duration: 0.25, ease: "power2.out" }, 15.45);
  pkg.fly(15.6, 0.8, { from: A.center, to: A.ramp, s0: one, s1: () => small() * 0.8, lift: 0.28, tilt: -8 });
  dimOut(15.65);
  pkg.fly(16.4, 0.25, { from: A.ramp, to: A.hold, s0: () => small() * 0.8, s1: () => small() * 0.5, lift: 0, ease: "power1.in" });
  tl.to(pkgEl, { autoAlpha: 0, duration: 0.08 }, 16.6);
  pkg.hold(16.65, 1.85, { to: A.hold, s: () => small() * 0.5 });
  tl.to(ramp, { rotation: 0, duration: 0.2, ease: "power2.in" }, 16.72);
  tl.to(planeA, { y: -4, duration: 0.03, repeat: 3, yoyo: true }, 16.9);
  tl.to(planeA, { x: () => W() * 0.7, y: () => -H() * 0.65, rotation: -14, duration: 0.7, ease: "power2.in" }, 17.0);
  copyIn("air", 15.95);
  copyOut("air", 17.6);

  // ======================= S8 · SHOWCASE "HOW TO JIFFY" =====================
  tl.fromTo(
    planeA,
    { x: () => W() * 0.9, y: () => -H() * 0.4, rotation: -10 },
    { x: 0, y: 0, rotation: 0, duration: 0.5, ease: "power2.out" },
    17.85,
  );
  tl.to(ramp, { rotation: -81, duration: 0.2, ease: "power2.out" }, 18.3);
  tl.to(pkgEl, { autoAlpha: 1, duration: 0.05 }, 18.45);
  pkg.fly(18.5, 0.15, { from: A.hold, to: A.ramp, s0: () => small() * 0.5, s1: () => small() * 0.8, lift: 0, ease: "power1.out" });
  pkg.fly(18.65, 0.8, { from: A.ramp, to: A.center, s0: () => small() * 0.8, s1: one, lift: 0.3, tilt: -8 });
  dimIn(18.75);
  pkg.hold(19.45, 3.2, { to: A.center, s: one });
  tl.to(ramp, { rotation: 0, duration: 0.2 }, 19.5);
  tl.to(planeA, { x: () => W() * 0.9, duration: 0.5, ease: "power2.in" }, 19.75);
  const endC = showcase("how", MOMENTS.how, 0.62); // → 22.6
  tl.set(courier.el, { autoAlpha: 1 }, 22.0);
  enter(courier.el, "l", 22.0, 0.5);
  walk(tl, courier, 22.0, 0.5, 6);

  // ======================= S9 · HAND-OFF ====================================
  pkg.fly(endC + 0.05, 0.8, { from: A.center, to: A.courier, s0: one, s1: small, lift: 0.3, tilt: 8 });
  dimOut(endC + 0.1);
  pose(tl, courier, "catch", 23.0, 0.15);
  pose(tl, courier, "carry", 23.43, 0.08, "power2.out");
  squash(tl, courier, 23.43);
  mood(tl, courier, true, 23.43);
  mood(tl, courier, false, 23.9);
  pkg.hold(23.45, 1.35, { to: A.courier, s: small });
  copyIn("lastmile", 22.9);
  copyOut("lastmile", 23.95);

  // ======================= S10 · DELIVERED ==================================
  enter(houseA, "l", 23.8, 0.5);
  tl.to(houseDoor, { scaleX: 0.12, duration: 0.2, ease: "power2.out" }, 24.3);
  tl.to(homemaker.el, { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(1.6)" }, 24.4);
  mood(tl, homemaker, true, 24.45);
  wave(homemaker, 24.45, 3);
  // courier steps aside so both characters (and the door) read clearly
  walk(tl, courier, 24.3, 0.4, 4);
  tl.to(courier.el, { x: () => courier.el.offsetHeight * 0.27, duration: 0.4, ease: "power1.inOut" }, 24.3);
  pose(tl, courier, "give", 24.75, 0.12, "power2.out");
  pose(tl, homemaker, "receive", 24.8, 0.12, "power2.out");
  pkg.fly(24.8, 0.35, { from: A.courier, to: A.homemaker, s0: small, s1: small, lift: 0.06 });
  pose(tl, homemaker, "carry", 25.13, 0.1, "power2.out");
  pkg.hold(25.15, TOTAL - 25.15, { to: A.homemaker, s: small });
  pose(tl, courier, "cheer", 25.2, 0.15);
  mood(tl, courier, true, 25.2);
  hop(tl, courier, 25.2, 2, 18, 0.09);
  hop(tl, homemaker, 25.3, 1, 10, 0.09);
  copyIn("cta", 24.1);

  tl.set({}, {}, TOTAL); // pad to the full length

  // ---- effects rendered from time (confetti, hearts, badge) ----------------
  const confetti = all<HTMLElement>("[data-confetti]");
  const hearts = all<HTMLElement>("[data-heart]");
  const badge = S.q<HTMLElement>("[data-badge]");
  const rnd = (i: number, s: number) => {
    const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const FX0 = 25.15;
  const fx = (t: number) => {
    const k = (t - FX0) / 0.9;
    const on = k > 0 && k < 1.3;
    if (!on) {
      gsap.set([...confetti, ...hearts, badge], { autoAlpha: 0 });
      return;
    }
    const o = S.center(S.anchor("homemaker-hands"));
    const head = S.center(S.anchor("homemaker-head"));
    confetti.forEach((c, i) => {
      const vx = (rnd(i, 1) - 0.5) * W() * 0.32;
      const vy = -(0.25 + rnd(i, 2) * 0.35) * H();
      const kk = Math.min(k, 1.2);
      gsap.set(c, {
        x: o.x + vx * kk,
        y: o.y + vy * kk + H() * 0.55 * kk * kk,
        rotation: rnd(i, 3) * 720 * kk,
        autoAlpha: k < 1 ? 1 : Math.max(0, 1 - (k - 1) * 4),
      });
    });
    hearts.forEach((h, i) => {
      const kk = Math.max(0, Math.min((k - i * 0.12) / 0.8, 1));
      gsap.set(h, {
        x: head.x + (i - 1) * 34 + Math.sin(kk * 6 + i) * 8,
        y: head.y - kk * H() * 0.12,
        scale: 0.4 + kk * 0.8,
        autoAlpha: kk <= 0 ? 0 : kk < 0.8 ? 1 : (1 - kk) * 5,
      });
    });
    const b = Math.min(Math.max((k - 0.05) / 0.2, 0), 1);
    const back = gsap.parseEase("back.out(2)")(b);
    gsap.set(badge, {
      x: (head.x + S.center(S.anchor("courier-head")).x) / 2,
      y: head.y - H() * 0.05,
      xPercent: -50,
      yPercent: -50,
      scale: back,
      autoAlpha: b > 0 ? 1 : 0,
    });
  };
  // keep the badge visible after the burst
  const fxRender = (t: number) => {
    fx(t);
    if (t > FX0 + 1.17) gsap.set(badge, { autoAlpha: 1, scale: 1 });
  };

  // ---- HUD ---------------------------------------------------------------
  const steps = all<HTMLElement>("[data-hud-step]");
  let lastStep = -2;
  const hud = (t: number) => {
    let idx = 0;
    MILESTONES.forEach((m, i) => {
      if (t >= m.at) idx = i;
    });
    if (idx === lastStep) return;
    lastStep = idx;
    steps.forEach((s, i) => (s.dataset.state = i < idx ? "done" : i === idx ? "active" : "todo"));
  };

  const render = () => {
    const t = tl.time();
    pkg.render(t);
    pop.render(t);
    fxRender(t);
    hud(t);
  };
  tl.eventCallback("onUpdate", render);

  // ---- scroll --------------------------------------------------------------
  let intro: gsap.core.Timeline | null = null;
  const st = ScrollTrigger.create({
    trigger: root,
    start: "top top",
    end: () => "+=" + TOTAL * root.clientHeight,
    pin: true,
    scrub: opts.reduce ? true : 0.7,
    animation: tl,
    onUpdate: (self) => {
      if (intro && intro.progress() < 1 && self.progress > 0.001) intro.progress(1);
    },
  });

  // Re-measure everything on resize: rewind, forget recorded values, replay.
  const onRefresh = () => {
    const t = tl.time();
    tl.time(0);
    initial();
    tl.invalidate();
    tl.time(t);
    render();
  };
  ScrollTrigger.addEventListener("refresh", onRefresh);

  tl.time(0);
  render();
  registerStory(st, TOTAL);

  // ---- life ----------------------------------------------------------------
  const stopIdle = opts.reduce ? [] : [idle(seller, 1), idle(courier, 2), idle(homemaker, 3)];
  const beacon = opts.reduce ? null : gsap.to(root.querySelectorAll("[data-actor='warehouse'] [data-part='beacon']"), { opacity: 0.25, duration: 0.6, yoyo: true, repeat: -1 });

  return {
    tl,
    st,
    setIntro: (i: gsap.core.Timeline) => (intro = i),
    cleanup: () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      stopIdle.forEach((s) => s());
      beacon?.kill();
      registerStory(null, TOTAL);
    },
  };
}

export const SHOWCASE_IDS = SHOWCASES.map((s) => s.id);
