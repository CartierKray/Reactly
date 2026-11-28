"use client";

/**
 * components/dashboard/Mail.tsx
 *
 * Mailen vanuit het dashboard, via Resend:
 *  - "Mailing": één klik naar een heel segment (bijv. je 6.000 leads), nu of
 *    op een gekozen moment; afmeldlink en persoonlijke aanhef gaan vanzelf;
 *  - "Losse mail of uitnodiging": naar één of enkele adressen;
 *  - kant-en-klare sjablonen (nieuwsbrief, actie, uitnodiging, opvolging),
 *    een live voorbeeld zoals de ontvanger hem ziet en een testmail naar jezelf.
 */

import * as React from "react";
import { CalendarClock, CheckCircle2, Eye, Loader2, Send, Sparkles, TestTube2, Users } from "lucide-react";

import { fmtDatumTijd } from "./format";
import { Card, Empty } from "./ui";
import { toast } from "@/components/ui/use-toast";
import { mailHtml } from "@/lib/dashboard/mail";
import { cn } from "@/lib/utils";

type Segment = { id: string; name: string; contacts_count?: number };
type Broadcast = { id: string; name?: string | null; subject?: string | null; status?: string; created_at?: string; sent_at?: string | null; scheduled_at?: string | null };

type SjabloonId = "nieuwsbrief" | "actie" | "uitnodiging" | "opvolging";
type Sjabloon = { label: string; subject: string; heading: string; body: string; ctaLabel: string; ctaUrl: string };

const SJABLONEN: Record<SjabloonId, Sjabloon> = {
  nieuwsbrief: {
    label: "Nieuwsbrief",
    subject: "3 manieren om meer uit je website te halen",
    heading: "Meer klanten uit je website, deze maand",
    body: "Hoi {{voornaam}},\n\nDeze maand delen we drie dingen die direct effect hebben op het aantal aanvragen via je website:\n\n**1. Snelheid.** Elke seconde laadtijd kost conversie. Een snelle site scoort beter in Google én bij bezoekers.\n\n**2. Eén duidelijke actie.** Laat bezoekers precies weten wat de volgende stap is.\n\n**3. AI die meedenkt.** Een chatbot beantwoordt vragen ook 's avonds en legt leads voor je vast.\n\nBenieuwd wat dit voor jouw site betekent? We kijken graag gratis mee.",
    ctaLabel: "Vraag een gratis website-scan aan",
    ctaUrl: "https://www.reactly.nl/prijzen#scan",
  },
  actie: {
    label: "Actie",
    subject: "Jouw nieuwe website vanaf € 499",
    heading: "Een premium website, vanaf € 499",
    body: "Hoi {{voornaam}},\n\nEen website die er strak uitziet én klanten oplevert hoeft niet duur te zijn. Met ons Start-pakket sta je snel online met een one-pager op maat, mobielvriendelijk en vindbaar in Google.\n\nWil je meer? Breid uit met een AI-chatbot die dag en nacht vragen beantwoordt en leads vastlegt.\n\nBinnen 24 uur heb je een voorstel op maat.",
    ctaLabel: "Bekijk de pakketten",
    ctaUrl: "https://www.reactly.nl/prijzen",
  },
  uitnodiging: {
    label: "Uitnodiging",
    subject: "Uitnodiging: gratis strategiegesprek",
    heading: "Je bent uitgenodigd",
    body: "Hoi {{voornaam}},\n\nGraag nodigen we je uit voor een vrijblijvend strategiegesprek van 30 minuten. We kijken samen naar je website en marketing en laten zien waar de snelste groeikansen liggen.\n\nKies zelf een moment dat jou uitkomt; online of bij ons op kantoor in Velsen-Noord.",
    ctaLabel: "Plan je gesprek",
    ctaUrl: "https://www.reactly.nl/contact",
  },
  opvolging: {
    label: "Opvolging",
    subject: "Even checken over je aanvraag",
    heading: "",
    body: "Hoi {{voornaam}},\n\nOnlangs vroeg je bij ons informatie aan. Ik wilde even checken of je nog vragen hebt, of dat we je verder kunnen helpen met een voorstel.\n\nJe kunt simpelweg op deze mail reageren, of ons bellen of WhatsAppen op +31 6 18 89 13 46.",
    ctaLabel: "",
    ctaUrl: "",
  },
};

