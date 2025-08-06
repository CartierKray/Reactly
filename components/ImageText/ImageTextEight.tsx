import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AccordionHomePage } from "../Accordion/AccordionHomePage";

function ImageTextEight() {
  return (
    <div className="md:flex h-fit md:h-[600px] order">
      <div className="w-full md:w-1/2 lg:order-2 flex flex-col justify-center items-center text-center bg-gradient-to-b from-stone-800 to-stone-800">
        <AccordionHomePage />
      </div>
      <div className="w-full hidden md:block lg:order-1 md:w-1/2 relative overflow-hidden">
        <Image
          src="/images/1920x1920-q3_2020_1408.avif" // Vervang dit met de URL van je achtergrondafbeelding
          alt="Achtergrondafbeelding"
          className="object-cover h-full hover:scale-110 transition-all duration-1000 ease-in-out"
          width={1000}
          height={1000}
        />
        <div className="inset-0 absolute h-full w-full bg-gradient-to-b from-[#2d3033] via-transparent/50 to-[#2d3033]"></div>
      </div>
    </div>
  );
}

export default ImageTextEight;
