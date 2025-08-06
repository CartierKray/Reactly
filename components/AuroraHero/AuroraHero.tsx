"use client";

import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { BackgroundBeams } from "../ui/background-beamsTwo";
import BannerFour from "../Banner/BannerFour";

const stagger = (delay = 0.2) => {
  return {
    delayChildren: 0.3,
    staggerChildren: delay,
  };
};

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: stagger(0.2), // Pas hier de aangepaste stagger-functie toe
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: index * 0.05, duration: 0.4 }, // Pas hier de duur aan indien nodig
  }),
};

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 text-gray-200"
    >
      {/* <ContainerScroll
        titleComponent={ */}
      <>
        <BackgroundBeams />
        <motion.div
          className="inset-0 z-10 w-full -mt-20 flex items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="rounded-3xl grid items-center justify-center p-5 md:p-14"
            variants={itemVariants}
          >
            <motion.div
              className="font-semibold text-center tracking-wide custom-shadow-small pl-0 pb-4 text-sm md:text-lg dark:text-white/80 text-black/70 opacity-20"
              variants={itemVariants}
            >
              WE CREATE YOUR WEBSITE
            </motion.div>
            {/* <motion.div className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-md md:max-w-5xl text-center flex justify-center flex-wrap">
                  {"Marktleider in Webdesign, Marketing & SEO"
                    .split(" ")
                    .map((word, index) => (
                      <span key={index} className="mr-2 md:mr-4 last:mr-0">
                        {Array.from(word).map((char, charIndex) => (
                          <span
                            key={charIndex}
                            className="inline-block bg-clip-text custom-shadow-small text-transparent bg-gradient-to-b dark:from-white dark:via-white dark:to-black from-black via-black/80 to-black/20"
                            style={{
                              backgroundSize: "100% 200%",
                              backgroundPosition: "0 65%",
                            }}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    ))}
                </motion.div> */}

            <motion.div className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-md md:max-w-5xl text-center flex justify-center flex-wrap">
              Marktleider in Webdesign, Marketing & SEO
            </motion.div>
            <motion.div
              className="mt-4 text-xl md:text-2xl text-white text-start"
              variants={itemVariants}
            >
              <div className="mt-4 text-white">
                <BannerFour />
              </div>
              {/* <div className="mt-10">
                    <AnimatedTooltipPreview />
                  </div> */}
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="relative z-10 flex flex-col items-center">
          <motion.button
            style={{
              border,
              boxShadow,
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
          >
            Start free trial
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </div>

        <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>
      </>
      {/* }
      >
        <Image
          src={`/images/hero-new.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto object-cover w-full"
          draggable={false}
        />
      </ContainerScroll> */}
    </motion.section>
  );
};
