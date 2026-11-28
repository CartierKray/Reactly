/**
 * components/site/FaqSection.tsx  (Server Component)
 *
 * Veelgestelde vragen in twee kolommen: links een vaste kop met een
 * contactkaart, rechts de vragen. Voor homepage, prijzen en diensten.
 */

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import FaqList, { faqJsonLd } from "./FaqList";
import { Container, Eyebrow, Section } from "./Layout";
import Reveal from "./Reveal";
import type { Faq } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function FaqSection({
  items,
  title = (
    <>
      Veelgestelde <span className="text-gradient">vragen</span>
    </>
  ),
  lede = "Alles wat je wilt weten over samenwerken met Reactly. Staat je vraag er niet tussen? We helpen je graag persoonlijk.",
  all = true,
}: {
  items: Faq[];
  title?: React.ReactNode;
  lede?: string;
  all?: boolean;
}) {
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }} />
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow center={false}>FAQ</Eyebrow>
          <h2
            id="faq-title"
            className="mt-5 text-[2rem] font-semibold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[2.5rem] md:text-[3.25rem]"
          >
            {title}
          </h2>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink-muted md:text-[15.5px]">{lede}</p>

          <div className="card mt-8 max-w-md p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand-fg">
                <MessageCircle className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-[14px] font-semibold text-ink">Nog een vraag?</p>
                <p className="text-[12px] text-ink-subtle">We reageren binnen één werkdag.</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold">
              <a href={`mailto:${SITE.email}`} className="text-ink underline-offset-4 hover:text-brand-fg hover:underline">
                {SITE.email}
              </a>
              <a href={SITE.phone.href} className="text-ink underline-offset-4 hover:text-brand-fg hover:underline">
                {SITE.phone.display}
              </a>
            </div>
          </div>

          {all && (
            <Link
              href="/faq"
              className="group mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:text-brand-fg"
            >
              Alle veelgestelde vragen
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          )}
        </Reveal>

        <FaqList items={items} />
      </Container>
    </Section>
  );
}
