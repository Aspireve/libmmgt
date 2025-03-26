"use client";

import React, { ReactNode, useState } from "react";
import { Button } from "../ui/button";

interface TabsProps<T extends string> {
  tabs: { key: T; label: string }[];
  content: Record<T, ReactNode>;
}

export const Tabbing = <T extends string>({ tabs, content }: TabsProps<T>) => {
  const [activeTab, setActiveTab] = useState<T>(tabs[0].key);

  const paddingClasses =
    "transition-all duration-300 py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px]";
  const activeClasses =
    "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF]";
  const inactiveClasses = "bg-white text-black border-0";

  return (
    <>
      <div className="mt-8 mb-4 flex justify-evenly bg-white border border-[#e4e4e4] rounded-[8px] gap-[6px] p-[5px] w-fit">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            className={`rounded-[6px] transition-colors shadow-none ${paddingClasses} ${
              activeTab === tab.key ? activeClasses : inactiveClasses
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      {content[activeTab]}
    </>
  );
};

export default Tabbing;
