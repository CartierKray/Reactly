/**
 * lib/dashboard/meta.ts  (alleen server)
 *
 * Meta Marketing API (standaard v27.0): uitgaven, resultaten en campagnes van
 * het advertentieaccount, campagnes pauzeren/activeren, dagbudget aanpassen en
 * een nieuwe campagne klaarzetten (campagne + advertentieset + advertentie),
 * altijd op PAUSED: er gaat niets live voordat je het in Ads Manager
 * controleert en aanzet.
 *
 *   META_ACCESS_TOKEN    systeemgebruikerstoken (ads_management, ads_read)
 *   META_AD_ACCOUNT_ID   bv. act_1234567890 (of alleen de cijfers)
 *   META_PAGE_ID         Facebook-pagina voor advertenties (nieuwe campagnes)
 *   META_PIXEL_ID        Pixel voor campagnes op leads (optioneel)
 *   META_API_VERSION     standaard v27.0
 */

import type { CampaignRow, DayPoint } from "./types";

const versie = () => process.env.META_API_VERSION || "v27.0";
const token = () => process.env.META_ACCESS_TOKEN;
const account = () => {
  const a = process.env.META_AD_ACCOUNT_ID?.trim();
  return a ? (a.startsWith("act_") ? a : `act_${a}`) : null;
};

export const metaConfigured = () => Boolean(token() && account());

async function graph<T>(path: string, opts: { method?: "GET" | "POST"; params?: Record<string, string>; body?: Record<string, unknown> } = {}): Promise<T> {
  const url = new URL(`https://graph.facebook.com/${versie()}/${path.replace(/^\//, "")}`);
  for (const [k, v] of Object.entries(opts.params ?? {})) url.searchParams.set(k, v);
  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers: { Authorization: `Bearer ${token()}`, ...(opts.body ? { "Content-Type": "application/json" } : {}) },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: { message?: string; error_user_msg?: string } } & T;
  if (!res.ok || data.error) throw new Error(data.error?.error_user_msg || data.error?.message || `Meta gaf ${res.status}`);
  return data;
}

type Action = { action_type: string; value: string };
type InsightRow = {
  date_start?: string;
  campaign_id?: string;
  campaign_name?: string;
  spend?: string;
  impressions?: string;
  clicks?: string;
  ctr?: string;
  cpc?: string;
  actions?: Action[];
  action_values?: Action[];
};

const LEAD_TYPES = ["lead", "offsite_conversion.fb_pixel_lead", "onsite_conversion.lead_grouped", "onsite_web_lead"];
const WAARDE_TYPES = ["purchase", "offsite_conversion.fb_pixel_purchase", "omni_purchase", "lead", "offsite_conversion.fb_pixel_lead"];

const getal = (v?: string) => (v ? Number(v) || 0 : 0);
function leadsUit(actions?: Action[]): number {
  if (!actions) return 0;
  // Meta telt sommige leads onder meerdere namen; neem de hoogste i.p.v. op te tellen.
  return Math.max(0, ...actions.filter((a) => LEAD_TYPES.includes(a.action_type)).map((a) => getal(a.value)));
}
function waardeUit(values?: Action[]): number {
  if (!values) return 0;
  return Math.max(0, ...values.filter((a) => WAARDE_TYPES.includes(a.action_type)).map((a) => getal(a.value)));
}

export async function metaDays(days: number): Promise<DayPoint[]> {
  const r = await graph<{ data: InsightRow[] }>(`${account()}/insights`, {
    params: { fields: "spend,impressions,clicks,actions,action_values", time_increment: "1", date_preset: days <= 7 ? "last_7d" : days <= 14 ? "last_14d" : "last_30d", limit: "100" },
  });
  return (r.data ?? []).map((d) => ({
    date: d.date_start ?? "",
    spend: getal(d.spend),
    revenue: waardeUit(d.action_values),
    leads: leadsUit(d.actions),
    clicks: getal(d.clicks),
    impressions: getal(d.impressions),
  }));
}

