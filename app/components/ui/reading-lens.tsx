"use client";

import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

type ReadingLensProps = {
  children: ReactNode;
  className?: string;
};

type HeadingWithId = {
  id?: string;
  "aria-hidden"?: boolean;
};

const finePointerMotionVariant =
  "[@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:group-data-[reading-active=true]/reading-lens:opacity-100";

export default function ReadingLens({
  children,
  className = "",
}: ReadingLensProps) {
  const mirroredHeading = isValidElement(children)
    ? cloneElement(children as ReactElement<HeadingWithId>, {
        id: undefined,
        "aria-hidden": true,
      })
    : children;

  return (
    <div
      className={`group/reading-lens relative ${className}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          event.currentTarget.dataset.readingActive = "true";
        }
      }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;

        const target = event.currentTarget;
        const bounds = target.getBoundingClientRect();
        target.style.setProperty(
          "--reading-x",
          `${event.clientX - bounds.left}px`,
        );
        target.style.setProperty(
          "--reading-y",
          `${event.clientY - bounds.top}px`,
        );
      }}
      onPointerLeave={(event) => {
        delete event.currentTarget.dataset.readingActive;
      }}
    >
      {children}
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden opacity-0 [clip-path:circle(4.5rem_at_var(--reading-x,50%)_var(--reading-y,50%))] [&>*]:scale-[1.08] [&>*]:[transform-origin:var(--reading-x,50%)_var(--reading-y,50%)] ${finePointerMotionVariant}`}
        aria-hidden="true"
      >
        {mirroredHeading}
      </div>
      <span
        className={`pointer-events-none absolute left-[var(--reading-x,50%)] top-[var(--reading-y,50%)] size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mint/70 opacity-0 ${finePointerMotionVariant}`}
        aria-hidden="true"
      />
    </div>
  );
}
