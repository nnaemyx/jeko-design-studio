"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigationLinks = [
  { label: "Home", href: "/", page: "home" },
  { label: "About us", href: "/about", page: "about" },
  { label: "Work & Services", href: "/#services", page: "work" },
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
      : "home";
  const headerTone = isScrolled
    ? "text-ink"
    : currentPage === "home" || currentPage === "about"
      ? "text-paper"
      : "text-ink";
  const headerPosition = isScrolled
    ? "left-5 right-5 top-3 rounded-xl bg-paper/[94%] px-0 shadow-[0_12px_32px_rgb(2_4_15/10%)] backdrop-blur-[12px] max-lg:left-2 max-lg:right-2 max-lg:top-2"
    : currentPage === "home"
      ? "inset-x-0 top-5 px-5 max-lg:top-[46px] max-lg:px-4"
      : "inset-x-0 top-5 px-5 max-lg:top-2 max-lg:px-2";
  const innerLayout = isScrolled
    ? "h-[72px] max-lg:h-11"
    : "h-[152px] max-lg:h-11";
  const logoSrc = isScrolled || currentPage === "contact"
    ? "/images/jeko-dark-logo.svg"
    : "/images/jeko-footer-logo.svg";
  const actionColor = currentPage === "home" && !isScrolled
    ? "bg-amber"
    : "bg-mint";

  useEffect(() => {
    const updateScrollState = () => {
      const nextIsScrolled = window.scrollY > 72;
      setIsScrolled(nextIsScrolled);
      if (nextIsScrolled) setIsMenuOpen(false);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnHistoryNavigation = () => setIsMenuOpen(false);
    window.addEventListener("popstate", closeOnHistoryNavigation);
    window.addEventListener("hashchange", closeOnHistoryNavigation);
    return () => {
      window.removeEventListener("popstate", closeOnHistoryNavigation);
      window.removeEventListener("hashchange", closeOnHistoryNavigation);
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
      className={`fixed z-[100] transition-[background-color,box-shadow] duration-300 ${headerPosition} ${headerTone} ${currentPage === "home" ? (isScrolled ? "max-md:hidden" : "max-md:absolute") : ""}`}
      data-scrolled={isScrolled}
      data-page={currentPage}
    >
      <div
        className={`mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-[clamp(20px,8.33vw,120px)] transition-[height] duration-300 max-lg:grid-cols-[minmax(0,1fr)_44px_auto] max-lg:grid-rows-[44px] max-lg:gap-y-0 max-lg:px-2 ${innerLayout}`}
      >
        <Link
          href="/"
          aria-label="JEKO Design Studio home"
          className={`col-start-1 row-start-1 justify-self-start ${currentPage === "home" && !isScrolled ? "max-lg:flex lg:hidden" : "flex"}`}
        >
          <Image
            src={logoSrc}
            alt="JEKO"
            width={222}
            height={50}
            priority
            className={`h-auto ${currentPage === "home" ? "w-[92px] lg:w-[clamp(84px,9.65vw,139px)]" : "w-[clamp(84px,9.65vw,139px)] max-md:w-[60px]"}`}
          />
        </Link>

        <nav
          id="main-navigation-links"
          aria-label="Main navigation"
          className={`lg:col-start-2 lg:row-start-1 lg:flex lg:items-center lg:justify-center lg:gap-[34px] lg:whitespace-nowrap max-lg:absolute max-lg:left-2 max-lg:right-2 max-lg:top-full max-lg:flex max-lg:flex-col max-lg:items-stretch max-lg:gap-0 max-lg:rounded-xl max-lg:border max-lg:border-ink/10 max-lg:bg-paper max-lg:p-2 max-lg:text-ink max-lg:shadow-[0_12px_32px_rgb(2_4_15/10%)] ${isMenuOpen ? "max-lg:visible" : "max-lg:invisible"}`}
        >
          {navigationLinks.map(({ label, href, page }) => {
            const isCurrent = page === currentPage;
            return (
              <Link
                key={label}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={`flex min-h-12 items-center px-3 text-base font-light tracking-[-0.02em] transition-colors duration-200 hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-mint max-lg:text-sm ${isCurrent ? "underline underline-offset-4" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className={`col-start-3 row-start-1 inline-flex min-h-12 items-center justify-self-end rounded-sm px-5 py-0 font-action text-base tracking-[-0.04em] text-paper transition-colors duration-300 hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint ${currentPage === "home" ? "max-lg:hidden" : "max-lg:min-h-[38px] max-lg:px-2 max-lg:text-[clamp(9px,2.5vw,12px)]"} ${actionColor}`}
        >
          Book a call
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation-links"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="col-start-2 row-start-1 inline-flex size-11 items-center justify-center rounded-md bg-amber text-[28px] leading-none text-paper transition-colors hover:bg-amber/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint lg:hidden"
        >
          <span aria-hidden="true">{isMenuOpen ? "×" : "☰"}</span>
        </button>
      </div>
    </header>
  );
}
