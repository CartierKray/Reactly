"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const filters = [
  { name: "blur-sm", className: "backdrop-blur-sm" },
  { name: "brightness-150", className: "backdrop-brightness-150" },
  { name: "grayscale", className: "backdrop-grayscale" },
  { name: "contrast-150", className: "backdrop-contrast-150" },
  { name: "saturate-200", className: "backdrop-saturate-200" },
  { name: "sepia", className: "backdrop-sepia" },
];

export default function FiltersShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Width of each card including margin: 288px + 2 * 20px (m-5) = 328px
  const cardWidth = 328;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filters.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1111]">
      <div className=" p-2">
        <div className="bg-[#0b0f19] rounded-3xl text-white flex flex-col justify-between h-full outline outline-[#7e7e7e] p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-10 z-10 relative">
            <div className="pt-1">
              <svg
                className="text-white [--site-background:var(--color-white)] dark:text-white dark:[--site-background:var(--color-gray-950)]"
                width="112"
                height="72"
                viewBox="0 0 112 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="112"
                  height="72"
                  fill="var(--site-background)"
                ></rect>
                <path
                  d="M66.4883 54.4995L107.192 30.9995V27.9995M66.4883 54.4995L25.7852 30.9995V27.9995M66.4883 54.4995V51.4995M25.7852 27.9995L66.4883 4.49951L107.192 27.9995M25.7852 27.9995L66.4883 51.4995M107.192 27.9995L66.4883 51.4995"
                  stroke="currentColor"
                ></path>
                <path
                  d="M4.99414 34.9995L45.6973 11.4995L50.0289 14.0003L47.432 15.4996L45.7004 14.4999L10.1934 34.9999L41.3703 52.9999L52.6288 46.4998M4.99414 34.9995L45.6973 58.4995M4.99414 34.9995L4.9953 36.9995L45.6985 60.4995M45.6973 58.4995L45.6985 60.4995M45.6973 58.4995L59.5551 50.4987M45.6985 60.4995L61.2878 51.499M30.9766 46.9998V35.8282C30.9766 35.3036 31.224 34.8124 31.655 34.3913"
                  stroke="currentColor"
                ></path>
                <g filter="url(#filter0_f_457_1608)">
                  <path
                    d="M25.7852 30.9998L50.0308 17.0015M66.4883 7.49976L107.192 30.9998M66.4883 7.49976V4.49976M66.4883 7.49976L52.6277 15.5022M86.3961 34.9984L86.3972 36.9984L63.8831 49.9969M86.3961 34.9984L62.1504 48.9966M86.3961 34.9984L52.6277 15.5022M56.9542 32.9987H35.8724C35.4346 32.9987 35.0102 33.0319 34.6064 33.0941M53.4893 32.9988V27.413C53.4893 26.6319 54.586 25.9988 55.9388 25.9988H65.6137M55.2241 44.9977L76.8728 32.4988L50.0308 17.0015M50.0308 17.0015L52.6277 15.5022M43.5322 24.2488C45.2062 25.2153 45.2062 26.7823 43.5322 27.7488C41.8581 28.7153 39.144 28.7153 37.47 27.7488C35.796 26.7823 35.796 25.2153 37.47 24.2488C39.144 23.2823 41.8581 23.2823 43.5322 24.2488Z"
                    stroke="currentColor"
                    stroke-opacity="0.3"
                  ></path>
                </g>
                <defs>
                  <filter
                    id="filter0_f_457_1608"
                    x="23.5352"
                    y="2.49976"
                    width="85.9062"
                    height="49.9302"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood
                      flood-opacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    ></feBlend>
                    <feGaussianBlur
                      stdDeviation="1"
                      result="effect1_foregroundBlur_457_1608"
                    ></feGaussianBlur>
                  </filter>
                </defs>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-medium">Filters</h2>
              <p className="text-sm text-white/70 max-w-xs">
                What’s a website these days without a few backdrop blurs? Keep
                stacking filters until your designer asks you to please, please
                stop.
              </p>
            </div>
          </div>
          <div className="max-w-5xl mx-auto rounded-[2rem] border border-white/10 relative overflow-hidden bg-dot-pattern w-full">
            {/* Showcase */}
            <div className="relative  h-[450px] overflow-hidden rounded-xl bg-gray-950/[0.025] border border-white/10">
              {/* Grid background */}
              <div className="absolute inset-0 z-0 bg-[radial-gradient(var(--tw-prose-invert-body)_1px,transparent_0)] bg-[length:10px_10px] opacity-10 pointer-events-none" />

              <div className="bg-dot-pattern">
                {/* Central image */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <Image
                    src="/images/chinese.png"
                    alt="Filters demo"
                    width={256}
                    height={256}
                    className="rounded-xl shadow-lg"
                  />
                </div>

                {/* Overlay filters slider */}
                <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden">
                  <div
                    className="flex transition-transform duration-1000 ease-in-out"
                    style={{
                      // Start centered: offset by activeIndex, but we need to center the item over the image
                      transform: `translateX(calc(50% - ${
                        (activeIndex + 0.5) * cardWidth
                      }px))`,
                    }}
                  >
                    {filters.map((filter) => (
                      <div
                        key={filter.name}
                        className="flex flex-col items-center -mt-1 m-5"
                        style={{ width: "18rem" }} // 72 Tailwind = 288px
                      >
                        <span className="text-xs font-mono text-white mb-2 text-center">
                          {filter.name}
                        </span>
                        <div className="w-72 h-72  rounded-xl border border-white/10 shadow-inner bg-white/20 flex items-center justify-center">
                          <div
                            className={`w-full h-full rounded-xl ${filter.className} bg-white/10`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
