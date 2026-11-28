"use client";

/**
 * components/site/chat/ChatBox.tsx
 *
 * Het chatvenster van Reactly, opgebouwd zoals de chat van BeterLease:
 *
 *  - home       welkom met sterren en rook, en vijf routes: AI-chat,
 *               offerte in 2 minuten, WhatsApp, bellen (met open/gesloten)
 *               en "laat je gegevens achter";
 *  - overview   "Berichten": een gesprek starten of hervatten;
 *  - chat       het gesprek met de AI-assistent (Claude), live gestreamd,
 *               met suggesties, typ-indicator, knoppen onder antwoorden,
 *               foto's en pdf's als bijlage en de kaart "een collega neemt
 *               het over";
 *  - gegevens   het terugbelformulier.
 *
 * Op een telefoon schermvullend, vanaf `sm` een zwevende kaart rechtsonder
 * die je kunt vergroten. Het gesprek blijft bewaard als je hem sluit.
 */

import * as React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Maximize2,
  MessageSquare,
  Minimize2,
  Paperclip,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

import { Wordmark } from "../Brand";
import Smoke from "../Smoke";
import { WhatsAppIcon } from "../WhatsAppIcon";
import ChatLeadForm from "./ChatLeadForm";
import ChatMedewerker from "./ChatMedewerker";
import { Stars } from "@/components/Stars/Stars";
import { SITE, isOpenNow, todayOpeningLabel } from "@/lib/site";
import { cn } from "@/lib/utils";

const MARKERING = "[[MEDEWERKER]]";

type Bijlage = { type: string; data: string; naam: string; voorbeeld?: string };

/** Knoppen die de assistent onder een antwoord kan zetten met [[KNOP:x]]. */
const KNOPPEN: Record<string, { label: string; href: string; extern?: boolean }> = {
  offerte: { label: "Start je aanvraag", href: "/offerte" },
  diensten: { label: "Bekijk de diensten", href: "/diensten" },
  prijzen: { label: "Bekijk de prijzen", href: "/prijzen" },
  contact: { label: "Plan een kennismaking", href: "/contact" },
  componenten: { label: "Bekijk voorbeelden", href: "/componenten" },
  whatsapp: { label: "WhatsApp ons", href: SITE.whatsapp.href, extern: true },
  bellen: { label: `Bel ${SITE.phone.display}`, href: SITE.phone.href },
};
const KNOP_RE = /\[\[KNOP:([a-z]+)\]\]/g;

/** Markeringen weghalen (ook een regel met alleen een knop, en een half binnengekomen "[[KNO…"). */
const schoon = (t: string) =>
  t
    .replace(MARKERING, "")
    .replace(/^[ \t]*\[\[KNOP:[a-z]+\]\][^\n]*$/gm, "")
    .replace(KNOP_RE, "")
    .replace(/\[\[[A-Z:a-z]*$/, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

/** Foto verkleinen tot max. 1280px als JPEG: snel versturen, ruim onder de limiet. */
async function leesBijlage(file: File): Promise<Bijlage | string> {
  if (file.type === "application/pdf") {
    if (file.size > 1.5 * 1024 * 1024) return `${file.name} is te groot (max. 1,5 MB).`;
    const buf = new Uint8Array(await file.arrayBuffer());
    let bin = "";
    for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
    return { type: "application/pdf", data: btoa(bin), naam: file.name };
  }
  if (!file.type.startsWith("image/")) return `${file.name}: alleen foto's en pdf's.`;
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return `${file.name} kon niet worden gelezen.`;
  const schaal = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * schaal);
  canvas.height = Math.round(bitmap.height * schaal);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const url = canvas.toDataURL("image/jpeg", 0.82);
  return { type: "image/jpeg", data: url.split(",")[1], naam: file.name, voorbeeld: url };
}

const SUGGESTIES = [
  "Wat kost een nieuwe website?",
  "Hoe snel kan mijn site live?",
  "Kunnen jullie mijn SEO verbeteren?",
  "Ik wil een collega spreken",
];

const WELKOM = `Hoi! Wat leuk dat je contact met ons opneemt. 👋

Stel gerust je vraag over je website, webshop of marketing. Je kunt ook mailen naar [${SITE.email}](mailto:${SITE.email}) of bellen naar [${SITE.phone.display}](${SITE.phone.href}).

💬 Deze chat staat dag en nacht voor je klaar; onze strategen reageren tijdens openingstijden.`;

interface ChatMessage {
  from: "bot" | "user";
  text: string;
  medewerker?: boolean;
  knoppen?: string[];
  bijlagen?: Bijlage[];
}

type View = "home" | "overview" | "chat" | "gegevens";

const tijdstip = () =>
  new Date().toLocaleString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

/** Avatar van de assistent: het woordmerk-initiaal op een diep vlak. */
function Avatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "deep relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-page text-white ring-1 ring-white/15",
        className,
      )}
    >
      <span className="text-[1.05rem] font-bold italic" style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        R
      </span>
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-emerald-500" />
    </span>
  );
}

