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

/* Info carousel (auto) — met icon per slide */
const INFO_SLIDES: { text: string; icon: React.ReactNode }[] = [
  {
    text: "Free shipping on all orders in The Netherlands!",
    icon: (
      <svg
        width="29"
        height="16"
        viewBox="0 0 29 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.2479 4.06587H22.8764C23.4437 4.06587 24.0128 4.06587 24.5818 4.06587C24.8145 4.055 25.0453 4.11132 25.2468 4.22809C25.4483 4.34487 25.612 4.51717 25.7182 4.72442C26.5438 6.20498 27.3682 7.68435 28.1914 9.16252C28.4329 9.60057 28.5563 10.094 28.5493 10.5942C28.5493 11.403 28.5493 12.2048 28.5493 13.0208C28.5493 13.6131 28.2325 13.9514 27.6366 13.9156C27.1606 13.8887 26.8922 13.9621 26.7043 14.4936C26.3607 15.46 25.3227 16.0487 24.3206 15.9968C23.7957 15.9789 23.2898 15.7964 22.8743 15.4753C22.4587 15.1542 22.1546 14.7106 22.0049 14.2073C21.9995 14.1621 21.9849 14.1185 21.9621 14.0792C21.9393 14.0398 21.9087 14.0055 21.8722 13.9784C21.8357 13.9512 21.794 13.9318 21.7498 13.9213C21.7055 13.9109 21.6596 13.9095 21.6148 13.9174C19.0306 13.9174 16.4483 13.9174 13.866 13.9174H13.5636C13.5349 14.0068 13.5081 14.0856 13.483 14.1661C13.326 14.6918 13.0041 15.153 12.5649 15.4817C12.1257 15.8103 11.5924 15.9891 11.0439 15.9915C10.5001 15.9898 9.97144 15.8126 9.53648 15.4863C9.10152 15.16 8.78351 14.702 8.62976 14.1804C8.56354 13.9514 8.46332 13.912 8.25037 13.9138C7.06568 13.9138 5.881 13.9138 4.69453 13.9138C4.23998 13.9138 4.08607 13.7599 4.08607 13.3089C4.08607 12.3372 4.08607 11.3655 4.08607 10.3508H3.76216C2.68843 10.3508 1.6147 10.3508 0.551703 10.3508C0.297586 10.3508 0.088208 10.2434 0.0703125 9.99288C0.0790236 9.81066 0.153395 9.63775 0.279687 9.50612C0.34948 9.42737 0.530226 9.42738 0.660863 9.4238C1.11362 9.4238 1.56638 9.4238 2.01914 9.4238H6.12438C6.23018 9.41959 6.33614 9.42438 6.44113 9.43811C6.5578 9.45159 6.66438 9.51076 6.7375 9.60267C6.81063 9.69458 6.84434 9.81173 6.83125 9.92845C6.83009 9.98446 6.81785 10.0397 6.79523 10.0909C6.77261 10.1422 6.74006 10.1885 6.69946 10.2271C6.65886 10.2657 6.61102 10.2958 6.55869 10.3158C6.50637 10.3358 6.45059 10.3453 6.3946 10.3436C6.04742 10.3544 5.70025 10.3436 5.35487 10.3436H5.02917V13.0136H5.30297C6.29617 13.0136 7.28759 13.0136 8.28079 13.0136C8.45975 13.0136 8.55996 12.9832 8.6208 12.7721C8.76747 12.243 9.08385 11.7768 9.52131 11.445C9.95876 11.1133 10.4931 10.9344 11.0421 10.936C11.5908 10.9318 12.1258 11.107 12.5658 11.4349C13.0058 11.7627 13.3266 12.2254 13.4794 12.7524C13.5278 12.9081 13.5582 13.0172 13.7729 13.0154C15.8828 13.0154 17.9945 13.0154 20.1044 13.0154C20.1599 13.0154 20.2171 13.0047 20.2994 12.9975V0.934148H5.02738V2.35505H5.41213C6.16375 2.35505 6.91536 2.35505 7.66697 2.35505C7.99625 2.35505 8.18952 2.53401 8.20384 2.80244C8.20657 2.86817 8.19505 2.93371 8.17008 2.99456C8.14511 3.05542 8.10728 3.11017 8.05918 3.15504C8.01108 3.19991 7.95384 3.23385 7.8914 3.25454C7.82895 3.27522 7.76277 3.28217 7.69739 3.27489C5.84699 3.28204 3.99779 3.28204 2.14977 3.27489C2.08392 3.28447 2.01676 3.27966 1.95295 3.26076C1.88914 3.24187 1.83018 3.20935 1.78015 3.16545C1.73013 3.12156 1.69024 3.06732 1.66322 3.0065C1.6362 2.94568 1.62269 2.87973 1.62364 2.81318C1.62364 2.54296 1.82586 2.36758 2.16051 2.36221C2.69738 2.36221 3.22172 2.36221 3.75143 2.36221H4.08607C4.08607 1.8683 4.08607 1.40838 4.08607 0.948465C4.08607 0.327489 4.40641 0 5.02738 0C10.1145 0 15.2028 0 20.2923 0C20.9276 0 21.2479 0.325699 21.2515 0.96636C21.2515 1.97925 21.2479 2.99214 21.2479 4.06587ZM27.6205 12.994C27.6205 12.1994 27.6491 11.4209 27.608 10.6443C27.5915 10.2629 27.4952 9.88914 27.3252 9.54727C26.5557 8.10489 25.7415 6.68399 24.9505 5.25234C24.9101 5.1658 24.8438 5.09397 24.7607 5.04683C24.6777 4.99969 24.582 4.97958 24.487 4.98928C23.5922 4.98928 22.6974 4.98928 21.8027 4.98928H21.2837V12.9957C21.8599 13.028 21.8599 13.028 22.0657 12.5161C22.2544 12.0486 22.5783 11.648 22.9959 11.3656C23.4135 11.0831 23.9059 10.9317 24.41 10.9306C24.9141 10.9296 25.4071 11.0789 25.8259 11.3594C26.2448 11.6399 26.5705 12.0389 26.7615 12.5054C26.9727 13.0333 26.9727 13.0333 27.6205 12.994ZM9.45474 13.4557C9.44996 13.6676 9.48766 13.8784 9.5656 14.0756C9.64355 14.2728 9.76016 14.4524 9.90859 14.6038C10.057 14.7553 10.2342 14.8754 10.4298 14.9573C10.6254 15.0392 10.8354 15.0811 11.0474 15.0806C11.2593 15.0787 11.4686 15.0351 11.6635 14.9522C11.8585 14.8693 12.0351 14.7487 12.1834 14.5975C12.3317 14.4462 12.4487 14.2672 12.5277 14.0706C12.6066 13.8741 12.6461 13.6639 12.6437 13.4521C12.6433 13.2425 12.6015 13.035 12.5208 12.8415C12.4402 12.648 12.3222 12.4723 12.1737 12.3244C12.0251 12.1765 11.8489 12.0593 11.655 11.9795C11.4612 11.8997 11.2535 11.8589 11.0439 11.8594C10.8342 11.8579 10.6263 11.8983 10.4324 11.9781C10.2384 12.0579 10.0624 12.1755 9.91443 12.3242C9.76649 12.4728 9.64964 12.6494 9.57071 12.8436C9.49178 13.0379 9.45236 13.246 9.45474 13.4557ZM22.8173 13.4753C22.8152 13.6875 22.8554 13.8979 22.9356 14.0942C23.0157 14.2906 23.1343 14.469 23.2843 14.619C23.4343 14.769 23.6127 14.8876 23.8091 14.9677C24.0054 15.0479 24.2158 15.0881 24.4279 15.0859C24.6374 15.0829 24.8442 15.0386 25.0365 14.9555C25.2289 14.8724 25.4029 14.7522 25.5487 14.6018C25.6945 14.4513 25.8091 14.2736 25.8861 14.0788C25.9631 13.884 26.0009 13.6759 25.9974 13.4664C26.0007 13.2561 25.9621 13.0472 25.884 12.8519C25.8058 12.6567 25.6895 12.4789 25.5419 12.329C25.3944 12.1791 25.2185 12.0601 25.0244 11.9788C24.8304 11.8976 24.6222 11.8558 24.4118 11.8558C24.2002 11.855 23.9905 11.8966 23.7952 11.9781C23.5999 12.0595 23.4228 12.1792 23.2744 12.3301C23.126 12.481 23.0093 12.6601 22.9311 12.8568C22.8529 13.0534 22.8148 13.2637 22.8191 13.4753H22.8173Z"
          fill="black"
        ></path>
      </svg>
    ),
  },
  {
    text: "Easy returns via our Portal. You have up to 14 days to return your order.",
    icon: (
      <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.7346 3.1403C17.3053 2.11955 14.8771 1.09587 12.4501 0.0692515C12.3495 0.0235823 12.2409 0 12.131 0C12.0212 0 11.9125 0.0235823 11.812 0.0692515C9.63858 0.975607 7.26213 1.96292 4.5496 3.08575C4.4687 3.11111 4.39859 3.16415 4.35083 3.23614C4.30307 3.30812 4.28052 3.39475 4.28689 3.48173C4.28689 4.20564 4.28689 4.92896 4.28689 5.6517V6.09696C4.28689 6.14096 4.28689 6.18319 4.28689 6.22895H0.559287C0.485597 6.22646 0.411857 6.23177 0.339218 6.2448C0.255293 6.25998 0.1782 6.30223 0.119034 6.36548C0.0598675 6.42873 0.0216795 6.50972 0.00996247 6.59678C-0.0100465 6.68499 0.000279647 6.77764 0.0391801 6.85886C0.0780805 6.94008 0.143137 7.00484 0.223211 7.04204C0.351956 7.10819 0.492442 7.14652 0.636059 7.15467C1.47711 7.15467 2.31816 7.15467 3.16092 7.15467H4.10434C4.15041 7.15467 4.19476 7.15467 4.24082 7.15467V8.1807H3.1541C2.6679 8.1807 2.56383 8.42181 2.56383 8.6242C2.56151 8.67803 2.57003 8.73177 2.58882 8.78205C2.60761 8.83232 2.63627 8.87805 2.67301 8.91634C2.80749 9.03105 2.98026 9.08667 3.1541 9.07122H4.234V10.1025H1.31164C1.22093 10.1009 1.13038 10.111 1.04209 10.1324C0.953367 10.1521 0.874107 10.2032 0.818028 10.2768C0.76195 10.3504 0.732584 10.4419 0.735009 10.5355C0.728095 10.6326 0.755074 10.7291 0.811073 10.8075C0.867072 10.8859 0.948396 10.9411 1.04038 10.9631C1.1229 10.9844 1.20786 10.9938 1.29287 10.9913H4.24935V11.3292C4.24935 11.6565 4.24935 11.9751 4.24935 12.2919C4.24076 12.4079 4.26955 12.5235 4.33125 12.6209C4.39295 12.7183 4.4841 12.792 4.59055 12.8304C7.01419 13.8652 9.43671 14.9024 11.8581 15.9419C11.9411 15.9791 12.0304 15.9988 12.1208 16C12.206 15.9995 12.2902 15.9809 12.3682 15.9454C14.7907 14.9047 17.2132 13.8682 19.6357 12.8357C19.7467 12.7982 19.8426 12.7238 19.9084 12.6241C19.9741 12.5245 20.006 12.4052 19.9991 12.2848C19.9991 9.36923 19.9991 6.45364 19.9991 3.53805C20.003 3.45108 19.9793 3.36516 19.9316 3.29337C19.8839 3.22157 19.8147 3.16782 19.7346 3.1403ZM12.6394 6.9646C14.3454 6.236 16.0514 5.50387 17.7574 4.76823L19.1324 4.17865V5.71858C19.1392 7.7941 19.1466 9.86904 19.1546 11.9434C19.1546 12.0789 19.1273 12.1194 18.9977 12.1757C17.3428 12.8797 15.6892 13.5872 14.0366 14.2982L12.6428 14.8965L12.5524 14.9335C12.5524 14.9141 12.5524 14.8948 12.5524 14.8772V12.4133C12.5524 10.6534 12.5524 8.89347 12.5524 7.13355C12.5609 7.02092 12.5678 6.99803 12.6394 6.96636V6.9646ZM11.6926 14.9317C11.6619 14.9212 11.6329 14.9106 11.6056 14.8983L10.1623 14.2788C8.51888 13.5748 6.87544 12.8709 5.232 12.1669C5.12282 12.1194 5.09552 12.0789 5.10064 11.9575C5.10917 11.7181 5.10064 11.4823 5.10064 11.2306C5.10064 11.1585 5.10064 11.0846 5.10064 11.0089H6.29483C6.38548 11.0116 6.47609 11.0021 6.56438 10.9807C6.65261 10.96 6.73112 10.9083 6.7865 10.8344C6.84188 10.7606 6.87071 10.6693 6.86805 10.5759C6.87526 10.4789 6.84836 10.3825 6.79228 10.3043C6.7362 10.2261 6.65469 10.1713 6.56267 10.15C6.47451 10.1279 6.38381 10.1184 6.29313 10.1219H5.116V9.09058H8.23967C8.53139 9.07298 8.72758 8.88115 8.71394 8.6242C8.71039 8.56281 8.69473 8.50281 8.66793 8.44787C8.64114 8.39293 8.60377 8.3442 8.5581 8.30467C8.51243 8.26513 8.45944 8.23562 8.40234 8.21794C8.34524 8.20025 8.28524 8.19477 8.22602 8.20182H5.12112V7.17227H5.22347C5.35995 7.17227 5.49473 7.17227 5.62779 7.17227C5.9417 7.17227 6.13959 6.99628 6.13959 6.71997C6.13959 6.44366 5.93828 6.28703 5.62779 6.28527H5.32072H5.13305V4.19625L5.20642 4.22441L6.7947 4.9055C8.38696 5.58717 9.97921 6.2665 11.5715 6.94348C11.6187 6.95409 11.6601 6.98306 11.6871 7.02436C11.7141 7.06566 11.7246 7.11612 11.7165 7.16523C11.7165 9.23958 11.7165 11.3145 11.7165 13.39L11.6926 14.9317ZM18.4449 3.52749H18.4296L17.0426 4.12586L12.2812 6.1832C12.2374 6.20567 12.1893 6.21736 12.1404 6.21736C12.0916 6.21736 12.0434 6.20567 11.9997 6.1832C11.3753 5.90865 10.7475 5.63762 10.106 5.35955L9.64029 5.15893L9.73241 5.11845C11.7341 4.24201 13.7369 3.36675 15.7409 2.49266C15.7996 2.46468 15.8657 2.45786 15.9286 2.4733C16.6451 2.76368 17.3599 3.06287 18.073 3.35325L18.4449 3.52749ZM14.4222 2.11956L13.8353 2.3765C12.1089 3.12857 10.3824 3.88006 8.65593 4.63095C8.59182 4.66112 8.51984 4.66855 8.45121 4.65207C7.69375 4.33529 6.92776 4.00442 6.18566 3.68412L5.81204 3.52396L8.86747 2.26035C9.91267 1.82741 10.9585 1.39565 12.0048 0.965053C12.0698 0.935665 12.1424 0.929471 12.2112 0.947452C12.9175 1.2308 13.6187 1.52119 14.3215 1.81157L14.731 1.98756L14.4222 2.11956Z"
          fill="black"
        ></path>
      </svg>
    ),
  },
  {
    text: "Secure payment with iDeal, Paypal, Visa, Mastercard, American Express, Bancontact",
    icon: (
      <svg
        width="24"
        height="16"
        viewBox="0 0 24 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.9313 3.00693H19.4733V1.60417C19.4733 1.17872 19.2893 0.770738 18.962 0.469889C18.6345 0.169005 18.1904 0 17.7273 0H1.74622C1.2831 0 0.838801 0.169023 0.5115 0.469889C0.183972 0.770773 0 1.17872 0 1.60417V11.389C0 11.8145 0.183991 12.2225 0.5115 12.5233C0.838843 12.8242 1.2831 12.9932 1.74622 12.9932H4.52698V14.0993C4.52698 14.6034 4.74496 15.0868 5.13287 15.4434C5.52081 15.7998 6.0471 16 6.59596 16H21.931C22.4797 16 23.0059 15.7997 23.3941 15.4434C23.782 15.0869 24 14.6034 24 14.0993V4.9079C24 4.40373 23.782 3.92042 23.3941 3.56383C23.006 3.20746 22.4797 3.00723 21.931 3.00723L21.9313 3.00693ZM23.1727 4.9076V5.9986H5.3549V4.9076C5.3549 4.60519 5.48569 4.31498 5.71845 4.10119C5.95121 3.88736 6.26693 3.76722 6.59627 3.76722H21.9313C22.2605 3.76722 22.5764 3.88736 22.8091 4.10119C23.0419 4.31502 23.1727 4.60523 23.1727 4.9076H23.1727ZM23.1727 7.63692H5.3549V6.75887H23.1727V7.63692ZM0.827735 3.7519H4.9657C4.74587 4.00595 4.60307 4.30885 4.5519 4.63012H0.827735V3.7519ZM1.74641 0.760225H17.7275C17.9709 0.760225 18.2046 0.84915 18.377 1.00748C18.5491 1.16564 18.6459 1.38032 18.6459 1.60414V2.99165H0.828089V1.60414C0.828089 1.3803 0.924889 1.16562 1.09706 1.00748C1.26941 0.84915 1.50309 0.760225 1.74674 0.760225H1.74641ZM1.74641 12.2325V12.2326C1.50275 12.2326 1.26905 12.1437 1.09673 11.9854C0.924558 11.8272 0.827758 11.6125 0.827758 11.3887V5.39041H4.52719V12.2328L1.74641 12.2325ZM21.9312 15.2394H6.5961C6.26673 15.2394 5.95101 15.1193 5.71829 14.9055C5.48553 14.6916 5.35474 14.4014 5.35474 14.099V8.39703H23.1726V14.099C23.1726 14.4015 23.0418 14.6917 22.809 14.9055C22.5763 15.1192 22.2604 15.2394 21.9312 15.2394H21.9312Z"
          fill="black"
        ></path>
      </svg>
    ),
  },
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

        {/* Center: icon boven, tekst eronder (zoals je voorbeeld) */}
        <div className="flex min-h-[64px] flex-1 flex-col items-center justify-center px-3 text-center">
          <div className="mb-1 text-zinc-800">{INFO_SLIDES[i].icon}</div>
          <div className="text-[10px] font-light leading-5 text-zinc-700">
            {INFO_SLIDES[i].text}
          </div>
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

      {/* Dots */}
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
