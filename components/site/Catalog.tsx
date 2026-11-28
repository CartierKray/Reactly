"use client";

/**
 * components/site/Catalog.tsx
 *
 * De componentenbibliotheek: filter op templates of componentpakketten,
 * zoek op naam, en bekijk elk item als kaart met een in code getekende
 * preview, aantal onderdelen en prijs. Aanvragen gaat via het
 * contactformulier (het item staat dan al in het bericht).
 */

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Layers, Search } from "lucide-react";

import { CATALOG, type CatalogItem } from "@/lib/catalog";
import { euro } from "@/lib/content";
import { cn } from "@/lib/utils";

const FILTERS = [
  { key: "all", label: "Alles" },
  { key: "template", label: "Templates" },
  { key: "pack", label: "Componentpakketten" },
] as const;

export default function Catalog() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]["key"]>("all");
  const [query, setQuery] = React.useState("");
  const q = query.trim().toLowerCase();
  const items = CATALOG.filter(
    (it) => (filter === "all" || it.kind === filter) && (!q || `${it.title} ${it.description}`.toLowerCase().includes(q)),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Soort" className="inline-flex w-full rounded-2xl border border-line bg-surface-sunken p-1 md:w-auto">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              type="button"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex-1 rounded-xl px-4 py-2.5 text-[12px] font-semibold transition-all duration-300 md:flex-none md:px-5",
                filter === f.key ? "bg-surface text-ink shadow-card" : "text-ink-muted hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek in de bibliotheek…"
            aria-label="Zoek in de bibliotheek"
            className="w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-4 text-[13.5px] text-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-brand/60 focus:shadow-[0_0_0_4px_hsl(var(--brand)/0.15)]"
          />
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-[12px] text-ink-subtle">
        {items.length} {items.length === 1 ? "item" : "items"}
      </p>

      <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.title} className="enter" style={{ ["--i" as string]: i, ["--stagger" as string]: "50ms", ["--in-y" as string]: "14px" }}>
            <CatalogCard item={it} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <Link
      href={`/contact?pakket=${encodeURIComponent(item.title)}`}
      className="card glow-hover group flex h-full flex-col overflow-hidden p-3"
    >
      <Preview item={item} />
      <div className="flex flex-1 flex-col p-4 pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-line bg-surface-sunken px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            {item.kind === "template" ? "Template" : "Pakket"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-subtle">
            <Layers className="h-3.5 w-3.5" aria-hidden />
            {item.items} {item.items === 1 ? "onderdeel" : "onderdelen"}
          </span>
        </div>
        <h3 className="mt-4 text-[1.2rem] font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{item.description}</p>
        <div className="mt-auto flex items-end justify-between pt-6">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-ink">{euro(item.price)}</span>
            {item.oldPrice && <span className="text-[12px] text-ink-subtle line-through">{euro(item.oldPrice)}</span>}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors group-hover:text-brand-fg">
            Aanvragen
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Abstracte, per item gekleurde layout-preview. */
function Preview({ item }: { item: CatalogItem }) {
  const accent = `hsl(${item.hue} 100% 58%)`;
  const soft = `hsl(${item.hue} 100% 58% / 0.18)`;
  return (
    <div className="relative h-44 overflow-hidden rounded-2xl border border-line bg-surface-sunken p-4">
      <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl" style={{ background: soft }} />
      <div className="relative flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
      </div>
      {item.kind === "template" ? (
        <div className="relative mt-4 grid grid-cols-[1.3fr_1fr] gap-3 transition-transform duration-700 ease-premium group-hover:-translate-y-1">
          <div className="space-y-2">
            <div className="h-3 w-[85%] rounded bg-ink/70" />
            <div className="h-3 w-[60%] rounded bg-ink/70" />
            <div className="h-1.5 w-[80%] rounded-full bg-ink/15" />
            <div className="h-1.5 w-[55%] rounded-full bg-ink/15" />
            <div className="mt-3 h-5 w-16 rounded-md" style={{ background: accent }} />
          </div>
          <div className="h-20 rounded-lg" style={{ background: `linear-gradient(135deg, ${accent}, hsl(${item.hue + 40} 90% 65%))` }} />
          <div className="col-span-2 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((k) => (
              <div key={k} className="h-8 rounded-md border border-line bg-surface" />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative mt-4 grid grid-cols-3 gap-2 transition-transform duration-700 ease-premium group-hover:scale-[1.03]">
          {Array.from({ length: 6 }).map((_, k) => (
            <div
              key={k}
              className={cn("rounded-lg border border-line bg-surface p-2", k === 0 && "col-span-2 row-span-2")}
              style={k === 0 ? { background: `linear-gradient(135deg, ${soft}, transparent)` } : undefined}
            >
              <div className="h-1.5 w-6 rounded-full" style={{ background: accent }} />
              <div className="mt-1.5 h-1 w-full rounded-full bg-ink/10" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
