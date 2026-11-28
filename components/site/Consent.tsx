"use client";

/**
 * components/site/Consent.tsx
 *
 * Het privacyvenster bij het eerste bezoek, in de opzet van BeterLease
 * (khan.nl): een gecentreerde kaart met het woordmerk, "Privacy beschermd",
 * een korte uitleg, drie voordelen en één duidelijke knop.
 *
 *  - "Alleen noodzakelijk" staat er direct naast: de Autoriteit
 *    Persoonsgegevens eist dat weigeren even makkelijk is als accepteren.
 *  - "Meer opties" klapt de categorieën uit in hetzelfde venster.
 *  - Sluiten (Escape of het kruisje) telt als "alleen noodzakelijk": geen
 *    toestemming zonder handeling. Via de footer is de keuze altijd te
 *    wijzigen ("Cookie-instellingen").
 *  - Op de privacypagina zelf opent het venster niet vanzelf, zodat je die
 *    eerst rustig kunt lezen.
 *
 * Analytics en advertentietags laden pas na toestemming (Analytics.tsx).
 * Opslag: `cookieConsent` (accepted | rejected | custom, zelfde sleutel als
 * de vorige site) en `cookiePreferences` ({ functional, analytics, marketing }).
 */

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, CircleCheckBig, ShieldCheck, X } from "lucide-react";

import { Wordmark } from "./Brand";
import { cn } from "@/lib/utils";

import { CONSENT_ALL as ALL, CONSENT_NONE as NONE, readConsent, saveConsent, type ConsentPrefs } from "@/lib/consent";

// Bestaande imports (`readConsent` en het type uit "./Consent") blijven werken.
export { readConsent, type ConsentPrefs };

const VOORDELEN = ["Snellere laadtijden", "Onthoudt je voorkeuren", "Relevante inspiratie en aanbiedingen"];

const CATEGORIEEN: { key: keyof ConsentPrefs; titel: string; uitleg: string }[] = [
  { key: "functional", titel: "Functioneel", uitleg: "Onthoudt keuzes zoals je thema en een half ingevulde aanvraag." },
  { key: "analytics", titel: "Analytisch", uitleg: "Laat ons zien welke pagina's werken, zonder je persoonlijk te volgen." },
  { key: "marketing", titel: "Marketing", uitleg: "Toont relevante advertenties van Reactly, ook buiten deze website." },
];

