"use client";

/**
 * components/dashboard/Campaigns.tsx
 *
 * Alle campagnes van Meta en Google Ads in één tabel: sorteren, filteren op
 * kanaal, aan/uit zetten en het dagbudget aanpassen (direct in het
 * advertentieaccount). Plus "Nieuwe campagne": een Meta-campagne met
 * doelgroep en advertentie, klaargezet op gepauzeerd.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Check, Loader2, Pause, Pencil, Play, Plus, X } from "lucide-react";

import { fmtEuro, fmtGetal, fmtPct, fmtRoas } from "./format";
import { Card, ChannelMark, DemoBadge, StatusPill } from "./ui";
import { toast } from "@/components/ui/use-toast";
import type { CampaignRow } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

type Sort = "spend" | "roas" | "leads" | "cpl";

export default function Campaigns({ initial, metaGekoppeld }: { initial: CampaignRow[]; metaGekoppeld: boolean }) {
  const router = useRouter();
  const [rows, setRows] = React.useState(initial);
  const [filter, setFilter] = React.useState<"all" | "meta" | "google">("all");
  const [sort, setSort] = React.useState<Sort>("spend");
  const [bezig, setBezig] = React.useState<string | null>(null);
  const [budgetEdit, setBudgetEdit] = React.useState<{ id: string; waarde: string } | null>(null);
  const [nieuw, setNieuw] = React.useState(false);

  React.useEffect(() => setRows(initial), [initial]);

  const zicht = rows
    .filter((r) => filter === "all" || r.channel === filter)
    .sort((a, b) => {
      if (sort === "cpl") return (a.cpl ?? Infinity) - (b.cpl ?? Infinity);
      return ((b[sort] as number | null) ?? -1) - ((a[sort] as number | null) ?? -1);
    });

  async function wijzig(r: CampaignRow, body: Record<string, unknown>, melding: string) {
    setBezig(r.id);
    try {
      const res = await fetch("/api/dashboard/campaigns", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel: r.channel, id: r.id, budgetRef: r.budgetRef, ...body }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || "Wijzigen mislukt");
      toast({ title: melding, description: r.name });
      setRows((x) =>
        x.map((y) =>
          y.id === r.id && y.channel === r.channel
            ? {
                ...y,
                ...(typeof body.active === "boolean" ? { status: body.active ? "active" : "paused", statusLabel: body.active ? "actief" : "gepauzeerd" } : {}),
                ...(typeof body.budget === "number" ? { dailyBudget: body.budget } : {}),
              }
            : y,
        ),
      );
      router.refresh();
    } catch (e) {
      toast({ title: "Niet gelukt", description: e instanceof Error ? e.message : "Onbekende fout", variant: "destructive" });
    } finally {
      setBezig(null);
      setBudgetEdit(null);
    }
  }

  const demo = rows.some((r) => r.demo);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[1.6rem] leading-tight tracking-[-0.02em]">Campagnes</h1>
          <p className="mt-1 text-[12.5px] text-ink-muted">Laatste 30 dagen · wijzigingen gaan direct naar je advertentieaccount.</p>
        </div>
        <button type="button" onClick={() => setNieuw(true)} className="btn btn-primary btn-sm">
          <Plus className="h-4 w-4" aria-hidden />
          Nieuwe campagne
        </button>
      </div>

      {nieuw && <NieuweCampagne gekoppeld={metaGekoppeld} onClose={() => setNieuw(false)} />}

      <Card
        title="Alle campagnes"
        demo={demo}
        bodyClassName="p-0"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div role="radiogroup" aria-label="Kanaal" className="flex rounded-lg border border-line p-0.5">
              {(["all", "meta", "google"] as const).map((f) => (
                <button key={f} type="button" role="radio" aria-checked={filter === f} onClick={() => setFilter(f)} className={cn("rounded-md px-2.5 py-1 text-[11.5px] font-medium", filter === f ? "bg-ink text-page" : "text-ink-muted hover:text-ink")}>
                  {f === "all" ? "Alles" : f === "meta" ? "Meta" : "Google"}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-1.5 text-[11.5px] text-ink-muted">
              Sorteer
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="rounded-lg border border-line bg-surface px-2 py-1 text-[11.5px] text-ink">
                <option value="spend">Kosten</option>
                <option value="roas">ROAS</option>
                <option value="leads">Leads</option>
                <option value="cpl">Kosten per lead</option>
              </select>
            </label>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-[12.5px]">
            <thead className="text-[10.5px] uppercase tracking-[0.14em] text-ink-subtle">
              <tr className="border-b border-line">
                <th className="px-5 py-3 font-semibold">Campagne</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 text-right font-semibold">Dagbudget</th>
                <th className="px-3 py-3 text-right font-semibold">Kosten</th>
                <th className="px-3 py-3 text-right font-semibold">Klikken</th>
                <th className="px-3 py-3 text-right font-semibold">CTR</th>
                <th className="px-3 py-3 text-right font-semibold">Leads</th>
                <th className="px-3 py-3 text-right font-semibold">Per lead</th>
                <th className="px-3 py-3 text-right font-semibold">ROAS</th>
                <th className="px-5 py-3 text-right font-semibold">Actie</th>
              </tr>
            </thead>
            <tbody>
              {zicht.map((r) => {
                const key = `${r.channel}-${r.id}`;
                const editing = budgetEdit?.id === key;
                return (
                  <tr key={key} className="border-b border-line last:border-0 hover:bg-surface-sunken/50">
                    <td className="px-5 py-3">
                      <p className="max-w-[260px] truncate font-medium text-ink" title={r.name}>
                        {r.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-2">
                        <ChannelMark channel={r.channel} />
                        {r.objective && <span className="text-[10.5px] text-ink-subtle">{r.objective.replace(/^outcome_/i, "").toLowerCase()}</span>}
                      </p>
                    </td>
                    <td className="px-3 py-3">
                      <StatusPill status={r.status} />
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">
                      {editing ? (
                        <form
                          className="flex items-center justify-end gap-1"
                          onSubmit={(e) => {
                            e.preventDefault();
                            const v = Number(budgetEdit!.waarde.replace(",", "."));
                            if (v > 0) void wijzig(r, { budget: v }, `Dagbudget ingesteld op ${fmtEuro(v)}`);
                          }}
                        >
                          <span className="text-ink-subtle">€</span>
                          <input autoFocus inputMode="decimal" value={budgetEdit!.waarde} onChange={(e) => setBudgetEdit({ id: key, waarde: e.target.value })} className="w-16 rounded-md border border-line bg-surface px-1.5 py-1 text-right text-[12px]" />
                          <button type="submit" aria-label="Opslaan" className="grid h-7 w-7 place-items-center rounded-md hover:bg-surface-sunken">
                            <Check className="h-3.5 w-3.5" aria-hidden />
                          </button>
                          <button type="button" aria-label="Annuleren" onClick={() => setBudgetEdit(null)} className="grid h-7 w-7 place-items-center rounded-md hover:bg-surface-sunken">
                            <X className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </form>
                      ) : r.dailyBudget !== null ? (
                        <button type="button" onClick={() => setBudgetEdit({ id: key, waarde: String(r.dailyBudget) })} className="group inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 hover:bg-surface-sunken">
                          {fmtEuro(r.dailyBudget)}
                          <Pencil className="h-3 w-3 text-ink-subtle opacity-0 group-hover:opacity-100" aria-hidden />
                        </button>
                      ) : (
                        <span className="text-ink-subtle">per set</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">{fmtEuro(r.spend)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{fmtGetal(r.clicks)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{fmtPct(r.ctr)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{fmtGetal(r.leads)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{r.cpl === null ? "–" : fmtEuro(r.cpl)}</td>
                    <td className="px-3 py-3 text-right">
                      <span className={cn("rounded-full px-2 py-0.5 text-[11.5px] font-semibold tabular-nums", (r.roas ?? 0) >= 3 ? "bg-success-soft text-success" : (r.roas ?? 0) >= 1.5 ? "bg-surface-sunken text-ink" : "bg-destructive-soft text-destructive")}>
                        {fmtRoas(r.roas)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        type="button"
                        disabled={bezig === r.id || r.status === "other"}
                        onClick={() => wijzig(r, { active: r.status !== "active" }, r.status === "active" ? "Campagne gepauzeerd" : "Campagne geactiveerd")}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 text-[11.5px] font-medium text-ink transition-colors hover:bg-surface-sunken disabled:opacity-40"
                      >
                        {bezig === r.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : r.status === "active" ? <Pause className="h-3.5 w-3.5" aria-hidden /> : <Play className="h-3.5 w-3.5" aria-hidden />}
                        {r.status === "active" ? "Pauzeer" : "Activeer"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      {demo && (
        <p className="flex items-center gap-2 text-[11.5px] text-ink-subtle">
          <DemoBadge /> Acties werken zodra het advertentieaccount gekoppeld is (Instellingen).
        </p>
      )}
    </div>
  );
}

const CTAS = [
  ["LEARN_MORE", "Meer informatie"],
  ["CONTACT_US", "Neem contact op"],
  ["GET_QUOTE", "Offerte aanvragen"],
  ["SIGN_UP", "Aanmelden"],
  ["BOOK_TRAVEL", "Boek nu"],
] as const;

function NieuweCampagne({ gekoppeld, onClose }: { gekoppeld: boolean; onClose: () => void }) {
  const [bezig, setBezig] = React.useState(false);
  const [klaar, setKlaar] = React.useState<{ adsManager: string } | null>(null);
  const [fout, setFout] = React.useState<string | null>(null);
  const veld = "w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-[13px] text-ink outline-none focus:border-ink/40";
  const label = "mb-1 block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted";

  async function verstuur(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setBezig(true);
    setFout(null);
    try {
      const res = await fetch("/api/dashboard/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          objective: f.objective,
          dailyBudget: Number(f.dailyBudget.replace(",", ".")),
          link: f.link,
          headline: f.headline,
          primaryText: f.primaryText,
          description: f.description,
          imageUrl: f.imageUrl,
          cta: f.cta,
          countries: ["NL", ...(f.be === "on" ? ["BE"] : [])],
          ageMin: Number(f.ageMin),
          ageMax: Number(f.ageMax),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || "Aanmaken mislukt");
      setKlaar({ adsManager: data.adsManager });
    } catch (err) {
      setFout(err instanceof Error ? err.message : "Onbekende fout");
    } finally {
      setBezig(false);
    }
  }

  return (
    <Card title="Nieuwe Meta-campagne" action={<button type="button" onClick={onClose} aria-label="Sluiten" className="grid h-8 w-8 place-items-center rounded-lg hover:bg-surface-sunken"><X className="h-4 w-4" aria-hidden /></button>}>
      {!gekoppeld && (
        <p className="mb-4 rounded-xl border border-dashed border-line-strong bg-surface-sunken/60 px-4 py-3 text-[12.5px] text-ink-muted">
          Meta Ads is nog niet gekoppeld. Vul eerst META_ACCESS_TOKEN, META_AD_ACCOUNT_ID en META_PAGE_ID in (Instellingen); daarna kun je hier campagnes klaarzetten.
        </p>
      )}
      {klaar ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-[14px] font-semibold">Campagne klaargezet, gepauzeerd</p>
          <p className="text-[12.5px] text-ink-muted">Controleer hem in Ads Manager en zet hem daar (of hier in de tabel) aan als alles klopt.</p>
          <a href={klaar.adsManager} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            Open in Ads Manager
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      ) : (
        <form onSubmit={verstuur} className="grid gap-3.5 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className={label}>Naam</span>
            <input name="name" required maxLength={120} placeholder="Websites vanaf € 499 · december" className={veld} />
          </label>
          <label>
            <span className={label}>Doel</span>
            <select name="objective" className={veld} defaultValue="OUTCOME_LEADS">
              <option value="OUTCOME_LEADS">Leads (aanvragen op de site)</option>
              <option value="OUTCOME_TRAFFIC">Verkeer naar de site</option>
            </select>
          </label>
          <label>
            <span className={label}>Dagbudget (€)</span>
            <input name="dailyBudget" required inputMode="decimal" defaultValue="25" className={veld} />
          </label>
          <label className="md:col-span-2">
            <span className={label}>Landingspagina</span>
            <input name="link" type="url" required defaultValue="https://www.reactly.nl/prijzen" className={veld} />
          </label>
          <label>
            <span className={label}>Kop</span>
            <input name="headline" required maxLength={255} placeholder="Jouw website vanaf € 499" className={veld} />
          </label>
          <label>
            <span className={label}>Knop</span>
            <select name="cta" className={veld} defaultValue="GET_QUOTE">
              {CTAS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="md:col-span-2">
            <span className={label}>Advertentietekst</span>
            <textarea name="primaryText" required rows={3} maxLength={2000} placeholder="Een premium website die klanten oplevert, met AI die dag en nacht leads binnenhaalt. Binnen 24 uur een voorstel." className={`${veld} resize-y`} />
          </label>
          <label className="md:col-span-2">
            <span className={label}>Beschrijving (optioneel)</span>
            <input name="description" maxLength={255} placeholder="Offerte binnen 24 uur · 4,8 op Trustpilot" className={veld} />
          </label>
          <label className="md:col-span-2">
            <span className={label}>Afbeelding (https-link, minimaal 1080×1080)</span>
            <input name="imageUrl" type="url" required placeholder="https://…/advertentie.jpg" className={veld} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className={label}>Leeftijd vanaf</span>
              <input name="ageMin" type="number" min={18} max={64} defaultValue={25} className={veld} />
            </label>
            <label>
              <span className={label}>Tot</span>
              <input name="ageMax" type="number" min={19} max={65} defaultValue={65} className={veld} />
            </label>
          </div>
          <label className="flex items-center gap-2 self-end pb-2.5 text-[12.5px] text-ink">
            <input type="checkbox" name="be" className="h-4 w-4 rounded" />
            Ook België
          </label>
          {fout && <p className="rounded-xl bg-destructive-soft px-4 py-3 text-[12.5px] text-destructive md:col-span-2">{fout}</p>}
          <div className="flex flex-wrap items-center gap-3 md:col-span-2">
            <button type="submit" disabled={bezig || !gekoppeld} className="btn btn-primary btn-sm disabled:opacity-50">
              {bezig ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
              Klaarzetten (gepauzeerd)
            </button>
            <p className="text-[11.5px] text-ink-subtle">Er gaat niets live: alles wordt gepauzeerd aangemaakt.</p>
          </div>
        </form>
      )}
    </Card>
  );
}
