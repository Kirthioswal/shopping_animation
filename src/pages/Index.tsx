import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PlaySection from "@/components/PlaySection";
import TeamSection from "@/components/TeamSection";
import ProcessSection from "@/components/ProcessSection";
import AITeamSection from "@/components/AITeamSection";
import BusinessLearningSection from "@/components/BusinessLearningSection";
import CommandSection from "@/components/CommandSection";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <HeroSection />
      <PlaySection />
      <TeamSection />
      <ProcessSection />
      <AITeamSection />
      <BusinessLearningSection />
      <CommandSection />
    </div>
  );
};

export default Index;
