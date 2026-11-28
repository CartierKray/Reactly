/**
 * components/site/home/PricingTeaser.tsx  (Server Component)
 *
 * Prijzen op de homepage: "websites vanaf € 499" als anker, de vier pakketten
 * compact naast elkaar (met het AI-onderdeel per pakket) en twee wegen
 * verder: direct een pakket kiezen (opent de aanvraag als venster) of zelf
 * samenstellen op de prijzenpagina. Zo laat ook wie nog twijfelt makkelijk
 * zijn gegevens achter.
 */

import Link from "next/link";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";

import { Container, Section, SectionHeading } from "../Layout";
import Reveal from "../Reveal";
import { PRICE_FROM, WEBSITE_TIERS, euro } from "@/lib/content";
import { offerteHref } from "@/lib/offerte";
import { order } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function PricingTeaser() {
  return (
    <Section aria-labelledby="prijzen-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="prijzen-title"
            eyebrow="Heldere prijzen"
            title={
              <>
                Websites vanaf <span className="text-gradient">{euro(PRICE_FROM)}</span>
              </>
            }
            lede="Begin klein en groei mee: elk pakket is uit te breiden met AI die dag en nacht leads voor je binnenhaalt."
          />
        </Reveal>

        <Reveal group className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WEBSITE_TIERS.map((t, i) => (
            <Link
              key={t.id}
              href={offerteHref({ pakket: t.name, services: t.services })}
              data-bron={`Homepage prijzen: ${t.name}`}
              style={order(i, { "--stagger": "70ms" })}
              className={cn(
                "reveal-item group relative flex flex-col rounded-[1.4rem] p-5 transition-transform duration-500 ease-premium hover:-translate-y-1",
                t.highlight ? "deep noise isolate border border-white/10 bg-page text-white shadow-[0_30px_70px_-34px_rgba(8,10,18,0.8)]" : "card glow-hover",
              )}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-[13.5px] font-semibold text-ink">{t.name}</span>
                {t.highlight && <span className="rounded-full bg-white px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#0a0b10]">Meest gekozen</span>}
              </span>
              <span className="mt-3 text-[1.8rem] font-medium leading-none tracking-[-0.03em] text-ink">{t.price ? euro(t.price) : "Op maat"}</span>
              <span className="mt-1 text-[11px] text-ink-subtle">{t.price ? "eenmalig, excl. btw" : "voorstel binnen 24 uur"}</span>
              <span className="mt-4 flex flex-1 items-start gap-2 text-[12px] leading-snug text-ink-muted">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" aria-hidden />
                {t.ai.included ? `Inclusief ${t.ai.label.toLowerCase()}` : t.ai.label}
              </span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                {t.price ? `Kies ${t.name}` : "Vraag een voorstel aan"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/prijzen#samenstellen" className="btn btn-outline group">
            Stel je pakket samen
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
          <Link href="/prijzen#scan" className="inline-flex items-center gap-2 px-3 py-2 text-[12.5px] font-medium text-ink-muted transition-colors hover:text-ink">
            <Wand2 className="h-4 w-4" aria-hidden />
            Of vraag een gratis website-scan aan
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
