"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ReviewsTwo } from "../Reviews/ReviewsTwo";

const LeaseCalculatorThree: React.FC = () => {
  const [investmentValue, setInvestmentValue] = useState(10000);
  const [downPayment, setDownPayment] = useState(2000);
  const [leaseAmount, setLeaseAmount] = useState(8000);
  const [finalTerm, setFinalTerm] = useState(1500);
  const [duration, setDuration] = useState(72);

  // Automatisch leasebedrag berekenen
  useEffect(() => {
    setLeaseAmount(investmentValue - downPayment);
  }, [investmentValue, downPayment]);

  // Automatisch slottermijn berekenen en beperken tot max 15%
  useEffect(() => {
    const maxFinalTerm = investmentValue * 0.15;
    setFinalTerm((prevFinalTerm) => Math.min(prevFinalTerm, maxFinalTerm));
  }, [investmentValue]);

  // Handmatig slottermijn wijzigen met max 15% regel
  const handleFinalTermChange = (value: number) => {
    const maxFinalTerm = investmentValue * 0.15;
    setFinalTerm(Math.min(value, maxFinalTerm));
  };

  // Maandelijkse betaling berekenen
  const calculateMonthlyPayment = () => {
    const interestRate = 0.18; // 18% rente per jaar
    const monthlyInterest = interestRate / 12;
    const numberOfMonths = duration;
    const loanAmount = leaseAmount - finalTerm; // Correcte berekening met slottermijn

    if (loanAmount <= 0) return "0.00";

    const monthlyPayment =
      (loanAmount * monthlyInterest) /
      (1 - Math.pow(1 + monthlyInterest, -numberOfMonths));

    return monthlyPayment.toFixed(2);
  };

  return (
    <div className="relative w-full pt-16 md:pt-20 lg:pt-28 pb-36 h-full  flex items-center">
      {/* Achtergrondafbeelding */}
      <div className="absolute inset-0">
        <Image
          width={1000}
          height={1000}
          src="/images/slider-2.jpg"
          alt="BeterLease.nl"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Overlay */}
      <div className="absolute h-full inset-0 bg-black bg-opacity-25 bg-gradient-to-b from-transparent/50 via-transparent/40 to-[#191c1f]"></div>
      <div className="w-full xl:gap-x-10 2xl:gap-x-20 lg:flex mx-auto justify-center items-center">
        {/* Formulier Container */}
        <div className="relative lg:pb-24 pt-20 p-4 flex justify-center items-center">
          <div className="bg-white/5 lg:py-14 outline outline-white/20 backdrop-blur-2xl max-w-[600px] xl:max-w-[650px] 2xl:max-w-[700px] rounded-xl shadow-lg p-8 w-full">
            <Image
              src={"/svg/BeterLeaseSVG.svg"}
              width={1000}
              height={1000}
              alt="Logo"
              className="pb-4"
            />
            <p className="text-[13px] md:text-md tracking-wider pt-2 text-white mb-6">
              BEREKEN JOUW NIEUWE DROOMAUTO!
            </p>

            {/* Inputvelden */}
            <div className="grid pt-5 grid-cols-2 gap-x-4 gap-y-6">
              {/* Aanschafwaarde */}
              <div>
                <label className="block text-xs md:text-sm pb-2 font-medium text-white">
                  Investering &nbsp;(excl. BTW)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center 500">
                    €
                  </span>
                  <input
                    type="number"
                    value={investmentValue}
                    onChange={(e) =>
                      setInvestmentValue(parseFloat(e.target.value) || 0)
                    }
                    className="pl-8 pr-4 py-2 border rounded-md w-full 800"
                  />
                </div>
              </div>

              {/* Aanbetaling */}
              <div>
                <label className="block text-xs md:text-sm font-medium pb-2 text-white">
                  Aanbetaling{" "}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center 500">
                    €
                  </span>
                  <input
                    type="text"
                    value={downPayment}
                    onChange={(e) =>
                      setDownPayment(parseFloat(e.target.value) || 0)
                    }
                    className="pl-8 pr-4 py-2 border rounded-md w-full 800"
                  />
                </div>
              </div>

              {/* Leasebedrag (automatisch) */}
              <div>
                <label className="block text-xs md:text-sm font-medium pb-2 text-white">
                  Leasebedrag
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center 500">
                    €
                  </span>
                  <input
                    type="number"
                    value={leaseAmount}
                    disabled
                    className="pl-8 pr-4 py-2 border rounded-md w-full 400 bg-gray-200"
                  />
                </div>
              </div>

              {/* Looptijd */}
              <div>
                <label className="block text-xs md:text-sm pb-2 font-medium text-white">
                  Looptijd
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="py-2 px-3 border rounded-md w-full 800"
                >
                  <option value={12}>12 maanden</option>
                  <option value={24}>24 maanden</option>
                  <option value={36}>36 maanden</option>
                  <option value={48}>48 maanden</option>
                  <option value={60}>60 maanden</option>
                  <option value={72}>72 maanden</option>
                </select>
              </div>
            </div>

            {/* Slottermijn en prijs */}
            <div className="grid md:flex w-full pt-3 justify-between">
              <div className="col-span-2 pt-3">
                <label className="block text-xs md:text-sm pb-2 font-medium text-white">
                  Slottermijn{" "}
                  <span className="300 text-[10px]">(max. 15%)</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center 500">
                    €
                  </span>
                  <input
                    type="text"
                    value={finalTerm}
                    onChange={(e) =>
                      handleFinalTermChange(parseFloat(e.target.value) || 0)
                    }
                    className="pl-8 pr-4 py-2 border rounded-md w-full 800"
                  />
                </div>
              </div>

              <div className="mt-10">
                <p className="text-[#FFF] text-sm tracking-wide md:hover:tracking-wider md:hover:font-semibold transition-all duration-500 ease-in-out hover:font-semibold">
                  Leasebedrag vanaf
                </p>
                <p className="text-5xl text-white font-semibold">
                  € {calculateMonthlyPayment()}{" "}
                  <span className="text-xs font-light text-[#FFF] tracking-wide md:hover:tracking-wider md:hover:font-semibold transition-all duration-500 ease-in-out hover:font-semibold">
                    p/mnd
                  </span>
                </p>
              </div>
            </div>

            <Link href="/contact#contactgegevens">
              <Button className="mt-10 w-full shadow-inner shadow-[#e3d1ac] bg-[#c2b293] custom-shadow-small tracking-wide hover:tracking-wider text-white hover:shadow-green-500 hover:bg-green-600 hover:font-medium rounded-full md:hover:font-semibold transition-all duration-500 ease-in-out">
                Goedkeuring aanvragen
              </Button>
              <div>
                <p className="pl-1 italic text-white text-[10px] tracking-wide font-light pt-8 md:hover:tracking-wider md:hover:font-semibold transition-all duration-500 ease-in-out">
                  <span className="text-[#FFF]">*</span>
                  <span>
                    &nbsp;De BTW dient altijd uit eigen middelen voldaan te
                    worden.
                  </span>
                  <br />
                  <span className="text-[#FFF]">*</span>
                  <span>
                    &nbsp; De bovenstaande offerte is onder voorbehoud van
                    tariefswijzigingen en kredietacceptatie.
                  </span>
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="relative lg:pb-24 pt-20 p-4 flex justify-center items-center">
          <div className=" mx-auto py-10 bg-white/5 lg:py-14 outline outline-white/20 backdrop-blur-2xl max-w-[600px] xl:max-w-[650px] 2xl:max-w-[700px] rounded-xl shadow-lg p-8 w-full">
            <div className="text-2xl md:text-3xl text-white font-semibold mb-8">
              Voordelen van BeterLease.nl
            </div>
            <ul className="space-y-4 text-white">
              {[
                "Standaard geen bemiddelingskosten",
                "Binnen 24 uur uitsluitsel over uw aanvraag",
                "Looptijden tot 72 maanden mogelijk",
                "Persoonlijke service en advisering",
                "Acceptatie zonder jaarcijfers mogelijk",
                "Bank-en merk onafhankelijk",
                "Beste tarieven tegen de best mogelijke voorwaarden",
                "Tussentijds extra aflossen mogelijk",
                "Ook mogelijkheden voor ZZP’ers en starters",
                "Je droomauto rijden binnen 48 uur",
              ].map((text, index) => (
                <li
                  key={index}
                  className="flex text-[15.5px] items-start gap-3 font-light md:hover:tracking-wider md:hover:font-semibold transition-all duration-500 ease-in-out"
                >
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseCalculatorThree;
