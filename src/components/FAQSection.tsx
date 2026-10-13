import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = [
  {
    q: "What is Jiffy?",
    a: "Jiffy is your all-in-one shipping and fulfillment platform that helps D2C brands, retailers, and e-commerce sellers manage deliveries with speed, reliability, and ease.",
  },
  {
    q: "Which integrations do you support?",
    a: "Jiffy integrates seamlessly with Shopify, Amazon, Myntra, WooCommerce, Swiggy, Zomato, and more—so you can manage everything from a single dashboard.",
  },
  {
    q: "How is Jiffy different from other shipping platforms?",
    a: "Unlike traditional platforms, Jiffy is built to scale with you. Whether you're shipping 10 or 10,000 orders, we ensure faster deliveries, better rates, and stress-free logistics.",
  },
  {
    q: "What pricing plans do you offer?",
    a: "We offer flexible plans tailored to your growth stage—so whether you're just starting out or scaling big, Jiffy adapts to your needs.",
  },
  {
    q: "How do I get started?",
    a: "Getting started is easy—sign up, connect your store, choose your preferred courier partners, and start shipping instantly with Jiffy.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq-section" className="bg-night-950 py-24 md:py-32">
      <div className="container grid items-start gap-14 lg:grid-cols-2">
        <div>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-jiffy-400" />
            FAQs
          </span>
          <h2 className="mt-5 text-[clamp(32px,4vw,56px)] font-bold leading-[1.05]">
            Questions?
            <br />
            <span className="bg-gradient-to-r from-jiffy-400 to-jiffy-600 bg-clip-text text-transparent">Let's clear things up.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            We get it—shipping, logistics, integrations, fulfillment… it can sound overwhelming. But with Jiffy, things are
            simple, fast, and stress-free.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            We’ve put together answers to the most common questions to help you get started. And if you ever need more,
            our support team is just a click away—always ready to help.
          </p>
        </div>

        <div className="divide-y divide-white/[0.08] rounded-3xl border border-white/[0.07] bg-white/[0.02] px-6">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold text-ink transition-colors hover:text-jiffy-300"
                >
                  {f.q}
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-jiffy-400" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <p className="overflow-hidden leading-relaxed text-ink-muted">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
