import type { Metadata } from "next";

import ContactHeroSection from "../components/contact-hero-section";
import ContactForm from "../components/contact-form";
import SiteFooter from "../components/site-footer";
import ContactSocialIcons from "../assets/icons/contact-social-icons.svg";
import LocationPin from "../assets/icons/location-pin.svg";

export const metadata: Metadata = {
  title: "Contact JEKO Design Studio",
  description:
    "Tell JEKO what you are building. Get in touch about a creative partnership or project.",
};

export default function ContactPage() {
  return (
    <>
      <main>
        <ContactHeroSection />
                        <div className="h-7.5 w-full hidden lg:block bg-black"></div>

        <section
          id="start-project"
          aria-labelledby="contact-form-title"
          className="mx-5 my-5 scroll-mt-[110px] overflow-hidden rounded-2xl bg-ink px-5 py-16 text-paper sm:px-8 md:px-10 md:py-24"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="mx-auto max-w-[672px] text-center">
              <p className="font-body text-[28px] leading-8 tracking-[-0.08em] text-paper/60 md:text-[32px]">
                Contact us
              </p>
              <h2
                id="contact-form-title"
                className="mt-4 font-display text-[clamp(38px,4.45vw,64px)] leading-[1.02] tracking-[-0.08em]"
              >
                Let us know <span className="text-paper/60">what</span>
                <br className="hidden sm:block" />
                <span className="text-paper/60">you are</span> building
              </h2>
            </div>

            <div className="mt-8 md:mt-10">
              <ContactForm />
            </div>

            <div className="mt-24 border-t border-paper/15 pt-12 sm:mt-32 md:mt-40 md:border-0 md:pt-0">
              <p className="max-w-[1280px] font-display text-[clamp(32px,5vw,72px)] leading-[1.02] tracking-[-0.08em]">
                <span className="text-paper/60">
                  For partnerships, general inquiries or something that doesn’t
                  quite fit the form, 
                </span>
                reach us directly.
              </p>
              <div className="mt-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                <ContactSocialIcons
                  role="img"
                  aria-label="LinkedIn, Instagram, X, TikTok, Facebook, and WhatsApp"
                  className="h-auto w-full max-w-[584px] text-mint xl:shrink-0"
                />
                <a
                  href="mailto:cd.jeko.co@gmail.com"
                  className="break-all font-body text-lg font-light text-paper transition-colors hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint sm:whitespace-nowrap md:text-2xl"
                >
                  <span className="text-mint">Email:</span> cd.jeko.co@gmail.com
                </a>
                <p className="flex items-center gap-2 whitespace-nowrap font-body text-xl font-light text-paper md:text-2xl">
                  <LocationPin
                    aria-hidden="true"
                    className="h-[24px] w-[29px] shrink-0 text-mint"
                  />
                  Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>
        </section>
                      <div className="h-7.5 mb-7.5 w-full hidden lg:block bg-black"></div>
      </main>

      <SiteFooter />
    </>
  );
}
