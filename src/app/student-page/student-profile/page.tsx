"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/app/Header/header";
import { profiledata } from "../student-profile/studentprofile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import calendarIcon from "@/images/calender.png"; // ✅ Import calendar icon
import { DataTable } from "@/components/data-tables/data-table";
import { StudentProfileData } from "@/app/student-page/student-profile/studentprofile";
import {
  borrowedBooksColumns,
  studentActivitiesColumns,
} from "../student-profile/studentprofile";
import { useOne } from "@refinedev/core";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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

  const name = data?.data.student_name
  const id = data?.data.student_id


  console.log({ data, isLoading, name });

  // State for active tab: "borrowed" or "activities"
  const [activeTab, setActiveTab] = useState<"borrowed" | "activities">("borrowed");

  // Custom CSS classes (as in your dashboard example)
  const paddingClasses =
    "transition-all duration-300 py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px]";
  const activeClasses =
    "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF]";
  const inactiveClasses = "bg-white text-black border-0";

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <>
      <Header heading={name} subheading={id} />

      <div className="max-w-5xl ml-5 p-6 rounded-lg">
        {/* Student Information Grid */}
        <div className="grid grid-cols-4 gap-6 mt-4">
          {profiledata
            .filter((field) => field.name !== "address")
            .map((field) => {
              const value =
                data?.data[field.name as keyof StudentProfileData] || "";
              return isLoading ? (
                <Skeleton
                  key={field.name}
                  className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
                />
              ) : (
                <div key={field.name} className="flex flex-col">
                  <Label className="text-[#808080] font-medium mb-1">
                    {field.label}
                  </Label>
                  {/* Calendar Icon for Date Field */}
                  {field.type === "date" ? (
                    <div className="relative">
                      <Input
                        className="border-gray-300 p-2 rounded-md pr-10 text-black"
                        type="date"
                        value={value ? value.split("T")[0] : ""} // Extract only "YYYY-MM-DD"
                        readOnly={true}
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
                      className="border-gray-300 p-2 rounded-md text-black"
                      type={field.type}
                      readOnly={true}
                      value={value}
                    />
                  )}
                </div>
              );
            })}

          {/* Move Address to Last Row */}
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

      {/* Tab Buttons */}
      <div className="w-fit ml-10">
        <div className="mt-8 flex justify-evenly bg-white border border-[#e4e4e4] rounded-[8px] gap-[6px] m-4 p-[10px]">
          <Button
            className={`rounded-[6px] shadow-none ${paddingClasses} ${
              activeTab === "borrowed" ? activeClasses : inactiveClasses
            }`}
            onClick={() => setActiveTab("borrowed")}
          >
            Borrowed Books
          </Button>
          <Button
            className={`rounded-[6px] shadow-none ${paddingClasses} ${
              activeTab === "activities" ? activeClasses : inactiveClasses
            }`}
            onClick={() => setActiveTab("activities")}
          >
            Activities
          </Button>
        </div>
      </div>

      {/* Data Table Section */}
      <section className="border border-[#E0E2E7] rounded-[10px] w-[80%] ml-10 mb-10 mt-6">
        {/* <DataTable columns={borrowedBooksColumns} resource="Book_v2/borrowed" />  */}
      </section>
    </>
    </Suspense>
  );
};

export default Page;
