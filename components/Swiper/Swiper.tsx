"use client";

import React, { useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

const CARDS = 9;
const MAX_VISIBILITY = 3;

interface CardContainerStyles {
  "--active": number;
  "--offset": number;
  "--direction": number;
  "--abs-offset": number;
  opacity: "0" | "1";
  display: "none" | "block";
}

interface CardContent {
  title: string;
  badge: string;
  content: string;
  price: string;
  liOne: string;
  liTwo: string;
  liThree: string;
  liFour: string;
  liFive: string;
}

const cardContents: CardContent[] = [
  {
    title: "Social Ads Analyse",
    badge: "Analyse",
    content:
      "Diepe analyse van sociale advertentie prestaties voor verbeterde resultaten",
    price: "€1149",
    liOne: "Diepe analyse",
    liTwo: "Sociale advertenties",
    liThree: "Verbeterde resultaten",
    liFour: "Prestaties optimaliseren",
    liFive: "Zichtbaarheid online",
  },
  {
    title: "Conversie Analyse",
    badge: "Analyse",
    content:
      "Grondige analyse om conversies te verhogen en resultaten te optimaliseren",
    price: "€1249",
    liOne: "Grondige analyse",
    liTwo: "Conversies verhogen",
    liThree: "Resultaten optimaliseren",
    liFour: "Prestaties verbeteren",
    liFive: "Effectieve strategie",
  },
  {
    title: "Google Ads",
    badge: "Advertentie",
    content:
      "Effectieve advertentiestrategie voor optimale zichtbaarheid online",
    price: "€1299",
    liOne: "Effectieve strategie",
    liTwo: "Optimale zichtbaarheid",
    liThree: "Advertentiestrategie",
    liFour: "Online zichtbaarheid",
    liFive: "SEO & SEA Proof",
  },
  {
    title: "SEO & SEA",
    badge: "Optimalisatie",
    content:
      "Geavanceerde optimalisatie voor betere vindbaarheid en advertentieprestaties",
    price: "€1399",
    liOne: "Geavanceerde optimalisatie",
    liTwo: "Vindbaarheid verbeteren",
    liThree: "Advertentieprestaties",
    liFour: "Digitale aanwezigheid",
    liFive: "SEO & SEA Proof",
  },
  {
    title: "Marketingstrategie",
    badge: "Marketing",
    content:
      "Strategische benaderingen voor een succesvolle digitale marketingcampagne",
    price: "€1449",
    liOne: "Strategische benaderingen",
    liTwo: "Succesvolle campagne",
    liThree: "Digitale marketing",
    liFour: "SEO & SEA Proof",
    liFive: "Lifetime Thema licentie",
  },
  {
    title: "Essential Website",
    badge: "Webdesign",
    content: "Krachtige basis voor impactvolle digitale aanwezigheid",
    price: "€1699",
    liOne: "Krachtige basis",
    liTwo: "Impactvolle aanwezigheid",
    liThree: "Digitale aanwezigheid",
    liFour: "SSL Beveiliging",
    liFive: "Responsive webdesign",
  },
  {
    title: "Premium Website",
    badge: "Webdesign",
    content:
      "Geavanceerde functies en ontwerp voor een premium digitale ervaring",
    price: "€2699",
    liOne: "Geavanceerde functies",
    liTwo: "Premium maatwerk",
    liThree: "Unieke digitale ervaring",
    liFour: "SSL Beveiliging",
    liFive: "Lifetime Thema licentie",
  },
  {
    title: "Advanced Website",
    badge: "Webdesign",
    content:
      "Maatwerkoplossingen voor een unieke en geavanceerde online aanwezigheid",
    price: "Custom",
    liOne: "Maatwerkoplossingen",
    liTwo: "Lifetime thema licentie",
    liThree: "Geavanceerde aanwezigheid",
    liFour: "Geadvanceerde modern design",
    liFive: "Responsive webdesign",
  },
  {
    title: "All-In Onderhoud",
    badge: "Service",
    content:
      "Uitgebreid onderhoudspakket om de prestaties en veiligheid te optimaliseren",
    price: "Custom",
    liOne: "Optimaliseren veiligheid",
    liTwo: "Optimaliseren prestaties",
    liThree: "All-In Onderhoudspakket",
    liFour: "SEO & SEA Proof",
    liFive: "24/7 Support",
  },
];

const CardSwiper: React.FC = () => {
  const [active, setActive] = useState(5);

  return (
    <div className="app justify-center mb-[450px] mt-[100px] flex">
      <style jsx global>{`
        :root {
          --color-purple: #8b5cf6;
          --color-pink: #ec4899;
          --color-gray: #9ca3af;
          --color-black: #1f2937;
          --card-size: 23rem;
        }

        .carousel {
          position: relative;
          width: var(--card-size);
          height: var(--card-size);
          perspective: 500px;
          transform-style: preserve-3d;
        }

        .card-container {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: rotateY(calc(var(--offset) * 50deg))
            scaleY(calc(1 + var(--abs-offset) * -0.4))
            translateZ(calc(var(--abs-offset) * -30rem))
            translateX(calc(var(--direction) * -5rem));
          filter: blur(calc(var(--abs-offset) * 0.3rem));
          transition: all 0.3s ease-out;
        }

        .card {
          width: 100%;
          height: 100%;
          background-color: hsl(
            210deg,
            90%,
            calc(100% - var(--abs-offset) * 50%)
          );
          border-radius: 30px;
          text-align: justify;
          transition: all 0.3s ease-out;
        }

        .card h2 {
          text-align: center;
          font-size: 1.5rem;
          margin: 0 0 0.7em;
          color: black;
        }

        .card p,
        .card h2 {
          transition: all 0.3s ease-out;
          opacity: var(--active);
        }

        .nav {
          color: white;
          font-size: 5rem;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 50%;
          z-index: 2;
          cursor: pointer;
          user-select: none;
          background: unset;
          border: unset;
        }

        .nav.left {
          color: black;
          transform: translateX(-100%) translateY(100%);
        }

        .nav.right {
          color: black;
          right: 0;
          transform: translateX(100%) translateY(100%);
        }
      `}</style>

      <div className="carousel">
        {active > 0 && (
          <button
            className="nav left dark:invert"
            onClick={() => setActive((i) => i - 1)}
          >
            <TiChevronLeftOutline />
          </button>
        )}
        {cardContents.map((card, i) => (
          <div
            className="card-container"
            style={
              {
                "--active": i === active ? 1 : 0,
                "--offset": (active - i) / 3,
                "--direction": Math.sign(active - i),
                "--abs-offset": Math.abs(active - i) / 3,

                opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
                display:
                  Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
              } as CardContainerStyles
            }
            key={i}
          >
            <div className="card rounded-3xl shadow-lg dark:bg-neutral-900 dark:shadow-inner dark:shadow-neutral-800">
              <div className="grid bg-white outline shadow-md outline-1 rounded-3xl outline-gray-200 p-10 dark:bg-neutral-900 dark:outline-0 dark:shadow-inner dark:shadow-neutral-800 ">
                <div className="flex xl:mt-1 w-full text-[18px] justify-between">
                  <p className="font-semibold -mt-[1.5px] tracking-wide">
                    {cardContents[i].title}
                  </p>
                  <Badge className="h-fit bg-zinc-800 hover:bg-emerald-500 text-white">
                    {cardContents[i].badge}
                  </Badge>
                </div>
                <p className="text-[14px] md:text-center xl:text-start mt-8 font-light text-gray-400 dark:text-gray-300 mb-8">
                  {cardContents[i].content}
                </p>
                <div className="flex mt-4 md:justify-center xl:justify-start mb-8">
                  <p className="mb-5 text-4xl font-bold tracking-wider">
                    {cardContents[i].price}
                  </p>
                  <p className="text-sm mt-[5.5%] text-gray-400 ml-2">
                    / excl. BTW
                  </p>
                </div>
                <Link className="w-full" href="">
                  <button className="px-14 py-2 rounded-md w-full mb-8 dark:shadow-inner dark:shadow-neutral-200 dark:text-black dark:bg-white bg-black text-white whitespace-nowrap">
                    Meer informatie
                  </button>
                </Link>
                <ul className="md:grid  grid-cols-1">
                  <li className="flex items-center text-gray-600 dark:text-gray-300 font-light rounded-full text-[15px] p-3 transition-transform transform hover:scale-105 hover:font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {cardContents[i].liOne}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300 font-light rounded-full text-[15px] p-3 transition-transform transform hover:scale-105 hover:font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {cardContents[i].liTwo}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300 font-light rounded-full text-[15px] p-3 transition-transform transform hover:scale-105 hover:font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {cardContents[i].liThree}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300 font-light rounded-full text-[15px] p-3 transition-transform transform hover:scale-105 hover:font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {cardContents[i].liFour}
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300 font-light rounded-full text-[15px] p-3 transition-transform transform hover:scale-105 hover:font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {cardContents[i].liFive}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
        {active < CARDS - 1 && (
          <button
            className="nav right dark:invert"
            onClick={() => setActive((i) => i + 1)}
          >
            <TiChevronRightOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default CardSwiper;
