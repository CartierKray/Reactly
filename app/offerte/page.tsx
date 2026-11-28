/**
 * app/offerte/page.tsx
 *
 * De aanvraag in stappen voor elke dienst, van website tot marketing.
 * Compacte, filmische kop (zelfde PageHero als de rest van de site) en
 * daaronder de wizard met het live overzicht.
 */

import type { Metadata } from "next";

import { Container } from "@/components/site/Layout";
import OfferteWizard from "@/components/site/offerte/OfferteWizard";
import PageHero from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Offerte aanvragen",
  description:
    "Vraag in 2 minuten een offerte aan voor je website, webshop, SEO, Google Ads, social advertising, branding of AI. Binnen 24 uur een voorstel op maat.",
  alternates: { canonical: "/offerte" },
};

export default function OffertePage() {
  return (
    <>
      <PageHero
        image={{ src: "/images/header-bg-2.webp", position: "object-[60%_45%]" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Offerte aanvragen" }]}
        eyebrow="Offerte in 2 minuten"
        title={
          <>
            Stel je <span className="text-gradient">aanvraag</span> samen
          </>
        }
        lede="Beantwoord een paar korte vragen over je plannen. Binnen 24 uur ontvang je een voorstel op maat, met planning en investering."
      />
      <section className="py-12 md:py-16">
        <Container>
          <OfferteWizard />
        </Container>
      </section>
    </>
  );
}
