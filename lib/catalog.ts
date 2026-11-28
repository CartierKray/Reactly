/**
 * lib/catalog.ts
 *
 * De templates en componentpakketten van de componentenpagina (uit de
 * vorige ProductGrid, vertaald en ontdubbeld), plus de categorieën waarin
 * de bibliotheek groeit.
 */

export type CatalogItem = {
  title: string;
  kind: "template" | "pack";
  items: number;
  price: number;
  oldPrice?: number;
  description: string;
  /** Kleuraccent van de preview. */
  hue: number;
};

export const CATALOG: CatalogItem[] = [
  { title: "SaaS Landing – Nova", kind: "template", items: 1, price: 29, oldPrice: 39, hue: 220, description: "Hoog converterende SaaS-landingspagina met secties, prijzen en FAQ." },
  { title: "Portfolio – Minimal", kind: "template", items: 1, price: 19, oldPrice: 29, hue: 250, description: "Strak portfolio met case-raster, over-mij en contact." },
  { title: "Agency – Grid", kind: "template", items: 1, price: 24, oldPrice: 34, hue: 200, description: "Bureaulayout met hero, diensten, werk, reviews en contact." },
  { title: "Hero Sections", kind: "pack", items: 9, price: 12, oldPrice: 18, hue: 225, description: "Moderne hero-secties die opvallen en direct converteren." },
  { title: "Logo Clouds", kind: "pack", items: 3, price: 10, oldPrice: 16, hue: 210, description: "Logobanden met micro-interacties en subtiele animaties." },
  { title: "Feature Sections", kind: "pack", items: 4, price: 9, oldPrice: 14, hue: 235, description: "Featuresecties, van bento-rasters tot eenvoudige layouts." },
  { title: "Backgrounds", kind: "pack", items: 8, price: 9, oldPrice: 15, hue: 260, description: "Creatieve, prachtige achtergronden voor landingspagina's." },
  { title: "Bento Grids", kind: "pack", items: 3, price: 12, oldPrice: 18, hue: 215, description: "Bento-rasters voor uiteenlopende toepassingen." },
  { title: "Blog Content Sections", kind: "pack", items: 2, price: 9, oldPrice: 15, hue: 195, description: "Contentsecties voor losse blogartikelen." },
];

export const TEMPLATE_CATEGORIES = [
  "Landing pages",
  "SaaS templates",
  "Portfolio",
  "Agency",
  "Blog",
  "E-commerce",
  "Pricing pages",
  "Auth flows",
];

export const COMPONENT_CATEGORIES = [
  "Hero sections",
  "Logo clouds",
  "Bento grids",
  "CTA sections",
  "Testimonials",
  "Feature sections",
  "Pricing sections",
  "Cards",
  "Navbars",
  "Footers",
  "Login & signup",
  "Contact sections",
  "Blog sections",
  "FAQ's",
  "Sidebars",
  "Stats sections",
  "Animations",
  "Integrations",
  "Code snippets",
  "Newsletter forms",
  "Social proof",
  "Modals",
  "Tables",
  "Pagination",
  "Search bars",
  "Dropdown menus",
  "Tooltips",
  "Loaders",
  "Image galleries",
  "Tabs",
  "Carousels",
  "Checkout sections",
  "Error pages",
  "Onboarding flows",
];
