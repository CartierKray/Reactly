"use client";

/**
 * components/site/offerte/OfferteProvider.tsx
 *
 * Maakt van elke link naar /offerte een knop die de aanvraag als venster opent,
 * zonder elke knop apart te hoeven aanpassen:
 *
 *  - klikken op <a href="/offerte?dienst=…&pakket=…"> worden (in de
 *    capture-fase, vóór next/link) opgevangen en openen het venster met die
 *    keuzes alvast ingevuld;
 *  - met Cmd/Ctrl/Shift, middelklik of `data-no-popup` blijft het een gewone
 *    link (nieuw tabblad werkt dus), net als zonder JavaScript;
 *  - op /offerte zelf staat de aanvraag al op de pagina: daar navigeert de link
 *    gewoon;
 *  - de code van het venster laadt pas bij de eerste klik, of al bij hover over
 *    een offerteknop zodat het venster direct opent.
 *
 * `useOfferte().open({ services, pakket, bron })` opent het venster vanuit code
 * (bijvoorbeeld de pakketsamensteller op de prijzenpagina).
 */

import * as React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { track } from "@/lib/analytics";
import { offerteHref, type OffertePreset } from "@/lib/offerte";

export { offerteHref };

const laadVenster = () => import("./OfferteDialog");
const OfferteDialog = dynamic(laadVenster, { ssr: false });

type Ctx = { open: (preset?: OffertePreset) => void };
const OfferteContext = React.createContext<Ctx | null>(null);

export function useOfferte(): Ctx {
  return (
    React.useContext(OfferteContext) ?? {
      open: (p) => {
        window.location.href = offerteHref(p);
      },
    }
  );
}

export default function OfferteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = React.useState<{ open: boolean; mounted: boolean; key: number; preset?: OffertePreset }>({
    open: false,
    mounted: false,
    key: 0,
  });

  const open = React.useCallback((preset?: OffertePreset) => {
    setState((s) => ({ open: true, mounted: true, key: s.key + 1, preset }));
    track("offerte_start", { bron: preset?.bron, pakket: preset?.pakket, page: window.location.pathname });
  }, []);

  // Andere pagina: venster dicht.
  React.useEffect(() => {
    setState((s) => (s.open ? { ...s, open: false } : s));
  }, [pathname]);

  // Klikken op offertelinks opvangen; bij hover de code alvast laden.
  React.useEffect(() => {
    const offerteLink = (t: EventTarget | null) => {
      const a = (t as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return null;
      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return null;
      }
      if (url.origin !== window.location.origin || url.pathname !== "/offerte") return null;
      return { a, url };
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const hit = offerteLink(e.target);
      if (!hit) return;
      const { a, url } = hit;
      if (a.target === "_blank" || a.hasAttribute("download") || a.dataset.noPopup !== undefined) return;
      if (window.location.pathname === "/offerte") return;
      e.preventDefault();
      const dienst = url.searchParams.get("dienst");
      open({
        services: dienst ? dienst.split(",").filter(Boolean) : undefined,
        pakket: url.searchParams.get("pakket") ?? undefined,
        bron: a.dataset.bron ?? (a.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60),
      });
    };

    let geladen = false;
    const warmOp = (e: Event) => {
      if (geladen || !offerteLink(e.target)) return;
      geladen = true;
      void laadVenster();
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("pointerover", warmOp, { passive: true });
    document.addEventListener("focusin", warmOp);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", warmOp);
      document.removeEventListener("focusin", warmOp);
    };
  }, [open]);

  const ctx = React.useMemo(() => ({ open }), [open]);

  return (
    <OfferteContext.Provider value={ctx}>
      {children}
      {state.mounted && (
        <OfferteDialog
          open={state.open}
          onOpenChange={(v) => setState((s) => ({ ...s, open: v }))}
          preset={state.preset}
          presetKey={state.key}
        />
      )}
    </OfferteContext.Provider>
  );
}
