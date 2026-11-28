"use client";

/**
 * components/site/FaqExplorer.tsx
 *
 * Alle veelgestelde vragen met een zoekveld en categoriefilters. Zoekt in
 * vraag én antwoord. De vragen zelf zijn native <details>, net als FaqList.
 */

import * as React from "react";
import { Plus, Search, X } from "lucide-react";

import type { FaqGroup } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function FaqExplorer({ groups }: { groups: FaqGroup[] }) {
  const [query, setQuery] = React.useState("");
  const [cat, setCat] = React.useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const visible = groups
    .filter((g) => !cat || g.title === cat)
    .map((g) => ({ ...g, items: g.items.filter((f) => !q || `${f.q} ${f.a}`.toLowerCase().includes(q)) }))
    .filter((g) => g.items.length > 0);
  const count = visible.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <label htmlFor="faq-search" className="sr-only">
          Zoek een vraag
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" aria-hidden />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek een vraag…"
            className="w-full rounded-xl border border-line bg-surface py-3.5 pl-11 pr-10 text-[14px] text-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-brand/60 focus:shadow-[0_0_0_4px_hsl(var(--brand)/0.15)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Zoekopdracht wissen"
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-ink-subtle hover:bg-surface-sunken hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>

        <nav aria-label="Categorieën" className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          {[null, ...groups.map((g) => g.title)].map((t) => (
            <button
              key={t ?? "alle"}
              type="button"
              onClick={() => setCat(t)}
              aria-pressed={cat === t}
              className={cn(
                "rounded-full border px-4 py-2 text-left text-[12.5px] font-medium transition-all duration-300 lg:rounded-xl lg:border-transparent lg:px-4 lg:py-2.5",
                cat === t
                  ? "border-brand/40 bg-brand-soft text-brand-fg lg:border-l-2 lg:border-l-brand"
                  : "border-line text-ink-muted hover:bg-surface-sunken hover:text-ink",
              )}
            >
              {t ?? "Alle vragen"}
            </button>
          ))}
        </nav>
      </aside>

      <div>
        <p role="status" aria-live="polite" className="mb-6 text-[12px] text-ink-subtle">
          {count} {count === 1 ? "vraag" : "vragen"}
          {q && <> voor &ldquo;{query.trim()}&rdquo;</>}
        </p>

        {visible.length === 0 && (
          <div className="card p-10 text-center">
            <p className="text-[15.5px] font-semibold text-ink">Geen vragen gevonden</p>
            <p className="mt-2 text-[13.5px] text-ink-muted">Probeer een ander woord of stel je vraag direct aan ons team.</p>
          </div>
        )}

        <div className="space-y-12">
          {visible.map((g) => (
            <section key={g.title} aria-labelledby={`faq-${g.title}`}>
              <h2 id={`faq-${g.title}`} className="mb-4 text-[1.35rem] font-semibold tracking-[-0.02em] text-ink">
                {g.title}
              </h2>
              <div className="space-y-3">
                {g.items.map((f) => (
                  <details
                    key={f.q}
                    name="faq-all"
                    className="faq group/faq card overflow-hidden transition-[border-color,box-shadow] duration-500 open:border-brand/40 open:shadow-card-hover"
                  >
                    <summary className="flex items-center justify-between gap-6 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:px-7">
                      <span className="text-[14.5px] font-semibold leading-snug text-ink md:text-[15px]">{f.q}</span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface-sunken text-ink transition-all duration-500 ease-premium group-open/faq:rotate-45 group-open/faq:border-brand/40 group-open/faq:bg-brand group-open/faq:text-brand-contrast group-open/faq:shadow-glow">
                        <Plus className="h-4 w-4" aria-hidden />
                      </span>
                    </summary>
                    <p className="px-6 pb-6 pr-16 text-[13.5px] leading-relaxed text-ink-muted md:px-7 md:text-[14.5px]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
