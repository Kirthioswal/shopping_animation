import logo from "@/assets/logo.png";
import { SHOWCASES, TONES, type FeatureCardData } from "../content";
import { Art } from "../ui/Art";

/** The sneaker that drops into the box at the dark store. */
export const Sneaker = () => (
  <svg viewBox="0 0 120 70" aria-hidden="true">
    <path d="M8 46c0-12 4-26 10-30 6-4 12 2 18 6 8 6 18 8 28 10 16 2 34 6 42 14 6 6 6 14 2 18H14c-4 0-6-6-6-18z" fill="#fff" />
    <path d="M8 56h100c4 0 6 2 6 5s-2 5-6 5H14c-4 0-6-2-6-5z" fill="#F97316" />
    <path d="M30 26l8 10M40 24l8 10M50 26l8 10" stroke="#C7C2D6" strokeWidth="3" strokeLinecap="round" />
    <path d="M70 40c10 0 24 4 32 10" stroke="#7C5CFC" strokeWidth="5" fill="none" strokeLinecap="round" />
  </svg>
);

export const FeatureCard = ({ card }: { card: FeatureCardData }) => (
  <article className="fcard" data-card style={{ background: TONES[card.tone] }}>
    <div>
      <div className="fcard-eyebrow">{card.eyebrow}</div>
      <h3 className="fcard-title">{card.title}</h3>
      {card.sub && <div className="fcard-sub">{card.sub}</div>}
      <p className="fcard-body">{card.body}</p>
    </div>
    <div className="fcard-art">
      <Art k={card.art} />
    </div>
  </article>
);

/**
 * The one package that travels the whole story. Drawn at its full showcase
 * size and scaled down when it is being carried.
 */
export const Package = () => (
  <div className="pkg" data-pkg aria-hidden="true">
    <div className="pkg-side" />
    <div className="pkg-top">
      <div className="pkg-flap-back" data-part="flapBack" />
      <div className="pkg-tape-top" data-part="tapeTop" />
    </div>

    <div
      data-part="item"
      style={{ position: "absolute", left: "50%", bottom: "96%", width: "34%", marginLeft: "-17%", visibility: "hidden" }}
    >
      <Sneaker />
    </div>

    <div className="pkg-front">
      <div className="pkg-flap-front" data-part="flapFront" />
      <div className="pkg-tape-front" data-part="tapeFront" />

      <div className="pkg-decor" data-part="decor">
        {/* ink stamp */}
        <div
          style={{
            position: "absolute",
            left: "7%",
            top: "30%",
            width: "30%",
            padding: "1.6cqw 2cqw",
            border: "0.5cqw dashed rgba(234,88,12,0.75)",
            borderRadius: "2cqw",
            transform: "rotate(-7deg)",
            textAlign: "center",
            mixBlendMode: "multiply",
          }}
        >
          <img src={logo} alt="" style={{ width: "80%", margin: "0 auto", opacity: 0.9 }} />
          <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "1.7cqw", color: "#C2410C", letterSpacing: "0.2em", marginTop: "0.6cqw" }}>
            EXPRESS
          </div>
        </div>
        {/* this side up */}
        <svg viewBox="0 0 60 40" style={{ position: "absolute", left: "8%", bottom: "9%", width: "9%", opacity: 0.6 }}>
          <path d="M14 36V10M6 18l8-8 8 8M44 36V10M36 18l8-8 8 8" stroke="#5B3412" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* shipping label */}
        <div
          data-part="label"
          style={{
            position: "absolute",
            right: "7%",
            top: "32%",
            width: "34%",
            padding: "1.8cqw 2cqw",
            borderRadius: "1.2cqw",
            background: "#FFFDF8",
            boxShadow: "0 0.6cqw 1.2cqw rgba(90,50,15,0.3)",
            color: "#1E1B2E",
            fontFamily: "Inter",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.5cqw", fontWeight: 700, fontFamily: "Outfit" }}>
            <span>JIFFY EXPRESS</span>
            <span style={{ color: "#F97316" }}>30 MIN</span>
          </div>
          <div style={{ fontSize: "1.2cqw", marginTop: "0.8cqw", opacity: 0.7 }}>SHIP TO</div>
          <div style={{ fontSize: "1.5cqw", fontWeight: 600 }}>Sector 28, Gurugram</div>
          <div style={{ display: "flex", gap: "0.35cqw", height: "4.5cqw", marginTop: "1.2cqw", alignItems: "stretch" }}>
            {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 2].map((w, i) => (
              <span key={i} style={{ width: `${w * 0.28}cqw`, background: "#1E1B2E" }} />
            ))}
          </div>
          <div style={{ fontSize: "1.2cqw", marginTop: "0.6cqw", fontWeight: 600, letterSpacing: "0.12em" }}>#JF-2041</div>
        </div>
      </div>

      <div className="pkg-screen">
        {SHOWCASES.map((sc) => (
          <div key={sc.id} data-showcase={sc.id} style={{ position: "absolute", inset: 0 }}>
            {sc.cards.map((c, i) => (
              <FeatureCard key={i} card={c} />
            ))}
          </div>
        ))}
      </div>
      {SHOWCASES.map((sc) => (
        <div key={sc.id} className="pkg-dots" data-dots={sc.id} style={{ visibility: "hidden" }}>
          {sc.cards.map((_, i) => (
            <span key={i} className="pkg-dot">
              <span className="pkg-dot-fill" />
            </span>
          ))}
        </div>
      ))}
    </div>

    {/* tape gun (with the seller's glove) that sweeps across the top */}
    <div data-part="tapeGun" style={{ position: "absolute", left: "-4%", bottom: "100%", width: "22%", visibility: "hidden" }}>
      <svg viewBox="0 0 120 90" style={{ width: "100%", overflow: "visible" }}>
        <circle cx="46" cy="38" r="26" fill="#F97316" />
        <circle cx="46" cy="38" r="12" fill="#FED7AA" />
        <path d="M60 58l40 22H70z" fill="#3A3350" />
        <rect x="14" y="54" width="34" height="34" rx="9" fill="#3A3350" />
        <circle cx="30" cy="62" r="17" fill="#9A3412" />
        <ellipse cx="44" cy="58" rx="7" ry="8" fill="#9A3412" />
      </svg>
    </div>
  </div>
);

export default Package;
