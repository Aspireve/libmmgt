"use client";

import React from "react";
import { usePathname } from "next/navigation";
import TiaIcon from "../../images/Tia.png";
import Dropper from "../../images/Dropper.png";

const Header = () => {
  const pathname = usePathname();

  let heading = "Library Management System";
  let subheading = "Tanvir Chavan";

  if (pathname === "/StudentDirectory") {
    heading = "Student Directory";
    subheading = "Tanvir Chavan";
  }
  if (pathname === "/AllBooks") {
    heading = "Books List";
    subheading = "Tanvir Chavan";
  }
  if (pathname === "/FeesPenalties") {
    heading = "Fees&Penalities";
    subheading = "Tanvir Chavan";
  }
  if (pathname === "/VisitLog") {
    heading = "Visit Log";
    subheading = "Tanvir Chavan";
  }
  if (pathname === "/available-books") {
    heading = "Available Books";
    subheading = "Tanvir Chavan";
  }

  return (
    <div className="flex items-center justify-between mx-5 font-josefin mt-7">
      <div className="flex-1">
        <h1 className="ml-[22px] text-black text-3xl font-bold">{heading}</h1>
        <p className="ml-[22px] text-gray-500 mt-[5px] font-medium text-lg">
          {subheading}
        </p>
      </div>
      <div className="border-2 border-blue-500 rounded-xl bg-white overflow-hidden w-[145px] h-[57px] flex items-center justify-between px-2 mt-2 mr-[50px]">
        <div className="flex items-center -ml-[15px]">
          <img
            src={TiaIcon.src}
            alt="logo"
            className="w-[45px] h-[45px] ml-4"
          />
          <div className="w-[1px] h-[24px] bg-blue mx-[8px]" />
          <span className="text-[blue] font-bold text-[16px]">TIA</span>
          <img
            src={Dropper.src}
            alt="dropdownIcon"
            className="ml-[5px] h-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
