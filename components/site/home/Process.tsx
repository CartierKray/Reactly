/**
 * components/site/home/Process.tsx  (Server Component)
 *
 * De werkwijze in vier stappen, verbonden door een gloeiende lijn. Op een
 * telefoon onder elkaar met een verticale lijn.
 */

import { Container, Glow, Section, SectionHeading } from "../Layout";
import Reveal from "../Reveal";
import { order } from "@/lib/motion";
import { PROCESS } from "@/lib/content";

export default function Process() {
  return (
    <Section id="werkwijze" aria-labelledby="werkwijze-title" className="overflow-hidden">
      <Glow />
      <Container>
        <Reveal>
          <SectionHeading
            id="werkwijze-title"
            eyebrow="Werkwijze"
            title={
              <>
                Van idee tot <span className="text-gradient">resultaat</span>
                <br className="hidden sm:block" /> in vier heldere stappen
              </>
            }
            lede="Snel, transparant en zonder verrassingen. Je weet altijd waar je staat en wat de volgende stap is."
          />
        </Reveal>

        <Reveal as="ol" group className="relative mt-16 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
          <span
            aria-hidden
            className="pointer-events-none absolute left-[12%] right-[12%] top-[52px] hidden h-px bg-gradient-to-r from-transparent via-ink/25 to-transparent dark:via-brand/60 lg:block"
          />
          {PROCESS.map((p, i) => (
            <li key={p.title} className="reveal-item card glow-hover group relative p-7 pt-8" style={order(i, { "--stagger": "120ms" })}>
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-ink/15 bg-surface-sunken text-[14px] font-semibold text-ink shadow-[0_0_0_6px_hsl(var(--surface)),0_10px_30px_-12px_rgb(var(--glow-rgb)/0.55)] dark:border-brand/30 dark:bg-brand-soft dark:text-brand-fg transition-transform duration-500 ease-premium group-hover:scale-110">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-[1.3rem] font-semibold tracking-[-0.02em] text-ink">{p.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">{p.text}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
