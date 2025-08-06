"use client";

import { FiClock } from "react-icons/fi";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import Image from "next/image";

export default function ContactSectionFour() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Verzenden...");

    try {
      await emailjs.send(
        "service_XXX", // <-- JOUW EmailJS service ID
        "template_XXX", // <-- JOUW EmailJS template ID
        {
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          message: form.message,
          time: new Date().toLocaleString("nl-NL"),
        },
        "rxJ06t8Tnk3U6eXXX" // <-- JOUW EmailJS public key
      );

      setStatus("✅ Bericht succesvol verzonden");
      setForm({ name: "", email: "", company: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Er is iets misgegaan");
    }
  };

  return (
    <div className="w-full px-4 py-10 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 border p-6">
        {/* Formulier */}
        <div className="col-span-1 border p-4">
          <h2 className="font-semibold mb-4 text-sm">CONTACT FORMULIER</h2>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Uw naam"
              value={form.name}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 text-sm focus:outline-none"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Uw e-mail"
              value={form.email}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 text-sm focus:outline-none"
              required
            />
            <input
              name="company"
              type="text"
              placeholder="Bedrijfsnaam (optioneel)"
              value={form.company}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 text-sm focus:outline-none"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Uw telefoonnummer"
              value={form.phone}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 text-sm focus:outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Uw bericht..."
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="border rounded-md px-4 py-2 text-sm focus:outline-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-[#F0A500] hover:bg-[#e09500] text-white font-semibold py-2 rounded-md text-sm mt-2"
            >
              VERZENDEN
            </button>
            <p className="text-sm text-gray-500 mt-2">{status}</p>
          </form>
        </div>

        {/* Contactgegevens */}
        <div className="col-span-1 border p-4">
          {/* <h2 className="font-semibold mb-4 text-sm">CONTACT</h2> */}
          <div className="text-sm space-y-1">
            <div className="pb-3">
              <Image
                src={"/svg/Transperent SVG.svg"}
                alt="eerlijk-leasen"
                width={100}
                height={100}
                className="h-6 w-auto"
              />
            </div>
            <p>Bedrijfsweg 7A</p>
            <p>3411NV LOPIK</p>
            <Link href="tel:+31657348876">
              <p className="text-sm pt-1 pb-1">
                Telefoon:{" "}
                <span className="text-amber-600 font-semibold">
                  +31 6 57 34 88 76
                </span>
              </p>
            </Link>
            <Link
              href="https://wa.me/31657348876?text=Hoi%20Team%20Eerlijk%20Leasen%2C%20ik%20heb%20een%20vraag%20over%20het%20zakelijk%20financieren%20van%20mijn%20nieuwe%20auto"
              target="_blank"
            >
              <p className="text-sm pb-1">
                Whatsapp:{" "}
                <span className="text-amber-600 font-semibold">
                  +31 6 57 34 88 76
                </span>
              </p>
            </Link>
            <Link href="mailto:info@eerlijk-leasen.nl">
              <p>
                E-mail:{" "}
                <span className="font-bold">info@eerlijk-leasen.nl</span>
              </p>
            </Link>
          </div>
        </div>

        {/* Openingstijden */}
        <div className="col-span-1 border p-4">
          <h2 className="font-semibold mb-4 text-sm">OPENINGSTIJDEN</h2>
          <div className="space-y-2 text-sm">
            {[
              "Maandag",
              "Dinsdag",
              "Woensdag",
              "Donderdag",
              "Vrijdag",
              "Zaterdag",
              "Zondag",
            ].map((day) => (
              <div
                key={day}
                className="flex justify-between items-center border-b pb-1"
              >
                <div className="flex items-center gap-2">
                  <FiClock className="text-xs" />
                  <span>{day}:</span>
                </div>
                <span>10:00 - 21:00</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] pt-4">
            Wij zijn dagelijks geopend! Plan vooraf een afspraak om zeker te
            zijn van toegang en onnodig wachten te voorkomen.
          </p>
        </div>
      </div>
    </div>
  );
}
