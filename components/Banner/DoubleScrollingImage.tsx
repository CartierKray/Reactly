"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const DoubleScrollingImage = () => {
  const controls = useAnimation();
  const controlsReverse = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentXReverse, setCurrentXReverse] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    console.log("DoubleScrollingImage mounted");

    const handleScroll = () => {
      if (!isMounted.current) return;

      const currentScrollY = window.scrollY;
      const scrollYDelta = currentScrollY - lastScrollY;

      const newX = currentX - scrollYDelta * 0.1;
      const newXReverse = currentXReverse + scrollYDelta * 0.1;

      setCurrentX(newX);
      setCurrentXReverse(newXReverse);

      setTimeout(() => {
        if (isMounted.current) {
          console.log("Starting animations in handleScroll");
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
        }
      }, 0);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      isMounted.current = false;
      window.removeEventListener("scroll", handleScroll);
      console.log("DoubleScrollingImage unmounted");
    };
  }, [lastScrollY, controls, currentX, controlsReverse, currentXReverse]);

  useEffect(() => {
    setTimeout(() => {
      if (isMounted.current) {
        console.log("Starting initial animations");
        controls.start({ x: 0 });
        controlsReverse.start({ x: 0 });
      }
    }, 0);
  }, [controls, controlsReverse]);

  const imageSrc = "/images/askusanythingbanner 2.png"; // Verander dit naar het pad van je afbeelding

  const imageContent = Array(100)
    .fill(0)
    .map((_, index) => (
      <Image
        key={index}
        src={imageSrc}
        alt="Scrolling"
        className=""
        width={1000}
        height={1000}
        style={{ width: "auto", height: "35px" }} // Pas de afmetingen van de afbeelding aan indien nodig
      />
    ));

  return (
    <div
      className="relative z-20 lg:mb-0"
      style={{ height: "200px", backgroundColor: "#1a1a1a" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="relative"
          style={{
            transform: "rotate(-3deg)",
            overflow: "hidden",
            height: "100%",
          }}
        >
          <motion.div
            animate={controls}
            initial={{ x: 0 }}
            className="whitespace-nowrap pt-10 flex"
            style={{
              minWidth: "2500vw",
              position: "absolute",
              top: "10%",
              transform: "skewY(-12deg)",
            }}
          >
            <div className="flex whitespace-nowrap">{imageContent}</div>
          </motion.div>
          <motion.div
            animate={controlsReverse}
            initial={{ x: 0 }}
            className="whitespace-nowrap flex -ml-40"
            style={{
              minWidth: "2500vw",
              position: "absolute",
              top: "50%", // Verhoog deze waarde indien nodig om meer ruimte tussen de sets te maken
              transform: "skewY(12deg)",
            }}
          >
            <div className="flex whitespace-nowrap">{imageContent}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoubleScrollingImage;
