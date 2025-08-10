import React from "react";
import NavbarNewSix from "@/components/Navbar/NavbarSix";
import FooterSectionSM from "@/components/Footer/SWFooter";
import ComponentenLijst from "@/components/ComponentenLijst/ComponentenLijst";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";
import ComponentHeaderDiensten from "@/components/ComponentenLijst/ComponentHeaderDiensten";
import ComponentenLijstDiensten from "@/components/ComponentenLijst/ComponentenLijstDiensten";

function DienstenPage() {
  return (
    <>
      <NavbarNewSix />
      <div className="pt-24 lg:pt-28 pb-10 dark:bg-black">
        <ComponentHeaderDiensten />
      </div>
      <ComponentenLijstDiensten />
      <FadeInWhenVisible delay={0.1}>
        <FooterSectionSM />
      </FadeInWhenVisible>
    </>
  );
}

export default DienstenPage;
