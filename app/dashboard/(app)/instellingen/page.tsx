import { CheckCircle2, CircleDashed, ExternalLink } from "lucide-react";

import { Card } from "@/components/dashboard/ui";
import { connectorStatus } from "@/lib/dashboard/data";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Instellingen" };

const HULP: Record<string, { label: string; href: string }[]> = {
  resend: [{ label: "Resend: API-sleutel maken", href: "https://resend.com/api-keys" }],
  meta: [
    { label: "Business Manager: systeemgebruikers", href: "https://business.facebook.com/settings/system-users" },
    { label: "Events Manager (Pixel en Conversions API)", href: "https://business.facebook.com/events_manager2" },
  ],
  google: [
    { label: "Google Ads API: aan de slag", href: "https://developers.google.com/google-ads/api/docs/get-started/introduction" },
    { label: "Google Ads: conversieacties", href: "https://ads.google.com/aw/conversions" },
  ],
  tracking: [{ label: "Google Ads: conversielabel vinden", href: "https://support.google.com/google-ads/answer/6095821" }],
};

export default function InstellingenPage() {
  const status = connectorStatus();
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[1.6rem] leading-tight tracking-[-0.02em]">Instellingen</h1>
        <p className="mt-1 max-w-2xl text-[12.5px] leading-relaxed text-ink-muted">
          Koppelingen zet je aan met omgevingsvariabelen in Vercel (Project → Settings → Environment Variables), daarna een nieuwe deploy. Geheime sleutels staan
          nooit in de code en worden hier niet getoond, alleen of ze zijn ingesteld.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {status.map((c) => (
          <Card
            key={c.id}
            title={c.name}
            action={
              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", c.connected ? "bg-success-soft text-success" : "bg-surface-sunken text-ink-muted")}>
                {c.connected ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> : <CircleDashed className="h-3.5 w-3.5" aria-hidden />}
                {c.connected ? "Gekoppeld" : "Niet gekoppeld"}
              </span>
            }
          >
            <p className="text-[12.5px] text-ink-muted">{c.detail}</p>
            <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
              {c.env.map((e) => (
                <li key={e.key} className="flex items-start gap-3 px-3.5 py-2.5">
                  <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", e.set ? "bg-success" : "bg-line-strong")} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <code className="font-mono text-[11.5px] font-semibold text-ink">{e.key}</code>
                    <span className="block text-[11.5px] leading-relaxed text-ink-muted">{e.help}</span>
                  </span>
                  <span className="shrink-0 text-[11px] text-ink-subtle">{e.set ? "ingesteld" : "ontbreekt"}</span>
                </li>
              ))}
            </ul>
            {HULP[c.id] && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {HULP[c.id].map((h) => (
                  <a key={h.href} href={h.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11.5px] font-medium text-ink-muted hover:text-ink">
                    {h.label}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
