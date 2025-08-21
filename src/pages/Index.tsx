import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PlaySection from "@/components/PlaySection";
import AutomationSection from "../components/AutomationSection";
import IntegrationSection from "../components/IntegrationSection";
import CommandTeamSection from "../components/CommandTeamSection";
import ProcessSection from "@/components/ProcessSection";
import AITeamSection from "@/components/AITeamSection";
import BusinessLearningSection from "@/components/BusinessLearningSection";
import CommandSection from "@/components/CommandSection";
import FAQSection from "../components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      
      {/* Overlapping content starts at 80% of hero scroll (frame 160) */}
      <div className="relative z-20 bg-background" style={{ marginTop: '-5vh' }}>
        
        <AutomationSection />
        <IntegrationSection />
        {/* <TeamSection /> */}
        {/* <ProcessSection /> */}
        <AITeamSection />
        {/* <PlaySection /> */}
        {/* <BusinessLearningSection /> */}
        {/* <CommandSection /> */}
        {/* <CommandTeamSection /> */}
        <FAQSection />
      
        <Footer />
      </div>
    </div>
  );
};

export default Index;
