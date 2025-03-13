"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/app/Header/header";
import { profiledata } from "../student-profile/studentprofile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import calendarIcon from "@/images/calender.png"; // ✅ Import calendar icon
import Tabbing from "@/app/Tab/Tab";
import { studentprofileRoutes } from "../student-profile/studentprofile";
import { DataTable } from "@/components/data-tables/data-table";
import { StudentProfileData } from "@/app/student-page/student-profile/studentprofile";
import {
  borrowedBooks,
  borrowedBooksColumns,
} from "../student-profile/studentprofile";

const Page = () => {
  const searchParams = useSearchParams();
  const [studentData, setStudentData] =
    useState<Partial<StudentProfileData> | null>(null);

  // ✅ Parse student JSON from the URL
  useEffect(() => {
    const studentParam = searchParams.get("student");
    if (studentParam) {
      try {
        const decoded = decodeURIComponent(studentParam);
        const parsed = JSON.parse(decoded) as StudentProfileData;
        setStudentData(parsed);
      } catch (error) {
        console.error("Error parsing student param:", error);
      }
    }
  }, [searchParams]);

  return (
    <>
           <Header heading="Student Profile" subheading="Tanvir Chavan"/>
     
      <div className="max-w-5xl ml-5 p-6 rounded-lg">
        {/* ✅ Student Information Grid */}
        <div className="grid grid-cols-4 gap-6 mt-4">
          {profiledata
            .filter((field) => field.name !== "address")
            .map((field) => {
              const value =
                studentData?.[field.name as keyof StudentProfileData] || "";

              return (
                <div key={field.name} className="flex flex-col">
                  <Label className="text-[#808080] font-medium mb-1">
                    {field.label}
                  </Label>

                  {/* ✅ Calendar Icon for Date Field */}
                  {field.type === "date" ? (
                    <div className="relative">
                      <Input
                        className="border-gray-300 p-2 rounded-md pr-10"
                        type="date"
                        value={value}
                      />
              
                    </div>
                  ) : (
                    <Input
                      className="border-gray-300 p-2 rounded-md"
                      type={field.type}
                      value={value}
                    />
                  )}
                </div>
              );
            })}

          {/* ✅ Move Address to Last Row */}
          <div className="col-span-4">
            <Label className="text-[#808080] font-medium mb-1">Address</Label>
            <Textarea
              className="border-gray-300 p-2 rounded-md text-[#808080]"
              value={studentData?.address || ""}
            />
          </div>
        </div>
      </div>
      <Tabbing className="w-[20%] ml-10" routes={studentprofileRoutes} />
      <section className="border border-[#E0E2E7] rounded-[10px] w-[80%] ml-10 mb-10 mt-6">
      <DataTable columns={borrowedBooksColumns} data={borrowedBooks}  />
      </section>
    </>
  );
};

export default Page;
