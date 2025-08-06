"use client";

import type { NextPage } from "next";
import { useState } from "react";
import "../3DCard/ThreeDCard";

import Sidebar from "../Sidebar/Sidebar";
import Content from "./Content";
import { TracingBeamDemo } from "../TracingBeam/TracingBeam";
import { ThreeDCardDemo } from "../3DCard/ThreeDCard";
import { LampDemo } from "../Lamp/Lamp";
import { TextRevealCardPreview } from "../TextReveal/TextReveal";
import AnimatedTooltipPreview from "../Tooltip/Tooltip";
import { SparklesPreview } from "../Sparkles/Sparkles";
import { SparklesTwoPreview } from "../Sparkles/SparklesTwo";
import SwiperDiv from "../Swiper/SwiperDiv";
import { SpotlightPreview } from "../Spotlight/Spotlight";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";
import { GoogleGeminiEffectDemo } from "../Gemini/Gemini";
import { MacbookScrollDemo } from "../Hero/MacbookScroll";
import { PulseBeams } from "../PulseBeam/PulseBeam";
import { PulseBeamsSecond } from "../PulseBeam/PulseBeamTwo";
import { AuroraHero } from "../AuroraHero/AuroraHero";
import { HoverImageLinks } from "../HoverImageLinks/HoverImageLinks";
import { BackgroundBeamsTwo } from "../BackgroundBeams/BackgroundBeamsTwo";
import { EvervaultCardDemo } from "../EvervaultCard/Everfault-Card";
import { LayoutGridDemo } from "../LayoutGrid/LayoutGrid";
import { MeteorCard } from "../MeteorCard/MeteorCard";
import { ParallaxScrollDemo } from "../ParallaxScroll/ParallaxScrollOne";
import { ParallaxScrollSecondDemo } from "../ParallaxScroll/ParallaxScrollTwo";
import { SVGMaskEffectDemo } from "../SVGMaskEffect/SVGMaskEffect";

