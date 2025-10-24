import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast, toastHelpers } from "@/hooks/use-toast";
import { Send, CheckCircle, Clock, Users, Award } from "lucide-react";

const QuoteModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    projectLocation: "",
    timeline: "",
    budget: "",
    details: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.details) {
      toastHelpers.error(
        "Missing Information",
        "Please fill in all required fields."
      );
      return;
    }
    
    setLoading(true);
    
    // Show loading toast
    const loadingToast = toastHelpers.loading(
      "Sending Quote Request...",
      "Please wait while we process your quote request."
    );
    
    try {
      await axios.post("/api/contact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service || "Quote Request",
        projectLocation: formData.projectLocation,
        timeline: formData.timeline,
        budget: formData.budget,
        details: formData.details,
        message: `Project Details: ${formData.details}\n\nLocation: ${formData.projectLocation}\nTimeline: ${formData.timeline}\nBudget: ${formData.budget}`,
        origin: "quote"
      });
      
      // Dismiss loading toast
      loadingToast.dismiss();
      
      toastHelpers.success(
        "Quote Request Sent Successfully!",
        "Thank you for your quote request. We'll review your requirements and get back to you within 2 hours during business hours."
      );
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        projectLocation: "",
        timeline: "",
        budget: "",
        details: ""
      });
      
      setOpen(false);
    } catch (err) {
      // Dismiss loading toast
      loadingToast.dismiss();
      
      toastHelpers.error(
        "Error Sending Quote Request",
        "Failed to send quote request. Please try again later or contact us directly."
      );
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Send className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground">Request a Quote</DialogTitle>
              <p className="text-muted-foreground">Get a detailed quote for your electrical and mechanical project</p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name *</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    value={formData.name} 
                    onChange={e => handleInputChange("name", e.target.value)} 
                    placeholder="Your full name"
                    className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={e => handleInputChange("email", e.target.value)} 
                    placeholder="your.email@example.com"
                    className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                    required 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={e => handleInputChange("phone", e.target.value)} 
                    placeholder="+234 xxx xxx xxxx"
                    className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-foreground">Company Name</Label>
                  <Input 
                    id="company" 
                    type="text" 
                    value={formData.company} 
                    onChange={e => handleInputChange("company", e.target.value)} 
                    placeholder="Your company name"
                    className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm font-medium text-foreground">Service Required</Label>
                <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electrical-installation">Industrial Electrical Installation</SelectItem>
                    <SelectItem value="substation-construction">Substation Construction</SelectItem>
                    <SelectItem value="transformer-installation">Transformer Installation</SelectItem>
                    <SelectItem value="panel-fabrication">Panel Fabrication & Installation</SelectItem>
                    <SelectItem value="mechanical-installation">Mechanical Installation</SelectItem>
                    <SelectItem value="maintenance">Maintenance Services</SelectItem>
                    <SelectItem value="consultation">Technical Consultation</SelectItem>
                    <SelectItem value="other">Other Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectLocation" className="text-sm font-medium text-foreground">Project Location</Label>
                  <Input 
                    id="projectLocation" 
                    type="text" 
                    value={formData.projectLocation} 
                    onChange={e => handleInputChange("projectLocation", e.target.value)} 
                    placeholder="City, State (e.g., Lagos, Nigeria)"
                    className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-sm font-medium text-foreground">Project Timeline</Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent (Within 1 week)</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="3-months">Within 3 months</SelectItem>
                      <SelectItem value="6-months">Within 6 months</SelectItem>
                      <SelectItem value="flexible">Flexible timeline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium text-foreground">Estimated Budget (Optional)</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">Under ₦1,000,000</SelectItem>
                    <SelectItem value="1m-5m">₦1,000,000 - ₦5,000,000</SelectItem>
                    <SelectItem value="5m-10m">₦5,000,000 - ₦10,000,000</SelectItem>
                    <SelectItem value="10m-50m">₦10,000,000 - ₦50,000,000</SelectItem>
                    <SelectItem value="50m-plus">Over ₦50,000,000</SelectItem>
                    <SelectItem value="discuss">Prefer to discuss</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details" className="text-sm font-medium text-foreground">Project Details *</Label>
                <Textarea 
                  id="details" 
                  value={formData.details} 
                  onChange={e => handleInputChange("details", e.target.value)} 
                  placeholder="Please provide detailed information about your project requirements, specifications, scope of work, and any specific challenges or considerations..."
                  className="min-h-32 border-gray-200 focus:border-primary focus:ring-primary/20 resize-none"
                  required 
                  rows={6} 
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
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Quote Request
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            {/* What to Expect */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                What to Expect
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <Clock className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Quick Response</p>
                    <p className="text-muted-foreground">We'll respond within 2 hours during business hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Expert Consultation</p>
                    <p className="text-muted-foreground">Free consultation with our certified engineers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Detailed Quote</p>
                    <p className="text-muted-foreground">Comprehensive breakdown of costs and timeline</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-foreground mb-4">Need Immediate Assistance?</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">Call Us Directly</p>
                  <p className="text-muted-foreground">08058244486, 08087865823</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Email Us</p>
                  <p className="text-muted-foreground">ibrotech144@gmail.com</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Business Hours</p>
                  <p className="text-muted-foreground">Mon-Fri: 8AM-6PM, Sat: 9AM-4PM</p>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-700 font-semibold text-xs">24/7 Emergency Support Available</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-6 border border-secondary/20">
              <h3 className="text-lg font-bold text-foreground mb-4">Why Choose Symteco?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-muted-foreground">500+ Projects Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-muted-foreground">Licensed & Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
