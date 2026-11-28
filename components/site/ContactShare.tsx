"use client";

/**
 * components/site/ContactShare.tsx
 *
 * Het link-icoontje in de mobiele navigatie, zoals bij BeterLease: één tik
 * opent een compact paneel met onze gegevens (bellen, WhatsApp, mailen,
 * route, en of we nu bereikbaar zijn) en "deze pagina delen" (link kopiëren
 * of het deelmenu van het toestel). Escape, een tik ernaast of een keuze
 * sluit het paneel; de focus gaat terug naar de knop.
 */

import * as React from "react";
import { ArrowUpRight, Check, Link2, Mail, MapPin, Phone, Share2 } from "lucide-react";

import { WhatsAppIcon } from "./WhatsAppIcon";
import { trackContact, track } from "@/lib/analytics";
import { SITE, isOpenNow, todayOpeningLabel } from "@/lib/site";
import { cn } from "@/lib/utils";

function shareUrl(): string {
  const url = new URL(window.location.href);
  for (const k of [...url.searchParams.keys()]) if (/^(utm_|gclid|fbclid|_vercel)/.test(k)) url.searchParams.delete(k);
  return url.toString();
}

export default function ContactShare({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [status, setStatus] = React.useState<{ open: boolean; label: string } | null>(null);
  const [canShare, setCanShare] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function"), []);

  React.useEffect(() => {
    if (!open) return;
    setStatus({ open: isOpenNow(), label: todayOpeningLabel() });
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      track("share", { method: "copy" });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Kopieer deze link:", shareUrl());
    }
  };
  const share = async () => {
    try {
      await navigator.share({ title: document.title, url: shareUrl() });
      track("share", { method: "native" });
      setOpen(false);
    } catch {
      /* geannuleerd */
    }
  };

  const rows = [
    { href: SITE.phone.href, icon: Phone, label: "Bel ons", value: SITE.phone.display, method: "phone" as const },
    { href: SITE.whatsapp.href, icon: null, label: "WhatsApp", value: "Stuur ons direct een bericht", method: "whatsapp" as const, external: true },
    { href: `mailto:${SITE.email}`, icon: Mail, label: "E-mail", value: SITE.email, method: "email" as const },
    { href: SITE.address.mapsUrl, icon: MapPin, label: "Route", value: `${SITE.address.street}, ${SITE.address.city}`, method: "route" as const, external: true },
  ];

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-label="Contactgegevens en link delen"
        aria-expanded={open}
        aria-controls={id}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <Link2 className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden />
      </button>

      {open && (
        <div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-label="Contact met Reactly"
          className="enter fixed inset-x-3 top-[calc(var(--nav-h)+0.5rem)] z-[120] overflow-hidden rounded-2xl border border-line bg-surface-elevated text-ink shadow-dialog sm:absolute sm:inset-x-auto sm:right-0 sm:top-[calc(100%+0.75rem)] sm:w-[340px]"
          style={{ ["--in-y" as string]: "-6px", ["--dur" as string]: "0.35s" }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-subtle">Direct contact</p>
              <p className="mt-0.5 text-[12px] text-ink-muted">{status?.label ?? " "}</p>
            </div>
            {status && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold",
                  status.open ? "bg-success-soft text-success" : "bg-surface-sunken text-ink-muted",
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", status.open ? "bg-success" : "bg-ink-subtle")} />
                {status.open ? "Nu bereikbaar" : "Nu gesloten"}
              </span>
            )}
          </div>

          <ul className="p-1.5">
            {rows.map(({ href, icon: Icon, label, value, method, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => {
                    trackContact(method, "navbar_link");
                    setOpen(false);
                  }}
                  className="group flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-surface-sunken"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-surface text-ink">
                    {Icon ? <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden /> : <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-semibold">{label}</span>
                    <span className="block truncate text-[11.5px] text-ink-muted">{value}</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-line p-3">
            <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-subtle">Deze pagina delen</p>
            <div className={cn("mt-2 grid gap-2", canShare ? "grid-cols-2" : "grid-cols-1")}>
              <button
                type="button"
                onClick={copy}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-line bg-surface text-[12px] font-medium transition-colors hover:bg-surface-sunken"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-success" aria-hidden /> : <Link2 className="h-3.5 w-3.5" aria-hidden />}
                <span aria-live="polite">{copied ? "Gekopieerd" : "Link kopiëren"}</span>
              </button>
              {canShare && (
                <button
                  type="button"
                  onClick={share}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-line bg-surface text-[12px] font-medium transition-colors hover:bg-surface-sunken"
                >
                  <Share2 className="h-3.5 w-3.5" aria-hidden />
                  Delen…
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
