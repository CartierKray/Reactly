import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function ImageTextFour() {
  return (
    <>
      <div>
        <div
          id="operational-lease"
          className="w-full grid lg:grid-cols-2 lg:pt-20 mt-8 md:-mt-20 lg:pb-40"
        >
          <div className="order-2 lg:order-2 relative flex bg-cover overflow-hidden lg:rounded-l-3xl">
            <Image
              src="/images/contact-tab.webp"
              alt="Interieur Design Op Maat"
              width={1000}
              height={1000}
              className="lg:rounded-l-3xl lg:h-full object-cover shadow-md hover:scale-110 transition-all ease-in duration-1000"
            />
          </div>

          <div className="lg:order-1 flex flex-col justify-center items-start lg:items-center bg-transparent pt-3 pb-12 lg:p-5 lg:pt-12 lg:pb-12 text-start">
            <div className=" xl:border-l xl:border-gray-400 xl:border-dashed max-w-2xl lg:max-w-xl flex flex-col justify-center items-start p-5 xl:p-0 text-start">
              <div className="relative inset-0 hidden xl:block -ml-8 bg-[#f00] shadow-inner shadow-[#f00] p-4 rounded-full left-0 top-0">
                <Image
                  src="/svg/houseleaf.svg"
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-8 h-8"
                />
              </div>
              <div className="pl-1 pt-5 pb-5 lg:pl-12 text-white">
                <div className="text-4xl -mt-8 md:-mt-12 font-semibold w-full lg:max-w-xl">
                  <a className="">
                    Operational&nbsp; <span className="text-white">Lease</span>
                  </a>
                  <br />
                  {/* <a className="text-4xl font text-[#f00]">
                    voor ondernemers
                  </a> */}
                </div>
                <div className="mt-5 max-w-md md:max-w-xl mb-8">
                  <p className="pb-5">
                    Operational lease is de ideale keuze voor ondernemers die
                    zorgeloos willen rijden zonder zich druk te maken over
                    onderhoud of afschrijving. Bij BeterLease.nl profiteer je
                    van uitgebreide leaseopties die passen bij jouw zakelijke
                    wensen. Alles wordt voor je geregeld, zodat jij je volledig
                    kunt richten op je bedrijf. Neem gerust contact met ons op
                    voor meer informatie over operational lease. We denken graag
                    met je mee over de perfecte leaseoplossing. Veelvoorkomende
                    voordelen van operational lease via BeterLease.nl zijn:
                  </p>{" "}
                  <p className="hover:tracking-wider mb-1 text-white hover:font-semibold transition-all duration-300 ease-in-out">
                    <span className="text-green-500">✓ &nbsp; </span> Snelle
                    Geen zorgen over onderhoud of reparaties
                  </p>
                  <p className="hover:tracking-wider mb-1 text-white hover:font-semibold transition-all duration-300 ease-in-out">
                    <span className="text-green-500">✓ &nbsp; </span> Inclusief
                    verzekering en wegenbelasting
                  </p>
                  <p className="hover:tracking-wider mb-1 text-white hover:font-semibold transition-all duration-300 ease-in-out">
                    <span className="text-green-500">✓ &nbsp; </span> Geen Eén
                    vast maandbedrag voor alle kosten
                  </p>
                  <p className="hover:tracking-wider mb-1 text-white hover:font-semibold transition-all duration-300 ease-in-out">
                    <span className="text-green-500">✓ &nbsp; </span> Geen
                    risico op waardevermindering
                  </p>
                  <p className="pt-4">
                    Wat kost een operational lease? De maandelijkse kosten
                    hangen af van factoren zoals het type auto, de looptijd en
                    het aantal kilometers. Wil je weten wat jouw leasebedrag
                    wordt? Vraag vandaag nog vrijblijvend een offerte aan bij
                    BeterLease.nl en ontdek hoe eenvoudig zorgeloos rijden kan
                    zijn!
                  </p>
                </div>

                <Link href="/contact#contactgegevens">
                  <div className="mb-10">
                    <Button className="rounded-3xl custom-shadow-small tracking-wider pl-10 pr-10 bg-[#f00] shadow-inner shadow-[#f00] hover:bg-transparent hover:outline hover:outline-1 hover:outline-[#f00] hover:shadow-none">
                      Meer informatie
                    </Button>
                  </div>
                </Link>
                <div className="w-full space-y-6">
                  <div className="">
                    <div className="flex space-x-5">
                      <div className="">
                        <CheckCircle className="text-sm w-5 h-5 text-green-500" />
                      </div>
                      <div className="">
                        <p className="text-sm">Binnen één minuut geregelt</p>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex space-x-5">
                      <div className="">
                        <CheckCircle className="text-sm w-5 h-5 text-green-500" />
                      </div>
                      <div className="">
                        <p className="text-sm">
                          Advies op maat voor uw situatie
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex space-x-5">
                      <div className="">
                        <CheckCircle className="text-sm w-5 h-5 text-green-500" />
                      </div>
                      <div className="">
                        <p className="text-sm">
                          Slimme, op maat gemaakte duurzame tips.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageTextFour;
