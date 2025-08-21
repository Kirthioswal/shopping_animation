import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PlaySection from "@/components/PlaySection";
import AutomationSection from "@/components/AutomationSection";
import IntegrationSection from "@/components/IntegrationSection";
import TeamSection from "@/components/TeamSection";
import ProcessSection from "@/components/ProcessSection";
import AITeamSection from "@/components/AITeamSection";
import BusinessLearningSection from "@/components/BusinessLearningSection";
import CommandSection from "@/components/CommandSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      
      {/* Ensure enough scrollable content for video animation */}
      <div className="relative z-20 bg-background">
        <PlaySection />
        <AutomationSection />
        <IntegrationSection />
        <TeamSection />
        <ProcessSection />
        <AITeamSection />
        <BusinessLearningSection />
        <CommandSection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
