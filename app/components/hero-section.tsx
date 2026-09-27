import Image from "next/image";

import TrendingUp from "../assets/icons/trending-up.svg";

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-label="JEKO Design Studio home"
      className="relative isolate mx-5 mt-5 h-[984px] min-h-[760px] scroll-mt-[110px] overflow-hidden rounded-2xl bg-ink bg-[url('/images/hero-grid-background.svg')] bg-[position:center_12px] bg-[length:100%_auto] bg-no-repeat text-paper max-md:h-[760px] max-md:min-h-[760px] max-md:bg-[length:auto_100%] max-[420px]:mx-2 max-[420px]:h-[720px] max-[420px]:min-h-[720px]"
    >
      <div className="absolute left-1/2 top-[26.5%] w-[70.3%] max-w-[984px] -translate-x-1/2 animate-[fade-up_800ms_ease-out_both] max-md:top-[29%] max-md:w-[84%] motion-reduce:animate-none">
        <Image
          src="/images/jeko-hero-logo.svg"
          alt="JEKO"
          width={984}
          height={222}
          priority
          className="h-auto w-full"
        />
      </div>

      <p className="absolute left-1/2 top-[57.2%] w-[min(70%,984px)] -translate-x-1/2 text-center text-2xl font-light leading-none tracking-[-0.04em] text-paper/80 max-md:top-[49%] max-md:w-[calc(100%-40px)] max-md:text-[clamp(15px,4.3vw,20px)]">
        Strategic design, purposeful impact.
      </p>

      <div className="absolute left-1/2 top-[71.5%] flex -translate-x-1/2 animate-gentle-float items-center gap-3 whitespace-nowrap max-md:top-[63%] max-md:w-[calc(100%-40px)] max-md:justify-center max-md:gap-[6px] max-md:whitespace-normal motion-reduce:animate-none">
        <p className="font-display text-[40px] font-normal leading-none tracking-[-0.08em] text-paper/50 max-md:text-[clamp(19px,5.3vw,28px)] max-md:text-center">
          74&nbsp; Businesses Impacted (and counting)
        </p>
        <TrendingUp aria-hidden="true" className="size-8 shrink-0 text-paper max-md:size-6" />
      </div>

      <div
        className="group/clients absolute inset-x-0 bottom-[29px] overflow-hidden max-md:bottom-[18px] max-md:left-1/2 max-md:w-[260%] max-md:-translate-x-1/2"
        role="img"
        aria-label="Client logos, including Olewa"
      >
        <div className="flex w-[200%] animate-client-logo-marquee group-hover/clients:[animation-play-state:paused] motion-reduce:animate-none" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="w-1/2 shrink-0 px-[1.5%]">
              <Image
                src="/images/client-logo-strip.png"
                alt=""
                width={3783}
                height={186}
                priority={copy === 0}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
