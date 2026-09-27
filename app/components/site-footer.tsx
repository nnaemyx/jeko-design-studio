import Image from "next/image";
import Link from "next/link";

import LocationPin from "../assets/icons/location-pin.svg";
import { footerLinks } from "../data/landing-page";
import { scrollRevealClassName } from "../lib/tailwind-classes";

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href?: string }[];
}) {
  return (
    <div>
      <h2 className="whitespace-nowrap font-display text-base font-medium uppercase tracking-[0.01em] text-mint">
        {title}
      </h2>
      <ul className="mt-3 space-y-2 font-body text-sm text-paper">
        {links.map(({ label, href }) => (
          <li key={label}>
            {href ? (
              <Link
                href={href}
                className="transition-colors hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
              >
                {label}
              </Link>
            ) : (
              <span>{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className={`${scrollRevealClassName} mx-auto grid max-w-[1200px] gap-12 px-4 pb-12 pt-14 md:grid-cols-[minmax(0,1fr)_150px_220px] md:gap-10 md:px-0 md:pb-0 md:pt-[62px]`}>
        <div className="flex flex-col items-start">
          <Link href="/" aria-label="JEKO Design Studio home">
            <Image
              src="/images/jeko-footer-logo.svg"
              alt="JEKO"
              width={222}
              height={50}
              className="h-[50px] w-[222px]"
            />
          </Link>
          <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 font-body text-sm font-light leading-6 tracking-[-0.02em] text-paper">
            <span>Strategic design.</span>
            <span>Creative thinking.</span>
            <span>Digital Experiences</span>
          </p>
          <a
            href="mailto:cd.jeko.co@gmail.com"
            className="mt-5 font-body text-xl font-light leading-6 tracking-[-0.02em] transition-colors hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint md:text-2xl"
          >
            cd.jeko.co@gmail.com
          </a>
          <p className="mt-12 flex items-center gap-2 whitespace-nowrap font-body text-xl font-light leading-6 tracking-[-0.02em] text-paper md:mt-[110px] md:text-2xl">
            <LocationPin
              aria-hidden="true"
              className="h-[24px] w-[29px] shrink-0 text-mint"
            />
            Lagos, Nigeria
          </p>
        </div>

        <FooterLinkColumn title="Explore" links={footerLinks.explore} />
        <FooterLinkColumn title="Connect and Contact" links={footerLinks.connect} />
      </div>

      <div className="mt-0 border-t border-mint px-5 md:mt-6 md:px-0">
        <div className="mx-auto grid max-w-[1200px] gap-3 py-6 text-center md:min-h-[102px] md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-4 md:py-0 md:text-left xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <p className="font-body text-xs font-light tracking-[0.01em] text-paper">
            © 2026 Jeko Design Studio. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 font-body text-xs font-light tracking-[0.01em] text-paper">
            <span>Privacy</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-mint" />
            <span>Terms</span>
          </div>
          <p className="whitespace-nowrap font-display text-[clamp(10px,1.4vw,18px)] tracking-[0.01em] text-paper md:text-right">
            DESIGN WITH PURPOSE. BUILT FOR GROWTH
          </p>
        </div>
      </div>
    </footer>
  );
}