export default function ConsentBanner() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [meer, setMeer] = React.useState(false);
  const [keuzes, setKeuzes] = React.useState<ConsentPrefs>(NONE);
  const knopRef = React.useRef<HTMLButtonElement>(null);
  const titelId = React.useId();

  // Pas na het laden openen, alleen zonder eerdere keuze en niet op de privacypagina.
  React.useEffect(() => {
    if (readConsent() !== null || pathname === "/privacybeleid") return;
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(t);
  }, [pathname]);

  // Heropenen vanuit de footer ("Cookie-instellingen").
  React.useEffect(() => {
    const heropen = () => {
      setKeuzes(readConsent() ?? NONE);
      setMeer(true);
      setOpen(true);
    };
    window.addEventListener("consent:open", heropen);
    return () => window.removeEventListener("consent:open", heropen);
  }, []);

  const sluit = () => {
    setOpen(false);
    setMeer(false);
  };
  const accepteer = () => {
    saveConsent("accepted", ALL);
    sluit();
  };
  const weiger = () => {
    saveConsent("rejected", NONE);
    sluit();
  };
  const bewaar = () => {
    const iets = keuzes.functional || keuzes.analytics || keuzes.marketing;
    saveConsent(iets ? "custom" : "rejected", iets ? keuzes : NONE);
    sluit();
  };

  // Focus naar de hoofdknop, Escape = alleen noodzakelijk, pagina niet laten scrollen.
  React.useEffect(() => {
    if (!open) return;
    knopRef.current?.focus();
    const vorige = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") weiger();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = vorige;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div aria-hidden className="absolute inset-0 animate-in fade-in-0 bg-overlay/55 backdrop-blur-[3px] duration-300" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titelId}
        className="relative w-full max-w-[410px] animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 overflow-hidden rounded-2xl border border-line bg-surface-elevated shadow-dialog duration-300 motion-reduce:animate-none"
      >
        {/* Zachte accentgloed bovenin. */}
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-44 w-[130%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(var(--glow-rgb)/0.16),transparent)]" />

        <div className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 pb-4">
          <div className="mb-5 flex items-center gap-3">
            <Wordmark className="text-[1.3rem] text-ink" />
            <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-success">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Privacy beschermd
            </span>
            <button
              type="button"
              onClick={weiger}
              aria-label="Sluiten, alleen noodzakelijke cookies"
              className="-mr-2 grid h-8 w-8 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <h2 id={titelId} className="mb-3 font-display text-[1.2rem] font-semibold text-ink">
            Jouw ervaring verbeteren
          </h2>
          <p className="mb-4 text-[12.5px] leading-relaxed text-ink-muted">
            We gebruiken cookies om onze website beter op jouw wensen af te stemmen: snellere laadtijden, het
            onthouden van je voorkeuren en relevante inspiratie. Jij kiest zelf wat je toestaat. Meer lees je in ons{" "}
            <Link href="/privacybeleid" onClick={sluit} className="font-medium text-ink underline underline-offset-4 hover:text-brand-fg">
              privacybeleid
            </Link>
            .
          </p>

          {!meer ? (
            <ul className="mb-5 space-y-2">
              {VOORDELEN.map((v) => (
                <li key={v} className="flex items-center gap-2 text-[12.5px] text-ink">
                  <CircleCheckBig className="h-4 w-4 shrink-0 text-brand-fg" aria-hidden />
                  {v}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mb-5 space-y-2.5">
              <li className="flex items-start justify-between gap-4 rounded-xl border border-line bg-surface-sunken/60 p-3">
                <span>
                  <span className="block text-[12.5px] font-semibold text-ink">Noodzakelijk</span>
                  <span className="block text-xs leading-relaxed text-ink-muted">Nodig om de website te laten werken. Altijd aan.</span>
                </span>
                <span className="mt-0.5 shrink-0 text-xs font-semibold text-ink-muted">Altijd</span>
              </li>
              {CATEGORIEEN.map((c) => (
                <li key={c.key} className="rounded-xl border border-line p-3">
                  <label className="flex cursor-pointer items-start justify-between gap-4">
                    <span>
                      <span className="block text-[12.5px] font-semibold text-ink">{c.titel}</span>
                      <span className="block text-xs leading-relaxed text-ink-muted">{c.uitleg}</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={keuzes[c.key]}
                      onChange={(e) => setKeuzes((k) => ({ ...k, [c.key]: e.target.checked }))}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
                        "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-elevated",
                        keuzes[c.key] ? "bg-brand" : "bg-line-strong",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                          keuzes[c.key] ? "translate-x-[22px]" : "translate-x-0.5",
                        )}
                      />
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}

          {!meer ? (
            <button ref={knopRef} type="button" onClick={accepteer} className="btn btn-primary btn-lg w-full">
              <CircleCheckBig className="h-4 w-4" aria-hidden />
              Ga verder
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <button ref={knopRef} type="button" onClick={bewaar} className="btn btn-primary btn-lg w-full">
                Voorkeuren opslaan
              </button>
              <button type="button" onClick={accepteer} className="btn btn-outline w-full">
                Alles toestaan
              </button>
            </div>
          )}

          <div className="mt-3 flex items-center justify-center gap-3 text-xs text-ink-muted">
            <button type="button" onClick={weiger} className="py-1 underline-offset-4 transition-colors hover:text-ink hover:underline">
              Alleen noodzakelijk
            </button>
            {!meer && (
              <>
                <span aria-hidden>·</span>
                <button
                  type="button"
                  onClick={() => {
                    setKeuzes(readConsent() ?? NONE);
                    setMeer(true);
                  }}
                  className="py-1 underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Meer opties
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Link in de footer om de keuze later te wijzigen. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("consent:open"))} className={className}>
      Cookie-instellingen
    </button>
  );
}
