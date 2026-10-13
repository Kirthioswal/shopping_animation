/**
 * Scenery props. Each is an independent SVG whose moving parts carry
 * data-part names and whose hand-off points carry data-anchor names.
 * Viewbox aspect ratios match their .slot-* sizes in story.css.
 */

/** 360x90 (4:1). The box sits on the anchor "table-top". */
export const PackingTable = () => (
  <svg viewBox="0 0 360 90" aria-hidden="true">
    {/* clutter above the top (overflow visible) */}
    <g>
      <circle cx="44" cy="-6" r="14" fill="#F97316" />
      <circle cx="44" cy="-6" r="6" fill="#7C2D12" />
      <rect x="282" y="-20" width="46" height="26" rx="4" fill="#C68A4E" />
      <rect x="288" y="-34" width="34" height="16" rx="3" fill="#D9A066" />
      <path d="M300 -27h10" stroke="#8D5826" strokeWidth="2" />
    </g>
    <rect x="0" y="6" width="360" height="16" rx="5" fill="#8B5A3C" />
    <rect x="0" y="6" width="360" height="5" rx="2.5" fill="#B57A50" />
    <rect x="12" y="22" width="336" height="24" fill="#6E4329" />
    <rect x="28" y="28" width="90" height="12" rx="3" fill="#5A3520" />
    <circle cx="73" cy="34" r="2.5" fill="#C08458" />
    <rect x="26" y="46" width="14" height="44" fill="#5A3520" />
    <rect x="320" y="46" width="14" height="44" fill="#5A3520" />
    <rect data-anchor="table-top" x="170" y="6" width="20" height="0.5" fill="none" />
  </svg>
);

/** 400x348 (1.15:1). Roller door spans x 209..319 (center at 66%). */
export const Warehouse = () => (
  <svg viewBox="0 0 400 348" aria-hidden="true">
    <ellipse cx="210" cy="346" rx="200" ry="8" fill="#000" opacity="0.4" />
    <path d="M6 128L206 64l188 64z" fill="#1A152C" />
    <path d="M6 128L206 64l188 64" stroke="#F97316" strokeWidth="4" fill="none" strokeLinejoin="round" />
    <rect x="20" y="124" width="374" height="224" fill="#29223F" />
    <g stroke="#352D50" strokeWidth="3">
      {Array.from({ length: 23 }, (_, i) => (
        <path key={i} d={`M${30 + i * 16} 176V348`} />
      ))}
    </g>
    <rect x="20" y="124" width="374" height="10" fill="#211B33" />
    {/* sign */}
    <rect x="96" y="138" width="218" height="32" rx="6" fill="#F97316" />
    <text x="205" y="160" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="17" fill="#fff" letterSpacing="2">
      JIFFY DARK STORE
    </text>
    {/* lit window band */}
    <rect x="36" y="196" width="128" height="46" rx="4" fill="#120E1E" />
    <rect x="40" y="200" width="120" height="38" rx="2" fill="#FDBA74" opacity="0.75" />
    <path d="M80 200v38M120 200v38" stroke="#120E1E" strokeWidth="4" />
    <rect x="46" y="222" width="22" height="16" fill="#C68A4E" />
    <rect x="128" y="214" width="26" height="24" fill="#D29A5E" />
    {/* door opening: shelves of parcels inside */}
    <rect x="209" y="178" width="110" height="170" fill="#0C0914" />
    <rect x="209" y="178" width="110" height="170" fill="url(#whGlow)" />
    <defs>
      <radialGradient id="whGlow" cx="50%" cy="80%" r="70%">
        <stop offset="0%" stopColor="#F97316" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
      </radialGradient>
    </defs>
    <g fill="#2E2645">
      <rect x="216" y="226" width="96" height="5" />
      <rect x="216" y="276" width="96" height="5" />
    </g>
    <g fill="#C68A4E">
      <rect x="222" y="206" width="22" height="20" />
      <rect x="250" y="212" width="16" height="14" />
      <rect x="284" y="204" width="24" height="22" />
      <rect x="226" y="258" width="18" height="18" />
      <rect x="276" y="254" width="26" height="22" />
    </g>
    {/* roller door */}
    <g data-part="door">
      <rect x="209" y="178" width="110" height="170" fill="#4A4166" />
      {Array.from({ length: 14 }, (_, i) => (
        <path key={i} d={`M209 ${190 + i * 12}h110`} stroke="#3A3352" strokeWidth="2.5" />
      ))}
      <rect x="252" y="336" width="24" height="6" rx="3" fill="#2A2440" />
    </g>
    <rect x="203" y="172" width="122" height="8" rx="3" fill="#1A152C" />
    <path d="M203 180v168M325 180v168" stroke="#F97316" strokeWidth="5" />
    {/* lamp + beacon */}
    <rect x="254" y="150" width="20" height="6" rx="3" fill="#E5E7EB" />
    <ellipse cx="264" cy="160" rx="30" ry="6" fill="#FDE68A" opacity="0.25" />
    <circle data-part="beacon" cx="206" cy="58" r="7" fill="#F97316" />
    <circle data-anchor="wh-door" cx="264" cy="296" r="0.5" fill="none" />
  </svg>
);

