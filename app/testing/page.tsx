import BistroGreenShowcase from "@/components/BistroShowCase/BistroShowCase";
import ComponentHeaderClothing from "@/components/ComponentenLijst/ComponentenLijstClothing";
import GridClothing from "@/components/GridClothing/GridClothing";
import NavbarNewSix from "@/components/Navbar/NavbarSix";
import React from "react";

function TestPage() {
  return (
    <>
      <div>
        <NavbarNewSix />
        <div className="pt-24 lg:pt-28 pb-10 dark:bg-black">
          <ComponentHeaderClothing />
        </div>
        <div className="pb-20">
          <GridClothing />
        </div>

        <div>
          <div className="w-full py-10 text-center">
            <span className="block uppercase tracking-[0.18em] text-[12px] sm:text-[13px] text-black">
              AREA020 X OAKLEY
            </span>
            <div
              className="mt-1 text-black font-medium tracking-[-0.01em] leading-[1.05]
               text-[34px] sm:text-[44px] md:text-[56px]"
            >
              Gascan® - Blue <br className="hidden md:flex" /> Steel Fade
            </div>
          </div>
        </div>

        <div className="py-20">
          <BistroGreenShowcase />
        </div>
      </div>
    </>
  );
}

export default TestPage;
