/**
 * app/page.tsx — de homepage.
 *
 * Rustig en ruim, zoals BeterLease: elk blok staat in dezelfde opbouw met
 * dezelfde witruimte en dezelfde kop, zonder scheidingslijnen ertussen.
 *
 *   hero (video in licht, bewegende kubus in donker) → beoordelingen en
 *   klantlogo's → diensten (bento) → waarom Reactly + kerncijfers →
 *   prijzen (vanaf € 499) → werkwijze → techniek-showcase → ervaringen → veelgestelde vragen →
 *   afsluiter → contact
 */

import type { Metadata } from "next";

import ContactSection from "@/components/site/ContactSection";
import CtaBand from "@/components/site/CtaBand";
import FaqSection from "@/components/site/FaqSection";
import Reviews from "@/components/site/Reviews";
import Hero from "@/components/site/home/Hero";
import PricingTeaser from "@/components/site/home/PricingTeaser";
import Process from "@/components/site/home/Process";
import Services from "@/components/site/home/Services";
import TechShowcase from "@/components/site/home/TechShowcase";
import TrustBand from "@/components/site/home/TrustBand";
import WhyReactly from "@/components/site/home/WhyReactly";
import { ALL_FAQS } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HOME_FAQ = [0, 1, 2, 4, 6, 9].map((i) => ALL_FAQS[i]).filter(Boolean);

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <Services />
      <WhyReactly />
      <PricingTeaser />
      <Process />
      <TechShowcase />
      <Reviews />
      <FaqSection items={HOME_FAQ} />
      <CtaBand />
      <ContactSection />
    </>
  );
}
