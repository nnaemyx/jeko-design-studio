"use client";

import type { FormEvent } from "react";

import ContactChevron from "../assets/icons/contact-chevron.svg";

const industries = [
  "SMEs",
  "Professional service firms",
  "Startups",
  "Corporate organizations",
  "Non-Profit",
  "Technology Companies",
  "Real estate & construction",
];

type ContactFormProps = {
  variant?: "dark" | "light";
  includeName?: boolean;
  includeNote?: boolean;
};

function openEmailDraft(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const fields = new FormData(event.currentTarget);
  const body = [
    `Name: ${fields.get("name") ?? ""}`,
    `Company or organization: ${fields.get("company") ?? ""}`,
    `Email: ${fields.get("email") ?? ""}`,
    `Industry: ${fields.get("industry") ?? ""}`,
    `Extra note: ${fields.get("note") ?? ""}`,
  ].join("\n");
  const subject = `JEKO project inquiry — ${fields.get("company") || fields.get("name") || "New project"}`;

  window.location.href = `mailto:cd.jeko.co@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm({
  variant = "dark",
  includeName = true,
  includeNote = true,
}: ContactFormProps) {
  const isLight = variant === "light";
  const fieldClassName = `h-[84px] w-full border-b ${isLight ? "border-ink/60 text-ink placeholder:text-ink/65" : "border-paper/60 text-paper placeholder:text-paper/65"} bg-transparent px-4 font-body text-base tracking-[-0.04em] focus:border-mint focus:outline-none focus-visible:ring-2 focus-visible:ring-mint/70`;
  const selectOptionClassName = isLight
    ? "bg-paper text-ink"
    : "bg-ink text-paper";

  const nameField = (
    <div key="name">
      <label htmlFor="contact-name" className="sr-only">
        Your name
      </label>
      <input
        id="contact-name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Your name:"
        required
        className={fieldClassName}
      />
    </div>
  );
  const emailField = (
    <div key="email">
      <label htmlFor="contact-email" className="sr-only">
        Email address
      </label>
      <input
        id="contact-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={isLight ? "Email:" : "Email address:"}
        required
        className={fieldClassName}
      />
    </div>
  );
  const companyField = (
    <div key="company">
      <label htmlFor="contact-company" className="sr-only">
        Business name
      </label>
      <input
        id="contact-company"
        name="company"
        type="text"
        autoComplete="organization"
        placeholder={isLight ? "Business name:" : "Company or Organization name:"}
        className={fieldClassName}
      />
    </div>
  );
  const industryField = (
    <div key="industry" className="relative">
      <label htmlFor="contact-industry" className="sr-only">
        Industry
      </label>
      <select
        id="contact-industry"
        name="industry"
        defaultValue=""
        className={`${fieldClassName} appearance-none pr-12`}
      >
        <option value="" disabled className={selectOptionClassName}>
          Industry:
        </option>
        {industries.map((industry) => (
          <option key={industry} value={industry} className={selectOptionClassName}>
            {industry}
          </option>
        ))}
      </select>
      <ContactChevron
        aria-hidden="true"
        className={`pointer-events-none absolute right-4 top-1/2 h-2 w-[14px] -translate-y-1/2 ${isLight ? "text-ink" : "text-paper"}`}
      />
    </div>
  );
  const noteField = (
    <div key="note">
      <label htmlFor="contact-note" className="sr-only">
        Any extra note
      </label>
      <textarea
        id="contact-note"
        name="note"
        placeholder="Any extra note..."
        rows={3}
        className={`mt-1 min-h-[104px] w-full resize-y border-b bg-transparent px-4 py-6 font-body text-base italic tracking-[-0.04em] focus:border-mint focus:outline-none focus-visible:ring-2 focus-visible:ring-mint/70 ${isLight ? "border-ink/60 text-ink placeholder:text-ink/65" : "border-paper/60 text-paper placeholder:text-paper/65"}`}
      />
    </div>
  );

  const fields = isLight
    ? [emailField, companyField, industryField]
    : [
        ...(includeName ? [nameField] : []),
        companyField,
        emailField,
        industryField,
        ...(includeNote ? [noteField] : []),
      ];

  return (
    <form
      aria-label="Contact JEKO Design Studio"
      onSubmit={openEmailDraft}
      className="mx-auto flex w-full max-w-[672px] flex-col gap-1"
    >
      {fields}
      <button
        type="submit"
        className="mt-5 min-h-12 self-end rounded-sm bg-mint px-5 font-action text-base text-paper transition-colors hover:bg-mint/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint active:scale-[0.98]"
      >
        Submit
      </button>
    </form>
  );
}
