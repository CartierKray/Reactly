"use client";

/**
 * components/site/Pricing.tsx
 *
 * De prijzenpagina in drie delen:
 *
 *  - PricingTiers: vier websitepakketten, van Start (€ 499) tot AI & maatwerk.
 *    Het middelste (Groei) is het aanbevolen pakket; elk pakket laat zien welk
 *    AI-onderdeel erin zit of erbij kan (upsell).
 *  - PackageBuilder: stel zelf je pakket samen met AI-uitbreidingen, extra's
 *    en onderhoud (cross-sell), met een live totaal. Eén klik opent de
 *    aanvraag als venster, met je samenstelling al ingevuld.
 *  - WebsiteScan: gratis website-scan voor wie nog niet klaar is voor een
 *    offerte, zodat ook die bezoekers hun gegevens achterlaten.
 *
 * Er staat niets standaard aangevinkt: de bezoeker kiest zelf.
 */

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock, Gauge, Loader2, Search, ShieldCheck, Sparkles, Star, Target, Wand2 } from "lucide-react";

import { RubikCube } from "./RubikCube";
import { useOfferte } from "./offerte/OfferteProvider";
import { track } from "@/lib/analytics";
import { ADDONS, CARE_PLAN, WEBSITE_TIERS, euro, type Tier, type TierId } from "@/lib/content";
import { submitLead, toFieldErrorMap } from "@/lib/leads/client";
import { offerteHref } from "@/lib/offerte";
import { cn } from "@/lib/utils";

/* ── Pakketten ─────────────────────────────────────────────────────────── */

export function PricingTiers() {
  React.useEffect(() => track("view_pricing", { content_name: "Websitepakketten" }), []);
  return (
    <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
      {WEBSITE_TIERS.map((t) => (
        <TierCard key={t.id} tier={t} />
      ))}
    </div>
  );
}

function TierCard({ tier: t }: { tier: Tier }) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-[1.6rem] p-6",
        t.highlight ? "deep noise isolate border border-white/10 bg-page text-white shadow-[0_40px_90px_-40px_rgba(8,10,18,0.8)] xl:-my-3 xl:py-9" : "card glow-hover",
      )}
    >
      {t.highlight && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[1.6rem]">
            <div className="absolute -right-16 -top-20 h-64 w-64 bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
            <div className="absolute -bottom-24 -left-10 h-56 w-56 bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
          </div>
          <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0b10] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
            <Star className="h-3 w-3 fill-current" aria-hidden />
            Meest gekozen
          </span>
        </>
      )}
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-ink-subtle">{t.tagline}</p>
      <h3 className="mt-2 text-[1.35rem] font-medium tracking-[-0.02em] text-ink">{t.name}</h3>
      <p className="mt-1.5 min-h-[2.8em] text-[13px] leading-relaxed text-ink-muted">{t.summary}</p>

      <p className="mt-5 flex items-baseline gap-2">
        <span className="text-[2.3rem] font-medium leading-none tracking-[-0.03em] text-ink">{t.price ? euro(t.price) : "Op maat"}</span>
        {t.price && <span className="text-[11.5px] text-ink-subtle">eenmalig</span>}
      </p>
      <p className="mt-1.5 text-[11px] text-ink-subtle">{t.price ? "Excl. btw" : "Voorstel met prijs binnen 24 uur"}</p>

      <div
        className={cn(
          "mt-5 flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-[12px] leading-snug",
          t.highlight ? "border-white/12 bg-white/[0.05]" : "border-line bg-surface-sunken/60",
        )}
      >
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" aria-hidden />
        <span className="min-w-0 flex-1 text-ink">{t.ai.label}</span>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em]",
            t.ai.included ? "accent-ink" : "border border-line-strong text-ink-muted",
          )}
        >
          {t.ai.included ? "Inbegrepen" : "Optie"}
        </span>
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {t.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-ink">
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ink/[0.08] text-ink dark:bg-brand/15 dark:text-brand-fg">
              <Check className="h-2.5 w-2.5" strokeWidth={3.2} aria-hidden />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={offerteHref({ pakket: t.name, services: t.services })}
        data-bron={`Prijzen: ${t.name}`}
        className={cn("btn group mt-7 w-full", t.highlight ? "btn-primary" : "btn-outline")}
      >
        {t.price ? `Kies ${t.name}` : "Vraag een voorstel aan"}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </Link>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-ink-subtle">
        <Clock className="h-3.5 w-3.5" aria-hidden />
        {t.delivery}
      </p>
    </article>
  );
}

/* ── Pakketsamensteller ────────────────────────────────────────────────── */

