"use client";

import { useEffect, useState } from "react";

const texts = [
  {
    text: "Meer dan 50.000 klanten gingen u voor",
  },
  {
    text: "Specialisatie in SEO & SEA",
  },
  {
    text: "Creatieve Webdesigns",
  },
  {
    text: "Google Ads Gecertificeerde Specialisten",
  },
  {
    text: "Groei & Inzicht in Omzetprestaties",
  },
  {
    text: "Doelgerichte Marketingstrategieën",
  },
  {
    text: "17+ Jaar Aan Gecombineerde Expertise",
  },
  {
    text: "5-Sterren Klanttevredenheidsscore",
  },
];

function BannerFour() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-5 md:h-12 text-black bg-[#1cff14] overflow-hidden mx-auto justify-between items-center z-30">
      <button className="absolute inset-0 flex flex-col justify-center text-center items-center ">
        {texts.map((item, index) => (
          <div
            key={index}
            className={`text-lg md:text-[20px] lg:text-[25px] hover:font-semibold tracking-wider transition-all duration-300 ease-in-out pl-10 pr-10 absolute w-fit p-2 pt-5 rounded-3xl flex justify-center ml-3 items-center`}
            style={{
              animation: `${
                currentIndex === index
                  ? index === 0
                    ? "fade-in-initial 0.5s ease-in-out forwards, fade-in 0.5s ease-in-out forwards"
                    : "fade-in 1s ease-in-out forwards"
                  : "fade-out 1s ease-in-out forwards"
              }`,
            }}
          >
            {item.text}
          </div>
        ))}
      </button>
    </div>
  );
}

export default BannerFour;
