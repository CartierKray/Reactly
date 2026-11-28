"use client";

/**
 * components/site/home/LazyShowcase.tsx
 *
 * Laadt het techniekraster pas als het blok bijna in beeld is (600px van
 * tevoren). De JavaScript ervan (filters, sliders, 3D) hoort niet bij de
 * eerste laadbeurt van de homepage. Tot dan een vlak van ongeveer dezelfde
 * hoogte, zodat de pagina niet verspringt.
 */

import * as React from "react";
import dynamic from "next/dynamic";

const CodeShowcase = dynamic(() => import("@/components/CodeShowCase/CodeShowCase"), { ssr: false });

export default function LazyShowcase() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setShow(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[600px]">
      {show ? (
        <CodeShowcase />
      ) : (
        <div className="mx-auto h-[1100px] max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="h-full rounded-3xl bg-surface-sunken" />
        </div>
      )}
    </div>
  );
}
