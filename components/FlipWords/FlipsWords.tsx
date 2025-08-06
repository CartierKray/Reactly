import React from "react";
import { FlipWords } from "../ui/flip-words";

export function FlipWordsOne() {
  const words = [
    "Maatwerk",
    "Branding",
    "Webdesign",
    "Marketing",
    "Conversie",
    "SEO & SEA",
    "Strategie",
    "Performance",
    "Creativiteit",
    "AI-integratie",
    "Automatisering",
    "Schaalbaarheid",
  ];

  return (
    <>
      <div className=" flex justify-center items-center">
        <div className="uppercase tracking-wide text-4xl md:text-5xl lg:text-7xl 2xl:text-8xl font-semibold text-white">
          Web Partner In &nbsp; <br />
          <FlipWords className="" words={words} />
          {/* &nbsp;Online Groei */}
        </div>
      </div>
    </>
  );
}
