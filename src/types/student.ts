import { BaseRecord } from "@refinedev/core";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface StudentData {
  student_name: string;
  department: string;
  email: string;
  phone_no: string;
  address: string;
  roll_no: number;
  year_of_admission: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
  gender: string;
  institute_name: string;
  institute_id: string;
  institute_uuid: string;
  student_id: string;
  student_uuid?: string;
  image_field?: string | File | null;
  is_archived?: boolean;
}

export interface StudentFromDatabase extends BaseRecord {
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
  image_field?: string | File | null;
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
  readonly?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
  loading?: boolean;
}

export type StudentImportField = {
  student_name: string;
  department: string;
  email: string;
  phone_no: string;
  address?: string;
  roll_no: string;
  year_of_admission?: string;
  password?: string;
  gender: string;
  date_of_birth?: string;
}

export interface AddStudentType extends StudentImportField {
  institute_id: string;
  institute_name: string;
}