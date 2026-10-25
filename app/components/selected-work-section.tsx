"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import ArrowRightDark from "../assets/icons/arrow-right-dark.svg";
import ArrowRightLight from "../assets/icons/arrow-right-light.svg";
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "../data/landing-page";

const mobileStepDurationMs = 3500;
const mobileQuery = "(max-width: 767px)";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMobile(callback: () => void) {
  const mediaQuery = window.matchMedia(mobileQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getIsMobile() {
  return window.matchMedia(mobileQuery).matches;
}

function getServerIsMobile() {
  return false;
}

function subscribeToMotionPreference(callback: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerMotionPreference() {
  return false;
}

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("Branding & Design");

  // Mobile animation state: two at a go
  const [mobileStep, setMobileStep] = useState(0);
  const [mobileAnimStarted, setMobileAnimStarted] = useState(false);
  const [mobileAnimComplete, setMobileAnimComplete] = useState(false);

  const isMobile = useSyncExternalStore(
    subscribeToMobile,
    getIsMobile,
    getServerIsMobile,
  );
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionPreference,
    getServerMotionPreference,
  );

  const animationProjects = projects.filter((p) => p.featuredInAnimation);

  // Group into pairs for mobile: "two at a go"
  const mobilePairs: (typeof projects)[] = [];
  for (let i = 0; i < animationProjects.length; i += 2) {
    mobilePairs.push(animationProjects.slice(i, i + 2));
  }
  const currentMobilePair = mobilePairs[mobileStep] || [];

  const visibleGridProjects = projects.filter(
    (project) =>
      project.category === activeCategory ||
      project.additionalCategories?.includes(activeCategory),
  );

  // Trigger mobile pause & animation when scrolled into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isMobile || prefersReducedMotion || mobileAnimComplete) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileAnimStarted(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isMobile, mobileAnimComplete, prefersReducedMotion]);

  // Advance automatically through pairs on mobile
  useEffect(() => {
    if (
      !isMobile ||
      !mobileAnimStarted ||
      mobileAnimComplete ||
      prefersReducedMotion
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (mobileStep >= mobilePairs.length - 1) {
        setMobileAnimComplete(true);
        return;
      }
      setMobileStep((step) => step + 1);
    }, mobileStepDurationMs);

    return () => window.clearTimeout(timer);
  }, [
    isMobile,
    mobileAnimComplete,
    mobileAnimStarted,
    mobilePairs.length,
    mobileStep,
    prefersReducedMotion,
  ]);

  // Lock mobile touch scrolling while mobile animation is active
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isMobile || !mobileAnimStarted || mobileAnimComplete) return;

    const lockTouch = (e: TouchEvent | WheelEvent) => {
      if (!mobileAnimStarted || mobileAnimComplete) return;
      e.preventDefault();
    };

    window.addEventListener("touchmove", lockTouch, { passive: false });
    window.addEventListener("wheel", lockTouch, { passive: false });
    return () => {
      window.removeEventListener("touchmove", lockTouch);
      window.removeEventListener("wheel", lockTouch);
    };
  }, [isMobile, mobileAnimComplete, mobileAnimStarted]);

  function skipMobileAnimation() {
    setMobileAnimComplete(true);
  }

  function handleSelectCategory(cat: ProjectCategory) {
    setActiveCategory(cat);
    setMobileAnimComplete(true);
  }

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      aria-labelledby="selected-work-title"
      className="scroll-mt-[90px] bg-paper px-5 py-14 text-ink sm:px-8 md:py-24 lg:px-12 xl:px-0"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Header row: title + category filters */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2
            id="selected-work-title"
            className="font-display text-[clamp(32px,4.5vw,56px)] leading-none tracking-[-0.06em] text-ink"
          >
            Selected work
          </h2>

          <div
            role="group"
            aria-label="Filter selected work by category"
            className="-mx-5 flex flex-nowrap items-center gap-2 overflow-x-auto px-5 pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:flex-wrap"
          >
            {projectCategories.map((category) => {
              const selected = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handleSelectCategory(category)}
                  className={`min-h-11 shrink-0 whitespace-nowrap rounded-sm px-4 font-body text-sm tracking-[-0.035em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${
                    selected
                      ? "bg-mint font-medium text-paper"
                      : "text-ink hover:bg-mint/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Mobile paused presentation: two at a go ── */}
        {isMobile && mobileAnimStarted && !mobileAnimComplete ? (
          <div className="mt-5 flex flex-col gap-3.5">
            <div className="flex items-center justify-between rounded-lg bg-mint/10 px-3.5 py-2 text-xs text-ink">
              <span className="font-medium text-mint">
                Featured works ({mobileStep + 1} of {mobilePairs.length})
              </span>
              <button
                type="button"
                onClick={skipMobileAnimation}
                className="font-action text-xs underline underline-offset-2 hover:text-mint"
              >
                View all works ↓
              </button>
            </div>

            <div className="flex flex-col gap-3.5 animate-[fade-up_350ms_ease-out_both]">
              {currentMobilePair.map((project) => (
                <article
                  key={project.title}
                  className="group relative aspect-[1.58/1] w-full overflow-hidden rounded-xl bg-ink shadow-md"
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 600px"
                    priority
                    className="object-cover"
                  />

                  {/* Dark teal overlay - it is there, does not animate from down */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-lg bg-deep-teal p-3.5 text-paper">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-semibold leading-tight tracking-[-0.04em] text-paper">
                        {project.title}
                      </h3>
                      <p className="mt-0.5 line-clamp-1 font-body text-xs leading-snug tracking-[-0.02em] text-paper/85">
                        {project.summary}
                      </p>
                    </div>

                    <a
                      href={`mailto:cd.jeko.co@gmail.com?subject=${encodeURIComponent(
                        `Request ${project.title} case study`,
                      )}`}
                      className="group/link inline-flex shrink-0 items-center gap-1 font-action text-xs underline underline-offset-4 text-paper"
                    >
                      <span>See Case study</span>
                      <ArrowRightLight aria-hidden="true" className="size-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              {mobilePairs.map((_, i) => (
                <span
                  key={i}
                  className={`size-2 rounded-full transition-colors ${
                    i === mobileStep ? "bg-mint" : "bg-ink/20"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ── 2-Column Grid (Desktop & Complete Mobile) — Exactly Image 4 ── */
          <div className="mt-8 md:mt-12">
            {visibleGridProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
                {visibleGridProjects.map((project, index) => (
                  <article
                    key={project.title}
                    className="group relative aspect-[1.48/1] w-full overflow-hidden rounded-2xl bg-ink shadow-sm transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Clean Background Image */}
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1240px) 50vw, 600px"
                      priority={index < 2}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/*
                      Dark Teal Overlay Card — ALWAYS there, not animated from down.
                      Matches Figma Image 4.
                    */}
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-deep-teal p-4 text-paper sm:inset-x-4 sm:bottom-4 sm:p-5 md:inset-x-5 md:bottom-5 md:p-6">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.04em] text-paper sm:text-2xl md:text-[28px]">
                          {project.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 font-body text-xs leading-snug tracking-[-0.02em] text-paper/85 sm:text-sm md:text-base">
                          {project.summary}
                        </p>
                      </div>

                      <a
                        href={`mailto:cd.jeko.co@gmail.com?subject=${encodeURIComponent(
                          `Request ${project.title} case study`,
                        )}`}
                        className="group/link inline-flex shrink-0 items-center gap-1.5 font-action text-xs underline underline-offset-4 text-paper transition-colors hover:text-mint sm:gap-2 sm:text-sm md:text-base"
                      >
                        <span className="whitespace-nowrap">See Case study</span>
                        <ArrowRightLight
                          aria-hidden="true"
                          className="size-4 shrink-0 transition-transform duration-300 group-hover/link:translate-x-1 sm:size-5"
                        />
                      </a>
                    </div>

                    {/* Accessible Full-Card Link */}
                    <a
                      href={`mailto:cd.jeko.co@gmail.com?subject=${encodeURIComponent(
                        `Request ${project.title} case study`,
                      )}`}
                      aria-label={`Ask JEKO about the ${project.title} case study`}
                      className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-mint"
                    />
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-mint/30 px-6 py-16 text-center">
                <p className="font-body text-lg text-ink-muted">
                  More work in this discipline is on its way.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
