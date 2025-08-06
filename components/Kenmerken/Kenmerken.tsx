"use client";

import React from "react";

const kenmerken = [
  { label: "Referentie", value: "52364778" },
  { label: "Merk", value: "Audi" },
  { label: "Model", value: "RSQ8" },
  { label: "Bouwjaar", value: "2020" },
  {
    label: "Type",
    value: "4.0 TFSI RS Q8 quattro | Panodak | Head-Up | B&O | VERKOCHT",
  },
  { label: "Bijtelling", value: "22%" },
  { label: "Gemiddeld verbruik", value: "12.1 / 100KM" },
  { label: "Kilometerstand", value: "32.964 KM" },
  { label: "Wegenbelasting min", value: "€ 450 / kwartaal" },
  { label: "Aantal zitplaatsen", value: "5" },
  { label: "Aantal deuren", value: "5" },
  { label: "Transmissie", value: "Automaat" },
  { label: "Aantal versnellingen", value: "8" },
  { label: "Brandstof", value: "Hybride" },
  { label: "Prijs", value: "€ 134.995,-" },
  { label: "Kleur", value: "zwart" },
  { label: "BTW/Marge", value: "Marge" },
  { label: "Aantal cilinders", value: "8" },
  { label: "Cilinderinhoud", value: "3996 cm³" },
  { label: "Vermogen", value: "600 PK" },
  { label: "Topsnelheid", value: "250 km/h" },
  { label: "Koppel", value: "800 nm" },
  { label: "Acceleratie 0 - 100", value: "3.8 sec" },
  { label: "Gewicht", value: "2290 kg" },
  { label: "Carrosserie", value: "SUV" },
];

function Kenmerken() {
  return (
    <div className="grid md:grid-cols-3 py-10 sm:grid-cols-2 grid-cols-1 gap-y-7 gap-x-12 text-sm text-black dark:text-white">
      {kenmerken.map((item, index) => (
        <div
          key={index}
          className="flex justify-between border-b border-white/10 pb-1"
        >
          <span>{item.label}</span>
          <span className="font-medium text-right">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default Kenmerken;
