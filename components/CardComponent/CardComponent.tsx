"use client";

import { Card } from "@/components/Cards/Cards";
import React, { useState, useEffect } from "react";

interface ServiceOption {
  name: string;
  price: number;
}

interface Totals {
  [key: string]: number; // of gebruik een specifiekere type als je de keys kent
}

const serviceOptions = {
  appartement: [
    { name: "Bespaaradvies", price: 300 },
    { name: "Energielabel", price: 280 },
    { name: "Labels prijs", price: 680 },
  ],
  rijtjeshuis: [
    { name: "Bespaaradvies", price: 345 },
    { name: "Energielabel", price: 280 },
    { name: "Labels prijs", price: 680 },
  ],
  tweeondereenkap: [
    { name: "Bespaaradvies", price: 375 },
    { name: "Energielabel", price: 280 },
    { name: "Labels prijs", price: 680 },
  ],
  villa: [
    { name: "Bespaaradvies", price: 395 },
    { name: "Energielabel", price: 280 },
    { name: "Labels prijs", price: 680 },
  ],
};

const CardComponent: React.FC = () => {
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
      className="flex w-full flex-col items-center h-full justify-center z-10"
    >
      {/* De kaarten container */}
      <div className="grid md:grid-cols-2 xl:grid-cols-5 w-full mx-auto max-w-7xl ">
        {/* Kaarten hier. Let op: Je moet de 'selected' state per service beheren */}
        {/* Voorbeeld: */}
        <Card
          title="SALES"
          services={serviceOptions.appartement.map((service, index) => ({
            ...service,
            selected: index === 0, // Voorbeeld: het eerste item is geselecteerd
          }))}
          onSelectionChange={(total) =>
            handleSelectionChange("appartement", total)
          }
          imageSrc={"/svg/sales-inteligence.svg"}
        />
        <Card
          title="APP"
          services={serviceOptions.rijtjeshuis} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) =>
            handleSelectionChange("rijtjeshuis", total)
          }
          imageSrc={"/svg/app-inteligence.svg"}
        />
        <Card
          title="WEB"
          services={serviceOptions.tweeondereenkap} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) =>
            handleSelectionChange("tweeondereenkap", total)
          }
          imageSrc={"/svg/web-inteligence.svg"}
        />
        <Card
          title="STOCK"
          services={serviceOptions.villa} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) => handleSelectionChange("villa", total)}
          imageSrc={"/svg/stock-inteligence.svg"}
        />
        <Card
          title="SHOPPER"
          services={serviceOptions.villa} // Geen 'selected' veld, niets is geselecteerd
          onSelectionChange={(total) => handleSelectionChange("villa", total)}
          imageSrc={"/svg/shopper-inteligence.svg"}
        />
        {/* Voeg meer kaarten toe zoals nodig */}
      </div>
    </div>
  );
};

export default CardComponent;
