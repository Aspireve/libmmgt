"use client";
import React, { useState } from "react";
import Header from "@/components/custom/header";
import IssueBook from "@/components/dashboard/issue-book";
import Activities from "@/components/dashboard/activity-feed";
import Tabbing from "@/components/custom/tabbing";
import { MainTable } from "@/components/data-tables/main-table";
import MasterTable from "../test/table-page";
import { Button } from "@/components/ui/button";

enum LibraryTabs {
  ISSUE = "issue",
  REQUEST = "request",
}

const TABS = [
  { key: LibraryTabs.ISSUE, label: "Issue Book" },
  { key: LibraryTabs.REQUEST, label: "Request" },
];

const columns = [
  { accessorKey: "book_title_id", header: "Book ID" },
  { accessorKey: "book_title_id", header: "Name of Book" },
  { accessorKey: "book_title_id", header: "Name of Author" },
  { accessorKey: "book_title_id", header: "Edition" },
  { accessorKey: "book_title_id", header: "Date" },
  {
    accessorKey: "book_title_id",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2 justify-center items-center ">
        <Button variant="ghost" className="text-[#0D894F]">Accept</Button>
        <Button variant="ghost" className="text-[#F04438]">Decline</Button>
      </div>
    ),
  },
];

export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);

  const heading = "Library Management";
  const subheading = "Tanvir Chavan";
  return (
    <>
      <Header heading={heading} subheading={subheading} />
      <Tabbing
        tabs={TABS}
        content={{
          [LibraryTabs.ISSUE]: (
            <>
              <IssueBook setRefreshAction={setRefresh} />
              <Activities refresh={refresh} />
            </>
          ),
          [LibraryTabs.REQUEST]: (
            <MasterTable
              title="Requests"
              AddedOptions={[]}
              columns={() => columns}
              isSelectable={false}
              // Please change this
              resource="student/all"
            />
          ),
        }}
      />

      <div className="py-10" />
    </>
  );
}
