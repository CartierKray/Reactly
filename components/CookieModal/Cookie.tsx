"use client";

import { useState, useEffect } from "react";
import CookieModal from "./CookieModal";

export default function Cookie() {
  const [cookieConsent, setCookieConsent] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const cookieConsentValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieConsent="))
      ?.split("=")[1];

    if (cookieConsentValue !== "true") {
      setCookieConsent(true);
    }
  }, []);

  const handleCookieAccept = () => {
    document.cookie =
      "cookieConsent=true; path=/; max-age=2592000; SameSite=Strict; Secure"; // 30 dagen
    setCookieConsent(false);
    setShowPreferences(false);
  };

  const handleCookieReject = () => {
    document.cookie =
      "cookieConsent=false; path=/; max-age=2592000; SameSite=Strict; Secure"; // 30 dagen
    setCookieConsent(false);
    setShowPreferences(false);
  };

  const handleManagePreferences = () => {
    setShowPreferences(true);
  };

  return (
    <>
      {cookieConsent && (
        <CookieModal
          onClose={handleCookieAccept}
          onReject={handleCookieReject}
          showPreferences={showPreferences}
          onManage={handleManagePreferences}
          onSavePreferences={handleCookieAccept}
          onRejectPreferences={handleCookieReject}
        />
      )}
    </>
  );
}
