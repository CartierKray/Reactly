"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CleaningInfo from "../StepsOverview/CleaningInfo";

type Stat = {
  label: string;
  value: number;
  isPercentage?: boolean;
};

const stats: Stat[] = [
  { label: "AANBOD VAN AUTO'S", value: 150000 },
  { label: "AUTODEALERS", value: 6814 },
  { label: "BEHANDELDE AANVRAGEN", value: 92496 },
  { label: "SLAGINGSKANS", value: 99.5, isPercentage: true },
];

const AlphaLeaseSection: React.FC = () => {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prevCounts) =>
        prevCounts.map((count, index) =>
          count < stats[index].value
            ? Math.min(
                count + Math.ceil(stats[index].value / 100),
                stats[index].value
              )
            : stats[index].value
        )
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <CleaningInfo />
    </div>
  );
};

export default AlphaLeaseSection;
