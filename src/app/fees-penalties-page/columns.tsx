"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface Penalties {
  student_id: string;
  student_name: string;
  department: string;
  book_id: string;
  book_category: string;
  created_at: Date;
  return_date: Date;
  penalties: string;
  student_uuid?: string;
}
 
export const PenaltiesColumns: ColumnDef<Penalties>[] = [
  {
    accessorKey: "student_id",
    header: "Student ID",
  },
  {
    accessorKey: "student_name",
    header: "Student Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "book_copy_id",
    header: "Book ID",
  },
  {
    accessorKey: "subject",
    header: "Book Category",
  },
  {
    accessorKey: "created_at",
    header: "Issued Date",
    cell: ({ row }) => {
      const dateValue = row.getValue("created_at");
      if (!dateValue) return "";
      const date =
        typeof dateValue === "string" ? new Date(dateValue) : dateValue;
      if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toLocaleDateString();
      }
      return "";
    },
  },
  {
    accessorKey: "return_date",
    header: "Return Date",
    cell: ({ row }) => {
      const dateValue = row.getValue("return_date");
      if (!dateValue) return "";
      const date =
        typeof dateValue === "string" ? new Date(dateValue) : dateValue;
      if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toLocaleDateString();
      }
      return "";
    },
  },
  {
    accessorKey: "penalty_amount",
    header: "Penalties",
  },
  {
    id: "actions",
    header: "",
    cell: () => null, 
  }
];

export const fallbackData: Penalties[] = [
  {
    student_id: "#3066",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_id: "B001", // Added Book_id
    book_category: "Fiction",
    created_at: new Date("2023-12-10"),
    return_date: new Date("2023-12-15"),
    penalties: "₹100",
    student_uuid: "uuid-3066",
  },
  {
    student_id: "#3065",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_id: "B002",
    book_category: "Non-Fiction",
    created_at: new Date("2023-12-07"),
    return_date: new Date("2023-12-20"),
    penalties: "₹100",
    student_uuid: "uuid-3065",
  },
  {
    student_id: "#3064",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_id: "B003",
    book_category: "Science",
    created_at: new Date("2023-11-25"),
    return_date: new Date("2023-11-30"),
    penalties: "₹100",
    student_uuid: "uuid-3064",
  },
  {
    student_id: "#3063",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_id: "B004",
    book_category: "History",
    created_at: new Date("2023-12-05"),
    return_date: new Date("2023-12-10"),
    penalties: "₹100",
    student_uuid: "uuid-3063",
  },
  {
    student_id: "#3062",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_id: "B005",
    book_category: "Fiction",
    created_at: new Date("2023-12-01"),
    return_date: new Date("2023-12-05"),
    penalties: "₹100",
    student_uuid: "uuid-3062",
  },
];