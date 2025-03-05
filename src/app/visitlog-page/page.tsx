"use client";

import React from "react";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import {
  visitLogColumns,
  fallbackVisitLogData,
  VisitLog,
} from "./columns";
import { useList } from "@refinedev/core";

const Page = () => {
  const { data, isLoading } = useList<VisitLog>({
    resource: "visitlogs", // Adjust resource name to match your API endpoint
    pagination: { current: 1, pageSize: 1000 }, // Adjust as needed
    queryOptions: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      onError: (error) => {
        console.error("Error fetching visit logs:", error);
      },
    },
  });

  // Use fetched data if available and valid, otherwise use fallbackVisitLogData
  const visitLogs = data?.data && data.data.length > 0 ? data.data : fallbackVisitLogData;

  return (
    <>
      <Header />
      <div className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
        <DataTable
          columns={visitLogColumns}
          data={visitLogs}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Page;