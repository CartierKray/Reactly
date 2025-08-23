"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { NavMenu } from "../NavMenu/NavMenu";
import BeterLeaseLogoBlack from "../BeterLeaseLogo/BeterLeaseLogoBlack";
import BeterLeaseLogoWhite from "../BeterLeaseLogo/BeterLeaseLogoWhite";
import { SheetFour } from "../Sheet/SheetFour";

function NavbarNewSeven() {
  const [hovered, setHovered] = useState(false);
  const [bannerHidden, setBannerHidden] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const onScroll = () => setBannerHidden(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = hovered || bannerHidden;

  return (
    <nav
      // geen transform/translate; we schuiven met 'top'
      className={[
        "fixed left-0 right-0 z-[40]",
        "transition-[top] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        bannerHidden ? "top-0" : "top-10", // 0px of 40px (zelfde als banner h-10)
      ].join(" ")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={[
          "w-full transition-colors duration-300",
          isSolid
            ? "bg-white backdrop-blur-md dark:bg-black text-black dark:text-white"
            : "bg-transparent text-white",
          // expliciet geen schaduw
          "shadow-none",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-14">
            <Link href="/">
              <div className="text-2xl">
                {isSolid ? (
                  isDark ? (
                    <BeterLeaseLogoWhite />
                  ) : (
                    <BeterLeaseLogoBlack />
                  )
                ) : (
                  <BeterLeaseLogoWhite />
                )}
              </div>
            </Link>

            <NavMenu />

            <div className="flex lg:hidden pt-1.5">
              <SheetFour />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarNewSeven;
