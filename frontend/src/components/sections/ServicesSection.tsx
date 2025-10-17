import { Zap, Cog, Shield, Wrench, CircuitBoard, Building, ArrowRight, Settings } from "lucide-react";
import QuoteModal from "@/components/sections/QuoteModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { memo } from "react";

const ServicesSection = memo(() => {
  const services = [
    {
      icon: Zap,
      title: "Electrical Installation",
      description: "Professional electrical installations for industrial and commercial facilities with certified materials and expert craftsmanship.",
      image: "/project-technician-electrical-work.jpg",
      features: ["Industrial Systems", "Control Panels", "Safety Compliance"]
    },
    {
      icon: Building,
      title: "Substation Construction",
      description: "Complete substation construction and civil works from foundation to commissioning with proven expertise.",
      image: "/project-abeokuta-substation-construction.jpg",
      features: ["Civil Works", "Equipment Setup", "System Integration"]
    },
    {
      icon: CircuitBoard,
      title: "Transformer Services",
      description: "Power transformer installation, maintenance, and repair services for reliable industrial power distribution.",
      image: "/project-ikeja-transformer-installation.jpg",
      features: ["Installation", "Maintenance", "Testing & Commissioning"]
    },
    {
      icon: Shield,
      title: "High Voltage Maintenance",
      description: "Specialized maintenance services for high voltage transmission lines and distribution networks.",
      image: "/project-high-voltage-line-work.jpg",
      features: ["Line Maintenance", "Safety Protocols", "Emergency Response"]
    },
    {
      icon: Wrench,
      title: "Distribution Systems",
      description: "Complete distribution system solutions including pole transformers and network optimization.",
      image: "/project-lagos-distribution-transformer.jpg",
      features: ["Network Design", "Load Management", "System Optimization"]
    },
    {
      icon: Cog,
      title: "Maintenance & Support",
      description: "Comprehensive maintenance programs and 24/7 emergency support for all electrical systems.",
      image: "/project-electrical-maintenance.jpg",
      features: ["Preventive Care", "Emergency Support", "Performance Monitoring"]
    }
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-white to-gray-50/50">
      <div className="container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-2 mb-6">
            <Settings className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Professional Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive electrical and mechanical solutions delivered by certified engineers 
            with over 12 years of proven experience across Nigeria.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary/20"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
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
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <Link href="/services" className="inline-flex items-center space-x-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors group/link">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Power Your Next Project?
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Get a custom quote from our certified engineers and discover how we can 
                deliver the perfect electrical solution for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <QuoteModal 
                  trigger={
                    <Button className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                      Get Your Quote
                    </Button>
                  }
                />
                <Link href="/services">
                  <Button 
                    variant="outline" 
                    className="border-2 border-white/30 hover:border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                  >
                    View All Services
                  </Button>
                </Link>
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