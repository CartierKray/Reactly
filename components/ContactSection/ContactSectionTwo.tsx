"use client";

import Image from "next/image";

export default function ContactSection() {
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 pb-20 md:pb-48">
      <div className="flex flex-wrap justify-center gap-y-12 md:gap-x-16 bg-slate-100 p-6 md:py-12 rounded-[2.25rem] shadow">
        {/* Contactgegevens */}
        <div className="w-full md:max-w-[40%] xl:max-w-[16.5rem] flex flex-col items-start gap-4">
          <Image
            src="/svg/contact-two.svg"
            alt="contact"
            className="h-16 w-16 my-6"
            width={1000}
            height={1000}
          />
          <h3 className="text-2xl font-semibold text-slate-800">
            Contactgegevens
          </h3>
          <div className="h-1 w-32 bg-slate-300 my-4" />
          <div className="flex gap-2 items-start">
            <Image
              src="/svg/pin.svg"
              alt="pin"
              className="h-5 w-5 mt-1"
              width={1000}
              height={1000}
            />
            <span className="text-slate-500 leading-snug">
              Oude Enghweg 2,
              <br />
              1217 JC Hilversum
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src="/svg/mail.svg"
              alt="mail"
              className="h-5 w-5"
              width={1000}
              height={1000}
            />
            <a
              href="mailto:contact@schoonmaakwoede.nl"
              className="text-slate-500 hover:text-blue-700 transition-colors duration-150"
            >
              contact@schoonmaakwoede.nl
            </a>
          </div>
        </div>

        {/* Bedrijfsgegevens */}
        <div className="w-full md:max-w-[40%] xl:max-w-[16.5rem] flex flex-col items-start gap-4">
          <Image
            src="/svg/information.svg"
            alt="informatie"
            className="h-16 w-16 my-6"
            width={1000}
            height={1000}
          />
          <h3 className="text-2xl font-semibold text-slate-800">
            Bedrijfsgegevens
          </h3>
          <div className="h-1 w-32 bg-slate-300 my-4" />
          <div className="flex gap-2 items-start">
            <span className="font-semibold text-slate-800">Ma-vr:</span>
            <span className="text-slate-500">08:00 - 17:00 uur</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-semibold text-slate-800">Zaterdag:</span>
            <span className="text-slate-500">Gesloten</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-semibold text-slate-800">Zondag:</span>
            <span className="text-slate-500">Gesloten</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-semibold text-slate-800">KvK-nummer:</span>
            <span className="text-slate-500">67451438</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-semibold text-slate-800">BTW-nummer:</span>
            <span className="text-slate-500">NL856999441.B01</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-semibold text-slate-800">Bank:</span>
            <span className="text-slate-500">NL44RABO0302969063</span>
          </div>
        </div>

        {/* Bel ons */}
        <div className="w-full md:max-w-[40%] xl:max-w-[16.5rem] flex flex-col items-start gap-4">
          <Image
            src="/svg/customer-service.svg"
            alt="klantenservice"
            className="h-16 w-16 my-6"
            width={1000}
            height={1000}
          />
          <h3 className="text-2xl font-semibold text-slate-800">Bel ons</h3>
          <div className="h-1 w-32 bg-slate-300 my-4" />
          <div className="flex gap-2 items-center">
            <Image
              src="/svg/tel.svg"
              alt="tel"
              className="h-5 w-5"
              width={1000}
              height={1000}
            />
            <a
              href="tel:0854000085"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-150"
            >
              085 - 400 00 85 (lokaal tarief)
            </a>
          </div>
          <div className="flex gap-2 items-start">
            <Image
              src="/svg/tel.svg"
              alt="tel"
              className="h-5 w-5 mt-1"
              width={1000}
              height={1000}
            />
            <a
              href="tel:+31208203509"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-150"
            >
              +31 (0)20 820 3509
              <br />
              (buitenland)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
