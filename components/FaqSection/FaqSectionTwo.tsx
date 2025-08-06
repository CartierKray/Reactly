"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import FaqIntro from "../Intro/FaqIntro";
import Link from "next/link";

const faqs = [
  {
    question: "Wat is financial lease en hoe werkt het?",
    answer:
      "Financial lease is een zakelijke leasevorm waarbij je een auto koopt op afbetaling. Je bent economisch eigenaar vanaf het begin en betaalt maandelijks aflossing plus rente. Na afloop van het contract is de auto volledig jouw eigendom. Kosten voor onderhoud en verzekering zijn voor eigen rekening.",
  },
  {
    question: "Wat is operational lease?",
    answer:
      "Bij operational lease huur je feitelijk de auto voor een vaste periode. Onderhoud, verzekering, belasting en pechhulp zijn inbegrepen. Je betaalt een vast maandbedrag en levert de auto na afloop weer in. Je wordt geen eigenaar, maar rijdt zorgeloos.",
  },
  {
    question:
      "Wat is het verschil tussen financial lease en operational lease?",
    answer:
      "Het grootste verschil is eigendom. Bij financial lease ben je economisch eigenaar en koop je de auto gespreid. Bij operational lease betaal je voor gebruik, zonder dat de auto ooit van jou wordt. Ook zijn bij operational lease extra kosten (zoals onderhoud) inbegrepen.",
  },
  {
    question: "Kan ik als particulier ook een auto leasen?",
    answer:
      "Ja, via private lease. Dit lijkt op operational lease, maar is voor consumenten. Je betaalt een vast maandbedrag waarin verzekering, onderhoud en belasting inbegrepen zijn. Aan het einde lever je de auto in, zonder zorgen over restwaarde.",
  },
  {
    question: "Wat houdt auto kopen op aanvraag in?",
    answer:
      "Bij kopen op aanvraag geef je jouw wensen door — merk, model, kleur, opties, bouwjaar — en wij zoeken gericht voor jou. Je krijgt passende voorstellen, vaak voordeliger dan wat online te vinden is. Ideaal als je iets specifieks zoekt of geen tijd hebt om zelf te zoeken.",
  },
  {
    question: "Kan ik ook een auto kopen zonder lease?",
    answer:
      "Ja, je kunt bij ons ook auto's direct kopen. We bieden scherpe prijzen voor zakelijke én particuliere kopers. Financiering is optioneel en je kunt ook je oude auto inruilen.",
  },
  {
    question: "Kan ik als startende ondernemer een auto leasen?",
    answer:
      "Zeker. Veel startende ondernemers leasen via ons. Soms is er een aanbetaling of borg nodig, afhankelijk van jouw situatie. Wij beoordelen je aanvraag persoonlijk en denken in oplossingen.",
  },
  {
    question: "Kan ik een auto leasen zonder jaarcijfers?",
    answer:
      "Ja, in veel gevallen wel. We kijken dan naar andere factoren zoals aanbetaling, branche, of eventueel een garantstelling. Startende ondernemers en zzp’ers zijn welkom.",
  },
  {
    question: "Wat zijn de fiscale voordelen van financial lease?",
    answer:
      "Je kunt profiteren van investeringsaftrek, renteaftrek en btw-terugvordering (bij btw-auto’s). Omdat je economisch eigenaar bent, komt de auto op de balans van je bedrijf te staan.",
  },
  {
    question: "Welke kosten zijn inbegrepen bij operational lease?",
    answer:
      "Onderhoud, verzekering, wegenbelasting, banden en pechhulp zijn meestal inbegrepen. Je betaalt alleen nog voor brandstof of laden, en soms eigen risico bij schade. Alles-in-één dus.",
  },
  {
    question: "Wat zijn de maandelijkse kosten bij financial lease?",
    answer:
      "Dat hangt af van de aanschafprijs, aanbetaling, looptijd en slottermijn. Je betaalt rente + aflossing, maar regelt zelf kosten voor verzekering, onderhoud en belasting.",
  },
  {
    question: "Kan ik mijn huidige auto inruilen bij lease of aankoop?",
    answer:
      "Ja, je kunt je auto inruilen. De inruilwaarde kun je gebruiken als aanbetaling voor lease of als korting bij aankoop. Wij taxeren eerlijk en vrijblijvend.",
  },
  {
    question: "Kan ik een leasecontract eerder beëindigen?",
    answer:
      "Bij operational lease kan dat meestal niet kosteloos, maar je kunt het wel afkopen. Bij financial lease ben je eigenaar en moet je het contract aflossen of de auto verkopen. Neem altijd contact met ons op voor advies.",
  },
  {
    question: "Hoe werkt zoeken op maat of auto op aanvraag?",
    answer:
      "Je geeft je wensen door: merk, model, bouwjaar, kleur, opties. Wij zoeken binnen ons netwerk van dealers en veilingen. Zo krijg je snel een scherp aanbod op maat zonder eindeloos scrollen.",
  },
  {
    question: "Is het mogelijk om te leasen met een negatieve BKR-registratie?",
    answer:
      "In sommige gevallen wel. We bekijken je situatie en kunnen leasen via alternatieve routes of met aanbetaling/garantstelling. Neem contact met ons op voor een vrijblijvende beoordeling.",
  },
  {
    question: "Is een slottermijn verplicht bij financial lease?",
    answer:
      "Nee, maar het kan je maandlasten verlagen. De slottermijn is het bedrag dat je aan het einde van het contract nog betaalt. Hoe hoger de slottermijn, hoe lager je maandbedrag — maar je moet dit bedrag wel inplannen.",
  },
  {
    question: "Kan ik een elektrische auto leasen?",
    answer:
      "Ja, zowel elektrisch als hybride is beschikbaar in financial lease, operational lease én private lease. Wij hebben een breed aanbod van duurzame modellen, nieuw én gebruikt.",
  },
  {
    question: "Is onderhoud inbegrepen bij financial lease?",
    answer:
      "Nee, bij financial lease regel je onderhoud, verzekering en belasting zelf. Dit geeft je flexibiliteit, maar vereist wel dat je zelf verantwoordelijk bent voor goed onderhoud.",
  },
  {
    question: "Wat gebeurt er aan het einde van mijn leasecontract?",
    answer:
      "Bij financial lease ben je dan volledig eigenaar van de auto. Bij operational lease lever je de auto weer in, tenzij er een overnameoptie is afgesproken. Bij private lease lever je de auto standaard in.",
  },
  {
    question: "Hoe lang loopt een gemiddeld leasecontract?",
    answer:
      "Meestal tussen de 24 en 60 maanden. Kortere looptijden betekenen hogere maandlasten, maar minder lang vastzitten. Wij adviseren je graag over de beste termijn voor jouw situatie.",
  },
  {
    question: "Andere vraag?",
    answer:
      "Heb je een specifieke vraag die er niet tussen staat? Neem dan contact met ons op, wij hebben 24/7 een adviseur klaar staan voor al uw vragen rondom financial leasen van uw auto of een directe aanschaf van jouw droomauto.",
  },
];

