"use client";

import React, { useState } from "react";
import Header from "@/components/custom/header";
import { visitLogColumns, VisitLog } from "./columns";
import { useList } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import filter from "../../images/filter.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isAfter } from "date-fns"; // Import isAfter for date comparison
import { DateRange } from "react-day-picker";
import MasterTable from "../test/table-page";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const today = new Date(); // Current date for validation

  const handleRefetch = () => {
    refetch();
  };

  const { data, refetch } = useList<VisitLog>({
    filters: [
      ...(dateRange?.from && dateRange?.to
        ? [
            {
              field: "date",
              operator: "between" as const,
              value: [
                format(dateRange.from, "yyyy-MM-dd"),
                format(dateRange.to, "yyyy-MM-dd"),
              ],
            },
          ]
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
          ]
        : []),
    ],
    queryOptions: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  });

  const visitLogs: VisitLog[] = Array.isArray(data?.data) ? data.data : [];

  // Handler to cap the date range at today
  const handleDateSelect = (range: DateRange | undefined) => {
    if (range) {
      const cappedRange = {
        from: range.from,
        to: range.to && isAfter(range.to, today) ? today : range.to, // Cap "to" at today
      };
      setDateRange(cappedRange);
    } else {
      setDateRange(undefined);
    }
  };

  return (
    <>
      <Header heading="Visit Activites" subheading="Tanvir Chavan" />
      <div className="mt-8 w-[93%] ml-10 border border-[#E0E2E7] rounded-[10px] p-4">
        <h2 className="text-lg font-semibold">Filter</h2>
        <div className="grid grid-cols-4 gap-4 mt-2">
          <div className="relative">
            <label className="text-sm font-medium">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-left flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md"
                >
                  {dateRange?.from && dateRange?.to
                    ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(
                        dateRange.to,
                        "MMM dd, yyyy"
                      )}`
                    : "Select date range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 z-50 bg-white shadow-lg border rounded-md">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateSelect} // Use custom handler
                  numberOfMonths={2}
                  disabled={(date) => isAfter(date, today)} // Disable dates after today
                />
              </PopoverContent>
            </Popover>
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
            onClick={handleRefetch}
            className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px] w-[100px] flex items-center justify-center mt-6"
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
      <section className="mx-[40px]">
        <MasterTable
          title="Visit Logs"
          columns={() => visitLogColumns}
          resource="student/all_visit_log"
          AddedOptions={[]}
        />
      </section>
    </>
  );
};

export default Page;