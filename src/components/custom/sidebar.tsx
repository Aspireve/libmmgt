"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Images from "@/images";
import { menuItems } from "@/constants/menu";
import { MenuItem } from "@/types/menu";
import { RootState } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { addTab, setActiveTab } from "@/redux/tabSlice";

const SidebarLink = ({ item }: { item: MenuItem }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const isActive =
    item.id === "dashboard"
      ? pathname === item.route
      : pathname.startsWith(item.route);


      const handleClick = () => {
        dispatch(addTab({ title: item.title, route: item.route })); // ✅ Add tab
        dispatch(setActiveTab(item.route)); // ✅ Set active tab
        router.push(item.route); // ✅ Navigate to the route
      };
  return (
    <Link
      key={item.id}
      href={item.route}
      onClick={(e) => {
        e.preventDefault(); 
        handleClick();
      }
      }
      className={`flex items-center gap-3 cursor-pointer rounded-[8px] p-2 text-[#1E40AF] group relative transition-all duration-300
      ${isActive ? "bg-blue-300" : "hover:bg-[#EDF1FF]"}`}
    >
      <Image src={item.icon} alt="" width={20} height={20} />
      <span>{item.title}</span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="w-[15%] shadow-md border-r border-[#d9d9d9] flex flex-col justify-between font-josefin h-screen">
      {/* Logo Section */}
      <div className="p-4">
        <Link href="/">
          <Image
            src={Images.Logo}
            alt="VighnoTech Logo"
            className="w-full h-auto"
            priority
          />
        </Link>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2 flex-1">
        {menuItems.map((item) => (
          <SidebarLink key={item.id} item={item} />
        ))}
      </div>

      {/* Footer Section */}
      <div className="p-4">
        <div className="flex justify-between mb-3 cursor-pointer p-2 rounded-md text-[#333333] group relative">
          <span>Contact</span>
          <Image src={Images.Telephone} alt="telephone" />
        </div>
        <div className="flex justify-between cursor-pointer p-2 rounded-md text-[#333333] group relative">
          <span>Sign out</span>
          <Image src={Images.Logout} alt="logout" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


