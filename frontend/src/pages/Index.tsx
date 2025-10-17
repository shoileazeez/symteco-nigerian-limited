import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { 
  WhyChooseUsSection
} from "@/components/LazyComponents";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        
        <ErrorBoundary>
          <StatsSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<Loading text="Loading features..." />}>
            <WhyChooseUsSection />
          </Suspense>
        </ErrorBoundary>

      </main>
      <Footer />
    </div>
  );
};

export default Index;
