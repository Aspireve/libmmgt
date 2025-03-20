"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEditStudentForm } from "@/hooks/edit-student-form";
import { useUpdate, useOne } from "@refinedev/core";
import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { InputField } from "@/components/custom/inputfield";

import type { StudentFromDatabase } from "@/types/student";

const EditStudent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentUuid = searchParams.get("id");

  // If no studentUuid is available, render a loading state (or you could redirect)
  // if (!studentUuid) {
  //   return (
  //     <div className="p-10">
  //       <Header heading="Edit Student" subheading="Loading..." />
  //       <Skeleton className="h-6 w-1/3" />
  //     </div>
  //   );
  // }

  // Fetch existing student data
  const {
    data: studentData,
    isLoading: isFetchingStudent,
    error: fetchError,
  } = useOne<StudentFromDatabase>({
    resource: "student/detail",
    id: `student_uuid=${studentUuid}`,
    queryOptions: { enabled: !!studentUuid },
  });

  // Initialize the "update" mutation
  const { mutate, isLoading: isUpdating } = useUpdate<StudentFromDatabase>();

  // Initialize form with React Hook Form (assuming useEditStudentForm returns reset, onSubmit, etc.)
  const {
    register,
    handleSubmit,
    errors,
    isFetching,
    error,
    reset,
    onSubmit,
    watch,
  } = useEditStudentForm(studentUuid);

  // Populate form fields once data is available
  useEffect(() => {
    if (studentData?.data) {
      const d = studentData.data;
      reset({
        student_name: d.student_name || "",
        department: d.department || "",
        email: d.email || "",
        phone_no: d.phone_no || "",
        address: d.address || "",
        roll_no: d.roll_no || 0,
        year_of_admission: d.year_of_admission || "",
        date_of_birth: d.date_of_birth ? d.date_of_birth.split("T")[0] : "",
        gender: d.gender || "",
        password: "",
        confirm_password: "",
      });
    }
  }, [studentData, reset]);

  // Watch the password field for "confirm password" validation
  const password = watch("password");

  // 1) Show loading skeleton while data is being fetched
  if (isFetchingStudent) {
    return (
      <div className="p-10">
        <Header heading="Edit Student" subheading="Loading..." />
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

 
  if (!isFetchingStudent && (fetchError || !studentData?.data)) {
    return (
      <div className="p-10">
        <Header heading="Edit Student" subheading="Error" />
      </div>
    );
  }
  

  // 3) Render the form
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header
          heading="Edit Student"
          subheading={studentData.data.student_name || "Unknown Student"}
        />
        <section className="p-10">
          <div className="container mx-auto">
            <form
              onSubmit={handleSubmit((data) => onSubmit(data, mutate))}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* -------------- Student Name -------------- */}
                <InputField
                  label="Student Name"
                  name="student_name"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{ required: "Student Name is required" }}
                />

                {/* -------------- Department -------------- */}
                <InputField
                  label="Department"
                  name="department"
                  register={register}
                  errors={errors}
                  type="text"
                />

                {/* -------------- Email -------------- */}
                <InputField
                  label="Email"
                  name="email"
                  register={register}
                  errors={errors}
                  type="email"
                />

                {/* -------------- Phone Number -------------- */}
                <InputField
                  label="Phone Number"
                  name="phone_no"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{ required: "Phone Number is required" }}
                />

                {/* -------------- Address -------------- */}
                <InputField
                  label="Address"
                  name="address"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{ required: "Address is required" }}
                />

                {/* -------------- Roll No. -------------- */}
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
                />

                {/* -------------- Year of Admission -------------- */}
                <InputField
                  label="Year of Admission"
                  name="year_of_admission"
                  register={register}
                  errors={errors}
                  type="text"
                  validation={{ required: "Year of Admission is required" }}
                />

                {/* -------------- Date of Birth -------------- */}
                <InputField
                  label="Date of Birth"
                  name="date_of_birth"
                  register={register}
                  errors={errors}
                  type="date"
                />

                {/* -------------- Gender -------------- */}
                <InputField
                  label="Gender"
                  name="gender"
                  register={register}
                  errors={errors}
                  type="text"
                />

                {/* -------------- New Password -------------- */}
                <InputField
                  label="New Password"
                  name="password"
                  register={register}
                  errors={errors}
                  type="password"
                  validation={{
                    required: password ? "New password is required" : false,
                  }}
                />

                {/* -------------- Confirm New Password -------------- */}
                <InputField
                  label="Confirm New Password"
                  name="confirm_password"
                  register={register}
                  errors={errors}
                  type="password"
                  validation={{
                    required: password ? "Confirm new password is required" : false,
                  }}
                />
              </div>

              {/* -------------- Buttons -------------- */}
              <div className="flex justify-center gap-4">
                <Button onClick={() => router.push("/student-page")}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => router.push("/student-page")}
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