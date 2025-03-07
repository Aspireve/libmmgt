"use client";

import React, { useState } from "react";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import { PenaltiesColumns, fallbackData, Penalties } from "./columns";
import { useList } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import filter from "../../images/filter.png";
import Image from "next/image";
import searchIcon from "../../images/search.png";
import dropdown from "../../images/dropdown.png";

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
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>(""); // State for selected department

  const today = new Date().toISOString().split("T")[0];

  // Fetch departments from backend using useList
  const { data: departmentData, isLoading: isDepartmentLoading } = useList<Department>({
    resource: "departments",
    pagination: { current: 1, pageSize: 1000 },
    queryOptions: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      onError: (error) => console.error("Error fetching departments:", error),
    },
  });

  // Use API data if available, otherwise fallback to temporary data
  const departments: Department[] = Array.isArray(departmentData?.data)
    ? departmentData.data.map((item) => ({
        id: item.id ?? "",
        name: item.name ?? "",
      }))
    : fallbackDepartments;

  // Fetch fees and penalties with department filter
  const { data, isLoading, refetch } = useList<Penalties>({
    resource: "feespenalties",
    filters: [
      ...(searchTerm
        ? [
            {
              field: "student_name",
              operator: "contains" as const,
              value: searchTerm,
            },
            {
              field: "student_id",
              operator: "contains" as const,
              value: searchTerm,
            },
          ]
        : []),
      ...(dateFrom
        ? [{ field: "Issued_date", operator: "gte" as const, value: dateFrom }]
        : []),
      ...(dateTo
        ? [{ field: "Issued_date", operator: "lte" as const, value: dateTo }]
        : []),
      ...(timeFrom
        ? [{ field: "time", operator: "gte" as const, value: timeFrom }]
        : []),
      ...(timeTo
        ? [{ field: "time", operator: "lte" as const, value: timeTo }]
        : []),
      ...(selectedDepartment
        ? [{ field: "department", operator: "eq" as const, value: selectedDepartment }]
        : []),
    ],
    pagination: { current: 1, pageSize: 1000 },
    queryOptions: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      onError: (error) =>
        console.error("Error fetching fees penalties:", error),
    },
    meta: {
      select:
        "student_id,student_name,department,book_id,book_category,Issued_date,return_date,penalties,student_uuid",
    },
  });

  // Log data to debug the structure
  console.log("useList data (feespenalties):", data);
  console.log("useList data (departments):", departmentData);

  // Handle the API response structure safely
  const feesPenalties: Penalties[] = Array.isArray(data?.data)
    ? data.data.map((item) => ({
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

  const handleFilterSubmit = () => {
    refetch();
  };

  const handleSearch = () => refetch();

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
        </div>
        <div className="flex gap-12 mt-4">
          <div className="relative w-[120px]">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="appearance-none w-[140px] shadow-none border border-[#989CA4] rounded-[8px] text-[grey] px-3 py-2 pr-8"
            >
              <option value="">Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <Button
            onClick={handleFilterSubmit}
            className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px] w-[100px] flex items-center justify-center"
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
              <h1 className="text-3xl font-semibold ml-4">Fees&Penalties </h1>
              <p className="bg-[#F9F5FF] rounded-2xl text-[#6941C6] px-2">
                {feesPenalties.length || 0} <span>Entries</span>
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
              <Button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Search
              </Button>
            </div>
          </div>
          <DataTable
            columns={PenaltiesColumns}
            data={feesPenalties}
            isLoading={isLoading}
          />
        </div>
      </section>
    </>
  );
};

export default FeesPenaltiesPage;