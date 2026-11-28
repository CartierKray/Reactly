/**
 * components/site/FaqList.tsx  (Server Component)
 *
 * Veelgestelde vragen als native <details>: werkt zonder JavaScript, is
 * toegankelijk en de antwoorden staan in de HTML (goed voor zoekmachines).
 * `name` zorgt dat er één tegelijk open staat; de hoogte animeert waar de
 * browser `interpolate-size` kent (zie globals.css). Met FAQPage-JSON-LD.
 */

import { Plus } from "lucide-react";

import Reveal from "./Reveal";
import { order } from "@/lib/motion";
import type { Faq } from "@/lib/content";
import { cn } from "@/lib/utils";

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export default function FaqList({ items, name = "faq", className }: { items: Faq[]; name?: string; className?: string }) {
  return (
    <Reveal group className={cn("space-y-3", className)}>
      {items.map((f, i) => (
        <details
          key={f.q}
          name={name}
          className="faq reveal-item group/faq card overflow-hidden transition-[border-color,box-shadow] duration-500 open:border-brand/40 open:shadow-card-hover"
          style={order(i, { "--stagger": "50ms" })}
        >
          <summary className="flex items-center justify-between gap-6 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:px-7 md:py-6">
            <span className="text-[14.5px] font-semibold leading-snug text-ink md:text-[15.5px]">{f.q}</span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface-sunken text-ink transition-all duration-500 ease-premium group-open/faq:rotate-45 group-open/faq:border-brand/40 group-open/faq:bg-brand group-open/faq:text-brand-contrast group-open/faq:shadow-glow">
              <Plus className="h-4 w-4" aria-hidden />
            </span>
          </summary>
          <p className="px-6 pb-6 pr-16 text-[13.5px] leading-relaxed text-ink-muted md:px-7 md:pb-7 md:text-[14.5px]">{f.a}</p>
        </details>
      ))}
    </Reveal>
  );
}
