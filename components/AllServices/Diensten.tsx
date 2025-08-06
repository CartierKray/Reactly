"use client";

import { useState } from "react";
import { BiAnalyse, BiSupport } from "react-icons/bi";
import { FaSquarespace } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { MdImportantDevices } from "react-icons/md";
import {
  SiGooglemarketingplatform,
  SiGoogleads,
  SiGoogleanalytics,
} from "react-icons/si";
import { GenericModal } from "../Modal/GenericModal";
import { ServiceCard } from "./ServiceCard";

const services = [
  {
    key: "marketing",
    icon: <SiGooglemarketingplatform size={25} />,
    title: "Marketingstrategie",
    description:
      "Ontdek hoe wij bedrijven laten groeien met sterke marketingstrategieën.",
  },
  {
    key: "googleAds",
    icon: <SiGoogleads size={25} />,
    title: "Google Ads Campagnes",
    description:
      "Hulp nodig met een sterke Google Ads campagne? Wij staan klaar.",
  },
  {
    key: "seo",
    icon: <FaSquarespace size={25} />,
    title: "SEO & SEA Optimalisatie",
    description: "Krijg hogere posities in Google door slimme optimalisatie.",
  },
  {
    key: "website",
    icon: <MdImportantDevices size={25} />,
    title: "Responsive Websites",
    description:
      "Mobielvriendelijke, converterende websites met een strak design.",
  },
  {
    key: "conversie",
    icon: <BiAnalyse size={25} />,
    title: "Conversie Analyse",
    description:
      "Veel bezoekers maar weinig conversie? Wij zoeken het voor je uit.",
  },
  {
    key: "analytics",
    icon: <SiGoogleanalytics size={25} />,
    title: "Social Ads Analytics",
    description: "Krijg inzicht in je social media prestaties en verbeter ze.",
  },
  {
    key: "onderhoud",
    icon: <GrServices size={25} />,
    title: "All-In-One Onderhoud",
    description: "Laat jouw website door ons onderhouden zonder zorgen.",
  },
  {
    key: "klantenservice",
    icon: <BiSupport size={25} />,
    title: "Klantenservice 24/7",
    description: "Altijd beschikbaar voor vragen of ondersteuning.",
  },
];

const DienstenKeuze = () => {
  const [modals, setModals] = useState(
    Object.fromEntries(services.map((s) => [s.key, false]))
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (key: string) =>
    setModals((prev) => ({ ...prev, [key]: true }));
  const closeModal = (key: string) =>
    setModals((prev) => ({ ...prev, [key]: false }));

  return (
    <div className="p-5 max-w-7xl  mx-auto">
      {/* 👇 Grid layout for md and up */}
      <div className="hidden md:flex flex-wrap justify-center gap-8">
        {services.map((s) => (
          <ServiceCard
            key={s.key}
            icon={s.icon}
            title={s.title}
            description={s.description}
            onClick={() => openModal(s.key)}
          />
        ))}
      </div>

      {/* 👇 Carousel layout for < md */}

      {/* Modals */}
      {services.map((s) => (
        <GenericModal
          key={s.key}
          isOpen={modals[s.key]}
          setIsOpen={() => closeModal(s.key)}
          title={s.title}
        >
          Onze aanpak van social media advertenties begint met een grondige
          analyse...
        </GenericModal>
      ))}

      <div className="md:hidden justify-center">
        <ServiceCard
          icon={services[currentIndex].icon}
          title={services[currentIndex].title}
          description={services[currentIndex].description}
          onClick={() => openModal(services[currentIndex].key)}
        />
      </div>

      <div className="md:hidden pt-14">
        <div className="flex justify-center mb-4 gap-4">
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? services.length - 1 : prev - 1
              )
            }
            className="text-sm bg-black text-white px-3 py-1 rounded"
          >
            Vorige
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === services.length - 1 ? 0 : prev + 1
              )
            }
            className="text-sm bg-black text-white px-3 py-1 rounded"
          >
            Volgende
          </button>
        </div>
      </div>
    </div>
  );
};

export default DienstenKeuze;
