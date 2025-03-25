"use client";

import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Eye, EyeOff, UserRound } from "lucide-react";
import { useEditStudentForm } from "@/hooks/edit-student-form";
import { useUpdate } from "@refinedev/core";
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

const EditStudent: React.FC = () => {
  const breadcrumbItems = [
    { label: "Student Directory", href: "/student-page" },
    { label: "Edit Student", href: "/student-page/EditStudent" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const studentUuid = searchParams.get("id");

  const { mutate, isLoading } = useUpdate();
  const {
    register,
    handleSubmit,
    errors,
    isFetching,
    onSubmit,
    watch,
    setValue,
  } = useEditStudentForm(studentUuid || "");

  const password = watch("password");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setProfileImage(imageUrl);
    }
  };

  if (isFetching) {
    return <EditSkeleton />;
  }

  const departmentList = [
    "Computer Science",
    "Information Technology",
    "Mechanical Engineering",
    "Electrical Engineering",
  ];

  return (
    <>
      <CustomBreadcrumb items={breadcrumbItems} />
      <Header heading="Edit Student" subheading="Update Student Information" />

      <section className="p-10">
        <div className="container mx-auto">
          <form
            onSubmit={handleSubmit((data) => onSubmit(data, mutate))}
            className="space-y-6"
          >
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

                  <InstituteDropdown
                    options={departmentList}
                    label="Department"
                    placeholder="Select Department"
                    onSelect={(value) => setValue("department", value)}
                    selectedValue={watch("department")}
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
                      value={watch("phone_no") || ""}
                      setValue={setValue}
                    />
                  </div>

                  <div>
                    <Label>Gender</Label>
                    <Select
                      {...register("gender")} 
                      value={watch("gender") || ""} 
                      onValueChange={(value) =>
                        register("gender").onChange({
                          target: { name: "gender", value },
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
