import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="text-2xl font-bold">
                <span className="text-white">SYMTECO</span>
                <span className="text-secondary">.ng</span>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed">
                Nigeria's trusted partner for industrial electrical and mechanical solutions. 
                Powering the future with expertise, safety, and innovation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: "About Us", href: "#about" },
                  { name: "Our Services", href: "#services" },
                  { name: "Projects", href: "#projects" },
                  { name: "Contact Us", href: "#contact" },
                  { name: "Request Quote", href: "#quote" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Our Services</h3>
              <ul className="space-y-2">
                {[
                  "Industrial Electrical Installation",
                  "Switchgear Installation",
                  "Panel Fabrication",
                  "Mechanical Installation",
                  "Low & Medium Voltage Systems",
                  "General Contracting",
                ].map((service) => (
                  <li key={service}>
                    <span className="text-primary-foreground/80">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div className="text-primary-foreground/80">
                    <p>Suite 11, LSDPC Phase 1 Shopping Complex</p>
                    <p>Oba Ogunji Road, Pen-Cinema, Agege</p>
                    <p>Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-primary-foreground/80">08058244486, 08087865823</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-primary-foreground/80">ibrotech144@gmail.com</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white mb-2">Stay Updated</h4>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container-padding">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/60 text-sm">
              © 2024 Symteco Nigeria Limited. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;