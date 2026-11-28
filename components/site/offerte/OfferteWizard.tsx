"use client";

/**
 * components/site/offerte/OfferteWizard.tsx
 *
 * De aanvraag in stappen, voor elke dienst. Werkt op de pagina /offerte én als
 * venster (OfferteDialog) vanaf elke "Start je aanvraag"- of "Offerte"-knop.
 *
 *  - één vraag per scherm, met een segmentbalk per groep vragen;
 *  - meerdere keuzes per vraag waar dat kan (diensten, doelen, situatie);
 *    planning en budget zijn één keuze en gaan daarna vanzelf door;
 *  - bij elke vraag een optionele opmerking;
 *  - een premium overzicht (opsomming) van alle keuzes, met "wijzig" per regel;
 *    op telefoon inklapbaar boven de vraag;
 *  - een half ingevulde aanvraag blijft bewaard zolang de pagina openstaat (ook
 *    als je het venster sluit) en, met toestemming voor functionele cookies,
 *    ook na herladen (sessionStorage);
 *  - ?dienst=seo,ai of ?pakket=Groei (of een preset vanuit het venster) vult de
 *    eerste stap alvast in.
 *
 * Versturen gaat via submitLead → /api/leads: naar het team vanaf
 * info@reactly.nl, met een bevestigingsmail aan de klant en een
 * conversiemelding (na toestemming) voor Google Ads en Meta.
 */

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Compass,
  Gauge,
  Heart,
  Loader2,
  MessageSquarePlus,
  Pencil,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Wallet,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { WhatsAppIcon } from "../WhatsAppIcon";
import { RubikCube } from "../RubikCube";
import { track } from "@/lib/analytics";
import { readConsent } from "@/lib/consent";
import type { OffertePreset } from "@/lib/offerte";
import { SERVICES } from "@/lib/content";
import { submitLead, toFieldErrorMap } from "@/lib/leads/client";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ── Vragen ─────────────────────────────────────────────────────────────── */

type Option = { value: string; label: string; hint?: string; icon: LucideIcon; tone: string };

const TONES: Record<string, string> = {
  webdesign: "99 102 241",
  development: "6 182 212",
  seo: "16 185 129",
  advertising: "245 158 11",
  social: "236 72 153",
  branding: "217 70 239",
  ecommerce: "249 115 22",
  conversie: "20 184 166",
  ai: "59 130 246",
};

const SERVICE_OPTIONS: Option[] = SERVICES.map((s) => ({
  value: s.id,
  label: s.title,
  hint: s.short,
  icon: s.icon,
  tone: TONES[s.id] ?? "99 102 241",
}));

const GOALS: Option[] = [
  { value: "Meer leads en aanvragen", label: "Meer leads en aanvragen", hint: "Meer offertes, telefoontjes en afspraken", icon: TrendingUp, tone: "16 185 129" },
  { value: "Meer online verkopen", label: "Meer online verkopen", hint: "Meer omzet uit je webshop", icon: ShoppingBag, tone: "249 115 22" },
  { value: "Beter gevonden worden", label: "Beter gevonden worden", hint: "Hoger in Google, lokaal en landelijk", icon: Search, tone: "59 130 246" },
  { value: "Een sterker merk", label: "Een sterker merk", hint: "Uitstraling die vertrouwen wekt", icon: Heart, tone: "217 70 239" },
  { value: "Tijd besparen met AI en automatisering", label: "Tijd besparen met AI", hint: "Chatbots, slimme opvolging en automatisering", icon: Zap, tone: "245 158 11" },
  { value: "Iets anders", label: "Iets anders", hint: "Vertel het ons in een opmerking", icon: Compass, tone: "99 102 241" },
];

const SITUATIONS: Option[] = [
  { value: "Ik begin vanaf nul", label: "Ik begin vanaf nul", hint: "Nog geen website of campagnes", icon: Rocket, tone: "99 102 241" },
  { value: "Mijn website moet beter", label: "Mijn website moet beter", hint: "Verouderd, traag of levert te weinig op", icon: Gauge, tone: "6 182 212" },
  { value: "Mijn webshop moet beter", label: "Mijn webshop moet beter", hint: "Meer conversie of een nieuw platform", icon: ShoppingBag, tone: "249 115 22" },
  { value: "Ik wil mijn marketing uitbreiden", label: "Mijn marketing uitbreiden", hint: "Site staat, nu meer bereik en leads", icon: Target, tone: "236 72 153" },
];

const TIMING: Option[] = [
  { value: "Zo snel mogelijk", label: "Zo snel mogelijk", hint: "Liefst deze maand nog live", icon: Zap, tone: "245 158 11" },
  { value: "Binnen 1 maand", label: "Binnen 1 maand", icon: Clock, tone: "16 185 129" },
  { value: "Binnen 3 maanden", label: "Binnen 3 maanden", icon: Clock, tone: "59 130 246" },
  { value: "Ik oriënteer me nog", label: "Ik oriënteer me nog", hint: "Eerst een goed beeld van de mogelijkheden", icon: Compass, tone: "99 102 241" },
];

