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
    position: "top-16 left-1/2 transform -translate-x-1/2"
  },
  {
    title: "Facebook Insights",
    subtitle: "Trustpilot, 43 reviews",
    icon: <Facebook className="w-5 h-5" />,
    color: "from-blue-600 to-blue-800",
    position: "top-32 left-16"
  },
  {
    title: "Team Photos",
    subtitle: "Company retreat 2024",
    icon: <Camera className="w-5 h-5" />,
    color: "from-green-500 to-emerald-500",
    position: "top-32 right-16"
  },
  {
    title: "Services pricing",
    subtitle: "sintra.ai, +2 more",
    icon: <DollarSign className="w-5 h-5" />,
    color: "from-gray-500 to-gray-700",
    position: "bottom-32 left-8"
  },
  {
    title: "Team handbook",
    subtitle: "18 pages, guidelines",
    icon: <BookOpen className="w-5 h-5" />,
    color: "from-red-500 to-orange-500",
    position: "bottom-40 left-32"
  },
  {
    title: "Conversation with Julia",
    subtitle: "Follow-up scheduled",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "from-green-600 to-teal-500",
    position: "bottom-32 right-8"
  },
  {
    title: "Client proposal",
    subtitle: "$25k budget",
    icon: <FileText className="w-5 h-5" />,
    color: "from-blue-500 to-indigo-600",
    position: "bottom-40 right-32"
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
        <div className="relative flex justify-center items-center min-h-[600px]">
          {/* Central Astronaut */}
          <div className="opacity-0 translate-y-20 animate-on-scroll relative z-10">
            <div className="relative">
              <div className="w-48 h-56 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center text-6xl transform hover:scale-105 transition-transform duration-300 relative">
                <div className="absolute inset-3 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 rounded-full flex items-center justify-center">
                  <div className="text-5xl">👩‍🚀</div>
                </div>
                {/* LinkedIn Badge */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <span className="text-white font-bold text-xs">in</span>
                </div>
                {/* Antenna */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-purple-400 to-blue-300 rounded-full">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-300 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Data Source Cards */}
          {dataSources.map((source, index) => (
            <div
              key={source.title}
              className={`absolute ${source.position} opacity-0 translate-y-20 animate-on-scroll`}
              style={{ animationDelay: `${(index + 1) * 0.2}s` }}
            >
              <Card className={`bg-gradient-to-r ${source.color}/10 border border-current/20 p-4 backdrop-blur-sm shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group max-w-xs`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${source.color} text-white shadow-md`}>
                    {source.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-white transition-colors">
                      {source.title}
                    </div>
                    <div className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">
                      {source.subtitle}
                    </div>
                  </div>
                </div>
                
                {/* Connection Line */}
                <div className="absolute top-1/2 left-1/2 w-px h-16 bg-gradient-to-b from-current/20 to-transparent transform -translate-x-1/2 pointer-events-none">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-current/40 rounded-full transform -translate-x-1/2"></div>
                </div>
              </Card>
            </div>
          ))}

          {/* Connecting Lines Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-px h-20 bg-gradient-to-t from-primary/20 to-transparent animate-pulse`}
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 3) * 15}%`,
                  animationDelay: `${i * 0.3}s`,
                  transform: `rotate(${i * 45}deg)`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessLearningSection;