import React from "react";
import NavbarNewSix from "@/components/Navbar/NavbarSix";
import FooterSectionSM from "@/components/Footer/SWFooter";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";
import ComponentenLijst from "@/components/ComponentenLijst/ComponentenLijst";
import ComponentHeader from "@/components/ComponentenLijst/ComponentHeader";

function DienstenPage() {
  return (
    <>
      <NavbarNewSix />
      <div className="pt-24 lg:pt-28 pb-10 dark:bg-black">
        <ComponentHeader />
      </div>
      <ComponentenLijst />
      <FadeInWhenVisible delay={0.1}>
        <FooterSectionSM />
      </FadeInWhenVisible>
    </>
  );
}

export default DienstenPage;
