"use client"


import React, { useState } from "react";
import { Button } from "@/components/ui/button"; 

const routes = [
  { key: "dashboard", label: "Dashboard" },
  { key: "all-books", label: "All Books" },
  { key: "issued-books", label: "Issued Books" },
];

const Tabbing: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div
      className=" mt-8
        flex justify-evenly bg-white border border-[#e4e4e4] rounded-[8px]
        m-5 ml-[45px] p-[8px] flex-wrap gap-[6px] max-w-[80%] 
        sm:p-[10px] sm:gap-[8px] sm:max-w-[70%]
        lg:max-w-[28%] lg:flex-nowrap 
      "
    >
      {routes.map(({ key, label }) => {
        const isActive = activeTab === key;

        const paddingClasses =
          "py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px]";

        const activeClasses = "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-#1E40AF tex-white";
        const inactiveClasses =
          "bg-white text-black border-0";

        return (
          <Button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`rounded-[6px] transition-colors  ${paddingClasses} ${
              isActive ? activeClasses : inactiveClasses
            }`}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default Tabbing;
