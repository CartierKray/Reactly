import type { Metadata } from "next";
import { Clock, Gauge, MessageSquare, Search, ShieldCheck, Smartphone } from "lucide-react";

import CtaBand from "@/components/site/CtaBand";
import FaqSection from "@/components/site/FaqSection";
import { Container, Section, SectionHeading } from "@/components/site/Layout";
import PageHero from "@/components/site/PageHero";
import { PackageBuilder, PricingTiers, WebsiteScan } from "@/components/site/Pricing";
import Reveal from "@/components/site/Reveal";
import Reviews from "@/components/site/Reviews";
import { FAQ_GROUPS, PRICE_FROM, euro } from "@/lib/content";
import { order } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Prijzen & pakketten",
  description: `Websites vanaf ${euro(PRICE_FROM)}: Start, Groei, Pro en AI & maatwerk. Stel je pakket samen met AI-chatbot, leadopvolging en onderhoud. Binnen 24 uur een offerte op maat.`,
  alternates: { canonical: "/prijzen" },
};

const ALWAYS = [
  { icon: Smartphone, title: "Responsief design", text: "Pixel-perfect op elk scherm." },
  { icon: Gauge, title: "Snelle laadtijden", text: "Performance-first gebouwd." },
  { icon: Search, title: "SEO-basis", text: "Technisch goed vindbaar." },
  { icon: ShieldCheck, title: "Veilig & AVG-proof", text: "SSL en nette cookiemelding." },
  { icon: MessageSquare, title: "Persoonlijk contact", text: "Eén vast aanspreekpunt." },
  { icon: Clock, title: "Offerte binnen 24 uur", text: "Snel weten waar je staat." },
];

export default function PrijzenPage() {
  return (
    <>
      <PageHero
        image={{ src: "/images/141-Rotterdam.jpeg", position: "object-center" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Prijzen" }]}
        eyebrow="Prijzen"
        title={
          <>
            Websites vanaf <span className="text-gradient">{euro(PRICE_FROM)}</span>
          </>
        }
        lede="Kies een pakket of stel zelf je website samen, met AI die dag en nacht voor je werkt. Binnen 24 uur een voorstel op maat."
      />

      <Section aria-label="Websitepakketten" className="pt-16 md:pt-20">
        <Container>
          <PricingTiers />
          <p className="mt-6 text-center text-[12px] text-ink-subtle">Alle prijzen eenmalig en excl. btw. Hosting en onderhoud regel je met ons plan van € 29 per maand, of zelf.</p>
        </Container>
      </Section>

      <Section id="samenstellen" aria-labelledby="samenstellen-title" className="pt-0 md:pt-0">
        <Container>
          <Reveal>
            <SectionHeading
              id="samenstellen-title"
              eyebrow="Pakketsamensteller"
              title={
                <>
                  Stel je <span className="text-gradient">eigen pakket</span> samen
                </>
              }
              lede="Begin met de basis en maak je website slimmer met AI, extra's en zorgeloos onderhoud. Je ziet direct wat het kost."
            />
          </Reveal>
          <div className="mt-12">
            <PackageBuilder />
          </div>
        </Container>
      </Section>

      <Section id="scan" aria-label="Gratis website-scan" className="pt-0 md:pt-0">
        <Container>
          <Reveal>
            <WebsiteScan />
          </Reveal>
        </Container>
      </Section>

      <Section aria-labelledby="altijd-title" className="pt-0 md:pt-0">
        <Container>
          <Reveal>
            <SectionHeading id="altijd-title" eyebrow="Altijd inbegrepen" title="De basis is altijd premium" />
          </Reveal>
          <Reveal group className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3 lg:grid-cols-6">
            {ALWAYS.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="reveal-item bg-page p-6 text-center" style={order(i, { "--stagger": "60ms" })}>
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-sunken text-ink">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
                </span>
                <p className="mt-4 text-[13.5px] font-semibold text-ink">{title}</p>
                <p className="mt-1 text-[12px] text-ink-subtle">{text}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Reviews eyebrow="Ervaringen" lede="Hier is wat sommige van onze klanten te zeggen hebben over Reactly." />
      <FaqSection items={[...FAQ_GROUPS[1].items, ...FAQ_GROUPS[0].items.slice(0, 2)]} />
      <CtaBand />
    </>
  );
}
