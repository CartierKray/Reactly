"use client";

/**
 * components/site/SiteOnly.tsx
 *
 * Toont de onderdelen van de publieke website (navigatie, footer, chat,
 * cookievenster, metingen) overal behalve in het interne dashboard. Zo lekt er
 * op /dashboard ook geen pixel of tag mee met interne gegevens.
 */

import { usePathname } from "next/navigation";

export default function SiteOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) return null;
  return <>{children}</>;
}
