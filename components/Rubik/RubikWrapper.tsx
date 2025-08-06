"use client";

import { useTheme } from "next-themes";
import React from "react";
import VideoBannerEleven from "../VideoBanner/VideoBannerEleven";
import RubikOne from "./Rubik";

const HeroWrapper = () => {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "light") {
    return <VideoBannerEleven />;
  }

  return <RubikOne />;
};

export default HeroWrapper;
