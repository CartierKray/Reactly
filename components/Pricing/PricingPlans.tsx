import { useState } from "react";
import PricingTable from "./PricingTable";

export default function PricingPlans() {
  const [showFullTable, setShowFullTable] = useState(false);

  return (
    <div className="lg:py-10 max-w-7xl mx-auto">
      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {/* Teams */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-sm font-medium text-gray-600 uppercase">Teams</h3>
          <p className="text-2xl font-bold mt-2">$15,000</p>
          <p className="text-sm text-gray-400 mb-4">/ year</p>
          <button className="bg-blue-600 text-white w-full py-2 rounded-full font-semibold text-sm mb-4">
            Talk to sales
          </button>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>✓ 5 users</li>
            <li>✓ 15 months of historical data</li>
            <li>✓ Custom product groups analysis (up to 1K ASINs)</li>
            <li>✓ Category, Brand and Product-level sales performance data</li>
            <li>✓ Free data credits to use on data exporter or API</li>
          </ul>
        </div>

        {/* Business */}
        <div className="bg-white rounded-2xl p-6 shadow relative border-2 border-blue-600">
          <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs bg-blue-600 text-white px-3 py-0.5 rounded-full">
            Popular
          </span>
          <h3 className="text-sm font-medium text-gray-600 uppercase">
            Business
          </h3>
          <p className="text-2xl font-bold mt-2">$25,000</p>
          <p className="text-sm text-gray-400 mb-4">/ year</p>
          <button className="bg-blue-600 text-white w-full py-2 rounded-full font-semibold text-sm mb-4">
            Talk to sales
          </button>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>✓ 5 users</li>
            <li>✓ 25 months of historic data</li>
            <li>✓ Custom product groups analysis (up to 10K ASINs)</li>
            <li>✓ Top keywords at category and brand level</li>
            <li>✓ Audience overlap with other marketplaces</li>
          </ul>
        </div>

        {/* Enterprise */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-sm font-medium text-gray-600 uppercase">
            Enterprise
          </h3>
          <p className="text-2xl font-bold mt-2">Custom</p>
          <p className="text-sm text-gray-400 mb-4">/ year</p>
          <button className="bg-blue-600 text-white w-full py-2 rounded-full font-semibold text-sm mb-4">
            Talk to sales
          </button>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>✓ 10 users</li>
            <li>✓ 37 months of historical data</li>
            <li>✓ Batch API access</li>
            <li>✓ Cross-shopping behavior and basket analysis</li>
            <li>✓ Demographics at category and brand level</li>
          </ul>
        </div>

        {/* Custom */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-sm font-medium text-gray-600 uppercase">
            Custom
          </h3>
          <p className="text-2xl font-bold mt-2">Custom</p>
          <p className="text-sm text-gray-400 mb-4">/ year</p>
          <button className="bg-blue-600 text-white w-full py-2 rounded-full font-semibold text-sm mb-4">
            Talk to sales
          </button>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>✓ 10 users</li>
            <li>✓ 37 months of historical data</li>
            <li>✓ Batch API access</li>
            <li>✓ Cross-shopping behavior and basket analysis</li>
            <li>✓ Demographics at category and brand level</li>
          </ul>
        </div>
      </div>

      <PricingTable />
    </div>
  );
}
