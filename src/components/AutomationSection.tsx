import { Card } from "@/components/ui/card";

interface AutomationFeature {
  title: string;
  description: string;
  assistant: string;
  color: string;
  icon: string;
}

const automationFeatures: AutomationFeature[] = [
  {
    title: "Soshie, schedule social media posts for me",
    description: "Automate your social media game with AI for marketing. Write, create, and post content effortlessly with AI-powered solutions.",
    assistant: "Soshie",
    color: "from-purple-500 to-violet-600",
    icon: "🚀"
  },
  {
    title: "Cassie, check my Facebook comments",
    description: "Engage your audience with business automation tools. Use AI for customer support to analyze comments and craft personalized responses.",
    assistant: "Cassie",
    color: "from-blue-500 to-cyan-600",
    icon: "💬"
  },
  {
    title: "Vizzy, help me prepare for today's meetings",
    description: "Boost productivity with AI. Streamline business processes with daily summaries based on your email and calendar to keep your schedule on track.",
    assistant: "Vizzy",
    color: "from-orange-500 to-amber-600",
    icon: "📅"
  }
];

const AutomationSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Main Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Automates work.
            <br />
            <span className="gradient-text">Even while you sleep.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Automate tasks with business automation tools—create social media posts, respond to comments, and more.
          </p>
        </div>

        {/* 3D Robot Characters Display */}
        <div className="relative mb-20">
          <div className="flex justify-center items-center space-x-8 mb-12">
            {/* Robot Characters */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-4xl animate-bounce">
                🤖
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                AI
              </div>
            </div>
            
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-5xl animate-bounce delay-300">
                🚀
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-card px-3 py-1 rounded-full text-sm text-foreground border shadow-lg">
                Active
              </div>
            </div>
            
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-4xl animate-bounce delay-500">
                ⚡
              </div>
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent rounded-full animate-pulse" />
            </div>
          </div>

          {/* Floating Work Items */}
          <div className="absolute top-0 left-1/4 animate-float">
            <div className="bg-card p-3 rounded-lg shadow-lg border text-sm">
              📦 Processing orders
            </div>
          </div>
          <div className="absolute top-8 right-1/4 animate-float delay-1000">
            <div className="bg-card p-3 rounded-lg shadow-lg border text-sm">
              📧 Responding to emails
            </div>
          </div>
        </div>

        {/* Automation Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {automationFeatures.map((feature, index) => (
            <Card
              key={feature.assistant}
              className={`gradient-card border border-border p-8 hover:scale-105 transition-all duration-300 group cursor-pointer ${
                index === 0 ? 'lg:col-span-3' : ''
              }`}
            >
              {/* Assistant Avatar */}
              <div className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Status Indicator */}
              <div className="mt-6 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Online & Working</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;