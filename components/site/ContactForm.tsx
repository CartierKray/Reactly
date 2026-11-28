"use client";

/**
 * components/site/ContactForm.tsx
 *
 * Het contactformulier. Verstuurt via dezelfde ingang als de offerte en de
 * chat (submitLead → /api/leads): naar cartierkray@gmail.com vanaf
 * info@reactly.nl, met een bevestigingsmail aan de klant. Validatie in de
 * browser én op de server, meldingen bij het veld, een honeypot tegen bots,
 * en ?pakket=… vult onderwerp en bericht alvast in.
 */

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { toast } from "@/components/ui/use-toast";
import { submitLead, toFieldErrorMap } from "@/lib/leads/client";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  { value: "Offerte", label: "Ik wil een offerte aanvragen" },
  { value: "webdesign", label: "Vraag over webdesign of development" },
  { value: "marketing", label: "Vraag over marketing, SEO of ads" },
  { value: "Technisch", label: "Technische vraag over mijn website" },
  { value: "kosten", label: "Vraag over kosten en pakketten" },
  { value: "Anders", label: "Anders" },
];

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-[14px] text-ink shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink-subtle/80 hover:border-line-strong focus:border-brand/60 focus:shadow-[0_0_0_4px_hsl(var(--brand)/0.15)] aria-[invalid=true]:border-destructive";
const label = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted";

function Fout({ children }: { children?: string }) {
  return children ? <span className="mt-1.5 block text-[11.5px] text-destructive">{children}</span> : null;
}

export default function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");
  const [fouten, setFouten] = React.useState<Record<string, string>>({});
  const [pakket, setPakket] = React.useState("");
  const subjectRef = React.useRef<HTMLSelectElement>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  const startedAt = React.useRef(Date.now());

  // Komt de bezoeker van een pakket of dienst (?pakket=…), dan staat die al klaar.
  React.useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("pakket");
    if (!p) return;
    setPakket(p);
    if (subjectRef.current && !subjectRef.current.value) subjectRef.current.value = "Offerte";
    if (messageRef.current && !messageRef.current.value) messageRef.current.value = `Ik heb interesse in: ${p}.\n\n`;
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setFouten({});
    const r = await submitLead({
      type: "contact",
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      subject: SUBJECTS.find((s) => s.value === data.subject)?.label ?? data.subject,
      message: data.message,
      packageName: pakket || undefined,
      website: data.website,
      startedAt: startedAt.current,
      extra: { Bron: "Contactformulier" },
    });
    if (!r.ok) {
      setStatus("idle");
      setFouten(toFieldErrorMap(r.errors));
      toast({ title: "Verzenden is niet gelukt", description: r.message, variant: "destructive" });
      return;
    }
    form.reset();
    setStatus("sent");
    toast({ title: "Bericht verzonden!", description: "Je ontvangt een bevestiging per mail. We nemen binnen één werkdag contact op." });
    window.setTimeout(() => setStatus("idle"), 6000);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      {/* Honeypot: onzichtbaar voor mensen, ingevuld door bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0" />

      <div>
        <label htmlFor="cf-name" className={label}>
          Naam <span className="text-brand-fg">*</span>
        </label>
        <input id="cf-name" name="name" required autoComplete="name" placeholder="Je volledige naam" className={field} aria-invalid={!!fouten.name || undefined} />
        <Fout>{fouten.name}</Fout>
      </div>
      <div>
        <label htmlFor="cf-company" className={label}>
          Bedrijf / KvK
        </label>
        <input id="cf-company" name="company" autoComplete="organization" placeholder="Bedrijfsnaam" className={field} />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>
          E-mail <span className="text-brand-fg">*</span>
        </label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="naam@bedrijf.nl" className={field} aria-invalid={!!fouten.email || undefined} />
        <Fout>{fouten.email}</Fout>
      </div>
      <div>
        <label htmlFor="cf-phone" className={label}>
          Telefoon
        </label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" className={field} aria-invalid={!!fouten.phone || undefined} />
        <Fout>{fouten.phone}</Fout>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-subject" className={label}>
          Onderwerp <span className="text-brand-fg">*</span>
        </label>
        <div className="relative">
          <select ref={subjectRef} id="cf-subject" name="subject" required defaultValue="" className={cn(field, "appearance-none pr-11")}>
            <option value="" disabled>
              Kies een onderwerp
            </option>
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={label}>
          Bericht <span className="text-brand-fg">*</span>
        </label>
        <textarea
          ref={messageRef}
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Vertel kort over je project, doelen en planning."
          className={cn(field, "resize-y")}
          aria-invalid={!!fouten.message || undefined}
        />
        <Fout>{fouten.message}</Fout>
      </div>

      <p className="text-[11.5px] leading-relaxed text-ink-subtle sm:col-span-2">
        We gebruiken je gegevens alleen om contact met je op te nemen. Lees ons{" "}
        <Link href="/privacybeleid" className="font-medium text-ink underline underline-offset-2 hover:text-brand-fg">
          privacybeleid
        </Link>
        . Liever alles in een paar klikken?{" "}
        <Link href="/offerte" className="font-medium text-ink underline underline-offset-2 hover:text-brand-fg">
          Stel je aanvraag samen
        </Link>
        .
      </p>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary btn-lg w-full sm:col-span-2">
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Versturen…
          </>
        ) : status === "sent" ? (
          <>
            <Check className="h-4 w-4" aria-hidden />
            Verzonden, bedankt!
          </>
        ) : (
          <>
            Bericht versturen
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>
      <p role="status" aria-live="polite" className="sr-only">
        {status === "sending" ? "Bericht wordt verstuurd" : status === "sent" ? "Bericht verzonden" : ""}
      </p>
    </form>
  );
}
