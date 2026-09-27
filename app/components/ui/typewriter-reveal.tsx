"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

type TypewriterSegment = {
  text: string;
  className?: string;
};

type TypewriterRevealProps = {
  segments: TypewriterSegment[];
  className?: string;
  intervalMs?: number;
  staticOnMobile?: boolean;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const mobileQuery = "(max-width: 767px)";

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

function subscribeToMotionPreference(callback: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerMotionPreference() {
  return false;
}

export default function TypewriterReveal({
  segments,
  className = "",
  intervalMs = 28,
  staticOnMobile = false,
}: TypewriterRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  );
  const isMobile = useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewport,
    getServerMobileViewport,
  );
  const fullText = useMemo(
    () => segments.map((segment) => segment.text).join(""),
    [segments],
  );
  const visibleCount =
    prefersReducedMotion || (staticOnMobile && isMobile)
      ? fullText.length
      : visibleCharacters;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion || (staticOnMobile && isMobile)) return;

    if (typeof IntersectionObserver === "undefined") {
      const timeout = setTimeout(() => setHasStarted(true), 0);
      return () => window.clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasStarted(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [isMobile, prefersReducedMotion, staticOnMobile]);

  useEffect(() => {
    if (
      !hasStarted ||
      prefersReducedMotion ||
      visibleCount >= fullText.length
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setVisibleCharacters((current) => Math.min(current + 1, fullText.length));
    }, intervalMs);
    return () => window.clearTimeout(timeout);
  }, [
    fullText.length,
    hasStarted,
    intervalMs,
    prefersReducedMotion,
    visibleCount,
  ]);

  const renderSegments = (characterCount: number) =>
    segments.map((segment, index) => {
      const startOffset = segments
        .slice(0, index)
        .reduce((total, previousSegment) => total + previousSegment.text.length, 0);
      const segmentVisibleCharacters = Math.max(0, characterCount - startOffset);

      return (
        <span key={`${index}-${segment.text}`} className={segment.className}>
          {segment.text.slice(0, segmentVisibleCharacters)}
        </span>
      );
    });

  return (
    <span ref={containerRef} className={className}>
      <span className="sr-only">{fullText}</span>
      {staticOnMobile ? (
        <>
          <span aria-hidden="true" className="hidden whitespace-pre-wrap max-md:inline">
            {renderSegments(fullText.length)}
          </span>
          <span aria-hidden="true" className="whitespace-pre-wrap max-md:hidden">
            {renderSegments(visibleCount)}
            {!prefersReducedMotion && visibleCount < fullText.length && (
              <span className="ml-[0.08em] inline-block h-[0.86em] w-[0.08em] translate-y-[0.04em] animate-typewriter-caret bg-current" />
            )}
          </span>
        </>
      ) : (
        <span aria-hidden="true" className="whitespace-pre-wrap">
          {renderSegments(visibleCount)}
          {!prefersReducedMotion && visibleCount < fullText.length && (
            <span className="ml-[0.08em] inline-block h-[0.86em] w-[0.08em] translate-y-[0.04em] animate-typewriter-caret bg-current" />
          )}
        </span>
      )}
    </span>
  );
}
