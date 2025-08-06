import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ModalComponent from "../Modal/ModalComponent";

export interface Service {
  name: string;
  price: number;
}

interface CardProps {
  title: string;
  imageSrc: string;
  services: Service[];
  onSelectionChange: (total: number) => void;
}

const containerVariants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      opacity: { duration: 0.3, delay: 0.6 }, // Voeg een delay toe voor de opacity animatie
      scaleY: { duration: 0.3, delay: 0.6 }, // Voeg een delay toe voor de scaleY animatie
    },
  },
};

const buttonVariants = {
  hidden: {
    y: -64, // Verticale positie, equivalent aan -mt-16 in Tailwind
    marginBottom: 0, // Start zonder extra marge onderaan
  },
  visible: {
    y: 0, // Beweeg naar de standaard verticale positie
    marginBottom: 25, // Voeg een marge onderaan toe, equivalent aan mb-10 in Tailwind
    transition: {
      type: "spring",
      stiffness: 100,
      delay: 0.6, // Start na de animatie van andere componenten
      marginBottom: { duration: 0.3 }, // Stel een duur in voor de marge-animatie
    },
  },
};

export const Card: React.FC<CardProps> = ({
  title,
  imageSrc,
  services,
  onSelectionChange,
}) => {
  const [selectedServices, setSelectedServices] = useState<
    Record<string, boolean>
  >({});
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [cardTotal, setCardTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotal = useCallback(() => {
    return services.reduce(
      (acc, service) =>
        acc + (selectedServices[service.name] ? service.price : 0),
      0
    );
  }, [services, selectedServices]);

  useEffect(() => {
    const newTotal = calculateTotal();
    if (newTotal !== cardTotal) {
      // Voeg deze check toe om onnodige updates te voorkomen
      setCardTotal(newTotal);
      onSelectionChange(newTotal);
    }
  }, [calculateTotal, cardTotal, onSelectionChange]);

  const toggleService = (service: Service) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service.name]: !prev[service.name],
    }));
  };

  const handleRequestSubmit = () => {
    // Logica om de modal te openen met de juiste gegevens
    setIsModalOpen(true);
  };

  const selectedServicesList = services.filter(
    (service) => selectedServices[service.name]
  ); // Maak een lijst van geselecteerde diensten om door te geven aan de modal

  return (
    <>
      <div className="outline outline-1 scale-90 outline-zinc-400/5 rounded-lg overflow-hidden shadow-lg bg-white z-10">
        {/* Afbeeldingscontainer */}
        <Image
          width={1000}
          height={1000}
          className="mx-auto w-auto object-cover mt-8 md:mt-16 mb-4 md:mb-9 h-20"
          src={imageSrc}
          alt="Type"
        />
        {/* Titel en lijst met diensten */}
        <div className="px-3 w-full">
          <div className="font-semibold text-center text-2xl tracking-normal mb-2 bg-clip-text text-transparent bg-black">
            {title}
          </div>

          <hr className="w-16 border-gray-300 rounded-3xl mx-auto justify-center m-8 mt-8" />
          <ul className="list-reset">
            {services.map((service) => (
              <li
                key={service.name}
                className={`flex justify-between mb-[13px] p-3 items-center my-2 px-3 ${
                  selectedServices[service.name]
                    ? "outline outline-1 outline-green-600/75 rounded-3xl"
                    : "hover:outline hover:outline-1 rounded-3xl hover:outline-green-600/75"
                }`}
                onClick={() => toggleService(service)}
                onMouseEnter={() => setHoveredService(service.name)} // Voeg deze regel toe
                onMouseLeave={() => setHoveredService(null)} // Voeg deze regel toe
              >
                <div className="flex items-center">
                  {/* Verborgen checkbox input */}
                  <input
                    id={`checkbox-${service.name}`}
                    type="checkbox"
                    checked={!!selectedServices[service.name]}
                    readOnly
                    className="hidden"
                  />
                  {/* Aangepaste check rondje */}
                  <label
                    htmlFor={`checkbox-${service.name}`}
                    className="flex items-center cursor-pointer"
                  >
                    <div
                      className={`rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                        selectedServices[service.name]
                          ? "bg-green-500"
                          : "border-[1px] border-green-600/75"
                      }`}
                    >
                      {selectedServices[service.name] ? (
                        <svg
                          className="fill-current text-white -mt-0.5 w-4 h-4"
                          viewBox="0 0 20 20"
                        >
                          <path d="M7.629 14.571L3.822 10.822l-1.414 1.414 5.221 5.142 9.885-9.814-1.413-1.415z" />
                        </svg>
                      ) : null}
                    </div>
                  </label>
                  <span
                    className={`transition-all duration-300 ease-in-out ${
                      selectedServices[service.name] ||
                      hoveredService === service.name
                        ? "pl-3 font-semibold text-black"
                        : "text-black pl-3 text-[15.5px] font-extralight"
                    }`}
                  >
                    {service.name}
                  </span>
                </div>
                {/* Pas de tekststijl aan voor de prijs */}
                <span
                  className={`transition-all duration-200 ease-in-out ${
                    selectedServices[service.name] ||
                    hoveredService === service.name
                      ? " font-semibold text-black"
                      : "text-gray-400 text-sm  font-extralight"
                  }`}
                >
                  €{service.price}
                </span>
              </li>
            ))}
          </ul>
          <motion.div
            className="m-2"
            initial="hidden"
            animate={cardTotal > 0 ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <hr
              className={`mt-6 border-gray-300 transition-transform duration-300 ease-in-out  ${
                cardTotal > 0 ? "block" : "hidden"
              }`}
            />
          </motion.div>
          <motion.div
            className="text-center flex justify-between pt-6 font-bold"
            initial="hidden"
            animate={cardTotal > 0 ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <p className="text-[22px] scale-90 px-1.5 text-zinc-400/60 pt-1 pb-4 tracking-widest">
              TOTAAL
            </p>
            <p className="text-[25px] px-1.5">€ {cardTotal.toFixed(0)}</p>
          </motion.div>
          <motion.div
            className=" py-5"
            initial="hidden"
            animate={cardTotal > 0 ? "visible" : "hidden"}
            variants={buttonVariants}
          >
            <button
              onClick={handleRequestSubmit}
              className={`${
                cardTotal > 0
                  ? "bg-green-600/85 hover:bg-transparent hover:text-green-500 hover:outline hover:outline-[1.5px] hover:outline-green-500"
                  : "bg-gray-200/50 text-gray-300 cursor-not-allowed"
              } pt-2.5 pb-2.5 text-white font-semibold tracking-wider rounded-full w-full`}
              disabled={cardTotal === 0}
            >
              {/* VRIJBLIJVEND AANVRAGEN */}
              AANVRAGEN
            </button>
          </motion.div>
        </div>
      </div>

      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          selectedCard={{ title, imageSrc }} // Hier geef je de titel en afbeeldingsbron door
          selectedServices={selectedServicesList} // De lijst met geselecteerde diensten
        />
      )}
    </>
  );
};
