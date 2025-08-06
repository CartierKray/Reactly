import React from "react";

type SidebarProps = {
  components: { name: string; content: React.ReactNode; isNew?: boolean }[];
  setActiveComponent: (component: React.ReactNode) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  components,
  setActiveComponent,
}) => {
  return (
    <aside className="xl:w-1/6 md:flex hidden top-20 h-screen sticky opacity-100 overflow-y-auto z-10 sidebar">
      <nav className="pt-4 sticky text-start justify-start">
        {components.map((comp, index) => (
          <button
            key={index}
            onClick={() => setActiveComponent(comp.content)}
            className={` w-full flex space-x-2 whitespace-nowrap px-4 h hover:text-emerald-500 text-neutral-500 dark:text-[#a2a2a2] text-[13px] py-2 text-start hover:scale-110 transition-all duration-300 ease-in-out ${
              comp.isNew ? "relative" : ""
            }`}
          >
            <p>{comp.name}</p>
            {comp.isNew && (
              <span
                className="mt-0.5 outline outline-1 dark:bg-transparent bg-emerald-100 outline-emerald-500 text-emerald-500 text-[9px]  font-bold py-0.5
               px-2 rounded-full"
              >
                NEW
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
