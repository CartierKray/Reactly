import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * components/site/Smoke.tsx
 *
 * Rook die langzaam over een donker vlak drijft, zoals in de vorige hero:
 * drie lagen (twee beelden) met `mix-blend-screen`, elk op een eigen tempo.
 * Alleen zichtbaar op donkere vlakken; in licht thema verborgen en dan ook
 * niet geladen (lazy in een verborgen blok).
 */
export default function Smoke({ className, intensity = 0.45, eager = false }: { className?: string; intensity?: number; eager?: boolean }) {
  const layers = [
    { src: "/images/smoke1.png", cls: "left-[-50%] top-[-20%] animate-[wave_9s_linear_infinite]" },
    { src: "/images/smoke2.png", cls: "left-[-10%] top-[-60%] animate-[wave_16s_linear_infinite]" },
    { src: "/images/smoke1.png", cls: "right-[-25%] top-[-30%] animate-[wave_12s_linear_infinite] [animation-direction:reverse]" },
  ];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} style={{ opacity: intensity }}>
      {layers.map((l, i) => (
        <Image
          key={i}
          src={l.src}
          alt=""
          width={1600}
          height={850}
          sizes="2000px"
          loading={eager ? "eager" : "lazy"}
          className={cn("absolute w-[2000px] max-w-none mix-blend-screen will-change-transform", l.cls)}
        />
      ))}
    </div>
  );
}
