import { Card } from "@/components/ui/card";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  gradient: string;
}

const teamMembers: TeamMember[] = [
  { name: "Cassie", role: "Customer Support", image: "👩‍💼", gradient: "from-pink-500 to-rose-500" },
  { name: "Dexter", role: "Data Analyst", image: "👨‍💻", gradient: "from-blue-500 to-cyan-500" },
  { name: "Buddy", role: "Business Development", image: "👨‍💼", gradient: "from-green-500 to-emerald-500" },
  { name: "Soshie", role: "Social Media Manager", image: "👩‍🎨", gradient: "from-purple-500 to-violet-500" },
  { name: "Emmie", role: "Email Marketer", image: "👩‍📧", gradient: "from-orange-500 to-amber-500" },
  { name: "Gigi", role: "Personal Coach", image: "👩‍🏫", gradient: "from-teal-500 to-cyan-500" },
  { name: "Scouty", role: "Recruiter", image: "👨‍🕵️", gradient: "from-indigo-500 to-blue-500" },
  { name: "Penn", role: "Copywriter", image: "👨‍✍️", gradient: "from-red-500 to-pink-500" },
  { name: "Commet", role: "eCommerce", image: "👩‍💻", gradient: "from-yellow-500 to-orange-500" },
  { name: "Milli", role: "Sales Manager", image: "👩‍💼", gradient: "from-emerald-500 to-teal-500" },
  { name: "Seomy", role: "SEO Specialist", image: "👨‍🔍", gradient: "from-violet-500 to-purple-500" },
  { name: "Vizzy", role: "Virtual Assistant", image: "👩‍💻", gradient: "from-cyan-500 to-blue-500" },
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet your team.{" "}
            <span className="gradient-text">For all core areas.</span>
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card
              key={member.name}
              className="gradient-card border border-border p-6 text-center hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              {/* Avatar */}
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                {member.image}
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-sm text-muted-foreground">
                {member.role}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;