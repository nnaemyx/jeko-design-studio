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
          className="relative isolate mx-5 mt-5 flex h-[480px] scroll-mt-[110px] items-center justify-center overflow-hidden rounded-2xl bg-ink bg-[url('/images/about-hero-grid.svg')] bg-center bg-cover bg-no-repeat text-paper max-md:h-[420px]"
        >
          <h1
            id="about-page-title"
            className="font-display text-[clamp(56px,6.67vw,96px)] leading-none tracking-[-0.08em]"
          >
            About Us
          </h1>
        </section>
        <AboutStory />
        <AboutStatement />
        <AboutTeamSection />
        <AboutValuesCarousel />
        <AboutProjectSection />
      </main>
      <SiteFooter />
    </>
  );
}
