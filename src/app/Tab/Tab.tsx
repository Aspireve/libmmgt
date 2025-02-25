"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface TabItem {
  key: string;
  label: string;
}

interface TabbingProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (activeTab: string) => void;
  /** Optionally override the default classes for active/inactive tabs */
  activeTabClassName?: string;
  inactiveTabClassName?: string;
}

const Tabbing: React.FC<TabbingProps> = ({
  tabs,
  defaultTab,
  onTabChange,
  activeTabClassName,
  inactiveTabClassName,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);


  const handleTabClick = (key: string) => {
    setActiveTab(key);
    onTabChange?.(key);
  };

  const paddingClasses =
    "py-[2px] px-[5px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px] rounded-[6px] transition-colors";

  const defaultActive =
    "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF] hover:text-white";
  const defaultInactive = "bg-white text-[blue] border-0";

  const activeClasses = activeTabClassName || defaultActive;
  const inactiveClasses = inactiveTabClassName || defaultInactive;

  return (
    <div
      className="
        mt-5
        flex
        justify-start
        bg-white
        border border-[#e4e4e4]
        rounded-[8px]
        ml-10
        p-[8px]
        flex-wrap
        gap-[6px]
        w-fit
      "
    >
      {tabs.map(({ key, label }) => {
        const isActive = activeTab === key;
        return (
          <Button
            key={key}
            onClick={() => handleTabClick(key)}
            className={`${paddingClasses} ${
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
