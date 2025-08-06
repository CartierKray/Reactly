"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Data-as-a-Service (API)",
    desc: "Power your business with digital insights at scale through API and automated reporting.",
    image: "/images/data-api.png",
  },
  {
    title: "Advisory Services",
    desc: "Gain deeper market and consumer insights through expert consulting services.",
    image: "/images/ad-services.png",
  },
  {
    title: "Data Partnerships (OEM)",
    desc: "Enrich your products with the world's leading digital data to drive new revenue streams.",
    image: "/images/partnership.png",
  },
];

export default function AdvancedDataServices() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector("div")?.clientWidth || 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#e9eeff] pb-20 pt-10 md:pt-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#0d1b39] mb-14">
          Advanced data{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ad2a3] to-[#1658ea]">
            services
          </span>
        </h2>

        {/* Scrollable card row */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-2 px-2 md:grid md:grid-cols-3 md:overflow-visible md:snap-none"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="min-w-[85%] md:min-w-0 snap-start md:snap-none flex-shrink-0 md:flex-shrink bg-white rounded-2xl shadow-lg p-6 mr-4 md:mr-0 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={1000}
                  height={1000}
                  className="mb-6 w-full h-auto rounded-xl"
                />
                <h3 className="text-2xl text-start font-semibold text-[#0d1b39] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 max-w-xs text-start pt-2 pb-1 font-light text-sm mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex gap-4 items-center">
                  <button className="bg-[#0040ff] hover:bg-[#0030cc] text-white font-medium text-sm px-5 py-2 rounded-full shadow-md">
                    Contact us
                  </button>
                  <a
                    href="#"
                    className="text-sm text-[#0d1b39] font-medium flex items-center gap-1 hover:underline"
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
