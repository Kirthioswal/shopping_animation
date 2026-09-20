import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import DeliveryJourney from '@/components/delivery/DeliveryJourney';
import IntegrationSection from '@/components/IntegrationSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';
import PackageScene from '@/components/three/PackageScene';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  // Initialize smooth scrolling and GSAP ScrollTrigger
  useSmoothScroll();

  return (
    <div className="relative bg-black">
      <Header />

      {/* Fixed 3D Canvas Overlay (Celebration Particles) */}
      <PackageScene />

      {/* Scrollable Content: Phone order -> Notification flight -> Seller computer */}
      <HeroSection />

      {/* Continuous Scroll-Driven Delivery Journey: Steps 1 to 7 */}
      <DeliveryJourney />

      {/* Existing sections (kept) */}
      <IntegrationSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
