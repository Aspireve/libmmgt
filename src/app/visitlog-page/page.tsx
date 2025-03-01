"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Header from "../Header/header";
import { visitLogColumns, fallbackVisitLogData, VisitLog } from "../visitlog-page/columns";
import { DataTable } from "@/components/data-tables/data-table";

// Fetch visit logs from API
const fetchVisitLogs = async (): Promise<VisitLog[]> => {
  const response = await axios.get("https://your-api-endpoint/visitlogs", {
    params: {
      page: 1,
      pageSize: 100,
    },
  }); // Replace with your API endpoint
  return response.data; // Assuming the API returns data in the VisitLog format
};

const Page = () => {
  // Fetch visit logs using useQuery
  const { data: visitLogs = fallbackVisitLogData, isLoading } = useQuery({
    queryKey: ["visitlogs"],
    queryFn: fetchVisitLogs,
    initialData: fallbackVisitLogData,
  });

  return (
    <>
      <Header />
      {isLoading ? (
        <div className="p-4 text-center">Loading data...</div>
      ) : (
        <div className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
          <DataTable columns={visitLogColumns} data={visitLogs} />
        </div>
      )}
    </>
  );
};

export default Page;