/**
 * lib/dashboard/data.ts  (alleen server)
 *
 * Haalt alles voor het dashboard op en voegt het samen: Meta, Google Ads en de
 * leads uit Resend. Elk kanaal apart: valt er één uit of is het nog niet
 * gekoppeld, dan toont het dashboard daar voorbeelddata (gemarkeerd) en blijft
 * de rest gewoon werken. Antwoorden worden 60 seconden per server bewaard, dus
 * het live verversen belast de API's nauwelijks.
 */

import { demoCampaigns, demoDays, demoLeads } from "./demo";
import { googleAdsConfigured, googleCampaigns, googleDays } from "./google-ads";
import { metaCampaigns, metaConfigured, metaDays } from "./meta";
import { LEAD_STATUSES, type CampaignRow, type ChannelSummary, type ConnectorStatus, type DayPoint, type LeadRow, type LeadStatus, type Overview } from "./types";
import { listContacts, resendConfigured, ensureSegment, type Contact } from "@/lib/resend-api";

const CACHE_MS = 60_000;
let cache: { key: string; at: number; data: Overview } | null = null;

const som = (d: DayPoint[], k: keyof Omit<DayPoint, "date">) => d.reduce((s, x) => s + x[k], 0);

async function kanaal(id: "meta" | "google", days: number): Promise<{ summary: ChannelSummary; campaigns: CampaignRow[] }> {
  const naam = id === "meta" ? "Meta Ads" : "Google Ads";
  const gekoppeld = id === "meta" ? metaConfigured() : googleAdsConfigured();
  let punten: DayPoint[];
  let campagnes: CampaignRow[];
  let demo = false;
  let error: string | undefined;
  if (gekoppeld) {
    try {
      [punten, campagnes] = id === "meta" ? await Promise.all([metaDays(days), metaCampaigns(days)]) : await Promise.all([googleDays(days), googleCampaigns(days)]);
    } catch (e) {
      error = e instanceof Error ? e.message : "Onbekende fout";
      punten = demoDays(id, days);
      campagnes = demoCampaigns().filter((c) => c.channel === id);
      demo = true;
    }
  } else {
    punten = demoDays(id, days);
    campagnes = demoCampaigns().filter((c) => c.channel === id);
    demo = true;
  }
  return {
    summary: {
      id,
      name: naam,
      connected: gekoppeld && !error,
      demo,
      error,
      spend: som(punten, "spend"),
      revenue: som(punten, "revenue"),
      leads: som(punten, "leads"),
      clicks: som(punten, "clicks"),
      impressions: som(punten, "impressions"),
      days: punten,
    },
    campaigns: campagnes,
  };
}

function naarLead(c: Contact): LeadRow {
  const p = c.properties ?? {};
  const s = (k: string) => (p[k] === null || p[k] === undefined ? undefined : String(p[k]));
  const status = (s("status") as LeadStatus) || "nieuw";
  return {
    id: c.id,
    email: c.email,
    name: [c.first_name, c.last_name].filter(Boolean).join(" ") || c.email,
    company: s("bedrijf"),
    phone: s("telefoon"),
    source: s("bron"),
    services: s("diensten"),
    pakket: s("pakket"),
    website: s("website"),
    status: LEAD_STATUSES.some((x) => x.id === status) ? status : "nieuw",
    value: Number(s("waarde") ?? 0) || 0,
    newsletter: s("nieuwsbrief") === "ja" || c.unsubscribed === false,
    createdAt: c.created_at,
    demo: false,
  };
}

export async function getWebsiteLeads(): Promise<{ leads: LeadRow[]; connected: boolean; demo: boolean; error?: string }> {
  if (!resendConfigured()) return { leads: demoLeads(), connected: false, demo: true };
  try {
    const segment = await ensureSegment(process.env.RESEND_LEADS_SEGMENT || "Website-aanvragen");
    const r = await listContacts({ segmentId: segment, limit: 100 });
    const leads = (r.data ?? []).map(naarLead).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return { leads, connected: true, demo: false };
  } catch (e) {
    return { leads: demoLeads(), connected: false, demo: true, error: e instanceof Error ? e.message : "Onbekende fout" };
  }
}

