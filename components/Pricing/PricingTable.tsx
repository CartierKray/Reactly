"use client";

import Image from "next/image";
import React, { useState } from "react";

const plans = ["Starter", "Team", "Business", "Enterprise"];
const data = [
  {
    section: "AI Agents",
    features: [
      {
        label: "AI SEO Strategy Agent",
        values: ["×", "✓", "✓", "✓"],
      },
      {
        label: "AI Trend Analyzer",
        values: ["×", "×", "✓", "✓"],
      },
      {
        label: "AI Traffic & Insights",
        values: ["×", "✓", "✓", "✓"],
      },
    ],
  },
  {
    section: "Benchmark and track the competition",
    features: [
      {
        label: "Competitive trackers",
        values: ["×", "unlimited", "unlimited", "unlimited"],
      },
      {
        label: "Top websites (category leaders)",
        values: ["300", "unlimited", "unlimited", "unlimited"],
      },
      {
        label: "Projects",
        values: ["Base", "Advanced", "Advanced", "Advanced"],
      },
      {
        label: "Custom industry",
        values: ["×", "×", "25", "50"],
      },
      {
        label: "Website segment",
        values: ["×", "3", "25", "50"],
      },
      {
        label: "Market analysis",
        values: ["×", "available", "✓", "✓"],
      },
      {
        label: "Demand analysis",
        values: ["×", "available", "✓", "✓"],
      },
    ],
  },
  {
    section: "Analyze website structure",
    features: [
      {
        label: "Website technologies",
        values: ["×", "available", "available", "available"],
      },
      {
        label: "Popular pages",
        values: ["×", "available", "available", "available"],
      },
    ],
  },
];

function renderValue(val: string) {
  if (val === "✓") {
    return (
      <Image
        src="/svg/checktable.svg"
        width={1000}
        height={1000}
        alt="check"
        className="inline-block w-4 h-4 text-gray-400"
      />
    );
  }
  if (val === "×") {
    return (
      <Image
        src="/svg/falsetable.svg"
        width={1000}
        height={1000}
        alt=""
        className="inline-block w-4 h-4 text-gray-400"
      />
    );
  }
  return val;
}

export default function PricingTable() {
  const [showFullTable, setShowFullTable] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Desktop Table */}
      {showFullTable && (
        <div className="hidden md:block mb-10 bg-white rounded-2xl shadow p-6 overflow-x-auto text-sm text-[#0a2640]">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="text-gray-500 font-medium text-left"></th>
                {plans.map((plan, idx) => (
                  <th
                    key={idx}
                    className="text-center text-[#0a2640] text-sm font-semibold"
                  >
                    {plan}
                  </th>
                ))}
              </tr>
              <tr>
                <td></td>
                {plans.map((plan, idx) => (
                  <td key={idx} className="text-center">
                    <button
                      className={`${
                        idx === 0
                          ? "border border-blue-500 text-blue-500"
                          : "bg-blue-600 text-white"
                      } rounded-full px-4 py-1 text-xs font-medium`}
                    >
                      {idx === 0 ? "Try for free" : "Talk to sales"}
                    </button>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((section, i) => (
                <React.Fragment key={i}>
                  <tr>
                    <td
                      className="font-semibold text-[#0a2640] pt-4"
                      colSpan={plans.length + 1}
                    >
                      {section.section}
                    </td>
                  </tr>
                  {section.features.map((feature, fi) => (
                    <tr key={fi}>
                      <td>{feature.label}</td>
                      {feature.values.map((val, vi) => (
                        <td key={vi} className="text-center">
                          {renderValue(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Table Style – fixed 4 columns without scroll */}
      {showFullTable && (
        <div className="block md:hidden space-y-10 mb-10 mt-10 bg-white p-6 rounded-3xl text-xs">
          <table className="w-full text-[#0a2640] border-separate border-spacing-y-2">
            <thead>
              <tr className="text-xs text-[#0a2640] font-semibold text-center">
                <th className="text-left"></th>
                {plans.map((plan, idx) => (
                  <th key={idx}>{plan}</th>
                ))}
              </tr>
              <tr>
                <td></td>
                {plans.map((plan, idx) => (
                  <td key={idx} className="text-center py-2">
                    <button
                      className={`${
                        idx === 0
                          ? "border border-blue-500 text-blue-500"
                          : "bg-blue-600 text-white"
                      } rounded-full px-3 py-1 text-[10px] font-medium`}
                    >
                      {idx === 0 ? "Free" : "Custom"}
                    </button>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((section, i) => (
                <React.Fragment key={i}>
                  <tr>
                    <td
                      colSpan={plans.length + 1}
                      className="font-bold pt-4 pb-1 text-left text-[#0a2640]"
                    >
                      {section.section}
                    </td>
                  </tr>
                  {section.features.map((feature, fi) => (
                    <tr key={fi}>
                      <td className="font-medium py-2">{feature.label}</td>
                      {feature.values.map((val, vi) => (
                        <td key={vi} className="text-center py-2">
                          {renderValue(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Toggle Button */}
      <div className="text-center">
        <button
          className="text-blue-600 text-sm font-semibold underline"
          onClick={() => setShowFullTable((prev) => !prev)}
        >
          {showFullTable
            ? "Close full feature table ▲"
            : "See full feature table ▼"}
        </button>
      </div>
    </div>
  );
}
