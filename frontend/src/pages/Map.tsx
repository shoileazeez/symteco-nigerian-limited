import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Map = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Find Us
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Visit our office in Lagos or explore our service areas across Nigeria.
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-96 md:h-[500px] w-full">
                <iframe
                  src="https://www.google.com/maps?q=Suite+11,+LSDPC+Phase+1+Shopping+Complex,+Oba+Ogunji+Road,+Pen-Cinema,+Agege,+Lagos&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Symteco Nigeria Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Location Details */}
        <section className="section-padding bg-muted/30">
          <div className="container-padding">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Lagos Office</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Address</h3>
                    <p className="text-muted-foreground">
                      Suite 11, LSDPC Phase 1 Shopping Complex<br />
                      Oba Ogunji Road, Pen-Cinema, Agege<br />
                      Lagos, Nigeria
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Contact Information</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p><span className="font-medium">Phone:</span> 08058244486, 08087865823</p>
                      <p><span className="font-medium">Email:</span> ibrotech144@gmail.com</p>
                      <p><span className="font-medium">Emergency:</span> 08058244486</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Business Hours</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Emergency calls only</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-4">Getting Here</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">By Car</h4>
                      <p>Take the Lagos-Abeokuta Expressway to Ikeja. Turn into the Industrial Estate and follow the signs to Industrial Avenue.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Public Transport</h4>
                      <p>Take BRT to Ikeja Bus Stop, then a taxi or okada to Ikeja Industrial Estate.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Landmarks</h4>
                      <p>Near Lagos State Polytechnic and close to Murtala Muhammed Airport.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-xl text-white">
                  <h3 className="text-xl font-bold mb-4">Need Directions?</h3>
                  <p className="text-white/90 mb-4">
                    Call us and we'll help guide you to our office. We're always happy to help our clients find us.
                  </p>
                  <button className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                    Call for Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Coverage Map */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Service Coverage Areas</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide electrical and mechanical services across Nigeria's major cities and industrial zones.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  city: "Lagos",
                  description: "Main office and primary service area",
                  coverage: "100% Coverage",
                  projects: "300+ Projects"
                },
                {
                  city: "Abuja",
                  description: "Federal Capital Territory operations",
                  coverage: "Full Coverage", 
                  projects: "150+ Projects"
                },
                {
                  city: "Port Harcourt",
                  description: "Oil & gas industry specialist",
                  coverage: "Industrial Focus",
                  projects: "100+ Projects"
                },
                {
                  city: "Kano",
                  description: "Northern Nigeria operations",
                  coverage: "Regional Coverage",
                  projects: "75+ Projects"
                }
              ].map((area, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary">
                  <h3 className="text-xl font-bold text-primary mb-2">{area.city}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Coverage:</span>
                      <span className="text-sm text-secondary font-semibold">{area.coverage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">Completed:</span>
                      <span className="text-sm text-secondary font-semibold">{area.projects}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Map;