/** Leest de dagreeksen van alle kanalen samen tot één reeks. */
function samenvoegen(reeksen: DayPoint[][]): DayPoint[] {
  const per = new Map<string, DayPoint>();
  for (const r of reeksen)
    for (const d of r) {
      const x = per.get(d.date) ?? { date: d.date, spend: 0, revenue: 0, leads: 0, clicks: 0, impressions: 0 };
      x.spend += d.spend;
      x.revenue += d.revenue;
      x.leads += d.leads;
      x.clicks += d.clicks;
      x.impressions += d.impressions;
      per.set(d.date, x);
    }
  return Array.from(per.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export async function getOverview(days = 30, { fresh = false } = {}): Promise<Overview> {
  const key = `${days}`;
  if (!fresh && cache && cache.key === key && Date.now() - cache.at < CACHE_MS) return cache.data;

  const [meta, google, leads] = await Promise.all([kanaal("meta", days), kanaal("google", days), getWebsiteLeads()]);
  const channels = [meta.summary, google.summary];
  const dagen = samenvoegen(channels.map((c) => c.days));
  const spend = som(dagen, "spend");
  const revenue = som(dagen, "revenue");
  const adLeads = som(dagen, "leads");
  const clicks = som(dagen, "clicks");
  const impressions = som(dagen, "impressions");
  const byStatus = Object.fromEntries(LEAD_STATUSES.map((s) => [s.id, 0])) as Record<LeadStatus, number>;
  for (const l of leads.leads) byStatus[l.status] += 1;
  const gewonnen = leads.leads.filter((l) => l.status === "gewonnen");

  const data: Overview = {
    generatedAt: new Date().toISOString(),
    rangeDays: days,
    demo: channels.some((c) => c.demo) || leads.demo,
    channels,
    days: dagen,
    campaigns: [...meta.campaigns, ...google.campaigns].sort((a, b) => b.spend - a.spend),
    totals: {
      spend,
      revenue,
      adLeads,
      clicks,
      impressions,
      roas: spend > 0 && revenue > 0 ? revenue / spend : null,
      cpl: adLeads > 0 ? spend / adLeads : null,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
    },
    leads: {
      connected: leads.connected,
      demo: leads.demo,
      error: leads.error,
      recent: leads.leads.slice(0, 8),
      total: leads.leads.length,
      open: leads.leads.filter((l) => !["gewonnen", "verloren"].includes(l.status)).length,
      won: gewonnen.length,
      wonValue: gewonnen.reduce((s, l) => s + l.value, 0),
      pipelineValue: leads.leads.filter((l) => l.status === "offerte").reduce((s, l) => s + l.value, 0),
      byStatus,
    },
  };
  cache = { key, at: Date.now(), data };
  return data;
}

export function invalidateOverview() {
  cache = null;
}

/** Welke koppelingen staan aan, en welke omgevingsvariabelen ontbreken nog. */
export function connectorStatus(): ConnectorStatus[] {
  const has = (k: string) => Boolean(process.env[k]?.trim());
  const item = (key: string, help: string, secret = true) => ({ key, set: has(key), secret, help });
  return [
    {
      id: "dashboard",
      name: "Dashboard-toegang",
      connected: has("DASHBOARD_PASSWORD"),
      detail: has("DASHBOARD_PASSWORD") ? "Beveiligd met een wachtwoord." : "Zet een wachtwoord, anders is het dashboard online dicht.",
      env: [item("DASHBOARD_PASSWORD", "Het wachtwoord om in te loggen."), item("DASHBOARD_SECRET", "Optioneel: lange willekeurige tekst om sessies te ondertekenen.")],
    },
    {
      id: "resend",
      name: "Resend (leads en mail)",
      connected: has("RESEND_API_KEY"),
      detail: "Leads, contacten, mailings en uitnodigingen.",
      env: [
        item("RESEND_API_KEY", "API-sleutel met volledige toegang (contacten en mailings)."),
        item("DASHBOARD_MAIL_FROM", "Afzender voor mailings, bv. Reactly <info@reactly.nl> (geverifieerd domein).", false),
        item("RESEND_LEADS_SEGMENT", "Optioneel: naam van het segment voor website-aanvragen (standaard Website-aanvragen).", false),
      ],
    },
    {
      id: "meta",
      name: "Meta Ads",
      connected: metaConfigured(),
      detail: "Uitgaven, leads, ROAS en campagnes beheren.",
      env: [
        item("META_ACCESS_TOKEN", "Systeemgebruikerstoken met ads_management en ads_read (Business Manager)."),
        item("META_AD_ACCOUNT_ID", "Je advertentieaccount, bv. act_1234567890.", false),
        item("META_PAGE_ID", "Facebook-pagina waarmee nieuwe advertenties worden geplaatst.", false),
        item("META_PIXEL_ID", "Pixel voor campagnes op leads en de Conversions API.", false),
        item("META_CAPI_TOKEN", "Token voor de Conversions API (server-side conversies)."),
      ],
    },
    {
      id: "google",
      name: "Google Ads",
      connected: googleAdsConfigured(),
      detail: "Uitgaven, conversies, campagnes en budgetten.",
      env: [
        item("GOOGLE_ADS_DEVELOPER_TOKEN", "Uit het API Center van je Google Ads-manageraccount."),
        item("GOOGLE_ADS_CLIENT_ID", "OAuth-client uit Google Cloud.", false),
        item("GOOGLE_ADS_CLIENT_SECRET", "Geheim van de OAuth-client."),
        item("GOOGLE_ADS_REFRESH_TOKEN", "Refreshtoken met de scope https://www.googleapis.com/auth/adwords."),
        item("GOOGLE_ADS_CUSTOMER_ID", "Klant-ID van het advertentieaccount, zonder streepjes.", false),
        item("GOOGLE_ADS_LOGIN_CUSTOMER_ID", "Optioneel: ID van je manageraccount.", false),
      ],
    },
    {
      id: "tracking",
      name: "Tracking op de website",
      connected: has("NEXT_PUBLIC_META_PIXEL_ID") || has("NEXT_PUBLIC_GOOGLE_ADS_ID"),
      detail: "Pixel en Google Ads-tag laden na toestemming; aanvragen tellen als conversie.",
      env: [
        item("NEXT_PUBLIC_META_PIXEL_ID", "Meta Pixel-ID.", false),
        item("NEXT_PUBLIC_GOOGLE_ADS_ID", "Google Ads-tag, bv. AW-123456789.", false),
        item("NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL", "Conversielabel van de actie 'Aanvraag'.", false),
        item("NEXT_PUBLIC_GA_ID", "Google Analytics 4, bv. G-ABC123XYZ.", false),
        item("NEXT_PUBLIC_GTM_ID", "Optioneel: Google Tag Manager.", false),
      ],
    },
  ];
}
