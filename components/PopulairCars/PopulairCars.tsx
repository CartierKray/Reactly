"use client";

import React, { useState } from "react";
import Image from "next/image";
import TextBetween from "../TextBetween/TextBetween";
import Link from "next/link";

const PopularCars: React.FC = () => {
  const cars = [
    {
      name: "Audi A6 e-tron",
      price: "Vanaf €539 p/mnd*",
      buttonText: "Ontdek de Audi A6 e-tron",
      text: "Strakke lijnen, razendsnelle acceleratie en toonaangevende technologie",
      image: "/images/Audi-a6-e-tron.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Audi e-tron GT",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Audi e-tron GT",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Audi-e-tron-gt.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Audi Q6 e-tron",
      price: "Van €619, voor €538 p/mnd*",
      buttonText: "Ontdek de Audi Q6 e-tron",
      text: "Een compacte elektrische krachtpatser met verrassend veel ruimte en stijl.",
      image: "/images/Audi-q6-e-tron.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Audi Q8 e-tron",
      price: "Vanaf €539 p/mnd*",
      buttonText: "Ontdek de Audi Q8 e-tron",
      text: "Strakke lijnen, razendsnelle acceleratie en toonaangevende technologie",
      image: "/images/Audi-q8-e-tron.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "BMW i4",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de BMW i4",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/BMW-i4.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "BMW i5",
      price: "Vanaf €539 p/mnd*",
      buttonText: "Ontdek de BMW i5",
      text: "Strakke lijnen, razendsnelle acceleratie en toonaangevende technologie",
      image: "/images/BMW-i5.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "BMW i5 Touring",
      price: "Van €619, voor €538 p/mnd*",
      buttonText: "Ontdek de BMW i5 Touring",
      text: "Een compacte elektrische krachtpatser met verrassend veel ruimte en stijl.",
      image: "/images/BMW-i5-touring.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "BMW iX1",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de BMW iX1",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/BMW-iX1.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "BMW iX3",
      price: "Van €619, voor €538 p/mnd*",
      buttonText: "Ontdek de BMW iX3",
      text: "Een compacte elektrische krachtpatser met verrassend veel ruimte en stijl.",
      image: "/images/BMW-ix3.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "BYD-Atto-3",
      price: "Vanaf €539 p/mnd*",
      buttonText: "Ontdek de BYD Atto 3",
      text: "Strakke lijnen, razendsnelle acceleratie en toonaangevende technologie",
      image: "/images/BYD-atto-3.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Citroën e-C3",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Citroën e-C3",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Citroen-e-c3.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Citroën e-C4",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Citroën e-C4",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/citroen-3-c4.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "CUPRA Born",
      price: "Van €619, voor €538 p/mnd*",
      buttonText: "Ontdek de CUPRA Born",
      text: "Een compacte elektrische krachtpatser met verrassend veel ruimte en stijl.",
      image: "/images/Cupra-born.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "CUPRA Tavascan",
      price: "Vanaf €539 p/mnd*",
      buttonText: "Ontdek de CUPRA Tavascan",
      text: "Strakke lijnen, razendsnelle acceleratie en toonaangevende technologie",
      image: "/images/Cupra-tavascan.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Fiat Ducato",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Fiat Ducato",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/fiat-ducato.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Ford e-transit",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Ford e-transit",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Ford-E-transit.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Ford Explorer EV",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Ford Explorer EV",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Ford-explorer-ev.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Ford Transit Connect",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Ford Transit Connect",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/ford-transit-connect.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Ford Transit Custom",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Ford Transit Custom",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/ford-transit-custom.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Hyundai IONIQ 5",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Hyundai IONIQ 5",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Hyundai-ioniq-5.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Hyundai IONIQ 6",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Hyundai IONIQ 6",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Hyundai-ionic-6.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Hyundai Konda Electric",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Hyundai Konda Electric",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Hyundai-kona-electric.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Jaguar I-Pace",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Jaguar I-Pace",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/jaguar-i-pace.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "KIA EV6",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de KIA EV6",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/kia-ev6.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "KIA EV9",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de KIA EV9",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/kia-ev9.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "KIA Niro EV",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de KIA Niro EV",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/kia-niro-ev.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Lancia Ypsilon",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Lancia Ypsilon",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Lancia-ypsilon.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Lotus Eletre",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Lotus Eletre",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/lotus-eletre.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Mercedes EQA",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Mercedes EQA",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Mercedes-EQA.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Mercedes-EQE",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Mercedes EQE",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Mercedes-EQE.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Mercedes Vito",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Mercedes Vito",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/mercedes-vito.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Mercedes Sprinter",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Mercedes Sprinter",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/mercedes-sprinter.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Mercedes e-Sprinter",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Mercedes e-Sprinter",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/mercedes-sprinter.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "MG ZS EV",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de MG ZS EV",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/MG-ZS-EV.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "MINI Electric",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de MINI Electric",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Mini-electric.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Nissan leaf-e",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Nissan leaf-e",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Nissaf-leaf-e+.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Nissan Ariya",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Nissan Ariya",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/Nissan-Ariya.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Opel Combo",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Opel Combo",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/opel-combo.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Opel Corsa",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Opel Corsa",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/opel-corsa.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Opel Mokka",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Opel Mokka",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/opel-mokka.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Opel Vivaro",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Opel Vivaro",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/opel-vivaro-e.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Opel e-Vivaro",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Opel e-Vivaro",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/opel-vivaro-e.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Pegueot e-208",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Peugeot e-208",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/peugeot-e-208.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Peugeot Expert",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Peugeot Expert",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/peugeot-expert.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Polestar 2",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Polestar 2",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/polestar-2.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Polestar 3",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Polestar 3",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/polestar-3.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Porsche Macan Electric",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Porsche Macan Electric",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/porsche-macan-electric.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Porsche Taycan",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Porsche Taycan",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/porsche-taycan.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Renault 5",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Renault 5",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/renault-5.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Renault Master e-Tech",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de renault Master e-Tech",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/renault-master-e-tech.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Renault Megane e-Tech",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Renault Megane e-Tech",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/renault-megane-e-tech.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Renault Scenic e-Tech",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Renault Scenic e-Tech",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/renault-scenic-e-tech.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Renault Trafic",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Renault Trafic",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/renault-trafic.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Renault ZOE",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Renault ZOE",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/renault-zoe.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Skoda Elroq",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Skoda Elroq",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/skoda-elroq.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Skoda Enyaq",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Skoda enyaq",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/skoda-enyaq.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Smart #1",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Smart #1",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/smart-1.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Smart #3",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Smart #3",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/smart-3.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Tesla Model 3",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Tesla Model 3",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/tesla-model-3.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Tesla Model S",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Tesla Model S",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/tesla-model-s.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Tesla Model Y",
      price: "Van €619, voor €538 p/mnd*",
      buttonText: "Ontdek de Tesla Model Y",
      text: "Een compacte elektrische krachtpatser met verrassend veel ruimte en stijl.",
      image: "/images/TeslaY.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Tesla Model X",
      price: "Van €619, voor €538 p/mnd*",
      buttonText: "Ontdek de Tesla Model X",
      text: "Een compacte elektrische krachtpatser met verrassend veel ruimte en stijl.",
      image: "/images/tesla-model-x.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volvo EX30",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volvo EX30",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/volco-ex-30.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volvo EX40",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volvo EX40",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/volvo-ex-40.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volvo EX90",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volvo EX90",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/volvo-ex90.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen Golf",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen Golf",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/volkswagen-golf.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen id.3",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen id.3",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-id3.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen id.4",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen id.4",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-id4.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen id.5",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen id.5",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-id5.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen id.7",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen id.7",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-id7.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen id Buzz",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen id Buzz",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-idbuzz.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen id Buzz Cargo",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen id Buzz Cargo",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-idbuzz.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen Caddy",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen Caddy",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-caddy.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen Crafter",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen Crafter",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-crafter.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen Transporter",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen Transporter",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-transporter.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Volkswagen e-Transporter",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Volkswagen e-Transporter",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/vw-e-transporter.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Xpeng G6",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Xpeng G6",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/xpeng-g6.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Xpeng G9",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Xpeng G9",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/xpeng-g9.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "Xpeng P7",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de Xpeng P7",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/xpeng-p7.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "ZEEKR 001",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de ZEEKR 001",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/zeekr-001.webp", // Pas deze aan naar je eigen afbeelding
    },
    {
      name: "ZEEKR X",
      price: "Vanaf €544 p/mnd*",
      buttonText: "Ontdek de ZEEKR X",
      text: "De plug-in hybride Sportback die kracht en efficiëntie perfect balanceert.",
      image: "/images/zeekr-x.webp", // Pas deze aan naar je eigen afbeelding
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cars.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cars.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="relative bg-gradient-to-b from-[#171719] to-[#2d3033] pb-20">
      <div className="absolute inset-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/svg/bg-accent-two.svg"
          alt="bg-accent"
          width={1000}
          height={1000}
          className="w-full h-full opacity-10"
        />
      </div>
      <div className="max-w-[1500px] mx-auto px-4 xl:px-6 pt-20 xl:pt-40">
        <div className="pl-0.5 pt-5 md:pt-0 flex px-0 bg-transparent">
          <TextBetween />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-black/75 via-black/50 to-black/25 rounded-3xl p-4 shadow-lg flex flex-col items-center"
            >
              {/* Car Image */}
              <Image
                src={car.image}
                alt={car.name}
                width={1000}
                height={1000}
                className="object-contain rounded-lg hover:scale-110 duration-300 ease-in-out transform transition-all"
              />
              {/* Car Details */}
              <div className="w-full p-2">
                <h3 className="text-lg md:text-xl xl:text-2xl tracking-wide customs-shadow font-semibold text-[#f00] mt-10">
                  {car.name}
                </h3>
                <p className="text-white hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out pt-2 text-sm md:text-md mt-2">
                  {car.price}
                </p>
                <p className="text-gray-400 pt-4 tracking-wide text-sm">
                  {car.text}
                </p>
                {/* CTA Button */}
                <Link href={"/contact#contactgegevens"}>
                  <button className="flex w-fit mt-10 px-20 mb-2 hover:text-green bg-gradient-to-b from-black/45 via-black/30 to-black/15 hover:from-black/75 hover:via-black/50 hover:to-black/25 outline-white/40 hover:outline-[#f00] outline-1 outline backdrop-blur-sm text-white py-3 rounded-3xl text-sm z-10 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                    {car.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden relative">
          <div className="bg-gradient-to-b from-black/75 via-black/50 to-black/25 rounded-3xl p-4 shadow-lg flex flex-col items-center">
            {/* Car Image */}
            <Image
              src={cars[currentIndex].image}
              alt={cars[currentIndex].name}
              width={1000}
              height={1000}
              className="object-contain rounded-lg hover:scale-110 duration-300 ease-in-out transform transition-all"
            />
            {/* Car Details */}
            <div className="w-full p-2">
              <h3 className="text-lg md:text-xl font-semibold text-[#f00] mt-10">
                {cars[currentIndex].name}
              </h3>
              <p className="text-white hover:tracking-wider hover:font-medium transition-all duration-300 ease-in-out pt-2 text-sm md:text-md mt-2">
                {cars[currentIndex].price}
              </p>
              <p className="text-gray-400 pt-4 tracking-wide text-sm">
                {cars[currentIndex].text}
              </p>
              {/* CTA Button */}
              <Link href={"/contact#contactgegevens"}>
                <button className="flex w-fit mt-10 px-14 mb-2 hover:text-green bg-gradient-to-b from-black/45 via-black/30 to-black/15 hover:from-black/75 hover:via-black/50 hover:to-black/25 outline-white/40 hover:outline-[#f00] outline-1 outline backdrop-blur-sm text-white py-3 rounded-3xl text-sm z-10 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                  {cars[currentIndex].buttonText}
                </button>
              </Link>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-x-6 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 xl:h-14 xl:w-14 flex items-center justify-center bg-[#252525] shadow-inner shadow-[#3d3d3d] hover:shadow-inner rounded-full text-white"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 xl:h-14 xl:w-14 flex items-center justify-center bg-[#252525] shadow-inner shadow-[#3d3d3d] hover:shadow-inner rounded-full text-white"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCars;
