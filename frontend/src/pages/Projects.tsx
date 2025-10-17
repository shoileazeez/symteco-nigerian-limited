import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { Calendar, MapPin, ExternalLink, Users, Award, Zap, Settings, Building } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/sections/QuoteModal";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const projectFilters = [
    "All Projects",
    "Substation Construction",
    "Transformer Installation", 
    "Line Maintenance",
    "Technical Services",
    "Distribution Systems"
  ];

  const projects = [
    {
      id: 1,
      title: "Industrial Substation Construction",
      category: "Substation Construction",
      description: "Complete construction and commissioning of 33/11kV substation for industrial complex.",
      image: "/project-abeokuta-substation-construction.jpg",
      location: "Lagos, Nigeria",
      date: "2024",
      client: "Industrial Manufacturing Ltd",
      status: "Completed",
      highlights: ["33/11kV Transformer", "Complete Protection System", "SCADA Integration"]
    },
    {
      id: 2,
      title: "Electrical Panel Fabrication & Installation",
      category: "Technical Services", 
      description: "Custom electrical panels designed and installed for commercial building complex.",
      image: "/project-technician-electrical-work.jpg",
      location: "Abuja, Nigeria",
      date: "2024",
      client: "Commercial Properties Inc",
      status: "Completed",
      highlights: ["Custom Design", "Quality Materials", "Professional Installation"]
    },
    {
      id: 3,
      title: "High Voltage Electrical Maintenance",
      category: "Line Maintenance",
      description: "Comprehensive maintenance and upgrades of electrical distribution systems.",
      image: "/project-electrical-maintenance.jpg",
      location: "Port Harcourt, Nigeria", 
      date: "2023",
      client: "Energy Distribution Company",
      status: "Completed",
      highlights: ["Preventive Maintenance", "System Upgrades", "Safety Compliance"]
    },
    {
      id: 4,
      title: "Transformer Installation Project",
      category: "Transformer Installation",
      description: "Installation of multiple transformers for power distribution upgrade.",
      image: "/project-ikeja-transformer-installation.jpg",
      location: "Kano, Nigeria",
      date: "2023",
      client: "Power Distribution Network",
      status: "Completed", 
      highlights: ["Multiple Units", "Grid Integration", "Quality Testing"]
    },
    {
      id: 5,
      title: "Industrial Cable Installation",
      category: "Distribution Systems",
      description: "Large-scale cable installation and distribution system setup.",
      image: "/project-high-voltage-line-work.jpg",
      location: "Kaduna, Nigeria",
      date: "2023",
      client: "Manufacturing Facility",
      status: "Completed",
      highlights: ["Underground Cables", "Distribution Panels", "Safety Systems"]
    },
    {
      id: 6,
      title: "Control Panel Manufacturing",
      category: "Technical Services",
      description: "Custom control panels manufactured for industrial automation systems.",
      image: "/project-lagos-distribution-transformer.jpg",
      location: "Lagos, Nigeria",
      date: "2022",
      client: "Automation Solutions Ltd",
      status: "Completed",
      highlights: ["Custom Controls", "Industrial Grade", "Remote Monitoring"]
    }
  ];

  const filteredProjects = activeFilter === "All Projects" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          
          <div className="relative section-padding">
            <div className="container-padding">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-2 mb-6">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">100+ Successfully Completed</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Projects</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  Showcasing our expertise through successful substation construction, transformer installations, 
                  high voltage line work, and electrical maintenance projects across Nigeria.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-primary">100+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-secondary">50+</div>
                    <div className="text-sm text-muted-foreground">Happy Clients</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-primary">12+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-secondary">6</div>
                    <div className="text-sm text-muted-foreground">States Covered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
          <div className="container-padding">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {projectFilters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 font-medium ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg" 
                      : "bg-white text-foreground border-gray-200 hover:border-primary hover:text-primary hover:shadow-md"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-medium">
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center space-x-2 text-white text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Project Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{project.client}</span>
                      </div>
                    </div>

                    {/* Project Highlights */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-foreground">Key Highlights:</div>
                      <div className="flex flex-wrap gap-1">
                        {project.highlights.map((highlight, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Categories */}
        <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
          <div className="container-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Building className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Our Expertise</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Project Categories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We deliver excellence across diverse sectors and project types, bringing expertise to every challenge.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  category: "Industrial Projects",
                  description: "Large-scale electrical installations for manufacturing plants, oil & gas facilities, and industrial complexes.",
                  projects: "50+ Projects",
                  examples: ["Power Distribution", "Motor Control Centers", "Industrial Automation"],
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: Building,
                  category: "Commercial Projects", 
                  description: "Electrical and mechanical systems for offices, hotels, shopping centers, and commercial buildings.",
                  projects: "30+ Projects",
                  examples: ["Building Management", "HVAC Systems", "Emergency Power"],
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: Settings,
                  category: "Technical Services",
                  description: "Specialized technical solutions including panel fabrication, maintenance, and system upgrades.",
                  projects: "40+ Projects", 
                  examples: ["Panel Fabrication", "System Maintenance", "Technical Consulting"],
                  color: "from-purple-500 to-purple-600"
                }
              ].map((category, index) => (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">{category.category}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{category.description}</p>
                  
                  <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-3 py-1 mb-6">
                    <Award className="h-3 w-3 text-primary" />
                    <span className="text-sm font-medium text-primary">{category.projects}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-foreground">Key Services:</div>
                    {category.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 text-center text-white">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
              
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-6">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                  Let us bring our expertise to your next electrical or mechanical project. 
                  Contact us today for a free consultation and detailed quote.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <QuoteModal
                    trigger={
                      <Button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Request Quote
                      </Button>
                    }
                  />
                  <Button 
                    variant="outline" 
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 bg-transparent"
                  >
                    View All Projects
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;