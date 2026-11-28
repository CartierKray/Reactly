/**
 * lib/dashboard/google-ads.ts  (alleen server)
 *
 * Google Ads API (REST, standaard v26): uitgaven, conversies en campagnes,
 * campagnes pauzeren/activeren en het dagbudget aanpassen.
 *
 *   GOOGLE_ADS_DEVELOPER_TOKEN     uit het API Center van je manageraccount
 *   GOOGLE_ADS_CLIENT_ID           OAuth-client (Google Cloud)
 *   GOOGLE_ADS_CLIENT_SECRET
 *   GOOGLE_ADS_REFRESH_TOKEN       OAuth-refreshtoken met scope adwords
 *   GOOGLE_ADS_CUSTOMER_ID         advertentieaccount, bv. 1234567890
 *   GOOGLE_ADS_LOGIN_CUSTOMER_ID   manageraccount (optioneel)
 *   GOOGLE_ADS_API_VERSION         standaard v26
 */

import type { CampaignRow, DayPoint } from "./types";

const env = (k: string) => process.env[k]?.trim();
const klant = () => env("GOOGLE_ADS_CUSTOMER_ID")?.replace(/-/g, "");
const versie = () => env("GOOGLE_ADS_API_VERSION") || "v26";

export const googleAdsConfigured = () =>
  ["GOOGLE_ADS_DEVELOPER_TOKEN", "GOOGLE_ADS_CLIENT_ID", "GOOGLE_ADS_CLIENT_SECRET", "GOOGLE_ADS_REFRESH_TOKEN", "GOOGLE_ADS_CUSTOMER_ID"].every((k) => env(k));

let tokenCache: { token: string; tot: number } | null = null;

async function accessToken(): Promise<string> {
  if (tokenCache && tokenCache.tot > Date.now() + 60_000) return tokenCache.token;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env("GOOGLE_ADS_CLIENT_ID")!,
      client_secret: env("GOOGLE_ADS_CLIENT_SECRET")!,
      refresh_token: env("GOOGLE_ADS_REFRESH_TOKEN")!,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  const data = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error_description?: string };
  if (!res.ok || !data.access_token) throw new Error(data.error_description || "Google-login mislukt (controleer client en refreshtoken)");
  tokenCache = { token: data.access_token, tot: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return data.access_token;
}

async function ads<T>(pad: string, body: unknown): Promise<T> {
  const res = await fetch(`https://googleads.googleapis.com/${versie()}/customers/${klant()}/${pad}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      "developer-token": env("GOOGLE_ADS_DEVELOPER_TOKEN")!,
      ...(env("GOOGLE_ADS_LOGIN_CUSTOMER_ID") ? { "login-customer-id": env("GOOGLE_ADS_LOGIN_CUSTOMER_ID")!.replace(/-/g, "") } : {}),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: { message?: string; details?: { errors?: { message?: string }[] }[] } } & T;
  if (!res.ok || data.error) {
    const detail = data.error?.details?.[0]?.errors?.[0]?.message;
    throw new Error(detail || data.error?.message || `Google Ads gaf ${res.status}`);
  }
  return data;
}

async function gaql<T>(query: string): Promise<T[]> {
  const rows: T[] = [];
  let pageToken: string | undefined;
  do {
    const r = await ads<{ results?: T[]; nextPageToken?: string }>("googleAds:search", { query, ...(pageToken ? { pageToken } : {}) });
    rows.push(...(r.results ?? []));
    pageToken = r.nextPageToken;
  } while (pageToken && rows.length < 5000);
  return rows;
}

const bereik = (days: number) => (days <= 7 ? "LAST_7_DAYS" : days <= 14 ? "LAST_14_DAYS" : "LAST_30_DAYS");
const n = (v?: string | number) => (v === undefined ? 0 : Number(v) || 0);

type Metrics = {
  costMicros?: string;
  impressions?: string;
  clicks?: string;
  conversions?: number;
  conversionsValue?: number;
  ctr?: number;
  averageCpc?: string;
};

export async function googleDays(days: number): Promise<DayPoint[]> {
  const rows = await gaql<{ segments: { date: string }; metrics: Metrics }>(
    `SELECT segments.date, metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.conversions, metrics.conversions_value FROM customer WHERE segments.date DURING ${bereik(days)} ORDER BY segments.date`,
  );
  return rows.map((r) => ({
    date: r.segments.date,
    spend: n(r.metrics.costMicros) / 1e6,
    revenue: n(r.metrics.conversionsValue),
    leads: Math.round(n(r.metrics.conversions)),
    clicks: n(r.metrics.clicks),
    impressions: n(r.metrics.impressions),
  }));
}

export async function googleCampaigns(days: number): Promise<CampaignRow[]> {
  const rows = await gaql<{
    campaign: { id: string; name: string; status: string; advertisingChannelType?: string };
    campaignBudget?: { amountMicros?: string; resourceName?: string };
    metrics: Metrics;
  }>(
    `SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type, campaign_budget.amount_micros, campaign_budget.resource_name, metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.ctr, metrics.average_cpc, metrics.conversions, metrics.conversions_value FROM campaign WHERE segments.date DURING ${bereik(days)} AND campaign.status != 'REMOVED'`,
  );
  return rows.map((r) => {
    const spend = n(r.metrics.costMicros) / 1e6;
    const revenue = n(r.metrics.conversionsValue);
    const leads = Math.round(n(r.metrics.conversions));
    return {
      id: r.campaign.id,
      channel: "google" as const,
      name: r.campaign.name,
      status: r.campaign.status === "ENABLED" ? "active" : r.campaign.status === "PAUSED" ? "paused" : "other",
      statusLabel: r.campaign.status.toLowerCase(),
      objective: r.campaign.advertisingChannelType?.toLowerCase(),
      dailyBudget: r.campaignBudget?.amountMicros ? n(r.campaignBudget.amountMicros) / 1e6 : null,
      budgetRef: r.campaignBudget?.resourceName,
      spend,
      revenue,
      leads,
      clicks: n(r.metrics.clicks),
      impressions: n(r.metrics.impressions),
      ctr: n(r.metrics.ctr) * 100,
      cpc: n(r.metrics.averageCpc) / 1e6,
      roas: spend > 0 && revenue > 0 ? revenue / spend : null,
      cpl: leads > 0 ? spend / leads : null,
      demo: false,
    } satisfies CampaignRow;
  });
}

export async function googleSetStatus(id: string, active: boolean) {
  await ads("campaigns:mutate", {
    operations: [{ update: { resourceName: `customers/${klant()}/campaigns/${id}`, status: active ? "ENABLED" : "PAUSED" }, updateMask: "status" }],
  });
}

export async function googleSetBudget(budgetRef: string, euroPerDag: number) {
  await ads("campaignBudgets:mutate", {
    operations: [{ update: { resourceName: budgetRef, amountMicros: String(Math.round(euroPerDag * 1e6)) }, updateMask: "amount_micros" }],
  });
}
