import { ArrowRight, Check, ChevronDown, MapPin, Minus, Plus, Zap } from "lucide-react";
import logo from "@/assets/logo.png";
import { Sneaker } from "./Package";

/**
 * Customer's phone. The checkout → swipe to pay → order placed sequence is
 * played by the intro timeline (intro.ts) on page load; sizes use container
 * units so the phone scales with --phone-h.
 */
export const OrderPhone = () => (
  <div className="relative h-full w-full" style={{ containerType: "inline-size" }}>
    <div
      className="absolute -inset-[8cqw] rounded-[30cqw] opacity-70 blur-2xl"
      style={{ background: "radial-gradient(closest-side, rgba(249,115,22,0.35), transparent)" }}
    />
    <div className="relative h-full w-full rounded-[13cqw] bg-[#0B0A12] p-[2.4cqw] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
      <div className="relative h-full w-full overflow-hidden rounded-[11cqw] bg-[#100E1B] text-ink">
        {/* dynamic island + status bar */}
        <div className="absolute left-1/2 top-[2.4cqw] h-[7cqw] w-[30cqw] -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center justify-between px-[7cqw] pt-[3.6cqw] text-[3.6cqw] font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-[1.2cqw] opacity-80">
            <span className="inline-block h-[2.6cqw] w-[5cqw] rounded-[0.8cqw] border border-white/70" />
          </span>
        </div>

        {/* app header */}
        <div className="mt-[4cqw] flex items-center justify-between px-[6cqw]">
          <img src={logo} alt="Jiffy" className="h-[7.5cqw] w-auto" />
          <span className="flex items-center gap-[1cqw] rounded-full bg-jiffy-500/15 px-[2.6cqw] py-[1cqw] text-[3.2cqw] font-semibold text-jiffy-300">
            <Zap className="h-[1.1em] w-[1.1em]" /> 30 min
          </span>
        </div>
        <div className="mt-[2.4cqw] flex items-center gap-[1.4cqw] px-[6cqw] text-[3.2cqw] text-ink-muted">
          <MapPin className="h-[1.1em] w-[1.1em] text-jiffy-400" />
          <span className="font-semibold text-ink">Home</span> · Sector 28, Gurugram
          <ChevronDown className="h-[1.1em] w-[1.1em]" />
        </div>

        {/* ---------- checkout ---------- */}
        <div data-ph="cart" className="absolute inset-x-0 bottom-0 top-[29cqw] px-[5cqw]">
          <div className="flex items-baseline justify-between">
            <h3 className="text-[6cqw] font-bold">Your cart</h3>
            <span className="text-[3.2cqw] text-ink-muted">1 item</span>
          </div>

          <div className="mt-[3cqw] flex items-center gap-[3.5cqw] rounded-[5cqw] bg-white/[0.05] p-[3cqw] ring-1 ring-white/10">
            <div className="grid h-[19cqw] w-[19cqw] shrink-0 place-items-center rounded-[4cqw]" style={{ background: "linear-gradient(135deg,#EDE7FF,#FFE5D2)" }}>
              <div className="w-[15cqw]">
                <Sneaker />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[4cqw] font-semibold">Classic Sneakers</div>
              <div className="text-[3.1cqw] text-ink-muted">White · UK 8</div>
              <div className="mt-[1.4cqw] flex items-center justify-between">
                <span className="font-display text-[4.4cqw] font-bold">₹2,499</span>
                <span className="flex items-center gap-[2cqw] rounded-full bg-jiffy-500 px-[2cqw] py-[0.6cqw] text-[3.2cqw] font-bold text-white">
                  <Minus className="h-[0.95em] w-[0.95em]" />1<Plus className="h-[0.95em] w-[0.95em]" />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-[3.5cqw] space-y-[1.8cqw] rounded-[5cqw] bg-white/[0.03] p-[3.5cqw] text-[3.3cqw] ring-1 ring-white/5">
            <div className="flex justify-between text-ink-muted">
              <span>Item total</span>
              <span className="text-ink">₹2,499</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Delivery fee</span>
              <span>
                <s className="mr-[1.2cqw] opacity-60">₹49</s>
                <span className="font-semibold text-mint">FREE</span>
              </span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-[1.8cqw] text-[3.8cqw] font-bold">
              <span>To pay</span>
              <span>₹2,499</span>
            </div>
          </div>

          <div className="mt-[3cqw] flex items-center gap-[2cqw] rounded-[4cqw] bg-mint/10 px-[3.5cqw] py-[2.2cqw] text-[3.1cqw] text-mint">
            <Zap className="h-[1.1em] w-[1.1em]" /> Arrives in 30 min from Dark Store #04
          </div>

          {/* swipe to pay */}
          <div className="absolute inset-x-[5cqw] bottom-[7cqw] h-[14cqw] overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/10">
            <div data-ph="fill" className="absolute inset-y-0 left-0 w-full origin-left rounded-full" style={{ background: "linear-gradient(90deg,#F97316,#FB923C)", transform: "scaleX(0.16)" }} />
            <div className="absolute inset-0 grid place-items-center text-[3.6cqw] font-semibold text-ink/80">Swipe to pay ₹2,499</div>
            <div data-ph="knob" className="absolute left-[1.2cqw] top-[1.2cqw] grid h-[11.6cqw] w-[11.6cqw] place-items-center rounded-full bg-white text-[5cqw] text-jiffy-600 shadow-lg">
              <ArrowRight className="h-[1em] w-[1em]" />
            </div>
          </div>
        </div>

        {/* ---------- order placed ---------- */}
        <div data-ph="placed" className="invisible absolute inset-x-0 bottom-0 top-[29cqw] flex flex-col items-center px-[6cqw] pt-[9cqw] text-center">
          <div data-ph="check" className="grid h-[30cqw] w-[30cqw] place-items-center rounded-full bg-green-500 text-[16cqw] shadow-[0_0_0_4cqw_rgba(34,197,94,0.15)]">
            <Check className="h-[1em] w-[1em] text-white" strokeWidth={3} />
          </div>
          <h3 data-ph="placedText" className="mt-[7cqw] text-[7.4cqw] font-bold">Order placed!</h3>
          <p data-ph="placedSub" className="mt-[1.5cqw] text-[3.6cqw] text-ink-muted">
            #JF-2041 · Arriving in <span className="font-semibold text-jiffy-300">30 min</span>
          </p>
          <div data-ph="steps" className="mt-[8cqw] w-full space-y-[3cqw] text-left text-[3.4cqw]">
            {["Order placed", "Packing at dark store", "On the way", "Delivered"].map((s, i) => (
              <div key={s} className={`flex items-center gap-[3cqw] ${i > 1 ? "opacity-40" : ""}`}>
                <span className={`grid h-[5.4cqw] w-[5.4cqw] place-items-center rounded-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-jiffy-500 animate-pulse" : "bg-white/15"}`}>
                  {i === 0 && <Check className="h-[0.9em] w-[0.9em] text-white" strokeWidth={3} />}
                </span>
                <span className={i === 1 ? "font-semibold text-ink" : "text-ink-muted"}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <span data-anchor="phone-top" className="absolute left-1/2 top-[16%] h-px w-px" />
  </div>
);

export const OrderPopup = () => (
  <div className="popup" data-popup aria-hidden="true">
    <div className="flex items-center gap-3 rounded-2xl border-l-4 border-jiffy-500 bg-white p-3 pr-4 text-[#1E1B2E] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-500 text-white">
        <Check className="h-5 w-5" strokeWidth={3} />
      </div>
      <div className="min-w-0">
        <div className="font-display text-[15px] font-bold leading-tight">Order confirmed</div>
        <div className="truncate text-xs text-slate-500">#JF-2041 · Classic Sneakers</div>
        <div className="mt-0.5 text-[11px] font-semibold text-jiffy-600">Sending to Dark Store #04…</div>
      </div>
    </div>
  </div>
);

export default OrderPhone;
