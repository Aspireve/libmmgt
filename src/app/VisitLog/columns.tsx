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
      const timeValue = row.getValue("inTime");
      if (!timeValue) return "";
      const time = typeof timeValue === "string" ? new Date(timeValue) : timeValue;
      if (time instanceof Date && !isNaN(time.getTime())) {
        return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
      return "";
    },
  },
  {
    accessorKey: "outTime",
    header: "Out Time",
    cell: ({ row }) => {
      const timeValue = row.getValue("outTime");
      if (!timeValue) return "";
      const time = typeof timeValue === "string" ? new Date(timeValue) : timeValue;
      if (time instanceof Date && !isNaN(time.getTime())) {
        return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
      return "";
    },
  },
];

// Static fallback data for VisitLog
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
];