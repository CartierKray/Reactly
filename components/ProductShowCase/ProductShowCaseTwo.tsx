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

export default function ProductShowcaseTwo() {
  const [active, setActive] = useState(2);

  const slide = (dir: "left" | "right") => {
    setActive((prev) =>
      dir === "left"
        ? (prev - 1 + features.length) % features.length
        : (prev + 1) % features.length
    );
  };

  const getOffsetClass = (index: number) => {
    const offset = (index - active + features.length) % features.length;
    if (offset === 0)
      return "translate-x-0 scale-100 opacity-100 z-20 blur-0 w-[75%] md:w-[75%]";
    if (offset === 1 || offset === features.length - 1)
      return "translate-x-0 scale-95 opacity-60 z-10 blur-sm w-[60%] md:w-[60%]";
    return "opacity-0 scale-90 z-0 w-0";
  };

  return (
    <section className=" bg-[#] pt-2 overflow-hidden relative">
      {/* <h2 className="text-center text-3xl text-[#000926] md:text-5xl font-bold mb-12 xl:mb-20">
        The ultimate{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ad2a3] to-[#1658ea]">
          products
        </span>{" "}
        <br className="hidden lg:flex" />
        to win your market
      </h2> */}

      {/* Cards */}
      <div className="flex justify-center items-start gap-4 flex-wrap mb-6 px-4">
        {features.map((f, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className={clsx(
              "cursor-pointer",
              "md:w-[175px] md:h-[200px] md:p-5 px-5 py-2 rounded-2xl border text-center transition-all duration-300 shadow-sm",
              i === active
                ? "bg-white shadow-lg border-[#d6e2fe] scale-105"
                : "bg-white/85 border-transparent opacity-60"
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
      <div className="relative mt-16 mb-2 flex items-center max-w-lg mx-auto justify-center">
        <button
          onClick={() => slide("left")}
          className="absolute left-4 w-9 h-9 rounded-full bg-white border shadow flex items-center justify-center hover:bg-gray-100 transition z-10"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700" />
        </button>

        <div className="flex gap-4 no-scrollbar px-8">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={clsx(
                "cursor-pointer",
                "w-12 h-12 rounded-full flex overflow-hidden items-center justify-center border transition-all duration-200",
                i === active
                  ? "bg-blue-100 overflow shadow-inner scale-110 border-blue-200"
                  : "bg-white opacity-70 border-gray-200"
              )}
            >
              <Image
                src={f.icon}
                alt="icon"
                width={1000}
                height={1000}
                className=""
              />
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
      <div className="relative w-full max-w-7xl mx-auto py-10 flex items-center justify-center pt-10">
        <div className="relative flex items-center justify-center gap-6 transition-transform duration-500 ease-in-out">
          {features.map((feature, index) => (
            <div
              key={index}
              className={clsx(
                "transition-all duration-500 ease-in-out transform rounded-xl overflow-hidden shadow-xl",
                getOffsetClass(index),
                "hidden lg:block"
              )}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                width={1000}
                height={1000}
                className="rounded-xl w-full object-contain"
              />
            </div>
          ))}

          {/* Mobile version */}
          <div className="lg:hidden w-full px-4">
            <Image
              src={features[active].image}
              alt={features[active].title}
              width={1000}
              height={1000}
              className="rounded-xl w-full object-contain shadow-xl"
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
