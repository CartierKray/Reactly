"use client";

/**
 * components/CodeShowCase/CodeShowCase.tsx  (FeatureShowcaseGrid)
 *
 * Het techniekraster op de homepage: zes interactieve kaarten (filters, dark
 * mode, CSS-grid, 3D, animaties, verlopen), met dezelfde opzet en beelden als
 * voorheen, nu premium afgewerkt:
 *
 *  - een lichtrand en zachte lichtvlek die de muis volgen (CSS-variabelen,
 *    dus geen React-render per beweging);
 *  - per kaart het bijbehorende codelabel;
 *  - filters zelf kiezen (de carrousel pauzeert onder je muis);
 *  - de licht/donker-schuif volgt je muis, werkt met vinger en pijltjestoetsen
 *    en zwaait één keer uit zichzelf als hij in beeld komt;
 *  - rasterlijnen en klassen zichtbaar bij hover in het CSS-grid;
 *  - 3D met glans en live waarden, animaties met een gloeiend spoor, verlopen
 *    die vullen zodra ze in beeld komen;
 *  - alles staat stil buiten beeld: geen timers of animaties voor niets.
 */

import * as React from "react";
import Image from "next/image";

import { TiltImageCard } from "../TiltShineCard/TiltImageCard";
import { cn } from "@/lib/utils";

/* ── Hulpmiddelen ──────────────────────────────────────────────────────── */

function useInView<T extends Element>(rootMargin = "120px") {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

function ShowcaseCard({
  icon,
  title,
  code,
  text,
  className,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  code: string;
  text: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group/card relative isolate rounded-[1.75rem] p-px transition-transform duration-500 ease-premium hover:-translate-y-1",
        "bg-[radial-gradient(520px_circle_at_var(--mx,50%)_var(--my,0%),rgb(255_255_255/0.28),rgb(255_255_255/0.07)_42%,rgb(255_255_255/0.06))]",
        "shadow-[0_30px_70px_-34px_rgba(0,0,0,0.75)]",
        className,
      )}
    >
      <div className="deep relative h-full overflow-hidden rounded-[calc(1.75rem-1px)] bg-page p-4 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: "radial-gradient(460px circle at var(--mx, 50%) var(--my, 0%), rgba(255,255,255,0.07), transparent 62%)" }}
        />
        <header className="relative z-10 mb-7 flex items-start gap-4 px-1 pt-5 md:pt-6">
          <div className="shrink-0 pt-0.5 opacity-90 transition-transform duration-500 ease-premium group-hover/card:-translate-y-0.5 group-hover/card:scale-[1.04]">{icon}</div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[1.15rem] font-medium tracking-[-0.01em]">{title}</h3>
              <code className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/70">{code}</code>
            </div>
            <p className="mt-1.5 max-w-sm text-[12.5px] leading-relaxed text-white/60">{text}</p>
          </div>
        </header>
        <div className="relative">{children}</div>
      </div>
    </article>
  );
}

/** Het "podium" van een demo: donker, met stippen en een zachte vignet. */
function Stage({ className, children, style }: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-[#06070a]/70 bg-dot-pattern", className)} style={style}>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_55%,rgba(0,0,0,0.55))]" />
      {children}
    </div>
  );
}

/* ── 1. Filters ────────────────────────────────────────────────────────── */

const FILTERS = [
  { name: "blur-sm", className: "backdrop-blur-sm" },
  { name: "brightness-150", className: "backdrop-brightness-150" },
  { name: "grayscale", className: "backdrop-grayscale" },
  { name: "contrast-150", className: "backdrop-contrast-150" },
  { name: "saturate-200", className: "backdrop-saturate-200" },
  { name: "sepia", className: "backdrop-sepia" },
];
const PANE = 328; // 288px breed + 2 × 20px marge

