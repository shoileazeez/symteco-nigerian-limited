import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get in touch with our team of experts. We're here to help with your electrical and mechanical project needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />

        {/* Additional Contact Info */}
        <section className="section-padding bg-muted/30">
          <div className="container-padding">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">📍</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Visit Our Office</h3>
                <p className="text-muted-foreground mb-4">
                  Suite 11, LSDPC Phase 1 Shopping Complex,<br />
                  Oba Ogunji Road, Pen-Cinema, Agege,<br />
                  Lagos, Nigeria
                </p>
                <div>
                  <form
                    className="mt-4 flex flex-col items-center"
                    onSubmit={e => {
                      e.preventDefault();
                      const address = (e.target as any).userAddress.value;
                      if (address) {
                        window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(address)}&destination=Suite+11,+LSDPC+Phase+1+Shopping+Complex,+Oba+Ogunji+Road,+Pen-Cinema,+Agege,+Lagos`, '_blank');
                      }
                    }}
                  >
                    <input
                      type="text"
                      name="userAddress"
                      placeholder="Enter your address for directions"
                      className="border rounded px-3 py-2 w-full max-w-xs mb-2"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-secondary text-secondary-foreground px-4 py-2 rounded font-semibold hover:bg-secondary/90"
                    >
                      Get Directions from My Location
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">⏰</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Business Hours</h3>
                <div className="text-muted-foreground space-y-2">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Emergency calls only</p>
                  <p className="text-secondary font-semibold mt-4">24/7 Emergency Support</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Quick Contact</h3>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    <span className="font-medium">Main:</span><br />
                    08058244486, 08087865823
                  </p>
                  <p>
                    <span className="font-medium">Emergency:</span><br />
                    08058244486
                  </p>
                  <p>
                    <span className="font-medium">Email:</span><br />
                    ibrotech144@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Service Areas</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide electrical and mechanical services across Nigeria, with a strong presence in major cities and industrial zones.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { state: "Lagos State", areas: ["Lagos Island", "Victoria Island", "Ikeja", "Apapa"] },
                { state: "Abuja FCT", areas: ["Central Area", "Garki", "Wuse", "Maitama"] },
                { state: "Rivers State", areas: ["Port Harcourt", "Obio-Akpor", "Eleme", "Bonny"] },
                { state: "Kano State", areas: ["Kano City", "Nassarawa", "Fagge", "Gwale"] }
              ].map((location, index) => (
                <div key={index} className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-primary mb-4">{location.state}</h3>
                  <ul className="space-y-2">
                    {location.areas.map((area, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{area}</span>
                      </li>
                    ))}
                  </ul>
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

export default Contact;