import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Clock, Navigation, Car, Bus, Landmark, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuoteModal from "@/components/sections/QuoteModal";

const Map = () => {
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
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Visit Our Location</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Us</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  Visit our Lagos headquarters or explore our comprehensive service coverage across Nigeria. 
                  We're here to serve you wherever your project needs us.
                </p>
                
                {/* Quick Contact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <Phone className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium text-foreground">Call Us</div>
                    <div className="text-xs text-muted-foreground">08058244486</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <Clock className="h-6 w-6 text-secondary mx-auto mb-2" />
                    <div className="text-sm font-medium text-foreground">Open Today</div>
                    <div className="text-xs text-muted-foreground">8:00 AM - 6:00 PM</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <Navigation className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium text-foreground">Get Directions</div>
                    <div className="text-xs text-muted-foreground">Lagos, Nigeria</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
          <div className="container-padding">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Our Lagos Office</h3>
                    <p className="text-muted-foreground">Suite 11, LSDPC Phase 1 Shopping Complex, Agege</p>
                  </div>
                  <Button 
                    onClick={() => window.open('https://www.google.com/maps/place/Suite+11,+LSDPC+Phase+1+Shopping+Complex,+Oba+Ogunji+Road,+Pen-Cinema,+Agege,+Lagos', '_blank')}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Maps
                  </Button>
                </div>
              </div>
              <div className="h-96 md:h-[500px] w-full">
                <iframe
                  src="https://www.google.com/maps?q=Suite+11,+LSDPC+Phase+1+Shopping+Complex,+Oba+Ogunji+Road,+Pen-Cinema,+Agege,+Lagos&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Symteco Nigeria Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Location Details */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                {/* Office Information */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Our Lagos Office</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Address</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Suite 11, LSDPC Phase 1 Shopping Complex<br />
                          Oba Ogunji Road, Pen-Cinema, Agege<br />
                          Lagos, Nigeria
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Contact Information</h3>
                        <div className="space-y-2 text-muted-foreground">
                          <p><span className="font-medium">Main:</span> 08058244486</p>
                          <p><span className="font-medium">Alternative:</span> 08087865823</p>
                          <p><span className="font-medium">Email:</span> ibrotech144@gmail.com</p>
                          <p><span className="font-medium">Emergency:</span> 08058244486 (24/7)</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                        <div className="space-y-2 text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Monday - Friday</span>
                            <span className="font-medium">8:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday</span>
                            <span className="font-medium">9:00 AM - 4:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday</span>
                            <span className="font-medium">Emergency Only</span>
                          </div>
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <span className="text-green-700 font-semibold text-sm">24/7 Emergency Support Available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Directions Calculator */}
                <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
                  <div className="flex items-center space-x-3 mb-6">
                    <Navigation className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold">Get Directions</h3>
                  </div>
                  <p className="text-white/90 mb-6">
                    Enter your location below and we'll help you find the best route to our office.
                  </p>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      const address = (e.target as any).userAddress.value;
                      if (address) {
                        window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(address)}&destination=Suite+11,+LSDPC+Phase+1+Shopping+Complex,+Oba+Ogunji+Road,+Pen-Cinema,+Agege,+Lagos`, '_blank');
                      }
                    }}
                    className="space-y-4"
                  >
                    <Input
                      type="text"
                      name="userAddress"
                      placeholder="Enter your starting location..."
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 h-12"
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full bg-white text-primary hover:bg-white/90 h-12 font-semibold transition-all duration-300"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </form>
                </div>
              </div>

              <div className="space-y-8">
                {/* Getting Here */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Getting Here</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Car className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">By Car</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Take the Lagos-Abeokuta Expressway towards Agege. Turn at Pen-Cinema junction 
                          and follow Oba Ogunji Road. The LSDPC Shopping Complex will be on your right.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bus className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Public Transport</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Take a bus to Pen-Cinema from Ikeja or any Lagos Bus Stop. 
                          From Pen-Cinema, take a short okada ride to LSDPC Shopping Complex.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Landmark className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Landmarks</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Near Pen-Cinema Market, close to Agege Local Government Area. 
                          Look for the LSDPC Shopping Complex signage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Need Help */}
                <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8 border border-secondary/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageCircle className="h-6 w-6 text-secondary" />
                    <h3 className="text-xl font-bold text-foreground">Need Assistance?</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Can't find us or need directions? Call us and we'll help guide you to our office. 
                    We're always happy to assist our clients.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => window.open('tel:+2348058244486')}
                      className="bg-secondary hover:bg-secondary/90 text-white flex-1"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call for Help
                    </Button>
                    <QuoteModal
                      trigger={
                        <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 flex-1">
                          Schedule Visit
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Coverage Map */}
        <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
          <div className="container-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Nationwide Service</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Service Coverage Areas</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We provide electrical and mechanical services across Nigeria's major cities and industrial zones, 
                bringing our expertise wherever you need it.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  city: "Lagos",
                  description: "Main office and primary service area",
                  coverage: "100% Coverage",
                  projects: "300+ Projects",
                  color: "from-blue-500 to-blue-600",
                  icon: MapPin
                },
                {
                  city: "Abuja",
                  description: "Federal Capital Territory operations",
                  coverage: "Full Coverage", 
                  projects: "150+ Projects",
                  color: "from-green-500 to-green-600",
                  icon: MapPin
                },
                {
                  city: "Port Harcourt",
                  description: "Oil & gas industry specialist",
                  coverage: "Industrial Focus",
                  projects: "100+ Projects",
                  color: "from-purple-500 to-purple-600",
                  icon: MapPin
                },
                {
                  city: "Kano",
                  description: "Northern Nigeria operations",
                  coverage: "Regional Coverage",
                  projects: "75+ Projects",
                  color: "from-orange-500 to-orange-600",
                  icon: MapPin
                }
              ].map((area, index) => (
                <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className={`w-12 h-12 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <area.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{area.city}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{area.description}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Coverage:</span>
                      <span className="text-sm text-secondary font-semibold">{area.coverage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Completed:</span>
                      <span className="text-sm text-secondary font-semibold">{area.projects}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Map;