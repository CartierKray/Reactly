import type { Metadata } from "next";

import Catalog from "@/components/site/Catalog";
import CtaBand from "@/components/site/CtaBand";
import { Container, Section, SectionHeading } from "@/components/site/Layout";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { COMPONENT_CATEGORIES, TEMPLATE_CATEGORIES } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Componenten & templates",
  description:
    "Blader door de groeiende bibliotheek van Reactly: premium templates en componentpakketten, gebouwd met Next.js en Tailwind CSS.",
  alternates: { canonical: "/componenten" },
};

export default function ComponentenPage() {
  return (
    <>
      <PageHero
        image={{ src: "/images/cta-1.png", position: "object-[50%_18%]" }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Componenten" }]}
        eyebrow="Componenten"
        title={
          <>
            Een bibliotheek vol <span className="text-gradient">premium</span> bouwstenen
          </>
        }
        lede="Blader door onze steeds groter wordende collectie templates en componenten: dezelfde bouwstenen waarmee wij razendsnelle, conversiegerichte websites maken."
      />

      <Section className="pt-14 md:pt-16">
        <Container>
          <Catalog />
        </Container>
      </Section>

      <Section aria-labelledby="categorieen-title" className="bg-surface-sunken/60">
        <Container>
          <Reveal>
            <SectionHeading
              id="categorieen-title"
              eyebrow="Groeit elke maand"
              title="Categorieën in de bibliotheek"
              lede="Van hero-secties tot complete checkout-flows. Mis je iets? We bouwen het op maat."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_2.4fr]">
            <Reveal>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle">Templates</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {TEMPLATE_CATEGORIES.map((c) => (
                  <li key={c} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12px] text-ink-muted">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal style={{ ["--d" as string]: "100ms" }}>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle">Componenten</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {COMPONENT_CATEGORIES.map((c) => (
                  <li key={c} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12px] text-ink-muted">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={
          <>
            Liever een website <span className="text-gradient">volledig op maat?</span>
          </>
        }
      />
    </>
  );
}