export default function ChatBox({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const [open, setOpen] = React.useState(false);
  const [openingLabel, setOpeningLabel] = React.useState("");
  React.useEffect(() => {
    // Pas na hydratatie: anders wijkt de server (UTC) af van de browser.
    const update = () => {
      setOpen(isOpenNow());
      setOpeningLabel(todayOpeningLabel());
    };
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  const [view, setView] = React.useState<View>("home");
  const [messages, setMessages] = React.useState<ChatMessage[]>([{ from: "bot", text: WELKOM }]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [streamt, setStreamt] = React.useState(false);
  const [introPending, setIntroPending] = React.useState(false);
  const [bijlagen, setBijlagen] = React.useState<Bijlage[]>([]);
  const [bijlageFout, setBijlageFout] = React.useState<string | null>(null);
  const [startTijd, setStartTijd] = React.useState<string | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const bestandRef = React.useRef<HTMLInputElement>(null);
  const eindeRef = React.useRef<HTMLDivElement>(null);
  const afbreken = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    if (isOpen && !startTijd) setStartTijd(tijdstip());
  }, [isOpen, startTijd]);

  React.useEffect(() => {
    eindeRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  React.useEffect(() => {
    if (!isOpen) afbreken.current?.abort();
  }, [isOpen]);

  // Escape sluit de chat.
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, setIsOpen]);

  // Eerste keer in het gesprek: even "typen" voordat het welkom verschijnt.
  React.useEffect(() => {
    if (view === "chat" && messages.length === 1 && messages[0].from === "bot") {
      setIntroPending(true);
      setIsTyping(true);
      const t = setTimeout(() => {
        setIntroPending(false);
        setIsTyping(false);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [view, messages]);

  const kiesBestanden = async (files: FileList | null) => {
    if (!files) return;
    setBijlageFout(null);
    const nieuw: Bijlage[] = [];
    for (const f of Array.from(files).slice(0, 3 - bijlagen.length)) {
      const r = await leesBijlage(f);
      if (typeof r === "string") setBijlageFout(r);
      else nieuw.push(r);
    }
    setBijlagen((b) => [...b, ...nieuw].slice(0, 3));
    if (bestandRef.current) bestandRef.current.value = "";
  };

  const handleSend = async (tekst?: string) => {
    const meegestuurd = tekst ? [] : bijlagen;
    const trimmed = (tekst ?? input).trim() || (meegestuurd.length ? "Ik stuur je een bijlage." : "");
    if (!trimmed || isTyping || streamt) return;
    setBijlagen([]);

    const userMsg: ChatMessage = { from: "user", text: trimmed, bijlagen: meegestuurd };
    const outgoing = [
      ...messages.map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text })),
      { role: "user" as const, content: trimmed, bijlagen: meegestuurd.map(({ type, data }) => ({ type, data })) },
    ];

    setInput("");
    setIsTyping(true);
    setStreamt(true);
    const ctrl = new AbortController();
    afbreken.current = ctrl;
    // Vraagt de bezoeker zelf om een mens, dan meteen de kaart.
    const wilMens = /medewerker|collega|iemand spreken|bel(?:len)? me|terugbel/i.test(trimmed);

    setMessages((prev) => [...prev, userMsg, { from: "bot", text: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: outgoing }),
        signal: ctrl.signal,
      });
      if (!response.ok || !response.body) {
        const melding = (await response.text().catch(() => "")).slice(0, 300);
        throw new Error(melding || `HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botText = "";
      let eerste = true;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        botText += chunk;
        if (eerste) {
          setIsTyping(false);
          eerste = false;
        }
        setMessages((prev) => {
          const next = [...prev];
          const i = next.length - 1;
          if (next[i]?.from === "bot") next[i] = { ...next[i], text: schoon(botText) };
          return next;
        });
      }

      const medewerker = botText.includes(MARKERING) || wilMens;
      const knoppen = Array.from(new Set(Array.from(botText.matchAll(KNOP_RE), (m) => m[1]).filter((k) => KNOPPEN[k]))).slice(0, 2);
      setMessages((prev) => {
        const next = [...prev];
        const i = next.length - 1;
        if (next[i]?.from === "bot") next[i] = { ...next[i], text: schoon(botText), medewerker, knoppen };
        return next;
      });
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return;
      const tekst =
        (e as Error)?.message && !/^HTTP \d+$/.test((e as Error).message)
          ? (e as Error).message
          : "Sorry, ik kon geen antwoord ophalen. Probeer het opnieuw of bel ons gerust.";
      setMessages((prev) => {
        const next = [...prev];
        const i = next.length - 1;
        if (next[i]?.from === "bot") next[i] = { from: "bot", text: tekst };
        else next.push({ from: "bot", text: tekst });
        return next;
      });
    } finally {
      setIsTyping(false);
      setStreamt(false);
    }
  };

  const startChat = () => {
    if (messages.length === 1) setStartTijd(tijdstip());
    setView("chat");
  };

  /* ── Onderdelen ─────────────────────────────────────────────────────── */

  const kopKnop =
    "grid h-9 w-9 place-items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const kleur = (licht: boolean) =>
    licht ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-ink-muted hover:bg-surface-sunken hover:text-ink";
  const KopKnoppen = ({ licht = false }: { licht?: boolean }) => (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        className={cn(kopKnop, "hidden md:grid", kleur(licht))}
        aria-label={isExpanded ? "Venster verkleinen" : "Venster vergroten"}
      >
        {isExpanded ? <Minimize2 className="h-4 w-4" aria-hidden /> : <Maximize2 className="h-4 w-4" aria-hidden />}
      </button>
      <button type="button" onClick={() => setIsOpen(false)} aria-label="Chat sluiten" className={cn(kopKnop, kleur(licht))}>
        <X className="h-[18px] w-[18px]" aria-hidden />
      </button>
    </div>
  );

  const Voet = () => (
    <nav aria-label="Chatmenu" className="relative z-20 flex items-center justify-around border-t border-line bg-surface py-3">
      {[
        { id: "home" as const, label: "Home", icon: Home, actief: view === "home" },
        { id: "overview" as const, label: "Berichten", icon: MessageSquare, actief: view === "overview" || view === "chat" },
      ].map(({ id, label, icon: Icon, actief }) => (
        <button
          key={id}
          type="button"
          onClick={() => setView(id)}
          className={cn("flex flex-col items-center gap-1.5 text-xs font-medium transition-colors", actief ? "text-brand-fg" : "text-ink-muted hover:text-ink")}
        >
          <Icon className="h-[22px] w-[22px]" strokeWidth={actief ? 2.2 : 1.8} aria-hidden />
          {label}
        </button>
      ))}
    </nav>
  );

  const Route = ({
    titel,
    sub,
    punt = "bg-emerald-500",
    icon,
    i = 0,
    href,
    extern,
    onClick,
  }: {
    titel: string;
    sub: string;
    punt?: string;
    icon: React.ReactNode;
    i?: number;
    href?: string;
    extern?: boolean;
    onClick?: () => void;
  }) => {
    const inner = (
      <>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-sunken text-ink">{icon}</span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-[13px] font-semibold tracking-wide text-ink">{titel}</span>
          <span className="flex items-center gap-1.5 text-xs text-ink-muted">
            <span className={cn("inline-block h-2 w-2 rounded-full", punt)} />
            {sub}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-ink-subtle transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
      </>
    );
    const cls =
      "enter group flex w-full items-center gap-3.5 rounded-2xl border border-line bg-surface px-3.5 py-3 shadow-card transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_14px_34px_-16px_rgb(var(--glow-rgb)/0.55)]";
    const style = { ["--i" as string]: i, ["--stagger" as string]: "60ms", ["--in-y" as string]: "12px" } as React.CSSProperties;
    if (onClick) {
      return (
        <button type="button" onClick={onClick} className={cls} style={style}>
          {inner}
        </button>
      );
    }
    return extern ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
        {inner}
      </a>
    ) : (
      <Link href={href!} onClick={() => setIsOpen(false)} className={cls} style={style}>
        {inner}
      </Link>
    );
  };

  const renderHome = () => (
    <div className="deep relative flex h-full w-full flex-col bg-page text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Stars number={60} />
        <Smoke intensity={0.5} eager />
        <div className="absolute -right-24 -top-24 h-72 w-72 bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Wordmark className="text-[1.45rem] text-white" />
          <KopKnoppen licht />
        </div>

        <div className="pt-4">
          <h2 className="font-display text-[1.9rem] font-semibold leading-tight">Welkom 👋</h2>
          <p className="pb-7 pt-1 text-[1.05rem] font-medium text-white/80">Hoe kunnen we je helpen?</p>

          <div className="space-y-2.5">
            <Route
              i={0}
              onClick={() => setView("overview")}
              titel="Stel je vraag"
              sub="Chat met onze AI-assistent"
              icon={<Sparkles className="h-[18px] w-[18px]" aria-hidden />}
            />
            <Route
              i={1}
              href="/offerte"
              titel="Offerte in 2 minuten"
              sub="Voorstel binnen 24 uur"
              icon={<FileText className="h-[18px] w-[18px]" aria-hidden />}
            />
            <Route
              i={2}
              href={SITE.whatsapp.href}
              extern
              titel="WhatsApp"
              sub="Vaak binnen 5 minuten reactie"
              icon={<WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />}
            />
            <Route
              i={3}
              href={SITE.phone.href}
              extern
              titel="Bellen"
              sub={open ? openingLabel : "Momenteel gesloten"}
              punt={open ? "bg-emerald-500" : "bg-red-500"}
              icon={<Phone className="h-[18px] w-[18px]" aria-hidden />}
            />
            <Route
              i={4}
              onClick={() => setView("gegevens")}
              titel="Laat je gegevens achter"
              sub="Wij bellen je terug"
              icon={<MessageSquare className="h-[18px] w-[18px]" aria-hidden />}
            />
          </div>
        </div>
      </div>
      <Voet />
    </div>
  );

  const renderOverview = () => (
    <div className="flex h-full w-full flex-col bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="w-9 md:w-[76px]" aria-hidden />
        <h2 className="text-base font-semibold text-ink">Berichten</h2>
        <KopKnoppen />
      </div>
      <button type="button" onClick={startChat} className="flex items-center justify-between px-4 py-5 text-left transition-colors hover:bg-page">
        <span className="flex items-center gap-3">
          <Avatar />
          <span>
            <span className="block text-sm font-medium text-ink">{messages.length > 1 ? "Hervat gesprek" : "Start een gesprek"}</span>
            <span className="block text-xs text-ink-muted">{messages.length > 1 ? "Je kunt verder chatten" : "We staan voor je klaar"}</span>
          </span>
        </span>
        <ChevronRight className="h-4 w-4 text-ink-subtle" aria-hidden />
      </button>
      <div className="mt-auto p-5">
        <button type="button" onClick={startChat} className="btn btn-primary btn-sm mx-auto flex">
          {messages.length > 1 ? "Verder chatten" : "Stuur ons een bericht"}
        </button>
      </div>
      <Voet />
    </div>
  );

  const gesprekTot = (index: number) =>
    messages
      .slice(0, index + 1)
      .map(
        (m) =>
          `${m.from === "user" ? "Bezoeker" : "Assistent"}: ${m.text}${
            m.bijlagen?.length ? ` [${m.bijlagen.length} bijlage(n) gedeeld: ${m.bijlagen.map((b) => b.naam).join(", ")}]` : ""
          }`,
      )
      .join("\n\n");

  const renderChat = () => (
    <div className="flex h-full flex-col bg-page">
      <div className="flex items-center justify-between border-b border-line bg-surface px-3 py-3 text-sm font-medium shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setView("overview")}
            aria-label="Terug naar berichten"
            className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-surface-sunken"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <Avatar />
          <div>
            <div className="text-sm text-ink">Reactly</div>
            <div className="flex items-center gap-1 text-xs tracking-wide text-ink-subtle">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              {streamt ? "Typt…" : "Online"}
            </div>
          </div>
        </div>
        <KopKnoppen />
      </div>

      <div className="flex flex-1 flex-col space-y-3 overflow-y-auto p-4 text-sm" aria-live="polite">
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            {index === 0 && startTijd && <div className="text-center text-[10px] text-ink-subtle">{startTijd}</div>}
            {!((introPending && index === 0) || (msg.from === "bot" && msg.text.trim().length === 0)) && (
              <div
                className={cn(
                  "enter max-w-[84%] rounded-2xl px-4 py-2.5 text-[12.5px] leading-relaxed shadow-card",
                  msg.from === "bot"
                    ? "self-start rounded-bl-md border border-line bg-surface text-ink [&_p+p]:mt-2 [&_ul]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-4"
                    : "accent-ink self-end whitespace-pre-line rounded-br-md",
                )}
                style={{ ["--in-y" as string]: "8px", ["--dur" as string]: "0.35s" }}
              >
                {msg.from === "bot" ? (
                  <ReactMarkdown
                    components={{
                      a: ({ node: _node, href = "", ...props }) =>
                        href.startsWith("/") ? (
                          <Link href={href} onClick={() => setIsOpen(false)} className="font-medium text-brand-fg underline underline-offset-2">
                            {props.children}
                          </Link>
                        ) : (
                          <a {...props} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-fg underline underline-offset-2" />
                        ),
                      strong: ({ node: _node, ...props }) => <span {...props} className="font-medium" />,
                      h3: ({ node: _node, ...props }) => <h3 {...props} className="mb-1 text-[13px] font-semibold" />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  <>
                    {msg.bijlagen && msg.bijlagen.length > 0 && (
                      <span className="mb-1.5 flex flex-wrap gap-1.5">
                        {msg.bijlagen.map((b, i) =>
                          b.voorbeeld ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={i} src={b.voorbeeld} alt={b.naam} className="h-24 w-24 rounded-lg object-cover ring-1 ring-white/30" />
                          ) : (
                            <span key={i} className="rounded-lg bg-white/15 px-2 py-1 text-[10px]">
                              📄 {b.naam}
                            </span>
                          ),
                        )}
                      </span>
                    )}
                    {msg.text}
                  </>
                )}
              </div>
            )}

            {msg.knoppen && msg.knoppen.length > 0 && (
              <div className="enter flex flex-wrap gap-2 self-start" style={{ ["--in-y" as string]: "6px" }}>
                {msg.knoppen.map((k) =>
                  KNOPPEN[k].extern || !KNOPPEN[k].href.startsWith("/") ? (
                    <a
                      key={k}
                      href={KNOPPEN[k].href}
                      {...(KNOPPEN[k].extern ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex h-9 items-center rounded-full border border-line-strong bg-surface-sunken dark:border-brand/40 dark:bg-brand-soft px-3.5 text-[11.5px] font-semibold text-brand-fg transition-all hover:bg-brand hover:text-brand-contrast"
                    >
                      {KNOPPEN[k].label} →
                    </a>
                  ) : (
                    <Link
                      key={k}
                      href={KNOPPEN[k].href}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex h-9 items-center rounded-full border border-line-strong bg-surface-sunken dark:border-brand/40 dark:bg-brand-soft px-3.5 text-[11.5px] font-semibold text-brand-fg transition-all hover:bg-brand hover:text-brand-contrast"
                    >
                      {KNOPPEN[k].label} →
                    </Link>
                  ),
                )}
              </div>
            )}

            {msg.medewerker && <ChatMedewerker gesprek={gesprekTot(index)} />}

            {index === 0 && messages.length === 1 && !introPending && (
              <div className="enter flex flex-wrap gap-2 pt-1" style={{ ["--d" as string]: "150ms" }}>
                {SUGGESTIES.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleSend(v)}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11.5px] text-ink transition-all hover:border-brand/40 hover:text-brand-fg hover:shadow-[0_0_16px_rgb(var(--glow-rgb)/0.18)]"
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}

        {isTyping && (
          <div className="enter self-start rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3 shadow-card" role="status" aria-label="De assistent typt">
            <span className="flex gap-1">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-subtle" style={{ animationDelay: `${d * 140}ms` }} />
              ))}
            </span>
          </div>
        )}
        <div ref={eindeRef} />
      </div>

      {(bijlagen.length > 0 || bijlageFout) && (
        <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface px-3 pt-2.5">
          {bijlagen.map((b, n) => (
            <span key={n} className="enter relative">
              {b.voorbeeld ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.voorbeeld} alt={b.naam} className="h-14 w-14 rounded-lg object-cover ring-1 ring-line" />
              ) : (
                <span className="grid h-14 w-28 place-items-center truncate rounded-lg bg-page px-2 text-[10px] text-ink-muted ring-1 ring-line">📄 {b.naam}</span>
              )}
              <button
                type="button"
                onClick={() => setBijlagen((x) => x.filter((_, j) => j !== n))}
                aria-label={`${b.naam} verwijderen`}
                className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] text-page ring-2 ring-surface"
              >
                ×
              </button>
            </span>
          ))}
          {bijlageFout && (
            <span role="alert" className="text-[11px] text-destructive">
              {bijlageFout}
            </span>
          )}
        </div>
      )}

      <div className="flex items-end gap-2 border-t border-line bg-surface px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <input
          ref={bestandRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
          multiple
          hidden
          onChange={(e) => kiesBestanden(e.target.files)}
        />
        <button
          type="button"
          onClick={() => bestandRef.current?.click()}
          disabled={bijlagen.length >= 3 || streamt}
          aria-label="Foto of pdf toevoegen"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink disabled:opacity-40"
        >
          <Paperclip className="h-5 w-5" aria-hidden />
        </button>
        <textarea
          rows={1}
          className="max-h-32 min-h-[40px] flex-1 resize-none rounded-2xl border border-line bg-page px-4 py-2.5 text-sm leading-snug text-ink outline-none transition focus:border-brand/50 focus:shadow-[0_0_0_3px_hsl(var(--brand)/0.12)]"
          placeholder="Typ je bericht…"
          value={input}
          aria-label="Bericht"
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              handleSend();
              (e.target as HTMLTextAreaElement).style.height = "auto";
            }
          }}
        />
        <button
          type="button"
          onClick={() => handleSend()}
          disabled={(!input.trim() && bijlagen.length === 0) || streamt}
          className="accent-fill accent-glow grid h-10 w-10 shrink-0 place-items-center rounded-full transition hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          aria-label="Verstuur bericht"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div aria-hidden onClick={() => setIsOpen(false)} className="fixed inset-0 z-[115] animate-in fade-in-0 bg-overlay/45 backdrop-blur-sm duration-300" />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Chat met Reactly"
        className={cn(
          "fixed inset-0 z-[120] flex h-[100dvh] w-full flex-col overflow-hidden bg-surface shadow-dialog transition-[opacity,transform,width,height] duration-500 ease-premium",
          "sm:inset-auto sm:bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:right-4 sm:rounded-[1.4rem] sm:border sm:border-line",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
          isExpanded ? "sm:h-[80dvh] sm:w-[600px] xl:w-[70vw]" : "sm:h-[640px] sm:max-h-[calc(100dvh-2rem)] sm:w-[380px]",
        )}
      >
        {view === "gegevens" && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Chat sluiten"
            className="absolute right-3 top-3 z-50 grid h-9 w-9 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-[18px] w-[18px]" aria-hidden />
          </button>
        )}

        {view === "home" && renderHome()}
        {view === "overview" && renderOverview()}
        {view === "chat" && renderChat()}
        {view === "gegevens" && (
          <div className="deep relative flex h-full w-full flex-col overflow-hidden bg-page">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
            <ChatLeadForm onTerug={() => setView("home")} />
          </div>
        )}
      </div>
    </>
  );
}
