"use client";

import { ColumnDef } from "@tanstack/react-table";

interface Student {
  id: string | number;
  name: string;
  department: string;
}

export const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",  // Changed from student_id to match interface
    header: "Student ID",
  },
  {
    accessorKey: "name",  // Changed from student_name to match interface
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
    id: "#3066",  // Changed from student_id
    name: "Bhumi Jain",  // Changed from student_name
    department: "Electronics",
  },
  {
    id: "#3065",
    name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    id: "#3064",
    name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    id: "#3063",
    name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    id: "#3062",
    name: "Bhumi Jain",
    department: "Electronics",
  },
];