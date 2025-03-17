"use client";
import React, { useState } from "react";
import Header from "@/components/custom/header";
import IssueBook from "@/components/dashboard/issue-book";
import Activities from "@/components/dashboard/activity-feed";
import BookBorrowedDetails from "../book-pages/book-borrowed-details/page";
import BookActiveDetails from "../book-pages/book-details-activities/page";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"issue" | "request">("issue");
  const [refresh, setRefresh] = useState(0);

  const paddingClasses =
    "transition-all duration-300 py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px]";
  const activeClasses =
    "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF]";
  const inactiveClasses = "bg-white text-black border-0";

  const heading = "Library Management";
  const subheading = "Tanvir Chavan";
  return (
    <>
      <Header heading={heading} subheading={subheading} />
      {/* <div className="mt-8 flex justify-evenly bg-white border border-[#e4e4e4] rounded-[8px] gap-[6px] m-4 p-[5px] w-fit">
        <Button
          className={`rounded-[6px] transition-colors shadow-none ${paddingClasses} ${
            activeTab === "issue" ? activeClasses : inactiveClasses
          }`}
          onClick={() => setActiveTab("issue")}
        >
          Issue Book
        </Button>
        <Button
          className={`rounded-[6px] transition-colors shadow-none ${paddingClasses} ${
            activeTab === "request" ? activeClasses : inactiveClasses
          }`}
          onClick={() => setActiveTab("request")}
        >
          Request
        </Button>
      </div>

      <div className="border border-[#E0E2E7] rounded-[10px] m-4">
        {activeTab === "issue" && <BookBorrowedDetails />}
        {activeTab === "request" && <BookActiveDetails />}
      </div> */}
      <IssueBook setRefreshAction={setRefresh}/>
      <Activities refresh={refresh}/>
      <div className="py-10" />
    </>
  );
}
