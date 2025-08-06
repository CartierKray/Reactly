"use client";

import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Image from "next/image";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import Link from "next/link";
import { toast } from "../ui/use-toast";
import ContactSectionThree from "../ContactSection/ContactSectionThree";

const ContactFormTwo = () => {
  const formRef = useRef<HTMLFormElement>(null); // ✅ Ref om het formulier te resetten
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_acr1dXX", // Jouw Service ID
        "template_196x1XX", // Jouw Template ID
        formData,
        "K5wMHhtMWmcGoCuXX" // Jouw User ID
      );

      // ✅ Succes Toast
      toast({
        title: "Bericht verzonden!",
        description: "We nemen zo snel mogelijk contact met je op.",
      });

      // ✅ Reset formulier via useRef (voor het resetten van native velden)
      if (formRef.current) {
        formRef.current.reset();
      }

      // ✅ Reset formulier state
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      // ❌ Foutmelding Toast
      toast({
        title: "Fout bij verzenden",
        description: "Er is iets misgegaan. Probeer het later opnieuw.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      id="contactgegevens"
      className="bg-white py-10 pb-8 w-full dark:bg-transparent text-black lg:flex items-center justify-center relative"
    >
      <div className="w-full rounded-lg lg:justify-center items-center  p-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 w-full z-10"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="pb-3">
              <div className="text-black dark:text-white pb-2.5 uppercase text-[12.5px] font-semibold">
                Naam <a className="text-red-500">*</a>
              </div>
              <input
                type="text"
                name="name"
                placeholder="Naam *"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="bg-white p-3 rounded text-black w-full outline outline-1 outline-gray-400"
              />
            </div>
            <div className="pb-3">
              <div className="text-black dark:text-white pb-2.5 uppercase text-[12.5px] font-semibold">
                Bedrijf / KvK <a className="text-red-500">*</a>
              </div>
              <input
                type="text"
                name="company"
                placeholder="Bedrijf / KvK"
                value={formData.company}
                onChange={handleInputChange}
                className="bg-white p-3 rounded text-black w-full outline outline-1 outline-gray-400"
              />
            </div>
            <div className="pb-3">
              <div className="text-black dark:text-white pb-2.5 uppercase text-[12.5px] font-semibold">
                E-mail <a className="text-red-500">*</a>
              </div>
              <input
                type="email"
                name="email"
                placeholder="E-mailadres *"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white p-3 rounded text-black w-full outline outline-1 outline-gray-400"
              />
            </div>
            <div className="pb-3">
              <div className="text-black pb-2.5 dark:text-white uppercase text-[12.5px] font-semibold">
                Telefoon <a className="text-red-500">*</a>
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Telefoonnummer"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-white p-3 rounded text-black w-full outline outline-1 outline-gray-400"
              />
            </div>
          </div>
          <div className="pb-3">
            <div className="text-black pb-2.5 dark:text-white uppercase text-[12.5px] font-semibold">
              Onderwerp <a className="text-red-500">*</a>
            </div>
            <select
              name="subject"
              required
              onChange={handleSelectChange}
              value={formData.subject}
              className="bg-white p-3 rounded text-black w-full outline outline-1 outline-gray-400"
            >
              <option value="">Kies een onderwerp</option>
              <option value="Offerte aanvragen">
                Ik wil een offerte aanvragen
              </option>
              <option value="Technische vraag">
                Ik heb een technische vraag
              </option>
              <option value="Technische vraag">
                Ik heb een vraag over leasen
              </option>
              <option value="Technische vraag">
                Heb ik jaar cijfers nodig voor leasen?
              </option>
              <option value="Technische vraag">
                Kan ik leasen als ik een negatieve BKR heb?
              </option>
              <option value="Anders">Anders</option>
            </select>
          </div>
          <div className="pb-3">
            <div className="text-black pb-2.5 dark:text-white uppercase text-[12.5px] font-semibold">
              Je bericht <a className="text-red-500">*</a>
            </div>
            <textarea
              name="message"
              placeholder="Je bericht"
              required
              value={formData.message}
              onChange={handleInputChange}
              className="bg-[white] p-3 rounded text-black w-full h-32 outline outline-1 outline-gray-400"
            ></textarea>
          </div>
          <div className="text-[12.5px] dark:text-white pb-3">
            <span className="text-[#f00]">*</span>Je persoonsgegevens gebruiken
            wij alleen voor het gevraagde contact. Lees de{" "}
            <span className="hover:underline hover:cursor-pointer">
              privacyverklaring
            </span>{" "}
            voor meer informatie.
          </div>

          <button
            type="submit"
            className=" w-full tracking-wide text-xs md:text-[12.5px] whitespace-nowrap uppercase  mb-2 rounded dark:bg-white dark:text-black dark:hover:bg-green-600 dark:hover:shadow-green-500 dark:hover:text-white dark:shadow-none dark:hover:shadow-inner dark bg-[#c2b293] shadow-inner shadow-[#e3d1ac] text-white backdrop-blur-sm hover:shadow-green-500 hover:bg-green-600 font-medium py-3 px-8 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
          >
            Bericht Versturen
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormTwo;
