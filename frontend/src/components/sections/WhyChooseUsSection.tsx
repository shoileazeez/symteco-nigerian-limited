import React from 'react';
import { Shield, Award, Users, Lightbulb, Target, CheckCircle, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/sections/QuoteModal";
import Link from "next/link";

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container-padding">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">What Drives Us</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-6">Why Choose Symteco</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The fundamental principles that guide everything we do and define who we are as a company.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">Safety First</h3>
            <p className="text-muted-foreground text-center leading-relaxed">We prioritize the safety of our team, clients, and communities in every project we undertake.</p>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">Quality Excellence</h3>
            <p className="text-muted-foreground text-center leading-relaxed">We deliver superior workmanship and use only the highest quality materials and equipment.</p>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">Innovation</h3>
            <p className="text-muted-foreground text-center leading-relaxed">We embrace new technologies and methods to provide cutting-edge solutions for our clients.</p>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">Expert Team</h3>
            <p className="text-muted-foreground text-center leading-relaxed">50+ skilled engineers and technicians with extensive experience in electrical and mechanical systems.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 text-white mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h3>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Our commitment to excellence has earned us the trust of major corporations 
              and government agencies across Nigeria.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-white/90">Projects Completed</div>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">12+</div>
              <div className="text-white/90">Years Experience</div>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/90">Support Available</div>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-white/90">Client Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Project?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experience the difference that professional engineering expertise makes. 
              Let's discuss how we can power your next project to success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <QuoteModal
                trigger={
                  <Button className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Free Quote
                  </Button>
                }
              />
              <Link href="/projects">
                <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                  View Our Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
