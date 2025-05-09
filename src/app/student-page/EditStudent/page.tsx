"use client";

import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, UserRound } from "lucide-react";
import { useEditStudentForm } from "@/hooks/edit-student-form";
import { useList, useUpdate } from "@refinedev/core";
import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/custom/inputfield";
import { EditSkeleton } from "@/components/students/skeletons";
import { CustomBreadcrumb } from "@/components/breadcrumb";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import PhoneNumber from "@/components/phone-number.tsx/PhoneNumber";
import InstituteDropdown from "@/components/InputDropdown/page";
import { Skeleton } from "@/components/ui/skeleton";
import { isPossiblePhoneNumber } from "react-phone-number-input";

const EditStudent: React.FC = () => {
  const breadcrumbItems = [
    { label: "Student Directory", href: "/student-page" },
    { label: "Edit Student", href: "/student-page/EditStudent" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const student_id = searchParams.get("student_id");

  const { mutate, isLoading } = useUpdate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    errors,
    isFetching,
    onSubmit,
    watch,
    setValue,
    isFormInitialized,
    clearErrors,
  } = useEditStudentForm(student_id || "", setProfileImage);

  const {
    data: departmentList,
    isLoading: isDepartmentLoading,
    error,
  } = useList<string[]>({
    resource: `student/departments`,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [showPassword, setShowPassword] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setProfileImage(imageUrl);
    }
  };

  // Show the skeleton until the form is fully initialized
  if (isFetching || !isFormInitialized) {
    return <EditSkeleton />;
  }

  const getDepartmentOptions = (): string[] => {
    if (isDepartmentLoading) return ["Loading..."];
    if (error) return ["Error loading departments"];
    if (!departmentList?.data) return ["NA"];

    return Array.isArray(departmentList.data)
      ? departmentList.data.flat()
      : ["NA"];
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />
      <Header
        heading="Edit Student"
        subheading="Update Student Information"
        isLoading={isFetching}
      />

      <section className="p-10">
        <div className="container mx-auto">
          <form
            onSubmit={handleSubmit((data) => onSubmit(data, mutate))}
            className="space-y-6"
          >
            <div className="flex gap-6">
              <div className="w-1/6 flex flex-col border border-[#E0E2E7] bg-[#F9F9FC] items-center justify-center rounded-xl p-2">
                <div className="mb-4">
                  <div className="rounded-full flex items-center justify-center overflow-hidden">
                    {!isFetching && profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={150}
                        height={150}
                        className="rounded-[10px] border border-gray-300 h-full w-full"
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button
                  type="button"
                  className="cursor-pointer bg-[#0066FF3D] hover:bg-[#0066ff59] text-[#1E40AF] px-6 py-2 rounded-[5px] text-sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profileImage ? "Change Image" : "Add Image"}
                </Button>
              </div>

              <div className="w-5/6">
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    errors={errors}
                    label="Full Name"
                    name="firstName"
                    register={register}
                    type="text"
                    placeholder="Enter Full Name"
                  />
                  <InputField
                    errors={errors}
                    label="Middle Name"
                    name="middleName"
                    register={register}
                    type="text"
                    placeholder="Enter Middle Name"
                  />
                  <InputField
                    errors={errors}
                    label="Last Name"
                    name="lastName"
                    register={register}
                    type="text"
                    placeholder="Enter Last Name"
                  />

                  <InstituteDropdown
                    options={getDepartmentOptions()}
                    label="Department"
                    placeholder="Select Department"
                    onSelect={(value) => {
                      setValue("department", value);
                    }}
                    selectedValue={watch("department")}
                    register={register}
                    name="department"
                    validation={{ required: "Department is required" }}
                    disabled={false}
                    readonly={false}
                    errors={errors}
                  />

                  <InputField
                    errors={errors}
                    label="Roll No."
                    name="rollNo"
                    register={register}
                    type="text"
                    validation={{
                      required: "Roll No. is required",
                    }}
                    placeholder="Enter Roll No."
                  />

                  <InputField
                    errors={errors}
                    label="Email"
                    name="email"
                    register={register}
                    type="email"
                    validation={{
                      required: "Email is required",
                    }}
                    placeholder="Enter Email"
                  />

                  <div>
                    <Label>Phone Number</Label>
                    <PhoneNumber
                      i_name="mobileNumber"
                      value={watch("mobileNumber") || ""}
                      setValue={(name, value) => {
                        setValue(name, value || "");
                        if (isPossiblePhoneNumber(value as string)) {
                          clearErrors("mobileNumber");
                        }
                      }}
                      error={errors}
                      register={register}
                      // i_name="phone_no"
                      // readOnly={false}
                      // error={errors}
                      // register={register}
                      // setValue={(name, value) => {
                      //   setValue(name, value);
                      //   if (isPossiblePhoneNumber(value as string)) {
                      //     clearErrors("phone_no");
                      //   }
                      // }}
                    />
                  </div>

                  <div className="text-[#717680]">
                    <Label>Gender</Label>
                    <Select
                      onValueChange={(value) =>
                        register("gender").onChange({
                          target: { name: "gender", value },
                        })
                      }
                      value={watch("gender") || ""}
                      required
                    >
                      <SelectTrigger className="w-full p-2 border border-[#000] text-[#000] placeholder:text-[#aaa] rounded">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender.message || "Gender is required"}
                      </p>
                    )}
                  </div>

                  <div className="text-[#717680]">
                    <Label>
                      Blood Group <span className="text-red-500"> *</span>
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        register("bloodGroup").onChange({
                          target: { name: "bloodGroup", value },
                        });
                      }}
                      value={watch("bloodGroup") || ""}
                    >
                      <SelectTrigger className="w-full p-2 border border-[#D5D7DA] rounded text-[#000]">
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#D5D7DA] rounded shadow-md">
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.role.message || "Role is required"}
                      </p>
                    )}
                  </div>

                  <div className="text-[#717680]">
                    <Label>
                      Role <span className="text-red-500"> *</span>
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        register("role").onChange({
                          target: { name: "role", value },
                        });
                      }}
                      value={watch("role") || ""}
                    >
                      <SelectTrigger className="w-full p-2 border border-[#D5D7DA] rounded text-[#000]">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#D5D7DA] rounded shadow-md">
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.role.message || "Role is required"}
                      </p>
                    )}
                  </div>

                  <InputField
                    errors={errors}
                    label="Course Name"
                    name="courseName"
                    register={register}
                    type="text"
                    placeholder="Enter Course Name"
                  />

                  <div>
                    <Label>Year of Admission</Label>
                    <Input
                      {...register("yearOfAdmission")}
                      type="text"
                      placeholder="Enter Year of Admission"
                      className="text-[#000] placeholder:text-[#aaa]"
                    />
                  </div>

                  {/* <div className="relative">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div> */}

                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      {...register("dateOfBirth", {
                        validate: (value) =>
                          value && value <= today
                            ? true
                            : "Date of Birth cannot be in the future",
                      })}
                      type="date"
                      placeholder="dd-mm-yyyy"
                      className="text-[#000] placeholder:text-[#aaa]"
                      max={today} // Restrict future dates
                    />
                  </div>
                </div>
              </div>
            </div>

            {isFetching ? (
              <Skeleton className="h-40 rounded-xl w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
            ) : (
              <div>
                <Label>Address</Label>

                <Textarea
                  {...register("address")}
                  placeholder="Enter Address"
                  className="w-full p-2 border border-[#000] text-[#000] placeholder:text-[#aaa] rounded h-24"
                />
              </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              <Button
                className="shadow-none bg-gray-200 text-gray-700 hover:bg-gray-300"
                type="button"
                onClick={() => router.push("/student-page")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#1E40AF] hover:bg-[#152148] transition-all duration-300 text-white rounded-[10px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />{" "}
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditStudent;
