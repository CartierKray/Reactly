import BistroGreenShowcase from "@/components/BistroShowCase/BistroShowCase";
import ComponentHeaderClothing from "@/components/ComponentenLijst/ComponentenLijstClothing";
import GridClothing from "@/components/GridClothing/GridClothing";
import NavbarNewSix from "@/components/Navbar/NavbarSix";
import React from "react";

function TestPage() {
  return (
    <>
      <div>
        <NavbarNewSix />
        <div className="pt-24 lg:pt-28 pb-10 dark:bg-black">
          <ComponentHeaderClothing />
        </div>
        <div className="pb-20">
          <GridClothing />
        </div>
        <div className="py-20">
          <BistroGreenShowcase />
        </div>
      </div>
    </>
  );
}

export default TestPage;
