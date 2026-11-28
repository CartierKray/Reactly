"use client";

/**
 * components/site/home/HeroMedia.tsx
 *
 * De zware media van de hero, alleen geladen waar ze te zien zijn:
 *
 *  - HeroVideo: licht thema. Eerst het stilstaande beeld (CSS-achtergrond in
 *    de hero, direct zichtbaar), daarna vloeit de video erover zodra hij
 *    speelt. 1138px op desktop (4,4 MB), 640px op telefoon (1,9 MB); was één
 *    bestand van 13,5 MB mét audiospoor. Geen video bij reduced motion,
 *    Save-Data of een trage verbinding.
 *
 *  - HeroCube: donker thema. De interactieve Spline-kubus op elk scherm, pas
 *    geladen als de browser even niets te doen heeft (de kop en knoppen zijn
 *    dan al interactief); tot dan dezelfde kubus als render (geen sprong in beeld). Buiten beeld pauzeert hij;
 *    bij Save-Data, een trage verbinding of "beweging verminderen" blijft de
 *    render van de kubus staan.
 */

import * as React from "react";
import { useTheme } from "next-themes";

import { RubikCube } from "../RubikCube";
import { cn } from "@/lib/utils";

/**
 * De Spline-scène, rechtstreeks op de runtime (zonder @splinetool/react-spline:
 * dat pakket exporteert alleen ESM en breekt de serververtaling van Next).
 * De runtime wordt pas bij het mounten opgehaald en bij het verlaten netjes
 * opgeruimd. Buiten beeld pauzeert de scène (geen rekenwerk, geen accu).
 */
function SplineScene({ scene, onLoad }: { scene: string; onLoad: () => void }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    let app: { dispose: () => void; stop: () => void; play: () => void; setZoom: (z: number) => void } | undefined;
    let io: IntersectionObserver | undefined;
    let cancelled = false;
    (async () => {
      const { Application } = await import("@splinetool/runtime");
      if (cancelled || !canvasRef.current) return;
      const instance = new Application(canvasRef.current, { renderOnDemand: true });
      app = instance;
      await instance.load(scene);
      if (cancelled) return;
      // Telefoon en tablet: het vlak is lager dan op desktop, dus iets verder
      // inzoomen zodat de kubus even groot oogt.
      const el = wrapRef.current;
      if (el && window.matchMedia("(max-width: 1023px)").matches) {
        instance.setZoom(Math.min(1.25, Math.max(1, 560 / (el.clientHeight || 400))));
      }
      onLoad();
      if (wrapRef.current && "IntersectionObserver" in window) {
        io = new IntersectionObserver(([e]) => (e.isIntersecting ? instance.play() : instance.stop()), { threshold: 0 });
        io.observe(wrapRef.current);
      }
    })().catch((err) => console.error("Spline kon niet laden", err));
    return () => {
      cancelled = true;
      io?.disconnect();
      app?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  return (
    <div ref={wrapRef} className="h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="block cursor-grab outline-none active:cursor-grabbing" />
    </div>
  );
}

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** Pas na het mounten is het thema betrouwbaar; daarvoor rendert niets (geen hydratieverschil). */
function useMounted() {
  const [m, setM] = React.useState(false);
  React.useEffect(() => setM(true), []);
  return m;
}

export function HeroVideo() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const [allowed, setAllowed] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (c?.saveData) return;
    if (c?.effectiveType && /^(slow-)?2g$|^3g$/.test(c.effectiveType)) return;
    setAllowed(true);
  }, []);

  if (!mounted || !allowed || resolvedTheme !== "light") return null;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-out",
        playing ? "opacity-100" : "opacity-0",
      )}
    >
      <source src="/video/reactly-hero-1138.mp4" type="video/mp4" media="(min-width: 768px)" />
      <source src="/video/reactly-hero-640.mp4" type="video/mp4" />
    </video>
  );
}

export function HeroCube() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const [ready, setReady] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    // Geen 3D bij "beweging verminderen", Save-Data of een trage verbinding:
    // dan blijft de render van de kubus staan.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (c?.saveData) return;
    if (c?.effectiveType && /^(slow-)?2g$|^3g$/.test(c.effectiveType)) return;

    // Pas laden als de browser even niets te doen heeft; op telefoon en tablet
    // iets later, zodat de kop en knoppen eerst interactief zijn.
    const small = !window.matchMedia("(min-width: 1024px)").matches;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let id: number;
    if (w.requestIdleCallback) id = w.requestIdleCallback(() => setReady(true), { timeout: small ? 2600 : 1800 });
    else id = window.setTimeout(() => setReady(true), small ? 1200 : 700);
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div className="relative h-full w-full">
      <div
        className={cn(
          "absolute inset-0 grid place-items-center transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <RubikCube size={210} pose="front" shadow={false} className="animate-float" />
      </div>
      {ready && (
        <div
          className={cn(
            "absolute inset-0 transition-[opacity,scale] duration-[1200ms] ease-premium",
            loaded ? "scale-100 opacity-100 lg:scale-105 xl:scale-110" : "scale-95 opacity-0",
          )}
        >
          <SplineScene scene="/spline/cube.splinecode" onLoad={() => setLoaded(true)} />
        </div>
      )}
    </div>
  );
}
