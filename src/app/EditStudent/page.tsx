"use client";

import React, { useEffect } from "react";
import Header from "../Header/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, FieldValues } from "react-hook-form";
import { useUpdate } from "@refinedev/core";
import { useRouter, useSearchParams } from "next/navigation";
import { Student } from "../student-page/studentcolumns";
import { toast } from "sonner";

const EditStudent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get("id");

  // Parse initial data from the URL. Use try-catch to avoid errors if the parsing fails.
  const parsedStudent = searchParams.get("student");
  let initialData: Student = {} as Student;
  try {
    initialData = parsedStudent ? JSON.parse(parsedStudent) as Student : {} as Student;
  } catch (error) {
    console.error("Failed to parse student data from URL", error);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<
    Student & {
      current_password?: string;
      new_password?: string;
      confirm_new_password?: string;
    }
  >({
    defaultValues: {
      student_name: "",
      department: "",
      email: "",
      phone_no: "",
      address: "",
      roll_no: "",
      year_of_admission: "",
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  // Update form values when initialData is available.
  useEffect(() => {
    if (initialData && initialData.student_id) {
      reset({
        student_name: initialData.student_name || "",
        department: initialData.department || "",
        email: initialData.email || "",
        phone_no: initialData.phone_no || "",
        address: initialData.address || "",
        roll_no: initialData.roll_no || "",
        year_of_admission: initialData.year_of_admission || "",
        current_password: "",
        new_password: "",
        confirm_new_password: "",
      });
    }
  }, [initialData, reset]);

  const { mutate } = useUpdate();

  const onSubmit = (data: FieldValues) => {
    const hardcodedInstituteId = "828f0d33-258f-4a92-a235-9c1b30d8882b";

    // Build the payload using the existing fields.
    const studentData: Partial<Student> = {
      ...data,
      student_id: studentId || initialData.student_id,
      institute_id: hardcodedInstituteId,
    };

    // Remove extra password fields that are not part of the Student interface.
    delete (studentData as any).current_password;
    delete (studentData as any).new_password;
    delete (studentData as any).confirm_new_password;

    // If new password is provided, validate and update the password.
    const newPassword = (data as any).new_password;
    const confirmNewPassword = (data as any).confirm_new_password;
    if (newPassword) {
      if (newPassword !== confirmNewPassword) {
        toast.error("New password and confirm password do not match.", { position: "top-center" });
        return;
      }
      studentData.password = newPassword;
    }

    mutate(
      {
        resource: "edit",
        id: studentId || initialData.student_id,
        values: studentData,
      },
      {
        onSuccess: () => {
          toast.success("Student updated successfully!", { position: "top-center" });
          router.push("/student-page");
          
        },
        onError: (error: any) =>
          toast.error("Error updating student. Please try again later.", { position: "top-center" }),
      }
    );
  };

  return (
    <>
      <Header />
      <section className="p-10">
        <div className="container mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Student Name */}
              <div>
                <Label>Student Name</Label>
                <Input
                  type="text"
                  {...register("student_name", { required: "Student Name is required" })}
                  placeholder="Enter Student Name"
                />
                {errors.student_name && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.student_name.message === "string"
                      ? errors.student_name.message
                      : "An error occurred"}
                  </p>
                )}
              </div>
              {/* Department */}
              <div>
                <Label>Department</Label>
                <Input
                  type="text"
                  {...register("department", { required: "Department is required" })}
                  placeholder="Enter Department"
                />
                {errors.department && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.department.message === "string"
                      ? errors.department.message
                      : "An error occurred"}
                  </p>
                )}
              </div>
              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.email.message === "string"
                      ? errors.email.message
                      : "An error occurred"}
                  </p>
                )}
              </div>
              {/* Phone Number */}
              <div>
                <Label>Phone Number</Label>
                <Input
                  type="text"
                  {...register("phone_no", { required: "Phone Number is required" })}
                  placeholder="Enter Phone Number"
                />
                {errors.phone_no && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.phone_no.message === "string"
                      ? errors.phone_no.message
                      : "An error occurred"}
                  </p>
                )}
              </div>
              {/* Address */}
              <div>
                <Label>Address</Label>
                <Input type="text" {...register("address")} placeholder="Enter Address" />
              </div>
              {/* Roll No. */}
              <div>
                <Label>Roll No.</Label>
                <Input
                  type="text"
                  {...register("roll_no", { required: "Roll No. is required" })}
                  placeholder="Enter Roll No."
                />
                {errors.roll_no && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.roll_no.message === "string"
                      ? errors.roll_no.message
                      : "An error occurred"}
                  </p>
                )}
              </div>
              {/* Year of Admission */}
              <div>
                <Label>Year of Admission</Label>
                <Input
                  type="text"
                  {...register("year_of_admission", { required: "Year of Admission is required" })}
                  placeholder="Enter Year of Admission (e.g., 2023)"
                />
                {errors.year_of_admission && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.year_of_admission.message === "string"
                      ? errors.year_of_admission.message
                      : "An error occurred"}
                  </p>
                )}
              </div>
              {/* Current Password */}
              <div>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  {...register("current_password")}
                  placeholder="Enter Current Password"
                />
              </div>
              {/* New Password */}
              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  {...register("new_password")}
                  placeholder="Enter New Password"
                />
              </div>
              {/* Confirm New Password */}
              <div>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  {...register("confirm_new_password")}
                  placeholder="Confirm New Password"
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => router.push("/student-page")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditStudent;
