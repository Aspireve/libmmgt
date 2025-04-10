"use client";

import React, { useState, useRef } from "react";
import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAddStudentForm } from "@/hooks/add-student-form";
import PhoneNumber from "@/components/phone-number.tsx/PhoneNumber";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { InputField } from "@/components/custom/inputfield";
import { CustomBreadcrumb } from "@/components/breadcrumb";
import InstituteDropdown from "@/components/InputDropdown/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useList } from "@refinedev/core";
import { isPossiblePhoneNumber } from "react-phone-number-input";

const AddStudent: React.FC = () => {
  const breadcrumbItems = [
    { label: "Student Directory", href: "/student-page" },
    { label: "Add Student", href: "/student-page/AddStudent" },
  ];

  const router = useRouter();
  const {
    onSubmit,
    register,
    handleSubmit,
    isLoading,
    setValue,
    errors,
    watch,
    clearErrors,
    setError,
  } = useAddStudentForm();

  const {
    data: departmentList,
    isLoading: isDepartmentLoading,
    error,
  } = useList<string[]>({
    resource: `student/departments`,
  });

  const getDepartmentOptions = (): string[] => {
    if (isDepartmentLoading) return ["Loading..."];
    if (error) return ["Error loading departments"];
    if (!departmentList?.data) return ["NA"];
    return Array.isArray(departmentList.data)
      ? departmentList.data.flat()
      : ["NA"];
  };

  const profileImage = watch("profileImage");
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStudentSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      router.push("/student-page");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setValue("profileImage", e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />
      <Header heading="Add Member" subheading="Student or Staff Registration" />

      <form
        onSubmit={handleSubmit(handleStudentSubmit)}
        className="my-10 mx-[40px] space-y-6"
      >
        <div className="flex gap-6">
          <div className="flex flex-col border gap-4 border-[#E0E2E7] bg-[#F9F9FC] items-center justify-center rounded-xl p-2 px-6">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <UserRound
                className="text-[#1E40AF] bg-[#0066FF22] p-3 rounded-full border-8 border-[#789DFF66]"
                strokeWidth={2.5}
                size={70}
              />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              type="button"
              className="cursor-pointer bg-[#0066FF22] hover:bg-[#0066ff59] text-[#1E40AF] px-6 py-2 rounded-[5px] text-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              {profileImage ? "Change Image" : "Add Image"}
            </Button>
          </div>

          <div className="w-full grid grid-cols-3 gap-4">
            <InputField
              errors={errors}
              label="First Name"
              name="firstName"
              register={register}
              type="text"
              placeholder="Enter First Name"
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
                if (value) clearErrors("department");
              }}
              selectedValue={watch("department")}
              register={register}
              name="department"
              disabled={false}
              readonly={false}
              errors={errors}
              required
            />

            <InputField
              errors={errors}
              label="Roll No."
              name="rollNo"
              register={register}
              type="number"
              placeholder="Enter Roll No."
            />

            <InputField
              errors={errors}
              label="Email"
              name="email"
              register={register}
              type="email"
              placeholder="Enter Email"
            />

            <div>
              <Label>
                Phone Number <span className="text-red-500"> *</span>
              </Label>
              <PhoneNumber
                i_name="mobileNumber"
                readOnly={false}
                error={errors}
                register={register}
                setValue={(name, value) => {
                  setValue(name, value);
                  if (isPossiblePhoneNumber(value as string)) {
                    clearErrors("mobileNumber");
                  }
                }}
              />
            </div>

            <div className="text-[#717680]">
              <Label>
                Gender <span className="text-red-500"> *</span>
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("gender", value);
                  if (value) clearErrors("gender");
                }}
              >
                <SelectTrigger className="w-full p-2 border border-[#D5D7DA] rounded text-[#000]">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#D5D7DA] rounded shadow-md">
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
            <InputField
              errors={errors}
              label="Year of Admission"
              name="yearOfAdmission"
              register={register}
              type="text"
              placeholder="Enter Year of Admission"
            />

            <div className="relative">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="text-[#000] border-[#D5D7DA] placeholder:text-[#aaa]"
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
            </div>

            <div className="text-[#717680]">
              <Label>
                Blood Group <span className="text-red-500"> *</span>
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("bloodGroup", value);
                  if (value) clearErrors("bloodGroup");
                }}
                // defaultValue="student"
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

            <InputField
              errors={errors}
              label="Course Name"
              name="courseName"
              register={register}
              type="text"
              placeholder="Enter Course Name"
            />

            <div>
              <Label>Date of Birth</Label>
              <Input
                {...register("dateOfBirth", {
                  validate: (value) =>
                    value && value <= today
                      ? true
                      : "Date of Birth cannot be in the future",
                })}
                name="dateOfBirth"
                type="date"
                placeholder="dd-mm-yyyy"
                className="text-[#000] border-[#D5D7DA] placeholder:text-[#aaa]"
                max={today}
              />
            </div>
            {/* Role Dropdown */}
            <div className="text-[#717680]">
              <Label>
                Role <span className="text-red-500"> *</span>
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("role", value);
                  if (value) clearErrors("role");
                }}
                defaultValue="student"
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
          </div>
        </div>

        <div>
          <Label>Address</Label>
          <Textarea
            {...register("address")}
            placeholder="Enter Address"
            className="w-full p-2 border border-[#D5D7DA] rounded h-24 text-[#000] placeholder:text-[#aaa]"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="outline"
            className="shadow-none bg-white text-gray-700"
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
                {watch("role") === "staff" ? "Adding Staff" : "Adding Student"}
                <Loader2 className="h-5 w-5 animate-spin ml-2" />
              </>
            ) : watch("role") === "staff" ? (
              "Add Staff"
            ) : (
              "Add Student"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddStudent;
