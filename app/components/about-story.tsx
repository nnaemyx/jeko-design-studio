import Image from "next/image";

import { scrollRevealClassName } from "../lib/tailwind-classes";

export default function AboutStory() {
  return (
    <section
      aria-labelledby="about-story-title"
      className={`${scrollRevealClassName} mx-auto grid max-w-[1200px] gap-10 px-5 py-10 md:grid-cols-[minmax(0,0.77fr)_minmax(0,1fr)] md:gap-[49px] md:px-0 md:py-10`}
    >
      <div className="flex flex-col gap-5">
        <div>
          <p className="font-body text-[28px] leading-8 tracking-[-0.08em] text-ink-muted md:text-[32px]">
            Who we are
          </p>
          <h2
            id="about-story-title"
            className="mt-3 font-display text-[clamp(38px,3.34vw,48px)] leading-none tracking-[-0.08em]"
          >
            A creative agency, built around ideas that matter
          </h2>
        </div>
        <div className="space-y-3 font-body text-base leading-[1.37] tracking-[-0.02em] text-ink/80">
          <p>
            Jeko is a design agency founded in 2024, focused on helping
            businesses and organizations communicate their value through
            strategic design, branding, digital experiences and visual
            communication. We don’t believe design exists simply to make things
            look better; we believe it should make something clearer, stronger,
            more memorable and more useful.
          </p>
          <p>
            We pride ourselves on our ability to intertwine technology with
            creativity and strategy, creating designs that not only perform but
            also inspire. At Jeko, we’re about building lasting relationships
            and helping our clients experience real growth through our designs
            and strategy at their core. Join us in our mission to redefine
            creativity and make a lasting impact in your business or company.
          </p>
        </div>
      </div>
      <Image
        src="/images/about-studio-image.svg"
        alt="JEKO Design Studio workspace and brand mark, shown in the studio’s mint tint"
        width={651}
        height={455}
        sizes="(max-width: 767px) calc(100vw - 40px), 651px"
        className="h-auto w-full self-start rounded-lg"
      />
    </section>
  );
}
