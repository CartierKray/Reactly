"use client";

/**
 * components/dashboard/Overview.tsx
 *
 * Het overzicht: kerncijfers (kosten, opbrengst, ROAS, leads, kosten per lead,
 * gewonnen omzet), opbrengst tegenover kosten per dag, leads per dag, de
 * verdeling over kanalen, de beste campagnes, de pijplijn en de nieuwste
 * leads. Ververst elke minuut vanzelf (alleen als het tabblad zichtbaar is).
 */

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Megaphone, RefreshCw, Users } from "lucide-react";

import { BarList, DayBars, TrendChart } from "./charts";
import { delta, fmtDatumTijd, fmtEuro, fmtGetal, fmtPct, fmtRoas } from "./format";
import { Card, ChannelMark, DemoBadge, Empty, Kpi, StatusPill } from "./ui";
import { LEAD_STATUSES, type DayPoint, type Overview as OverviewData } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

const RANGES = [7, 14, 30] as const;

function helften(days: DayPoint[]) {
  const half = Math.floor(days.length / 2);
  return [days.slice(0, half), days.slice(days.length - half)] as const;
}
const som = (d: DayPoint[], k: keyof Omit<DayPoint, "date">) => d.reduce((s, x) => s + x[k], 0);

export default function Overview({ initial }: { initial: OverviewData }) {
  const [data, setData] = React.useState(initial);
  const [range, setRange] = React.useState<number>(initial.rangeDays);
  const [laden, setLaden] = React.useState(false);

  const laad = React.useCallback(async (days: number, fresh = false) => {
    setLaden(true);
    try {
      const r = await fetch(`/api/dashboard/overview?days=${days}${fresh ? "&fresh=1" : ""}`, { cache: "no-store" });
      if (r.ok) setData(await r.json());
    } finally {
      setLaden(false);
    }
  }, []);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") void laad(range);
    }, 60_000);
    return () => window.clearInterval(id);
  }, [laad, range]);

  const [eerste, tweede] = helften(data.days);
  const ch = (k: keyof Omit<DayPoint, "date">) => delta(som(tweede, k), som(eerste, k));
  const roasNu = som(tweede, "spend") ? som(tweede, "revenue") / som(tweede, "spend") : 0;
  const roasVoor = som(eerste, "spend") ? som(eerste, "revenue") / som(eerste, "spend") : 0;
  const cplNu = som(tweede, "leads") ? som(tweede, "spend") / som(tweede, "leads") : 0;
  const cplVoor = som(eerste, "leads") ? som(eerste, "spend") / som(eerste, "leads") : 0;
  const halfDagen = Math.floor(data.days.length / 2);
  const hint = `vs. vorige ${halfDagen} dagen`;
  const niet = data.channels.filter((c) => c.demo).map((c) => c.name);
  if (data.leads.demo) niet.push("Resend (leads)");
  const top = data.campaigns.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Kop */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[1.6rem] leading-tight tracking-[-0.02em]">Groei-overzicht</h1>
          <p className="mt-1 flex items-center gap-2 text-[12px] text-ink-muted">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live · bijgewerkt {fmtDatumTijd(data.generatedAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div role="radiogroup" aria-label="Periode" className="flex rounded-xl border border-line bg-surface p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={range === r}
                onClick={() => {
                  setRange(r);
                  void laad(r);
                }}
                className={cn("rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors", range === r ? "bg-ink text-page" : "text-ink-muted hover:text-ink")}
              >
                {r} dagen
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => laad(range, true)}
            aria-label="Nu verversen"
            className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface text-ink-muted transition-colors hover:text-ink"
          >
            <RefreshCw className={cn("h-4 w-4", laden && "animate-spin")} aria-hidden />
          </button>
        </div>
      </div>

      {niet.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-line-strong bg-surface-sunken/60 px-4 py-3 text-[12.5px] text-ink-muted">
          <span className="flex items-center gap-2">
            <DemoBadge />
            Nog niet gekoppeld: {niet.join(", ")}. Daar zie je voorbeeldcijfers.
          </span>
          <Link href="/dashboard/instellingen" className="inline-flex items-center gap-1 font-semibold text-ink hover:underline">
            Koppelen
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      )}

      {/* Kerncijfers */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Advertentiekosten" value={fmtEuro(data.totals.spend)} change={ch("spend")} goodWhenUp={false} hint={hint} />
        <Kpi label="Opbrengst" value={fmtEuro(data.totals.revenue)} change={ch("revenue")} hint={hint} />
        <Kpi label="ROAS" value={fmtRoas(data.totals.roas)} change={delta(roasNu, roasVoor)} hint={hint} />
        <Kpi label="Leads uit ads" value={fmtGetal(data.totals.adLeads)} change={ch("leads")} hint={hint} />
        <Kpi label="Kosten per lead" value={data.totals.cpl === null ? "–" : fmtEuro(data.totals.cpl)} change={delta(cplNu, cplVoor)} goodWhenUp={false} hint={hint} />
        <Kpi label="Gewonnen omzet" value={fmtEuro(data.leads.wonValue)} change={null} hint={`${data.leads.won} deals gewonnen`} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card title="Opbrengst tegenover kosten" demo={data.channels.some((c) => c.demo)}>
          <TrendChart days={data.days} />
        </Card>
        <div className="grid gap-4">
          <Card title="Leads uit advertenties per dag" demo={data.channels.some((c) => c.demo)}>
            <DayBars days={data.days} value={(d) => d.leads} label="Leads" />
          </Card>
          <Card title="Kosten per kanaal">
            <BarList
              items={data.channels.map((c) => ({
                label: `${c.name}${c.demo ? " (voorbeeld)" : ""}`,
                value: c.spend,
                sub: c.spend > 0 ? `· ROAS ${fmtRoas(c.revenue > 0 ? c.revenue / c.spend : null)}` : undefined,
              }))}
              format={fmtEuro}
            />
          </Card>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card
          title="Best presterende campagnes"
          demo={top.some((c) => c.demo)}
          action={
            <Link href="/dashboard/campagnes" className="inline-flex items-center gap-1 text-[12px] font-medium text-ink-muted hover:text-ink">
              Alle campagnes
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          }
          bodyClassName="p-0"
        >
          {top.length === 0 ? (
            <Empty icon={Megaphone} title="Nog geen campagnes" text="Zodra je advertentieaccounts gekoppeld zijn, zie je hier je campagnes met ROAS en kosten per lead." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-[12.5px]">
                <thead className="text-[10.5px] uppercase tracking-[0.14em] text-ink-subtle">
                  <tr className="border-b border-line">
                    <th className="px-5 py-2.5 font-semibold">Campagne</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Kosten</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Leads</th>
                    <th className="px-3 py-2.5 text-right font-semibold">Per lead</th>
                    <th className="px-5 py-2.5 text-right font-semibold">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {top.map((c) => (
                    <tr key={`${c.channel}-${c.id}`} className="border-b border-line last:border-0">
                      <td className="px-5 py-3">
                        <p className="font-medium text-ink">{c.name}</p>
                        <p className="mt-0.5 flex items-center gap-2">
                          <ChannelMark channel={c.channel} />
                          <StatusPill status={c.status} />
                        </p>
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums">{fmtEuro(c.spend)}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{fmtGetal(c.leads)}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{c.cpl === null ? "–" : fmtEuro(c.cpl)}</td>
                      <td className="px-5 py-3 text-right">
                        <span className={cn("rounded-full px-2 py-0.5 text-[11.5px] font-semibold tabular-nums", (c.roas ?? 0) >= 3 ? "bg-success-soft text-success" : (c.roas ?? 0) >= 1.5 ? "bg-surface-sunken text-ink" : "bg-destructive-soft text-destructive")}>
                          {fmtRoas(c.roas)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <div className="grid gap-4">
          <Card title="Pijplijn" demo={data.leads.demo}>
            <BarList items={LEAD_STATUSES.map((s) => ({ label: s.label, value: data.leads.byStatus[s.id] ?? 0 }))} format={fmtGetal} />
            <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4 text-[12px]">
              <div>
                <dt className="text-ink-subtle">Open leads</dt>
                <dd className="mt-0.5 text-[1.05rem] font-medium tabular-nums">{fmtGetal(data.leads.open)}</dd>
              </div>
              <div>
                <dt className="text-ink-subtle">Offertes uitstaand</dt>
                <dd className="mt-0.5 text-[1.05rem] font-medium tabular-nums">{fmtEuro(data.leads.pipelineValue)}</dd>
              </div>
            </dl>
          </Card>
          <Card
            title="Nieuwste leads"
            demo={data.leads.demo}
            action={
              <Link href="/dashboard/leads" className="inline-flex items-center gap-1 text-[12px] font-medium text-ink-muted hover:text-ink">
                Alle leads
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            }
            bodyClassName="p-2"
          >
            {data.leads.recent.length === 0 ? (
              <Empty icon={Users} title="Nog geen leads" text="Nieuwe aanvragen via de website verschijnen hier automatisch." />
            ) : (
              <ul>
                {data.leads.recent.slice(0, 5).map((l) => (
                  <li key={l.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-sunken">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-semibold text-page">
                      {l.name
                        .split(/\s+/)
                        .map((x) => x[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-medium text-ink">{l.name}</span>
                      <span className="block truncate text-[11px] text-ink-subtle">
                        {l.source ?? "Website"}
                        {l.pakket ? ` · ${l.pakket}` : ""}
                      </span>
                    </span>
                    <span className="shrink-0 text-[10.5px] text-ink-subtle">{fmtDatumTijd(l.createdAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      <p className="text-[11px] text-ink-subtle">
        CTR {fmtPct(data.totals.ctr)} · {fmtGetal(data.totals.clicks)} klikken · {fmtGetal(data.totals.impressions)} vertoningen in de laatste {data.rangeDays} dagen.
      </p>
    </div>
  );
}
