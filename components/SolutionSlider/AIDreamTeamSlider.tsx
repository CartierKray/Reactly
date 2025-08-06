"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const dreamTeam = [
  {
    title: "An AI expert for every area of your business",
    label: "New",
    gradient: true,
    message:
      "Put Similarweb’s digital insights to work in a click with our AI-powered experts.",
    img: "/images/8767b54c45dea940138c.png",
    icon: "/images/8767b54c45dea940138c.png",
  },
  {
    title: "Spots consumer trends before they go mainstream",
    label: "New",
    gradient: true,
    message:
      "Detects spikes in search volume and connects them to real-world activity so you can act on them faster.",
    img: "/images/df88c88d0dccdaf4ec61.png",
    icon: "/images/df88c88d0dccdaf4ec61.png",
  },
  {
    title: "An AI expert for every area of your business",
    label: "New",
    gradient: true,
    message:
      "Put Similarweb’s digital insights to work in a click with our AI-powered experts.",
    img: "/images/8767b54c45dea940138c.png",
    icon: "/images/8767b54c45dea940138c.png",
  },
  {
    title: "Spots consumer trends before they go mainstream",
    label: "New",
    gradient: true,
    message:
      "Detects spikes in search volume and connects them to real-world activity so you can act on them faster.",
    img: "/images/df88c88d0dccdaf4ec61.png",
    icon: "/images/df88c88d0dccdaf4ec61.png",
  },
];

export default function AIDreamTeamSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector("div")?.clientWidth || 360;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-[#000926] text-white py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto ">
        <div className="">
          <div className="flex relative justify-between px-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">
                Meet the
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ad2a3] to-[#1658ea] ml-2">
                  AI Dream Team
                </span>
              </h2>
            </div>
            <div>
              <div className="gap-3 hidden md:flex">
                <button
                  onClick={() => scroll("left")}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-1/2 z-0 blur-[120px] bg-gradient-to-b to-transparent from-[#1658ea]/40"></div>

            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-10 px-10 snap-x snap-mandatory"
            >
              {dreamTeam.map((item, index) => (
                <div
                  key={index}
                  className="lg:min-w-[320px] flex-shrink-0 rounded-[32px] shadow-xl relative bg-gradient-to-r from-[#0b0f2a] to-[#151a3b] border border-[#1e223e] hover:shadow-[0_0_30px_10px_rgba(0,123,255,0.25)] transition-all duration-300 ease-in-out"
                >
                  <div className="grid grid-row-2 lg:flex items-center justify-between h-full">
                    <div className="p-8 pb-4">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs px-3 py-1 rounded-full border border-white/20 text-white flex items-center gap-1">
                          {item.label}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="m15.834 7.5 1.042-2.292 2.291-1.041-2.291-1.042L15.834.833l-1.042 2.292-2.291 1.042 2.291 1.042L15.834 7.5Zm0 5-1.042 2.292-2.291 1.042 2.291 1.041 1.042 2.292 1.042-2.292 2.291-1.041-2.291-1.042-1.042-2.292ZM7.501 3.334l2.083 4.583L14.167 10l-4.583 2.084-2.083 4.583-2.084-4.584L.834 10l4.583-2.083 2.084-4.583Zm0 9.308.825-1.817L10.142 10l-1.816-.825L7.5 7.358l-.825 1.817L4.859 10l1.817.825.825 1.817Z"
                              fill="#fff"
                            />
                          </svg>
                        </span>
                      </div>
                      <h3 className="text-[28px] max-w-xs font-semibold leading-tight pt-3 text-white">
                        {item.title.split(" ").map((word, idx) => {
                          const green = ["AI", "consumer"];
                          const blue = ["expert", "trends"];
                          return (
                            <span
                              key={idx}
                              className={
                                green.includes(word)
                                  ? "text-[#2ad2a3]"
                                  : blue.includes(word)
                                  ? "text-[#1658ea]"
                                  : ""
                              }
                            >
                              {word + " "}
                            </span>
                          );
                        })}
                      </h3>
                      <p className="text-sm max-w-xs text-gray-300 leading-relaxed pt-4">
                        {item.message}
                      </p>
                      <div className="flex w-full mt-10 mb-5 text-xs items-start gap-x-2">
                        <button
                          className="p-2 px-3.5
                       rounded-3xl bg-gradient-to-r hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out from-[#2ad2a3] to-[#1658ea]"
                        >
                          Book a demo
                        </button>
                        <button className="p-2 px-3.5 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                          Learn more
                        </button>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-b-[32px]">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={520}
                        height={220}
                        className="object-cover mx-auto w-[395px] lg:w-[350px] h-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {dreamTeam.map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white transition-all duration-300 cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
