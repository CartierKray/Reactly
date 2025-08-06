"use client";

import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

// Define the type for image items
type ImageItem = {
  src: string;
  alt: string;
  caption: string;
  hashtagOne: string;
  hashtagTwo: string;
  hashtagThree: string;
  hashtagFour: string;
  description: string;
  link: string;
};

// Define the array of images
const images: ImageItem[] = [
  {
    src: "/images/stangelFour.webp",
    alt: "Description of image 1",
    caption: "SEO & SEA",
    hashtagOne: "#SEO & SEA",
    hashtagTwo: "#Webdesign",
    hashtagThree: "#Marketing",
    hashtagFour: "#Advertenties",
    description:
      "Van verborgen landgoed naar fascinerend dierenpark. Bekend om zijn natuurlijke en ruime verblijven voor opgevangen dieren. Dat waren de doelstellingen van Dierenpark Hoenderdaell",
    link: "diensten",
  },
  {
    src: "/images/stangelTwo.webp",
    alt: "Description of image 2",
    caption: "Webdesign",
    hashtagOne: "#SEO & SEA",
    hashtagTwo: "#Webdesign",
    hashtagThree: "#Marketing",
    hashtagFour: "#Advertenties",
    description:
      "Van verborgen landgoed naar fascinerend dierenpark. Bekend om zijn natuurlijke en ruime verblijven voor opgevangen dieren. Dat waren de doelstellingen van Dierenpark Hoenderdaell",
    link: "diensten",
  },
  {
    src: "/images/stangelThree.webp",
    alt: "Description of image 3",
    caption: "Marketing",
    hashtagOne: "#SEO & SEA",
    hashtagTwo: "#Webdesign",
    hashtagThree: "#Marketing",
    hashtagFour: "#Advertenties",
    description:
      "Van verborgen landgoed naar fascinerend dierenpark. Bekend om zijn natuurlijke en ruime verblijven voor opgevangen dieren. Dat waren de doelstellingen van Dierenpark Hoenderdaell",
    link: "diensten",
  },
  {
    src: "/images/stangelFive.webp",
    alt: "Description of image 1",
    caption: "Advertenties",
    hashtagOne: "#SEO & SEA",
    hashtagTwo: "#Webdesign",
    hashtagThree: "#Marketing",
    hashtagFour: "#Advertenties",
    description:
      "Van verborgen landgoed naar fascinerend dierenpark. Bekend om zijn natuurlijke en ruime verblijven voor opgevangen dieren. Dat waren de doelstellingen van Dierenpark Hoenderdaell",
    link: "diensten",
  },
  {
    src: "/images/stangelSix.webp",
    alt: "Description of image 3",
    caption: "Onderhoud",
    hashtagOne: "#SEO & SEA",
    hashtagTwo: "#Webdesign",
    hashtagThree: "#Marketing",
    hashtagFour: "#Advertenties",
    description:
      "Van verborgen landgoed naar fascinerend dierenpark. Bekend om zijn natuurlijke en ruime verblijven voor opgevangen dieren. Dat waren de doelstellingen van Dierenpark Hoenderdaell",
    link: "diensten",
  },
];

const scrollCursor = `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='inner-shadow'%3E%3CfeComponentTransfer in='SourceAlpha'%3E%3CfeFuncA type='table' tableValues='1 0'/%3E%3C/feComponentTransfer%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeOffset dx='2' dy='2' result='offsetblur'/%3E%3CfeFlood flood-color='rgba(243, 189, 62, 1)'/%3E%3CfeComposite in2='offsetblur' operator='in'/%3E%3CfeComposite in2='SourceAlpha' operator='in'/%3E%3CfeMerge%3E%3CfeMergeNode/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='30' fill='%23F3BD3E' stroke='none' filter='url(%23inner-shadow)'/%3E%3Ctext x='50%25' y='40%25' text-anchor='middle' fill='black' dy='.3em' font-size='12' font-family='Arial, sans-serif'%3ESwipe%3C/text%3E%3Cpath d='M18 42 L24 38 L24 46 Z M24 42 L40 42 M46 42 L40 38 L40 46 Z' stroke='black' stroke-width='2' fill='none'/%3E%3C/svg%3E") 32 32, auto`;

const ScrollingCarouselThree = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);

  const inertia = 2.5; // Adjust the inertia to make the dragging feel faster or slower

  const onDragStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (carouselRef.current) {
      setIsDragging(true);
      setStartX(event.clientX);
      setScrollStartX(carouselRef.current.scrollLeft);
      event.preventDefault(); // Prevents text selection during drag
    }
  };

  const onDragMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging && carouselRef.current) {
      const touchDelta = (event.clientX - startX) * inertia;
      carouselRef.current.scrollLeft = scrollStartX - touchDelta;
    }
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const startOffset = 0;
      carousel.scrollLeft = startOffset;
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#e3e0d8] to-white">
      <div className="w-full h-min absolute">
        <div className="absolute inset-0 bg-[#e8e8e8]"></div>
      </div>
      <div className="flex pt-0 flex-col w-full overflow-hidden pl-5 md:pl-32 lg:pl-40 xl:pl-80 mb-20 lg:mb-20">
        <div
          ref={carouselRef}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseLeave={onDragEnd}
          onMouseUp={onDragEnd}
          onMouseOut={onDragEnd}
          style={{ cursor: scrollCursor }} // Pas de custom cursor style hier toe
          className="cursor-grab  flex overflow-x-auto scroll-smooth snap-x gap-5 pt-20"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`flex-none snap-start relative overflow-hidden group ${
                index === images.length - 1 ? "mr-5" : ""
              }`}
            >
              <Link href={image.link} style={{ cursor: scrollCursor }}>
                <div className="relative w-[350px] h-[556px] md:w-[526px] md:h-[756px] hover:scale-110 transition-all duration-1000 ease-in-out">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black via-transparent opacity-75 transition-opacity duration-1000 ease-in-out"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black via-transparent opacity-0 group-hover:opacity-75 transition-opacity duration-1000 ease-in-out"></div>
                </div>
                <div className="absolute md:bottom-2.5 space-y-2.5 md:left-2.5 bg-opacity-80 md:p-4 bottom-2 left-2 p-2">
                  <div>
                    <Image
                      src={"/svg/logo.svg"}
                      alt=""
                      width={1000}
                      height={1000}
                      className="object-cover w-12"
                    />
                  </div>
                  <div className="text-white uppercase pt-2 tracking-wide font-bold text-3xl md:text-4xl custom-shadow">
                    {image.caption}
                  </div>
                  <div className="custom-shadow text-white font-extralight text-[13px] md:text-[15px]">
                    {image.description}
                  </div>
                </div>
                <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out text-[12px] font-light gap-2 -mt-1 flex-wrap bg-opacity-80 p-5 pointer-events-none group-hover:pointer-events-auto">
                  <div className="flex">
                    <div className="rounded-lg uppercase custom-shadow text-white">
                      {image.hashtagOne}
                    </div>
                    <div className="rounded-lg uppercase md:pl-2 custom-shadow text-white">
                      {image.hashtagTwo}
                    </div>
                    <div className="rounded-lg uppercase md:pl-2 custom-shadow text-white">
                      {image.hashtagThree}
                    </div>
                    <div className="rounded-lg uppercase md:pl-2 custom-shadow text-white">
                      {image.hashtagFour}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingCarouselThree;
