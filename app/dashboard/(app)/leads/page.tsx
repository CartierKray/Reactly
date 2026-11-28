import Leads from "@/components/dashboard/Leads";
import { getWebsiteLeads } from "@/lib/dashboard/data";
import { resendConfigured } from "@/lib/resend-api";

export const dynamic = "force-dynamic";
export const metadata = { title: "Leads" };

export default async function LeadsPage() {
  const r = await getWebsiteLeads();
  return <Leads initial={r.leads} demo={r.demo} gekoppeld={resendConfigured()} />;
}
