import phoneImage from "@/assets/phone/Phone.png";
import { GlassIcons } from "@/components/ui/glass-icons";
import { 
  AmazonIcon, 
  FlipkartIcon, 
  ShopifyIcon, 
  MyntraIcon, 
  MeeshoIcon, 
  SnapdealIcon, 
  WooCommerceIcon, 
  UnicommerceIcon 
} from "@/components/ui/integration-icons";

const IntegrationSection = () => {
  // Define integration items for the glass icons component
  const integrationItems = [
    { icon: <AmazonIcon />, color: 'linear-gradient(135deg, #FF9500 0%, #FF6B35 100%)', label: 'Amazon' },
    { icon: <FlipkartIcon />, color: 'linear-gradient(135deg, #2874F0 0%, #1E5FCC 100%)', label: 'Flipkart' },
    { icon: <ShopifyIcon />, color: 'linear-gradient(135deg, #7AB55C 0%, #5E8E3E 100%)', label: 'Shopify' },
    { icon: <MyntraIcon />, color: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', label: 'Myntra' },
    { icon: <MeeshoIcon />, color: 'linear-gradient(135deg, #9B1C8C 0%, #7B1FA2 100%)', label: 'Meesho' },
    { icon: <SnapdealIcon />, color: 'linear-gradient(135deg, #E53E3E 0%, #C53030 100%)', label: 'Snapdeal' },
    { icon: <WooCommerceIcon />, color: 'linear-gradient(135deg, #96588A 0%, #7B2D8E 100%)', label: 'WooCommerce' },
    { icon: <UnicommerceIcon />, color: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', label: 'Unicommerce' },
  ];

  return (
    <section id="integration-section" className="py-20 bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text and Icons */}
          <div className="text-white lg:col-span-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Integrates with{" "}
              <br />
              your favorite tools.
            </h2>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed">
              <span className="font-semibold">Integrations.</span> Streamline business processes by bringing your favorite 
              tools and AI helpers together. AI for business makes working with 
              integrations easier than ever.
            </p>

            {/* Glass Integration Icons */}
            <GlassIcons items={integrationItems} className="!gap-y-16 !gap-x-8 !py-0" />
          </div>

          {/* Right Side - Phone Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={phoneImage} 
                alt="Integration Phone Interface" 
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
