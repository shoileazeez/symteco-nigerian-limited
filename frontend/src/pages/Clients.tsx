import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Building2, Handshake, TrendingUp, Globe, Award, Users, Quote, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Clients = () => {
  const clients = [
    { name: "Cummins West Africa", sector: "Power & Energy" },
    { name: "Niger Delta Power Holding (NDPHC)", sector: "Power Generation" },
    { name: "Lekki Concession Company", sector: "Infrastructure" },
    { name: "Lagos State Government", sector: "Government" },
    { name: "Nigerian National Petroleum Corporation (NNPC)", sector: "Oil & Gas" },
    { name: "Shell Petroleum Development Company", sector: "Oil & Gas" },
    { name: "Chevron Nigeria Limited", sector: "Oil & Gas" },
    { name: "Total Exploration & Production Nigeria", sector: "Oil & Gas" },
    { name: "Julius Berger Nigeria Plc", sector: "Construction" },
    { name: "Dangote Group", sector: "Manufacturing" },
    { name: "MTN Nigeria Communications Limited", sector: "Telecommunications" },
    { name: "Airtel Nigeria Limited", sector: "Telecommunications" },
    { name: "First Bank of Nigeria Limited", sector: "Banking" },
    { name: "Zenith Bank Plc", sector: "Banking" },
    { name: "United Bank for Africa (UBA)", sector: "Banking" },
    { name: "Nigerian Ports Authority (NPA)", sector: "Maritime" },
    { name: "Federal Ministry of Power", sector: "Government" },
    { name: "Nigerian Electricity Regulatory Commission (NERC)", sector: "Regulatory" },
    { name: "Transmission Company of Nigeria (TCN)", sector: "Power Transmission" },
    { name: "Abuja Electricity Distribution Company (AEDC)", sector: "Power Distribution" },
    { name: "Ikeja Electric Plc", sector: "Power Distribution" },
    { name: "Eko Electricity Distribution Company", sector: "Power Distribution" },
    { name: "Nigerian Railway Corporation", sector: "Transportation" },
    { name: "Federal Airports Authority of Nigeria (FAAN)", sector: "Aviation" }
  ];

  const partnerships = [
    {
      name: "Noja Power",
      country: "Australia",
      description: "Strategic partnership for advanced switching solutions and grid automation technologies",
      benefits: ["Technology Transfer", "Joint R&D", "Market Access"],
      logo: "🇦🇺",
      website: "nojapower.com.au",
      established: "2018"
    },
    {
      name: "REPL (Roxtec Engineering Private Limited)",
      country: "United Kingdom", 
      description: "Collaboration in cable sealing solutions and electrical safety systems",
      benefits: ["Innovation Exchange", "Technical Support", "Quality Assurance"],
      logo: "🇬🇧",
      website: "roxtecengineering.co.uk",
      established: "2020"
    }
  ];

  const testimonials = [
    {
      client: "Niger Delta Power Holding Company",
      position: "Chief Technical Officer",
      content: "Symteco delivered exceptional results on our power generation project. Their technical expertise and commitment to safety standards exceeded our expectations. The project was completed on time and within budget.",
      rating: 5,
      project: "50MW Power Plant Installation",
      sector: "Power Generation"
    },
    {
      client: "Lekki Concession Company",
      position: "Engineering Manager",
      content: "Working with Symteco on our infrastructure development was a game-changer. Their innovative approach to electrical systems integration and professional project management made all the difference.",
      rating: 5,
      project: "Smart Grid Implementation",
      sector: "Infrastructure"
    },
    {
      client: "MTN Nigeria Communications",
      position: "Network Infrastructure Head",
      content: "Symteco's expertise in telecommunications infrastructure is outstanding. They successfully upgraded our data center electrical systems with minimal downtime. Highly recommended for critical infrastructure projects.",
      rating: 5,
      project: "Data Center Electrical Upgrade",
      sector: "Telecommunications"
    }
  ];

  const stats = [
    { label: "Active Clients", value: "24+", icon: Users },
    { label: "International Partners", value: "2", icon: Globe },
    { label: "Industry Sectors", value: "12+", icon: Building2 },
    { label: "Years of Trust", value: "15+", icon: Award }
  ];

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
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Our Valued Clients & Partners</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Clients & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Partnerships</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  Trusted by leading organizations across Nigeria and backed by international partnerships 
                  that drive innovation and excellence in electrical engineering solutions.
                </p>
                
                {/* Trust Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                        <div className="flex items-center justify-center mb-2">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Partnerships Section */}
        <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
          <div className="container-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Handshake className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Global Collaborations</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Partnerships</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Strategic international partnerships that bring world-class technology and innovation 
                to our Nigerian engineering solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {partnerships.map((partner, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:border-primary/20"
                >
                  <div className="flex items-start mb-6">
                    <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-4 mr-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-4xl mb-2">{partner.logo}</div>
                      <Handshake className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2">{partner.name}</h3>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Globe className="h-4 w-4 mr-2" />
                        <span className="font-medium">{partner.country}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm">Since {partner.established}</span>
                      </div>
                      <div className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                        {partner.website}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">{partner.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                      Partnership Benefits
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {partner.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Our Clients Say */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Quote className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Client Testimonials</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">What Our Clients Say</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Real feedback from our valued clients who have experienced our commitment to excellence firsthand.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.client}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        <div className="mt-2">
                          <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                            {testimonial.sector}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      <strong>Project:</strong> {testimonial.project}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Grid */}
        <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
          <div className="container-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Our Client Portfolio</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Valued Clients</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Working with leading organizations across multiple industries to deliver exceptional engineering solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-primary/20 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-colors duration-300">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2 leading-tight">{client.name}</h3>
                      <span className="text-sm text-muted-foreground bg-gray-100 px-3 py-1 rounded-full">
                        {client.sector}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <Handshake className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Join Our Growing Network</h3>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Experience the same level of excellence and reliability that our clients and partners trust. 
                    Let's build the future of electrical infrastructure together.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                      Start Your Project
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                      Become a Partner
                    </Button>
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

export default Clients;