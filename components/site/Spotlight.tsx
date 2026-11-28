"use client";

import { useEffect, useRef } from "react";

/**
 * components/site/Spotlight.tsx
 *
 * Zacht licht dat over de hele site met de muis meebeweegt (zoals mojo.nl):
 * blauw in licht thema, beige in donker thema, via `--spot-rgb` en
 * `--spot-alpha` in globals.css.
 *
 * - Eén vaste laag van 1200px die alleen via `transform` verschuift: geen
 *   herberekening van de opmaak, dus geen invloed op scrollen.
 * - Op touchschermen drijft het licht langzaam rond in plaats van te volgen.
 * - Met "beweging verminderen" blijft het licht stil staan.
 */

const SIZE = 1200;

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const moveTo = (x: number, y: number) => {
      el.style.transform = `translate3d(${Math.round(x - SIZE / 2)}px, ${Math.round(y - SIZE / 2)}px, 0)`;
    };

    moveTo(window.innerWidth * 0.72, window.innerHeight * 0.18);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (window.matchMedia("(pointer: fine)").matches) {
      let raf = 0;
      let x = 0;
      let y = 0;
      const onMove = (e: PointerEvent) => {
        x = e.clientX;
        y = e.clientY;
        if (!raf)
          raf = requestAnimationFrame(() => {
            raf = 0;
            moveTo(x, y);
          });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(raf);
      };
    }

    // Touch: om de paar seconden een nieuw punt, met een lange overgang.
    el.style.transitionDuration = "4s";
    let step = 0;
    const drift = () => {
      step += 1;
      moveTo(
        window.innerWidth * (0.5 + 0.34 * Math.sin(step * 0.9)),
        window.innerHeight * (0.36 + 0.24 * Math.cos(step * 0.7)),
      );
    };
    const id = window.setInterval(drift, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[40] overflow-hidden print:hidden">
      <div
        ref={ref}
        className="absolute left-0 top-0 rounded-full transition-transform duration-[350ms] ease-out will-change-transform"
        style={{
          width: SIZE,
          height: SIZE,
          background: "radial-gradient(closest-side, rgb(var(--spot-rgb) / var(--spot-alpha)), transparent)",
        }}
      />
    </div>
  );
}
