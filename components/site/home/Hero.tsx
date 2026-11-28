/**
 * components/site/home/Hero.tsx  (Server Component)
 *
 * De hero van de homepage, in de opbouw van BeterLease: schermvullend,
 * klein bovenschrift met lijntjes, een groot wisselend woord in wit/zilver,
 * een rustige lede, twee knoppen, vertrouwen eronder, verticale teksten
 * opzij en "Scroll" onderaan. Elk element schuift kort na elkaar binnen.
 *
 * Eén DOM voor beide thema's:
 *  - licht: video met donkere sluier, alles gecentreerd;
 *  - donker: de bewegende Rubik's cube (moet blijven!) rechts en tekst
 *    links; op telefoon en tablet zweeft dezelfde 3D-kubus boven de tekst.
 *    Met vloerlijnen, lichtbundel en drijvende rook.
 * Hoogte `100svh`, zodat "Scroll" op een telefoon niet achter de
 * adresbalk valt.
 */

import { ChevronDown } from "lucide-react";

import { ButtonLink } from "../Button";
import Smoke from "../Smoke";
import { TrustpilotStars } from "../Trust";
import { HeroCube, HeroVideo } from "./HeroMedia";
import RotatingWord from "./RotatingWord";

const WORDS = [
  "Webdesign",
  "Branding",
  "Marketing",
  "Conversie",
  "SEO & SEA",
  "Strategie",
  "Performance",
  "Maatwerk",
  "Creativiteit",
  "AI-integratie",
  "Automatisering",
  "Schaalbaarheid",
] as const;

const at = (d: number, y = 20) =>
  ({ ["--d" as string]: `${d}ms`, ["--in-y" as string]: `${y}px`, ["--dur" as string]: "0.9s" }) as React.CSSProperties;

