import type { Metadata } from "next";

import SiteNavigation from "./components/site-navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "JEKO Design Studio — Strategic design, purposeful impact",
  description:
    "JEKO is a strategic creative partner for businesses that want their brand to perform better. Brand strategy, digital experiences and design with purpose.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="scroll-smooth bg-paper [color-scheme:light] motion-reduce:scroll-auto">
      <body className="w-full min-w-[320px] overflow-x-clip bg-paper font-body text-ink antialiased [text-rendering:optimizeLegibility] motion-reduce:[&_*]:!animate-none motion-reduce:[&_*]:!transition-none [&_a]:[-webkit-tap-highlight-color:transparent] [&_button]:[-webkit-tap-highlight-color:transparent] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-mint [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-mint">
        <SiteNavigation />
        {children}
      </body>
    </html>
  );
}
