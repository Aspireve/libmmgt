"use client";

import React, { Suspense, useState } from "react";
import Header from "@/components/custom/header";
import { PenaltiesColumns } from "./columns";
import { useList } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import filter from "../../images/filter.png";
import Image from "next/image";
import { DateRange } from "react-day-picker";
import { format, isAfter } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MasterTable from "../test/table-page";



interface Department {
  id: string;
  name: string;
}

const fallbackDepartments: Department[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Computer Science" },
  { id: "3", name: "Mechanical" },
  { id: "4", name: "Civil" },
];

const FeesPenaltiesPage = () => {
  const today = new Date();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const { data: departmentData } = useList<Department>({
    resource: "departments",
  });

  const departments: Department[] = Array.isArray(departmentData?.data)
    ? departmentData.data
    : fallbackDepartments;

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range?.to && isAfter(range.to, today)) {
      range.to = today;
    }
    setDateRange(range);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading="Fees & Penalties" subheading="Tanvir Chavan" />
        <div className="mt-8 w-[93%] ml-10 border border-[#E0E2E7] rounded-[10px] p-4">
          <h2 className="text-lg font-semibold">Filter</h2>
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="col-span-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[300px] justify-start text-left font-normal ml-4"
                  >
                    <CalendarIcon className="mr-2" />
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
                    onSelect={handleDateSelect}
                    numberOfMonths={2}
                    disabled={(day) => isAfter(day, today)}
                    
                  />
                </PopoverContent>
              </Popover>
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
            <Button className="border border-[#1E40AF] text-[#1E40AF] rounded-[10px] w-[100px] flex items-center justify-center">
              <Image src={filter} height={19} width={19} alt="filter" />
              Filter
            </Button>
          </div>
        </div>
        <section className="mx-[40px]">
          <div>
            <MasterTable
              title="Fees&Penalties"
              columns={() => PenaltiesColumns}
              resource="book_v2/get_full_feelist_student"
              AddedOptions={[]}
            />
          </div>
        </section>
      </>
    </Suspense>
  );
};

export default FeesPenaltiesPage;
