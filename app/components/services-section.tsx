"use client";

import Image from "next/image";
import { useState } from "react";

import { services } from "../data/landing-page";
import { scrollRevealClassName } from "../lib/tailwind-classes";
import ReadingLens from "./ui/reading-lens";
import { ArrowTextLink, ProjectCta } from "./ui/action-links";

const projectEmail = "/contact";

export default function ServicesSection() {
  const [activeServiceIndex, setActiveServiceIndex] = useState<number>(0);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-[110px] bg-paper text-ink"
    >
      <div className={`${scrollRevealClassName} mx-auto max-w-[1200px] px-5 pb-[62px] pt-20 sm:px-6 xl:px-0 max-md:!animate-none max-md:pb-20 max-md:pt-12`}>
        <ReadingLens className="mx-auto max-w-[1200px]">
          <h1
            id="services-title"
            className="mx-auto w-full max-w-[1088px] text-center font-display text-[clamp(40px,6.25vw,96px)] font-semibold leading-[0.96] tracking-[-0.08em] max-md:text-[clamp(25px,7vw,34px)] max-md:leading-[1.08] max-md:tracking-[-0.065em]"
          >
            <span className="text-ink-muted">JEKO is a strategic </span>
            <span>creative</span>
            <br className="hidden md:block" />
            <br className="md:hidden" />
            <span>partner </span>
            <span className="text-ink-muted">for businesses that</span>
            <br className="hidden md:block" />
            <br className="md:hidden" />
            <span className="text-ink-muted">want their brand to</span>
            <br className="hidden md:block" />
            <br className="md:hidden" />
            <span className="inline-flex bg-[#02040F33] items-center justify-center whitespace-nowrap">
              <Image
                src="/images/services-marker-left.svg"
                alt=""
                aria-hidden="true"
                width={26}
                height={106}
                className="h-[1.1em] w-[0.27em] shrink-0 max-md:w-[0.22em]"
              />
              <span className="relative inline-block font-medium text-ink after:absolute after:bottom-[-0.1em] after:left-0 after:right-[9px]">
                perform better.
              </span>
              <Image
                src="/images/services-marker-right.svg"
                alt=""
                aria-hidden="true"
                width={26}
                height={109}
                className="h-[1.1em] w-[0.27em] shrink-0 max-md:w-[0.22em]"
              />
            </span>
          </h1>
        </ReadingLens>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:mt-20 max-md:mt-12 max-md:flex-col max-md:gap-5">
          <ArrowTextLink href="#work">Explore our results</ArrowTextLink>
          <ProjectCta href={projectEmail} />
        </div>

        <div className="mt-24 grid gap-8 md:mt-[108px] md:grid-cols-[1.45fr_1fr] md:items-end md:gap-[87px] max-md:mt-16 max-md:gap-4">
          <div>
            <p className="font-body text-[32px] leading-8 tracking-[-0.08em] text-ink-muted max-md:text-2xl max-md:leading-tight">
              Our Services
            </p>
            <h2 className="mt-5 font-display text-[clamp(38px,3.34vw,48px)] leading-none tracking-[-0.08em] text-ink max-md:mt-3 max-md:text-[clamp(22px,5.8vw,26px)] max-md:leading-[1.08] max-md:tracking-[-0.065em]">
              Where Strategy becomes design
            </h2>
          </div>
          <p className="max-w-[477px] font-body text-xl leading-[1.3] tracking-[-0.04em] text-ink-muted max-md:text-lg max-md:leading-[1.4]">
            Transforming concepts into tangible success with expertise and
            dedication, every step of the way.
          </p>
        </div>

        {/*
          Services Grid Container:
          - Desktop: 3 columns x 2 rows with clear vertical & horizontal green dividing borders.
          - Mobile: Single column with persistent green horizontal dividing borders below each item,
            even when the card is hovered/active!
        */}
        <div className="relative mt-14 grid w-full grid-cols-1 md:mt-[65px] md:min-h-[524px] md:grid-cols-3 md:grid-rows-2 max-md:mt-8">
          {services.map(({ title, description, icon: Icon }, index) => {
            const isActive = activeServiceIndex === index;
            const columnIndex = index % 3;
            const isTopRow = index < 3;
            const isLastMobileItem = index === services.length - 1;

            // Desktop border lines:
            // Top row items have border-b (horizontal green line).
            // First two columns have border-r (vertical green lines).
            const desktopBorders = `${isTopRow ? "md:border-b md:border-mint/40" : ""} ${
              columnIndex < 2 ? "md:border-r md:border-mint/40" : ""
            }`;

            // Mobile border line: persistent green horizontal line on every item (except last)
            const mobileBorder = !isLastMobileItem
              ? "border-b border-mint/40 pb-5 mb-5 md:border-b-0 md:pb-0 md:mb-0"
              : "pb-2 mb-2 md:pb-0 md:mb-0";

            // Spacing to keep the green hover card 38px away from the borders:
            const cellMargin = isTopRow
              ? "md:mb-[38px] md:mt-2"
              : "md:mt-[38px] md:mb-2";

            const columnMargin = columnIndex === 0
              ? "md:mr-[38px] md:ml-0"
              : columnIndex === 1
                ? "md:mx-[19px]"
                : "md:ml-[38px] md:mr-0";

            return (
              <div
                key={title}
                className={`relative flex flex-col justify-center ${desktopBorders} ${mobileBorder}`}
              >
                <article
                  onMouseEnter={() => setActiveServiceIndex(index)}
                  onFocus={() => setActiveServiceIndex(index)}
                  onClick={() => setActiveServiceIndex(index)}
                  className={`flex flex-1 cursor-pointer flex-col rounded-2xl p-6 transition-all duration-300 sm:p-7 md:p-6 lg:p-7 ${cellMargin} ${columnMargin} ${
                    isActive
                      ? "bg-deep-teal text-paper shadow-md"
                      : "bg-transparent text-ink hover:bg-deep-teal/5"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`size-10 shrink-0 text-mint transition-transform duration-300 ${
                      isActive ? "scale-105" : ""
                    }`}
                  />
                  <div className="mt-6 max-w-[320px]">
                    <h3
                      className={`font-body text-[24px] font-medium leading-[1.18] tracking-[-0.04em] transition-colors duration-200 sm:text-[26px] ${
                        isActive ? "text-paper" : "text-ink"
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`mt-2.5 font-body text-sm leading-[1.4] tracking-[-0.02em] transition-colors duration-200 ${
                        isActive ? "text-paper/90" : "text-ink-muted"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
