"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Utility
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// EUR formatter
const euro = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

/* ===========================
   Types
=========================== */
export type Product = {
  id: string;
  name: string;
  subtitle?: string;

  // default beelden
  imageUrl: string;
  hoverImageUrl?: string;

  // Variants per kleur (optioneel). Index aligned met `colors`.
  variants?: Array<{
    imageUrl: string;
    hoverImageUrl?: string;
  }>;

  price: number;
  salePrice?: number;
  salePercent?: number; // 0 of undefined = verberg ribbon
  colors?: { name: string; hex: string }[];
  sizes?: string[]; // voor hover overlay
  soldOut?: boolean;

  // voor pill-filter
  category: "men" | "women" | "tops" | "bottoms" | "accessories";
};

export type PillCategory = {
  id: Product["category"];
  label: string;
  count: number; // fallback; echte count wordt live berekend
  imageUrl?: string;
};

/* ===========================
   Demo data
=========================== */
const CATEGORIES: PillCategory[] = [
  { id: "men", label: "Men", count: 243, imageUrl: "/images/shirt-1.webp" },
  { id: "women", label: "Women", count: 177, imageUrl: "/images/woman-1.webp" },
  {
    id: "tops",
    label: "All Tops",
    count: 236,
    imageUrl: "/images/shirt-2.webp",
  },
  {
    id: "bottoms",
    label: "All Bottoms",
    count: 88,
    imageUrl: "/images/short-1.webp",
  },
  {
    id: "accessories",
    label: "All Accessories",
    count: 29,
    imageUrl: "/images/accessoires-1.webp",
  },
];

const PRODUCTS: Product[] = [
  {
    id: "meru",
    name: "Brown Meru Vintage Leather Bag",
    imageUrl: "/images/hoodie-1.webp",
    hoverImageUrl: "/images/top-1.jpg",
    price: 239.95,
    salePrice: 168.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },
      { name: "Black", hex: "#999999" },
    ],
    variants: [
      { imageUrl: "/images/hoodie-1.webp", hoverImageUrl: "/images/top-1.jpg" },
      { imageUrl: "/images/jacket-1.webp", hoverImageUrl: "/images/top-1.jpg" },
    ],
    soldOut: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "men",
  },
  {
    id: "myshus",
    name: "Dark Brown MYSHUS Monogram Bag",
    imageUrl: "/images/shirt-2.webp",
    hoverImageUrl: "/images/top-1.jpg",
    price: 159.95,
    salePrice: 79.95,
    salePercent: 50,
    colors: [{ name: "Oxide", hex: "#6B6B6B" }],
    variants: [
      { imageUrl: "/images/shirt-2.webp", hoverImageUrl: "/images/top-1.jpg" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "tops",
  },
  {
    id: "emb-mono",
    name: "Black MERU EMB Monogram",
    imageUrl: "/images/short-1.webp",
    hoverImageUrl: "/images/short-2.webp",
    price: 119.95,
    salePrice: 84.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },
      { name: "Black", hex: "#999999" },
      { name: "Brown", hex: "#5E4A3B" },
      { name: "Oxide", hex: "#6B6B6B" },
    ],
    variants: [
      {
        imageUrl: "/images/short-1.webp",
        hoverImageUrl: "/images/short-2.webp",
      },
      {
        imageUrl: "/images/short-2.webp",
        hoverImageUrl: "/images/short-1.webp",
      },
      {
        imageUrl: "/images/short-3.webp",
        hoverImageUrl: "/images/short-2.webp",
      },
      {
        imageUrl: "/images/short-1.webp",
        hoverImageUrl: "/images/short-3.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "bottoms",
  },
  {
    id: "white-may",
    name: "White MAY Monogram Bag",
    imageUrl: "/images/accessoires-1.webp",
    hoverImageUrl: "/images/accessoires-1.webp",
    price: 109.95,
    salePrice: 54.95,
    salePercent: 50,
    colors: [
      { name: "Black", hex: "#999999" },
      { name: "Oxide", hex: "#6B6B6B" },
    ],
    variants: [
      { imageUrl: "/images/accessoires-1.webp" },
      { imageUrl: "/images/accessoires-1.webp" },
    ],
    sizes: ["ONE SIZE"],
    category: "accessories",
  },
  {
    id: "meru-2",
    name: "Brown Meru Vintage Leather Bag",
    imageUrl: "/images/hoodie-1.webp",
    hoverImageUrl: "/images/top-1.jpg",
    price: 239.95,
    salePrice: 168.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },
      { name: "Brown", hex: "#5E4A3B" },
    ],
    variants: [
      { imageUrl: "/images/hoodie-1.webp", hoverImageUrl: "/images/top-1.jpg" },
      { imageUrl: "/images/jacket-1.webp", hoverImageUrl: "/images/top-1.jpg" },
    ],
    soldOut: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "women",
  },
  {
    id: "myshus",
    name: "Dark Brown MYSHUS Monogram Bag",
    imageUrl: "/images/shirt-2.webp",
    hoverImageUrl: "/images/top-1.jpg",
    price: 159.95,
    salePrice: 79.95,
    salePercent: 50,
    colors: [{ name: "Oxide", hex: "#6B6B6B" }],
    variants: [
      { imageUrl: "/images/shirt-2.webp", hoverImageUrl: "/images/top-1.jpg" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "tops",
  },
  {
    id: "emb-mono",
    name: "Black MERU EMB Monogram",
    imageUrl: "/images/short-1.webp",
    hoverImageUrl: "/images/short-2.webp",
    price: 119.95,
    salePrice: 84.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },
      { name: "Black", hex: "#999999" },
      { name: "Brown", hex: "#5E4A3B" },
      { name: "Oxide", hex: "#6B6B6B" },
    ],
    variants: [
      {
        imageUrl: "/images/short-1.webp",
        hoverImageUrl: "/images/short-2.webp",
      },
      {
        imageUrl: "/images/short-2.webp",
        hoverImageUrl: "/images/short-1.webp",
      },
      {
        imageUrl: "/images/short-3.webp",
        hoverImageUrl: "/images/short-2.webp",
      },
      {
        imageUrl: "/images/short-1.webp",
        hoverImageUrl: "/images/short-3.webp",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "bottoms",
  },
  {
    id: "white-may",
    name: "White MAY Monogram Bag",
    imageUrl: "/images/accessoires-1.webp",
    hoverImageUrl: "/images/accessoires-1.webp",
    price: 109.95,
    salePrice: 54.95,
    salePercent: 50,
    colors: [
      { name: "Black", hex: "#999999" },
      { name: "Oxide", hex: "#6B6B6B" },
    ],
    variants: [
      { imageUrl: "/images/accessoires-1.webp" },
      { imageUrl: "/images/accessoires-1.webp" },
    ],
    sizes: ["ONE SIZE"],
    category: "accessories",
  },
];

const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450'><rect width='100%' height='100%' fill='#f3f4f6'/></svg>`
  );

