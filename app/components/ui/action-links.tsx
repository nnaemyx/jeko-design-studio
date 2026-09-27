import Link from "next/link";
import type { ReactNode } from "react";

import ArrowRightDark from "../../assets/icons/arrow-right-dark.svg";
import ArrowRightLight from "../../assets/icons/arrow-right-light.svg";
import ArrowUpRight from "../../assets/icons/arrow-up-right.svg";

type ArrowTextLinkProps = {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

export function ArrowTextLink({
  href,
  children,
  tone = "dark",
  className = "",
}: ArrowTextLinkProps) {
  const Arrow = tone === "light" ? ArrowRightLight : ArrowRightDark;

  return (
    <Link
      href={href}
      className={`group inline-flex w-fit items-center gap-3 font-action text-xl tracking-[-0.04em] underline underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint ${tone === "light" ? "text-paper" : "text-ink"} ${className}`}
    >
      <span>{children}</span>
      <Arrow
        aria-hidden="true"
        className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

export function ProjectCta({
  href,
  children = "Start a Project",
}: {
  href: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-[62px] min-w-[196px] items-center justify-center gap-2.5 rounded-sm bg-amber px-5 font-action text-xl tracking-[-0.04em] text-paper transition-colors duration-300 hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
    >
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
