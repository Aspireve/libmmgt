import { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useOne } from "@refinedev/core";
import { toast } from "sonner";
import { StudentData, StudentFromDatabase } from "@/types/student";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export const useEditStudentForm = (studentUuid: string) => {
  const router = useRouter();

  const institute_id = useSelector((state: RootState) => state.auth.institute_uuid);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StudentData>({
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
      gender: "", // Ensure this is an empty string, not undefined
      institute_name: "",
      image_field: null,
    },
  });

  const {
    data,
    isLoading: isFetching,
    error,
  } = useOne<StudentFromDatabase>({
    resource: "student/detail",
    id: studentUuid ? `student_id=${studentUuid}` : "",
    queryOptions: {
      retry: 1,
      enabled: !!studentUuid,
    },
  });

  useEffect(() => {
    if (data?.data) {
      const student: StudentFromDatabase = data.data;
      
      reset({
        student_name: student.student_name || "",
        department: student.department || "",
        email: student.email || "",
        phone_no: student.phone_no || "",
        address: student.address || "",
        roll_no: student.roll_no || 0,
        year_of_admission: student.year_of_admission || "",
        date_of_birth: student.date_of_birth || "",
        gender: student.gender?.toLowerCase() || "",  
        institute_name: student.institute_name || "",
        image_field: null,
      });
  
      setValue("gender", student.gender?.toLowerCase() || ""); 
    }
  }, [data, reset, studentUuid, setValue]);
  
  
  

  const onSubmit = (formData: FieldValues, mutate: Function) => {
    
    const validStudentUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        studentUuid
      )
        ? studentUuid
        : "";
  
    if (!validStudentUuid) {
      toast.error("Invalid student UUID format.");
      return;
    }
  
    let phoneNo = formData.phone_no?.trim();
    
    // Remove country code if it starts with +91
    if (phoneNo.startsWith("+91")) {
      phoneNo = phoneNo.slice(3).trim();
    }
  
    const studentData: Partial<StudentData> = {
      ...formData,
      student_uuid: validStudentUuid,
      institute_id: institute_id ?? "",
    };

    const passwordValue = formData.password?.trim();
    const confirmPasswordValue = formData.confirm_password?.trim();
  
    if (!passwordValue) {
      delete studentData.password;
    }
  
    if (!confirmPasswordValue) {
      delete studentData.confirm_password;
    }
  
    if (passwordValue && confirmPasswordValue && passwordValue !== confirmPasswordValue) {
      toast.error("Passwords do not match.");
      return;
    }
  
    mutate(
      {
        resource: "student/edit",
        id: validStudentUuid,
        meta: { query: { student_uuid: validStudentUuid } },
        values: studentData,
      },
      {
        onSuccess: () => {
          toast.success("Student updated successfully!");
          router.back();
        },
        onError: (error: any) => {
          toast.error(
            `Error updating student: ${error.message || "Please try again later."}`
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
    setValue, // ✅ Ensure setValue is returned
  };
};