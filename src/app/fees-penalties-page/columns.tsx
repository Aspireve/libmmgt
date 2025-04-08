"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FeesPenaltiesModal from "@/components/feespenaltyModal/feespenaltiesModal";

export interface Penalties {
  student_id: string;
  student_name: string;
  department: string;
  book_id: string;
  subject: string;
  created_at: Date;
  return_date: Date;
  penalty_amount: string;
  student_uuid?: string;
  is_penalised: boolean;
  is_completed: boolean;
}

const CustomCell = ({ isPenalised }: { isPenalised: boolean }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      {isPenalised && (
        <Button variant="outline" onClick={() => setModalOpen(true)}>
          Pay
        </Button>
      )}
      <FeesPenaltiesModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export const PenaltiesColumns: ColumnDef<Penalties>[] = [
  {
    accessorKey: "action",
    header: () => <div style={{ marginLeft: "10px" }}>Action</div>,
    cell: ({ row }) => (
      <CustomCell isPenalised={row.getValue("is_penalised")} />
    ),
  },
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
    accessorKey: "book_id",
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
      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleDateString()
        : "";
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
      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleDateString()
        : "";
    },
  },
  {
    accessorKey: "penalty_amount",
    header: "Penalties",
  },
];
