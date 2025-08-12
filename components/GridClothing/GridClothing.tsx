"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import {
  euro,
  PRODUCTS,
  CATEGORIES,
  PLACEHOLDER,
  Product,
  PillCategory,
} from "@/lib/catalog";
import { ColorDot } from "@/components/ui/ColorDot";

// utility
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Ribbon({ label }: { label: string }) {
  return (
    <div className="absolute left-2 top-2 z-10 bg-white px-2 py-0.5 text-[11px] font-normal tracking-widest text-black">
      {label}
    </div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [direction, setDirection] = React.useState(1);
  const [hoveredSize, setHoveredSize] = React.useState<string | null>(null);

  const hasSale =
    typeof product.salePrice === "number" && product.salePrice < product.price;

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

  const handleOpenDetail = () => {
    // navigeer naar detail mét de gekozen variant
    router.push(`/product/${product.id}?variant=${selectedColor}`);
  };

  const imageKey = `${selectedColor}-${hovered ? "hover" : "base"}`;

  return (
    <article
      className="group relative w-full cursor-pointer"
      onClick={handleOpenDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOpenDetail();
      }}
    >
      {/* Image area */}
      <div
        className="relative h-[280px] sm:h-[325px] md:h-[450px] lg:h-[375px] xl:h-[475px] 2xl:h-[525px] w-full overflow-hidden bg-zinc-100 "
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
          <div className="pointer-events-auto flex text-black items-center gap-1 rounded-full bg-transparent px-3 py-1 pb-3 text-[10px] uppercase tracking-wide">
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDetail();
                }}
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
              handleOpenDetail();
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
      </div>

      {/* Meta */}
      <div
        className="mt-3 px-1.5 flex w-full items-start justify-between gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Links: naam + prijs */}
        <div className="min-w-0 flex-1" onClick={handleOpenDetail}>
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

          {/* Mobile color swatches */}
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

        {/* Desktop color swatches */}
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

export default function GridClothing({
  title = "ALL",
  products = PRODUCTS,
  categories = CATEGORIES,
}: {
  title?: string;
  products?: Product[];
  categories?: PillCategory[];
}) {
  // actieve categorie (undefined = alle)
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
    ? "ALL"
    : title;

  return (
    <section className="mx-auto py-6 lg:px-1.5">
      {/* Category pills */}
      {/* <div className="no-scrollbar mb-6 sm:mb-10 -mx-1 flex w-full items-center justify-center gap-6 overflow-x-auto pb-1">
        {categories.map((c) => {
          const selected = activeCat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
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
      </div> */}

      {/* Heading */}
      <div className="mb-4 px-2  sm:mb-8 flex items-center justify-between">
        <div className="">
          <h2 className="text-2xl tracking-normal font-semibold text-zinc-900 dark:text-white">
            {computedTitle} <span className="mx-2 text-zinc-300">•</span>
            <span className="text-base font-medium text-zinc-500">
              {itemsCount} ITEMS
            </span>
          </h2>
        </div>
        <div>
          <button className="bg-[#f0f0f0] uppercase text-black outline outline-[1px] text-[11px] outline-zinc-300 px-4 py-2">
            Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-0.5 md:gap-x-1.5 gap-y-10 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
