/**
 * lib/content.ts
 *
 * Alle inhoud van de site op één plek: diensten, pakketten, prijzen,
 * werkwijze en veelgestelde vragen. Navigatie, megamenu, homepage en de
 * dienstenpagina lezen hieruit, dus een dienst toevoegen of hernoemen gebeurt
 * maar één keer.
 */

import {
  Bot,
  Code2,
  LineChart,
  Megaphone,
  Palette,
  PenTool,
  Search,
  ShoppingBag,
  Target,
  type LucideIcon,
} from "lucide-react";

/* ── Navigatie ─────────────────────────────────────────────────────────── */

export type NavLink = { label: string; href: string; /** Alleen vanaf xl in de balk. */ wide?: boolean };

// "Werkwijze" en "Componenten" staan voorlopig niet in de navigatie; de
// componentenpagina (/componenten) bestaat nog en krijgt later een premium
// plek terug.
export const NAV_LINKS: NavLink[] = [
  { label: "Prijzen", href: "/prijzen" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/* ── Diensten ──────────────────────────────────────────────────────────── */

export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  /** Op de homepage in het dienstenraster. */
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "webdesign",
    title: "Webdesign & UX/UI",
    short: "Pixel-perfect en conversiegericht",
    description:
      "Designs die jouw merk laten spreken en bezoekers naar actie leiden. Van wireframe tot pixel-perfect ontwerp, op elk scherm.",
    icon: PenTool,
    tags: ["UX/UI", "Prototyping", "Design systems"],
    featured: true,
  },
  {
    id: "development",
    title: "Webdevelopment",
    short: "Maatwerk in Next.js & Tailwind",
    description:
      "Geen templates, maar maatwerk: bliksemsnel, veilig en schaalbaar gebouwd met Next.js, Tailwind CSS en een headless CMS.",
    icon: Code2,
    tags: ["Next.js", "Headless CMS", "Integraties"],
    featured: true,
  },
  {
    id: "seo",
    title: "SEO & vindbaarheid",
    short: "Gevonden worden in Google",
    description:
      "Technische SEO, sterke content en lokale vindbaarheid, zodat klanten jóu vinden op de zoekwoorden die omzet opleveren.",
    icon: Search,
    tags: ["Technische SEO", "Lokale SEO", "Content"],
    featured: true,
  },
  {
    id: "advertising",
    title: "Google Ads & SEA",
    short: "Leads vanaf dag één",
    description:
      "Campagnes met een scherpe biedstrategie en waterdichte conversietracking. Elke euro meetbaar, elke week beter.",
    icon: Target,
    tags: ["Google Ads", "Shopping", "Tracking"],
    featured: true,
  },
  {
    id: "social",
    title: "Social advertising",
    short: "Meta, TikTok & LinkedIn",
    description:
      "Creatieve campagnes die blijven hangen: scroll-stoppende content en advertenties die converteren op elk platform.",
    icon: Megaphone,
    tags: ["Meta", "TikTok", "LinkedIn"],
  },
  {
    id: "branding",
    title: "Branding & identiteit",
    short: "Een merk dat klopt",
    description:
      "Logo, kleur, typografie en tone of voice: een sterke identiteit die vertrouwen wekt en tot in elk detail klopt.",
    icon: Palette,
    tags: ["Logo", "Huisstijl", "Brand guide"],
    featured: true,
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    short: "Webshops die verkopen",
    description:
      "Van productpagina tot checkout geoptimaliseerd voor conversie, met koppelingen naar betaal-, voorraad- en verzendsystemen.",
    icon: ShoppingBag,
    tags: ["Webshops", "Checkout", "Koppelingen"],
  },
  {
    id: "conversie",
    title: "CRO & analytics",
    short: "Meten, testen, verbeteren",
    description:
      "A/B-tests, heatmaps en heldere dashboards die laten zien wat werkt, zodat je website elke maand meer oplevert.",
    icon: LineChart,
    tags: ["A/B-testen", "Dashboards", "GA4"],
  },
  {
    id: "ai",
    title: "AI & automatisering",
    short: "Slimmer groeien, 24/7",
    description:
      "AI-chatbots, slimme funnels en automatische opvolging die dag en nacht voor je werken, gekoppeld aan je CRM.",
    icon: Bot,
    tags: ["Chatbots", "Funnels", "CRM"],
    featured: true,
  },
];

