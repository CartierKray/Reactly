/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";

export interface ProductGridItem {
  title: string;
  items: number;
  price: number;
  oldPrice: number;
  image: string;
  description: string;
}

/** ← Zet je datasets hier en exporteer ze */
export const templateItems: ProductGridItem[] = [
  {
    title: "SaaS Landing – Nova",
    items: 1,
    price: 29,
    oldPrice: 39,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description: "High-converting SaaS landing met sections, pricing en FAQs.",
  },
  {
    title: "Portfolio – Minimal",
    items: 1,
    price: 19,
    oldPrice: 29,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description: "Clean portfolio template met case grid, about en contact.",
  },
  {
    title: "Agency – Grid",
    items: 1,
    price: 24,
    oldPrice: 34,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description:
      "Agency layout met hero, services, work, testimonials en contact.",
  },
];

export const appItems: ProductGridItem[] = [
  {
    title: "Hero Sections",
    items: 9,
    price: 12,
    oldPrice: 18,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description: "A collection of hero sections that are modern and stand out",
  },
  {
    title: "Logo Clouds",
    items: 3,
    price: 10,
    oldPrice: 16,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description:
      "A collection of logo clouds with micro interactions and minimal animations",
  },
  {
    title: "Feature Sections",
    items: 4,
    price: 9,
    oldPrice: 14,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description:
      "A set of feature sections ranging from bento grids to simple layouts",
  },
  {
    title: "Backgrounds",
    items: 8,
    price: 9,
    oldPrice: 15,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description: "A set of beautiful, creative backgrounds for landing pages",
  },
  {
    title: "Bento Grids",
    items: 3,
    price: 12,
    oldPrice: 18,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description: "A set of bento grids for various use cases",
  },
  {
    title: "Blog Content Sections",
    items: 2,
    price: 9,
    oldPrice: 15,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description: "Content sections for your single blog posts",
  },
  {
    title: "Hero Sections",
    items: 9,
    price: 12,
    oldPrice: 18,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description: "A collection of hero sections that are modern and stand out",
  },
  {
    title: "Logo Clouds",
    items: 3,
    price: 10,
    oldPrice: 16,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description:
      "A collection of logo clouds with micro interactions and minimal animations",
  },
  {
    title: "Feature Sections",
    items: 4,
    price: 9,
    oldPrice: 14,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description:
      "A set of feature sections ranging from bento grids to simple layouts",
  },
  {
    title: "Backgrounds",
    items: 8,
    price: 9,
    oldPrice: 15,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description: "A set of beautiful, creative backgrounds for landing pages",
  },
  {
    title: "Bento Grids",
    items: 3,
    price: 12,
    oldPrice: 18,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description: "A set of bento grids for various use cases",
  },
  {
    title: "Blog Content Sections",
    items: 2,
    price: 9,
    oldPrice: 15,
    image: "/images/5_other_image_17355647422135117692.jpg",
    description: "Content sections for your single blog posts",
  },
  // (voeg gerust meer items toe zoals in je eerdere lijst)
];

export default function ProductGrid({ items }: { items: ProductGridItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((component, idx) => (
        <div
          key={idx}
          className="bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300 border border-black/10 dark:border-white/5"
        >
          <div className="relative aspect-[5/3]">
            <Image
              src={component.image}
              alt={component.title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="p-4">
            <div className="flex mt-2.5 justify-between items-center mb-2">
              <h3 className="text-black dark:text-white font-medium text-base">
                {component.title}
                <span className="text-[10px] dark:bg-[#444] px-1 py-0.5 rounded-3xl border border-[#707070] ml-1">
                  {component.items}
                </span>
              </h3>
              <div className="text-sm space-x-1 text-right">
                <span className="line-through text-[12px] text-black/40 dark:text-white/40 mr-1">
                  €{component.oldPrice}
                </span>
                <span className="text-black dark:text-white">
                  €{component.price}
                </span>
              </div>
            </div>
            <p className="text-xs py-3 max-w-[300px] text-black/50 dark:text-white/60">
              {component.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
