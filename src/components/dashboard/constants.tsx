import {
  ArrowDown03Icon,
  ArrowUp03Icon,
  Bookshelf03Icon,
  BookUploadIcon,
  Cash02Icon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import { ApproveRejectButton } from "./approve-reject-button";
import Link from "next/link";

export type DashboardCardtypes = {
  totalBooks?: string;
  totalBorrowedBooks?: string;
  newBooks?: string;
  totalMembers?: string;
  todayIssues?: string;
  todayReturned?: string;
  overdue?: string;
  trending?: string;
};

export const approveColumns = ({
  refetch,
}: {
  refetch: () => Promise<unknown>;
}) => [
  {
    accessorKey: "requestId",
    header: "Request ID",
    cell: ({ row }: any) => (
      <span className="font-bold">{row.getValue("requestId")}</span>
    ),
  },
  {
    accessorKey: "bookCopyId",
    header: "Book ID",
    cell: ({ row }: any) => {
      const requestType = row.getValue("requestType");
      return requestType === "notes" ? (
        <Link
          href={row.original.bookCopyId}
          target="_blank"
          className="font-bold"
        >
          Open Book
        </Link>
      ) : (
        row.original.bookCopyId
      );
    },
  },
  // { accessorKey: "studentId", header: "Student ID" },
  { accessorKey: "bookTitle", header: "Book Title" },
  { accessorKey: "author", header: "Author" },
  {
    accessorKey: "edition",
    header: "Edition",
    accessorFn: (data: any) => data.edition ?? "Not Provided",
  },
  {
    accessorKey: "requestType",
    header: "Request Type",
    cell: ({ row }: any) => {
      const requestType = row.getValue("requestType");
      return requestType === "issue" ? (
        <span className="bg-[#faf6e8] border border-[#d2a61e] text-[#d2a61e] px-2 py-1 rounded-full">
          Issue
        </span>
      ) : requestType === "re-issue" ? (
        <span className="bg-[#e9e8f6] border border-[#392fb2] text-[#392fb2] px-2 py-1 rounded-full">
          Reissue
        </span>
      ) : requestType === "return" ? (
        <span className="bg-[#e9f0e9] border border-[#2a6f23] text-[#2a6f23] px-2 py-1 rounded-full">
          Return
        </span>
      ) : requestType === "notes" ? (
        <span className="bg-[#cdcdcd] border border-[#313131] text-[#313131] px-2 py-1 rounded-full">
          Notes
        </span>
      ) : (
        requestType
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }: any) => {
      const rawDate = row.getValue("createdAt");
      const formattedDate = new Date(rawDate).toLocaleDateString("en-GB"); // Converts to dd/mm/yyyy
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "requestId",
    header: "Action",
    cell: ({ row }: any) => {
      const requestId = row.getValue("requestId");
      const requestType = row.getValue("requestType");
      return (
        <ApproveRejectButton
          requestId={requestId}
          requestType={requestType}
          refetch={refetch}
        />
      );
    },
  },
];

export const dataCards = ({
  institute_uuid,
  dashboardStats,
}: {
  institute_uuid: string | undefined;
  dashboardStats: DashboardCardtypes;
}) => [
  {
    title: "Total Books",
    value: dashboardStats?.totalBooks ?? "0",
    icon: Bookshelf03Icon,
    downloadUrl: `https://lms-807p.onrender.com/csv/total-books?institute_id=${institute_uuid}`,
    iconBgColor: "bg-[#E8E7FF]",
    accent: "#8155FF",
  },
  {
    title: "Total Borrowed Books",
    value: dashboardStats?.totalBorrowedBooks ?? "0",
    icon: BookUploadIcon,
    downloadUrl: `https://lms-807p.onrender.com/csv/borrowed-books?institute_id=${institute_uuid}`,
    iconBgColor: "bg-[#FFF4DE]",
    accent: "#FEA40D",
  },
  {
    title: "New Books",
    value: dashboardStats?.newBooks ?? "0",
    icon: Cash02Icon,
    downloadUrl: `https://lms-807p.onrender.com/csv/new-books?institute_id=${institute_uuid}`,
    iconBgColor: "bg-[#DCFCE7]",
    accent: "#4AD991",
  },
  {
    title: "Total Members",
    value: dashboardStats?.totalMembers ?? "0",
    icon: UserMultiple02Icon,
    downloadUrl: `https://lms-807p.onrender.com/csv/total-members?institute_id=${institute_uuid}`,
    iconBgColor: "bg-[#E0F2FE]",
    accent: "#5FC5FF",
  },
  {
    title: "Today Issue",
    value: dashboardStats?.todayIssues ?? "0",
    icon: ArrowUp03Icon,
    downloadUrl: `https://lms-807p.onrender.com/csv/today-issues?institute_id=${institute_uuid}`,
    iconBgColor: "bg-[#E8E7FF]",
    accent: "#8155FF",
  },
  {
    title: "Today Return",
    value: dashboardStats?.todayReturned ?? "0",
    icon: ArrowDown03Icon,
    downloadUrl: `https://lms-807p.onrender.com/csv/today-returned?institute_id=${institute_uuid}`,
    iconBgColor: "bg-[#FFF4DE]",
    accent: "#FEA40D",
  },
  {
    title: "Overdues",
    value: dashboardStats?.overdue ?? "0",
    icon: Cash02Icon,
    downloadUrl: `https://lms-807p.onrender.com/csv/overdue?institute_id=${institute_uuid}`,
    iconBgColor: "bg-[#DCFCE7]",
    accent: "#4AD991",
  },
  {
    title: "Trending Books",
    value: dashboardStats?.trending ?? "0",
    icon: UserMultiple02Icon,
    downloadUrl: `https://lms-807p.onrender.com/csv/new-books?institute_id=${institute_uuid}`,
    iconBgColor: "bg-[#E0F2FE]",
    accent: "#5FC5FF",
  },
];
