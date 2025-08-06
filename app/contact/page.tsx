import React from "react";
import FooterSectionSM from "@/components/Footer/SWFooter";
import ReviewSlider from "@/components/Reviews/ReviewSlider";
import ContactForm from "@/components/ContactForm/ContactForm";
import DirectAdviesTwo from "@/components/DirectAdvies/DirectAdviesTwo";
import VideoBannerEleven from "@/components/VideoBanner/VideoBannerEleven";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";

function ContactPage() {
  return (
    <>
      <VideoBannerEleven />

      <FadeInWhenVisible delay={0.1}>
        <ContactForm />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <div className="flex p-5">
          <div className="hidden 2xl:block p-8 w-1/3">
            <DirectAdviesTwo />
          </div>
          <div className="w-full 2xl:w-2/3">
            <ReviewSlider />
          </div>
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <FooterSectionSM />
      </FadeInWhenVisible>
    </>
  );
}

export default ContactPage;
