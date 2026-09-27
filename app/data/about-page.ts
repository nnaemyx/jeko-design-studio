export type AboutSlideId = "vision" | "mission" | "clients";

export type AboutSlide = {
  id: AboutSlideId;
  label: string;
  statement: string;
  industries?: string[];
};

export const teamMembers = [
  {
    name: "Jeffery Nwankwo",
    role: "Founder and Creative director",
    backgroundPositionClass: "bg-[position:0%_0%]",
  },
  {
    name: "Victoria Ubani",
    role: "Marketing Strategist",
    backgroundPositionClass: "bg-[position:50%_0%]",
  },
  {
    name: "Johnpaul Edeh",
    role: "Full stack Developer and HOO",
    backgroundPositionClass: "bg-[position:100%_0%]",
  },
  {
    name: "Paschal Ezenwajiobi",
    role: "Board Chairman and Designer",
    backgroundPositionClass: "bg-[position:0%_100%]",
  },
  {
    name: "Maxmillian Ogbuabor",
    role: "AI Backend Engineer and HOF",
    backgroundPositionClass: "bg-[position:50%_100%]",
  },
  {
    name: "Daniel T. Nnalue",
    role: "Video editor & Motion designer",
    backgroundPositionClass: "bg-[position:100%_100%]",
  },
] as const;

export const aboutSlides: AboutSlide[] = [
  {
    id: "vision",
    label: "Our Vision",
    statement:
      "Our ambition is to become one of Africa’s most respected creative studios, empowering businesses to grow through strategic design, branding and visual communication.",
  },
  {
    id: "mission",
    label: "Our Mission",
    statement:
      "Help businesses communicate with clarity, build trust and achieve their goals. We do this through thoughtful design, creative strategy and exceptional client service.",
  },
  {
    id: "clients",
    label: "Our Clients",
    statement: "We work with people who take their business seriously.",
    industries: [
      "SMEs",
      "Professional service firms",
      "Startups",
      "Corporate organizations",
      "Non-Profit",
      "Technology Companies",
      "Real estate & construction",
    ],
  },
];
