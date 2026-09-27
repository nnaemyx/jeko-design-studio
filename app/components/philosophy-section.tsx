import { scrollRevealClassName } from "../lib/tailwind-classes";
import { ArrowTextLink } from "./ui/action-links";
import TypewriterReveal from "./ui/typewriter-reveal";

export default function PhilosophySection() {
  return (
    <section
      id="approach"
      aria-label="Our philosophy"
      className={`${scrollRevealClassName} relative mx-5 my-5 min-h-[652px] scroll-mt-[110px] overflow-hidden rounded-2xl bg-ink text-paper max-md:min-h-[540px]`}
    >
      <p className="absolute left-[7.1%] top-[7.8%] max-w-[78%] font-display text-[clamp(32px,4.45vw,64px)] leading-none tracking-[-0.08em] max-md:left-[7%] max-md:right-[7%] max-md:top-[8%] max-md:max-w-none">
        <TypewriterReveal
          intervalMs={25}
          segments={[
            { text: "Every piece of work we create " },
            {
              text: "should solve a problem, strengthen a brand, or inspire meaningful action",
              className: "text-paper/60",
            },
          ]}
        />
      </p>
      <p className="absolute left-[29%] top-[47.1%] max-w-[64%] font-display text-[clamp(32px,4.45vw,64px)] leading-none tracking-[-0.08em] max-md:left-[7%] max-md:right-[7%] max-md:top-[44%] max-md:max-w-none">
        <TypewriterReveal
          intervalMs={25}
          segments={[
            { text: "We start with strategy, " },
            {
              text: "craft with intention, and deliver design that makes a difference",
              className: "text-paper/60",
            },
          ]}
        />
      </p>
      <ArrowTextLink
        href="#testimonials"
        tone="light"
        className="absolute bottom-[7.8%] right-[7.8%] min-h-[62px] max-md:bottom-[7%] max-md:right-[7%]"
      >
        Our Philosophy
      </ArrowTextLink>
    </section>
  );
}
