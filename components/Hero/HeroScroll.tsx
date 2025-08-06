"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import { motion } from "framer-motion";
import BannerThree from "../Banner/BannerThree";
import { SpotlightTwo } from "../ui/spotlight-two";
import { BackgroundBeams } from "../ui/background-beamsTwo";
import { Meteors } from "../ui/meteors";

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

export function HeroScrollDemo() {
  return (
    <div className="flex-col overflow-hidden -mt-20 md:mt-0 lg:mb-[125px] ">
      <BackgroundBeams className="z-0 block xl:hidden" />
      <div className="block xl:hidden">
        <Meteors number={5} />
      </div>
      <SpotlightTwo
        className="-top-40 left-0 md:left-80 md:-top-20 hidden xl:block"
        fill="white"
      />
      <ContainerScroll
        titleComponent={
          <>
            <motion.div
              className=" inset-0 md:mt-20 z-10 w-full mt-[300px] flex items-center justify-center"
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
                <motion.div className="text-4xl md:text-5xl lg:text-7xl font-semibold max-w-md md:max-w-5xl text-center flex justify-center flex-wrap">
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
                </motion.div>

                <motion.div
                  className="mt-4 text-xl md:text-2xl text-white text-start"
                  variants={itemVariants}
                >
                  <div className="mt-4">
                    <BannerThree />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        }
      >
        <Image
          src={`/images/hero-new.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto object-cover w-full"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

export const users = [
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://picsum.photos/id/10/300/300",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://picsum.photos/id/11/300/300",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://picsum.photos/id/12/300/300",
    badge: "Mentor",
  },
  {
    name: "Jane Smith",
    designation: "Product Manager, Innovate Inc",
    image: "https://picsum.photos/id/13/300/300",
    badge: "Mentor",
  },
  {
    name: "Robert Johnson",
    designation: "Data Scientist, DataWorks",
    image: "https://picsum.photos/id/14/300/300",
    badge: "Mentor",
  },
  {
    name: "Emily Davis",
    designation: "UX Designer, DesignHub",
    image: "https://picsum.photos/id/15/300/300",
    badge: "Mentor",
  },
  {
    name: "Michael Miller",
    designation: "CTO, FutureTech",
    image: "https://picsum.photos/id/16/300/300",
    badge: "Mentor",
  },
  {
    name: "Sarah Brown",
    designation: "CEO, StartUp",
    image: "https://picsum.photos/id/17/300/300",
  },
  {
    name: "James Wilson",
    designation: "DevOps Engineer, CloudNet",
    image: "https://picsum.photos/id/18/300/300",
    badge: "Something",
  },
  {
    name: "Patricia Moore",
    designation: "Marketing Manager, MarketGrowth",
    image: "https://picsum.photos/id/19/300/300",
    badge: "Mentor",
  },
  {
    name: "Richard Taylor",
    designation: "Frontend Developer, WebSolutions",
    image: "https://picsum.photos/id/20/300/300",
  },
  {
    name: "Linda Anderson",
    designation: "Backend Developer, ServerSecure",
    image: "https://picsum.photos/id/21/300/300",
  },
  {
    name: "William Thomas",
    designation: "Full Stack Developer, FullStack",
    image: "https://picsum.photos/id/22/300/300",
    badge: "Badger",
  },
  {
    name: "Elizabeth Jackson",
    designation: "Project Manager, ProManage",
    image: "https://picsum.photos/id/23/300/300",
    badge: "Mentor",
  },
  {
    name: "David White",
    designation: "Database Administrator, DataSafe",
    image: "https://picsum.photos/id/24/300/300",
    badge: "Advocate",
  },
  {
    name: "Jennifer Harris",
    designation: "Network Engineer, NetConnect",
    image: "https://picsum.photos/id/25/300/300",
  },
  {
    name: "Charles Clark",
    designation: "Security Analyst, SecureIT",
    image: "https://picsum.photos/id/26/300/300",
  },
  {
    name: "Susan Lewis",
    designation: "Systems Analyst, SysAnalyse",
    image: "https://picsum.photos/id/27/300/300",
  },
  {
    name: "Joseph Young",
    designation: "Mobile Developer, AppDev",
    image: "https://picsum.photos/id/28/300/300",
    badge: "Mentor",
  },
  {
    name: "Margaret Hall",
    designation: "Quality Assurance, BugFree",
    image: "https://picsum.photos/id/29/300/300",
    badge: "Developer",
  },
];
