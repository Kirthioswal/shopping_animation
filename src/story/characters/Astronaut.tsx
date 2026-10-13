import { useId } from "react";

/**
 * Rigged Jiffy astronaut, drawn in a 240x360 viewBox (feet on y=350).
 *
 * Every moving part carries a `data-part` name and is pivoted by the pivot
 * table in ../motion.ts, so the scroll timeline and the idle loops can pose
 * it: root, legL, legR, breath, armL, armR, head, headIdle, eyes, happyEyes,
 * mouth, mouthOpen, beacon, handPhone, phoneNew.
 *
 * `data-anchor` points are what the package / popup lock onto:
 *   <name>-hands  carry point in front of the chest
 *   <name>-phone  screen of the phone in the right hand (seller only)
 *   <name>-head   above the helmet (hearts, badges)
 */

export type AstroVariant = "seller" | "courier" | "homemaker";

interface Palette {
  suit: [string, string, string]; // light, base, dark
  helmet: [string, string, string];
  pod: string;
  podInner: string;
  ring: string;
  glove: string;
  boot: string;
  hair: string;
  beacon: string;
}

const PALETTES: Record<AstroVariant, Palette> = {
  seller: {
    suit: ["#FFB36B", "#F97316", "#C2410C"],
    helmet: ["#FFC48A", "#FB8A2E", "#D4520A"],
    pod: "#7C3A1A",
    podInner: "#B4602E",
    ring: "#FDE3C8",
    glove: "#9A3412",
    boot: "#6B2A10",
    hair: "#3B2416",
    beacon: "#FDE047",
  },
  courier: {
    suit: ["#9CC7FF", "#3B82F6", "#1D4ED8"],
    helmet: ["#C7DEFF", "#63A2FA", "#2563EB"],
    pod: "#8A97AD",
    podInner: "#FACC15",
    ring: "#E2E8F0",
    glove: "#475569",
    boot: "#334155",
    hair: "#2A1C14",
    beacon: "#FACC15",
  },
  homemaker: {
    suit: ["#FFFFFF", "#F3EEF8", "#C7BBDA"],
    helmet: ["#FFFFFF", "#FBD3E9", "#E879B9"],
    pod: "#EC4899",
    podInner: "#FBCFE8",
    ring: "#FCE7F3",
    glove: "#DB2777",
    boot: "#9D174D",
    hair: "#4A2A1A",
    beacon: "#F472B6",
  },
};

interface AstronautProps {
  variant: AstroVariant;
  /** Prefix for data-anchor names, e.g. "seller" -> "seller-hands". */
  name: string;
  className?: string;
}

