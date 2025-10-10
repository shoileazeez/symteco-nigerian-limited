import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const QuoteModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    details: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.details) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      await axios.post("/api/contact", {
        ...formData,
        service: formData.service || "Quote Request",
        message: formData.details
      });
      
      toast({
        title: "Quote Request Sent Successfully!",
        description: "Thank you for your quote request. We'll review your requirements and get back to you within 24 hours.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        details: ""
      });
      
      setOpen(false); // Close the modal on success
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again later.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" type="text" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" type="text" value={formData.company} onChange={e => handleInputChange("company", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service">Service Interest</Label>
            <Input id="service" type="text" value={formData.service} onChange={e => handleInputChange("service", e.target.value)} placeholder="e.g. Panel Fabrication" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">Project Details *</Label>
            <Textarea id="details" value={formData.details} onChange={e => handleInputChange("details", e.target.value)} required rows={5} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Quote Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