export async function metaCampaigns(days: number): Promise<CampaignRow[]> {
  const preset = days <= 7 ? "last_7d" : days <= 14 ? "last_14d" : "last_30d";
  const [lijst, inzicht] = await Promise.all([
    graph<{ data: { id: string; name: string; status: string; effective_status: string; objective?: string; daily_budget?: string }[] }>(`${account()}/campaigns`, {
      params: { fields: "id,name,status,effective_status,objective,daily_budget", limit: "100" },
    }),
    graph<{ data: InsightRow[] }>(`${account()}/insights`, {
      params: { level: "campaign", fields: "campaign_id,campaign_name,spend,impressions,clicks,ctr,cpc,actions,action_values", date_preset: preset, limit: "200" },
    }),
  ]);
  const perCampagne = new Map((inzicht.data ?? []).map((i) => [i.campaign_id, i]));
  return (lijst.data ?? [])
    .filter((c) => c.status !== "DELETED" && c.status !== "ARCHIVED")
    .map((c) => {
      const i = perCampagne.get(c.id);
      const spend = getal(i?.spend);
      const revenue = waardeUit(i?.action_values);
      const leads = leadsUit(i?.actions);
      const clicks = getal(i?.clicks);
      return {
        id: c.id,
        channel: "meta" as const,
        name: c.name,
        status: c.effective_status === "ACTIVE" ? "active" : c.status === "PAUSED" || c.effective_status.includes("PAUSED") ? "paused" : "other",
        statusLabel: c.effective_status.replace(/_/g, " ").toLowerCase(),
        objective: c.objective,
        dailyBudget: c.daily_budget ? Number(c.daily_budget) / 100 : null,
        spend,
        revenue,
        leads,
        clicks,
        impressions: getal(i?.impressions),
        ctr: getal(i?.ctr),
        cpc: getal(i?.cpc),
        roas: spend > 0 && revenue > 0 ? revenue / spend : null,
        cpl: leads > 0 ? spend / leads : null,
        demo: false,
      } satisfies CampaignRow;
    });
}

export async function metaSetStatus(id: string, active: boolean) {
  await graph(id, { method: "POST", body: { status: active ? "ACTIVE" : "PAUSED" } });
}

export async function metaSetBudget(id: string, euroPerDag: number) {
  await graph(id, { method: "POST", body: { daily_budget: Math.round(euroPerDag * 100) } });
}

export type NieuweMetaCampagne = {
  name: string;
  objective: "OUTCOME_TRAFFIC" | "OUTCOME_LEADS";
  dailyBudget: number;
  link: string;
  headline: string;
  primaryText: string;
  description?: string;
  imageUrl: string;
  cta: string;
  countries: string[];
  ageMin: number;
  ageMax: number;
};

/** Campagne + advertentieset + advertentie, alles op PAUSED. */
export async function metaCreateCampaign(c: NieuweMetaCampagne) {
  const act = account();
  const page = process.env.META_PAGE_ID;
  if (!act) throw new Error("META_AD_ACCOUNT_ID ontbreekt");
  if (!page) throw new Error("META_PAGE_ID ontbreekt: nodig om advertenties namens je Facebook-pagina te plaatsen.");
  const pixel = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const opLeads = c.objective === "OUTCOME_LEADS" && Boolean(pixel);
  const stappen: string[] = [];
  try {
    const campaign = await graph<{ id: string }>(`${act}/campaigns`, {
      method: "POST",
      body: {
        name: c.name,
        objective: opLeads ? "OUTCOME_LEADS" : "OUTCOME_TRAFFIC",
        status: "PAUSED",
        special_ad_categories: [],
        daily_budget: Math.round(c.dailyBudget * 100),
        bid_strategy: "LOWEST_COST_WITHOUT_CAP",
      },
    });
    stappen.push(`campagne ${campaign.id}`);
    const adset = await graph<{ id: string }>(`${act}/adsets`, {
      method: "POST",
      body: {
        name: `${c.name} · doelgroep`,
        campaign_id: campaign.id,
        status: "PAUSED",
        billing_event: "IMPRESSIONS",
        optimization_goal: opLeads ? "OFFSITE_CONVERSIONS" : "LINK_CLICKS",
        destination_type: "WEBSITE",
        ...(opLeads ? { promoted_object: { pixel_id: pixel, custom_event_type: "LEAD" } } : {}),
        targeting: {
          geo_locations: { countries: c.countries.length ? c.countries : ["NL"] },
          age_min: c.ageMin,
          age_max: c.ageMax,
          targeting_automation: { advantage_audience: 0 },
        },
      },
    });
    stappen.push(`advertentieset ${adset.id}`);
    const creative = await graph<{ id: string }>(`${act}/adcreatives`, {
      method: "POST",
      body: {
        name: `${c.name} · advertentie`,
        object_story_spec: {
          page_id: page,
          link_data: {
            link: c.link,
            message: c.primaryText,
            name: c.headline,
            ...(c.description ? { description: c.description } : {}),
            picture: c.imageUrl,
            call_to_action: { type: c.cta, value: { link: c.link } },
          },
        },
      },
    });
    stappen.push(`creative ${creative.id}`);
    const ad = await graph<{ id: string }>(`${act}/ads`, {
      method: "POST",
      body: { name: `${c.name} · advertentie`, adset_id: adset.id, creative: { creative_id: creative.id }, status: "PAUSED" },
    });
    stappen.push(`advertentie ${ad.id}`);
    return {
      campaignId: campaign.id,
      adsManager: `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${act.replace("act_", "")}&selected_campaign_ids=${campaign.id}`,
    };
  } catch (e) {
    const al = stappen.length ? ` Al aangemaakt (gepauzeerd): ${stappen.join(", ")}.` : "";
    throw new Error(`${e instanceof Error ? e.message : "Onbekende fout bij Meta"}.${al}`);
  }
}
