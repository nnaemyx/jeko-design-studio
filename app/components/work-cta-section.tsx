import Link from "next/link";

import ArrowRightLight from "../assets/icons/arrow-right-light.svg";
import ArrowUpRight from "../assets/icons/arrow-up-right.svg";

export default function WorkCtaSection() {
  return (
    <section
      aria-labelledby="work-cta-title"
      className="bg-paper px-5 py-20 text-center text-ink md:py-28"
    >
      <div className="mx-auto flex max-w-[760px] flex-col items-center">
        <p className="font-body text-2xl leading-tight tracking-[-0.04em] text-ink-muted md:text-[32px]">
          Have a Business problem?
        </p>

        <h2
          id="work-cta-title"
          className="mt-3 font-display text-[clamp(32px,4.5vw,56px)] leading-tight tracking-[-0.06em] text-ink"
        >
          <span>Let’s build the right </span>
          <span className="font-semibold">creative solution.</span>
        </h2>

        <p className="mt-5 max-w-[620px] font-body text-base leading-relaxed tracking-[-0.02em] text-ink-muted md:text-xl">
          Tell us what you’re building, what isn’t working and where you want to
          go. We’ll start with the problem.
        </p>

        <div className="mt-8 flex w-full max-w-[420px] flex-col items-center justify-center gap-3.5 sm:max-w-none sm:flex-row sm:gap-6">
          <Link
            href="/contact"
            className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-sm bg-ink px-7 font-action text-base tracking-[-0.04em] text-paper shadow-sm transition-colors duration-300 hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint sm:w-auto md:min-h-[56px] md:text-lg"
          >
            <span>book a free call</span>
            <ArrowRightLight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/contact"
            className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-sm bg-mint px-7 font-action text-base tracking-[-0.04em] text-paper shadow-sm transition-colors duration-300 hover:bg-mint/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint sm:w-auto md:min-h-[56px] md:text-lg"
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

