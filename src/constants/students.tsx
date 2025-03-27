import type { StudentData, StudentFromDatabase, StudentMappingType } from "@/types/student";
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
  roll_no: "",
  year_of_admission: "",
  password: "",
  confirm_password: "",
  date_of_birth: "",
  gender: "",
  institute_id: "",
  institute_name: "",
  institute_uuid: "",
  student_id: "",
  student_uuid: "",
  image_field: "",
  is_archived: "",
};

export const fieldLabels: Record<keyof StudentData, string> = {
  student_name: "Student Name",
  department: "Department",
  email: "Email",
  phone_no: "Phone Number",
  address: "Address",
  roll_no: "Roll Number",
  year_of_admission: "Year of Admission",
  password: "Password",
  confirm_password: "Confirm Password",
  date_of_birth: "Date of Birth",
  gender: "Gender",
  institute_id: "Institute ID",
  institute_name: "Institute Name",
  institute_uuid: "Institute UUID",
  student_id: "Student ID",
  student_uuid: "Student UUID",
  image_field: "Image",
  is_archived: "Archived Status",
};

export const StudentListTable = ({
  refetch,
}: {
  refetch: () => void;
}): ColumnDef<Partial<StudentFromDatabase>>[] => [
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
  { accessorFn: (data) => data.year_of_admission ?? "Not Provided", header: "Year of Admission" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;
      return <StudentActions student={student} refetch={refetch} />;
    },
  },
];