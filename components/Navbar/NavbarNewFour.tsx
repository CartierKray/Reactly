"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SheetFour } from "../Sheet/SheetFour";
import BeterLeaseLogoBlack from "../BeterLeaseLogo/BeterLeaseLogoBlack";
import BeterLeaseLogoWhite from "../BeterLeaseLogo/BeterLeaseLogoWhite";
import { useTheme } from "next-themes";
import { NavMenu } from "../NavMenu/NavMenu";

function NavbarNewFour() {
  const [navbarSticky, setNavbarSticky] = useState(false);
  const [navbarHovered, setNavbarHovered] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  const handleScroll = () => {
    setNavbarSticky(window.scrollY > 50);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isWhiteBackground = navbarSticky || navbarHovered;
  const isDark = resolvedTheme === "dark";

  return (
    <nav
      className="fixed w-full z-50 transition-all duration-300 top-0"
      onMouseEnter={() => setNavbarHovered(true)}
      onMouseLeave={() => setNavbarHovered(false)}
    >
      <div
        className={`w-full transition-all duration-300 ${
          isWhiteBackground
            ? "bg-white backdrop-blur-md dark:text-white dark:bg-[#111111] text-black"
            : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between w-full h-14">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-start">
                <div className="text-2xl">
                  {isDark ? (
                    <BeterLeaseLogoWhite />
                  ) : isWhiteBackground ? (
                    <BeterLeaseLogoBlack />
                  ) : (
                    <BeterLeaseLogoWhite />
                  )}
                </div>
              </div>
            </Link>
            {/* <div className="text-black dark:text-white font-sans flex gap-2 items-center text-xl">
              Reactly{" "}
              <div className="px-2 py-0.5 rounded-sm bg-white border-transparent text-black shadow-input dark:shadow-none  dark:text-white text-xs font-bold relative border dark:border-neutral-800 dark:bg-neutral-900">
                pro
              </div>
            </div> */}

            <NavMenu />

            {/* Menu */}
            {/* <div className="hidden lg:flex items-center space-x-4">
              {["DIENSTEN", "OFFERTE", "REVIEWS", "FAQ", "CONTACT"].map(
                (item) => (
                  <div key={item} className="relative group flex items-center">
                    <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`}>
                      <div className="px-3 hover:tracking-wider xl-nav-link-black dark:xl-nav-link hover:font-semibold dark:xl-nav-link transition-all duration-300 ease-in-out py-2 rounded-md text-[11px] font-normal cursor-pointer">
                        {item}
                      </div>
                    </Link>
                  </div>
                )
              )}

              <div className="flex justify-end items-center space-x-4">
                <ModeToggle />
              </div>

              <div className="hidden lg:flex">
                <div className="flex items-center scale-90 pt-1">
                  <SheetFour />
                </div>
              </div>
            </div> */}

            {/* Mobile menu */}
            <div className="flex lg:hidden">
              <div className="flex items-center pt-1.5">
                <SheetFour />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarNewFour;