const BUDGETS: Option[] = [
  { value: "Tot € 1.000", label: "Tot € 1.000", hint: "Bijvoorbeeld een strakke one-pager", icon: Wallet, tone: "16 185 129" },
  { value: "€ 1.000 – € 2.500", label: "€ 1.000 – € 2.500", icon: Wallet, tone: "6 182 212" },
  { value: "€ 2.500 – € 5.000", label: "€ 2.500 – € 5.000", icon: Wallet, tone: "59 130 246" },
  { value: "Meer dan € 5.000", label: "Meer dan € 5.000", icon: Wallet, tone: "217 70 239" },
  { value: "Weet ik nog niet", label: "Weet ik nog niet", hint: "We adviseren je wat past", icon: Sparkles, tone: "99 102 241" },
];

type ChoiceField = "services" | "goals" | "situations" | "timing" | "budget";
type StepId = "diensten" | "doel" | "situatie" | "planning" | "budget" | "gegevens";

type ChoiceStep = {
  id: StepId;
  group: number;
  kind: "choice";
  multiple: boolean;
  field: ChoiceField;
  label: string;
  title: string;
  subtitle?: string;
  options: Option[];
};
type ContactStep = { id: "gegevens"; group: number; kind: "contact"; label: string; title: string; subtitle?: string };
type Step = ChoiceStep | ContactStep;

const STEPS: Step[] = [
  { id: "diensten", group: 0, kind: "choice", multiple: true, field: "services", label: "Diensten", title: "Waar kunnen we je mee helpen?", subtitle: "Kies alles wat van toepassing is. Twijfel je? Kies wat het dichtst in de buurt komt.", options: SERVICE_OPTIONS },
  { id: "doel", group: 1, kind: "choice", multiple: true, field: "goals", label: "Doel", title: "Wat wil je ermee bereiken?", subtitle: "Meerdere doelen kiezen mag. Zo weten we waar we de nadruk op leggen.", options: GOALS },
  { id: "situatie", group: 1, kind: "choice", multiple: true, field: "situations", label: "Situatie", title: "Wat is je huidige situatie?", subtitle: "Kies wat er voor jou geldt.", options: SITUATIONS },
  { id: "planning", group: 2, kind: "choice", multiple: false, field: "timing", label: "Planning", title: "Wanneer wil je starten?", options: TIMING },
  { id: "budget", group: 2, kind: "choice", multiple: false, field: "budget", label: "Budget", title: "Welk budget heb je in gedachten?", subtitle: "Eenmalig voor web, of per maand voor marketing. Een indicatie is genoeg.", options: BUDGETS },
  { id: "gegevens", group: 3, kind: "contact", label: "Gegevens", title: "Waar mogen we je voorstel naartoe sturen?", subtitle: "Binnen 24 uur ontvang je een voorstel op maat, met planning en investering." },
];
const GROUPS = ["Diensten", "Doel", "Planning", "Gegevens"];

type Answers = {
  services: string[];
  goals: string[];
  situations: string[];
  timing: string[];
  budget: string[];
  notes: Partial<Record<StepId, string>>;
  name: string;
  company: string;
  email: string;
  phone: string;
  siteUrl: string;
  message: string;
  newsletter: boolean;
};

const LEEG: Answers = {
  services: [],
  goals: [],
  situations: [],
  timing: [],
  budget: [],
  notes: {},
  name: "",
  company: "",
  email: "",
  phone: "",
  siteUrl: "",
  message: "",
  newsletter: false,
};
const OPSLAG = "reactly-offerte-v2";


type Draft = { a: Answers; index: number; pakket: string };
/** Blijft bestaan zolang de pagina openstaat: sluiten van het venster wist niets. */
let geheugen: Draft | null = null;

/** Welke diensten bij een pakket horen (voor ?pakket=… of een preset). */
function dienstenBijPakket(pakket: string): string[] {
  const p = pakket.toLowerCase();
  const uit = new Set<string>();
  if (p.includes("seo")) uit.add("seo");
  if (p.includes("ads")) ["advertising", "social"].forEach((d) => uit.add(d));
  if (p.includes("content")) ["social", "branding"].forEach((d) => uit.add(d));
  if (p.includes("webshop") || p.includes("e-commerce")) uit.add("ecommerce");
  if (/\bai\b|chatbot|automat/.test(p)) uit.add("ai");
  if (p.includes("brand")) uit.add("branding");
  if (!uit.size || /site|start|groei|pro|premium|enterprise|website/.test(p)) ["webdesign", "development"].forEach((d) => uit.add(d));
  return Array.from(uit);
}

