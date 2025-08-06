"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FloatinTopNavbar } from "../FloatingTopNavbar.tsx/FloatingTopNavbar";

function ScrollingNav() {
  const controls = useAnimation();
  const [lastYPos, setLastYPos] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const yPos = window.scrollY;
      const isScrollingUp = yPos < lastYPos;

      // Toon de navbar als we omhoog scrollen of aan de top van de pagina zijn.
      if (isScrollingUp || yPos < 10) {
        setShouldShow(true);
      } else {
        setShouldShow(false);
      }

      setLastYPos(yPos);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastYPos]);

  useEffect(() => {
    if (shouldShow) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 1, y: -100 });
    }
  }, [shouldShow, controls]);

  return (
    <motion.div
      className="sticky top-0 z-50"
      initial={{ opacity: 1, y: 0 }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      <FloatinTopNavbar />
    </motion.div>
  );
}

export default ScrollingNav;
