"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import NavbarNewBlack from "../Navbar/NavbarNewBlack";
import TypeCarSwipe from "./CarSwipe";

const cars = [
  { name: "Compact", image: "/images/compact.png" },
  { name: "Sedan", image: "/images/sedan.png" },
  { name: "SUV", image: "/images/suv.png" },
  { name: "Bedrijfsauto", image: "/images/bedrijfsauto.png" },
  { name: "Station", image: "/images/station.png" },
  { name: "Coupé", image: "/images/Coupé.png" },
  { name: "Cabriolet", image: "/images/Cabriolet.png" },
];

const HeaderLease: React.FC = () => {
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
    <div className="w-screen h-screen">
      <div className="w-screen h-[75%] flex flex-col items-center bg-gradient-to-b from-[#bec9ed] via-[#e5e8f5] to-transparent relative">
        <div className="inset-0 absolute bottom-0">
          <Image
            src="/svg/bg-accent-two.svg"
            alt="bg-accent"
            width={1000}
            height={1000}
            className="w-full h-full opacity-100 z-0"
          />
        </div>
        <div className="absolute top-0 left-0 right-0">
          <NavbarNewBlack />
        </div>
        {/* Header Section */}
        <header className="mt-20 w-full flex flex-col items-center px-6 py-10 z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-black">
            Vind Jouw <span className="text-teal-500">Perfecte Auto!</span>
          </h1>
          <p className="text-gray-600 tracking-wide font-normal mt-4 text-center">
            Keuze uit ruim <span className="font-medium">70.000+</span> Alpha
            Deals!
          </p>

          {/* Filter Section */}
          <div className="mt-8 lg:bg-white/45 backdrop-blur-md lg:p-3 lg:pl-3 lg:pr-3 lg:rounded-full w-full max-w-3xl lg:max-w-5xl flex flex-col lg:flex-row gap-4 z-30 relative">
            <input
              type="text"
              placeholder="Zoek op trefwoorden"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <select className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="">Alle merken</option>
              <option value="Audi">Audi</option>
              <option value="Tesla">Tesla</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
            </select>
            <select className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="">Alle modellen</option>
              <option value="Model S">Model S</option>
              <option value="Model 3">Model 3</option>
            </select>
            <select className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="">Kies je budget</option>
              <option value="1">€100 - €199</option>
              <option value="2">€200 - €299</option>
              <option value="3">€300 - €399</option>
              <option value="4">€400 - €499</option>
              <option value="5">€500 - €599</option>
              <option value="6">€600 - €699</option>
              <option value="7">€700 - €799</option>
              <option value="8">€800 - €899</option>
              <option value="9">€900 - €999</option>
            </select>
          </div>
          <button className="mt-10 px-6 xl:mt-14 w-full md:w-1/3 py-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition">
            Bekijk ons aanbod →
          </button>
        </header>

        {/* Image Section */}
        <div className="w-full flex justify-center mt-8">
          <Image
            height={1000}
            width={1000}
            src="/images/Tesla-1.png"
            alt="Car"
            className="w-11/12 md:w-2/3 lg:w-1/2 max-h-[520px] object-contain z-0"
          />
        </div>

        {/* Car Types Section */}
        {/* <div className="">
          <TypeCarSwipe />
        </div> */}
      </div>
    </div>
  );
};

export default HeaderLease;
