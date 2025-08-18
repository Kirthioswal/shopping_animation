const PlaySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Sintra X.{" "}
              <span className="gradient-text">Where work is play.</span>
            </h2>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="gradient-card rounded-2xl p-8 border border-border">
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                <div className="text-muted-foreground text-lg">
                  Interactive Sintra X Interface
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary rounded-full animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaySection;