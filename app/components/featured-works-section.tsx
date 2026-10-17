"use client";

import Image from "next/image";
import { useState } from "react";

import { projectCategories, projects, type ProjectCategory } from "../data/landing-page";
import ArrowRightLight from "../assets/icons/arrow-right-light.svg";

export default function FeaturedWorksSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Branding & Design");
  const visibleProjects = projects.filter((project) => project.category === activeCategory);

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-[110px] bg-paper px-5 pb-24 pt-20 text-ink sm:px-8 lg:px-10 xl:px-0">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <h2 id="work-title" className="font-display text-[clamp(44px,5vw,76px)] leading-none tracking-[-0.085em]">
            Selected work
          </h2>
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap items-center gap-1">
            {projectCategories.map((category) => {
              const selected = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-14 rounded-[5px] px-4 font-body text-base tracking-[-0.045em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${selected ? "bg-mint text-paper" : "text-ink hover:bg-mint/10"}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 md:gap-6">
          {visibleProjects.map((project, index) => (
            <article key={project.title} className="group relative aspect-[1.52] overflow-hidden rounded-[18px] bg-deep-teal">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                priority={index < 2}
                unoptimized={project.image.endsWith(".svg")}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-[16px] bg-deep-teal px-6 py-5 text-paper sm:inset-x-7 sm:bottom-7 sm:px-6 sm:py-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-[clamp(30px,3.2vw,46px)] leading-none tracking-[-0.075em]">{project.title}</h3>
                  <a
                    href={`mailto:cd.jeko.co@gmail.com?subject=${encodeURIComponent(`Request ${project.title} case study`)}`}
                    className="group/link mt-1 inline-flex shrink-0 items-center gap-3 font-action text-base underline underline-offset-4 transition-colors hover:text-mint sm:text-xl"
                  >
                    <span className="hidden sm:inline">See Case study</span>
                    <span className="sm:hidden">Case study</span>
                    <ArrowRightLight aria-hidden="true" className="size-6 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
                <p className="mt-3 font-body text-base leading-tight tracking-[-0.04em] sm:text-lg">{project.summary ?? "A commitment to growth and progress"}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
