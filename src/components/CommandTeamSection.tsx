const CommandTeamSection = () => {
  const assistants = [
    {
      name: "Soshie",
      task: "Write a LinkedIn Post",
      color: "from-purple-500 to-pink-500",
      avatar: "👩‍💼"
    },
    {
      name: "Cassie",
      task: "Respond to this email",
      color: "from-blue-500 to-cyan-500",
      avatar: "👩‍💻"
    },
    {
      name: "Penn",
      task: "Write a VSL script",
      color: "from-green-500 to-teal-500",
      avatar: "👨‍✍️"
    },
    {
      name: "Commet",
      task: "Find product ideas",
      color: "from-orange-500 to-red-500",
      avatar: "👨‍💼"
    },
    {
      name: "Seomy",
      task: "Write SEO blog posts",
      color: "from-emerald-500 to-green-600",
      avatar: "👨‍🔬"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Heading and Image */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your wish,{" "}
              <br />
              their <span className="text-purple-400">command.</span>
            </h2>
            
            {/* Astronaut Image */}
            <div className="mt-8">
              <img 
                src="/assets/astronaut-running.png" 
                alt="Astronaut Running" 
                className="w-full max-w-md mx-auto lg:mx-0"
              />
            </div>
          </div>

          {/* Right Side - Description and Cards */}
          <div className="text-white">
            <div className="mb-8">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Give away your manual work to a team of dedicated AI assistants. 
                They're ready to pounce on your ideas.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Available in chat and on 90+ power-ups.
              </p>
            </div>

            {/* Assistant Cards */}
            <div className="space-y-4">
              {assistants.map((assistant, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${assistant.color} rounded-full flex items-center justify-center text-2xl`}>
                        {assistant.avatar}
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">{assistant.name}</div>
                        <div className="text-white font-medium">{assistant.task}</div>
                      </div>
                    </div>
                    <div className={`w-8 h-8 bg-gradient-to-br ${assistant.color} rounded-full flex items-center justify-center text-lg opacity-80`}>
                      {assistant.avatar}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommandTeamSection;
