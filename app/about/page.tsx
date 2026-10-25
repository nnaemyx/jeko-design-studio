import type { Metadata } from "next";

import AboutProjectSection from "../components/about-project-section";
import AboutStatement from "../components/about-statement";
import AboutStory from "../components/about-story";
import AboutTeamSection from "../components/about-team-section";
import AboutValuesCarousel from "../components/about-values-carousel";
import SiteFooter from "../components/site-footer";

export const metadata: Metadata = {
  title: "About JEKO Design Studio",
  description:
    "Meet JEKO Design Studio: a creative agency built around ideas that matter, strategic design, and meaningful growth.",
};

export default function AboutPage() {
  return (
    <>
      <main>
        <section
          aria-labelledby="about-page-title"
          className="relative isolate mx-5 mt-5 flex h-[377px] scroll-mt-[110px] items-center justify-center overflow-hidden rounded-2xl bg-ink bg-[url('/images/about-hero-grid.svg')] bg-center bg-cover bg-no-repeat text-paper max-md:mx-2 max-md:mt-2.5 max-md:h-[400px] max-md:rounded-xl max-md:pt-12"
        >
          <h1
            id="about-page-title"
            className="font-display text-[clamp(77.87px,6.67vw,96px)] leading-none tracking-[-0.08em]"
          >
            About Us
          </h1>
        </section>
        <AboutStory />
                <div className="h-7.5 w-full hidden lg:block bg-black"></div>

        <AboutStatement />
                <div className="h-7.5 w-full hidden lg:block bg-black"></div>

        <AboutTeamSection />
                <div className="h-7.5 w-full mb-[20px] hidden lg:block bg-black"></div>

        <AboutValuesCarousel />
                <div className="h-7.5 w-full hidden lg:block bg-black"></div>

        <AboutProjectSection />
      </main>
      <SiteFooter />
    </>
  );
}
