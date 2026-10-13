import Header from "@/components/Header";
import IntegrationSection from "@/components/IntegrationSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Story from "@/story/Story";
import { useSmoothScroll } from "@/story/scroll";

const Index = () => {
  useSmoothScroll();

  return (
    <div className="relative bg-night-950">
      <Header />
      <main>
        {/* Pinned scroll story: order → pack → showcase → warehouse → air → doorstep */}
        <Story />
        <IntegrationSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
