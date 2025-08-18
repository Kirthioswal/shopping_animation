import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CommandExample {
  helper: string;
  command: string;
  avatar: string;
  gradient: string;
}

const commandExamples: CommandExample[] = [
  {
    helper: "Soshie",
    command: "Write a LinkedIn Post",
    avatar: "👩‍🎨",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    helper: "Cassie",
    command: "Respond to this email",
    avatar: "👩‍💼",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    helper: "Penn",
    command: "Write a VSL script",
    avatar: "👨‍✍️",
    gradient: "from-red-500 to-pink-500",
  },
];

const CommandSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Your wish,{" "}
            <span className="gradient-text">their command.</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Give away your manual work to a team of dedicated AI assistants. They're ready to pounce on your ideas.
          </p>
          
          <p className="text-lg text-muted-foreground">
            Available in chat and on 90+ power-ups.
          </p>
        </div>

        {/* Command Examples Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {commandExamples.map((example, index) => (
            <Card
              key={example.helper}
              className="gradient-card border border-border p-6 hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              {/* Helper Avatar */}
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${example.gradient} flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  {example.avatar}
                </div>
                <Badge variant="secondary" className="text-sm">
                  {example.helper}
                </Badge>
              </div>

              {/* Command */}
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {example.command}
              </h3>
            </Card>
          ))}
        </div>

        {/* Central Visual */}
        <div className="mt-16 text-center">
          <div className="relative inline-block">
            <Card className="gradient-card border border-border p-8 max-w-md mx-auto">
              <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center mb-4">
                <div className="text-muted-foreground">Command Interface</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Type your request and watch your AI team spring into action
              </p>
            </Card>
            
            {/* Floating command bubbles */}
            <div className="absolute -top-8 -left-8 bg-accent/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-accent-foreground animate-pulse">
              💬 "Design a logo"
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-primary animate-pulse delay-1000">
              ✨ "Analyze sales data"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommandSection;