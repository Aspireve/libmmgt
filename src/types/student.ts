import { FieldValues, UseFormRegister } from "react-hook-form";

export interface StudentData {
  student_name: string;
  department: string;
  email: string;
  phone_no: string;
  address: string;
  roll_no: number; // This is a number
  year_of_admission: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
  gender: string;
  institute_name: string;
  institute_id: string;
}

export interface StudentFromDatabase {
  student_id: string;
  student_uuid: string;
  student_name: string;
  department: string | null;
  email: string;
  phone_no: string;
  address: string;
  institute_id: string;
  institute_name: string;
  is_archived: boolean;
  date_of_birth: string;
  gender: "male" | "female" | "";
  roll_no: number;
  year_of_admission: string;
  password: string;
  current_password?: string;
  confirm_password?: string;
}

export type StudentMappingType = { [K in keyof StudentData]?: string };

export interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  validation?: object;
  errors: any;
  placeholder?: string;
  defaultValue?: string | number;
}
