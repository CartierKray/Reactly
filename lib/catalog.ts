// lib/catalog.ts
// ❗ Laat dit een server-safe module blijven (geen "use client")

/* ===========================
   Types
=========================== */
export type Product = {
  id: string;
  name: string;
  subtitle?: string;

  // default beelden (back-compat)
  imageUrl: string;
  hoverImageUrl?: string;

  // Algemene galerij (optioneel)
  gallery?: string[];

  // Variants per kleur (optioneel)
  variants?: Array<{
    // Meerdere beelden per variant (optioneel)
    images?: string[];

    // Back-compat velden
    imageUrl?: string;
    hoverImageUrl?: string;
  }>;

  price: number;
  salePrice?: number;
  salePercent?: number;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  soldOut?: boolean;

  category: "men" | "women" | "tops" | "bottoms" | "accessories";
};

export type PillCategory = {
  id: Product["category"];
  label: string;
  count: number;
  imageUrl?: string;
};

/* ===========================
   UI constants
=========================== */
// Achtergrond van de image-tile (matcht je referentie-afbeelding)
export const TILE_BG_HEX = "#f0f0f0";

// Placeholder
export const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450'><rect width='100%' height='100%' fill='${TILE_BG_HEX}'/></svg>`
  );

// EUR formatter
export const euro = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

/* ===========================
   Demo data
=========================== */
export const CATEGORIES: PillCategory[] = [
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

export const PRODUCTS: Product[] = [
  {
    id: "meru",
    name: "Brown Meru Vintage Leather Bag",
    imageUrl: "/images/hoodie-1.webp",
    hoverImageUrl: "/images/top-1.jpg",
    // Extra beelden voor PDP (algemene galerij)
    gallery: [
      "/images/hoodie-1.webp",
      "/images/top-1.jpg",
      "/images/jacket-1.webp",
    ],
    // Per variant extra beelden (optioneel)
    variants: [
      {
        images: [
          "/images/hoodie-1.webp",
          "/images/top-1.jpg",
          "/images/jacket-1.webp",
        ],
      },
      {
        images: [
          "/images/jacket-1.webp",
          "/images/top-1.jpg",
          "/images/hoodie-1.webp",
        ],
      },
    ],
    price: 239.95,
    salePrice: 168.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },
      { name: "Black", hex: "#999999" },
    ],
    soldOut: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "men",
  },
  {
    id: "myshus",
    name: "Dark Brown MYSHUS Monogram Bag",
    imageUrl: "/images/shirt-2.webp",
    hoverImageUrl: "/images/top-1.jpg",
    variants: [
      {
        images: [
          "/images/shirt-2.webp",
          "/images/top-1.jpg",
          "/images/shirt-2.webp",
        ],
      },
    ],
    price: 159.95,
    salePrice: 79.95,
    salePercent: 50,
    colors: [{ name: "Oxide", hex: "#6B6B6B" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "tops",
  },
  {
    id: "emb-mono",
    name: "Black MERU EMB Monogram",
    imageUrl: "/images/short-1.webp",
    hoverImageUrl: "/images/short-2.webp",
    variants: [
      {
        images: [
          "/images/short-1.webp",
          "/images/short-2.webp",
          "/images/short-3.webp",
        ],
      },
      {
        images: [
          "/images/short-2.webp",
          "/images/short-1.webp",
          "/images/short-3.webp",
        ],
      },
    ],
    price: 119.95,
    salePrice: 84.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },
      { name: "Black", hex: "#999999" },
      { name: "Brown", hex: "#5E4A3B" },
      { name: "Oxide", hex: "#6B6B6B" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "bottoms",
  },
  {
    id: "white-may",
    name: "White MAY Monogram Bag",
    imageUrl: "/images/accessoires-1.webp",
    hoverImageUrl: "/images/accessoires-1.webp",
    variants: [{ images: ["/images/accessoires-1.webp"] }],
    price: 109.95,
    salePrice: 54.95,
    salePercent: 50,
    colors: [
      { name: "Black", hex: "#999999" },
      { name: "Oxide", hex: "#6B6B6B" },
    ],
    sizes: ["ONE SIZE"],
    category: "accessories",
  },
  {
    id: "meru-2",
    name: "Brown Meru Vintage Leather Bag",
    imageUrl: "/images/woman-1.webp",
    hoverImageUrl: "/images/top-1.jpg",
    gallery: [
      "/images/woman-1.jpg",
      "/images/woman-1.webp",
      "/images/top-1.jpg",
    ],
    variants: [
      {
        images: [
          "/images/woman-1.webp",
          "/images/top-1.jpg",
          "/images/jacket-1.webp",
        ],
      },
      {
        images: [
          "/images/jacket-1.webp",
          "/images/top-1.jpg",
          "/images/woman-1.webp",
        ],
      },
    ],
    price: 239.95,
    salePrice: 168.95,
    salePercent: 30,
    colors: [
      { name: "Grey", hex: "#424242" },
      { name: "Brown", hex: "#5E4A3B" },
    ],
    soldOut: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "women",
  },
];
