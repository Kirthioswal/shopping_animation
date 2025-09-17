import { Button } from "@/components/ui/button";
import { Play, ChevronDown } from "lucide-react";
import AstronautScroll from "./AstronautScroll";
import TypingEffect from "./TypingEffect";

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

      {/* Main Headline - positioned above background */}
      <div className="absolute top-80 left-1/2 transform -translate-x-1/2 z-30 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 leading-tight">
          <TypingEffect 
            text="Need it now?"
            speed={80}
          />
          <br />
          <TypingEffect 
            text="Get it in a "
            speed={80}
            delay={1500}
          />
          <TypingEffect 
            text="Jiffy."
            speed={80}
            className="text-[#F97316]"
            delay={2500}
          />
        </h1>
        
        {/* <ChevronDown className="w-8 h-8 text-foreground animate-bounce mx-auto mt-4" /> */}
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30" style={{top: 'calc(100vh - 4rem)'}}>
        <ChevronDown className="w-8 h-8 text-foreground animate-bounce" />
      </div>
      

      {/* Scroll-synced astronaut image sequence background */}
      <AstronautScroll 
        containerHeight="min-h-[160vh]"
        className="fixed top-20 inset-x-0 bottom-0 z-0"
        animationHeight={1.6}
      />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Additional gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(210,220,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/30" />
      
      {/* Floating badge */}
      {/* <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm">
          <span className="text-muted-foreground">Jiffy (All Help you need)</span>
          <Button size="sm" className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90">
            Buy now →
          </Button>
        </div>
      </div> */}

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Headline moved to top - keeping this div for spacing */}

        

        {/* Video Button */}
        {/* <div className="mb-12">
          <Button 
            variant="ghost" 
            className="text-foreground hover:text-primary transition-colors text-lg group"
          >
            <Play className="w-5 h-5 mr-2 group-hover:text-primary" />
            Watch Video
          </Button>
        </div> */}

        {/* Subtitle */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              My Jiffy World:
            </h1>
          </div>
          <h2 className="text-xl md:text-2xl text-muted-foreground leading-relaxed p-6 rounded-lg transition-all duration-300 hover:bg-black/20 hover:backdrop-blur-sm">
            <span className="text-foreground font-semibold">Powering Quick Commerce</span>
            <br />
            From dark stores to doorsteps, Jiffy makes quick commerce logistics effortless—delivering products to your customers in record time.          
          </h2>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* <Button 
            variant="ghost" 
            className="text-foreground hover:text-primary transition-colors text-lg group"
          >
            <Play className="w-5 h-5 mr-2 group-hover:text-primary" />
            Watch Video
          </Button> */}
          <Button 
            className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity text-lg px-8 py-3"
            onClick={() => window.open('https://my.jiffy.world/login', '_blank')}
          >
            Get Started
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