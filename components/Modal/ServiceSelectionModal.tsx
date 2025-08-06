import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Service } from "../Cards/Cards";

const containerVariants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      opacity: { duration: 0.3, delay: 0.6 },
      scaleY: { duration: 0.3, delay: 0.6 },
    },
  },
};

const buttonVariants = {
  hidden: {
    y: -64,
    marginBottom: 0,
  },
  visible: {
    y: 0,
    marginBottom: 25,
    transition: {
      type: "spring",
      stiffness: 100,
      delay: 0.6,
      marginBottom: { duration: 0.3 },
    },
  },
};

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  services: Service[];
  selectedServices: Record<string, boolean>;
  toggleService: (service: Service) => void;
  hoveredService: string | null;
  setHoveredService: (name: string | null) => void;
  cardTotal: number;
  onNext: () => void;
}

const ServiceSelectionModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  title,
  services,
  selectedServices,
  toggleService,
  hoveredService,
  setHoveredService,
  cardTotal,
  onNext,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="bg-white relative max-w-lg w-full rounded-lg shadow-xl px-5 overflow-y-auto max-h-[95vh]"
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.85 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 pt-10 w-full">
              <button className="absolute top-0 pl-4 pr-4 rounded-bl-xl rounded-tr-md right-0 font-thin bg-gray-200 text-gray-700 text-5xl">
                &times;
              </button>
              <div className="pt-2">
                <h2 className="text-2xl tracking-wide font-semibold text-gray-900 mb-6">
                  <span>
                    Offerte aanvraag <br className="block md:hidden" /> voor{" "}
                  </span>
                  <p className="text-2xl first-letter:capitalize font-medium pt-0.5 lowercase  text-green-500 ">
                    {" "}
                    {title}
                  </p>
                  <p className="text-sm font-normal py-5">
                    Selecteer van welke diensten je gebruik wilt maken
                  </p>
                </h2>
              </div>

              {/* <hr className="w-16 border-gray-300 rounded-3xl mx-auto justify-center m-8 mt-8" /> */}

              <ul className="list-reset">
                {services.map((service) => (
                  <li
                    key={service.name}
                    className={`flex justify-between  mb-[13px] p-3 items-center my-2 px-3 ${
                      selectedServices[service.name]
                        ? "outline outline-1 outline-green-600/75 rounded-3xl"
                        : "hover:outline hover:outline-1 rounded-3xl hover:outline-green-600/75"
                    }`}
                    onClick={() => toggleService(service)}
                    onMouseEnter={() => setHoveredService(service.name)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <div className="flex items-center">
                      <input
                        id={`checkbox-${service.name}`}
                        type="checkbox"
                        checked={!!selectedServices[service.name]}
                        readOnly
                        className="hidden"
                      />
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
                          {selectedServices[service.name] && (
                            <svg
                              className="fill-current text-white -mt-0.5 w-4 h-4"
                              viewBox="0 0 20 20"
                            >
                              <path d="M7.629 14.571L3.822 10.822l-1.414 1.414 5.221 5.142 9.885-9.814-1.413-1.415z" />
                            </svg>
                          )}
                        </div>
                      </label>
                      <span
                        className={`transition-all  duration-300 ease-in-out ${
                          selectedServices[service.name] ||
                          hoveredService === service.name
                            ? "pl-3 font-semibold text-sm text-black"
                            : "text-black pl-3 text-sm font-extralight"
                        }`}
                      >
                        {service.name}
                      </span>
                    </div>
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
                  className={`mt-6 border-gray-300 transition-transform duration-300 ease-in-out ${
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
                className="px-4 z-50 py-5"
                initial="hidden"
                animate={cardTotal > 0 ? "visible" : "hidden"}
                variants={buttonVariants}
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNext();
                  }}
                  className={`${
                    cardTotal > 0
                      ? "bg-green-600/85 z-50 hover:bg-transparent hover:text-green-500 hover:outline hover:outline-[1.5px] hover:outline-green-500"
                      : "bg-gray-200/50 z-50 text-gray-300 cursor-not-allowed"
                  } pt-2.5 pb-2.5 text-white z-50 font-semibold tracking-wider rounded-full w-full`}
                  disabled={cardTotal === 0}
                >
                  VRIJBLIJVEND AANVRAGEN
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceSelectionModal;
