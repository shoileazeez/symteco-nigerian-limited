import { Zap, Cog, Shield, Wrench, CircuitBoard, Building } from "lucide-react";
import QuoteModal from "@/components/sections/QuoteModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { memo } from "react";

const ServicesSection = memo(() => {
  const services = [
    {
      icon: Zap,
      title: "Skilled Electrical Technician Services",
      description: "Professional electrical technicians providing precision work on industrial equipment, control panels, and electrical systems in controlled environments.",
      image: "/project-technician-electrical-work.jpg",
      features: ["Control Panel Work", "Precision Wiring", "System Diagnostics", "Equipment Maintenance"]
    },
    {
      icon: Building,
      title: "Substation Construction & Civil Works",
      description: "Complete substation construction projects from ground preparation and foundation work to structural installation and electrical equipment setup.",
      image: "/project-abeokuta-substation-construction.jpg",
      features: ["Foundation Construction", "Structural Work", "Equipment Installation", "Site Preparation"]
    },
    {
      icon: CircuitBoard,
      title: "Industrial Transformer Installation",
      description: "Professional installation of power transformers with protective housing, safety systems, and proper grounding for industrial facilities.",
      image: "/project-ikeja-transformer-installation.jpg",
      features: ["Transformer Setup", "Protective Housing", "Safety Installation", "Industrial Applications"]
    },
    {
      icon: Shield,
      title: "High Voltage Line Maintenance",
      description: "Specialized high-altitude work on transmission lines including conductor maintenance, insulator work, and structural reinforcement by certified technicians.",
      image: "/project-high-voltage-line-work.jpg",
      features: ["High Altitude Work", "Conductor Maintenance", "Safety Protocols", "Certified Technicians"]
    },
    {
      icon: Wrench,
      title: "Distribution Pole Transformer Services",
      description: "Installation and maintenance of pole-mounted distribution transformers with proper grounding and network connections for reliable power distribution.",
      image: "/project-lagos-distribution-transformer.jpg",
      features: ["Pole Mounting", "Distribution Networks", "Grounding Systems", "Power Distribution"]
    },
    {
      icon: Cog,
      title: "Maintenance & Support Services",
      description: "Comprehensive maintenance services and 24/7 support for all electrical and mechanical systems.",
      image: "/project-electrical-maintenance.jpg",
      features: ["Preventive Maintenance", "Emergency Support", "System Monitoring", "Performance Optimization"]
    }
  ];

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container-padding">
        {/* Section Header with enhanced design */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-6 py-2 mb-6">
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">Our Expertise</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Expert Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive electrical and mechanical solutions designed to power your industrial operations 
            with reliability, efficiency, and safety at the forefront. From substation construction to precision electrical work.
          </p>
          <div className="flex items-center justify-center mt-8 space-x-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Certified Engineers</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-card group animate-fade-in-up bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/20"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Service Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                {/* Service number badge */}
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-full">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Service Content */}
              <div className="p-8 space-y-5">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Features List with improved styling */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Key Features</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground text-xs leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Button */}
                <div className="pt-2">
                  <button className="w-full bg-gradient-to-r from-primary/5 to-secondary/5 hover:from-primary hover:to-secondary text-primary hover:text-white border border-primary/20 hover:border-transparent px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 group-hover:shadow-lg">
                    Learn More About This Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA with improved design */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 border border-primary/10 rounded-3xl p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl">
                <Wrench className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team of certified engineers and technicians are ready to design and implement the perfect electrical or mechanical solution for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <QuoteModal 
                trigger={
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Custom Quote
                  </Button>
                }
              />
              <Button 
                variant="outline" 
                className="border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Schedule Consultation
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>24/7 Emergency Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Licensed & Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>15+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;