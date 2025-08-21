import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Step1 from "@/assets/Steps/Step1.png";
import Step2 from "@/assets/Steps/step2.png";
import Step3 from "@/assets/Steps/Step3.png";
import Step4 from "@/assets/Steps/Step4.png";
import Step5 from "@/assets/Steps/Step5.png";
import StepIcon1 from "@/assets/Step icons/1.png";
import StepIcon2 from "@/assets/Step icons/2.png";
import StepIcon3 from "@/assets/Step icons/3.png";
import StepIcon4 from "@/assets/Step icons/4.png";
import StepIcon5 from "@/assets/Step icons/5.png";

interface AIAssistant {
  name: string;
  task: string;
  color: string;
  avatar: string;
  step: number;
  stepImage: string;
  stepIcon: string;
}

const aiAssistants: AIAssistant[] = [
  {
    name: "Sign Up",
    task: "Lets get Started",
    color: "from-purple-500 to-pink-500",
    avatar: "👩‍🚀",
    step: 1,
    stepImage: Step1,
    stepIcon: StepIcon1
  },
  {
    name: "Setup Store", 
    task: "Adding your Store",
    color: "from-blue-500 to-cyan-500",
    avatar: "🧑‍🚀",
    step: 2,
    stepImage: Step2,
    stepIcon: StepIcon2
  },
  {
    name: "Dark Store Stockup",
    task: "Stock up your Dark Stores", 
    color: "from-green-500 to-teal-500",
    avatar: "👨‍🚀",
    step: 3,
    stepImage: Step3,
    stepIcon: StepIcon3
  },
  {
    name: "Shipment is Ready",
    task: "Get Started with Shipping",
    color: "from-orange-500 to-red-500", 
    avatar: "🤖",
    step: 4,
    stepImage: Step4,
    stepIcon: StepIcon4
  },
  {
    name: "Track & Scale",
    task: "Start Tracking and Get Ready to Scale",
    color: "from-green-600 to-lime-500",
    avatar: "👩‍🚀",
    step: 5,
    stepImage: Step5,
    stepIcon: StepIcon5
  }
];

const AITeamSection = () => {
  const [selectedStep, setSelectedStep] = useState<AIAssistant | null>(aiAssistants[0]);

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
    <section id="ai-team-section" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            🚀 How to Jiffy
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Getting started with Jiffy is as easy as placing your first order. Here's how it works:
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Step Image Display */}
          <div className="opacity-0 translate-y-20 animate-on-scroll">
            <div className="relative flex justify-center">
              <div className="relative">
                {/* Step Image Container */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300 relative overflow-hidden shadow-2xl max-w-lg">
                  {selectedStep && (
                    <img 
                      src={selectedStep.stepImage} 
                      alt={`Step ${selectedStep.step}: ${selectedStep.task}`}
                      className="w-auto h-auto max-w-full max-h-[35rem] object-contain rounded-lg"
                    />
                  )}
                  {/* Step Number Badge */}
                  {/* {selectedStep && (
                    <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <span className="text-white font-bold text-lg">{selectedStep.step}</span>
                    </div>
                  )} */}
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
                <Card 
                  className={`bg-gradient-to-r ${assistant.color}/20 border border-current/30 hover:scale-105 transition-all duration-300 cursor-pointer group backdrop-blur-sm ${
                    selectedStep?.step === assistant.step ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  } overflow-hidden`}
                  onClick={() => setSelectedStep(assistant)}
                >
                  <div className="bg-black/60 backdrop-blur-sm p-4 h-full">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-3">
                        <div className={`text-sm font-medium bg-gradient-to-r ${assistant.color} bg-clip-text text-transparent mb-1`}>
                          Step {assistant.step}: {assistant.name}
                        </div>
                        <div className="text-lg font-semibold text-white group-hover:text-gray-200 transition-colors">
                          {assistant.task}
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${assistant.color} flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform overflow-hidden`}>
                        <img 
                          src={assistant.stepIcon} 
                          alt={`Step ${assistant.step} icon`}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
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