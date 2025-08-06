"use client";

import React from "react";

type ContentProps = {
  activeComponent: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ activeComponent }) => {
  return <main className="flex-1 pt-5 p-5 ">{activeComponent}</main>;
};

export default Content;
