"use client";

import React, { useState } from "react";
import { useCreate, useUpdate } from "@refinedev/core"; // Import useCreate and useUpdate
import { toast } from "sonner"; // Import toast for notifications
import Header from "@/components/custom/header";
import IssueBook from "./issue-book";
import Tabbing from "@/components/custom/tabbing";
import { Button } from "@/components/ui/button";
import DashboardData from "./dashboard-data-count";
import { Activities } from "./modified-activity-feed";

// Move from App Router
import MasterTable from "@/app/test/table-page";

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

  const { mutate: createMutate, isLoading: isCreateLoading } = useCreate();
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useUpdate();

  // Handle Accept & Decline Actions
  const handleRequestAction = async (
    requestId: string,
    status: "approved" | "rejected",
    requestType: "issue" | "re-issue"
  ) => {
    if (requestType === "issue") {
      // For issue requests, use POST method
      const endpoint = "book_v2/request_booklog_issue_ar";

      createMutate(
        {
          resource: endpoint,
          values: {
            request_id: requestId,
            status: status,
          },
        },
        {
          onSuccess: () => {
            toast.success(
              `Request ${
                status === "approved" ? "approved" : "declined"
              } successfully!`
            );
            setRefresh((prev) => prev + 1);
          },
          onError: (error) => {
            toast.error(
              error?.message ||
                "An error occurred while processing the request."
            );
          },
        }
      );
    } else {
      // For re-issue requests, use PUT method
      const endpoint = "book_v2/request_booklog_reissue_ar";

      updateMutate(
        {
          resource: endpoint,
          id: "", // Even if empty, this is needed for the useUpdate hook
          values: {
            request_id: requestId,
            status: status,
          },
          meta: {
            method: "PUT", // Explicitly set the method to PUT
          },
        },
        {
          onSuccess: () => {
            toast.success(
              `Request ${
                status === "approved" ? "approved" : "declined"
              } successfully!`
            );
            setRefresh((prev) => prev + 1);
          },
          onError: (error) => {
            console.error("Update Error:", error);
            toast.error(
              error?.message ||
                "An error occurred while processing the request."
            );
          },
        }
      );
    }
  };

  const isLoading = isCreateLoading || isUpdateLoading;

  const columns = [
    { accessorKey: "book_copy_id", header: "Book ID" },
    { accessorKey: "book_title", header: "Name of Book" },
    { accessorKey: "book_author", header: "Name of Author" },
    { accessorKey: "edition", header: "Edition" },
    { accessorKey: "request_type", header: "Action Type" },
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
      accessorKey: "request_id",
      header: "Action",
      cell: ({ row }: any) => {
        const requestId = row.getValue("request_id");
        const requestType = row.getValue("request_type"); // "issue" or "re-issue"

        return (
          <div className="flex gap-2 justify-center items-center">
            <Button
              variant="ghost"
              className="text-[#0D894F]"
              onClick={() =>
                handleRequestAction(requestId, "approved", requestType)
              }
              disabled={isLoading}
            >
              Accept
            </Button>
            <Button
              variant="ghost"
              className="text-[#F04438]"
              onClick={() =>
                handleRequestAction(requestId, "rejected", requestType)
              }
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
                <DashboardData refresh={refresh} />
                <IssueBook setRefreshAction={setRefresh} />
                <Activities refresh={refresh} />
              </>
            ),
            [LibraryTabs.REQUEST]: (
              <MasterTable
                title="Requests"
                AddedOptions={[]}
                columns={() => columns}
                isSelectable={true}
                resource="book_v2/request_booklog"
              />
            ),
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
