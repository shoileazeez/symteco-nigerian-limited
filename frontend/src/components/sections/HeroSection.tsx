import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/sections/QuoteModal";
import { Shield, Award, Users, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-padding text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 mb-8 opacity-90">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">ISO 9001:2015</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">15+ Years Experience</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            Powering Nigeria's
            <span className="text-secondary block">Industrial Future</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Expert electrical and mechanical solutions for industrial excellence. 
            From switchgear installation to complete facility automation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link to="/services" className="btn-hero-secondary inline-flex items-center justify-center px-4 py-2 rounded-md font-medium">
              View Our Services
            </Link>
            <QuoteModal
              trigger={<Button className="btn-hero-outline">Request a Quote</Button>}
            />
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center space-x-3 justify-center md:justify-start">
              <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
              <span className="text-white/90">24/7 Emergency Support</span>
            </div>
            <div className="flex items-center space-x-3 justify-center md:justify-start">
              <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
              <span className="text-white/90">Certified Engineers</span>
            </div>
            <div className="flex items-center space-x-3 justify-center md:justify-start">
              <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
              <span className="text-white/90">Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;