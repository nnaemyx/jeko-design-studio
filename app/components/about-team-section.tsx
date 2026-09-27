import { teamMembers } from "../data/about-page";
import { scrollRevealClassName } from "../lib/tailwind-classes";

export default function AboutTeamSection() {
  return (
    <section
      aria-labelledby="about-team-title"
      className={`${scrollRevealClassName} scroll-mt-[110px] bg-paper px-5 py-12 text-ink md:px-10 md:py-20`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between md:mb-16">
          <div className="max-w-[500px]">
            <p className="font-display text-[clamp(22px,2.23vw,32px)] leading-none tracking-[-0.08em] text-ink-muted">
              The people behind JEKO
            </p>
            <p className="mt-3 max-w-[470px] font-body text-base leading-[1.4] tracking-[-0.03em]">
              JEKO is being built by people who care about the work, the clients
              and the studio we are becoming.
            </p>
          </div>
          <h2
            id="about-team-title"
            className="shrink-0 whitespace-nowrap font-display text-[clamp(42px,4.45vw,64px)] leading-none tracking-[-0.08em] sm:text-right"
          >
            Our Team
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              aria-label={`${member.name}, ${member.role}`}
              className={`aspect-[400/490] overflow-hidden rounded-lg bg-[url('/images/about-team-cards.svg')] bg-[length:300%_200%] bg-no-repeat ${member.backgroundPositionClass}`}
              role="img"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
