"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SheetOne } from "../Sheet/Sheet";
import BannerThree from "../Banner/BannerThree";

function HeaderOne() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const images = ["/images/header-bg-1.png", "/images/header-bg-2.webp"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true);
      }, 200); // Korte pauze voor fade-in
    }, 7000); // Verander elke 5 seconden van afbeelding

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setCurrentImage(images[currentImageIndex]);
  }, [currentImageIndex, images]);

  return (
    <>
      <div className="bg-[#e3e0d8] pb-20 w-full h-full lg:h-[90vh] flex items-center justify-between">
        <div className="inset-0 absolute">
          <Image
            src="/svg/bg-accent.svg"
            alt="bg-accent"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>
        <div className="order grid gap-10 lg:flex justify-between items-center w-full">
          <div className="order-2 lg:order-1 w-full lg:w-1/2">
            <div className="flex justify-center lg:mt-24 p-5">
              <div className="">
                <div className="relative mb-5">
                  <SheetOne />
                </div>
                <p className="text-7xl lg:text-8xl pt-4 tracking-wider uppercase font-semibold relative">
                  Méér <br />
                  dan een <br /> agency
                </p>
                <div className="max-w-2xl text-xl pt-5 relative">
                  Capital Code X is een creative agency dat vanuit het mooie
                  Amsterdam klanten in heel Nederland en daarbuiten voorziet op
                  het gebied van{" "}
                  <a className="font-semibold">
                    strategie, creatie, productie en marketing.{" "}
                  </a>
                </div>
                <div className="hidden md:flex gap-x-5 pt-8 relative">
                  <button className="bg-[#F3BD3E] pr-8 pl-8 pt-3 pb-3 font-medium">
                    Offerte aanvragen
                  </button>
                  <button className="bg-[#F3BD3E] pr-8 pl-8 pt-3 pb-3 font-medium">
                    Neem contact op
                  </button>
                </div>
                <div className="md:hidden flex gap-x-5 pt-8 relative">
                  <button className="bg-[#F3BD3E] pr-8 pl-8 pt-3 pb-3 font-medium">
                    Offerte
                  </button>
                  <button className="bg-[#F3BD3E] pr-8 pl-8 pt-3 pb-3 font-medium">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 w-full lg:w-1/2  flex justify-center items-center lg:pt-20">
            <div className="w-full h-full">
              <div
                className="transition-opacity duration-300 ease-in-out"
                style={{ opacity: fadeIn ? 1 : 0 }}
              >
                <Image
                  src={images[currentImageIndex]}
                  alt="header-img"
                  width={1000}
                  height={1000}
                  className="w-full lg:max-w-[80%] min-h-[45vh] object-cover shadow-md lg:rounded-md" // Ensuring the image does not exceed half of its container's width
                />
              </div>
              <div className="hidden lg:block pt-10 lg:-ml-44">
                <BannerThree />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderOne;
