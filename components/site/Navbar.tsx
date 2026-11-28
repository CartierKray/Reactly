"use client";

/**
 * components/site/Navbar.tsx
 *
 * De navigatie, naar het voorbeeld van BeterLease (khan.nl):
 *  - op de homepage in licht thema transparant over de video (wit, met een
 *    donker verloop erachter); in donker thema, op de overige pagina's en na
 *    scrollen altijd de donkere/glazen balk;
 *  - kleine hoofdletters met een lijntje bij hover en op de huidige pagina;
 *  - schuift weg bij omlaag scrollen en komt terug bij omhoog scrollen;
 *  - "Diensten" opent een megamenu met icoontegels, pakketten en een
 *    CTA-tegel;
 *  - desktop: geen hamburger (alle links staan in de balk); telefoon en
 *    tablet: link-icoontje (contact en delen), bellen en het premium menu.
 *
 * "Offerte aanvragen" is een gewone link naar /offerte; de OfferteProvider
 * vangt de klik op en opent de aanvraag als venster.
 */

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone } from "lucide-react";

import { Wordmark } from "./Brand";
import { IconTile } from "./Button";
import ContactShare from "./ContactShare";
import { RubikCube } from "./RubikCube";
import { ThemeToggle } from "./ThemeToggle";
import { trackContact } from "@/lib/analytics";
import { NAV_LINKS, PACKAGE_GROUPS, SERVICES, euro } from "@/lib/content";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

// Het mobiele menu (met Radix Dialog) laadt pas bij de eerste keer openen.
const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

