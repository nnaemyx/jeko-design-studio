import Image from "next/image";
import Link from "next/link";

import ArrowUpRight from "../assets/icons/arrow-up-right.svg";

export default function ContactHeroSection() {
  return (
    <section
      aria-labelledby="contact-hero-title"
      className="contact-hero-grid relative isolate mx-5 mt-5 overflow-hidden rounded-2xl bg-paper px-5 text-ink md:px-0"
    >
      <div className="relative z-10 mx-auto grid min-h-[679px] max-w-[1200px] items-center gap-10 pt-[186px] pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(390px,465px)] lg:gap-[76px] max-md:min-h-0 max-md:pt-40 max-md:pb-11">
        <div className="max-w-[660px]">
          <h1
            id="contact-hero-title"
            className="font-display text-[clamp(58px,6.67vw,96px)] leading-[0.96] tracking-[-0.08em]"
          >
            Start with the problem.
          </h1>
          <p className="mt-7 max-w-[660px] font-body text-base leading-[1.37] tracking-[-0.02em] md:mt-8">
            Whether you’re building a new brand, improving your digital presence,
            launching a product, or working through a creative challenge you
            can’t quite name yet, tell us where you are, and where you want to
            go.
          </p>
          <Link
            href="#start-project"
            className="mt-12 inline-flex min-h-[62px] items-center gap-2.5 rounded-sm bg-mint px-5 font-action text-xl tracking-[-0.04em] text-paper transition-colors duration-300 hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
          >
            <span>Start a Project</span>
            <ArrowUpRight aria-hidden="true" className="size-6 shrink-0" />
          </Link>
        </div>

        <Image
          src="/images/contact-problem-card.svg"
          alt="Hands reviewing design sketches with the caption: Good projects start with good questions. This is where we ask ours."
          width={465}
          height={405}
          priority
          sizes="(max-width: 1023px) calc(100vw - 64px), 465px"
          className="h-auto w-full rounded-2xl"
        />
      </div>
    </section>
  );
}
