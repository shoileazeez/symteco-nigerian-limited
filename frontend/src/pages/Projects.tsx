import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Projects
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Showcasing our expertise through successful electrical and mechanical installations across Nigeria.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                "All Projects",
                "Industrial",
                "Commercial", 
                "Residential",
                "Switchgear",
                "Mechanical"
              ].map((filter, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                    index === 0 
                      ? "bg-primary text-white border-primary" 
                      : "bg-white text-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ProjectsSection />

        {/* Project Categories */}
        <section className="section-padding bg-muted/30">
          <div className="container-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Project Categories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We deliver excellence across diverse sectors and project types.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  category: "Industrial Projects",
                  description: "Large-scale electrical installations for manufacturing plants, oil & gas facilities, and industrial complexes.",
                  projects: "200+ Projects",
                  examples: ["Power Distribution", "Motor Control Centers", "Industrial Automation"]
                },
                {
                  category: "Commercial Projects", 
                  description: "Electrical and mechanical systems for offices, hotels, shopping centers, and commercial buildings.",
                  projects: "150+ Projects",
                  examples: ["Building Management", "HVAC Systems", "Emergency Power"]
                },
                {
                  category: "Residential Projects",
                  description: "Home electrical installations, upgrades, and maintenance services for residential properties.",
                  projects: "300+ Projects", 
                  examples: ["Home Wiring", "Solar Systems", "Smart Home Solutions"]
                }
              ].map((category, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-primary mb-4">{category.category}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <div className="text-sm font-semibold text-secondary mb-4">{category.projects}</div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Key Services:</div>
                    {category.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
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
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Let us bring our expertise to your next electrical or mechanical project. Contact us today for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                  Request Quote
                </button>
                <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  View More Projects
                </button>
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