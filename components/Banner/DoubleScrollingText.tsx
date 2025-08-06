"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const DoubleScrollingText = () => {
  const controls = useAnimation();
  const controlsReverse = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentXReverse, setCurrentXReverse] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        const scrollYDelta = currentScrollY - lastScrollY;

        const newX = currentX - scrollYDelta * 0.1;
        const newXReverse = currentXReverse + scrollYDelta * 0.1;

        setCurrentX(newX);
        setCurrentXReverse(newXReverse);

        controls.start({
          x: newX,
          transition: {
            type: "inertia",
            velocity: -scrollYDelta * 0.2,
            power: 0.2,
            timeConstant: 1000,
            restDelta: 0.5,
          },
        });

        controlsReverse.start({
          x: newXReverse,
          transition: {
            type: "inertia",
            velocity: scrollYDelta * 0.2,
            power: 0.2,
            timeConstant: 1000,
            restDelta: 0.5,
          },
        });

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, controls, currentX, controlsReverse, currentXReverse]);

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

  const textContent = Array(100)
    .fill(textParts)
    .flat()
    .map((part, index) => (
      <span key={index} className={part === "•" ? "mx-3" : ""}>
        {part}
      </span>
    ));

  return (
    <div
      className="w-screen relative z-20 lg:mb-0 -rotate-3 overflow-hidden"
      style={{ height: "100px" }}
    >
      <motion.div
        animate={controls}
        initial={{ x: 0 }}
        className="whitespace-nowrap flex"
        style={{
          minWidth: "2500vw", // Vergroot de minimale breedte
          position: "absolute",
          top: "10%",
          transform: "skewY(-12deg)",
        }}
      >
        <div className="text-black font-medium bg-[#F3BD3E] tracking-wider py-3 text-[11px] uppercase text-clip overflow-hidden">
          {textContent}
        </div>
      </motion.div>
      <motion.div
        animate={controlsReverse}
        initial={{ x: 0 }}
        className="whitespace-nowrap flex -ml-40"
        style={{
          minWidth: "2500vw", // Vergroot de minimale breedte
          position: "absolute",
          top: "60%",
          transform: "skewY(12deg)",
        }}
      >
        <div className="text-black font-medium bg-[#F3BD3E] tracking-wider py-3 text-[11px] uppercase text-clip overflow-hidden">
          {textContent}
        </div>
      </motion.div>
    </div>
  );
};

export default DoubleScrollingText;
