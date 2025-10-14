import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

const ProjectsSection = memo(() => {
  type Project = {
    id: number;
    title: string;
    category: string;
    location: string;
    year: string;
    image: string;
    description: string;
    tags: string[];
    status: string;
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "Substation Construction Project",
      category: "Substation Installation",
      location: "Abeokuta, Ogun State",
      year: "2025",
      image: "/project-abeokuta-substation-construction.jpg",
      description: "Ground-up construction of electrical substation including foundation work, structural installation, and electrical equipment setup in Abeokuta with specialized crew and safety protocols.",
      tags: ["Civil Construction", "Substation Building", "Foundation Work", "Electrical Infrastructure"],
      status: "Completed"
    },
    {
      id: 2,
      title: "Power Transformer Installation",
      category: "Transformer Installation", 
      location: "Ikeja, Lagos State",
      year: "2023",
      image: "/project-ikeja-transformer-installation.jpg",
      description: "Professional installation and commissioning of large industrial power transformer with protective housing, control systems, and safety equipment at industrial facility in Ikeja.",
      tags: ["Power Transformer", "Industrial Installation", "Protective Housing", "Safety Systems"],
      status: "Completed"
    },
    {
      id: 3,
      title: "High Voltage Line Maintenance",
      category: "Transmission Line Work",
      location: "Multiple Sites, Nigeria", 
      year: "2024",
      image: "/project-high-voltage-line-work.jpg",
      description: "High-altitude maintenance and repair work on transmission lines including conductor replacement, insulator maintenance, and structural reinforcement by certified technicians.",
      tags: ["High Voltage", "Line Maintenance", "Safety Work", "Conductor Replacement"],
      status: "Completed"
    },
    {
      id: 4,
      title: "Distribution Pole Transformer Installation",
      category: "Distribution Systems",
      location: "Lagos State",
      year: "2025", 
      image: "/project-lagos-distribution-transformer.jpg",
      description: "Installation of pole-mounted distribution transformer with proper grounding, protective equipment, and connection to distribution network for residential and commercial power supply.",
      tags: ["Pole Mount", "Distribution Transformer", "Grounding", "Network Connection"],
      status: "Completed"
    },
    {
      id: 5,
      title: "Industrial Electrical Technician Services",
      category: "Technical Services",
      location: "Industrial Facilities",
      year: "2024",
      image: "/project-technician-electrical-work.jpg", 
      description: "Skilled electrical technician performing precision electrical work on industrial equipment including control panel maintenance, wiring, and system diagnostics in controlled environment.",
      tags: ["Technical Services", "Control Panels", "Precision Work", "System Diagnostics"],
      status: "Completed"
    },
    {
      id: 6,
      title: "Electrical Maintenance & Troubleshooting",
      category: "Maintenance Services",
      location: "Various Sites, Nigeria",
      year: "2024",
      image: "/project-electrical-maintenance.jpg",
      description: "Comprehensive electrical maintenance services including equipment inspection, troubleshooting, repairs, and preventive maintenance to ensure optimal system performance and safety.",
      tags: ["Preventive Maintenance", "Troubleshooting", "Equipment Inspection", "System Optimization"],
      status: "Completed"
    },
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
          {/* Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 3}
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
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;