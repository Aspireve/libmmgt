"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditBtn from "../../images/EditBtn.png";
import DeleteBtn from "../../images/DeleteBtn.png";
import { useRouter } from "next/navigation";

export interface Student {
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
  confirm_password?: string;
}

export const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "student_name",
    header: "Student Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_no",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "roll_no",
    header: "Roll No.",
  },
  {
    accessorKey: "year_of_admission",
    header: "Year of Admission",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;
      const router = useRouter();
      return (
        <div className="flex gap-2 ml-10">
          <button onClick={() => handleEdit(student, router)} aria-label="Edit student">
            <img src={EditBtn.src} alt="Edit" />
          </button>
          <button onClick={() => handleDelete(student.student_uuid)} aria-label="Delete student">
            <img src={DeleteBtn.src} alt="Delete" />
          </button>
        </div>
      );
    },
  },
];

// studentcolumns.ts
// studentcolumns.ts
const handleEdit = (student: Student, router: any) => {
  console.log("Navigating with student_uuid:", student.student_uuid); // Debug
  router.push(
    `/EditStudent?id=${student.student_uuid}&student=${encodeURIComponent(
      JSON.stringify(student)
    )}`
  );
};


const handleDelete = (uuid: string) => {
  console.log(`Delete student with UUID: ${uuid}`);
};

export const fallbackData: Student[] = [
  {
    student_id: "tia-00001-2025", // Custom format matching backend
    student_uuid: "9eac618e-77ec-44e4-b50c-fe488ceb7737", // UUID
    student_name: "John Doe",
    department: null,
    email: "john.doe@example.com",
    phone_no: "9137058635",
    address: "123 Main St, Springfield",
    institute_id: "828f0d33-258f-4a92-a235-9c1b30d8882b",
    institute_name: "Thakur Institute of Aviation",
    is_archived: false,
    date_of_birth: "1995-05-15",
    gender: "male",
    roll_no: 25,
    year_of_admission: "2015",
    password: "password123",
  },
  {
    student_id: "tia-00002-2025", // Custom format
    student_uuid: "614cabeb-82c4-4084-8779-3e43a5841c84", // UUID
    student_name: "Leon Mendonca",
    department: null,
    email: "leon1@gmail.com",
    phone_no: "0987654321",
    address: "Malad",
    institute_id: "94f55255-3f0f-4ac4-9c60-235f4fe8a849",
    institute_name: "Some Other Institute",
    is_archived: false,
    date_of_birth: "1998-12-01",
    gender: "male",
    roll_no: 45,
    year_of_admission: "2018",
    password: "leonpass",
  },
];