const POPULAR = PACKAGE_GROUPS.flatMap((g) => g.packages).slice(0, 4);

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const overlay = pathname === "/";

  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuGeladen, setMenuGeladen] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const [arrowX, setArrowX] = React.useState(0);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<number | null>(null);
  const openedAt = React.useRef(0);
  const pointer = React.useRef("mouse");

  /* Scrollen: balk licht na 24px, wegschuiven bij omlaag, terug bij omhoog. */
  React.useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y < 160) setHidden(false);
        else if (y > last + 4) setHidden(true);
        else if (y < last - 4) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Na navigatie: menu's dicht. */
  React.useEffect(() => {
    setMegaOpen(false);
  }, [pathname]);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 180);
  };
  const openMega = () => {
    cancelClose();
    if (!megaOpen) openedAt.current = Date.now();
    setMegaOpen(true);
  };

  /* Pijltje van het paneel precies onder "Diensten". */
  React.useLayoutEffect(() => {
    if (!megaOpen) return;
    const t = triggerRef.current?.getBoundingClientRect();
    const p = panelRef.current?.getBoundingClientRect();
    if (t && p) setArrowX(Math.round(t.left + t.width / 2 - p.left));
  }, [megaOpen]);

  /* Escape, klik ernaast en scrollen sluiten het megamenu. */
  React.useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setMegaOpen(false);
    };
    const onScroll = () => setMegaOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [megaOpen]);

  React.useEffect(() => () => cancelClose(), []);

  const solid = scrolled || !overlay || megaOpen;
  const shift = hidden && !megaOpen && !menuOpen ? "-100%" : "0px";

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const dienstenActive = pathname.startsWith("/diensten");

  const linkBase =
    "group/link relative flex h-16 items-center text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-md xl:text-[10.5px]";
  const linkColor = (active: boolean) =>
    solid
      ? active
        ? "text-ink"
        : "text-ink/65 hover:text-ink"
      : active
        ? "text-white"
        : "text-white/80 hover:text-white";
  const underline = (active: boolean) =>
    cn(
      "absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-premium",
      active ? "w-full" : "w-0 group-hover/link:w-full",
    );
  const iconBtn = solid
    ? "text-ink/75 hover:bg-ink/[0.06] hover:text-ink"
    : "text-white/85 hover:bg-white/10 hover:text-white";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[300] focus-visible:rounded-full focus-visible:bg-brand focus-visible:px-5 focus-visible:py-3 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white"
      >
        Naar de inhoud
      </a>

      <header
        className="fixed inset-x-0 top-0 z-[100] transition-transform duration-500 ease-premium will-change-transform"
        style={{ transform: `translateY(${shift})` }}
      >
        <div
          className={cn(
            "relative transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
            solid
              ? "border-b border-line/70 bg-page/80 text-ink shadow-[0_8px_30px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150"
              : // In donker thema ook bovenaan de dichte, donkere balk (zoals na scrollen).
                // `bg-origin-border bg-no-repeat`: zonder dit herhaalde het verloop zich in
                // de (transparante) onderrand, wat in licht thema een zwarte lijn gaf.
                "border-b border-transparent bg-gradient-to-b bg-origin-border bg-no-repeat from-black/55 via-black/20 to-transparent text-white dark:border-line/70 dark:bg-page/80 dark:bg-none dark:shadow-[0_8px_30px_-20px_rgba(0,0,0,0.35)] dark:backdrop-blur-xl dark:backdrop-saturate-150",
          )}
        >
          <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
            <Link
              href="/"
              aria-label="Reactly — naar de homepage"
              className="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Wordmark />
            </Link>

            {/* Desktop */}
            <nav aria-label="Hoofdmenu" className={cn("hidden lg:block", !solid && "[text-shadow:0_1px_12px_rgba(0,0,0,0.35)]")}>
              <ul className="flex items-center gap-6 whitespace-nowrap xl:gap-8">
                <li>
                  <button
                    ref={triggerRef}
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="mega-diensten"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleClose}
                    onPointerDown={(e) => (pointer.current = e.pointerType)}
                    onClick={(e) => {
                      const keyboard = e.detail === 0;
                      if (!megaOpen) return openMega();
                      if (!keyboard && pointer.current === "mouse") return;
                      if (Date.now() - openedAt.current > 350) setMegaOpen(false);
                    }}
                    className={cn(linkBase, "gap-1.5", linkColor(megaOpen || dienstenActive))}
                  >
                    <span className="relative">
                      Diensten
                      <span aria-hidden className={underline(megaOpen || dienstenActive)} />
                    </span>
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition-transform duration-300", megaOpen && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                </li>
                {NAV_LINKS.map((l) => (
                  <li key={l.href} className={l.wide ? "hidden xl:block" : undefined}>
                    <Link
                      href={l.href}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={cn(linkBase, linkColor(isActive(l.href)))}
                    >
                      <span className="relative">
                        {l.label}
                        <span aria-hidden className={underline(isActive(l.href))} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Rechts. Desktop: thema en de offerteknop (geen hamburger: alle links
                staan al in de balk). Telefoon en tablet, zoals BeterLease: het
                link-icoontje met onze gegevens en delen, bellen en het menu. */}
            <div className="flex items-center gap-1">
              <span className="hidden lg:contents">
                <ThemeToggle className={iconBtn} />
              </span>
              <span className="lg:hidden">
                <ContactShare className={iconBtn} />
              </span>
              <a
                href={SITE.phone.href}
                aria-label={`Bel ons: ${SITE.phone.display}`}
                onClick={() => trackContact("phone", "navbar")}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden",
                  iconBtn,
                )}
              >
                <Phone className="h-[17px] w-[17px]" strokeWidth={1.9} aria-hidden />
              </a>
              <Link href="/offerte" className="btn btn-primary btn-sm ml-1.5 hidden sm:inline-flex">
                Offerte aanvragen
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuGeladen(true);
                  setMenuOpen(true);
                }}
                onPointerEnter={() => setMenuGeladen(true)}
                aria-label="Menu openen"
                aria-haspopup="dialog"
                className={cn(
                  "ml-0.5 grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden",
                  iconBtn,
                )}
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>

          {/* Megamenu "Diensten" */}
          <div
            ref={panelRef}
            id="mega-diensten"
            role="region"
            aria-label="Diensten"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className={cn(
              "absolute left-1/2 top-[calc(100%+12px)] hidden w-[min(1060px,calc(100vw-2rem))] -translate-x-1/2 text-ink lg:block",
              megaOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
            )}
            style={{
              transition: megaOpen
                ? "opacity .3s cubic-bezier(.16,1,.3,1), translate .3s cubic-bezier(.16,1,.3,1), visibility 0s"
                : "opacity .2s ease, translate .2s ease, visibility 0s linear .2s",
            }}
          >
            {/* Brug over de ruimte tussen balk en paneel. */}
            <span aria-hidden className="absolute inset-x-0 -top-4 h-4" />
            <span
              aria-hidden
              className="absolute -top-1.5 block h-3 w-3 rotate-45 border-l border-t border-line bg-surface-elevated"
              style={{ left: arrowX, marginLeft: -6 }}
            />
            <div className="grid grid-cols-[1fr_300px] gap-3 rounded-2xl border border-line bg-surface-elevated p-3 shadow-dialog">
              <div className="p-2">
                <p className="px-2.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-subtle">
                  Wat we voor je doen
                </p>
                <ul className="mt-2 grid grid-cols-2 gap-0.5 xl:grid-cols-3">
                  {SERVICES.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/diensten#${s.id}`}
                        className="group flex items-center gap-3.5 rounded-xl p-2.5 transition-colors duration-200 hover:bg-surface-sunken"
                      >
                        <IconTile icon={s.icon} className="h-10 w-10" />
                        <span className="min-w-0">
                          <span className="block text-[13px] font-semibold text-ink transition-colors group-hover:text-brand-fg">
                            {s.title}
                          </span>
                          <span className="block truncate text-[11.5px] text-ink-muted">{s.short}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex items-center justify-between border-t border-line px-2.5 pt-3 text-[12px]">
                  <Link href="/diensten" className="group inline-flex items-center gap-1.5 font-semibold text-ink hover:text-brand-fg">
                    Alle diensten
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                  <span className="text-ink-subtle">Offerte binnen 24 uur</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="rounded-xl bg-surface-sunken p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-subtle">Populaire pakketten</p>
                  <ul className="mt-2.5 space-y-0.5">
                    {POPULAR.map((p) => (
                      <li key={p.title}>
                        <Link
                          href="/diensten#pakketten"
                          className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-[12.5px] font-medium text-ink transition-colors hover:bg-surface hover:text-brand-fg"
                        >
                          {p.title}
                          <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-ink-muted tabular-nums">
                            {euro(p.price)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="deep group relative flex min-h-[150px] flex-1 overflow-hidden rounded-xl bg-page p-5 text-white"
                >
                  <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
                  <div aria-hidden className="absolute -bottom-16 -left-10 h-40 w-40 bg-[radial-gradient(closest-side,var(--deep-glow-b),transparent)]" />
                  <RubikCube size={38} className="absolute right-1 top-1 opacity-90" />
                  <div className="relative mt-auto pr-16">
                    <p className="text-[14px] font-semibold">Gratis strategiegesprek</p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-white/65">
                      Ontdek waar jouw grootste groeikansen liggen.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                      Plan een kennismaking
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {menuGeladen && <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />}
    </>
  );
}
