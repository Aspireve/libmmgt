import type {
  StudentData,
  StudentFromDatabase,
  StudentMappingType,
} from "@/types/student";
import { ColumnDef } from "@tanstack/react-table";
import {
  StudentActions,
  StudentIDCell,
  StudentNameCell,
} from "./students-col-components";

export const initialMapping: StudentMappingType = {
  student_name: "",
  department: "",
  email: "",
  phone_no: "",
  address: "",
  roll_no: "", // Changed from 0 to "" (string) since mapping deals with column names
  year_of_admission: "",
  password: "",
  confirm_password: "",
  date_of_birth: "",
  gender: "",
  institute_id: "",
  institute_name: "",
};

export const fieldLabels: Record<keyof StudentData, string> = {
  student_name: "Student Name",
  department: "Department",
  email: "Email",
  phone_no: "Phone Number",
  address: "Address",
  roll_no: "Roll Number", // Updated label from 0 to a string
  year_of_admission: "Year of Admission",
  password: "Password",
  confirm_password: "Confirm Password",
  date_of_birth: "Date of Birth",
  gender: "Gender",
  institute_id: "Institute ID",
  institute_name: "Institute Name",
};

export const StudentListTable: ColumnDef<Partial<StudentFromDatabase>>[] = [
  {
    accessorKey: "student_id",
    header: "ID",
    cell: ({ row }) => <StudentIDCell student={row.original} />,
  },
  {
    accessorKey: "student_name",
    header: "Name",
    cell: ({ row }) => <StudentNameCell student={row.original} />,
  },
  { accessorKey: "roll_no", header: "Roll no" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "year_of_admission", header: "Year of Admission" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;
      return <StudentActions student={student} />;
    },
  },
];
