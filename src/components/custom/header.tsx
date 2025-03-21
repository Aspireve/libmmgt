"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Images from "@/images";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface HeadersProps {
  heading: string;
  subheading: string;
  isLoading?: boolean;
}

const Header: React.FC<HeadersProps> = ({
  heading,
  subheading,
  isLoading = false,
}) => {
  const { header_image, logo } =
    useSelector((state: RootState) => state.auth) || {};

  return (
    <div className="flex items-center justify-between mx-5 font-josefin mt-7">
      {isLoading ? (
        <div className="flex-1">
          <Skeleton className="ml-[22px] h-10 w-full max-w-[15rem] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
          <Skeleton className="ml-[22px] h-5 mt-3 w-full max-w-[12rem] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        </div>
      ) : (
        <div className="flex-1">
          <h1 className="ml-[22px] text-black text-3xl font-bold">{heading}</h1>
          <p className="ml-[22px] text-gray-500 mt-[5px] font-medium text-lg">
            {subheading}
          </p>
        </div>
      )}
      <div className="border-2 border-blue-500 rounded-xl  bg-white overflow-hidden w-[145px] h-[57px] flex items-center justify-between px-2 mt-2 mr-[50px] transition-all duration-300 hover:shadow-lg cursor-pointer">
        <div className="flex items-center -ml-[15px]">
          
          <Image
            src={logo || Images.TIA}
            alt="logo"
            className="w-[45px] h-[45px] ml-4"
          />
          
          <div className="w-[1px] h-[24px] bg-blue mx-[8px]" />
          
          {header_image ? (
            <img
              src={header_image || ""}
              alt="Institute Header"
              className="w-[145px] h-[57px] object-cover rounded-lg border border-blue-500"
            />
          ) : (
            <span className="text-[blue] font-bold text-[16px]">TIA</span>
          )}
          
          <Image
            src={Images.Dropper}
            alt="dropdownIcon"
            className="ml-[5px] h-[10px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
