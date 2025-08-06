"use client";

import { Card } from "@/components/Cards/Cards";
import React, { useState, useEffect } from "react";
import { CardTwo } from "../Cards/CardsTwo";

interface ServiceOption {
  name: string;
  price: number;
}

interface Totals {
  [key: string]: number; // of gebruik een specifiekere type als je de keys kent
}

const serviceOptions = {
  sales: [
    { name: "Bespaaradvies", price: 300 },
    { name: "Energielabel", price: 280 },
    { name: "Labels prijs", price: 680 },
  ],
  app: [
    { name: "Bespaaradvies", price: 345 },
    { name: "Energielabel", price: 280 },
    { name: "Labels prijs", price: 680 },
  ],
  web: [
    { name: "Bespaaradvies", price: 375 },
    { name: "Energielabel", price: 280 },
    { name: "Labels prijs", price: 680 },
  ],
  stock: [
    { name: "Bespaaradvies", price: 395 },
    { name: "Energielabel", price: 280 },
    { name: "Labels prijs", price: 680 },
  ],
  shopper: [
    { name: "Bespaaradvies", price: 395 },
    { name: "Energielabel", price: 280 },
    { name: "Labels prijs", price: 680 },
  ],
  custom: [
    { name: "Bespaaradvies", price: 395 },
    { name: "Energielabel", price: 280 },
    { name: "Labels prijs", price: 680 },
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
          title="SALES"
          services={serviceOptions.sales.map((service, index) => ({
            ...service,
            selected: index === 0, // Voorbeeld: het eerste item is geselecteerd
          }))}
          onSelectionChange={(total) => handleSelectionChange("sales", total)}
          imageSrc={"/svg/sales-inteligence.svg"}
        />
        <CardTwo
          title="APP"
          services={serviceOptions.app} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) => handleSelectionChange("app", total)}
          imageSrc={"/svg/app-inteligence.svg"}
        />
        <CardTwo
          title="WEB"
          services={serviceOptions.web} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) => handleSelectionChange("web", total)}
          imageSrc={"/svg/web-inteligence.svg"}
        />
        {/* <CardTwo
          title="STOCK"
          services={serviceOptions.stock} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) => handleSelectionChange("stock", total)}
          imageSrc={"/svg/stock-inteligence.svg"}
        /> */}
        <CardTwo
          title="SHOPPER"
          services={serviceOptions.stock} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) => handleSelectionChange("shopper", total)}
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
