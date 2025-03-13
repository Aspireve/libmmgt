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
import { useOne } from "@refinedev/core";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const searchParams = useSearchParams();
  const studentUuid = searchParams.get("student_uuid");

  const { data, isLoading } = useOne<StudentProfileData>({
    resource: "student/detail",
    id: `student_uuid=${studentUuid}`,
    queryOptions: {
      retry: 1,
      enabled: !!studentUuid,
    },
  });

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
                data?.data[field.name as keyof StudentProfileData] || "";

              return isLoading ? (
                <Skeleton className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
              ) : (
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
                        value={value ? value.split("T")[0] : ""} // Extract only "YYYY-MM-DD"
                        readOnly
                      />
                      <Image
                        src={calendarIcon}
                        alt="Calendar"
                        width={20}
                        height={20}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
          {isLoading ? (
            <Skeleton className="col-span-4 h-15 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
          ) : (
            <div className="col-span-4">
              <Label className="text-[#808080] font-medium mb-1">Address</Label>
              <Textarea
                className="border-gray-300 p-2 rounded-md"
                value={data?.data.address || ""}
                readOnly
              />
            </div>
          )}
        </div>
      </div>
      <Tabbing className="w-[20%] ml-10" routes={studentprofileRoutes} />
      <section className="border border-[#E0E2E7] rounded-[10px] w-[80%] ml-10 mb-10 mt-6">
        <DataTable columns={borrowedBooksColumns} data={borrowedBooks} />
      </section>
    </>
  );
};

export default Page;
