"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigationLinks = [
  { label: "Home", href: "/", page: "home" },
  { label: "About us", href: "/about", page: "about" },
  { label: "Work & Services", href: "/#services", page: "work" },
  { label: "Contact", href: "/contact", page: "contact" },
] as const;

export default function SiteNavigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const currentPage = pathname.startsWith("/about")
    ? "about"
    : pathname.startsWith("/contact")
      ? "contact"
      : "home";
  const headerTone = isScrolled
    ? "text-ink"
    : currentPage === "home" || currentPage === "about"
      ? "text-paper"
      : "text-ink";
  const headerPosition = isScrolled
    ? "left-5 right-5 top-3 rounded-xl bg-paper/[94%] px-0 shadow-[0_12px_32px_rgb(2_4_15/10%)] backdrop-blur-[12px] max-md:left-2 max-md:right-2 max-md:top-2"
    : "inset-x-0 top-5 px-5 max-md:top-2 max-md:px-2";
  const innerLayout = isScrolled
    ? "h-[72px] max-md:h-[62px] max-md:grid-cols-[64px_minmax(0,1fr)_auto] max-md:grid-rows-[30px_28px] max-md:gap-y-0.5"
    : currentPage === "home"
      ? "h-[152px] max-md:h-[90px] max-md:grid-cols-[minmax(0,1fr)_auto] max-md:grid-rows-[40px_34px] max-md:gap-y-1"
      : "h-[152px] max-md:h-[90px] max-md:grid-cols-[64px_minmax(0,1fr)_auto] max-md:grid-rows-[40px_34px] max-md:gap-y-1";
  const logoSrc = !isScrolled && currentPage === "about"
    ? "/images/jeko-footer-logo.svg"
    : "/images/jeko-dark-logo.svg";
  const actionColor = currentPage === "home" && !isScrolled
    ? "bg-amber"
    : "bg-mint";
  const actionPlacement = isScrolled || currentPage === "home"
    ? "max-md:col-start-2"
    : "max-md:col-start-3";
  const mobileNavigationColumns = isScrolled
    ? "max-md:col-start-2 max-md:col-end-3"
    : currentPage === "home"
      ? "max-md:col-start-1 max-md:col-end-3"
      : "max-md:col-start-1 max-md:col-end-4";

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 72);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, [pathname]);

  return (
    <header
      className={`fixed z-[100] transition-[background-color,box-shadow] duration-300 ${headerPosition} ${headerTone}`}
      data-scrolled={isScrolled}
      data-page={currentPage}
    >
      <div
        className={`mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-[clamp(20px,8.33vw,120px)] transition-[height] duration-300 max-md:px-2 ${innerLayout}`}
      >
        {currentPage !== "home" || isScrolled ? (
          <Link
            href="/"
            aria-label="JEKO Design Studio home"
            className="col-start-1 row-start-1 justify-self-start"
          >
            <Image
              src={logoSrc}
              alt="JEKO"
              width={139}
              height={31}
              priority
              className="h-auto w-[clamp(84px,9.65vw,139px)] max-md:w-[60px]"
            />
          </Link>
        ) : null}

        <nav
          aria-label="Main navigation"
          className={`col-start-2 row-start-1 flex items-center justify-center gap-[34px] whitespace-nowrap max-md:row-start-2 max-md:gap-[clamp(5px,1.6vw,11px)] ${mobileNavigationColumns}`}
        >
          {navigationLinks.map(({ label, href, page }) => {
            const isCurrent = page === currentPage;
            return (
              <Link
                key={label}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className={`text-base font-light tracking-[-0.02em] transition-colors duration-200 hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint max-md:text-[clamp(8px,2.35vw,11px)] max-md:tracking-[-0.04em] ${isCurrent ? "underline underline-offset-4" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className={`col-start-3 row-start-1 inline-flex min-h-12 items-center justify-self-end rounded-sm px-5 py-0 font-action text-base tracking-[-0.04em] text-paper transition-colors duration-300 hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint max-md:min-h-[38px] max-md:px-2 max-md:text-[clamp(9px,2.5vw,12px)] ${actionColor} ${actionPlacement}`}
        >
          Book a call
        </Link>
      </div>
    </header>
  );
}
