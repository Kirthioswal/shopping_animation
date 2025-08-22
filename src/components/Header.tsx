import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-lg border-b border-border/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Jiffy Logo" className="h-10 w-20" />
            {/* <div className="text-2xl font-bold gradient-text">Jiffy</div> */}
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button 
                onClick={handleHomeClick}
                className="text-foreground hover:text-primary transition-colors flex items-center space-x-1"
              >
                <span>Home</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="relative group">
              <button 
                onClick={() => scrollToSection('integration-section')}
                className="text-foreground hover:text-primary transition-colors flex items-center space-x-1"
              >
                <span>Platform</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <button 
              onClick={() => scrollToSection('ai-team-section')}
              className="text-foreground hover:text-primary transition-colors"
            >
              How it Works
            </button>
            
            <div className="relative group">
              <button 
                onClick={() => scrollToSection('faq-section')}
                className="text-foreground hover:text-primary transition-colors flex items-center space-x-1"
              >
                <span>FAQs</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              About Us
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
            <Button 
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
              onClick={() => window.open('https://my.jiffy.world/signup', '_blank')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;