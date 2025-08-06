"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TiltImageCard } from "../TiltShineCard/TiltImageCard";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ResponsiveDemo from "../ResponsiveDemo/ResponsiveDemo";
import KleurenPalet from "../KleurenPalet/KleurenPalet";

const filters = [
  { name: "blur-sm", className: "backdrop-blur-sm" },
  { name: "brightness-150", className: "backdrop-brightness-150" },
  { name: "grayscale", className: "backdrop-grayscale" },
  { name: "contrast-150", className: "backdrop-contrast-150" },
  { name: "saturate-200", className: "backdrop-saturate-200" },
  { name: "sepia", className: "backdrop-sepia" },
];

export default function FeatureShowcaseGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(600);

  // Width of each card including margin: 288px + 2 * 20px (m-5) = 328px
  const cardWidth = 328;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filters.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(375 / 2);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      let x = e.clientX - bounds.left;
      x = Math.max(0, Math.min(x, bounds.width));
      setOffsetX(x);
    };

    const handlePointerDown = () => {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    container.addEventListener("pointerdown", handlePointerDown);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const easings = [
    {
      label: "linear",
      easing: "linear",
      color: "bg-cyan-400",
      animationName: "moveLinear",
    },
    {
      label: "ease-out",
      easing: "ease-out",
      color: "bg-violet-400",
      animationName: "moveEaseOut",
    },
    {
      label: "ease-in-out",
      easing: "ease-in-out",
      color: "bg-pink-400",
      animationName: "moveEaseInOut",
    },
    {
      label: "ease-in",
      easing: "ease-in",
      color: "bg-indigo-400",
      animationName: "moveEaseIn",
    },
  ];

  return (
    <div className="bg-transparent px-4 py-16">
      <div className="pb-2">
        <ResponsiveDemo />
      </div>

      <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-2 gap-2 max-w-7xl mx-auto">
        {/* 1. Cascade Layers */}
        <div className="bg-black rounded-2xl text-white p-4 flex flex-col justify-between border border-white/10 relative">
          <div className="absolute inset-0 bg-dot-pattern bg-[length:10px_10px] opacity-5" />
          <div className="flex items-start pt-6 md:pt-8 gap-4 mb-10 z-10 relative">
            <div className="pt-1">
              <svg
                className="text-gray-950 [--site-background:var(--color-white)] dark:text-white dark:[--site-background:var(--color-gray-950)]"
                width="112"
                height="72"
                viewBox="0 0 112 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_408_5751)">
                  <path
                    d="M52.0956 7.50006L4.4642 35.0001C3.51163 35.55 3.03334 36.2701 3.02935 36.9909V40.0129C3.03497 40.7325 3.51324 41.451 4.46417 42.0001L52.0956 69.5001C54.0087 70.6046 57.1106 70.6046 59.0238 69.5001L106.655 42.0001C107.612 41.4478 108.09 40.7239 108.09 40.0001V36.9909C108.086 36.2701 107.608 35.55 106.655 35.0001L59.0238 7.50006C57.1106 6.39549 54.0088 6.39549 52.0956 7.50006Z"
                    fill="var(--site-background)"
                  ></path>
                  <path
                    d="M108.09 36.9909C108.086 36.2701 107.608 35.55 106.655 35.0001L59.0238 7.50006C57.1106 6.39549 54.0088 6.39549 52.0956 7.50006L4.4642 35.0001C3.51163 35.55 3.03334 36.2701 3.02935 36.9909M108.09 36.9909C108.094 37.7178 107.616 38.4455 106.655 39.0001L59.0238 66.5001C57.1106 67.6046 54.0088 67.6046 52.0956 66.5001L4.4642 39.0001C3.5036 38.4455 3.02532 37.7178 3.02935 36.9909M108.09 36.9909V40.0001C108.09 40.7239 107.612 41.4478 106.655 42.0001L59.0238 69.5001C57.1106 70.6046 54.0087 70.6046 52.0956 69.5001L4.46417 42.0001C3.51324 41.451 3.03497 40.7325 3.02935 40.0129V36.9909"
                    stroke="currentColor"
                  ></path>
                  <path
                    d="M16.8848 33.9903C16.8891 33.2697 17.3674 32.5499 18.3196 32.0001L52.0946 12.5001C54.0078 11.3955 57.1097 11.3955 59.0228 12.5001L92.7978 32.0001C93.7501 32.5499 94.2284 33.2697 94.2327 33.9903M16.8848 33.9903C16.8805 34.7174 17.3588 35.4453 18.3196 36.0001L52.0946 55.5001C54.0078 56.6046 57.1097 56.6046 59.0228 55.5001L92.7978 36.0001C93.7587 35.4453 94.237 34.7174 94.2327 33.9903M16.8848 33.9903V37.0001C16.8848 37.7239 17.3631 38.4478 18.3197 39.0001L52.0947 58.5001C54.0078 59.6046 57.1097 59.6046 59.0229 58.5001L92.7979 39.0001C93.7544 38.4478 94.2327 37.7239 94.2327 37.0001L94.2327 33.9903"
                    stroke="currentColor"
                  ></path>
                  <path
                    d="M30.7422 30.9998C30.7422 30.2759 31.2205 29.5521 32.1771 28.9998L52.0956 17.4998C54.0088 16.3952 57.1107 16.3952 59.0238 17.4998L78.9424 28.9998C79.899 29.5521 80.3773 30.2759 80.3773 30.9998M30.7422 30.9998C30.7422 31.7237 31.2205 32.4475 32.1771 32.9998L52.0956 44.4998C54.0088 45.6044 57.1107 45.6044 59.0238 44.4998L78.9424 32.9998C79.899 32.4475 80.3773 31.7237 80.3773 30.9998M30.7422 30.9998V33.9998C30.7422 34.7237 31.2205 35.4475 32.1771 35.9998L52.0956 47.4998C54.0088 48.6044 57.1107 48.6044 59.0238 47.4998L78.9424 35.9998C79.899 35.4475 80.3773 34.7237 80.3773 33.9998V30.9998"
                    stroke="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_408_5751">
                    <rect
                      width="112"
                      height="72"
                      fill="var(--site-background)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Cascade layers</h2>
              <p className="text-gray-400 mt-1 mb-6 text-sm">
                Tailwind uses CSS layers so you don’t have to worry about
                specificity issues.
              </p>
            </div>
          </div>
          <div className="relative z-10">
            <div className=" bg-dot-pattern rounded-xl pt-8 pl-8 text-xs font-mono leading-relaxed overflow-x-auto border border-white/10">
              <div className="rounded-tl-xl pt-2 pl-1 backdrop-blur-sm border-t border-l border-[#fff]/30">
                <div className="flex gap-2 p-2 pt-1 pb-2.5">
                  <span className="size-3 rounded-full bg-red-400"></span>
                  <span className="size-3 rounded-full bg-yellow-400"></span>
                  <span className="size-3 rounded-full bg-green-500"></span>
                </div>

                <div className="bg-[#11141b] border-l border-white/10 border-t rounded-tl-xl overflow-hidden font-mono text-xs">
                  <div className="flex">
                    {/* Line numbers */}
                    <div className="text-right text-gray-500 pl-4 pr-4 py-3 select-none border-r border-white/10">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="leading-6">
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    {/* Code content */}
                    <div className="rounded-xl overflow-hidden font-mono text-xs">
                      <div className="flex">
                        {/* Code content */}
                        <div className="py-3 px-4 overflow-x-auto w-full text-white">
                          <pre className="whitespace-pre leading-6">
                            <code>
                              {`@layer theme, base, components, utilities;

@layer theme {`}
                              <span className="text-pink-400">:root</span>{" "}
                              {`{
    `}
                              <span className="italic text-sky-400">
                                {"/* Your theme variables */"}
                              </span>
                              {`\n  }`}
                              {`\n}`}
                              {`\n\n@layer base {`}
                              <span className="italic text-sky-400">
                                {" "}
                                {"/* Preflight styles */"}
                              </span>
                              {`\n}`}
                              {`\n\n@layer components {`}
                              <span className="italic text-sky-400">
                                {" "}
                                {"/* Your custom components */"}
                              </span>
                              {`\n}`}
                              {`\n\n@layer components {`}
                              <span className="italic text-sky-400">
                                {" "}
                                {"/* Your custom components */"}
                              </span>
                              {`\n}`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Logical Properties */}
        <div className="bg-[#000] rounded-2xl text-white p-4 flex flex-col justify-between border border-white/10 relative">
          <div className="absolute inset-0 bg-[length:10px_10px] opacity-5" />
          <div className="flex items-start pt-6 md:pt-8 gap-4 mb-10 z-10 relative">
            <div className="pt-1">
              <svg
                className="text-gray-950 [--site-background:var(--color-white)] dark:text-white dark:[--site-background:var(--color-gray-950)]"
                width="112"
                height="72"
                viewBox="0 0 112 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_408_5693)">
                  <rect
                    width="63"
                    height="63"
                    rx="2"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 1 38)"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                    strokeDasharray="3 3"
                  ></rect>
                  <path
                    d="M91.066 26L77.2096 34C76.7313 34.2762 76.4922 34.6381 76.4922 35.0001V38.0283C76.5043 38.3807 76.7433 38.731 77.2091 39L91.0655 47C92.0221 47.5523 93.5731 47.5523 94.5296 47L108.386 39C108.864 38.7239 109.103 38.362 109.103 38.0001L109.104 35.0001C109.104 34.6381 108.865 34.2762 108.387 34L94.5301 26C93.5736 25.4477 92.0226 25.4477 91.066 26Z"
                    fill="var(--site-background)"
                    stroke="currentColor"
                  ></path>
                  <path
                    d="M53.8274 47.5L39.971 55.5C39.4927 55.7762 39.2536 56.1381 39.2536 56.5001L39.252 59.5001C39.252 59.862 39.4911 60.2239 39.9694 60.5L53.8258 68.5C54.7824 69.0523 56.3333 69.0523 57.2899 68.5L71.1463 60.5C71.6246 60.2239 71.8637 59.862 71.8637 59.5001L71.8654 56.5001C71.8654 56.1381 71.6262 55.7762 71.1479 55.5L57.2915 47.5C56.3349 46.9477 54.784 46.9477 53.8274 47.5Z"
                    fill="var(--site-background)"
                  ></path>
                  <path
                    d="M16.5883 26L2.73193 34C2.25362 34.2762 2.01447 34.6381 2.01449 35.0001L2.01367 38.0001C2.01371 38.362 2.25285 38.7239 2.73111 39L16.5875 47C17.5441 47.5523 19.095 47.5523 20.0516 47L33.908 39C34.3863 38.7239 34.6254 38.362 34.6255 38.0001L34.6263 35.0001C34.6263 34.6381 34.3871 34.2762 33.9088 34L20.0524 26C19.0959 25.4477 17.5449 25.4477 16.5883 26Z"
                    fill="var(--site-background)"
                  ></path>
                  <path
                    d="M53.8278 4.50027L39.9713 12.5003C39.4931 12.7764 39.254 13.1382 39.2539 13.5001V16.5568C39.2776 16.8997 39.516 17.2385 39.9694 17.5002L53.8258 25.5002C54.7824 26.0525 56.3333 26.0525 57.2899 25.5002L71.1463 17.5002C71.6247 17.224 71.8638 16.862 71.8637 16.5001V13.4437C71.8401 13.1008 71.6016 12.762 71.1483 12.5003L57.2919 4.50027C56.3353 3.94799 54.7843 3.94799 53.8278 4.50027Z"
                    fill="var(--site-background)"
                  ></path>
                  <path
                    d="M34.6263 35.0001C34.6263 34.6381 34.3871 34.2762 33.9088 34L20.0524 26C19.0959 25.4477 17.5449 25.4477 16.5883 26L2.73193 34C2.25362 34.2762 2.01447 34.6381 2.01449 35.0001M34.6263 35.0001C34.6263 35.362 34.3871 35.7239 33.9088 36L20.0524 44C19.0959 44.5523 17.5449 44.5523 16.5883 44L2.73193 36C2.25365 35.7239 2.0145 35.362 2.01449 35.0001M34.6263 35.0001L34.6255 38.0001C34.6254 38.362 34.3863 38.7239 33.908 39L20.0516 47C19.095 47.5523 17.5441 47.5523 16.5875 47L2.73111 39C2.25285 38.7239 2.01371 38.362 2.01367 38.0001L2.01449 35.0001"
                    stroke="currentColor"
                  ></path>
                  <path
                    d="M71.8654 56.5001C71.8654 56.1381 71.6262 55.7762 71.1479 55.5L57.2915 47.5C56.3349 46.9477 54.784 46.9477 53.8274 47.5L39.971 55.5C39.4927 55.7762 39.2536 56.1381 39.2536 56.5001M71.8654 56.5001C71.8654 56.862 71.6262 57.2239 71.1479 57.5L57.2915 65.5C56.3349 66.0523 54.784 66.0523 53.8274 65.5L39.971 57.5C39.4927 57.2239 39.2536 56.862 39.2536 56.5001M71.8654 56.5001L71.8637 59.5001C71.8637 59.862 71.6246 60.2239 71.1463 60.5L57.2899 68.5C56.3333 69.0523 54.7824 69.0523 53.8258 68.5L39.9694 60.5C39.4911 60.2239 39.252 59.862 39.252 59.5001L39.2536 56.5001"
                    stroke="currentColor"
                  ></path>
                  <path
                    d="M71.8637 13.4437C71.8401 13.1008 71.6016 12.762 71.1483 12.5003L57.2919 4.50027C56.3353 3.94799 54.7843 3.94799 53.8278 4.50027L39.9713 12.5003C39.4931 12.7764 39.254 13.1382 39.2539 13.5001M71.8637 13.4437C71.89 13.8242 71.6515 14.2097 71.1483 14.5003L57.2919 22.5003C56.3353 23.0526 54.7843 23.0526 53.8278 22.5003L39.9713 14.5003C39.493 14.2241 39.2538 13.8621 39.2539 13.5001M71.8637 13.4437V16.5001C71.8638 16.862 71.6247 17.224 71.1463 17.5002L57.2899 25.5002C56.3333 26.0525 54.7824 26.0525 53.8258 25.5002L39.9694 17.5002C39.516 17.2385 39.2776 16.8997 39.2539 16.5568V13.5001"
                    stroke="currentColor"
                  ></path>
                  <path
                    d="M109.104 35.0001C109.104 34.6381 108.865 34.2762 108.387 34L94.5301 26C93.5735 25.4477 92.0226 25.4477 91.066 26L77.2096 34C76.7313 34.2762 76.4922 34.6381 76.4922 35.0001M109.104 35.0001C109.104 35.362 108.865 35.7239 108.387 36L94.5301 44C93.5735 44.5523 92.0226 44.5523 91.066 44L77.2096 36C76.7313 35.7239 76.4922 35.362 76.4922 35.0001M109.104 35.0001L109.103 38.0001C109.103 38.362 108.864 38.7239 108.386 39L94.5296 47C93.5731 47.5523 92.0221 47.5523 91.0655 47L77.2091 39C76.7433 38.731 76.5043 38.3807 76.4922 38.0283V35.0001"
                    stroke="currentColor"
                  ></path>
                  <path
                    d="M19.1868 32.5001L51.2297 14.0001M51.2297 14.0001V18.0001M51.2297 14.0001H44.3015"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M91.9324 37.5001L59.8894 56.0001M59.8894 56.0001L59.8894 52.0001M59.8894 56.0001L66.8176 56.0001"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M59.8894 14.0001L91.9324 32.5001M91.9324 32.5001L85.0041 32.5001M91.9324 32.5001L91.9324 28.5001"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M51.2297 56.0001L19.1868 37.5001M19.1868 37.5001H26.115M19.1868 37.5001V41.5001"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_408_5693">
                    <rect
                      width="112"
                      height="72"
                      fill="var(--site-background)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Logical properties</h2>
              <p className="text-gray-400 mt-1 mb-6 text-sm">
                Supporting multiple language text directions is no longer a
                nightmare.
              </p>
            </div>
          </div>
          <div className="relative z-10">
            <div className=" bg-dot-pattern min-h-[454px] rounded-xl  border border-white/10">
              {/* Grid */}
              <div className=" overflow-hidden rounded-b-xl text-sm ">
                {/* Header */}
                <div className="px-4 py-4 text-xs text-white/50 flex justify-between  [background-size:16px_16px]"></div>

                {/* Grid with manual alignment */}
                <div className="grid grid-cols-2  mt-3 gap-px">
                  {/* Left Column (LTR): 4 rows */}
                  <div className="flex flex-col divide-y pt-1 divide-white/10">
                    {[
                      {
                        name: "Will Winton",
                        role: "Director of Operations",
                        img: "/images/pers-1.png",
                      },
                      {
                        name: "Kristin Yardly",
                        role: "Marketing Coordinator",
                        img: "/images/pers-2.png",
                      },
                      {
                        name: "Emanual Cuccittini",
                        role: "Staff Engineer",
                        img: "/images/pers-3.png",
                      },
                      {
                        name: "Kiara Smith",
                        role: "VP of Engineering",
                        img: "/images/pers-4.png",
                      },
                      {
                        name: "Kenji Dubois",
                        role: "VP of Engineering",
                        img: "/images/pers-5.png",
                      },
                    ].map((person, i) => (
                      <div
                        key={i}
                        className={`bg-[#1E293B] flex items-center gap-3 p-4 ${
                          i === 0 ? "rounded-tr-3xl" : ""
                        }`}
                      >
                        <Image
                          src={person.img}
                          alt=""
                          width={1000}
                          height={1000}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="text-white font-medium">
                            {person.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {person.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column (RTL): 1x empty, then 3 rows */}
                  <div className="flex flex-col divide-y pt-3 divide-white/10">
                    {/* Empty placeholder row to align with LTR */}
                    <div className="bg-transparent h-[72px]" />{" "}
                    {/* Match height of one LTR row */}
                    {[
                      {
                        name: "سارة أحمد",
                        role: "مديرة مشاريع",
                        img: "/images/pers-6.png",
                      },
                      {
                        name: "علي محمد",
                        role: "مطور برمجيات",
                        img: "/images/pers-7.png",
                      },
                      {
                        name: "خالد عمر",
                        role: "مصمم واجهات المستخدم",
                        img: "/images/pers-2.png",
                      },
                      {
                        name: "خالد عمر",
                        role: "مصمم واجهات المستخدم",
                        img: "/images/pers-3.png",
                      },
                    ].map((person, i) => (
                      <div
                        key={i}
                        className="bg-[#1E293B] flex items-center justify-end gap-3 p-4 text-right"
                      >
                        <div>
                          <div className="text-white font-medium">
                            {person.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {person.role}
                          </div>
                        </div>
                        <Image
                          src={person.img}
                          alt=""
                          width={1000}
                          height={1000}
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  3. Container Queries */}
        <div className="bg-[#000] rounded-2xl text-white p-4 flex flex-col justify-between border border-white/10 relative">
          <div className="absolute inset-0 bg-dot-pattern bg-[length:10px_10px] opacity-5" />

          <div className="flex items-start pt-6 md:pt-8 gap-4 mb-10 z-10 relative">
            <div className="pt-1">
              <svg
                className="text-gray-950 [--site-background:var(--color-white)] dark:text-white dark:[--site-background:var(--color-gray-950)]"
                width="112"
                height="72"
                viewBox="0 0 112 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_408_5756)">
                  <path
                    d="M52.9631 4.99998L3.59961 33.5C2.88216 33.9142 2.52344 34.4571 2.52345 35L2.52344 38C2.52344 38.5429 2.88215 39.0858 3.59958 39.5L52.963 68C54.3979 68.8284 56.7243 68.8284 58.1592 68L107.523 39.5C108.24 39.0858 108.599 38.5429 108.599 38V34.9952C108.597 34.4539 108.238 33.913 107.523 33.5L58.1592 4.99998C56.7243 4.17156 54.3979 4.17156 52.9631 4.99998Z"
                    fill="var(--site-background)"
                  ></path>
                  <path
                    d="M108.599 34.9952C108.597 34.4539 108.238 33.913 107.523 33.5L58.1592 4.99998C56.7243 4.17156 54.3979 4.17156 52.9631 4.99998L3.59961 33.5C2.88216 33.9142 2.52344 34.4571 2.52345 35M108.599 34.9952C108.601 35.5397 108.242 36.0845 107.523 36.5L58.1592 65C56.7243 65.8284 54.3979 65.8284 52.9631 65L3.59961 36.5C2.88218 36.0858 2.52346 35.5429 2.52345 35M108.599 34.9952V38C108.599 38.5429 108.24 39.0858 107.523 39.5L58.1592 68C56.7243 68.8284 54.3979 68.8284 52.963 68L3.59958 39.5C2.88215 39.0858 2.52344 38.5429 2.52344 38L2.52345 35"
                    stroke="currentColor"
                  ></path>
                  <rect
                    width="47"
                    height="47"
                    rx="3"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 1 35)"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                    strokeDasharray="3 3"
                  ></rect>
                  <rect
                    width="31"
                    height="31"
                    rx="3"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 1 35)"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                    strokeDasharray="3 3"
                  ></rect>
                  <rect
                    width="15"
                    height="15"
                    rx="3"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 1 35)"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                    strokeDasharray="3 3"
                  ></rect>
                </g>
                <defs>
                  <clipPath id="clip0_408_5756">
                    <rect
                      width="112"
                      height="72"
                      fill="var(--site-background)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Container queries</h2>
              <p className="text-gray-400 mt-1 mb-6 text-sm">
                Tag an element as a container to let children adapt to changes
                in its size.
              </p>
            </div>
          </div>
          <div className=" gap-4 z-10 relative">
            <div className=" bg-dot-pattern rounded-xl pt-8 pl-8 text-xs font-mono leading-relaxed overflow-x-auto border border-white/10">
              <div className="rounded-tl-xl backdrop-blur-sm pt-2 pl-1 border-t border-l border-[#fff]/30">
                <div className="flex gap-2 p-2 pt-1 pb-2.5 ">
                  <span className="size-3 rounded-full bg-red-400"></span>
                  <span className="size-3 rounded-full bg-yellow-400"></span>
                  <span className="size-3 rounded-full bg-green-500"></span>
                </div>

                <div className="bg-[#11141b] border-l border-white/10 border-t rounded-tl-xl overflow-hidden font-mono text-xs">
                  <div className="flex">
                    {/* Line numbers */}
                    <div className="text-right text-gray-500 pl-4 pr-4 py-3 select-none border-r border-white/10">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="leading-6">
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    {/* Code content */}
                    <div className="py-3 px-4 overflow-x-auto w-full text-white">
                      <pre className="whitespace-pre leading-6">
                        <code>
                          <span className="text-pink-400">&lt;div</span>{" "}
                          <span className="text-sky-400">class</span>
                          <span className="text-white">=&quot;</span>
                          <span className="text-sky-400">@container</span>
                          <span className="text-white">&quot;&gt;</span>
                          {"\n"}
                          {"  "}
                          <span className="text-pink-400">&lt;div</span>{" "}
                          <span className="text-sky-400">class</span>
                          <span className="text-white">=&quot;</span>
                          <span className="text-sky-400">
                            grid grid-cols-1 @sm:grid-cols-2
                          </span>
                          <span className="text-white">&quot;&gt;</span>
                          {"\n"}
                          {"    "}
                          <span className="text-pink-400">&lt;img</span>
                          {"\n"}
                          {"      "}
                          <span className="text-sky-400">src</span>
                          <span className="text-white">
                            =&quot;/img/photo-1.jpg&quot;
                          </span>
                          {"\n"}
                          {"      "}
                          <span className="text-sky-400">class</span>
                          <span className="text-white">
                            =&quot;aspect-square @sm:aspect-3/2
                            object-cover&quot;
                          </span>
                          {"\n"}
                          {"    "}
                          <span className="text-pink-400">/&gt;</span>
                          {"\n"}
                          {"    "}
                          <span className="text-pink-400">&lt;img</span>
                          {"\n"}
                          {"      "}
                          <span className="text-sky-400">src</span>
                          <span className="text-white">
                            =&quot;/img/photo-2.jpg&quot;
                          </span>
                          {"\n"}
                          {"      "}
                          <span className="text-sky-400">class</span>
                          <span className="text-white">
                            =&quot;aspect-square @sm:aspect-3/2
                            object-cover&quot;
                          </span>
                          {"\n"}
                          {"    "}
                          <span className="text-pink-400">/&gt;</span>
                          {"\n"}
                          {"    "}
                          <span className="text-pink-400">&lt;img</span>
                          {"\n"}
                          {"      "}
                          <span className="text-sky-400">src</span>
                          <span className="text-white">
                            =&quot;/img/photo-3.jpg&quot;
                          </span>
                          {"\n"}
                          {"      "}
                          <span className="text-sky-400">class</span>
                          <span className="text-white">
                            =&quot;aspect-square @sm:aspect-3/2
                            object-cover&quot;
                          </span>
                          {"\n"}
                          {"  "}
                          <span className="text-pink-400">&lt;/div&gt;</span>
                          {"\n"}
                          <span className="text-pink-400">&lt;/div&gt;</span>
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Filters */}
        <div className="bg-[#000] rounded-2xl text-white p-4 flex flex-col justify-between border border-white/10 relative">
          {/* Header */}
          <div className="flex items-start pt-6 md:pt-8 gap-4 mb-10 z-10 relative">
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
                    strokeOpacity="0.3"
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
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood
                      floodOpacity="0"
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
          <div className="max-w-5xl mx-auto rounded-xl relative overflow-hidden bg-dot-pattern w-full">
            {/* Showcase */}
            <div className="relative h-[450px] overflow-hidden rounded-xl bg-gray-950/[0.025] border border-white/10">
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
                        <div className="w-72 h-72 rounded-xl border border-white/10 shadow-inner bg-white/20 flex items-center justify-center">
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

        {/* 5. Dark & Light Mode */}
        <div className="bg-[#000] rounded-2xl  text-white p-4 jjustify-between border border-white/10 relative">
          {/* Header */}
          <div className="flex items-start gap-4 pt-6 md:pt-8 mb-10 z-10 relative">
            <div className="pt-1">
              <svg
                className="text-white [--site-background:var(--color-white)] dark:text-white dark:[--site-background:var(--color-gray-950)]"
                width="112"
                height="72"
                viewBox="0 0 112 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M71.7615 59.503L94.2781 46.503C97.7457 44.501 99.4795 41.8771 99.4796 39.2531L99.4796 36.2531C99.4796 33.6291 97.7458 31.0051 94.2782 29.003C87.3429 24.999 76.0987 24.999 69.1634 29.003L46.6468 42.003C43.1791 44.0051 41.4453 46.6291 41.4453 49.2531V52.2531C41.4453 54.8771 43.1791 57.501 46.6467 59.503C53.582 63.5071 64.8262 63.5071 71.7615 59.503Z"
                  fill="var(--site-background)"
                ></path>
                <path
                  d="M99.4796 36.2531C99.4796 33.6291 97.7458 31.0051 94.2782 29.003C87.3429 24.999 76.0987 24.999 69.1634 29.003L46.6468 42.003C43.1791 44.0051 41.4453 46.6291 41.4453 49.2531M99.4796 36.2531C99.4796 38.8771 97.7458 41.501 94.2782 43.503L71.7615 56.503C64.8263 60.5071 53.582 60.5071 46.6468 56.503C43.1792 54.501 41.4453 51.8771 41.4453 49.2531M99.4796 36.2531L99.4796 39.2531C99.4795 41.8771 97.7457 44.501 94.2781 46.503L71.7615 59.503C64.8262 63.5071 53.582 63.5071 46.6467 59.503C43.1791 57.501 41.4453 54.8771 41.4453 52.2531V49.2531"
                  stroke="currentColor"
                ></path>
                <path
                  d="M71.7601 41.0028C77.2604 44.1784 86.1783 44.1784 91.6786 41.0028C94.4288 39.415 95.8039 37.3339 95.8039 35.2528V32.2528C95.8039 30.1717 94.4288 28.0906 91.6786 26.5028C86.1783 23.3272 77.2604 23.3272 71.76 26.5028C69.0165 28.0868 67.6415 30.1616 67.6348 32.2377V35.2528C67.6348 37.3339 69.0099 39.415 71.7601 41.0028Z"
                  fill="var(--site-background)"
                ></path>
                <path
                  d="M67.6348 32.2377C67.6281 34.3238 69.0032 36.4111 71.76 38.0028C77.2604 41.1785 86.1783 41.1785 91.6786 38.0028C94.4288 36.415 95.8039 34.3339 95.8039 32.2528M67.6348 32.2377C67.6415 30.1616 69.0165 28.0868 71.76 26.5028C77.2604 23.3272 86.1783 23.3272 91.6786 26.5028C94.4288 28.0906 95.8039 30.1717 95.8039 32.2528M67.6348 32.2377V35.2528C67.6348 37.3339 69.0099 39.415 71.7601 41.0028C77.2604 44.1784 86.1783 44.1784 91.6786 41.0028C94.4288 39.415 95.8039 37.3339 95.8039 35.2528V32.2528"
                  stroke="currentColor"
                ></path>
                <path
                  d="M75.2239 28.5L76.956 29.5M81.719 26.9492V28.3634M88.2141 28.5L86.4821 29.5M90.9046 32.25H88.4551M86.4827 35L88.2147 36M81.719 36.1406V37.5548M76.9553 35L75.2233 36M74.9827 32.25H72.5332M83.8841 31C85.0799 31.6904 85.0799 32.8096 83.8841 33.5C82.6884 34.1904 80.7497 34.1904 79.554 33.5C78.3583 32.8096 78.3583 31.6904 79.554 31C80.7497 30.3096 82.6884 30.3096 83.8841 31Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M64.8328 29.503L42.3161 42.503C35.3809 46.5071 24.1367 46.5071 17.2014 42.503C13.7413 40.5053 12.0075 37.8883 12 35.27V32.2531C12 29.7918 13.5255 27.3305 16.5765 25.3824C17.9961 23.2104 20.98 21.4814 24.735 20.6535L39.7181 12.003C46.6533 7.99898 57.8976 7.99898 64.8328 12.003C68.3005 14.0051 70.0343 16.6291 70.0343 19.2531V22.2531C70.0342 24.8771 68.3004 27.501 64.8328 29.503Z"
                  fill="var(--site-background)"
                ></path>
                <path
                  d="M12 32.2531C12 29.6291 13.7338 27.0051 17.2015 25.003L39.7181 12.003C46.6534 7.99898 57.8976 7.99898 64.8328 12.003C68.3005 14.0051 70.0343 16.6291 70.0343 19.2531M12 32.2531C12 34.8771 13.7339 37.501 17.2015 39.503C24.1367 43.5071 35.3809 43.5071 42.3162 39.503L64.8329 26.503C68.3005 24.501 70.0343 21.8771 70.0343 19.2531M12 32.2531V35.27C12.0075 37.8883 13.7413 40.5053 17.2014 42.503C24.1367 46.5071 35.3809 46.5071 42.3162 42.503L64.8328 29.503C68.3004 27.501 70.0343 24.8771 70.0343 22.2531V19.2531"
                  stroke="currentColor"
                ></path>
                <path
                  d="M15.6738 31.2531C15.6738 35.7441 21.9797 39.3848 29.7584 39.3848C37.5371 39.3848 43.843 35.7441 43.843 31.2531L43.843 28.2531C43.843 23.762 37.5371 20.1213 29.7585 20.1213C21.9798 20.1213 15.6739 23.762 15.6739 28.2531L15.6738 31.2531Z"
                  fill="var(--site-background)"
                ></path>
                <path
                  d="M30.1939 23.6619L30.3702 22.9495L30.5465 23.6619C30.6235 23.973 31.0469 24.2175 31.5857 24.2619L32.8197 24.3637L31.5857 24.4655C31.0469 24.5099 30.6235 24.7543 30.5465 25.0655L30.3702 25.7779L30.1939 25.0655C30.117 24.7543 29.6936 24.5099 29.1547 24.4655L27.9207 24.3637L29.1547 24.2619C29.6936 24.2175 30.117 23.973 30.1939 23.6619Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M35.0507 26.4584L35.2692 25.0708L35.4877 26.4584C35.5391 26.7848 35.9722 27.0481 36.5342 27.0944L37.7187 27.1921L36.5342 27.2898C35.9722 27.3361 35.5391 27.5994 35.4877 27.9258L35.2692 29.3134L35.0507 27.9258C34.9993 27.5994 34.5662 27.3361 34.0042 27.2898L32.8197 27.1921L34.0042 27.0944C34.5662 27.0481 34.9993 26.7848 35.0507 26.4584Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M43.843 28.2531C43.843 28.2531 43.843 28.253 43.843 28.2531ZM43.843 28.2531C43.8428 32.744 37.537 36.3848 29.7585 36.3848C21.9798 36.3848 15.6739 32.7441 15.6739 28.2531M43.843 28.2531C43.843 23.762 37.5371 20.1213 29.7585 20.1213C21.9798 20.1213 15.6739 23.762 15.6739 28.2531M43.843 28.2531L43.843 31.2531C43.843 35.7441 37.5371 39.3848 29.7584 39.3848C21.9797 39.3848 15.6738 35.7441 15.6738 31.2531L15.6739 28.2531M29.7579 33.5561C24.6848 33.5561 20.5723 31.1817 20.5723 28.2528C20.5723 26.2428 22.509 24.494 25.3637 23.5945C24.6514 24.3481 24.2465 25.2125 24.2465 26.1314C24.2465 29.0604 28.359 31.4347 33.4321 31.4347C35.0238 31.4347 36.521 31.201 37.8262 30.7897C36.2682 32.4379 33.2392 33.5561 29.7579 33.5561ZM30.3702 22.9495L30.1939 23.6619C30.117 23.973 29.6936 24.2175 29.1547 24.2619L27.9207 24.3637L29.1547 24.4655C29.6936 24.5099 30.117 24.7543 30.1939 25.0655L30.3702 25.7779L30.5465 25.0655C30.6235 24.7543 31.0469 24.5099 31.5857 24.4655L32.8197 24.3637L31.5857 24.2619C31.0469 24.2175 30.6235 23.973 30.5465 23.6619L30.3702 22.9495ZM35.2692 25.0708L35.0507 26.4584C34.9993 26.7848 34.5662 27.0481 34.0042 27.0944L32.8197 27.1921L34.0042 27.2898C34.5662 27.3361 34.9993 27.5994 35.0507 27.9258L35.2692 29.3134L35.4877 27.9258C35.5391 27.5994 35.9722 27.3361 36.5342 27.2898L37.7187 27.1921L36.5342 27.0944C35.9722 27.0481 35.5391 26.7848 35.4877 26.4584L35.2692 25.0708Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-medium">Dark mode</h2>
              <p className="text-sm text-white/70 max-w-xs ">
                If you’re not a fan of burning your retinas, just stick{" "}
                <code className="font-semibold">dark:</code> in front of any
                color to apply it in dark mode.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto rounded-xl border p-2  border-white/10  relative overflow-hidden bg-dot-pattern">
            {/* Comparison container */}
            <div
              ref={containerRef}
              className="relative mx-auto w-full max-w-[375px] aspect-[375/448] rounded-xl overflow-hidden border border-white/10 bg-gray-900"
            >
              {/* Background dots grid */}
              <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_0)] opacity-[0.02] [background-size:10px_10px]" />

              {/* Dark image - onderlaag */}
              <Image
                src="/images/darkmodeimg.png"
                alt="Dark mode"
                fill
                className="object-cover pointer-events-none"
              />

              {/* Light image - bovenlaag met clip */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clip: `rect(0px, ${offsetX}px, 9999px, 0px)`,
                }}
              >
                <Image
                  src="/images/lightmodeimg.png"
                  alt="Light mode"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Scheidingslijn */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-sky-400 z-30"
                style={{ left: offsetX }}
              />

              {/* Drag knop */}
              <div
                className="absolute top-1/2 z-40 -translate-y-1/2 -translate-x-1/2 cursor-ew-resize bg-sky-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ left: offsetX }}
              >
                <svg
                  width="15"
                  height="8"
                  viewBox="0 0 15 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4L4 1M1 4L4 7M1 4H14M14 4L11 1M14 4L11 7"
                    className="stroke-white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Blue ping glow */}
                <div className="absolute inset-0 animate-ping rounded-full bg-sky-500 opacity-75"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. CSS Grid Layout */}
        <div className="bg-[#000] rounded-2xl text-white p-4 flex flex-col border border-white/10 relative">
          <div className="absolute inset-0 bg-dot-pattern bg-[length:10px_10px] opacity-5" />

          <div className="flex items-start gap-4 mb-10 pt-6 md:pt-8 z-10 relative">
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
                  d="M2.73306 34L53.8286 4.50003C54.7851 3.94774 56.3361 3.94774 57.2927 4.50003L70.283 12C70.7607 12.2758 70.9999 12.6372 71.0005 12.9986V15.9986C71.0011 16.361 70.7619 16.7235 70.283 17L72.8811 15.5C73.8377 14.9477 75.3886 14.9477 76.3452 15.5L89.3356 23C89.8145 23.2765 90.0536 23.639 90.053 24.0014V26.9986C90.0536 27.361 89.8145 27.7235 89.3356 28L91.9337 26.5C92.8903 25.9477 94.4412 25.9477 95.3978 26.5L108.388 34C108.866 34.2758 109.105 34.6372 109.106 34.9986V38C109.106 38.3619 108.866 38.7239 108.388 39L95.3978 46.5C94.4412 47.0523 92.8903 47.0523 91.9337 46.5L89.3356 45C89.8145 45.2765 90.0536 45.639 90.053 46.0014V49C90.053 49.3619 89.8139 49.7239 89.3356 50L76.3452 57.5C75.3886 58.0523 73.8377 58.0523 72.8811 57.5L70.283 56C70.7607 56.2758 70.9999 56.6372 71.0005 56.9986V60C71.0005 60.3619 70.7613 60.7239 70.283 61L57.2927 68.5C56.3361 69.0523 54.7851 69.0523 53.8286 68.5L21.7856 50C21.3073 49.7239 21.0682 49.3619 21.0682 49L21.0682 46.0014C21.0676 45.6391 21.3066 45.2767 21.7852 45.0003L19.1875 46.5C18.231 47.0523 16.68 47.0523 15.7234 46.5L2.73306 39C2.25476 38.7239 2.01561 38.3619 2.01562 38V34.9986C2.01624 34.6372 2.25538 34.2758 2.73306 34Z"
                  fill="var(--site-background)"
                ></path>
                <path
                  d="M109.106 34.9986C109.105 34.6372 108.866 34.2758 108.388 34L95.3978 26.5C94.4412 25.9477 92.8903 25.9477 91.9337 26.5L78.9433 34C78.4644 34.2765 78.2252 34.639 78.2259 35.0014M109.106 34.9986C109.106 35.361 108.867 35.7235 108.388 36L95.3978 43.5C94.4412 44.0523 92.8903 44.0523 91.9337 43.5L78.9433 36C78.4656 35.7242 78.2265 35.3629 78.2259 35.0014M109.106 34.9986V38C109.106 38.3619 108.866 38.7239 108.388 39L95.3978 46.5C94.4412 47.0523 92.8903 47.0523 91.9337 46.5L78.9433 39C78.465 38.7239 78.2258 38.3619 78.2259 38V35.0014M90.053 46.0014C90.0536 45.639 89.8145 45.2765 89.3356 45L76.3452 37.5C75.3886 36.9477 73.8377 36.9477 72.8811 37.5L59.8907 45C59.4118 45.2765 59.1727 45.639 59.1733 46.0014M90.053 46.0014C90.0524 46.3629 89.8133 46.7242 89.3356 47L76.3452 54.5C75.3886 55.0523 73.8377 55.0523 72.8811 54.5L59.8907 47C59.4131 46.7242 59.1739 46.3629 59.1733 46.0014M90.053 46.0014V49C90.053 49.3619 89.8139 49.7239 89.3356 50L76.3452 57.5C75.3886 58.0523 73.8377 58.0523 72.8811 57.5L59.8907 50C59.4124 49.7239 59.1733 49.3619 59.1733 49V46.0014M71.0005 56.9986C70.9999 56.6372 70.7607 56.2758 70.283 56L38.2401 37.5C37.2835 36.9477 35.7326 36.9477 34.776 37.5L21.7856 45C21.3067 45.2765 21.0676 45.639 21.0682 46.0014M71.0005 56.9986C71.0011 57.361 70.7619 57.7235 70.283 58L57.2927 65.5C56.3361 66.0523 54.7851 66.0523 53.8286 65.5L21.7856 47C21.3079 46.7242 21.0688 46.3629 21.0682 46.0014M71.0005 56.9986V60C71.0005 60.3619 70.7613 60.7239 70.283 61L57.2927 68.5C56.3361 69.0523 54.7851 69.0523 53.8286 68.5L21.7856 50C21.3073 49.7239 21.0682 49.3619 21.0682 49L21.0682 46.0014M40.1207 35.0014C40.1201 34.639 40.3593 34.2765 40.8382 34L72.8811 15.5C73.8377 14.9477 75.3886 14.9477 76.3452 15.5L89.3356 23C89.8145 23.2765 90.0536 23.639 90.053 24.0014M40.1207 35.0014C40.1214 35.3629 40.3605 35.7242 40.8382 36L53.8286 43.5C54.7851 44.0523 56.3361 44.0523 57.2927 43.5L89.3356 25C89.8133 24.7242 90.0524 24.3629 90.053 24.0014M40.1207 35.0014V38C40.1207 38.3619 40.3599 38.7239 40.8382 39L53.8286 46.5C54.7851 47.0523 56.3361 47.0523 57.2927 46.5L89.3356 28C89.8145 27.7235 90.0536 27.361 90.053 26.9986V24.0014M71.0005 12.9986C70.9999 12.6372 70.7607 12.2758 70.283 12L57.2927 4.50003C56.3361 3.94774 54.7851 3.94774 53.8286 4.50003L2.73306 34C2.25538 34.2758 2.01624 34.6372 2.01563 34.9986M71.0005 12.9986C71.0011 13.361 70.7619 13.7235 70.283 14L19.1875 43.5C18.231 44.0523 16.68 44.0523 15.7234 43.5L2.73306 36C2.25416 35.7235 2.01501 35.361 2.01563 34.9986M71.0005 12.9986V15.9986C71.0011 16.361 70.7619 16.7235 70.283 17L19.1875 46.5C18.231 47.0523 16.68 47.0523 15.7234 46.5L2.73306 39C2.25476 38.7239 2.01561 38.3619 2.01562 38L2.01563 34.9986"
                  stroke="currentColor"
                ></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-medium">CSS grid layout</h2>
              <p className="text-sm text-white/70 max-w-xs ">
                Using grid utilities directly in your HTML makes it so much
                easier to reason about complex layouts.
              </p>
            </div>
          </div>

          {/* Browse properties */}
          <div className="rounded-xl border p-2 min-h-[450px] border-white/10 relative overflow-hidden bg-dot-pattern">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 h-[445px] overflow-hidden rounded-xl group">
              {/* Treehouse */}
              <div className="row-span-2 relative rounded-xl overflow-hidden transition duration-300 group-hover:blur-sm hover:!blur-0">
                <Image
                  src="/images/grid-1.png"
                  alt="Treehouses"
                  width={600}
                  height={800}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-medium bg-black/40">
                  Treehouses
                </div>
              </div>

              {/* Mansions */}
              <div className="relative rounded-xl overflow-hidden transition duration-300 group-hover:blur-sm hover:!blur-0">
                <Image
                  src="/images/grid-2.png"
                  alt="Mansions"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-medium bg-black/40">
                  Mansions
                </div>
              </div>

              {/* Lakefront cottages */}
              <div className="relative rounded-xl overflow-hidden transition duration-300 group-hover:blur-sm hover:!blur-0">
                <Image
                  src="/images/grid-3.png"
                  alt="Lakefront cottages"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-medium bg-black/40">
                  Lakefront cottages
                </div>
              </div>

              {/* Designer homes */}
              <div className="col-span-2 relative rounded-xl overflow-hidden transition duration-300 group-hover:blur-sm hover:!blur-0">
                <Image
                  src="/images/grid-4.png"
                  alt="Designer homes"
                  width={1200}
                  height={400}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-medium bg-black/40">
                  Designer homes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7. 3D Transforms */}
        <div className="bg-[#000] rounded-2xl text-white p-4 border border-white/10 relative">
          <div className="absolute inset-0 bg-dot-pattern bg-[length:10px_10px] opacity-5 pointer-events-none" />

          {/* Header */}
          <div className="flex items-start gap-4 pt-6 md:pt-8 mb-10 z-10 relative">
            <div className="pt-1">
              <svg
                className="text-gray-950 [--site-background:var(--color-white)] dark:text-white dark:[--site-background:var(--color-gray-950)]"
                width="112"
                height="72"
                viewBox="0 0 112 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_408_5745)">
                  <rect
                    width="63"
                    height="63"
                    rx="4"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 1.92969 39.814)"
                    stroke="currentColor"
                    strokeDasharray="3 3"
                  ></rect>
                  <path
                    d="M6.82052 32.0748C4.71896 30.8759 4.9198 28.8839 7.24809 27.8339L42.7856 11.8071C44.6906 10.948 47.3962 11.0195 49.1572 11.9756L100.957 40.0964C102.762 41.0766 103.015 42.6809 101.546 43.8334L73.7036 65.6789C71.933 67.0682 68.4396 67.2268 66.3145 66.0145L6.82052 32.0748Z"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></path>
                  <path
                    d="M74.1457 62.6688L101.618 43.5542C102.344 43.0493 102.721 42.4339 102.745 41.8139V38.6818C102.722 38.0961 102.384 37.5131 101.729 37.0222L56.8938 3.4116C55.3193 2.23135 52.4292 1.95847 50.2856 2.78769L13.3287 17.0838C11.9732 17.6082 11.2255 18.4488 11.1608 19.3139V22.3139C11.1111 22.9798 11.4661 23.6601 12.2601 24.2219L66.5802 62.651C68.5301 64.0305 72.1763 64.0391 74.1457 62.6688Z"
                    fill="var(--site-background)"
                  ></path>
                  <path
                    d="M102.745 38.6818C102.722 38.0961 102.384 37.5131 101.729 37.0222L56.8938 3.4116C55.3193 2.23135 52.4292 1.95847 50.2856 2.78769L13.3287 17.0838C11.9732 17.6082 11.2255 18.4488 11.1608 19.3139M102.745 38.6818C102.772 39.3459 102.395 40.0135 101.618 40.5542L74.1457 59.6688C72.1763 61.0391 68.5301 61.0305 66.5802 59.651L12.2601 21.2219C11.4661 20.6601 11.1111 19.9798 11.1608 19.3139M102.745 38.6818V41.8139C102.721 42.4339 102.344 43.0493 101.618 43.5542L74.1457 62.6688C72.1763 64.0391 68.5301 64.0305 66.5802 62.651L12.2601 24.2219C11.4661 23.6601 11.1111 22.9798 11.1608 22.3139V19.3139"
                    stroke="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_408_5745">
                    <rect
                      width="112"
                      height="72"
                      fill="var(--site-background)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">3D transforms</h2>
              <p className="text-gray-400 mt-1 text-sm max-w-md">
                Sometimes two dimensions aren’t enough. Scale, rotate, and
                translate any element in 3D space to add a touch of depth.
              </p>
            </div>
          </div>

          {/* 3D Tilt Card */}
          <div className="rounded-xl border p-2 min-h-[450px] flex items-center justify-center border-white/10 relative overflow-hidden bg-dot-pattern">
            <TiltImageCard image="/images/3d-transform.jpeg" />
          </div>
        </div>

        {/* 8. Transitions and animations */}
        <div className="bg-[#000] rounded-2xl text-white p-4 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern bg-[length:10px_10px] opacity-5 pointer-events-none" />

          {/* Header */}
          <div className="flex items-start gap-4 mb-10 pt-6 md:pt-8 z-10 relative">
            <svg
              className="text-gray-950 [--site-background:var(--color-white)] dark:text-white dark:[--site-background:var(--color-gray-950)]"
              width="112"
              height="72"
              viewBox="0 0 112 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_408_5765)">
                <path
                  d="M11.3887 58.234C11.3887 59.5912 12.2855 60.9484 14.0791 61.984C17.6663 64.055 23.4823 64.055 27.0694 61.984C28.863 60.9484 29.7598 59.5912 29.7598 58.234M11.3887 58.234C11.3887 56.8767 12.2855 55.5195 14.0791 54.484C17.6663 52.4129 23.4823 52.4129 27.0694 54.484C28.8631 55.5195 29.7598 56.8767 29.7598 58.234M11.3887 58.234V61.234C11.3887 62.5912 12.2855 63.9484 14.0791 64.984C17.6663 67.055 23.4823 67.055 27.0694 64.984C28.863 63.9484 29.7598 62.5912 29.7598 61.234V58.234"
                  stroke="currentColor"
                  strokeOpacity="0.2"
                ></path>
                <path
                  d="M44.3896 44.484C38.8892 41.3084 29.9714 41.3084 24.471 44.484C21.7208 46.0718 20.3457 48.1529 20.3458 50.234L20.3457 53.234C20.3457 55.3151 21.7208 57.3962 24.471 58.984C29.9713 62.1597 38.8892 62.1597 44.3896 58.984C47.1397 57.3962 48.5148 55.3151 48.5148 53.234V50.2555C48.5243 48.1673 47.1493 46.0773 44.3896 44.484Z"
                  fill="var(--site-background)"
                  fillOpacity="0.4"
                ></path>
                <path
                  d="M20.3458 50.234C20.3458 52.3151 21.7208 54.3962 24.471 55.984C29.9714 59.1597 38.8892 59.1597 44.3896 55.984C47.1303 54.4017 48.5054 52.3294 48.5148 50.2555M20.3458 50.234C20.3457 48.1529 21.7208 46.0718 24.471 44.484C29.9714 41.3084 38.8892 41.3084 44.3896 44.484C47.1493 46.0773 48.5243 48.1673 48.5148 50.2555M20.3458 50.234L20.3457 53.234C20.3457 55.3151 21.7208 57.3962 24.471 58.984C29.9713 62.1597 38.8892 62.1597 44.3896 58.984C47.1397 57.3962 48.5148 55.3151 48.5148 53.234V50.2555"
                  stroke="currentColor"
                  strokeOpacity="0.4"
                ></path>
                <path
                  d="M61.7097 34.484C54.2962 30.2038 42.2765 30.2038 34.8629 34.484C31.1562 36.6241 29.3028 39.429 29.3028 42.234L29.3027 45.234C29.3027 48.0389 31.1561 50.8439 34.8629 52.984C42.2764 57.2642 54.2961 57.2642 61.7097 52.984C65.4164 50.8439 67.2698 48.0389 67.2698 45.234V42.2104C67.2595 39.4133 65.4061 36.6181 61.7097 34.484Z"
                  fill="var(--site-background)"
                  fillOpacity="0.6"
                ></path>
                <path
                  d="M29.3028 42.234C29.3028 45.0389 31.1562 47.8439 34.8629 49.984C42.2765 54.2642 54.2962 54.2642 61.7097 49.984C65.4269 47.8379 67.2802 45.0232 67.2698 42.2104M29.3028 42.234C29.3028 39.429 31.1562 36.6241 34.8629 34.484C42.2765 30.2038 54.2962 30.2038 61.7097 34.484C65.4061 36.6181 67.2595 39.4133 67.2698 42.2104M29.3028 42.234L29.3027 45.234C29.3027 48.0389 31.1561 50.8439 34.8629 52.984C42.2764 57.2642 54.2961 57.2642 61.7097 52.984C65.4164 50.8439 67.2698 48.0389 67.2698 45.234V42.2104"
                  stroke="currentColor"
                  strokeOpacity="0.6"
                ></path>
                <path
                  d="M79.0318 24.484C69.7051 19.0992 54.5835 19.0992 45.2568 24.484C40.5934 27.1764 38.2618 30.7052 38.2618 34.234L38.2617 37.234C38.2617 40.7628 40.5934 44.2916 45.2567 46.984C54.5835 52.3688 69.705 52.3688 79.0317 46.984C83.6951 44.2916 86.0268 40.7628 86.0268 37.234L86.0268 34.234C86.0268 30.7052 83.6951 27.1764 79.0318 24.484Z"
                  fill="var(--site-background)"
                  fillOpacity="0.8"
                ></path>
                <path
                  d="M38.2618 34.234C38.2618 37.7628 40.5934 41.2916 45.2568 43.984C54.5835 49.3688 69.7051 49.3688 79.0318 43.984C83.6951 41.2916 86.0268 37.7628 86.0268 34.234M38.2618 34.234C38.2618 30.7052 40.5934 27.1764 45.2568 24.484C54.5835 19.0992 69.7051 19.0992 79.0318 24.484C83.6951 27.1764 86.0268 30.7052 86.0268 34.234M38.2618 34.234L38.2617 37.234C38.2617 40.7628 40.5934 44.2916 45.2567 46.984C54.5835 52.3688 69.705 52.3688 79.0317 46.984C83.6951 44.2916 86.0268 40.7628 86.0268 37.234L86.0268 34.234"
                  stroke="currentColor"
                  strokeOpacity="0.8"
                ></path>
                <path
                  d="M55.6487 37.9841C66.8885 44.4734 85.112 44.4734 96.3519 37.9841C101.972 34.7394 104.782 30.4867 104.782 26.2341L104.782 23.2341C104.782 18.9814 101.972 14.7287 96.3518 11.4841C85.112 4.99473 66.8885 4.99473 55.6487 11.4841C50.0287 14.7287 47.2188 18.9814 47.2188 23.2341L47.2188 26.2341C47.2188 30.4867 50.0287 34.7394 55.6487 37.9841Z"
                  fill="var(--site-background)"
                ></path>
                <path
                  d="M104.782 23.2341C104.782 18.9814 101.972 14.7287 96.3518 11.4841C85.112 4.99473 66.8885 4.99473 55.6487 11.4841C50.0287 14.7287 47.2188 18.9814 47.2188 23.2341M104.782 23.2341C104.782 27.4867 101.972 31.7394 96.3518 34.9841C85.112 41.4734 66.8885 41.4734 55.6487 34.9841C50.0287 31.7394 47.2187 27.4867 47.2188 23.2341M104.782 23.2341L104.782 26.2341C104.782 30.4867 101.972 34.7394 96.3519 37.9841C85.112 44.4734 66.8885 44.4734 55.6487 37.9841C50.0287 34.7394 47.2188 30.4867 47.2188 26.2341L47.2188 23.2341"
                  stroke="currentColor"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_408_5765">
                  <rect
                    width="112"
                    height="72"
                    fill="var(--site-background)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
            <div>
              <h2 className="text-xl pb-1 font-semibold">
                Transitions and animations
              </h2>
              <p className="text-gray-400 mt-1 text-sm max-w-md">
                Transitions that work the way you&apos;d expect — throw a few
                utilities on an element and you&apos;re in business.
              </p>
            </div>
          </div>

          {/* Demo */}
          <div className="rounded-xl border h-[450px] p-6 border-white/10 bg-dot-pattern flex flex-col justify-between">
            {[
              {
                label: "linear",
                color: "bg-cyan-400",
                stroke: "#06b6d4",
                anim: "glowLinear",
              },
              {
                label: "ease-out",
                color: "bg-violet-400",
                stroke: "#a78bfa",
                anim: "glowEaseOut",
              },
              {
                label: "ease-in-out",
                color: "bg-pink-400",
                stroke: "#f472b6",
                anim: "glowEaseInOut",
              },
              {
                label: "ease-in",
                color: "bg-indigo-400",
                stroke: "#818cf8",
                anim: "glowEaseIn",
              },
            ].map(({ label, color, stroke, anim }, i) => (
              <div key={i} className="flex items-center gap-4">
                {/* Icon + Label */}
                <div className="flex items-center gap-3 w-40">
                  <div className="w-14 h-14 bg-[#1E1E1E] rounded-xl flex items-center justify-center">
                    <svg
                      viewBox="0 0 32 32"
                      width="32"
                      height="32"
                      fill="none"
                      className={`absolute `}
                    >
                      <path
                        d={
                          label === "linear"
                            ? "M0 32 L32 0"
                            : label === "ease-in"
                            ? "M0 32 C8 32, 24 0, 32 0"
                            : label === "ease-out"
                            ? "M0 32 C8 0, 24 0, 32 0"
                            : "M0 32 C8 0, 24 32, 32 0"
                        }
                        stroke="white"
                        strokeWidth="2"
                        className={color}
                      />
                    </svg>
                  </div>
                  <span className="font-mono text-xs">{label}</span>
                </div>

                {/* Track + dot */}
                <div className="relative w-full h-4">
                  <div className="absolute inset-y-0 mt-2 left-0 right-0 border-t border-white/10" />
                  <div className="absolute left-0 top-1/2 w-2 h-2 -translate-y-1/2 backdrop-blur-sm bg-white/20 rounded-full" />
                  <div className="absolute right-0 top-1/2 w-2 h-2 -translate-y-1/2 backdrop-blur-sm bg-white/20 rounded-full" />
                  <div
                    className={`absolute top-1/2 left-0 w-8 h-8 -mt-4 -translate-y-1/2 rounded-md shadow-xl ${color}`}
                    style={{
                      animation: `moveBall 2.5s ${label} infinite alternate`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Animations */}
          <style jsx>{`
            @keyframes moveBall {
              from {
                left: 0%;
                transform: translateX(0%);
              }
              to {
                left: 100%;
                transform: translateX(-100%);
              }
            }

            @keyframes glowLinear {
              0%,
              100% {
                stroke: #06b6d4;
              }
              50% {
                stroke: #0ff;
              }
            }

            @keyframes glowEaseOut {
              0%,
              100% {
                stroke: #a78bfa;
              }
              50% {
                stroke: #d8b4fe;
              }
            }

            @keyframes glowEaseInOut {
              0%,
              100% {
                stroke: #f472b6;
              }
              50% {
                stroke: #fb7185;
              }
            }

            @keyframes glowEaseIn {
              0%,
              100% {
                stroke: #818cf8;
              }
              50% {
                stroke: #a5b4fc;
              }
            }

            .animate-glowLinear {
              animation: glowLinear 2.5s linear infinite;
            }
            .animate-glowEaseOut {
              animation: glowEaseOut 2.5s ease-out infinite;
            }
            .animate-glowEaseInOut {
              animation: glowEaseInOut 2.5s ease-in-out infinite;
            }
            .animate-glowEaseIn {
              animation: glowEaseIn 2.5s ease-in infinite;
            }
          `}</style>
        </div>

        {/* 9. Gradients */}
        <div className="bg-[#000] rounded-2xl text-white p-4 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern bg-[length:10px_10px] opacity-5 pointer-events-none" />

          {/* Header */}
          <div className="flex items-start gap-4 pt-6 md:pt-8 mb-10 z-10 relative">
            <svg
              className="text-gray-950 [--site-background:var(--color-white)] dark:text-white dark:[--site-background:var(--color-gray-950)]"
              width="112"
              height="72"
              viewBox="0 0 112 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_408_5730)">
                <path
                  d="M51.2301 6.00001L5.33071 32.5C4.1443 33.185 3.54647 34.0811 3.53722 34.9788V38C3.53721 38.9048 4.13508 39.8097 5.33082 40.5L51.2302 67C53.6216 68.3807 57.4989 68.3807 59.8904 67L105.79 40.5C106.985 39.8097 107.583 38.9048 107.583 38L107.583 35C107.583 34.0952 106.985 33.1904 105.79 32.5L59.8903 6.00001C57.4988 4.6193 53.6215 4.6193 51.2301 6.00001Z"
                  fill="var(--site-background)"
                ></path>
                <path
                  d="M107.583 35C107.583 34.0952 106.985 33.1904 105.79 32.5L59.8903 6.00001C57.4988 4.6193 53.6215 4.6193 51.2301 6.00001L5.33071 32.5C4.1443 33.185 3.54647 34.0811 3.53722 34.9788M107.583 35C107.583 35.9048 106.985 36.8097 105.79 37.5L59.8903 64C57.4988 65.3807 53.6215 65.3807 51.2301 64L5.33071 37.5C4.12565 36.8043 3.52782 35.8907 3.53722 34.9788M107.583 35L107.583 38C107.583 38.9048 106.985 39.8097 105.79 40.5L59.8904 67C57.4989 68.3807 53.6216 68.3807 51.2302 67L5.33082 40.5C4.13508 39.8097 3.53721 38.9048 3.53722 38V34.9788"
                  stroke="currentColor"
                ></path>
                <path
                  d="M54.6946 61.9999C55.1729 62.276 55.9484 62.276 56.4267 61.9999L100.594 36.4999L56.4267 10.9999C55.9484 10.7238 55.1729 10.7237 54.6946 10.9999L10.5273 36.4999L54.6946 61.9999Z"
                  fill="url(#paint0_linear_408_5730)"
                ></path>
                <path
                  d="M100.593 36.4999L56.4257 10.9999C55.9474 10.7238 55.1719 10.7237 54.6936 10.9999L10.5263 36.4999M100.593 36.4999L102.325 35.4999C102.803 35.2238 102.803 34.776 102.325 34.4999L56.4257 7.99989C55.9474 7.72375 55.1719 7.72375 54.6936 7.99989L8.79427 34.4999C8.31597 34.776 8.31597 35.2237 8.79427 35.4999L10.5263 36.4999M100.593 36.4999L56.4257 61.9999C55.9474 62.276 55.1719 62.276 54.6936 61.9999L10.5263 36.4999"
                  stroke="currentColor"
                ></path>
                <path
                  d="M79.6783 25.5L70.152 31C69.1954 31.5523 68.4199 32.8954 68.4199 34V45C68.4199 45.5161 68.5892 45.8888 68.8672 46.0831L70.6723 47.1287C70.9847 47.3015 71.4123 47.2723 71.884 47L74.9151 45.25L76.6472 46.25L78.3792 43.25L81.4103 41.5C82.3669 40.9477 83.1424 39.6046 83.1424 38.5V27.5C83.1424 26.9318 82.9371 26.5374 82.6076 26.3635L80.8672 25.3592C80.557 25.2 80.1386 25.2342 79.6783 25.5Z"
                  fill="var(--site-background)"
                ></path>
                <path
                  d="M70.6723 47.1287C70.3512 46.951 70.152 46.5599 70.152 46L70.152 35C70.152 33.8954 70.9274 32.5523 71.884 32L81.4103 26.5C81.8748 26.2318 82.2966 26.1994 82.6076 26.3635M70.6723 47.1287C70.9847 47.3015 71.4123 47.2723 71.884 47L74.9151 45.25L76.6472 46.25L78.3792 43.25L81.4103 41.5C82.3669 40.9477 83.1424 39.6046 83.1424 38.5V27.5C83.1424 26.9318 82.9371 26.5374 82.6076 26.3635M70.6723 47.1287L68.8672 46.0831C68.5892 45.8888 68.4199 45.5161 68.4199 45V34C68.4199 32.8954 69.1954 31.5523 70.152 31L79.6783 25.5C80.1386 25.2342 80.557 25.2 80.8672 25.3592L82.6076 26.3635"
                  stroke="currentColor"
                ></path>
                <path
                  d="M71.8848 34L81.411 28.5V39.5L71.8848 45V34Z"
                  stroke="currentColor"
                ></path>
                <path
                  d="M39.8404 2.49999L30.3141 7.99999C29.3575 8.55227 28.582 9.89542 28.582 11V22C28.582 22.5161 28.7513 22.8888 29.0293 23.0831L30.8344 24.1287C31.1468 24.3015 31.5744 24.2723 32.0461 24L35.0772 22.25L36.8093 23.25L38.5413 20.25L41.5724 18.5C42.529 17.9477 43.3045 16.6046 43.3045 15.5V4.49998C43.3045 3.93176 43.0992 3.53737 42.7697 3.36352L41.0293 2.35916C40.7191 2.20002 40.3007 2.23421 39.8404 2.49999Z"
                  fill="var(--site-background)"
                ></path>
                <path
                  d="M30.8344 24.1287C30.5133 23.951 30.3141 23.5599 30.3141 23L30.3141 12C30.3141 10.8954 31.0896 9.55227 32.0461 8.99998L41.5724 3.49999C42.0369 3.23181 42.4587 3.19942 42.7697 3.36352M30.8344 24.1287C31.1468 24.3015 31.5744 24.2723 32.0461 24L35.0772 22.25L36.8093 23.25L38.5413 20.25L41.5724 18.5C42.529 17.9477 43.3045 16.6046 43.3045 15.5V4.49998C43.3045 3.93176 43.0992 3.53737 42.7697 3.36352M30.8344 24.1287L29.0293 23.0831C28.7513 22.8888 28.582 22.5161 28.582 22V11C28.582 9.89542 29.3575 8.55227 30.3141 7.99999L39.8404 2.49999C40.3007 2.23421 40.7191 2.20002 41.0293 2.35916L42.7697 3.36352"
                  stroke="currentColor"
                ></path>
                <path
                  d="M32.0469 11L41.5732 5.5V16.5L32.0469 22V11Z"
                  fill="currentColor"
                  fillOpacity="0.75"
                  stroke="currentColor"
                ></path>
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_408_5730"
                  x1="10.501"
                  y1="36"
                  x2="55.5607"
                  y2="62.207"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="currentColor" stopOpacity="0.75"></stop>
                  <stop offset="1" stopColor="var(--site-background)"></stop>
                </linearGradient>
                <clipPath id="clip0_408_5730">
                  <rect
                    width="112"
                    height="72"
                    fill="var(--site-background)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
            <div>
              <h2 className="text-xl font-semibold">Gradients</h2>
              <p className="text-gray-400 mt-1 text-sm max-w-md">
                No need to remember that complicated gradient syntax — create
                silky-smooth gradients with just a few utility classes.
              </p>
            </div>
          </div>

          {/* Demo */}
          <div className="rounded-xl border p-6 border-white/10 h-[450px] bg-dot-pattern flex flex-col justify-between space-y-6">
            <div className="space-y-5 text-sm font-medium">
              <div className="flex items-center justify-between">
                <span>Render time performance</span>
                <span className="text-white/70">6.4</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400" />

              <div className="flex items-center justify-between">
                <span>Real-time frame rate</span>
                <span className="text-white/70">4.2</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-pink-500 via-orange-300 to-yellow-300" />

              <div className="flex items-center justify-between">
                <span>Multi-platform build time</span>
                <span className="text-white/70">2.7</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400" />

              <div className="flex items-center justify-between">
                <span>Shader compile duration</span>
                <span className="text-white/70">3.8</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-400 to-orange-300" />

              <div className="flex items-center justify-between">
                <span>Animation smoothness</span>
                <span className="text-white/70">5.1</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500" />

              <div className="flex items-center justify-between">
                <span>Startup time</span>
                <span className="text-white/70">1.9</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-sky-300 via-blue-500 to-indigo-500" />
            </div>
          </div>
        </div>

        {/* 10. Colour Codes*/}
        <div className="bg-[#000] rounded-2xl text-white p-4 flex flex-col justify-between border border-white/10 relative">
          <div className="absolute inset-0 bg-dot-pattern bg-[length:10px_10px] opacity-5" />

          <div className="flex items-start gap-4 mb-10 pt-6 md:pt-8 z-10 relative">
            <div className="pt-1">
              <svg
                className="text-gray-950 [--site-background:var(--color-white)] dark:text-white dark:[--site-background:var(--color-gray-950)]"
                width="112"
                height="72"
                viewBox="0 0 112 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_408_5776)">
                  <path
                    d="M52.1952 5.0003L4.56383 32.5003C3.60721 33.0526 3.12888 33.7765 3.12891 34.5004V37.5004C3.12892 38.2242 3.60721 38.9481 4.56378 39.5003L52.1952 67.0003C54.1083 68.1049 57.2102 68.1049 59.1234 67.0003L106.755 39.5003C107.711 38.9481 108.19 38.2242 108.19 37.5004V34.5004C108.19 33.7765 107.711 33.0526 106.755 32.5003L59.1234 5.0003C57.2103 3.89573 54.1084 3.89573 52.1952 5.0003Z"
                    fill="var(--site-background)"
                  ></path>
                  <path
                    d="M3.12891 34.5004C3.12888 33.7765 3.60721 33.0526 4.56383 32.5003L52.1952 5.0003C54.1084 3.89573 57.2103 3.89573 59.1234 5.0003L106.755 32.5003C107.711 33.0526 108.19 33.7765 108.19 34.5004M3.12891 34.5004C3.12893 35.2242 3.60727 35.948 4.56383 36.5003L52.1952 64.0003C54.1084 65.1049 57.2103 65.1049 59.1234 64.0003L106.755 36.5003C107.711 35.948 108.19 35.2242 108.19 34.5004M3.12891 34.5004V37.5004C3.12892 38.2242 3.60721 38.9481 4.56378 39.5003L52.1952 67.0003C54.1083 68.1049 57.2102 68.1049 59.1234 67.0003L106.755 39.5003C107.711 38.9481 108.19 38.2242 108.19 37.5004V34.5004"
                    stroke="currentColor"
                  ></path>
                  <path
                    d="M13.2223 38.5L59.9877 11.5C60.4659 11.2239 61.2414 11.2239 61.7197 11.5L103.289 35.5M13.2223 38.5L54.7915 62.5C55.2698 62.7761 56.0453 62.7761 56.5236 62.5L103.289 35.5M13.2223 38.5L12.3563 38C11.878 37.7239 11.878 37.2761 12.3563 37L59.9877 9.5C60.4659 9.22386 61.2414 9.22386 61.7197 9.5L104.155 34C104.633 34.2761 104.633 34.7239 104.155 35L103.289 35.5"
                    stroke="currentColor"
                  ></path>
                  <path
                    d="M10.7309 33.4928C10.7277 33.2238 10.5484 32.9554 10.1928 32.7501C9.4754 32.3359 8.3122 32.3359 7.59476 32.7501C7.23924 32.9554 7.0599 33.2238 7.05673 33.4928M10.7309 33.4928C10.7341 33.7667 10.5548 34.0412 10.1928 34.2501C9.4754 34.6643 8.3122 34.6643 7.59476 34.2501C7.23284 34.0412 7.0535 33.7667 7.05673 33.4928M10.7309 33.4928V34.5001C10.7308 34.7715 10.5515 35.043 10.1928 35.2501C9.47536 35.6643 8.31216 35.6643 7.59472 35.2501C7.24053 35.0456 7.0612 34.7783 7.05673 34.5103V33.4928"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                  ></path>
                  <path
                    d="M15.061 31.0001C15.061 30.7287 14.8816 30.4572 14.5229 30.2501C13.8054 29.8359 12.6422 29.8359 11.9248 30.2501C11.5681 30.4561 11.3887 30.7257 11.3867 30.9956M15.061 31.0001C15.0609 31.2716 14.8816 31.543 14.5229 31.7501C13.8054 32.1643 12.6422 32.1643 11.9248 31.7501C11.5641 31.5419 11.3847 31.2685 11.3867 30.9956M15.061 31.0001V32.0033C15.0596 32.2736 14.8802 32.5438 14.5229 32.7501C13.8054 33.1643 12.6422 33.1643 11.9248 32.7501C11.5675 32.5438 11.3881 32.2736 11.3867 32.0033V30.9956"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                  ></path>
                  <path
                    d="M15.7168 28.5001C15.7168 28.7716 15.8962 29.043 16.2549 29.2501C16.9723 29.6643 18.1355 29.6643 18.853 29.2501C19.2117 29.043 19.391 28.7716 19.391 28.5001M15.7168 28.5001C15.7168 28.2287 15.8962 27.9572 16.2549 27.7501C16.9723 27.3359 18.1355 27.3359 18.853 27.7501C19.2117 27.9572 19.391 28.2287 19.391 28.5001M15.7168 28.5001L15.7169 29.5001C15.7169 29.7715 15.8962 30.043 16.2549 30.2501C16.9724 30.6643 18.1356 30.6643 18.853 30.2501C19.2117 30.043 19.3911 29.7715 19.3911 29.5001L19.391 28.5001"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                  ></path>
                  <rect
                    width="8"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 24.4805 39.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="8"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 41.8027 49.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="8"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 19.2852 38.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="5"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 33.1406 34.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="5"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 50.4629 44.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="7"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 29.6777 40.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="7"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 46.998 50.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="4"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 34.873 41.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="4"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 53.9258 54.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="4"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 52.1934 51.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="4"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 36.6055 44.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="4"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 55.6582 57.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="4"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 38.3379 47.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="7"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 39.2031 31)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="5"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 56.5234 41)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="6"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 37.4727 36)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="6"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 54.793 46)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="9"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 40.0703 38.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="9"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 57.3906 48.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="4"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 44.3984 32)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="12"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 61.7207 42)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="7"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 49.5957 33)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="7"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 66.918 43)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="10"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 57.3906 28.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                  <rect
                    width="10"
                    height="2"
                    rx="0.5"
                    transform="matrix(0.866025 -0.5 0.866025 0.5 74.7109 38.5)"
                    fill="currentColor"
                    fillOpacity="0.3"
                  ></rect>
                </g>
                <defs>
                  <clipPath id="clip0_408_5776">
                    <rect
                      width="112"
                      height="72"
                      fill="var(--site-background)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">CSS variables</h2>
              <p className="text-gray-400 mt-1 mb-6 text-sm">
                Customizing your theme is as simple as creating a few CSS
                variables.
              </p>
            </div>
          </div>
          <div className=" gap-4 z-10 relative">
            <div className=" bg-dot-pattern rounded-xl pt-8 pl-8 text-xs font-mono leading-relaxed overflow-x-auto border border-white/10">
              <div className="rounded-tl-xl backdrop-blur-sm pt-2 pl-1 border-t border-l border-[#fff]/30">
                <div className="flex gap-2 p-2 pt-1 pb-2.5 ">
                  <span className="size-3 rounded-full bg-red-400"></span>
                  <span className="size-3 rounded-full bg-yellow-400"></span>
                  <span className="size-3 rounded-full bg-green-500"></span>
                </div>

                <div className="bg-[#11141b] border-l border-white/10 border-t rounded-tl-xl overflow-hidden font-mono text-xs">
                  <div className="flex">
                    {/* Line numbers */}
                    <div className="text-right text-gray-500 pl-4 pr-4 py-3 select-none border-r border-white/10">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="leading-6">
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    <div className="py-3 px-4 overflow-x-auto w-full text-white">
                      <pre className="whitespace-pre leading-6">
                        <code>
                          <span className="text-fuchsia-400">@theme</span>{" "}
                          {"{\n"}
                          {"  "}
                          <span className="text-sky-400">
                            --font-sans
                          </span>:{" "}
                          <span className="text-emerald-400">
                            &quot;Inter&quot;
                          </span>
                          , sans-serif;
                          {"\n"}
                          {"  "}
                          <span className="text-sky-400">
                            --font-mono
                          </span>:{" "}
                          <span className="text-emerald-400">
                            &quot;IBM Plex Mono&quot;
                          </span>
                          , monospace;
                          {"\n"}
                          {"  "}
                          <span className="text-sky-400">--text-tiny</span>:
                          0.625rem;
                          {"\n"}
                          {"  "}
                          <span className="text-sky-400">
                            --text-tiny--line-height
                          </span>
                          : 1.5rem;
                          {"\n"}
                          {"  "}
                          <span className="text-sky-400">--color-mint-100</span>
                          :{" "}
                          <span className="text-amber-400">
                            oklch(0.97 0.15 145)
                          </span>
                          ;{"\n"}
                          {"  "}
                          <span className="text-sky-400">--color-mint-200</span>
                          :{" "}
                          <span className="text-amber-400">
                            oklch(0.92 0.18 145)
                          </span>
                          ;{"\n"}
                          {"  "}
                          <span className="text-sky-400">--color-mint-300</span>
                          :{" "}
                          <span className="text-amber-400">
                            oklch(0.85 0.22 145)
                          </span>
                          ;{"\n"}
                          {"  "}
                          <span className="text-sky-400">--color-mint-400</span>
                          :{" "}
                          <span className="text-amber-400">
                            oklch(0.78 0.25 145)
                          </span>
                          ;{"\n"}
                          {"  "}
                          <span className="text-sky-400">--color-mint-500</span>
                          :{" "}
                          <span className="text-amber-400">
                            oklch(0.7 0.28 145)
                          </span>
                          ;{"\n"}
                          {"  "}
                          <span className="text-sky-400">--color-mint-600</span>
                          :{" "}
                          <span className="text-amber-400">
                            oklch(0.63 0.3 145)
                          </span>
                          ;{"\n"}
                          {"  "}
                          <span className="text-sky-400">--color-mint-700</span>
                          :{" "}
                          <span className="text-amber-400">
                            oklch(0.56 0.32 145)
                          </span>
                          ;{"\n"}
                          {"  "}
                          <span className="text-sky-400">--color-mint-800</span>
                          :{" "}
                          <span className="text-amber-400">
                            oklch(0.48 0.35 145)
                          </span>
                          ;{"\n"}
                          {"  "}
                          <span className="text-sky-400">--color-mint-900</span>
                          :{" "}
                          <span className="text-amber-400">
                            oklch(0.4 0.37 145)
                          </span>
                          ;{"\n"}
                          {"}"}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-2">
        <KleurenPalet />
      </div>
    </div>
  );
}
