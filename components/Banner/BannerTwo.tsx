"use client";

import { useEffect, useState } from "react";

const texts = [
  {
    text: "Ontvang een offerte op maat binnen 24 uur",
    bgColor: "#c2b293", // Licht lila achtergrond
    textColor: "#FFFFFF", // Witte tekst
  },
  {
    text: "Meer dan 17 jaar gecombineerde expertise!",
    bgColor: "#20B2AA", // Zeegroene achtergrond
    textColor: "#FFFFFF", // Zwarte tekst
  },
  {
    text: "Een 5-sterrenwaardering van onze klanten",
    bgColor: "#c2b293", // Lichtgrijze achtergrond
    textColor: "#FFFFFF", // Zwarte tekst
  },
  {
    text: "Neem contact op, wij denken met je mee!",
    bgColor: "#20B2AA", // Lichtgrijze achtergrond
    textColor: "#FFFFFF", // Zwarte tekst
  },
];

function BannerTwo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-8 overflow-hidden mx-auto justify-between items-center transition-colors duration-300"
      style={{
        backgroundColor: texts[currentIndex].bgColor,
        color: texts[currentIndex].textColor,
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center ">
        {texts.map((item, index) => (
          <div
            key={index}
            className={`text-xs hover:font-medium tracking-wide hover:tracking-wider transition-all duration-300 ease-in-out pl-10 pr-10 absolute w-fit p-2  rounded-3xl flex justify-center ml-3 items-center ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              animation: `${
                currentIndex === index
                  ? "fade-in 1s ease-in-out forwards"
                  : "fade-out 1s ease-in-out forwards"
              }`,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerTwo;
