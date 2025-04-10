import { BaseRecord } from "@refinedev/core";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface StudentData {
  firstName: string;
  middleName: string;
  lastName: string;
  department: string;
  email: string;
  mobileNumber: string;
  address: string;
  rollNo: string;
  yearOfAdmission: string;
  bloodGroup: string;
  password: string;
  courseName: string;
  dateOfBirth: string;
  gender: string;
  instituteName: string;
  instituteUuid: string;
  barCode: string;
  studentUuid?: string;
  profileImage?: string;
  secPhoneNumber?: string;
  terPhoneNumber?: string;
  isArchived?: boolean;
  role?: string;
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
  firstName: string;
  middleName: string;
  lastName: string;
  courseName: string;
  mobileNumber: string;
  email: string;
  dateOfBirth: string;
  bloodGroup: string;
  gender: string;
  address: string;
  secPhoneNumber: string;
  terPhoneNumber: string;
  password: string;
  rollNo: string;
  role: string;
  department: string;
  yearOfAdmission: string;
  profileImage: string;
};

export interface AddStudentType extends StudentImportField {
  instituteName: string;
  instituteUuid: string;
}

export interface StudentCompleteData extends StudentImportField {
  barCode: string;
  isArchived: boolean;
  createdAt: string;
}

export interface StudentUpdateWithId extends StudentImportField {
  studentUuid: string;
}
