import Overview from "@/components/dashboard/Overview";
import { getOverview } from "@/lib/dashboard/data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Overzicht" };

export default async function DashboardPage() {
  return <Overview initial={await getOverview(30)} />;
}
