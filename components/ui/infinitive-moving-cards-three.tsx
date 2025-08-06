"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingImageCardsThree = ({
  images,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  images: {
    src: string;
    alt: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller mx-auto relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {images.map((image, idx) => (
          <li
            key={idx}
            className="relative w-[160px] h-[80px] flex items-center justify-center bg-white rounded-xl shadow border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 overflow-hidden"
          >
            <div className="relative w-[100px] h-[60px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
              />
            </div>
          </li>
          //           <li
          //   key={idx}
          //   className="relative w-[160px] h-[80px] flex items-center justify-center bg-white rounded-xl shadow border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 overflow-hidden hover:shadow-md transition duration-300"
          // >
          //   <div className="relative w-[100px] h-[60px] filter grayscale hover:filter-none transition duration-300">
          //     <Image
          //       src={image.src}
          //       alt={image.alt}
          //       fill
          //       className="object-contain"
          //     />
          //   </div>
          // </li>
        ))}
      </ul>
    </div>
  );
};

// Gebruik dit component zo:
// <InfiniteMovingImageCards images={[{ src: '/images/logo1.png', alt: 'Logo 1' }, { src: '/images/logo2.png', alt: 'Logo 2' }]} direction="right" speed="slow" />