/* ===========================
   UI helpers
=========================== */
function SoldOutTag({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute left-3 top-3 z-10 rounded bg-zinc-900/90 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white",
        className
      )}
    >
      SOLD OUT
    </div>
  );
}

function Ribbon({ label }: { label: string }) {
  return (
    <div className="absolute left-3 top-3 z-10 rounded bg-white px-2 py-0.5 text-[11px] font-normal tracking-widest text-black">
      {label}
    </div>
  );
}

// Vierkante swatch met dubbele rand bij selectie
function ColorDot({
  color,
  selected,
  onSelect,
}: {
  color: { name: string; hex: string };
  selected?: boolean;
  onSelect?: () => void;
}) {
  const isWhite = /^#(?:fff|ffffff)$/i.test(color.hex);
  return (
    <button
      type="button"
      title={color.name}
      aria-pressed={!!selected}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      className={cn(
        "box-content p-[2px] rounded-none transition",
        selected ? "border border-[#A7BEC1]" : "border border-transparent",
        "focus:outline-none focus:ring-1 focus:ring-zinc-300"
      )}
      style={{ lineHeight: 0 }}
    >
      <span
        className={cn(
          "block h-3 w-3 rounded-none",
          selected
            ? "border border-[#A7BEC1]"
            : isWhite
            ? "border border-zinc-300"
            : "border border-transparent"
        )}
        style={{ backgroundColor: color.hex }}
      />
    </button>
  );
}

/* ===========================
   Motion variants (hover + kleur wissel)
=========================== */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

