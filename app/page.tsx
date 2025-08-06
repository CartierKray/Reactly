import RubikOne from "@/components/Rubik/Rubik";
import FooterSectionSM from "@/components/Footer/SWFooter";
import { CTAButton } from "@/components/CTAButtons/CTAButtonts";
import RolexAdvies from "@/components/RolexSection/RolexAdvies";
import FAQSectionTwo from "@/components/FaqSection/FaqSectionTwo";
import CodeShowcase from "@/components/CodeShowCase/CodeShowCase";
import G2BadgeSection from "@/components/G2BadgeSection/G2BadgeSection";
import VideoBannerEleven from "@/components/VideoBanner/VideoBannerEleven";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";
import InfinitiveMovingCardsIMG from "@/components/InfinitiveMovingCards/InfinitiveMovingCardsIMG";
import ProductShowcase from "@/components/ProductShowCase/ProductShowCase";
import CardComponentTwo from "@/components/CardComponent/CardComponentTwo";
import RolexIntro from "@/components/RolexSection/RolexIntro";
import DiagonalSlider from "@/components/CarLeaseSlider/CarLeaseSlider";
import { CTA } from "@/components/CTAButtons/CTA";
import { Reviews } from "@/components/Reviews/Reviews";
import LeaseOptionsGridTwo from "@/components/ImageText/ImageTextTen";

export default function Home() {
  return (
    <>
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
        <div className="py-10 md:pt-28">
          <InfinitiveMovingCardsIMG />
        </div>
      </FadeInWhenVisible>

      {/* <FadeInWhenVisible delay={0.1}>
        <div className="hidden pt-20 md:pt-20 py-10 md:flex">
          <DiagonalSlider />
        </div>
      </FadeInWhenVisible> */}

      <div className="pt-20 pb-">
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-neutral-900 text-center dark:text-white"
        >
          Webdesign op maat voor jouw bedrijf
        </h2>
        <p className="mt-2 text-md md:text-lg max-w-xs md:max-w-xl mx-auto text-neutral-600 text-center dark:text-neutral-200">
          We staan voor je klaar om je te helpen met al je vragen. Kun je niet
          vinden wat je zoekt? Neem contact met ons op via &nbsp;
          <a href="mailto:info@reactly.nl" className="text-blue-500 underline">
            info@reactly.nl
          </a>
        </p>
      </div>

      <CodeShowcase />

      <FadeInWhenVisible delay={0.1}>
        <div className="pb-5">
          <CTAButton />
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <div className="py-20 pt-24 flex">
          <RolexAdvies />
        </div>
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

      <FadeInWhenVisible>
        {/* <div className="relative bg-gradient-to-b w-full from-[#FFF] via-[#e9eeff] to-[#FFF]"> */}
        {/* <RolexIntro /> */}
        {/* <ProductShowcase /> */}
        <div className="">
          <h2
            id="reviews-title"
            className="text-3xl font-medium tracking-tight text-neutral-900 text-center dark:text-white"
          >
            Offerte op maat voor jouw project
          </h2>
          <p className="mt-2 text-md md:text-lg max-w-xs md:max-w-xl mx-auto text-neutral-600 text-center dark:text-neutral-200">
            We staan voor je klaar om je te helpen met al je vragen. Kun je niet
            vinden wat je zoekt? Neem contact met ons op via &nbsp;
            <a
              href="mailto:info@reactly.nl"
              className="text-blue-500 underline"
            >
              info@reactly.nl
            </a>
          </p>
        </div>
        <CardComponentTwo />
        {/* </div> */}
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <div className="w-full flex items-center justify-center mb-10 pt-20 lg:pt-14 pb-20">
          <G2BadgeSection />
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <LeaseOptionsGridTwo />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <FAQSectionTwo />
      </FadeInWhenVisible>

      {/* <FadeInWhenVisible delay={0.1}>
        <CTA />
      </FadeInWhenVisible> */}

      <FadeInWhenVisible delay={0.1}>
        <FooterSectionSM />
      </FadeInWhenVisible>

      {/* <FadeInWhenVisible>
        <HomePageIntro />
      </FadeInWhenVisible> */}

      {/* <FadeInWhenVisible>
        <ProductShowcase />
      </FadeInWhenVisible> */}

      {/* <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="text-3xl lg:text-5xl items-center text-center font-medium">
            Cases
          </div>
          <div className="hidden md:block">
            <button className="relative font-light text-[14px] backdrop-blur-xl outline-1 border-black mt-2 px-6 py-2.5 hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap bg-[#f0f0f0] overflow-hidden group">
              <span className="relative z-10 text-black uppercase group-hover:text-white font-medium transition-all duration-500 ease-in-out">
                Ontdek onze diensten
              </span>
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
            </button>
          </div>
        </div>
      </div> */}

      {/* <FadeInWhenVisible delay={0.1}>
        <LeaseOptionsGridTwo />
      </FadeInWhenVisible> */}

      {/* <FadeInWhenVisible delay={0.1}>
        <div className=" pb-10">
          <InfinitiveMovingCardsIMGTwo />
        </div>
      </FadeInWhenVisible> */}

      {/* <FadeInWhenVisible delay={0.1}>
        <div className="pb-20 md:pb-28 pt-8 p-5">
          <OntdekCollectieFour />
        </div>
      </FadeInWhenVisible> */}

      {/* <FadeInWhenVisible delay={0.1}>
        <div className="hidden pt-20 md:pt-28 py-10 md:flex">
          <DiagonalSlider />
        </div>
      </FadeInWhenVisible> */}

      {/* <FadeInWhenVisible delay={0.1}>
        <CardsIntro />
      </FadeInWhenVisible> */}

      {/* <FadeInWhenVisible delay={0.1}>
        <div className="dark:hidden md:mt-4 flex mb-8 md:mb-2 justify-start w-full mx-auto">
          <Link className="mx-auto" href={"/aanbod"}>
            <button className="relative font-light text-[14px] backdrop-blur-xl outline-1 border-black border-1 border-t border-b mt-8 w-fit px-14 mx-auto hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent overflow-hidden group">
              <span className="relative z-10 text-black uppercase group-hover:text-white font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
                Bekijk ons volledige aanbod
              </span>
              <span className="absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </button>
          </Link>
        </div>

        <div className="md:mt-4 hidden dark:flex mb-5 md:mb-2 justify-start w-full mx-auto">
          <Link className="mx-auto" href={"/aanbod"}>
            <button className="relative font-light text-[14px] backdrop-blur-xl outline-1 border-white border-1 border-t border-b mt-8 w-fit px-14 mx-auto hover:font-medium hover:tracking-wide transition-all duration-500 ease-in-out whitespace-nowrap pt-2.5 pb-2.5 bg-transparent overflow-hidden group">
              <span className="relative z-10 text-white uppercase group-hover:text-black font-medium hover:tracking-wide transition-all duration-500 ease-in-out">
                Bekijk ons volledige aanbod
              </span>
              <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </button>
          </Link>
        </div>
      </FadeInWhenVisible> */}

      {/* <FadeInWhenVisible delay={0.1}>
        <div className="hidden pt-20 py-10 md:flex">
          <DiagonalSliderTwo />
        </div>
      </FadeInWhenVisible> */}

      {/* <div>
        <HeroHeader />
        <AIDreamTeamSlider />

        <SolutionsSlider />

        <ProductShowcase />
        <div className="relative bg-gradient-to-b w-full from-[#e9eeff] to-[#e9eeff]">
          <div className="">
            <CardComponentTwo />
          </div>
        </div>
      </div> */}
    </>
  );
}
