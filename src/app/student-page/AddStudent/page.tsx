"use client";

import React, { useState } from "react";
import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { InputField } from "@/components/custom/inputfield";
import { useAddStudentForm } from "@/hooks/add-student-form";

const AddStudent: React.FC = () => {
  const router = useRouter();
  const { onSubmit, register, handleSubmit, errors, isLoading } =
    useAddStudentForm();

  // States to control password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <Header heading="Add Student" subheading="Tanvir Chavan" />

      <section className="p-10">
        <div className="container mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Student Name */}
              <InputField
                errors={errors}
                label="Full Name"
                name="student_name"
                register={register}
                type="text"
                placeholder="Enter Full Name"
                validation={{ required: "Full Name is required" }}
              />
              <InputField
                errors={errors}
                label="Date of Birth"
                name="date_of_birth"
                register={register}
                type="date"
                placeholder="Enter Date of Birth"
                validation={{ required: "Date of Birth is required" }}
              />
              <InputField
                errors={errors}
                label="Department"
                name="department"
                register={register}
                type="text"
                placeholder="Enter Department"
                validation={{ required: "Department is required" }}
              />
              <InputField
                errors={errors}
                label="Email"
                name="email"
                register={register}
                type="email"
                placeholder="Enter Email"
                validation={{ required: "Email is required" }}
              />
              <InputField
                errors={errors}
                label="Phone Number"
                name="phone_no"
                register={register}
                type="text"
                placeholder="Enter Phone Number"
                validation={{ required: "Phone Number is required" }}
              />
              <InputField
                errors={errors}
                label="Address"
                name="address"
                register={register}
                type="text"
                placeholder="Enter Address"
                validation={{ required: "Address is required" }}
              />
              <InputField
                errors={errors}
                label="Roll No."
                name="roll_no"
                register={register}
                type="number"
                placeholder="Enter Roll No."
                validation={{
                  required: "Roll No. is required",
                  valueAsNumber: true,
                }}
              />
              <InputField
                errors={errors}
                label="Year of Admission"
                name="year_of_admission"
                register={register}
                type="text"
                placeholder="Enter Year of Admission"
                validation={{ required: "Year of Admission is required" }}
              />
              {/* Password Field with Toggle */}
              <div className="relative col-span-1">
                <InputField
                  errors={errors}
                  label="Password"
                  name="password"
                  register={register}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  validation={{ required: "Password is required" }}
                />
                <button
                  type="button"
                  className="absolute mt-3 top-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 mt-5" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 mt-5" />
                  )}
                </button>
              </div>
              {/* Confirm Password Field with Toggle */}
              <div className="relative col-span-1">
                <InputField
                  errors={errors}
                  label="Confirm Password"
                  name="confirm_password"
                  register={register}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  validation={{
                    required: "Confirm Password is required",
                    validate: (value: string | undefined) => {
                      // Custom validation: check if passwords match
                      const password = document.querySelector(
                        'input[name="password"]'
                      ) as HTMLInputElement;
                      return (
                        value === password?.value || "Passwords do not match"
                      );
                    },
                  }}
                />
                <button
                  type="button"
                  className="absolute mt-3 top-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 mt-5" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 mt-5" />
                  )}
                </button>
              </div>
              {/* Gender */}
              <div className="col-span-2">
                <Label>Gender</Label>
                <select
                  {...register("gender", {
                    required: "Gender is required",
                    validate: (value) =>
                      (value && ["male", "female"].includes(value)) ||
                      "Gender must be 'male' or 'female'",
                  })}
                  className="w-full p-2 border border-[#717680] rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                className="shadow-none"
                type="button"
                onClick={() => router.push("/student-page")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#1E40AF] w-full hover:bg-[#152148] transition-all duration-300 text-white rounded-[10px]"
              >
                {isLoading ? (
                  <>
                    Adding Student
                    <Loader2 className="h-5 w-5 animate-spin" />
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
