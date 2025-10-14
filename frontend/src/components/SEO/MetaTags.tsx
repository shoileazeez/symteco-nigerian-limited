import Head from 'next/head';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

const MetaTags = ({
  title = "Symteco Nigerian Limited - Industrial Electrical & Mechanical Solutions",
  description = "Leading provider of industrial electrical installation, substation construction, transformer installation, and mechanical systems in Nigeria. Specializing in high voltage systems, power distribution, and industrial maintenance services.",
  keywords = "electrical installation Nigeria, substation construction, transformer installation, high voltage systems, power distribution, industrial electrical, mechanical installation, electrical maintenance, HVAC installation, switchgear, control panels, Lagos electrical contractor, industrial automation",
  ogImage = "/hero-industrial.jpg",
  ogUrl = "https://symteco-nigerian-limited.vercel.app",
  canonical
}: MetaTagsProps) => {
  const fullTitle = title.includes('Symteco') ? title : `${title} | Symteco Nigerian Limited`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Symteco Nigerian Limited" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content="Symteco Nigerian Limited" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.svg" />

      {/* Additional SEO */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="NG" />
      <meta name="geo.placename" content="Lagos, Nigeria" />
    </Head>
  );
};

export default MetaTags;