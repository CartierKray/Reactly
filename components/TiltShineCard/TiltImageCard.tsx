"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const ROTATION_RANGE = 30;

export const TiltImageCard = ({ image }: { image: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 80, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 80, damping: 15 });
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const rotateX = (offsetY / height - 0.5) * -ROTATION_RANGE;
    const rotateY = (offsetX / width - 0.5) * ROTATION_RANGE;

    x.set(rotateX);
    y.set(rotateY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="w-[300px] sm:w-[340px] aspect-square"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform }}
        className="relative w-full h-full rounded-2xl overflow-visible group"
      >
        {/* Gloed achter de afbeelding */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-48 h-48 rounded-full blur-3xl scale-150 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out shadow-2xl bg-sky-500" />
        </div>

        {/* Afbeelding */}
        <Image
          src={image}
          alt="Tilted"
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-2xl relative z-10"
        />
      </motion.div>
    </div>
  );
};
