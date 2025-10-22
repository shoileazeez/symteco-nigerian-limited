import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { memo, useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year?: string;
  image?: string;
  images: string[];
  description: string;
  tags: string[];
  status: string;
  featured?: boolean;
  client?: string;
  duration?: string;
  value?: string;
  content?: string;
}

const ProjectsSection = memo(() => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects?featured=true');
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects);
      } else {
        setError('Failed to load projects');
      }
    } catch (error) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="section-padding bg-background">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Featured <span className="text-gradient-primary">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Showcasing our expertise through successful project implementations across 
              Nigeria's industrial landscape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="project-card animate-pulse">
                <div className="h-64 bg-muted rounded-t-xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section-padding bg-background">
        <div className="container-padding">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Featured <span className="text-gradient-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground mb-8">{error}</p>
            <Button onClick={fetchProjects}>Try Again</Button>
          </div>
        </div>
      </section>
    );
  }

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
                    src={project.image || project.images?.[0] || '/project-placeholder.svg'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 3}
                    onError={(e) => {
                      e.currentTarget.src = '/project-placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Badge
                      variant={project.status === "Completed" ? "default" : "secondary"}
                      className="bg-white/90 text-foreground"
                    >
                      {project.status}
                    </Badge>
                    {project.featured && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
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
                        <span>{project.year || 'Recent'}</span>
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

                  {/* Project Info */}
                  {(project.client || project.value) && (
                    <div className="text-sm text-muted-foreground space-y-1">
                      {project.client && (
                        <div>Client: {project.client}</div>
                      )}
                      {project.value && (
                        <div>Value: {project.value}</div>
                      )}
                    </div>
                  )}

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

          {projects.length === 0 && (
            <div className="text-center mt-12">
              <p className="text-muted-foreground">No featured projects available at the moment.</p>
            </div>
          )}
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