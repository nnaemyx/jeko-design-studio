import { scrollRevealClassName } from "../lib/tailwind-classes";
import { ProjectCta } from "./ui/action-links";

const projectEmail = "/contact";

export default function ContactCtaSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-[110px] bg-paper px-5 py-[72px] text-center text-ink"
    >
      <div className={`${scrollRevealClassName} mx-auto flex max-w-[720px] flex-col items-center max-md:!animate-none`}>
        <p className="font-body text-[32px] leading-8 tracking-[-0.08em] text-ink-muted">
          Have a Business problem?
        </p>
        <h2
          id="contact-title"
          className="mt-3 font-display text-[clamp(36px,3.34vw,48px)] leading-none tracking-[-0.08em]"
        >
          Let’s build the right creative solution.
        </h2>
        <p className="mt-7 max-w-[720px] font-body text-lg leading-[1.45] tracking-[-0.04em] text-ink-muted md:text-xl">
          Tell us what you’re building, what isn’t working and where you want to
          go. We’ll start with the problem.
        </p>
        <div className="mt-10">
          <ProjectCta href={projectEmail} />
        </div>
      </div>
    </section>
  );
}
