"use client";

import * as React from "react";
import Image from "next/image";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Currency formatter (EUR, Dutch locale)
const euro = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export type BistroItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string; // left image to show when item is active
  bold?: boolean;
};

export type Hotspot = {
  id: string; // must match a BistroItem id
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
};

const BISTRO_ITEMS: BistroItem[] = [
  {
    id: "jacket",
    name: "BEIGE TWILL WORKWEAR JACKET",
    price: 101.95,
    imageUrl: "/images/jacket-1.webp",
  },
  {
    id: "shorts",
    name: "BISTRO GREEN DOTTED MONOGRAM SWIMSHORTS",
    price: 29.95,
    imageUrl: "/images/short-3.webp",
    bold: true,
  },
  {
    id: "tank",
    name: "BISTRO GREEN RIB TANK TOP",
    price: 28.95,
    imageUrl: "/images/top-1.jpg",
    bold: true,
  },
  {
    id: "denim",
    name: "BLUE MONOGRAM DENIM SHORTS",
    price: 77.95,
    imageUrl: "/images/short-1.webp",
  },
  {
    id: "cardigan",
    name: "BISTRO GREEN WASHED KNIT CARDIGAN",
    price: 83.95,
    imageUrl: "/images/woman-1.webp",
  },
];

const DEFAULT_HOTSPOTS: Hotspot[] = [
  { id: "cardigan", x: 30, y: 30 }, // woman's torso
  { id: "denim", x: 25, y: 60 }, // woman's shorts
  { id: "jacket", x: 78, y: 25 }, // man's jacket
  { id: "tank", x: 60, y: 40 }, // under jacket area
  { id: "shorts", x: 75, y: 53 }, // man's shorts
];

const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><rect width='100%' height='100%' fill='#f3f4f6'/></svg>`
  );

export default function BistroGreenShowcase({
  title = "LATEST SALE STYLES",
  subtitle = "BISTRO GREEN",
  items = BISTRO_ITEMS,
  heroSrc = "/images/STRY3.webp",
  hotspots = DEFAULT_HOTSPOTS,
  imageWidth = 520,
  imageHeight = 520,
}: {
  title?: string;
  subtitle?: string;
  items?: BistroItem[];
  heroSrc?: string;
  hotspots?: Hotspot[];
  imageWidth?: number;
  imageHeight?: number;
}) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id ?? "");
  const activeItem = React.useMemo(
    () => items.find((i) => i.id === activeId) ?? items[0],
    [items, activeId]
  );

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-10 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Left column: title + dynamic flatlay image + list */}
        <div className="flex flex-col justify-center gap-8 lg:gap-12">
          <div>
            <h2 className="text-sm font-extrabold tracking-tight text-zinc-900 lg:text-base">
              {title}
            </h2>
            <p className="mt-1 text-sm font-medium tracking-wide text-zinc-800">
              {subtitle}
            </p>
          </div>

          {/* Dynamic product image */}
          <div className="relative w-full" style={{ maxWidth: imageWidth }}>
            <div
              className="relative"
              style={{ width: imageWidth, height: imageHeight }}
            >
              <Image
                key={activeItem?.imageUrl}
                src={activeItem?.imageUrl || PLACEHOLDER}
                alt={activeItem?.name || "Selected item"}
                width={imageWidth}
                height={imageHeight}
                className="h-full max-h-[70vh] max-w-md md:max-w-lg  md:w-full rounded object-cover transition-all duration-300"
              />
            </div>
          </div>

          {/* Item list (hover/click updates active) */}
          <ul className="space-y-1 text-[10px] tracking-wide sm:text-[10px] max-w-lg">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li
                  key={item.id}
                  className={cn(
                    "group flex cursor-pointer items-center justify-between gap-2",
                    "border-b border-transparent hover:border-zinc-200",
                    // kleur: alles 50% zwart, alleen hover/focus zwart
                    "text-black/50 hover:text-black focus:text-black focus:outline-none",
                    isActive && "font-semibold" // actief = dikker (kleur blijft bepaald door hover)
                  )}
                  onMouseEnter={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                >
                  <span className="truncate">{item.name}</span>
                  {/* laat kleur erven van het li → geen eigen text-* class */}
                  <span className="tabular-nums">
                    {euro.format(item.price)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right column: lifestyle hero with hotspots */}
        {/* Right column: lifestyle hero with hotspots */}
        <div className="relative w-full overflow-hidden rounded h-[100vh] max-h-[100vh]">
          <Image
            src={heroSrc || PLACEHOLDER}
            alt="Bistro Green Lifestyle"
            width={1000}
            height={1400}
            className="h-full w-full object-cover"
            priority
          />

          {/* Hotspots */}
          <div className="pointer-events-none absolute inset-0">
            {hotspots.map((h) => {
              const isActive = h.id === activeId;
              return (
                <button
                  key={`${h.id}-${h.x}-${h.y}`}
                  type="button"
                  className={cn(
                    "pointer-events-auto absolute grid place-items-center",
                    "h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm shadow",
                    "transition",
                    isActive ? "ring-2 ring-zinc-900" : "ring-1 ring-white/60"
                  )}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  onClick={() => setActiveId(h.id)}
                  aria-label={`Bekijk ${
                    items.find((i) => i.id === h.id)?.name ?? "item"
                  }`}
                >
                  <span
                    className={cn(
                      "block h-2 w-2 rounded-full",
                      isActive ? "bg-zinc-900" : "bg-zinc-700"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
