"use client";
import React from "react";
import Tabbing from "../Tab/Tab";
import Header from "../Header/header";

export default function AllBooksPage() {
  return (
    <>
    <Header/>
    <Tabbing
        tabs={[
          { key: "all-books", label: "All Books" },
          { key: "available-books", label: "Available Books" },
          { key: "issued-books", label: "Issued Books" },
        ]}
        inactiveTabClassName="bg-white text-gray-500 border-0"
        onTabChange={(activeTab) => {
          console.log("All Books tab changed to:", activeTab);
        }}
      />
    </>
  );
}
