"use client";

/**
 * components/site/chat/ChatLeadForm.tsx
 *
 * "Laat je gegevens achter" binnen de chat: wie geholpen wil worden hoeft
 * geen formulier te zoeken. Gaat via dezelfde ingang als elk formulier
 * (POST /api/leads): zelfde inbox, validatie en opmaak.
 */

import * as React from "react";
import { Check } from "lucide-react";

import { Wordmark } from "../Brand";
import { submitLead, toFieldErrorMap } from "@/lib/leads/client";
import { SITE } from "@/lib/site";

export default function ChatLeadForm({ onTerug }: { onTerug: () => void }) {
  const [naam, setNaam] = React.useState("");
  const [telefoon, setTelefoon] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [vraag, setVraag] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [bezig, setBezig] = React.useState(false);
  const [klaar, setKlaar] = React.useState(false);
  const [fout, setFout] = React.useState<string | null>(null);
  const [veldFouten, setVeldFouten] = React.useState<Record<string, string>>({});
  const startedAt = React.useRef(Date.now());

  async function verstuur(e: React.FormEvent) {
    e.preventDefault();
    if (bezig) return;
    setBezig(true);
    setFout(null);
    setVeldFouten({});
    const result = await submitLead({
      type: "terugbellen",
      name: naam,
      email,
      phone: telefoon,
      message: vraag,
      website: honeypot,
      startedAt: startedAt.current,
      extra: { Bron: "Chat: gegevens achtergelaten" },
    });
    setBezig(false);
    if (!result.ok) {
      setFout(result.message);
      setVeldFouten(toFieldErrorMap(result.errors));
      return;
    }
    setKlaar(true);
  }

  if (klaar) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
        <span className="accent-ink grid h-14 w-14 place-items-center rounded-full">
          <Check className="h-7 w-7" strokeWidth={2.6} aria-hidden />
        </span>
        <p className="mt-4 text-[14.5px] font-semibold text-white">Bedankt, we hebben je gegevens</p>
        <p className="mt-2 max-w-xs text-[12.5px] leading-relaxed text-white/70">
          We bellen je op de eerstvolgende werkdag, vaak al eerder. Liever nu meteen? Bel {SITE.phone.display}.
        </p>
        <button
          type="button"
          onClick={onTerug}
          className="mt-6 rounded-full border border-white/25 px-5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-white/10"
        >
          Terug
        </button>
      </div>
    );
  }

  const veld =
    "w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-[13px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/40 focus:bg-white/15";

  return (
    <form onSubmit={verstuur} noValidate className="relative flex flex-1 flex-col overflow-y-auto px-5 py-5">
      <Wordmark className="mb-4 block text-[1.2rem] text-white" />
      <p className="text-[14px] font-semibold text-white">Laat je gegevens achter</p>
      <p className="mt-1 text-[12px] leading-relaxed text-white/65">
        Vertel waar je mee bezig bent, dan bellen we je terug met een eerlijk advies.
      </p>

      {/* Honeypot: onzichtbaar voor mensen, ingevuld door bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {fout && (
        <p role="alert" className="mt-3 rounded-lg bg-red-500/20 px-3 py-2 text-[12px] text-red-100">
          {fout}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3">
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-white/70">Naam</span>
          <input className={veld} value={naam} onChange={(e) => setNaam(e.target.value)} autoComplete="name" />
          {veldFouten.name && <span className="mt-1 block text-[11px] text-red-200">{veldFouten.name}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-white/70">Telefoonnummer</span>
          <input className={veld} type="tel" inputMode="tel" placeholder="06 12345678" value={telefoon} onChange={(e) => setTelefoon(e.target.value)} autoComplete="tel" />
          {veldFouten.phone && <span className="mt-1 block text-[11px] text-red-200">{veldFouten.phone}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-white/70">E-mailadres (optioneel)</span>
          <input className={veld} type="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          {veldFouten.email && <span className="mt-1 block text-[11px] text-red-200">{veldFouten.email}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium text-white/70">Waar kunnen we je mee helpen?</span>
          <textarea
            className={`${veld} min-h-[76px] resize-none`}
            rows={3}
            value={vraag}
            onChange={(e) => setVraag(e.target.value)}
            placeholder="Bijvoorbeeld: een nieuwe website, meer leads uit Google…"
          />
        </label>
      </div>

      <button type="submit" disabled={bezig} className="btn btn-primary mt-5 w-full disabled:opacity-50">
        {bezig ? "Versturen…" : "Bel mij terug"}
      </button>
      <button type="button" onClick={onTerug} className="mt-3 self-center text-[12px] font-medium text-white/60 transition-colors hover:text-white">
        Terug
      </button>
    </form>
  );
}
