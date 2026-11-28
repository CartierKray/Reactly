/**
 * components/site/home/Services.tsx  (Server Component)
 *
 * "Alles voor online groei, onder één dak": alle negen diensten als een
 * bento-galerij met echte beelden in plaats van getekende schetsjes.
 *
 *  - Elke dienst heeft een eigen kleur (`--tone`): een zachte kleurwas rond
 *    het beeld, een gekleurde gloed en lichtvlek bij hover, en de icoontegel.
 *  - Diepte: de kaart kantelt licht mee met de muis (Tilt), het beeld zoomt
 *    langzaam in en de zwevende glazen labels schuiven op hun eigen tempo.
 *  - Webdesign toont direct "premium webdesign": een browser en telefoon met
 *    een echte site; AI toont de assistenten met een stukje gesprek.
 *  - De laatste tegel is een diep vlak met de Rubik's cube en de weg naar de
 *    offerte-aanvraag.
 */

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Gauge,
  LineChart,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  Smartphone,
  Target,
  type LucideIcon,
} from "lucide-react";

import { RubikCube } from "../RubikCube";
import { Container, Glow, Section, SectionHeading } from "../Layout";
import Reveal from "../Reveal";
import Tilt from "../Tilt";
import { order } from "@/lib/motion";
import { SERVICES, type Service } from "@/lib/content";
import { cn } from "@/lib/utils";

type Chip = { icon: LucideIcon; text: string; pos: string; shift: string };
type Media = { src: string; alt: string; tone: string; position?: string; chips: Chip[] };

/** Beeld, kleur (RGB) en zwevende labels per dienst. */
const MEDIA: Record<string, Media> = {
  webdesign: {
    src: "/images/grid-4.png",
    alt: "Voorbeeld van een website en mobiele weergave ontworpen door Reactly",
    tone: "99 102 241",
    chips: [{ icon: Smartphone, text: "Mobile-first", pos: "left-4 bottom-4", shift: "group-hover:-translate-y-2" }],
  },
  development: {
    src: "/images/Rectangle-4993.png",
    alt: "Dashboards met API-koppelingen en realtime data",
    tone: "6 182 212",
    chips: [{ icon: Gauge, text: "PageSpeed 95+", pos: "left-4 bottom-4", shift: "group-hover:-translate-y-2" }],
  },
  seo: {
    src: "/images/bcbcf2e6425a9c933e17.png",
    alt: "Marketeers bekijken het verkeer uit Google",
    tone: "16 185 129",
    position: "object-[50%_30%]",
    chips: [{ icon: Search, text: "Lokaal vindbaar", pos: "right-4 top-4", shift: "group-hover:translate-y-1.5" }],
  },
  advertising: {
    src: "/images/2b927a4ffbe1a0517883.png",
    alt: "Team bekijkt de resultaten van productadvertenties",
    tone: "245 158 11",
    position: "object-[50%_30%]",
    chips: [{ icon: Target, text: "Elke euro meetbaar", pos: "right-4 top-4", shift: "group-hover:translate-y-1.5" }],
  },
  branding: {
    src: "/images/chinese.png",
    alt: "Portret in paarse tinten als voorbeeld van een sterk merkbeeld",
    tone: "217 70 239",
    position: "object-[50%_25%]",
    chips: [{ icon: Palette, text: "Logo · kleur · type", pos: "left-4 bottom-4", shift: "group-hover:-translate-y-2" }],
  },
  ai: {
    src: "/images/8767b54c45dea940138c.png",
    alt: "AI-assistenten die dag en nacht voor je werken",
    tone: "59 130 246",
    chips: [],
  },
  social: {
    src: "/images/1c51de3384e4cffd351e.png",
    alt: "Marketeers bekijken de resultaten per social kanaal",
    tone: "236 72 153",
    position: "object-[50%_30%]",
    chips: [{ icon: Megaphone, text: "Meta · TikTok · LinkedIn", pos: "right-4 top-4", shift: "group-hover:translate-y-1.5" }],
  },
  ecommerce: {
    src: "/images/0439cdf32ed5719b1e3e.png",
    alt: "Ondernemers bekijken de verkoop per productcategorie",
    tone: "249 115 22",
    position: "object-[50%_30%]",
    chips: [{ icon: ShoppingBag, text: "Snelle checkout", pos: "right-4 top-4", shift: "group-hover:translate-y-1.5" }],
  },
  conversie: {
    src: "/images/03f89958d87f631ea5d3.png",
    alt: "Analisten bekijken verkeer en betrokkenheid in een dashboard",
    tone: "20 184 166",
    position: "object-[50%_30%]",
    chips: [{ icon: LineChart, text: "A/B-tests · GA4", pos: "right-4 top-4", shift: "group-hover:translate-y-1.5" }],
  },
};