const titelVan = (id: string) => SERVICES.find((s) => s.id === id)?.title ?? id;
const geldigeDiensten = (ids: string[]) => ids.filter((d) => SERVICES.some((s) => s.id === d));
const isBeantwoord = (a: Answers, s: Step) => (s.kind === "choice" ? a[s.field].length > 0 : Boolean(a.name.trim() && a.email.trim()));
const waardenVan = (a: Answers, s: Step): string[] =>
  s.kind === "choice" ? (s.field === "services" ? a.services.map(titelVan) : a[s.field]) : [a.name, a.email].filter(Boolean);

/* ── Onderdelen ─────────────────────────────────────────────────────────── */

function Progress({ current }: { current: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={GROUPS.length}
      aria-valuenow={current + 1}
      aria-label={`Stap ${current + 1} van ${GROUPS.length}: ${GROUPS[current]}`}
    >
      {GROUPS.map((g, i) => (
        <div key={g} className="flex-1">
          <div className="h-1 overflow-hidden rounded-full bg-surface-sunken">
            <div className="accent-ink h-full rounded-full transition-[width] duration-500 ease-premium" style={{ width: i <= current ? "100%" : "0%" }} />
          </div>
          <span className={cn("mt-1.5 hidden text-[10px] font-semibold uppercase tracking-[0.16em] sm:block", i <= current ? "text-ink" : "text-ink-subtle")}>{g}</span>
        </div>
      ))}
    </div>
  );
}

function ChoiceCard({ option, selected, multiple, onSelect, i }: { option: Option; selected: boolean; multiple: boolean; onSelect: () => void; i: number }) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      role={multiple ? "checkbox" : "radio"}
      aria-checked={selected}
      style={{ ["--tone" as string]: option.tone, ["--i" as string]: i, ["--stagger" as string]: "35ms", ["--in-y" as string]: "8px", ["--dur" as string]: "0.4s" }}
      className={cn(
        "enter group relative flex w-full items-center gap-3 rounded-2xl border bg-surface p-3 text-left transition-[border-color,background-color,box-shadow,transform] duration-300 ease-premium active:scale-[0.985]",
        selected
          ? "border-ink/80 bg-surface-sunken shadow-[0_14px_32px_-20px_rgb(var(--glow-rgb)/0.9)] dark:border-brand/70"
          : "border-line hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_14px_30px_-22px_rgb(var(--glow-rgb)/0.8)]",
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-colors duration-300",
          selected
            ? "border-transparent bg-[rgb(var(--tone)/0.14)] text-[rgb(var(--tone))]"
            : "border-line bg-surface-sunken text-ink-muted group-hover:text-[rgb(var(--tone))]",
        )}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13.5px] font-semibold text-ink">{option.label}</span>
        {option.hint && <span className="block text-[12px] leading-snug text-ink-muted">{option.hint}</span>}
      </span>
      <span
        aria-hidden
        className={cn(
          "grid h-5 w-5 shrink-0 place-items-center border transition-colors duration-200",
          multiple ? "rounded-md" : "rounded-full",
          selected ? "accent-ink border-transparent" : "border-line-strong",
        )}
      >
        {selected && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
    </button>
  );
}

/** Opmerking per vraag: ingeklapt een rustig linkje, uitgeklapt een tekstvak. */
function NoteField({ value, onChange, open, onOpen }: { value: string; onChange: (v: string) => void; open: boolean; onOpen: () => void }) {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (open && !value) ref.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  if (!open)
    return (
      <button type="button" onClick={onOpen} className="mt-4 inline-flex items-center gap-2 rounded-full px-1 py-1 text-[12.5px] font-medium text-ink-muted transition-colors hover:text-ink">
        <MessageSquarePlus className="h-4 w-4" strokeWidth={1.8} aria-hidden />
        Opmerking toevoegen
      </button>
    );
  return (
    <label className="enter mt-4 block" style={{ ["--in-y" as string]: "6px", ["--dur" as string]: "0.35s" }}>
      <span className="mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Opmerking (optioneel)
        <span className="font-normal normal-case tracking-normal text-ink-subtle tabular-nums">{value.length}/500</span>
      </span>
      <textarea
        ref={ref}
        rows={2}
        maxLength={500}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Iets wat we moeten weten? Bijvoorbeeld een voorbeeldsite die je mooi vindt."
        className="w-full resize-y rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[13px] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink-subtle/80 hover:border-line-strong focus:border-ink/40 focus:shadow-[0_0_0_4px_rgb(var(--glow-rgb)/0.12)]"
      />
    </label>
  );
}

/* ── De wizard ──────────────────────────────────────────────────────────── */