function FiltersDemo() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (!inView || paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % FILTERS.length), 2200);
    return () => window.clearInterval(id);
  }, [inView, paused]);

  return (
    <div ref={ref} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <Stage className="h-[400px]">
        <div className="absolute inset-0 grid place-items-center">
          <Image src="/images/chinese.png" alt="Portret onder een filter" width={256} height={256} sizes="256px" className="rounded-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]" />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
          <div className="flex transition-transform duration-[900ms] ease-premium" style={{ transform: `translateX(calc(50% - ${(active + 0.5) * PANE}px))` }}>
            {FILTERS.map((f, i) => (
              <div key={f.name} className="m-5 -mt-1 flex w-72 flex-col items-center">
                <span className={cn("mb-2 rounded-full px-2 py-0.5 font-mono text-[10.5px] transition-colors duration-500", i === active ? "bg-white text-[#0a0b10]" : "text-white/45")}>{f.name}</span>
                <div className={cn("h-72 w-72 rounded-xl border bg-white/[0.08] shadow-inner transition-[border-color,box-shadow] duration-500", i === active ? "border-white/35 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_20px_60px_-20px_rgba(255,255,255,0.25)]" : "border-white/10")}>
                  <div className={`h-full w-full rounded-xl ${f.className} bg-white/[0.06]`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Stage>
      <div role="tablist" aria-label="Kies een filter" className="mt-3 flex flex-wrap gap-1.5">
        {FILTERS.map((f, i) => (
          <button
            key={f.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[10.5px] transition-all duration-300",
              i === active ? "border-white/50 bg-white text-[#0a0b10]" : "border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white",
            )}
          >
            {f.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── 2. Dark mode ──────────────────────────────────────────────────────── */

function DarkModeDemo() {
  const [wrapRef, inView] = useInView<HTMLDivElement>("0px");
  const box = React.useRef<HTMLDivElement>(null);
  const [pct, setPct] = React.useState(50);
  const dragging = React.useRef(false);
  const touched = React.useRef(false);
  const swept = React.useRef(false);

  const fromX = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    touched.current = true;
    setPct(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  // Eén keer uit zichzelf heen en weer zwaaien als de kaart in beeld komt.
  React.useEffect(() => {
    if (!inView || swept.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    swept.current = true;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      if (touched.current) return;
      const p = Math.min(1, (t - t0) / 2200);
      setPct(50 + Math.sin(p * Math.PI * 2) * 26 * (1 - p * 0.4));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setPct(50);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={wrapRef}>
      <Stage className="flex items-center justify-center p-3">
        <div
          ref={box}
          role="slider"
          tabIndex={0}
          aria-label="Vergelijk licht en donker"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          aria-valuetext={`${Math.round(pct)}% licht`}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              e.preventDefault();
              touched.current = true;
              setPct((p) => Math.max(0, Math.min(100, p + (e.key === "ArrowRight" ? 5 : -5))));
            }
          }}
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            fromX(e.clientX);
          }}
          onPointerMove={(e) => (dragging.current || e.pointerType === "mouse") && fromX(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
          className="relative mx-auto aspect-[375/448] w-full max-w-[340px] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-xl border border-white/10 bg-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <Image src="/images/darkmodeimg.png" alt="Dezelfde app in donker thema" fill sizes="340px" className="pointer-events-none object-cover" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
            <Image src="/images/lightmodeimg.png" alt="De app in licht thema" fill sizes="340px" className="pointer-events-none object-cover" />
          </div>
          <span className={cn("absolute left-3 top-3 z-10 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0a0b10] backdrop-blur transition-opacity", pct < 18 && "opacity-0")}>Licht</span>
          <span className={cn("absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur transition-opacity", pct > 82 && "opacity-0")}>Donker</span>
          <div aria-hidden className="absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_18px_rgba(255,255,255,0.7)]" style={{ left: `${pct}%` }} />
          <div aria-hidden className="absolute top-1/2 z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-white/20 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md" style={{ left: `${pct}%` }}>
            <svg width="16" height="9" viewBox="0 0 15 8" fill="none">
              <path d="M1 4L4 1M1 4L4 7M1 4H14M14 4L11 1M14 4L11 7" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Stage>
    </div>
  );
}

/* ── 3. CSS-grid ───────────────────────────────────────────────────────── */

const TILES = [
  { src: "/images/grid-1.png", label: "Treehouses", cls: "row-span-2", code: "row-span-2", w: 600, h: 800 },
  { src: "/images/grid-2.png", label: "Mansions", cls: "", code: "col-span-1", w: 600, h: 400 },
  { src: "/images/grid-3.png", label: "Lakefront cottages", cls: "", code: "col-span-1", w: 600, h: 400 },
  { src: "/images/grid-4.png", label: "Designer homes", cls: "col-span-2", code: "col-span-2", w: 1200, h: 400 },
];

function GridDemo() {
  return (
    <Stage className="p-2">
      <div className="group/grid relative grid h-[400px] grid-cols-2 gap-2 overflow-hidden rounded-xl sm:grid-cols-3">
        {TILES.map((t) => (
          <div
            key={t.label}
            className={cn(
              "group/tile relative overflow-hidden rounded-xl transition-[filter] duration-500 group-hover/grid:blur-[2px] group-hover/grid:brightness-[.55] hover:!blur-none hover:!brightness-100",
              t.cls,
            )}
          >
            <Image src={t.src} alt={t.label} width={t.w} height={t.h} sizes="(min-width: 768px) 400px, 50vw" className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover/tile:scale-[1.06]" />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl border border-dashed border-white/0 transition-colors duration-500 group-hover/grid:border-white/35" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-3.5 pt-10">
              <span className="text-[12.5px] font-medium text-white">{t.label}</span>
              <code className="translate-y-1 rounded bg-white/90 px-1.5 py-0.5 font-mono text-[9.5px] text-[#0a0b10] opacity-0 transition-all duration-300 group-hover/tile:translate-y-0 group-hover/tile:opacity-100">{t.code}</code>
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

/* ── 5. Transities & animaties ─────────────────────────────────────────── */

const EASINGS = [
  { label: "linear", path: "M0 32 L32 0", from: "#e5e7eb", to: "#ffffff" },
  { label: "ease-out", path: "M0 32 C8 0, 24 0, 32 0", from: "#7dd3fc", to: "#38bdf8" },
  { label: "ease-in-out", path: "M0 32 C8 0, 24 32, 32 0", from: "#c4b5fd", to: "#a78bfa" },
  { label: "ease-in", path: "M0 32 C8 32, 24 0, 32 0", from: "#f9a8d4", to: "#f472b6" },
];

function EasingDemo() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const play = inView ? "running" : "paused";
  return (
    <div ref={ref}>
      <Stage className="flex h-[400px] flex-col justify-between p-6">
        {EASINGS.map(({ label, path, from, to }) => (
          <div key={label} className="relative z-30 flex items-center gap-4">
            <div className="flex w-40 shrink-0 items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                <svg viewBox="-2 -2 36 36" width="26" height="26" fill="none" aria-hidden>
                  <path d={path} stroke={to} strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-mono text-[11px] text-white/80">{label}</span>
            </div>
            <div className="relative h-8 w-full">
              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/10" />
              <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/25" />
              <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/25" />
              {/* Spoor */}
              <div
                className="absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-md opacity-30 blur-[6px]"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})`, animation: `rd-move 2.6s ${label} -0.12s infinite alternate`, animationPlayState: play }}
              />
              <div
                className="absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-md"
                style={{
                  background: `linear-gradient(135deg, ${from}, ${to})`,
                  boxShadow: `0 0 24px -2px ${to}, inset 0 1px 0 rgba(255,255,255,0.6)`,
                  animation: `rd-move 2.6s ${label} infinite alternate`,
                  animationPlayState: play,
                }}
              />
            </div>
          </div>
        ))}
      </Stage>
      <style>{`@keyframes rd-move { from { left: 0%; transform: translate(0, -50%); } to { left: 100%; transform: translate(-100%, -50%); } }`}</style>
    </div>
  );
}

/* ── 6. Verlopen ───────────────────────────────────────────────────────── */

const BARS = [
  { label: "Render time performance", value: 6.4, cls: "from-emerald-400 via-cyan-400 to-sky-400" },
  { label: "Real-time frame rate", value: 4.2, cls: "from-pink-500 via-orange-300 to-yellow-300" },
  { label: "Multi-platform build time", value: 2.7, cls: "from-purple-500 via-indigo-400 to-cyan-400" },
  { label: "Shader compile duration", value: 3.8, cls: "from-fuchsia-500 via-rose-400 to-orange-300" },
  { label: "Animation smoothness", value: 5.1, cls: "from-lime-400 via-green-400 to-emerald-500" },
  { label: "Startup time", value: 1.9, cls: "from-sky-300 via-blue-500 to-indigo-500" },
];

function GradientDemo() {
  const [ref, inView] = useInView<HTMLDivElement>("-60px");
  const [gevuld, setGevuld] = React.useState(false);
  React.useEffect(() => {
    if (inView) setGevuld(true);
  }, [inView]);
  return (
    <div ref={ref}>
      <Stage className="h-[400px] p-6">
        <div className="relative z-30 space-y-[18px] text-[12.5px] font-medium">
          {BARS.map((b, i) => (
            <div key={b.label}>
              <div className="flex items-center justify-between">
                <span className="text-white/85">{b.label}</span>
                <span className="font-mono text-[11px] text-white/60 tabular-nums">{b.value.toFixed(1)}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={cn("relative h-full overflow-hidden rounded-full bg-gradient-to-r transition-[width] duration-[1400ms] ease-premium", b.cls)}
                  style={{ width: gevuld ? `${Math.min(100, b.value * 13.5)}%` : "0%", transitionDelay: `${i * 110}ms` }}
                >
                  <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 animate-[rd-shine_2.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/45 to-transparent" style={{ animationPlayState: inView ? "running" : "paused", animationDelay: `${i * 0.35}s` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Stage>
      <style>{`@keyframes rd-shine { 0% { transform: translateX(0); } 60%, 100% { transform: translateX(420%); } }`}</style>
    </div>
  );
}

/* ── Het raster ─────────────────────────────────────────────────────────── */

export default function FeatureShowcaseGrid() {
  return (
    <div className="px-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1264px] grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        <ShowcaseCard
          icon={(
            <svg
                        className="h-[54px] w-auto text-white [--site-background:hsl(var(--page))]" aria-hidden="true"
                        width="112"
                        height="72"
                        viewBox="0 0 112 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="112"
                          height="72"
                          fill="var(--site-background)"
                        ></rect>
                        <path
                          d="M66.4883 54.4995L107.192 30.9995V27.9995M66.4883 54.4995L25.7852 30.9995V27.9995M66.4883 54.4995V51.4995M25.7852 27.9995L66.4883 4.49951L107.192 27.9995M25.7852 27.9995L66.4883 51.4995M107.192 27.9995L66.4883 51.4995"
                          stroke="currentColor"
                        ></path>
                        <path
                          d="M4.99414 34.9995L45.6973 11.4995L50.0289 14.0003L47.432 15.4996L45.7004 14.4999L10.1934 34.9999L41.3703 52.9999L52.6288 46.4998M4.99414 34.9995L45.6973 58.4995M4.99414 34.9995L4.9953 36.9995L45.6985 60.4995M45.6973 58.4995L45.6985 60.4995M45.6973 58.4995L59.5551 50.4987M45.6985 60.4995L61.2878 51.499M30.9766 46.9998V35.8282C30.9766 35.3036 31.224 34.8124 31.655 34.3913"
                          stroke="currentColor"
                        ></path>
                        <g filter="url(#filter0_f_457_1608)">
                          <path
                            d="M25.7852 30.9998L50.0308 17.0015M66.4883 7.49976L107.192 30.9998M66.4883 7.49976V4.49976M66.4883 7.49976L52.6277 15.5022M86.3961 34.9984L86.3972 36.9984L63.8831 49.9969M86.3961 34.9984L62.1504 48.9966M86.3961 34.9984L52.6277 15.5022M56.9542 32.9987H35.8724C35.4346 32.9987 35.0102 33.0319 34.6064 33.0941M53.4893 32.9988V27.413C53.4893 26.6319 54.586 25.9988 55.9388 25.9988H65.6137M55.2241 44.9977L76.8728 32.4988L50.0308 17.0015M50.0308 17.0015L52.6277 15.5022M43.5322 24.2488C45.2062 25.2153 45.2062 26.7823 43.5322 27.7488C41.8581 28.7153 39.144 28.7153 37.47 27.7488C35.796 26.7823 35.796 25.2153 37.47 24.2488C39.144 23.2823 41.8581 23.2823 43.5322 24.2488Z"
                            stroke="currentColor"
                            strokeOpacity="0.3"
                          ></path>
                        </g>
                        <defs>
                          <filter
                            id="filter0_f_457_1608"
                            x="23.5352"
                            y="2.49976"
                            width="85.9062"
                            height="49.9302"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            ></feFlood>
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="BackgroundImageFix"
                              result="shape"
                            ></feBlend>
                            <feGaussianBlur
                              stdDeviation="1"
                              result="effect1_foregroundBlur_457_1608"
                            ></feGaussianBlur>
                          </filter>
                        </defs>
                      </svg>
          )}
          title="Filters"
          code="backdrop-filter"
          text="Wat is een website tegenwoordig zonder een paar backdrop-blurs? Wij stapelen filters tot het precies goed voelt, niet meer en niet minder."
        >
          <FiltersDemo />
        </ShowcaseCard>

        <ShowcaseCard
          icon={(
            <svg
                        className="h-[54px] w-auto text-white [--site-background:hsl(var(--page))]" aria-hidden="true"
                        width="112"
                        height="72"
                        viewBox="0 0 112 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M71.7615 59.503L94.2781 46.503C97.7457 44.501 99.4795 41.8771 99.4796 39.2531L99.4796 36.2531C99.4796 33.6291 97.7458 31.0051 94.2782 29.003C87.3429 24.999 76.0987 24.999 69.1634 29.003L46.6468 42.003C43.1791 44.0051 41.4453 46.6291 41.4453 49.2531V52.2531C41.4453 54.8771 43.1791 57.501 46.6467 59.503C53.582 63.5071 64.8262 63.5071 71.7615 59.503Z"
                          fill="var(--site-background)"
                        ></path>
                        <path
                          d="M99.4796 36.2531C99.4796 33.6291 97.7458 31.0051 94.2782 29.003C87.3429 24.999 76.0987 24.999 69.1634 29.003L46.6468 42.003C43.1791 44.0051 41.4453 46.6291 41.4453 49.2531M99.4796 36.2531C99.4796 38.8771 97.7458 41.501 94.2782 43.503L71.7615 56.503C64.8263 60.5071 53.582 60.5071 46.6468 56.503C43.1792 54.501 41.4453 51.8771 41.4453 49.2531M99.4796 36.2531L99.4796 39.2531C99.4795 41.8771 97.7457 44.501 94.2781 46.503L71.7615 59.503C64.8262 63.5071 53.582 63.5071 46.6467 59.503C43.1791 57.501 41.4453 54.8771 41.4453 52.2531V49.2531"
                          stroke="currentColor"
                        ></path>
                        <path
                          d="M71.7601 41.0028C77.2604 44.1784 86.1783 44.1784 91.6786 41.0028C94.4288 39.415 95.8039 37.3339 95.8039 35.2528V32.2528C95.8039 30.1717 94.4288 28.0906 91.6786 26.5028C86.1783 23.3272 77.2604 23.3272 71.76 26.5028C69.0165 28.0868 67.6415 30.1616 67.6348 32.2377V35.2528C67.6348 37.3339 69.0099 39.415 71.7601 41.0028Z"
                          fill="var(--site-background)"
                        ></path>
                        <path
                          d="M67.6348 32.2377C67.6281 34.3238 69.0032 36.4111 71.76 38.0028C77.2604 41.1785 86.1783 41.1785 91.6786 38.0028C94.4288 36.415 95.8039 34.3339 95.8039 32.2528M67.6348 32.2377C67.6415 30.1616 69.0165 28.0868 71.76 26.5028C77.2604 23.3272 86.1783 23.3272 91.6786 26.5028C94.4288 28.0906 95.8039 30.1717 95.8039 32.2528M67.6348 32.2377V35.2528C67.6348 37.3339 69.0099 39.415 71.7601 41.0028C77.2604 44.1784 86.1783 44.1784 91.6786 41.0028C94.4288 39.415 95.8039 37.3339 95.8039 35.2528V32.2528"
                          stroke="currentColor"
                        ></path>
                        <path
                          d="M75.2239 28.5L76.956 29.5M81.719 26.9492V28.3634M88.2141 28.5L86.4821 29.5M90.9046 32.25H88.4551M86.4827 35L88.2147 36M81.719 36.1406V37.5548M76.9553 35L75.2233 36M74.9827 32.25H72.5332M83.8841 31C85.0799 31.6904 85.0799 32.8096 83.8841 33.5C82.6884 34.1904 80.7497 34.1904 79.554 33.5C78.3583 32.8096 78.3583 31.6904 79.554 31C80.7497 30.3096 82.6884 30.3096 83.8841 31Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M64.8328 29.503L42.3161 42.503C35.3809 46.5071 24.1367 46.5071 17.2014 42.503C13.7413 40.5053 12.0075 37.8883 12 35.27V32.2531C12 29.7918 13.5255 27.3305 16.5765 25.3824C17.9961 23.2104 20.98 21.4814 24.735 20.6535L39.7181 12.003C46.6533 7.99898 57.8976 7.99898 64.8328 12.003C68.3005 14.0051 70.0343 16.6291 70.0343 19.2531V22.2531C70.0342 24.8771 68.3004 27.501 64.8328 29.503Z"
                          fill="var(--site-background)"
                        ></path>
                        <path
                          d="M12 32.2531C12 29.6291 13.7338 27.0051 17.2015 25.003L39.7181 12.003C46.6534 7.99898 57.8976 7.99898 64.8328 12.003C68.3005 14.0051 70.0343 16.6291 70.0343 19.2531M12 32.2531C12 34.8771 13.7339 37.501 17.2015 39.503C24.1367 43.5071 35.3809 43.5071 42.3162 39.503L64.8329 26.503C68.3005 24.501 70.0343 21.8771 70.0343 19.2531M12 32.2531V35.27C12.0075 37.8883 13.7413 40.5053 17.2014 42.503C24.1367 46.5071 35.3809 46.5071 42.3162 42.503L64.8328 29.503C68.3004 27.501 70.0343 24.8771 70.0343 22.2531V19.2531"
                          stroke="currentColor"
                        ></path>
                        <path
                          d="M15.6738 31.2531C15.6738 35.7441 21.9797 39.3848 29.7584 39.3848C37.5371 39.3848 43.843 35.7441 43.843 31.2531L43.843 28.2531C43.843 23.762 37.5371 20.1213 29.7585 20.1213C21.9798 20.1213 15.6739 23.762 15.6739 28.2531L15.6738 31.2531Z"
                          fill="var(--site-background)"
                        ></path>
                        <path
                          d="M30.1939 23.6619L30.3702 22.9495L30.5465 23.6619C30.6235 23.973 31.0469 24.2175 31.5857 24.2619L32.8197 24.3637L31.5857 24.4655C31.0469 24.5099 30.6235 24.7543 30.5465 25.0655L30.3702 25.7779L30.1939 25.0655C30.117 24.7543 29.6936 24.5099 29.1547 24.4655L27.9207 24.3637L29.1547 24.2619C29.6936 24.2175 30.117 23.973 30.1939 23.6619Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M35.0507 26.4584L35.2692 25.0708L35.4877 26.4584C35.5391 26.7848 35.9722 27.0481 36.5342 27.0944L37.7187 27.1921L36.5342 27.2898C35.9722 27.3361 35.5391 27.5994 35.4877 27.9258L35.2692 29.3134L35.0507 27.9258C34.9993 27.5994 34.5662 27.3361 34.0042 27.2898L32.8197 27.1921L34.0042 27.0944C34.5662 27.0481 34.9993 26.7848 35.0507 26.4584Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M43.843 28.2531C43.843 28.2531 43.843 28.253 43.843 28.2531ZM43.843 28.2531C43.8428 32.744 37.537 36.3848 29.7585 36.3848C21.9798 36.3848 15.6739 32.7441 15.6739 28.2531M43.843 28.2531C43.843 23.762 37.5371 20.1213 29.7585 20.1213C21.9798 20.1213 15.6739 23.762 15.6739 28.2531M43.843 28.2531L43.843 31.2531C43.843 35.7441 37.5371 39.3848 29.7584 39.3848C21.9797 39.3848 15.6738 35.7441 15.6738 31.2531L15.6739 28.2531M29.7579 33.5561C24.6848 33.5561 20.5723 31.1817 20.5723 28.2528C20.5723 26.2428 22.509 24.494 25.3637 23.5945C24.6514 24.3481 24.2465 25.2125 24.2465 26.1314C24.2465 29.0604 28.359 31.4347 33.4321 31.4347C35.0238 31.4347 36.521 31.201 37.8262 30.7897C36.2682 32.4379 33.2392 33.5561 29.7579 33.5561ZM30.3702 22.9495L30.1939 23.6619C30.117 23.973 29.6936 24.2175 29.1547 24.2619L27.9207 24.3637L29.1547 24.4655C29.6936 24.5099 30.117 24.7543 30.1939 25.0655L30.3702 25.7779L30.5465 25.0655C30.6235 24.7543 31.0469 24.5099 31.5857 24.4655L32.8197 24.3637L31.5857 24.2619C31.0469 24.2175 30.6235 23.973 30.5465 23.6619L30.3702 22.9495ZM35.2692 25.0708L35.0507 26.4584C34.9993 26.7848 34.5662 27.0481 34.0042 27.0944L32.8197 27.1921L34.0042 27.2898C34.5662 27.3361 34.9993 27.5994 35.0507 27.9258L35.2692 29.3134L35.4877 27.9258C35.5391 27.5994 35.9722 27.3361 36.5342 27.2898L37.7187 27.1921L36.5342 27.0944C35.9722 27.0481 35.5391 26.7848 35.4877 26.4584L35.2692 25.0708Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
          )}
          title="Dark mode"
          code="dark:"
          text={
            <>
              Geen fan van felle schermen? Met <code className="font-semibold text-white/80">dark:</code> voor elke kleur krijgt je website een strakke donkere modus, net als deze site. Sleep of beweeg over het scherm.
            </>
          }
        >
          <DarkModeDemo />
        </ShowcaseCard>

        <ShowcaseCard
          icon={(
            <svg
                        className="h-[54px] w-auto text-white [--site-background:hsl(var(--page))]" aria-hidden="true"
                        width="112"
                        height="72"
                        viewBox="0 0 112 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.73306 34L53.8286 4.50003C54.7851 3.94774 56.3361 3.94774 57.2927 4.50003L70.283 12C70.7607 12.2758 70.9999 12.6372 71.0005 12.9986V15.9986C71.0011 16.361 70.7619 16.7235 70.283 17L72.8811 15.5C73.8377 14.9477 75.3886 14.9477 76.3452 15.5L89.3356 23C89.8145 23.2765 90.0536 23.639 90.053 24.0014V26.9986C90.0536 27.361 89.8145 27.7235 89.3356 28L91.9337 26.5C92.8903 25.9477 94.4412 25.9477 95.3978 26.5L108.388 34C108.866 34.2758 109.105 34.6372 109.106 34.9986V38C109.106 38.3619 108.866 38.7239 108.388 39L95.3978 46.5C94.4412 47.0523 92.8903 47.0523 91.9337 46.5L89.3356 45C89.8145 45.2765 90.0536 45.639 90.053 46.0014V49C90.053 49.3619 89.8139 49.7239 89.3356 50L76.3452 57.5C75.3886 58.0523 73.8377 58.0523 72.8811 57.5L70.283 56C70.7607 56.2758 70.9999 56.6372 71.0005 56.9986V60C71.0005 60.3619 70.7613 60.7239 70.283 61L57.2927 68.5C56.3361 69.0523 54.7851 69.0523 53.8286 68.5L21.7856 50C21.3073 49.7239 21.0682 49.3619 21.0682 49L21.0682 46.0014C21.0676 45.6391 21.3066 45.2767 21.7852 45.0003L19.1875 46.5C18.231 47.0523 16.68 47.0523 15.7234 46.5L2.73306 39C2.25476 38.7239 2.01561 38.3619 2.01562 38V34.9986C2.01624 34.6372 2.25538 34.2758 2.73306 34Z"
                          fill="var(--site-background)"
                        ></path>
                        <path
                          d="M109.106 34.9986C109.105 34.6372 108.866 34.2758 108.388 34L95.3978 26.5C94.4412 25.9477 92.8903 25.9477 91.9337 26.5L78.9433 34C78.4644 34.2765 78.2252 34.639 78.2259 35.0014M109.106 34.9986C109.106 35.361 108.867 35.7235 108.388 36L95.3978 43.5C94.4412 44.0523 92.8903 44.0523 91.9337 43.5L78.9433 36C78.4656 35.7242 78.2265 35.3629 78.2259 35.0014M109.106 34.9986V38C109.106 38.3619 108.866 38.7239 108.388 39L95.3978 46.5C94.4412 47.0523 92.8903 47.0523 91.9337 46.5L78.9433 39C78.465 38.7239 78.2258 38.3619 78.2259 38V35.0014M90.053 46.0014C90.0536 45.639 89.8145 45.2765 89.3356 45L76.3452 37.5C75.3886 36.9477 73.8377 36.9477 72.8811 37.5L59.8907 45C59.4118 45.2765 59.1727 45.639 59.1733 46.0014M90.053 46.0014C90.0524 46.3629 89.8133 46.7242 89.3356 47L76.3452 54.5C75.3886 55.0523 73.8377 55.0523 72.8811 54.5L59.8907 47C59.4131 46.7242 59.1739 46.3629 59.1733 46.0014M90.053 46.0014V49C90.053 49.3619 89.8139 49.7239 89.3356 50L76.3452 57.5C75.3886 58.0523 73.8377 58.0523 72.8811 57.5L59.8907 50C59.4124 49.7239 59.1733 49.3619 59.1733 49V46.0014M71.0005 56.9986C70.9999 56.6372 70.7607 56.2758 70.283 56L38.2401 37.5C37.2835 36.9477 35.7326 36.9477 34.776 37.5L21.7856 45C21.3067 45.2765 21.0676 45.639 21.0682 46.0014M71.0005 56.9986C71.0011 57.361 70.7619 57.7235 70.283 58L57.2927 65.5C56.3361 66.0523 54.7851 66.0523 53.8286 65.5L21.7856 47C21.3079 46.7242 21.0688 46.3629 21.0682 46.0014M71.0005 56.9986V60C71.0005 60.3619 70.7613 60.7239 70.283 61L57.2927 68.5C56.3361 69.0523 54.7851 69.0523 53.8286 68.5L21.7856 50C21.3073 49.7239 21.0682 49.3619 21.0682 49L21.0682 46.0014M40.1207 35.0014C40.1201 34.639 40.3593 34.2765 40.8382 34L72.8811 15.5C73.8377 14.9477 75.3886 14.9477 76.3452 15.5L89.3356 23C89.8145 23.2765 90.0536 23.639 90.053 24.0014M40.1207 35.0014C40.1214 35.3629 40.3605 35.7242 40.8382 36L53.8286 43.5C54.7851 44.0523 56.3361 44.0523 57.2927 43.5L89.3356 25C89.8133 24.7242 90.0524 24.3629 90.053 24.0014M40.1207 35.0014V38C40.1207 38.3619 40.3599 38.7239 40.8382 39L53.8286 46.5C54.7851 47.0523 56.3361 47.0523 57.2927 46.5L89.3356 28C89.8145 27.7235 90.0536 27.361 90.053 26.9986V24.0014M71.0005 12.9986C70.9999 12.6372 70.7607 12.2758 70.283 12L57.2927 4.50003C56.3361 3.94774 54.7851 3.94774 53.8286 4.50003L2.73306 34C2.25538 34.2758 2.01624 34.6372 2.01563 34.9986M71.0005 12.9986C71.0011 13.361 70.7619 13.7235 70.283 14L19.1875 43.5C18.231 44.0523 16.68 44.0523 15.7234 43.5L2.73306 36C2.25416 35.7235 2.01501 35.361 2.01563 34.9986M71.0005 12.9986V15.9986C71.0011 16.361 70.7619 16.7235 70.283 17L19.1875 46.5C18.231 47.0523 16.68 47.0523 15.7234 46.5L2.73306 39C2.25476 38.7239 2.01561 38.3619 2.01562 38L2.01563 34.9986"
                          stroke="currentColor"
                        ></path>
                      </svg>
          )}
          title="CSS-grid layouts"
          code="grid-cols-3"
          text="Grid-utilities direct in de HTML maken complexe layouts overzichtelijk, op elk schermformaat. Beweeg over een tegel."
        >
          <GridDemo />
        </ShowcaseCard>

        <ShowcaseCard
          icon={(
            <svg
                        className="h-[54px] w-auto text-white [--site-background:hsl(var(--page))]" aria-hidden="true"
                        width="112"
                        height="72"
                        viewBox="0 0 112 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_408_5745)">
                          <rect
                            width="63"
                            height="63"
                            rx="4"
                            transform="matrix(0.866025 -0.5 0.866025 0.5 1.92969 39.814)"
                            stroke="currentColor"
                            strokeDasharray="3 3"
                          ></rect>
                          <path
                            d="M6.82052 32.0748C4.71896 30.8759 4.9198 28.8839 7.24809 27.8339L42.7856 11.8071C44.6906 10.948 47.3962 11.0195 49.1572 11.9756L100.957 40.0964C102.762 41.0766 103.015 42.6809 101.546 43.8334L73.7036 65.6789C71.933 67.0682 68.4396 67.2268 66.3145 66.0145L6.82052 32.0748Z"
                            fill="currentColor"
                            fillOpacity="0.3"
                          ></path>
                          <path
                            d="M74.1457 62.6688L101.618 43.5542C102.344 43.0493 102.721 42.4339 102.745 41.8139V38.6818C102.722 38.0961 102.384 37.5131 101.729 37.0222L56.8938 3.4116C55.3193 2.23135 52.4292 1.95847 50.2856 2.78769L13.3287 17.0838C11.9732 17.6082 11.2255 18.4488 11.1608 19.3139V22.3139C11.1111 22.9798 11.4661 23.6601 12.2601 24.2219L66.5802 62.651C68.5301 64.0305 72.1763 64.0391 74.1457 62.6688Z"
                            fill="var(--site-background)"
                          ></path>
                          <path
                            d="M102.745 38.6818C102.722 38.0961 102.384 37.5131 101.729 37.0222L56.8938 3.4116C55.3193 2.23135 52.4292 1.95847 50.2856 2.78769L13.3287 17.0838C11.9732 17.6082 11.2255 18.4488 11.1608 19.3139M102.745 38.6818C102.772 39.3459 102.395 40.0135 101.618 40.5542L74.1457 59.6688C72.1763 61.0391 68.5301 61.0305 66.5802 59.651L12.2601 21.2219C11.4661 20.6601 11.1111 19.9798 11.1608 19.3139M102.745 38.6818V41.8139C102.721 42.4339 102.344 43.0493 101.618 43.5542L74.1457 62.6688C72.1763 64.0391 68.5301 64.0305 66.5802 62.651L12.2601 24.2219C11.4661 23.6601 11.1111 22.9798 11.1608 22.3139V19.3139"
                            stroke="currentColor"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_408_5745">
                            <rect
                              width="112"
                              height="72"
                              fill="var(--site-background)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
          )}
          title="3D-transforms"
          code="transform-3d"
          text="Soms zijn twee dimensies niet genoeg. Schaal, draai en verplaats elementen in 3D voor net dat beetje diepte."
        >
          <Stage className="flex h-[400px] items-center justify-center p-2">
            <div className="relative z-30">
              <TiltImageCard image="/images/3d-transform.jpeg" />
            </div>
          </Stage>
        </ShowcaseCard>

        <ShowcaseCard
          icon={(
            <svg
                      className="h-[54px] w-auto text-white [--site-background:hsl(var(--page))]" aria-hidden="true"
                      width="112"
                      height="72"
                      viewBox="0 0 112 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_408_5765)">
                        <path
                          d="M11.3887 58.234C11.3887 59.5912 12.2855 60.9484 14.0791 61.984C17.6663 64.055 23.4823 64.055 27.0694 61.984C28.863 60.9484 29.7598 59.5912 29.7598 58.234M11.3887 58.234C11.3887 56.8767 12.2855 55.5195 14.0791 54.484C17.6663 52.4129 23.4823 52.4129 27.0694 54.484C28.8631 55.5195 29.7598 56.8767 29.7598 58.234M11.3887 58.234V61.234C11.3887 62.5912 12.2855 63.9484 14.0791 64.984C17.6663 67.055 23.4823 67.055 27.0694 64.984C28.863 63.9484 29.7598 62.5912 29.7598 61.234V58.234"
                          stroke="currentColor"
                          strokeOpacity="0.2"
                        ></path>
                        <path
                          d="M44.3896 44.484C38.8892 41.3084 29.9714 41.3084 24.471 44.484C21.7208 46.0718 20.3457 48.1529 20.3458 50.234L20.3457 53.234C20.3457 55.3151 21.7208 57.3962 24.471 58.984C29.9713 62.1597 38.8892 62.1597 44.3896 58.984C47.1397 57.3962 48.5148 55.3151 48.5148 53.234V50.2555C48.5243 48.1673 47.1493 46.0773 44.3896 44.484Z"
                          fill="var(--site-background)"
                          fillOpacity="0.4"
                        ></path>
                        <path
                          d="M20.3458 50.234C20.3458 52.3151 21.7208 54.3962 24.471 55.984C29.9714 59.1597 38.8892 59.1597 44.3896 55.984C47.1303 54.4017 48.5054 52.3294 48.5148 50.2555M20.3458 50.234C20.3457 48.1529 21.7208 46.0718 24.471 44.484C29.9714 41.3084 38.8892 41.3084 44.3896 44.484C47.1493 46.0773 48.5243 48.1673 48.5148 50.2555M20.3458 50.234L20.3457 53.234C20.3457 55.3151 21.7208 57.3962 24.471 58.984C29.9713 62.1597 38.8892 62.1597 44.3896 58.984C47.1397 57.3962 48.5148 55.3151 48.5148 53.234V50.2555"
                          stroke="currentColor"
                          strokeOpacity="0.4"
                        ></path>
                        <path
                          d="M61.7097 34.484C54.2962 30.2038 42.2765 30.2038 34.8629 34.484C31.1562 36.6241 29.3028 39.429 29.3028 42.234L29.3027 45.234C29.3027 48.0389 31.1561 50.8439 34.8629 52.984C42.2764 57.2642 54.2961 57.2642 61.7097 52.984C65.4164 50.8439 67.2698 48.0389 67.2698 45.234V42.2104C67.2595 39.4133 65.4061 36.6181 61.7097 34.484Z"
                          fill="var(--site-background)"
                          fillOpacity="0.6"
                        ></path>
                        <path
                          d="M29.3028 42.234C29.3028 45.0389 31.1562 47.8439 34.8629 49.984C42.2765 54.2642 54.2962 54.2642 61.7097 49.984C65.4269 47.8379 67.2802 45.0232 67.2698 42.2104M29.3028 42.234C29.3028 39.429 31.1562 36.6241 34.8629 34.484C42.2765 30.2038 54.2962 30.2038 61.7097 34.484C65.4061 36.6181 67.2595 39.4133 67.2698 42.2104M29.3028 42.234L29.3027 45.234C29.3027 48.0389 31.1561 50.8439 34.8629 52.984C42.2764 57.2642 54.2961 57.2642 61.7097 52.984C65.4164 50.8439 67.2698 48.0389 67.2698 45.234V42.2104"
                          stroke="currentColor"
                          strokeOpacity="0.6"
                        ></path>
                        <path
                          d="M79.0318 24.484C69.7051 19.0992 54.5835 19.0992 45.2568 24.484C40.5934 27.1764 38.2618 30.7052 38.2618 34.234L38.2617 37.234C38.2617 40.7628 40.5934 44.2916 45.2567 46.984C54.5835 52.3688 69.705 52.3688 79.0317 46.984C83.6951 44.2916 86.0268 40.7628 86.0268 37.234L86.0268 34.234C86.0268 30.7052 83.6951 27.1764 79.0318 24.484Z"
                          fill="var(--site-background)"
                          fillOpacity="0.8"
                        ></path>
                        <path
                          d="M38.2618 34.234C38.2618 37.7628 40.5934 41.2916 45.2568 43.984C54.5835 49.3688 69.7051 49.3688 79.0318 43.984C83.6951 41.2916 86.0268 37.7628 86.0268 34.234M38.2618 34.234C38.2618 30.7052 40.5934 27.1764 45.2568 24.484C54.5835 19.0992 69.7051 19.0992 79.0318 24.484C83.6951 27.1764 86.0268 30.7052 86.0268 34.234M38.2618 34.234L38.2617 37.234C38.2617 40.7628 40.5934 44.2916 45.2567 46.984C54.5835 52.3688 69.705 52.3688 79.0317 46.984C83.6951 44.2916 86.0268 40.7628 86.0268 37.234L86.0268 34.234"
                          stroke="currentColor"
                          strokeOpacity="0.8"
                        ></path>
                        <path
                          d="M55.6487 37.9841C66.8885 44.4734 85.112 44.4734 96.3519 37.9841C101.972 34.7394 104.782 30.4867 104.782 26.2341L104.782 23.2341C104.782 18.9814 101.972 14.7287 96.3518 11.4841C85.112 4.99473 66.8885 4.99473 55.6487 11.4841C50.0287 14.7287 47.2188 18.9814 47.2188 23.2341L47.2188 26.2341C47.2188 30.4867 50.0287 34.7394 55.6487 37.9841Z"
                          fill="var(--site-background)"
                        ></path>
                        <path
                          d="M104.782 23.2341C104.782 18.9814 101.972 14.7287 96.3518 11.4841C85.112 4.99473 66.8885 4.99473 55.6487 11.4841C50.0287 14.7287 47.2188 18.9814 47.2188 23.2341M104.782 23.2341C104.782 27.4867 101.972 31.7394 96.3518 34.9841C85.112 41.4734 66.8885 41.4734 55.6487 34.9841C50.0287 31.7394 47.2187 27.4867 47.2188 23.2341M104.782 23.2341L104.782 26.2341C104.782 30.4867 101.972 34.7394 96.3519 37.9841C85.112 44.4734 66.8885 44.4734 55.6487 37.9841C50.0287 34.7394 47.2188 30.4867 47.2188 26.2341L47.2188 23.2341"
                          stroke="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_408_5765">
                          <rect
                            width="112"
                            height="72"
                            fill="var(--site-background)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
          )}
          title="Transities & animaties"
          code="ease-premium"
          text="Transities die doen wat je verwacht: een paar utilities en alles beweegt vloeiend."
        >
          <EasingDemo />
        </ShowcaseCard>

        <ShowcaseCard
          icon={(
            <svg
                      className="h-[54px] w-auto text-white [--site-background:hsl(var(--page))]" aria-hidden="true"
                      width="112"
                      height="72"
                      viewBox="0 0 112 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_408_5730)">
                        <path
                          d="M51.2301 6.00001L5.33071 32.5C4.1443 33.185 3.54647 34.0811 3.53722 34.9788V38C3.53721 38.9048 4.13508 39.8097 5.33082 40.5L51.2302 67C53.6216 68.3807 57.4989 68.3807 59.8904 67L105.79 40.5C106.985 39.8097 107.583 38.9048 107.583 38L107.583 35C107.583 34.0952 106.985 33.1904 105.79 32.5L59.8903 6.00001C57.4988 4.6193 53.6215 4.6193 51.2301 6.00001Z"
                          fill="var(--site-background)"
                        ></path>
                        <path
                          d="M107.583 35C107.583 34.0952 106.985 33.1904 105.79 32.5L59.8903 6.00001C57.4988 4.6193 53.6215 4.6193 51.2301 6.00001L5.33071 32.5C4.1443 33.185 3.54647 34.0811 3.53722 34.9788M107.583 35C107.583 35.9048 106.985 36.8097 105.79 37.5L59.8903 64C57.4988 65.3807 53.6215 65.3807 51.2301 64L5.33071 37.5C4.12565 36.8043 3.52782 35.8907 3.53722 34.9788M107.583 35L107.583 38C107.583 38.9048 106.985 39.8097 105.79 40.5L59.8904 67C57.4989 68.3807 53.6216 68.3807 51.2302 67L5.33082 40.5C4.13508 39.8097 3.53721 38.9048 3.53722 38V34.9788"
                          stroke="currentColor"
                        ></path>
                        <path
                          d="M54.6946 61.9999C55.1729 62.276 55.9484 62.276 56.4267 61.9999L100.594 36.4999L56.4267 10.9999C55.9484 10.7238 55.1729 10.7237 54.6946 10.9999L10.5273 36.4999L54.6946 61.9999Z"
                          fill="url(#paint0_linear_408_5730)"
                        ></path>
                        <path
                          d="M100.593 36.4999L56.4257 10.9999C55.9474 10.7238 55.1719 10.7237 54.6936 10.9999L10.5263 36.4999M100.593 36.4999L102.325 35.4999C102.803 35.2238 102.803 34.776 102.325 34.4999L56.4257 7.99989C55.9474 7.72375 55.1719 7.72375 54.6936 7.99989L8.79427 34.4999C8.31597 34.776 8.31597 35.2237 8.79427 35.4999L10.5263 36.4999M100.593 36.4999L56.4257 61.9999C55.9474 62.276 55.1719 62.276 54.6936 61.9999L10.5263 36.4999"
                          stroke="currentColor"
                        ></path>
                        <path
                          d="M79.6783 25.5L70.152 31C69.1954 31.5523 68.4199 32.8954 68.4199 34V45C68.4199 45.5161 68.5892 45.8888 68.8672 46.0831L70.6723 47.1287C70.9847 47.3015 71.4123 47.2723 71.884 47L74.9151 45.25L76.6472 46.25L78.3792 43.25L81.4103 41.5C82.3669 40.9477 83.1424 39.6046 83.1424 38.5V27.5C83.1424 26.9318 82.9371 26.5374 82.6076 26.3635L80.8672 25.3592C80.557 25.2 80.1386 25.2342 79.6783 25.5Z"
                          fill="var(--site-background)"
                        ></path>
                        <path
                          d="M70.6723 47.1287C70.3512 46.951 70.152 46.5599 70.152 46L70.152 35C70.152 33.8954 70.9274 32.5523 71.884 32L81.4103 26.5C81.8748 26.2318 82.2966 26.1994 82.6076 26.3635M70.6723 47.1287C70.9847 47.3015 71.4123 47.2723 71.884 47L74.9151 45.25L76.6472 46.25L78.3792 43.25L81.4103 41.5C82.3669 40.9477 83.1424 39.6046 83.1424 38.5V27.5C83.1424 26.9318 82.9371 26.5374 82.6076 26.3635M70.6723 47.1287L68.8672 46.0831C68.5892 45.8888 68.4199 45.5161 68.4199 45V34C68.4199 32.8954 69.1954 31.5523 70.152 31L79.6783 25.5C80.1386 25.2342 80.557 25.2 80.8672 25.3592L82.6076 26.3635"
                          stroke="currentColor"
                        ></path>
                        <path
                          d="M71.8848 34L81.411 28.5V39.5L71.8848 45V34Z"
                          stroke="currentColor"
                        ></path>
                        <path
                          d="M39.8404 2.49999L30.3141 7.99999C29.3575 8.55227 28.582 9.89542 28.582 11V22C28.582 22.5161 28.7513 22.8888 29.0293 23.0831L30.8344 24.1287C31.1468 24.3015 31.5744 24.2723 32.0461 24L35.0772 22.25L36.8093 23.25L38.5413 20.25L41.5724 18.5C42.529 17.9477 43.3045 16.6046 43.3045 15.5V4.49998C43.3045 3.93176 43.0992 3.53737 42.7697 3.36352L41.0293 2.35916C40.7191 2.20002 40.3007 2.23421 39.8404 2.49999Z"
                          fill="var(--site-background)"
                        ></path>
                        <path
                          d="M30.8344 24.1287C30.5133 23.951 30.3141 23.5599 30.3141 23L30.3141 12C30.3141 10.8954 31.0896 9.55227 32.0461 8.99998L41.5724 3.49999C42.0369 3.23181 42.4587 3.19942 42.7697 3.36352M30.8344 24.1287C31.1468 24.3015 31.5744 24.2723 32.0461 24L35.0772 22.25L36.8093 23.25L38.5413 20.25L41.5724 18.5C42.529 17.9477 43.3045 16.6046 43.3045 15.5V4.49998C43.3045 3.93176 43.0992 3.53737 42.7697 3.36352M30.8344 24.1287L29.0293 23.0831C28.7513 22.8888 28.582 22.5161 28.582 22V11C28.582 9.89542 29.3575 8.55227 30.3141 7.99999L39.8404 2.49999C40.3007 2.23421 40.7191 2.20002 41.0293 2.35916L42.7697 3.36352"
                          stroke="currentColor"
                        ></path>
                        <path
                          d="M32.0469 11L41.5732 5.5V16.5L32.0469 22V11Z"
                          fill="currentColor"
                          fillOpacity="0.75"
                          stroke="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_408_5730"
                          x1="10.501"
                          y1="36"
                          x2="55.5607"
                          y2="62.207"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="currentColor" stopOpacity="0.75"></stop>
                          <stop offset="1" stopColor="var(--site-background)"></stop>
                        </linearGradient>
                        <clipPath id="clip0_408_5730">
                          <rect
                            width="112"
                            height="72"
                            fill="var(--site-background)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
          )}
          title="Verlopen"
          code="bg-linear-to-r"
          text="Geen ingewikkelde syntax meer: zijdezachte kleurverlopen met een paar utility-klassen."
          className="hidden md:block"
        >
          <GradientDemo />
        </ShowcaseCard>
      </div>
    </div>
  );
}
