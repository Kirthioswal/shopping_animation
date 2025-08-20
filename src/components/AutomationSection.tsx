import { Card } from "@/components/ui/card";

const AutomationSection = () => {
  return (
    <section className="relative">
      {/* Background Image Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-end justify-center pb-20"
        style={{
          backgroundImage: `url('/src/assets/astronaut working.jpg')`
        }}
      >
        {/* Light overlay for text readability while preserving image colors */}
        <div className="absolute inset-0 " />
        
        {/* Text Content */}
        <div className="relative z-10 text-center text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Automates work.
          </h2>
          <h3 className="text-5xl md:text-6xl font-bold">
            Even while you sleep.
          </h3>
          <p className="text-lg md:text-xl mt-6 max-w-2xl mx-auto text-white/90">
            Automate tasks with business automation tools—create social media posts, respond to comments, and more.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Horizontal Card - Social Media Automation */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-4 border-purple-400/30 p-8 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-2 hover:border-purple-300/50 cursor-pointer group perspective-1000 shadow-[0_8px_32px_rgba(147,51,234,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Soshie, schedule social media posts for me
                  </h3>
                  <p className="text-lg text-purple-100 mb-6">
                    Automate your social media game with AI for marketing. Write, create, and post content effortlessly with AI-powered solutions.
                  </p>
                </div>
                <div className="relative transform transition-all duration-200 group-hover:rotate-y-12 group-hover:scale-110">
                  {/* Mock Phone Interface */}
                  <div className="bg-white rounded-3xl p-4 shadow-2xl max-w-sm mx-auto transform transition-all duration-200 hover:shadow-purple-300/50">
                    <div className="bg-gray-900 rounded-2xl p-4">
                      {/* Phone Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-white text-sm">9:41</div>
                        <div className="flex space-x-1">
                          <div className="w-4 h-2 bg-white rounded-full"></div>
                          <div className="w-6 h-2 bg-white rounded-full"></div>
                          <div className="w-6 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* App Header */}
                      <div className="bg-purple-600 rounded-xl p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-semibold">Review posts</h4>
                          <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Post Preview */}
                      <div className="bg-gray-800 rounded-xl p-4">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full mr-3"></div>
                          <div>
                            <div className="text-white text-sm font-semibold">Sintra • Product Launch</div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg h-32 mb-3 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <div className="w-8 h-8 bg-purple-400 rounded-full"></div>
                          </div>
                        </div>
                        <p className="text-white text-xs leading-relaxed">
                          We've been quietly building something special - an app that brings the power of AI to your business, working 24/7 so you don't have to.
                        </p>
                        <p className="text-white text-xs mt-2">
                          Simple, powerful, and ready when you are. Download Sintra today and discover what...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Two Vertical Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Facebook Comments Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-4 border-blue-400/30 p-8 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-2 hover:border-blue-300/50 cursor-pointer group perspective-1000 shadow-[0_8px_32px_rgba(59,130,246,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Cassie, check my Facebook comments
                </h3>
                <p className="text-blue-100">
                  Engage your audience with business automation tools. Use AI for customer support to analyze comments and craft personalized responses.
                </p>
              </div>
              
              {/* Mock Phone Interface */}
              <div className="bg-white rounded-2xl p-3 shadow-xl transform transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-105 hover:shadow-blue-300/50">
                <div className="bg-gray-900 rounded-xl p-3">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between mb-3 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-1 bg-white rounded"></div>
                      <div className="w-4 h-1 bg-white rounded"></div>
                      <div className="w-4 h-1 bg-white rounded"></div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-white text-xs">Cassie • Customer Support</span>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-2 mb-2">
                      <div className="text-white text-xs font-semibold mb-1">Suggested action</div>
                      <div className="bg-blue-600 rounded p-2">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-white/20 rounded-full mr-2"></div>
                          <span className="text-white text-xs">Review & Comment</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-white text-xs">Chat history</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Meeting Prep Card */}
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-4 border-orange-400/30 p-8 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 hover:-translate-y-2 hover:border-orange-300/50 cursor-pointer group perspective-1000 shadow-[0_8px_32px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Vizzy, help me prepare for today's meetings
                </h3>
                <p className="text-orange-100">
                  Boost productivity with AI. Streamline business processes with daily summaries based on your email and calendar to keep your schedule on track.
                </p>
              </div>
              
              {/* Mock Interface */}
              <div className="bg-white rounded-2xl p-3 shadow-xl transform transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-105 hover:shadow-orange-300/50">
                <div className="space-y-3">
                  {/* Action Item */}
                  <div className="bg-orange-100 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-orange-500 rounded-full mr-2 flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                      <span className="text-orange-800 text-sm font-semibold">2 actions needed</span>
                    </div>
                    <p className="text-orange-700 text-xs">
                      Approve legal doc offer before signing vendor contract by 5pm
                    </p>
                  </div>
                  
                  {/* Meetings */}
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-gray-600 rounded-full mr-2 flex items-center justify-center">
                        <span className="text-white text-xs">📅</span>
                      </div>
                      <span className="text-gray-800 text-sm font-semibold">3 meetings</span>
                    </div>
                  </div>
                  
                  {/* Emails */}
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gray-600 rounded-full mr-2 flex items-center justify-center">
                        <span className="text-white text-xs">📧</span>
                      </div>
                      <span className="text-gray-800 text-sm font-semibold">19 emails</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
