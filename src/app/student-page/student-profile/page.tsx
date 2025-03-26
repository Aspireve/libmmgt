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
import { CustomBreadcrumb } from "@/components/breadcrumb";

enum LibraryTabs {
  BORROWED = "borrowed",
  ACTIVITY = "activities",
}

const TABS = [
  { key: LibraryTabs.BORROWED, label: "Borrowed Books" },
  { key: LibraryTabs.ACTIVITY, label: "Activities" },
];

const Page = () => {
  const breadcrumbItems = [
    { label: "Student Directory", href: "/student-page" },
    { label: "Student Profile", href: "/student-page/student-profile" },
  ];
  const searchParams = useSearchParams();
  const studentUuid = searchParams.get("student_uuid");
  const student_id = searchParams.get("student_id");
  console.log({ student_id });

  const { data, isLoading } = useOne<StudentProfileData>({
    resource: "student/detail",
    id: `student_id=${student_id}`,
    queryOptions: {
      retry: 1,
      enabled: !!student_id,
    },
  });

  // Conditional rendering inside returned JSX instead of early returns
  return (
    <div>
      <CustomBreadcrumb items={breadcrumbItems} />

      <Header
        heading={data?.data.student_name || ""}
        subheading={data?.data.student_id || ""}
        isLoading={isLoading}
      />
      <div className="mx-[40px] rounded-lg">
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
                          className="border-gray-300 p-2 rounded-md pr-10 text-[#717680]"
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
                        className="border-gray-300 p-2 rounded-md text-[#717680]"
                        type={field.type}
                        readOnly
                        value={value}
                        placeholder={"Not Provided"}
                      />
                    )}
                  </div>
                );
              })}
            <div className="col-span-4">
              <Label className="text-[#808080] font-medium mb-1">Address</Label>
              <Textarea
                className="border-gray-300 p-2 rounded-md text-[#717680]"
                value={data?.data?.address || ""}
                readOnly
                placeholder="Not Provided"
              />
            </div>
          </div>
        )}
      </div>
      <div className="mx-[40px]">
      <Tabbing
        tabs={TABS}
        content={{
          [LibraryTabs.BORROWED]: (
            <>
              <MasterTable
                title="Borrowed"
                resource="Book_v2/get_logs_of_student"
                columns={() => borrowedBooksColumns}
                query={[
                  {
                    field: "_student_id",
                    operator: "eq",
                    value: `${student_id}`,
                  },
                ]}
                AddedOptions={[]}
              />
            </>
          ),
          [LibraryTabs.ACTIVITY]: (
            <>
              <MasterTable
                resource="student/visitlog_by_id"
                title="Activities"
                columns={() => studentActivitiesColumns}
                query={[
                  {
                    field: "_student_id",
                    operator: "eq",
                    value: `${student_id}`,
                  },
                ]}
                AddedOptions={[]}
              />
            </>
          ),
        }}
      />
      </div>
    </div>
  );
};

export default Page;
