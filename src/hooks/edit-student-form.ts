import { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useOne } from "@refinedev/core";
import { toast } from "sonner";
import { StudentData, StudentFromDatabase } from "@/types/student";

export const useEditStudentForm = (studentUuid: string) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Partial<StudentData>>({
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

  const {
    data,
    isLoading: isFetching,
    error,
  } = useOne<StudentFromDatabase>({
    resource: "student/detail",
    id: studentUuid ? `student_uuid=${studentUuid}` : "",
    queryOptions: {
      retry: 1,
      enabled: !!studentUuid,
    },
  });

  useEffect(() => {
    if (data?.data) {
      const student = data.data;
      reset({
        student_name: student.student_name || "",
        department: student.department || "",
        email: student.email || "",
        phone_no: student.phone_no || "",
        address: student.address || "",
        roll_no: student.roll_no || 0,
        year_of_admission: student.year_of_admission || "",
      });
    } 
  }, [data, reset, studentUuid]);

  const onSubmit = (formData: FieldValues, mutate: Function) => {
    const hardcodedInstituteId = "828f0d33-258f-4a92-a235-9c1b30d8882b";

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

    const studentData: Partial<StudentFromDatabase> = {
      ...formData,
      student_uuid: validStudentUuid,
      institute_id: hardcodedInstituteId,
    };
    
    const passwordValue = formData.password?.trim();
    const confirmPasswordValue = formData.confirm_password?.trim();
    
    if (!passwordValue) {
      delete studentData.password;
    }

    if (!confirmPasswordValue) {
      delete studentData.confirm_password;
    }
    
    if (
      passwordValue &&
      confirmPasswordValue &&
      passwordValue !== confirmPasswordValue
    ) {
      toast.error("Passwords do not match.");
      return;
    }
    
    if (passwordValue) {
      studentData.password = passwordValue; 
    }
    
    if (confirmPasswordValue) {
      studentData.confirm_password = confirmPasswordValue; 
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
  };
};
