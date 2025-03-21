"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/custom/header";
import { profiledata } from "../student-profile/studentprofile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Images from "@/images"; // Import calendar icon
import { StudentProfileData } from "@/app/student-page/student-profile/studentprofile";
import { useOne } from "@refinedev/core";
import Tabbing from "@/components/custom/tabbing";
import { ProfileSkeleton } from "@/components/students/skeletons";
import MasterTable from "@/app/test/table-page";
import { borrowedBooksColumns } from "../student-profile/studentprofile";
import { studentActivitiesColumns } from "../student-profile/studentprofile";

enum LibraryTabs {
  BORROWED = "borrowed",
  ACTIVITY = "activities",
}

const TABS = [
  { key: LibraryTabs.BORROWED, label: "Borrowed Books" },
  { key: LibraryTabs.ACTIVITY, label: "Activities" },
];

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

  // Conditional rendering inside returned JSX instead of early returns
  return (
    <div>
      <Header
        heading={data?.data.student_name || ""}
        subheading={data?.data.student_id || ""}
        isLoading={isLoading}
      />
      <div className="max-w-5xl ml-5 p-6 rounded-lg">
        {isLoading ? (
          <ProfileSkeleton />
        ) : !data?.data ? (
          <div>No student data found.</div>
        ) : (
          <div className="grid grid-cols-4 gap-6 mt-4">
            {profiledata
              .filter((field) => field.name !== "address")
              .map((field) => {
                const value =
                  data?.data?.[field.name as keyof StudentProfileData] || "";
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
                          src={Images.Calendar}
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
                value={data?.data?.address || ""}
                readOnly
              />
            </div>
          </div>
        )}
      </div>
      <Tabbing
        tabs={TABS}
        content={{
          [LibraryTabs.ACTIVITY]: <><MasterTable
          title="Activities"
          resource="Book_v2/borrowed"
          columns={()=>studentActivitiesColumns}
          AddedOptions={[]}/></>,
          [LibraryTabs.BORROWED]: <><MasterTable
          resource="Book_v2/activities"
          title="Borrowed"
          columns={()=> borrowedBooksColumns}
          AddedOptions={[]}/></>,
        }}
      />
    </div>
  );
};

export default Page;
