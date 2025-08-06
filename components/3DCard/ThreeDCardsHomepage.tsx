"use client";

import React, { useState } from "react";
import ThreeDCard from "./ThreeDCards";
import CardsIntro from "../Intro/CardsIntro";

const cardData = [
  {
    image: "/images/5_other_image_17355647422135117692.jpg",
    title: "Financial Lease",
  },
  {
    image: "/images/5_other_image_17355647422135117692.jpg",
    title: "Operational Lease",
  },
  {
    image: "/images/5_other_image_17355647422135117692.jpg",
    title: "Short Lease",
  },
  {
    image: "/images/5_other_image_17355647422135117692.jpg",
    title: "Private Lease",
  },
  {
    image: "/images/5_other_image_17355647422135117692.jpg",
    title: "Equipment Lease",
  },
  {
    image: "/images/5_other_image_17355647422135117692.jpg",
    title: "Kopen",
  },
];

const ThreeDCardsHomepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    title: "",
    imageSrc: "",
  });

  const handleCardClick = (card: (typeof cardData)[0]) => {
    setSelectedCard({ title: card.title, imageSrc: card.image });
    setIsModalOpen(true);
  };

  return (
    <section className="w-full grid justify-center">
      {/* Mobile Carousel */}
      <div className="block sm:hidden">
        <div className="flex gap-5 overflow-x-auto snap-x scroll-smooth px-1 ">
          {cardData.map((card, index) => (
            <div key={index} className="snap-center shrink-0 w-[85%] mx-auto">
              <ThreeDCard
                imageSrc={card.image}
                title={card.title}
                onClick={() => handleCardClick(card)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop / Tablet Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="transition-transform hover:scale-[1.015] duration-300 ease-in-out"
          >
            <ThreeDCard
              imageSrc={card.image}
              title={card.title}
              onClick={() => handleCardClick(card)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeDCardsHomepage;
