import type { ArtKey } from "../content";
import amazon from "@/assets/icons/amazon-icon.png";
import flipkart from "@/assets/icons/flipkart-icon.png";
import shopify from "@/assets/icons/shopify-icon.png";
import myntra from "@/assets/icons/myntra-icon.webp";
import meesho from "@/assets/icons/Meesho-icon.png";
import snapdeal from "@/assets/icons/snapdeal-icon.png";
import woo from "@/assets/icons/woocomm-icon.png";
import unicomm from "@/assets/icons/unicomm-icon.png";

// Feature-card illustrations. All share a 320x240 viewBox and use white at
// varying opacity so they sit on any of the card gradients.

const W = "#fff";
const ORANGE = "#F97316";
const INK = "#1E1B2E";

const Stopwatch = () => (
  <svg viewBox="0 0 320 240">
    <g opacity="0.5" stroke={W} strokeWidth="6" strokeLinecap="round">
      <path d="M30 100h50M44 124h40M30 148h46" />
    </g>
    <rect x="166" y="22" width="28" height="18" rx="5" fill={W} opacity="0.85" />
    <circle cx="180" cy="128" r="88" fill={W} opacity="0.18" />
    <circle cx="180" cy="128" r="74" fill={W} />
    <circle cx="180" cy="128" r="62" fill="none" stroke="#E9E5F5" strokeWidth="12" />
    <circle cx="180" cy="128" r="62" fill="none" stroke={ORANGE} strokeWidth="12" strokeLinecap="round" strokeDasharray="195 400" transform="rotate(-90 180 128)" />
    <text x="180" y="138" textAnchor="middle" fontFamily="Outfit" fontWeight="800" fontSize="44" fill={INK}>30</text>
    <text x="180" y="160" textAnchor="middle" fontFamily="Outfit" fontWeight="600" fontSize="15" fill="#6B6585">min</text>
    <circle cx="262" cy="56" r="20" fill={ORANGE} />
    <path d="M253 56l6 6 12-13" stroke={W} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const City = () => (
  <svg viewBox="0 0 320 240">
    <g fill={W} opacity="0.22">
      <rect x="20" y="120" width="44" height="110" rx="4" />
      <rect x="70" y="80" width="52" height="150" rx="4" />
      <rect x="196" y="100" width="48" height="130" rx="4" />
      <rect x="250" y="136" width="50" height="94" rx="4" />
    </g>
    <g fill={W} opacity="0.4">
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="82" y={96 + i * 24} width="10" height="10" rx="2" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="210" y={116 + i * 24} width="10" height="10" rx="2" />
      ))}
    </g>
    <ellipse cx="160" cy="200" rx="110" ry="22" fill="none" stroke={W} strokeWidth="2" strokeDasharray="6 8" opacity="0.6" />
    <ellipse cx="160" cy="200" rx="64" ry="13" fill="none" stroke={W} strokeWidth="2" strokeDasharray="6 8" opacity="0.8" />
    <path d="M160 196c-30-34-46-56-46-80a46 46 0 0 1 92 0c0 24-16 46-46 80z" fill={W} />
    <circle cx="160" cy="116" r="20" fill={ORANGE} />
    <path d="M152 112h16v12h-16zM150 112l10-8 10 8" fill={W} />
    <circle cx="58" cy="200" r="8" fill={W} />
    <circle cx="268" cy="196" r="8" fill={W} />
  </svg>
);

const Growth = () => (
  <svg viewBox="0 0 320 240">
    {[40, 70, 110, 150].map((h, i) => (
      <rect key={i} x={40 + i * 62} y={220 - h} width="42" height={h} rx="8" fill={W} opacity={0.35 + i * 0.18} />
    ))}
    <path d="M40 170C110 160 170 120 270 46" stroke={W} strokeWidth="9" fill="none" strokeLinecap="round" />
    <path d="M246 42l30-2-6 30" stroke={W} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="22" y="132" width="40" height="26" rx="13" fill={INK} opacity="0.85" />
    <text x="42" y="150" textAnchor="middle" fontFamily="Outfit" fontWeight="700" fontSize="14" fill={W}>10</text>
    <rect x="196" y="6" width="84" height="30" rx="15" fill={W} />
    <text x="238" y="27" textAnchor="middle" fontFamily="Outfit" fontWeight="800" fontSize="16" fill={INK}>10,000</text>
  </svg>
);

