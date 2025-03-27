"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Images from "@/images";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setCurrentInstitute } from "@/redux/authSlice";

const InstituteSelector = () => {
  const { currentInstitute, instituteList } =
    useSelector((state: RootState) => state.auth) || {};
  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="shadow-none w-fit">
        <Button className="border-2 border-blue-500 rounded-xl  overflow-hidden w-[145px] h-[57px] flex items-center justify-between p-2 px-4 mt-2 transition-all duration-300 hover:shadow-lg cursor-pointer">
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-2 border-blue-500 w-full mt-2 bg-white rounded-xl cursor-pointer">
        {instituteList.map((institute, idx) => (
          <DropdownMenuItem
            key={`institute-dropdown-${idx}`}
            className={`hover:bg-[#aaaaaa66] transition-all duration-300 ${
              idx !== instituteList.length - 1
                ? "border-b-2 "
                : " rounded-b-xl "
            } ${idx === 0 && " rounded-t-xl "}`}
            onClick={() =>
              dispatch(
                setCurrentInstitute({
                  institute_uuid: institute.institute_uuid,
                })
              )
            }
          >
            <div className="flex items-center w-full gap-3 py-1">
              <Image
                src={institute?.logo || Images.TIA}
                alt="logo"
                width={40}
                height={40}
              />

              <span className="text-[blue] font-bold text-[16px]">
                {institute?.institute_name.match(/[A-Z]/g)?.join("") || ""}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InstituteSelector;
