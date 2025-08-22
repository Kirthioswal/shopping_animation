import amazonIcon from "@/assets/icons/amazon-icon.png";
import flipkartIcon from "@/assets/icons/flipkart-icon.png";
import shopifyIcon from "@/assets/icons/shopify-icon.png";
import myntraIcon from "@/assets/icons/myntra-icon.webp";
import meeshoIcon from "@/assets/icons/Meesho-icon.png";
import snapdealIcon from "@/assets/icons/snapdeal-icon.png";
import woocommIcon from "@/assets/icons/woocomm-icon.png";
import unicommIcon from "@/assets/icons/unicomm-icon.png";
import phoneImage from "@/assets/phone/Phone.png";

const IntegrationSection = () => {
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

            {/* Integration Icons Grid */}
            <div className="grid grid-cols-4 gap-6">
              {/* Row 1 */}
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src={amazonIcon} alt="Amazon" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src={flipkartIcon} alt="Flipkart" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src={shopifyIcon} alt="Shopify" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src={myntraIcon} alt="Myntra" className="w-full h-full object-contain" />
              </div>

              {/* Row 2 */}
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src={meeshoIcon} alt="Meesho" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src={snapdealIcon} alt="Snapdeal" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src={woocommIcon} alt="WooCommerce" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src={unicommIcon} alt="Unicommerce" className="w-full h-full object-contain" />
              </div>
            </div>
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
