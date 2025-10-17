import React from 'react';
import { Building2, Handshake, TrendingUp, Globe, Award, Users } from 'lucide-react';

const ClientsSection = () => {
  const clients = [
    { name: "Cummins West Africa", sector: "Power & Energy" },
    { name: "Niger Delta Power Holding (NDPHC)", sector: "Power Generation" },
    { name: "Lekki Concession Company", sector: "Infrastructure" },
    { name: "Lagos State Government", sector: "Government" },
    { name: "Nigerian National Petroleum Corporation (NNPC)", sector: "Oil & Gas" },
    { name: "Shell Petroleum Development Company", sector: "Oil & Gas" },
    { name: "Chevron Nigeria Limited", sector: "Oil & Gas" },
    { name: "Total Exploration & Production Nigeria", sector: "Oil & Gas" },
    { name: "Julius Berger Nigeria Plc", sector: "Construction" },
    { name: "Dangote Group", sector: "Manufacturing" },
    { name: "MTN Nigeria Communications Limited", sector: "Telecommunications" },
    { name: "Airtel Nigeria Limited", sector: "Telecommunications" },
    { name: "First Bank of Nigeria Limited", sector: "Banking" },
    { name: "Zenith Bank Plc", sector: "Banking" },
    { name: "United Bank for Africa (UBA)", sector: "Banking" },
    { name: "Nigerian Ports Authority (NPA)", sector: "Maritime" },
    { name: "Federal Ministry of Power", sector: "Government" },
    { name: "Nigerian Electricity Regulatory Commission (NERC)", sector: "Regulatory" },
    { name: "Transmission Company of Nigeria (TCN)", sector: "Power Transmission" },
    { name: "Abuja Electricity Distribution Company (AEDC)", sector: "Power Distribution" },
    { name: "Ikeja Electric Plc", sector: "Power Distribution" },
    { name: "Eko Electricity Distribution Company", sector: "Power Distribution" },
    { name: "Nigerian Railway Corporation", sector: "Transportation" },
    { name: "Federal Airports Authority of Nigeria (FAAN)", sector: "Aviation" }
  ];

  const partnerships = [
    {
      name: "Noja Power",
      country: "Australia",
      description: "Strategic partnership for advanced switching solutions and grid automation technologies",
      benefits: ["Technology Transfer", "Joint R&D", "Market Access"]
    },
    {
      name: "REPL (Roxtec Engineering Private Limited)",
      country: "United Kingdom",
      description: "Collaboration in cable sealing solutions and electrical safety systems",
      benefits: ["Innovation Exchange", "Technical Support", "Quality Assurance"]
    }
  ];

  const stats = [
    { label: "Active Clients", value: "24+", icon: Users },
    { label: "International Partners", value: "2", icon: Globe },
    { label: "Industry Sectors", value: "12+", icon: Building2 },
    { label: "Years of Trust", value: "15+", icon: Award }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Clients & <span className="text-blue-600">Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by leading organizations across Nigeria and backed by international partnerships 
            that drive innovation and excellence in electrical engineering solutions.
          </p>
        </div>

        {/* Trust Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Clients Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Valued Clients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 hover:border-blue-200"
              >
                <div className="flex items-start space-x-3">
                  <Building2 className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{client.name}</h4>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {client.sector}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* International Partnerships */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">International Partnerships</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partnerships.map((partner, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <Handshake className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{partner.name}</h4>
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-4 w-4 mr-1" />
                      {partner.country}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{partner.description}</p>
                <div className="space-y-2">
                  <h5 className="font-semibold text-gray-900 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                    Key Benefits
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {partner.benefits.map((benefit, benefitIndex) => (
                      <span 
                        key={benefitIndex}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Growing Network</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Experience the same level of excellence and reliability that our clients and partners trust. 
              Let's build the future of electrical infrastructure together.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;