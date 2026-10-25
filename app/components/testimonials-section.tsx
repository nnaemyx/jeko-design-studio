"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import { testimonials } from "../data/landing-page";
import { scrollRevealClassName } from "../lib/tailwind-classes";
import ArrowRightDark from "../assets/icons/arrow-right-dark.svg";

const desktopQuery = "(min-width: 768px)";
const mobileQuery = "(max-width: 767px)";
const autoplayIntervalMs = 7000;

function subscribeToMobileViewport(callback: () => void) {
  const mediaQuery = window.matchMedia(mobileQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getMobileViewport() {
  return window.matchMedia(mobileQuery).matches;
}

function getServerMobileViewport() {
  return false;
}

function subscribeToViewport(callback: () => void) {
  const mediaQuery = window.matchMedia(desktopQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSlidesPerView() {
  return window.matchMedia(desktopQuery).matches ? 2 : 1;
}

function getServerSlidesPerView() {
  return 1;
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const swipeStartXRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isMobile = useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewport,
    getServerMobileViewport,
  );
  const slidesPerView = useSyncExternalStore(
    subscribeToViewport,
    getSlidesPerView,
    getServerSlidesPerView,
  );
  const finalIndex = Math.max(0, testimonials.length - slidesPerView);
  const mobileCarouselOffset = Math.max(0, testimonials.length - 2);
  const firstVisibleIndex = isMobile
    ? (activeIndex + mobileCarouselOffset) % testimonials.length
    : Math.min(activeIndex, finalIndex);
  const lastVisibleIndex = Math.min(
    testimonials.length,
    firstVisibleIndex + slidesPerView,
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 },
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
      testimonials.length < 2
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index >= finalIndex ? 0 : index + 1));
    }, autoplayIntervalMs);
    return () => window.clearTimeout(timeout);
  }, [
    activeIndex,
    finalIndex,
    isDocumentVisible,
    isInView,
    isPaused,
    prefersReducedMotion,
  ]);

  function moveByOneSlide(direction: -1 | 1) {
    setActiveIndex((index) => {
      if (isMobile) {
        return (index + direction + testimonials.length) % testimonials.length;
      }
      if (direction === 1) return index >= finalIndex ? 0 : index + 1;
      return index <= 0 ? finalIndex : index - 1;
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveByOneSlide(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveByOneSlide(1);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") {
      swipeStartXRef.current = event.clientX;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const startX = swipeStartXRef.current;
    swipeStartXRef.current = null;
    if (startX === null) return;

    const distance = startX - event.clientX;
    if (Math.abs(distance) > 48) {
      moveByOneSlide(distance > 0 ? 1 : -1);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-title"
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      className="scroll-mt-[110px] bg-paper pb-[64px] pt-12 text-ink md:pb-[87px] md:pt-[60px] max-md:!animate-none"
    >
      <div className={`${scrollRevealClassName} mx-auto mb-10 grid max-w-[1200px] gap-5 px-5 md:mb-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-8 xl:px-0 max-md:!animate-none max-md:mb-8 max-md:gap-3`}>
        <h2
          id="testimonials-title"
          className="font-display text-[clamp(42px,4.45vw,64px)] leading-none tracking-[-0.08em] max-md:text-[clamp(30px,8vw,36px)] max-md:leading-[1.06] max-md:tracking-[-0.065em]"
        >
          Our Clients Remarks
        </h2>
        <p className="font-body text-xl leading-[1.3] tracking-[-0.08em] text-ink-muted md:justify-self-end md:text-2xl">
          We work with people who take their business seriously.
        </p>
      </div>

      <div
        id="testimonial-track"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStartXRef.current = null;
        }}
        className={`${scrollRevealClassName} mx-5 overflow-hidden rounded-2xl bg-ink text-paper touch-pan-y focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint max-md:mx-5 max-md:rounded-xl max-md:!animate-none`}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none"
          style={{
            width: `${(testimonials.length * 100) / slidesPerView}%`,
            transform: `translate3d(-${(firstVisibleIndex * 100) / testimonials.length}%, 0, 0)`,
          }}
        >
          {testimonials.map(({ quote, author }, index) => (
            <article
              key={author}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${testimonials.length}`}
              className={`flex min-w-0 shrink-0 snap-start flex-col justify-between px-7 py-9 min-h-[390px] md:px-12 md:py-12 md:min-h-[513px] max-md:min-h-[390px] max-md:px-6 max-md:py-8 ${index % 2 === 1 ? "md:border-l md:border-paper/80" : ""}`}
              style={{ flexBasis: `${100 / testimonials.length}%` }}
            >
              <div>
                <span
                  aria-hidden="true"
                  className="block font-body text-[96px] font-medium leading-[0.96] tracking-[-0.04em] text-mint"
                >
                  “
                </span>
                <blockquote className="max-w-[594px] font-body text-lg leading-[1.37] tracking-[-0.04em] text-paper md:text-2xl">
                  {quote}
                </blockquote>
              </div>
              <div className="mt-12">
                <div className="mb-5 h-px w-full bg-paper/40" />
                <p className="text-right font-body text-2xl font-medium leading-[1.37] tracking-[-0.04em] text-paper/40 md:text-[32px]">
                  {author}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-5 mt-4 flex items-center justify-end gap-3 md:hidden" role="group" aria-label="Client remarks controls">
        <span className="mr-auto font-body text-sm text-ink-muted" aria-live="polite">
          {firstVisibleIndex + 1} / {finalIndex + 1}
        </span>
        <button
          type="button"
          aria-label="Previous client remark"
          onClick={() => moveByOneSlide(-1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-mint hover:bg-mint hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
        >
          <ArrowRightDark aria-hidden="true" className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next client remark"
          onClick={() => moveByOneSlide(1)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-mint hover:bg-mint hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
        >
          <ArrowRightDark aria-hidden="true" className="size-5" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing client remarks {firstVisibleIndex + 1} to {lastVisibleIndex} of {testimonials.length}
      </p>
    </section>
  );
}
