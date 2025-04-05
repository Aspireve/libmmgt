import { useEffect, useState } from "react"; // Add useState
import { useForm, FieldValues } from "react-hook-form";
import { useOne } from "@refinedev/core";
import { toast } from "sonner";
import {
  StudentUpdateWithId,
} from "@/types/student";
import { useRouter } from "next/navigation";
import { isValidPhoneNumber } from "react-phone-number-input";

export const useEditStudentForm = (
  student_id: string,
  setProfileImage: (e: string | null) => void
) => {
  const router = useRouter();

  // const institute_id = useSelector(
  //   (state: RootState) => state.auth.institute_uuid
  // );
  const [isFormInitialized, setIsFormInitialized] = useState(false); // Define the state

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<StudentUpdateWithId>({
    defaultValues: {
      student_name: "",
      department: "",
      email: "",
      phone_no: "",
      address: "",
      roll_no: "0",
      year_of_admission: "",
      password: "",
      date_of_birth: "",
      gender: "",
      image_field: undefined,
    },
    resolver: async (data) => {
      const errors: Record<string, { message: string }> = {};

      if (!data.student_name) {
        errors.student_name = { message: "Full Name is required" };
      }
      if (!data.department) {
        errors.department = { message: "Department is required" };
      }
      if (!data.email) {
        errors.email = { message: "Email is required" };
      }
      if (!data.roll_no) {
        errors.roll_no = { message: "Roll No. is required" };
      }
      if (!data.gender) {
        errors.gender = { message: "Gender is required" };
      }
      if (!data.phone_no || !isValidPhoneNumber(data.phone_no))
        errors.phone_no = { message: "Phone Number is required" };

      return {
        values: Object.keys(errors).length === 0 ? data : {},
        errors,
      };
    },
  });

  const {
    data,
    isLoading: isFetching,
    error,
  } = useOne<StudentUpdateWithId>({
    resource: "student/detail",
    id: student_id ? `student_id=${student_id}` : "",
    queryOptions: {
      retry: 1,
      enabled: !!student_id,
    },
  });

  useEffect(() => {
    let isMounted = true;
    if (data?.data && isMounted) {
      const student: StudentUpdateWithId = data.data;

      // Normalize gender value
      const normalizedGender = student.gender
        ? student.gender.toLowerCase() === "male" ||
          student.gender.toLowerCase() === "female"
          ? student.gender.toLowerCase()
          : ""
        : "";

      // Ensure phone number is formatted correctly
      let normalizedPhone = student.phone_no?.trim() || "";

      if (normalizedPhone && !normalizedPhone.startsWith("+")) {
        normalizedPhone = `+91${normalizedPhone}`;
      }

      reset({
        student_name: student.student_name || "",
        department: student.department || "",
        email: student.email || "",
        phone_no: normalizedPhone, // Ensure formatted phone number
        address: student.address || "",
        roll_no: student.roll_no || "0",
        year_of_admission: student.year_of_admission || "",
        date_of_birth: student.date_of_birth || "",
        gender: normalizedGender,
        image_field: student.image_field || undefined,
      });
      setProfileImage(student.image_field || null);
      setIsFormInitialized(true);
    }
    return () => {
      isMounted = false;
    };
  }, [data, reset, student_id]);

  const onSubmit = (formData: StudentUpdateWithId, mutate: Function) => {
    let phoneNo = formData.phone_no?.trim();

    if (phoneNo && phoneNo.startsWith("+91")) {
      phoneNo = phoneNo.slice(3).trim();
    }

    const studentData: StudentUpdateWithId = {
      ...formData,
      phone_no: phoneNo,
    };

    // Filter out null or empty values
    const filteredStudentData = Object.fromEntries(
      Object.entries(studentData).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );

    mutate(
      {
        resource: "student/edit",
        id: data?.data.student_id,
        meta: { query: { student_id: data?.data.student_id } },
        values: filteredStudentData,
      },
      {
        onSuccess: () => {
          toast.success("Student updated successfully!");
          router.back();
        },
        onError: (error: any) => {
          toast.error(
            `Error updating student: ${
              error.message || "Please try again later."
            }`
          );
        },
      }
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    isFetching,
    error,
    reset,
    watch,
    onSubmit,
    setValue,
    isFormInitialized, // Include in the return object
    clearErrors,
  };
};
