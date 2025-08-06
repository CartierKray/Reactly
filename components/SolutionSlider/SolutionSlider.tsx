"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const solutions = [
  {
    title: "Marketing",
    desc: "Get a complete view of your competitors' marketing strategy across every channel so you can maximize your resources.",
    tag: "Marketing channels breakdown",
    img: "/images/1c51de3384e4cffd351e.png",
    overlay: "/images/overlay-channels.png",
    features: [
      "Traffic and Engagement: for any website and marketing channel",
      "Competitive Intelligence: in-depth performance insights",
      "Gen AI: traffic numbers and trends for LLMs",
      "Performance Benchmark: against websites, segments or industries",
      "Campaign Analysis: channel, ads and spend data",
    ],
  },
  {
    title: "SEO Teams",
    desc: "Boost your organic strategy with our full-stack SEO kit",
    tag: "Rank tracking",
    img: "/images/e6d4aabf7604679a872c.png",
    overlay: "/images/overlay-heatmap.png",
    features: [
      "Keyword Research: backed by the freshest data",
      "Rank Tracking: with SERP feature and AIO analysis",
      "Site Audit: advanced technical SEO optimizations",
      "Backlink Analysis: the backlink profile of any site",
      "Gen AI tracking: brand visibility and referral traffic from LLMs",
    ],
  },
  {
    title: "Research & Analytics",
    desc: "Monitor market shifts, benchmark web and app performance, and uncover audience insights to drive data-informed decisions.",
    tag: "Market changes",
    img: "/images/bcbcf2e6425a9c933e17.png",
    overlay: "",
    features: [
      "Website Analysis: Benchmark performance against competitors",
      "Demand Analysis: Identify emerging trends",
      "Market Analysis: Measure your market share",
      "Conversion Analysis: Evaluate customer conversion efficiency",
      "Web & App Behavior: Understand full user journeys across platforms",
    ],
  },
  {
    title: "PPC",
    desc: "Boost your PPC and SEM tactics by revealing gaps in competitors’ campaigns.",
    tag: "Ads library",
    img: "/images/2b927a4ffbe1a0517883.png",
    overlay: "/images/overlay-product-ads.png",
    features: [
      "Keyword Data: find high-ROI keywords to target",
      "Ad Creatives: fresh data on all campaigns",
      "Spend Analysis: track CPCs and competitor ad spend",
      "Brand Protection: Monitor your proprietary keywords",
      "Find gaps in campaign coverage",
    ],
  },
  {
    title: "Sales Ops",
    desc: "Enrich your CRM with up-to-date data so your sales org can prioritize the right accounts at the right time",
    tag: "Company overview",
    img: "/images/03f89958d87f631ea5d3.png",
    overlay: "/images/overlay-engagement.png",
    features: [
      "CRM Integration: Always-fresh contact data on demand",
      "Traffic & Engagement Data: Actionable insights on prospect activity",
      "Data Enrichment: Powerful lead scoring for optimal routing",
      "Intent Topics: Timing–perfect outreach based on buying signals",
      "Optimize lead scoring with signals",
    ],
  },
  {
    title: "E-commerce",
    desc: "Grow sales with the best marketplace intelligence – from first visit to final purchase",
    tag: "Online marketplace trends",
    img: "/images/0439cdf32ed5719b1e3e.png",
    overlay: "/images/overlay-performance.png",
    features: [
      "Sales Performance: views, units sold, revenue, and more",
      "Marketing Channels: traffic sources on and off Amazon",
      "On-Site Search: uncover low-competition, high-margin niches",
      "Traffic Sources: analyze and benchmark competitor strategies",
      "Consumer Behavior: segment audiences and drive loyalty",
    ],
  },
];

export default function SolutionsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector("div");
      const cardWidth = card?.clientWidth || 340;
      const gap = 24;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative bg-[#000926] text-white py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-1.5">
            Solutions to every team&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ad2a3] to-[#1658ea]">
              growth
            </span>
          </h2>
          <div className="gap-3 hidden md:flex">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-1/2 z-0 blur-[120px] bg-gradient-to-b from-transparent to-[#1658ea]/40"></div>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-10 px-10 snap-x snap-mandatory"
          >
            {solutions.map((sol, index) => (
              <div
                key={index}
                className="group min-w-[300px] max-w-[340px] flex-shrink-0 bg-gradient-to-r from-[#0b0f2a] to-[#151a3b] border border-[#1e223e] rounded-3xl shadow-xl relative overflow-hidden hover:shadow-[0_0_30px_10px_rgba(0,123,255,0.25)] transition-all duration-300 ease-in-out h-[420px] flex flex-col justify-between"
              >
                {/* Default Content */}
                <div className="relative z-10 flex flex-col justify-between h-full transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:translate-y-6 px-6 pt-6 pb-0">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">{sol.title}</h3>
                    <p className="text-sm font-extralight text-gray-300 leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                </div>
                <div className="relative w-full mt-auto flex justify-end">
                  <div className="relative w-full h-[220px] rounded-b-3xl overflow-hidden">
                    <Image
                      src={sol.img}
                      alt={sol.title}
                      fill
                      className="object-cover transition-opacity duration-500"
                    />
                  </div>
                </div>

                {/* Hover Content */}
                <div className="absolute bg-gradient-to-r from-[#0b0f2a] to-[#151a3b] border border-[#1e223e] inset-0 px-6 py-6 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 ease-in-out z-20 bg-[#0b0f2a] rounded-3xl">
                  <h3 className="text-2xl font-semibold mb-4">{sol.title}</h3>
                  <ul className="text-sm space-y-2 pt-2 text-gray-300">
                    {sol.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-white text-base">•</span>
                        <span className="font-extralight text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex mt-8 gap-4">
                    <button className=" px-4 py-1.5 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out rounded-full bg-[#2563eb] hover:bg-[#1e4ed8] text-white font-medium text-xs">
                      Try it now
                    </button>
                    <button className="text-xs hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out flex items-center gap-1 hover:underline">
                      Learn More →
                    </button>
                  </div>
                </div>

                {/* Card border glow */}
                <div
                  className="absolute inset-0 rounded-3xl border border-[#1e223e] pointer-events-none z-[-1]"
                  style={{ boxShadow: "0 0 30px 10px rgba(0, 119, 255, 0.15)" }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {solutions.map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white transition-all duration-300 cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
