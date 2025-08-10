"use client";

import React, { useEffect } from "react";

const ComponentHeaderPrijzen: React.FC = () => {
  useEffect(() => {
    const wrapText = (id: string, t: number, r?: HTMLElement | null) => {
      const el = (r ||
        document.querySelector(`[data-br="${id}"]`)) as HTMLElement;
      const parent = el?.parentElement;
      if (!el || !parent) return;

      const setWidth = (w: number) => (el.style.maxWidth = `${w}px`);
      el.style.maxWidth = "";
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      let low = w / 2 - 0.25;
      let high = w + 0.5;
      let mid;
      if (w) {
        setWidth(low);
        low = Math.max(el.scrollWidth, low);
        while (low + 1 < high) {
          mid = Math.round((low + high) / 2);
          setWidth(mid);
          if (parent.clientHeight === h) {
            high = mid;
          } else {
            low = mid;
          }
        }
        setWidth(high * t + w * (1 - t));
      }

      type WrapElement = HTMLElement & {
        __wrap_o?: ResizeObserver;
      };
      const elWrap = el as WrapElement;

      if (!elWrap.__wrap_o && typeof ResizeObserver !== "undefined") {
        elWrap.__wrap_o = new ResizeObserver(() =>
          wrapText(id, +el.dataset.brr!, el)
        );
        elWrap.__wrap_o.observe(parent);
      }
    };

    const supportsTextWrap = CSS?.supports?.("text-wrap", "balance");
    if (!supportsTextWrap) {
      wrapText("«R29tqnbb»", 1);
      wrapText("«R39tqnbb»", 1);
    }
  }, []);

  return (
    <div className="relative overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20 md:pt-10">
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white,transparent)] z-0">
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(2.5rem,1fr))] justify-center items-center w-full h-full bg-gray-200 dark:bg-neutral-700 gap-px"
          style={{ transform: "scale(1.01)" }}
        >
          {Array.from({ length: 400 }).map((_, i) => (
            <div
              key={i}
              className={`w-10 h-10 flex rounded-[1px] bg-gray-100 dark:bg-neutral-800 ${
                i % 2 === 1
                  ? "shadow-[0_0_0_3px_rgba(255,255,255,1)_inset] dark:shadow-[0_0_0_3px_rgba(0,0,0,0.2)_inset]"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.6),_transparent)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.6),_transparent)]" />
      </div>

      {/* Text Content */}
      <h2 className="mx-auto max-w-5xl text-center tracking-tight font-medium bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 bg-clip-text text-transparent dark:from-neutral-800 dark:via-white dark:to-white text-3xl md:text-4xl  md:leading-tight pt-4 relative z-20">
        <span
          data-br="«R29tqnbb»"
          data-brr="1"
          style={{
            display: "inline-block",
            verticalAlign: "top",
            textDecoration: "inherit",
            textWrap: "balance",
          }}
        >
          Prijzen
        </span>
      </h2>

      <h2 className="my-4 text-sm pt-1 text-center font-normal text-neutral-600 dark:text-neutral-200 max-w-3xl mx-auto relative z-20">
        <span
          data-br="«R39tqnbb»"
          data-brr="1"
          style={{
            display: "inline-block",
            verticalAlign: "top",
            textDecoration: "inherit",
            textWrap: "balance",
          }}
        >
          Blader door onze steeds groter wordende collectie diensten die jouw
          website laten opvallen.
        </span>
      </h2>
    </div>
  );
};

export default ComponentHeaderPrijzen;
