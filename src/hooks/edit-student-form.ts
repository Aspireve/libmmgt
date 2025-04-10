import { useEffect, useState } from "react"; // Add useState
import { useForm } from "react-hook-form";
import { useOne } from "@refinedev/core";
import { toast } from "sonner";
import { StudentUpdateWithId } from "@/types/student";
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
      firstName: "",
      middleName: "",
      lastName: "",
      courseName: "",
      mobileNumber: "",
      email: "",
      dateOfBirth: "",
      bloodGroup: "",
      gender: "",
      address: "",
      secPhoneNumber: "",
      terPhoneNumber: "",
      password: "",
      rollNo: "",
      role: "",
      department: "",
      yearOfAdmission: "",
      profileImage: "",
    },
    // resolver: async (data) => {
    //   const errors: Record<string, { message: string }> = {};

    //   if (!data.firstName) {
    //     errors.firstName = { message: "First Name is required" };
    //   }
    //   if (!data.middleName) {
    //     errors.middleName = { message: "Middle Name is required" };
    //   }
    //   if (!data.lastName) {
    //     errors.lastName = { message: "Last Name is required" };
    //   }
    //   if (!data.courseName) {
    //     errors.courseName = { message: "Course Name is required" };
    //   }
    //   if (!data.mobileNumber) {
    //     errors.mobileNumber = { message: "Mobile Number is required" };
    //   }
    //   if (!data.email) {
    //     errors.email = { message: "Email is required" };
    //   }
    //   if (!data.dateOfBirth) {
    //     errors.dateOfBirth = { message: "Date of Birth is required" };
    //   }
    //   if (!data.bloodGroup) {
    //     errors.bloodGroup = { message: "Blood Group is required" };
    //   }
    //   if (!data.gender) {
    //     errors.gender = { message: "Gender is required" };
    //   }
    //   if (!data.rollNo) {
    //     errors.rollNo = { message: "Roll No. is required" };
    //   }
    //   if (!data.role) {
    //     errors.role = { message: "Role is required" };
    //   }
    //   if (!data.department) {
    //     errors.department = { message: "Department is required" };
    //   }
    //   if (!data.yearOfAdmission) {
    //     errors.yearOfAdmission = { message: "Year of Admission is required" };
    //   }

    //   return {
    //     values: Object.keys(errors).length === 0 ? data : {},
    //     errors,
    //   };
    // },
  });

  const {
    data,
    isLoading: isFetching,
    error,
  } = useOne<{ data: StudentUpdateWithId }>({
    resource: `student/${student_id}`,
    id: "",
    queryOptions: {
      retry: 1,
      enabled: !!student_id,
    },
  });

  useEffect(() => {
    let isMounted = true;
    if (data?.data && isMounted) {
      const student: StudentUpdateWithId = data.data.data;

      // Normalize gender value
      const normalizedGender = student.gender
        ? student.gender.toLowerCase() === "male" ||
          student.gender.toLowerCase() === "female"
          ? student.gender.toLowerCase()
          : ""
        : "";

      // Ensure phone number is formatted correctly
      let normalizedPhone = student.mobileNumber?.trim() || "";

      if (normalizedPhone && !normalizedPhone.startsWith("+")) {
        normalizedPhone = `+91${normalizedPhone}`;
      }

      reset({
        firstName: student.firstName || "",
        middleName: student.middleName || "",
        lastName: student.lastName || "",
        courseName: student.courseName || "",
        department: student.department || "",
        email: student.email || "",
        mobileNumber: normalizedPhone, // Ensure formatted phone number
        address: student.address || "",
        rollNo: student.rollNo || "0",
        yearOfAdmission: student.yearOfAdmission || "",
        dateOfBirth: student.dateOfBirth || "",
        gender: normalizedGender,
        profileImage: student.profileImage || undefined,
        bloodGroup: student.bloodGroup || "",
        password: student.password || "",
        role: student.role || "",
        secPhoneNumber: student.secPhoneNumber || "",
        terPhoneNumber: student.terPhoneNumber || "",
      });
      setProfileImage(student.profileImage || null);
      setIsFormInitialized(true);
    }
    return () => {
      isMounted = false;
    };
  }, [data, reset, student_id]);

  const onSubmit = (formData: StudentUpdateWithId, mutate: Function) => {
    let phoneNo = formData.mobileNumber?.trim();

    if (phoneNo && phoneNo.startsWith("+91")) {
      phoneNo = phoneNo.slice(3).trim();
    }

    const studentData: StudentUpdateWithId = {
      ...formData,
      mobileNumber: phoneNo,
    };

    // Filter out null or empty values
    const filteredStudentData = Object.fromEntries(
      Object.entries(studentData).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );

    mutate(
      {
        resource: `student/${student_id}`,
        id: "",
        // meta: { query: { student_id: data?.data.student_id } },
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
