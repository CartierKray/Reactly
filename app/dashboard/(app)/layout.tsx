import Shell from "@/components/dashboard/Shell";
import { dashboardZonderWachtwoord } from "@/lib/dashboard/auth";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Shell zonderWachtwoord={dashboardZonderWachtwoord()}>{children}</Shell>;
}
