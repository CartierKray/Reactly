"use client";

/**
 * components/TiltShineCard/TiltImageCard.tsx
 *
 * Een foto die in 3D meekantelt met de muis of vinger, met een glanslaag die
 * het licht volgt en de actuele rotateX/rotateY-waarden eronder. Eerder met
 * framer-motion; nu met één requestAnimationFrame-lus en CSS-transforms: geen
 * extra bibliotheek, geen React-render per frame.
 */

import * as React from "react";
import Image from "next/image";

const RANGE = 26;

export function TiltImageCard({ image }: { image: string }) {
  const card = React.useRef<HTMLDivElement>(null);
  const glare = React.useRef<HTMLDivElement>(null);
  const readout = React.useRef<HTMLSpanElement>(null);
  const target = React.useRef({ x: 0, y: 0, gx: 50, gy: 50 });
  const current = React.useRef({ x: 0, y: 0, gx: 50, gy: 50 });
  const frame = React.useRef<number | null>(null);

  const loop = React.useCallback(() => {
    const c = current.current;
    const t = target.current;
    c.x += (t.x - c.x) * 0.12;
    c.y += (t.y - c.y) * 0.12;
    c.gx += (t.gx - c.gx) * 0.12;
    c.gy += (t.gy - c.gy) * 0.12;
    if (card.current) card.current.style.transform = `rotateX(${c.x.toFixed(2)}deg) rotateY(${c.y.toFixed(2)}deg)`;
    if (glare.current) glare.current.style.background = `radial-gradient(circle at ${c.gx}% ${c.gy}%, rgba(255,255,255,0.32), transparent 55%)`;
    if (readout.current) readout.current.textContent = `rotateX(${Math.round(c.x)}°) rotateY(${Math.round(c.y)}°)`;
    const rust = Math.abs(t.x - c.x) + Math.abs(t.y - c.y) + Math.abs(t.gx - c.gx) + Math.abs(t.gy - c.gy) < 0.05;
    frame.current = rust ? null : requestAnimationFrame(loop);
  }, []);

  const start = () => {
    if (frame.current === null) frame.current = requestAnimationFrame(loop);
  };

  React.useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    target.current = { x: (py - 0.5) * -RANGE, y: (px - 0.5) * RANGE, gx: px * 100, gy: py * 100 };
    start();
  };
  const onLeave = () => {
    target.current = { x: 0, y: 0, gx: 50, gy: 50 };
    start();
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="aspect-square w-[260px] sm:w-[300px]" style={{ perspective: "1100px" }} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div ref={card} className="group relative h-full w-full rounded-2xl [transform-style:preserve-3d] will-change-transform">
          <div aria-hidden className="absolute inset-0 -z-10 grid place-items-center">
            <div className="h-48 w-48 scale-150 rounded-full bg-white/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <Image src={image} alt="Portret dat in 3D meekantelt" width={600} height={600} sizes="300px" className="relative h-full w-full rounded-2xl object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]" />
          <div ref={glare} aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100" />
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15" style={{ transform: "translateZ(30px)" }} />
        </div>
      </div>
      <span ref={readout} className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[10.5px] tabular-nums text-white/70">
        rotateX(0°) rotateY(0°)
      </span>
    </div>
  );
}
