"use client";

import React, { useState } from "react";
import Image from "next/image";

const FavoriteBrands: React.FC = () => {
  const brands = [
    { name: "Volkswagen", image: "/images/Volkswagen-logo-zwart-wit-2.webp" },
    { name: "Audi", image: "/images/Audi-logo-zwart-wit.webp" },
    { name: "Tesla", image: "/images/Tesla-logo-zwart-wit.webp" },
    { name: "Volvo", image: "/images/Volvo-logo-zwart-wit.webp" },
    { name: "Kia", image: "/images/Kia-logo-zwart-wit.webp" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= brands.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? brands.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-gradient-to-b from-[#1a1a1a] to-stone-800 text-white pt-20 xl:pb-60 xl:pt-32 py-12">
      <div className="max-w-[1500px] mx-auto px-6">
        {/* Titel */}
        <h2 className="text-4xl xl:text-5xl font-medium text-center mb-10 md:mb-20">
          Favoriete <span className="text-amber-500">merken</span>
        </h2>

        {/* Responsieve weergave */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Alleen zichtbaar bij md of groter */}
          {brands.slice(0, 4).map((brand, index) => (
            <div
              key={index}
              className="hidden md:flex bg-black overflow-hidden justify-center rounded-3xl items-center"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={1000}
                height={1000}
                className="object-contain hover:scale-110 duration-500 transform transition-all rounded-3xl ease-in-out"
              />
            </div>
          ))}

          {/* Mobile Slider */}
          <div className="md:hidden relative">
            <div className="bg-black flex justify-center items-center">
              <Image
                src={brands[currentIndex].image}
                alt={brands[currentIndex].name}
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>

            {/* Pijlen voor swipe-functionaliteit */}
            <div className="flex justify-center items-center mt-8 space-x-10">
              <button
                onClick={handlePrev}
                className="w-14 h-14 flex items-center justify-center bg-stone-700 hover:bg-amber-500 text-white rounded-full"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-14 h-14 flex items-center justify-center bg-stone-700 hover:bg-amber-500 text-white rounded-full"
              >
                →
              </button>
            </div>

            {/* Indicator Dots */}
            {/* <div className="flex justify-center mt-4 space-x-2">
              {brands.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Bekijk alle merken Button */}
        {/* <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full text-white text-lg">
            Bekijk alle merken en modellen
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default FavoriteBrands;
