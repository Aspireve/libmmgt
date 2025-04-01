"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { addTab, closeTab, setActiveTab } from "@/redux/tabSlice";


const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tabs, activeTab } = useSelector((state: RootState) => state.tabs);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div className="w-full shadow-sm h-16 flex border-b border-gray-300 px-6 bg-white font-josefin">
    {tabs.map((tab) => (
      <div
        key={tab.id}
        // className={`px-4 py-2 flex items-center rounded-[20px] cursor-pointer my-4 ${
        //   activeTab === tab.id ? "bg-blue-400" : "hover:bg-gray-200"
        // }`}
        className={`px-4 py-2 flex items-center rounded-[20px] cursor-pointer my-4 text-[#1E40AF] ${
          activeTab === tab.id ? "bg-[#F0F6FF]" : "hover:bg-[#EDF1FF]"
        }`}
        onClick={() => {
          dispatch(setActiveTab(tab.id));
          router.push(tab.route);
        }}
        onMouseEnter={() => setHoveredTab(tab.id)}  // Set hovered tab
        onMouseLeave={() => setHoveredTab(null)}  // Remove hovered tab
      >
        <span>{tab.title}</span>
        {hoveredTab === tab.id && (
          <button
            className=" border-none text-[#000] px-2 py-1 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(closeTab(tab.id));
            }}
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



