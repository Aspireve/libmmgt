"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditBtn from "../../images/EditBtn.png";
import DeleteBtn from "../../images/DeleteBtn.png";
import { useRouter } from "next/navigation";

export interface Student {
  student_id: string; 
  student_name: string;
  department: string | null;
  email: string;
  phone_no: string;
  address: string;
  institute_id: string;
  institute_name: string; // Institute name added for payload purposes
  is_archived: boolean;
  dob: string; 
  gender: string; 
  roll_no: string; 
  year_of_admission: string; 
  password: string; // For form purposes, not displayed in table
  confirm_password?: string; // Optional for form validation
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
          <button onClick={() => handleDelete(student.student_id)} aria-label="Delete student">
            <img src={DeleteBtn.src} alt="Delete" />
          </button>
        </div>
      );
    },
  },
];

const handleEdit = (student: Student, router: any) => {
  router.push(
    `/EditStudent?id=${student.student_id}&student=${encodeURIComponent(
      JSON.stringify(student)
    )}`
  );
};

const handleDelete = (id: string) => {
  console.log(`Delete student with ID: ${id}`);
};

export const fallbackData: Student[] = [
  {
    email: "john.doe@example.com",
    address: "123 Main St, Springfield",
    student_name: "John Doe",
    student_id: "9eac618e-77ec-44e4-b50c-fe488ceb7737",
    phone_no: "9137058635",
    institute_id: "828f0d33-258f-4a92-a235-9c1b30d8882b",
    institute_name: "Thakur Institute of Aviation",
    is_archived: false,
    department: null,
    dob: "1995-05-15",
    gender: "Male",
    roll_no: "R001",
    year_of_admission: "2015",
    password: "password123",
  },
  {
    email: "leon1@gmail.com",
    address: "Malad",
    student_name: "Leon Mendonca",
    student_id: "614cabeb-82c4-4084-8779-3e43a5841c84",
    phone_no: "0987654321",
    institute_id: "94f55255-3f0f-4ac4-9c60-235f4fe8a849",
    institute_name: "Some Other Institute",
    is_archived: false,
    department: null,
    dob: "1998-12-01",
    gender: "Male",
    roll_no: "R002",
    year_of_admission: "2018",
    password: "leonpass",
  },
  // ... other fallback student objects
];
