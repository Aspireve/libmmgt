"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import Images from "@/images";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getAllInstitutes, setCurrentInstitute } from "@/redux/authSlice";
import { toast } from "sonner";
import { useCreate } from "@refinedev/core";

const InstituteSelector = () => {
  const currentInstitute =
    useSelector((state: RootState) => state.auth.currentInstitute) || {};
  const instituteList =
    useSelector((state: RootState) => state.auth.user?.institute_details) || [];
  const user_uuid =
    useSelector((state: RootState) => state.auth.user?.user_uuid) || "";

  const dispatch = useDispatch<AppDispatch>();
  const [newInstituteName, setNewInstituteName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate, isLoading } = useCreate(); // ✅ destructure from useCreate

  const handleAddInstitute = () => {
    return new Promise((resolve, reject) => {
      mutate(
        {
          resource: "config/create-institute",
          values: {
            institute_name: newInstituteName,
            user_uuid: user_uuid
          },
        },
        {
          onSuccess: (data: any) => {
            toast.success("Institute added successfully!");
            resolve(data.data);
            setIsDialogOpen(false);
            setNewInstituteName("");
            dispatch(getAllInstitutes());
          },
          onError: (error: any) => {
            toast.error("Error adding institute: " + error.message);
            reject(error);
          },
        }
      );
    });
  };

  const instituteUuids =
    (Array.isArray(instituteList) &&
      instituteList.map((institute) => institute.institute_uuid).join(",")) ||
    "";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="shadow-none w-fit">
          <Button
            variant="outline"
            className="border-2 border-blue-500 rounded-xl overflow-hidden w-40 h-[54px] flex items-center justify-between p-2 px-4 transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            <Image
              src={currentInstitute?.institute_logo || Images.VighnoLogo}
              alt="logo"
              width={36}
              height={36}
              className="size-9"
            />
            <div className="w-[2px] h-[30px] bg-[#1F2937]" />
            <span className="text-[blue] font-bold text-[16px]">
              {currentInstitute?.institute_name?.match(/[A-Z]/g)?.join("") ||
                ""}
            </span>
            <Image
              src={Images.Dropper}
              alt="dropdownIcon"
              className="h-[10px] cursor-pointer"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-2 border-blue-300 w-full mt-2 bg-white rounded-xl cursor-pointer">
          <DropdownMenuItem
            className="hover:bg-[#aaaaaa66] transition-all duration-300"
            onClick={() =>
              dispatch(
                setCurrentInstitute({
                  institute_uuid: {
                    institute_name: "All Institutes",
                    institute_uuid: instituteUuids,
                    institute_logo: "",
                    institute_header: "",
                  },
                  override: true,
                })
              )
            }
          >
            <div className="flex items-center w-full gap-3">
              <Image
                src={Images.VighnoLogo}
                alt="All instituites logo"
                width={24}
                height={24}
                className="h-6 w-6"
                quality={90}
              />
              <span className="text-[blue] font-semibold text-[16px]">
                All Institutes
              </span>
            </div>
          </DropdownMenuItem>
          {instituteList.map((institute, idx) => (
            <DropdownMenuItem
              key={`institute-dropdown-${idx}`}
              className="hover:bg-[#aaaaaa66] transition-all duration-300"
              onClick={() =>
                dispatch(
                  setCurrentInstitute({
                    institute_uuid: institute.institute_uuid,
                  })
                )
              }
            >
              <div className="flex items-center w-full gap-3">
                <Image
                  src={institute?.institute_logo || Images.TIA}
                  alt="logo"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                  quality={90}
                />
                <span className="text-[blue] font-semibold text-[16px]">
                  {institute?.institute_name.match(/[A-Z]/g)?.join("") || ""}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
          <hr className="border-t border-slate-300" />
          <DropdownMenuItem
            className="text-gray-700 text-[16px] hover:bg-gray-200 rounded-b-xl"
            onClick={() => setIsDialogOpen(true)}
          >
            + Create new institute
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="p-4 bg-white rounded-[25px]">
          <DialogHeader>
            <DialogTitle>Add New Institute</DialogTitle>
            <DialogDescription>
              Enter the name of the new institute.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Enter new institute name"
            value={newInstituteName}
            onChange={(e) => setNewInstituteName(e.target.value)}
            className="mt-2 p-2 border rounded-md w-full placeholder:text-[#aaa] text-[#000]"
          />
          <Button
            onClick={handleAddInstitute}
            disabled={isLoading}
            className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-900"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InstituteSelector;