/** Volgorde in het raster (3 kolommen): breed + smal, drie smal, breed + smal, twee smal + CTA. */
const LAYOUT: { id: string; wide?: boolean }[] = [
  { id: "webdesign", wide: true },
  { id: "development" },
  { id: "seo" },
  { id: "advertising" },
  { id: "branding" },
  { id: "ai", wide: true },
  { id: "social" },
  { id: "ecommerce" },
  { id: "conversie" },
];

export default function Services() {
  const byId = new Map(SERVICES.map((s) => [s.id, s]));

  return (
    <Section id="diensten" aria-labelledby="diensten-title" className="overflow-hidden">
      <Glow />
      {/* Kleurige diepte achter het raster. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[2%] top-[22%] h-[560px] w-[560px] bg-[radial-gradient(closest-side,rgb(99_102_241/0.10),transparent)] dark:opacity-60" />
        <div className="absolute right-[0%] top-[46%] h-[600px] w-[600px] bg-[radial-gradient(closest-side,rgb(236_72_153/0.08),transparent)] dark:opacity-50" />
        <div className="absolute bottom-[4%] left-[28%] h-[520px] w-[680px] bg-[radial-gradient(closest-side,rgb(6_182_212/0.08),transparent)] dark:opacity-50" />
      </div>

      <Container>
        <Reveal>
          <SectionHeading
            id="diensten-title"
            eyebrow="Wat we doen"
            title={
              <>
                Alles voor online groei,
                <br className="hidden sm:block" /> <span className="text-gradient">onder één dak</span>
              </>
            }
            lede="Strategie, design, development en marketing: één team dat jouw merk laat groeien, van eerste schets tot elke nieuwe lead."
          />
          <ul className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2 text-[11.5px] font-medium text-ink-muted">
            {["9 disciplines", "1 vast team", "Offerte binnen 24 uur"].map((t) => (
              <li key={t} className="rounded-full border border-line bg-surface/70 px-3.5 py-1.5 backdrop-blur">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal group className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {LAYOUT.map(({ id, wide }, i) => {
            const s = byId.get(id);
            return s ? <ServiceCard key={id} service={s} media={MEDIA[id]} index={i} wide={!!wide} /> : null;
          })}

          {/* Afsluitende tegel: offerte-aanvraag. */}
          <Tilt className="reveal-item md:col-span-2 lg:col-span-1" style={order(LAYOUT.length)}>
            <Link
              href="/offerte"
              className="deep noise group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-page p-7 text-white transition-[box-shadow,transform] duration-500 ease-premium hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgb(var(--glow-rgb)/0.55)]"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-24 h-80 w-80 bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
                <div className="absolute -bottom-28 -left-16 h-72 w-72 bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
                <div className="bg-grid mask-radial absolute inset-0 opacity-25" />
                <span className="absolute inset-0 opacity-0 transition-opacity duration-500 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgb(255_255_255/0.08),transparent_45%)] group-hover:opacity-100" />
              </div>
              <RubikCube size={56} className="absolute right-6 top-6 animate-float" />
              <p className="relative text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">Niet zeker wat je nodig hebt?</p>
              <h3 className="relative mt-auto pt-16 text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.02em]">
                Stel in 2 minuten je aanvraag samen
              </h3>
              <p className="relative mt-3 text-[13.5px] leading-relaxed text-white/65">
                Kies wat je wilt bereiken; wij sturen binnen 24 uur een voorstel op maat met planning en investering.
              </p>
              <span className="btn btn-primary btn-sm relative mt-7 self-start">
                Start je aanvraag
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </Tilt>
        </Reveal>

        <p className="mt-10 text-center text-[13px] text-ink-muted">
          Liever eerst alles op een rij?{" "}
          <Link href="/diensten" className="inline-flex items-center gap-1 font-semibold text-ink underline-offset-4 hover:text-brand-fg hover:underline">
            Bekijk alle diensten en pakketten
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </p>
      </Container>
    </Section>
  );
}

