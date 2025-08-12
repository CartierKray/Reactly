"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// EUR
const euro = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export type BistroItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  bold?: boolean;
};

export type Hotspot = {
  id: string; // moet matchen met item.id
  x: number; // percentage 0-100
  y: number; // percentage 0-100
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
  { id: "cardigan", x: 30, y: 30 },
  { id: "denim", x: 25, y: 60 },
  { id: "jacket", x: 78, y: 25 },
  { id: "tank", x: 60, y: 40 },
  { id: "shorts", x: 75, y: 53 },
];

const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><rect width='100%' height='100%' fill='#f3f4f6'/></svg>`
  );

// slide anim
const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

export default function BistroGreenShowcase({
  title = "LATEST STYLE TRENDS",
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
  const router = useRouter();

  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1); // 1 vooruit, -1 terug
  const [revealed, setRevealed] = React.useState(false); // mobiel/tablet: pas tonen na dot

  const activeItem = items[index] ?? items[0];
  const activeId = activeItem?.id ?? "";

  const goToIndex = React.useCallback(
    (next: number) => {
      if (!items.length) return;
      const len = items.length;
      const nextIndex = ((next % len) + len) % len;
      setDirection(nextIndex > index ? 1 : -1);
      setIndex(nextIndex);
    },
    [index, items.length]
  );

  const goToId = React.useCallback(
    (id: string, { reveal }: { reveal?: boolean } = {}) => {
      const i = items.findIndex((it) => it.id === id);
      if (i !== -1) {
        if (reveal) setRevealed(true);
        goToIndex(i);
      }
    },
    [items, goToIndex]
  );

  // Swipe op flatlay
  function onDragEnd(_e: MouseEvent | TouchEvent | PointerEvent, info: any) {
    const swipe = info.offset.x + info.velocity.x * 100;
    if (swipe < -100) goToIndex(index + 1);
    else if (swipe > 100) goToIndex(index - 1);
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-3 sm:px-4 pb-8 sm:pb-10 lg:px-8">
      {/* =======================
          MOBIEL & TABLET (tot en met md)
         ======================= */}
      <div className="lg:hidden">
        {/* Hero met hotspots */}
        <div className="relative w-full overflow-hidden h-[70vh]">
          <Image
            src={heroSrc || PLACEHOLDER}
            alt="Bistro Green Lifestyle"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0">
            {hotspots.map((h) => {
              const isActive = h.id === activeId;
              return (
                <button
                  key={`${h.id}-${h.x}-${h.y}-m`}
                  type="button"
                  className={cn(
                    "pointer-events-auto absolute grid place-items-center",
                    "h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm shadow",
                    "transition",
                    isActive ? "ring-2 ring-zinc-900" : "ring-1 ring-white/60"
                  )}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  onClick={() => goToId(h.id, { reveal: true })}
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

        {/* Bottom sheet – na dot-tap */}
        <AnimatePresence initial={false}>
          {revealed && (
            <motion.div
              key="m-detail"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mt-8"
            >
              {/* Header met sluitknop */}
              <div className="flex items-center justify-between border-b -mt-5 border-zinc-200 dark:border-white/25 px-2 pb-2">
                <h2 className="text-sm font-medium tracking-tight text-zinc-900 dark:text-white">
                  See clothes
                </h2>
                <button
                  onClick={() => setRevealed(false)}
                  aria-label="Close"
                  className="p-2 -mr-2 rounded hover:bg-zinc-100 dark:hover:bg-white/25 active:scale-95 transition"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {/* Lijst: 3-koloms grid per rij, thumb in lijn; Explore rechts bij actieve rij */}
              <ul className="divide-y divide-zinc-200 dark:divide-white/25">
                {items.map((item, i) => {
                  const isActive = i === index;
                  return (
                    <li
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => goToIndex(i)}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isActive}
                    >
                      <div className="grid-cols-[92px_1fr_auto] items-center w-full flex justify-between gap-3 px-2">
                        {/* Thumbnail kolom: behoudt kolombreedte, maar geen hoogte als niet actief */}

                        {/* Titel */}
                        <div
                          className={cn(
                            "py-1 pr-2 text-[10px] tracking-wide",
                            isActive
                              ? "text-black dark:text-white font-semibold"
                              : "text-black/70 dark:text-white/70"
                          )}
                        >
                          {item.name}
                        </div>

                        {/* Prijs rechts */}
                        <div className="py-1 pl-2 text-[10px] tabular-nums text-black dark:text-white">
                          {euro.format(item.price)}
                        </div>
                      </div>

                      <div className="flex mb-2 justify-between">
                        <div
                          className={cn(
                            "overflow-hidden transition-[height] duration-200",
                            isActive ? "h-20" : "h-0"
                          )}
                        >
                          {isActive && (
                            <div className="h-24 w-24 ml-2 bg-zinc-100 overflow-hidden">
                              <Image
                                src={item.imageUrl || PLACEHOLDER}
                                alt={item.name}
                                width={96}
                                height={96}
                                className="h-full w-full object-cover"
                                priority={false}
                              />
                            </div>
                          )}
                        </div>

                        {/* Explore-link alleen bij actieve rij */}
                        {isActive && (
                          <div className="flex justify-end items-end tracking-wider pr-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/product/${item.id}`);
                              }}
                              className="text-[10px] underline underline-offset-2"
                              aria-label={`Open ${item.name}`}
                            >
                              Explore Item
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =======================
          DESKTOP (vanaf lg): originele 2-koloms layout
         ======================= */}
      <div className="hidden lg:grid grid-cols-1 items-start gap-8 lg:gap-12 lg:grid-cols-[1fr_1fr]">
        {/* Links: titel + flatlay + lijst */}
        <div className="flex flex-col justify-center gap-8 lg:gap-12">
          <div className="px-1">
            <h2 className="text-3xl font-semibold tracking-normal text-zinc-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-1 text-sm font-medium tracking-wide text-zinc-800 dark:text-white/50">
              {subtitle}
            </p>
          </div>

          <div
            className="relative w-full overflow-hidden mx-auto lg:mx-0"
            style={{ maxWidth: "min(92vw, " + imageWidth + "px)" }}
          >
            <div
              className="relative"
              style={{
                width: "min(92vw, " + imageWidth + "px)",
                height: `clamp(260px, 56vw, ${imageHeight}px)`,
              }}
            >
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={activeItem?.id + "-desk"}
                  className="absolute inset-0"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 400, damping: 32 },
                    opacity: { duration: 0.18 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={onDragEnd}
                >
                  <Image
                    src={activeItem?.imageUrl || PLACEHOLDER}
                    alt={activeItem?.name || "Selected item"}
                    width={imageWidth}
                    height={imageHeight}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <ul className="space-y-1 text-[10px] tracking-wide mx-auto w-full px-1">
            {items.map((item, i) => {
              const isActive = i === index;
              return (
                <li
                  key={item.id + "-desk"}
                  className={cn(
                    "group flex cursor-pointer items-center w-full lg:max-w-lg justify-between gap-2",
                    "border-b border-transparent hover:border-zinc-200 dark:hover:border-zinc-600 transition-colors",
                    isActive
                      ? "text-black dark:text-white font-semibold"
                      : "text-black/50 dark:text-white/50 dark:hover:text-white hover:text-black"
                  )}
                  onMouseEnter={() => goToIndex(i)}
                  onFocus={() => goToIndex(i)}
                  onClick={() => goToIndex(i)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                >
                  <span className="truncate">{item.name}</span>
                  <span className="tabular-nums">
                    {euro.format(item.price)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Rechts: hero met hotspots */}
        <div className="relative w-full overflow-hidden h-[100vh] max-h-[100vh]">
          <Image
            src={heroSrc || PLACEHOLDER}
            alt="Bistro Green Lifestyle"
            width={1200}
            height={1600}
            className="h-full w-full object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0">
            {hotspots.map((h) => {
              const isActive = h.id === activeId;
              return (
                <button
                  key={`${h.id}-${h.x}-${h.y}-desk`}
                  type="button"
                  className={cn(
                    "pointer-events-auto absolute grid place-items-center",
                    "h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm shadow",
                    "transition",
                    isActive ? "ring-2 ring-zinc-900" : "ring-1 ring-white/60"
                  )}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  onClick={() => goToId(h.id)}
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
