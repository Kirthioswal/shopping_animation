import { Card } from "@/components/ui/card";

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

        {/* Process Steps */}
        <div className="space-y-20">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Text Content */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} text-2xl mb-6`}>
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Visual Element */}
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <Card className="gradient-card border border-border p-8">
                  <div className="aspect-square flex flex-col items-center justify-center text-center">
                    <div className={`text-6xl md:text-8xl font-bold bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent mb-4`}>
                      {step.time}
                    </div>
                    <div className="text-2xl">{step.icon}</div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;