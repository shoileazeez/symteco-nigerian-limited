import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Adebayo Johnson",
      position: "Plant Manager",
      company: "Lagos Manufacturing Ltd",
      content: "Symteco transformed our electrical infrastructure with professionalism and expertise. Their team delivered on time and exceeded our expectations. The switchgear installation was flawless.",
      rating: 5,
      avatar: "AJ"
    },
    {
      id: 2,
      name: "Dr. Sarah Okafor",
      position: "Operations Director",
      company: "Nigerian Industrial Solutions",
      content: "Outstanding mechanical installation services. The HVAC system they installed has significantly improved our facility's efficiency. Highly recommend their services.",
      rating: 5,
      avatar: "SO"
    },
    {
      id: 3,
      name: "Chief Emeka Nwachukwu",
      position: "CEO",
      company: "West African Energy Corp",
      content: "From consultation to completion, Symteco demonstrated technical excellence and reliability. Their medium voltage installations are top-notch. A trusted partner for our projects.",
      rating: 5,
      avatar: "EN"
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What Our <span className="text-gradient-primary">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what leading industrial companies 
            across Nigeria say about our services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <CardContent className="p-8 relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-secondary text-secondary"
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>

                  {/* Client Details */}
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold mb-6">Trusted by Industry Leaders</h3>
            
            {/* Company Logos Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {[
                "Dangote Group",
                "Nigerian Breweries",
                "Lafarge Africa",
                "Nestle Nigeria"
              ].map((company) => (
                <div
                  key={company}
                  className="text-center text-muted-foreground font-medium"
                >
                  {company}
                </div>
              ))}
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Project Completion</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;