export default function FAQSectionTwo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const initialVisibleCount = 10;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-5 md:pt-20 max-w-6xl w-full mx-auto pb-10 md:pb-20 relative">
      <div className="max-w-7xl mx-auto">
        <FaqIntro />

        {/* FAQ Lijst */}
        <div className="space-y-4 pt-5 relative">
          {(showAll ? faqs : faqs.slice(0, initialVisibleCount)).map(
            (faq, idx) => {
              const actualIndex = showAll ? idx : idx;
              const isOpen = openIndex === actualIndex;

              return (
                <div
                  key={idx}
                  className={`bg-white dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] dark:outline-none outline outline-[#f2f2f2] rounded-2xl shadow-md transition-all duration-300 ${
                    isOpen ? "p-6" : "p-4"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between text-left gap-4"
                    onClick={() => toggle(actualIndex)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                          isOpen
                            ? "dark:text-white"
                            : "text-black dark:text-white hover:text-[#c2b293]"
                        }`}
                      >
                        {isOpen ? (
                          <ChevronDown className="w-5 h-5 dark:text-white/50 text-black hover:text-[#c2b293]" />
                        ) : (
                          <ChevronRight className="w-5 h-5 dark:text-white/50 text-black hover:text-[#c2b293]" />
                        )}
                      </div>
                      <span className="text-[#34475e] dark:text-white font-medium text-sm">
                        {faq.question}
                      </span>
                    </div>
                  </button>

                  {isOpen && faq.answer && (
                    <p className="mt-4 ml-14 hover:text-[#4e5d78] text-sm font-light max-w-3xl">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            }
          )}

          {/* Fade overlay */}
          {!showAll && faqs.length > initialVisibleCount && (
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#fff] dark:from-[#000]  dark:via-[#000]/80 to-transparent flex justify-center items-end pb-6 pointer-events-none z-10">
              <button
                onClick={() => setShowAll(true)}
                className="pointer-events-auto bg-black text-white dark:bg-white dark:text-black px-8 py-2 rounded-lg shadow-md text-sm font-medium transition hover:scale-105"
              >
                Lees meer
              </button>
            </div>
          )}
        </div>

        {/* Toon minder knop */}
        {showAll && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(false)}
              className="bg-black text-white dark:bg-white dark:text-black px-8 py-2 rounded-lg shadow-md text-sm font-medium transition hover:scale-105"
            >
              Toon minder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
