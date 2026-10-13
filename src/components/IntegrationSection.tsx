import amazon from "@/assets/icons/amazon-icon.png";
import flipkart from "@/assets/icons/flipkart-icon.png";
import shopify from "@/assets/icons/shopify-icon.png";
import myntra from "@/assets/icons/myntra-icon.webp";
import meesho from "@/assets/icons/Meesho-icon.png";
import snapdeal from "@/assets/icons/snapdeal-icon.png";
import woo from "@/assets/icons/woocomm-icon.png";
import unicomm from "@/assets/icons/unicomm-icon.png";

const TOOLS = [
  { name: "Amazon", src: amazon },
  { name: "Flipkart", src: flipkart },
  { name: "Shopify", src: shopify },
  { name: "Myntra", src: myntra },
  { name: "Meesho", src: meesho },
  { name: "Snapdeal", src: snapdeal },
  { name: "WooCommerce", src: woo },
  { name: "Unicommerce", src: unicomm },
];

const IntegrationSection = () => (
  <section id="integration-section" className="relative bg-night-950 py-24 md:py-32">
    <div className="container grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-jiffy-400" />
          Integrations
        </span>
        <h2 className="mt-5 text-[clamp(32px,4vw,56px)] font-bold leading-[1.05]">
          Integrates with
          <br />
          <span className="bg-gradient-to-r from-jiffy-400 to-jiffy-600 bg-clip-text text-transparent">your favorite tools.</span>
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
          <span className="font-semibold text-ink">Integrations.</span> Streamline business processes by bringing your
          favorite tools and AI helpers together. AI for business makes working with integrations easier than ever.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {TOOLS.map((t) => (
          <li
            key={t.name}
            className="group flex flex-col items-center gap-3 rounded-3xl border border-white/[0.07] bg-white/[0.03] p-5 transition-colors hover:border-jiffy-500/40 hover:bg-white/[0.06]"
          >
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
              <img src={t.src} alt="" className="h-10 w-10 object-contain" />
            </span>
            <span className="text-sm font-medium text-ink-muted">{t.name}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default IntegrationSection;
