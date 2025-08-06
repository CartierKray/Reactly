"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beamsTwo";

export function BackgroundBeamsDemo() {
  return (
    <div className=" w-full rounded-md mt-40 mb-10 bg-white dark:bg-black p-10 xl:pb-40 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-5xl md:text-7xl mb-5 bg-clip-text text-transparent bg-gradient-to-b from-black to-text-neutral-700 dark:from-neutral-200 dark:to-neutral-600 text-center font-sans font-bold">
          Join the{" "}
          <a className="bg-gradient-to-b from-neutral-400 to-emerald-500 bg-clip-text text-transparent dark:from-neutral-200 dark:to-neutral-600">
            {" "}
            community
          </a>
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p>
        <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border p-2.5 dark:border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-200 border-neutral-300 dark:bg-neutral-950 placeholder:text-neutral-700"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}
