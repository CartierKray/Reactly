"use client";

/**
 * components/site/chat/ChatMedewerker.tsx
 *
 * Kaart in het gesprek: "Een collega neemt het over". Verschijnt zodra de
 * assistent signaleert dat de bezoeker iets concreets wil ([[MEDEWERKER]]
 * in het antwoord) of als de bezoeker er zelf om vraagt. De gegevens gaan
 * via /api/leads naar dezelfde inbox als elk formulier, mét het gesprek,
 * zodat niemand opnieuw hoeft te vragen waar het over ging.
 */

import * as React from "react";
import { Check } from "lucide-react";

import { submitLead, toFieldErrorMap } from "@/lib/leads/client";
import { SITE, isOpenNow } from "@/lib/site";

export default function ChatMedewerker({ gesprek }: { gesprek: string }) {
  const [naam, setNaam] = React.useState("");
  const [telefoon, setTelefoon] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bezig, setBezig] = React.useState(false);
  const [klaar, setKlaar] = React.useState(false);
  const [fout, setFout] = React.useState<string | null>(null);
  const [velden, setVelden] = React.useState<Record<string, string>>({});
  const [open, setOpen] = React.useState(false);
  const startedAt = React.useRef(Date.now());
  React.useEffect(() => setOpen(isOpenNow()), []);

  async function verstuur(e: React.FormEvent) {
    e.preventDefault();
    if (bezig) return;
    setBezig(true);
    setFout(null);
    setVelden({});
    const r = await submitLead({
      type: "medewerker",
      name: naam,
      email,
      phone: telefoon,
      message: `Verzoek om contact vanuit de chat.\n\nGesprek:\n${gesprek}`.slice(0, 5800),
      startedAt: startedAt.current,
      extra: { Bron: "Chat: medewerker gevraagd" },
    });
    setBezig(false);
    if (!r.ok) {
      setFout(r.message);
      setVelden(toFieldErrorMap(r.errors));
      return;
    }
    setKlaar(true);
  }

  const kaart =
    "enter self-stretch rounded-2xl border border-line bg-surface p-4 text-[12px] shadow-card";

  if (klaar) {
    return (
      <div className={kaart} style={{ ["--in-y" as string]: "8px", ["--dur" as string]: "0.4s" }}>
        <p className="flex items-center gap-2 font-semibold text-ink">
          <span className="accent-ink grid h-6 w-6 place-items-center rounded-full">
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
          </span>
          Een collega is ingeschakeld
        </p>
        <p className="mt-1.5 leading-relaxed text-ink-muted">
          {open
            ? "Je hoort meestal binnen enkele minuten van ons, telefonisch of per mail."
            : `We zijn nu gesloten; je hoort de eerstvolgende werkdag van ons. Spoed? Bel ${SITE.phone.display}.`}
        </p>
      </div>
    );
  }

  const veld =
    "w-full rounded-xl border border-line bg-page px-3 py-2.5 text-[12px] text-ink outline-none transition focus:border-brand/60 focus:shadow-[0_0_0_3px_hsl(var(--brand)/0.15)] aria-[invalid=true]:border-destructive";

  return (
    <form onSubmit={verstuur} noValidate className={`${kaart} space-y-2.5`} style={{ ["--in-y" as string]: "8px", ["--dur" as string]: "0.4s" }}>
      <div>
        <p className="font-semibold text-ink">Een collega neemt het over</p>
        <p className="mt-0.5 text-ink-muted">
          Laat je gegevens achter. {open ? "Meestal binnen enkele minuten reactie." : "We reageren de eerstvolgende werkdag."}
        </p>
      </div>
      {fout && (
        <p role="alert" className="rounded-lg bg-destructive-soft px-3 py-2 text-destructive">
          {fout}
        </p>
      )}
      <input className={veld} placeholder="Naam" autoComplete="name" value={naam} onChange={(e) => setNaam(e.target.value)} aria-label="Naam" aria-invalid={!!velden.name || undefined} />
      <input className={veld} placeholder="Telefoonnummer" type="tel" inputMode="tel" autoComplete="tel" value={telefoon} onChange={(e) => setTelefoon(e.target.value)} aria-label="Telefoonnummer" aria-invalid={!!velden.phone || undefined} />
      <input className={veld} placeholder="E-mailadres" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="E-mailadres" aria-invalid={!!velden.email || undefined} />
      <button type="submit" disabled={bezig} className="btn btn-primary btn-sm w-full disabled:opacity-60">
        {bezig ? "Versturen…" : "Collega inschakelen"}
      </button>
    </form>
  );
}
