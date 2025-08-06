"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

const features = [
  {
    title: "Sales Intelligence",
    desc: "Prospect, qualify and engage with your ideal customers",
    icon: "/svg/sales-inteligence.svg",
    image: "/images/55dec605a65a0dd39b04.png",
  },
  {
    title: "App Intelligence",
    desc: "Benchmark and grow your app performance and stickiness",
    icon: "/svg/app-inteligence.svg",
    image: "/images/app.png",
  },
  {
    title: "Web Intelligence",
    desc: "Unlock opportunities with advanced market research, competitive analysis, and SEO tools",
    icon: "/svg/web-inteligence.svg",
    image: "/images/web.png",
  },
  {
    title: "Stock Intelligence",
    desc: "Analyze and invest based on alternative digital data",
    icon: "/svg/stock-inteligence.svg",
    image: "/images/sales.png",
  },
  {
    title: "Shopper Intelligence",
    desc: "Track, target, and convert more with full-funnel Amazon insights",
    icon: "/svg/shopper-inteligence.svg",
    image: "/images/shopper.png",
    cta: true,
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(2);

  const slide = (dir: "left" | "right") => {
    setActive((prev) =>
      dir === "left"
        ? (prev - 1 + features.length) % features.length
        : (prev + 1) % features.length
    );
  };

  const getVisibleSlides = () => {
    const total = features.length;
    const prev = (active - 1 + total) % total;
    const next = (active + 1) % total;
    return [
      { ...features[prev], position: "left", index: prev },
      { ...features[active], position: "center", index: active },
      { ...features[next], position: "right", index: next },
    ];
  };

  return (
    <section className="pt-6 pb-16 overflow-hidden relative">
      {/* Cards */}
      <div className="flex justify-center items-start gap-5 flex-wrap mb-10 px-4">
        {features.map((f, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className={clsx(
              "cursor-pointer",
              "md:w-[180px] md:h-[200px] border border-[#dde5f7] md:p-5 px-5 py-2 rounded-2xl text-center transition-all duration-300 shadow-sm",
              i === active
                ? "bg-white shadow-lg border-[#d6e2fe] scale-105"
                : "bg-white/85 opacity-60"
            )}
          >
            <div className="flex md:grid justify-center w-full h-full md:h-fit items-center gap-5 md:gap-0">
              <Image
                src={f.icon}
                alt={f.title}
                width={36}
                height={36}
                className="mx-auto md:mb-3"
              />
              <div className="font-medium text-[12px] pt-1 md:pt-0 md:mb-1">
                {f.title}
              </div>
            </div>
            <div className="hidden md:flex text-[11.5px] max-w-xs font-light text-gray-600 pt-1 leading-snug">
              {f.desc}
            </div>
            {i === active && (
              <button className="mt-4 hidden md:block w-full text-[9px] text-black font-medium hover:underline">
                Learn more →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Icon row */}
      <div className="relative mt-4 pt-5 mb-8 md:py-5 flex items-center max-w-lg mx-auto justify-center">
        <button
          onClick={() => slide("left")}
          className="absolute left-4 w-9 h-9 rounded-full bg-white border shadow flex items-center justify-center hover:bg-gray-100 transition z-10"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700" />
        </button>

        <div className="flex gap-3 no-scrollbar px-8">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={clsx(
                "cursor-pointer",
                "w-10 h-10 rounded-full flex overflow-hidden items-center justify-center border transition-all duration-200",
                i === active
                  ? "bg-blue-100 overflow shadow-inner scale-110 border-blue-200"
                  : "bg-white opacity-70 border-gray-200"
              )}
            >
              <Image src={f.icon} alt="icon" width={20} height={20} />
            </div>
          ))}
        </div>

        <button
          onClick={() => slide("right")}
          className="absolute right-4 w-9 h-9 rounded-full bg-white border shadow flex items-center justify-center hover:bg-gray-100 transition z-10"
        >
          <ArrowRight className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-6xl mx-auto py-4 md:mt-10 flex items-center justify-center">
        <div className="relative w-full h-[350px] flex items-center justify-center">
          {getVisibleSlides().map((slide) => (
            <div
              key={slide.index}
              className={clsx(
                "absolute transition-all duration-500 ease-in-out transform rounded-xl overflow-hidden shadow-xl hidden lg:block",
                slide.position === "center" &&
                  "scale-100 z-30 blur-0 opacity-100 w-[55%] left-1/2 -translate-x-1/2",
                slide.position === "left" &&
                  "scale-95 z-20 blur-sm opacity-90 w-[40%] left-[-5%]",
                slide.position === "right" &&
                  "scale-95 z-20 blur-sm opacity-90 w-[40%] right-[-5%]"
              )}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                width={1000}
                height={1000}
                className="rounded-xl w-full h-auto object-contain"
              />
            </div>
          ))}

          {/* Mobile versie */}
          <div className="lg:hidden w-full px-4">
            <Image
              src={features[active].image}
              alt={features[active].title}
              width={1000}
              height={1000}
              className="rounded-xl w-full sm:max-h-[400px] md:max-h-[450px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      {/* <div className="flex mt-14 mb-12 md:mb-0 lg:mt-20 xl:mt-24 justify-center">
        <Link href={"/diensten"}>
          <button className="bg-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-full font-semibold shadow-md">
            Learn more
          </button>
        </Link>
      </div> */}
    </section>
  );
}