export function PackageBuilder() {
  const { open } = useOfferte();
  const [tierId, setTierId] = React.useState<TierId>("groei");
  const [gekozen, setGekozen] = React.useState<string[]>([]);
  const [onderhoud, setOnderhoud] = React.useState(false);

  const tier = WEBSITE_TIERS.find((t) => t.id === tierId)!;
  const extras = ADDONS.filter((a) => gekozen.includes(a.id));
  const eenmalig = tier.price === null ? null : tier.price + extras.reduce((s, a) => s + a.price, 0);
  const maandelijks = extras.reduce((s, a) => s + (a.monthly ?? 0), 0) + (onderhoud ? CARE_PLAN.monthly : 0);

  const toggle = (id: string) => setGekozen((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));

  const aanvragen = () => {
    const delen = [tier.name, ...extras.map((a) => a.name), ...(onderhoud ? ["onderhoud"] : [])];
    const indicatie = [eenmalig !== null ? euro(eenmalig) : "op maat", maandelijks ? `${euro(maandelijks)} p/m` : ""].filter(Boolean).join(" + ");
    open({
      pakket: `${delen.join(" + ")} (indicatie ${indicatie})`,
      services: Array.from(new Set([...tier.services, ...extras.flatMap((a) => a.services)])),
      bron: "Pakketsamensteller",
    });
  };

  const ai = ADDONS.filter((a) => a.ai);
  const overig = ADDONS.filter((a) => !a.ai);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="card p-5 sm:p-7">
        <Stap nummer={1} titel="Kies je basis" uitleg="Je website, eenmalig en excl. btw.">
          <div role="radiogroup" aria-label="Basispakket" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {WEBSITE_TIERS.map((t) => {
              const actief = t.id === tierId;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={actief}
                  onClick={() => setTierId(t.id)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left transition-all duration-300",
                    actief ? "border-ink/80 bg-surface-sunken shadow-[0_12px_28px_-20px_rgb(var(--glow-rgb)/0.9)] dark:border-brand/70" : "border-line hover:border-line-strong",
                  )}
                >
                  <span className="block text-[12.5px] font-semibold text-ink">{t.name}</span>
                  <span className="mt-0.5 block text-[12px] text-ink-muted tabular-nums">{t.price ? euro(t.price) : "Op maat"}</span>
                </button>
              );
            })}
          </div>
        </Stap>

        <Stap nummer={2} titel="Maak hem slim met AI" uitleg="Werkt dag en nacht voor je, ook als je zelf druk bent.">
          <div className="grid gap-2 sm:grid-cols-3">
            {ai.map((a) => (
              <OptieKaart key={a.id} addon={a} aan={gekozen.includes(a.id)} onToggle={() => toggle(a.id)} />
            ))}
          </div>
        </Stap>

        <Stap nummer={3} titel="Extra's" uitleg="Voor een complete start.">
          <div className="grid gap-2 sm:grid-cols-3">
            {overig.map((a) => (
              <OptieKaart key={a.id} addon={a} aan={gekozen.includes(a.id)} onToggle={() => toggle(a.id)} />
            ))}
          </div>
        </Stap>

        <Stap nummer={4} titel="Zorgeloos online" laatste>
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-line px-4 py-3.5 transition-colors hover:border-line-strong">
            <span>
              <span className="block text-[13px] font-semibold text-ink">{CARE_PLAN.name}</span>
              <span className="block text-[12px] text-ink-muted">{CARE_PLAN.description}</span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="text-[12px] font-medium text-ink tabular-nums">{euro(CARE_PLAN.monthly)} p/m</span>
              <input type="checkbox" checked={onderhoud} onChange={(e) => setOnderhoud(e.target.checked)} className="peer sr-only" />
              <span
                aria-hidden
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                  onderhoud ? "bg-ink dark:bg-brand" : "bg-line-strong",
                )}
              >
                <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200", onderhoud ? "translate-x-[22px]" : "translate-x-0.5")} />
              </span>
            </span>
          </label>
        </Stap>
      </div>

      {/* Overzicht met live totaal */}
      <aside className="deep noise relative isolate overflow-hidden rounded-[1.5rem] border border-white/10 bg-page p-6 text-white lg:sticky lg:top-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
        </div>
        <RubikCube size={40} pose="front" shadow={false} className="absolute right-2 top-2 animate-float" />
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/55">Jouw pakket</p>
        <h3 className="mt-2 pr-16 text-[1.25rem] font-medium tracking-[-0.01em]">{tier.name}</h3>

        <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-[12.5px]">
          <li className="flex justify-between gap-4">
            <span className="text-white/70">Website · {tier.name}</span>
            <span className="tabular-nums">{tier.price ? euro(tier.price) : "op maat"}</span>
          </li>
          {extras.map((a) => (
            <li key={a.id} className="enter flex justify-between gap-4" style={{ ["--in-y" as string]: "4px", ["--dur" as string]: "0.3s" }}>
              <span className="text-white/70">{a.name}</span>
              <span className="text-right tabular-nums">
                {a.price ? euro(a.price) : ""}
                {a.price && a.monthly ? " + " : ""}
                {a.monthly ? `${euro(a.monthly)} p/m` : ""}
              </span>
            </li>
          ))}
          {onderhoud && (
            <li className="enter flex justify-between gap-4" style={{ ["--in-y" as string]: "4px", ["--dur" as string]: "0.3s" }}>
              <span className="text-white/70">{CARE_PLAN.name}</span>
              <span className="tabular-nums">{euro(CARE_PLAN.monthly)} p/m</span>
            </li>
          )}
        </ul>

        <dl className="mt-5 space-y-1 border-t border-white/10 pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[12px] text-white/60">Eenmalig</dt>
            <dd key={eenmalig ?? "maat"} className="enter text-[1.9rem] font-medium leading-none tracking-[-0.03em] tabular-nums" style={{ ["--in-y" as string]: "6px", ["--dur" as string]: "0.35s" }}>
              {eenmalig !== null ? euro(eenmalig) : "Op maat"}
            </dd>
          </div>
          {maandelijks > 0 && (
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[12px] text-white/60">Per maand</dt>
              <dd className="text-[1.05rem] font-medium tabular-nums">{euro(maandelijks)}</dd>
            </div>
          )}
          <p className="pt-1 text-[11px] text-white/45">Indicatie, excl. btw. Je ontvangt binnen 24 uur een exact voorstel.</p>
        </dl>

        <button type="button" onClick={aanvragen} className="btn btn-primary group mt-6 w-full">
          Vraag deze offerte aan
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </button>
        <Link href="/contact" className="mt-3 block text-center text-[12px] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">
          Liever eerst sparren? Plan een gratis adviesgesprek
        </Link>

        <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-[12px] text-white/70">
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-white/80" aria-hidden />
            Vrijblijvend, je zit nergens aan vast
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-white/80" aria-hidden />
            Later uitbreiden kan altijd
          </li>
        </ul>
      </aside>
    </div>
  );
}

