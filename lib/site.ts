/**
 * lib/site.ts
 *
 * Eén bron voor bedrijfsgegevens. Navigatie, footer, contactpagina, chat en
 * structured data lezen allemaal hieruit, zodat een nummer of adres nooit op
 * de ene plek anders is dan op de andere.
 */

/**
 * Het adres van de site. Zolang reactly.nl nog niet aan het Vercel-project
 * hangt, is dat het vercel.app-adres van productie; anders wijzen
 * deelvoorbeelden (Open Graph), canonical-links en structured data naar een
 * domein dat nog niet bestaat. Hangt er een eigen domein aan, dan wordt het
 * vanzelf www.reactly.nl. NEXT_PUBLIC_SITE_URL gaat altijd voor.
 */
function siteUrl(): string {
  const vast = process.env.NEXT_PUBLIC_SITE_URL;
  if (vast) return vast.replace(/\/+$/, "");
  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel?.endsWith(".vercel.app")) return `https://${vercel}`;
  return "https://www.reactly.nl";
}

export const SITE = {
  name: "Reactly",
  url: siteUrl(),
  tagline: "Webdesign & online marketing bureau",
  description:
    "Reactly is een strategisch webdesign & online marketing bureau. Wij ontwerpen en bouwen conversiegerichte websites, landingspagina's en campagnes die groeien: bliksemsnel, SEO-geoptimaliseerd en met een ijzersterk design.",
  email: "info@reactly.nl",
  phone: {
    display: "+31 (0)6 18 89 13 46",
    href: "tel:+31618891346",
    e164: "+31618891346",
  },
  whatsapp: {
    href: "https://wa.me/31618891346?text=" +
      encodeURIComponent("Hallo Reactly, ik heb interesse en zou graag meer informatie willen ontvangen."),
  },
  address: {
    street: "Staalstraat 103",
    postalCode: "1951 MA",
    city: "Velsen-Noord",
    country: "NL",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Staalstraat 103, 1951 MA Velsen-Noord"),
  },
  social: {
    instagram: "https://www.instagram.com/reactly.nl/",
  },
} as const;

export type OpeningDay = { day: string; short: string; open?: string; close?: string };

/** Openingstijden zoals ze op de vorige site stonden. */
export const OPENING_HOURS: OpeningDay[] = [
  { day: "Maandag", short: "Ma", open: "08:00", close: "19:00" },
  { day: "Dinsdag", short: "Di", open: "08:00", close: "19:00" },
  { day: "Woensdag", short: "Wo", open: "08:00", close: "19:00" },
  { day: "Donderdag", short: "Do", open: "08:00", close: "19:00" },
  { day: "Vrijdag", short: "Vr", open: "08:00", close: "19:00" },
  { day: "Zaterdag", short: "Za", open: "08:00", close: "16:00" },
  { day: "Zondag", short: "Zo" },
];

export const formatHours = (d: OpeningDay) => (d.open ? `${d.open} – ${d.close}` : "Gesloten");

/** Uren en minuten in Nederlandse tijd, ook als de server in UTC draait. */
function amsterdamNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const index = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday"));
  return { index: index < 0 ? 0 : index, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Zijn we op dit moment bereikbaar? (Voor de chat en de terugbelkaart.) */
export function isOpenNow(now: Date = new Date()): boolean {
  const { index, minutes } = amsterdamNow(now);
  const d = OPENING_HOURS[index];
  if (!d?.open || !d?.close) return false;
  return minutes >= toMinutes(d.open) && minutes < toMinutes(d.close);
}

/** "Vandaag bereikbaar van 08:00 tot 19:00" of "Vandaag gesloten". */
export function todayOpeningLabel(now: Date = new Date()): string {
  const d = OPENING_HOURS[amsterdamNow(now).index];
  if (!d?.open || !d?.close) return "Vandaag gesloten";
  return `Vandaag bereikbaar van ${d.open} tot ${d.close}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone.e164,
    image: `${SITE.url}/opengraph-image`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
    ],
    sameAs: [SITE.social.instagram],
    areaServed: "NL",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "nl-NL",
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}
