// app/Sidebar/sidebar.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Logo from "../../images/Logo.png";
import DashLogo from "../../images/DashLogo.png";
import StudentDirectory from "../../images/StudentDirectory.png";
import FeesPenaltiesLogo from "../../images/FeesPenaltiesLogo.png";
import TeleIcon from "../../images/telephone.png";
import LogoutIcon from "../../images/logout.png";
import VisitLogo from "../../images/VisitLogo.png";
import BooksLogo from "../../images/BooksLogo.png";

interface MenuItem {
  key: string;
  label: string;
  icon: any;
  route: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const menuItems: MenuItem[] = [
    { key: "dashboard", label: "Dashboard", icon: DashLogo, route: "/" },
    { key: "all-books", label: "All Books", icon: BooksLogo, route: "/all-books" },
    { key: "student-page", label: "Student Directory", icon: StudentDirectory, route: "/student-page" },
    { key: "fees-penalties", label: "Fees & Penalties", icon: FeesPenaltiesLogo, route: "/fees-penalties-page" },
    { key: "visit-log", label: "Visit Log", icon: VisitLogo, route: "/visitlog-page" },
  ];

  return (
    <div className="w-full md:w-56 lg:w-64 min-h-screen shadow-lg md:shadow-none border-r border-r-[#d9d9d9] flex flex-col font-josefin bg-white">
      {/* Logo */}
      <div className="p-4 md:p-6">
        <Image 
          src={Logo} 
          alt="VighnoTech Logo" 
          className="w-full h-auto max-w-[150px] md:max-w-[180px] mx-auto" 
        />
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2 md:space-y-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link href={item.route} key={item.key}>
              <div
                className={`
                  flex justify-between items-center cursor-pointer rounded-lg p-3 transition-colors text-[#1E40AF]
                  ${isActive ? "bg-[#F0F6FF]" : "hover:bg-[#EDF1FF]"}
                  text-sm md:text-base
                `}
              >
                <span>{item.label}</span>
                <Image src={item.icon} alt={item.label} width={20} height={20} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Bottom Section */}
      <div className="p-4">
        <div className="flex justify-between mb-3 cursor-pointer p-3 rounded-lg text-[#333333] hover:bg-gray-100 text-sm md:text-base">
          <span>Contact</span>
          <Image src={TeleIcon} alt="telephone" width={20} height={20} />
        </div>
        <div className="flex justify-between cursor-pointer p-3 rounded-lg text-[#333333] hover:bg-gray-100 text-sm md:text-base">
          <span>Sign out</span>
          <Image src={LogoutIcon} alt="logout" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;