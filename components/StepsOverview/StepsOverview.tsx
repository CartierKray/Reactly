import Image from "next/image";
import React from "react";
import TextBetweenSix from "../TextBetween/TextBetweenSix";
import Link from "next/link";
import RolexIntro from "../RolexSection/RolexIntro";

const steps = [
  {
    title: "1. Contact",
    description:
      "Laat je gegevens achter. Wij nemen binnen 24 uur contact met je op.",
    icon: "/svg/contact.svg",
  },
  {
    title: "2. Afspraak",
    description: "Bespreek je wensen met een expert voor jouw ideale auto.",
    icon: "/svg/calendar.svg",
  },
  {
    title: "3. Advies",
    description:
      "Onze specialist adviseert op maat, afgestemd op jouw situatie.",
    icon: "/svg/handshake.svg",
  },
  {
    title: "4. Voorstel",
    description:
      "Je ontvangt een helder voorstel dat perfect aansluit bij jouw wensen.",
    icon: "/svg/contract.svg",
  },
  {
    title: "5. Start",
    description:
      "Wij starten direct, zodat jij snel kunt genieten van je droomauto.",
    icon: "/svg/checkmark.svg",
  },
];

const StepsOverview: React.FC = () => {
  return (
    <>
      <div className=" mx-auto px-6 pb-20 xl:pb-28">
        <div className="flex flex-wrap justify-center gap-6 mt-5 md:mt-10">
          {steps.map((step, index) => (
            <div key={index} className="w-full sm:w-[300px] lg:w-[290px] h-fit">
              <div className="relative bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-lg transition">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-b from-[#0f2d23] to-[#1e3a2e] shadow-inner shadow-[#448470] rounded-2xl flex items-center justify-center p-4">
                  <Image
                    src={step.icon}
                    alt={`${step.title} icon`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a2e] mt-6">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StepsOverview;