const TotalContent: NextPage = () => {
  const componentsData = [
    { name: "3D Card Effect", content: <TracingBeamDemo />, isNew: true },

    { name: "3D Pin", content: <ThreeDCardDemo /> },
    {
      name: "Animated Tooltip",
      content: <LampDemo />,
    },
    {
      name: "Aurora Background",
      content: <TextRevealCardPreview />,
    },
    {
      name: "Background Beams",
      content: (
        <div className="mt-40">
          <AnimatedTooltipPreview />
        </div>
      ),
    },
    {
      name: "Background Boxes",
      content: <SparklesPreview />,
    },
    {
      name: "Background Gradient",
      content: <SparklesTwoPreview />,
    },
    {
      name: "Bento Grid",
      content: <SwiperDiv />,
      isNew: true,
    },
    {
      name: "Canvas Reveal Effect",
      content: <SpotlightPreview />,
    },
    {
      name: "Card Hover Effect",
      content: <GoogleGeminiEffectDemo />,
      isNew: true,
    },
    { name: "Card Stack", content: <MacbookScrollDemo /> },
    {
      name: "Container Scroll Animation",
      content: <PulseBeams />,
    },
    {
      name: "Direction Aware Hover",
      content: <PulseBeamsSecond />,
    },
    { name: "Evervault Card", content: <BackgroundBeamsTwo /> },
    {
      name: "Floating Navbar",
      content: <AuroraHero />,
    },
    {
      name: "Following Pointer",
      content: <HoverImageLinks />,
    },
    { name: "GitHub Globe", content: <EvervaultCardDemo /> },
    { name: "Glowing Stars", content: <LayoutGridDemo /> },
    {
      name: "Google Gemini Effect",
      content: <MeteorCard />,
    },
    {
      name: "Gradient Animation",
      content: <ParallaxScrollDemo />,
    },
    {
      name: "Grid and Dot Backgrounds",
      content: <ParallaxScrollSecondDemo />,
    },
    { name: "Hero Parallax", content: <SVGMaskEffectDemo /> },
    {
      name: "Hover Border Gradient",
      content: <div>Content for Hover Border Gradient</div>,
      isNew: true,
    },
    { name: "Images Slider", content: <div>Content for Images Slider</div> },
    {
      name: "Infinite Moving Cards",
      content: <div>Content for Infinite Moving Cards</div>,
    },
    { name: "Lamp Effect", content: <div>Content for Lamp Effect</div> },
    { name: "3D Card Effect", content: <div>Content for 3D Card Effect</div> },
    { name: "3D Pin", content: <div>Content for 3D Pin</div> },
    {
      name: "Animated Tooltip",
      content: <div>Content for Animated Tooltip</div>,
    },
    {
      name: "Aurora Background",
      content: <div>Content for Aurora Background</div>,
    },
    {
      name: "Background Beams",
      content: <div>Content for Background Beams</div>,
    },
    {
      name: "Background Boxes",
      content: <div>Content for Background Boxes</div>,
      isNew: true,
    },
    {
      name: "Background Gradient",
      content: <div>Content for Background Gradient</div>,
    },
    { name: "Bento Grid", content: <div>Content for Bento Grid</div> },
    {
      name: "Canvas Reveal Effect",
      content: <div>Content for Canvas Reveal Effect</div>,
    },
    {
      name: "Card Hover Effect",
      content: <div>Content for Card Hover Effect</div>,
    },
    { name: "Card Stack", content: <div>Content for Card Stack</div> },
    {
      name: "Container Scroll Animation",
      content: <div>Content for Container Scroll Animation</div>,
    },
    {
      name: "Direction Aware Hover",
      content: <div>Content for Direction Aware Hover</div>,
    },
    { name: "Evervault Card", content: <div>Content for Evervault Card</div> },
    {
      name: "Floating Navbar",
      content: <div>Content for Floating Navbar</div>,
    },
    {
      name: "Following Pointer",
      content: <div>Content for Following Pointer</div>,
    },
    { name: "GitHub Globe", content: <div>Content for GitHub Globe</div> },
    { name: "Glowing Stars", content: <div>Content for Glowing Stars</div> },
    {
      name: "Google Gemini Effect",
      content: <div>Content for Google Gemini Effect</div>,
    },
    {
      name: "Gradient Animation",
      content: <div>Content for Gradient Animation</div>,
    },
    {
      name: "Grid and Dot Backgrounds",
      content: <div>Content for Grid and Dot Backgrounds</div>,
    },
    { name: "Hero Parallax", content: <div>Content for Hero Parallax</div> },
    {
      name: "Hover Border Gradient",
      content: <div>Content for Hover Border Gradient</div>,
      isNew: true,
    },
    { name: "Images Slider", content: <div>Content for Images Slider</div> },
    {
      name: "Infinite Moving Cards",
      content: <div>Content for Infinite Moving Cards</div>,
    },
    { name: "Lamp Effect", content: <div>Content for Lamp Effect</div> },
    // ... Voeg hier meer componenten toe zoals in je UI ontwerp ...
  ];

  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(
    componentsData[0].content
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const nextComponentIndex = (activeIndex + 1) % componentsData.length;
  const prevComponentIndex =
    (activeIndex - 1 + componentsData.length) % componentsData.length;

  const nextComponent = () => {
    setActiveComponent(componentsData[nextComponentIndex].content);
    setActiveIndex(nextComponentIndex);
  };

  const prevComponent = () => {
    setActiveComponent(componentsData[prevComponentIndex].content);
    setActiveIndex(prevComponentIndex);
  };

  return (
    <div className="grid md:flex pt-32 max-w-screen-2xl mx-auto md:px-5 lg:px-10 xl:max-w-[1400px]">
      <Sidebar
        components={componentsData}
        setActiveComponent={(content) => setActiveComponent(content)}
      />
      <Content activeComponent={activeComponent} />
      <div className="md:hidden p-5 pt-10 flex justify-between">
        <button
          onClick={prevComponent}
          className="pl-8 pr-8 pt-2 pb-2 outline flex text-[12px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 outline-1 outline-gray-300 dark:outline-neutral-800 rounded-md"
        >
          <ArrowLeftIcon className="w-5 h-5 mt-[1px] mr-2 -ml-2" />
          {componentsData[prevComponentIndex].name}
        </button>
        <button
          onClick={nextComponent}
          className=" pl-8 pr-8 pt-2 pb-2 outline flex text-[13px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 outline-1 outline-gray-300 dark:outline-neutral-800 rounded-md"
        >
          {componentsData[nextComponentIndex].name}
          <ArrowRight className="w-5 h-5 mt-[1px] -mr-2 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TotalContent;
