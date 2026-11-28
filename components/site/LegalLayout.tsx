/**
 * components/site/LegalLayout.tsx  (Server Component)
 *
 * Opmaak voor juridische pagina's: paginakop, een vaste inhoudsopgave op
 * desktop en rustig leesbare tekst met een prettige regellengte.
 */

import { Container, Section } from "./Layout";
import PageHero from "./PageHero";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

export default function LegalLayout({
  title,
  lede,
  updated,
  sections,
}: {
  title: string;
  lede: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: title }]} eyebrow="Juridisch" title={title} lede={lede} cube={false} />
      <Section className="pt-14 md:pt-16">
        <Container className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <nav aria-label="Inhoud" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle">Inhoud</p>
            <ol className="mt-4 space-y-1 border-l border-line">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[13px] text-ink-muted transition-colors hover:border-brand hover:text-ink"
                  >
                    <span className="mr-2 tabular-nums text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[11.5px] text-ink-subtle">Laatst bijgewerkt: {updated}</p>
          </nav>

          <article className="max-w-3xl space-y-12">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-32">
                <h2 className="flex items-baseline gap-3 text-[1.6rem] font-semibold tracking-[-0.02em] text-ink">
                  <span className="font-sans text-[12px] font-semibold tabular-nums text-brand-fg">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-[14.5px] leading-[1.75] text-ink-muted [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-fg [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {s.body}
                </div>
              </section>
            ))}
          </article>
        </Container>
      </Section>
    </>
  );
}
