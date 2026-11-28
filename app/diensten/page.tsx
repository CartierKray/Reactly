import type { Metadata } from "next";

import { ButtonLink } from "@/components/site/Button";
import CtaBand from "@/components/site/CtaBand";
import FaqSection from "@/components/site/FaqSection";
import PageHero from "@/components/site/PageHero";
import { Packages, ServiceGrid } from "@/components/site/ServicesOverview";
import Process from "@/components/site/home/Process";
import { FAQ_GROUPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Diensten: webdesign, development, SEO & marketing",
  description:
    "Webdesign, webdevelopment in Next.js, SEO, Google Ads, social advertising, branding en AI-automatisering. Bekijk onze diensten en pakketten.",
  alternates: { canonical: "/diensten" },
};

export default function DienstenPage() {
  return (
    <>
      <PageHero
        image={{ src: "/images/header-bg-3.webp", position: "object-[70%_40%]" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }]}
        eyebrow="Diensten"
        title={
          <>
            Alles voor jouw <span className="text-gradient">online groei</span>
          </>
        }
        lede="Van strategie en design tot development en marketing. Kies een dienst of een pakket, of laat ons een plan op maat maken."
        actions={
          <>
            <ButtonLink href="/offerte" size="lg" arrow="right">
              Start je aanvraag
            </ButtonLink>
            <ButtonLink href="#pakketten" variant="outline" size="lg">
              Bekijk pakketten
            </ButtonLink>
          </>
        }
      />
      <ServiceGrid />
      <Packages />
      <Process />
      <FaqSection items={[...FAQ_GROUPS[0].items.slice(0, 3), ...FAQ_GROUPS[2].items.slice(0, 2)]} />
      <CtaBand />
    </>
  );
}
