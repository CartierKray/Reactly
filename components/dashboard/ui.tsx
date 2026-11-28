/**
 * components/dashboard/ui.tsx
 *
 * Bouwstenen van het dashboard: kaart, kerncijfer, label voor voorbeelddata,
 * status-badges en een lege toestand. Werkt in licht en donker (tokens).
 */

import { ArrowDownRight, ArrowUpRight, FlaskConical, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

export function Card({ title, action, demo, className, children, bodyClassName }: { title?: string; action?: React.ReactNode; demo?: boolean; className?: string; bodyClassName?: string; children: React.ReactNode }) {
  return (
    <section className={cn("rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]", className)}>
      {(title || action || demo) && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-2">
            {title && <h2 className="truncate text-[13px] font-semibold text-ink">{title}</h2>}
            {demo && <DemoBadge />}
          </div>
          {action}
        </header>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function DemoBadge() {
  return (
    <span title="Nog niet gekoppeld: dit zijn voorbeeldcijfers" className="inline-flex shrink-0 items-center gap-1 rounded-full border border-dashed border-line-strong px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
      <FlaskConical className="h-3 w-3" aria-hidden />
      Voorbeelddata
    </span>
  );
}

/** Kerncijfer met verandering t.o.v. de vorige periode. `goodWhenUp`: false bij kosten. */
export function Kpi({ label, value, change, goodWhenUp = true, hint }: { label: string; value: string; change: number | null; goodWhenUp?: boolean; hint?: string }) {
  const omhoog = change !== null && change > 0.5;
  const omlaag = change !== null && change < -0.5;
  const goed = (omhoog && goodWhenUp) || (omlaag && !goodWhenUp);
  const slecht = (omlaag && goodWhenUp) || (omhoog && !goodWhenUp);
  const Icon = omhoog ? ArrowUpRight : omlaag ? ArrowDownRight : Minus;
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)]">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">{label}</p>
      <p className="mt-2 text-[1.55rem] font-medium leading-none tracking-[-0.02em] text-ink tabular-nums">{value}</p>
      <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-ink-muted">
        {change === null ? (
          <span>{hint ?? "Nog geen vergelijking"}</span>
        ) : (
          <>
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold tabular-nums",
                goed && "bg-success-soft text-success",
                slecht && "bg-destructive-soft text-destructive",
                !goed && !slecht && "bg-surface-sunken text-ink-muted",
              )}
            >
              <Icon className="h-3 w-3" aria-hidden />
              {Math.abs(change).toFixed(0)}%
            </span>
            <span>{hint ?? "vs. vorige periode"}</span>
          </>
        )}
      </p>
    </div>
  );
}

export function StatusPill({ status, label }: { status: "active" | "paused" | "other"; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
        status === "active" ? "bg-success-soft text-success" : status === "paused" ? "bg-surface-sunken text-ink-muted" : "bg-surface-sunken text-ink-subtle",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", status === "active" ? "bg-success" : "bg-ink-subtle")} />
      {label ?? (status === "active" ? "Actief" : status === "paused" ? "Gepauzeerd" : "Overig")}
    </span>
  );
}

export function ChannelMark({ channel }: { channel: "meta" | "google" }) {
  return channel === "meta" ? (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-muted">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <path fill="currentColor" d="M6.9 5C4.2 5 2 8.6 2 12.8c0 2.6 1.1 4.2 3 4.2 1.6 0 2.7-1.2 4.4-4l1.3-2.2.4.7c1.8 3 3.4 5.5 5.9 5.5 2.6 0 4-2.2 4-5.6C21 7.9 18.9 5 16.5 5c-1.6 0-2.9 1.1-4.4 3.3C10.6 6 9.2 5 6.9 5Zm-.2 2.4c1.2 0 2.1.9 3.6 3.4l-1.4 2.3c-1.4 2.3-2.1 3.3-3 3.3-.9 0-1.4-.9-1.4-2.4 0-3.4 1.2-6.6 2.2-6.6Zm9.7 0c1.5 0 2.4 2.5 2.4 5.6 0 2-.6 3.1-1.6 3.1-1.1 0-1.9-1.2-4.1-4.9l-.6-1c1.4-2.2 2.5-2.8 3.9-2.8Z" />
      </svg>
      Meta
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-muted">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
        <path fill="currentColor" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3ZM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Zm-5.6-8c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.1L6.4 14ZM12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 5.9 12 5.9Z" />
      </svg>
      Google
    </span>
  );
}

export function Empty({ icon: Icon, title, text, children }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-sunken text-ink">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 text-[13.5px] font-semibold text-ink">{title}</p>
      <p className="mt-1 max-w-sm text-[12.5px] leading-relaxed text-ink-muted">{text}</p>
      {children}
    </div>
  );
}
