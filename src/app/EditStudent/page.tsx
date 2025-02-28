"use client";

import React from "react";
import Header from "../Header/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@refinedev/react-hook-form";
import { useUpdate } from "@refinedev/core";
import { useRouter, useSearchParams } from "next/navigation";
import { Student } from "../student-page/studentcolumns";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner"; // Import sonner toast


const EditStudent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get("id");

  const initialData: Student = JSON.parse(searchParams.get("student") || "{}") as Student;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Student>({
    defaultValues: {
      full_name: initialData.full_name || "",
      department: initialData.department || "",
      email: initialData.email || "",
      phone_no: initialData.phone_no || "",
      address: initialData.address || "",
      roll_no: initialData.roll_no || "",
      year_of_admission: initialData.year_of_admission || "",
    },
  });

  const { mutate } = useUpdate();

  const onSubmit = (data: FieldValues) => {
    const hardcodedInstituteId = "828f0d33-258f-4a92-a235-9c1b30d8882b";

    const studentData: Student = {
      ...data,
      student_id: studentId || initialData.student_id,
      institute_id: hardcodedInstituteId,
    } as Student;

    mutate(
      {
        resource: "edit",
        id: studentId || initialData.student_id,
        values: studentData,
      },
      {
        onSuccess: () => {
          toast.success("Student updated successfully!", {
            position: "top-center", // Position at middle-top
          });
          router.push("/student-page");
        },
        onError: (error: any) =>
          toast.error("Error updating student: " + error.message, {
            position: "top-center",
          }),
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
              <div>
                <Label>Student Name</Label>
                <Input
                  type="text"
                  {...register("full_name", { required: "Student Name is required" })}
                  placeholder="Enter Student Name"
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.full_name.message === "string"
                      ? errors.full_name.message
                      : "An error occurred"}
                  </p>
                )}
              </div>
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
              <div>
                <Label>Address</Label>
                <Input
                  type="text"
                  {...register("address")}
                  placeholder="Enter Address"
                />
              </div>
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
              >
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