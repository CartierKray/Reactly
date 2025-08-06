"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import ModalPortal from "../Modal/ModalPortal";
import Image from "next/image";
import Link from "next/link";

const ROTATION_RANGE = 35;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;
const PERSPECTIVE = "1500px";

const cardItems = [
  {
    image: "/images/audiskrt.jpg",
    title: "Financial Lease",
    id: "financial-lease",
    description: "description",
    hashtags: ["#zakelijk", "#investeringsaftrek", "#btw"],
  },
  {
    image: "/images/5_content_image_17355622861078194351.jpg",
    title: "Operational Lease",
    id: "operational-lease",
    description: "description",
    hashtags: ["#zorgeloos", "#vastekosten", "#inclusief"],
  },
  {
    image: "/images/bellaciao.jpg",
    title: "Short Lease",
    id: "short-lease",
    description: "description",
    hashtags: ["#flexibel", "#geeninleg", "#inclusiefkosten"],
  },
  {
    image: "/images/skrtt.jpg",

    title: "Private Lease",
    id: "private-lease",
    description: "description",
    hashtags: ["#particulier", "#vastbedrag", "#rijdenzondersorgen"],
  },
  {
    image: "/images/6_content_image_17370388411666271577.png",
    title: "Equipment Lease",
    id: "equipment-lease",
    description: "description",
    hashtags: ["#machines", "#zakelijk", "#investeren"],
  },
  {
    image: "/images/skrtttkopen.jpg",
    // image: "/images/6_content_image_1737039412857255401.png",
    title: "Direct Kopen",
    id: "direct-kopen",
    description: "description",
    hashtags: ["#koopdirect", "#eigendom", "#eenmalig"],
  },
];

const leaseOptions = [
  {
    id: "financial-lease",
    title: "Financial Lease",
    subtitle: "Zakelijk investeren",
    description:
      "Financial lease is dé oplossing voor ondernemers die slim willen investeren in een bedrijfsauto zonder hun werkkapitaal aan te spreken. Bij BeterLease.nl geniet je van flexibele leaseopties die zijn afgestemd op jouw zakelijke behoeften.",
    points: [
      "Direct eigenaar van de bedrijfsauto",
      "BTW van de auto direct terugvorderen",
      "Vaste, voorspelbare leasebedragen",
      "Fiscale voordelen, zoals investeringsaftrek",
    ],
    image: "/images/5_other_image_17355647422135117692.jpg",
  },
  {
    id: "operational-lease",
    title: "Operational Lease",
    subtitle: "Zorgeloos rijden",
    description:
      "Operational lease is de ideale keuze voor ondernemers die zorgeloos willen rijden zonder zich druk te maken over onderhoud of afschrijving. Alles wordt voor je geregeld, zodat jij je volledig kunt richten op je bedrijf.",
    points: [
      "Geen zorgen over onderhoud of reparaties",
      "Inclusief verzekering en wegenbelasting",
      "Eén vast maandbedrag voor alle kosten",
      "Geen risico op waardevermindering",
    ],
    image: "/images/5_other_image_17355647422135117692.jpg",
  },
  {
    id: "short-lease",
    title: "Short Lease",
    subtitle: "Zonder Eigen Inleg",
    description:
      "Rijd in een gloednieuwe auto zonder grote investering. Met de short lease van Beterlease.nl geniet je van zorgeloos autorijden voor een vast maandbedrag, inclusief onderhoud, verzekering en wegenbelasting. Jij kiest de auto, wij doen de rest.",
    points: [
      "Vast maandbedrag zonder verrassingen",
      "Inclusief verzekering, onderhoud & pechhulp",
      "Geen aanbetaling nodig",
      "Altijd in een nieuwe of jong gebruikte auto rijden",
      "Flexibele looptijden en kilometrages",
    ],
    image: "/images/5_other_image_17355647422135117692.jpg",
  },
  {
    id: "equipment-lease",
    title: "Equipment Lease",
    subtitle: "Voor je machines en tools",
    description:
      "Equipment lease is ideaal voor ondernemers die motoren, kleine motoren of andere zakelijke apparatuur willen leasen zonder grote investeringen in één keer. Wij bieden flexibele leaseoplossingen die aansluiten op jouw zakelijke behoeften.",
    points: [
      "Industriële motoren en generatoren",
      "Kleine motoren voor machines en voertuigen",
      "Landbouw- en bouwapparatuur",
      "Elektrische gereedschappen en pompen",
    ],
    image: "/images/5_other_image_17355647422135117692.jpg",
  },
];

