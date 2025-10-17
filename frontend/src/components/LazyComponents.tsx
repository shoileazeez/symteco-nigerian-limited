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

const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection'),
  {
    loading: () => <Loading text="Loading testimonials..." />,
    ssr: false // This can be client-side only
  }
);

const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection'),
  {
    loading: () => <Loading text="Loading contact form..." />,
    ssr: false
  }
);

export {
  ProjectsSection,
  ServicesSection,
  TestimonialsSection,
  ContactSection
};