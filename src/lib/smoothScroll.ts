import type Lenis from '@studio-freight/lenis';

let smoothScroller: Lenis | null = null;

export function setSmoothScroller(instance: Lenis | null) {
  smoothScroller = instance;
}

export function scrollToSection(target: HTMLElement, offset = -96) {
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY + offset);

  if (smoothScroller) {
    smoothScroller.scrollTo(top, {
      immediate: true,
      force: true,
    });
    return;
  }

  window.scrollTo({ top, behavior: 'smooth' });
}

export function scrollToPageTop() {
  if (smoothScroller) {
    smoothScroller.scrollTo(0, { immediate: true, force: true });
    return;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
