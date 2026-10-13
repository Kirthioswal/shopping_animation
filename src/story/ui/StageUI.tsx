import { useMemo } from "react";
import { ArrowRight, Mouse } from "lucide-react";
import { LOGIN_URL, MILESTONES, SIGNUP_URL, type CopyBlockData } from "../content";

const Chars = ({ text, className }: { text: string; className?: string }) => (
  <span className={className} aria-hidden="true">
    {Array.from(text).map((c, i) => (
      <span key={i} data-ch style={{ visibility: "hidden" }}>
        {c}
      </span>
    ))}
  </span>
);

export const CtaButtons = ({ big = false }: { big?: boolean }) => (
  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
    <a href={SIGNUP_URL} target="_blank" rel="noreferrer" className={`btn-primary group ${big ? "px-8 py-4 text-lg" : ""}`}>
      Get Started
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
    <a href={LOGIN_URL} target="_blank" rel="noreferrer" className={`btn-ghost ${big ? "px-8 py-4 text-lg" : ""}`}>
      Log in
    </a>
  </div>
);

/** Opening copy (live jiffy.world hero), typed in by the intro timeline. */
export const HeroBlock = () => (
  <div className="copy-block" data-copy="hero">
    <div className="copy-block-inner">
      <h1
        aria-label="Need it now? Get it in a Jiffy."
        className="font-display text-[clamp(36px,4.5vw,76px)] font-bold leading-[1.04] tracking-[-0.03em]"
      >
        <Chars text="Need it now?" />
        <br />
        <Chars text="Get it in a " />
        <Chars text="Jiffy." className="text-jiffy-500" />
        <span data-caret className="ml-1 inline-block h-[0.85em] w-[0.08em] translate-y-[0.1em] bg-jiffy-500" />
      </h1>
      <div data-hero-sub>
        <p className="mt-6 font-display text-[clamp(17px,1.5vw,24px)] font-semibold">
          <span className="bg-gradient-to-r from-violet to-sky bg-clip-text text-transparent">My Jiffy World:</span>{" "}
          Powering Quick Commerce
        </p>
        <p className="mx-auto mt-3 max-w-[34rem] text-[clamp(14px,1.1vw,17px)] leading-relaxed text-ink-muted">
          From dark stores to doorsteps, Jiffy makes quick commerce logistics effortless—delivering products to your
          customers in record time.
        </p>
        <CtaButtons />
      </div>
    </div>
  </div>
);

export const CopyBlock = ({ data }: { data: CopyBlockData }) => (
  <div className="copy-block" data-copy={data.id} style={{ visibility: "hidden" }}>
    <div className="copy-block-inner">
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-jiffy-400" />
        {data.eyebrow}
      </span>
      <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,58px)] font-bold leading-[1.05]">
        {data.title[0]}
        <br />
        <span className="bg-gradient-to-r from-jiffy-400 to-jiffy-600 bg-clip-text text-transparent">{data.title[1]}</span>
      </h2>
      {data.body && (
        <p className="mx-auto mt-4 max-w-[32rem] text-[clamp(14px,1.1vw,17px)] leading-relaxed text-ink-muted">{data.body}</p>
      )}
      {data.chips && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {data.chips.map((c) => (
            <span key={c} className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              {c}
            </span>
          ))}
        </div>
      )}
      {data.cta && <CtaButtons big />}
    </div>
  </div>
);

export const ScrollHint = () => (
  <div
    data-scroll-hint
    className="absolute bottom-[3vh] right-4 z-40 text-center md:bottom-[calc(2.2vh+52px)] md:left-1/2 md:right-auto md:-translate-x-1/2"
    style={{ visibility: "hidden" }}
  >
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-night-900/70 px-4 py-2 text-xs font-medium text-ink-muted backdrop-blur">
      <Mouse className="h-4 w-4 animate-bounce text-jiffy-400" />
      Scroll to follow your order
    </div>
  </div>
);

