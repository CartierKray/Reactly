"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import ModalComponentLease from "../Modal/ModalComponentLease";

export default function LeaseCalculatorSection() {
  const [investment, setInvestment] = useState<number | "">("");
  const [downPayment, setDownPayment] = useState<number | "">("");
  const [term, setTerm] = useState<number>(0);
  const [finalTerm, setFinalTerm] = useState<number | "">("");
  const [creditAmount, setCreditAmount] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const finalTermRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMaxFinalTermPercentage = (term: number) => {
    if ([12, 24, 36, 48, 60].includes(term)) return 0.25;
    if (term === 72) return 0.15;
    return 0;
  };

  const maxFinalTermPercentage = getMaxFinalTermPercentage(term);
  const maxFinalTermAmount =
    investment && downPayment !== ""
      ? (investment - downPayment) * maxFinalTermPercentage
      : 0;

  useEffect(() => {
    if (term && investment && downPayment !== "") {
      setFinalTerm(maxFinalTermAmount);
    }
  }, [term, investment, downPayment, maxFinalTermAmount]);

  useEffect(() => {
    const raw = (investment || 0) - (downPayment || 0);
    let adjustedFinalTerm = finalTerm || 0;

    if (adjustedFinalTerm > maxFinalTermAmount) {
      adjustedFinalTerm = maxFinalTermAmount;
      setFinalTerm(maxFinalTermAmount);
    }

    const credit = raw;

    if (!term || credit <= 0) {
      setCreditAmount(0);
      setMonthly(0);
      return;
    }

    const interest = 0.12 / 12;
    const months = term;
    const annuityFactor =
      (interest * Math.pow(1 + interest, months)) /
      (Math.pow(1 + interest, months) - 1);
    const monthlyPayment = (credit - adjustedFinalTerm) * annuityFactor;

    setCreditAmount(credit);
    setMonthly(Math.round(monthlyPayment));
  }, [investment, downPayment, term, finalTerm, maxFinalTermAmount]);

  const benefits = [
    "Persoonlijk contact met een vast aanspreekpunt",
    "Binnen 24 uur een concrete lease-offerte",
    "Keuze uit flexibele looptijden",
    "Transparante voorwaarden zonder verrassingen",
    "Ook starters en zzp’ers welkom",
    "Snelle acceptatie, vaak zonder jaarcijfers",
    "Onafhankelijk van banken en merken",
    "Extra aflossen altijd mogelijk",
    "Beoordeling op maat per branche",
    "Geen verborgen kosten of verplichtingen",
    "Groot netwerk van dealers en leveranciers",
    "Inruil van je huidige auto is altijd bespreekbaar",
    "Ook elektrische en hybride modellen beschikbaar",
    "Altijd scherpe tarieven, ook bij maatwerk",
    "Levering mogelijk door heel Nederland",
    "Heldere uitleg over leasevormen en financiering",
    "24/7 hulp van professionele adviseurs",
  ];

  return (
    <div className="w-full px-4 md:pt-10 md:pb-28 bg-gradient-to-b dark:bg-transparent dark:bg-gradient-to-b dark:from-transparent dark:to-transparent from-[#FFF] to-[#f0f0f0]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 lg:gap-10 xl:gap-16">
        <div className="order-2 md:order-1 border p-4 mb-10 rounded-md h-min py-10 md:px-6 md:w-fit bg-white dark:shadow-inner dark:border-none dark:bg-[#282828] dark:shadow-[#444444] backdrop-blur-md">
          <h2 className="font-semibold text-2xl lg:text-3xl mb-6">
            Voordelen van BeterLease.nl
          </h2>
          <ul className="space-y-3">
            {benefits.map((item, i) => (
              <li
                key={i}
                className="flex items-start hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out gap-2 text-sm"
              >
                <CheckCircle className="text-[#c2b293] dark:text-red-600 w-5 h-5 mt-[2px]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 md:order-2 space-y-4 text-sm pb-10 dark:border-none border dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] bg-white backdrop-blur-md p-4 rounded-md">
          <h2 className=" lg:pt-0.5 font-semibold text-2xl lg:text-3xl mt-5 mb-8">
            Leasecalculator
          </h2>

          <div className="space-y-2">
            <label className="block font-medium">
              Investering (excl. BTW)*
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={investment}
              onChange={(e) =>
                setInvestment(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full border rounded px-3 py-2"
              placeholder="€"
              min={0}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Aanbetaling / inruil</label>
            <input
              type="number"
              inputMode="numeric"
              value={downPayment}
              onChange={(e) =>
                setDownPayment(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full border rounded px-3 py-2"
              placeholder="€"
              min={0}
            />
          </div>

          <div className="bg-[#c2b293] shadow-inner shadow-[#e3d1ac] dark:bg-red-600 dark:shadow-red-400 text-white px-4 py-2 rounded-md font-medium">
            Gewenst kredietbedrag: €{creditAmount.toLocaleString()}
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Looptijd</label>
            <select
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            >
              <option value={0}>Selecteer…</option>
              <option value={12}>12 maanden</option>
              <option value={24}>24 maanden</option>
              <option value={36}>36 maanden</option>
              <option value={48}>48 maanden</option>
              <option value={60}>60 maanden</option>
              <option value={72}>72 maanden</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">
              Slottermijn (max. {maxFinalTermPercentage * 100}%)
            </label>
            <input
              ref={finalTermRef}
              type="number"
              inputMode="numeric"
              value={finalTerm}
              onChange={(e) =>
                setFinalTerm(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full border rounded px-3 py-2"
              placeholder="€"
              min={0}
            />
          </div>

          <div className="bg-[#c2b293] shadow-inner shadow-[#e3d1ac] dark:bg-red-600 dark:shadow-red-400 text-white px-4 py-2 rounded-md font-medium">
            Uw maandtermijn:{" "}
            <span className="font-semibold hover:tracking-wider hover:font-semibold px-1 hover:scale-110 duration-300 ease-in-out transform transition-all">
              €{monthly.toLocaleString()}
            </span>
          </div>

          <p className="text-xs text-gray-500">
            * De BTW dient altijd uit eigen middelen voldaan te worden.
          </p>

          <p className="text-xs text-gray-500">
            De bovenstaande offerte is onder voorbehoud van tariefwijzigingen en
            kredietacceptatie. Aan deze berekening kunnen geen rechten worden
            ontleend. Heeft u na het lezen van deze offerte nog vragen? Neem dan
            gerust contact met ons op, we beantwoorden graag uw vragen.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out bg-[#c2b293] shadow-inner shadow-[#e3d1ac] dark:bg-red-600 dark:shadow-red-400 text-white py-2 rounded-md mt-4"
          >
            Aanvragen
          </button>
        </div>
      </div>

      <ModalComponentLease
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedCard={{ title: "financial lease ", imageSrc: "" }}
        selectedServices={[
          { name: "Investering (excl. BTW)", price: investment || 0 },
          { name: "Aanbetaling / inruil", price: downPayment || 0 },
          { name: "Looptijd (maanden)", price: term },
          { name: "Slottermijn", price: finalTerm || 0 },
          { name: "Maandtermijn", price: monthly },
        ]}
      />
    </div>
  );
}
