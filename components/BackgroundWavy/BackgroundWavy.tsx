"use client";
import React from "react";
import { WavyBackground } from "../ui/wavy-background";
import AnimatedTooltipPreview from "../Tooltip/Tooltip";

export function BackgroundWavy() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <div>
        <div className="flex w-full justify-center items-center mx-auto">
          <AnimatedTooltipPreview />
        </div>
      </div>
      <p className="text-4xl md:text-6xl lg:text-7xl max-w-md md:max-w-full text-white font-bold inter-var text-center">
        Marktleider in Webdesign, Marketing & SEO
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center"></p>
    </WavyBackground>
  );
}