export const Astronaut = ({ variant, name, className }: AstronautProps) => {
  const p = PALETTES[variant];
  const uid = useId().replace(/:/g, "");
  const g = (k: string) => `${uid}-${k}`;
  const url = (k: string) => `url(#${g(k)})`;

  return (
    <svg viewBox="0 0 240 360" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={g("suit")} cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor={p.suit[0]} />
          <stop offset="55%" stopColor={p.suit[1]} />
          <stop offset="100%" stopColor={p.suit[2]} />
        </radialGradient>
        <radialGradient id={g("helm")} cx="34%" cy="26%" r="78%">
          <stop offset="0%" stopColor={p.helmet[0]} />
          <stop offset="55%" stopColor={p.helmet[1]} />
          <stop offset="100%" stopColor={p.helmet[2]} />
        </radialGradient>
        <radialGradient id={g("face")} cx="45%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#FFE3CC" />
          <stop offset="70%" stopColor="#F7C39E" />
          <stop offset="100%" stopColor="#E9A57E" />
        </radialGradient>
        <linearGradient id={g("visor")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id={g("faceClip")}>
          <ellipse cx="120" cy="110" rx="56" ry="49" />
        </clipPath>
      </defs>

      {/* ground shadow */}
      <ellipse data-part="shadow" cx="120" cy="349" rx="62" ry="8" fill="#000" opacity="0.38" />

      <g data-part="root">
        {/* ---------- legs ---------- */}
        <g data-part="legL">
          <rect x="90" y="256" width="28" height="66" rx="13" fill={url("suit")} />
          <path d="M86 318h30a6 6 0 0 1 6 6v13a9 9 0 0 1-9 9H88a10 10 0 0 1-10-10v-10a8 8 0 0 1 8-8z" fill={p.boot} />
          <rect x="86" y="314" width="34" height="7" rx="3.5" fill={p.ring} opacity="0.9" />
        </g>
        <g data-part="legR">
          <rect x="122" y="256" width="28" height="66" rx="13" fill={url("suit")} />
          <path d="M154 318h-30a6 6 0 0 0-6 6v13a9 9 0 0 0 9 9h25a10 10 0 0 0 10-10v-10a8 8 0 0 0-8-8z" fill={p.boot} />
          <rect x="120" y="314" width="34" height="7" rx="3.5" fill={p.ring} opacity="0.9" />
        </g>

        <g data-part="upper">
          <g data-part="breath">
            {/* backpack peeking out behind the torso */}
            <rect x="62" y="168" width="116" height="96" rx="30" fill={p.pod} />
            <rect x="70" y="176" width="100" height="10" rx="5" fill={p.podInner} opacity="0.6" />

            {/* torso */}
            <path
              d="M80 190C80 172 98 164 120 164s40 8 40 26l6 68c1 18-18 28-46 28s-47-10-46-28z"
              fill={url("suit")}
            />
            <path d="M150 178c8 6 10 12 10 20l5 60c1 12-8 21-22 25 8-8 10-16 9-26l-4-62c0-7 0-12 2-17z" fill={p.suit[2]} opacity="0.35" />
            <rect x="75" y="252" width="90" height="11" rx="5.5" fill={p.suit[2]} opacity="0.85" />
            <rect x="113" y="252" width="14" height="11" rx="3" fill={p.ring} />

            {variant === "courier" && (
              <g>
                <path d="M88 176L160 262" stroke="#F97316" strokeWidth="9" strokeLinecap="round" />
                <rect x="144" y="244" width="36" height="32" rx="8" fill="#F97316" />
                <rect x="144" y="244" width="36" height="11" rx="5" fill="#EA580C" />
                <text x="162" y="271" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="13" fill="#fff">J</text>
              </g>
            )}

            {variant === "homemaker" ? (
              <g>
                <path d="M100 186L96 212M140 186L144 212" stroke="#F472B6" strokeWidth="5" strokeLinecap="round" />
                <path d="M92 212c0-6 56-6 56 0l2 58c0 10-10 14-30 14s-30-4-30-14z" fill="#F472B6" />
                <path d="M92 212c0-6 56-6 56 0l1 10c-12-4-44-4-58 0z" fill="#EC4899" />
                <path d="M120 262c-7-5-12-9-12-14 0-4 3-6 6-6 3 0 5 2 6 4 1-2 3-4 6-4 3 0 6 2 6 6 0 5-5 9-12 14z" fill="#fff" opacity="0.9" />
              </g>
            ) : (
              <g>
                <circle cx={variant === "courier" ? 102 : 120} cy={variant === "courier" ? 204 : 214} r={variant === "courier" ? 13 : 16} fill="#fff" />
                <text
                  x={variant === "courier" ? 102 : 120}
                  y={variant === "courier" ? 210 : 221}
                  textAnchor="middle"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="800"
                  fontSize={variant === "courier" ? 16 : 20}
                  fill="#F97316"
                >
                  J
                </text>
              </g>
            )}

            {/* neck seal */}
            <ellipse cx="120" cy="168" rx="46" ry="12" fill={p.ring} />
            <ellipse cx="120" cy="170" rx="40" ry="7" fill={p.suit[2]} opacity="0.25" />

            {/* ---------- head ---------- */}
            <g data-part="head">
              <g data-part="headIdle">
                <circle cx="40" cy="102" r="20" fill={p.pod} />
                <circle cx="40" cy="102" r="12" fill={p.podInner} />
                <circle cx="200" cy="102" r="20" fill={p.pod} />
                <circle cx="200" cy="102" r="12" fill={p.podInner} />
                <path d="M204 84L214 52" stroke={p.pod} strokeWidth="4" strokeLinecap="round" />
                <circle data-part="beacon" cx="215" cy="48" r="7" fill={p.beacon} />

                <circle cx="120" cy="98" r="80" fill={url("helm")} />
                <ellipse cx="78" cy="46" rx="24" ry="9" fill="#fff" opacity="0.35" transform="rotate(-35 78 46)" />

                <ellipse cx="120" cy="108" rx="64" ry="57" fill={p.ring} />
                <ellipse cx="120" cy="110" rx="56" ry="49" fill={url("face")} />

                <g clipPath={url("faceClip")}>
                  {variant === "homemaker" && (
                    <>
                      <path d="M62 92c-4 26 0 48 10 66l12-6c-8-16-10-36-6-56z" fill={p.hair} />
                      <path d="M178 92c4 26 0 48-10 66l-12-6c8-16 10-36 6-56z" fill={p.hair} />
                    </>
                  )}
                  <path
                    d="M60 100c2-38 32-48 60-48s58 10 60 48c-10-16-22-22-34-20 4 10 0 16-10 16-6-12-20-18-36-12 4 8-2 14-12 12-6-6-16-4-28 4z"
                    fill={p.hair}
                  />
                </g>

                <path d="M86 92q11-7 22-1" stroke={p.hair} strokeWidth="4.5" fill="none" strokeLinecap="round" />
                <path d="M132 91q11-6 22 1" stroke={p.hair} strokeWidth="4.5" fill="none" strokeLinecap="round" />

                <g data-part="eyes">
                  <ellipse cx="97" cy="112" rx="11" ry="13" fill="#fff" />
                  <circle cx="98" cy="114" r="8.5" fill="#3A2416" />
                  <circle cx="98" cy="114" r="4.5" fill="#120A05" />
                  <circle cx="101.5" cy="109.5" r="3.2" fill="#fff" />
                  <circle cx="95" cy="118" r="1.4" fill="#fff" opacity="0.8" />
                  <ellipse cx="143" cy="112" rx="11" ry="13" fill="#fff" />
                  <circle cx="142" cy="114" r="8.5" fill="#3A2416" />
                  <circle cx="142" cy="114" r="4.5" fill="#120A05" />
                  <circle cx="145.5" cy="109.5" r="3.2" fill="#fff" />
                  <circle cx="139" cy="118" r="1.4" fill="#fff" opacity="0.8" />
                  {variant === "homemaker" && (
                    <path d="M86 104l-5-4M88 101l-3-5M154 104l5-4M152 101l3-5" stroke="#2A1A10" strokeWidth="2.4" strokeLinecap="round" />
                  )}
                </g>
                <g data-part="happyEyes" opacity="0">
                  <path d="M87 116q10-13 20 0" stroke="#3A2416" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                  <path d="M133 116q10-13 20 0" stroke="#3A2416" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                </g>

                <ellipse cx="120" cy="126" rx="6" ry="4.5" fill="#E9A07B" />
                <ellipse cx="82" cy="128" rx="9" ry="5.5" fill="#F59E8B" opacity="0.55" />
                <ellipse cx="158" cy="128" rx="9" ry="5.5" fill="#F59E8B" opacity="0.55" />

                <path data-part="mouth" d="M108 136q12 10 24 0" stroke="#8A3B22" strokeWidth="3.6" fill="none" strokeLinecap="round" />
                <g data-part="mouthOpen" opacity="0">
                  <path d="M105 133q15 22 30 0q-15 5-30 0z" fill="#7A2E1A" />
                  <ellipse cx="120" cy="142" rx="6.5" ry="3.5" fill="#F07A6A" />
                </g>

                <ellipse cx="120" cy="110" rx="56" ry="49" fill={url("visor")} />
                <path d="M76 88q8-20 30-26" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.4" />
                <circle cx="152" cy="68" r="3.5" fill="#fff" opacity="0.5" />
              </g>
            </g>
            {/* ---------- left arm (viewer's left) ---------- */}
            <g data-part="armL">
              <path d="M86 178c-14 0-20 10-22 22l-4 38c-1 8 4 12 11 12s11-4 12-11l9-37c2-12 2-24-6-24z" fill={url("suit")} />
              <rect x="58" y="236" width="27" height="10" rx="5" fill={p.ring} />
              <circle cx="71" cy="254" r="13" fill={p.glove} />
              <ellipse cx="81" cy="250" rx="5" ry="6" fill={p.glove} />
              <circle cx="67" cy="250" r="4" fill="#fff" opacity="0.18" />
            </g>

            {/* ---------- right arm ---------- */}
            <g data-part="armR">
              <path d="M154 178c14 0 20 10 22 22l4 38c1 8-4 12-11 12s-11-4-12-11l-9-37c-2-12-2-24 6-24z" fill={url("suit")} />
              <rect x="155" y="236" width="27" height="10" rx="5" fill={p.ring} />
              <circle cx="169" cy="254" r="13" fill={p.glove} />
              {variant === "seller" && (
                <g data-part="handPhone">
                  {/* drawn upright for the raised-arm "phone" pose (arm at -112deg) */}
                  <g transform="rotate(112 169 254)">
                    <rect x="155" y="218" width="28" height="46" rx="6" fill="#14111E" stroke="#3A3350" strokeWidth="1.5" />
                    <rect x="158" y="223" width="22" height="35" rx="3.5" fill="#26213A" />
                    <rect x="161" y="228" width="16" height="3" rx="1.5" fill="#F97316" opacity="0.8" />
                    <rect x="161" y="234" width="12" height="2.5" rx="1.25" fill="#fff" opacity="0.25" />
                    <rect x="161" y="239" width="14" height="2.5" rx="1.25" fill="#fff" opacity="0.25" />
                    <g data-part="phoneNew" opacity="0">
                      <rect x="158" y="223" width="22" height="35" rx="3.5" fill="#16A34A" />
                      <circle cx="169" cy="236" r="7" fill="#fff" />
                      <path d="M165.5 236l2.4 2.4 4.6-4.8" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="161" y="247" width="16" height="2.5" rx="1.25" fill="#fff" opacity="0.85" />
                      <rect x="163" y="251.5" width="12" height="2" rx="1" fill="#fff" opacity="0.6" />
                    </g>
                    <circle data-anchor={`${name}-phone`} cx="169" cy="240" r="0.5" fill="none" />
                    <ellipse cx="160" cy="252" rx="5" ry="6" fill={p.glove} />
                  </g>
                </g>
              )}
              <ellipse cx="159" cy="250" rx="5" ry="6" fill={p.glove} />
            </g>

          </g>
        </g>

        <circle data-anchor={`${name}-hands`} cx="120" cy="246" r="0.5" fill="none" />
        <circle data-anchor={`${name}-head`} cx="120" cy="2" r="0.5" fill="none" />
      </g>
    </svg>
  );
};

export default Astronaut;
