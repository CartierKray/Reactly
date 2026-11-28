"use client";

/**
 * components/dashboard/charts.tsx
 *
 * Lichte SVG-grafieken voor het dashboard, zonder grafiekbibliotheek:
 *
 *  - TrendChart: opbrengst en kosten per dag (zelfde eenheid, één as), dunne
 *    lijnen van 2px, legenda + labels aan het eind van de lijn, kruisdraad met
 *    tooltip bij hover of tik, en een verborgen tabel voor schermlezers.
 *  - DayBars: één reeks per dag (bv. leads), afgeronde balktoppen, 2px ruimte
 *    tussen de balken, tooltip per balk.
 *  - BarList: horizontale balken voor een vergelijking op naam (kanalen,
 *    pijplijn), één kleur, waarden direct erbij.
 *
 * Kleuren uit het gevalideerde palet (blauw = opbrengst, oranje = kosten; in
 * licht en donker apart gestapt), tekst altijd in de teksttokens.
 */

import * as React from "react";

import { fmtDag, fmtEuro, fmtEuroKort, fmtGetal } from "./format";
import { cn } from "@/lib/utils";
import type { DayPoint } from "@/lib/dashboard/types";

/** Reeks-kleuren als CSS-variabelen, apart voor licht en donker. */
export const VIZ_VARS = "[--viz-1:#2a78d6] [--viz-2:#eb6834] dark:[--viz-1:#3987e5] dark:[--viz-2:#d95926]";

function useBreedte<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    setW(Math.round(el.getBoundingClientRect().width));
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function niceMax(v: number) {
  if (v <= 0) return 10;
  const exp = Math.pow(10, Math.floor(Math.log10(v)));
  const f = v / exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * exp;
}

/* ── Trend: opbrengst en kosten ────────────────────────────────────────── */

