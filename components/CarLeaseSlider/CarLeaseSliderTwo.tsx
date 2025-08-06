"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  {
    image: "/images/6_other_image_17219131261645872951.jpg",
    alt: "Porsche Wheel",
  },
  {
    image: "/images/8_other_image_17219110261388148384.jpg",
    alt: "BMW Interior",
  },
  {
    image: "/images/menu_images_0_17211300091192926427.jpg",
    alt: "Ferrari Hood",
  },
];

export default function DiagonalSliderTwo() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + items.length) % items.length);

  const getImage = (offset: number) =>
    items[(index + offset + items.length) % items.length];

  return (
    <div className="relative w-full h-[40vh] overflow-hidden bg-black">
      <div className="absolute inset-0 flex">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative flex w-full h-full"
          >
            {/* Left Image */}
            <div className="relative w-2/3 h-full clip-left z-10 overflow-hidden group">
              <div className="absolute inset-0 overflow-hidden group">
                <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105">
                  <Image
                    src={getImage(1).image}
                    alt={getImage(1).alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 z-10" />
              </div>
            </div>

            {/* Middle Image */}
            <div className="relative w-2/3 h-full clip-middle z-20 -ml-[20%] overflow-hidden group">
              <div className="absolute inset-0 overflow-hidden group">
                <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105">
                  <Image
                    src={getImage(2).image}
                    alt={getImage(2).alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 z-10" />
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-[50%] h-full clip-right z-30 -ml-[20%] overflow-hidden group">
              <div className="absolute inset-0 overflow-hidden group">
                <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105">
                  <Image
                    src={getImage(0).image}
                    alt={getImage(0).alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 z-10" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay Content */}
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="absolute top-0 bottom-0 left-0 z-40 flex flex-col justify-center text-white text-center w-[100%]"
      >
        <div>
          <p className="uppercase text-sm tracking-widest mb-5">
            Expertise & Diensten
          </p>

          <Image
            src="/svg/BeterLeaseSVGTwo.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="object-cover mx-auto w-[500px]"
          />

          <div className="mt-6 border-t mx-auto border-white pt-3 w-fit">
            <button className="text-xs hover:font-semibold transition-all duration-300 ease-in-out font-medium uppercase">
              Bekijk Financiering / Lease
            </button>
          </div>
        </div>
      </motion.div>

      {/* Arrows */}
      <div className="absolute inset-0 flex justify-between items-center px-4 z-50">
        <button onClick={prev} className="p-2 rounded-full">
          <ChevronLeft className="text-white w-20 h-20" />
        </button>
        <button onClick={next} className="p-2 rounded-full">
          <ChevronRight className="text-white w-20 h-20" />
        </button>
      </div>
    </div>
  );
}
