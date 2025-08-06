"use client";

import { useEffect, useState } from "react";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButtonThree";
import AIChatBot from "../AIChatbot.tsx/AIChatBox";

export default function ChatWrapper() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showHelperPopup, setShowHelperPopup] = useState(false);

  useEffect(() => {
    if (!isChatOpen) {
      const timer = setTimeout(() => {
        setShowHelperPopup(true);
      }, 15000); // wacht 15s tot popup terugkomt
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setShowHelperPopup(false);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <AIChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      <WhatsAppButton
        triggerChatbot={handleOpenChat}
        hideChatbot={handleCloseChat} // ✅ correct meegegeven
        showPopup={showHelperPopup}
      />
    </>
  );
}
