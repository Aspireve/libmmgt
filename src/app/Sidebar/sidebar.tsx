"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../images/Logo.png";
import DashIcon from "../../images/Dash.png";
import PenIcon from "../../images/penicon.png";
import IssuedIcon from "../../images/IssuedBooks.png";
import TeleIcon from "../../images/telephone.png";
import LogoutIcon from "../../images/logout.png";


interface MenuItem {
    key: string;
    label: string;
    icon: any;
  }
  
  const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("1");
  
    const menuItems: MenuItem[] = [
      { key: "1", label: "Dashboard", icon: DashIcon },
      { key: "2", label: "All Books", icon: PenIcon },
      { key: "3", label: "Issued Books", icon: IssuedIcon },
    ];
  
    return (
        <div className="min-h-screen w-[15%] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border-r border-r-[#d9d9d9] flex flex-col font-josefin">
          {/* Logo Section */}
          <div className="p-4">
            <Image src={Logo} alt="VighnoTech Logo" className="w-full h-auto" />
          </div>
    
          {/* Menu Items */}
          <div className="p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = activeItem === item.key;
              return (
                <div
                  key={item.key}
                  onClick={() => setActiveItem(item.key)}
                  className={`
                    flex justify-between items-center cursor-pointer rounded-md p-2
                    transition-colors  text-[#1E40AF]
                    ${
                      isActive
                        ? "bg-[#F0F6FF]" 
                        : "hover:bg-#EDF1FF"
                    }
                  `}
                >
                  <span>{item.label}</span>
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                </div>
              );
            })}
          </div>
    
          <div className="flex-grow" />
    
          {/* Footer Section (No hover effect) */}
          <div className="p-4">
            <div className="flex justify-between mb-3 cursor-pointer p-2 rounded-md text-[#333333]">
              <span>Contact</span>
              <Image src={TeleIcon} alt="telephone" width={20} height={20} />
            </div>
            <div className="flex justify-between cursor-pointer p-2 rounded-md text-[#333333]">
              <span>Sign out</span>
              <Image src={LogoutIcon} alt="logout" width={20} height={20} />
            </div>
          </div>
        </div>
      );
    };
  
  export default Sidebar;
