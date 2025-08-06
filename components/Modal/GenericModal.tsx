"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FiX, FiAlertCircle } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

export const GenericModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8 backdrop-blur-sm cursor-pointer overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-zinc-900 text-white shadow-2xl"
          >
            {/* Grote achtergrond icoon */}
            <FiAlertCircle className="absolute -top-24 -left-24 text-[250px] text-white/10 rotate-12 z-0" />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white opacity-60 hover:opacity-100 z-10"
              onClick={() => setIsOpen(false)}
              aria-label="Sluit modal"
            >
              <FiX size={24} />
            </button>

            <div className="flex flex-col md:flex-row z-10 border border-zinc-700 rounded-md overflow-hidden">
              {/* Video links */}
              <div className="md:w-1/2 w-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[200px] md:h-full object-cover"
                >
                  <source src="/video/Kersvers-overons.mp4" type="video/mp4" />
                  Jouw browser ondersteunt deze video niet.
                </video>
              </div>

              {/* Content rechts */}
              <div className="p-6 md:p-10 md:w-1/2 w-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                    {title}
                  </h3>
                  <div className="text-sm md:text-base leading-relaxed">
                    {children}
                  </div>
                </div>
                <div className="mt-10">
                  <Link href="/contact#contactgegevens">
                    <button className="w-full py-3 px-6 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition">
                      Pakket bestellen
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
