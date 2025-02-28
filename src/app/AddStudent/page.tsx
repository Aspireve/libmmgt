"use client";

import React from "react";
import Header from "../Header/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@refinedev/react-hook-form";
import { useCreate } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { Student } from "../student-page/studentcolumns";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner"; // Import sonner toast

const AddStudent: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Student>({
    defaultValues: {
      full_name: "",
      department: "",
      email: "",
      phone_no: "",
      address: "",
    },
  });
  const { mutate } = useCreate();

  const onSubmit = (data: FieldValues) => {
    const hardcodedInstituteId = "828f0d33-258f-4a92-a235-9c1b30d8882b"; // Hardcoded for now, will be replaced with dynamic value from Redux/login state later

    const studentData: Student = {
      ...data,
      institute_id: hardcodedInstituteId,
    } as Student;

    mutate(
      { resource: "create", values: studentData }, // Fixed resource to "student" for consistency
      {
        onSuccess: () => {
          toast.success("Student added successfully!", {
            position: "top-center", // Middle of top
          });
          router.push("/student-page");
        },
        onError: (error: any) =>
          toast.error("Error adding student: " + error.message, {
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
            <h2 className="text-2xl font-bold mb-4">Add Student</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  {...register("full_name", { required: "Full Name is required" })}
                  placeholder="Enter Full Name"
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
                  {...register("address",{required: "Address is required"})}
                  placeholder="Enter Address"
                />
                {errors.phone_no && (
                  <p className="text-red-500 text-sm">
                    {typeof errors.phone_no.message === "string"
                      ? errors.phone_no.message
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
                Add Student
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddStudent;