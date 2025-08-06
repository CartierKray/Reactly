"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

export function InfiniteMovingCardsTwoDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleMouseEnter = () => {
        if (container) {
          container.style.setProperty("--animation-play-state", "paused");
        }
      };

      const handleMouseLeave = () => {
        if (container) {
          container.style.setProperty("--animation-play-state", "running");
        }
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
      className="carousel-container"
      ref={containerRef}
      style={
        {
          "--animation-duration": "40s",
          "--animation-direction": "normal",
        } as React.CSSProperties
      }
    >
      <div className="carousel text-white">
        <div className="carousel-track">
          {items.map((item, index) => (
            <Link
              className="bg-stone-800"
              href={`/aanbod`}
              // href={`/aanbod/${index}`}
              key={index}
              passHref
            >
              <div className="carousel-item cursor-pointer">
                <Image
                  width={1000}
                  height={1000}
                  src={item.frontImage}
                  alt="Front"
                  className="front max-w-full object-cover bg-transparent"
                />
                <div className="w-full h-full flex justify-between p-4 bg-stone-800">
                  <div className="w-full text-start">
                    <p className="font-light text-[11px] uppercase">
                      Alpha Lease Group
                    </p>
                    <p className="font-medium">Leasebedrag</p>
                  </div>
                  <div className="text-sm pt-5">€2495</div>
                </div>
                <Image
                  width={1000}
                  height={1000}
                  src={item.backImage}
                  alt="Back"
                  className="back max-w-full object-cover"
                />
              </div>
            </Link>
          ))}

          {items.map((item, index) => (
            <Link
              // href={`/details/${index}`}
              // key={`duplicate-${index}`}
              href={`/aanbod/`}
              key={`duplicate-${index}`}
              passHref
              className="bg-stone-800"
            >
              <div className="carousel-item bg-stone-800 cursor-pointer">
                <Image
                  width={1000}
                  height={1000}
                  src={item.frontImage}
                  alt="Front"
                  className="front max-w-full h-auto object-cover"
                />
                <div className="w-full h-full flex justify-between p-4 bg-stone-800">
                  <div className="w-full text-start">
                    <p className="font-light text-[11px] uppercase">
                      Alpha Lease Group
                    </p>
                    <p className="font-medium">Leaseprijs</p>
                  </div>
                  <div className="text-sm pt-5">€2495</div>
                </div>
                <Image
                  width={1000}
                  height={1000}
                  src={item.backImage}
                  alt="Back"
                  className="back max-w-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
}

const items = [
  {
    frontImage: "/images/aklassefront.jpg",
    backImage: "/images/aklasseinside.jpg",
  },
  {
    frontImage: "/images/bmwfront.jpg",
    backImage: "/images/bmwinside.jpg",
  },
  {
    frontImage: "/images/rs6front.jpg",
    backImage: "/images/rs6inside.jpg",
  },
  {
    frontImage: "/images/rangefront.jpg",
    backImage: "/images/rangeinside.jpg",
  },
  {
    frontImage: "/images/gklassefront.jpg",
    backImage: "/images/gklasseinside.jpg",
  },
];
