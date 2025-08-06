import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@headlessui/react";
import FooterSectionSM from "@/components/Footer/SWFooter";
import VideoBannerEleven from "@/components/VideoBanner/VideoBannerEleven";
import FadeInWhenVisible from "@/components/FadeInWhenVisible/FadeInWhenVisible";

function AlgemeneVoorwaardenPage() {
  return (
    <>
      <VideoBannerEleven />

      <FadeInWhenVisible delay={0.1}>
        <div className="w-full bg-gradient-to-b from-[#171719]  to-[#2d3033] h-fit text-white">
          <div className="grid lg:grid-cols-2 items-center lg:pt-20 py-16 px-5 md:px-12 lg:px-20">
            {/* Image Section */}
            <div className="relative max-h-[100%] lg:gap-y-10 grid pb-8 lg:pb-0 w-full">
              <Image
                src="/svg/BeterLeaseSVGTwo.svg" // ✅ Correct pad
                alt="Algemene Voorwaarden"
                width={1000}
                height={1000}
                className=" object-cover"
              />
              <Image
                src="/images/1920x1080_forest.avif" // ✅ Correct pad
                alt="Algemene Voorwaarden"
                width={1000}
                height={1000}
                className=" object-cover pt-8 lg:pt-0"
              />
            </div>

            {/* Content Section */}
            <div className="lg:order-2 flex flex-col justify-center items-start lg:items-center bg-transparent">
              <div className="max-w-2xl lg:max-w-xl flex flex-col justify-center items-start p-5 xl:p-0">
                <div className="pl-1 pb-5 lg:pl-12 text-white">
                  <h2 className="text-4xl font-semibold">
                    <span className="text-[#c2b293]">Algemene Voorwaarden</span>
                  </h2>

                  <p className="mt-5 max-w-md md:max-w-xl mb-8">
                    Door gebruik te maken van BeterLease.nl ga je akkoord met
                    onze algemene voorwaarden en de disclaimer. Deze voorwaarden
                    zijn van toepassing op alle transacties en diensten.
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-2">
                    {[
                      "Toepasselijkheid op alle overeenkomsten",
                      "Duidelijke annuleringsvoorwaarden",
                      "Transparante bemiddelingskosten",
                      "Betalingstermijn en incassoregels",
                    ].map((point, index) => (
                      <p key={index} className="flex items-center space-x-2">
                        <CheckCircle className="text-green-500 w-5 h-5" />
                        <span>{point}</span>
                      </p>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="mt-6">
                    Wil je de volledige voorwaarden lezen? Download hieronder
                    het document of neem contact met ons op.
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
                    <a
                      href="/docs/Algemene voorwaarden BeterLease.nl B.V..pdf"
                      download="Algemene_Voorwaarden.pdf"
                      className="rounded-3xl tracking-wider px-6 py-3 bg-[#c2b293] shadow-inner shadow-[#e3d1ac] hover:shadow-none text-white text-center"
                    >
                      Download PDF
                    </a>

                    <Link href="/contact#contactgegevens">
                      <Button className="rounded-3xl tracking-wider px-6 py-3 bg-transparent shadow-inner  hover:bg-transparent outline hover:outline-1 hover:outline-[#c2b293] hover:shadow-none w-full">
                        Contact opnemen
                      </Button>
                    </Link>
                  </div>

                  {/* Disclaimer Section */}
                  <div className="mt-10 border-t border-gray-700 pt-5">
                    <h3 className="text-2xl font-semibold text-[#c2b293]">
                      Disclaimer
                    </h3>
                    <p className="mt-4">
                      Door deze website te bekijken en de daarop geboden
                      informatie te gebruiken, verklaar je akkoord te zijn met
                      deze Disclaimer. Het gebruik van deze website is voor
                      eigen risico.
                    </p>
                    <p className="mt-4 text-sm text-gray-400">
                      BeterLease.nl kan niet aansprakelijk worden gesteld voor
                      fouten, onvolledige informatie of wijzigingen in de
                      voorwaarden. Controleer regelmatig de nieuwste versie van
                      de voorwaarden.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <FooterSectionSM />
      </FadeInWhenVisible>
    </>
  );
}

export default AlgemeneVoorwaardenPage;
