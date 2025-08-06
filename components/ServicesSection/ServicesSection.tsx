"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Customizing",
    subtitle: "Auto geheel naar wens",
    description: `Bij Van Bruggen Automotive maken wij uw auto uniek, precies zoals ú dat wilt. 
    Van opvallende exterieurstyling, zoals speciale velgen of een sportieve bodykit, tot het uitbreiden van opties – alles is mogelijk.`,
    image: "/images/customizing.jpg", // <-- pas je eigen pad aan
  },
  {
    title: "Detailing",
    subtitle: "Uw auto weer zo goed als nieuw",
    description: `Met onze professionele detailing krijgt uw auto de aandacht die het verdient. 
    Van grondige reiniging tot aan interieur en lakcorrecties om uw auto eruit te laten zien als nieuw.`,
    image: "/images/detailing.jpg",
  },
  {
    title: "Leasen",
    subtitle: "Zakelijk of privé financieren",
    description: `Samen met onze leasepartners bieden wij flexibele oplossingen voor zowel zakelijk als privé. 
    Rijd uw droomauto zonder zorgen met de leaseopties van Van Bruggen Automotive.`,
    image: "/images/leasen.jpg",
  },
  {
    title: "Onderhoud",
    subtitle: "Onderhoud is behoud",
    description: `Wij bieden uitgebreide onderhoudsservices gericht op betrouwbaarheid, veiligheid en rijplezier. 
    Alleen originele onderdelen en deskundige monteurs voor uw auto.`,
    image: "/images/onderhoud.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#f8f7f5] py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-10`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2 h-[320px] relative rounded-lg overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2 space-y-6">
              <p className="text-xs uppercase tracking-wider text-[#c2a77d] font-semibold">
                {service.subtitle}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                {service.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
              <Link
                href="/contact"
                className="inline-block mt-4 bg-[#c2a77d] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#b3986c] transition"
              >
                Contact opnemen
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
