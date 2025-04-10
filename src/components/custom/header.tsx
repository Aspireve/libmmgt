"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";
import InstituteSelector from "./institute-selector";
import { HugeiconsIcon } from "@hugeicons/react";
import { QrCodeIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { useSelect } from "@refinedev/core";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

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
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex items-center justify-between mx-[40px] font-josefin mt-7">
      {isLoading ? (
        <div className="flex-1">
          <Skeleton className="h-10 w-full max-w-[15rem] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
          <Skeleton className="h-5 mt-3 w-full max-w-[12rem] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        </div>
      ) : (
        <div className="flex-1 cursor-default">
          <h1 className="text-black text-3xl font-bold">{heading}</h1>
          <p className="text-gray-500 mt-[5px] font-medium text-lg">
            {user?.name}
          </p>
        </div>
      )}
      <div className="mr-5 cursor-pointer">
        <HugeiconsIcon
          icon={QrCodeIcon}
          onClick={() => router.push("/Qr-scanner")}
        />
      </div>
      <InstituteSelector />
    </div>
  );
};

export default Header;
