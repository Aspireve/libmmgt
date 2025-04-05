"use client";

import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useList } from "@refinedev/core";

interface FilterProps {
  setFilters: (filters: {
    filter?: { field: string; operator: string; value: string }[];
    search?: { field: string; value: string }[];
  }) => void;
}

const Filter: FC<FilterProps> = ({ setFilters }) => {
  const [open, setOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { data: deptData } = useList({ resource: "student/departments" });
  const { data: yearData } = useList({ resource: "years" });

  const departments = deptData?.data || [];
  const years = yearData?.data || [];

  useEffect(() => {
    const filters: { field: string; operator: string; value: string }[] = [];

    if (selectedDept) {
      filters.push({
        field: "department",
        operator: "eq",
        value: selectedDept,
      });
    }

console.log(filters)
    setFilters({ filter: filters });
  }, [selectedDept, selectedYear]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
        variant="outline"
        className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF] hover:text-[#1E40AF]"
        >Filter</Button>
      </PopoverTrigger>

      <PopoverContent className="p-4 space-y-4 w-64">
        <div>
          <label className="block text-sm font-medium text-[#1E40AF]">Department</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full mt-1 rounded p-2 border border-[#1E40AF] text-[#1E40AF]"
          >
            <option value="">Select Department</option>
            {departments.map((dept: any) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Filter;
