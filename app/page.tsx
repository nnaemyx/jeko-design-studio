import ContactCtaSection from "./components/contact-cta-section";
import FeaturedWorksSection from "./components/featured-works-section";
import HeroSection from "./components/hero-section";
import PhilosophySection from "./components/philosophy-section";
import ServicesSection from "./components/services-section";
import SiteFooter from "./components/site-footer";
import TestimonialsSection from "./components/testimonials-section";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturedWorksSection />
        <PhilosophySection />
        <TestimonialsSection />
        <ContactCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
