"use client";

import { ColumnDef } from "@tanstack/react-table";

// Interface for VisitLog data
export interface VisitLog {
  visitorId: string;
  visitorName: string;
  department: string;
  visitorType: string;
  inTime: string;
  outTime: string;
}

const formatTime = (timeValue: string): string => {
  if (!timeValue) return "";

  const [hoursStr, minutesStr] = timeValue.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (isNaN(hours) || isNaN(minutes)) {
    return timeValue;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  // Consistent formatting with 'en-US' and lowercase
  return date
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    .toLowerCase();
};

// Column definitions for VisitLog table
export const visitLogColumns: ColumnDef<VisitLog>[] = [
  {
    accessorKey: "visitorId",
    header: "Visitor ID",
  },
  {
    accessorKey: "visitorName",
    header: "Visitor Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "visitorType",
    header: "Visitor Type",
  },
  {
    accessorKey: "inTime",
    header: "In Time",
    cell: ({ row }) => {
      const timeValue = row.getValue<string>("inTime");
      return formatTime(timeValue);
    },
  },
  {
    accessorKey: "outTime",
    header: "Out Time",
    cell: ({ row }) => {
      const timeValue = row.getValue<string>("outTime");
      return formatTime(timeValue);
    },
  },
];

export const fallbackVisitLogData: VisitLog[] = [
  {
    visitorId: "#3066",
    visitorName: "Bhumi Jain",
    department: "Electronics",
    visitorType: "Computer",
    inTime: "12:00",
    outTime: "13:00",
  },
  {
    visitorId: "#3065",
    visitorName: "Bhumi Jain",
    department: "Electronics",
    visitorType: "Computer",
    inTime: "12:00",
    outTime: "13:00",
  },
  {
    visitorId: "#3064",
    visitorName: "Bhumi Jain",
    department: "Electronics",
    visitorType: "Computer",
    inTime: "12:00",
    outTime: "13:00",
  },
  {
    visitorId: "#3063",
    visitorName: "Bhumi Jain",
    department: "Electronics",
    visitorType: "Computer",
    inTime: "12:00",
    outTime: "13:00",
  },
  {
    visitorId: "#3062",
    visitorName: "Bhumi Jain",
    department: "Electronics",
    visitorType: "Computer",
    inTime: "12:00",
    outTime: "13:00",
  },

  {
    visitorId: "#3061",
    visitorName: "Aman Singh",
    department: "Computer Science",
    visitorType: "Laptop",
    inTime: "09:30",
    outTime: "10:45",
  },
  {
    visitorId: "#3060",
    visitorName: "Rohit Sharma",
    department: "Mechanical",
    visitorType: "Equipment",
    inTime: "14:00",
    outTime: "15:15",
  },
  {
    visitorId: "#3059",
    visitorName: "Sara Khan",
    department: "Civil",
    visitorType: "Calculator",
    inTime: "10:00",
    outTime: "10:30",
  },
  {
    visitorId: "#3058",
    visitorName: "Akash Patel",
    department: "IT",
    visitorType: "Tablet",
    inTime: "11:15",
    outTime: "11:45",
  },
  {
    visitorId: "#3057",
    visitorName: "Pooja Das",
    department: "Management",
    visitorType: "Laptop",
    inTime: "16:00",
    outTime: "16:30",
  },
];
