import ArrowRightLight from "../assets/icons/arrow-right-light.svg";
import ArrowUpRight from "../assets/icons/arrow-up-right.svg";

export default function WorkHeroSection() {
  return (
    <section
      aria-label="Work and Services overview"
      className="relative isolate mx-5 mt-5 flex min-h-[580px] scroll-mt-[110px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-ink bg-[url('/images/hero-grid-background.svg')] bg-[position:center_12px] bg-[length:100%_auto] bg-no-repeat px-5 py-28 text-center text-paper max-md:mx-2 max-md:mt-2.5 max-md:min-h-[520px] max-md:rounded-xl max-md:bg-[length:auto_100%] max-md:pb-16 max-md:pt-28 md:min-h-[660px] md:py-36"
    >
      <div className="mx-auto flex max-w-[1040px] flex-col items-center">
        <h1 className="font-display text-[clamp(34px,5.5vw,78px)] font-normal leading-[1.08] tracking-[-0.06em] text-paper">
          <span>We create work designed </span>
          <span className="text-paper/60">to</span>
          <br className="hidden sm:inline" />
          <span> move </span>
          <span className="font-semibold text-paper">businesses</span>
          <span> forward</span>
        </h1>

        <p className="mt-6 max-w-[700px] font-body text-base leading-relaxed tracking-[-0.02em] text-paper/75 md:text-lg">
          From brand identity and digital experiences to product design and
          visual communication, we combine strategy, creativity and craft to
          solve real business problems.
        </p>

        <div className="mt-8 flex w-full max-w-[380px] flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row sm:gap-8 md:mt-10">
          <a
            href="#selected-work"
            className="group inline-flex min-h-[44px] items-center gap-2 font-action text-base tracking-[-0.04em] text-paper underline underline-offset-4 transition-colors hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint md:text-lg"
          >
            <span>Explore our results</span>
            <ArrowRightLight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

          <a
            href="/contact"
            className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-sm bg-mint px-7 font-action text-base tracking-[-0.04em] text-paper shadow-sm transition-colors duration-300 hover:bg-mint/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint sm:w-auto md:min-h-[54px] md:text-lg"
          >
            <span>Start a Project</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

