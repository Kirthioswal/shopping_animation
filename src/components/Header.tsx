import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for header background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const navItems = [
    { label: 'Home', action: handleHomeClick },
    { label: 'Journey', action: () => scrollToSection('journey-step-0') },
    { label: 'Platform', action: () => scrollToSection('integration-section') },
    { label: 'FAQs', action: () => scrollToSection('faq-section') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity relative z-10"
            >
              <img src={logo} alt="Jiffy Logo" className="h-10 w-20" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-white/5 hover:text-white transition-all bg-transparent rounded-lg"
                onClick={() =>
                  window.open('https://my.jiffy.world/login', '_blank')
                }
              >
                Log in
              </Button>
              <Button
                className="bg-gradient-to-r from-[#F97316] to-[#FF6B35] text-white hover:opacity-90 transition-opacity rounded-lg shadow-lg shadow-orange-500/10"
                onClick={() =>
                  window.open('https://my.jiffy.world/signup', '_blank')
                }
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden relative z-10 text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 px-6">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`text-2xl font-semibold text-white hover:text-[#F97316] transition-all duration-300 ${
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-8 flex flex-col gap-4 w-full max-w-xs">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-white/5 hover:text-white w-full py-6 text-lg bg-transparent rounded-xl"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.open('https://my.jiffy.world/login', '_blank');
              }}
            >
              Log in
            </Button>
            <Button
              className="bg-gradient-to-r from-[#F97316] to-[#FF6B35] text-white hover:opacity-90 w-full py-6 text-lg rounded-xl"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.open('https://my.jiffy.world/signup', '_blank');
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;