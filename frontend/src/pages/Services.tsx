import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesSection from "@/components/sections/ServicesSection";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Services
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Comprehensive electrical and mechanical solutions for industrial, commercial, and domestic projects across Nigeria.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* Process Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A proven methodology that ensures project success from initial consultation to final handover.
              </p>
            </div>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  description: "Understanding your requirements and conducting site assessment"
                },
                {
                  step: "02",
                  title: "Planning",
                  description: "Developing detailed project plans and technical specifications"
                },
                {
                  step: "03",
                  title: "Execution",
                  description: "Professional installation with certified materials and equipment"
                },
                {
                  step: "04",
                  title: "Quality Check",
                  description: "Comprehensive testing and quality assurance procedures"
                },
                {
                  step: "05",
                  title: "Handover",
                  description: "Final documentation, training, and ongoing support"
                }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-lg">{process.step}</span>
                    </div>
                    {index < 4 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 transform translate-x-2"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{process.title}</h3>
                  <p className="text-muted-foreground text-sm">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Why Choose Symteco?</h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Expert Team",
                      description: "Certified engineers and technicians with extensive industry experience"
                    },
                    {
                      title: "Quality Materials",
                      description: "We use only premium, certified materials from trusted international suppliers"
                    },
                    {
                      title: "Safety Standards",
                      description: "Strict adherence to international safety protocols and Nigerian regulations"
                    },
                    {
                      title: "Timely Delivery",
                      description: "Proven track record of completing projects on time and within budget"
                    },
                    {
                      title: "24/7 Support",
                      description: "Round-the-clock emergency support and maintenance services"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-secondary rounded-xl h-96 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Licensed & Certified</h3>
                    <p className="text-white/90 mb-4">ISO 9001:2015 • COREN Registered • DPR Licensed</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">500+</div>
                        <div className="text-sm text-white/80">Projects</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">15+</div>
                        <div className="text-sm text-white/80">Years</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">50+</div>
                        <div className="text-sm text-white/80">Engineers</div>
                      </div>
                    </div>
                  </div>
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

export default Services;