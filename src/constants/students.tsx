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

export const initialMapping = {
  student_name: "",
  department: "",
  email: "",
  phone_no: "",
  address: "",
  roll_no: "",
  year_of_admission: "",
  password: "",
  date_of_birth: "",
  gender: "",
};

// @ts-ignore
export const fieldLabels: Record<keyof StudentData, string> = {
  student_name: "Student Name",
  department: "Department",
  email: "Email",
  phone_no: "Phone Number",
  address: "Address",
  roll_no: "Roll no",
  year_of_admission: "Year Of Admission",
  password: "Password",
  date_of_birth: "Date Of Birth",
  gender: "Gender",
  institute_name: "Institute Name",
};

export const StudentListTable = ({  
  refetch,
}: {
  refetch: () => void;
}): ColumnDef<StudentFromDatabase>[] => [
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
  {
    accessorFn: (data) => data.year_of_admission ?? "Not Provided",
    header: "Year of Admission",
  },
];
export const StudentListTableAction = ({
  refetch,
}: {
  refetch: () => void;
}): ColumnDef<StudentFromDatabase>[] => [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;
      return <StudentActions student={student} refetch={refetch} />;
    },
  },
];
