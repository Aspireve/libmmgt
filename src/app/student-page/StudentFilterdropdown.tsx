"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface StudentFilterDropdownProps {
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  yearFilter: string;
  setYearFilter: (value: string) => void;
  availableDepartments: string[];
  availableYears: string[];
  handleFilterApply: () => void;
}

const StudentFilterDropdown: React.FC<StudentFilterDropdownProps> = ({
  departmentFilter,
  setDepartmentFilter,
  yearFilter,
  setYearFilter,
  availableDepartments,
  availableYears,
  handleFilterApply,
}) => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4 z-10">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Department</label>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">All</option>
          {availableDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Year of Admission</label>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">All</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={handleFilterApply}
        className="w-full bg-[#1E40AF] text-white hover:bg-blue-950"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default StudentFilterDropdown;
