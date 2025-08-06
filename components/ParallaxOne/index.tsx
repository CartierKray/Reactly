"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import styles from "./style.module.scss";
import { useTransform, useScroll, motion } from "framer-motion";
import AlphaLogoThree from "../AlphaLogo/AlphaLogoThree";
import ParticleLinks from "../Particles/ParticleLinks";
import AlphaLogoFour from "../AlphaLogo/AlphaLogoFour";
import BeterLeaseLogoTwo from "../BeterLeaseLogo/BeterLeaseLogoTwo";

interface ParallaxImageProps {
  src: string;
  y: any; // Update to a more specific type if known
  scale: any; // Type for scale transform
}

export default function ParallaxSingleImage() {
  const gallery = useRef<HTMLDivElement | null>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: any) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className={`${styles.main} `}>
      <div ref={gallery} className={`bg-[#171719] ${styles.gallery}`}>
        <ParallaxImage
          src="/images/1920x1080_forest.avif" // image source
          y={y}
          scale={scale}
        />
      </div>
    </main>
  );
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, y, scale }) => {
  return (
    <motion.div className={styles.fullImageContainer} style={{ y, scale }}>
      <Image
        src={src}
        alt="Parallax image"
        width={1000}
        height={1000}
        className="flex justify-center items-center w-full h-screen object-cover"
      />
      {/* <div className="inset-0 absolute">
        <ParticleLinks />
      </div> */}
      <div className="inset-0 w-full h-full absolute bg-gradient-to-b from-[#171719] via-transparent/50 to-[#171719]">
        <div className="flex h-screen justify-center items-center">
          <div className="scale-75 lg:scale-90 xl:scale-100">
            <div className="">
              <div className="transition ease-in-out duration-1000 scale-125 md:scale-150">
                <BeterLeaseLogoTwo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
