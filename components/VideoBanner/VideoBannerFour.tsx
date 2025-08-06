"use client";

import { LogIn, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SheetDemo } from "../Sheet/SheetThree";
import { SheetFour } from "../Sheet/SheetFour";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import NavbarNew from "../Navbar/NavbarNew";
import Image from "next/image";

const VideoBannerFour: React.FC = () => {
  const [navbarSticky, setNavbarSticky] = useState(false);
  const [navbarHovered, setNavbarHovered] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarSticky(true);
    } else {
      setNavbarSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent/50 via-transparent/25 to-stone-800"> */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent/75 via-transparent/25 to-stone-800">
        <NavbarNew />
      </div>

      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-screen object-cover"
      >
        <source src="/video/New-Video-NORTVI-summer.mp4" type="video/mp4" />
        Jouw browser ondersteunt geen video tag.
      </video> */}
      <div className="block md:hidden">
        <Image
          alt="A description of the image"
          src="/images/Q8e_ae_2022_4484_without_Cast-L.avif"
          width={1920} // Gebruik een passende breedte
          height={1080} // Gebruik een passende hoogte
          className="w-full h-screen object-cover"
        />
      </div>

      <div className="hidden md:block">
        <Image
          alt="A description of the image"
          src="/images/Q8e_ae_2022_4484_without_Cast-L.avif"
          width={1920} // Gebruik een passende breedte
          height={1080} // Gebruik een passende hoogte
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Center */}
      {/* <div className="absolute top-0 w-full left-0 right-0 bottom-0 flex flex-col justify-center items-center p-10 text-start">
        <div className="w-full flex justify-center">
          <div className="grid text-center w-full justify-center">
            <div className="text-7xl lg:text-7xl xl:text-8xl text-white font-medium custom-shadow-small leading-16">
              Alpha Lease <span className="hidden md:inline">NL</span>
            </div>
            <div className="mt-10 max-w-2xl mx-auto text-white custom-shadow-small">
              <p className="font-sm text-[18px] md:text-[22px] font-medium xl:text-[24px] uppercase">
       
                <br className="xl:hidden" /> Slim, snel en altijd op maat. 🔑 🚗
                💨
              </p>
            </div>
            <Link href="/contact#contactgegevens">
              <div className="mt-2 mb-5 md:mb-2 p-2 flex justify-start w-full mx-auto">
                <button className="relative font-light text-[14px] outline-1 outline-white outline mt-8 w-[80%] md:w-[40%] mx-auto hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-3 pb-3 bg-transparent rounded-full overflow-hidden group backdrop-blur-sm">
                  <span className="relative z-10 text-white group-hover:text-black hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
                    Ontdek nu
                  </span>
                  <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div> */}

      {/* Left */}
      {/* <div className="absolute top-0 hidden w-full left-0 right-0 bottom-0 md:flex flex-col justify-center md:items-start md:text-start items-center text-center p-10">
        <div className="w-full flex  md:justify-start justify-center">
          <div className="grid md:text-start text-center md:justify-start justify-center w-full">
            <div className="text-7xl lg:text-7xl xl:text-8xl text-white font-medium custom-shadow-small leading-16">
              Alpha Lease <span className="hidden md:inline">NL</span>
            </div>
            <div className="mt-10 max-w-2xl  text-white custom-shadow-small">
              <p className="font-sm text-[18px] md:text-[22px] font-medium xl:text-[24px] uppercase">

                <br className="xl:hidden" /> Slim, snel en altijd op maat. 🔑 🚗
                💨
              </p>
            </div>
            <Link href="/contact#contactgegevens">
              <div className="mt-2 mb-5 md:mb-2 p-2 flex md:justify-start justify-center w-full">
                <button className="relative font-light text-[14px] backdrop-blur-sm outline-1 outline-white outline mt-8 w-[80%] md:w-[40%] hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-3 pb-3 bg-transparent rounded-full overflow-hidden group">
                  <span className="relative z-10 text-white group-hover:text-black hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
                    Ontdek nu
                  </span>
                  <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div> */}

      {/* <footer className="absolute bottom-0 w-full bg-transparent items-center justify-center hover:bg-stone-800 hover:text-white hover:font-normal tranform transition-all duration-300 ease-in-out text-white text-center py-4 px-3 md:px-3"> */}
      <footer className="absolute bottom-0 w-full bg-transparent items-center justify-center hover:backdrop-blur-sm hover:text-white hover:font-normal tranform transition-all duration-300 ease-in-out text-white text-center py-4 px-3 md:px-3">
        <div className="w-full flex justify-center items-center">
          <div className="text-[10px] max-w-sm md:max-w-full md:text-[11px] font-light text-center">
            <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              Groot aanbod
            </span>{" "}
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              Ocassion Centrum
            </span>{" "}
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              BOVAG & Autrotrust Garanties
            </span>{" "}
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              Levering binnen 48 uur
            </span>{" "}
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <span className="hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
              Winnaar Red Dot Design Award 2024
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VideoBannerFour;
