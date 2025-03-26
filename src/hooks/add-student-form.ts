import { Student } from "@/app/student-page/studentcolumns";
import { RootState } from "@/redux/store/store";
import { StudentData } from "@/types/student";
import UploaderFactory from "@/utilities/file-upload/upload-factory";
import { useCreate } from "@refinedev/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";

// useAddStudentForm.ts
export const useAddStudentForm = () => {
  const router = useRouter();
  const [imageUpload, setImageUpload] = useState(false);

  const institute_id = useSelector(
    (state: RootState) => state.auth.institute_uuid
  );
  const institute_name = useSelector(
    (state: RootState) => state.auth.institute_name
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
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
    },
    // Add validation resolver
    mode: "onSubmit",
  });

  const { mutate, isLoading } = useCreate();

  const onSubmit = async (data: FieldValues) => {
    // Required field validation
    if (!data.student_name) {
      setError("student_name", { message: "Full Name is required" });
      return;
    }
    if (!data.email) {
      setError("email", { message: "Email is required" });
      return;
    }
    if (!data.roll_no) {
      setError("roll_no", { message: "Roll No. is required" });
      return;
    }
    if (!data.department) {
      setError("department", { message: "Department is required" });
      return;
    }
    if (!data.gender) {
      setError("gender", { message: "Gender is required" });
      return;
    }

    if (data.image_field) {
      setImageUpload(true);
      const uploader = UploaderFactory.createUploader("cloudinary");
      const uploadedFileUrl = await uploader.uploadFile(data.image_field);
      data.image_field = uploadedFileUrl;
      setImageUpload(false);
    }

    const studentData: Partial<StudentData> = {
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
      institute_id: institute_id ?? "",
      institute_name: institute_name ?? "",
    };

    return new Promise((resolve, reject) => {
      mutate(
        { resource: "student/create", values: studentData },
        {
          onSuccess: (data) => {
            toast.success("Student added successfully!");
            resolve(data.data);
          },
          onError: (error: any) => {
            toast.error("Error adding student: " + error.message);
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
    setError,
    clearErrors,
  };
};
