/**
 * components/site/ServicesOverview.tsx  (Server Component)
 *
 * Dienstenpagina: elke dienst als kaart met een eigen anker
 * (/diensten#webdesign uit het megamenu en de footer landt precies goed),
 * en daaronder de pakketten per vakgebied met de overige mogelijkheden.
 */

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { IconTile } from "./Button";
import { Container, Section, SectionHeading } from "./Layout";
import Reveal from "./Reveal";
import { order } from "@/lib/motion";
import { PACKAGE_GROUPS, SERVICES, euro } from "@/lib/content";

export function ServiceGrid() {
  return (
    <Section aria-labelledby="alle-diensten" className="pt-16 md:pt-20">
      <Container>
        <h2 id="alle-diensten" className="sr-only">
          Alle diensten
        </h2>
        <Reveal group className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="reveal-item card glow-hover group flex scroll-mt-32 flex-col p-7 md:p-8"
              style={order(i, { "--stagger": "60ms" })}
            >
              <IconTile icon={s.icon} className="h-12 w-12" />
              <h3 className="mt-6 text-[1.4rem] font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
              <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.14em] text-brand-fg">{s.short}</p>
              <p className="mt-4 text-[14px] leading-relaxed text-ink-muted">{s.description}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-surface-sunken px-2.5 py-1 text-[10.5px] font-medium text-ink-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href={`/offerte?dienst=${s.id}`}
                className="mt-auto inline-flex items-center gap-2 pt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-brand-fg"
              >
                Vraag offerte aan
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export function Packages() {
  return (
    <Section id="pakketten" aria-labelledby="pakketten-title" className="scroll-mt-20 bg-surface-sunken/60">
      <Container>
        <Reveal>
          <SectionHeading
            id="pakketten-title"
            eyebrow="Pakketten"
            title={
              <>
                Snel van start met een <span className="text-gradient">vast pakket</span>
              </>
            }
            lede="Heldere pakketten voor de meest gevraagde trajecten. Liever volledig maatwerk? Dat kan altijd."
          />
        </Reveal>

        <div className="mt-16 space-y-20">
          {PACKAGE_GROUPS.map((g) => (
            <div key={g.key}>
              <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-[1.6rem] font-semibold tracking-[-0.02em] text-ink md:text-[2rem]">{g.label}</h3>
                  <p className="mt-2 max-w-xl text-[14px] text-ink-muted">{g.intro}</p>
                </div>
              </Reveal>

              <Reveal group className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
                {g.packages.map((p, i) => (
                  <div key={p.title} className="reveal-item card glow-hover group flex flex-col p-7" style={order(i)}>
                    <h4 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">{p.title}</h4>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{p.description}</p>
                    <p className="mt-6 flex items-baseline gap-2.5">
                      <span className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.03em] text-ink">{euro(p.price)}</span>
                      {p.oldPrice && <span className="text-[13px] text-ink-subtle line-through">{euro(p.oldPrice)}</span>}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-3 text-[13.5px] text-ink">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/[0.07] text-ink dark:bg-brand/15 dark:text-brand-fg">
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/offerte?pakket=${encodeURIComponent(p.title)}`} className="btn btn-outline mt-8 w-full">
                      Kies {p.title}
                    </Link>
                  </div>
                ))}
              </Reveal>

              <Reveal className="mt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle">Ook mogelijk</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.categories.map((c) => (
                    <li key={c} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12px] text-ink-muted transition-colors hover:border-brand/40 hover:text-ink">
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
