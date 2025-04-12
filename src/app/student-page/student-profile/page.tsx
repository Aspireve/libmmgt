"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/custom/header";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { useOne } from "@refinedev/core";
import Tabbing from "@/components/custom/tabbing";
import { ProfileSkeleton } from "@/components/students/skeletons";
import MasterTable from "@/app/test/table-page";
import { borrowedBooksColumns } from "../student-profile/studentprofile";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StudentProfileBC } from "@/components/breadcrumb/constant";
import { StudentCompleteData } from "@/types/student";
import { InputField } from "@/components/custom/inputfield";
import { useForm } from "react-hook-form";
import StudentDetailActivities from "../student-details-activities/page";

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
  const router = useRouter();
  const {
    register,
    reset,
    formState: { errors },
  } = useForm<StudentCompleteData>();

  const student_id = searchParams.get("student_id");

  const { data, isLoading } = useOne<{ data: StudentCompleteData }>({
    resource: `student/${student_id}`,
    id: ``,
    queryOptions: { retry: 1, enabled: !!student_id },
  });
  // console.log(data.data.data, "Data");

  useEffect(() => {
    reset({
      ...data?.data.data,
      gender: data?.data.data.gender === "male" ? "Male" : "Female",
      yearOfAdmission: data?.data.data.yearOfAdmission ?? "Not Provided",
      mobileNumber: data?.data.data.mobileNumber?.startsWith("+")
        ? data?.data.data.mobileNumber
        : `+91${data?.data.data.mobileNumber}`,
    });
  }, [data, reset]);

  return (
    <div>
      <StudentProfileBC />
      <Header
        heading={data?.data?.data.firstName ?? "Not Available"}
        subheading={data?.data?.data.barCode ?? "Not Available"}
        isLoading={isLoading}
      />
      <div className="mx-[40px] items-center justify-center py-6">
        {isLoading ? (
          <ProfileSkeleton />
        ) : !data?.data ? (
          <div className="text-center text-gray-500">
            No student data found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4  mt-4">
            {/* Left Side: Profile Image */}
            <div className="md:col-span-1 flex md:justify-start h-[200px] flex-col border border-[#E0E2E7] bg-[#F9F9FC] items-center justify-center rounded-xl">
              {data?.data?.data.profileImage ? (
                <Image
                  src={data.data.data.profileImage}
                  alt="Profile"
                  width={200}
                  height={0}
                  className="rounded-[10px] border border-gray-300 h-full w-full"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <UserRound
                  className="text-[#1E40AF] bg-[#0066FF3D] p-3 rounded-full border-8 border-[#789DFFAB] m-auto"
                  strokeWidth={2.5}
                  size={70}
                />
              )}
            </div>

            {/* Right Side: Input Fields in 3x2 Grid */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  label="First Name"
                  name="firstName"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Middle Name"
                  name="middleName"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Department"
                  name="department"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Course Name"
                  name="courseName"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Phone No."
                  name="mobileNumber"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Roll No."
                  name="rollNo"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Year Of Admission"
                  name="yearOfAdmission"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Gender"
                  name="gender"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Blood Group"
                  name="bloodGroup"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Gender"
                  name="gender"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Father's Name"
                  name="secPhoneNumber"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Mother's Name"
                  name="terPhoneNumber"
                  type="text"
                  readonly={true}
                  register={register}
                  errors={errors}
                />
                {/* {profiledata
                  .filter((field) => field.name !== "address")
                  .map((field) => {
                    let value =
                      data?.data?.[field.name as keyof StudentCompleteData] ??
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
                            className={`border-gray-300 p-2 rounded-md ${
                              value !== "Not Provided"
                                ? "text-[#000]"
                                : "text-[#717680]"
                            }`}
                            type={field.type}
                            readOnly
                            value={value}
                            placeholder="Not Provided"
                          />
                        )}
                      </div>
                    );
                  })} */}
              </div>
            </div>

            {/* Full Width: Address Textarea */}
            <div className="md:col-span-4">
              <Label className="text-[#808080] font-medium mb-1">Address</Label>
              <Textarea
                {...register("address")}
                className="border-[#D5D7DA] p-2 text-[#000] rounded-[8px]"
                readOnly
                placeholder="Not Provided"
              />
            </div>
            <Button
              variant="outline"
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
            [LibraryTabs.ACTIVITY]: <StudentDetailActivities />,
          }}
        />
      </div>
    </div>
  );
};

export default Page;
