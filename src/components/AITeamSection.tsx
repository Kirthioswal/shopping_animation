import { Card } from "@/components/ui/card";
import { useEffect } from "react";

interface AIAssistant {
  name: string;
  task: string;
  color: string;
  avatar: string;
}

const aiAssistants: AIAssistant[] = [
  {
    name: "Soshie",
    task: "Write a LinkedIn Post",
    color: "from-purple-500 to-pink-500",
    avatar: "👩‍🚀"
  },
  {
    name: "Cassie", 
    task: "Respond to this email",
    color: "from-blue-500 to-cyan-500",
    avatar: "🧑‍🚀"
  },
  {
    name: "Penn",
    task: "Write a VSL script", 
    color: "from-green-500 to-teal-500",
    avatar: "👨‍🚀"
  },
  {
    name: "Commet",
    task: "Find product ideas",
    color: "from-orange-500 to-red-500", 
    avatar: "🤖"
  },
  {
    name: "Seomi",
    task: "Write SEO blog posts",
    color: "from-green-600 to-lime-500",
    avatar: "👩‍🚀"
  }
];

const AITeamSection = () => {
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D Astronaut Character */}
          <div className="opacity-0 translate-y-20 animate-on-scroll">
            <div className="relative flex justify-center">
              <div className="relative">
                {/* Main Astronaut */}
                <div className="w-80 h-96 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-9xl transform hover:scale-105 transition-transform duration-300 relative">
                  <div className="absolute inset-4 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center">
                    <div className="text-8xl">👩‍🚀</div>
                  </div>
                  {/* LinkedIn Badge */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-white font-bold text-sm">in</span>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary rounded-full animate-pulse delay-1000" />
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-green-400 rounded-full animate-pulse delay-500" />
              </div>
            </div>
          </div>

          {/* AI Assistant Cards */}
          <div className="space-y-4">
            {aiAssistants.map((assistant, index) => (
              <div 
                key={assistant.name}
                className={`opacity-0 translate-y-20 animate-on-scroll`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className={`bg-gradient-to-r ${assistant.color}/10 border border-current/20 p-4 hover:scale-105 transition-all duration-300 cursor-pointer group`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-sm font-medium bg-gradient-to-r ${assistant.color} bg-clip-text text-transparent mb-1`}>
                        {assistant.name}
                      </div>
                      <div className="text-lg font-semibold text-foreground group-hover:text-white transition-colors">
                        {assistant.task}
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${assistant.color} flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                      {assistant.avatar}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITeamSection;