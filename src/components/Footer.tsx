import { Link } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const Footer = () => {
  return (
    <BackgroundBeamsWithCollision className="min-h-[300px] bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Us Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Reach us at</p>
                <a 
                  href="mailto:Hello@jiffy.world" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  Hello@jiffy.world
                </a>
                <a 
                  className="text-foreground hover:text-primary transition-colors font-medium block"
                >
                  080-470-90884
                </a>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2 font-medium">Corporate Office Address:</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  3rd Floor, JMD Empire Square,<br />
                  Mehrauli-Gurgaon Rd,<br />
                  Gurugram, Haryana 122001
                </p>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              {/* <li>
                <Link to="/refund" className="text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/money-back" className="text-muted-foreground hover:text-foreground transition-colors">
                  Money-Back Guarantee
                </Link>
              </li>
              <li>
                <Link to="/policies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Other Policies
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Product Section */}
          {/* <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground hover:text-foreground transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-muted-foreground hover:text-foreground transition-colors">
                  Press
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Jiffy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a 
              href="https://www.linkedin.com/company/jiffyworld/about/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Facebook
            </a>
            <a 
              href="https://www.instagram.com/jiffy.world" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default Footer;