import { Zap, Cog, Shield, Wrench, CircuitBoard, Building } from "lucide-react";
import electricalImage from "@/assets/services-electrical.jpg";
import mechanicalImage from "@/assets/services-mechanical.jpg";
import panelsImage from "@/assets/services-panels.jpg";
import QuoteModal from "@/components/sections/QuoteModal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      icon: Zap,
      title: "Industrial Electrical Installation",
      description: "Complete electrical infrastructure for industrial facilities, from power distribution to control systems.",
      image: electricalImage,
      features: ["High & Low Voltage Systems", "Power Distribution", "Control Panels", "Safety Systems"]
    },
    {
      icon: Cog,
      title: "Mechanical Installation",
      description: "Advanced mechanical systems installation including HVAC, piping, and industrial machinery setup.",
      image: mechanicalImage,
      features: ["HVAC Systems", "Industrial Piping", "Machinery Installation", "Ventilation Systems"]
    },
    {
      icon: CircuitBoard,
      title: "Switchgear & Panel Fabrication",
      description: "Custom switchgear design and fabrication with state-of-the-art control panel manufacturing.",
      image: panelsImage,
      features: ["Custom Switchgear", "Control Panels", "MCC Panels", "Protection Systems"]
    },
    {
      icon: Shield,
      title: "Low & Medium Voltage Systems",
      description: "Specialized installation and maintenance of low and medium voltage electrical systems.",
      image: electricalImage,
      features: ["LV/MV Installation", "System Protection", "Load Management", "Power Quality"]
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description: "Comprehensive maintenance services and 24/7 support for all electrical and mechanical systems.",
      image: mechanicalImage,
      features: ["Preventive Maintenance", "Emergency Support", "System Upgrades", "Performance Optimization"]
    },
    {
      icon: Building,
      title: "General Contracting",
      description: "Full-scale project management and general contracting services for industrial facilities.",
      image: panelsImage,
      features: ["Project Management", "Facility Construction", "System Integration", "Quality Assurance"]
    }
  ];

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient-primary">Expert Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive electrical and mechanical solutions designed to power your industrial operations 
            with reliability, efficiency, and safety at the forefront.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-card group animate-fade-in-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Service Image */}
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* Service Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Need a custom solution? Our experts are ready to help.
          </p>
          <QuoteModal 
          trigger={<Button className="btn-hero-primary">Get Custom Quote</Button>}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;