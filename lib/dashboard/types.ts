/**
 * lib/dashboard/types.ts
 *
 * Gedeelde vormen voor het dashboard: dezelfde types voor echte data (Meta,
 * Google Ads, Resend) en voorbeelddata, zodat de schermen niet hoeven te weten
 * waar het vandaan komt.
 */

export type ChannelId = "meta" | "google";

export type DayPoint = {
  date: string; // JJJJ-MM-DD
  spend: number;
  revenue: number;
  leads: number;
  clicks: number;
  impressions: number;
};

export type ChannelSummary = {
  id: ChannelId;
  name: string;
  connected: boolean;
  demo: boolean;
  error?: string;
  spend: number;
  revenue: number;
  leads: number;
  clicks: number;
  impressions: number;
  days: DayPoint[];
};

export type CampaignStatus = "active" | "paused" | "other";

export type CampaignRow = {
  id: string;
  channel: ChannelId;
  name: string;
  status: CampaignStatus;
  statusLabel: string;
  objective?: string;
  /** Dagbudget in euro (null = budget op advertentieset of onbekend). */
  dailyBudget: number | null;
  /** Google: resource name van het budget, nodig om het te wijzigen. */
  budgetRef?: string;
  spend: number;
  revenue: number;
  leads: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
  roas: number | null;
  cpl: number | null;
  demo: boolean;
};

export type LeadStatus = "nieuw" | "gecontacteerd" | "offerte" | "gewonnen" | "verloren";

export const LEAD_STATUSES: { id: LeadStatus; label: string }[] = [
  { id: "nieuw", label: "Nieuw" },
  { id: "gecontacteerd", label: "Gecontacteerd" },
  { id: "offerte", label: "Offerte verstuurd" },
  { id: "gewonnen", label: "Gewonnen" },
  { id: "verloren", label: "Verloren" },
];

export type LeadRow = {
  id: string;
  email: string;
  name: string;
  company?: string;
  phone?: string;
  source?: string;
  services?: string;
  pakket?: string;
  website?: string;
  status: LeadStatus;
  value: number;
  newsletter: boolean;
  createdAt: string;
  demo: boolean;
};

export type Overview = {
  generatedAt: string;
  rangeDays: number;
  demo: boolean;
  channels: ChannelSummary[];
  days: DayPoint[];
  campaigns: CampaignRow[];
  totals: {
    spend: number;
    revenue: number;
    adLeads: number;
    clicks: number;
    impressions: number;
    roas: number | null;
    cpl: number | null;
    ctr: number;
  };
  leads: {
    connected: boolean;
    demo: boolean;
    error?: string;
    recent: LeadRow[];
    total: number;
    open: number;
    won: number;
    wonValue: number;
    pipelineValue: number;
    byStatus: Record<LeadStatus, number>;
  };
};

export type ConnectorStatus = {
  id: string;
  name: string;
  connected: boolean;
  detail: string;
  env: { key: string; set: boolean; secret?: boolean; help: string }[];
};
