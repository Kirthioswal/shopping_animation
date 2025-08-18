import { Card } from "@/components/ui/card";
import { useEffect } from "react";

interface ProcessStep {
  title: string;
  description: string;
  time: string;
  icon: string;
  gradient: string;
}

const processSteps: ProcessStep[] = [
  {
    title: "Where onboarding takes seconds.",
    description: "Get started instantly with our streamlined setup process.",
    time: "Seconds",
    icon: "⚡",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Where training takes minutes.",
    description: "Train your AI assistants with your specific workflows and preferences.",
    time: "Minutes",
    icon: "🧠",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "And where tasks are done in milliseconds.",
    description: "Watch your AI team execute tasks at lightning speed.",
    time: "Milliseconds",
    icon: "🚀",
    gradient: "from-green-500 to-emerald-500",
  },
];

const ProcessSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
            Welcome to a world where{" "}
            <span className="gradient-text">AI does your manual work.</span>{" "}
            For you.
          </h2>
        </div>

        {/* Interactive 3D Process Cards */}
        <div className="space-y-32">
          {/* Onboarding Card */}
          <div className="opacity-0 translate-y-20 animate-on-scroll">
            <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-2xl mb-6">
                    ⚡
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                    Where onboarding takes <span className="text-orange-400">seconds.</span>
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Get started instantly with our streamlined setup process.
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl flex items-center justify-center border border-orange-500/30">
                    <div className="text-8xl transform hover:scale-110 transition-transform duration-300">
                      🧑‍🚀
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-orange-500/80 backdrop-blur-sm rounded-lg p-3 border border-orange-400/50">
                    <div className="text-sm text-white font-medium">📦 Package ready!</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Training Card */}
          <div className="opacity-0 translate-y-20 animate-on-scroll">
            <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center lg:grid-flow-col-dense">
                <div className="lg:col-start-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 text-2xl mb-6">
                    🧠
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                    Where training takes <span className="text-purple-400">minutes.</span>
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Train your AI assistants with your specific workflows and preferences.
                  </p>
                </div>
                <div className="lg:col-start-1 relative">
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-3xl flex items-center justify-center border border-purple-500/30 relative">
                    <div className="text-8xl transform hover:scale-110 transition-transform duration-300">
                      🧠
                    </div>
                    {/* Training Interface Overlay */}
                    <div className="absolute -top-6 -right-6 bg-purple-500/80 backdrop-blur-sm rounded-xl p-4 border border-purple-400/50 max-w-xs">
                      <div className="space-y-3">
                        <div className="text-sm text-white font-medium">What's your business name?</div>
                        <div className="bg-white/20 rounded-lg p-2 text-sm text-white">Sintra</div>
                        <div className="text-sm text-white font-medium">What's the brand voice?</div>
                        <div className="bg-white/20 rounded-lg p-2 text-sm text-white">Friendly, simple</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Task Completion Card */}
          <div className="opacity-0 translate-y-20 animate-on-scroll">
            <Card className="relative overflow-hidden bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-2xl mb-6">
                    🚀
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                    And where tasks are done in <span className="text-green-400">milliseconds.</span>
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Watch your AI team execute tasks at lightning speed.
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl flex items-center justify-center border border-green-500/30">
                    <div className="text-8xl transform hover:scale-110 transition-transform duration-300">
                      ⚡
                    </div>
                  </div>
                  {/* AI Chat Bubbles */}
                  <div className="absolute -top-6 -left-6 space-y-3">
                    <div className="bg-orange-500/80 backdrop-blur-sm rounded-xl p-4 border border-orange-400/50 max-w-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-xs">🤖</div>
                        <span className="text-sm text-white font-medium">Commet</span>
                      </div>
                      <div className="text-sm text-white">Your eCommerce strategy plan for upcoming week...</div>
                    </div>
                    <div className="bg-purple-500/80 backdrop-blur-sm rounded-xl p-4 border border-purple-400/50 max-w-xs ml-8">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-xs">🎨</div>
                        <span className="text-sm text-white font-medium">Soshie</span>
                      </div>
                      <div className="text-sm text-white">I've generated captions for your new team photo post for LinkedIn.</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;