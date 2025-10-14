import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Award, Shield, Lightbulb, Heart, Users, Target, Eye } from "lucide-react";

const About = () => {
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
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Established 2012 • 12+ Years Experience</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Symteco</span> Nigeria Limited
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  Powering Nigeria's industrial future with expert electrical and mechanical solutions. 
                  Where innovation meets reliability, and excellence is our standard.
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>RC 1025558</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>ISO 9001:2015 Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>100+ Projects Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision & Objective Cards */}
        <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
          <div className="container-padding">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Mission */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  "We are committed to practical technology with a passion for excellence in practice. 
                  Our mission is to maintain goodwill toward all customers through honesty and integrity, 
                  propelled by self-motivation and pragmatic disposition in all fields."
                </p>
              </div>

              {/* Vision */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-secondary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  "In the wake of globalization sweeping across the world, we develop and formulate 
                  strategies that place us in a position to win over not only local competitors 
                  but those from the international arena."
                </p>
              </div>

              {/* Objective */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-primary/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Objective</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide broad-based engineering services that are indigenously oriented to challenge 
                  foreign dominance in the construction engineering industry by delivering better or 
                  equivalent services with professional integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Our Story</span>
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">
                  Engineering Excellence Since <span className="text-primary">2012</span>
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">SYMTECO NIGERIA LIMITED</strong> was established as a comprehensive engineering company, 
                    evolving from SYMTECO TECHNICALS to offer enhanced electrical and mechanical engineering services, 
                    proffering solutions in industrial and domestic installations, metal fabrication, and rural electrification projects.
                  </p>
                  <p>
                    We specialize in custom design, build, and installation services for low voltage distribution switchboards, 
                    motor control centres, and control panels. From replacing obsolete systems to complete new installations, 
                    we have the capability to meet all your requirements.
                  </p>
                  <p>
                    Our track record spans numerous electrical and mechanical installations across Nigeria, 
                    consistently meeting local and international standards while prioritizing public and customer safety.
                  </p>
                </div>
                
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-1">50+</div>
                    <div className="text-sm text-muted-foreground">Skilled Employees</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/5 rounded-xl">
                    <div className="text-3xl font-bold text-secondary mb-1">100+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 h-96 flex flex-col justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl"></div>
                  <div className="relative text-white text-center space-y-6">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto flex items-center justify-center mb-4">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold">12+ Years</h3>
                    <p className="text-xl text-white/90">of Engineering Excellence</p>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">ISO</div>
                        <div className="text-xs text-white/80">Certified</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">COREN</div>
                        <div className="text-xs text-white/80">Registered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">DPR</div>
                        <div className="text-xs text-white/80">Licensed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
          <div className="container-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Heart className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">What Drives Us</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The fundamental principles that guide everything we do and define who we are as a company.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  description: "We prioritize the safety of our team, clients, and communities in every project we undertake.",
                  color: "from-red-500 to-red-600"
                },
                {
                  icon: Award,
                  title: "Quality Excellence",
                  description: "We deliver superior workmanship and use only the highest quality materials and equipment.",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description: "We embrace new technologies and methods to provide cutting-edge solutions for our clients.",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: Heart,
                  title: "Integrity",
                  description: "We conduct business with honesty, transparency, and ethical practices in all our interactions.",
                  color: "from-green-500 to-green-600"
                }
              ].map((value, index) => (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 text-center">{value.title}</h3>
                  <p className="text-muted-foreground text-center leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2 mb-6 shadow-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Certified Excellence</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Certifications & Accreditations</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our commitment to excellence is recognized by leading industry organizations and regulatory bodies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "ISO 9001:2015", subtitle: "Quality Management System", icon: "🏆" },
                { title: "COREN", subtitle: "Professional Registration", icon: "⚡" },
                { title: "DPR License", subtitle: "Contractor Certification", icon: "🔧" },
                { title: "NSITF", subtitle: "Safety Compliance", icon: "🛡️" },
                { title: "IEEE", subtitle: "Professional Membership", icon: "🔬" },
                { title: "NEC Standards", subtitle: "Safety Compliance", icon: "✅" }
              ].map((cert, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:bg-white">
                  <div className="text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{cert.icon}</div>
                    <h3 className="font-bold text-foreground text-lg mb-2">{cert.title}</h3>
                    <p className="text-muted-foreground text-sm">{cert.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="section-padding bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Corporate Information</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Corporate Address</h3>
                  <div className="space-y-2 text-white/90">
                    <p>Suite 11, LSDPC Phase 1 Shopping Complex</p>
                    <p>Oba Ogunji Road, Pen-Cinema, Agege</p>
                    <p>Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
                  <div className="space-y-2 text-white/90">
                    <p><strong>Phone:</strong> 08058244486, 08087865823</p>
                    <p><strong>Email:</strong> ibrotech144@gmail.com</p>
                    <p><strong>Registration:</strong> RC 1025558</p>
                    <p><strong>Established:</strong> April 13, 2012</p>
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

export default About;