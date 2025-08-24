"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

export function InfiniteMovingCardsFour() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleMouseEnter = () => {
        container.style.setProperty("--animation-play-state", "paused");
      };
      const handleMouseLeave = () => {
        container.style.setProperty("--animation-play-state", "running");
      };
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center"
      style={
        {
          "--animation-duration": "40s",
          "--animation-direction": "normal",
        } as React.CSSProperties
      }
    >
      <div className="w-full h-[300px] md:h-full overflow-hidden">
        <div
          className="flex w-max h-full animate-scroll motion-safe:animate-[scroll_var(--animation-duration)_linear_infinite_var(--animation-direction)]"
          style={{
            animationPlayState: "var(--animation-play-state, running)",
          }}
        >
          {items.concat(items).map((item, index) => (
            <Link
              href="/aanbod"
              key={index}
              className="w-[425px] md:w-[650px] h-full flex-shrink-0 relative"
            >
              <div className="w-full h-full relative group overflow-hidden">
                <Image
                  src={item.frontImage}
                  alt={`${item.title} voorzijde`}
                  fill
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={item.backImage}
                  alt={`${item.title} interieur`}
                  fill
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const items = [
  {
    frontImage: "/images/front.jpg",
    backImage: "/images/back.jpg",
    title: "Reactly",
  },
  {
    frontImage: "/images/front-1.jpg",
    backImage: "/images/back-1.jpg",
    title: "Reactly",
  },
  {
    frontImage: "/images/front-2.jpg",
    backImage: "/images/back-2.jpg",
    title: "Reactly",
  },
  {
    frontImage: "/images/front-3.jpg",
    backImage: "/images/back-3.jpg",
    title: "Reactly",
  },
];
