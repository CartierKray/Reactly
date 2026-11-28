/**
 * lib/dashboard/demo.ts
 *
 * Voorbeelddata voor kanalen die nog niet gekoppeld zijn, zodat het dashboard
 * er direct compleet uitziet. Altijd gemarkeerd als `demo` en in beeld met het
 * label "Voorbeelddata". Vast patroon per dag (geen willekeur bij elke
 * verversing), zodat cijfers niet verspringen.
 */

import type { CampaignRow, ChannelId, DayPoint, LeadRow, LeadStatus } from "./types";

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

export function demoDays(channel: ChannelId, days: number): DayPoint[] {
  const out: DayPoint[] = [];
  const vandaag = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(vandaag);
    d.setUTCDate(d.getUTCDate() - i);
    const r = rng(Number(iso(d).replace(/-/g, "")) * (channel === "meta" ? 3 : 7));
    const weekend = [0, 6].includes(d.getUTCDay()) ? 0.78 : 1;
    const groei = 1 + (days - i) / (days * 3);
    const spend = (channel === "meta" ? 42 : 58) * weekend * groei * (0.85 + r() * 0.3);
    const roas = (channel === "meta" ? 3.1 : 4.2) * (0.8 + r() * 0.45);
    const clicks = Math.round(spend * (channel === "meta" ? 2.6 : 1.7) * (0.85 + r() * 0.3));
    out.push({
      date: iso(d),
      spend: Math.round(spend * 100) / 100,
      revenue: Math.round(spend * roas),
      leads: Math.max(0, Math.round(spend / (channel === "meta" ? 14 : 19) + (r() - 0.5) * 2)),
      clicks,
      impressions: Math.round(clicks * (channel === "meta" ? 62 : 24)),
    });
  }
  return out;
}

export function demoCampaigns(): CampaignRow[] {
  const basis: [ChannelId, string, string, number, number, number, number, boolean][] = [
    ["meta", "Websites vanaf € 499 · prospecting", "OUTCOME_LEADS", 35, 1012, 3820, 74, true],
    ["meta", "Retargeting · offerte gestart", "OUTCOME_LEADS", 15, 402, 2210, 31, true],
    ["meta", "AI-chatbot · interesse", "OUTCOME_TRAFFIC", 20, 288, 610, 9, false],
    ["google", "Search · webdesign bureau", "search", 40, 1210, 5980, 52, true],
    ["google", "Search · website laten maken", "search", 30, 845, 3970, 41, true],
    ["google", "Performance Max · leads", "performance_max", 25, 590, 1720, 18, false],
  ];
  return basis.map(([channel, name, objective, budget, spend, revenue, leads, actief], i) => {
    const clicks = Math.round(spend * (channel === "meta" ? 2.4 : 1.6));
    const impressions = clicks * (channel === "meta" ? 58 : 22);
    return {
      id: `demo-${i}`,
      channel,
      name,
      status: actief ? "active" : "paused",
      statusLabel: actief ? "actief" : "gepauzeerd",
      objective,
      dailyBudget: budget,
      spend,
      revenue,
      leads,
      clicks,
      impressions,
      ctr: (clicks / impressions) * 100,
      cpc: spend / clicks,
      roas: revenue / spend,
      cpl: spend / leads,
      demo: true,
    } satisfies CampaignRow;
  });
}

export function demoLeads(): LeadRow[] {
  const mensen: [string, string, string, string, LeadStatus, number, number][] = [
    ["Sanne de Vries", "Studio Noord", "Offerteaanvraag", "Groei + AI-chatbot", "nieuw", 0, 0],
    ["Mark Jansen", "Jansen Installatietechniek", "Offerteaanvraag", "Pro", "gecontacteerd", 0, 1],
    ["Fatima El Amrani", "Bloom Beauty", "Gratis website-scan", "", "offerte", 1249, 1],
    ["Thomas Bakker", "Bakker Bouw", "Contactformulier", "", "gewonnen", 2495, 2],
    ["Lisa Visser", "Visser Advies", "Offerteaanvraag", "Start", "gewonnen", 499, 3],
    ["Daan Smit", "Smit Mobility", "Chat: terugbelverzoek", "", "nieuw", 0, 3],
    ["Noor Hendriks", "Hendriks & Co", "Offerteaanvraag", "AI & maatwerk", "offerte", 6500, 4],
    ["Ruben Mulder", "Mulder Webshop", "Gratis website-scan", "", "verloren", 0, 6],
  ];
  const nu = Date.now();
  return mensen.map(([name, company, source, pakket, status, value, dagen], i) => ({
    id: `demo-lead-${i}`,
    email: `${name.split(" ")[0].toLowerCase()}@voorbeeld.nl`,
    name,
    company,
    source,
    pakket: pakket || undefined,
    services: pakket ? "Webdesign & UX/UI, Webdevelopment" : undefined,
    status,
    value,
    newsletter: i % 3 === 0,
    createdAt: new Date(nu - dagen * 86_400_000 - i * 3_600_000).toISOString(),
    demo: true,
  }));
}
