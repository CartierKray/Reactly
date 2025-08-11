/* eslint-disable @next/next/no-img-element */
"use client";

import { Key, useEffect, useState } from "react";
import Image from "next/image";
import { ProductGridItem } from "../ProductGrid/ProductGrid";

/** Default dataset voor Template Grid (andere namen/prijzen) */
export const templateGridItems: ProductGridItem[] = [
  {
    title: "Orbit",
    items: 1,
    price: 49,
    oldPrice: 69,
    image: "/images/template-1.webp",
    description: "Clean, conversion-focused template met modulair design.",
  },
  {
    title: "Pulse",
    items: 1,
    price: 39,
    oldPrice: 59,
    image: "/images/template-2.webp",
    description: "Strakke sections, snelle setup en responsive out-of-the-box.",
  },
  {
    title: "Vertex",
    items: 1,
    price: 59,
    oldPrice: 79,
    image: "/images/template-1.webp",
    description: "Premium layout met pricing, FAQs en testimonial blocks.",
  },
  // (voeg gerust meer items toe)
];

export default function TemplateGrid({
  items = templateGridItems,
}: {
  items?: ProductGridItem[];
}) {
  // Winkelwagen + modal
  const [cart, setCart] = useState<ProductGridItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  // Escape om modal te sluiten
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const addToCart = (item: ProductGridItem) => {
    setCart((prev) => [...prev, item]);
    setEmail("");
    setIsOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // ➕ All Access product (wordt gebruikt in de modal-link)
  const addAllAccess = () => {
    const allAccess: ProductGridItem = {
      title: "All Access",
      items: 1,
      price: 249,
      oldPrice: 349, // voldoet aan ProductGridItem
      image: "/svg/reactlyallaccess.svg",
      description: "Toegang tot alle huidige en toekomstige templates.",
    };
    // "in plaats daarvan" → vervang huidige cart met All Access
    setCart([allAccess]);
    setEmail("");
    setIsOpen(true);
  };

  const itemCount = cart.length;
  const total = cart.reduce((sum, it) => sum + (it.price || 0), 0);
  const hasAllAccess = cart.some((it) => it.title === "All Access");

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(
          (component: ProductGridItem, idx: Key | null | undefined) => (
            <div
              key={idx}
              className="bg-[#f0f0f0] dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300 border border-black/10 dark:border-white/5"
            >
              <div className="relative aspect-[5/3]">
                <Image
                  src={component.image}
                  alt={component.title}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-4">
                <div className="flex mt-2.5 justify-between items-center mb-2">
                  <h3 className="text-black dark:text-white font-medium text-base">
                    {component.title}
                    <span className="text-[10px] dark:bg-[#444] px-1.5 py-0.5 rounded-3xl border border-[#707070] ml-1 w-full">
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

                <p className="text-xs py-3 mb-2 max-w-[300px] text-black/50 dark:text-white/60">
                  {component.description}
                </p>

                {/* CTA button */}
                <button
                  className="mt-1 inline-flex items-center mb-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-xs font-medium shadow"
                  type="button"
                  onClick={() => addToCart(component)}
                >
                  Add to cart €{component.price}
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-[4px]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-[92vw] max-w-[460px] rounded-2xl bg-[#121212] text-white shadow-2xl border border-white/5"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Header: product row(s) */}
            <div className="p-5 pb-4 border-b border-none">
              {itemCount === 0 ? (
                <p className="text-center text-white/70 text-sm">
                  Geen items in je winkelwagen.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {cart.map((selected, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative h-32 w-36 overflow-hidden rounded-md border border-white/10 shrink-0">
                        <Image
                          src={selected.image}
                          alt={selected.title}
                          fill
                          className={
                            selected.title === "All Access"
                              ? "object-contain"
                              : "object-cover"
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-[16px] font-medium flex items-center">
                          {selected.title}
                          {selected.title === "All Access" && (
                            <a
                              href="/prijzen#all-access"
                              target="_blank"
                              className="ml-2 inline-flex items-center justify-center h-4 w-4 rounded-full border border-white/30 text-[10px] leading-none"
                              aria-label="Meer info over All Access"
                              title="Meer info"
                            >
                              i
                            </a>
                          )}
                        </div>
                        <div className="text-[16px] text-white/70">
                          €{selected.price}
                        </div>
                      </div>
                      {/* trash / remove */}
                      <button
                        className="text-white/60 hover:text-white transition text-sm"
                        onClick={() => removeFromCart(index)}
                        aria-label="Remove from cart"
                        title="Remove"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M4 7l16 0"></path>
                          <path d="M10 11l0 6"></path>
                          <path d="M14 11l0 6"></path>
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="px-5 text-center pt-4  pb-5">
              <div className="py-5">
                {itemCount > 0 ? (
                  <p className="text-[15px] text-white/90">
                    Je betaalt in totaal{" "}
                    <span className="font-semibold">€{total}</span> voor{" "}
                    <span className="font-semibold">
                      {itemCount === 1 ? "1 product" : `€{itemCount} producten`}
                    </span>
                    .
                  </p>
                ) : (
                  <p className="text-[15px] text-white/90">
                    Je hebt geen producten geselecteerd.
                  </p>
                )}

                {!hasAllAccess && (
                  <div className="text-sm mt-2">
                    In plaats daarvan&nbsp;
                    <button
                      type="button"
                      className="font-semibold hover:underline"
                      onClick={addAllAccess}
                    >
                      All Access
                    </button>
                    &nbsp;kopen ?
                  </div>
                )}
              </div>

              <div className="mt-4 pb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-md bg-black/40 border  border-white/10 px-3 py-2 text-[13px] placeholder-white/60 outline-none focus:ring-2 focus:ring-white/20"
                />
                <p className="text-[11px] text-white/50 mt-3.5">
                  The above email will be used to create your account. You will
                  be redirected to Stripe to complete your purchase.
                </p>
              </div>

              <button
                type="button"
                className="mt-4 px-14 rounded-lg bg-[#2a2a2a] hover:bg-[#333] text-white text-sm font-medium py-2.5 transition disabled:opacity-40 disabled:cursor-not-allowed"
                // TODO: hier later Stripe redirect starten
                onClick={() => {
                  // tijdelijk close; vervang met Stripe flow later
                  setIsOpen(false);
                }}
                disabled={itemCount === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
