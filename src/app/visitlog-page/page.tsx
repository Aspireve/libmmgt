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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");

  const handleRefetch = () => {
    refetch();
  };

  const { data, isLoading, refetch } = useList<VisitLog>({
    resource: "alllogs",
    pagination: { current: 1, pageSize: 5 },
    // filters: [
    //   ...(dateRange?.from && dateRange?.to
    //     ? [{
    //         field: "date",
    //         operator: "between" as const,
    //         value: [format(dateRange.from, "yyyy-MM-dd"), format(dateRange.to, "yyyy-MM-dd")],
    //       }]
    //     : []),
    //   ...(timeFrom ? [{ field: "in_time", operator: "gte" as const, value: timeFrom }] : []),
    //   ...(timeTo ? [{ field: "out_time", operator: "lte" as const, value: timeTo }] : []),
    //   ...(searchTerm.trim()
    //     ? [{
    //         field: "visitor_name",
    //         operator: "contains" as const,
    //         value: searchTerm.trim(),
    //       }]
    //     : []),
    // ],
    // queryOptions: {
    //   staleTime: 5 * 60 * 1000,
    //   cacheTime: 10 * 60 * 1000,
    // },
  });

  const visitLogs: VisitLog[] = Array.isArray(data?.data) ? data.data : fallbackVisitLogData;

  return (
    <>
      <Header heading="Visit Activites" subheading="Tanvir Chavan"/>
      <div className="mt-8 w-[90%] ml-10 border border-[#E0E2E7] rounded-[10px] p-4">
        <h2 className="text-lg font-semibold">Filter</h2>
        <div className="grid grid-cols-4 gap-4 mt-2">
          <div className="relative">
            <label className="text-sm font-medium">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md">
                  {dateRange?.from && dateRange?.to
                    ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                    : "Select date range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 z-50 bg-white shadow-lg border rounded-md">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange as (range: DateRange | undefined) => void}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="text-sm font-medium">From Time</label>
            <Input type="time" value={timeFrom} onChange={(e) => setTimeFrom(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">To Time</label>
            <Input type="time" value={timeTo} onChange={(e) => setTimeTo(e.target.value)} />
          </div>
          <Button
            onClick={handleRefetch}
            className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px] w-[100px] flex items-center justify-center mt-6"
          >
            <Image src={filter} height={19} width={19} alt="filter" className="mr-2" />
            Filter
          </Button>
        </div>
      </div>
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6 p-4 mb-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold ml-4">Visit Log</h1>
          <p className="bg-[#F9F5FF] rounded-2xl text-[#6941C6] px-2">
            {visitLogs.length || 0} Entries
          </p>
          <div className="relative w-64">
            <Image src={searchIcon} alt="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search"
              className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-blue-600 text-white px-4 py-2 rounded">Search</Button>
        </div>
        {/* <DataTable columns={visitLogColumns} resource="alllog" isLoading={isLoading} /> */}
      </section>
    </>
  );
};

export default Page;
