import BistroGreenShowcase from "@/components/BistroShowCase/BistroShowCase";
import ComponentHeaderClothing from "@/components/ComponentenLijst/ComponentenLijstClothing";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";
import GridClothing from "@/components/GridClothing/GridClothing";
import NavbarNewSix from "@/components/Navbar/NavbarSix";
import React from "react";
import FooterSectionSM from "@/components/Footer/SWFooter";

function TestPage() {
  return (
    <>
      <div>
        <NavbarNewSix />
        <div className="pt-24 lg:pt-28 pb-10 dark:bg-black">
          <ComponentHeaderClothing />
        </div>

        <div className="py-20">
          <BistroGreenShowcase />
        </div>

        <div>
          <div className="w-full md:py-10 pb-20 text-center">
            <span className="block uppercase tracking-[0.18em] text-[12px] sm:text-[13px] text-black dark:text-white">
              AREA020 X OAKLEY
            </span>
            <div
              className="mt-1 text-black dark:text-white font-medium tracking-[-0.01em] leading-[1.05]
               text-[34px] sm:text-[44px] md:text-[56px]"
            >
              Gascan® - Blue <br className="hidden md:flex" /> Steel Fade
            </div>
          </div>
        </div>

        <div className="pb-20">
          <GridClothing />
        </div>

        <FadeInWhenVisible delay={0.1}>
          <FooterSectionSM />
        </FadeInWhenVisible>
      </div>
    </>
  );
}

export default TestPage;
