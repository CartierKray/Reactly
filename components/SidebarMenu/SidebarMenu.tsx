"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type MenuItem = {
  name: string;
  imageSrc: string;
  bgColor: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    name: "Stalen deuren",
    imageSrc: "/images/navmenubar-stalen-deuren.webp",
    bgColor: "bg-[#052c25]",
    href: "/stalen-deuren", // Voeg de gewenste URL toe
  },
  {
    name: "Spiegels",
    imageSrc: "/images/navmenubar-spiegel.webp",
    bgColor: "bg-orange-500 backdrop-blur-2xl",
    href: "/spiegels",
  },
  {
    name: "Balustrades",
    imageSrc: "/images/navmenubar-balustrades.webp",
    bgColor: "bg-amber-500",
    href: "/balustrades",
  },
  {
    name: "Trapleuningen",
    imageSrc: "/images/navmenubar-trapleuningen.webp",
    bgColor: "bg-black",
    href: "/trapleuningen",
  },
  {
    name: "Meubels",
    imageSrc: "/images/navmenubar-accessoires.webp",
    bgColor: "bg-sky-500",
    href: "/meubels",
  },
  {
    name: "Contact",
    imageSrc: "/images/navmenubar-contact.webp",
    bgColor: "bg-zinc-500",
    href: "/contact",
  },
];

const defaultImageSrc = "/images/navmenubar-default.webp"; // Voeg het pad toe naar je standaard afbeelding

const SidebarMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string>(defaultImageSrc);
  const [bgColor, setBgColor] = useState<string>("bg-zinc-700");

  const handleMouseEnter = (item: MenuItem) => {
    setActiveImage(item.imageSrc);
    setBgColor(item.bgColor);
  };

  const handleMouseLeave = () => {
    setActiveImage(defaultImageSrc);
    setBgColor("bg-zinc-800");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const lineVariants = {
    open: {
      rotate: 45,
      translateY: 5,
    },
    closed: {
      rotate: 0,
      translateY: 0,
    },
  };

  const middleLineVariants = {
    open: {
      width: 0,
      opacity: 0,
    },
    closed: {
      width: "1.5rem",
      opacity: 1,
    },
  };

  const bottomLineVariants = {
    open: {
      rotate: -45,
      translateY: -5,
    },
    closed: {
      rotate: 0,
      translateY: 0,
    },
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <motion.div
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        className="relative z-50 scale-90 flex flex-col items-center justify-center w-10 h-10 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        style={
          menuOpen
            ? { position: "fixed", top: "45px", left: "25px", zIndex: 60 }
            : { zIndex: 50 }
        }
      >
        <motion.span
          variants={{
            closed: { rotate: 0, y: 0, opacity: 1 },
            open: { rotate: 45, y: 8, opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
          className={`block w-7 h-0.5 transform-gpu ${
            menuOpen ? "bg-white" : "bg-black"
          }`}
        />
        <motion.span
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
          className={`block w-7 h-0.5 my-[5px] transform-gpu ${
            menuOpen ? "bg-white" : "bg-black"
          }`}
        />
        <motion.span
          variants={{
            closed: { rotate: 0, y: 0, opacity: 1 },
            open: { rotate: -45, y: -2, opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
          className={`block w-7 h-0.5 transform-gpu ${
            menuOpen ? "bg-white" : "bg-black"
          }`}
        />
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ width: 450 }}
            animate={{
              opacity: 1,
              transition: { duration: 2, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.1, ease: "easeInOut" },
            }}
            className={`fixed top-0  pt-32 justify-center left-0 z-50 h-full ${bgColor} p-7 transition-colors duration-300 ease-in-out`}
          >
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <div
                  key={index}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                  className="py-2 text-[32px] pb-5 font-semibold text-white cursor-pointer"
                >
                  {item.name}
                </div>
              </Link>
            ))}
            <div className="fixed bottom-20 left-36 w-fit">
              <Image
                src="/images/Logo.png"
                alt=""
                width={1000}
                height={1000}
                className="w-40 object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 image-container"
          >
            <Image
              src={activeImage}
              alt="Active Image"
              width={10000}
              height={10000}
              className="w-full h-full z-50 image-enlarge object-cover transition-transform duration-1000 ease-in-out"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarMenu;
