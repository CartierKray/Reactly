"use client";

/**
 * components/site/Reveal.tsx
 *
 * Laat een blok (of de kinderen ervan, na elkaar) invagen zodra het in beeld
 * komt: één keer, iets vóór het blok helemaal zichtbaar is. De animatie zelf
 * is CSS (`.reveal` en `.reveal-group` in globals.css); dit component zet
 * alleen `data-inview` op het element, rechtstreeks op de DOM-node. Er is dus
 * geen extra render en de kinderen blijven gewoon op de server gerenderd.
 *
 *   <Reveal>…</Reveal>                                 het blok zelf
 *   <Reveal group>
 *     <div className="reveal-item" style={{ "--i": 0 }}>…</div>
 *   </Reveal>                                          de kinderen na elkaar
 */

import * as React from "react";

import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "ul" | "ol" | "aside" | "article" | "footer" | "dl";
  group?: boolean;
  /** Hoe ver vóór de onderrand het al mag starten (px). */
  margin?: number;
};

export default function Reveal({ as = "div", group = false, margin = 80, className, children, ...rest }: Props) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.setAttribute("data-inview", "");
    if (!("IntersectionObserver" in window)) return show();

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: `0px 0px -${margin}px 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={cn(group ? "reveal-group" : "reveal", className)} {...rest}>
      {children}
    </Tag>
  );
}