function ServiceCard({ service: s, media, index, wide }: { service: Service; media: Media; index: number; wide: boolean }) {
  return (
    <Tilt className={cn("reveal-item", wide && "md:col-span-2")} style={order(index)} max={wide ? 3 : 5}>
      <Link
        href={`/diensten#${s.id}`}
        style={{ ["--tone" as string]: media.tone }}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface p-2.5 shadow-card",
          "transition-[box-shadow,border-color,transform] duration-500 ease-premium",
          "hover:-translate-y-1 hover:border-[rgb(var(--tone)/0.45)] hover:shadow-[0_34px_80px_-34px_rgb(var(--tone)/0.6)]",
          wide && "lg:grid lg:grid-cols-[1fr_1.3fr] lg:items-stretch lg:gap-2",
        )}
      >
        {/* Kleurwas rond het beeld en lichtvlek op de cursor. */}
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,rgb(var(--tone)/0.16),transparent_70%)] opacity-80 transition-opacity duration-700 group-hover:opacity-100 dark:bg-[radial-gradient(120%_70%_at_50%_0%,rgb(var(--tone)/0.14),transparent_70%)]" />
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 [background:radial-gradient(460px_circle_at_var(--mx,50%)_var(--my,50%),rgb(var(--tone)/0.12),transparent_45%)] group-hover:opacity-100" />

        <div className={cn("relative h-56 md:h-60", wide && "md:h-72 lg:order-2 lg:h-auto lg:min-h-[320px]")}>
          {s.id === "webdesign" ? (
            <WebdesignMedia media={media} />
          ) : s.id === "ai" ? (
            <AiMedia media={media} />
          ) : (
            <PhotoMedia media={media} wide={wide} />
          )}
        </div>

        <div className="relative flex flex-1 flex-col px-4 pb-4 pt-5 md:px-5 lg:justify-center">
          <div className="flex items-center gap-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[rgb(var(--tone)/0.25)] bg-[rgb(var(--tone)/0.12)] text-[rgb(var(--tone))] shadow-[0_8px_20px_-10px_rgb(var(--tone)/0.7)] transition-transform duration-500 ease-premium group-hover:-rotate-6 group-hover:scale-105">
              <s.icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            </span>
            <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
          </div>
          <p className="mt-4 text-[13.5px] leading-relaxed text-ink-muted">{s.description}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {s.tags.map((t) => (
              <li key={t} className="rounded-full border border-line bg-surface-sunken px-2.5 py-1 text-[10.5px] font-medium text-ink-muted">
                {t}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-[rgb(var(--tone))] lg:mt-6">
            Ontdek meer
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </Link>
    </Tilt>
  );
}

/** Zwevend glazen label boven een beeld. */
function FloatChip({ chip, className }: { chip: Chip; className?: string }) {
  return (
    <span
      className={cn(
        "absolute z-10 inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/80 px-3 py-2 text-[11px] font-semibold text-neutral-900 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-md transition-transform duration-700 ease-premium dark:border-white/10 dark:bg-neutral-950/70 dark:text-white",
        chip.pos,
        chip.shift,
        className,
      )}
    >
      <span className="grid h-6 w-6 place-items-center rounded-lg bg-[rgb(var(--tone)/0.15)] text-[rgb(var(--tone))]">
        <chip.icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      </span>
      {chip.text}
    </span>
  );
}

function PhotoMedia({ media, wide }: { media: Media; wide: boolean }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.35rem] bg-surface-sunken">
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={wide ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"}
        className={cn(
          "object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.06] dark:brightness-[0.88]",
          media.position,
        )}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent dark:from-black/55" />
      <div aria-hidden className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5 dark:ring-white/10" />
      {media.chips.map((c) => (
        <FloatChip key={c.text} chip={c} />
      ))}
    </div>
  );
}