/* ── Pakketten (dienstenpagina) ────────────────────────────────────────── */

export type Package = { title: string; price: number; oldPrice?: number; description: string; points: string[] };

export type PackageGroup = {
  key: string;
  label: string;
  intro: string;
  packages: Package[];
  /** Overige diensten in dit vakgebied. */
  categories: string[];
};

export const PACKAGE_GROUPS: PackageGroup[] = [
  {
    key: "web",
    label: "Web & Development",
    intro: "Van strakke one-pager tot headless platform: gebouwd voor snelheid, vindbaarheid en conversie.",
    packages: [
      {
        title: "Start",
        price: 499,
        description: "Snel en strak online met een one-pager op maat. Inclusief basis-SEO.",
        points: ["One-pager op maat", "Contactformulier en WhatsApp", "Basis-SEO"],
      },
      {
        title: "Groei",
        price: 1249,
        description: "Tot 6 pagina's, CMS, conversietracking en AI-teksten voor je pagina's.",
        points: ["Tot 6 pagina's", "CMS en blog", "AI-teksten inbegrepen"],
      },
      {
        title: "Pro",
        price: 2495,
        description: "Next.js-maatwerk met eigen design system en een AI-chatbot.",
        points: ["Eigen design system", "Next.js, gebouwd op snelheid", "AI-chatbot inbegrepen"],
      },
    ],
    categories: [
      "Webdesign (UX/UI)",
      "Webdevelopment",
      "E-commerce",
      "Landing pages",
      "Technische SEO",
      "Performance & speed",
      "Toegankelijkheid (WCAG)",
      "Webcare & onderhoud",
      "Hosting & domeinen",
      "CMS / headless CMS",
      "Migratie & replatforming",
      "Integraties & API's",
      "Web app / MVP",
      "Security & hardening",
      "Analytics & tracking",
      "Privacy & cookie consent",
    ],
  },
  {
    key: "marketing",
    label: "Marketing & Growth",
    intro: "Meer bereik, meer leads, meer omzet: datagedreven marketing die schaalbaar en creatief is.",
    packages: [
      {
        title: "SEO Sprint",
        price: 795,
        oldPrice: 995,
        description: "Kansanalyse, on-page optimalisatie en content-roadmap voor 90 dagen.",
        points: ["Kansanalyse", "On-page optimalisatie", "Content-roadmap"],
      },
      {
        title: "Ads Accelerator",
        price: 950,
        oldPrice: 1200,
        description: "Opzet + optimalisatie van Google & Social ads met conversietracking.",
        points: ["Google & social ads", "Conversietracking", "Doorlopend optimaliseren"],
      },
      {
        title: "Content Engine",
        price: 680,
        oldPrice: 850,
        description: "Maandelijkse contentkalender, copy, visuals en distributie.",
        points: ["Contentkalender", "Copy & visuals", "Distributie"],
      },
    ],
    categories: [
      "SEO (on-page)",
      "Lokale SEO",
      "SEA / Google Ads",
      "Social ads (Meta, TikTok, LinkedIn)",
      "Content marketing",
      "Copywriting",
      "E-mail & marketing automation",
      "CRO / A/B-testen",
      "Analytics & dashboarding",
      "Social media management",
      "Brand strategy",
      "Branding & visual identity",
      "Foto & video",
      "PR & linkbuilding",
      "Influencer marketing",
      "Funnels & lead magnets",
    ],
  },
];

/* ── Prijzen ───────────────────────────────────────────────────────────
   Websites vanaf € 499, met AI als uitbreiding op elk niveau (upsell) en
   losse uitbreidingen (cross-sell). Prijzen eenmalig en excl. btw, tenzij
   "per maand". Pas ze hier aan: prijzenpagina, samensteller, megamenu, chat en
   de deelafbeelding lezen allemaal hieruit. */

