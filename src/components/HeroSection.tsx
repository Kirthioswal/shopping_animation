import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import AstronautScroll from "./AstronautScroll";
import astronautVideo from "@/assets/astronaut.mp4";

const HeroSection = () => {
  return (
    <>
      {/* Logo positioned above video background */}
      {/* <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="text-3xl font-bold gradient-text">sintra</div> */}
        {/* Main Headline */}
        {/* <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 leading-tight">
          Your helpers,{" "}
          <span className="gradient-text">on AI.</span>
        </h1>
      </div> */}

      {/* Scroll-synced astronaut video background */}
      <AstronautScroll 
        videoSrc={astronautVideo}
        containerHeight="min-h-[200vh]"
        className="fixed top-20 inset-x-0 bottom-0 z-0"
      />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Additional gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(210,220,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/30" />
      
      {/* Floating badge */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm">
          <span className="text-muted-foreground">Jiffy (All Help you need)</span>
          <Button size="sm" className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90">
            Buy now →
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 leading-tight">
          Your first step of Ecomm,{" "}
          <span className="gradient-text">Jiffy</span>
        </h1>

        

        {/* Video Button */}
        <div className="mb-12">
          <Button 
            variant="ghost" 
            className="text-foreground hover:text-primary transition-colors text-lg group"
          >
            <Play className="w-5 h-5 mr-2 group-hover:text-primary" />
            Watch Video
          </Button>
        </div>

        {/* Subtitle */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">Sintra X:</span> The world's first AI-powered assistants, powered by your AI brain. That can complete tasks for you, even while you sleep. All to save your most valuable asset – your time.
          </h2>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="ghost" 
            className="text-foreground hover:text-primary transition-colors text-lg group"
          >
            <Play className="w-5 h-5 mr-2 group-hover:text-primary" />
            Watch Video
          </Button>
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity text-lg px-8 py-3">
            Get Access
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
    </>
  );
};

export default HeroSection;