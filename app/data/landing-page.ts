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

export type Project = {
  title: string;
  category: ProjectCategory;
  additionalCategories?: ProjectCategory[];
  image: string;
  imageAlt: string;
  categoryLabel?: string;
  summary?: string;
  featuredInAnimation?: boolean;
};

export const projects: Project[] = [
  {
    title: "CedarRise",
    category: "Branding & Design",
    image: "/images/cedarrise-clean-mockup.png",
    imageAlt:
      "CedarRise branding case study: outdoor billboard with a botanical identity.",
    categoryLabel: "NGO Branding",
    summary: "A commitment to growth and progress",
    featuredInAnimation: true,
  },
  {
    title: "SBT Apartments",
    category: "Branding & Design",
    image: "/images/sbt-apartments-mockup.png",
    imageAlt:
      "SBT Apartments hospitality brand case study shown over a warm, modern apartment interior.",
    categoryLabel: "Hospitality Branding",
    summary: "Where luxury and comfort co-exists",
    featuredInAnimation: true,
  },
  {
    title: "Kacxs Energy",
    category: "Branding & Design",
    image: "/images/kacxs-energy-exact.jpg",
    imageAlt:
      "Yellow Kacxs Energy commercial truck with solar panel installation in an autumn landscape.",
    categoryLabel: "Energy company Branding",
    summary: "Sustainable power servicing & product",
    featuredInAnimation: true,
  },
  {
    title: "Lazy Yute",
    category: "Branding & Design",
    image: "/images/lazy-yute-photo.png",
    imageAlt:
      "Lazy Yute luxury streetwear brand apparel mockup showing a model in a branded white tee.",
    categoryLabel: "Streetwear Branding",
    summary: "Luxury street-wear brand",
    featuredInAnimation: true,
  },
  {
    title: "Phoebe Beauty",
    category: "Marketing & Social media",
    additionalCategories: ["Branding & Design"],
    image: "/images/phoebe-beauty-exact.png",
    imageAlt:
      "Phoebe Beauty skincare UGC content creator holding cosmetics with under-eye patches.",
    categoryLabel: "UGC for audience building",
    summary: "created retentive contents in beauty niche targeting woman, using UGC.",
    featuredInAnimation: true,
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
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
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
