"use client";

import { ColumnDef } from "@tanstack/react-table";
import EditBtn from "../../images/EditBtn.png";
import DeleteBtn from "../../images/DeleteBtn.png";
import { useRouter } from "next/navigation";

export interface Student {
  student_id: string; // Kept in interface for backend purposes but won't be displayed in table
  full_name: string;
  department: string | null;
  email: string;
  phone_no: string;
  address: string;
  institute_id: string;
  is_archived: boolean;
  dob: string; // Date of birth (e.g., "YYYY-MM-DD")
  gender: string; // e.g., "Male", "Female", "Other"
  roll_no: string; // Roll number
  year_of_admission: string; // e.g., "2023"
  password: string; // For form purposes, not displayed in table
  confirm_password?: string; // Optional, for form validation, not stored or displayed
}

export const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "full_name",
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
          <button
            onClick={() => handleEdit(student, router)}
            aria-label="Edit student"
          >
            <img src={EditBtn.src} alt="Edit" />
          </button>
          <button
            onClick={() => handleDelete(student.student_id)}
            aria-label="Delete student"
          >
            <img src={DeleteBtn.src} alt="Delete" />
          </button>
        </div>
      );
    },
  },
];

const handleEdit = (student: Student, router: any) => {
  router.push(`/EditStudent?id=${student.student_id}&student=${encodeURIComponent(JSON.stringify(student))}`);
};

const handleDelete = (id: string) => {
  console.log(`Delete student with ID: ${id}`);
};

export const fallbackData: Student[] = [
  {
    email: "john.doe@example.com",
    address: "123 Main St, Springfield",
    full_name: "John Doe",
    student_id: "9eac618e-77ec-44e4-b50c-fe488ceb7737",
    phone_no: "9137058635",
    institute_id: "828f0d33-258f-4a92-a235-9c1b30d8882b",
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
    full_name: "Leon Mendonca",
    student_id: "614cabeb-82c4-4084-8779-3e43a5841c84",
    phone_no: "0987654321",
    institute_id: "94f55255-3f0f-4ac4-9c60-235f4fe8a849",
    is_archived: false,
    department: null,
    dob: "1998-12-01",
    gender: "Male",
    roll_no: "R002",
    year_of_admission: "2018",
    password: "leonpass",
  },
  {
    email: "singhaditya123@gmail.com",
    address: "Kandivali West",
    full_name: "Aditya Singh",
    student_id: "f7f1cb68-3038-483e-b377-4b6306eec1fb",
    phone_no: "1234567890",
    institute_id: "828f0d33-258f-4a92-a235-9c1b30d8883b",
    is_archived: false,
    department: "IT",
    dob: "2000-03-22",
    gender: "Male",
    roll_no: "R003",
    year_of_admission: "2020",
    password: "aditya123",
  },
  {
    email: "tejas123@gmail.com",
    address: "Lower Parel",
    full_name: "Tejas",
    student_id: "3194cc7c-0a93-479a-91b3-63d70dc7a566",
    phone_no: "7896543215",
    institute_id: "828f0d33-258f-4a92-a235-9c1b30d8884b",
    is_archived: false,
    department: "IT",
    dob: "1999-07-10",
    gender: "Male",
    roll_no: "R004",
    year_of_admission: "2019",
    password: "tejaspass",
  },
  {
    email: "leon@gmail.com",
    address: "Kandivali West",
    full_name: "Leon Mendonca",
    student_id: "954e0748-7d65-4f53-a36b-a9516f7f0467",
    phone_no: "9089323232",
    institute_id: "94f55255-3f0f-4ac4-9c60-235f4fe8a849",
    is_archived: false,
    department: "IT",
    dob: "1997-09-25",
    gender: "Male",
    roll_no: "R005",
    year_of_admission: "2017",
    password: "leon456",
  },
];