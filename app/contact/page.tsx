import React from "react";
import FooterSectionSM from "@/components/Footer/SWFooter";
import ReviewSlider from "@/components/Reviews/ReviewSlider";
import ContactForm from "@/components/ContactForm/ContactForm";
import DirectAdviesTwo from "@/components/DirectAdvies/DirectAdviesTwo";
import VideoBannerEleven from "@/components/VideoBanner/VideoBannerEleven";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";
import { Reviews } from "@/components/Reviews/Reviews";

function ContactPage() {
  return (
    <>
      <VideoBannerEleven />

      <FadeInWhenVisible delay={0.1}>
        <ContactForm />
      </FadeInWhenVisible>

      {/* <FadeInWhenVisible delay={0.1}>
        <div className="flex p-5">
          <div className="hidden 2xl:block p-8 w-1/3">
            <DirectAdviesTwo />
          </div>
          <div className="w-full 2xl:w-2/3">
            <ReviewSlider />
          </div>
        </div>
      </FadeInWhenVisible> */}

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
        <div className="pb-10 md:pb-20">
          <Reviews />
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <FooterSectionSM />
      </FadeInWhenVisible>
    </>
  );
}

export default ContactPage;