/** Bottom tracker. intro/timeline set data-state on each step. */
export const JourneyHud = () => (
  <div
    data-hud
    className="absolute bottom-[2.2vh] left-1/2 z-40 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-night-900/75 px-2 py-1.5 backdrop-blur-md md:flex"
    style={{ visibility: "hidden" }}
  >
    {MILESTONES.map((m, i) => (
      <div key={m.label} className="flex items-center gap-1">
        <div data-hud-step={i} data-state="todo" className="hud-step flex items-center gap-1.5 rounded-full px-2.5 py-1">
          <span className="hud-dot h-2 w-2 rounded-full" />
          <span className="hud-label whitespace-nowrap text-[11px] font-semibold">{m.label}</span>
        </div>
        {i < MILESTONES.length - 1 && <span className="h-px w-3 bg-white/15 lg:w-5" />}
      </div>
    ))}
  </div>
);

/* ----------------------------------------------------------------------- */

function seeded(n: number) {
  let s = n;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const Backdrop = () => {
  const stars = useMemo(() => {
    const r = seeded(7);
    return Array.from({ length: 90 }, () => ({
      x: r() * 100,
      y: r() * 78,
      s: r() < 0.12 ? 2.4 : r() < 0.5 ? 1.6 : 1,
      o: 0.25 + r() * 0.6,
      tw: 2 + r() * 4,
      td: -r() * 6,
    }));
  }, []);

  const buildings = useMemo(() => {
    const r = seeded(42);
    const out: { x: number; w: number; h: number; win: { x: number; y: number; on: boolean }[] }[] = [];
    let x = 0;
    while (x < 2400) {
      const w = 40 + r() * 70;
      const h = 50 + r() * 130;
      const win: { x: number; y: number; on: boolean }[] = [];
      for (let wy = 200 - h + 12; wy < 188; wy += 18) {
        for (let wx = x + 8; wx < x + w - 12; wx += 16) win.push({ x: wx, y: wy, on: r() < 0.22 });
      }
      out.push({ x, w, h, win });
      x += w + 6 + r() * 20;
    }
    return out;
  }, []);

  return (
    <div className="stage-layer" style={{ zIndex: 0 }}>
      <div data-stars className="absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-white"
            style={
              {
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.s,
                height: s.s,
                "--o": s.o,
                "--tw": `${s.tw}s`,
                "--td": `${s.td}s`,
                opacity: s.o,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ringed planet */}
      <svg data-planet viewBox="0 0 200 120" className="absolute right-[7vw] top-[13vh] hidden w-[clamp(90px,9vw,160px)] opacity-80 md:block">
        <defs>
          <radialGradient id="planetG" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#9B87F5" />
            <stop offset="100%" stopColor="#3B2A7A" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="64" rx="92" ry="18" fill="none" stroke="#7C5CFC" strokeOpacity="0.35" strokeWidth="5" />
        <circle cx="100" cy="60" r="40" fill="url(#planetG)" />
        <path d="M8 64c20 14 164 14 184 0" stroke="#A78BFA" strokeOpacity="0.6" strokeWidth="5" fill="none" />
      </svg>

      {/* distant city — parallax on scroll */}
      <svg
        data-skyline
        viewBox="0 0 2400 200"
        preserveAspectRatio="xMinYMax slice"
        className="absolute left-0 h-[24vh] w-[220vw]"
        style={{ bottom: "var(--ground)" }}
      >
        {buildings.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={200 - b.h} width={b.w} height={b.h} fill="#130F22" />
            {b.win.map((w, j) =>
              w.on ? <rect key={j} x={w.x} y={w.y} width="6" height="8" fill={j % 3 ? "#FDBA74" : "#A78BFA"} opacity="0.35" /> : null,
            )}
          </g>
        ))}
      </svg>

      {/* ground */}
      <div className="absolute inset-x-0 bottom-0" style={{ height: "var(--ground)" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#120E20] to-[#08060E]" />
        <div
          data-ground
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 120px), linear-gradient(180deg, rgba(249,115,22,0.10), transparent 60%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-jiffy-500/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-6 -translate-y-1/2 bg-gradient-to-r from-transparent via-jiffy-500/15 to-transparent blur-md" />
      </div>
    </div>
  );
};
