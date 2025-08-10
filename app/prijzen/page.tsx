import React from "react";
import RubikOne from "@/components/Rubik/Rubik";
import FooterSectionSM from "@/components/Footer/SWFooter";
import PricingSection from "@/components/Pricing/PricingSection";
import VideoBannerEleven from "@/components/VideoBanner/VideoBannerEleven";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";
import { Reviews } from "@/components/Reviews/Reviews";
import NavbarNewSix from "@/components/Navbar/NavbarSix";
import ComponentHeaderPrijzen from "@/components/ComponentenLijst/ComponentHeaderPrijzen";

function PrijzenPage() {
  return (
    <>
      <NavbarNewSix />

      <div className="pt-24 lg:pt-28 pb-10 dark:bg-black">
        <ComponentHeaderPrijzen />
      </div>
      {/* Alleen zichtbaar in light mode */}
      {/* <div className="block dark:hidden w-full">
        <VideoBannerEleven />
      </div> */}
      {/* Alleen zichtbaar in dark mode */}
      {/* <div className="hidden dark:block w-full">
        <RubikOne />
      </div> */}

      <FadeInWhenVisible delay={0.1}>
        <PricingSection />
      </FadeInWhenVisible>

      <div className="pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="reviews-title"
            className="text-3xl font-medium tracking-tight text-neutral-900 text-center dark:text-white"
          >
            Geliefd door duizenden gebruikers
          </h2>
          <p className="mt-2 text-md md:text-lg max-w-xs md:max-w-full mx-auto text-neutral-600 text-center dark:text-neutral-200">
            Hier is wat sommige van onze klanten te zeggen hebben over Reactly.
          </p>
        </div>
      </div>

      <FadeInWhenVisible delay={0.1}>
        <div className="pb-10 md:pb-20 lg:pb-32">
          <Reviews />
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <FooterSectionSM />
      </FadeInWhenVisible>
    </>
  );
}

export default PrijzenPage;
