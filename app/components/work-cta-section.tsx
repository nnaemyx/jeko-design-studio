import Link from "next/link";

import ArrowRightLight from "../assets/icons/arrow-right-light.svg";
import ArrowUpRight from "../assets/icons/arrow-up-right.svg";

export default function WorkCtaSection() {
  return (
    <section
      aria-labelledby="work-cta-title"
      className="bg-paper px-6 py-16 text-ink sm:px-8 md:py-28"
    >
      <div className="mx-auto flex max-w-[760px] flex-col items-start text-left md:items-center md:text-center">
        {/* Subtitle */}
        <p className="font-body text-[clamp(20px,5vw,26px)] leading-tight tracking-[-0.04em] text-ink/60 md:text-[32px]">
          Have a Business problem?
        </p>

        {/* Heading */}
        <h2
          id="work-cta-title"
          className="mt-3 font-display text-[clamp(36px,9.5vw,56px)] leading-[1.06] tracking-[-0.06em]"
        >
          <span className="block text-ink/60 md:inline">
            Let’s build the right{" "}
          </span>
          <span className="block font-semibold text-ink md:inline">
            creative solution.
          </span>
        </h2>

        {/* Description */}
        <p className="mt-5 max-w-[620px] font-body text-base leading-relaxed tracking-[-0.02em] text-ink-muted md:text-xl">
          Tell us what you’re building, what isn’t working and where you want to
          go. We’ll start with the problem.
        </p>

        {/* Action Buttons: Full width stacked on mobile matching Figma design */}
        <div className="mt-8 flex w-full flex-col gap-3.5 sm:max-w-[420px] md:max-w-none md:flex-row md:justify-center md:gap-6">
          <Link
            href="/contact"
            className="group inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-lg bg-ink px-7 font-action text-base tracking-[-0.03em] text-paper shadow-sm transition-colors duration-300 hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint md:w-auto md:text-lg"
          >
            <span>book a free call</span>
            <ArrowRightLight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/contact"
            className="group inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-lg bg-mint px-7 font-action text-base tracking-[-0.03em] text-paper shadow-sm transition-colors duration-300 hover:bg-mint/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint md:w-auto md:text-lg"
          >
            <span>Start a Project</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
