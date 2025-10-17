import dynamic from 'next/dynamic';
import Loading from '@/components/ui/loading';
import { Suspense } from 'react';

// Lazy load heavy components
const ProjectsSection = dynamic(
  () => import('@/components/sections/ProjectsSection'),
  {
    loading: () => <Loading text="Loading projects..." />,
    ssr: true
  }
);

const ServicesSection = dynamic(
  () => import('@/components/sections/ServicesSection'),
  {
    loading: () => <Loading text="Loading services..." />,
    ssr: true
  }
);

const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection'),
  {
    loading: () => <Loading text="Loading contact form..." />,
    ssr: false
  }
);

const WhyChooseUsSection = dynamic(
  () => import('@/components/sections/WhyChooseUsSection'),
  {
    loading: () => <Loading text="Loading features..." />,
    ssr: false // This can be client-side only
  }
);

const ClientsSection = dynamic(
  () => import('@/components/sections/ClientsSection'),
  {
    loading: () => <Loading text="Loading clients..." />,
    ssr: true
  }
);

export {
  ProjectsSection,
  ServicesSection,
  WhyChooseUsSection,
  ContactSection,
  ClientsSection
};