export default function Hero() {
  return (
    <section
      aria-label="Welkom bij Reactly"
      className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-black text-white"
    >
      {/* ── Licht: video ───────────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 -z-10 dark:hidden">
        <div className="zoom-in-settle absolute inset-0 bg-[url('/video/reactly-hero-poster.jpg')] bg-cover bg-center" />
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />
        {/* Extra rust achter de tekst, zodat de lede leesbaar blijft op een drukke videoframe. */}
        <div className="absolute inset-0 bg-[radial-gradient(42%_38%_at_50%_52%,rgba(0,0,0,0.38),transparent_80%)]" />
      </div>

      {/* ── Donker: vloer, lichtbundel en rook ───────────────────────────── */}
      <div aria-hidden className="noise absolute inset-0 -z-10 hidden dark:block">
        <div className="absolute inset-0 bg-[#020203]" />
        <div className="absolute inset-0 bg-[url('/images/bg-hero-1.webp')] bg-cover bg-bottom opacity-80 [mask-image:linear-gradient(to_top,transparent_8%,#000_30%)]" />
        {/* Lichtbundel (was een PNG van 2,3 MB). */}
        <div className="absolute -right-[12%] -top-[30%] h-[110%] w-[75%] rotate-[-32deg] rounded-[100%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.13),rgba(255,255,255,0.04)_55%,transparent)] blur-2xl" />
        {/* Zacht wit licht achter de kubus, geen gekleurde gloed. */}
        <div className="absolute right-[2%] top-[8%] h-[640px] w-[640px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.08),transparent)]" />
        <Smoke className="lg:opacity-70" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[hsl(var(--page))]" />
      </div>

      {/* ── Inhoud ──────────────────────────────────────────────────────── */}
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center px-5 pb-16 pt-[72px] sm:px-6 lg:px-8 max-lg:dark:items-end max-lg:dark:pb-[clamp(3rem,8svh,5rem)]">
        <div className="grid w-full items-center gap-6 lg:dark:grid-cols-[1.08fr_1fr]">
          <div className="relative z-10 mx-auto w-full max-w-3xl text-center lg:dark:mx-0 lg:dark:max-w-none lg:dark:text-left">
            <h1 className="flex flex-col items-center lg:dark:items-start">
              <span className="enter mb-5 flex items-center gap-4" style={at(150, 14)}>
                <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-white/50 md:w-12" />
                <span className="inline-block pl-[0.3em] font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-white/85 md:text-xs">
                  Jouw web partner in
                </span>
                <span aria-hidden className="h-px w-8 bg-gradient-to-l from-transparent to-white/50 md:w-12 lg:dark:hidden" />
              </span>
              <span className="sr-only">webdesign, branding en online marketing</span>
              <span className="enter block w-full" style={at(300, 0)}>
                <RotatingWord words={WORDS} />
              </span>
              <span aria-hidden className="enter mt-1 block" style={at(520)}>
                <span className="inline-block pl-[0.4em] text-[1.15rem] font-medium uppercase leading-none tracking-[0.4em] text-white/95 [text-shadow:0_2px_12px_rgba(0,0,0,0.5)] sm:text-[1.5rem] lg:text-[1.9rem] lg:dark:pl-0">
                  &amp; online groei
                </span>
              </span>
            </h1>

            <p
              className="enter mx-auto mt-7 max-w-xl text-[14px] leading-relaxed text-white/75 md:text-[15.5px] lg:dark:mx-0"
              style={at(680, 12)}
            >
              Reactly helpt bedrijven groeien met strategie, branding en digitale innovatie. Van converterend webdesign
              tot marketing die schaalbaar, slim en creatief is.
            </p>

            <div
              className="enter mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 lg:dark:justify-start"
              style={at(820)}
            >
              <ButtonLink href="/offerte" size="lg" arrow="right">
                Start je aanvraag
              </ButtonLink>
              <ButtonLink href="/diensten" variant="glass" size="lg">
                Onze diensten
              </ButtonLink>
            </div>

            <div
              className="enter mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[12px] text-white/70 lg:dark:justify-start"
              style={at(980, 10)}
            >
              <span className="flex items-center gap-2.5">
                <TrustpilotStars className="h-[18px] w-[96px]" />
                <span>
                  <strong className="font-semibold text-white">4,8</strong> / 5 op Trustpilot
                </span>
              </span>
              <span aria-hidden className="hidden h-4 w-px bg-white/25 sm:block" />
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Offerte binnen 24 uur
              </span>
            </div>
          </div>

          {/* Kubus (donker): één Spline-scène voor elk scherm. Op telefoon en
              tablet zweeft hij boven de tekst (zonder aanraking, zodat scrollen
              gewoon werkt), op desktop staat hij rechts. Vaste hoogte: de kubus
              verschijnt pas na het mounten, zonder dat de tekst verspringt. */}
          <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+0.25rem)] hidden h-[min(46svh,480px)] [mask-image:linear-gradient(to_bottom,#000_62%,transparent)] dark:block lg:static lg:h-[520px] lg:[mask-image:none] lg:pointer-fine:pointer-events-auto xl:h-[580px]">
            <div className="enter h-full" style={at(400, 30)}>
              <HeroCube />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 max-lg:dark:hidden [@media(max-height:760px)]:hidden">
        <a
          href="#start"
          aria-label="Scroll naar de inhoud"
          className="enter flex flex-col items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          style={at(1300, 0)}
        >
          <span className="text-[10px] uppercase tracking-[0.32em] text-white/45">Scroll</span>
          <span className="bob block">
            <ChevronDown className="h-5 w-5 text-white/45" aria-hidden />
          </span>
        </a>
      </div>

      {/* Verticale teksten opzij (vanaf xl). */}
      {[
        { side: "left-6", rot: "-rotate-90", text: "Reactly" },
        { side: "right-6", rot: "rotate-90", text: "Webdesign & marketing" },
      ].map(({ side, rot, text }) => (
        <div key={side} aria-hidden className={`absolute ${side} top-1/2 hidden -translate-y-1/2 min-[1440px]:block`}>
          <div className="enter flex flex-col items-center gap-4" style={at(1100, 0)}>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
            <span className={`origin-center ${rot} whitespace-nowrap text-[9px] uppercase tracking-[0.42em] text-white/35`}>
              {text}
            </span>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
          </div>
        </div>
      ))}
    </section>
  );
}
