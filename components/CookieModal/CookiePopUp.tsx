"use client";

import React, { useState, useEffect } from "react";
import CookieModal from "./CookieModal";

const COOKIE_STORAGE_KEY = "cookieConsent";

const CookiePopUp: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!savedConsent) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, "accepted");
    setShowPopup(false);
  };

  const handleManagePreferences = () => {
    setShowModal(true);
    setShowPopup(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, "custom");
    setShowModal(false);
  };

  const handleRejectPreferences = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, "rejected");
    setShowModal(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, "rejected");
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed bottom-4 left-4 z-50 max-w-xs w-full rounded-xl bg-white shadow-xl">
          <div className="relative p-6">
            <button
              className="absolute top-0  pl-4 pr-4 rounded-bl-xl rounded-tr-xl right-0 font-thin bg-gray-200 text-gray-700 text-5xl"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h3 className="text-[18px] font-medium  font-sans text-black pt-6 mb-5">
              We gebruiken cookies,
              <br /> wil je dat?
            </h3>
            <p className="text-[13px] font-light text-gray-600 leading-relaxed mb-5">
              Cookies zijn kleine tekstbestanden met informatie erin. Die
              plaatsen we kort op je apparaat. Zo zien we bijvoorbeeld welke
              pagina’s je zag, waar je afhaakte en wat je invulde. Op die manier
              hebben wij informatie waar we jouw websitebezoek beter mee maken.
              Handig toch? Natuurlijk kies je zelf of je dat toestaat. Daar zijn
              we eerlijk over. Klik op “Cookie instellingen”, vind meer
              informatie en beheer je voorkeuren.
            </p>
            <div className="flex justify-start font-sans items-center gap-4 text-[12px] py-1 font-medium">
              <button
                onClick={handleManagePreferences}
                className="text-black underline text-[12px]  underline-offset-2 hover:text-[#1a1a1a]"
              >
                Cookie instellingen
              </button>
              <button
                onClick={handleRejectAll}
                className="text-black underline text-[12px] underline-offset-2 hover:text-[#1a1a1a]"
              >
                Cookies weigeren
              </button>
            </div>
          </div>
          <button
            onClick={handleClosePopup}
            className="w-full py-3 text-center font-sans text-[13px] rounded-b-xl text-green-600 font-semibold bg-green-100 hover:bg-green-200 transition-colors duration-300"
          >
            Ga akkoord
          </button>
        </div>
      )}

      {showModal && (
        <CookieModal
          onClose={handleSavePreferences}
          onReject={handleRejectAll}
          showPreferences={true}
          onManage={handleManagePreferences}
          onSavePreferences={handleSavePreferences}
          onRejectPreferences={handleRejectPreferences}
        />
      )}
    </>
  );
};

export default CookiePopUp;
