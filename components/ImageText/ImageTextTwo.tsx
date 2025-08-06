import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function ImageTextTwo() {
  return (
    <>
      <div className="bg-[#e3e0d8]">
        <div className="w-full grid lg:grid-cols-2 lg:pt-20 pt-8 lg:pb-20">
          <div className="order-1 lg:order-2 relative flex bg-cover overflow-hidden lg:rounded-l-3xl">
            <Image
              src="/images/header-bg-3.webp"
              alt="Interieur Design Op Maat"
              width={1000}
              height={1000}
              className="lg:rounded-l-3xl lg:h-[75vh] object-cover shadow-md hover:scale-110 transition-all ease-in duration-1000"
            />
          </div>

          <div className="order-2 lg:order-1 flex pt-20 flex-col justify-center items-start lg:items-center bg-transparent pb-12 lg:p-5 lg:pb-12 text-start">
            <div className=" xl:border-l xl:border-gray-400 xl:border-dashed max-w-2xl lg:max-w-xl flex flex-col justify-center items-start p-5 xl:p-0 text-start">
              <div className="relative inset-0 hidden xl:block -ml-8 bg-gradient-to-r bg-amber-500 shadow-inner shadow-amber-400 p-4 rounded-full left-0 top-0">
                <Image
                  src="/svg/houseleaf.svg"
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-8 h-8"
                />
              </div>
              <div className="pl-1 pb-5 lg:pl-12">
                <div className="text-4xl font-semibold w-full lg:max-w-xl">
                  <a className=" text-black">Op welke plekken komt</a>
                  <br />
                  <a className="text-4xl font text-gray-500">betonrot voor?</a>
                </div>
                <div className="mt-4 max-w-md md:max-w-xl mb-8">
                  <p>
                    De belangrijkste reden voor betonschade is betonrot. Maar
                    wat betekent dit precies? Betonrot komt voort uit roest in
                    de stalenconstructie binnen het beton. Deze roest ontstaat
                    door vocht dat is binnengedrongen. U kunt vooral alert zijn
                    voor betonrot op de volgende plekken in uw huis of
                    bedrijfspand: <br />
                  </p>
                  <p className="pt-3 pb-3">
                    • Het plafond <br />
                    • Het balkon <br />
                    • De kelder <br />
                    • De heipalen <br />
                    • De vloer <br />
                  </p>
                  <p className="">Waar kunt u alert op zijn? Denk aan:</p>{" "}
                  <br />
                  Roestplekken, scheuren in het beton en zichtbare bewapening.
                  Als u hier last van heeft, komen wij graag uw beton repareren.
                </div>
                <Link href="/contact">
                  <div className="mb-10">
                    <Button className="rounded-3xl pl-10 pr-10 bg-amber-500 shadow-inner shadow-amber-400 hover:bg-transparent hover:outline hover:outline-1 hover:text-amber-500 hover:shadow-none">
                      Meer informatie
                    </Button>
                  </div>
                </Link>
                <div className="w-full space-y-6">
                  <div className="">
                    <div className="flex space-x-5">
                      <div className="">
                        <CheckCircle className="text-sm w-5 h-5 text-amber-500" />
                      </div>
                      <div className="">
                        <p className="text-sm">Binnen één minuut geregelt</p>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex space-x-5">
                      <div className="">
                        <CheckCircle className="text-sm w-5 h-5 text-amber-500" />
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

export default ImageTextTwo;
