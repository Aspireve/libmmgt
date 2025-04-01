"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FeesPenaltiesModal from "@/components/feespenaltyModal/feespenaltiesModal";

export interface Penalties {
  student_id: string;
  student_name: string;
  department: string;
  book_copy_id: string;
  subject: string;
  created_at: Date;
  return_date: Date;
  penalty_amount: string;
  student_uuid?: string;
}

const CustomCell = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        onClick={() => setModalOpen(true)}
      >
        Update
      </Button>
      <FeesPenaltiesModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};


export const priorColumns: ColumnDef<Penalties>[] = [
  {
    accessorKey: "action",
    header: () => (
      <div style={{ marginLeft: "10px" }}>Action</div> 
    ),
    cell: () => <CustomCell />,
  },
];

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
      return date instanceof Date && !isNaN(date.getTime()) ? date.toLocaleDateString() : "";
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
      return date instanceof Date && !isNaN(date.getTime()) ? date.toLocaleDateString() : "";
    },
  },
  {
    accessorKey: "penalty_amount",
    header: "Penalties",
  },
];

// Sample data
export const fallbackData: Penalties[] = [
  {
    student_id: "#3066",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_copy_id: "B001",
    subject: "Fiction",
    created_at: new Date("2023-12-10"),
    return_date: new Date("2023-12-15"),
    penalty_amount: "₹100",
    student_uuid: "uuid-3066",
  },
  {
    student_id: "#3065",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_copy_id: "B002",
    subject: "Non-Fiction",
    created_at: new Date("2023-12-07"),
    return_date: new Date("2023-12-20"),
    penalty_amount: "₹100",
    student_uuid: "uuid-3065",
  },
  {
    student_id: "#3064",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_copy_id: "B003",
    subject: "Science",
    created_at: new Date("2023-11-25"),
    return_date: new Date("2023-11-30"),
    penalty_amount: "₹100",
    student_uuid: "uuid-3064",
  },
  {
    student_id: "#3063",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_copy_id: "B004",
    subject: "History",
    created_at: new Date("2023-12-05"),
    return_date: new Date("2023-12-10"),
    penalty_amount: "₹100",
    student_uuid: "uuid-3063",
  },
  {
    student_id: "#3062",
    student_name: "Bhumi Jain",
    department: "Electronics",
    book_copy_id: "B005",
    subject: "Fiction",
    created_at: new Date("2023-12-01"),
    return_date: new Date("2023-12-05"),
    penalty_amount: "₹100",
    student_uuid: "uuid-3062",
  },
];

