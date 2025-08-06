import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function ImageTextThree() {
  return (
    <>
      <div>
        <div
          id="financial-lease"
          className="w-full grid lg:grid-cols-2 lg:pt-20 mt-8 md:-mt-20 md:mb-40"
        >
          <div className="order-2 lg:order-1 relative flex bg-cover overflow-hidden lg:rounded-r-3xl">
            <Image
              src="/images/header-bg-2.webp"
              alt="Interieur Design Op Maat"
              width={1000}
              height={1000}
              className="lg:rounded-r-3xl lg:h-full object-cover shadow-md hover:scale-110 transition-all ease-in duration-1000"
            />
          </div>

          <div className="lg:order-2 flex flex-col justify-center items-start lg:items-center bg-transparent pb-12 lg:p-5 lg:pb-12 text-start">
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
              <div className="pl-1 pb-5 lg:pl-12 text-white">
                <div className="text-4xl md:pt-32 lg:pt-0 font-semibold w-full lg:max-w-xl">
                  <a className="">
                    Financial&nbsp; <span className="text-white">Lease</span>
                  </a>
                  <br />
                  {/* <a className="text-4xl font text-[#f00]">
                    voor ondernemers
                  </a> */}
                </div>
                <div className="mt-5 max-w-md md:max-w-xl mb-8">
                  <p className="pb-5">
                    Financial lease is dé oplossing voor ondernemers die slim
                    willen investeren in een bedrijfsauto zonder hun
                    werkkapitaal aan te spreken. Bij BeterLease.nl geniet je van
                    flexibele leaseopties die zijn afgestemd op jouw zakelijke
                    behoeften. Zo spreid je eenvoudig de kosten en houd je grip
                    op je financiën. Neem gerust contact met ons op voor meer
                    informatie over financial lease. We helpen je graag met een
                    oplossing op maat. Veelvoorkomende voordelen van financial
                    lease via BeterLease.nl zijn:
                  </p>{" "}
                  <p className="hover:tracking-wider mb-1 text-white hover:font-semibold transition-all duration-300 ease-in-out">
                    <span className="text-green-500">✓ &nbsp; </span> Snelle
                    Direct eigenaar van de bedrijfsauto
                  </p>
                  <p className="hover:tracking-wider mb-1 text-white hover:font-semibold transition-all duration-300 ease-in-out">
                    <span className="text-green-500">✓ &nbsp; </span> BTW van de
                    auto direct terugvorderen
                  </p>
                  <p className="hover:tracking-wider mb-1 text-white hover:font-semibold transition-all duration-300 ease-in-out">
                    <span className="text-green-500">✓ &nbsp; </span> Geen
                    Vaste, voorspelbare leasebedragen
                  </p>
                  <p className="hover:tracking-wider mb-1 text-white hover:font-semibold transition-all duration-300 ease-in-out">
                    <span className="text-green-500">✓ &nbsp; </span> Fiscale
                    voordelen, zoals investeringsaftrek
                  </p>
                  <p className="pt-4">
                    Wat zijn de kosten van financial lease? De maandelijkse
                    kosten zijn afhankelijk van factoren zoals de looptijd, het
                    type auto, een eventuele aanbetaling en de restwaarde. Wil
                    je precies weten wat jouw leasebedrag wordt? Vraag dan
                    vandaag nog vrijblijvend een offerte aan bij Alpha Lease
                    Group en ontdek hoe eenvoudig zakelijk rijden kan zijn!
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
                          Advies op maat voor uw behoeftes
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

export default ImageTextThree;
