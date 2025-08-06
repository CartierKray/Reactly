import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ModalComponentTwo from "../Modal/ModalComponentTwo";
import ServiceSelectionModal from "../Modal/ServiceSelectionModal"; // nieuwe modal

export interface Service {
  name: string;
  price: number;
}

interface CardTwoProps {
  title: string;
  imageSrc: string;
  services: Service[];
  onSelectionChange: (total: number) => void;
}

export const CardTwo: React.FC<CardTwoProps> = ({
  title,
  imageSrc,
  services,
  onSelectionChange,
}) => {
  const [selectedServices, setSelectedServices] = useState<
    Record<string, boolean>
  >({});
  const [cardTotal, setCardTotal] = useState(0);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

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

  const selectedServicesList = services.filter(
    (service) => selectedServices[service.name]
  );

  return (
    <>
      <div
        onClick={() => setIsSelectionModalOpen(true)}
        className="bg-white dark:shadow-inner dark:bg-[#282828] dark:shadow-[#444444] dark:outline-none outline outline-[#f2f2f2] rounded-2xl shadow-md transition-all duration-300 outline-1 scale-90 max-w-xs mx-auto w-full  overflow-hidden  z-10 cursor-pointer hover:scale-95"
      >
        <Image
          width={1000}
          height={10000}
          className="p-10 h-48"
          src={imageSrc}
          alt="Type"
        />

        <div className="font-semibold sm:text-2xl text-center tracking-normal bg-clip-text dark:text-white text-black bg-black">
          {title}
        </div>

        <hr className="w-16 border-gray-300 rounded-3xl mx-auto justify-center m-6" />
      </div>

      {/* Tussenmodal voor servicekeuze */}
      <ServiceSelectionModal
        isOpen={isSelectionModalOpen}
        setIsOpen={setIsSelectionModalOpen}
        title={title}
        services={services}
        selectedServices={selectedServices}
        toggleService={toggleService}
        hoveredService={hoveredService}
        setHoveredService={setHoveredService}
        cardTotal={cardTotal}
        onNext={() => setIsFinalModalOpen(true)}
      />

      {/* Finale modal */}
      {isFinalModalOpen && (
        <ModalComponentTwo
          isOpen={isFinalModalOpen}
          setIsOpen={setIsFinalModalOpen}
          selectedCard={{ title, imageSrc }}
          selectedServices={selectedServicesList}
        />
      )}
    </>
  );
};
