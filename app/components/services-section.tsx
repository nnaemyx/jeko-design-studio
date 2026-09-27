import Image from "next/image";

import { services } from "../data/landing-page";
import { scrollRevealClassName } from "../lib/tailwind-classes";
import ReadingLens from "./ui/reading-lens";
import { ArrowTextLink, ProjectCta } from "./ui/action-links";

const projectEmail = "/contact";

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-[110px] bg-paper text-ink"
    >
      <div className={`${scrollRevealClassName} mx-auto max-w-[1200px] px-5 pb-[62px] pt-20 md:px-0`}>
        <ReadingLens className="mx-auto max-w-[1200px]">
          <h1
            id="services-title"
            className="mx-auto max-w-[1088px] text-center font-display text-[clamp(42px,6.67vw,96px)] font-semibold leading-[0.96] tracking-[-0.08em]"
          >
            <span className="text-ink-muted">JEKO is a strategic </span>
            <span>creative</span>
            <br className="hidden md:block" />
            <span>partner </span>
            <span className="text-ink-muted">for businesses that</span>
            <br className="hidden md:block" />
            <span className="text-ink-muted">want their brand to</span>
            <br className="hidden md:block" />
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

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:mt-20">
          <ArrowTextLink href="#work">Explore our results</ArrowTextLink>
          <ProjectCta href={projectEmail} />
        </div>

        <div className="mt-24 grid gap-8 md:mt-[108px] md:grid-cols-[1.45fr_1fr] md:items-end md:gap-[87px]">
          <div>
            <p className="font-body text-[32px] leading-8 tracking-[-0.08em] text-ink-muted">
              Our Services
            </p>
            <h2 className="mt-5 font-display text-[clamp(38px,3.34vw,48px)] leading-none tracking-[-0.08em] text-ink">
              Where Strategy becomes design
            </h2>
          </div>
          <p className="max-w-[477px] font-body text-xl leading-[1.3] tracking-[-0.04em] text-ink-muted">
            Transforming concepts into tangible success with expertise and
            dedication, every step of the way.
          </p>
        </div>

        <div className="relative ml-[3px] mt-14 grid w-[calc(100%-3px)] grid-cols-1 md:mt-[65px] md:min-h-[524px] md:grid-cols-[0.98fr_1.01fr_0.98fr] md:grid-rows-[repeat(2,minmax(262px,1fr))]">
          <Image
            src="/images/services-grid.svg"
            alt=""
            aria-hidden="true"
            width={1197}
            height={524}
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          />
          {services.map(({ title, description, icon: Icon, featured }, index) => {
            const columnIndex = index % 3;
            const isBottomRow = index >= services.length - 3;
            const columnPadding = featured
              ? ""
              : columnIndex === 0
                ? "md:pl-[31px]"
                : columnIndex === 1
                  ? "md:pl-[47px]"
                  : "md:pl-[54px]";

            return (
              <article
                key={title}
                className={`relative z-[1] min-h-[230px] border-b border-mint/80 px-6 py-8 md:border-0 md:pb-1 md:pt-1 ${columnPadding} ${isBottomRow ? "md:pt-14" : ""} ${featured ? "min-h-[230px] rounded-lg bg-deep-teal px-6 py-7 md:mb-[31px] md:ml-[27px] md:mr-[34px] md:mt-0 md:self-start md:px-10 md:pb-7 md:pt-[26px]" : ""}`}
              >
                <Icon
                  aria-hidden="true"
                  className={`size-10 shrink-0 text-mint ${featured ? "md:size-[41px]" : ""}`}
                />
                <div className="mt-7 max-w-[320px]">
                  <h3
                    className={`font-body text-[28px] font-medium leading-[1.14] tracking-[-0.05em] ${featured ? "text-paper" : "text-ink"}`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`mt-3 font-body text-base leading-[1.3] tracking-[-0.04em] ${featured ? "text-paper" : "text-ink-muted"}`}
                  >
                    {description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
