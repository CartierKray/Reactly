"use client";

/**
 * components/dashboard/Leads.tsx
 *
 * De leads van de website (elke aanvraag wordt een contact in Resend) als
 * pijplijn: status en dealwaarde per lead, zoeken en filteren, en direct
 * bellen, WhatsAppen of mailen. Daaronder het importeren van een bestaande
 * lijst (bijvoorbeeld 6.000 leads uit een CSV) in een eigen segment, klaar om
 * met één klik te mailen.
 */

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, FileUp, Loader2, Mail, Phone, Search, Upload, Users } from "lucide-react";

import { fmtDatumTijd, fmtEuro } from "./format";
import { Card, DemoBadge, Empty } from "./ui";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { toast } from "@/components/ui/use-toast";
import { LEAD_STATUSES, type LeadRow, type LeadStatus } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

const waLink = (tel: string) => {
  let d = tel.replace(/[^\d+]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  else if (d.startsWith("00")) d = d.slice(2);
  else if (d.startsWith("0")) d = `31${d.slice(1)}`;
  return `https://wa.me/${d}`;
};

export default function Leads({ initial, demo, gekoppeld }: { initial: LeadRow[]; demo: boolean; gekoppeld: boolean }) {
  const [rows, setRows] = React.useState(initial);
  const [zoek, setZoek] = React.useState("");
  const [status, setStatus] = React.useState<LeadStatus | "alle">("alle");

  const zicht = rows.filter((r) => {
    if (status !== "alle" && r.status !== status) return false;
    const q = zoek.trim().toLowerCase();
    return !q || [r.name, r.email, r.company, r.pakket, r.services].some((v) => v?.toLowerCase().includes(q));
  });

  async function bewaar(r: LeadRow, patch: { status?: LeadStatus; value?: number }) {
    const vorige = rows;
    setRows((x) => x.map((y) => (y.id === r.id ? { ...y, ...patch } : y)));
    if (r.demo) return;
    try {
      const res = await fetch("/api/dashboard/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: r.email, ...patch }) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || "Opslaan mislukt");
    } catch (e) {
      setRows(vorige);
      toast({ title: "Niet opgeslagen", description: e instanceof Error ? e.message : "Onbekende fout", variant: "destructive" });
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[1.6rem] leading-tight tracking-[-0.02em]">Leads</h1>
          <p className="mt-1 text-[12.5px] text-ink-muted">Elke aanvraag via de website komt hier binnen, met bron, diensten en pakket.</p>
        </div>
        <Link href="/dashboard/mail" className="btn btn-outline btn-sm">
          <Mail className="h-4 w-4" aria-hidden />
          Mail je leads
        </Link>
      </div>

      <Card
        title="Website-aanvragen"
        demo={demo}
        bodyClassName="p-0"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-subtle" aria-hidden />
              <input value={zoek} onChange={(e) => setZoek(e.target.value)} placeholder="Zoek op naam, bedrijf…" aria-label="Zoek leads" className="w-48 rounded-lg border border-line bg-surface py-1.5 pl-8 pr-2 text-[12px]" />
            </label>
            <select value={status} onChange={(e) => setStatus(e.target.value as LeadStatus | "alle")} aria-label="Filter op status" className="rounded-lg border border-line bg-surface px-2 py-1.5 text-[12px]">
              <option value="alle">Alle statussen</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        }
      >
        {zicht.length === 0 ? (
          <Empty icon={Users} title={rows.length ? "Geen leads gevonden" : "Nog geen leads"} text={rows.length ? "Pas je zoekopdracht of filter aan." : "Nieuwe aanvragen via de website verschijnen hier automatisch."} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-[12.5px]">
              <thead className="text-[10.5px] uppercase tracking-[0.14em] text-ink-subtle">
                <tr className="border-b border-line">
                  <th className="px-5 py-3 font-semibold">Lead</th>
                  <th className="px-3 py-3 font-semibold">Aanvraag</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 text-right font-semibold">Waarde</th>
                  <th className="px-3 py-3 font-semibold">Binnen</th>
                  <th className="px-5 py-3 text-right font-semibold">Contact</th>
                </tr>
              </thead>
              <tbody>
                {zicht.map((r) => (
                  <tr key={r.id} className="border-b border-line last:border-0 hover:bg-surface-sunken/50">
                    <td className="px-5 py-3">
                      <p className="font-medium text-ink">{r.name}</p>
                      <p className="text-[11.5px] text-ink-subtle">
                        {r.company ? `${r.company} · ` : ""}
                        {r.email}
                      </p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-ink">{r.source ?? "Website"}</p>
                      <p className="max-w-[220px] truncate text-[11.5px] text-ink-subtle" title={[r.pakket, r.services].filter(Boolean).join(" · ")}>
                        {[r.pakket, r.services].filter(Boolean).join(" · ") || "–"}
                      </p>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={r.status}
                        onChange={(e) => bewaar(r, { status: e.target.value as LeadStatus })}
                        aria-label={`Status van ${r.name}`}
                        className={cn(
                          "rounded-lg border px-2 py-1 text-[12px] font-medium",
                          r.status === "gewonnen" ? "border-transparent bg-success-soft text-success" : r.status === "verloren" ? "border-line text-ink-subtle" : "border-line bg-surface text-ink",
                        )}
                      >
                        {LEAD_STATUSES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <WaardeVeld waarde={r.value} onSave={(v) => bewaar(r, { value: v })} />
                    </td>
                    <td className="px-3 py-3 text-[11.5px] text-ink-muted">{fmtDatumTijd(r.createdAt)}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <a href={`mailto:${r.email}`} aria-label={`Mail ${r.name}`} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-muted hover:bg-surface-sunken hover:text-ink">
                          <Mail className="h-3.5 w-3.5" aria-hidden />
                        </a>
                        {r.phone && (
                          <>
                            <a href={`tel:${r.phone.replace(/[^\d+]/g, "")}`} aria-label={`Bel ${r.name}`} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-muted hover:bg-surface-sunken hover:text-ink">
                              <Phone className="h-3.5 w-3.5" aria-hidden />
                            </a>
                            <a href={waLink(r.phone)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${r.name}`} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-muted hover:bg-surface-sunken hover:text-ink">
                              <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                            </a>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      {demo && (
        <p className="flex items-center gap-2 text-[11.5px] text-ink-subtle">
          <DemoBadge /> Koppel Resend in Instellingen; daarna komen echte aanvragen hier binnen en worden wijzigingen opgeslagen.
        </p>
      )}

      <Import gekoppeld={gekoppeld} />
    </div>
  );
}

function WaardeVeld({ waarde, onSave }: { waarde: number; onSave: (v: number) => void }) {
  const [edit, setEdit] = React.useState(false);
  const [v, setV] = React.useState(String(waarde || ""));
  if (!edit)
    return (
      <button type="button" onClick={() => setEdit(true)} className="rounded-md px-1.5 py-1 tabular-nums text-ink hover:bg-surface-sunken">
        {waarde ? fmtEuro(waarde) : <span className="text-ink-subtle">+ waarde</span>}
      </button>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setEdit(false);
        onSave(Math.max(0, Number(v.replace(/\./g, "").replace(",", ".")) || 0));
      }}
      className="inline-flex items-center gap-1"
    >
      <span className="text-ink-subtle">€</span>
      <input autoFocus inputMode="decimal" value={v} onChange={(e) => setV(e.target.value)} onBlur={(e) => e.currentTarget.form?.requestSubmit()} className="w-20 rounded-md border border-line bg-surface px-1.5 py-1 text-right text-[12px]" />
    </form>
  );
}

/** Kolommen uit de eerste regel van een CSV (komma of puntkomma). */
function kolommenUit(tekst: string): string[] {
  const eerste = tekst.split(/\r?\n/)[0] ?? "";
  const scheiding = (eerste.match(/;/g)?.length ?? 0) > (eerste.match(/,/g)?.length ?? 0) ? ";" : ",";
  return eerste.split(scheiding).map((c) => c.trim().replace(/^"|"$/g, "")).filter(Boolean);
}

function Import({ gekoppeld }: { gekoppeld: boolean }) {
  const [bestand, setBestand] = React.useState<File | null>(null);
  const [kolommen, setKolommen] = React.useState<string[]>([]);
  const [regels, setRegels] = React.useState(0);
  const [bezig, setBezig] = React.useState(false);
  const [klaar, setKlaar] = React.useState<string | null>(null);
  const [fout, setFout] = React.useState<string | null>(null);

  const kies = async (f: File | null) => {
    setBestand(f);
    setKlaar(null);
    setFout(null);
    if (!f) return setKolommen([]);
    const tekst = await f.text();
    setKolommen(kolommenUit(tekst));
    setRegels(Math.max(0, tekst.split(/\r?\n/).filter((l) => l.trim()).length - 1));
  };
  const raad = (woorden: string[]) => kolommen.find((k) => woorden.some((w) => k.toLowerCase().includes(w))) ?? "";

  async function verstuur(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!bestand) return;
    const fd = new FormData(e.currentTarget);
    fd.set("file", bestand);
    setBezig(true);
    setFout(null);
    try {
      const res = await fetch("/api/dashboard/import", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || "Importeren mislukt");
      setKlaar(String(fd.get("segment")));
    } catch (err) {
      setFout(err instanceof Error ? err.message : "Onbekende fout");
    } finally {
      setBezig(false);
    }
  }

  const veld = "w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-[13px] text-ink";
  const label = "mb-1 block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted";

  return (
    <Card title="Leads importeren">
      {klaar ? (
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" aria-hidden />
          <div>
            <p className="text-[13.5px] font-semibold">Import gestart in segment “{klaar}”</p>
            <p className="mt-1 text-[12.5px] text-ink-muted">Resend verwerkt de lijst op de achtergrond (bij {regels.toLocaleString("nl-NL")} regels meestal binnen enkele minuten). Daarna kies je dit segment bij Mail.</p>
            <Link href="/dashboard/mail" className="btn btn-primary btn-sm mt-3">
              <Mail className="h-4 w-4" aria-hidden />
              Mail dit segment
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={verstuur} className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
          <label className={cn("flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-8 text-center transition-colors", bestand ? "border-ink/40 bg-surface-sunken/60" : "border-line-strong hover:bg-surface-sunken/40")}>
            <input type="file" accept=".csv,text/csv" className="sr-only" onChange={(e) => kies(e.target.files?.[0] ?? null)} />
            {bestand ? <FileUp className="h-6 w-6" aria-hidden /> : <Upload className="h-6 w-6 text-ink-muted" aria-hidden />}
            <span className="mt-3 text-[13px] font-semibold">{bestand ? bestand.name : "Kies een CSV-bestand"}</span>
            <span className="mt-1 text-[11.5px] text-ink-muted">{bestand ? `${regels.toLocaleString("nl-NL")} regels · ${kolommen.length} kolommen` : "Bijvoorbeeld een export uit Excel, je CRM of Google Sheets"}</span>
          </label>
          <div className="grid gap-3">
            <label>
              <span className={label}>Segment</span>
              <input name="segment" required defaultValue="Leads-import" maxLength={80} className={veld} />
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["email", "E-mail", ["mail"]],
                ["firstName", "Voornaam", ["voornaam", "first", "naam", "name"]],
                ["lastName", "Achternaam", ["achternaam", "last", "surname"]],
              ].map(([naam, titel, woorden]) => (
                <label key={naam as string}>
                  <span className={label}>{titel as string}</span>
                  <select name={naam as string} key={`${naam}-${kolommen.join()}`} defaultValue={raad(woorden as string[])} required={naam === "email"} disabled={!kolommen.length} className={cn(veld, "px-2 text-[12px]")}>
                    <option value="">{naam === "email" ? "Kies…" : "Geen"}</option>
                    {kolommen.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <label className="flex items-start gap-2.5 rounded-xl border border-line bg-surface-sunken/50 px-3 py-2.5 text-[12px] leading-relaxed text-ink-muted">
              <input type="checkbox" name="consent" value="ja" required className="mt-0.5 h-4 w-4 shrink-0 rounded" />
              Ik bevestig dat deze contacten toestemming gaven voor e-mail of al klant zijn (AVG). Elke mailing krijgt automatisch een afmeldlink.
            </label>
            {fout && <p className="rounded-xl bg-destructive-soft px-4 py-3 text-[12.5px] text-destructive">{fout}</p>}
            <button type="submit" disabled={!bestand || bezig || !gekoppeld} className="btn btn-primary btn-sm w-full disabled:opacity-50">
              {bezig ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Upload className="h-4 w-4" aria-hidden />}
              Importeer {regels ? regels.toLocaleString("nl-NL") : ""} leads
            </button>
            {!gekoppeld && <p className="text-[11.5px] text-ink-subtle">Koppel eerst Resend (Instellingen) om te kunnen importeren.</p>}
          </div>
        </form>
      )}
    </Card>
  );
}
