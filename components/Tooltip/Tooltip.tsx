"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "/images/tooltip-1.avif",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "/images/tooltip-2.avif",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "/images/tooltip-3.avif",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image: "/images/tooltip-4.avif",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image: "/images/tooltip-5.avif",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image: "/images/tooltip-6.avif",
  },
];

export default function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
