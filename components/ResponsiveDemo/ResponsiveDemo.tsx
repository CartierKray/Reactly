"use client";

import { useState, useRef } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import Image from "next/image";

const breakpoints = [
  { label: "Mobile", min: 0, max: 639 },
  { label: "sm", min: 640, max: 767 },
  { label: "md", min: 768, max: 1023 },
  { label: "lg", min: 1024, max: 1279 },
  { label: "xl", min: 1280, max: Infinity },
];

const totalWidth = 1440;
const PREVIEW_PADDING_LEFT = 24;

export default function ResponsiveDemo() {
  const [width, setWidth] = useState(1024);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentBreakpoint =
    breakpoints.find((bp) => width >= bp.min && width <= bp.max)?.label || "xl";

  const isStacked = ["Mobile", "sm", "md"].includes(currentBreakpoint);

  return (
    <div className="hidden xl:block rounded-2xl border border-black/10 dark:border-white/10 max-w-7xl mx-auto bg-[#ffffff] dark:bg-[#000] overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-4 mb-1 p-10 z-10 relative">
        <div className="pt-1">
          <svg
            className="text-gray-950 [--site-background:var(--color-white)] dark:text-white dark:[--site-background:var(--color-gray-950)]"
            width="112"
            height="72"
            viewBox="0 0 112 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M62.3532 62.3285L94.3961 43.8285C95.5919 43.1382 96.1897 42.2333 96.1897 41.3285L96.1898 38.3285C96.1898 37.4237 95.5919 36.5189 94.3962 35.8285L48.4968 9.3285C46.1054 7.94779 42.228 7.94779 39.8366 9.3285L7.79365 27.8285C6.59792 28.5189 6.00005 29.4237 6.00005 30.3285V33.3427C6.00625 34.2428 6.6041 35.1418 7.7936 35.8285L53.6929 62.3285C56.0844 63.7092 59.9617 63.7092 62.3532 62.3285Z"
              fill="var(--site-background)"
            ></path>
            <path
              d="M7.7936 32.8285C6.59786 32.1381 5.99999 31.2333 6 30.3285C6.00001 29.4237 6.59787 28.5189 7.7936 27.8285L39.8365 9.3285C42.228 7.94779 46.1053 7.94779 48.4968 9.3285L94.3961 35.8285C95.5919 36.5189 96.1897 37.4237 96.1897 38.3285C96.1897 39.2333 95.5919 40.1381 94.3961 40.8285L62.3532 59.3285C59.9617 60.7092 56.0844 60.7092 53.6929 59.3285L7.7936 32.8285Z"
              fill="var(--site-background)"
            ></path>
            <path
              d="M6 30.3285C6.00001 29.4237 6.59787 28.5189 7.7936 27.8285L39.8365 9.3285C42.228 7.94779 46.1053 7.94779 48.4968 9.3285L94.3961 35.8285C95.5919 36.5189 96.1897 37.4237 96.1897 38.3285M6 30.3285C5.99999 31.2333 6.59786 32.1381 7.7936 32.8285L53.6929 59.3285C56.0844 60.7092 59.9617 60.7092 62.3532 59.3285L94.3961 40.8285C95.5919 40.1381 96.1897 39.2333 96.1897 38.3285M6 30.3285V33.3427C6.0062 34.2428 6.60405 35.1418 7.79355 35.8285L53.6929 62.3285C56.0844 63.7092 59.9617 63.7092 62.3531 62.3285L94.3961 43.8285C95.5918 43.1382 96.1897 42.2333 96.1897 41.3285L96.1897 38.3285"
              stroke="currentColor"
            ></path>
            <path
              d="M10.3922 31.3281C9.43562 30.7758 9.43562 29.8804 10.3922 29.3281L42.4351 10.8281C43.3917 10.2758 44.9427 10.2758 45.8992 10.8281L91.7986 37.3281C92.7552 37.8804 92.7552 38.7758 91.7986 39.3281L59.7557 57.8281C58.7991 58.3804 57.2481 58.3804 56.2916 57.8281L10.3922 31.3281Z"
              fill="var(--site-background)"
              stroke="currentColor"
              strokeOpacity="0.3"
            ></path>
            <path
              d="M91.1283 42.8285L104.119 35.3285C105.075 34.7762 105.554 34.0523 105.554 33.3284L105.554 30.3284C105.554 29.6046 105.075 28.8807 104.119 28.3284L70.3437 8.82843C68.4306 7.72386 65.3287 7.72386 63.4155 8.82843L50.4252 16.3284C49.4686 16.8807 48.9903 17.6046 48.9903 18.3284L48.9902 21.3284C48.9902 22.0523 49.4685 22.7762 50.4251 23.3285L84.2001 42.8285C86.1133 43.933 89.2151 43.933 91.1283 42.8285Z"
              fill="var(--site-background)"
            ></path>
            <path
              d="M105.554 30.3284C105.554 29.6046 105.075 28.8807 104.119 28.3284L70.3437 8.82843C68.4306 7.72386 65.3287 7.72386 63.4155 8.82843L50.4252 16.3284C49.4686 16.8807 48.9903 17.6046 48.9903 18.3284M105.554 30.3284C105.554 31.0523 105.075 31.7761 104.119 32.3284L91.1284 39.8284C89.2152 40.933 86.1133 40.933 84.2001 39.8284L50.4252 20.3284C49.4686 19.7761 48.9903 19.0523 48.9903 18.3284M105.554 30.3284L105.554 33.3284C105.554 34.0523 105.075 34.7762 104.119 35.3285L91.1283 42.8285C89.2151 43.933 86.1133 43.933 84.2001 42.8285L50.4251 23.3285C49.4685 22.7762 48.9902 22.0523 48.9902 21.3284L48.9903 18.3284"
              stroke="currentColor"
            ></path>
            <rect
              width="6"
              height="2"
              rx="1"
              transform="matrix(0.866025 -0.5 0.866025 0.5 56.4883 15.3281)"
              fill="currentColor"
            ></rect>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Container queries</h2>
          <p className="text-gray-400 mt-1 mb-6 text-sm">
            Tag an element as a container to let children adapt to changes in
            its size.
          </p>
        </div>
      </div>

      {/* Breakpoint Ruler */}
      <div className="relative w-full text-black/45 rounded-tl-xl rounded-tr-xl  h-[33.5px] bg-dot-pattern bg-[#fafafa] dark:bg-black text-xs font-mono dark:text-gray-400 border-y border-black/10 dark:border-white/10">
        {breakpoints.slice(1).map((bp) => (
          <div
            key={`line-${bp.label}`}
            className="absolute top-0 bottom-0 w-px bg-white/20"
            style={{ left: `${(bp.min / totalWidth) * 100}%` }}
          />
        ))}

        <div
          className={`absolute top-2 px-1 ${
            currentBreakpoint === "Mobile"
              ? "dark:text-white text-black font-bold"
              : ""
          }`}
          style={{ left: `${PREVIEW_PADDING_LEFT}px` }}
        >
          Mobile
        </div>

        {breakpoints.slice(1).map((bp) => {
          const center =
            bp.max === Infinity ? totalWidth - 40 : (bp.min + bp.max) / 2;
          return (
            <div
              key={`label-${bp.label}`}
              className={`absolute top-2 px-1 whitespace-nowrap ${
                currentBreakpoint === bp.label
                  ? "dark:text-white text-black font-bold"
                  : ""
              }`}
              style={{
                left: `${(center / totalWidth) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              {bp.label}
            </div>
          );
        })}
      </div>

      {/* Resizable Preview */}
      <PanelGroup
        className="bg-[#fafafa] dark:bg-black bg-dot-pattern"
        direction="horizontal"
      >
        <Panel
          defaultSize={(width / totalWidth) * 100}
          minSize={(320 / totalWidth) * 100}
          maxSize={100}
          onResize={(size) => {
            const px = (totalWidth * size) / 100;
            setWidth(Math.floor(px));
          }}
        >
          <div className="">
            <div className="pl-6 p-6 pr-2 pb-0 overflow-auto">
              <div
                ref={previewRef}
                className="h-full rounded-t-xl overflow-hidden border-l border-t border-r border-black/10 dark:border-white/10 text-black  backdrop-blur-sm dark:bg-gradient-to-b dark:backdrop-blur-sm bg-gradient-to-b from-white to-white shadow-lg dark:from-[#111]/80 dark:via-[#111]/40 dark:to-[#000]/10 max-w-full"
                style={{ width: `${width}px` }}
              >
                <div
                  className={`flex gap-6 justify-between p-5 h-full box-border ${
                    isStacked ? "flex-col" : "flex-row items-center"
                  }`}
                >
                  {/* STACKED VIEW */}
                  {isStacked ? (
                    <div
                      className={`grid gap-2 w-full ${
                        currentBreakpoint === "md"
                          ? "grid-cols-2"
                          : "grid-cols-1"
                      }`}
                    >
                      <div className="w-full rounded-lg overflow-hidden">
                        <div className="relative">
                          <Image
                            width={1000}
                            height={1000}
                            src="/images/resp-1.png"
                            alt="Main"
                            className="w-full h-40 object-cover"
                          />
                          {["Mobile", "sm"].includes(currentBreakpoint) && (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
                              <div className="absolute bottom-4 left-4 z-10">
                                <p className="text-sm text-gray-300">
                                  Entire house
                                </p>
                                <h2 className="text-xl font-semibold text-white">
                                  Beach House on Lake Huron
                                </h2>
                              </div>
                            </>
                          )}
                        </div>
                        {["Mobile"].includes(currentBreakpoint) && (
                          <div className="mt-2 px-2">
                            <p className="flex items-center gap-2 text-pink-500 text-sm font-medium">
                              <span className="text-xl">★</span> 2.66
                              <span className="text-gray-400">
                                (128 reviews)
                              </span>{" "}
                              ·
                              <span className="text-pink-500">
                                Bayfield, ON
                              </span>
                            </p>
                            <button className="w-full rounded-lg bg-pink-500 px-3 py-2 text-sm mt-2 font-medium text-white">
                              Check availability
                            </button>
                            <p className="mt-4 line-clamp-2 text-sm text-black dark:text-white/50">
                              This sunny and spacious room is for those
                              traveling light and looking for a comfy and cozy
                              place to lay their head for a night...
                            </p>
                          </div>
                        )}
                        {["sm"].includes(currentBreakpoint) && (
                          <div className="mt-2 px-2">
                            <p className="text-sm text-white dark:text-gray-400">
                              Entire house
                            </p>
                            <h2 className="text-4xl font-medium text-black dark:text-white">
                              Beach House on Lake Huron
                            </h2>
                            <p className="flex items-center gap-2 text-pink-500 text-sm font-medium">
                              <span className="text-xl">★</span> 2.66
                              <span className="text-gray-400">
                                (128 reviews)
                              </span>{" "}
                              ·<span>Bayfield, ON</span>
                            </p>
                            <p className="text-sm pb-2 text-black dark:text-white/50 max-w-lg">
                              This sunny and spacious room is for those
                              traveling light and looking for a comfy and cozy
                              place to lay their head for a night...
                            </p>
                            <a
                              href="#"
                              className="text-pink-500 text-sm font-semibold underline"
                            >
                              Show more
                            </a>
                            <div>
                              <button className="bg-pink-500 mt-2 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-pink-600 transition">
                                Check availability
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {currentBreakpoint === "md" && (
                        <>
                          <>
                            <div className="w-full rounded-lg overflow-hidden">
                              <Image
                                width={1000}
                                height={1000}
                                src="/images/resp-2.png"
                                alt=""
                                className="w-full h-40 object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-3 w-full min-w-0">
                              <p className="text-sm text-gray-400">
                                Entire house
                              </p>
                              <h2 className="text-3xl font-medium dark:text-white text-black">
                                Beach House on Lake Huron
                              </h2>
                              <p className="flex items-center gap-2 text-pink-500 text-sm font-medium">
                                <span className="text-xl">★</span> 2.66
                                <span className="text-gray-400">
                                  (128 reviews)
                                </span>{" "}
                                ·<span>Bayfield, ON</span>
                              </p>
                              <p className="text-sm text-black dark:text-white/50">
                                This sunny and spacious room is for those
                                traveling light and looking for a comfy and cozy
                                place to lay their head for a night...
                              </p>
                              <a
                                href="#"
                                className="text-pink-500 text-sm font-semibold underline"
                              >
                                Show more
                              </a>
                              <div>
                                <button className="bg-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-pink-600 transition">
                                  Check availability
                                </button>
                              </div>
                            </div>
                          </>
                          <div className="flex-1 space-y-3 w-full min-w-0">
                            <div className="flex-1 space-y-3 w-full min-w-0">
                              <p className="text-sm text-gray-400">
                                Family camping
                              </p>
                              <h2 className="text-3xl font-medium dark:text-white text-black">
                                Recharge by the Huron Lake
                              </h2>
                              <p className="flex items-center gap-2 text-pink-500 text-sm font-medium">
                                <span className="text-xl">★</span> 4.8
                                <span className="text-gray-400">
                                  (421 reviews)
                                </span>{" "}
                                ·<span>Huron Shores</span>
                              </p>
                              <p className="text-sm text-black dark:text-white/50">
                                A serene retreat surrounded by water, trees and
                                silence. Whether you&apos;re sipping coffee at
                                sunrise or stargazing by the firepit...
                              </p>
                            </div>

                            <a
                              href="#"
                              className="text-pink-500 text-sm font-semibold underline"
                            >
                              Show more
                            </a>
                            <div className="">
                              <button className="bg-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-pink-600 transition">
                                Show availability
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    // DESKTOP VIEW
                    <>
                      <div className="flex-1 space-y-3 w-full min-w-0">
                        <p className="text-sm text-white dark:text-gray-400">
                          Entire house
                        </p>
                        <h2 className="text-4xl font-medium text-black dark:text-white">
                          Beach House on Lake Huron
                        </h2>
                        <p className="flex items-center gap-2 text-pink-500 text-sm font-medium">
                          <span className="text-xl">★</span> 2.66
                          <span className="text-gray-400">(128 reviews)</span> ·
                          <span>Bayfield, ON</span>
                        </p>
                        <p className="text-sm pb-2 text-black dark:text-white/50 max-w-lg">
                          This sunny and spacious room is for those traveling
                          light and looking for a comfy and cozy place to lay
                          their head for a night...
                        </p>
                        <a
                          href="#"
                          className="text-pink-500 text-sm font-semibold underline"
                        >
                          Show more
                        </a>
                        <div>
                          <button className="bg-pink-500 mt-2 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-pink-600 transition">
                            Check availability
                          </button>
                        </div>
                      </div>

                      {/* Responsive Image Grid */}
                      {currentBreakpoint === "lg" && (
                        <div className="flex-1 w-full max-h-[400px] grid gap-2 grid-cols-2 grid-rows-2 overflow-hidden">
                          <div className="col-span-2 rounded-lg overflow-hidden">
                            <Image
                              width={1000}
                              height={1000}
                              src="/images/resp-1.png"
                              alt="Main"
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <Image
                            width={1000}
                            height={1000}
                            src="/images/resp-2.png"
                            alt=""
                            className="object-cover w-full h-full rounded-lg"
                          />
                          <Image
                            width={1000}
                            height={1000}
                            src="/images/resp-3.png"
                            alt=""
                            className="object-cover w-full h-full rounded-lg"
                          />
                        </div>
                      )}

                      {currentBreakpoint === "xl" && (
                        <div className="flex-1 w-full grid gap-2 grid-cols-3 grid-rows-2 max-h-full overflow-hidden">
                          <div className="row-span-2 rounded-lg overflow-hidden">
                            <Image
                              width={1000}
                              height={1000}
                              src="/images/resp-1.png"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                          {[2, 3, 4, 5].map((n) => (
                            <Image
                              key={n}
                              width={1000}
                              height={1000}
                              src={`/images/resp-${n}.png`}
                              alt=""
                              className="object-cover w-full h-full rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-2 justify-center hidden md:flex items-center">
          <div className="w-1.5 h-20 bg-black/30 dark:bg-white/30 dark:hover:bg-white/75 hover:bg-black/75 backdrop-blur-sm rounded-full" />
        </PanelResizeHandle>

        <Panel defaultSize={10} />
      </PanelGroup>
    </div>
  );
}
