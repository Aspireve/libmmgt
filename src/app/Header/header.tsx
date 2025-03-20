"use client";

import React, { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import TiaIcon from "../../images/Tia.png";
import Dropper from "../../images/Dropper.png";

interface HeadersProps {
  heading?: string;
  subheading?: string;
}

const Header:React.FC<HeadersProps> = ({ heading, subheading }) => {

 
  
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
      <div className="flex-1">
        <h1 className="ml-[22px] text-black text-3xl font-bold">{heading}</h1>
        <p className="ml-[22px] text-gray-500 mt-[5px] font-medium text-lg">
          {subheading}
        </p>
      </div>
      <div className="border-2 border-blue-500 rounded-xl bg-white overflow-hidden w-[145px] h-[57px] flex items-center justify-between px-2 mt-2 mr-[50px]">
        <div className="flex items-center -ml-[15px]">
          {/* ✅ Tia Icon or Logo */}
          <img
            src={logo || TiaIcon.src}
            alt="logo"
            className="w-[45px] h-[45px] ml-4"
          />

          {/* ✅ Vertical Separator */}
          <div className="w-[1px] h-[24px] bg-blue mx-[8px]" />

          {/* ✅ Header Box (Image or Fallback Text) */}
          {header_image ? (
            <img
              src={header_image || ""}
              alt="Institute Header"
              className="w-[145px] h-[57px] object-cover rounded-lg border border-blue-500"
            />
          ) : (
            <span className="text-[blue] font-bold text-[16px]">TIA</span>
          )}

          {/* ✅ Dropper Icon */}
          <img
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
