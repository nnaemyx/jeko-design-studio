"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "../data/landing-page";
import ArrowRightDark from "../assets/icons/arrow-right-dark.svg";
import ArrowRightLight from "../assets/icons/arrow-right-light.svg";

const projectIntervalMs = 2000;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const mobilePresentationQuery = "(max-width: 767px)";

function subscribeToMobilePresentation(callback: () => void) {
  const mediaQuery = window.matchMedia(mobilePresentationQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getMobilePresentation() {
  return window.matchMedia(mobilePresentationQuery).matches;
}

function getServerMobilePresentation() {
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

export default function FeaturedWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(
    "Branding & Design",
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [sequenceStarted, setSequenceStarted] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [loadedProjectImages, setLoadedProjectImages] = useState<Set<string>>(
    () => new Set(),
  );
  const [failedProjectImages, setFailedProjectImages] = useState<Set<string>>(
    () => new Set(),
  );
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionPreference,
    getServerMotionPreference,
  );
  const isMobilePresentation = useSyncExternalStore(
    subscribeToMobilePresentation,
    getMobilePresentation,
    getServerMobilePresentation,
  );
  const visibleProjects = projects.filter(
    (project) => project.category === activeCategory,
  );
  const activeProject = visibleProjects[activeIndex];
  const activeProjectImageReady = activeProject
    ? loadedProjectImages.has(activeProject.image) ||
      failedProjectImages.has(activeProject.image)
    : false;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || visibleProjects.length === 0) return;

    if (isMobilePresentation || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.scrollIntoView({ behavior: "instant", block: "start" });
        section.focus({ preventScroll: true });
        setSequenceStarted(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [activeCategory, isMobilePresentation, prefersReducedMotion, visibleProjects.length]);

  useEffect(() => {
    if (
      isMobilePresentation ||
      !sequenceStarted ||
      sequenceComplete ||
      prefersReducedMotion ||
      !activeProjectImageReady
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      if (activeIndex >= visibleProjects.length - 1) {
        setSequenceComplete(true);
        return;
      }
      setActiveIndex((index) => index + 1);
    }, projectIntervalMs);

    return () => window.clearTimeout(timeout);
  }, [
    activeIndex,
    activeProjectImageReady,
    isMobilePresentation,
    prefersReducedMotion,
    sequenceComplete,
    sequenceStarted,
    visibleProjects.length,
  ]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobilePresentation) return;

    const preventScrollWhilePresenting = (event: WheelEvent | TouchEvent) => {
      if (!sequenceStarted || sequenceComplete) return;
      event.preventDefault();
    };
    const preventKeyboardScroll = (event: KeyboardEvent) => {
      if (!sequenceStarted || sequenceComplete) return;
      if (event.key === "Escape") {
        setSequenceComplete(true);
        setSequenceStarted(false);
        return;
      }
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(
          event.key,
        )
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScrollWhilePresenting, {
      passive: false,
    });
    document.addEventListener("touchmove", preventScrollWhilePresenting, {
      passive: false,
    });
    window.addEventListener("keydown", preventKeyboardScroll);
    return () => {
      window.removeEventListener("wheel", preventScrollWhilePresenting);
      document.removeEventListener("touchmove", preventScrollWhilePresenting);
      window.removeEventListener("keydown", preventKeyboardScroll);
    };
  }, [isMobilePresentation, sequenceComplete, sequenceStarted]);

  function selectCategory(category: ProjectCategory) {
    setActiveCategory(category);
    setActiveIndex(0);
    const matchingCount = projects.filter(
      (project) => project.category === category,
    ).length;
    setSequenceComplete(matchingCount === 0);
    setSequenceStarted(false);
  }

  function skipPresentation() {
    setSequenceComplete(true);
    setSequenceStarted(false);
  }

  function showPreviousProject() {
    setActiveIndex((index) => Math.max(0, index - 1));
  }

  function showNextProject() {
    if (activeIndex >= visibleProjects.length - 1) {
      skipPresentation();
      return;
    }
    setActiveIndex((index) => index + 1);
  }

  if (isMobilePresentation) {
    return (
      <section
        id="work"
        aria-labelledby="work-title"
        className="bg-paper px-5 pb-12 pt-10 text-ink"
      >
        <div className="mx-auto max-w-[1200px]">
          <p className="font-body text-base leading-5 tracking-[-0.04em] text-ink-muted">
            Featured Works
          </p>
          <h2
            id="work-title"
            className="mt-4 max-w-[370px] font-display text-[clamp(34px,9vw,44px)] leading-[1.04] tracking-[-0.07em]"
          >
            <span>Built for Impact, </span>
            <span className="text-ink-muted">Designed with purpose</span>
          </h2>

          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-7 flex flex-wrap items-center gap-x-1 gap-y-2"
          >
            {projectCategories.map((category) => {
              const selected = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectCategory(category)}
                  className={`min-h-11 rounded-sm px-3 font-body text-[13px] tracking-[-0.035em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${selected ? "bg-mint text-paper" : "text-ink hover:bg-mint/10"}`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <a
            href="#all-projects-mobile"
            className="group mt-4 inline-flex min-h-11 items-center gap-2 font-action text-base tracking-[-0.04em] underline underline-offset-4 transition-colors hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
          >
            <span>View all projects</span>
            <ArrowRightDark
              aria-hidden="true"
              className="size-6 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

          <div
            id="all-projects-mobile"
            aria-label="Featured case studies"
            className="mt-5 flex flex-col gap-4"
          >
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project, index) => (
                <article
                  key={project.title}
                  className="overflow-hidden rounded-xl bg-ink"
                >
                  <a
                    href={`mailto:cd.jeko.co@gmail.com?subject=${encodeURIComponent(`Request ${project.title} case study`)}`}
                    aria-label={`Ask JEKO about the ${project.title} case study`}
                    className="block focus-visible:outline-2 focus-visible:outline-offset-[-5px] focus-visible:outline-mint"
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={1200}
                      height={600}
                      sizes="(max-width: 767px) calc(100vw - 40px), 1200px"
                      priority={index === 0}
                      unoptimized={project.image.endsWith(".svg")}
                      className="aspect-[2/1] h-auto w-full object-cover"
                    />
                  </a>
                </article>
              ))
            ) : (
              <p className="py-6 font-body text-base leading-relaxed text-ink-muted">
                More work in this discipline is on its way.
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="work-title"
      tabIndex={-1}
      className="scroll-mt-[110px] bg-paper pb-12 pt-10 text-ink md:pb-16 md:pt-[39px]"
    >
      <div className="mx-auto flex min-h-[calc(100svh-170px)] max-w-[1200px] flex-col px-5 sm:px-6 lg:px-0 max-md:min-h-0">
        <div className="grid shrink-0 gap-8 lg:grid-cols-[464px_1fr] lg:gap-4">
          <div>
            <p className="font-body text-[32px] leading-8 tracking-[-0.08em] text-ink-muted">
              Featured Works
            </p>
            <h2
              id="work-title"
              className="mt-5 max-w-[464px] font-display text-[clamp(38px,3.34vw,48px)] leading-none tracking-[-0.08em]"
            >
              Built for Impact, Designed with purpose
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-1"
            >
              {projectCategories.map((category) => {
                const selected = category === activeCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectCategory(category)}
                    className={`min-h-[40px] rounded-sm px-4 font-body text-sm tracking-[-0.04em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint sm:min-h-[52px] sm:text-base ${selected ? "bg-mint text-paper" : "text-ink hover:bg-mint hover:text-paper"}`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <a
              href="#all-projects"
              className="group inline-flex items-center gap-2 font-action text-lg tracking-[-0.04em] underline underline-offset-4 transition-colors hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
            >
              <span>View all projects</span>
              <ArrowRightDark
                aria-hidden="true"
                className="size-6 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        <div
          id="all-projects"
          aria-live="polite"
          aria-label="Featured case studies"
          className="relative mt-8 flex min-h-0 flex-1 scroll-mt-[110px] flex-col justify-center md:mt-7"
        >
          {activeProject ? (
            <article
              key={activeProject.title}
              aria-label={`${activeIndex + 1} of ${visibleProjects.length}: ${activeProject.title}`}
              className="group relative h-[min(62vh,600px)] min-h-[360px] animate-[fade-up_400ms_ease-out_both] overflow-hidden rounded-2xl max-md:h-[min(50vh,460px)] max-md:min-h-[360px]"
            >
              <Image
                src={activeProject.image}
                alt={activeProject.imageAlt}
                width={1200}
                height={600}
                sizes="(max-width: 768px) calc(100vw - 40px), 1200px"
                priority={activeProject.title === "Kacxs Energy"}
                unoptimized={activeProject.image.endsWith(".svg")}
                onLoad={() => {
                  setLoadedProjectImages((loaded) =>
                    new Set(loaded).add(activeProject.image),
                  );
                }}
                onError={() => {
                  setFailedProjectImages((failed) =>
                    new Set(failed).add(activeProject.image),
                  );
                }}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              />
              {failedProjectImages.has(activeProject.image) && (
                <div
                  role="status"
                  className="absolute inset-0 flex items-center justify-center bg-deep-teal px-6 text-center text-paper"
                >
                  <span className="font-display text-4xl tracking-[-0.06em]">
                    {activeProject.title}
                  </span>
                </div>
              )}
              {activeProject.categoryLabel ? (
                <div className="absolute bottom-[6.7%] left-[3.3%] flex w-[min(36%,430px)] flex-col rounded-lg bg-deep-teal p-5 text-paper sm:p-8 max-md:bottom-[4%] max-md:left-[4%] max-md:w-[min(86%,400px)] max-md:p-4">
                  <span className="w-fit rounded-sm bg-mint px-4 py-2 font-body text-sm leading-5 tracking-[-0.03em] sm:text-base">
                    {activeProject.categoryLabel}
                  </span>
                  <h3 className="mt-5 font-display text-[clamp(28px,4vw,48px)] leading-none tracking-[-0.06em]">
                    {activeProject.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-[1.3] tracking-[-0.04em] sm:text-xl">
                    {activeProject.summary}
                  </p>
                  <a
                    href={`mailto:cd.jeko.co@gmail.com?subject=${encodeURIComponent(`Request ${activeProject.title} case study`)}`}
                    className="group/link mt-7 inline-flex w-fit items-center gap-3 font-action text-base underline underline-offset-4 transition-colors hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint sm:text-xl"
                  >
                    <span>See Case study</span>
                    <ArrowRightLight
                      aria-hidden="true"
                      className="size-5 transition-transform group-hover/link:translate-x-1"
                    />
                  </a>
                </div>
              ) : (
                <a
                  href={`mailto:cd.jeko.co@gmail.com?subject=${encodeURIComponent(`Request ${activeProject.title} case study`)}`}
                  aria-label={`Ask JEKO about the ${activeProject.title} case study`}
                  className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-mint"
                />
              )}
            </article>
          ) : (
            <p className="rounded-2xl border border-mint/40 px-6 py-12 text-center font-body text-lg text-ink-muted">
              More work in this discipline is on its way.
            </p>
          )}
        </div>

        {visibleProjects.length > 1 && (
          <div className="mt-4 flex shrink-0 items-center justify-end gap-3">
            <p className="mr-auto font-body text-sm text-ink-muted" aria-live="off">
              {sequenceComplete
                ? "Case studies"
                : `Project ${activeIndex + 1} of ${visibleProjects.length} · changes every 2 seconds`}
            </p>
            {!sequenceComplete && (
              <button
                type="button"
                onClick={skipPresentation}
                className="mr-2 rounded-sm px-3 py-2 font-body text-sm text-ink underline underline-offset-4 transition-colors hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              >
                Skip presentation
              </button>
            )}
            <button
              type="button"
              aria-label="Previous featured project"
              onClick={showPreviousProject}
              disabled={activeIndex === 0}
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-mint hover:bg-mint hover:text-paper disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              <ArrowRightDark aria-hidden="true" className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next featured project"
              onClick={showNextProject}
              disabled={sequenceComplete && activeIndex === visibleProjects.length - 1}
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-mint hover:bg-mint hover:text-paper disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              <ArrowRightDark aria-hidden="true" className="size-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
