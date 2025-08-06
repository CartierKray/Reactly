"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LeaseCalculator from "../LeaseCalculator/LeaseCalculator";
import { Button } from "../ui/button";

const VideoBannerThree: React.FC = () => {
  const [navbarSticky, setNavbarSticky] = useState(false);
  const [navbarHovered, setNavbarHovered] = useState(false);
  const [investmentValue, setInvestmentValue] = useState(10000);
  const [downPayment, setDownPayment] = useState(2000);
  const [leaseAmount, setLeaseAmount] = useState(8000);
  const [finalTerm, setFinalTerm] = useState(1500);
  const [duration, setDuration] = useState(72);

  const calculateMonthlyPayment = () => {
    const interestRate = 0.18; // Example interest rate: 5%
    const monthlyInterest = interestRate / 12;
    const numberOfMonths = duration;
    const loanAmount = leaseAmount - downPayment + finalTerm;

    const monthlyPayment =
      (loanAmount * monthlyInterest) /
      (1 - Math.pow(1 + monthlyInterest, -numberOfMonths));

    return monthlyPayment.toFixed(2);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarSticky(true);
    } else {
      setNavbarSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[80vh] object-cover"
      >
        <source src="/video/New-Video-NORTVI-summer.mp4" type="video/mp4" />
        Jouw browser ondersteunt geen video tag.
      </video> */}

      <div className="block">
        <Image
          alt="A description of the image"
          src="/images/1920x1080_forest.avif"
          width={1920} // Gebruik een passende breedte
          height={1080} // Gebruik een passende hoogte
          className="w-full h-screen object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#171719] via-transparent/50 to-[#2d3033]"></div>

      <div className="absolute top-0 w-full left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center">
        <div className="w-full flex text-start justify-center">
          {/* Form Container */}
          <div className="relative w-full pb-16 pt-10 max-w-[650px] p-4  flex justify-center items-center">
            {/* Form Positioned to the Left */}
            <div className="bg-white/5 lg:py-14 outline-1 outline outline-white/20 backdrop-blur-2xl max-w-full rounded-xl shadow-lg p-8 w-full">
              <h2 className="text-2xl tracking-wider md:text-3xl font-bold text-[#f00] mb-2">
                BEREKEN JE LEASE
              </h2>
              <p className="text-sm md:text-md md:tracking-wider pt-2 text-white  mb-6">
                OOK DIE KUN JE BIJ ONS LEASEN!
              </p>

              {/* Inputs */}
              <div className="grid pt-5 grid-cols-2 gap-x-4 gap-y-6">
                {/* Investment Value */}
                <div>
                  <label
                    htmlFor="investmentValue"
                    className="block text-sm pb-2 font-medium text-white"
                  >
                    Investeringswaarde
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                      €
                    </span>
                    <input
                      type="number"
                      id="investmentValue"
                      value={investmentValue}
                      onChange={(e) =>
                        setInvestmentValue(parseFloat(e.target.value) || 0)
                      }
                      className="pl-8 pr-4 py-2 border border-gray-300 rounded-md shadow-sm w-full text-gray-800"
                    />
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <label
                    htmlFor="downPayment"
                    className="block text-sm font-medium pb-2 text-white"
                  >
                    Aanbetaling
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                      €
                    </span>
                    <input
                      type="number"
                      id="downPayment"
                      value={downPayment}
                      onChange={(e) =>
                        setDownPayment(parseFloat(e.target.value) || 0)
                      }
                      className="pl-8 pr-4 py-2 border border-gray-300 rounded-md shadow-sm w-full text-gray-800"
                    />
                  </div>
                </div>

                {/* Lease Amount */}
                <div>
                  <label
                    htmlFor="leaseAmount"
                    className="block text-sm font-medium pb-2 text-white"
                  >
                    Leasebedrag
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                      €
                    </span>
                    <input
                      type="number"
                      id="leaseAmount"
                      value={leaseAmount}
                      onChange={(e) =>
                        setLeaseAmount(parseFloat(e.target.value) || 0)
                      }
                      className="pl-8 pr-4 py-2 border border-gray-300 rounded-md shadow-sm w-full text-gray-800"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm pb-2 font-medium text-white"
                  >
                    Looptijd
                  </label>
                  <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="py-2 px-3 border border-gray-300 rounded-md shadow-sm w-full text-gray-800"
                  >
                    <option value={12}>12 maanden</option>
                    <option value={24}>24 maanden</option>
                    <option value={36}>36 maanden</option>
                    <option value={48}>48 maanden</option>
                    <option value={60}>60 maanden</option>
                    <option value={72}>72 maanden</option>
                  </select>
                </div>

                {/* Final Term */}
                {/* <div className="col-span-2">
              <label
                htmlFor="finalTerm"
                className="block text-sm font-medium text-[#f00]"
              >
                Slottermijn
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                  €
                </span>
                <input
                  type="number"
                  id="finalTerm"
                  value={finalTerm}
                  onChange={(e) =>
                    setFinalTerm(parseFloat(e.target.value) || 0)
                  }
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-md shadow-sm w-full text-gray-800"
                />
              </div>
            </div> */}
              </div>

              {/* Monthly Price */}

              <div className="grid md:flex w-full pt-3 justify-between ">
                <div className="col-span-2 pt-3 ">
                  <label
                    htmlFor="finalTerm"
                    className="block text-sm pb-2 font-medium text-white"
                  >
                    Slottermijn &nbsp;{" "}
                    <span className="tracking-wide text-gray-300 text-[10px]">
                      ( maximaal 15% )
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                      €
                    </span>
                    <input
                      type="number"
                      id="finalTerm"
                      value={finalTerm}
                      onChange={(e) =>
                        setFinalTerm(parseFloat(e.target.value) || 0)
                      }
                      className="pl-8 pr-4 py-2 border border-gray-300 rounded-md shadow-sm w-full text-gray-800"
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-[#f00] text-sm tracking-wider font-semibold mb-1">
                    <span className="text-red-500">*</span>
                    &nbsp;Prijs vanaf
                  </p>
                  <p className="text-[45px] lg:text-5xl text-white font-semibold">
                    € {calculateMonthlyPayment()}{" "}
                    <span className="text-sm font-medium text-[#f00] tracking-wider">
                      {" "}
                      p/m
                    </span>
                  </p>
                </div>
              </div>
              <Button className="mt-10 mb-2 w-full outline-1 tracking-wide bg-transparent backdrop-blur-sm bg-white text-black hover:bg-white hover:tracking-wider md:hover:font-semibold transition-all duration-500 ease-in-out rounded-full">
                Goedkeuring aanvragen
              </Button>
              <div>
                <p className="pl-1 italic text-white text-[10px] tracking-wide font-light pt-8 md:hover:tracking-wider md:hover:font-semibold transition-all duration-500 ease-in-out">
                  <span className="text-red-500">*</span>
                  <span>
                    &nbsp;Prijsindicatie o.v.b. aanbetaling, financiering, BKR
                    en kredietscore.
                  </span>
                </p>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBannerThree;
