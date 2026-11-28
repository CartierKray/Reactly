"use client";

/**
 * components/site/Tilt.tsx
 *
 * Kaart die met de muis licht meekantelt en een lichtvlek op de cursor zet
 * (`--mx`/`--my`, bruikbaar in de kaart zelf). Alleen met een muis: op
 * touch en met "beweging verminderen" staat de kaart gewoon stil.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

export default function Tilt({
  className,
  style,
  children,
  max = 5,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  /** Maximale kanteling in graden. */
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef(0);

  const set = (rx: number, ry: number, mx?: number, my?: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    if (mx !== undefined && my !== undefined) {
      el.style.setProperty("--mx", `${(mx * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(my * 100).toFixed(1)}%`);
    }
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => set((0.5 - py) * max, (px - 0.5) * max, px, py));
  };

  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    set(0, 0);
  };

  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn("[perspective:1400px]", className)} style={style}>
      <div className="h-full transition-transform duration-500 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] motion-reduce:[transform:none]">
        {children}
      </div>
    </div>
  );
}
