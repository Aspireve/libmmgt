"use client";

import React, { useEffect } from "react";
import Header from "../../Header/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useOne, useUpdate } from "@refinedev/core";
import { Student } from "../studentcolumns";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const EditStudent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentUuid = searchParams.get("student_uuid");

  console.log("UUID from URL:", studentUuid);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<
    Student & {
      password?: string;
      confirm_password?: string;
    }
  >({
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
    },
  });

  const password = watch("password");

  // Use refine's useOne hook with meta option (wrapped in a query object) to pass student_uuid.
  const { data, isLoading, error } = useOne<Student>({
    resource: "student/detail",
    id: `student_uuid=${studentUuid}`,
    queryOptions: {
      retry: 1,
      enabled: !!studentUuid,
    },
  });

  console.log(data?.data);

  // useEffect(() => {
  //   if (studentUuid) {
  //     console.log("Using student_uuid in meta:", studentUuid);
  //   } else {
  //     console.warn("No student UUID provided in URL query parameter.");
  //   }
  // }, [studentUuid]);

  // Reset form with fetched student data
  useEffect(() => {
    if (data?.data) {
      const student = data.data;
      console.log("Fetched student data:", student);
      reset({
        student_name: student.student_name || "",
        department: student.department || "",
        email: student.email || "",
        phone_no: student.phone_no || "",
        address: student.address || "",
        roll_no: student.roll_no || 0,
        year_of_admission: student.year_of_admission || "",
        password: "",
        confirm_password: "",
      });
    } else {
      console.warn("No student data found for UUID:", studentUuid);
    }
  }, [data, reset, studentUuid]);

  // Use refine's useUpdate hook for updating the student.
  const { mutate, isLoading: isUpdateLoading } = useUpdate<Student>();

  const onSubmit = (formData: FieldValues) => {
    const hardcodedInstituteId = "828f0d33-258f-4a92-a235-9c1b30d8882b";

    const validStudentUuid =
      studentUuid &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        studentUuid
      )
        ? studentUuid
        : "";

    console.log("Valid student UUID for update:", validStudentUuid);

    if (!validStudentUuid) {
      toast.error("Invalid student UUID format. A valid UUID is required.", {
        position: "top-center",
      });
      return;
    }

    // Optionally, include student_id if available from fetched data:
    const fetchedStudent = data?.data;

    const studentData: Partial<Student> = {
      student_id: fetchedStudent?.student_id, // include if backend needs it
      student_uuid: validStudentUuid,
      student_name: formData.student_name,
      department: formData.department,
      email: formData.email,
      phone_no: formData.phone_no,
      address: formData.address,
      roll_no: Number(formData.roll_no),
      year_of_admission: formData.year_of_admission,
      institute_id: hardcodedInstituteId,
    };

    const passwordValue = formData.password?.trim();
    const confirmPasswordValue = formData.confirm_password?.trim();

    if (passwordValue) {
      if (!confirmPasswordValue) {
        toast.error("Confirm password is required.", {
          position: "top-center",
        });
        return;
      }
      if (passwordValue !== confirmPasswordValue) {
        toast.error("Password and confirm password do not match.", {
          position: "top-center",
        });
        return;
      }
      studentData.password = passwordValue;
      studentData.confirm_password = confirmPasswordValue;
    }

    console.log("Payload for update:", studentData);

    // Add meta so that the update request includes the identifier as a query parameter.
    mutate(
      {
        resource: "student/edit",
        id: validStudentUuid,
        meta: { query: { student_uuid: validStudentUuid } },
        values: studentData,
      },
      {
        onSuccess: () => {
          toast.success("Student updated successfully!", {
            position: "top-center",
          });
          setTimeout(() => router.push("/student-page"), 500);
        },
        onError: (error: any) => {
          console.error("Update error:", error);
          toast.error(
            `Error updating student: ${
              error.message || "Please try again later."
            }`,
            { position: "top-center" }
          );
        },
      }
    );
  };

  if (isLoading) return <div>Loading student data...</div>;
  if (error) return <div>Error loading student data</div>;

  return (
    <>
      <Header heading="Edit Book" subheading="Tanvir Chavan" />

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
                  {...register("student_name", {
                    required: "Student Name is required",
                  })}
                  placeholder="Enter Student Name"
                />
                {errors.student_name && (
                  <p className="text-red-500 text-sm">
                    {errors.student_name.message}
                  </p>
                )}
              </div>
              {/* Department */}
              <div>
                <Label>Department</Label>
                <Input
                  type="text"
                  {...register("department")}
                  placeholder="Enter Department"
                />
                {errors.department && (
                  <p className="text-red-500 text-sm">
                    {errors.department.message}
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
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              {/* Phone Number */}
              <div>
                <Label>Phone Number</Label>
                <Input
                  type="text"
                  {...register("phone_no", {
                    required: "Phone Number is required",
                  })}
                  placeholder="Enter Phone Number"
                />
                {errors.phone_no && (
                  <p className="text-red-500 text-sm">
                    {errors.phone_no.message}
                  </p>
                )}
              </div>
              {/* Address */}
              <div>
                <Label>Address</Label>
                <Input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  placeholder="Enter Address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              {/* Roll No. */}
              <div>
                <Label>Roll No.</Label>
                <Input
                  type="number"
                  {...register("roll_no", {
                    required: "Roll No. is required",
                    valueAsNumber: true,
                  })}
                  placeholder="Enter Roll No."
                />
                {errors.roll_no && (
                  <p className="text-red-500 text-sm">
                    {errors.roll_no.message}
                  </p>
                )}
              </div>
              {/* Year of Admission */}
              <div>
                <Label>Year of Admission</Label>
                <Input
                  type="text"
                  {...register("year_of_admission", {
                    required: "Year of Admission is required",
                  })}
                  placeholder="Enter Year of Admission (e.g., 2023)"
                />
                {errors.year_of_admission && (
                  <p className="text-red-500 text-sm">
                    {errors.year_of_admission.message}
                  </p>
                )}
              </div>
              {/* New Password */}
              <div>
                <Label>
                  New Password{" "}
                  {password && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: password ? "New password is required" : false,
                  })}
                  placeholder="Enter New Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Confirm New Password */}
              <div>
                <Label>
                  Confirm New Password{" "}
                  {password && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  type="password"
                  {...register("confirm_password", {
                    required: password
                      ? "Confirm new password is required"
                      : false,
                  })}
                  placeholder="Confirm New Password"
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm">
                    {errors.confirm_password.message}
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
                disabled={isLoading || isUpdateLoading}
              >
                {isUpdateLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Saving...
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
