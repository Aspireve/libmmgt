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
import JsBarcode from "jsbarcode";
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

  const profileImage = watch("image_field");
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const generateBarcode = (phoneNo?: string) => {
  //   const barcodeValue = phoneNo ? phoneNo : Date.now().toString();
  //   const canvas = document.createElement("canvas");
  //   JsBarcode(canvas, barcodeValue, {
  //     format: "CODE128",
  //     displayValue: true,
  //     fontSize: 12,
  //     height: 50,
  //     margin: 5,
  //     textMargin: 2,
  //   });

  //   const barcodeDataUrl = canvas.toDataURL("image/png");
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = barcodeDataUrl;
  //   downloadLink.download = `Student_Barcode_${phoneNo || "Unknown"}.png`;
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };

  const handleStudentSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      router.push("/student-page");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setValue("image_field", e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />
      <Header heading="Add Student" subheading="Student Registration" />

      <form
        onSubmit={handleSubmit(handleStudentSubmit)}
        className="my-10 mx-[40px] space-y-6"
      >
        {/* <Label>Profile Image</Label> */}
        <div className="flex gap-6">
          <div className="flex flex-col border gap-4 border-[#E0E2E7] bg-[#F9F9FC] items-center justify-center rounded-xl p-2 px-6">
            {profileImage ? (
              <Image
                src={profileImage as string}
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
              label="Full Name"
              name="student_name"
              register={register}
              type="text"
              placeholder="Enter Full Name"
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
              name="roll_no"
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
                i_name="phone_no"
                readOnly={false}
                error={errors}
                register={register}
                setValue={(name, value) => {
                  setValue(name, value);
                  if (isPossiblePhoneNumber(value as string)) {
                    clearErrors("phone_no");
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

            <div>
              <Label>Year of Admission</Label>
              <Input
                {...register("year_of_admission")}
                type="text"
                placeholder="Enter Year of Admission"
                className="text-[#000] border-[#D5D7DA] placeholder:text-[#aaa]"
              />
            </div>

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

            <div>
              <Label>Date of Birth</Label>
              <Input
                {...register("date_of_birth", {
                  validate: (value) =>
                    value && value <= today
                      ? true
                      : "Date of Birth cannot be in the future",
                })}
                type="date"
                placeholder="dd-mm-yyyy"
                className="text-[#000] border-[#D5D7DA] placeholder:text-[#aaa]"
                max={today} // Restrict future dates
              />
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
                Adding Student
                <Loader2 className="h-5 w-5 animate-spin ml-2" />
              </>
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
