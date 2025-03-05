"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Logo from "../../images/Logo.png";
import DashIcon from "../../images/DashLogo.png";
import PenIcon from "../../images/penicon.png";
import IssuedIcon from "../../images/IssuedBooks.png";
import TeleIcon from "../../images/telephone.png";
import LogoutIcon from "../../images/logout.png";
import FessPenaltiesIcon from "../../images/FeesPenaltiesLogo.png";
import VisitLogo from "../../images/VisitLogo.png";

interface MenuItem {
  key: string;
  label: string;
  icon: any;
  route: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const menuItems: MenuItem[] = [
    { key: "dashboard", label: "Dashboard", icon: DashIcon, route: "/" },
    { key: "all-books", label: "All Books", icon: PenIcon, route: "/book-pages/all-books" },
    { key: "student-page", label: "Student Directory", icon: IssuedIcon, route: "/student-page" },
    { key: "fees-penalties-page", label: "Fees & Penalties", icon: FessPenaltiesIcon, route: "/fees-penalties-page" },
    { key: "visitlog-page", label: "Visit Log", icon: VisitLogo, route: "/visitlog-page" },
    { key: "book-activities", label: "Book Activities", icon: PenIcon, route: "/book-activities" },
  ];

  return (
    <div className="min-h-screen w-[15%] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border-r border-r-[#d9d9d9] flex flex-col font-josefin">
      <div className="p-4">
        <Image src={Logo} alt="VighnoTech Logo" className="w-full h-auto" />
      </div>
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link href={item.route} key={item.key}>
              <div
                className={`
                  flex justify-between items-center cursor-pointer rounded-[8px] p-2 transition-colors text-[#1E40AF] group relative
                  ${isActive ? "bg-[#F0F6FF]" : "hover:bg-[#EDF1FF]"}
                `}
              >
                <span>{item.label}</span>
                <div className="relative">
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                  {/* Chat bubble tooltip on the right */}
                  <div className="hidden group-hover:block">
                    <div className="absolute top-1/2 left-full ml-3 z-50 flex -translate-y-1/2 items-center">
                      <div className="relative bg-black text-white text-sm rounded-lg py-1 px-3 shadow-lg">
                        <p className="whitespace-nowrap">{item.label}</p>
                        {/* Chat bubble tail */}
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-black"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex-grow" />
      <div className="p-4">
        <div className="flex justify-between mb-3 cursor-pointer p-2 rounded-md text-[#333333] group relative">
          <span>Contact</span>
          <div className="relative">
            <Image src={TeleIcon} alt="telephone" />
            {/* Chat bubble tooltip on the right for Contact */}
            <div className="hidden group-hover:block">
              <div className="absolute top-1/2 left-full ml-3 z-50 flex -translate-y-1/2 items-center">
                <div className="relative bg-black text-white text-sm rounded-lg py-1 px-3 shadow-lg">
                  <p className="whitespace-nowrap">Contact</p>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-black"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between cursor-pointer p-2 rounded-md text-[#333333] group relative">
          <span>Sign out</span>
          <div className="relative">
            <Image src={LogoutIcon} alt="logout" />
            {/* Chat bubble tooltip on the right for Sign out */}
            <div className="hidden group-hover:block">
              <div className="absolute top-1/2 left-full ml-3 z-50 flex -translate-y-1/2 items-center">
                <div className="relative bg-black text-white text-sm rounded-lg py-1 px-3 shadow-lg">
                  <p className="whitespace-nowrap">Sign out</p>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-black"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;