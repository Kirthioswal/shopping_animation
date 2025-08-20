import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-lg border-b border-border/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold gradient-text">Jiffy</div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
                <span>Products</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
                <span>Features</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
                <span>Resources</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Careers
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary"
              onClick={() => window.open('https://my.jiffy.world/login', '_blank')}
            >
              Log in
            </Button>
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;