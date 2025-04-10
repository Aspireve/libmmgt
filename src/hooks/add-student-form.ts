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

  const { instituteUuid, instituteName } = useSelector(
    (state: RootState) => state.auth.currentInstitute!
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
      firstName: "",
      middleName: "",
      lastName: "",
      department: "",
      email: "",
      mobileNumber: "",
      address: "",
      rollNo: "",
      yearOfAdmission: "",
      bloodGroup: "",
      password: "",
      courseName: "",
      dateOfBirth: "",
      gender: "",
      barCode: "",
      profileImage: "",
      secPhoneNumber: "",
      terPhoneNumber: "",
      role: "student", // added role field
    },
    mode: "onSubmit",
    resolver: async (data) => {
      const errors: any = {};
      if (!data.firstName)
        errors.firstName = { message: "Full Name is required" };
      if (!data.department)
        errors.department = { message: "Department is required" };
      if (!data.rollNo) errors.roll_no = { message: "Roll No. is required" };
      if (!data.email) errors.email = { message: "Email is required" };
      if (!data.gender) errors.gender = { message: "Gender is required" };
      if (!data.role) errors.role = { message: "Role is required" };
      if (!data.mobileNumber || !isValidPhoneNumber(data.mobileNumber))
        errors.mobileNumber = {
          message: "Phone Number is required or invalid",
        };

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
      ...data,
      instituteName,
      instituteUuid,
    };

    return new Promise((resolve, reject) => {
      mutate(
        { resource: "student", values: commonData },
        {
          onSuccess: (res) => {
            toast.success(
              `${
                data.role === "staff" ? "Staff" : "Student"
              } added successfully!`
            );
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
