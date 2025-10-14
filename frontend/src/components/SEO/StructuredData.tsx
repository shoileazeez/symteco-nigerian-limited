import Head from 'next/head';

const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Symteco Nigerian Limited",
    "url": "https://symteco-nigerian-limited.vercel.app",
    "logo": "https://symteco-nigerian-limited.vercel.app/hero-industrial.jpg",
    "description": "Leading provider of industrial electrical installation, substation construction, transformer installation, and mechanical systems in Nigeria.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NG",
      "addressRegion": "Lagos State",
      "addressLocality": "Lagos"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    },
    "areaServed": "Nigeria",
    "serviceType": [
      "Industrial Electrical Installation",
      "Substation Construction",
      "Power Transformer Installation",
      "High Voltage Line Work",
      "Distribution System Upgrades",
      "Electrical Maintenance Services"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Symteco Nigerian Limited",
    "url": "https://symteco-nigerian-limited.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://symteco-nigerian-limited.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Industrial Electrical Services",
    "provider": {
      "@type": "Organization",
      "name": "Symteco Nigerian Limited"
    },
    "areaServed": "Nigeria",
    "serviceType": "Electrical Installation and Maintenance",
    "description": "Comprehensive electrical and mechanical solutions for industrial facilities including high voltage systems, power distribution, and maintenance services."
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />
    </Head>
  );
};

export default StructuredData;