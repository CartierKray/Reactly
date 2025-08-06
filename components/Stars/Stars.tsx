"use client";

import React, { useEffect, useState } from "react";

interface StarsProps {
  number?: number;
}

export const Stars: React.FC<StarsProps> = ({ number = 180 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getRandomColor = () => {
    const colors = ["#ffffff", "#ffe9c4", "#cceeff", "#aaccff", "#fff1cc"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const stars = new Array(number).fill(true);

  return (
    <>
      {stars.map((_, idx) => {
        const size = Math.random() * 1.6 + 0.6;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 4 + 3;
        const delay = Math.random() * 6;
        const blur = Math.random() * 1.2;
        const zIndex = Math.floor(Math.random() * 3);

        return (
          <span
            key={`star-${idx}`}
            className="absolute rounded-full star-glow animate-twinkle"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: getRandomColor(),
              opacity: Math.random() * 0.4 + 0.6,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              filter: `blur(${blur}px)`,
              zIndex,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};