const Helmet = ({ x, y, c }: { x: number; y: number; c: string }) => (
  <g>
    <circle cx={x - 30} cy={y} r="9" fill={c} opacity="0.9" />
    <circle cx={x + 30} cy={y} r="9" fill={c} opacity="0.9" />
    <circle cx={x} cy={y} r="34" fill={c} />
    <ellipse cx={x} cy={y + 4} rx="24" ry="21" fill="#F7C39E" />
    <circle cx={x - 9} cy={y + 4} r="4" fill="#2A1A10" />
    <circle cx={x + 9} cy={y + 4} r="4" fill="#2A1A10" />
    <path d={`M${x - 7} ${y + 13}q7 6 14 0`} stroke="#8A3B22" strokeWidth="2.6" fill="none" strokeLinecap="round" />
  </g>
);

const Crew = () => (
  <svg viewBox="0 0 320 240">
    <circle cx="160" cy="120" r="104" fill={W} opacity="0.14" />
    <Helmet x={84} y={140} c="#60A5FA" />
    <Helmet x={236} y={140} c="#F472B6" />
    <Helmet x={160} y={112} c="#FB8A2E" />
    <rect x="114" y="184" width="92" height="38" rx="19" fill={W} />
    <text x="160" y="210" textAnchor="middle" fontFamily="Outfit" fontWeight="800" fontSize="22" fill={INK}>24/7</text>
  </svg>
);

const LOGOS = [amazon, flipkart, shopify, myntra, meesho, snapdeal, woo, unicomm];
const Integrations = () => (
  <svg viewBox="0 0 320 240">
    {LOGOS.map((src, i) => {
      const x = 20 + (i % 4) * 74;
      const y = 30 + Math.floor(i / 4) * 98;
      return (
        <g key={i}>
          <rect x={x} y={y} width="62" height="62" rx="16" fill={W} />
          <image href={src} x={x + 11} y={y + 11} width="40" height="40" preserveAspectRatio="xMidYMid meet" />
        </g>
      );
    })}
    <path d="M51 100v30M125 100v30M199 100v30M273 100v30" stroke={W} strokeWidth="3" strokeDasharray="4 6" opacity="0.7" />
  </svg>
);

const Dashboard = () => (
  <svg viewBox="0 0 320 240">
    <rect x="16" y="20" width="288" height="200" rx="14" fill={W} />
    <rect x="16" y="20" width="288" height="28" rx="14" fill="#EEEAF8" />
    <circle cx="34" cy="34" r="4" fill="#F87171" />
    <circle cx="48" cy="34" r="4" fill="#FBBF24" />
    <circle cx="62" cy="34" r="4" fill="#34D399" />
    <rect x="28" y="60" width="54" height="146" rx="8" fill="#F4F2FA" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x="38" y={74 + i * 22} width={i === 0 ? 34 : 26} height="8" rx="4" fill={i === 0 ? ORANGE : "#D7D2E6"} />
    ))}
    <circle cx="136" cy="112" r="34" fill="none" stroke="#EEEAF8" strokeWidth="14" />
    <circle cx="136" cy="112" r="34" fill="none" stroke={ORANGE} strokeWidth="14" strokeDasharray="140 220" transform="rotate(-90 136 112)" />
    <circle cx="136" cy="112" r="34" fill="none" stroke="#7C5CFC" strokeWidth="14" strokeDasharray="50 220" strokeDashoffset="-140" transform="rotate(-90 136 112)" />
    {[46, 70, 58, 88].map((h, i) => (
      <rect key={i} x={200 + i * 22} y={150 - h} width="14" height={h} rx="4" fill={i === 3 ? ORANGE : "#9B87F5"} />
    ))}
    <rect x="98" y="168" width="194" height="38" rx="10" fill="#F4F2FA" />
    <rect x="110" y="180" width="70" height="8" rx="4" fill="#B9B2CF" />
    <rect x="230" y="178" width="50" height="16" rx="8" fill="#34D399" />
  </svg>
);

const Couriers = () => (
  <svg viewBox="0 0 320 240">
    {[0, 1, 2].map((i) => {
      const y = 24 + i * 70;
      const best = i === 1;
      return (
        <g key={i} opacity={best ? 1 : 0.75}>
          <rect x={best ? 14 : 30} y={y} width={best ? 292 : 260} height="58" rx="14" fill={W} />
          <circle cx={best ? 48 : 60} cy={y + 29} r="17" fill={["#60A5FA", "#F97316", "#A78BFA"][i]} />
          <rect x={best ? 76 : 88} y={y + 18} width="96" height="9" rx="4.5" fill="#2A2540" />
          <rect x={best ? 76 : 88} y={y + 34} width="64" height="7" rx="3.5" fill="#C9C3DA" />
          <rect x={best ? 214 : 222} y={y + 17} width={best ? 78 : 56} height="24" rx="12" fill={best ? "#16A34A" : "#EEEAF8"} />
          <text x={best ? 253 : 250} y={y + 34} textAnchor="middle" fontFamily="Outfit" fontWeight="700" fontSize="12" fill={best ? W : "#6B6585"}>
            {best ? "Fastest" : ["22 min", "", "31 min"][i]}
          </text>
        </g>
      );
    })}
  </svg>
);

