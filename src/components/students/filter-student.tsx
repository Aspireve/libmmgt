"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useList } from "@refinedev/core";

interface OptionType {
  label: string;
  value: string;
}

interface FilterProps {
  setFilters: (filters: { filter: any[] }) => void;
}

const Filter: FC<FilterProps> = ({ setFilters }) => {
  const [open, setOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { data: deptData } = useList({ resource: "student/departments" });
//   const { data: yearData } = useList({ resource: "years" });

  const departments = deptData?.data || [];
//   const years = yearData?.data || [];

  const handleChange = (dept: string) => {
    const newFilter: any[] = [];

    if (dept) {
      newFilter.push({
        field: "department",
        operator: "eq",
        value: dept,
      });
    }

    // if (year) {
    //   newFilter.push({
    //     field: "year",
    //     operator: "eq",
    //     value: year,
    //   });
    // }

    setFilters({ filter: newFilter });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Filter</Button>
      </PopoverTrigger>

      <PopoverContent className="p-4 space-y-4 w-64">
        <div>
          <label className="block text-sm font-medium">Department</label>
          <select
            value={selectedDept}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedDept(value);
              handleChange(value);
            }}
            className="w-full mt-1 border rounded p-2"
          >
            <option value="">Select Department</option>
            {departments.map((dept: any) => (
              <option key={dept} value={dept} className="text-blue-950">
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* <div>
          <label className="block text-sm font-medium">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedYear(value);
              handleChange(selectedDept, value);
            }}
            className="w-full mt-1 border rounded p-2"
          >
            <option value="">Select Year</option>
            {years.map((year: any) => (
              <option key={year.id} value={year.value}>
                {year.value}
              </option>
            ))}
          </select>
        </div> */}
      </PopoverContent>
    </Popover>
  );
};

export default Filter;
