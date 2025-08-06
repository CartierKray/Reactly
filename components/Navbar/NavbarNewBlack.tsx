"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SheetFour } from "../Sheet/SheetFour";
import { SheetDemo } from "../Sheet/SheetThree";
import Image from "next/image";

function NavbarNewBlack() {
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          navbarSticky || navbarHovered
            ? "bg-white text-black"
            : "bg-transparent text-black"
        }`}
        onMouseEnter={() => setNavbarHovered(true)}
        onMouseLeave={() => setNavbarHovered(false)}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between w-full h-14">
            <Link href="/">
              <div className="flex">
                <div className="text-2xl font-semibold">
                  Alpha Lease <span className="hidden md:inline">NL</span>
                </div>
                {/* <div className="pl-2.5">
                  <Image
                    src={"/images/graphics.webp"}
                    className=""
                    width={35}
                    height={35}
                    alt=""
                  />
                </div> */}
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-4">
              {[
                "",
                "AANBOD",
                "VOOR WIE",
                "OVER LEASEN",
                "OFFERTE",
                "OVER ONS",
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
                {/* <SheetDemo /> */}
                <Link href="/signin">
                  <div className="flex items-center px-1 hover:tracking-wider xl-nav-link hover:font-semibold transition-all duration-300 ease-in-out py-2 rounded-md text-[11px] font-normal cursor-pointer">
                    <LogIn className=" w-4" />
                  </div>
                </Link>
              </div>
            </div>

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

export default NavbarNewBlack;
