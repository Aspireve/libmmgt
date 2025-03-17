"use client";

import React, { Suspense, useState } from "react";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import { PenaltiesColumns, fallbackData, Penalties } from "./columns";
import { useList } from "@refinedev/core"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import filter from "../../images/filter.png";
import Image from "next/image";
import searchIcon from "../../images/search.png";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define Department interface
interface Department {
  id: string;
  name: string;
}

// Fallback department data
const fallbackDepartments: Department[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Computer Science" },
  { id: "3", name: "Mechanical" },
  { id: "4", name: "Civil" },
];

const FeesPenaltiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  // Fetch departments
  const { data: departmentData } = useList<Department>({
    resource: "departments",
  });

  // Get department data from API or fallback
  const departments: Department[] = Array.isArray(departmentData?.data)
    ? departmentData.data
    : fallbackDepartments;

  // Fetch fees and penalties
  const {
    data: penaltiesData,
    isLoading,
    refetch,
  } = useList<Penalties>({
    resource: "feespenalties",
    filters: [
      ...(searchTerm
        ? [
            {
              field: "student_name",
              operator: "contains" as const,
              value: searchTerm,
            },
          ]
        : []),
      ...(dateRange?.from
        ? [
            {
              field: "Issued_date",
              operator: "gte" as const,
              value: format(dateRange.from, "yyyy-MM-dd"),
            },
          ]
        : []),
      ...(dateRange?.to
        ? [
            {
              field: "Issued_date",
              operator: "lte" as const,
              value: format(dateRange.to, "yyyy-MM-dd"),
            },
          ]
        : []),
      ...(timeFrom
        ? [
            {
              field: "time", // Assuming a 'time' field exists; adjust if the field name differs
              operator: "gte" as const,
              value: timeFrom,
            },
          ]
        : []),
      ...(timeTo
        ? [
            {
              field: "time", // Assuming a 'time' field exists; adjust if the field name differs
              operator: "lte" as const,
              value: timeTo,
            },
          ]
        : []),
      ...(selectedDepartment
        ? [
            {
              field: "department",
              operator: "eq" as const,
              value: selectedDepartment,
            },
          ]
        : []),
    ],
    pagination: { current: 1, pageSize: 1000 },
  });

  // Convert API data into Penalties format
  const feesPenalties: Penalties[] = Array.isArray(penaltiesData?.data)
    ? penaltiesData.data.map((item) => ({
        student_id: item.student_id ?? "",
        student_name: item.student_name ?? "",
        department: item.department ?? "",
        book_id: item.book_id ?? "",
        book_category: item.book_category ?? "",
        Issued_date: item.Issued_date ? new Date(item.Issued_date) : new Date(),
        return_date: item.return_date ? new Date(item.return_date) : new Date(),
        penalties: item.penalties ?? "",
        student_uuid: item.student_uuid ?? "",
      }))
    : fallbackData;

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <>
      <Header heading="Fees & Penalties" subheading="Tanvir Chavan"/>
      <div className="mt-8 w-[90%] ml-10 border border-[#E0E2E7] rounded-[10px] p-4">
        <h2 className="text-lg font-semibold">Filter</h2>
        <div className="grid grid-cols-4 gap-4 mt-2">
          <div className="col-span-2"> {/* Span two columns for date range picker */}
            <label className="text-sm font-medium">Date Range</label>
            <Popover>
              <PopoverTrigger asChild> 
                <Button
                  variant="outline"
                  className="w-[300px] justify-start text-left font-normal ml-4"
                >
                  <CalendarIcon />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      `${format(dateRange.from, "LLL dd, y")} - ${format(
                        dateRange.to,
                        "LLL dd, y"
                      )}`
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Select Date Range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 z-50 bg-white shadow-lg border rounded-md"
                align="start"
              >
                <Calendar
                  initialFocus
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
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
        </div>
        <div className="flex items-center gap-12 mt-4">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="appearance-none w-[140px] border border-[#989CA4] rounded-[8px] text-[grey] px-3 py-2"
          >
            <option value="">Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          <Button
            onClick={() => refetch()}
            className="border border-[#1E40AF] text-[#1E40AF] rounded-[10px] w-[100px] flex items-center justify-center"
          >
            <Image src={filter} height={19} width={19} alt="filter" />
            Filter
          </Button>
        </div>
      </div>
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6 p-4 mb-10">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-semibold ml-4">Fees & Penalties</h1>
              <p className="bg-[#F9F5FF] rounded-2xl text-[#6941C6] px-2">
                {feesPenalties.length} Entries
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Image
                  src={searchIcon}
                  alt="Search"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
                <Input
                  placeholder="Search"
                  className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={() => refetch()}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Search
              </Button>
            </div>
          </div>
          <DataTable
            columns={PenaltiesColumns}
            resource="departments"
            isLoading={isLoading}
          />
        </div>
      </section>
    </>
    </Suspense>
  );
};

export default FeesPenaltiesPage;