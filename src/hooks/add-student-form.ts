// hooks/add-student-form.ts

import { StudentData } from "@/types/student";
import UploaderFactory from "@/utilities/file-upload/upload-factory";
import { useCreate } from "@refinedev/core";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { toast } from "sonner";
import { isValidPhoneNumber } from "react-phone-number-input";

export const useAddStudentForm = () => {
  const [imageUpload, setImageUpload] = useState(false);

  const { institute_uuid, institute_name } = useSelector(
    (state: RootState) => state.auth.currentInstitute
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
    setError,
    trigger,
  } = useForm<Partial<StudentData>>({
    defaultValues: {
      student_name: "",
      department: "",
      email: "",
      phone_no: "",
      address: "",
      roll_no: undefined,
      year_of_admission: undefined,
      password: "",
      confirm_password: "",
      date_of_birth: undefined,
      gender: undefined,
      institute_uuid: undefined,
      image_field: undefined,
      role: "student", // added role field
    },
    mode: "onSubmit",
    resolver: async (data) => {
      const errors: any = {};
      if (!data.student_name) errors.student_name = { message: "Full Name is required" };
      if (!data.department) errors.department = { message: "Department is required" };
      if (!data.roll_no) errors.roll_no = { message: "Roll No. is required" };
      if (!data.email) errors.email = { message: "Email is required" };
      if (!data.gender) errors.gender = { message: "Gender is required" };
      if (!data.role) errors.role = { message: "Role is required" };
      if (!data.phone_no || !isValidPhoneNumber(data.phone_no))
        errors.phone_no = { message: "Phone Number is required or invalid" };

      return {
        values: Object.keys(errors).length === 0 ? data : {},
        errors,
      };
    },
  });

  const { mutate, isLoading } = useCreate();

  const onSubmit = async (data: FieldValues) => {
    if (data.image_field) {
      setImageUpload(true);
      const uploader = UploaderFactory.createUploader("cloudinary");
      const uploadedFileUrl = await uploader.uploadFile(data.image_field);
      data.image_field = uploadedFileUrl;
      setImageUpload(false);
    }

    const commonData: Partial<StudentData> = {
      student_id: "",
      student_uuid: "",
      student_name: data.student_name,
      department: data.department,
      email: data.email,
      phone_no: data.phone_no,
      address: data.address || undefined,
      roll_no: data.roll_no ? Number(data.roll_no) : undefined,
      year_of_admission: data.year_of_admission || undefined,
      password: data.password,
      confirm_password: data.confirm_password,
      is_archived: false,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      institute_uuid: institute_uuid ?? "",
      institute_name: institute_name ?? "",
      image_field: data.image_field ?? "",
    };

    const resource = data.role === "staff" ? "staff/create" : "student/create";

    return new Promise((resolve, reject) => {
      mutate(
        { resource, values: commonData },
        {
          onSuccess: (res) => {
            toast.success(`${data.role === "staff" ? "Staff" : "Student"} added successfully!`);
            resolve(res.data);
          },
          onError: (error: any) => {
            toast.error("Error adding user: " + error.message);
            reject(error);
          },
        }
      );
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading: isLoading || imageUpload,
    setValue,
    watch,
    clearErrors,
    setError,
    trigger,
  };
};
