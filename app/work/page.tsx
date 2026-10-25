import type { Metadata } from "next";

import SelectedWorkSection from "../components/selected-work-section";
import SiteFooter from "../components/site-footer";
import WorkCtaSection from "../components/work-cta-section";
import WorkHeroSection from "../components/work-hero-section";

export const metadata: Metadata = {
  title: "Work & Services - JEKO Design Studio",
  description:
    "We create work designed to move businesses forward. Explore our selected work across brand identity, digital experiences, product design, and visual communication.",
};

export default function WorkPage() {
  return (
    <>
      <main>
        <WorkHeroSection />
        <SelectedWorkSection />
                <div className="h-7.5 w-full hidden lg:block bg-black"></div>
                                <div className="h-3.25 w-full lg:hidden block bg-black"></div>


        <WorkCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}

