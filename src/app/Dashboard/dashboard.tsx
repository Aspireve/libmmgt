"use client";
import React, { useState } from "react";
import Header from "@/components/custom/header";
import IssueBook from "@/components/dashboard/issue-book";
import Activities from "@/components/dashboard/activity-feed";
import Tabbing from "@/components/custom/tabbing";
import DashboardData from "@/components/dashboard/dashboard-data-count";

enum LibraryTabs {
  ISSUE = "issue",
  REQUEST = "request",
}

const TABS = [
  { key: LibraryTabs.ISSUE, label: "Issue Book" },
  { key: LibraryTabs.REQUEST, label: "Request" },
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
            <DashboardData/>
              <IssueBook setRefreshAction={setRefresh} />
              <Activities refresh={refresh} />
            </>
          ),
          [LibraryTabs.REQUEST]: <>Insert Data Table</>,
        }}
      />

      <div className="py-10" />
    </>
  );
}
