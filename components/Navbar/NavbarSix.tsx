"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SheetFour } from "../Sheet/SheetFour";
import BeterLeaseLogoBlack from "../BeterLeaseLogo/BeterLeaseLogoBlack";
import BeterLeaseLogoWhite from "../BeterLeaseLogo/BeterLeaseLogoWhite";
import { useTheme } from "next-themes";
import { NavMenuTwo } from "../NavMenu/NavMenuTwo";

function NavbarNewSix() {
  const [navbarSticky, setNavbarSticky] = useState(false);
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false); // ← Nieuw

  useEffect(() => {
    setIsMounted(true); // ← Pas na client-renderen
    const handleScroll = () => {
      setNavbarSticky(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 top-0">
      <div
        className={`w-full transition-all duration-300 ${
          navbarSticky
            ? "bg-white backdrop-blur-md text-black dark:bg-black dark:text-white"
            : "bg-transparent text-black dark:text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between w-full h-14">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-start text-2xl">
                {isMounted ? (
                  isDark ? (
                    <BeterLeaseLogoWhite />
                  ) : (
                    <BeterLeaseLogoBlack />
                  )
                ) : null}
              </div>
            </Link>

            <NavMenuTwo />

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

export default NavbarNewSix;