/** 840x400 (2.1:1). Tail + rear ramp face left; the nose runs offscreen right. */
export const CargoPlane = () => (
  <svg viewBox="0 0 840 400" aria-hidden="true">
    <ellipse cx="520" cy="396" rx="330" ry="8" fill="#000" opacity="0.35" />
    {/* far wing + fin */}
    <path d="M470 196l120-90h50l-60 92z" fill="#B9B5CC" />
    <path d="M96 116L44 10h58l78 112z" fill="#F97316" />
    <circle cx="92" cy="58" r="18" fill="#fff" />
    <text x="92" y="66" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="24" fill="#F97316">J</text>
    {/* cargo hold (seen when the ramp is down) */}
    <path d="M150 200L128 230 240 300V262z" fill="#141022" />
    <path d="M150 200L128 230 240 300V262z" fill="url(#holdGlow)" />
    <defs>
      <radialGradient id="holdGlow" cx="70%" cy="70%" r="70%">
        <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#FDBA74" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* fuselage + upswept tail cone */}
    <path d="M240 150h560c60 0 80 40 80 75s-20 75-80 75H240z" fill="#ECEAF3" />
    <path d="M241 150C200 150 150 138 100 112l-8 12 58 76 91 62z" fill="#DCD9E6" />
    <rect x="240" y="206" width="640" height="14" fill="#F97316" />
    <text x="430" y="196" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="30" fill="#2A2440" letterSpacing="1">
      JIFFY AIR CARGO
    </text>
    {Array.from({ length: 6 }, (_, i) => (
      <circle key={i} cx={650 + i * 34} cy="182" r="7" fill="#3B3456" />
    ))}
    {/* tail stabilizer */}
    <path d="M58 128l110-6 20 12-114 10z" fill="#C9C5DA" />
    {/* near wing + engine */}
    <path d="M440 236h250l70 96H480z" fill="#CFCBDF" />
    <ellipse cx="610" cy="318" rx="62" ry="22" fill="#B4AFC8" />
    <ellipse cx="664" cy="318" rx="10" ry="20" fill="#2A2440" />
    {/* gear */}
    <path d="M340 300v52M420 300v52" stroke="#5B5470" strokeWidth="8" />
    <circle cx="340" cy="372" r="24" fill="#1F1B2E" />
    <circle cx="340" cy="372" r="9" fill="#8F88A8" />
    <circle cx="420" cy="372" r="24" fill="#1F1B2E" />
    <circle cx="420" cy="372" r="9" fill="#8F88A8" />
    {/* rear ramp: hinged at (240,300); rotate -81deg to touch the ground */}
    <g data-part="ramp">
      <path d="M150 200L128 230 240 300V262z" fill="#C9C5DA" />
      <path d="M128 230L240 300" stroke="#8F88A8" strokeWidth="4" strokeLinecap="round" />
      <path d="M160 222l60 38M150 232l60 38" stroke="#B4AFC8" strokeWidth="2" />
      <circle data-anchor="plane-ramp" cx="186" cy="262" r="0.5" fill="none" />
    </g>
    <circle data-anchor="plane-hold" cx="196" cy="246" r="0.5" fill="none" />
  </svg>
);

