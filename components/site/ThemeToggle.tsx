"use client";

/**
 * components/site/ThemeToggle.tsx
 *
 * Wisselt tussen licht en donker. Waar de browser het kan, groeit het nieuwe
 * thema als een cirkel vanuit de knop over de pagina (View Transitions API);
 * anders, of bij `prefers-reduced-motion`, wisselt het direct.
 *
 * Het icoon toont wat je krijgt als je klikt, niet de huidige stand.
 */

import * as React from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Vóór hydratatie is het thema onbekend; een vlak van dezelfde maat
  // voorkomt dat de navigatie verspringt.
  if (!mounted) return <span aria-hidden className={cn("inline-block h-10 w-10", className)} />;

  const dark = resolvedTheme === "dark";
  const next = dark ? "light" : "dark";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const doc = document as ViewTransitionDoc;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    const transition = doc.startViewTransition(() => {
      // Direct op de DOM, zodat de nieuwe stand meteen in de "na"-opname staat;
      // next-themes bewaart de keuze en zet dezelfde klasse daarna nogmaals.
      root.classList.toggle("dark", next === "dark");
      root.classList.toggle("light", next === "light");
      root.style.colorScheme = next;
      setTheme(next);
    });
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Schakel naar lichte weergave" : "Schakel naar donkere weergave"}
      title={dark ? "Lichte weergave" : "Donkere weergave"}
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-full transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-500 ease-premium",
          dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
        )}
      />
      <Moon
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-500 ease-premium",
          dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
    </button>
  );
}

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const Sun = ({ className }: { className?: string }) => (
  <svg {...icon} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const Moon = ({ className }: { className?: string }) => (
  <svg {...icon} className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);
