import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, Phone, Mail, MessageCircle, Send, Users, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast, toastHelpers } from "@/hooks/use-toast";
import axios from "axios";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    projectLocation: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.service || !formData.message) {
      toastHelpers.error(
        "Missing Information",
        "Please fill in all required fields."
      );
      return;
    }
    
    setLoading(true);
    
    // Show loading toast
    const loadingToast = toastHelpers.loading(
      "Sending Message...",
      "Please wait while we process your request."
    );
    
    try {
      await axios.post("/api/contact", {
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        projectLocation: formData.projectLocation,
        message: formData.message,
        origin: "contact"
      });
      
      // Dismiss loading toast
      loadingToast.dismiss();
      
      toastHelpers.success(
        "Message Sent Successfully!",
        "Thank you for contacting us. We'll get back to you within 2 hours during business hours."
      );
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        projectLocation: "",
        message: ""
      });
    } catch (err) {
      // Dismiss loading toast
      loadingToast.dismiss();
      
      toastHelpers.error(
        "Error Sending Message",
        "Failed to send message. Please try again later or contact us directly."
      );
    }
    setLoading(false);
  };
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
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Let's Start a Conversation</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Touch</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  Ready to power your next project? Our team of electrical and mechanical experts is here to help 
                  bring your vision to life with professional solutions and exceptional service.
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Emergency Support</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-secondary">2hr</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-2xl font-bold text-secondary">12+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
          <div className="container-padding">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100">
                <div className="mb-8">
                  <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                    <Send className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Send us a message</span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Let's Discuss Your Project</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 2 hours during business hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">First Name *</label>
                      <Input 
                        value={formData.firstName}
                        onChange={e => handleInputChange("firstName", e.target.value)}
                        placeholder="Your first name" 
                        className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Last Name *</label>
                      <Input 
                        value={formData.lastName}
                        onChange={e => handleInputChange("lastName", e.target.value)}
                        placeholder="Your last name" 
                        className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address *</label>
                      <Input 
                        type="email" 
                        value={formData.email}
                        onChange={e => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com" 
                        className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number *</label>
                      <Input 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => handleInputChange("phone", e.target.value)}
                        placeholder="+234 xxx xxx xxxx" 
                        className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Service Required *</label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrical-installation">Electrical Installation</SelectItem>
                        <SelectItem value="substation-construction">Substation Construction</SelectItem>
                        <SelectItem value="transformer-installation">Transformer Installation</SelectItem>
                        <SelectItem value="panel-fabrication">Panel Fabrication</SelectItem>
                        <SelectItem value="maintenance">Maintenance Services</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Project Details *</label>
                    <Textarea 
                      value={formData.message}
                      onChange={e => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your project requirements, timeline, and any specific details..."
                      className="min-h-32 border-gray-200 focus:border-primary focus:ring-primary/20 resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Project Location</label>
                    <Input 
                      value={formData.projectLocation}
                      onChange={e => handleInputChange("projectLocation", e.target.value)}
                      placeholder="City, State (e.g., Lagos, Nigeria)" 
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Direct Contact */}
                <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Get Immediate Assistance</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Call Us Now</h4>
                        <p className="text-white/90 mb-1">Main: 08058244486</p>
                        <p className="text-white/90 mb-1">Alt: 08087865823</p>
                        <p className="text-sm text-white/80">Mon-Fri: 8AM-6PM, Emergency: 24/7</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Email Us</h4>
                        <p className="text-white/90 mb-1">ibrotech144@gmail.com</p>
                        <p className="text-sm text-white/80">We respond within 2 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Visit Our Office</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          Suite 11, LSDPC Phase 1 Shopping Complex<br />
                          Oba Ogunji Road, Pen-Cinema, Agege<br />
                          Lagos, Nigeria
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-6">Why Choose Symteco?</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Users, title: "Expert Team", desc: "50+ skilled professionals" },
                      { icon: Shield, title: "Safety First", desc: "ISO 9001:2015 certified" },
                      { icon: Award, title: "12+ Years", desc: "Proven track record" },
                      { icon: Clock, title: "Quick Response", desc: "2-hour response time" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Business Hours
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium text-foreground">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium text-foreground">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium text-foreground">Emergency Only</span>
                    </div>
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <span className="text-primary font-semibold text-sm">24/7 Emergency Support Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
          <div className="container-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Nationwide Coverage</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Service Areas</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We provide electrical and mechanical services across Nigeria, with a strong presence 
                in major cities and industrial zones nationwide.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  state: "Lagos State", 
                  areas: ["Lagos Island", "Victoria Island", "Ikeja", "Apapa"],
                  color: "from-blue-500 to-blue-600"
                },
                { 
                  state: "Abuja FCT", 
                  areas: ["Central Area", "Garki", "Wuse", "Maitama"],
                  color: "from-green-500 to-green-600"
                },
                { 
                  state: "Rivers State", 
                  areas: ["Port Harcourt", "Obio-Akpor", "Eleme", "Bonny"],
                  color: "from-purple-500 to-purple-600"
                },
                { 
                  state: "Kano State", 
                  areas: ["Kano City", "Nassarawa", "Fagge", "Gwale"],
                  color: "from-orange-500 to-orange-600"
                }
              ].map((location, index) => (
                <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className={`w-12 h-12 bg-gradient-to-br ${location.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-4">{location.state}</h3>
                  <ul className="space-y-2">
                    {location.areas.map((area, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Integration */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 lg:p-12 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Find Us on the Map</h2>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Located in the heart of Lagos, our office is easily accessible and equipped with 
                    modern facilities to serve our clients better.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-white" />
                      <span>Suite 11, LSDPC Phase 1 Shopping Complex</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-white" />
                      <span>Oba Ogunji Road, Pen-Cinema, Agege, Lagos</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Get Directions</h3>
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
                      placeholder="Enter your starting location"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full bg-white text-primary hover:bg-white/90 transition-all duration-300"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </form>
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

export default Contact;