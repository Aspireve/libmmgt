"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/custom/header";
import { profiledata } from "../student-profile/studentprofile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { UserRound } from "lucide-react";
import Images from "@/images";
import { StudentProfileData } from "@/app/student-page/student-profile/studentprofile";
import { useOne } from "@refinedev/core";
import Tabbing from "@/components/custom/tabbing";
import { ProfileSkeleton } from "@/components/students/skeletons";
import MasterTable from "@/app/test/table-page";
import {
  borrowedBooksColumns,
  studentActivitiesColumns,
} from "../student-profile/studentprofile";
import { CustomBreadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

  const { data, isLoading } = useOne<StudentProfileData>({
    resource: "student/detail",
    id: `student_id=${student_id}`,
    queryOptions: { retry: 1, enabled: !!student_id },
  });

  // Function to normalize phone number
  const normalizePhoneNumber = (phone: string | undefined) => {
    if (!phone) return "Not Provided"; // Handle missing data
    const trimmedPhone = phone.trim();
    return trimmedPhone.startsWith("+") ? trimmedPhone : `+91${trimmedPhone}`;
  };

  const router = useRouter();

  return (
    <div>
      <CustomBreadcrumb items={breadcrumbItems} />
      <Header
        heading={data?.data?.student_name ?? "Not Available"}
        subheading={data?.data?.student_id ?? "Not Available"}
        isLoading={isLoading}
      />
      <div className="mx-[40px] items-center justify-center p-6">
        {isLoading ? (
          <ProfileSkeleton />
        ) : !data?.data ? (
          <div className="text-center text-gray-500">
            No student data found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
            {/* Left Side: Profile Image */}
            <div className="md:col-span-1 flex justify-center md:justify-start">
              <div className="w-[200px] h-[200px] flex flex-col border border-[#E0E2E7] bg-[#F9F9FC] items-center justify-center rounded-xl">
                {data?.data?.profileImage ? (
                  <Image
                    src={data.data.profileImage}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full border border-gray-300"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <UserRound
                    className="text-[#1E40AF] bg-[#0066FF3D] p-3 rounded-full border-8 border-[#789DFFAB]"
                    strokeWidth={2.5}
                    size={70}
                  />
                )}
              </div>
            </div>

            {/* Right Side: Input Fields in 3x2 Grid */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {profiledata
                  .filter((field) => field.name !== "address")
                  .map((field) => {
                    let value =
                      data?.data?.[field.name as keyof StudentProfileData] ??
                      "Not Provided";
                    // Normalize phone number only for phone_no field
                    if (field.name === "phone_no" && value !== "Not Provided") {
                      value = value.trim().startsWith("+")
                        ? value
                        : `+91${value.trim()}`;
                    }
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
                              value={
                                value !== "Not Provided"
                                  ? value.split("T")[0]
                                  : ""
                              }
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
                            placeholder="Not Provided"
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Full Width: Address Textarea */}
            <div className="md:col-span-4">
              <Label className="text-[#808080] font-medium mb-1">Address</Label>
              <Textarea
                className="border-gray-300 p-2 rounded-md text-[#717680]"
                value={data?.data?.address ?? "Not Provided"}
                readOnly
                placeholder="Not Provided"
              />
            </div>
            <Button
              onClick={() =>
                router.push(
                  `/student-page/EditStudent?student_id=${student_id}`
                )
              }
              className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]"
            >
              Edit Profile
            </Button>
          </div>
        )}
      </div>

      <div className="mx-[40px]">
        <Tabbing
          tabs={TABS}
          content={{
            [LibraryTabs.BORROWED]: (
              <MasterTable
                title="Borrowed"
                resource="Book_v2/get_logs_of_student"
                columns={() => borrowedBooksColumns}
                query={[
                  {
                    field: "_student_id",
                    operator: "eq",
                    value: student_id ?? "",
                  },
                ]}
                AddedOptions={[]}
              />
            ),
            [LibraryTabs.ACTIVITY]: (
              <MasterTable
                resource="student/visitlog_by_id"
                title="Activities"
                columns={() => studentActivitiesColumns}
                query={[
                  {
                    field: "_student_id",
                    operator: "eq",
                    value: student_id ?? "",
                  },
                ]}
                AddedOptions={[]}
              />
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Page;