export const TiltShineCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setSelectedCardId(id);
    setIsModalOpen(true);
  };

  const selectedOption = leaseOptions.find((opt) => opt.id === selectedCardId);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {cardItems.map((card, index) => (
          <TiltShineCard
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            hashtags={card.hashtags}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      <div className="">
        <ModalPortal>
          {isModalOpen && selectedOption && (
            <div className="fixed inset-0 p-5 z-[100] backdrop-blur-sm bg-black/50 flex items-center justify-center">
              <div className="max-h-screen overflow-y-auto rounded-lg w-full max-w-6xl mt-5 mb-5 shadow-2xl relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute md:z-10 bg-black/25 hover:cursor-pointer md:bg-black/5 px-2.5 rounded-full top-2 right-4 text-white md:text-black/50 backdrop-blur-sm text-2xl"
                >
                  &times;
                </button>
                <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
                  <div className="md:w-1/2 ">
                    {/* Image for small screens */}
                    <Image
                      width={1000}
                      height={1000}
                      src="/images/header_images_0_17364333911698061131.png" // <-- vervang met de juiste mobiele afbeelding
                      alt={selectedOption.title}
                      className="block md:hidden w-full h-[200px] object-cover"
                    />

                    {/* Image for medium and larger screens */}
                    <Image
                      width={1000}
                      height={1000}
                      src={selectedOption.image}
                      alt={selectedOption.title}
                      className="hidden md:block md:w-full md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 flex relative flex-col justify-center">
                    <div className="absolute inset-0 bottom-0 z-0 pointer-events-none">
                      <Image
                        src="/svg/bg-accent-two.svg"
                        alt="bg-accent"
                        width={1000}
                        height={1000}
                        className="w-full h-full opacity-10"
                      />
                    </div>
                    <h4 className="text-sm uppercase tracking-wide text-[#c2b293] font-normal mb-2">
                      {selectedOption.subtitle}
                    </h4>
                    <h2 className="text-4xl font-semibold mb-4 text-black">
                      {selectedOption.title}
                    </h2>
                    <p className="mb-4 text-black text-xs sm:text-sm leading-relaxed">
                      {selectedOption.description}
                    </p>
                    <ul className="mb-6 text-black pt-1 text-xs sm:text-sm list-disc list-inside space-y-2">
                      {selectedOption.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                    <Link href={"/leasen"}>
                      <button className="px-6 w-full md:w-[75%] backdrop-blur-md mt-2.5 py-2 rounded-full text-sm bg-[#c2b293] hover:bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white">
                        Meer informatie
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ModalPortal>
      </div>
    </section>
  );
};

interface CardProps {
  image: string;
  title: string;
  description: string;
  hashtags: string[];
  onClick: () => void;
}

const TiltShineCard: React.FC<CardProps> = ({
  image,
  title,
  hashtags,
  description,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 20 });
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const sheenOpacity = useTransform(
    ySpring,
    [-HALF_ROTATION_RANGE, 0, HALF_ROTATION_RANGE],
    [0.5, 0, 0.5]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: PERSPECTIVE }}
      className="w-full max-w-sm mx-auto cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative aspect-[18/13] w-full rounded-xl hover:shadow-black/50 shadow-lg"
      >
        <motion.div
          style={{ opacity: sheenOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-white/20 pointer-events-none"
        />
        <div className="absolute inset-0 hover:bg-black/25 bg-gradient-to-b transition-all duration-500 ease-in-out from-black/20 via-black/30 to-black/40 rounded-xl flex items-end p-2.5 sm:p-4">
          <div className="flex flex-col">
            <div className="absolute top-0 left-0 p-2 flex flex-wrap gap-1">
              {hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className=" text-white hidden md:flex font-medium text-[10px] px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* <p className="text-white mb-1 text-xs hidden md:flex font-light">
              {description}
            </p> */}

            <h3 className="text-white text-md sm:text-xl md:text-2xl tracking-wide font-semibold">
              {title}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TiltShineCards;
