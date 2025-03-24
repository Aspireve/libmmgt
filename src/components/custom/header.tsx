"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Images from "@/images";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import InstituteSelector from "./institute-selector";

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
  const { currentInstitute } =
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
          <h1 className="ml-[22px] text-black text-3xl font-bold">
            {currentInstitute?.institute_name}
          </h1>
          <p className="ml-[22px] text-gray-500 mt-[5px] font-medium text-lg">
            {subheading}
          </p>
        </div>
      )}
      <div className="border-2 border-blue-500 rounded-xl  bg-white overflow-hidden w-[145px] h-[57px] flex items-center justify-between px-2 mt-2 mr-[50px] transition-all duration-300 hover:shadow-lg cursor-pointer">
        <div className="flex items-center p-2 justify-between w-full">
          <Image
            src={currentInstitute?.logo || Images.TIA}
            alt="logo"
            width={40}
            height={40}
          />

          <div className="w-[2px] h-[30px] bg-[#1F2937]" />
          <span className="text-[blue] font-bold text-[16px]">
            {currentInstitute?.institute_name.match(/[A-Z]/g)?.join("") || ""}
          </span>

          <Image
            src={Images.Dropper}
            alt="dropdownIcon"
            className="h-[10px] cursor-pointer"
          />
        </div>
      </div>
      <InstituteSelector />
    </div>
  );
};

export default Header;
