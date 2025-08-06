import { motion } from "framer-motion";
import React from "react";
import Banner from "../Banner/Banner";

interface LinksProps {
  scrolled: boolean; // Voeg een expliciet type toe voor 'scrolled'
}

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  FlyoutContent?: React.ElementType;
  scrolled?: boolean; // Make 'scrolled' optional
}

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
  hidden: { y: -100, opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: index * 0.05, duration: 0.4 }, // Pas hier de duur aan indien nodig
  }),
};

interface TextAnimationProps {
  text: string;
  className?: string; // Laat toe dat stijlen worden doorgegeven
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text, className }) => {
  const letterVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  return (
    <motion.div
      className={className} // Pas de meegegeven stijlen toe
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) =>
        char === " " ? (
          <span key={index}>&nbsp;</span> // Behandel spaties correct
        ) : (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        )
      )}
    </motion.div>
  );
};

function HeaderText() {
  return (
    <>
      <motion.div
        className="absolute hidden  inset-0 z-10 w-full md:flex items-center justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="rounded-3xl grid items-center justify-center p-5 md:p-14"
          variants={itemVariants}
        >
          <motion.div
            className="font-semibold tracking-wide custom-shadow-small pl-0 pb-4 text-sm md:text-lg text-white/80 opacity-20"
            variants={itemVariants}
          >
            WE CREATE YOUR WEBSITE
          </motion.div>
          <motion.div
            className=" inset-0 z-10 w-full flex items-center justify-between"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <TextAnimation
              text="Partners in online succes"
              className="text-4xl hidden xl:block md:text-6xl custom-shadow-small xl:text-7xl leading-14 font-semibold text-white max-w-4xl text-start"
            />
            <motion.h1 className="text-4xl block xl:hidden md:text-6xl custom-shadow-small xl:text7xl leading-14 font-semibold text-white max-w-4xl text-start">
              Marktleider in Webdesign, Marketing & SEO
            </motion.h1>
          </motion.div>
          <motion.div
            className="mt-4 text-xl md:text-2xl text-white text-start"
            variants={itemVariants}
          >
            <div className="text-xl text-white xl:text-[28px] mt-2 font-light">
              <Banner />
            </div>
          </motion.div>
          <motion.div
            className="mb-5 md:mb-2 p-2 flex justify-start w-full max-w-xs"
            variants={itemVariants}
          >
            <button className="relative font-light text-[14px] outline-1 outline-gray-200 outline mt-8 w-fit whitespace-nowrap pl-10 pr-10 md:pl-32 md:pr-32 pt-3 pb-3 bg-white/15 backdrop-blur-sm rounded-full overflow-hidden group">
              <span className="relative z-10 text-white group-hover:text-black transition-all duration-500 ease-in-out">
                Leer meer!
              </span>
              <span className="absolute inset-0 rounded-full bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default HeaderText;
