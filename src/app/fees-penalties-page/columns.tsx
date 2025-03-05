"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface Student {
  student_id: string;
  student_name: string;
  department: string;
  book_name: string;
  return_date: Date;
  penalties: string;
}

export const studentColumns: ColumnDef<Student>[] = [
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
    accessorKey: "book_name",
    header: "Book Name",
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
    accessorKey: "penalties",
    header: "Penalties",
  },
];

export const fallbackData: Student[] = [
  {
    student_id: "#3066",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_name: "Fiction",
    return_date: new Date("2023-12-15"),
    penalties: "₹100",
  },
  {
    student_id: "#3065",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_name: "Non-Fiction",
    return_date: new Date("2023-12-20"),
    penalties: "₹100",
  },
  {
    student_id: "#3064",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_name: "Science",
    return_date: new Date("2023-11-30"),
    penalties: "₹100",
  },
  {
    student_id: "#3063",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_name: "History",
    return_date: new Date("2023-12-10"),
    penalties: "₹100",
  },
  {
    student_id: "#3062",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_name: "Fiction",
    return_date: new Date("2023-12-05"),
    penalties: "₹100",
  },
];