function Stap({ nummer, titel, uitleg, laatste, children }: { nummer: number; titel: string; uitleg?: string; laatste?: boolean; children: React.ReactNode }) {
  return (
    <section className={cn("relative pl-10", !laatste && "pb-7")}>
      {!laatste && <span aria-hidden className="absolute bottom-0 left-[13px] top-8 w-px bg-line" />}
      <span className="absolute left-0 top-0 grid h-7 w-7 place-items-center rounded-full border border-line-strong bg-surface text-[11px] font-semibold text-ink tabular-nums">{nummer}</span>
      <h3 className="text-[14.5px] font-semibold text-ink">{titel}</h3>
      {uitleg && <p className="mt-0.5 text-[12px] text-ink-muted">{uitleg}</p>}
      <div className="mt-3.5">{children}</div>
    </section>
  );
}

function OptieKaart({ addon: a, aan, onToggle }: { addon: (typeof ADDONS)[number]; aan: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={aan}
      onClick={onToggle}
      className={cn(
        "relative flex h-full flex-col rounded-xl border p-3.5 text-left transition-all duration-300",
        aan ? "border-ink/80 bg-surface-sunken shadow-[0_12px_28px_-20px_rgb(var(--glow-rgb)/0.9)] dark:border-brand/70" : "border-line hover:-translate-y-0.5 hover:border-line-strong",
      )}
    >
      <span className="flex items-start justify-between gap-2">
        <span className="text-[12.5px] font-semibold text-ink">{a.name}</span>
        <span aria-hidden className={cn("grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors", aan ? "accent-ink border-transparent" : "border-line-strong")}>
          {aan && <Check className="h-2.5 w-2.5" strokeWidth={3.2} />}
        </span>
      </span>
      {a.popular && (
        <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-ink/[0.07] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink dark:bg-brand/15 dark:text-brand-fg">
          <Star className="h-2.5 w-2.5 fill-current" aria-hidden />
          Populair
        </span>
      )}
      <span className="mt-1.5 flex-1 text-[11.5px] leading-snug text-ink-muted">{a.description}</span>
      <span className="mt-3 text-[12px] font-medium text-ink tabular-nums">
        {a.price ? euro(a.price) : "Geen opstartkosten"}
        {a.monthly ? <span className="text-ink-muted"> + {euro(a.monthly)} p/m</span> : null}
      </span>
    </button>
  );
}

/* ── Gratis website-scan ───────────────────────────────────────────────── */

