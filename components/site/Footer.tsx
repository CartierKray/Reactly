/**
 * components/site/Footer.tsx  (Server Component)
 *
 * De footer in de stijl van BeterLease, als diep vlak (`.deep`): nachtblauw
 * met paarsblauwe gloed in licht (zoals mojo.nl), bijna zwart in donker, en
 * een groot, nauwelijks zichtbaar woordmerk onderaan.
 * Elke link wijst naar een pagina die bestaat; server-rendered, dus niets te
 * hydrateren behalve de kolommen die binnenschuiven.
 */

import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import { Wordmark } from "./Brand";
import { CookieSettingsButton } from "./Consent";
import { WhatsAppIcon } from "./WhatsAppIcon";
import Reveal from "./Reveal";
import Smoke from "./Smoke";
import { order } from "@/lib/motion";
import { TrustpilotStars } from "./Trust";
import { SERVICES } from "@/lib/content";
import { OPENING_HOURS, SITE, formatHours } from "@/lib/site";

const BUREAU = [
  { label: "Werkwijze", href: "/#werkwijze" },
  { label: "Prijzen & pakketten", href: "/prijzen" },
  { label: "Componenten", href: "/componenten" },
  { label: "Veelgestelde vragen", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Klantportaal", href: "/signin" },
];

const KOP = "mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white";
const LINK =
  "inline-flex min-h-9 items-center text-[13px] text-white/60 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="deep relative isolate overflow-hidden bg-page text-white">
      {/* Gloed: grijs, nooit een harde rand; daaroverheen een vleug rook. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
        <div className="absolute -right-32 top-1/4 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
        <Smoke intensity={0.22} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-5 pb-10 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <Reveal
          group
          margin={40}
          className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.45fr_1fr_1fr_1.05fr_1.15fr] lg:gap-x-10"
        >
          {/* Bedrijf */}
          <div className="reveal-item col-span-2 md:col-span-3 lg:col-span-1">
            <Wordmark />
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-white/55">
              Strategisch webdesign & online marketing bureau. Wij bouwen conversiegerichte websites en campagnes die
              écht groeien.
            </p>

            <address className="mt-6 space-y-2.5 text-[13px] not-italic">
              <a href={SITE.phone.href} className="flex items-center gap-2.5 text-white/80 transition-colors hover:text-white">
                <Phone className="h-4 w-4 text-brand-fg" aria-hidden />
                {SITE.phone.display}
              </a>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#25D366] transition-opacity hover:opacity-85"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-white/80 transition-colors hover:text-white">
                <Mail className="h-4 w-4 text-brand-fg" aria-hidden />
                {SITE.email}
              </a>
              <a
                href={SITE.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/55 transition-colors hover:text-white"
              >
                <MapPin className="h-4 w-4 text-brand-fg" aria-hidden />
                {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
              </a>
            </address>

            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reactly op Instagram"
              className="mt-6 inline-grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-brand/50 hover:bg-white/10 hover:text-white hover:shadow-[0_0_22px_rgb(var(--glow-rgb)/0.35)]"
            >
              <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" />
              </svg>
            </a>
          </div>

          <nav aria-label="Diensten" className="reveal-item" style={order(1, { "--stagger": "60ms" })}>
            <h2 className={KOP}>Diensten</h2>
            <ul className="space-y-0.5">
              {SERVICES.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <Link href={`/diensten#${s.id}`} className={LINK}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Bureau" className="reveal-item" style={order(2, { "--stagger": "60ms" })}>
            <h2 className={KOP}>Bureau</h2>
            <ul className="space-y-0.5">
              {BUREAU.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="reveal-item" style={order(3, { "--stagger": "60ms" })}>
            <h2 className={`${KOP} flex items-center gap-2`}>
              <Clock className="h-3.5 w-3.5 text-brand-fg" aria-hidden />
              Openingstijden
            </h2>
            <dl className="space-y-1.5 text-[12.5px]">
              {OPENING_HOURS.map((d) => (
                <div key={d.day} className="flex justify-between gap-3">
                  <dt className="text-white/55">{d.short}</dt>
                  <dd className={d.open ? "text-white/85 tabular-nums" : "text-white/40"}>{formatHours(d)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal-item col-span-2 md:col-span-1" style={order(4, { "--stagger": "60ms" })}>
            <h2 className={KOP}>Direct starten</h2>
            <div className="flex flex-col gap-2.5">
              <Link href="/contact" className="btn btn-primary btn-sm w-full">
                Plan een kennismaking
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/prijzen"
                className="inline-flex min-h-[2.375rem] items-center justify-center rounded-[0.625rem] border border-white/12 bg-white/5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
              >
                Bekijk pakketten
              </Link>
              <div className="mt-1 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                <TrustpilotStars className="h-4 w-[84px]" />
                <p className="mt-2 text-[11.5px] font-medium text-white">Uitstekend · 4,8 / 5</p>
                <p className="text-[10.5px] text-white/45">Beoordeeld op Trustpilot</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11.5px] text-white/45 md:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <span>
              © {year} {SITE.name}. Alle rechten voorbehouden.
            </span>
            <Link href="/algemene-voorwaarden" className="underline-offset-4 hover:text-white hover:underline">
              Algemene voorwaarden
            </Link>
            <Link href="/privacybeleid" className="underline-offset-4 hover:text-white hover:underline">
              Privacybeleid
            </Link>
            <CookieSettingsButton className="underline-offset-4 hover:text-white hover:underline" />
          </p>
          <p className="text-center md:text-right">Webdesign & online marketing uit Velsen-Noord</p>
        </div>
      </div>

      {/* Groot woordmerk als afsluiter. */}
      <div aria-hidden className="pointer-events-none -mb-[3vw] select-none overflow-hidden">
        <p className="bg-[linear-gradient(180deg,rgba(255,255,255,0.11)_10%,rgba(255,255,255,0)_85%)] bg-clip-text text-center font-display text-[24vw] font-semibold leading-[0.8] tracking-[-0.05em] text-transparent">
          Reactly
        </p>
      </div>
    </footer>
  );
}
