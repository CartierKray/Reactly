"use client";

import React, { useEffect, useState } from "react";
import NavbarNewFour from "../Navbar/NavbarNewFour";
import { FlipWordsOne } from "../FlipWords/FlipsWords";
import Link from "next/link";

const VideoBannerEleven: React.FC = () => {
  const [navbarSticky, setNavbarSticky] = useState(false);

  const handleScroll = () => {
    setNavbarSticky(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[75vh] overflow-hidden">
      {/* Sticky navbar */}
      <NavbarNewFour />

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[75vh] object-cover"
      >
        <source src="/video/Reactly.mp4" type="video/mp4" />
        Jouw browser ondersteunt deze video niet.
      </video>

      {/* Donkere overlay */}
      <div className="absolute inset-0 bg-black/75 z-0 pointer-events-none" />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col text-center items-center justify-center lg:items-start lg:justify-center lg:text-start max-w-7xl mx-auto px-6 z-10 text-white">
        {/* FlipWords */}
        <div className="uppercase tracking-wide text-4xl md:text-5xl lg:text-7xl font-semibold text-white">
          <FlipWordsOne />
        </div>
        <p className="text-sm md:leading-[1.5] mt-3 text-gray-300 font-normal max-w-[32rem] text-center leading-7 md:text-left">
          Wij helpen bedrijven groeien met strategie, branding en digitale
          innovatie. Van converterend webdesign tot marketing die schaalbaar,
          slim en creatief is.
        </p>

        {/* Knoppen */}

        <div className="mt-6 flex flex-row gap-4 text-sm items-center md:items-start justify-center md:justify-start">
          {/* Bekijk ons aanbod */}
          <Link href={"/aanbod"}>
            <button className="relative border-t border-b dark:border-[#c2b293] border-[#c2b293] px-6 py-2 text-white overflow-hidden group transform-gpu">
              <span className="relative z-10 text-xs sm:text-sm uppercase group-hover:tracking-wide group-hover:font-medium group-hover:text-white transition-all duration-500 ease-in-out">
                Ontdek de mogelijkheden
              </span>
              <span className="absolute inset-0 bg-[#c2b293] dark:bg-[#c2b293] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out z-0 transform-gpu will-change-transform"></span>
            </button>
          </Link>

          {/* Neem contact op */}
          <Link href={"/contact"}>
            <button className="relative border-t border-b border-white px-4 py-2 text-white overflow-hidden group transform-gpu">
              <span className="relative z-10 text-xs sm:text-sm uppercase group-hover:tracking-wide group-hover:font-medium group-hover:text-black transition-all duration-500 ease-in-out">
                Neem contact op
              </span>
              <span className="absolute inset-0 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out z-0 transform-gpu will-change-transform"></span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoBannerEleven;
