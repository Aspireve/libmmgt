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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Profile from "@/images/ProfileImage.png";
import { UserRound } from "lucide-react";
import { InputField } from "@/components/custom/inputfield";
import Institute_Dropdown from "@/components/InputDropdown/page";
import { CustomBreadcrumb } from "@/components/breadcrumb";

const AddStudent: React.FC = () => {
  const breadcrumbItems = [
    { label: "Student Directory", href: "/student-page" },
    { label: "Add Student", href: "/student-page/AddStudent" },
  ];

  const router = useRouter();
  const { onSubmit, register, handleSubmit, isLoading, setValue, errors } =
    useAddStudentForm();
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to get current form values for barcode generation
  const getFormValues = () => {
    const form = document.querySelector("form");
    if (!form) return {};

    const formData = new FormData(form as HTMLFormElement);
    const data: Record<string, any> = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const genderElement = document.querySelector(
      'select[name="gender"]'
    ) as HTMLSelectElement;
    if (genderElement) {
      data["gender"] = genderElement.value || "";
    }

    return data;
  };

  // Function to handle the print button (generate and download barcode)
  const handlePrint = () => {
    const currentData = getFormValues();
    const fileName = `Student_Barcode_${currentData.student_name || "Unknown"}`;
    const barcodeValue = currentData.roll_no
      ? `${currentData.roll_no}${Date.now().toString().slice(-6)}`
      : Date.now().toString();

    console.log(
      `Generating barcode with value ${barcodeValue} and filename ${fileName}`
    );
  };

  return (
    <>
    <CustomBreadcrumb items={breadcrumbItems}/>
      <Header heading="Add Student" subheading="Student Registration" />

      <section className="p-10">
        <div className="container mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-6">
              {/* First Container - Profile Image */}
              <div className="w-1/6 flex flex-col border border-[#E0E2E7] bg-[#F9F9FC] items-center justify-center rounded-xl">
                <div className="mb-4">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
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
                  className="cursor-pointer bg-[#0066FF3D] text-[#1E40AF] px-6 py-2 rounded-[5px] text-sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profileImage ? "Change Image" : "Add Image"}
                </Button>
              </div>

              {/* Second Container - Input Fields Grid */}
              <div className="w-5/6">
                <div className="grid grid-cols-3 gap-4">
                  {/* First Row */}
                  <InputField
                    errors={errors}
                    label="Full Name"
                    name="student_name"
                    register={register}
                    type="text"
                    validation={{
                      required: "Full Name is required",
                    }}
                    placeholder="Enter Full Name"
                  />
                  {/* // TODO: make this the input dropdown */}
                  {/* <Institute_Dropdown
                    setValue={(e) => {}}
                    options={["COMP", "HMMM"]}
                  /> */}
                  <div>
                    <Label>Department</Label>
                    <Input
                      {...register("department")}
                      type="text"
                      placeholder="Enter Department"
                    />
                  </div>

                  <InputField
                    errors={errors}
                    label="Roll No."
                    name="roll_no"
                    register={register}
                    type="number"
                    validation={{
                      valueAsNumber: true,
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

                  {/* TODO: Add Validation */}
                  <div>
                    <Label>Phone Number</Label>
                    <PhoneNumber
                      name="phone_no"
                      readOnly={false}
                      setValue={(name, value) => setValue("phone_no", value)}
                    />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <Select
                      onValueChange={(value) =>
                        register("gender").onChange({
                          target: { value, name: "gender" },
                        })
                      }
                      required
                    >
                      <SelectTrigger className="w-full p-2 border border-[#717680] rounded">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Second Row */}

                  <div>
                    <Label>Year of Admission</Label>
                    <Input
                      {...register("year_of_admission")}
                      type="text"
                      placeholder="Enter Year of Admission"
                    />
                  </div>

                  {/* Third Row */}
                  <div className="relative">
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
                  </div>

                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      {...register("date_of_birth")}
                      type="date"
                      placeholder="dd-mm-yyyy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address - Full width at the bottom */}
            <div>
              <Label>Address</Label>
              <Textarea
                {...register("address")}
                placeholder="Enter Address"
                className="w-full p-2 border border-[#717680] rounded h-24"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <Button
                className="shadow-none bg-gray-200 text-gray-700 hover:bg-gray-300"
                type="button"
                onClick={() => router.push("/student-page")}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handlePrint}
                className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white rounded-[10px]"
              >
                Generate Barcode
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
        </div>
      </section>
    </>
  );
};

export default AddStudent;
