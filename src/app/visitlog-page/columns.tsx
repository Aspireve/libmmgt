"use client";

import { ColumnDef } from "@tanstack/react-table";

// Centralized interface for VisitLog
export interface VisitLog {
  visitor_id: string;
  visitor_name: string;
  department: string;
  visitor_type: string;
  in_time: string;
  out_time: string;
}

// Helper function to format time in 24-hour format
const formatTime = (timeValue: string): string => {
  if (!timeValue) return "";
  const date = new Date(timeValue);
  if (isNaN(date.getTime())) return timeValue;
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

// Column definitions for the VisitLog table
export const visitLogColumns: ColumnDef<VisitLog>[] = [
  {
    accessorKey: "student_id",
    header: "Visitor ID",
  },
  {
    accessorKey: "visitor_name",
    header: "Visitor Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "visitor_type",
    header: "Visitor Type",
  },
  {
    accessorKey: "in_time",
    header: "In Time",
    cell: ({ row }) => {
      const timeValue = row.getValue<string>("in_time");
      return formatTime(timeValue);
    },
  },
  {
    accessorKey: "out_time",
    header: "Out Time",
    cell: ({ row }) => {
      const timeValue = row.getValue<string>("out_time");
      return formatTime(timeValue);
    },
  },
];