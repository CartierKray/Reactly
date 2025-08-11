"use client";

import * as React from "react";
import Image from "next/image";

// Utility: join Tailwind classes conditionally
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Currency formatter (EUR, Dutch locale)
const euro = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

// Types
export type Product = {
  id: string;
  name: string;
  subtitle?: string;
  imageUrl: string;
  price: number; // original price
  salePrice?: number; // discounted price
  salePercent?: number; // e.g. 50 for -50%
  colors?: { name: string; hex: string }[];
  soldOut?: boolean;
};

export type PillCategory = {
  id: string;
  label: string;
  count: number;
  imageUrl?: string;
};

// Demo data that mimics the screenshot. Replace with real CMS data.
const CATEGORIES: PillCategory[] = [
  {
    id: "men",
    label: "Men",
    count: 243,
    imageUrl: "/images/shirt-1.webp",
  },
  {
    id: "women",
    label: "Women",
    count: 177,
    imageUrl: "/images/woman-1.webp",
  },
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
    price: 239.95,
    salePrice: 168.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },
      { name: "Black", hex: "#999999" },
    ],
    soldOut: true,
  },
  {
    id: "myshus",
    name: "Dark Brown MYSHUS Monogram Bag",
    imageUrl: "/images/shirt-2.webp",
    price: 159.95,
    salePrice: 79.95,
    salePercent: 50,
    colors: [{ name: "Oxide", hex: "#6B6B6B" }],
  },
  {
    id: "emb-mono",
    name: "Black MERU EMB Monogram",
    imageUrl: "/images/short-1.webp",
    price: 119.95,
    salePrice: 84.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },
      { name: "Black", hex: "#999999" },
      { name: "Brown", hex: "#5E4A3B" },
      { name: "Oxide", hex: "#6B6B6B" },
    ],
  },
  {
    id: "white-may",
    name: "White MAY Monogram Bag",
    imageUrl: "/images/accessoires-1.webp",
    price: 109.95,
    salePrice: 54.95,
    salePercent: 50,
    colors: [
      { name: "Black", hex: "#999999" },
      { name: "Oxide", hex: "#6B6B6B" },
    ],
  },
  {
    id: "meru",
    name: "Brown Meru Vintage Leather Bag",
    imageUrl: "/images/hoodie-1.webp",
    price: 239.95,
    salePrice: 168.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },

      { name: "Brown", hex: "#5E4A3B" },
    ],
    soldOut: true,
  },
  {
    id: "myshus",
    name: "Dark Brown MYSHUS Monogram Bag",
    imageUrl: "/images/shirt-2.webp",
    price: 159.95,
    salePrice: 79.95,
    salePercent: 50,
    colors: [],
  },
  {
    id: "emb-mono",
    name: "Black MERU EMB Monogram",
    imageUrl: "/images/short-1.webp",
    price: 119.95,
    salePrice: 84.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },
      { name: "Oxide", hex: "#6B6B6B" },
    ],
  },
  {
    id: "white-may",
    name: "White MAY Monogram Bag",
    imageUrl: "/images/accessoires-1.webp",
    price: 109.95,
    salePrice: 54.95,
    salePercent: 50,
    colors: [{ name: "Black", hex: "#999999" }],
  },
];

// A minimal placeholder image (light gray)
const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450'><rect width='100%' height='100%' fill='#f3f4f6'/></svg>`
  );

// Bookmark (wishlist) button
function BookmarkButton({
  initial = false,
  className,
}: {
  initial?: boolean;
  className?: string;
}) {
  const [active, setActive] = React.useState(initial);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.stopPropagation();
        setActive((v) => !v);
      }}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white shadow-sm transition hover:shadow",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-4 w-4 text-zinc-900"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.5 4.75A2.75 2.75 0 0 1 8.25 2h7.5A2.75 2.75 0 0 1 18.5 4.75v16.2a.55.55 0 0 1-.87.44L12 17.5l-5.63 3.9a.55.55 0 0 1-.87-.44z"
        />
      </svg>
    </button>
  );
}

