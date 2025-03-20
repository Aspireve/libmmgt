"use client";

import React from "react";
import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, FieldValues } from "react-hook-form";
import { useCreate } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Loader2 } from "lucide-react";
import { StudentDataBuilder } from "@/utilities/student_builder";
import { InputField } from "@/components/custom/inputfield";
import type { StudentFromDatabase } from "@/types/student";

const hardcodedInstituteId = "828f0d33-258f-4a92-a235-9c1b30d8882b";
const hardcodedInstituteName = "TIA";

const AddStudent: React.FC = () => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const { mutate, isLoading: createLoading } = useCreate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<StudentFromDatabase>>({
    defaultValues: {
      student_name: "",
      department: "",
      email: "",
      phone_no: "",
      address: "",
      roll_no: 0,
      year_of_admission: "",
      password: "",
      confirm_password: "",
      date_of_birth: "",
      gender: "",
    },
  });

  const onSubmit = (data: FieldValues) => {
    const student = new StudentDataBuilder(data)
      .setField("roll_no", (value) => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
      })
      .setField("date_of_birth", (value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime())
          ? parsedDate.toISOString().split("T")[0]
          : "";
      })
      .setField(
        "institute_id",
        () => auth.institute_uuid || hardcodedInstituteId
      )
      .setField(
        "institute_name",
        () => auth.institute_name || hardcodedInstituteName
      )
      .setField("student_id", () => "")
      .setField("address")
      .setField("student_uuid", () => "")
      .setField("student_name")
      .setField("department")
      .setField("email")
      .setField("phone_no")
      .setField("address")
      .setField("year_of_admission")
      .setField("password")
      .setField("confirm_password")
      .setField("gender")
      .setField("is_archived", () => false)
      .build();

    mutate(
      { resource: "student/create", values: student },
      {
        onSuccess: () => {
          toast.success("Student added successfully!");
          router.push("/student-page");
        },
        onError: (error: any) =>
          toast.error("Error adding student: " + error.message),
      }
    );
  };

  return (
    <>
      <Header heading="Add Student" subheading="Tanvir Chavan" />

      <section className="p-10">
        <div className="container mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                name="student_name"
                validation={{
                  required: "Full Name is required",
                }}
                errors={errors}
                register={register}
                type="text"
                placeholder={"Enter Full Name"}
              />
              <InputField
                label="Date of Birth"
                name="date_of_birth"
                validation={{
                  required: "Date of Birth is required",
                }}
                errors={errors}
                register={register}
                type="date"
                placeholder={"Enter Date of Birth"}
              />
              <InputField
                type="text"
                register={register}
                validation={{ required: "Department is required" }}
                errors={errors}
                label="Department"
                name="department"
                placeholder="Enter Department"
              />
              <InputField
                type="email"
                register={register}
                validation={{ required: "Email is required" }}
                errors={errors}
                label="Email"
                name="email"
                placeholder="Enter Email"
              />
              <InputField
                type="text"
                register={register}
                validation={{ required: "Phone Number is required" }}
                errors={errors}
                label="Phone Number"
                name="phone_no"
                placeholder="Enter Phone Number"
              />
              <InputField
                type="text"
                register={register}
                validation={{ required: "Address is required" }}
                errors={errors}
                label="Address"
                name="address"
                placeholder="Enter Address"
              />

              <InputField
                type="number"
                register={register}
                validation={{ required: "Roll No. is required" }}
                errors={errors}
                label="Roll No."
                name="roll_no"
                placeholder="Enter Roll No."
              />

              <InputField
                type="text"
                register={register}
                validation={{ required: "Year of Admission is required" }}
                errors={errors}
                label="Year of Admission"
                name="year_of_admission"
                placeholder="Enter Year of Admission"
              />

              <InputField
                type="password"
                register={register}
                validation={{ required: "Password is required" }}
                errors={errors}
                label="Password"
                name="password"
                placeholder="Enter Password"
              />

              <InputField
                type="password"
                register={register}
                validation={{ required: "Confirm Password is required" }}
                errors={errors}
                label="Confirm Password"
                name="confirm_password"
                placeholder="Enter Confirm Password"
              />

              {/* Gender */}
              <div>
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
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]"
                disabled={createLoading}
              >
                {createLoading ? (
                  <>
                    Adding Student...
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
