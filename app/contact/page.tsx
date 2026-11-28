import type { Metadata } from "next";

import { ButtonLink } from "@/components/site/Button";
import ContactSection from "@/components/site/ContactSection";
import FaqSection from "@/components/site/FaqSection";
import PageHero from "@/components/site/PageHero";
import { FAQ_GROUPS } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Reactly in Velsen-Noord. Bel, mail, WhatsApp of plan een vrijblijvende kennismaking; binnen 24 uur een voorstel op maat.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={{ src: "/images/ams.webp", position: "object-[50%_60%]" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title={
          <>
            Laten we <span className="text-gradient">kennismaken</span>
          </>
        }
        lede="Vertel ons over je plannen. We reageren binnen één werkdag, en binnen 24 uur heb je een voorstel op maat."
        actions={
          <>
            <ButtonLink href={SITE.phone.href} size="lg">
              Bel {SITE.phone.display}
            </ButtonLink>
            <ButtonLink href={SITE.whatsapp.href} variant="outline" size="lg">
              WhatsApp ons
            </ButtonLink>
          </>
        }
      />
      <ContactSection heading={false} className="pt-16 md:pt-20" />
      <FaqSection items={FAQ_GROUPS[0].items} />
    </>
  );
}