// Color dot
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
        // buitenkader (zorgt voor de buitenste rand als 'selected')
        "box-content p-[2px] rounded-none transition",
        selected ? "border border-[#A7BEC1]" : "border border-transparent",
        "focus:outline-none focus:ring-1 focus:ring-zinc-300"
      )}
      style={{ lineHeight: 0 }}
    >
      <span
        className={cn(
          // het eigenlijke kleurvlak
          "block h-3 w-3 rounded-none",
          selected
            ? "border border-[#A7BEC1]" // binnenrand bij selectie
            : isWhite
            ? "border border-zinc-300" // wit/heel licht: subtiele rand
            : "border border-transparent"
        )}
        style={{ backgroundColor: color.hex }}
      />
    </button>
  );
}

function Ribbon({ label }: { label: string }) {
  return (
    <div className="absolute left-3 top-3 z-10 rounded bg-zinc-900 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white">
      {label}
    </div>
  );
}

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

function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = React.useState(0);
  const hasSale =
    typeof product.salePrice === "number" && product.salePrice < product.price;
  return (
    <article className="group w-full relative">
      {/* Image area */}
      <div className="relative h-[500px] w-full overflow-hidden rounded bg-zinc-100">
        {/* {product.salePercent ? (
          <Ribbon label={`-${product.salePercent}%`} />
        ) : null} */}

        <Image
          src={product.imageUrl || PLACEHOLDER}
          alt={product.name}
          width={1000}
          height={1000}
          sizes="(min-width: 1024px) 50vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {product.soldOut ? (
          <SoldOutTag className="top-3 right-3 left-auto" />
        ) : null}
      </div>

      {/* Meta */}
      <div className="mt-3 w-full flex items-start justify-between gap-3">
        {/* Linker kant: naam + prijs */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[10px] uppercase font-light text-zinc-800">
            {product.name}
          </h3>

          <div className="mt-2 flex items-baseline gap-2 text-[10px] tracking-wider">
            {hasSale ? (
              <>
                <span className="font-semibold text-rose-600">
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
        </div>

        {/* Rechter kant: kleurbolletjes */}
        {product.colors?.length ? (
          <div className="mt-1 ml-auto shrink-0 flex items-center gap-2">
            {product.colors.map((c, i) => (
              <ColorDot
                key={c.name + c.hex}
                color={c}
                selected={i === selectedColor}
                onSelect={() => setSelectedColor(i)}
              />
            ))}
          </div>
        ) : null}

        {/* Optioneel: wishlist naast de kleuren */}
        {/* <BookmarkButton className="shrink-0" /> */}
      </div>
    </article>
  );
}

export default function GridClothing({
  title = "SALE ACCESSORIES",
  total = 29,
  products = PRODUCTS,
  categories = CATEGORIES,
}: {
  title?: string;
  total?: number;
  products?: Product[];
  categories?: PillCategory[];
}) {
  const [sortOpen, setSortOpen] = React.useState(false);

  return (
    <section className="mx-auto px-4 py-6 lg:px-8">
      {/* Category pills */}
      <div className="no-scrollbar mb-10 lg:mb-20 -mx-1 flex gap-6 w-full justify-center items-center overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            className="group inline-flex min-w-[86px] flex-col items-center gap-2"
          >
            <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm">
              <Image
                src={c.imageUrl || PLACEHOLDER}
                alt={c.label}
                width={64}
                height={64}
                className="object-cover"
              />
            </span>
            <span className="text-center text-[12px] text-zinc-700">
              {c.label} <span className="text-zinc-400">{c.count}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Heading + filter */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl  font-extrabold tracking-tight text-zinc-900">
          {title} <span className="mx-2 text-zinc-300">•</span>
          <span className="text-base font-medium text-zinc-500">
            {total} ITEMS
          </span>
        </h2>
        {/* <button
          type="button"
          onClick={() => setSortOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" d="M3 6h18M6 12h12M10 18h4" />
          </svg>
          FILTER AND SORT
        </button> */}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Simple mock panel to match the feel; replace with a real drawer/modal */}
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

// Tailwind helpers (optional): hide native scrollbar for the category row
// Add this to your globals if you prefer a utility class instead:
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