/** Webdesign: een echte site in een browser en op een telefoon. */
function WebdesignMedia({ media }: { media: Media }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.35rem] bg-[linear-gradient(135deg,rgb(var(--tone)/0.35),rgb(var(--tone)/0.06)_55%,rgb(236_72_153/0.14))] dark:bg-[linear-gradient(135deg,rgb(var(--tone)/0.28),rgb(255_255_255/0.02)_55%,rgb(236_72_153/0.10))]">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-40" />

      {/* Browser */}
      <div className="absolute left-[4%] top-[6%] w-[90%] overflow-hidden rounded-xl border border-white/30 bg-neutral-950 shadow-[0_30px_60px_-24px_rgba(15,15,40,0.65)] transition-transform duration-700 ease-premium group-hover:-translate-y-1.5 group-hover:-rotate-[0.6deg]">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-neutral-900 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate rounded-md bg-white/10 px-2.5 py-0.5 text-[9.5px] text-white/60">villanoord.nl</span>
        </div>
        <div className="relative aspect-[16/9] lg:aspect-[4/3]">
          <Image src={media.src} alt={media.alt} fill sizes="(min-width: 1024px) 560px, 80vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
          <div className="absolute inset-x-4 top-3 flex items-center justify-between text-[9px] font-medium text-white/90">
            <span className="font-display text-[10px] font-semibold tracking-wide">Villa Noord</span>
            <span className="hidden gap-3 sm:flex">
              <span>Aanbod</span>
              <span>Over ons</span>
              <span>Contact</span>
            </span>
          </div>
          <div className="absolute bottom-[14%] left-4 max-w-[60%]">
            <p className="font-display text-[clamp(0.95rem,2.2vw,1.45rem)] font-semibold leading-tight text-white">Wonen met uitzicht</p>
            <span className="mt-2 inline-block rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-neutral-900">Bekijk aanbod</span>
          </div>
        </div>
      </div>

      {/* Telefoon */}
      <div className="absolute -bottom-[14%] right-[4%] w-[23%] min-w-[92px] max-w-[150px] lg:-bottom-[6%] lg:w-[29%] lg:max-w-[176px] rounded-[1.5rem] border-[5px] border-neutral-900 bg-neutral-900 shadow-[0_30px_60px_-20px_rgba(15,15,40,0.7)] transition-transform duration-700 ease-premium group-hover:-translate-y-3 group-hover:rotate-[1.5deg]">
        <div className="relative aspect-[9/18] overflow-hidden rounded-[1.05rem]">
          <Image src="/images/resp-3.png" alt="" fill sizes="150px" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <span className="absolute left-2 top-2 font-display text-[8px] font-semibold text-white">Villa Noord</span>
          <span className="absolute bottom-3 left-2 right-2 text-[9px] font-semibold leading-tight text-white">Lichte woonkamer, tuin op het zuiden</span>
        </div>
      </div>

      {media.chips.map((c) => (
        <FloatChip key={c.text} chip={c} />
      ))}
    </div>
  );
}

/** AI: de assistenten, met een stukje gesprek eroverheen. */
function AiMedia({ media }: { media: Media }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.35rem] bg-[#eaf1ff] dark:bg-[#0b1020]">
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(min-width: 1024px) 720px, 100vw"
        className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.05] dark:brightness-[0.85]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent dark:from-black/55" />
      <div className="absolute left-4 top-4 max-w-[62%] rounded-2xl rounded-tl-md border border-white/60 bg-white/85 px-3.5 py-2.5 text-[11.5px] leading-snug text-neutral-900 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.4)] backdrop-blur-md transition-transform duration-700 ease-premium group-hover:translate-y-1.5 dark:border-white/10 dark:bg-neutral-950/75 dark:text-white">
        <span className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--tone))]">
          <Bot className="h-3.5 w-3.5" aria-hidden />
          Reactly AI
        </span>
        Hoi! Zal ik je helpen met een offerte voor je nieuwe website?
      </div>
      <div className="absolute bottom-4 right-4 max-w-[58%] rounded-2xl rounded-br-md bg-[rgb(var(--tone))] px-3.5 py-2.5 text-[11.5px] font-medium leading-snug text-white shadow-[0_12px_30px_-10px_rgb(var(--tone)/0.8)] transition-transform duration-700 ease-premium group-hover:-translate-y-2">
        Graag, en koppel hem meteen aan ons CRM
      </div>
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-3 py-1.5 text-[10.5px] font-semibold text-white backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
          <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        24/7 actief
      </span>
    </div>
  );
}
