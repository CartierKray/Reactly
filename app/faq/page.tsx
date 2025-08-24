import React from "react";
import FooterSectionSM from "@/components/Footer/SWFooter";
import FAQSection from "@/components/FaqSection/FaqSection";
import VideoBannerEleven from "@/components/VideoBanner/VideoBannerEleven";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";
import NavbarNewSeven from "@/components/Navbar/NavbarNewSeven";
import BannerEight from "@/components/Banner/BannerEight";
import RubikOne from "@/components/Rubik/Rubik";

function FAQPage() {
  return (
    <>
      <BannerEight />
      <NavbarNewSeven />

      <div className="w-full">
        {/* Alleen zichtbaar in light mode */}
        <div className="block dark:hidden w-full">
          <VideoBannerEleven />
        </div>

        {/* Alleen zichtbaar in dark mode */}
        <div className="hidden dark:block w-full">
          <RubikOne />
        </div>
      </div>

      <FadeInWhenVisible delay={0.1}>
        <div className="bg-gradient-to-b px-4 lg:px-0 md:pb-20 py-20 dark:from-transparent dark:to-transparent from-[#fff] to-[#f0f0f0]">
          <FAQSection />
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <FooterSectionSM />
      </FadeInWhenVisible>
    </>
  );
}

export default FAQPage;
