import ContactForm from "./contact-form";
import { scrollRevealClassName } from "../lib/tailwind-classes";

export default function AboutProjectSection() {
  return (
    <section
      id="about-start-project"
      aria-labelledby="about-project-title"
      className={`${scrollRevealClassName} min-h-[480px] scroll-mt-[110px] bg-paper px-5 py-14 text-ink md:px-10 md:py-20`}
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,1fr)_407px] lg:items-start lg:gap-[70px]">
        <div>
          <p className="font-body text-[28px] leading-8 tracking-[-0.08em] text-ink-muted md:text-[32px]">
            Start a project
          </p>
          <h2
            id="about-project-title"
            className="mt-4 max-w-[560px] font-display text-[clamp(36px,3.34vw,48px)] leading-none tracking-[-0.08em]"
          >
            <span className="text-ink-muted">We believe </span>
            design and strategy is an investment, {" "}
            <span className="text-ink-muted">not an expense.</span>
          </h2>
          <p className="mt-5 max-w-[660px] font-body text-base leading-[1.4] text-ink-muted md:text-lg">
            If you’re looking for a creative partner who wants to understand your
            business, think with you and build with you, we’d like to hear from
            you.
          </p>
        </div>
        <ContactForm variant="light" includeName={false} includeNote={false} />
      </div>
    </section>
  );
}
