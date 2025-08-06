"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SheetOne } from "../Sheet/Sheet";
import { InfiniteMovingCardsDemo } from "../InfinitiveMovingCards/InfinitiveMovingCards";
import HeaderText from "./HeaderText";

function HeaderDiensten() {
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
      }, 500); // Korte pauze voor fade-in
    }, 5000); // Verander elke 5 seconden van afbeelding

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setCurrentImage(images[currentImageIndex]);
  }, [currentImageIndex, images]);

  return (
    <>
      <div className="relative">
        <Image
          src="/images/bg-header-diensten.jpg"
          alt="header contact page"
          width={1000}
          height={1000}
          className="w-full h-[100vh] object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 z-10"></div> */}
        {/* <div className="absolute inset-0 z-20 pt-24 lg:pt-10">
          <div className="order grid gap-10 lg:flex justify-between items-center w-full">
            <div className="order-2 lg:order-1 w-full lg:w-1/2">
              <div className="flex justify-center lg:mt-20 p-5">
                <div className="">
                  <div className="relative mb-5">
                    <SheetOne />
                  </div>
                  <p className="text-6xl custom-shadow-small text-black lg:text-7xl pt-4 tracking-wider uppercase font-semibold relative">
                    Méér <br />
                    dan een <br /> agency
                  </p>
                  <p className="max-w-2xl custom-shadow-small text-xl pt-5 relative text-black">
                    Capital Code X is een creative agency dat vanuit het mooie
                    Amsterdam klanten in heel Nederland en daarbuiten voorziet
                    op het gebied van{" "}
                    <a className="font-semibold">
                      strategie, creatie, productie en marketing.{" "}
                    </a>
                  </p>
                  <div className="hidden md:flex gap-x-5 pt-8 relative">
                    <button className="hover:bg-amber-500 bg-[#F3BD3E] pr-8 pl-8 pt-3 pb-3 font-medium">
                      Offerte aanvragen
                    </button>
                    <button className="hover:bg-amber-500 bg-[#F3BD3E] pr-8 pl-8 pt-3 pb-3 font-medium">
                      Neem contact op
                    </button>
                  </div>
                  <div className="md:hidden flex gap-x-5 pt-8 relative">
                    <button className="hover:bg-amber-500 bg-[#F3BD3E] pr-8 pl-8 pt-3 pb-3 font-medium">
                      Offerte
                    </button>
                    <button className="hover:bg-amber-500 bg-[#F3BD3E] pr-8 pl-8 pt-3 pb-3 font-medium">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden order-1 lg:order-2 w-full lg:w-1/2 lg:flex justify-center items-center lg:pt-20">
              <div className="w-full h-full">
                <div className="scale-90">
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <HeaderText />
      </div>
    </>
  );
}

export default HeaderDiensten;
