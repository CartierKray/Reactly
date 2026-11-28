import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * components/site/RubikCube.tsx
 *
 * De zwarte Rubik's cube uit de dark-mode hero, overal op de site: een render
 * van dezelfde Spline-scène (transparante WebP van ±50 KB, door next/image als
 * AVIF/WebP op precies de juiste maat geserveerd). Geen JavaScript, geen
 * 3D-runtime en identiek aan de kubus in de hero, ook als placeholder tot de
 * interactieve Spline-kubus daar geladen is.
 *
 * `size` is de ribbe van de kubus; het vlak eromheen is 1,9× zo groot, zodat
 * bestaande plekken niet verspringen. `pose` kiest een van de drie standen
 * uit de animatie. In een element met `group` kantelt hij zacht bij hover.
 */

const POSES = {
  classic: "/images/cube/reactly-cube.webp",
  front: "/images/cube/reactly-cube-front.webp",
  tilt: "/images/cube/reactly-cube-tilt.webp",
} as const;

export type CubePose = keyof typeof POSES;

export function RubikCube({
  size = 120,
  className,
  shadow = true,
  pose = "classic",
  priority = false,
}: {
  size?: number;
  className?: string;
  shadow?: boolean;
  pose?: CubePose;
  priority?: boolean;
}) {
  const box = Math.round(size * 1.9);
  return (
    <div aria-hidden className={cn("relative grid place-items-center", className)} style={{ width: box, height: box }}>
      {shadow && (
        <div className="absolute bottom-[7%] left-1/2 h-[9%] w-[58%] -translate-x-1/2 rounded-[100%] bg-black/45 blur-xl dark:bg-black/70" />
      )}
      <Image
        src={POSES[pose]}
        alt=""
        width={960}
        height={960}
        sizes={`${Math.round(box * 0.8)}px`}
        priority={priority}
        draggable={false}
        className="relative h-[80%] w-[80%] select-none object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-premium group-hover:-rotate-3 group-hover:scale-[1.04]"
      />
    </div>
  );
}
