"use client";
import React, { useState } from "react";
import { useCreate } from "@refinedev/core"; // Import useCreate
import { toast } from "sonner"; // Import toast for notifications
import Header from "@/components/custom/header";
import IssueBook from "@/components/dashboard/issue-book";
import Tabbing from "@/components/custom/tabbing";
import MasterTable from "../test/table-page";
import { Button } from "@/components/ui/button";
import DashboardData from "@/components/dashboard/dashboard-data-count";
import { Activities } from "@/components/dashboard/modified-activity-feed";

enum LibraryTabs {
  ISSUE = "issue",
  REQUEST = "request",
}

const TABS = [
  { key: LibraryTabs.ISSUE, label: "Issue Book" },
  { key: LibraryTabs.REQUEST, label: "Request" },
];

const Dashboard = () => {
  const [refresh, setRefresh] = useState(0);

  const { mutate, isLoading } = useCreate(); // Using Refine's useCreate

  // Handle Accept & Decline Actions
  const handleRequestAction = async (requestId: string, status: "approved" | "rejected") => {
    mutate(
      {
        resource: "book_v2/request_booklog_issue_ar",
        values: {
          request_id: requestId,
          status: status,
        },
      },
      {
        onSuccess: () => {
          toast.success(`Request ${status === "approved" ? "approved" : "declined"} successfully!`);
          setRefresh((prev) => prev + 1); // Refresh table after action
        },
        onError: (error) => {
          toast.error(error?.message || "An error occurred while processing the request.");
        },
      }
    );
  };

  const columns = [
    { accessorKey: "book_copy_id", header: "Book ID" },
    { accessorKey: "book_title", header: "Name of Book" },
    { accessorKey: "book_author", header: "Name of Author" },
    { accessorKey: "edition", header: "Edition" },
    {
      accessorKey: "request_created_at",
      header: "Date",
      cell: ({ row }: any) => {
        const rawDate = row.getValue("request_created_at");
        const formattedDate = new Date(rawDate).toLocaleDateString("en-GB"); // Converts to dd/mm/yyyy
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "request_id", // Ensure this exists in API response
      header: "Action",
      cell: ({ row }: any) => {
        const requestId = row.getValue("request_id");

        return (
          <div className="flex gap-2 justify-center items-center">
            <Button
              variant="ghost"
              className="text-[#0D894F]"
              onClick={() => handleRequestAction(requestId, "approved")}
              disabled={isLoading}
            >
              Accept
            </Button>
            <Button
              variant="ghost"
              className="text-[#F04438]"
              onClick={() => handleRequestAction(requestId, "rejected")}
              disabled={isLoading}
            >
              Decline
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Header heading="Library Management" subheading="Tanvir Chavan" />
      <div className="mx-[40px] my-[20px]">
        <Tabbing
          tabs={TABS}
          content={{
            [LibraryTabs.ISSUE]: (
              <>
                <DashboardData />
                <IssueBook setRefreshAction={setRefresh} />
                <Activities />
              </>
            ),
            [LibraryTabs.REQUEST]: (
              <MasterTable
                title="Requests"
                AddedOptions={[]}
                columns={() => columns}
                isSelectable={false}
                resource="book_v2/request_booklog"
                // refresh={refresh} // Refresh the table on action
              />
            ),
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
