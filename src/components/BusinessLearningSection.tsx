import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { Globe, Facebook, Camera, DollarSign, BookOpen, MessageCircle, FileText } from "lucide-react";

interface DataSource {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  position: string;
}

const dataSources: DataSource[] = [
  {
    title: "Brand website",
    subtitle: "eCommerce, 24 pages",
    icon: <Globe className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
    position: "top-8 left-1/2 transform -translate-x-1/2"
  },
  {
    title: "Facebook Insights",
    subtitle: "Trustpilot, 43 reviews",
    icon: <Facebook className="w-5 h-5" />,
    color: "from-blue-600 to-blue-800",
    position: "top-1/4 left-8"
  },
  {
    title: "Team Photos",
    subtitle: "Company retreat 2024",
    icon: <Camera className="w-5 h-5" />,
    color: "from-green-500 to-emerald-500",
    position: "top-1/4 right-8"
  },
  {
    title: "Services pricing",
    subtitle: "sintra.ai, +2 more",
    icon: <Globe className="w-5 h-5" />,
    color: "from-gray-500 to-gray-700",
    position: "top-1/2 left-4 transform -translate-y-1/2"
  },
  {
    title: "Conversation with Julia",
    subtitle: "Follow-up scheduled",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "from-green-600 to-teal-500",
    position: "top-1/2 right-4 transform -translate-y-1/2"
  },
  {
    title: "Team handbook",
    subtitle: "18 pages, guidelines",
    icon: <BookOpen className="w-5 h-5" />,
    color: "from-red-500 to-orange-500",
    position: "bottom-1/4 left-8"
  },
  {
    title: "Client proposal",
    subtitle: "$25k budget",
    icon: <FileText className="w-5 h-5" />,
    color: "from-blue-500 to-indigo-600",
    position: "bottom-1/4 right-8"
  }
];

const BusinessLearningSection = () => {
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
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 opacity-0 translate-y-20 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            They learn your business.{" "}
            <br />
            <span className="gradient-text">Just like real helpers.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Answer questions about your brand, add files, instructions, and your website for more 
            unique results. The more information they have, the better the outcome.
          </p>
        </div>

        {/* Central Learning Hub */}
        <div className="relative flex justify-center items-center min-h-[700px]">
          {/* Central Astronaut */}
          <div className="opacity-0 translate-y-20 animate-on-scroll relative z-10">
            <div className="relative">
              {/* Main Astronaut Body - Much Larger */}
              <div className="w-80 h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center text-8xl transform hover:scale-105 transition-transform duration-300 relative shadow-2xl">
                <div className="absolute inset-4 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 rounded-full flex items-center justify-center shadow-inner">
                  <div className="text-7xl">👩‍🚀</div>
                </div>
                
                {/* Enhanced LinkedIn Badge */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                  <span className="text-white font-bold text-lg">in</span>
                </div>
                
                {/* Enhanced Antenna with Multiple Layers */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-3 h-12 bg-gradient-to-t from-purple-400 to-blue-300 rounded-full">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-300 rounded-full animate-pulse shadow-lg">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-80"></div>
                  </div>
                </div>
                
                {/* Side Antennas */}
                <div className="absolute top-1/4 -left-6 w-2 h-8 bg-gradient-to-t from-purple-300 to-pink-300 rounded-full rotate-45"></div>
                <div className="absolute top-1/4 -right-6 w-2 h-8 bg-gradient-to-t from-purple-300 to-pink-300 rounded-full -rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Floating Data Source Cards with Precise Connection Lines */}
          {dataSources.map((source, index) => (
            <div
              key={source.title}
              className={`absolute ${source.position} opacity-0 translate-y-20 animate-on-scroll`}
              style={{ animationDelay: `${(index + 1) * 0.15}s` }}
            >
              <Card className={`bg-gradient-to-r ${source.color}/15 border border-current/30 p-4 backdrop-blur-sm shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group max-w-xs relative`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${source.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {source.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground group-hover:text-white transition-colors">
                      {source.title}
                    </div>
                    <div className="text-xs text-muted-foreground group-hover:text-white/90 transition-colors mt-1">
                      {source.subtitle}
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Direct Connection Line to Center */}
              <svg 
                className="absolute top-1/2 left-1/2 pointer-events-none z-0" 
                style={{
                  width: '200px',
                  height: '200px',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <line 
                  x1="100" 
                  y1="100" 
                  x2={
                    source.position.includes('left') ? '150' : 
                    source.position.includes('right') ? '50' : '100'
                  }
                  y2={
                    source.position.includes('top') ? '150' : 
                    source.position.includes('bottom') ? '50' : '100'
                  }
                  stroke="rgba(139, 92, 246, 0.3)" 
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              </svg>
            </div>
          ))}

          {/* Central Glow Effect */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-96 h-96 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessLearningSection;