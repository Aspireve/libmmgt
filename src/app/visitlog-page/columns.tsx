"use client";

import { ColumnDef } from "@tanstack/react-table";

// Interface for VisitLog data (using snake_case to match screenshot and API consistency)
export interface VisitLog {
  visitor_id: string;
  visitor_name: string;
  department: string;
  visitor_type: string;
  in_time: string;
  out_time: string;
}

const formatTime = (timeValue: string): string => {
  if (!timeValue || typeof timeValue !== "string") return "";
  const [hoursStr, minutesStr] = timeValue.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (isNaN(hours) || isNaN(minutes) || hours > 23 || minutes > 59) {
    return timeValue; // Return original if invalid
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }); // 24-hour format without AM/PM
};

// Column definitions for VisitLog table
export const visitLogColumns: ColumnDef<VisitLog>[] = [
  {
    accessorKey: "visitor_id",
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

export const fallbackVisitLogData: VisitLog[] = [
  { visitor_id: "#3066", visitor_name: "Bhumi Jain", department: "Electronics", visitor_type: "Computer", in_time: "12:00", out_time: "13:00" },
  { visitor_id: "#3065", visitor_name: "Priya Sharma", department: "Computer Science", visitor_type: "Laptop", in_time: "09:30", out_time: "10:45" },
  { visitor_id: "#3064", visitor_name: "Rohit Kumar", department: "Mechanical", visitor_type: "Equipment", in_time: "14:00", out_time: "15:15" },
  { visitor_id: "#3063", visitor_name: "Sara Khan", department: "Civil", visitor_type: "Calculator", in_time: "10:00", out_time: "10:30" },
  { visitor_id: "#3062", visitor_name: "Akash Patel", department: "IT", visitor_type: "Tablet", in_time: "11:15", out_time: "11:45" },
  { visitor_id: "#3061", visitor_name: "Pooja Das", department: "Management", visitor_type: "Laptop", in_time: "16:00", out_time: "16:30" },
  { visitor_id: "#3060", visitor_name: "Amit Verma", department: "Electronics", visitor_type: "Computer", in_time: "08:00", out_time: "09:00" },
];