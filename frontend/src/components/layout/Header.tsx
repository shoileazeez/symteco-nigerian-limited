import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuoteModal from "@/components/sections/QuoteModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Clients", href: "/clients" },
    { name: "Contact", href: "/contact" },
    { name: "Find Us", href: "/map" },
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-3 hidden md:block">
        <div className="container-padding">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 hover:text-white/80 transition-colors">
                <Phone className="h-4 w-4" />
                <span>08058244486, 08087865823</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-white/80 transition-colors">
                <Mail className="h-4 w-4" />
                <span>ibrotech144@gmail.com</span>
              </div>
            </div>
            <div className="text-sm flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Licensed & Insured</span>
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100 md:top-0"
            : "bg-transparent md:top-[52px]"
        }`}
      >
        <div className="container-padding">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                <span className={isScrolled ? "text-primary" : "text-white md:text-primary "}>
                  SYMTECO 
                </span>
                <span className={isScrolled ? "text-secondary" : "text-secondary"}>  
                            NIGERIA LIMITED
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:bg-white/10 ${
                    isScrolled ? "text-foreground hover:text-primary" : "text-white hover:text-secondary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Quote Modal Trigger for Desktop */}
              <QuoteModal
                trigger={
                  <Button
                    className={`hidden md:inline-flex bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    Get a Quote
                  </Button>
                }
              />

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden p-2 rounded-lg transition-all duration-300 ${isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className={`h-6 w-6 transition-transform duration-300 ${isScrolled ? "text-foreground" : "text-white"}`} />
                ) : (
                  <Menu className={`h-6 w-6 transition-transform duration-300 ${isScrolled ? "text-foreground" : "text-white"}`} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg">
            <div className="container-padding py-6">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground font-medium hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-primary/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Quote Modal Trigger for Mobile */}
                <div className="pt-4">
                  <QuoteModal
                    trigger={
                      <Button className="bg-gradient-to-r from-primary to-secondary text-white w-full py-3 rounded-lg font-semibold shadow-lg">
                        Get a Quote
                      </Button>
                    }
                  />
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
