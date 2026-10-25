"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigationLinks = [
  { label: "Home", href: "/", page: "home" },
  { label: "About us", href: "/about", page: "about" },
  { label: "Work & Services", href: "/work", page: "work" },
  { label: "Contact", href: "/contact", page: "contact" },
] as const;

export default function SiteNavigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const currentPage = pathname.startsWith("/about")
    ? "about"
    : pathname.startsWith("/contact")
      ? "contact"
      : pathname.startsWith("/work") || pathname.startsWith("/services")
        ? "work"
        : "home";

  const isOnDarkHero =
    (currentPage === "home" || currentPage === "about" || currentPage === "work") &&
    !isScrolled;

  // Requirement 1: Logo should not be there before scroll on landing page, only after scroll
  const isLogoVisible = currentPage === "home" ? isScrolled : true;

  // Pre-scroll: aligns with the hero card's mx-2 mt-2.5 on mobile so it nests cleanly inside the dark card.
  // On scroll: full width, flush to top-0, zero margins/padding on outer wrapper.
  const headerPosition = isScrolled
    ? "fixed inset-x-0 top-0 z-[100] w-full rounded-none border-none bg-paper/95 px-0 shadow-sm backdrop-blur-md transition-all duration-300"
    : "fixed inset-x-0 top-0 z-[100] w-full border-none bg-transparent px-0 transition-all duration-300 max-lg:top-2.5 max-lg:px-2";

  const headerTone = isScrolled
    ? "text-ink"
    : isOnDarkHero
      ? "text-paper"
      : "text-ink";

  // Pre-scroll: h-16 with px-4 inside the mobile hero card.
  // On scroll: compact h-14 sticky bar with py-0.
  const innerLayout = isScrolled
    ? "h-[76px] max-lg:h-14 px-5 max-lg:px-4 py-0"
    : "h-[100px] max-lg:h-16 px-6 lg:px-[clamp(24px,8vw,120px)] max-lg:px-4";

  const logoSrc = isScrolled || currentPage === "contact"
    ? "/images/jeko-dark-logo.svg"
    : "/images/jeko-footer-logo.svg";

  // Requirement 3: The Book a call button on scroll should NOT change
  const actionColor = "bg-amber text-paper hover:bg-amber/90";

  useEffect(() => {
    const updateScrollState = () => {
      const nextIsScrolled = window.scrollY > 40;
      setIsScrolled(nextIsScrolled);
      if (nextIsScrolled) setIsMenuOpen(false);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnNav = () => setIsMenuOpen(false);
    window.addEventListener("popstate", closeOnNav);
    window.addEventListener("hashchange", closeOnNav);
    return () => {
      window.removeEventListener("popstate", closeOnNav);
      window.removeEventListener("hashchange", closeOnNav);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`${headerPosition} ${headerTone}`}
      data-scrolled={isScrolled}
      data-page={currentPage}
    >
      <div
        className={`mx-auto grid max-w-[1440px] items-center transition-[height,padding] duration-300
          grid-cols-[1fr_auto_1fr]
          max-lg:grid-cols-[minmax(0,1fr)_auto_auto] max-lg:gap-x-3
          ${innerLayout}`}
      >
        {/* Logo slot - hidden before scroll on home page */}
        <div className="col-start-1 row-start-1 flex justify-self-start">
          <Link
            href="/"
            aria-label="JEKO Design Studio home"
            className={`transition-opacity duration-300 ${
              isLogoVisible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none invisible"
            }`}
          >
            <Image
              src={logoSrc}
              alt="JEKO"
              width={222}
              height={50}
              priority
              className={`h-auto ${
                currentPage === "home" && !isScrolled
                  ? "w-[92px] lg:w-[clamp(84px,9.65vw,139px)]"
                  : "w-[clamp(84px,9.65vw,139px)] max-lg:w-[84px]"
              }`}
            />
          </Link>
        </div>

        {/* Desktop nav links */}
        <nav
          id="desktop-navigation-links"
          aria-label="Desktop navigation"
          className="col-start-2 row-start-1 hidden lg:flex lg:items-center lg:justify-center lg:gap-[34px] lg:whitespace-nowrap"
        >
          {navigationLinks.map(({ label, href, page }) => {
            const isCurrent = page === currentPage;
            return (
              <Link
                key={label}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className={`flex min-h-12 items-center px-3 text-base font-light tracking-[-0.02em] transition-colors duration-200 hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-mint ${
                  isCurrent ? "underline underline-offset-4 font-medium" : ""
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop: Book a call CTA (amber, never changes on scroll) */}
        <Link
          href="/contact"
          className={`col-start-3 row-start-1 hidden lg:inline-flex min-h-12 items-center justify-self-end rounded-sm px-5 py-0 font-action text-base tracking-[-0.04em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint ${actionColor}`}
        >
          Book a call
        </Link>

        {/* Mobile: Book a call pill (col 2) */}
        <Link
          href="/contact"
          className={`col-start-2 row-start-1 inline-flex lg:hidden min-h-10 items-center justify-center rounded-sm px-4 py-2 font-action text-sm font-medium tracking-[-0.03em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${actionColor}`}
        >
          Book a call
        </Link>

        {/* Mobile: Hamburger toggle button (col 3) */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation-links"
          onClick={() => setIsMenuOpen((open) => !open)}
          className={`col-start-3 row-start-1 inline-flex size-10 items-center justify-center justify-self-end rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint lg:hidden ${
            isOnDarkHero
              ? "text-paper hover:text-mint"
              : "text-ink hover:text-mint"
          }`}
        >
          <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            {isMenuOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>

        {/* Formal mobile dropdown menu */}
        <nav
          id="mobile-navigation-links"
          aria-label="Mobile navigation"
          className={`lg:hidden absolute left-4 right-4 top-[calc(100%+8px)] flex flex-col rounded-xl border border-ink/10 bg-paper p-3 text-ink shadow-[0_16px_36px_rgb(2_4_15/16%)] backdrop-blur-md transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto visible"
              : "opacity-0 -translate-y-2 pointer-events-none invisible"
          }`}
        >
          {navigationLinks.map(({ label, href, page }) => {
            const isCurrent = page === currentPage;
            return (
              <Link
                key={label}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={`flex min-h-12 items-center rounded-lg px-4 text-base font-normal tracking-[-0.02em] transition-colors duration-200 hover:bg-ink/5 hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-mint ${
                  isCurrent ? "font-medium text-mint bg-mint/10" : "text-ink"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
