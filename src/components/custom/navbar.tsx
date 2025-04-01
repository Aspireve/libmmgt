"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { addTab, closeTab, setActiveTab } from "@/redux/tabSlice";
import images from "@/images";
import Image from "next/image";


const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tabs, activeTab } = useSelector((state: RootState) => state.tabs);
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
          nextActiveTab = tabs[tabIndex - 1]; // Move to previous tab if closing the last one
        } else {
          nextActiveTab = tabs[tabIndex + 1]; // Move to next tab if closing in-between
        }
      }

      if (nextActiveTab) {
        dispatch(setActiveTab(nextActiveTab.id));
        router.push(nextActiveTab.route);
      } else {
        router.push("/"); // Default route if no tabs left
      }
    }
  };

  return (
    <div className="w-full shadow-sm h-16 flex border-b border-gray-300 px-6 bg-white font-josefin">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`px-4 py-2 flex items-center rounded-[10px] cursor-pointer my-4 text-[#1E40AF] ${activeTab === tab.id ? "bg-blue-300" : "hover:bg-[#EDF1FF]"
            }`}
          onClick={() => {
            dispatch(setActiveTab(tab.id));
            router.push(tab.route);
          }}
          onMouseEnter={() => setHoveredTab(tab.id)}
          onMouseLeave={() => setHoveredTab(null)}
        >
          <span>{tab.title}</span>
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