export default function Mail({ initialTo }: { initialTo?: string }) {
  const [modus, setModus] = React.useState<"broadcast" | "single">(initialTo ? "single" : "broadcast");
  const [sjabloon, setSjabloon] = React.useState<SjabloonId>("nieuwsbrief");
  const [m, setM] = React.useState<Sjabloon & { preheader: string }>({ ...SJABLONEN.nieuwsbrief, preheader: "" });
  const [to, setTo] = React.useState(initialTo ?? "");
  const [testAan, setTestAan] = React.useState("");
  const [segmentId, setSegmentId] = React.useState("");
  const [inplannen, setInplannen] = React.useState(false);
  const [wanneer, setWanneer] = React.useState("");
  const [data, setData] = React.useState<{ connected: boolean; segments: Segment[]; broadcasts: Broadcast[]; error?: string } | null>(null);
  const [bezig, setBezig] = React.useState<"test" | "send" | null>(null);
  const [bevestig, setBevestig] = React.useState(false);

  const laad = React.useCallback(async () => {
    const r = await fetch("/api/dashboard/mail", { cache: "no-store" });
    setData(await r.json());
  }, []);
  React.useEffect(() => void laad(), [laad]);
  React.useEffect(() => {
    if (!segmentId && data?.segments?.length) setSegmentId(data.segments[0].id);
  }, [data, segmentId]);

  const kies = (id: SjabloonId) => {
    setSjabloon(id);
    setM({ ...SJABLONEN[id], preheader: "" });
  };

  // In het voorbeeld een voorbeeldnaam in plaats van de Resend-placeholders.
  const voorbeeld = React.useMemo(
    () =>
      mailHtml({ ...m, broadcast: modus === "broadcast" })
        .replace(/\{\{\{contact\.first_name\|daar\}\}\}/g, "Sanne")
        .replace(/\{\{\{RESEND_UNSUBSCRIBE_URL\}\}\}/g, "#"),
    [m, modus],
  );
  const segment = data?.segments.find((s) => s.id === segmentId);

  async function post(body: Record<string, unknown>) {
    const res = await fetch("/api/dashboard/mail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...m, ...body }) });
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.message || "Versturen mislukt");
    return json;
  }

  async function test() {
    setBezig("test");
    try {
      await post({ mode: "test", to: testAan });
      toast({ title: "Testmail verstuurd", description: testAan });
    } catch (e) {
      toast({ title: "Test niet verstuurd", description: e instanceof Error ? e.message : "Onbekende fout", variant: "destructive" });
    } finally {
      setBezig(null);
    }
  }

  async function verstuur() {
    setBezig("send");
    try {
      if (modus === "single") {
        await post({ mode: "single", to });
        toast({ title: "Mail verstuurd", description: to });
      } else {
        const r = await post({ mode: "broadcast", segmentId, scheduledAt: inplannen && wanneer ? new Date(wanneer).toISOString() : undefined, name: m.subject });
        toast({ title: r.scheduled ? "Mailing ingepland" : "Mailing wordt verstuurd", description: segment?.name });
        void laad();
      }
      setBevestig(false);
    } catch (e) {
      toast({ title: "Niet verstuurd", description: e instanceof Error ? e.message : "Onbekende fout", variant: "destructive" });
    } finally {
      setBezig(null);
    }
  }

  const veld = "w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-[13px] text-ink outline-none focus:border-ink/40";
  const label = "mb-1 block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted";
  const nietGekoppeld = data && !data.connected;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[1.6rem] leading-tight tracking-[-0.02em]">Mail</h1>
        <p className="mt-1 text-[12.5px] text-ink-muted">Mailings naar je leads en klanten, uitnodigingen en losse mails, in de huisstijl van Reactly.</p>
      </div>

      {nietGekoppeld && (
        <p className="rounded-2xl border border-dashed border-line-strong bg-surface-sunken/60 px-4 py-3 text-[12.5px] text-ink-muted">
          Resend is nog niet gekoppeld{data?.error ? ` (${data.error})` : ""}. Zet RESEND_API_KEY en DASHBOARD_MAIL_FROM in Vercel om te kunnen versturen; het opstellen en het voorbeeld werken al.
        </p>
      )}

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card title="Opstellen">
          <div role="radiogroup" aria-label="Soort mail" className="mb-5 grid grid-cols-2 gap-2">
            {[
              { id: "broadcast", titel: "Mailing aan een segment", sub: "Eén klik, honderden of duizenden ontvangers", icon: Users },
              { id: "single", titel: "Losse mail of uitnodiging", sub: "Naar één of enkele adressen", icon: Send },
            ].map(({ id, titel, sub, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={modus === id}
                onClick={() => setModus(id as "broadcast" | "single")}
                className={cn("rounded-xl border p-3 text-left transition-all", modus === id ? "border-ink/80 bg-surface-sunken dark:border-brand/70" : "border-line hover:border-line-strong")}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span className="mt-2 block text-[12.5px] font-semibold">{titel}</span>
                <span className="block text-[11px] text-ink-muted">{sub}</span>
              </button>
            ))}
          </div>

          <p className={label}>Sjabloon</p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {(Object.keys(SJABLONEN) as SjabloonId[]).map((id) => (
              <button key={id} type="button" onClick={() => kies(id)} className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium", sjabloon === id ? "border-ink bg-ink text-page" : "border-line text-ink-muted hover:text-ink")}>
                {sjabloon === id && <Sparkles className="h-3 w-3" aria-hidden />}
                {SJABLONEN[id].label}
              </button>
            ))}
          </div>

          <div className="grid gap-3">
            {modus === "broadcast" ? (
              <label>
                <span className={label}>Segment</span>
                <select value={segmentId} onChange={(e) => setSegmentId(e.target.value)} className={veld} disabled={!data?.segments.length}>
                  {!data?.segments.length && <option value="">Nog geen segmenten (importeer leads bij Leads)</option>}
                  {data?.segments.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                      {typeof s.contacts_count === "number" ? ` · ${s.contacts_count.toLocaleString("nl-NL")} contacten` : ""}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <label>
                <span className={label}>Aan</span>
                <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="naam@bedrijf.nl, tweede@bedrijf.nl" className={veld} />
              </label>
            )}
            <label>
              <span className={label}>Onderwerp</span>
              <input value={m.subject} onChange={(e) => setM({ ...m, subject: e.target.value })} maxLength={200} className={veld} />
            </label>
            <label>
              <span className={label}>Voorvertoning in de inbox (optioneel)</span>
              <input value={m.preheader} onChange={(e) => setM({ ...m, preheader: e.target.value })} maxLength={150} placeholder="Korte zin naast het onderwerp" className={veld} />
            </label>
            <label>
              <span className={label}>Kop (optioneel)</span>
              <input value={m.heading} onChange={(e) => setM({ ...m, heading: e.target.value })} maxLength={140} className={veld} />
            </label>
            <label>
              <span className={label}>Bericht</span>
              <textarea value={m.body} onChange={(e) => setM({ ...m, body: e.target.value })} rows={9} className={cn(veld, "resize-y leading-relaxed")} />
              <span className="mt-1 block text-[11px] text-ink-subtle">Lege regel = nieuwe alinea · **vet** · {"{{voornaam}}"} = voornaam van de ontvanger</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className={label}>Knoptekst</span>
                <input value={m.ctaLabel} onChange={(e) => setM({ ...m, ctaLabel: e.target.value })} maxLength={60} className={veld} />
              </label>
              <label>
                <span className={label}>Knoplink</span>
                <input value={m.ctaUrl} onChange={(e) => setM({ ...m, ctaUrl: e.target.value })} placeholder="https://" className={veld} />
              </label>
            </div>

            {modus === "broadcast" && (
              <label className="flex flex-wrap items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-[12.5px]">
                <input type="checkbox" checked={inplannen} onChange={(e) => setInplannen(e.target.checked)} className="h-4 w-4 rounded" />
                <CalendarClock className="h-4 w-4 text-ink-muted" aria-hidden />
                Inplannen
                {inplannen && <input type="datetime-local" value={wanneer} onChange={(e) => setWanneer(e.target.value)} className="ml-auto rounded-lg border border-line bg-surface px-2 py-1 text-[12px]" />}
              </label>
            )}

            <div className="mt-1 grid gap-2 sm:grid-cols-[1fr_auto]">
              <input value={testAan} onChange={(e) => setTestAan(e.target.value)} placeholder="Testmail naar (jouw adres)" className={veld} />
              <button type="button" onClick={test} disabled={!testAan || bezig !== null || nietGekoppeld === true} className="btn btn-outline btn-sm disabled:opacity-50">
                {bezig === "test" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <TestTube2 className="h-4 w-4" aria-hidden />}
                Test
              </button>
            </div>

            {!bevestig ? (
              <button
                type="button"
                onClick={() => setBevestig(true)}
                disabled={bezig !== null || nietGekoppeld === true || (modus === "broadcast" ? !segmentId : !to.trim()) || !m.subject.trim() || !m.body.trim()}
                className="btn btn-primary w-full disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden />
                {modus === "broadcast" ? (inplannen ? "Mailing inplannen" : "Mailing versturen") : "Mail versturen"}
              </button>
            ) : (
              <div className="rounded-xl border border-ink/30 bg-surface-sunken p-3">
                <p className="text-[12.5px] text-ink">
                  {modus === "broadcast"
                    ? `Weet je het zeker? Deze mailing gaat naar alle aangemelde contacten in “${segment?.name ?? "het segment"}”${inplannen && wanneer ? ` op ${fmtDatumTijd(new Date(wanneer).toISOString())}` : ", nu direct"}.`
                    : `Versturen naar ${to}?`}
                </p>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={verstuur} disabled={bezig !== null} className="btn btn-primary btn-sm">
                    {bezig === "send" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <CheckCircle2 className="h-4 w-4" aria-hidden />}
                    Ja, versturen
                  </button>
                  <button type="button" onClick={() => setBevestig(false)} className="btn btn-outline btn-sm">
                    Annuleren
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="grid content-start gap-5">
          <Card title="Voorbeeld" action={<span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-muted"><Eye className="h-3.5 w-3.5" aria-hidden />Zo ziet de ontvanger hem</span>} bodyClassName="p-0">
            <iframe title="Voorbeeld van de mail" srcDoc={voorbeeld} sandbox="" className="h-[620px] w-full rounded-b-2xl bg-[#eef0f4]" />
          </Card>
          <Card title="Recente mailings" bodyClassName="p-2">
            {!data?.broadcasts?.length ? (
              <Empty icon={Send} title="Nog geen mailings" text="Verstuurde en ingeplande mailings verschijnen hier." />
            ) : (
              <ul>
                {data.broadcasts.map((b) => (
                  <li key={b.id} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-sunken">
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-medium">{b.subject || b.name || "Mailing"}</span>
                      <span className="block text-[11px] text-ink-subtle">{b.sent_at ? `Verstuurd ${fmtDatumTijd(b.sent_at)}` : b.scheduled_at ? `Gepland ${fmtDatumTijd(b.scheduled_at)}` : b.created_at ? `Aangemaakt ${fmtDatumTijd(b.created_at)}` : ""}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-surface-sunken px-2 py-0.5 text-[10.5px] font-semibold capitalize text-ink-muted">{b.status ?? "concept"}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
