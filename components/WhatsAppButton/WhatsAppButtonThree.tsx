"use client";

import React, { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

interface WhatsAppButtonThreeProps {
  triggerChatbot: () => void;
  hideChatbot: () => void;
  showPopup: boolean;
}

const WhatsAppButtonThree: React.FC<WhatsAppButtonThreeProps> = ({
  triggerChatbot,
  hideChatbot,
  showPopup,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const phone = "31618891346";
  const message = encodeURIComponent(
    "Hallo Beterlease.nl, ik heb interesse en zou graag meer informatie willen ontvangen."
  );
  const whatsappLink = `https://wa.me/${phone}?text=${message}`;

  const handleClick = () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next) {
      triggerChatbot(); // now safe
    } else {
      hideChatbot(); // now safe
    }
  };

  return (
    <>
      {/* Chat knop */}
      <div
        className="fixed bottom-4 right-4 z-50 bg-[#0057FF]  shadow-inner shadow-[#0080ff] rounded-full w-14 h-14 flex items-center justify-center cursor-pointer transition hover:scale-105"
        onClick={handleClick}
      >
        <div className="absolute top-0 left-0 -mt-1 -ml-1">
          <div className="relative w-5 h-5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold shadow">
              1
            </span>
          </div>
        </div>
        {isOpen ? (
          // Pijl omlaag
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M7 10l5 5 5-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Chat icoon
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 28 32"
            width="24"
            height="28"
          >
            <path
              d="M28,32 C28,32 23.2863266,30.1450667 19.4727818,28.6592 L3.43749107,28.6592 C1.53921989,28.6592 0,27.0272 0,25.0144 L0,3.6448 C0,1.632 1.53921989,0 3.43749107,0 L24.5615088,0 C26.45978,0 27.9989999,1.632 27.9989999,3.6448 L27.9989999,22.0490667 L28,22.0490667 L28,32 Z M23.8614088,20.0181333 C23.5309223,19.6105242 22.9540812,19.5633836 22.5692242,19.9125333 C22.5392199,19.9392 19.5537934,22.5941333 13.9989999,22.5941333 C8.51321617,22.5941333 5.48178311,19.9584 5.4277754,19.9104 C5.04295119,19.5629428 4.46760991,19.6105095 4.13759108,20.0170667 C3.97913051,20.2124916 3.9004494,20.4673395 3.91904357,20.7249415 C3.93763774,20.9825435 4.05196575,21.2215447 4.23660523,21.3888 C4.37862552,21.5168 7.77411059,24.5386667 13.9989999,24.5386667 C20.2248893,24.5386667 23.6203743,21.5168 23.7623946,21.3888 C23.9467342,21.2215726 24.0608642,20.9827905 24.0794539,20.7254507 C24.0980436,20.4681109 24.0195551,20.2135019 23.8614088,20.0181333 Z"
              fill="white"
            />
          </svg>
        )}
      </div>

      {/* WhatsApp knop met badge */}
      {/* {showPopup && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-20 z-50 flex items-center justify-center w-14 h-14 bg-green-500 shadow-inner shadow-[#6aff82] text-white rounded-full transition-colors duration-300"
          aria-label="Stuur een WhatsApp naar Beterlease.nl"
        >
          <div className="absolute top-0 left-0 -mt-1 -ml-1">
            <div className="relative w-5 h-5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
              <span className="relative inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold shadow">
                1
              </span>
            </div>
          </div>
          <BsWhatsapp className="w-10 h-10 p-1" />
        </a>
      )} */}
    </>
  );
};

export default WhatsAppButtonThree;
