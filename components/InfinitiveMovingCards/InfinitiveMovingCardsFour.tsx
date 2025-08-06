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
    frontImage: "/images/aklassefront.jpg",
    backImage: "/images/aklasseinside.jpg",
    title: "Mercedes-Benz A-Klasse",
  },
  {
    frontImage: "/images/bmwfront.jpg",
    backImage: "/images/bmwinside.jpg",
    title: "BMW 8-serie",
  },
  {
    frontImage: "/images/rs6front.jpg",
    backImage: "/images/rs6inside.jpg",
    title: "Audi RS6",
  },
  {
    frontImage: "/images/rangefront.jpg",
    backImage: "/images/rangeinside.jpg",
    title: "Range Rover Sport",
  },
  {
    frontImage: "/images/gklassefront.jpg",
    backImage: "/images/gklasseinside.jpg",
    title: "Mercedes-Benz G-Klasse",
  },
];
