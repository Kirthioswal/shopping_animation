import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Package, Users, BarChart3, Zap, Target } from "lucide-react";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-orange-500 bg-clip-text text-transparent mb-6">
              About Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Reimagining logistics for the era of instant commerce. From dark stores to doorsteps,
              we make quick commerce logistics effortless.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Who We Are
            </h2>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  At Jiffy, we're reimagining logistics for the era of instant commerce. From dark stores to doorsteps,
                  we make quick commerce logistics effortless — helping businesses deliver products to their customers in record time.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our platform is built to empower brands of all sizes, whether you're processing 10 orders or 10,000.
                  With intelligent automation, powerful integrations, and real-time analytics, Jiffy ensures that your
                  logistics operations run smoother, faster, and smarter.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Superfast Deliveries</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Schedule 30-minute doorstep deliveries so your customers never miss a beat.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-orange-500/10 rounded-lg mr-3">
                      <Package className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Seamless Order Management</h3>
                  </div>
                  <p className="text-muted-foreground">
                    From booking shipments to tracking packages, we simplify every step of your logistics workflow.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg mr-3">
                      <Users className="h-6 w-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Smart Integrations</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Connect effortlessly with leading wide range of platforms.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      <Rocket className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Courier Flexibility</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Choose from wide range of trusted partners to optimize your delivery network.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-orange-500/10 rounded-lg mr-3">
                      <BarChart3 className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Analytics That Matter</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Track sales, revenue, shipments, RTOs, and courier load distribution with actionable insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To power quick commerce logistics by combining speed, simplicity, and intelligence —
                  so that businesses can focus on growth while we handle the movement.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-orange-500/10 rounded-lg mr-4">
                    <Rocket className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every delivery is as instant and reliable as your customer's expectation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Jiffy Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Why Jiffy?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-center justify-center p-6 bg-card/50 rounded-lg border border-border/50">
                <span className="text-2xl mr-3">🚀</span>
                <span className="text-lg font-medium">Instant commerce, truly instant.</span>
              </div>
              <div className="flex items-center justify-center p-6 bg-card/50 rounded-lg border border-border/50">
                <span className="text-2xl mr-3">📦</span>
                <span className="text-lg font-medium">End-to-end logistics simplified.</span>
              </div>
              <div className="flex items-center justify-center p-6 bg-card/50 rounded-lg border border-border/50">
                <span className="text-2xl mr-3">🤝</span>
                <span className="text-lg font-medium">Scales with your business.</span>
              </div>
              <div className="flex items-center justify-center p-6 bg-card/50 rounded-lg border border-border/50">
                <span className="text-2xl mr-3">📊</span>
                <span className="text-lg font-medium">Data-driven decisions at your fingertips.</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent mb-8">
                Need it now? Get it in a Jiffy.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90"
                onClick={() => window.location.href = 'https://my.jiffy.world/signup'}
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Reach Us At</h2>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <div className="mb-6">
                  <a
                    href="mailto:Hello@jiffy.world"
                    className="text-2xl font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Hello@jiffy.world
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">Corporate Office Address:</p>
                  <p className="text-muted-foreground leading-relaxed">
                    3rd Floor, JMD Empire Square,<br />
                    Mehrauli-Gurgaon Rd,<br />
                    Gurugram, Haryana 122001
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
