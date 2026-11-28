import type { Metadata } from "next";

/**
 * app/dashboard/layout.tsx
 *
 * Het interne dashboard (alleen voor het team, achter een wachtwoord via
 * middleware.ts). Nooit in zoekmachines: noindex hier én als header.
 */
export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Dashboard | Reactly" },
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardRoot({ children }: { children: React.ReactNode }) {
  return children;
}
