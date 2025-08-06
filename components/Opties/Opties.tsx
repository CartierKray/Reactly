"use client";

import React from "react";

const opties = [
  "electronic climate controle",
  "RS-sportstoelen vóór in leder Valcona geperforeerd met honingraat stiksel en stoelventilatie (PEH)",
  "Velgen gegoten lichtmetaal 10 x 22 '5-spaak-ster'-design (C3H)",
  "Achteruitrijcamera (KA2)",
  "Akoestisch glas in de voor- en achterportieren (VW0)",
  "Anti Blokkeer Systeem",
  "Audi Phone Box (9ZE)",
  "Autonomous Emergency Braking",
  "bestuurdersairbag",
  "bots herkenning en activatie",
  "buitenspiegels elektr. met geheugen",
  "centrale deurvergrendeling met afstandsbediening",
  "Dakreling zwart (3S2)",
  "Digitale radio ontvangst (QV3)",
  "elektrische ramen voor en achter",
  "Elektronisch Stabiliteits Programma",
  "HD Matrix LED-koplampen (PXC)",
  "hoofd airbag(s) achter",
  "koplampen adaptief",
  "LED achterlichten",
  "lederen stuurwiel",
  "navigatiesysteem full map",
  "S Line exterieur",
  "voorstoelen verwarmd",
  "adaptief demping systeem",
  "alarm klasse 3",
  "armsteun achter",
  "Audi side assist inclusief Audi pre sense rear (PCH)",
  "bandenspanningscontrolesysteem",
  "binnenspiegel automatisch dimmend",
  "bots waarschuwing systeem",
  "buitenspiegels elektrisch inklapbaar",
  "connected services",
  "Decorinleg aluminium spectrum (7TF)",
  "dimlichten automatisch",
  "elektrisch verstelbare bestuurdersstoel",
  "Geldige APK",
  "Head-Up display (KS1)",
  "hoofd airbag(s) voor",
  "Koplampreinigingsinstallatie (8X1)",
  "LED dagrijverlichting",
  "lendesteunen (verstelbaar)",
  "Panoramadak (3FU)",
  "Stoelen vóór en achter verwarmbaar (4A4)",
  "Achterbank plus (3NS)",
  "airco separaat achter",
  "aluminium delen exterieur",
  "armsteun voor",
  "Audi smartphone interface (IU1)",
  "Bang & Olufsen Advanced soundsystem met 3D sound vóór en achter (8RF)",
  "Bluetooth telefoonvoorbereiding",
  "Buitenspiegels elektrisch inklapbaar en automatisch dimmend (6XK)",
  "buitenspiegels elektrisch verstel- en verwarmbaar",
  "cruise control",
  "Decorinleg carbon mat keper geweven (5MH)",
  "elektrisch bedienbare achterklep",
  "elektrisch verstelbare passagiersstoel",
  "grootlichtassistent",
  "hill hold functie",
  "hoofdsteunen actief",
  "Lane departure warning (6I3)",
  "lederen interieurdelen",
  "luchtvering en automatische niveauregeling",
];

function Opties() {
  return (
    <div className="grid md:grid-cols-3 py-10 sm:grid-cols-2 grid-cols-1 gap-4 text-sm text-white">
      {opties.map((optie, index) => (
        <div key={index} className="flex items-start gap-2">
          <span className="text-green-400">✔</span>
          <span>{optie}</span>
        </div>
      ))}
    </div>
  );
}

export default Opties;
