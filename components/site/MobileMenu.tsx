"use client";

/**
 * components/site/MobileMenu.tsx
 *
 * Het premium uitklapmenu, zoals bij BeterLease: een donker paneel dat van
 * rechts inschuift met een lichte lijn bovenin, een grote actieknop, het
 * hoofdmenu (huidige pagina gemarkeerd) en de diensten in twee
 * kolommen. Op een telefoon schermvullend, vanaf tablet 440px breed. De
 * items schuiven kort na elkaar binnen (`.enter`).
 */

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Mail, MapPin, Phone, X } from "lucide-react";

import { Wordmark } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { trackContact } from "@/lib/analytics";
import { SERVICES } from "@/lib/content";
import { SITE, isOpenNow, todayOpeningLabel } from "@/lib/site";
import { cn } from "@/lib/utils";

const MAIN = [
  { label: "Home", href: "/" },
  { label: "Diensten", href: "/diensten" },
  { label: "Prijzen", href: "/prijzen" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const step = (ms: number, x = 0, y = 10) =>
  ({ ["--d" as string]: `${ms}ms`, ["--in-x" as string]: `${x}px`, ["--in-y" as string]: `${y}px`, ["--dur" as string]: "0.6s" }) as React.CSSProperties;

export default function MobileMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const pathname = usePathname() ?? "/";
  const close = () => onOpenChange(false);
  const [bereikbaar, setBereikbaar] = React.useState<{ open: boolean; label: string } | null>(null);

  // Bereikbaarheid pas bij openen berekenen (tijdsafhankelijk, dus niet tijdens de serverrender).
  React.useEffect(() => {
    if (open) setBereikbaar({ open: isOpenNow(), label: todayOpeningLabel() });
  }, [open]);

  // Na een paginawissel dicht. Niet bij het mounten: het menu laadt pas bij de
  // eerste keer openen (Navbar) en zou zichzelf anders direct weer sluiten.
  const eersteRender = React.useRef(true);
  React.useEffect(() => {
    if (eersteRender.current) {
      eersteRender.current = false;
      return;
    }
    onOpenChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : !href.startsWith("/#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "deep fixed inset-y-0 right-0 z-[151] flex w-full flex-col overflow-hidden bg-page text-white outline-none sm:w-[440px] sm:border-l sm:border-white/10",
            "duration-500 ease-premium data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
          )}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          {/* Sfeer: blauwe lijn en gloed bovenin. */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute -top-40 right-[-30%] h-96 w-[130%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.08),transparent)]" />

          <header className="relative flex shrink-0 items-center justify-between px-5 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
            <Link href="/" onClick={close} aria-label="Reactly — naar de homepage">
              <Wordmark />
            </Link>
            <div className="flex items-center gap-1">
              <ThemeToggle className="text-white/80 hover:bg-white/10 hover:text-white" />
              <Dialog.Close
                aria-label="Menu sluiten"
                className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <X className="h-5 w-5" aria-hidden />
              </Dialog.Close>
            </div>
          </header>

          <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8">
            <Link href="/offerte" onClick={close} className="enter btn btn-primary btn-lg mt-3 w-full" style={step(80)}>
              Offerte aanvragen
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="enter mt-2.5 grid grid-cols-2 gap-2.5" style={step(130)}>
              <a
                href={SITE.phone.href}
                onClick={() => trackContact("phone", "mobile_menu")}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] text-[12px] font-medium transition-colors hover:bg-white/[0.09]"
              >
                <Phone className="h-4 w-4 text-white/70" aria-hidden />
                Bel ons
              </a>
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("whatsapp", "mobile_menu")}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] text-[12px] font-medium transition-colors hover:bg-white/[0.09]"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </a>
            </div>
            {bereikbaar && (
              <p className="enter mt-3 flex items-center justify-center gap-2 text-[11.5px] text-white/60" style={step(160)}>
                <span className={cn("h-1.5 w-1.5 rounded-full", bereikbaar.open ? "bg-emerald-400" : "bg-white/35")} />
                {bereikbaar.open ? "Nu bereikbaar · " : ""}
                {bereikbaar.label}
              </p>
            )}

            <nav aria-label="Hoofdmenu" className="mt-7">
              <ul className="space-y-1">
                {MAIN.map(({ label, href }, i) => (
                  <li key={href} className="enter" style={step(180 + i * 45, 18, 0)}>
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={active(href) ? "page" : undefined}
                      className={cn(
                        "group flex min-h-[50px] items-center justify-between rounded-xl border-l-[3px] px-4 text-[14px] font-medium uppercase tracking-[0.1em] transition-all duration-300",
                        active(href)
                          ? "border-white bg-gradient-to-r from-white/[0.09] to-transparent text-white"
                          : "border-transparent text-white/80 hover:bg-white/[0.05] hover:text-white",
                      )}
                    >
                      {label}
                      <ArrowUpRight
                        className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="enter mt-7 border-t border-white/10 pt-6" style={step(520)}>
              <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">Diensten</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-3">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/diensten#${s.id}`}
                      onClick={close}
                      className="flex min-h-11 items-center gap-2.5 rounded-lg px-1 text-[12.5px] text-white/70 transition-colors hover:text-white"
                    >
                      <s.icon className="h-4 w-4 shrink-0 text-white/50" strokeWidth={1.8} aria-hidden />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <footer className="relative shrink-0 space-y-2 border-t border-white/10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 text-[12px] text-white/60">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
              <Mail className="h-4 w-4 text-white/50" aria-hidden />
              {SITE.email}
            </a>
            <a href={SITE.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-white">
              <MapPin className="h-4 w-4 text-white/50" aria-hidden />
              {SITE.address.street}, {SITE.address.city}
            </a>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { WhatsAppIcon };
