"use client";

import React, { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import TiaIcon from "../../images/Tia.png";
import Dropper from "../../images/Dropper.png";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface HeadersProps {
  heading?: string;
  subheading?: string;
  isLoading?: boolean;
}

const Header: React.FC<HeadersProps> = ({
  heading,
  subheading,
  isLoading = false,
}) => {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // ✅ Get Redux data safely
  const { header_image, logo } =
    useSelector((state: RootState) => state.auth) || {};

  // useEffect(() => {
  //   const studentParam = searchParams.get("student");
  //   let studentName = "";
  //   let studentID = "";

  //   if (studentParam) {
  //     try {
  //       const studentObj = JSON.parse(decodeURIComponent(studentParam));
  //       studentName = studentObj.student_name;
  //       studentID = studentObj.student_id;
  //     } catch (error) {
  //       console.error("Error parsing student parameter:", error);
  //     }
  //   }

  //   let newHeading = "Library Management System";
  //   let newSubheading = "Tanvir Chavan";

  //   if (pathname === "/student-page") newHeading = "Student Directory";
  //   if (pathname === "/fees-penalties-page") newHeading = "Fees & Penalities";
  //   if (pathname === "/visitlog-page") newHeading = "Visit Activities";
  //   if (pathname === "/book-pages/all-books") newHeading = "Books List";
  //   if (pathname === "/book-pages/issue-books") newHeading = "Issue Books";
  //   if (pathname === "/book-pages/add-book") newHeading = "Add Book";
  //   if (pathname === "/book-pages/add-journal") newHeading = "Add Journal";
  //   if (pathname === "/book-pages/edit-book") newHeading = "Edit Book";

  //   if (
  //     pathname === "/student-page/student-profile" &&
  //     studentName &&
  //     studentID
  //   ) {
  //     newHeading = `${studentName}`;
  //     newSubheading = `${studentID}`;
  //   }

  //   setHeading(newHeading);
  //   setSubheading(newSubheading);
  // }, [pathname, searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-between mx-5 font-josefin mt-7">
        {isLoading ? (
          <div className="flex-1">
            <Skeleton className="ml-[22px] h-10 w-full max-w-[15rem] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
            <Skeleton className="ml-[22px] h-5 mt-3 w-full max-w-[12rem] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
          </div>
        ) : (
          <div className="flex-1">
            <h1 className="ml-[22px] text-black text-3xl font-bold">
              {heading}
            </h1>
            <p className="ml-[22px] text-gray-500 mt-[5px] font-medium text-lg">
              {subheading}
            </p>
          </div>
        )}
        <div className="border-2 border-blue-500 rounded-xl bg-white overflow-hidden w-[145px] h-[57px] flex items-center justify-between px-2 mt-2 mr-[50px]">
          <div className="flex items-center -ml-[15px]">
            {/* ✅ Tia Icon or Logo */}
            <Image
              height={20} width={20}
              src={logo || TiaIcon.src}
              alt="logo"
              className="w-[45px] h-[45px] ml-4"
            />

            {/* ✅ Vertical Separator */}
            <div className="w-[1px] h-[24px] bg-blue mx-[8px]" />

            {/* ✅ Header Box (Image or Fallback Text) */}
            {header_image ? (
              <Image
                height={20} width={20}
                src={header_image || ""}
                alt="Institute Header"
                className="w-[145px] h-[57px] object-cover rounded-lg border border-blue-500"
              />
            ) : (
              <span className="text-[blue] font-bold text-[16px]">TIA</span>
            )}

            {/* ✅ Dropper Icon */}
            <Image
              height={20} width={20}
              src={Dropper.src}
              alt="dropdownIcon"
              className="ml-[5px] h-[10px] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Header;
