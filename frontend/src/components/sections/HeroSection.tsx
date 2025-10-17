import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/sections/QuoteModal";
import { Shield, Award, Users, CheckCircle, ArrowRight, Zap, Building, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Next.js Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-industrial.jpg"
          alt="Symteco Industrial Operations"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-padding text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Trust Indicators with improved design */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12 opacity-90">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Shield className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">RC 1025558</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Award className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Est. 2012</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Users className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">50+ Engineers</span>
            </div>
          </div>

          {/* Main Heading with enhanced typography */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              SYMTECO
            </span>
            <br />
            <span className="text-secondary text-3xl md:text-4xl lg:text-5xl font-normal block mt-2">
              Electrical & Mechanical Excellence
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up font-light" style={{animationDelay: '0.2s'}}>
            Professional integrity in steady and progressive growth, providing indigenously oriented engineering services 
            that challenge foreign dominance with <span className="text-secondary font-medium">equivalent or better solutions</span>.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Link href="/services" className="group">
              <Button className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 border-0">
                View Our Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <QuoteModal
              trigger={
                <Button className="bg-transparent border-2 border-white/30 hover:border-white text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                  Request a Quote
                </Button>
              }
            />
          </div>

          {/* Enhanced Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <span className="text-white font-semibold">24/7 Emergency Support</span>
              </div>
              <p className="text-white/70 text-sm">Round-the-clock support for critical electrical systems</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Building className="h-6 w-6 text-secondary" />
                </div>
                <span className="text-white font-semibold">Certified Engineers</span>
              </div>
              <p className="text-white/70 text-sm">Licensed professionals with proven track record</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Settings className="h-6 w-6 text-secondary" />
                </div>
                <span className="text-white font-semibold">Quality Guaranteed</span>
              </div>
              <p className="text-white/70 text-sm">ISO 9001:2015 certified quality management</p>
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