export function TrendChart({ days, height = 260 }: { days: DayPoint[]; height?: number }) {
  const [ref, w] = useBreedte<HTMLDivElement>();
  const [hover, setHover] = React.useState<number | null>(null);
  const pad = { l: 52, r: 78, t: 16, b: 28 };
  const iw = Math.max(0, w - pad.l - pad.r);
  const ih = height - pad.t - pad.b;
  const max = niceMax(Math.max(1, ...days.map((d) => Math.max(d.revenue, d.spend))));
  const x = (i: number) => pad.l + (days.length <= 1 ? iw / 2 : (i / (days.length - 1)) * iw);
  const y = (v: number) => pad.t + ih - (v / max) * ih;
  const pad2 = (key: "revenue" | "spend") => days.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(" ");
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const stap = Math.max(1, Math.ceil(days.length / Math.max(2, Math.floor(iw / 70))));
  const laatste = days.length - 1;

  const kies = (clientX: number, el: SVGSVGElement) => {
    const r = el.getBoundingClientRect();
    const rel = clientX - r.left - pad.l;
    const i = Math.round((rel / Math.max(1, iw)) * (days.length - 1));
    setHover(Math.max(0, Math.min(days.length - 1, i)));
  };

  const h = hover !== null ? days[hover] : null;

  return (
    <div className={cn("relative", VIZ_VARS)}>
      <div className="mb-3 flex flex-wrap items-center gap-4 text-[11.5px] text-ink-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-[3px] w-4 rounded-full bg-[var(--viz-1)]" />
          Opbrengst (conversiewaarde)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-[3px] w-4 rounded-full bg-[var(--viz-2)]" />
          Advertentiekosten
        </span>
      </div>
      <div ref={ref} className="relative w-full" style={{ height }}>
        {w > 0 && days.length > 0 && (
          <svg
            width={w}
            height={height}
            role="img"
            aria-label="Opbrengst en advertentiekosten per dag"
            className="touch-pan-y overflow-visible"
            onPointerMove={(e) => kies(e.clientX, e.currentTarget)}
            onPointerDown={(e) => kies(e.clientX, e.currentTarget)}
            onPointerLeave={() => setHover(null)}
          >
            {ticks.map((t) => (
              <g key={t}>
                <line x1={pad.l} x2={pad.l + iw} y1={y(t)} y2={y(t)} className="stroke-line" strokeWidth={1} strokeDasharray={t === 0 ? undefined : "2 4"} />
                <text x={pad.l - 10} y={y(t)} dy="0.32em" textAnchor="end" className="fill-ink-subtle text-[10.5px] tabular-nums">
                  {fmtEuroKort(t)}
                </text>
              </g>
            ))}
            {days.map((d, i) =>
              i % stap === 0 || i === laatste ? (
                <text key={d.date} x={x(i)} y={height - 8} textAnchor={i === 0 ? "start" : i === laatste ? "end" : "middle"} className="fill-ink-subtle text-[10.5px]">
                  {fmtDag(d.date)}
                </text>
              ) : null,
            )}
            <path d={pad2("spend")} fill="none" stroke="var(--viz-2)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            <path d={pad2("revenue")} fill="none" stroke="var(--viz-1)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {/* Labels aan het eind van de lijnen */}
            {(() => {
              const yr = y(days[laatste].revenue);
              const ys = y(days[laatste].spend);
              const dichtbij = Math.abs(yr - ys) < 14;
              return (
                <>
                  <text x={x(laatste) + 8} y={dichtbij ? Math.min(yr, ys) - 4 : yr} dy="0.32em" className="fill-ink text-[11px] font-medium">
                    Opbrengst
                  </text>
                  <text x={x(laatste) + 8} y={dichtbij ? Math.max(yr, ys) + 10 : ys} dy="0.32em" className="fill-ink-muted text-[11px]">
                    Kosten
                  </text>
                </>
              );
            })()}
            {h && hover !== null && (
              <g pointerEvents="none">
                <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={pad.t + ih} className="stroke-ink-subtle" strokeWidth={1} />
                <circle cx={x(hover)} cy={y(h.revenue)} r={4.5} fill="var(--viz-1)" className="stroke-surface" strokeWidth={2} />
                <circle cx={x(hover)} cy={y(h.spend)} r={4.5} fill="var(--viz-2)" className="stroke-surface" strokeWidth={2} />
              </g>
            )}
          </svg>
        )}
        {h && hover !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 min-w-[170px] rounded-xl border border-line bg-surface-elevated px-3 py-2.5 text-[11.5px] shadow-dialog"
            style={{ left: Math.min(Math.max(8, x(hover) + 12), Math.max(8, w - 190)) }}
          >
            <p className="font-semibold text-ink">{fmtDag(h.date)}</p>
            <p className="mt-1.5 flex items-center justify-between gap-4 text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--viz-1)]" />
                Opbrengst
              </span>
              <span className="font-medium text-ink tabular-nums">{fmtEuro(h.revenue)}</span>
            </p>
            <p className="mt-1 flex items-center justify-between gap-4 text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--viz-2)]" />
                Kosten
              </span>
              <span className="font-medium text-ink tabular-nums">{fmtEuro(h.spend)}</span>
            </p>
            <p className="mt-1 flex items-center justify-between gap-4 text-ink-muted">
              <span>ROAS</span>
              <span className="font-medium text-ink tabular-nums">{h.spend > 0 ? `${(h.revenue / h.spend).toFixed(1).replace(".", ",")}×` : "–"}</span>
            </p>
          </div>
        )}
      </div>
      <table className="sr-only">
        <caption>Opbrengst en advertentiekosten per dag</caption>
        <thead>
          <tr>
            <th>Dag</th>
            <th>Opbrengst</th>
            <th>Kosten</th>
          </tr>
        </thead>
        <tbody>
          {days.map((d) => (
            <tr key={d.date}>
              <td>{fmtDag(d.date)}</td>
              <td>{fmtEuro(d.revenue)}</td>
              <td>{fmtEuro(d.spend)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Balken per dag ────────────────────────────────────────────────────── */

export function DayBars({ days, value, label, height = 150 }: { days: DayPoint[]; value: (d: DayPoint) => number; label: string; height?: number }) {
  const [ref, w] = useBreedte<HTMLDivElement>();
  const [hover, setHover] = React.useState<number | null>(null);
  const pad = { l: 30, r: 6, t: 8, b: 22 };
  const iw = Math.max(0, w - pad.l - pad.r);
  const ih = height - pad.t - pad.b;
  const max = niceMax(Math.max(1, ...days.map(value)));
  const bw = days.length ? iw / days.length : 0;
  const breed = Math.max(1, bw - 2);
  const r = Math.min(4, breed / 2);
  const y = (v: number) => pad.t + ih - (v / max) * ih;
  const stap = Math.max(1, Math.ceil(days.length / Math.max(2, Math.floor(iw / 64))));

  return (
    <div className={cn("relative", VIZ_VARS)}>
      <div ref={ref} className="relative w-full" style={{ height }}>
        {w > 0 && (
          <svg width={w} height={height} role="img" aria-label={label} onPointerLeave={() => setHover(null)}>
            {[0, 0.5, 1].map((t) => (
              <g key={t}>
                <line x1={pad.l} x2={pad.l + iw} y1={y(t * max)} y2={y(t * max)} className="stroke-line" strokeDasharray={t === 0 ? undefined : "2 4"} />
                <text x={pad.l - 8} y={y(t * max)} dy="0.32em" textAnchor="end" className="fill-ink-subtle text-[10px] tabular-nums">
                  {fmtGetal(t * max)}
                </text>
              </g>
            ))}
            {days.map((d, i) => {
              const v = value(d);
              const top = y(v);
              const hgt = pad.t + ih - top;
              const bx = pad.l + i * bw + 1;
              const pad3 = hgt > r ? `M${bx},${pad.t + ih} V${top + r} Q${bx},${top} ${bx + r},${top} H${bx + breed - r} Q${bx + breed},${top} ${bx + breed},${top + r} V${pad.t + ih} Z` : `M${bx},${pad.t + ih} V${top} H${bx + breed} V${pad.t + ih} Z`;
              return (
                <g key={d.date}>
                  {v > 0 && <path d={pad3} fill="var(--viz-1)" opacity={hover === null || hover === i ? 1 : 0.45} />}
                  <rect x={pad.l + i * bw} y={pad.t} width={bw} height={ih} fill="transparent" onPointerEnter={() => setHover(i)} onPointerDown={() => setHover(i)} />
                  {(i % stap === 0 || i === days.length - 1) && (
                    <text x={pad.l + i * bw + bw / 2} y={height - 6} textAnchor="middle" className="fill-ink-subtle text-[10px]">
                      {fmtDag(d.date)}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}
        {hover !== null && days[hover] && (
          <div
            className="pointer-events-none absolute top-0 z-10 rounded-lg border border-line bg-surface-elevated px-2.5 py-1.5 text-[11.5px] shadow-dialog"
            style={{ left: Math.min(Math.max(0, pad.l + hover * bw + bw / 2 - 60), Math.max(0, w - 120)) }}
          >
            <span className="font-semibold text-ink">{fmtDag(days[hover].date)}</span>
            <span className="ml-2 text-ink-muted">
              {fmtGetal(value(days[hover]))} {label.toLowerCase()}
            </span>
          </div>
        )}
      </div>
      <table className="sr-only">
        <caption>{label} per dag</caption>
        <tbody>
          {days.map((d) => (
            <tr key={d.date}>
              <td>{fmtDag(d.date)}</td>
              <td>{fmtGetal(value(d))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Horizontale balken op naam ────────────────────────────────────────── */

export function BarList({ items, format }: { items: { label: string; value: number; sub?: string }[]; format: (n: number) => string }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <ul className={cn("space-y-3", VIZ_VARS)}>
      {items.map((it) => (
        <li key={it.label}>
          <div className="flex items-baseline justify-between gap-3 text-[12px]">
            <span className="font-medium text-ink">{it.label}</span>
            <span className="text-ink tabular-nums">
              {format(it.value)}
              {it.sub && <span className="ml-1.5 text-ink-subtle">{it.sub}</span>}
            </span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-surface-sunken">
            <div className="h-full rounded-full bg-[var(--viz-1)] transition-[width] duration-700 ease-premium" style={{ width: `${(it.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
