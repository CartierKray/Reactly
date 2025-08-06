"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Reviews } from "../Reviews/Reviews";
import Link from "next/link";

const LeaseCalculator: React.FC = () => {
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
    <div className="relative w-full pt-20 pb-20 h-[825px] bg-gray-100 flex items-center">
      {/* Achtergrondafbeelding */}
      <div className="absolute inset-0">
        <Image
          width={1000}
          height={1000}
          src="/images/rsegt_ae_2022_3854-XL.webp"
          alt="Lease Car"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 bg-gradient-to-b from-stone-800 via-transparent/40 to-[#2d3033]"></div>
      <div className="w-full flex">
        {/* Formulier Container */}
        <div className="relative w-[100%] pb-24 pt-20 max-w-[1200px] p-4 md:pl-10 xl:pl-24 flex items-center">
          <div className="bg-white/5 lg:py-14 outline outline-white/20 backdrop-blur-2xl max-w-[600px] xl:max-w-[650px] 2xl:max-w-[700px] rounded-xl shadow-lg p-8 w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-500 mb-2">
              BEREKEN JE LEASE
            </h2>
            <p className="text-sm md:text-md tracking-wider pt-2 text-white mb-6">
              OOK DIE KUN JE BIJ ONS LEASEN!
            </p>

            {/* Inputvelden */}
            <div className="grid pt-5 grid-cols-2 gap-x-4 gap-y-6">
              {/* Aanschafwaarde */}
              <div>
                <label className="block text-sm pb-2 font-medium text-white">
                  Investeringswaarde
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                    €
                  </span>
                  <input
                    type="number"
                    value={investmentValue}
                    onChange={(e) =>
                      setInvestmentValue(parseFloat(e.target.value) || 0)
                    }
                    className="pl-8 pr-4 py-2 border rounded-md w-full text-gray-800"
                  />
                </div>
              </div>

              {/* Aanbetaling */}
              <div>
                <label className="block text-sm font-medium pb-2 text-white">
                  Aanbetaling
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                    €
                  </span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) =>
                      setDownPayment(parseFloat(e.target.value) || 0)
                    }
                    className="pl-8 pr-4 py-2 border rounded-md w-full text-gray-800"
                  />
                </div>
              </div>

              {/* Leasebedrag (automatisch) */}
              <div>
                <label className="block text-sm font-medium pb-2 text-white">
                  Leasebedrag
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                    €
                  </span>
                  <input
                    type="number"
                    value={leaseAmount}
                    disabled
                    className="pl-8 pr-4 py-2 border rounded-md w-full text-gray-400 bg-gray-200"
                  />
                </div>
              </div>

              {/* Looptijd */}
              <div>
                <label className="block text-sm pb-2 font-medium text-white">
                  Looptijd
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="py-2 px-3 border rounded-md w-full text-gray-800"
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
                <label className="block text-sm pb-2 font-medium text-white">
                  Slottermijn{" "}
                  <span className="text-gray-300 text-[10px]">(max. 15%)</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                    €
                  </span>
                  <input
                    type="number"
                    value={finalTerm}
                    onChange={(e) =>
                      handleFinalTermChange(parseFloat(e.target.value) || 0)
                    }
                    className="pl-8 pr-4 py-2 border rounded-md w-full text-gray-800"
                  />
                </div>
              </div>

              <div className="mt-10">
                <p className="text-amber-500 text-sm font-semibold">
                  Prijs vanaf
                </p>
                <p className="text-5xl text-amber-500 font-semibold">
                  € {calculateMonthlyPayment()}{" "}
                  <span className="text-sm">p/m</span>
                </p>
              </div>
            </div>

            <Link href="/contact#contactgegevens">
              <Button className="mt-10 w-full bg-amber-500 shadow-inner shadow-amber-400 hover:bg-green-600 hover:shadow-green-500 text-white rounded-full">
                Goedkeuring aanvragen
              </Button>
              <div>
                <p className="pl-1 italic text-white text-[10px] tracking-wide font-light pt-8 md:hover:tracking-wider md:hover:font-semibold transition-all duration-500 ease-in-out">
                  <span className="text-red-500">*</span>
                  <span>
                    &nbsp;Prijsindicatie o.v.b. van bedrijfsduur, BKR en
                    krediet-score.
                  </span>
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="hidden xl:flex md:pr-14 lg:pr-20 xl:pr-20">
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default LeaseCalculator;
