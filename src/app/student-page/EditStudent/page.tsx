"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { useUpdate } from "@refinedev/core";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditStudentForm } from "@/hooks/edit-student-form";
import { InputField } from "@/components/custom/InputField";
import type { StudentFromDatabase } from "@/types/student";

const EditStudent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentUuid = searchParams.get("id");

  const { register, handleSubmit, errors, isFetching, error, onSubmit, watch } =
    useEditStudentForm(studentUuid || "");

  const password = watch("password");
  const { mutate, isLoading: isUpdating } = useUpdate<StudentFromDatabase>();

  if (isFetching) {
    return (
      <div className="p-10">
        <Header heading="Edit Student" subheading="Tanvir Chavan" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
          <div className="flex justify-center gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error loading student data</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading="Edit Student" subheading="Tanvir Chavan" />
        <section className="p-10">
          <div className="container mx-auto">
            <form
              onSubmit={handleSubmit((data) => onSubmit(data, mutate))}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Student Name */}
                <InputField
                  label="Student Name"
                  name="student_name"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{
                    required: "Student Name is required",
                  }}
                  placeholder="Enter Student Name"
                />
                <InputField
                  label="Department"
                  name="department"
                  register={register}
                  errors={errors}
                  type="text"
                  placeholder="Enter Department"
                />
                <InputField
                  label="Email"
                  name="email"
                  register={register}
                  errors={errors}
                  type="email"
                  placeholder="Enter Email"
                />
                {/* Email */}
                <InputField
                  label="Phone Number"
                  name="phone_no"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{
                    required: "Phone Number is required",
                  }}
                  placeholder="Enter Phone Number"
                />
                <InputField
                  label="Address"
                  name="address"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{
                    required: "Address is required",
                  }}
                  placeholder="Enter Address"
                />
                <InputField
                  label="Roll No."
                  name="roll_no"
                  register={register}
                  errors={errors}
                  type="number"
                  validation={{
                    required: "Roll No. is required",
                    valueAsNumber: true,
                  }}
                  placeholder="Enter Roll No."
                />
                <InputField
                  label="Year of Admission"
                  name="year_of_admission"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{
                    required: "Year of Admission is required",
                  }}
                  placeholder="Enter Year of Admission (e.g., 2023)"
                />
                <InputField
                  label="New Password"
                  name="password"
                  register={register}
                  errors={errors}
                  type="password"
                  validation={{
                    required: password ? "New password is required" : false,
                  }}
                  placeholder="Enter New Password"
                />
                <InputField
                  label="Confirm New Password"
                  name="confirm_password"
                  register={register}
                  errors={errors}
                  type="password"
                  validation={{
                    required: password
                      ? "Confirm new password is required"
                      : false,
                  }}
                  placeholder="Confirm New Password"
                />
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => router.push("/student-page")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
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
    </Suspense>
  );
};

export default EditStudent;
