import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Symteco Nigeria Limited
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Powering Nigeria's industrial future with expert electrical and mechanical solutions since our inception.
              </p>
            </div>
          </div>
        </section>

        {/* Company Objective, Mission, Vision, Address */}
        <section className="section-padding">
          <div className="container-padding max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Objective</h2>
              <p className="text-muted-foreground">
                The main objective of the company is to provide a broad based Engineering and related service that will be indigenously oriented to challenge the present foreign dominance of the construction engineering industry by giving a better or an equivalent service being supplied by the foreign firms. Professional integrity in a steady and progressive growth earnestly exploring all available potentials and resources for the advancement of engineering services is our primary concern.
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Mission Statement</h2>
              <p className="text-muted-foreground">
                "We are committed to the practical technology with a passion for excellence in practice. Our mission therefore is to maintain good will toward all customers/client through honesty and integrity propelled by self motivation and pragmatic disposition in all fields".
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                "In the wake of globalization that is sweeping across the world, we must develop and formulate strategies that will place us in a position that can win over not only our local competitors but those from the international arena"
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Corporate Address</h2>
              <div className="text-muted-foreground">
                Suite 11, LSDPC Phase 1 Shopping Complex, Oba Ogunji Road, Pen-Cinema, Agege, Lagos.<br />
                <strong>Telephone:</strong> 08058244486, 08087865823<br />
                <strong>E-mail:</strong> ibrotech144@gmail.com<br />
                <strong>Registration no:</strong> RC 1025558<br />
                <strong>Established date:</strong> 13th April, 2012
              </div>
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-6">
                  Symteco Nigeria Limited was established with a vision to become Nigeria's leading electrical and mechanical contracting company. We have built our reputation on delivering high-quality installations, innovative solutions, and exceptional customer service.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our team of certified engineers and technicians brings decades of combined experience to every project, ensuring that we meet the highest standards of safety, quality, and efficiency.
                </p>
                <p className="text-muted-foreground">
                  Today, we serve clients across Nigeria, from small residential projects to large-scale industrial installations, always maintaining our commitment to excellence and customer satisfaction.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-secondary rounded-xl h-96 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Professional Excellence</h3>
                    <p className="text-white/90">Certified • Licensed • Insured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-muted/30">
          <div className="container-padding">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide innovative, reliable, and cost-effective electrical and mechanical solutions that power Nigeria's growth while maintaining the highest standards of safety and quality.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the most trusted and preferred electrical and mechanical contracting company in Nigeria, known for our technical expertise, innovation, and unwavering commitment to customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding">
          <div className="container-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do and define who we are as a company.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: "Safety First",
                  description: "We prioritize the safety of our team, clients, and communities in every project we undertake."
                },
                {
                  title: "Quality Excellence",
                  description: "We deliver superior workmanship and use only the highest quality materials and equipment."
                },
                {
                  title: "Innovation",
                  description: "We embrace new technologies and methods to provide cutting-edge solutions for our clients."
                },
                {
                  title: "Integrity",
                  description: "We conduct business with honesty, transparency, and ethical practices in all our interactions."
                }
              ].map((value, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="section-padding bg-muted/30">
          <div className="container-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Certifications & Accreditations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our commitment to excellence is recognized by leading industry organizations.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "ISO 9001:2015 Quality Management",
                "COREN Professional Registration",
                "DPR Contractor License",
                "NSITF Safety Compliance",
                "IEEE Membership",
                "NEC Safety Standards"
              ].map((cert, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{cert}</h3>
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

export default About;