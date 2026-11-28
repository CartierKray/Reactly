"use client";

/**
 * components/site/RouteProgress.tsx
 *
 * Dunne, gloeiende laadbalk bovenaan bij elke paginawissel. Start bij een
 * klik op een interne link (capture, vóór next/link navigeert) en rondt af
 * zodra het pad verandert. Geen extra pakket, geen invloed op de laadtijd.
 */

import * as React from "react";
import { usePathname } from "next/navigation";

type Stage = "idle" | "loading" | "done";

export default function RouteProgress() {
  const pathname = usePathname();
  const [stage, setStage] = React.useState<Stage>("idle");
  const [run, setRun] = React.useState(0);
  const first = React.useRef(true);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const raw = a.getAttribute("href");
      if (!raw || raw.startsWith("#") || /^(mailto:|tel:|javascript:)/.test(raw)) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      setRun((n) => n + 1);
      setStage("idle");
      requestAnimationFrame(() => requestAnimationFrame(() => setStage("loading")));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setStage("done");
    const t = window.setTimeout(() => setStage("idle"), 700);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[2px]">
      <div
        key={run}
        className="h-full origin-left bg-[linear-gradient(90deg,var(--btn-from),var(--btn-via),var(--btn-to))] shadow-[0_0_12px_rgb(var(--glow-rgb)/0.9),0_0_4px_rgb(var(--glow-rgb)/0.9)]"
        style={{
          transform: `scaleX(${stage === "idle" ? 0 : stage === "loading" ? 0.82 : 1})`,
          // "done": eerst vol, daarna (na 0,3 s) uitfaden.
          opacity: stage === "loading" ? 1 : 0,
          transition:
            stage === "loading"
              ? "transform 6s cubic-bezier(0.08, 0.7, 0.2, 1), opacity 0.2s"
              : stage === "done"
                ? "transform 0.3s ease-out, opacity 0.35s ease 0.3s"
                : "none",
        }}
      />
    </div>
  );
}
