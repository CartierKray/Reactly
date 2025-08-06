"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import NavbarNewBlack from "../Navbar/NavbarNewBlack";

const cars = [
  { name: "Compact", image: "/images/compact-1.png" },
  { name: "Sedan", image: "/images/sedan-1.png" },
  { name: "SUV", image: "/images/suv-1.png" },
  { name: "Bedrijfsauto", image: "/images/bedrijfsauto-1.png" },
  { name: "Station", image: "/images/station-1.png" },
  { name: "Coupé", image: "/images/coupé-1.png" },
  { name: "Cabriolet", image: "/images/cabriolet-1.png" },
];

const TypeCarSwipe: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4); // Default is 4 cars visible

  // Dynamically adjust the number of visible cars based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(2); // Show 2 cars on smaller screens
      } else {
        setVisibleCount(4); // Show 4 cars on larger screens
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount < cars.length ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <section className="w-full mt-8 xl:-mt-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-black">
        Een Auto Voor Elke <span className="text-teal-500">Lifestyle</span>
      </h2>
      <div className="mt-14 xl:mt-24 flex justify-center">
        <div className="flex gap-8 overflow-hidden p-4">
          {cars
            .slice(currentIndex, currentIndex + visibleCount)
            .map((car, index) => (
              <div
                key={index}
                className="text-center transition-transform duration-500 transform group"
              >
                <Image
                  height={1000}
                  width={1000}
                  src={car.image}
                  alt={car.name}
                  className="w-48 hover:cursor-pointer md:w-64 md:mx-auto mx-2 lg:mx-4 transition-transform duration-500 transform group-hover:scale-110"
                />
                <p className="text-black font-medium mt-10 lg:text-lg">
                  {car.name}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Swipe Buttons */}
      <div className="mt-10 md:mt-16 flex justify-center gap-4">
        <button
          onClick={handlePrev}
          className="w-12 h-12 transition-all transform  bg-gray-200 hover:bg-teal-500 rounded-full flex items-center justify-center hover:outline-none  hover:text-white z-20"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 bg-gray-200 transition transform rounded-full hover:bg-teal-500 text-black  flex items-center justify-center  hover:text-white  z-20"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default TypeCarSwipe;