const Tracking = () => (
  <svg viewBox="0 0 320 240">
    <rect x="14" y="14" width="292" height="212" rx="18" fill={W} />
    <g stroke="#ECE8F6" strokeWidth="14" strokeLinecap="round">
      <path d="M14 90h292M14 170h292M90 14v212M220 14v212" />
    </g>
    <path d="M60 196C90 150 120 170 150 128s60-50 104-80" stroke="#7C5CFC" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="2 12" />
    <circle cx="60" cy="196" r="12" fill="#7C5CFC" />
    <circle cx="60" cy="196" r="5" fill={W} />
    <path d="M254 62c-14-16-22-26-22-38a22 22 0 0 1 44 0c0 12-8 22-22 38z" fill={ORANGE} transform="translate(0 6)" />
    <circle cx="254" cy="30" r="8" fill={W} />
    <circle cx="150" cy="128" r="14" fill={ORANGE} stroke={W} strokeWidth="5" />
    <rect x="164" y="146" width="86" height="34" rx="17" fill={INK} />
    <text x="207" y="168" textAnchor="middle" fontFamily="Outfit" fontWeight="700" fontSize="14" fill={W}>12 min</text>
  </svg>
);

const Rates = () => (
  <svg viewBox="0 0 320 240">
    <path d="M30 60h120l40 40-80 80-80-80z" fill={W} opacity="0.25" transform="rotate(-12 110 120)" />
    <path d="M70 46h130l48 48-94 94-84-84z" fill={W} />
    <circle cx="214" cy="92" r="10" fill="none" stroke={INK} strokeWidth="4" opacity="0.25" />
    <text x="140" y="132" textAnchor="middle" fontFamily="Outfit" fontWeight="800" fontSize="44" fill={INK}>%</text>
    <path d="M196 170l30 22 26-30 34 28" stroke={W} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M272 176l16 16-22 4" stroke={W} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <g>
      <ellipse cx="60" cy="204" rx="26" ry="9" fill="#FCD34D" />
      <rect x="34" y="186" width="52" height="18" fill="#FCD34D" />
      <ellipse cx="60" cy="186" rx="26" ry="9" fill="#FDE68A" />
    </g>
  </svg>
);

const Signup = () => (
  <svg viewBox="0 0 320 240">
    <circle cx="160" cy="120" r="106" fill={W} opacity="0.16" />
    <circle cx="96" cy="112" r="50" fill="#1F8A9E" />
    <circle cx="96" cy="98" r="18" fill="#FBC56A" />
    <path d="M62 146a34 30 0 0 1 68 0z" fill="#FDE07A" />
    <path d="M160 112h52" stroke={W} strokeWidth="9" strokeLinecap="round" />
    <path d="M198 96l16 16-16 16" stroke={W} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M236 150c-14-4-14-30 4-36" stroke={W} strokeWidth="4" fill="none" strokeLinecap="round" />
    <rect x="236" y="148" width="40" height="58" rx="20" fill={W} />
    <path d="M236 176h40" stroke="#D9D4E8" strokeWidth="3" />
    <rect x="253" y="156" width="6" height="12" rx="3" fill="#8F88A8" />
  </svg>
);

const Connect = () => (
  <svg viewBox="0 0 320 240">
    <circle cx="160" cy="120" r="104" fill={W} opacity="0.16" />
    <rect x="122" y="40" width="76" height="160" rx="16" fill={INK} />
    <rect x="128" y="50" width="64" height="140" rx="11" fill={W} />
    <text x="160" y="128" textAnchor="middle" fontFamily="Outfit" fontWeight="800" fontSize="22" fill="#5B3DF0">Jiffy</text>
    {[
      [shopify, 54, 60],
      [amazon, 266, 60],
      [myntra, 54, 178],
      [woo, 266, 178],
    ].map(([src, x, y], i) => (
      <g key={i}>
        <circle cx={x as number} cy={y as number} r="30" fill={W} />
        <image href={src as string} x={(x as number) - 18} y={(y as number) - 18} width="36" height="36" />
      </g>
    ))}
  </svg>
);

