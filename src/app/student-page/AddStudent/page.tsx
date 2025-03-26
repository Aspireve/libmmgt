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
    setError,
    clearErrors
  } = useAddStudentForm();

  const { data: departmentList } = useList<{ data: string[] }>({
    resource: `student/departments`,
  });

  const profileImage = watch("image_field");

  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to generate unique barcode
  const generateBarcode = (phoneNo?: string) => {
    const barcodeValue = phoneNo ? phoneNo : Date.now().toString();

    const canvas = document.createElement("canvas");
    JsBarcode(canvas, barcodeValue, {
      format: "CODE128",
      displayValue: true,
      fontSize: 12,
      height: 50,
      margin: 5,
      textMargin: 2,
    });

    const barcodeDataUrl = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = barcodeDataUrl;
    downloadLink.download = `Student_Barcode_${phoneNo || "Unknown"}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Modified onSubmit to include barcode generation
  const handleStudentSubmit = async (data: any) => {
    try {
      if (!isPossiblePhoneNumber(data.phone_no as string)) {
        setError("phone_no", { message: "Wrong Phone Number Format" });
        return;
      }
      // First submit the student data
      const studentData: any = await onSubmit(data);
      generateBarcode(studentData?.studentId || "No ID Provided");
      router.push("/student-page");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Function to handle image upload
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

  // useEffect(() => {
  //   setError("phone_no", { message: "Wrong Number" });
  //   console.log("here");
  // }, []);

  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />
      <Header heading="Add Student" subheading="Student Registration" />

      <form
        onSubmit={handleSubmit(handleStudentSubmit)}
        className="my-10 mx-[40px] space-y-6"
      >
        <div className="flex gap-6">
          {/* First Container - Profile Image */}
          <div className="flex flex-col border gap-4 border-[#E0E2E7] bg-[#F9F9FC] items-center justify-center rounded-xl p-2">
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
              className="cursor-pointer bg-[#0066FF22] text-[#1E40AF] px-6 py-2 rounded-[5px] text-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              {profileImage ? "Change Image" : "Add Image"}
            </Button>
          </div>

          <div className="w-full grid grid-cols-3 gap-4">
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

            <InstituteDropdown
              // @ts-ignore
              options={departmentList?.data || ["NA"]}
              label="Department"
              placeholder="Select Department"
              onSelect={(value) =>
                register("department").onChange({
                  target: { value, name: "department" },
                })
              }
            />

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

            <div>
              <Label>Phone Number</Label>
              <PhoneNumber
                name="phone_no"
                readOnly={false}
                error={errors}
                setValue={(name, value) => {
                  setValue("phone_no", value);
                  if(isPossiblePhoneNumber(value as string)) {
                    clearErrors("phone_no");
                  }
                }}
              />
            </div>

            <div className="text-[#717680]">
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

            <div>
              <Label>Year of Admission</Label>
              <Input
                {...register("year_of_admission")}
                type="text"
                placeholder="Enter Year of Admission"
              />
            </div>

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

        {/* Address - Full width at the bottom */}
        <div>
          <Label>Address</Label>
          <Textarea
            {...register("address")}
            placeholder="Enter Address"
            className="w-full p-2 border border-[#717680] rounded h-24 text-[#717680]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Button
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
