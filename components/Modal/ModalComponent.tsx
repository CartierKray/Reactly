import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Service } from "../Cards/Cards";
import emailjs from "emailjs-com";
import { useToast } from "../ui/use-toast";

interface ModalComponentProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedCard: {
    title: string;
    imageSrc: string;
  };
  selectedServices: Service[];
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  setIsOpen,
  selectedCard,
  selectedServices,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    date: "",
    message: "",
    servicesList: "",
  });
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const { toast } = useToast();

  const totalinclBTW = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0
  );
  const total = selectedServices.reduce(
    (sum, service) => sum + service.price,
    -25
  );

  useEffect(() => {
    if (isSubmitting) {
      emailjs
        .send(
          "service_jbun1zjXX",
          "template_hv7f0nqXX",
          formData,
          "hpba3FnfFgqJ4qsKRXX"
        )
        .then(
          () => {
            setIsSubmitSuccessful(true);
            setIsSubmitting(false);
          },
          () => {
            toast({
              title: "Foutmelding",
              description:
                "Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het opnieuw.",
              duration: 5000,
            });
            setIsSubmitting(false);
          }
        );
    }
  }, [formData, isSubmitting, setIsOpen, toast]);

  const handleCheckboxChange = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  const formatServicesForEmail = () => {
    return selectedServices
      .map((service) => `${service.name}: €${service.price}`)
      .join("\n");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.address.match(/.*\d.*/)) {
      toast({
        title: "Ongeldig adres",
        description: "Voer een volledig adres in, inclusief huisnummer.",
        duration: 5000,
      });
      return;
    }
    const servicesFormatted = formatServicesForEmail();
    setFormData((prevFormData) => ({
      ...prevFormData,
      servicesList: servicesFormatted,
    }));
    setIsSubmitting(true);
  };

  const ListItems = [
    "U krijgt over een paar minuten een bevestigingmail over uw aanvraag bij Energie sticker ",
    "Een van onze adviseurs zal uw aanvraag in behandeling nemen, en contact met u opnemen.",
    "Alles is geregeld. u kunt achterover leunen. wij doen de rest!",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 p-4 bg-[#123728] backdrop-blur-md bg-opacity-50 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="bg-white p-5 relative mx-auto rounded-lg max-w-5xl w-full md:p-8 my-16"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 pl-4 pr-4 rounded-bl-xl rounded-tr-md right-0 font-thin bg-gray-200 text-gray-700 text-5xl"
            >
              &times;
            </button>
            {isSubmitSuccessful ? (
              <div className="text-start p-10 pt-20 pb-20">
                <div className="flex justify-between">
                  <h2 className="md:text-3xl font-bold text-gray-900 mb-5">
                    <span>Bedankt voor uw vertrouwen in BeterLease.nl! </span>
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className=" hover:opacity-75 -mt-10 md:-mt-5 text-black transition-colors"
                  >
                    <span className="sr-only">Sluiten</span>
                    &#x2715;
                  </button>
                </div>
                <p>
                  Uw aanvraag is succesvol verzonden. Wij nemen zo snel mogelijk
                  contact met u op.
                </p>
                <div className="flex mt-10 flex-col gap-2">
                  {ListItems.map((item, index) => (
                    <div key={index} className="flex items-center mt-5 gap-6 ">
                      <div className="bg-green-500 text-white p-2 rounded-full w-8 h-8 flex justify-center items-center">
                        {index + 1}
                      </div>
                      <span className="">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between pt-5 items-start">
                  <div>
                    <div className="">
                      <h2 className="text-3xl tracking-wide font-semibold text-gray-900 mb-6">
                        <span>
                          Financial lease aanvraag{" "}
                          <br className="block md:hidden" /> voor een{" "}
                        </span>
                        <p className="text-2xl first-letter:capitalize font-medium lowercase pt-3 text-green-500 ">
                          {" "}
                          {selectedCard.title}
                        </p>
                      </h2>
                    </div>
                    <div></div>
                    <h2 className="text-[14px] font-light max-w-md text-gray-900 mb-6">
                      <span className="">
                        Bijna klaar,&nbsp;we moeten wel contact met u kunnen
                        opnemen.{" "}
                      </span>
                    </h2>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 mb-5 w-full">
                  <div className="md:flex justify-center gap-10 w-full">
                    {/* Voeg meer inputvelden toe volgens je afbeelding */}
                    <div className="w-full">
                      <label className="text-base font-semibold text-gray-700">
                        Uw gegevens
                      </label>
                      <div className="mt-3">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="E-mailadres*"
                          className="w-full pt-2.5 pb-2.5 pl-3 placeholder:font-extralight placeholder:text-black outline outline-1 outline-black/75 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Naam*"
                          className="w-full pt-2.5 pb-2.5 pl-3 placeholder:font-extralight placeholder:text-black outline outline-1 outline-black/75 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="pt-6 pb-2.5">
                        <label className="text-base font-semibold text-gray-700">
                          Gegevens voor maken afspraak keuring
                        </label>
                      </div>

                      <div className="mt-3">
                        <input
                          type="number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="Telefoonnummer"
                          className="w-full pt-2.5 pb-2.5 pl-3 placeholder:font-extralight placeholder:text-black outline outline-1 outline-black/75 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          placeholder="Adres te keuren woning"
                          className="w-full pt-2.5 pb-2.5 pl-3 placeholder:font-extralight placeholder:text-black outline outline-1 outline-black/75 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          placeholder="Postcode"
                          className="w-full pt-2.5 pb-2.5 pl-3 placeholder:font-extralight placeholder:text-black outline outline-1 outline-black/75 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder="Plaats"
                          className="w-full pt-2.5 pb-2.5 pl-3 placeholder:font-extralight placeholder:text-black outline outline-1 outline-black/75 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="pt-6 pb-2.5">
                        <label className="text-base font-semibold text-gray-700">
                          Heeft u een voorkeur voor een datum?
                        </label>
                      </div>
                      <div className="mt-3">
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          placeholder="Selecteer een datum"
                          className="w-full pt-2.5 pb-2.5 pl-3 pr-3 placeholder:font-extralight placeholder:text-black outline outline-1 outline-black/75 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="pt-6 pb-2.5">
                        <label className="text-base font-semibold text-gray-700">
                          Heeft u een opmerking?
                        </label>
                      </div>
                      <div className="mt-3">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={(event) =>
                            handleChange(
                              event as unknown as React.ChangeEvent<HTMLInputElement>
                            )
                          }
                          placeholder="Opmerkingen"
                          className="w-full pt-2.5 pb-2.5 pl-3 pr-3 placeholder:font-extralight placeholder:text-black outline outline-1 outline-black/75 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="flex items-center mt-4">
                        <input
                          id="termsCheckbox"
                          type="checkbox"
                          checked={isTermsAccepted}
                          onChange={handleCheckboxChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="termsCheckbox"
                          className="flex items-center cursor-pointer"
                        >
                          <div
                            className={`rounded-full w-6 h-6 p-1 -pt-[1px] ${
                              isTermsAccepted
                                ? "bg-green-500"
                                : "border-2 border-green-500"
                            }`}
                          >
                            {isTermsAccepted && (
                              <svg
                                className="fill-current text-white w-4 h-4 "
                                viewBox="0 0 20 20"
                              >
                                <path d="M7.629 14.571L3.822 10.822l-1.414 1.414 5.221 5.142 9.885-9.814-1.413-1.415z" />
                              </svg>
                            )}
                          </div>
                          <span className="ml-4 mt-4 pt-6 text-black leading-[20px] text-[14px] font-light max-w-[310px]">
                            Wanneer u het formulier verstuurt dan gaat u
                            automatisch akkoord met onze{" "}
                            <a href="" className="underline text-sky-500">
                              {" "}
                              algemene voorwaarden{" "}
                            </a>
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Overzicht sectie */}
                    <div className="rounded-2xl h-fit mt-10 md:mt-0 bg-neutral-100/50 w-full p-5">
                      <h3 className="text-md font-semibold pt-2 text-gray-900">
                        Overzicht
                      </h3>
                      <dl className="mt-4 space-y-4 w-full">
                        {selectedServices.map((service) => (
                          <div
                            key={service.name}
                            className="flex mt-10 justify-between"
                          >
                            <dt className="text-sm text-black font-extralight">
                              {service.name}
                            </dt>
                            <dd className="text-sm text-black font-extralight">
                              €{service.price}
                            </dd>
                          </div>
                        ))}
                        <div className=" flex justify-between border-t border-gray-200 pt-4">
                          <dt className="text-black font-extralight mt-20">
                            Totaal incl. BTW
                          </dt>
                          <dd className=" text-black font-extralight pt-20">
                            €{totalinclBTW}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className=" text-green-500 font-semibold">
                            PakketKorting
                          </dt>
                          <dd className=" font-semibold text-green-500">
                            - €25
                          </dd>
                        </div>
                        <div className="flex justify-between border-t border-black "></div>
                        <div className="flex justify-between  pt-2 pb-2">
                          <dt className="text-lg font-semibold text-gray-900">
                            U komt uit op
                          </dt>
                          <dd className="text-lg font-semibold text-black">
                            €{total}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  {/* Submit button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting} // Disable the button while submitting
                      className="w-full md:w-1/2 bg-green-600/85 hover:bg-transparent hover:text-green-500 hover:outline hover:outline-[1.5px] hover:outline-green-500 pt-2.5 pb-2.5 text-white font-semibold tracking-wider rounded-full"
                    >
                      {isSubmitting ? "Bezig met versturen..." : "Versturen"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalComponent;
