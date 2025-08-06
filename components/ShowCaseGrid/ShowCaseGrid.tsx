"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const ROTATION_RANGE = 35;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;
const PERSPECTIVE = "1500px";
interface ShowcaseItem {
  title: string;
  category: string;
  thumbnail: string;
  video: string;
  link: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: "Transmit",
    category: "Podcast website",
    thumbnail: "/images/thumbnail-musc.png",
    video: "/video/transmit.mp4",
    link: "https://transmit.tailwindui.com",
  },
  {
    title: "OC Home",
    category: "Product Website",
    thumbnail: "/images/thumbnail-ochome.png",
    video: "/ochome.mov",
    link: "https://www.wealthfront.com",
  },
  {
    title: "Pocket",
    category: "Fintech website",
    thumbnail: "/images/thumbnail-pocket.png",
    video: "/video/pocket.mp4",
    link: "https://www.wealthfront.com",
  },
  {
    title: "CacheAdvance",
    category: "Documentatie website",
    thumbnail: "/images/thumbnail-cache.png",
    video: "/video/cacheadvance.mp4",
    link: "https://www.wealthfront.com",
  },
  {
    title: "Wealthfront",
    category: "Makelaar website",
    thumbnail: "/images/thumbnail-wander.png",
    video: "/video/wander.com.mp4",
    link: "https://www.wealthfront.com",
  },
  {
    title: "BeterLease.nl",
    category: "Autodealer website",
    thumbnail: "/images/Thumbnail-BeterLease.nl.png",
    video: "/video/BeterLease.nl.mov",
    link: "https://www.wealthfront.com",
  },
  {
    title: "Transmit",
    category: "Podcast website",
    thumbnail: "/images/thumbnail-musc.png",
    video: "/video/transmit.mp4",
    link: "https://transmit.tailwindui.com",
  },
  {
    title: "OC Home",
    category: "Product Website",
    thumbnail: "/images/thumbnail-ochome.png",
    video: "/ochome.mov",
    link: "https://www.wealthfront.com",
  },
];
export default function ShowcaseGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={`relative max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16 transition-all duration-500 ${
          expanded
            ? "max-h-[5000px]"
            : "max-h-[1000px] xl:max-h-full overflow-hidden"
        }`}
      >
        {showcaseItems.map((item, index) => (
          <TiltCard
            key={index}
            item={item}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}

        {!expanded && (
          <div className="absolute bottom-0 xl:hidden left-0 w-full  pointer-events-none">
            <div className="h-52 bg-gradient-to-t from-white dark:from-[#121212] to-transparent flex justify-center items-end pb-6 pointer-events-auto">
              <button
                onClick={() => setExpanded(true)}
                className="bg-black text-white dark:bg-white dark:text-black px-8 py-2 rounded-lg shadow-md text-sm font-medium transition hover:scale-105"
              >
                Meer zien
              </button>
            </div>
          </div>
        )}
      </div>

      {expanded && (
        <div className="flex justify-center xl:hidden mt-6">
          <button
            onClick={() => setExpanded(false)}
            className="bg-black text-white dark:bg-white dark:text-black px-8 py-2 rounded-lg shadow-md text-sm font-medium transition hover:scale-105"
          >
            Minder zien
          </button>
        </div>
      )}
    </div>
  );
}

interface TiltCardProps {
  item: ShowcaseItem;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}

function TiltCard({
  item,
  index,
  hoveredIndex,
  setHoveredIndex,
}: TiltCardProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 20 });
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / rect.height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / rect.width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: PERSPECTIVE }} className="w-full">
      <motion.a
        ref={ref}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-start"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => {
          setHoveredIndex(null);
          handleMouseLeave();
        }}
        onMouseMove={handleMouseMove}
        style={{ transform }}
      >
        <div className="relative w-full aspect-[14/10] overflow-hidden rounded-xl shadow-lg">
          {hoveredIndex === index ? (
            <video
              src={item.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              width={1000}
              height={1000}
              src={item.thumbnail}
              alt={item.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}
        </div>
        <div className="mt-3">
          <h3 className="text-black text-lg dark:text-white font-medium leading-tight">
            {item.title}
          </h3>
          <p className="text-sm text-black/50 dark:text-white/50 mt-1">
            {item.category}
          </p>
        </div>
      </motion.a>
    </div>
  );
}
