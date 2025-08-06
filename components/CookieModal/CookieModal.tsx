import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Props {
  onClose: () => void;
  onReject: () => void;
  showPreferences: boolean;
  onManage: () => void;
  onSavePreferences: () => void;
  onRejectPreferences: () => void;
}

const CookieModal: React.FC<Props> = ({
  onClose,
  onReject,
  showPreferences,
  onManage,
  onSavePreferences,
  onRejectPreferences,
}) => {
  const [marketing, setMarketing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [functional, setFunctional] = useState(false);

  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    const marketingConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("marketing="))
      ?.split("=")[1];
    const analyticsConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("analytics="))
      ?.split("=")[1];
    const functionalConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("functional="))
      ?.split("=")[1];

    if (marketingConsent === "true") setMarketing(true);
    if (analyticsConsent === "true") setAnalytics(true);
    if (functionalConsent === "true") setFunctional(true);
  }, []);

  const handleSavePreferences = () => {
    document.cookie = `marketing=${marketing}; path=/; max-age=2592000; SameSite=Strict; Secure`;
    document.cookie = `analytics=${analytics}; path=/; max-age=2592000; SameSite=Strict; Secure`;
    document.cookie = `functional=${functional}; path=/; max-age=2592000; SameSite=Strict; Secure`;

    onSavePreferences();
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="fixed z-50 inset-0 bg-black/40 flex items-end px-4 py-4">
      <div className="bg-white text-black w-full max-w-sm sm:max-w-md md:max-w-xl rounded-2xl shadow-xl relative">
        {showPreferences && (
          <>
            <button
              className="absolute top-0  pl-4 pr-4 rounded-bl-xl rounded-tr-xl right-0 font-thin bg-gray-200 text-gray-700 text-5xl"
              onClick={onClose}
            >
              &times;
            </button>
            <h2 className="text-2xl font-sans p-6 pt-10 font-semibold mb-3">
              Cookie instellingen
            </h2>
            <p className="text-gray-700 font-light text-[13px] p-6 pt-0 mb-5">
              We gebruiken cookies om u een betere browse-ervaring te bieden,
              siteverkeer te analyseren, inhoud te personaliseren en gerichte
              advertenties te tonen. Klik op de verschillende categoriekknoppen
              voor meer informatie. U kunt ook uw cookievoorkeuren wijzigen.
              Houd er rekening mee dat het blokkeren van bepaalde soorten
              cookies van invloed kan zijn op uw ervaring op onze website en de
              diensten die we kunnen aanbieden.
            </p>
            <div className="flex space-x-6 p-6 pt-0 text-sm font-medium underline mb-6">
              <button
                onClick={() => {}}
                className="hover:text-black font-sans text-[12px]"
              >
                Privacy verklaring
              </button>
              <button
                onClick={onRejectPreferences}
                className="hover:text-black font-sans text-[12px]"
              >
                Cookies weigeren
              </button>
            </div>

            <div className="space-y-4 p-6 pt-0 pb-20 text-sm">
              {[
                {
                  key: "essential",
                  label: "Essentiële cookies",
                  value: true,
                  disabled: true,
                  description:
                    "Essentiële cookies helpen om een website bruikbaar te maken door basisfuncties zoals paginanavigatie en toegang tot beveiligde delen van de website mogelijk te maken. Zonder deze cookies kan de website niet goed functioneren.",
                },
                {
                  key: "functional",
                  label: "Functionele cookies",
                  value: functional,
                  setter: setFunctional,
                  description:
                    "Functionele cookies maken het mogelijk om informatie te onthouden die de manier waarop de website zich gedraagt of eruitziet, verandert, zoals uw voorkeurstaal of de regio waarin u zich bevindt.",
                },
                {
                  key: "analytics",
                  label: "Analytische cookies",
                  value: analytics,
                  setter: setAnalytics,
                  description:
                    "Analytische cookies helpen website-eigenaren te begrijpen hoe bezoekers omgaan met websites door anoniem informatie te verzamelen en te rapporteren.",
                },
                {
                  key: "marketing",
                  label: "Advertentie cookies",
                  value: marketing,
                  setter: setMarketing,
                  description:
                    "Marketingcookies worden gebruikt om bezoekers te volgen wanneer ze verschillende websites bezoeken. Hun doel is om advertenties weer te geven die zijn toegesneden op en relevant zijn voor de individuele gebruiker en daarmee waardevoller zijn voor uitgevers en externe adverteerders.",
                },
              ].map(({ key, label, value, setter, disabled, description }) => (
                <div key={key} className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleSection(key)}
                      className="font-bold font-sans text-[12.5px]"
                    >
                      {label}
                    </button>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={value}
                        disabled={disabled}
                        onChange={setter ? () => setter(!value) : undefined}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  {openSection === key && (
                    <p className="mt-2 text-[13px] text-gray-700 font-light leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={onSavePreferences}
                className="w-1/2 text-white bg-gray-400 py-3 rounded-bl-2xl font-bold font-sans text-[12.5px]"
              >
                Instellingen opslaan
              </button>
              <button
                onClick={handleSavePreferences}
                className="w-1/2 text-green-800 bg-green-100 py-3.5 rounded-br-2xl font-bold font-sans text-[12.5px]"
              >
                Accepteer alle cookies
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CookieModal;
