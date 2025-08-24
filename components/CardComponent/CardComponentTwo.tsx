"use client";

import React, { useState } from "react";
import { CardTwo } from "../Cards/CardsTwo";

interface ServiceOption {
  name: string;
  price: number;
}

interface Totals {
  [key: string]: number; // of gebruik een specifiekere type als je de keys kent
}

const serviceOptions = {
  website: [
    { name: "Website Starter", price: 795 },
    { name: "Website Pro", price: 1195 },
    { name: "Website All-in", price: 1749 },
  ],
  marketing: [
    { name: "SEO Boost", price: 395 },
    { name: "Social Ads Pro", price: 695 },
    { name: "Full-Funnel Growth", price: 1295 },
  ],
  ai: [
    { name: "Chatbot Starter", price: 375 },
    { name: "Chatbot Pro", price: 680 },
    { name: "Chatbot Enterprise", price: 1290 },
  ],
  ecommerce: [
    { name: "Shop Starter", price: 395 },
    { name: "Feed & CRO Boost", price: 680 },
    { name: "E-commerce All-in", price: 1290 },
  ],
};

const CardComponentTwo: React.FC = () => {
  // Specificeer de state type als 'Totals'
  const [totals, setTotals] = useState<Totals>({});

  const handleSelectionChange = (cardType: string, total: number) => {
    setTotals((prevTotals) => ({ ...prevTotals, [cardType]: total }));
  };

  // Voeg expliciete type-annotatie toe aan de reduce functie
  const grandTotal = Object.values(totals).reduce<number>(
    (acc, value) => acc + value,
    0
  );

  return (
    <div
      id="aanvragen"
      className="flex flex-col mx-auto justify-center items-center h-full p-2.5 z-10 "
    >
      {/* De kaarten container */}
      <div className="grid grid-cols-2 md:px-10 pt-14 md:py-20 md:grid-cols-2 md:grid-row-2 lg:grid-cols-4 max-w-7xl md:w-full -mt-5 mb-10 md:mb-0">
        {/* Kaarten hier. Let op: Je moet de 'selected' state per service beheren */}
        <CardTwo
          title="WEBSITE"
          services={serviceOptions.website.map((service, index) => ({
            ...service,
            selected: index === 0, // Voorbeeld: het eerste item is geselecteerd
          }))}
          onSelectionChange={(total) => handleSelectionChange("website", total)}
          imageSrc={"/svg/web-inteligence.svg"}
        />
        <CardTwo
          title="MARKETING"
          services={serviceOptions.marketing} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) =>
            handleSelectionChange("marketing", total)
          }
          imageSrc={"/svg/sales-inteligence.svg"}
        />
        <CardTwo
          title="AI CHATBOT"
          services={serviceOptions.ai} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) => handleSelectionChange("ai", total)}
          imageSrc={"/svg/app-inteligence.svg"}
        />
        {/* <CardTwo
          title="STOCK"
          services={serviceOptions.stock} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) => handleSelectionChange("stock", total)}
          imageSrc={"/svg/stock-inteligence.svg"}
        /> */}
        <CardTwo
          title="E-COMMERCE"
          services={serviceOptions.ecommerce} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) =>
            handleSelectionChange("ecommerce", total)
          }
          imageSrc={"/svg/shopper-inteligence.svg"}
        />
        {/* <div className="lg:hidden block ">
          <CardTwo
            title="CUSTOM"
            services={serviceOptions.stock} // Geen 'selected' veld, niets is geselecteerd
            onSelectionChange={(total) =>
              handleSelectionChange("custom", total)
            }
            imageSrc={"/images/vraagteken.webp"}
          />
        </div> */}
        {/* Voeg meer kaarten toe zoals nodig */}
      </div>
    </div>
  );
};

export default CardComponentTwo;
