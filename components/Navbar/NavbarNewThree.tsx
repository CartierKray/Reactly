"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SheetFour } from "../Sheet/SheetFour";
import AlphaLogo from "../AlphaLogo/AlphaLogo";
import AlphaLogoThree from "../AlphaLogo/AlphaLogoThree";
import AlphaLogoFour from "../AlphaLogo/AlphaLogoFour";
import BannerThree from "../Banner/BannerThree";
import BannerTwo from "../Banner/BannerTwo";

function NavbarNewThree() {
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
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          navbarSticky || navbarHovered
            ? "bg-[#c2b293] backdrop-blur-xl text-white"
            : "bg-transparent text-white"
        }`}
        onMouseEnter={() => setNavbarHovered(true)}
        onMouseLeave={() => setNavbarHovered(false)}
      >
        {/* <BannerTwo /> */}
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between w-full h-14">
            {/* Logo Aan Linkerkant */}
            <Link href="/">
              <div className="flex items-start">
                <div className="text-2xl mr-4"></div>
              </div>
            </Link>

            {/* Navigatie Items */}
            <div className="hidden lg:flex items-center space-x-4">
              {[
                "AANBOD",
                "VOOR WIE",
                "OVER ONS",
                "OFFERTE",
                "CONTACT",
                "|",
              ].map((item) => (
                <div key={item} className="relative group flex items-center">
                  <Link href={`${item.toLowerCase().replace(/ /g, "-")}`}>
                    <div className="px-3 hover:tracking-wider xl-nav-link hover:font-semibold transition-all duration-300 ease-in-out py-2 rounded-md text-[11px] font-normal cursor-pointer">
                      {item}
                    </div>
                  </Link>
                </div>
              ))}
              <div className="flex items-center space-x-2 pt-1.5 cur">
                <Link href="/signin">
                  <div className="flex items-center px-1 hover:tracking-wider xl-nav-link hover:font-semibold transition-all duration-300 ease-in-out py-2 rounded-md text-[11px] font-normal cursor-pointer">
                    <LogIn className=" w-4" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobiele Navigatie */}
            <div className="flex lg:hidden">
              <div className="flex items-center pt-1.5">
                <SheetFour />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarNewThree;
