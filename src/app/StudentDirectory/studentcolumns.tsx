"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface Student {
  student_id: string;
  student_name: string;
  department: string;
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
];

// Static fallback data
export const fallbackData: Student[] = [
  {
    student_id: "#3066",
    student_name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    student_id: "#3065",
    student_name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    student_id: "#3064",
    student_name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    student_id: "#3063",
    student_name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    student_id: "#3062",
    student_name: "Bhumi Jain",
    department: "Electronics",
  },
];
