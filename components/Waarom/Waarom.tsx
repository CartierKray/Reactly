import Image from "next/image";
import Link from "next/link";
import React from "react";

function Waarom() {
  return (
    <>
      <Link href="/contact#contactgegevens">
        <div
          className="outline-1 cursor-pointer lg:-mt-10  hover:text-white
     transition duration-300 ease-in-out w-full p-5 md:p-10 rounded-2xl shadow-sm pt-16 pb-16"
        >
          <div className="flex justify-between">
            <div className="">
              <div className="text-2xl md:text-4xl font-semibold mb-16">
                Waarom klanten kiezen voor
                <br className="block md:hidden" /> Chronomatic
              </div>
            </div>
            <div className="xl:-mt-5">
              <Image
                src="/images/klantenvertellen-1.png"
                alt=""
                width={1000}
                height={1000}
                className="h-fit w-20 object-cover"
              />
            </div>
          </div>
          <div className="xl:flex space-y-16 lg:gap-10">
            {/* 1e */}
            <div className="">
              <div className="mt-1.5">
                <i className="svg-icon icon-large">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <path
                        d="M30.718 44H21m37.3-3.834c.774-.642.93-1.78.345-2.597-1.253-1.745-2.292-2.16-6.645.129L43.326 43c-2.651 1.409-9.607 1-12.608 1 0 0 7.082.48 4.256-3.739-1.405-2.098-3.83-3.289-6.355-3.289h-3.901c-2.274 0-4.517-.676-6.332-2.045C14.149 31.733 6 38 6 38v18h14c1.997 0 3.992-.151 5.966-.451L39 53.567c.445 0 .877-.052 1.295-.145l.02-.003c1.055-.148 2.019-.682 2.789-1.419L58.3 40.166zM1 59h5V35H1zm16-12c0-2.211 1.789-3 4-3"
                        strokeLinecap="round"
                      ></path>
                      <path d="M31.933 7.413c1.478-3.334 4.748-6.412 8.678-6.412 5.294 0 9.344 4.111 9.823 9.245 0 0 .259 1.274-.31 3.568-.776 3.124-2.599 5.9-5.056 8.018L32.35 32.715a.277.277 0 0 1-.362 0L19.272 21.831c-2.458-2.117-4.28-4.894-5.056-8.018-.569-2.294-.31-3.568-.31-3.568C14.386 5.112 17.96 1 23.254 1c3.93 0 7.2 3.079 8.678 6.413z"></path>
                    </g>
                  </svg>
                </i>
                <h3 className="pb-4 pt-5 font-semibold">Betrouwbaar</h3>
              </div>
              <div className="max-w-xl">
                <p>
                  Service is meer dan problemen oplossen. Je kunt rekenen op
                  proactief, eerlijk advies. Op het moment dat jouw situatie
                  erom vraagt.
                </p>
              </div>
            </div>
            {/* 2e */}
            <div className="">
              <div className="xl:-mt-16 xl:pt-1">
                <i className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    className="stroke-current"
                  >
                    <g fill="none" strokeWidth="2" strokeLinejoin="round">
                      <g transform="translate(-720 -402)translate(720 403)">
                        <path d="M12.8 29L11.3 29C10 29 9 28 9 26.8L9 19.3C9 18 10 17 11.3 17L12.8 17C14 17 15 18 15 19.3L15 26.8C15 28 14 29 12.8 29L12.8 29Z"></path>
                        <polygon points="34 53 26 53 30 44"></polygon>
                        <polygon points="25 58 26 53 34 53 35 58"></polygon>
                        <path d="M19.3 38.1L19 38 18 42 26 53 30 44C25.8 44 22 41.6 19.3 38.1L19.3 38.1Z"></path>
                        <path d="M40.7 38.1C38 41.6 34.2 44 30 44L34 53 42 42 41 38 40.7 38.1 40.7 38.1Z"></path>
                        <path d="M56.6 49.7C51.1 46.8 45.8 44.6 41 44L40.5 44 34 53 35 58 34.6 58 34.6 58 59 58 59 53.7C59 52 58.1 50.5 56.6 49.7L56.6 49.7Z"></path>
                        <path d="M19.5 44L19 44C14.2 44.6 8.9 46.8 3.4 49.7 1.9 50.5 1 52 1 53.7L1 58 25 58 26 53 19.5 44 19.5 44Z"></path>
                        <polygon points="25 58 25.4 58 25.4 58"></polygon>
                        <path d="M47.3 29L48.8 29C50 29 51 28 51 26.8L51 19.3C51 18 50 17 48.8 17L47.3 17C46 17 45 18 45 19.3L45 26.8C45 28 46 29 47.3 29L47.3 29Z"></path>
                        <path d="M48 17C48 3.9 38.7 0 30 0 21.3 0 12 3.9 12 17"></path>
                        <path d="M15 19C15 10.7 21.7 4 30 4 38.3 4 45 10.7 45 19L45 26C45 34.8 38.3 44 30 44 21.7 44 15 34.8 15 26L15 19 15 19Z"></path>
                        <path d="M48 29C48 33.4 45.3 37 31 37"></path>
                      </g>
                    </g>
                  </svg>
                </i>
                <h3 className="pb-4 pt-5 font-semibold">Betrokken</h3>
              </div>
              <div className="max-w-xl">
                <p>
                  Jouw huis energie efficiënt maken. Daar helpen we graag bij.
                  Iedere dag weer, en altijd met oprechte aandacht.
                </p>
              </div>
            </div>
            {/* 3e */}
            <div className="">
              <div className="xl:-mt-16">
                <i className="">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.72"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M39 34.1H27M39 42.1H28M34 50.1h-7M13 57.1c-2-.7-2.4-2.7-3-5.1"
                      ></path>
                      <path d="M10 31.1c1.1-1.4 1.8-2.7 3-4"></path>
                      <path
                        strokeLinejoin="round"
                        d="M34 58c2.2 0 4-1.8 4-4s-1.8-4-4-4h5c2.2 0 4-1.8 4-4s-1.8-4-4-4h4c2.2 0 4-1.8 4-4s-1.8-4-4-4h-4 16c2.2 0 4-1.8 4-4s-1.8-4-4-4H29l2.7-1.8c3.5-2 5.1-6.8 3.9-10L35 13c-.8-1.2-1.7-1-2-1-.3 0-6.1 5.7-12 9 0 0-4.7 2.9-8 6h-3c-5 0-9 4-9 9v10c0 3.9 3.3 7.9 7.1 8.8.9.2 2.2.6 2.9 1.2 1 .9 3.5 2 7 2h16zM45.1 14.6l10-12.4M40 13.2L41.7 2M47.1 19.1l11.4-3"
                      ></path>
                    </g>
                  </svg>
                </i>
                <h3 className="pb-4 pt-5 font-semibold">Simpel</h3>
              </div>
              <div className="max-w-xl">
                <p>
                  Snel en eenvoudig je gewenste energielabel of energie services
                  regelen. Dat is het gemak bij Energie sticker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Waarom;