const DarkStore = () => (
  <svg viewBox="0 0 320 240">
    <circle cx="160" cy="124" r="104" fill={W} opacity="0.16" />
    <rect x="98" y="26" width="124" height="34" rx="6" fill="#FDBA74" stroke={INK} strokeWidth="4" />
    <text x="160" y="50" textAnchor="middle" fontFamily="Outfit" fontWeight="800" fontSize="15" fill={INK}>DARK STORE</text>
    <rect x="86" y="96" width="148" height="112" fill="#FB923C" stroke={INK} strokeWidth="4" />
    <path d="M74 96l14-30h144l14 30z" fill={W} stroke={INK} strokeWidth="4" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path key={i} d={`M${88 + i * 24} 66l-6 30h24l6-30z`} fill={i % 2 ? W : "#FCD34D"} />
    ))}
    <rect x="102" y="116" width="44" height="38" fill="#FDBA74" stroke={INK} strokeWidth="4" />
    <rect x="164" y="122" width="52" height="86" fill="#FCD9A8" stroke={INK} strokeWidth="4" />
    <rect x="140" y="170" width="40" height="38" fill="#F6B76A" stroke={INK} strokeWidth="3" />
    <rect x="120" y="186" width="30" height="22" fill="#E7A55D" stroke={INK} strokeWidth="3" />
    <circle cx="252" cy="44" r="24" fill="#3B2A63" stroke={W} strokeWidth="4" />
    <path d="M252 58c-7-8-11-13-11-18a11 11 0 0 1 22 0c0 5-4 10-11 18z" fill={W} />
    <path d="M72 208h176" stroke={INK} strokeWidth="5" strokeLinecap="round" />
  </svg>
);

const Van = () => (
  <svg viewBox="0 0 320 240">
    <circle cx="160" cy="124" r="104" fill={W} opacity="0.16" />
    <rect x="42" y="72" width="150" height="104" rx="10" fill={W} />
    <path d="M192 96h44c10 0 16 4 22 14l20 30v36H192z" fill="#F1EFF6" />
    <path d="M204 106h30l18 28h-48z" fill="#CFCBDC" />
    <rect x="42" y="150" width="236" height="26" fill="#A3A0AD" />
    <text x="117" y="130" textAnchor="middle" fontFamily="Outfit" fontWeight="800" fontSize="32" fill="#5B3DF0">Jiffy</text>
    <circle cx="92" cy="182" r="22" fill={INK} />
    <circle cx="92" cy="182" r="9" fill="#BDB9C8" />
    <circle cx="236" cy="182" r="22" fill={INK} />
    <circle cx="236" cy="182" r="9" fill="#BDB9C8" />
    <ellipse cx="164" cy="208" rx="110" ry="6" fill={INK} opacity="0.25" />
    <circle cx="46" cy="52" r="22" fill={W} />
    <path d="M46 64c-7-8-11-13-11-18a11 11 0 0 1 22 0c0 5-4 10-11 18z" fill="#6B6585" />
    <circle cx="274" cy="58" r="22" fill={W} />
    <path d="M264 58l7 7 13-14" stroke="#6B6585" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Monitor = () => (
  <svg viewBox="0 0 320 240">
    <circle cx="160" cy="118" r="104" fill={W} opacity="0.16" />
    <rect x="46" y="24" width="228" height="150" rx="12" fill={INK} />
    <rect x="56" y="34" width="208" height="122" rx="6" fill={W} />
    <rect x="68" y="44" width="184" height="44" rx="10" fill="#F4F2FA" />
    <circle cx="86" cy="66" r="10" fill="#22C55E" />
    <path d="M81 66l4 4 7-8" stroke={W} strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="104" y="58" width="90" height="8" rx="4" fill="#2A2540" />
    <rect x="104" y="72" width="60" height="6" rx="3" fill="#B9B2CF" />
    <path d="M70 136c16-2 22-16 38-14s20 14 34 2 18-18 30-8" stroke="#7C5CFC" strokeWidth="5" fill="none" strokeLinecap="round" />
    {[22, 34, 40].map((h, i) => (
      <rect key={i} x={196 + i * 18} y={146 - h} width="12" height={h} rx="3" fill="#5B3DF0" />
    ))}
    <path d="M140 174h40l8 30h-56z" fill="#2E2944" />
    <rect x="118" y="202" width="84" height="10" rx="5" fill="#2E2944" />
    <circle cx="36" cy="140" r="22" fill="#22C55E" />
    <path d="M36 152c-6-7-10-11-10-16a10 10 0 0 1 20 0c0 5-4 9-10 16z" fill={W} />
    <circle cx="286" cy="150" r="22" fill="#FACC15" />
    <path d="M276 160v-8M286 160v-16M296 160v-22" stroke={W} strokeWidth="5" strokeLinecap="round" />
  </svg>
);

const ARTS: Record<ArtKey, () => JSX.Element> = {
  stopwatch: Stopwatch,
  city: City,
  growth: Growth,
  crew: Crew,
  integrations: Integrations,
  dashboard: Dashboard,
  couriers: Couriers,
  tracking: Tracking,
  rates: Rates,
  signup: Signup,
  connect: Connect,
  darkstore: DarkStore,
  van: Van,
  monitor: Monitor,
};

export const Art = ({ k }: { k: ArtKey }) => {
  const C = ARTS[k];
  return <C />;
};
