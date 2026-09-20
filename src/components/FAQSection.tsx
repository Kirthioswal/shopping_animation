import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Jiffy?",
    answer: "Jiffy is your all-in-one shipping and fulfillment platform that helps D2C brands, retailers, and e-commerce sellers manage deliveries with speed, reliability, and ease."
  },
  {
    question: "Which integrations do you support?",
    answer: "Jiffy integrates seamlessly with Shopify, Amazon, Myntra, WooCommerce, Swiggy, Zomato, and more—so you can manage everything from a single dashboard."
  },
  {
    question: "How is Jiffy different from other shipping platforms?",
    answer: "Unlike traditional platforms, Jiffy is built to scale with you. Whether you're shipping 10 or 10,000 orders, we ensure faster deliveries, better rates, and stress-free logistics."
  },
  {
    question: "What pricing plans do you offer?",
    answer: "We offer flexible plans tailored to your growth stage—so whether you're just starting out or scaling big, Jiffy adapts to your needs."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy—sign up, connect your store, choose your preferred courier partners, and start shipping instantly with Jiffy."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Heading */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Questions?{" "}
              <br />
              Let's clear things up.
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              We get it—shipping, logistics, integrations, fulfillment… it can sound overwhelming. But with Jiffy, things are simple, fast, and stress-free.

            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We’ve put together answers to the most common questions to help you get started. And if you ever need more, our support team is just a click away—always ready to help.

            </p>
          </div>

          {/* Right Side - FAQ Items */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-700 pb-4"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left py-4 text-white hover:text-gray-300 transition-colors"
                >
                  <span className="text-lg font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
