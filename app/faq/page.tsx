import type { Metadata } from "next";

import CtaBand from "@/components/site/CtaBand";
import FaqExplorer from "@/components/site/FaqExplorer";
import { faqJsonLd } from "@/components/site/FaqList";
import { Container, Section } from "@/components/site/Layout";
import PageHero from "@/components/site/PageHero";
import { ALL_FAQS, FAQ_GROUPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op de meest gestelde vragen over webdesign, kosten, SEO, advertenties en techniek. Staat je vraag er niet tussen? Neem contact op.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(ALL_FAQS)) }} />
      <PageHero
        image={{ src: "/images/Verduurzaming-scaled.jpg", position: "object-[65%_35%]" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        eyebrow="Veelgestelde vragen"
        title={
          <>
            Alles wat je <span className="text-gradient">wilt weten</span>
          </>
        }
        lede="Over samenwerken, kosten, marketing en techniek. Zoek je vraag of blader per onderwerp."
      />
      <Section className="pt-16 md:pt-20">
        <Container>
          <FaqExplorer groups={FAQ_GROUPS} />
        </Container>
      </Section>
      <CtaBand
        title={
          <>
            Staat je vraag <span className="text-gradient">er niet tussen?</span>
          </>
        }
        text="We beantwoorden hem graag persoonlijk. Bel, mail of plan direct een vrijblijvende kennismaking."
      />
    </>
  );
}
