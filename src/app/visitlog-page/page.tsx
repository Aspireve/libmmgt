"use client";

import React, { useState } from "react";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import { visitLogColumns, fallbackVisitLogData, VisitLog } from "./columns";
import { useList } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import filter from "../../images/filter.png";
import searchIcon from "../../images/search.png";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const today = new Date().toISOString().split("T")[0];

  // Fetch visit logs with filters and search
  const { data, isLoading, refetch } = useList<VisitLog>({
    resource: "visitlogs",
    pagination: { current: 1, pageSize: 1000 },
    filters: [
      ...(dateFrom
        ? [{ field: "date", operator: "gte" as const, value: dateFrom }]
        : []),
      ...(dateTo
        ? [{ field: "date", operator: "lte" as const, value: dateTo }]
        : []),
      ...(timeFrom
        ? [{ field: "in_time", operator: "gte" as const, value: timeFrom }]
        : []),
      ...(timeTo
        ? [{ field: "out_time", operator: "lte" as const, value: timeTo }]
        : []),
      ...(searchTerm.trim()
        ? [
            {
              field: "visitor_name",
              operator: "contains" as const,
              value: searchTerm.trim(),
            },
            {
              field: "visitor_id",
              operator: "contains" as const,
              value: searchTerm.trim(),
            },
          ]
        : []),
    ],
    queryOptions: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      onError: (error) => console.error("Error fetching visit logs:", error),
    },
    meta: {
      select:
        "visitor_id,visitor_name,department,visitor_type,in_time,out_time", // Optional: Adjust based on API
    },
  });

  // Log data to debug the structure
  console.log("useList data:", data);

  // Handle the API response structure safely
  const visitLogs: VisitLog[] = Array.isArray(data?.data)
    ? data.data.map((item) => ({
        visitor_id: item.visitor_id ?? "",
        visitor_name: item.visitor_name ?? "",
        department: item.department ?? "",
        visitor_type: item.visitor_type ?? "",
        in_time: item.in_time ?? "",
        out_time: item.out_time ?? "",
      }))
    : fallbackVisitLogData;

  const handleFilterSubmit = () => {
    refetch();
  };

  return (
    <>
      <Header />
      <div className="mt-8 w-[90%] ml-10 border border-[#E0E2E7] rounded-[10px] p-4">
        <h2 className="text-lg font-semibold">Filter</h2>
        <div className="grid grid-cols-4 gap-4 mt-2">
          <div>
            <label className="text-sm font-medium">From Date</label>
            <Input
              type="date"
              value={dateFrom}
              max={today}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">To Date</label>
            <Input
              type="date"
              value={dateTo}
              max={today}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">From Time</label>
            <Input
              type="time"
              value={timeFrom}
              onChange={(e) => setTimeFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">To Time</label>
            <Input
              type="time"
              value={timeTo}
              onChange={(e) => setTimeTo(e.target.value)}
            />
          </div>
          <Button
            onClick={handleFilterSubmit}
            className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px] w-[100px] flex items-center justify-center"
          >
            <Image
              src={filter}
              height={19}
              width={19}
              alt="filter"
              className="mr-2"
            />
            Filter
          </Button>
        </div>
      </div>
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6 p-4 mb-10">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-semibold ml-4">
                Visit Log{" "}
              </h1>
              <p className="bg-[#F9F5FF] rounded-2xl text-[#6941C6] px-2">
                {visitLogs.length || 0} <span>Entries</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Image
                  src={searchIcon}
                  alt="Search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  placeholder="Search"
                  className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-blue-600 text-white px-4 py-2 rounded">
                Search
              </Button>
            </div>
          </div>
          <DataTable
            columns={visitLogColumns}
            data={visitLogs}
            isLoading={isLoading}
          />
        </div>
      </section>
    </>
  );
};

export default Page;
