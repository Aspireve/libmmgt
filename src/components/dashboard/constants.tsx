import {
  ArrowDown03Icon,
  ArrowUp03Icon,
  Bookshelf03Icon,
  BookUploadIcon,
  Cash02Icon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import { ApproveRejectButton } from "./approve-reject-button";

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
    accessorKey: "request_id",
    header: "Request ID",
    cell: ({ row }: any) => (
      <span className="font-bold">
        {row.getValue("request_id").slice(0, 10)}
      </span>
    ),
  },
  { accessorKey: "book_copy_id", header: "Book ID" },
  { accessorKey: "student_id", header: "Student ID" },
  { accessorKey: "book_title", header: "Name of Book" },
  // { accessorKey: "book_author", header: "Name of Author" },
  {
    accessorKey: "edition",
    header: "Edition",
    accessorFn: (data: any) => data.edition ?? "Not Provided",
  },
  {
    accessorKey: "request_type",
    header: "Action Type",
    cell: ({ row }: any) => {
      const request_type = row.getValue("request_type");
      return request_type === "issue" ? (
        <span className="bg-[#faf6e8] border border-[#d2a61e] text-[#d2a61e] px-2 py-1 rounded-full">
          Issue
        </span>
      ) : request_type === "re-issue" ? (
        <span className="bg-[#e9e8f6] border border-[#392fb2] text-[#392fb2] px-2 py-1 rounded-full">
          Reissue
        </span>
      ) : request_type === "return" ? (
        <span className="bg-[#e9f0e9] border border-[#2a6f23] text-[#2a6f23] px-2 py-1 rounded-full">
          Return
        </span>
      ) : request_type === "notes" ? (
        <span className="bg-[#cdcdcd] border border-[#313131] text-[#313131] px-2 py-1 rounded-full">
          Notes
        </span>
      ) : (
        request_type
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }: any) => {
      const rawDate = row.getValue("created_at");
      const formattedDate = new Date(rawDate).toLocaleDateString("en-GB"); // Converts to dd/mm/yyyy
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "request_id",
    header: "Action",
    cell: ({ row }: any) => {
      const requestId = row.getValue("request_id");
      const requestType = row.getValue("request_type");
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
