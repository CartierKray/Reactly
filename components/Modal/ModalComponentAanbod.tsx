import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useToast } from "../ui/use-toast";
import { Service } from "../Cards/CardsLease";
import Image from "next/image";

interface ModalComponentAanbodProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedCard: {
    title: string;
    imageSrc: string;
    price: number;
    km?: string;
    fuel?: string;
    transmission?: string;
    btw?: string;
  };
  selectedServices: Service[];
}

const ModalComponentAanbod: React.FC<ModalComponentAanbodProps> = ({
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
    company: "",
    kvk: "",
    date: "",
    message: "",
    servicesList: "",
  });

  const [investment, setInvestment] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [term, setTerm] = useState(0);
  const [finalTerm, setFinalTerm] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const finalTermRef = useRef<HTMLInputElement>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [step, setStep] = useState(1);
  const [downPaymentInput, setDownPaymentInput] = useState("0");
  const [finalTermInput, setFinalTermInput] = useState("0");
  const { toast } = useToast();

  useEffect(() => {
    setDownPayment(downPaymentInput === "" ? 0 : Number(downPaymentInput));
  }, [downPaymentInput]);

  useEffect(() => {
    if (selectedCard?.price) {
      setInvestment(selectedCard.price);
    }
  }, [selectedCard]);

  const getMaxFinalTermPercentage = (term: number) => {
    if ([12, 24, 36, 48, 60].includes(term)) return 0.25;
    if (term === 72) return 0.15;
    return 0;
  };

  const maxFinalTermPercentage = getMaxFinalTermPercentage(term);
  const maxFinalTermAmount =
    (investment - downPayment) * maxFinalTermPercentage;

  useEffect(() => {
    if (term && investment && downPayment >= 0) {
      setFinalTerm(maxFinalTermAmount);
    }
  }, [term, investment, downPayment, maxFinalTermAmount]);

  useEffect(() => {
    const raw = investment - downPayment;
    let adjustedFinalTerm = finalTerm;

    if (adjustedFinalTerm > maxFinalTermAmount) {
      adjustedFinalTerm = maxFinalTermAmount;
      setFinalTerm(maxFinalTermAmount);
    }

    if (!term || raw <= 0) {
      setCreditAmount(0);
      setMonthly(0);
      return;
    }

    const interest = 0.12 / 12;
    const months = term;
    const annuityFactor =
      (interest * Math.pow(1 + interest, months)) /
      (Math.pow(1 + interest, months) - 1);
    const monthlyPayment = (raw - adjustedFinalTerm) * annuityFactor;

    setCreditAmount(raw);
    setMonthly(Math.round(monthlyPayment));
  }, [investment, downPayment, term, finalTerm, maxFinalTermAmount]);

  useEffect(() => {
    if (isSubmitting) {
      emailjs
        .send(
          "service_jbun1zjXX",
          "template_hv7f0nqXX",
          formData,
          "hpba3FnfFgqJ4qsKRXX"
        )
        .then(() => {
          setIsSubmitSuccessful(true);
          setIsSubmitting(false);
        })
        .catch(() => {
          toast({
            title: "Foutmelding",
            description: "Er is een fout opgetreden bij het verzenden.",
          });
          setIsSubmitting(false);
        });
    }
  }, [formData, isSubmitting, toast]);

  useEffect(() => {
    const parsed = finalTermInput === "" ? 0 : Number(finalTermInput);

    if (parsed > maxFinalTermAmount) {
      setFinalTerm(maxFinalTermAmount);
      setFinalTermInput(String(Math.round(maxFinalTermAmount))); // herstel input
    } else {
      setFinalTerm(parsed);
    }
  }, [finalTermInput, maxFinalTermAmount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address.match(/.*\d.*/)) {
      toast({
        title: "Ongeldig adres",
        description: "Voer een volledig adres in, inclusief huisnummer.",
      });
      return;
    }
    const servicesFormatted = [
      `Maandtermijn: €${monthly}`,
      `Looptijd: ${term} maanden`,
      `Aanbetaling: €${downPayment}`,
      `Slottermijn: €${finalTerm}`,
    ].join("\n");
    setFormData((prev) => ({ ...prev, servicesList: servicesFormatted }));
    setIsSubmitting(true);
  };

  const resetState = () => {
    setStep(1);
    setIsSubmitSuccessful(false);
    setDownPayment(0);
    setTerm(0);
    setFinalTerm(0);
    setMonthly(0);
    setIsOpen(false); // ✅ voeg dit toe
  };

  useEffect(() => {
    setDownPayment(downPaymentInput === "" ? 0 : Number(downPaymentInput));
  }, [downPaymentInput]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 p-4 bg-[#191c1f] backdrop-blur-md bg-opacity-50 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setIsOpen(false);
            resetState();
          }}
        >
          <motion.div
            className="bg-white relative mx-auto rounded-lg max-w-lg lg:max-w-6xl w-full my-16"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation(); // <- voorkomt dat het bubbelt naar de overlay
                setIsOpen(false);
                resetState();
                resetState();
              }}
              className="absolute top-0 pl-4 z-50 pr-4 rounded-bl-xl rounded-tr-md right-0 font-thin bg-gray-200 text-gray-700 text-5xl"
            >
              &times;
            </button>

            {isSubmitSuccessful ? (
              <div className="text-start p-10 pt-20 pb-20">
                <h2 className="text-3xl font-bold mb-6">
                  Bedankt voor uw vertrouwen!
                </h2>
                <p>
                  Uw aanvraag is succesvol verzonden. Wij nemen zo snel mogelijk
                  contact met u op.
                </p>
              </div>
            ) : step === 1 ? (
              <motion.div className="flex justify-between relative">
                {/* Image - alleen op lg + hover */}
                <motion.div className="hidden lg:flex lg:w-1/2 relative">
                  {/* <Image
                    src="/images/1920x1920-audi-q8-tfsi-e-my2021-stage-1445.avif"
                    alt=""
                    fill
                    className="object-cover rounded-l-lg"
                  /> */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full rounded-l-md object-cover"
                  >
                    <source src="/video/BeterLease.nl.mp4" type="video/mp4" />
                    Jouw browser onderst
                  </video>
                </motion.div>

                {/* Form */}
                <motion.div
                  className="w-full lg:w-1/2 px-4 md:p-8 pt-10 md:pt-16 "
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <h2 className="text-2xl lg:text-3xl tracking-wide font-semibold text-gray-900 mb-6">
                    Bereken jouw leasebedrag
                  </h2>

                  <div className="grid gap-5">
                    {/* Investering */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Investering (excl. BTW)*
                      </label>
                      <input
                        type="number"
                        value={investment}
                        readOnly
                        className="w-full bg-gray-100 text-black px-4 py-2 text-sm rounded-2xl border border-gray-300 shadow-sm cursor-not-allowed"
                      />
                    </div>

                    {/* Aanbetaling */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Aanbetaling / inruil
                      </label>
                      <input
                        type="number"
                        value={downPaymentInput}
                        onChange={(e) => setDownPaymentInput(e.target.value)}
                        placeholder="Voer een bedrag in"
                        className="w-full px-4 py-2 text-sm rounded-2xl border bg-gray-100 text-black border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    {/* Looptijd */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Looptijd
                      </label>
                      <select
                        value={term}
                        required
                        onChange={(e) => setTerm(Number(e.target.value))}
                        className="w-full px-4 py-2 text-sm rounded-2xl border bg-gray-100 text-black border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value={0}>Selecteer looptijd</option>
                        {[12, 24, 36, 48, 60, 72].map((m) => (
                          <option key={m} value={m}>
                            {m} maanden
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Slottermijn */}
                    <div>
                      <label className="block text-sm font-medium  text-gray-700 mb-1">
                        Slottermijn (max. {maxFinalTermPercentage * 100}%)
                      </label>
                      <input
                        ref={finalTermRef}
                        type="number"
                        value={finalTermInput}
                        onChange={(e) => setFinalTermInput(e.target.value)}
                        placeholder="Slottermijn in €"
                        className="w-full px-4 py-2 text-sm rounded-2xl border bg-gray-100 text-black border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  {/* Maandtermijn */}
                  <motion.div
                    className="bg-black text-white text-center font-medium text-lg px-4 py-3 rounded-2xl mt-6 shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Uw maandtermijn:&nbsp; €{monthly.toLocaleString()}
                  </motion.div>

                  {/* Volgende stap knop */}
                  <motion.div
                    className="py-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <button
                      onClick={() => {
                        if (term === 0) {
                          toast({
                            title: "Looptijd vereist",
                            description:
                              "Selecteer een looptijd om verder te gaan.",
                          });
                          return;
                        }

                        setStep(2);
                        setFormData((prev) => ({
                          ...prev,
                          servicesList: [
                            `Maandtermijn: €${monthly}`,
                            `Looptijd: ${term} maanden`,
                            `Aanbetaling: €${downPayment}`,
                            `Slottermijn: €${finalTerm}`,
                          ].join("\n"),
                        }));
                      }}
                      className="w-full bg-transparent hover:bg-black text-black outline outline-[1.5px] outline-black pt-3 pb-3 hover:text-white font-semibold tracking-wider rounded-full transition duration-300"
                    >
                      Volgende stap
                    </button>

                    {/* Disclaimer */}
                    <div className="py-8">
                      <p className="text-[11px] sm:text-xs text-gray-500 pb-2.5">
                        * De BTW dient altijd uit eigen middelen voldaan te
                        worden.
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-500">
                        De bovenstaande offerte is onder voorbehoud van
                        tariefwijzigingen en kredietacceptatie. Aan deze
                        berekening kunnen geen rechten worden ontleend. Heeft u
                        na het lezen van deze offerte nog vragen? Neem dan
                        gerust contact met ons op, we beantwoorden graag uw
                        vragen.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="space-y-6 mb-5 p-5 md:p-10 w-full">
                <div>
                  <div className="">
                    <h2 className="text-2xl sm:text-3xl tracking-wide font-semibold text-gray-900 mb-6">
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
                <form onSubmit={handleSubmit}>
                  <div className="lg:flex justify-center gap-10 w-full">
                    {/* Gegevens */}
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
                          className="w-full pt-2.5 pb-2.5 pl-3 outline outline-1 dark:text-black dark:bg-gray-100 dark:outline-gray-300 outline-gray-300 rounded-md"
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
                          className="w-full pt-2.5 pb-2.5 pl-3 outline outline-1  dark:text-black dark:bg-gray-100 dark:outline-gray-300 outline-gray-300 rounded-md"
                        />
                      </div>
                      <div className="pt-6 pb-2.5">
                        <label className="text-base font-semibold text-gray-700">
                          Bedrijfsgegevens
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
                          className="w-full pt-2.5 pb-2.5 pl-3 outline outline-1  dark:text-black dark:bg-gray-100 dark:outline-gray-300 outline-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          placeholder="Adres"
                          className="w-full pt-2.5 pb-2.5 pl-3 outline outline-1  dark:text-black dark:bg-gray-100 dark:outline-gray-300 outline-gray-300 rounded-md"
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
                          className="w-full pt-2.5 pb-2.5 pl-3 outline outline-1  dark:text-black dark:bg-gray-100 dark:outline-gray-300 outline-gray-300 rounded-md"
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
                          className="w-full pt-2.5 pb-2.5 pl-3 outline outline-1  dark:text-black dark:bg-gray-100 dark:outline-gray-300 outline-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          placeholder="Bedrijfsnaam"
                          className="w-full pt-2.5 pb-2.5 pl-3 placeholder:font-extralight  dark:bg-gray-100 dark:outline-gray-300 placeholder:text-black/50 dark:text-black outline outline-1 outline-gray-300 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="text"
                          name="kvk"
                          value={formData.kvk}
                          onChange={handleChange}
                          required
                          placeholder="Kvk-nummer"
                          className="w-full pt-2.5 pb-2.5 pl-3 placeholder:font-extralight dark:text-black dark:bg-gray-100 dark:outline-gray-300 placeholder:text-black/50 outline outline-1 outline-gray-300 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                          onChange={handleChange}
                          placeholder="Opmerkingen"
                          className="w-full pt-2.5 pb-2.5 pl-3 pr-3 outline outline-1  dark:text-black dark:bg-gray-100 dark:outline-gray-300 outline-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center mt-4">
                        <input
                          id="termsCheckbox"
                          type="checkbox"
                          checked={isTermsAccepted}
                          onChange={() => setIsTermsAccepted(!isTermsAccepted)}
                          className="hidden"
                        />
                        <label
                          htmlFor="termsCheckbox"
                          className="flex items-center cursor-pointer"
                        >
                          <div
                            className={`rounded-full w-6 h-6 p-1 ${
                              isTermsAccepted
                                ? "bg-green-500"
                                : "border-2 border-green-500"
                            }`}
                          >
                            {isTermsAccepted && (
                              <svg
                                className="fill-current text-white w-4 h-4"
                                viewBox="0 0 20 20"
                              >
                                <path d="M7.629 14.571L3.822 10.822l-1.414 1.414 5.221 5.142 9.885-9.814-1.413-1.415z" />
                              </svg>
                            )}
                          </div>
                          <span className="ml-4 mt-4 pt-6 text-black leading-[20px] text-[14px] font-light max-w-[310px]">
                            Wanneer u het formulier verstuurt dan gaat u
                            automatisch akkoord met onze{" "}
                            <a
                              href="/algemene-voorwaarden"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-sky-500"
                            >
                              algemene voorwaarden
                            </a>
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Overzicht */}
                    <div className="rounded-2xl h-fit mt-10 md:mt-0 bg-neutral-100/50 w-full p-5">
                      <h3 className="text-md font-semibold pt-2 text-gray-900">
                        Overzicht
                      </h3>

                      <dl className="mt-4 space-y-4 w-full">
                        {/* Auto info */}
                        <div className="flex justify-between font-light">
                          <dt className="text-sm text-black">Model</dt>
                          <dd className="text-sm text-black">
                            {selectedCard.title}
                          </dd>
                        </div>
                        <div className="flex justify-between font-light">
                          <dt className="text-sm  text-black">Transmissie</dt>
                          <dd className="text-sm text-black">
                            {selectedCard.transmission}
                          </dd>
                        </div>
                        <div className="flex justify-between font-light">
                          <dt className="text-sm text-black">Kilometerstand</dt>
                          <dd className="text-sm text-black">
                            {selectedCard.km}
                          </dd>
                        </div>
                        <div className="flex justify-between font-light">
                          <dt className="text-sm text-black">Brandstof</dt>
                          <dd className="text-sm text-black">
                            {selectedCard.fuel}
                          </dd>
                        </div>

                        <div className="flex font-light justify-between mb-6">
                          <dt className="text-sm  text-black">BTW/Marge</dt>
                          <dd className="text-sm text-black">
                            {selectedCard.btw}
                          </dd>
                        </div>

                        {/* Lease info */}
                        <div className="flex justify-between border-t border-gray-300 pt-4">
                          <dt className="text-sm font-light text-black">
                            Aanschafbedrag Excl. BTW
                          </dt>
                          <dd className="text-sm font-light text-black">
                            {" "}
                            €{selectedCard.price}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-light text-black">
                            Aanbetaling
                          </dt>
                          <dd className="text-sm font-light text-black">
                            €{downPayment}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-light text-black">
                            Slottermijn
                          </dt>
                          <dd className="text-sm font-light text-black">
                            €{finalTerm}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-light text-black">
                            Looptijd
                          </dt>
                          <dd className="text-sm font-light text-black">
                            {term} maanden
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm font-light text-black">
                            Leasebedrag
                          </dt>
                          <dd className="text-sm font-light text-black">
                            €{monthly}
                          </dd>
                        </div>
                        <div className="flex justify-between border-t border-gray-300 pt-4">
                          <dt className="text-lg font-semibold text-gray-900">
                            U komt uit op
                          </dt>
                          <dd className="text-lg font-semibold text-black">
                            €{monthly}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-1/2 bg-green-600/85 hover:bg-transparent hover:text-green-500 hover:outline hover:outline-[1.5px] hover:outline-green-500 pt-2.5 pb-2.5 text-white font-semibold tracking-wider rounded-full"
                    >
                      {isSubmitting ? "Bezig met versturen..." : "Versturen"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalComponentAanbod;
