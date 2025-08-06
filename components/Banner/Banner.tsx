"use client";

import { useEffect, useState } from "react";

const texts = [
  {
    text: "Keuze uit ruim 70.000+ Alpha Deals!",
  },
  {
    text: "Meer dan 50.000 klanten gingen u voor",
  },
  {
    text: "Betaalbaar rijplezier bij Alpha Lease",
  },
  {
    text: "Snel op weg, rijden binnen een week",
  },
  {
    text: "Vrijgesteld van BTW & fiscale voordelen",
  },
  {
    text: "Elektrisch rijden? Ontdek BeterLease.nl",
  },
  {
    text: "Geen papierwerk, alles digitaal geregeld",
  },
  {
    text: "Geen eigen inleg nodig bij BeterLease.nl",
  },
  {
    text: "Geen jaarcijfers nodig, ook voor starters",
  },
  {
    text: "Leasen met BKR-registratie",
  },
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out mt-2 h-5 md:h-10 relative text-white bg-transparent overflow-hidden justify-center items-center">
      <div className="absolute custom-shadow-small inset-0 flex flex-col justify-center items-center ">
        {texts.map((item, index) => (
          <div
            key={index}
            className={`text-[16px] md:text-lg lg:text-xl xl:text-2xl hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out absolute w-full flex justify-center items-center font-normal tracking-wider`}
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
      </div>
    </div>
  );
}

export default Banner;
