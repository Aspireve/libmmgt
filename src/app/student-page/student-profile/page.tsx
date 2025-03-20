"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/app/Header/header";
import { profiledata } from "../student-profile/studentprofile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import calendarIcon from "@/images/calender.png"; // Import calendar icon
import { StudentProfileData } from "@/app/student-page/student-profile/studentprofile";
import { borrowedBooksColumns } from "../student-profile/studentprofile";
import { useOne } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { MainTable } from "@/components/data-tables/main-table";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  // Always call hooks at the top.
  const searchParams = useSearchParams();
  const studentUuid = searchParams.get("student_uuid");

  const [activeTab, setActiveTab] = useState<"borrowed" | "activities">("borrowed");

  const { data, isLoading } = useOne<StudentProfileData>({
    resource: "student/detail",
    id: `student_uuid=${studentUuid}`,
    queryOptions: {
      retry: 1,
      enabled: !!studentUuid,
    },
  });

  // Use fallback values so that even when data is not available we have default values.
  const studentData = data?.data || {
    student_name: "",
    student_id: "",
    address: "",
  };

  // Conditional rendering inside returned JSX instead of early returns
  return (
    <div>
      <Header
        heading={studentData.student_name || "Student"}
        subheading={studentData.student_id || ""}
      />
      <div className="max-w-5xl ml-5 p-6 rounded-lg">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <Skeleton className="h-6 w-1/3" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <div className="flex justify-center gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        ) : !data?.data ? (
          <div>No student data found.</div>
        ) : (
          <div className="grid grid-cols-4 gap-6 mt-4">
            {profiledata
              .filter((field) => field.name !== "address")
              .map((field) => {
                const value =
                  studentData[field.name as keyof StudentProfileData] || "";
                return (
                  <div key={field.name} className="flex flex-col">
                    <Label className="text-[#808080] font-medium mb-1">
                      {field.label}
                    </Label>
                    {field.type === "date" ? (
                      <div className="relative">
                        <Input
                          className="border-gray-300 p-2 rounded-md pr-10 text-black"
                          type="date"
                          value={value ? value.split("T")[0] : ""}
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
                        className="border-gray-300 p-2 rounded-md text-black"
                        type={field.type}
                        readOnly
                        value={value}
                      />
                    )}
                  </div>
                );
              })}
            <div className="col-span-4">
              <Label className="text-[#808080] font-medium mb-1">Address</Label>
              <Textarea
                className="border-gray-300 p-2 rounded-md"
                value={studentData.address || ""}
                readOnly
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-fit ml-10">
        <div className="mt-8 flex justify-evenly bg-white border border-[#e4e4e4] rounded-[8px] gap-[6px] m-4 p-[10px]">
          <Button
            className={`rounded-[6px] shadow-none transition-all duration-300 py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px] ${
              activeTab === "borrowed"
                ? "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF]"
                : "bg-white text-black border-0"
            }`}
            onClick={() => setActiveTab("borrowed")}
          >
            Borrowed Books
          </Button>
          <Button
            className={`rounded-[6px] shadow-none transition-all duration-300 py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px] ${
              activeTab === "activities"
                ? "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF]"
                : "bg-white text-black border-0"
            }`}
            onClick={() => setActiveTab("activities")}
          >
            Activities
          </Button>
        </div>
      </div>

      <section className="border border-[#E0E2E7] rounded-[10px] w-[80%] ml-10 mb-10 mt-6">
        <MainTable columns={borrowedBooksColumns} resource="Book_v2/borrowed" />
      </section>
    </div>
  );
};

export default Page;
