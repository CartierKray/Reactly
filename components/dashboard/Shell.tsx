"use client";

/**
 * components/dashboard/Shell.tsx
 *
 * Het kader van het dashboard: een donkere zijbalk (op telefoon een balk met
 * tabs bovenaan) met de onderdelen, rechtsboven thema en uitloggen, en een
 * melding zolang er nog geen wachtwoord is ingesteld.
 */

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, ExternalLink, LayoutDashboard, LogOut, Mail, Megaphone, Settings, Users } from "lucide-react";

import { Wordmark } from "@/components/site/Brand";
import { RubikCube } from "@/components/site/RubikCube";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Overzicht", icon: LayoutDashboard },
  { href: "/dashboard/campagnes", label: "Campagnes", icon: Megaphone },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/mail", label: "Mail", icon: Mail },
  { href: "/dashboard/instellingen", label: "Instellingen", icon: Settings },
];

export default function Shell({ children, zonderWachtwoord }: { children: React.ReactNode; zonderWachtwoord: boolean }) {
  const pathname = usePathname() ?? "/dashboard";
  const router = useRouter();
  const actief = (href: string) => (href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href));

  const uitloggen = async () => {
    await fetch("/api/dashboard/login", { method: "DELETE" }).catch(() => undefined);
    router.push("/dashboard/login");
    router.refresh();
  };

  return (
    <div className="min-h-[100dvh] bg-page text-ink lg:grid lg:grid-cols-[232px_1fr]">
      {/* Zijbalk (desktop) */}
      <aside className="deep noise sticky top-0 hidden h-[100dvh] flex-col overflow-hidden border-r border-white/10 bg-page text-white lg:flex">
        <div aria-hidden className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 bg-[radial-gradient(closest-side,var(--deep-glow-a),transparent)]" />
        <div className="relative flex items-center gap-2 px-5 pb-6 pt-6">
          <Wordmark className="text-[1.35rem]" />
          <span className="rounded-md border border-white/12 bg-white/[0.06] px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/60">Intern</span>
        </div>
        <nav aria-label="Dashboard" className="relative flex-1 space-y-0.5 px-3">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={actief(href) ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
                actief(href) ? "bg-white/[0.09] text-white" : "text-white/60 hover:bg-white/[0.05] hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </Link>
          ))}
        </nav>
        <div className="relative mx-3 mb-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <RubikCube size={34} pose="tilt" shadow={false} className="absolute -right-1 -top-1" />
          <p className="pr-12 text-[12px] font-semibold">Reactly Growth</p>
          <p className="mt-1 text-[11px] leading-relaxed text-white/55">Ads, leads en mail op één plek. Alleen voor intern gebruik.</p>
          <a href="/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-white/70 hover:text-white">
            Naar de website
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Bovenbalk */}
        <header className="sticky top-0 z-30 border-b border-line bg-page/85 backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex items-center gap-2 lg:hidden">
              <BarChart3 className="h-4 w-4" aria-hidden />
              <span className="text-[13px] font-semibold">Reactly dashboard</span>
            </div>
            <p className="hidden text-[12px] text-ink-muted lg:block">{NAV.find((n) => actief(n.href))?.label ?? "Dashboard"}</p>
            <div className="flex items-center gap-1">
              <ThemeToggle className="text-ink-muted hover:bg-surface-sunken hover:text-ink" />
              <button
                type="button"
                onClick={uitloggen}
                className="inline-flex h-9 items-center gap-2 rounded-full px-3 text-[12px] font-medium text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
              >
                <LogOut className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Uitloggen</span>
              </button>
            </div>
          </div>
          {/* Tabs (telefoon en tablet) */}
          <nav aria-label="Dashboard" className="scrollbar-hide flex gap-1 overflow-x-auto px-3 pb-2 lg:hidden">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={actief(href) ? "page" : undefined}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium",
                  actief(href) ? "bg-ink text-page" : "text-ink-muted hover:bg-surface-sunken",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
        </header>

        {zonderWachtwoord && (
          <div className="border-b border-line bg-surface-sunken px-4 py-2 text-center text-[11.5px] text-ink-muted sm:px-6">
            Lokale modus zonder wachtwoord. Online is het dashboard dicht tot je <code className="font-mono">DASHBOARD_PASSWORD</code> instelt.
          </div>
        )}

        {/* Geen eigen <main>: de rootlayout heeft er al één. */}
        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </div>
    </div>
  );
}
