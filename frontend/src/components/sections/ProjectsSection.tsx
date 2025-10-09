import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, MapPin } from "lucide-react";
import electricalImage from "@/assets/services-electrical.jpg";
import mechanicalImage from "@/assets/services-mechanical.jpg";
import panelsImage from "@/assets/services-panels.jpg";

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "5MVA 33/11KV Substation Installation",
      category: "Substation Installation",
      location: "Elizade University",
      year: "2012",
      image: electricalImage,
      description: "Installation and commissioning of 5MVA 33/11KV substation and Ring Mains Unit with extension at Elizade University.",
      tags: ["33KV Systems", "5MVA Substation", "Ring Mains Unit"],
      status: "Completed"
    },
    {
      id: 2,
      title: "1X15MVA 33/11KV Injection Station",
      category: "Injection Station",
      location: "Victoria Island, Lagos",
      year: "2015",
      image: panelsImage,
      description: "Completion and commissioning of 1X15MVA 33/11KV injection station for enhanced power distribution.",
      tags: ["15MVA", "Injection Station", "Power Distribution"],
      status: "Completed"
    },
    {
      id: 3,
      title: "LVDS to HVDS Network Conversion",
      category: "Network Conversion",
      location: "Agege, Lagos (PHCN PMU)",
      year: "2010",
      image: mechanicalImage,
      description: "Installation of over 400 units of 50KVA transformer on LVDS to HVDS distribution network conversion project.",
      tags: ["50KVA Transformers", "Network Conversion", "PHCN Project"],
      status: "Completed"
    },
    {
      id: 4,
      title: "600KVA Industrial Stabilizer",
      category: "Industrial Equipment",
      location: "Vital Products, Ikeja",
      year: "2007",
      image: electricalImage,
      description: "Installation and commissioning of 600KVA Low voltage stabilizer incorporated with Dimmerstat for industrial operations.",
      tags: ["600KVA Stabilizer", "Industrial", "Low Voltage"],
      status: "Completed"
    },
    {
      id: 5,
      title: "500KVA Substation Installation",
      category: "Substation",
      location: "Festac, Lagos",
      year: "2009",
      image: panelsImage,
      description: "Processing, construction and installation of 500KVA 11KV/415V substation for residential and commercial use.",
      tags: ["500KVA", "11KV/415V", "Substation"],
      status: "Completed"
    },
    {
      id: 6,
      title: "Earthing System for Generation Plant",
      category: "Earthing Systems",
      location: "SPN Packaging, Ikeja",
      year: "2009",
      image: mechanicalImage,
      description: "Earthing of 5Nos 500KVA Generating Plant and general earthing system installation for industrial facility.",
      tags: ["Earthing System", "500KVA Generators", "Industrial Safety"],
      status: "Completed"
    }
  ];

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Showcasing our expertise through successful project implementations across 
            Nigeria's industrial landscape.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group animate-fade-in-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={project.status === "Completed" ? "default" : "secondary"}
                    className="bg-white/90 text-foreground"
                  >
                    {project.status}
                  </Badge>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {project.category}
                  </Badge>
                </div>

                {/* Project Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-4 text-white text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs border-primary/20 text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* View Project Button */}
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center">
          <div className="bg-muted/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Interested in seeing more of our work?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore our complete project portfolio featuring industrial installations, 
              mechanical systems, and electrical infrastructure across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero-primary">
                View All Projects
              </Button>
              <Button variant="outline">
                Request Project Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;