export type TierId = "start" | "groei" | "pro" | "maatwerk";

export type Tier = {
  id: TierId;
  name: string;
  /** null = op maat. */
  price: number | null;
  tagline: string;
  summary: string;
  features: string[];
  /** Het AI-onderdeel van dit pakket (inbegrepen of als uitbreiding). */
  ai: { label: string; included: boolean };
  delivery: string;
  highlight?: boolean;
  /** Diensten die de aanvraag alvast aanvinkt. */
  services: string[];
};

export const WEBSITE_TIERS: Tier[] = [
  {
    id: "start",
    name: "Start",
    price: 499,
    tagline: "Snel en strak online",
    summary: "Een one-pager op maat die vertrouwen wekt en aanvragen binnenhaalt.",
    features: ["One-pager op maat, tot 6 secties", "Mobielvriendelijk en razendsnel", "Contactformulier en WhatsApp-knop", "Basis-SEO en Google-indexering", "SSL-certificaat en livegang"],
    ai: { label: "AI-chatbot als uitbreiding", included: false },
    delivery: "Vaak binnen 2 weken live",
    services: ["webdesign", "development"],
  },
  {
    id: "groei",
    name: "Groei",
    price: 1249,
    tagline: "Meest gekozen door ondernemers",
    summary: "Een complete website die gevonden wordt en leads oplevert.",
    features: ["Tot 6 pagina's op maat", "Zelf aanpassen via een CMS", "SEO-zoekwoordanalyse", "Analytics en conversietracking", "Blog en Google Bedrijfsprofiel", "1 maand support na livegang"],
    ai: { label: "AI-teksten voor al je pagina's", included: true },
    delivery: "Vaak binnen 3 weken live",
    highlight: true,
    services: ["webdesign", "development", "seo"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 2495,
    tagline: "Voor merken die willen schalen",
    summary: "Maatwerk in Next.js, gebouwd op snelheid, vindbaarheid en conversie.",
    features: ["Tot 15 pagina's met eigen design system", "Next.js, gebouwd op snelheid", "Geavanceerde SEO en schema-markup", "Koppelingen met CRM, mail en agenda", "Dashboards en A/B-test-klaar", "3 maanden support"],
    ai: { label: "AI-chatbot getraind op jouw content", included: true },
    delivery: "4 tot 6 weken",
    services: ["webdesign", "development", "seo", "ai"],
  },
  {
    id: "maatwerk",
    name: "AI & maatwerk",
    price: null,
    tagline: "Webshop, platform of automatisering",
    summary: "Volledig op maat, met AI-automatisering die dag en nacht voor je werkt.",
    features: ["Webshop of web-app op maat", "AI-leadopvolging en slimme funnels", "Koppelingen met al je systemen", "Onbeperkte revisies tijdens de bouw", "Vast aanspreekpunt en SLA", "Doorlopend meten en verbeteren"],
    ai: { label: "AI-automatisering op maat", included: true },
    delivery: "In overleg",
    services: ["webdesign", "development", "ecommerce", "ai"],
  },
];

export type Addon = {
  id: string;
  name: string;
  description: string;
  /** Eenmalig (0 = geen opstartkosten). */
  price: number;
  /** Per maand. */
  monthly?: number;
  ai?: boolean;
  popular?: boolean;
  services: string[];
};

export const ADDONS: Addon[] = [
  { id: "ai-chatbot", name: "AI-chatbot", description: "Beantwoordt vragen dag en nacht en legt leads vast, getraind op jouw website.", price: 349, monthly: 29, ai: true, popular: true, services: ["ai"] },
  { id: "ai-opvolging", name: "AI-leadopvolging", description: "Elke aanvraag krijgt binnen een minuut een persoonlijke reactie in je eigen stijl.", price: 399, monthly: 19, ai: true, services: ["ai"] },
  { id: "ai-content", name: "AI-content en blogs", description: "Vier SEO-blogs per maand, geschreven met AI en gecontroleerd door ons.", price: 0, monthly: 149, ai: true, services: ["seo", "ai"] },
  { id: "lokale-seo", name: "Lokale SEO-boost", description: "Beter zichtbaar in Google Maps en lokaal zoeken in jouw regio.", price: 295, services: ["seo"] },
  { id: "huisstijl", name: "Logo en huisstijl", description: "Een logo, kleuren en typografie die precies bij je merk passen.", price: 395, services: ["branding"] },
  { id: "extra-paginas", name: "3 extra pagina's", description: "Drie extra pagina's in dezelfde stijl, inclusief teksten.", price: 249, services: ["webdesign"] },
];

export const CARE_PLAN = {
  id: "onderhoud",
  name: "Onderhoud en hosting",
  description: "Snelle hosting, updates, back-ups, beveiliging en kleine aanpassingen.",
  monthly: 29,
};

/** Laagste websiteprijs, voor teksten als "websites vanaf € 499". */
export const PRICE_FROM = Math.min(...WEBSITE_TIERS.flatMap((t) => (t.price ? [t.price] : [])));

export const euro = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

/* ── Werkwijze ─────────────────────────────────────────────────────────── */

export const PROCESS = [
  {
    title: "Kennismaking",
    text: "In een vrijblijvend gesprek brengen we je doelen, doelgroep en kansen in kaart. Binnen 24 uur heb je een voorstel.",
  },
  {
    title: "Strategie & design",
    text: "We vertalen je merk naar een conversiegericht ontwerp: van wireframe en copy tot pixel-perfect design.",
  },
  {
    title: "Development",
    text: "We bouwen op maat in Next.js en Tailwind CSS: snel, veilig, SEO-proof en volledig responsive.",
  },
  {
    title: "Lancering & groei",
    text: "Na livegang meten, testen en optimaliseren we door, met SEO, advertenties en heldere data.",
  },
];

/* ── Kerncijfers (uit de bestaande teksten van de site) ────────────────── */

export const STATS = [
  { value: "17+", label: "jaar design- & marketingervaring" },
  { value: "24u", label: "offerte voor web & marketing" },
  { value: "4,8", label: "gemiddelde score op Trustpilot" },
  { value: "100%", label: "maatwerk, geen templates" },
];

/* ── Klanten ───────────────────────────────────────────────────────────── */

export const CLIENT_LOGOS = [
  { src: "/svg/raceplanet.svg", alt: "RacePlanet" },
  { src: "/svg/bambuu.svg", alt: "Bambuu" },
  { src: "/svg/bitvavo.svg", alt: "Bitvavo" },
  { src: "/svg/khanAangepast.svg", alt: "Khan Premium Automotive" },
  { src: "/svg/bridgefund.svg", alt: "BridgeFund" },
  { src: "/svg/brendakookt.svg", alt: "Brenda Kookt" },
  { src: "/svg/yoyo.svg", alt: "YoYo" },
  { src: "/svg/bouwmensen.svg", alt: "Bouwmensen" },
  { src: "/svg/breinstein.svg", alt: "Breinstein" },
  { src: "/svg/volvo-kuyk.svg", alt: "Volvo Kuyk" },
  { src: "/svg/hearingcoach.svg", alt: "Hearing Coach" },
  { src: "/svg/bigairbag.svg", alt: "Big Airbag" },
];

/** Websites in de showcase-baan ("voorkant" en "detail" wisselen bij hover). */
export const SHOWCASE = [
  { front: "/images/front.jpg", back: "/images/back.jpg" },
  { front: "/images/front-1.jpg", back: "/images/back-1.jpg" },
  { front: "/images/front-2.jpg", back: "/images/back-2.jpg" },
  { front: "/images/front-3.jpg", back: "/images/back-3.jpg" },
];

/* ── Veelgestelde vragen ───────────────────────────────────────────────── */

export type Faq = { q: string; a: string };
export type FaqGroup = { title: string; items: Faq[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Samenwerking",
    items: [
      {
        q: "Hoe verloopt een samenwerking met Reactly?",
        a: "We starten met een vrijblijvende kennismaking waarin we je doelen en kansen in kaart brengen. Binnen 24 uur ontvang je een voorstel met planning en investering. Daarna werken we in heldere stappen: strategie, design, development en lancering, met één vast aanspreekpunt.",
      },
      {
        q: "Hoe snel staat mijn website live?",
        a: "Een compacte website staat vaak binnen twee weken live. Uitgebreide websites en webshops nemen doorgaans vier tot acht weken in beslag. In ons voorstel staat altijd een concrete planning, zodat je precies weet waar je aan toe bent.",
      },
      {
        q: "Werken jullie met templates?",
        a: "Nee. Elke website is maatwerk, ontworpen voor jouw merk en doelgroep en gebouwd met moderne technologie zoals Next.js en Tailwind CSS. Daardoor is je site sneller, veiliger en beter vindbaar dan een standaardthema.",
      },
      {
        q: "Kan ik zelf teksten en afbeeldingen aanpassen?",
        a: "Ja. We koppelen je website aan een gebruiksvriendelijk (headless) CMS, zodat je zelf pagina's, blogs en afbeeldingen beheert. We laten je zien hoe alles werkt.",
      },
    ],
  },
  {
    title: "Kosten",
    items: [
      {
        q: "Wat kost een website?",
        a: "Een website begint bij € 499 (Start, een one-pager op maat). Groei kost € 1.249 en Pro € 2.495; webshops, platforms en AI-automatisering maken we op maat. Op de prijzenpagina stel je zelf je pakket samen. Binnen 24 uur heb je een voorstel.",
      },
      {
        q: "Kan ik later uitbreiden met AI of extra pagina's?",
        a: "Ja. Elk pakket groeit mee: je voegt later een AI-chatbot, AI-leadopvolging, extra pagina's of marketing toe, zonder opnieuw te beginnen.",
      },
      {
        q: "Zijn er doorlopende kosten?",
        a: "Alleen als je dat wilt. Hosting, onderhoud en doorlopende marketing bieden we als aparte dienst aan, zodat je alleen betaalt voor wat je nodig hebt.",
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        q: "Wat is het verschil tussen SEO en SEA?",
        a: "SEO (zoekmachineoptimalisatie) zorgt dat je organisch, dus zonder te betalen per klik, hoger in Google komt. SEA zijn betaalde advertenties, bijvoorbeeld via Google Ads: direct zichtbaar, maar je betaalt per klik. De sterkste groei haal je vaak uit een slimme combinatie van beide.",
      },
      {
        q: "Hoe snel zie ik resultaat van SEO?",
        a: "Technische verbeteringen hebben vaak binnen enkele weken effect. Voor structurele groei op concurrerende zoekwoorden reken je meestal op drie tot zes maanden. We rapporteren maandelijks, zodat je de voortgang ziet.",
      },
      {
        q: "Beheren jullie ook advertenties en social media?",
        a: "Ja. We zetten campagnes op in Google Ads, Meta, TikTok en LinkedIn, inclusief creatie, conversietracking en doorlopende optimalisatie. Ook social media management en contentcreatie kunnen we volledig voor je verzorgen.",
      },
    ],
  },
  {
    title: "Techniek",
    items: [
      {
        q: "Is mijn website snel en mobielvriendelijk?",
        a: "Altijd. We ontwerpen mobile-first en bouwen performance-first: geoptimaliseerde afbeeldingen, moderne lettertypes en minimale JavaScript. Dat merk je aan de laadtijd én aan je positie in Google.",
      },
      {
        q: "Is mijn website veilig en AVG-proof?",
        a: "Ja. Elke website krijgt een SSL-certificaat, veilige hosting en een nette cookiemelding. Tracking laadt pas na toestemming, en formulieren verwerken alleen de gegevens die nodig zijn.",
      },
      {
        q: "Kunnen jullie mijn bestaande website overzetten?",
        a: "Zeker. We migreren je website naar een nieuw platform met behoud van je vindbaarheid: redirects, metadata en contentstructuur nemen we zorgvuldig mee.",
      },
    ],
  },
];

export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);