/* ===========================
   Card
=========================== */
function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [direction, setDirection] = React.useState(1); // +1 vooruit, -1 terug
  const [hoveredSize, setHoveredSize] = React.useState<string | null>(null);

  const hasSale =
    typeof product.salePrice === "number" && product.salePrice < product.price;

  // Pak variant (kleur) of fallback naar default beelden
  const variant =
    product.variants?.[selectedColor] ??
    product.variants?.[0] ??
    ({
      imageUrl: product.imageUrl,
      hoverImageUrl: product.hoverImageUrl,
    } as const);

  const baseSrc = variant.imageUrl || product.imageUrl || PLACEHOLDER;
  const hoverSrc = variant.hoverImageUrl || product.hoverImageUrl || baseSrc;

  const onEnter = () => {
    setDirection(1);
    setHovered(true);
  };
  const onLeave = () => {
    setDirection(-1);
    setHovered(false);
  };

  const handleColorSelect = (i: number) => {
    setDirection(i > selectedColor ? 1 : -1);
    setSelectedColor(i);
  };

  const imageKey = `${selectedColor}-${hovered ? "hover" : "base"}`;

  return (
    <article className="group relative w-full">
      {/* Image area */}
      <div
        className="relative h-[280px] sm:h-[325px] md:h-[450px] lg:h-[375px] xl:h-[475px] 2xl:h-[525px] w-full overflow-hidden bg-zinc-100"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {typeof product.salePercent === "number" && product.salePercent > 0 ? (
          <Ribbon label={`-${product.salePercent}%`} />
        ) : null}

        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={imageKey}
            className="absolute inset-0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 420, damping: 34 },
              opacity: { duration: 0.18 },
            }}
          >
            <Image
              src={hovered ? hoverSrc : baseSrc}
              alt={product.name}
              width={1000}
              height={1000}
              sizes="(min-width: 1024px) 50vw, 50vw"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Size overlay (desktop) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-2 hidden w-full justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:flex">
          <div className="pointer-events-auto flex  text-black items-center gap-1 rounded-full bg-transparent px-3 py-1 pb-3 text-[10px] uppercase tracking-wide">
            {(product.sizes?.length
              ? product.sizes
              : ["XS", "S", "M", "L", "XL", "XXL"]
            ).map((s) => (
              <button
                key={s}
                type="button"
                onMouseEnter={() => setHoveredSize(s)}
                onMouseLeave={() => setHoveredSize((v) => (v === s ? null : v))}
                className={cn(
                  "px-1.5 transition",
                  hoveredSize === s && "font-semibold"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Cart button (mobile hover/tap) */}
        <div className="flex md:hidden">
          <button
            type="button"
            aria-label="Add to cart"
            className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-md bg-black text-white opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
            >
              <path
                d="M9.11953 3.07992V1H2.87976V3.07992"
                stroke="white"
                strokeWidth="0.5"
              ></path>
              <rect
                x="0.530151"
                y="3.33008"
                width="10.9396"
                height="10.4196"
                stroke="white"
                strokeWidth="0.5"
              ></rect>
            </svg>
          </button>
        </div>

        {/* SOLD OUT rechtsboven */}
        {product.soldOut ? (
          <SoldOutTag className="top-3 right-3 left-auto" />
        ) : null}
      </div>

      {/* Meta */}
      <div className="mt-3 px-1.5 flex w-full items-start justify-between gap-3">
        {/* Links: naam + prijs */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[10px] mt-0.5 uppercase font-light dark:text-white text-zinc-800">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2 text-[10px] tracking-wider">
            {hasSale ? (
              <>
                <span className="font-semibold text-rose-600 dark:text-white">
                  {euro.format(product.salePrice!)}
                </span>
                <span className="text-zinc-400 line-through">
                  {euro.format(product.price)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-zinc-800">
                {euro.format(product.price)}
              </span>
            )}
          </div>
          <div className="block md:hidden">
            {product.colors?.length ? (
              <div className="mt-3 ml-auto flex shrink-0 items-center gap-1">
                {product.colors.map((c, i) => (
                  <ColorDot
                    key={c.name + c.hex}
                    color={c}
                    selected={i === selectedColor}
                    onSelect={() => handleColorSelect(i)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Rechts: kleur-swatch(es) */}
        <div className="hidden md:flex">
          {product.colors?.length ? (
            <div className="mt-1 ml-auto flex shrink-0 items-center gap-2">
              {product.colors.map((c, i) => (
                <ColorDot
                  key={c.name + c.hex}
                  color={c}
                  selected={i === selectedColor}
                  onSelect={() => handleColorSelect(i)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/* ===========================
   Grid
=========================== */

export default function GridClothing({
  title = "Collection",
  products = PRODUCTS,
  categories = CATEGORIES,
}: {
  title?: string;
  products?: Product[];
  categories?: PillCategory[];
}) {
  const [sortOpen, setSortOpen] = React.useState(false);

  // welke categorie; undefined = ALLE
  const [activeCat, setActiveCat] = React.useState<
    undefined | Product["category"]
  >(undefined);

  // of "Show All" expliciet is aangeklikt (voor de kop-tekst)
  const [allMode, setAllMode] = React.useState(false);

  // filter
  const filtered = React.useMemo(
    () =>
      activeCat ? products.filter((p) => p.category === activeCat) : products,
    [activeCat, products]
  );

  // tellers
  const categoryCounts = React.useMemo(() => {
    const map: Partial<Record<Product["category"], number>> = {};
    for (const p of products) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, [products]);

  const itemsCount = filtered.length;
  const totalCount = products.length;

  // dynamische kop
  const activeLabel = activeCat
    ? categories.find((c) => c.id === activeCat)?.label
    : undefined;
  const computedTitle = activeCat
    ? activeLabel ?? title
    : allMode
    ? "Collection"
    : title;

  return (
    <section className="mx-auto px-2 sm:px-4 py-6 lg:px-8">
      {/* Category pills (toggle filter) */}
      <div className="no-scrollbar mb-6 sm:mb-10 -mx-1 flex w-full items-center justify-center gap-6 overflow-x-auto pb-1">
        {/* bestaande categorieën */}
        {categories.map((c) => {
          const selected = activeCat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                // opnieuw op dezelfde categorie: reset naar ALL (geen allMode)
                if (selected) {
                  setActiveCat(undefined);
                  setAllMode(false);
                } else {
                  setActiveCat(c.id);
                  setAllMode(false);
                }
              }}
              aria-pressed={selected}
              className={cn(
                "group inline-flex min-w-[86px] flex-col items-center gap-2 focus:outline-none"
              )}
              title={c.label}
            >
              <span
                className={cn(
                  "flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border bg-white shadow-sm",
                  selected ? "border-zinc-900" : "border-zinc-200"
                )}
              >
                <Image
                  src={c.imageUrl || PLACEHOLDER}
                  alt={c.label}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </span>
              <span
                className={cn(
                  "text-center text-[12px]",
                  selected ? "text-zinc-900 font-semibold" : "text-zinc-700"
                )}
              >
                {c.label}{" "}
                <span className="text-zinc-400">
                  {categoryCounts[c.id] ?? c.count}
                </span>
              </span>
            </button>
          );
        })}

        {/* ★ NIEUW: Show All pill */}
        <button
          onClick={() => {
            setActiveCat(undefined);
            setAllMode(true); // zodat de kop "Collection" toont
          }}
          aria-pressed={allMode && activeCat === undefined}
          className={cn(
            "group inline-flex min-w-[86px] flex-col items-center gap-2 focus:outline-none"
          )}
          title="Show All"
        >
          <span
            className={cn(
              "flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border bg-white shadow-sm",
              allMode && activeCat === undefined
                ? "border-zinc-900"
                : "border-zinc-200"
            )}
          >
            {/* kleine ALL indicatie in de cirkel */}
            <span className="text-[11px] font-semibold tracking-wide text-zinc-700">
              ALL
            </span>
          </span>
          <span
            className={cn(
              "text-center text-[12px]",
              allMode && activeCat === undefined
                ? "text-zinc-900 font-semibold"
                : "text-zinc-700"
            )}
          >
            Collection <span className="text-zinc-400">{totalCount}</span>
          </span>
        </button>
      </div>

      {/* Heading met dynamische titel + count */}
      <div className="mb-4 sm:mb-8 flex items-center justify-between">
        <h2 className="text-2xl tracking-normal font-semibold text-zinc-900 dark:text-white">
          {computedTitle} <span className="mx-2 text-zinc-300">•</span>
          <span className="text-base font-medium text-zinc-500">
            {itemsCount} ITEMS
          </span>
        </h2>
      </div>

      {/* Grid: mobile altijd 2 kolommen, minimale space; groter → 4 kolommen */}
      <div className="grid grid-cols-2 gap-x-0.5 md:gap-x-1.5 gap-y-10 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* (optioneel) mock sort-modal — styling ongewijzigd */}
      {sortOpen ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filter & Sort</h3>
              <button
                className="rounded-md p-2 hover:bg-zinc-100"
                onClick={() => setSortOpen(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-zinc-600">
              Deze panel is een placeholder zodat de component exact dezelfde
              UI-voels geeft als de screenshot. Vervang dit gerust met je eigen
              logica/filters.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                onClick={() => setSortOpen(false)}
              >
                Klaar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
