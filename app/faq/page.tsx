import React from "react";
import FooterSectionSM from "@/components/Footer/SWFooter";
import FAQSection from "@/components/FaqSection/FaqSection";
import VideoBannerEleven from "@/components/VideoBanner/VideoBannerEleven";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";
import NavbarNewSeven from "@/components/Navbar/NavbarNewSeven";
import BannerEight from "@/components/Banner/BannerEight";

function FAQPage() {
  return (
    <>
      <BannerEight />
      <NavbarNewSeven />
      <VideoBannerEleven />

      <FadeInWhenVisible delay={0.1}>
        <div className="bg-gradient-to-b pt-10 dark:from-transparent dark:to-transparent from-[#fff] to-[#f0f0f0]">
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
