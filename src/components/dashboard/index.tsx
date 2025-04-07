"use client";

import React, { useState } from "react";
import Header from "@/components/custom/header";
import IssueBook from "./issue-book";
import Tabbing from "@/components/custom/tabbing";
import DashboardData from "./dashboard-data-count";
import { Activities } from "./modified-activity-feed";
import MasterTable from "@/app/test/table-page";
import { SearchFilter } from "../students/search-student";
import { approveColumns } from "./constants";

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
                columns={approveColumns}
                isSelectable={true}
                resource="book_v2/request_booklog"
                AddedOptions={[
                  ({ setFilters }) =>
                    SearchFilter({
                      setFilters,
                      options: [
                        { label: "Request ID", value: "cr.request_id" },
                        { label: "Book ID", value: "cr.book_copy_id" },
                        { label: "Student ID", value: "cr.student_id" },
                      ],
                      placeholder: "Search",
                    }),
                ]}
              />
            ),
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
