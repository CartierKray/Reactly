import Campaigns from "@/components/dashboard/Campaigns";
import { getOverview } from "@/lib/dashboard/data";
import { metaConfigured } from "@/lib/dashboard/meta";

export const dynamic = "force-dynamic";
export const metadata = { title: "Campagnes" };

export default async function CampagnesPage() {
  const data = await getOverview(30);
  return <Campaigns initial={data.campaigns} metaGekoppeld={metaConfigured()} />;
}
