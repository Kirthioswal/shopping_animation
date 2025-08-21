import { Card } from "@/components/ui/card";
import Step1 from "@/assets/Steps/Step1.png";

const AutomationSection = () => {
  return (
    <section className="relative">
      {/* Background Image Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-end justify-center pb-20"
        style={{
          backgroundImage: `url('../assets/astronaut working.png')`
        }}
      >
        {/* Light overlay for text readability while preserving image colors */}
        <div className="absolute inset-0 " />
        
        {/* Text Content */}
        <div className="relative z-10 text-center text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Your Logistics Crew,
          </h2>
          <h3 className="text-5xl md:text-6xl font-bold">
            Always On Duty.
          </h3>
          <p className="text-lg md:text-xl mt-6 max-w-2xl mx-auto text-white/90">
            From scanning to shipping, Jiffy's smart team works round the clock to make logistics effortless.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Horizontal Card - Social Media Automation */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0 p-0 text-white shadow-[0_8px_32px_rgba(147,51,234,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
              <img 
                src="/assets/features/block1image.png" 
                alt="Social Media Automation Feature" 
                className="w-full h-full object-cover"
              />
            </Card>
          </div>

          {/* Two Vertical Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Facebook Comments Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 p-0 text-white shadow-[0_8px_32px_rgba(59,130,246,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
              <img 
                src="/assets/features/block2image.png" 
                alt="Facebook Comments Management Feature" 
                className="w-full h-full object-cover"
              />
            </Card>

            {/* Meeting Prep Card */}
            <Card className="bg-gradient-to-br from-orange-600 to-orange-700 border-0 p-0 text-white shadow-[0_8px_32px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
              <img 
                src="/assets/features/block3image.png" 
                alt="Meeting Preparation Feature" 
                className="w-full h-full object-cover"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
