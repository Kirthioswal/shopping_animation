import gsap from "gsap";

/**
 * Time-based intro that plays on page load (not scroll-driven):
 * header drops in, the phone slides in from the left, the headline types
 * itself, and the order gets placed on the phone (swipe to pay → ✓).
 * The scroll timeline fast-forwards this if the visitor starts scrolling.
 */
export function buildIntro(root: HTMLElement, opts: { reduce: boolean }) {
  const q = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const qa = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));

  const header = document.querySelector("[data-header]");
  const phone = q("[data-phone-intro]");
  const chars = qa("[data-copy='hero'] [data-ch]");
  const caret = q("[data-caret]");
  const sub = q("[data-hero-sub]");
  const knob = q("[data-ph='knob']");
  const fill = q("[data-ph='fill']");
  const cart = q("[data-ph='cart']");
  const placed = q("[data-ph='placed']");
  const check = q("[data-ph='check']");
  const placedRest = qa("[data-ph='placedText'], [data-ph='placedSub'], [data-ph='steps']");
  const hud = q("[data-hud]");
  const hint = q("[data-scroll-hint]");

  const tl = gsap.timeline({ delay: 0.2 });
  if (header) tl.fromTo(header, { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0);
  tl.fromTo(phone, { x: () => -window.innerWidth * 0.5, rotation: -14 }, { x: 0, rotation: 0, duration: 1.0, ease: "back.out(1.1)" }, 0.1);

  // typewriter
  tl.set(chars, { visibility: "visible", stagger: 0.055 }, 0.4);
  const typedAt = 0.4 + chars.length * 0.055;
  tl.fromTo(sub, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, typedAt + 0.05);
  const caretBlink = gsap.to(caret, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });

  // checkout on the phone
  const travel = () => (knob.parentElement as HTMLElement).clientWidth - knob.offsetWidth - knob.offsetLeft * 2;
  tl.to(knob, { x: travel, duration: 0.8, ease: "power2.inOut" }, 1.7);
  tl.to(fill, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 1.7);
  tl.to(cart, { autoAlpha: 0, y: -10, duration: 0.25 }, 2.55);
  tl.set(placed, { autoAlpha: 1 }, 2.6);
  tl.fromTo(check, { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2.2)" }, 2.6);
  tl.fromTo(placedRest, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.1, ease: "power2.out" }, 2.8);

  tl.fromTo(hud, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 3.0);
  tl.fromTo(hint, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 3.2);
  tl.call(() => {
    caretBlink.kill();
    gsap.to(caret, { autoAlpha: 0, duration: 0.3 });
  }, [], typedAt + 1.6);

  if (opts.reduce) tl.progress(1);

  return {
    tl,
    cleanup: () => {
      tl.kill();
      caretBlink.kill();
    },
  };
}
