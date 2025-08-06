"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { Container } from "../ui/container";
import Image from "next/image";

interface Review {
  title: string;
  body: string;
  author: string;
  image: string; // ✅ voeg deze toe
}

const reviews: Array<Review> = [
  {
    title: "@pixelpower",
    body: "Reactly bouwde voor ons een SEO-vriendelijke website die écht het verschil maakt. Binnen een maand verdubbelde onze organische traffic.",
    author: "Eva Boonstra",
    image: "/avatars/eva.jpg",
  },
  {
    title: "@growthjunkie",
    body: "De AI-assistent van Reactly is briljant. Ik schrijf nu 3x sneller content voor onze blogs en landingspagina’s. 🚀🚀",
    author: "Tim van Driel",
    image: "/avatars/tim.jpg",
  },
  {
    title: "@boldbranding",
    body: "Reactly verzorgde onze volledige rebranding. Logo, kleurgebruik, typografie – alles klopt. We krijgen zóveel positieve reacties!",
    author: "Lisa van Kampen 🏕️",
    image: "/avatars/lisa.jpg",
  },
  {
    title: "@serpwarrior",
    body: "Na een SEO-audit door Reactly gingen we van pagina 5 naar positie 2 op ons belangrijkste zoekwoord. Ongekend resultaat! 🧠",
    author: "Daniël de Groot",
    image: "/avatars/daniel.jpg",
  },
  {
    title: "@tiktokboss",
    body: "Dankzij de TikTok-strategie van Reactly kregen we binnen 2 weken meer dan 300.000 views. De scripts en edits waren spot on.",
    author: "Saar Mulder",
    image: "/avatars/saar.jpg",
  },
  {
    title: "@uxtomorrow",
    body: "De UX-analyse van Reactly hielp ons bij een complete redesign. Onze conversieratio is met 27% gestegen.",
    author: "Ruben de Leeuw",
    image: "/avatars/ruben.jpg",
  },
  {
    title: "@devsync",
    body: "De componenten library van Reactly is geniaal. Alles is consistent, responsive en strak vormgegeven. 💪",
    author: "Maarten Scholten",
    image: "/avatars/maarten.jpg",
  },
  {
    title: "@funnelmaster",
    body: "SEA-campagnes via Reactly hebben ons binnen een week al conversies opgeleverd. Ze weten wat werkt.",
    author: "Inge Bakker",
    image: "/avatars/inge.jpg",
  },
  {
    title: "@contentqueen",
    body: "De AI-tools van Reactly helpen me headlines schrijven die écht converteren. Mijn e-mail openrates zijn met 18% gestegen.",
    author: "Julia Vermeer 🌟",
    image: "/avatars/mila.jpg",
  },
  {
    title: "@codeandconvert",
    body: "Ik gebruik de componenten library van Reactly voor elk project. Scheelt mij uren werk en alles ziet er professioneel uit.",
    author: "Tom van Dongen",
    image: "/avatars/tom.jpg",
  },
  {
    title: "@brandingbabe99",
    body: "De branding door Reactly voelt als thuiskomen. Ons merk straalt nu uit wie we écht zijn.",
    author: "Nadine Jaspers",
    image: "/avatars/nadine.jpg",
  },
  {
    title: "@seogeek",
    body: "Als SEO-specialist ben ik onder de indruk van hoe technisch sterk de fundamenten van Reactly zijn. Alles klopt gewoon.",
    author: "Sjoerd Rijken",
    image: "/avatars/sjoerd.jpg",
  },
  {
    title: "@launchfast",
    body: "Binnen vijf dagen had Reactly onze site live ⚡️. Alles zat erin: copy, SEO, analytics. Supersnel en strak werk.",
    author: "Yara Visser ",
    image: "/avatars/yara.jpg",
  },
  {
    title: "@aivault",
    body: "Met de AI-copy assistent van Reactly genereren we nu complete productomschrijvingen in bulk. En ze lezen nog goed ook!",
    author: "Willem-Jan Peters 📩",
    image: "/avatars/willemjan.jpg",
  },
  {
    title: "@conversionking",
    body: "Reactly’s dashboards maken A/B-testen super eenvoudig. We draaien nu continu CRO-verbeteringen zonder extra developers nodig te hebben.",
    author: "Bram Meijer",
    image: "/avatars/bram.jpg",
  },
  {
    title: "@designsnack",
    body: "Als designer gebruik ik standaard de Reactly componenten. Ze zijn clean, modulair en ready to go.",
    author: "Selma Makhlouf 🍋",
    image: "/avatars/selma.jpg",
  },
  {
    title: "@smartscale",
    body: "Onze campagnes via Reactly leveren week na week meer leads op. Alles draait nu stabiel en schaalbaar.",
    author: "Oscar van Leeuwen",
    image: "/avatars/oscar.jpg",
  },
  {
    title: "@mobilefocus",
    body: "Reactly denkt écht mobile-first. Alles werkt perfect op mobiel, zonder dat het design eraan lijdt.",
    author: "Joëlle Veenstra 🇳🇱",
    image: "/avatars/joelle.jpg",
  },
  {
    title: "@copyhero",
    body: "We gebruiken de AI-assistent van Reactly voor al onze long-form content. De kwaliteit is verrassend goed 🔥",
    author: "Lars Smit",
    image: "/avatars/lars.jpg",
  },
  {
    title: "@shortandsharp",
    body: "Snelle oplevering. Klaar in één dag. Wauw.",
    author: "Sven Koster",
    image: "/avatars/sven.jpg",
  },
  {
    title: "@adsboss",
    body: "Onze ROAS is verdubbeld. Meer hoef ik niet te zeggen 💹.",
    author: "Nuray Demir ",
    image: "/avatars/nuray.jpg",
  },
  {
    title: "@contentcreep",
    body: "Nooit meer blank staan. De AI-copy geeft me elke dag ideeën.",
    author: "Wouter van Es",
    image: "/avatars/wouter.jpg",
  },
  {
    title: "@minimarketeer",
    body: "Zoveel waarde voor zo'n lage prijs. Bizar gewoon.",
    author: "Tariq Slimani",
    image: "/avatars/tariq.jpg",
  },
  {
    title: "@designrush",
    body: "Alles is strak, responsive en snel. Geen gedoe goed geregeld en mooi design 🎨",
    author: "Lina Petrovic 👩‍💻",
    image: "/avatars/lina.jpg",
  },
  {
    title: "@snelleton",
    body: "TikTok-ad klaar in 24 uur. Viral gegaan. Thanks.",
    author: "Bas Timmers",
    image: "/avatars/bas.jpg",
  },
  {
    title: "@kliksandra",
    body: "Kreeg meteen 3 nieuwe leads na livegang. Nice!",
    author: "Sandra Hofstede",
    image: "/avatars/sandra.jpg",
  },
  {
    title: "@headlinelove",
    body: "De headline-generator is geniaal. Echt een gamechanger. Dank jullie wel! 🧡🧡",
    author: "Zoë de Bruin ",
    image: "/avatars/zoe.jpg",
  },
  {
    title: "@bouwtotaal",
    body: "Ook als aannemer voel ik me begrepen. Simpel en effectief.",
    author: "Michel Rahimi",
    image: "/avatars/michel.jpg",
  },
  {
    title: "@mamacreatief",
    body: "Zat in zwangerschapsverlof en tóch door kunnen bouwen aan mijn webshop",
    author: "Annemieke van Zijl 👶",
    image: "/avatars/annemieke.jpg",
  },

  {
    title: "@adsninja",
    body: "Sinds Reactly onze advertenties beheert is onze CPC gedaald én krijgen we betere leads. Dubbele winst! 💸💸",
    author: "Timo de Jong",
    image: "/avatars/timo.jpg",
  },
  {
    title: "@webflowwhiz",
    body: "De migratie naar ons nieuwe platform verliep vlekkeloos. Binnen 48 uur stonden we live – mét SEO behoud. 🌙",
    author: "Jamila Noor ",
    image: "/avatars/jamila.jpg",
  },
  {
    title: "@seosultan",
    body: "De support is ongekend snel. Geen tickets, gewoon direct contact en resultaat.",
    author: "Carlos Hernandez ",
    image: "/avatars/carlos.jpg",
  },
  {
    title: "@copycrafter",
    body: "Ik kreeg volledige branding en SEA-strategie op maat. Het voelde alsof ze ons bedrijf al jaren kenden.",
    author: "Aisha Bakari",
    image: "/avatars/aisha.jpg",
  },
  {
    title: "@uxunicorn",
    body: "Door hun lokale SEO-aanpak domineren we nu de eerste pagina van Google in onze regio. Onmisbaar. 💼",
    author: "Hugo Tan",
    image: "/avatars/hugo.jpg",
  },
  {
    title: "@founderstory",
    body: "We gebruikten de AI-copytool voor al onze productteksten. Wat normaal 2 weken duurde, was nu in 2 dagen klaar.",
    author: "Fatima El Idrissi 🥑",
    image: "/avatars/fatima.jpg",
  },
  {
    title: "@clickmaster",
    body: "Als fotograaf was ik sceptisch over marketing automation, maar het werkt écht. Meer boekingen, minder gedoe.",
    author: "Niels Bakker",
    image: "/avatars/niels.jpg",
  },
  {
    title: "@thebrandchef",
    body: "De social media kits zijn zó handig ✨ Alles consistent, van story tot TikTok reel.",
    author: "Priya Sharma",
    image: "/avatars/priya.jpg",
  },
  {
    title: "@adsengineer",
    body: "Ik run een webshop en sinds de conversieoptimalisatie is mijn omzet met 35% gestegen. Pure winst.",
    author: "Ahmed Chowdhury",
    image: "/avatars/ahmed.jpg",
  },
  {
    title: "@reactdiva",
    body: "Wat ik waardeer: eerlijk advies. Geen mooie praatjes, maar meetbaar resultaat! 🚀",
    author: "Giulia Romano",
    image: "/avatars/giulia.jpg",
  },
  {
    title: "@datadreamer",
    body: "De componenten zijn pixel-perfect. Ideaal voor ons dev-team dat snel wil schakelen zonder in te leveren op stijl.",
    author: "Kwame Mensah",
    image: "/avatars/kwame.jpg",
  },
];

function StarIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Review({
  title,
  body,
  author,
  image,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"figure">, keyof Review> & Review) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = [
      "0s",
      "0.1s",
      "0.2s",
      "0.3s",
      "0.4s",
      "0.5s",
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  return (
    <figure
      className={clsx(
        "animate-fade-in rounded-3xl dark:bg-[#181818] bg-white border border-gray-200 dark:border-neutral-800 shadow-md p-6 opacity-0",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <div className="flex items-center gap-3">
        <Image
          width={1000}
          height={1000}
          src={image} // ✅ correcte prop
          alt={author}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-black dark:text-white">
              {author}
            </span>
            <svg
              height="2500"
              viewBox="0 0 512 512"
              width="2500"
              className="h-4 w-4 "
            >
              <path
                d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z"
                fill="#1da1f2"
              ></path>
            </svg>
          </div>
          <span className="text-xs pt-1 text-gray-500 dark:text-neutral-400">
            {title}
          </span>
        </div>
      </div>

      <blockquote className="mt-6 text-sm font-normal max-w-xs text-black/80 dark:text-white/80 leading-relaxed">
        {body}
      </blockquote>
    </figure>
  );
}

function splitArray<T>(array: Array<T>, numParts: number) {
  let result: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: Array<Review>;
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  let columnRef = useRef<React.ElementRef<"div">>(null);
  let [columnHeight, setColumnHeight] = useState(0);
  let duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) {
      return;
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={clsx("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  );
}

function ReviewGrid() {
  let containerRef = useRef<React.ElementRef<"div">>(null);
  let isInView = useInView(containerRef, { once: true, amount: 0.4 });
  let columns = splitArray(reviews, 3);
  let column1 = columns[0];
  let column2 = columns[1];
  let column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative grid max-w-7xl mx-auto h-[52rem] max-h-[150vh] items-start gap-8 overflow-hidden grid-cols-1 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= column1.length + column3[0].length &&
                  "md:hidden",
                reviewIndex >= column1.length && "lg:hidden"
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg:hidden" : ""
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white dark:from-[#000]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-[#000]" />
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pb-12 pt-5 p-1 lg:p-5 bg-"
    >
      <Container>
        <p className="mt-2 text-lg text-[rgb(64,99,138)] text-center"></p>
        <ReviewGrid />
      </Container>
    </section>
  );
}
