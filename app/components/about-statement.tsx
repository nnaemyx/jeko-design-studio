"use client";

import { useEffect, useState } from "react";

import { scrollRevealClassName } from "../lib/tailwind-classes";
import TypewriterReveal from "./ui/typewriter-reveal";

const statementWords = ["Matter", "Clear", "Work"] as const;
type StatementWord = (typeof statementWords)[number];
const wordIntervalMs = 2000;

export default function AboutStatement() {
  const [activeWord, setActiveWord] = useState<StatementWord>("Matter");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

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
    if (prefersReducedMotion || !isDocumentVisible) return;

    const interval = window.setInterval(() => {
      setActiveWord((currentWord) => {
        const currentIndex = statementWords.indexOf(currentWord);
        return statementWords[(currentIndex + 1) % statementWords.length];
      });
    }, wordIntervalMs);

    return () => window.clearInterval(interval);
  }, [isDocumentVisible, prefersReducedMotion]);

  return (
    <section
      aria-labelledby="about-statement-title"
      className={`${scrollRevealClassName} scroll-mt-[110px] bg-paper px-5 py-12 text-ink md:px-10 md:py-20`}
    >
      <div className="mx-auto max-w-[945px] overflow-hidden border-y border-ink py-7 md:py-8">
        <h2
          id="about-statement-title"
          className="whitespace-nowrap text-center font-display text-[clamp(28px,6.67vw,96px)] font-semibold leading-none tracking-[-0.08em]"
        >
          <span className="text-ink-muted">We make it </span>
          <span className="inline-block min-w-[6ch] text-left">
            <span
              key={activeWord}
              className={`inline-block animate-[fade-up_250ms_ease-out_both] ${prefersReducedMotion ? "motion-reduce:animate-none" : ""}`}
            >
              {activeWord}
            </span>
          </span>
        </h2>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col items-center justify-center rounded-2xl bg-ink px-6 py-16 text-center text-paper md:mt-20 md:min-h-[386px] md:px-12 md:py-14">
        <p className="font-body text-[clamp(19px,2.23vw,32px)] leading-tight tracking-[-0.08em]">
          <span className="text-paper/60">Our Philosophy - </span>
          Design is not decoration
        </p>
        <h3 className="mt-5 font-display text-[clamp(28px,3.34vw,48px)] leading-none tracking-[-0.08em]">
          It is Communication with Purpose
        </h3>
        <TypewriterReveal
          className="mt-10 max-w-[520px] font-body text-base font-light leading-[1.37] tracking-[-0.02em] md:text-xl"
          intervalMs={25}
          segments={[
            {
              text: "Every piece of work we create should solve a problem, strengthen a brand or inspire meaningful action. We judge our success not only by how the work looks, but by the value it creates for the people and businesses we work with.",
            },
          ]}
        />
      </div>
    </section>
  );
}
