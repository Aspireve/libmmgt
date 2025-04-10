import type { StudentData, StudentFromDatabase } from "@/types/student";
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
  firstName: "Student Name",
  department: "Department",
  email: "Email",
  mobileNumber: "Phone Number",
  address: "Address",
  rollNo: "Roll no",
  yearOfAdmission: "Year Of Admission",
  password: "Password",
  dateOfBirth: "Date Of Birth",
  gender: "Gender",
  instituteName: "Institute Name",
};

export const StudentListTable = ({
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
  {
    accessorKey: "barCode",
    header: "Student ID",
    cell: ({ row }) => <StudentIDCell student={row.original} />,
  },
  {
    accessorKey: "firstName",
    header: "Name",
    // cell: ({ row }) => <StudentNameCell student={row.original} />,
    cell: ({ row }) => {
      const { firstName, middleName, lastName } = row.original;
      return <div>{`${firstName} ${middleName} ${lastName}`}</div>;
    },
  },
  { accessorKey: "rollNo", header: "Roll no" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "mobileNumber", header: "Phone Number" },
  { accessorKey: "email", header: "Email" },
  {
    accessorFn: (data) => data.yearOfAdmission ?? "Not Provided",
    header: "Year of Admission",
  },
];
// export const StudentListTableAction = ({
//   refetch,
// }: {
//   refetch: () => void;
// }): ColumnDef<StudentFromDatabase>[] => [
//     {
//       id: "actions",
//       header: "Actions",
//       cell: ({ row }) => {
//         const student = row.original;
//         return <StudentActions student={student} refetch={refetch} />;
//       },
//     },
//   ];
