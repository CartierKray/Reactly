import React from "react";
import FooterSectionSM from "@/components/Footer/SWFooter";
import NavbarNewFour from "@/components/Navbar/NavbarNewFour";
import ComponentHeader from "@/components/ComponentenLijst/ComponentHeader";
import ComponentenLijst from "@/components/ComponentenLijst/ComponentenLijst";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";
import NavbarNewSix from "@/components/Navbar/NavbarSix";

function ComponentenPage() {
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

export default ComponentenPage;