export function WebsiteScan() {
  const [status, setStatus] = React.useState<"idle" | "bezig" | "klaar">("idle");
  const [fout, setFout] = React.useState<string | null>(null);
  const [velden, setVelden] = React.useState<Record<string, string>>({});
  const startedAt = React.useRef(Date.now());

  async function verstuur(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setStatus("bezig");
    setFout(null);
    setVelden({});
    const r = await submitLead({
      type: "scan",
      name: data.name,
      email: data.email,
      siteUrl: data.siteUrl,
      website: data.website,
      startedAt: startedAt.current,
      extra: { Bron: "Prijzenpagina: gratis website-scan" },
    });
    if (!r.ok) {
      setStatus("idle");
      setFout(r.message);
      setVelden(toFieldErrorMap(r.errors));
      return;
    }
    setStatus("klaar");
  }

  const veld =
    "w-full rounded-xl border border-white/12 bg-white/[0.06] px-3.5 py-3 text-[13.5px] text-white outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-white/40 hover:border-white/25 focus:border-white/45 focus:bg-white/[0.09] focus:shadow-[0_0_0_4px_rgb(255_255_255/0.08)] aria-[invalid=true]:border-red-400/70";

  return (
    <div className="deep noise relative isolate grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-page text-white lg:grid-cols-[1.05fr_0.95fr]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-80 w-80 bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
        <div className="absolute -bottom-32 right-[20%] h-96 w-96 bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-[0.12]" />
      </div>
      <div className="relative p-7 sm:p-10">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/70">
          <Wand2 className="h-3.5 w-3.5" aria-hidden />
          Gratis website-scan
        </p>
        <h3 className="mt-4 max-w-md text-[1.7rem] font-medium leading-tight tracking-[-0.02em]">Al een website? Ontdek wat hij je laat liggen.</h3>
        <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-white/65">
          We lopen je website persoonlijk na en mailen je binnen één werkdag de belangrijkste verbeterpunten. Gratis en zonder verplichtingen.
        </p>
        <ul className="mt-6 grid max-w-md grid-cols-2 gap-2.5 text-[12.5px] text-white/80">
          {[
            { icon: Gauge, t: "Snelheid" },
            { icon: Search, t: "Vindbaarheid" },
            { icon: Target, t: "Conversie" },
            { icon: Sparkles, t: "AI-kansen" },
          ].map(({ icon: Icon, t }) => (
            <li key={t} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
              <Icon className="h-4 w-4 text-white/80" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <RubikCube size={70} pose="tilt" className="absolute -bottom-6 right-6 hidden animate-float opacity-90 sm:block lg:right-2" />
      </div>

      <div className="relative border-t border-white/10 p-7 sm:p-10 lg:border-l lg:border-t-0">
        {status === "klaar" ? (
          <div className="flex h-full flex-col items-start justify-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#0a0b10]">
              <Check className="h-6 w-6" strokeWidth={2.6} aria-hidden />
            </span>
            <p className="mt-5 text-[1.25rem] font-medium">Je scan staat ingepland</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">Binnen één werkdag ontvang je de verbeterpunten in je mailbox. Er staat al een bevestiging klaar.</p>
          </div>
        ) : (
          <form onSubmit={verstuur} noValidate className="relative grid gap-3.5">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0" />
            {fout && (
              <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-[12.5px] text-red-300">
                {fout}
              </p>
            )}
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Je website</span>
              <input name="siteUrl" inputMode="url" autoComplete="url" placeholder="www.jouwbedrijf.nl" className={veld} aria-invalid={!!velden.siteUrl || undefined} />
              {velden.siteUrl && <span className="mt-1 block text-[12px] text-red-300">{velden.siteUrl}</span>}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Naam</span>
              <input name="name" autoComplete="name" placeholder="Je naam" className={veld} aria-invalid={!!velden.name || undefined} />
              {velden.name && <span className="mt-1 block text-[12px] text-red-300">{velden.name}</span>}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">E-mailadres</span>
              <input name="email" type="email" inputMode="email" autoComplete="email" placeholder="naam@bedrijf.nl" className={veld} aria-invalid={!!velden.email || undefined} />
              {velden.email && <span className="mt-1 block text-[12px] text-red-300">{velden.email}</span>}
            </label>
            <button type="submit" disabled={status === "bezig"} className="btn btn-primary mt-1 w-full disabled:opacity-60">
              {status === "bezig" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Versturen…
                </>
              ) : (
                <>
                  Vraag mijn gratis scan aan
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>
            <p className="text-[11px] leading-relaxed text-white/45">
              We gebruiken je gegevens alleen voor deze scan. Lees ons{" "}
              <Link href="/privacybeleid" className="underline underline-offset-2 hover:text-white">
                privacybeleid
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/** Oude standaardexport: de pakketten. */
export default PricingTiers;
