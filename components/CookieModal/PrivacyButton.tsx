"use client";

import React, { useState } from "react";
import Image from "next/image";
import CookieModal from "./CookieModal";

function PrivacyButton() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <div onClick={handleOpenModal}>
          <Image
            src="/svg/privacy.svg"
            alt=""
            width={1000}
            height={1000}
            className="w-6 cursor-pointer"
          />
        </div>
      </div>

      {showModal && (
        <CookieModal
          onClose={handleCloseModal}
          onReject={handleCloseModal}
          showPreferences={false}
          onManage={() => {}}
          onSavePreferences={handleCloseModal}
          onRejectPreferences={handleCloseModal}
        />
      )}
    </>
  );
}

export default PrivacyButton;
