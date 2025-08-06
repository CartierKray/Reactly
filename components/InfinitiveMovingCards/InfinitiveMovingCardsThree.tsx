"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

export function InfiniteMovingCardsThreeDemo() {
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
      className="carousel-container"
      ref={containerRef}
      style={
        {
          "--animation-duration": "40s",
          "--animation-direction": "normal",
        } as React.CSSProperties
      }
    >
      <div className="carousel text-black">
        <div className="carousel-track">
          {items.map((item, index) => (
            <Link className="" href={`/aanbod`} key={index} passHref>
              <div className="carousel-item cursor-pointer">
                <Image
                  width={1000}
                  height={1000}
                  src={item.frontImage}
                  alt="Front"
                  className="front max-w-full object-cover bg-transparent"
                />
                <div className="w-full h-full flex justify-between p-4 bg-transparent relative">
                  <div className="w-full text-start">
                    <p className="font-light custom-shadow-small tracking-widest text-[11px] uppercase">
                      {item.title}
                    </p>
                    <p className="font-medium ">Leasebedrag</p>
                  </div>
                  <div className="relative flex flex-col items-center">
                    <div className="text-3xl tracking-wider font-[435] hover:tracking-wider text-black transition-all ease-out duration-1000">
                      €{item.price}
                    </div>
                    {/* Handgetekende lijn */}
                    <svg
                      className="mt-1 w-[80px] h-[10px]" // Zorgt voor goede positie
                      viewBox="0 0 100 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 8 C25 2, 100 0, 100 4"
                        stroke="#c2b293"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
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
              href={`/aanbod/`}
              key={`duplicate-${index}`}
              passHref
              className="bg-transparent"
            >
              <div className="carousel-item bg-transaprent cursor-pointer">
                <Image
                  width={1000}
                  height={1000}
                  src={item.frontImage}
                  alt="Front"
                  className="front max-w-full h-auto object-cover"
                />
                <div className="w-full h-full flex justify-between p-4 bg-transparent relative">
                  <div className="w-full text-start">
                    <p className="font-light custom-shadow-small tracking-wider text-[11px] uppercase">
                      {item.title}
                    </p>
                    <p className="font-medium">Leasebedrag</p>
                  </div>
                  <div className="relative flex flex-col items-center">
                    <div className="text-3xl custom-sahdow-small tracking-wider hover:tracking-widest transition-all ease-out duration-1000">
                      €{item.price}
                    </div>
                    {/* Handgetekende lijn */}
                    <svg
                      className="mt-1 w-[80px] h-[10px]" // Zorgt voor goede positie
                      viewBox="0 0 100 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 8 C25 2, 100 0, 100 4"
                        stroke="#c2b293"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
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
    price: 525, // A-Klasse leaseprijs
    title: "Mercedes-Benz A-Klasse",
  },
  {
    frontImage: "/images/bmwfront.jpg",
    backImage: "/images/bmwinside.jpg",
    price: 775, // BMW leaseprijs
    title: "BMW 8-serie",
  },
  {
    frontImage: "/images/rs6front.jpg",
    backImage: "/images/rs6inside.jpg",
    price: 1249, // Audi RS6 leaseprijs
    title: "Audi RS6",
  },
  {
    frontImage: "/images/rangefront.jpg",
    backImage: "/images/rangeinside.jpg",
    price: 1099, // Range Rover leaseprijs
    title: "Range Rover Sport", // Title toegevoegd om de titel van de auto te tonen
  },
  {
    frontImage: "/images/gklassefront.jpg",
    backImage: "/images/gklasseinside.jpg",
    price: 2149, // G-Klasse leaseprijs
    title: "Mercedes-Benz G-Klasse",
  },
];