/** 360x330 (1.09:1). Door spans x 194..252 (center at 62%). */
export const House = () => (
  <svg viewBox="0 0 360 330" aria-hidden="true">
    <ellipse cx="180" cy="328" rx="175" ry="7" fill="#000" opacity="0.4" />
    <rect x="246" y="58" width="32" height="64" fill="#B9452D" />
    <rect x="242" y="52" width="40" height="10" rx="3" fill="#8F3422" />
    <rect x="40" y="140" width="280" height="190" fill="#F4DCC0" />
    <rect x="270" y="140" width="50" height="190" fill="#E8C9A6" />
    <path d="M16 152L180 40l164 112z" fill="#E4573A" />
    <path d="M16 152L180 40l164 112" stroke="#B83F27" strokeWidth="8" fill="none" strokeLinejoin="round" />
    <circle cx="180" cy="102" r="18" fill="#FFE2B0" stroke="#B83F27" strokeWidth="5" />
    {/* window */}
    <rect x="66" y="186" width="88" height="70" rx="6" fill="#7A4A2E" />
    <rect x="72" y="192" width="76" height="58" rx="3" fill="#FFD28A" />
    <path d="M110 192v58M72 221h76" stroke="#7A4A2E" strokeWidth="4" />
    <path d="M72 192c10 10 10 30 0 40zM148 192c-10 10-10 30 0 40z" fill="#F472B6" opacity="0.85" />
    <rect x="62" y="254" width="96" height="8" rx="3" fill="#7A4A2E" />
    {/* door */}
    <rect x="188" y="208" width="70" height="122" rx="4" fill="#5A2E1C" />
    <rect x="194" y="214" width="58" height="116" fill="#FFD9A0" />
    <rect x="194" y="214" width="58" height="116" fill="url(#homeGlow)" />
    <defs>
      <radialGradient id="homeGlow" cx="50%" cy="60%" r="70%">
        <stop offset="0%" stopColor="#FFF3D6" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#F6B56A" stopOpacity="0.4" />
      </radialGradient>
    </defs>
    <g data-part="door">
      <rect x="194" y="214" width="58" height="116" fill="#A0603A" />
      <rect x="202" y="224" width="42" height="40" rx="3" fill="#8A4F2E" />
      <rect x="202" y="274" width="42" height="46" rx="3" fill="#8A4F2E" />
      <circle cx="242" cy="276" r="4" fill="#FCD34D" />
    </g>
    <rect x="178" y="322" width="90" height="8" rx="3" fill="#C9A27E" />
    <rect x="262" y="214" width="20" height="16" rx="3" fill="#fff" />
    <text x="272" y="227" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="11" fill="#5A2E1C">42</text>
    <ellipse cx="174" cy="200" rx="18" ry="6" fill="#FDE68A" opacity="0.35" />
    <rect x="168" y="186" width="12" height="12" rx="3" fill="#FDE68A" />
    {/* bushes */}
    <circle cx="40" cy="312" r="24" fill="#2F8F5B" />
    <circle cx="66" cy="318" r="18" fill="#3BA56A" />
    <circle cx="318" cy="314" r="20" fill="#2F8F5B" />
    <circle data-anchor="house-door" cx="223" cy="282" r="0.5" fill="none" />
  </svg>
);
