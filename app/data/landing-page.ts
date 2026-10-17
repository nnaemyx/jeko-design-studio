import type { ComponentType, SVGProps } from "react";

import BrandingIcon from "../assets/icons/branding.svg";
import MarketingIcon from "../assets/icons/marketing-strategy.svg";
import ProductDesignIcon from "../assets/icons/product-design.svg";
import SocialMediaIcon from "../assets/icons/social-media.svg";
import SoftwareIcon from "../assets/icons/software-development.svg";
import VideoIcon from "../assets/icons/video-editing.svg";

export type ServiceIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const services: {
  title: string;
  description: string;
  icon: ServiceIcon;
  featured?: boolean;
}[] = [
  {
    title: "Branding",
    description:
      "We build Identities that gives businesses clarity, character and a distinct point of view",
    icon: BrandingIcon,
    featured: true,
  },
  {
    title: "UI/UX & Product Design",
    description:
      "We design world class interfaces and digital experiences that people enjoy using",
    icon: ProductDesignIcon,
  },
  {
    title: "Marketing Strategy",
    description:
      "Boost your brands presence with data-driven marketing strategies that drive traffic and enhance brand visibility. Reach the right audience, at the right time.",
    icon: MarketingIcon,
  },
  {
    title: "Video Editing and Creation",
    description:
      "We craft visuals that simplify complexity and strengthen brand communication",
    icon: VideoIcon,
  },
  {
    title: "Software Development",
    description:
      "We create websites, web-apps and Mobile apps that communicate clearly and perform seamlessly",
    icon: SoftwareIcon,
  },
  {
    title: "Social media management",
    description:
      "Grow your brand’s influence across social platforms with strategic content and engagement. We ensure your message resonates with your target audience.",
    icon: SocialMediaIcon,
  },
];

export const projectCategories = [
  "Branding & Design",
  "Marketing & Social media",
  "UI/UX Design",
  "Website",
  "Video",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projects: {
  title: string;
  category: ProjectCategory;
  image: string;
  imageAlt: string;
  categoryLabel?: string;
  summary?: string;
}[] = [
  {
    title: "CedarRise",
    category: "Branding & Design",
    image: "/images/case-study-cedarrise.svg",
    imageAlt:
      "CedarRise branding case study: a yellow outdoor billboard with a botanical identity and a dark teal project panel.",
  },
  {
    title: "SBT Apartments",
    category: "Branding & Design",
    image: "/images/case-study-sbt-apartments.svg",
    imageAlt:
      "SBT Apartments hospitality brand case study shown over a warm, modern apartment interior.",
  },
  {
    title: "Kacxs Energy",
    category: "Branding & Design",
    image:
      "https://images.unsplash.com/photo-1644902027522-c02b19426d7b?auto=format&fit=crop&w=2400&q=85",
    imageAlt:
      "Yellow energy service vehicle in an autumn landscape, sourced from Unsplash by mugi jo.",
    categoryLabel: "Energy company Branding",
    summary: "Sustainable power servicing & product",
  },
  {
    title: "Lazy Yute",
    category: "Branding & Design",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qXVisxhoAzMISWH3a5eMc8K2mBfn3N.png",
    imageAlt: "Lifestyle product campaign image used for the Lazy Yute case study.",
    summary: "Luxury street-wear brand",
  },
];

export const testimonials = [
  {
    quote:
      "We were stressed and uncertain about our brand's direction before meeting Jeko Design Studio. The team not only delivered a logo that perfectly encapsulates our brand, but they also made the process a breeze with their flexibility, patience, and creativity.",
    author: "Kedoz Enterprise",
  },
  {
    quote:
      "They did a very impressive work. I wasn't sure how I was going to find a strategy that would improve my sales and customer reach, but the outcome of the branding process practically kills it!",
    author: "Solomon Hummel - LazyYute",
  },
  {
    quote:
      "The team really gets design. Their strategy-focused approach made all the difference for my media agency.",
    author: "Ijeoma Okafor",
  },
  {
    quote:
      "Initially, I felt like my business had no direction. The team at JEKO Design Studio not only helped me carve out a unique and problem-solving brand but impressed me with their exceptional presentation and ideas. Their work gets a 100/100 from me. I’m definitely looking forward to our next collaboration.",
    author: "Carlos Nweke - Cenna Hygiene",
  },
];

export const footerLinks = {
  explore: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Approach", href: "/#approach" },
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  connect: [
    { label: "WhatsApp" },
    { label: "LinkedIn" },
    { label: "Twitter (X)" },
    { label: "Instagram" },
    { label: "Tiktok" },
    { label: "Facebook" },
  ],
};
