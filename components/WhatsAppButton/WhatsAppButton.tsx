"use client";

import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { useEffect, useState } from "react";

const WhatsAppButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const phone = "31618891346";
  const message = encodeURIComponent(
    "Hallo Beterlease.nl, ik heb interesse en zou graag meer informatie willen ontvangen."
  );
  const whatsappLink = `https://wa.me/${phone}?text=${message}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 15000); // 15 seconden

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Popup boven de knop */}
      {showPopup && (
        <div className="fixed bottom-20 right-4 z-50  text-[14px] font-base bg-white shadow-lg border px-3.5 py-2 rounded-xl text-black animate-fade-in-up">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-gray-300 hover:bg-gray-400 text-white rounded-full w-5 h-5 text-xl flex items-center justify-center"
            aria-label="Sluiten"
          >
            &times;
          </button>
          ChatBot Liz
        </div>
      )}

      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 bg-green-500 shadow-inner shadow-[#6aff82] text-white rounded-full transition-colors duration-300"
        aria-label="Stuur een WhatsApp naar Beterlease.nl"
      >
        {/* Rode badge */}
        <div className="absolute top-0 left-0 -mt-1 -ml-1">
          <div className="relative w-5 h-5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold shadow">
              1
            </span>
          </div>
        </div>

        {/* WhatsApp icoon */}
        <BsWhatsapp className="w-10 h-10 p-1" />
      </Link>

      {/* Animatieklasse */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;
