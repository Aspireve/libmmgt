"use client";
import React from "react";
import Tabbing from "../Tab/Tab";
import Header from "../Header/header";
import IssueBook from "../IssueBook/IssueBook";
import Activities from "../ActivityFeed/activityfeed";

export default function Dashboard() {
  return (
    <>
      <Header />
      <Tabbing
        tabs={[
          { key: "issue-book", label: "Issue Book" },
          { key: "requests", label: "Requests" },
        ]}
        defaultTab="issue-book"
        onTabChange={(activeTab) => {
          console.log("Dashboard tab changed to:", activeTab);
        }}
       
      />
      <IssueBook />
      <Activities />
    </>
  );
}
