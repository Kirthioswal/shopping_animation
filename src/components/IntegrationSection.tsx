const IntegrationSection = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text and Icons */}
          <div className="text-white">
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
                <img src="/src/assets/icons/amazon icon.png" alt="Amazon" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src="/src/assets/icons/flipkart icon.png" alt="Flipkart" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src="/src/assets/icons/shopify icon.png" alt="Shopify" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src="/src/assets/icons/myntra icon.webp" alt="Myntra" className="w-full h-full object-contain" />
              </div>

              {/* Row 2 */}
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src="/src/assets/icons/Meesho icon.png" alt="Meesho" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src="/src/assets/icons/snapdeal icon.png" alt="Snapdeal" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src="/src/assets/icons/woo comm icon.webp" alt="WooCommerce" className="w-full h-full object-contain" />
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 p-2">
                <img src="/src/assets/icons/unicomm icon.png" alt="Unicommerce" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Right Side - Phone Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/src/assets/phone.png" 
                alt="Integration Phone Interface" 
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
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
