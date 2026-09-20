import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

/**
 * Final call-to-action section before the footer.
 * Bold headline + CTA buttons urging the user to get started.
 */
const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#000' }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.1) 0%, transparent 60%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
          Ready to ship?
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Start delivering
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FF6B35]">
            in a Jiffy.
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of brands who trust Jiffy to power their logistics.
          Sign up today and start shipping within minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className="bg-gradient-to-r from-[#F97316] to-[#FF6B35] text-white hover:opacity-90 transition-all text-lg px-10 py-6 rounded-xl font-semibold shadow-lg shadow-orange-500/20 group"
            onClick={() => window.open('https://my.jiffy.world/signup', '_blank')}
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-white/5 hover:text-white transition-all text-lg px-10 py-6 rounded-xl bg-transparent"
            onClick={() => window.open('https://my.jiffy.world/login', '_blank')}
          >
            Log In
          </Button>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default CTASection;