export default function OfferteWizard({
  variant = "page",
  preset,
  presetKey,
  onClose,
}: {
  variant?: "page" | "dialog";
  preset?: OffertePreset;
  presetKey?: number;
  onClose?: () => void;
}) {
  const dialog = variant === "dialog";
  const [index, setIndex] = React.useState(geheugen?.index ?? 0);
  const [richting, setRichting] = React.useState(1);
  const [a, setA] = React.useState<Answers>(geheugen?.a ?? LEEG);
  const [pakket, setPakket] = React.useState(geheugen?.pakket ?? "");
  const [open, setOpen] = React.useState<Partial<Record<StepId, boolean>>>({});
  const [honeypot, setHoneypot] = React.useState("");
  const [bezig, setBezig] = React.useState(false);
  const [klaar, setKlaar] = React.useState(false);
  const [fout, setFout] = React.useState<string | null>(null);
  const [velden, setVelden] = React.useState<Record<string, string>>({});
  const [mobielOverzicht, setMobielOverzicht] = React.useState(false);
  const startedAt = React.useRef(Date.now());
  const kopRef = React.useRef<HTMLHeadingElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const eersteRender = React.useRef(true);
  const autoTimer = React.useRef<number | null>(null);

  const step = STEPS[index];
  const laatste = index === STEPS.length - 1;

  // Pagina: vooraf invullen vanuit de URL, of een bewaarde halve aanvraag herstellen.
  React.useEffect(() => {
    if (dialog) return;
    const q = new URLSearchParams(window.location.search);
    const dienst = q.get("dienst");
    const pk = q.get("pakket");
    if (!dienst && !pk && !geheugen) {
      try {
        const bewaard = readConsent()?.functional ? sessionStorage.getItem(OPSLAG) : null;
        if (bewaard) {
          const b = JSON.parse(bewaard) as Draft;
          setA({ ...LEEG, ...b.a, notes: b.a?.notes ?? {} });
          setIndex(Math.min(Math.max(0, b.index), STEPS.length - 1));
          if (b.pakket) setPakket(b.pakket);
          return;
        }
      } catch {
        /* niets bewaard */
      }
    }
    pasPresetToe({ services: dienst ? dienst.split(",") : undefined, pakket: pk ?? undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Venster: elke keer dat het met een preset opent, die toepassen.
  React.useEffect(() => {
    if (!dialog || presetKey === undefined) return;
    if (klaar) {
      // Na een verstuurde aanvraag begint een nieuwe opening fris.
      setKlaar(false);
      setA({ ...LEEG, name: a.name, company: a.company, email: a.email, phone: a.phone });
      setPakket("");
      setIndex(0);
    }
    pasPresetToe(preset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetKey]);

  function pasPresetToe(p?: OffertePreset) {
    if (!p) return;
    const begin = new Set<string>(geldigeDiensten(p.services ?? []));
    if (p.pakket) {
      setPakket(p.pakket);
      dienstenBijPakket(p.pakket).forEach((d) => begin.add(d));
    }
    if (begin.size) {
      setA((x) => ({ ...x, services: Array.from(new Set([...x.services, ...begin])) }));
      setRichting(-1);
      setIndex(0);
    }
  }

  // Bewaren: in het geheugen altijd, in sessionStorage alleen met toestemming.
  React.useEffect(() => {
    if (klaar) return;
    geheugen = { a, index, pakket };
    try {
      if (readConsent()?.functional) sessionStorage.setItem(OPSLAG, JSON.stringify(geheugen));
    } catch {
      /* privémodus */
    }
  }, [a, index, pakket, klaar]);

  // Nieuwe stap: focus naar de vraag (schermlezers en toetsenbord), bovenaan beginnen.
  React.useEffect(() => {
    if (eersteRender.current) {
      eersteRender.current = false;
      if (dialog) kopRef.current?.focus({ preventScroll: true });
      return;
    }
    kopRef.current?.focus({ preventScroll: true });
    if (dialog) scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    else {
      const top = kopRef.current?.closest("[data-wizard]")?.getBoundingClientRect().top ?? 0;
      if (top < 0) window.scrollBy({ top: top - 96, behavior: "smooth" });
    }
    if (!klaar) track("offerte_step", { step: STEPS[index].id, variant });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, klaar]);

  React.useEffect(
    () => () => {
      if (autoTimer.current) window.clearTimeout(autoTimer.current);
    },
    [],
  );

  const kanVerder = step.kind === "choice" ? a[step.field].length > 0 : true;

  const naar = (i: number) => {
    if (autoTimer.current) window.clearTimeout(autoTimer.current);
    setRichting(i > index ? 1 : -1);
    setIndex(Math.min(Math.max(0, i), STEPS.length - 1));
    setMobielOverzicht(false);
  };
  const volgende = () => kanVerder && !laatste && naar(index + 1);
  const terug = () => index > 0 && naar(index - 1);

  const kies = (s: ChoiceStep, value: string) => {
    if (s.multiple) {
      setA((x) => ({ ...x, [s.field]: x[s.field].includes(value) ? x[s.field].filter((v) => v !== value) : [...x[s.field], value] }));
      return;
    }
    setA((x) => ({ ...x, [s.field]: [value] }));
    // Eén keuze: vanzelf door, tenzij je net een opmerking aan het schrijven bent.
    if (open[s.id] || a.notes[s.id]) return;
    if (autoTimer.current) window.clearTimeout(autoTimer.current);
    autoTimer.current = window.setTimeout(() => {
      setRichting(1);
      setIndex((i) => Math.min(i + 1, STEPS.length - 1));
    }, 280);
  };

  const zetNotitie = (id: StepId, v: string) => setA((x) => ({ ...x, notes: { ...x.notes, [id]: v } }));

  async function verstuur(e: React.FormEvent) {
    e.preventDefault();
    if (bezig) return;
    setBezig(true);
    setFout(null);
    setVelden({});
    const answers: { label: string; value: string }[] = [];
    for (const s of STEPS) {
      if (s.kind === "choice" && s.field !== "services") answers.push({ label: s.label, value: a[s.field].join(", ") });
      const notitie = a.notes[s.id]?.trim();
      if (notitie) answers.push({ label: `Opmerking bij ${s.label.toLowerCase()}`, value: notitie });
    }
    const r = await submitLead({
      type: "offerte",
      name: a.name,
      company: a.company,
      email: a.email,
      phone: a.phone,
      message: a.message,
      siteUrl: a.siteUrl,
      services: a.services.map(titelVan),
      answers: answers.filter((x) => x.value),
      packageName: pakket || undefined,
      consentMarketing: a.newsletter,
      website: honeypot,
      startedAt: startedAt.current,
      extra: { Bron: dialog ? "Offerte-venster" : "Offertepagina", ...(preset?.bron ? { Startknop: preset.bron } : {}) },
    });
    setBezig(false);
    if (!r.ok) {
      setFout(r.message);
      setVelden(toFieldErrorMap(r.errors));
      if (r.errors?.some((x) => x.field === "services")) naar(0);
      return;
    }
    geheugen = null;
    try {
      sessionStorage.removeItem(OPSLAG);
    } catch {
      /* niets */
    }
    setKlaar(true);
  }

  const veld =
    "w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-[13.5px] text-ink shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink-subtle/80 hover:border-line-strong focus:border-ink/40 focus:shadow-[0_0_0_4px_rgb(var(--glow-rgb)/0.12)] aria-[invalid=true]:border-destructive";
  const label = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted";

  /* ── Bedankt ── */
  if (klaar) {
    const voornaam = a.name.trim().split(/\s+/)[0];
    return (
      <div data-wizard className={cn("grid", dialog ? "h-full min-h-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]" : "gap-5 lg:grid-cols-[0.9fr_1.1fr]")}>
        <Overzicht a={a} pakket={pakket} index={STEPS.length} klaar onGa={() => {}} className={cn("hidden lg:flex", dialog && "min-h-0 rounded-none border-0")} />
        <div className={cn("relative flex flex-col items-center overflow-y-auto p-7 text-center sm:p-12", dialog ? "min-h-0 justify-center" : "card enter")}>
          {dialog && <SluitKnop onClose={onClose} />}
          <span className="accent-ink grid h-14 w-14 place-items-center rounded-full">
            <Check className="h-7 w-7" strokeWidth={2.6} aria-hidden />
          </span>
          <h2 ref={kopRef} tabIndex={-1} className="mt-6 text-[1.7rem] leading-tight tracking-[-0.02em] text-ink outline-none">
            Bedankt{voornaam ? `, ${voornaam}` : ""}!
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-muted">
            We hebben je aanvraag ontvangen. Binnen 24 uur ontvang je een voorstel op maat, met planning en investering.
            {a.email ? " Er staat een bevestiging in je mailbox." : ""}
          </p>
          <ol className="mt-7 w-full max-w-md space-y-2.5 text-left">
            {["We bekijken je aanvraag persoonlijk", "Je ontvangt binnen 24 uur een voorstel op maat", "We plannen een vrijblijvende kennismaking"].map((t, i) => (
              <li key={t} className="flex items-center gap-3 rounded-xl border border-line bg-surface-sunken/60 px-4 py-3 text-[13px] text-ink">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-semibold text-page">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            {dialog ? (
              <button type="button" onClick={onClose} className="btn btn-primary">
                Sluiten
              </button>
            ) : (
              <Link href="/" className="btn btn-primary">
                Terug naar home
              </Link>
            )}
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              WhatsApp ons
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ── Stappen ── */
  const vraag = (
    <div
      key={step.id}
      className="enter relative"
      style={{ ["--in-x" as string]: `${richting * 24}px`, ["--in-y" as string]: "0px", ["--dur" as string]: "0.4s" }}
    >
      <h2 ref={kopRef} tabIndex={-1} className="text-[1.45rem] leading-tight tracking-[-0.02em] text-ink outline-none sm:text-[1.7rem]">
        {step.title}
      </h2>
      {step.subtitle && <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{step.subtitle}</p>}
      {step.kind === "choice" && step.multiple && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface-sunken px-2.5 py-1 text-[11px] font-medium text-ink-muted">
          <Check className="h-3 w-3" strokeWidth={2.6} aria-hidden />
          Meerdere keuzes mogelijk
        </p>
      )}

      {step.kind === "choice" ? (
        <>
          <div
            role={step.multiple ? "group" : "radiogroup"}
            aria-label={step.title}
            className={cn("mt-5 grid gap-2", (step.multiple || step.options.length > 4) && "sm:grid-cols-2")}
          >
            {step.options.map((o, i) => (
              <ChoiceCard
                key={o.value}
                i={i}
                option={o}
                multiple={step.multiple}
                selected={a[step.field].includes(o.value)}
                onSelect={() => kies(step, o.value)}
              />
            ))}
          </div>

          {step.id === "situatie" && a.situations.some((s) => s !== "Ik begin vanaf nul") && (
            <label className="enter mt-4 block" style={{ ["--in-y" as string]: "6px" }}>
              <span className={label}>Huidige website (optioneel)</span>
              <input className={veld} inputMode="url" placeholder="www.jouwbedrijf.nl" value={a.siteUrl} onChange={(e) => setA((x) => ({ ...x, siteUrl: e.target.value }))} />
            </label>
          )}

          <NoteField
            value={a.notes[step.id] ?? ""}
            onChange={(v) => zetNotitie(step.id, v)}
            open={Boolean(open[step.id] || a.notes[step.id])}
            onOpen={() => setOpen((o) => ({ ...o, [step.id]: true }))}
          />
        </>
      ) : (
        <form id="offerte-gegevens" onSubmit={verstuur} noValidate className="mt-5 grid gap-3.5 sm:grid-cols-2">
          {/* Honeypot */}
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
            <p role="alert" className="rounded-xl bg-destructive-soft px-4 py-3 text-[13px] text-destructive sm:col-span-2">
              {fout}
            </p>
          )}
          <label className="block">
            <span className={label}>
              Naam <span className="text-ink">*</span>
            </span>
            <input className={veld} autoComplete="name" value={a.name} onChange={(e) => setA((x) => ({ ...x, name: e.target.value }))} aria-invalid={!!velden.name || undefined} />
            {velden.name && <span className="mt-1 block text-[12px] text-destructive">{velden.name}</span>}
          </label>
          <label className="block">
            <span className={label}>Bedrijf</span>
            <input className={veld} autoComplete="organization" value={a.company} onChange={(e) => setA((x) => ({ ...x, company: e.target.value }))} />
          </label>
          <label className="block">
            <span className={label}>
              E-mailadres <span className="text-ink">*</span>
            </span>
            <input className={veld} type="email" inputMode="email" autoComplete="email" value={a.email} onChange={(e) => setA((x) => ({ ...x, email: e.target.value }))} aria-invalid={!!velden.email || undefined} />
            {velden.email && <span className="mt-1 block text-[12px] text-destructive">{velden.email}</span>}
          </label>
          <label className="block">
            <span className={label}>Telefoonnummer</span>
            <input className={veld} type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12345678" value={a.phone} onChange={(e) => setA((x) => ({ ...x, phone: e.target.value }))} aria-invalid={!!velden.phone || undefined} />
            {velden.phone && <span className="mt-1 block text-[12px] text-destructive">{velden.phone}</span>}
          </label>
          {!a.situations.some((s) => s !== "Ik begin vanaf nul") && (
            <label className="block sm:col-span-2">
              <span className={label}>Huidige website (optioneel)</span>
              <input className={veld} inputMode="url" placeholder="www.jouwbedrijf.nl" value={a.siteUrl} onChange={(e) => setA((x) => ({ ...x, siteUrl: e.target.value }))} />
            </label>
          )}
          <label className="block sm:col-span-2">
            <span className={label}>Vertel kort over je project (optioneel)</span>
            <textarea
              className={`${veld} min-h-[92px] resize-y`}
              rows={3}
              value={a.message}
              onChange={(e) => setA((x) => ({ ...x, message: e.target.value }))}
              placeholder="Bijvoorbeeld: wat je verkoopt, voor wie, en wat de website of campagne moet opleveren."
            />
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-surface-sunken/50 px-3.5 py-3 sm:col-span-2">
            <input type="checkbox" checked={a.newsletter} onChange={(e) => setA((x) => ({ ...x, newsletter: e.target.checked }))} className="peer sr-only" />
            <span
              aria-hidden
              className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border border-line-strong bg-surface transition-colors peer-checked:border-transparent peer-checked:bg-ink peer-checked:text-page peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
            >
              {a.newsletter && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span className="text-[12.5px] leading-relaxed text-ink-muted">Stuur me af en toe tips, cases en acties van Reactly. Afmelden kan altijd met één klik.</span>
          </label>
          <p className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-subtle sm:col-span-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
            We gebruiken je gegevens alleen om je aanvraag te beantwoorden. Lees ons{" "}
            <Link href="/privacybeleid" className="underline underline-offset-2 hover:text-ink">
              privacybeleid
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );

  const acties = (
    <div className={cn("flex items-center gap-3", dialog ? "border-t border-line bg-page/90 px-5 py-3.5 backdrop-blur sm:px-8" : "mt-7")}>
      <button
        type="button"
        onClick={terug}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-xl px-3 text-[12.5px] font-medium text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink",
          index === 0 && "pointer-events-none opacity-0",
        )}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Terug
      </button>
      <span className="ml-auto hidden text-[11px] font-medium uppercase tracking-[0.16em] text-ink-subtle tabular-nums sm:inline">
        Stap {index + 1} van {STEPS.length}
      </span>
      {laatste ? (
        <button type="submit" form="offerte-gegevens" disabled={bezig} className="btn btn-primary ml-auto disabled:opacity-60 sm:ml-0">
          {bezig ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Versturen…
            </>
          ) : (
            <>
              Verstuur aanvraag
              <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      ) : (
        <button type="button" onClick={volgende} disabled={!kanVerder} className="btn btn-primary ml-auto disabled:pointer-events-none disabled:opacity-40 sm:ml-0">
          Volgende
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );

  const kop = (
    <div className={cn(dialog ? "px-5 pb-4 pt-4 sm:px-8 sm:pt-6" : "")}>
      <div className="flex items-center justify-between gap-4">
        <p className="truncate text-[10.5px] font-semibold uppercase tracking-[0.22em] text-ink-subtle">{pakket ? `Aanvraag · ${pakket}` : "Offerte aanvragen"}</p>
        {dialog && <SluitKnop onClose={onClose} inline />}
      </div>
      <div className="mt-3">
        <Progress current={step.group} />
      </div>
      {/* Telefoon en tablet: inklapbaar overzicht van je keuzes. */}
      <div className="mt-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobielOverzicht((v) => !v)}
          aria-expanded={mobielOverzicht}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface-sunken/60 px-3.5 py-2.5 text-left text-[12px] font-medium text-ink"
        >
          <span className="truncate">{a.services.length ? `Jouw keuzes: ${a.services.map(titelVan).join(", ")}` : "Jouw aanvraag: nog niets gekozen"}</span>
          <ChevronDown className={cn("h-4 w-4 shrink-0 text-ink-muted transition-transform", mobielOverzicht && "rotate-180")} aria-hidden />
        </button>
        {mobielOverzicht && (
          <div className="enter mt-2 rounded-xl border border-line bg-surface p-2" style={{ ["--in-y" as string]: "-4px", ["--dur" as string]: "0.3s" }}>
            <Rijen a={a} index={index} onGa={naar} licht />
          </div>
        )}
      </div>
    </div>
  );

  if (dialog) {
    return (
      <div data-wizard className="grid h-full min-h-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <Overzicht a={a} pakket={pakket} index={index} onGa={naar} className="hidden min-h-0 rounded-none border-0 lg:flex" />
        <div className="flex min-h-0 flex-col">
          {kop}
          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-2 sm:px-8">
            {vraag}
          </div>
          {acties}
        </div>
      </div>
    );
  }

  return (
    <div data-wizard className="grid items-start gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <Overzicht a={a} pakket={pakket} index={index} onGa={naar} className="hidden lg:sticky lg:top-24 lg:flex lg:min-h-[560px]" />
      <div className="card relative overflow-hidden p-5 sm:p-8">
        {kop}
        <div className="mt-6">{vraag}</div>
        {acties}
      </div>
    </div>
  );
}

function SluitKnop({ onClose, inline }: { onClose?: () => void; inline?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Venster sluiten (je keuzes blijven bewaard)"
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink",
        !inline && "absolute right-4 top-4",
      )}
    >
      <X className="h-4 w-4" aria-hidden />
    </button>
  );
}

/* ── Overzicht (opsomming) ─────────────────────────────────────────────── */

/** De regels van het overzicht: per vraag status, keuzes, opmerking en "wijzig". */
function Rijen({ a, index, onGa, klaar, licht }: { a: Answers; index: number; onGa: (i: number) => void; klaar?: boolean; licht?: boolean }) {
  return (
    <ol className="space-y-1">
      {STEPS.map((s, i) => {
        const beantwoord = isBeantwoord(a, s);
        const huidig = !klaar && i === index;
        const waarden = waardenVan(a, s);
        const notitie = a.notes[s.id]?.trim();
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onGa(i)}
              disabled={klaar}
              aria-current={huidig ? "step" : undefined}
              className={cn(
                "group flex w-full items-start gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors",
                licht ? "hover:bg-surface-sunken" : "hover:bg-white/[0.05]",
                huidig && (licht ? "bg-surface-sunken" : "bg-white/[0.06]"),
              )}
            >
              <span
                className={cn(
                  "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10.5px] font-semibold tabular-nums transition-colors",
                  beantwoord
                    ? licht
                      ? "bg-ink text-page"
                      : "bg-white text-[#0a0b10]"
                    : huidig
                      ? licht
                        ? "border border-ink text-ink"
                        : "border border-white/70 text-white"
                      : licht
                        ? "border border-line-strong text-ink-subtle"
                        : "border border-white/20 text-white/45",
                )}
              >
                {beantwoord ? <Check className="h-3 w-3" strokeWidth={3} aria-hidden /> : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3">
                  <span className={cn("text-[11px] font-semibold uppercase tracking-[0.16em]", licht ? "text-ink-muted" : "text-white/55")}>{s.label}</span>
                  {beantwoord && !klaar && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[11px] font-medium opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
                        licht ? "text-ink-muted" : "text-white/60",
                      )}
                    >
                      <Pencil className="h-3 w-3" aria-hidden />
                      Wijzig
                    </span>
                  )}
                </span>
                {waarden.length > 0 ? (
                  <span className="mt-1.5 flex flex-wrap gap-1.5">
                    {waarden.slice(0, 4).map((w) => (
                      <span
                        key={w}
                        className={cn(
                          "rounded-full px-2.5 py-[3px] text-[11.5px] font-medium",
                          licht ? "border border-line bg-surface text-ink" : "border border-white/12 bg-white/[0.06] text-white/90",
                        )}
                      >
                        {w}
                      </span>
                    ))}
                    {waarden.length > 4 && <span className={cn("rounded-full px-2 py-[3px] text-[11.5px]", licht ? "text-ink-muted" : "text-white/55")}>+{waarden.length - 4}</span>}
                  </span>
                ) : (
                  <span className={cn("mt-0.5 block text-[12px]", licht ? "text-ink-subtle" : "text-white/35")}>{huidig ? "Nu aan de beurt" : "Nog open"}</span>
                )}
                {notitie && (
                  <span className={cn("mt-1.5 line-clamp-2 block border-l-2 pl-2 text-[11.5px] italic", licht ? "border-line-strong text-ink-muted" : "border-white/20 text-white/60")}>
                    {notitie}
                  </span>
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/** Het live overzicht naast de stappen: een diep vlak met je keuzes, voortgang en vertrouwen. */
function Overzicht({
  a,
  pakket,
  index,
  onGa,
  klaar,
  className,
}: {
  a: Answers;
  pakket: string;
  index: number;
  onGa: (i: number) => void;
  klaar?: boolean;
  className?: string;
}) {
  const klaarAantal = STEPS.filter((s) => isBeantwoord(a, s)).length;
  const pct = klaar ? 100 : Math.round((klaarAantal / STEPS.length) * 100);
  const r = 22;
  const omtrek = 2 * Math.PI * r;
  return (
    <aside className={cn("deep noise relative isolate flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-page p-6 text-white lg:p-7", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-28 h-80 w-80 bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
        <div className="absolute -bottom-28 -right-20 h-80 w-80 bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-[0.15]" />
      </div>
      <RubikCube size={46} pose="tilt" shadow={false} className="absolute -right-1 top-3 animate-float opacity-95" />

      <div className="flex items-center gap-4 pr-16">
        <div className="relative h-14 w-14 shrink-0">
          <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90" aria-hidden>
            <circle cx="28" cy="28" r={r} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="3.5" />
            <circle
              cx="28"
              cy="28"
              r={r}
              fill="none"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={omtrek}
              strokeDashoffset={omtrek * (1 - pct / 100)}
              className="transition-[stroke-dashoffset] duration-700 ease-premium"
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[11.5px] font-semibold tabular-nums">{pct}%</span>
        </div>
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/55">Jouw aanvraag</p>
          <h3 className="mt-1 text-[1.15rem] font-medium leading-tight tracking-[-0.01em]">
            {klaar ? "Verstuurd, dank je wel" : klaarAantal === 0 ? "Stel je aanvraag samen" : klaarAantal >= 5 ? "Bijna klaar" : "Je aanvraag krijgt vorm"}
          </h3>
        </div>
      </div>

      {pakket && (
        <p className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-white/12 bg-white/[0.05] px-3.5 py-2.5 text-[12px]">
          <span className="text-white/55">Gekozen pakket</span>
          <span className="text-right font-semibold text-white">{pakket}</span>
        </p>
      )}

      <div className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
        <Rijen a={a} index={index} onGa={onGa} klaar={klaar} />
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-[11px] text-white/70">
        <li className="flex flex-col items-start gap-1.5">
          <Clock className="h-4 w-4 text-white/80" aria-hidden />
          Voorstel binnen 24 uur
        </li>
        <li className="flex flex-col items-start gap-1.5">
          <ShieldCheck className="h-4 w-4 text-white/80" aria-hidden />
          Vrijblijvend
        </li>
        <li className="flex flex-col items-start gap-1.5">
          <Star className="h-4 w-4 fill-current text-[#00b67a]" aria-hidden />
          4,8 / 5 op Trustpilot
        </li>
      </ul>
    </aside>
  );
}

export type { OffertePreset };
