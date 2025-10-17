import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesSection from "@/components/sections/ServicesSection";
import { CheckCircle, Award, Users, Shield, Clock, Zap, Settings, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/sections/QuoteModal";

const Services = () => {
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
                  <Settings className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Professional Engineering Services</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Services</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  From industrial electrical installations to mechanical systems, we deliver comprehensive 
                  engineering solutions that power Nigeria's growth with safety, quality, and innovation.
                </p>
                
                {/* Service Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Projects Delivered</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-secondary">6</div>
                    <div className="text-sm text-muted-foreground">Service Categories</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Support Available</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-secondary">15+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use the Services Section Component */}
        <ServicesSection />

        {/* Process Section */}
        <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
          <div className="container-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Our Methodology</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Process</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A proven methodology that ensures project success from initial consultation to final handover, 
                delivering excellence at every step.
              </p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-6 relative">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  description: "Understanding your requirements and conducting comprehensive site assessment",
                  icon: Users,
                  color: "from-blue-500 to-blue-600"
                },
                {
                  step: "02", 
                  title: "Planning",
                  description: "Developing detailed project plans and technical specifications",
                  icon: Building,
                  color: "from-green-500 to-green-600"
                },
                {
                  step: "03",
                  title: "Execution",
                  description: "Professional installation with certified materials and equipment",
                  icon: Settings,
                  color: "from-orange-500 to-orange-600"
                },
                {
                  step: "04",
                  title: "Quality Check",
                  description: "Comprehensive testing and quality assurance procedures",
                  icon: Shield,
                  color: "from-purple-500 to-purple-600"
                },
                {
                  step: "05",
                  title: "Handover",
                  description: "Final documentation, training, and ongoing support",
                  icon: Award,
                  color: "from-red-500 to-red-600"
                }
              ].map((process, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-gray-200">
                    <div className={`w-16 h-16 bg-gradient-to-br ${process.color} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <process.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-gray-200">{process.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 text-center">{process.title}</h3>
                    <p className="text-muted-foreground text-sm text-center leading-relaxed">{process.description}</p>
                  </div>
                  
                  {index < 4 && (
                    <div className="hidden md:block absolute top-12 left-full w-6 h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 transform translate-x-2 group-hover:from-primary group-hover:to-secondary transition-all duration-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Why Choose Us</span>
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-8">Excellence You Can Trust</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Users,
                      title: "Expert Team",
                      description: "Certified engineers and technicians with extensive industry experience and proven expertise",
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      icon: Shield,
                      title: "Quality Materials",
                      description: "We use only premium, certified materials from trusted international suppliers for lasting results",
                      color: "from-green-500 to-green-600"
                    },
                    {
                      icon: CheckCircle,
                      title: "Safety Standards",
                      description: "Strict adherence to international safety protocols and Nigerian electrical regulations",
                      color: "from-red-500 to-red-600"
                    },
                    {
                      icon: Clock,
                      title: "Timely Delivery",
                      description: "Proven track record of completing projects on time and within budget constraints",
                      color: "from-purple-500 to-purple-600"
                    },
                    {
                      icon: Zap,
                      title: "24/7 Support",
                      description: "Round-the-clock emergency support and comprehensive maintenance services",
                      color: "from-orange-500 to-orange-600"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl"></div>
                  <div className="relative text-white text-center space-y-8">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-6">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold">Licensed & Certified</h3>
                    <p className="text-xl text-white/90">ISO 9001:2015 • COREN Registered • DPR Licensed</p>
                    
                    <div className="grid grid-cols-3 gap-6 mt-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold">500+</div>
                        <div className="text-sm text-white/80">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">12+</div>
                        <div className="text-sm text-white/80">Years</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">50+</div>
                        <div className="text-sm text-white/80">Engineers</div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <QuoteModal
                        trigger={
                          <Button className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                            Get Your Quote
                          </Button>
                        }
                      />
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