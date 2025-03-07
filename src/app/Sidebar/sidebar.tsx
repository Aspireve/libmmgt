"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTabs } from "../context/TabContext";

import Logo from "../../images/Logo.png";
import DashIcon from "../../images/DashLogo.png";
import PenIcon from "../../images/penicon.png";
import IssuedIcon from "../../images/IssuedBooks.png";
import TeleIcon from "../../images/telephone.png";
import LogoutIcon from "../../images/logout.png";
import FeesPenaltiesIcon from "../../images/FeesPenaltiesLogo.png";
import VisitLogo from "../../images/VisitLogo.png";

interface MenuItem {
  id: string;
  title: string;
  icon: any;
  route: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const { addTab } = useTabs();

  const menuItems: MenuItem[] = [
    { id: "dashboard", title: "Dashboard", icon: DashIcon, route: "/" },
    { id: "all-books", title: "All Books", icon: PenIcon, route: "/book-pages/all-books" },
    { id: "student-page", title: "Student Directory", icon: IssuedIcon, route: "/student-page" },
    { id: "fees-penalties-page", title: "Fees & Penalties", icon: FeesPenaltiesIcon, route: "/fees-penalties-page" },
    { id: "visitlog-page", title: "Visit Log", icon: VisitLogo, route: "/visitlog-page" },
    { id: "book-activities", title: "Book Activities", icon: PenIcon, route: "/book-activities" }
  ];

  return (
    <div className="w-[15%] shadow-md border-r border-[#d9d9d9] flex flex-col justify-between font-josefin h-screen">
      {/* Logo Section */}
      <div className="p-4">
        <Image src={Logo} alt="VighnoTech Logo" className="w-full h-auto" />
      </div>
      
      {/* Menu Items */}
      <div className="p-4 space-y-2 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link key={item.id} href={item.route} id={item.id} onClick={() => addTab(item.title, item.route)}
              className={`flex items-center gap-3 cursor-pointer rounded-[8px] p-2 transition-colors text-[#1E40AF] group relative ${isActive ? "bg-[#F0F6FF]" : "hover:bg-[#EDF1FF]"}`}
            >
              <Image src={item.icon} alt={item.title} width={20} height={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
      
      {/* Footer Section */}
      <div className="p-4">
        <div className="flex justify-between mb-3 cursor-pointer p-2 rounded-md text-[#333333] group relative">
          <span>Contact</span>
          <Image src={TeleIcon} alt="telephone" />
        </div>
        <div className="flex justify-between cursor-pointer p-2 rounded-md text-[#333333] group relative">
          <span>Sign out</span>
          <Image src={LogoutIcon} alt="logout" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
