"use client";

import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ColorDot({
  color,
  selected,
  onSelect,
}: {
  color: { name: string; hex: string };
  selected?: boolean;
  onSelect?: () => void;
}) {
  const isWhite = /^#(?:fff|ffffff)$/i.test(color.hex);
  return (
    <button
      type="button"
      title={color.name}
      aria-pressed={!!selected}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      className={cn(
        "box-content p-[2px] rounded-none transition",
        selected ? "border border-[#A7BEC1]" : "border border-transparent",
        "focus:outline-none focus:ring-1 focus:ring-zinc-300"
      )}
      style={{ lineHeight: 0 }}
    >
      <span
        className={cn(
          "block h-3 w-3 rounded-none",
          selected
            ? "border border-[#A7BEC1]"
            : isWhite
            ? "border border-zinc-300"
            : "border border-transparent"
        )}
        style={{ backgroundColor: color.hex }}
      />
    </button>
  );
}
