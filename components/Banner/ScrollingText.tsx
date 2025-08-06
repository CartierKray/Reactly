"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, Fragment } from "react";

const ScrollingText = () => {
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        const scrollYDelta = currentScrollY - lastScrollY;

        // Verklein de impact van scrollYDelta om de beweging soepeler te maken
        const newX = currentX - scrollYDelta * 0.1;
        setCurrentX(newX); // Update de huidige x-positie

        controls.start({
          x: newX,
          // Gebruik een inertia-type transition voor natuurlijke vertraging
          transition: {
            type: "inertia",
            velocity: -scrollYDelta * 0.2, // Gebruik de scroll delta om de beginnelingssnelheid te bepalen
            power: 0.2, // Hoe snel de snelheid afneemt, lager is trager
            timeConstant: 1000, // Hoe lang de animatie duurt
            restDelta: 0.5, // Wanneer de animatie als voltooid wordt beschouwd
          },
        });

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, controls, currentX]);

  // Stel elk deel van de tekst samen met aparte stijlen of klassen
  const textParts = [
    "GROOT AANBOD",
    "•",
    "MAATWERK",
    "•",
    "MOOI DESIGN",
    "•",
    "ECHT VAKWERK",
    "•",
    "BESTE SERVICE",
    "•",
  ];

  // Herhaal het patroon om een lange scrollbare tekstlijn te vormen
  const textContent = Array(250)
    .fill(textParts)
    .flat()
    .map((part, index) => (
      <span key={index} className={part === "•" ? "mx-3" : ""}>
        {part}
      </span>
    ));

  return (
    <div className="overflow-hidden w-screen bg-[#F3BD3E]">
      <motion.div
        animate={controls}
        initial={{ x: 0 }}
        className="whitespace-nowrap flex"
        style={{ minWidth: "2000vw" }}
      >
        <div className="text-black font-medium tracking-wider py-3 pt-3.5 text-[11px] uppercase text-clip overflow-hidden">
          {textContent}
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollingText;
