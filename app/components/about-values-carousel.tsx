"use client";

import { useEffect, useState } from "react";

import { aboutSlides } from "../data/about-page";
import { scrollRevealClassName } from "../lib/tailwind-classes";

const slideIntervalMs = 2000;

export default function AboutValuesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activeSlide = aboutSlides[activeIndex];

  useEffect(() => {
    const section = document.getElementById("about-values-carousel");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (
      !isInView ||
      isPaused ||
      !isDocumentVisible ||
      prefersReducedMotion ||
      aboutSlides.length < 2
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % aboutSlides.length);
    }, slideIntervalMs);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, isDocumentVisible, isInView, isPaused, prefersReducedMotion]);

  return (
    <section
      id="about-values-carousel"
      aria-label="JEKO vision, mission, and clients"
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      className={`${scrollRevealClassName} relative mx-5 mb-5 min-h-[460px] overflow-hidden rounded-2xl bg-ink px-5 py-14 text-center text-paper md:mx-5 md:min-h-[496px] md:px-12 md:py-20`}
    >
      <div
        key={activeSlide.id}
        aria-live={isPaused ? "polite" : "off"}
        className="mx-auto flex min-h-[300px] max-w-[960px] flex-col items-center justify-center animate-[slide-in_450ms_ease-out_both] motion-reduce:animate-none"
      >
        <h2 className="font-body text-[28px] leading-8 tracking-[-0.08em] text-paper md:text-[32px]">
          {activeSlide.label}
        </h2>
        <p className="mt-7 max-w-[960px] font-display text-[clamp(32px,3.34vw,48px)] leading-none tracking-[-0.08em] text-paper">
          {activeSlide.statement}
        </p>
        {activeSlide.industries && (
          <ul className="mt-10 flex w-full flex-wrap items-center justify-center gap-3 md:mt-12 md:gap-5">
            {activeSlide.industries.map((industry) => (
              <li
                key={industry}
                className="rounded-sm border border-paper/50 px-4 py-2 font-body text-sm tracking-[-0.04em] text-paper/70 md:text-xl"
              >
                {industry}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 flex items-center justify-center gap-5" role="group" aria-label="Choose About section">
        {aboutSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.label}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint ${index === activeIndex ? "w-10 bg-paper" : "w-10 bg-paper/30 hover:bg-mint"}`}
          />
        ))}
      </div>
    </section>
  );
}
