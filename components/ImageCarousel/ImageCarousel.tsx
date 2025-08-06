// components/ImageCarousel.tsx
"use client";

import Slider from "react-slick";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import { useRef, useEffect } from "react";
import "slick-carousel/slick/slick-theme.css";

const Image = dynamic(() => import("next/image"), { ssr: false });

const images = [
  { src: "/svg/spotify-light.svg", className: "spotify-image dark:invert" },
  { src: "/svg/amazon-light.svg", className: `text-white ` },
  { src: "/svg/nasa-light.svg", className: "nasa-image dark:invert" },
  { src: "/svg/netflix-light.svg", className: "netflix-image dark:invert" },
  { src: "/svg/unity-light.svg", className: "unity-image" },
  {
    src: "/svg/shutterstock-light.svg",
    className: "shutterstock-image dark:invert",
  },
  { src: "/svg/godaddy-light.svg", className: "godaddy-image" },
  { src: "/svg/samsung-light.svg", className: "samsung-image dark:invert" },
  { src: "/svg/google-light.svg", className: "google-image dark:invert" },

  // Add more image paths as needed
];

const ImageCarousel = () => {
  const containerRef = useRef<Slider>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.slickNext();
      }
    }, 9000);

    // Cleanup logic
    return () => clearInterval(intervalId);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    variableWidth: true, // Set variableWidth to true
    centerMode: true,
    centerPadding: "0",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className="bg-[#171719] relative xl:pb-52 hidden md:flex pb-32">
      <div className="carousel-container flex justify-center relative z-0 overflow-hidden">
        {/* Left Mist Effect */}
        <div
          className="absolute inset-y-0 left-0 w-[10%] md:w-1/3 bg-gradient-to-r
         from-[#171719] via-[#171719] to-transparent z-10"
        ></div>

        <Slider ref={containerRef} {...settings} className=" md:w-[100%]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`flex justify-center items-center text-center ${
                image.className || ""
              }`}
            >
              <Image
                src={image.src}
                alt={`Image ${index + 1}`}
                height={25}
                width={100}
                className="h-10 w-auto ml-28 dark:invert object-cover"
              />
            </div>
          ))}
        </Slider>
        {/* Right Mist Effect */}
        <div
          className="absolute inset-y-0 right-0 w-[10%] md:w-1/3 bg-gradient-to-l
         from-[#171719] via-[#171719]  to-transparent z-10"
        ></div>
      </div>
    </div>
  );
};

export default ImageCarousel;
