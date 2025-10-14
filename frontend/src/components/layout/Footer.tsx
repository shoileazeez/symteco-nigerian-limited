import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="section-padding">
          <div className="container-padding">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Company Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <div className="text-2xl font-bold">
                    <span className="text-white">SYMTECO</span>
                    <span className="text-secondary"> NIGERIAN LIMITED</span>
                  </div>
                </div>
                <p className="text-primary-foreground/80 leading-relaxed text-sm">
                  Nigeria's trusted partner for industrial electrical and mechanical solutions. 
                  Powering the future with expertise, safety, and innovation since 2010.
                </p>
                <div className="flex space-x-3">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center text-primary-foreground/60 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center text-primary-foreground/60 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-lg flex items-center justify-center text-primary-foreground/60 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white relative">
                  Quick Links
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-secondary to-transparent"></div>
                </h3>
                <ul className="space-y-3">
                  {[ 
                    { name: "About Us", href: "/about" },
                    { name: "Our Services", href: "/services" },
                    { name: "Projects", href: "/projects" },
                    { name: "Contact Us", href: "/contact" },
                    { name: "Find Us", href: "/map" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-secondary/60 rounded-full mr-3 group-hover:bg-secondary transition-colors duration-300"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white relative">
                  Our Services
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-secondary to-transparent"></div>
                </h3>
                <ul className="space-y-3">
                  {[
                    "Industrial Electrical Installation",
                    "Switchgear Installation", 
                    "Panel Fabrication",
                    "Mechanical Installation",
                    "Low & Medium Voltage Systems",
                    "General Contracting",
                  ].map((service) => (
                    <li key={service} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-secondary/60 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="text-primary-foreground/80 text-sm leading-relaxed">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white relative">
                  Contact Info
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-secondary to-transparent"></div>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors duration-300">
                      <MapPin className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="text-primary-foreground/80 text-sm leading-relaxed">
                      <p>Suite 11, LSDPC Phase 1 Shopping Complex</p>
                      <p>Oba Ogunji Road, Pen-Cinema, Agege</p>
                      <p>Lagos, Nigeria</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors duration-300">
                      <Phone className="h-4 w-4 text-secondary" />
                    </div>
                    <span className="text-primary-foreground/80 text-sm">08058244486, 08087865823</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors duration-300">
                      <Mail className="h-4 w-4 text-secondary" />
                    </div>
                    <span className="text-primary-foreground/80 text-sm">ibrotech144@gmail.com</span>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                    Stay Updated
                  </h4>
                  <div className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="Your email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 transition-all duration-300"
                    />
                    <Button className="bg-gradient-to-r from-secondary to-secondary/80 text-white hover:from-secondary/90 hover:to-secondary shadow-lg hover:shadow-xl transition-all duration-300">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications & Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-wrap justify-center items-center space-x-8 space-y-4">
                <div className="flex items-center space-x-2 text-primary-foreground/60">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-2 text-primary-foreground/60">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center space-x-2 text-primary-foreground/60">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2 text-primary-foreground/60">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">100+ Projects Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm py-6">
          <div className="container-padding">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-primary-foreground/60 text-sm flex items-center">
                <span>© 2025 Symteco Nigeria Limited. All rights reserved.</span>
                <span className="mx-2 text-secondary">•</span>
                <span>Built with 💙 for Nigeria's Industrial Future</span>
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors duration-300 hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors duration-300 hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors duration-300 hover:underline">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;