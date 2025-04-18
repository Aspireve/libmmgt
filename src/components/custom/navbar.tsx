"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { addTab, closeTab, setActiveTab } from "@/redux/tabSlice";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home03Icon } from "@hugeicons/core-free-icons";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tabs, activeTab, tabsVisible } = useSelector(
    (state: RootState) => state.tabs
  );

  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();

    const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
    const isActiveClosing = activeTab === tabId;

    dispatch(closeTab(tabId));

    if (isActiveClosing) {
      let nextActiveTab = null;

      if (tabs.length > 1) {
        if (tabIndex === tabs.length - 1) {
          nextActiveTab = tabs[tabIndex - 1];
        } else {
          nextActiveTab = tabs[tabIndex + 1];
        }
      }

      if (nextActiveTab) {
        dispatch(setActiveTab(nextActiveTab.id));
        router.push(nextActiveTab.route);
      } else {
        dispatch(setActiveTab("dashboard"));
        router.push("/");
      }
    }
  };
  if (!tabsVisible) {
    return null;
  }
  return (
    <div className="w-full shadow-sm h-16 flex border-b border-gray-300 px-6 bg-white font-josefin">
      <div className="flex items-center gap-6 cursor-pointer mr-4">
        <HugeiconsIcon icon={Home03Icon} onClick={() => router.push("/")} />
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`px-4 py-2 flex items-center rounded-[10px] cursor-pointer my-4 text-[#1E40AF] ${
            activeTab === tab.id ? "bg-blue-300" : "hover:bg-[#EDF1FF]"
          }`}
          onClick={() => {
            dispatch(setActiveTab(tab.id));
            router.push(tab.route);
          }}
          onMouseEnter={() => setHoveredTab(tab.id)}
          onMouseLeave={() => setHoveredTab(null)}
        >
          <span className="text-md max-[852px]:text-[10px] max-[975px]:text-[13px] ">
            {tab.title}
          </span>
          {hoveredTab === tab.id && (
            <button
              className=" border-none text-[#4b4a4a] pl-2 py-1 text-sm"
              onClick={(e) => handleCloseTab(e, tab.id)}
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
