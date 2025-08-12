"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import NavbarNewSix from "../Navbar/NavbarSix";
import { ColorDot } from "@/components/ui/ColorDot";
import { euro, PLACEHOLDER, Product, TILE_BG_HEX } from "@/lib/catalog";

/* Motion */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

/* Utils */
const cn = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

function Ribbon({ label }: { label: string }) {
  return (
    <div className="absolute left-2 top-2 z-10 bg-white px-2 py-0.5 text-[11px] font-medium tracking-widest text-black">
      {label}
    </div>
  );
}
function SoldOutTag({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute left-3 top-3 z-10 rounded bg-white px-2 py-0.5 text-[11px] font-medium tracking-wide text-black",
        className
      )}
    >
      SOLD OUT
    </div>
  );
}

/* Mobile swiper (scroll-snap) */
function MobileGallery({ images, alt }: { images: string[]; alt: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setI(Math.max(0, Math.min(images.length - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [images.length]);

  return (
    <div className="md:hidden">
      <div
        ref={ref}
        className="relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{
          WebkitOverflowScrolling: "touch",
          backgroundColor: TILE_BG_HEX,
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {images.map((src, k) => (
          <div
            key={src + k}
            className="relative min-w-full h-[92vw] snap-start overflow-hidden"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain p-6"
              sizes="100vw"
              priority={k === 0}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-center gap-2">
        {images.map((_, d) => (
          <span
            key={d}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              d === i ? "bg-zinc-900" : "bg-zinc-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* Info carousel (auto) */
const INFO_SLIDES = [
  "Free shipping on all orders in The Netherlands!",
  "Easy returns via our Portal. You have up to 14 days to return your order.",
  "Secure payment with iDeal, Paypal, Visa, Mastercard, American Express, Bancontact",
];

function InfoCarousel() {
  const [i, setI] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const len = INFO_SLIDES.length;

  React.useEffect(() => {
    if (hover) return;
    const id = setInterval(() => setI((v) => (v + 1) % len), 3800);
    return () => clearInterval(id);
  }, [hover, len]);

  return (
    <div
      className="mt-8 select-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => setI((v) => (v - 1 + len) % len)}
          aria-label="Prev"
          className="rounded p-2 hover:bg-zinc-100"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex min-h-[40px] flex-1 items-center justify-center px-3 text-center text-[10px] font-light leading-5 text-zinc-700">
          {INFO_SLIDES[i]}
        </div>
        <button
          onClick={() => setI((v) => (v + 1) % len)}
          aria-label="Next"
          className="rounded p-2 hover:bg-zinc-100"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <div className="mt-2 flex items-center justify-center gap-2">
        {Array.from({ length: len }).map((_, d) => (
          <span
            key={d}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              d === i ? "bg-zinc-800" : "bg-zinc-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* Main */
export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const sp = useSearchParams();
  const initVariant = Math.max(0, parseInt(sp.get("variant") || "0", 10) || 0);

  const [selectedColor, setSelectedColor] = React.useState(initVariant);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null); // <- FIXED
  const [direction, setDirection] = React.useState(1);
  const [dexIdx, setDexIdx] = React.useState(0);

  const hasSale =
    typeof product.salePrice === "number" && product.salePrice < product.price;

  const variant =
    product.variants?.[selectedColor] ?? product.variants?.[0] ?? undefined;

  // Build gallery (variant > product.gallery > legacy fields); dedup
  const images = React.useMemo(() => {
    const out: string[] = [];
    const vAny = variant as any;
    const pAny = product as any;
    if (vAny?.images?.length) out.push(...(vAny.images as string[]));
    if (pAny?.gallery?.length) out.push(...(pAny.gallery as string[]));
    if (variant?.imageUrl) out.push(variant.imageUrl as string);
    if (variant?.hoverImageUrl) out.push(variant.hoverImageUrl as string);
    if (product.imageUrl) out.push(product.imageUrl);
    if (product.hoverImageUrl) out.push(product.hoverImageUrl);
    return Array.from(new Set(out)).slice(0, 12);
  }, [variant, product]);

  const handleColorSelect = (i: number) => {
    setDirection(i > selectedColor ? 1 : -1);
    setSelectedColor(i);
    setDexIdx(0);
    const url = new URL(window.location.href);
    url.searchParams.set("variant", String(i));
    router.replace(url.toString(), { scroll: false });
  };

  const sizes = product.sizes?.length
    ? product.sizes
    : ["XS", "S", "M", "L", "XL", "XXL"];
  const canBuy = !product.soldOut && !!selectedSize;

  const goPrev = () =>
    setDexIdx((v) => (v - 1 + images.length) % images.length);
  const goNext = () => setDexIdx((v) => (v + 1) % images.length);

  return (
    <>
      <NavbarNewSix />

      <section className="mx-auto w-full pt-20">
        {/* terug */}
        {/* <button
          type="button"
          onClick={() => router.back()}
          className="mb-3 inline-flex ml-4 bg-zinc-100 px-2 py-2 outline outline-[1px] outline-zinc-300 items-center gap-2 text-[10px] text-zinc-700 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Terug
        </button> */}

        <div className="grid gap-y-10 gap-x-12 md:grid-cols-[minmax(0,1fr)_500px] xl:grid-cols-[minmax(0,1fr)_675px]">
          {/* LEFT: desktop gallery + mobile swiper */}
          <div className="">
            <div
              className="relative hidden md:block h-[88vh] overflow-hidden"
              style={{ backgroundColor: TILE_BG_HEX }}
            >
              {typeof product.salePercent === "number" &&
              product.salePercent > 0 ? (
                <Ribbon label={`-${product.salePercent}%`} />
              ) : null}
              {product.soldOut ? (
                <SoldOutTag className="right-3 left-auto" />
              ) : null}

              <AnimatePresence
                custom={direction}
                initial={false}
                mode="popLayout"
              >
                <motion.div
                  key={`${selectedColor}-${dexIdx}`}
                  className="absolute inset-0"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 360, damping: 40 },
                    opacity: { duration: 0.24 },
                  }}
                >
                  <Image
                    src={images[dexIdx] || PLACEHOLDER}
                    alt={product.name}
                    fill
                    className="object-contain p-10 lg:p-14"
                    sizes="60vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    aria-label="Vorige"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Volgende"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                  <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                    {images.map((_, d) => (
                      <span
                        key={d}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          d === dexIdx ? "bg-zinc-900" : "bg-zinc-300"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile swiper */}
            <MobileGallery images={images} alt={product.name} />
          </div>

          {/* RIGHT: meta */}
          <aside className="w-full mx-auto md:mx-0 lg:mx-auto max-w-[440px] pt-10 md:pl-6 lg:pl-0 lg:justify-self-end">
            <h1 className="text-[20px] uppercase font-[550] tracking-wider text-zinc-900">
              {product.name}
            </h1>

            <div className="mt-2 flex items-baseline font-normal gap-3 text-[12px]">
              {hasSale ? (
                <>
                  <span className="text-zinc-900 line-through">
                    {euro.format(product.price)}
                  </span>
                  <span className="text-rose-600">
                    {euro.format(product.salePrice!)}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-zinc-900">
                  {euro.format(product.price)}
                </span>
              )}
            </div>

            {/* Color */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-normal text-zinc-900">
                  Color
                </div>
                {product.colors?.length ? (
                  <div className="flex items-center gap-3">
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
              <hr className="mt-4 border-zinc-200" />
            </div>

            {/* Size */}
            <div className="mt-4">
              <div className="text-[13px] font-normal text-zinc-900">Size</div>
              <div className="mt-4 grid grid-cols-6 gap-2 w-fit max-[380px]:grid-cols-3 sm:grid-cols-6">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      setSelectedSize((prev: string | null) =>
                        prev === s ? null : s
                      )
                    }
                    className={cn(
                      "p-2.5 border text-[12px] transition-colors",
                      selectedSize === s
                        ? "border-zinc-900"
                        : "border-zinc-200 hover:border-zinc-400"
                    )}
                    aria-pressed={selectedSize === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[10px] font-light text-zinc-500">
                This model is 190 cm/ 6&apos;3” tall and wearing a size Medium.
              </p>
              <hr className="mt-6 border-zinc-200" />
            </div>

            {/* CTA — enabled after size */}
            <div className="mt-6">
              <button
                className={cn(
                  "h-9 w-full text-[10px] font-normal tracking-wide text-white",
                  !product.soldOut && selectedSize
                    ? "bg-zinc-600"
                    : "bg-zinc-400 cursor-not-allowed"
                )}
                disabled={!(!product.soldOut && selectedSize)}
                onClick={() =>
                  alert(
                    `Added: ${product.name}${
                      selectedSize ? ` (${selectedSize})` : ""
                    }`
                  )
                }
              >
                ADD TO CART
              </button>
            </div>

            {/* Beschrijving */}
            <div className="mt-5 space-y-3 text-[10px] font-light leading-5 text-zinc-700">
              <p>
                A unisex regular-fit T-shirt made from 100% soft cotton for a
                comfortable feel. This short-sleeve tee features a crewneck and
                a screen-printed logo on the chest and a large “Shield Focus”
                design on the back. A versatile, stylish piece perfect for
                casual wear.
              </p>
              <p>
                Unisex style with a regular fit, women may prefer sizing down.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-[56px_1fr] gap-3">
              <button
                className="grid h-9 w-full text-[10px] place-items-center border border-zinc-300"
                aria-label="Wishlist"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <button className="h-9 w-full text-[10px] border border-zinc-300 font-medium">
                SIZE CHART
              </button>
            </div>

            {/* Info carousel */}
            <InfoCarousel />

            {/* Accordions */}
            <div className="mt-8 divide-y border-y border-zinc-200">
              <AccRow title="Composition">
                100% cotton. Machine wash at 30°C, inside out. Do not tumble
                dry. Cool iron.
              </AccRow>
              <AccRow title="Shipping">
                Orders ship within 1–2 business days. Free shipping in NL on all
                orders.
              </AccRow>
              <AccRow title="Returns">
                14-day returns window via our Returns Portal.
              </AccRow>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

/* Accordion row (klein/licht) */
function AccRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="py-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left text-[12px] font-medium"
      >
        <span>{title}</span>
        <span className="text-base">{open ? "−" : "+"}</span>
      </button>
      <div
        className={cn(
          "grid transition-all",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden pt-2 text-[10px] font-light leading-5 text-zinc-600">
          {children}
        </div>
      </div>
    </div>
  );
}
