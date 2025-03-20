"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { images } from "@/app/book-pages/images";
import StudentFilterDropdown from "@/app/student-page/StudentFilterdropdown";
import importdrop from "@/images/importdrop.png";
import { useRouter } from "next/navigation"; // ✅ Correct Next.js router import

interface DataTableControlsProps {
  heading: string;
  entryCount: number;
  selectedCount?: number;
  onDeleteAction?: () => void;
  searchTerm: string;
  setSearchTermAction: (val: string) => void;
  departmentFilter: string;
  setDepartmentFilterAction: (val: string) => void;
  yearFilter: string;
  setYearFilterAction: (val: string) => void;
  onFilterApplyAction: () => void;
  onImportAction: () => void;
  onAddAction: () => void;
}

export const DataTableControls: React.FC<DataTableControlsProps> = ({
  heading,
  entryCount,
  selectedCount = 0,
  onDeleteAction,
  searchTerm,
  setSearchTermAction,
  departmentFilter,
  setDepartmentFilterAction,
  yearFilter,
  setYearFilterAction,
  onFilterApplyAction,
}) => {
  const router = useRouter(); 
  const [showFilterDropdown, setShowFilterDropdown] = React.useState(false);

  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      {/* Heading & Entry Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-md font-semibold ml-4">{heading}</p>
          <span className="rounded-full bg-[#F9F5FF] px-3 py-1 text-sm font-medium text-[#6941C6]">
            {entryCount} Entries
          </span>
        </div>

        {/* Buttons Section */}
        <div className="flex items-center gap-4">
          {selectedCount > 0 && onDeleteAction && (
            <Button
              className="bg-red-600 text-white hover:bg-red-900 rounded-[10px]"
              onClick={onDeleteAction}
            >
              {selectedCount === 1 ? "Delete" : "Delete All"}
            </Button>
          )}

          <Button
            className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]"
            variant="outline"
            onClick={() => router.push("/student-page/import-students")}
          >
            <Image src={importdrop.src} alt="Import" width={20} height={25} /> Import
          </Button>

          <Button
            className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]"
            variant="outline"
            onClick={() => router.push("/student-page/AddStudent")}
          >
            Add Student
          </Button>

          {/* Filter Button & Dropdown */}
          <div className="relative">
            <Button
              onClick={() => setShowFilterDropdown((prev) => !prev)}
              className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px]"
            >
              <Image src={images.filter} alt="Filter" width={16} height={16} />
              Filter
            </Button>
            {showFilterDropdown && (
              <StudentFilterDropdown
                departmentFilter={departmentFilter}
                setDepartmentFilter={setDepartmentFilterAction}
                yearFilter={yearFilter}
                setYearFilter={setYearFilterAction}
                handleFilterApply={() => {
                  onFilterApplyAction();
                  setShowFilterDropdown(false);
                }}
                availableDepartments={["Computer Science", "Mathematics", "Physics"]}
                availableYears={["2021", "2022", "2023", "2024"]}
              />
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-72">
            <Image
              src={images.search}
              alt="search-icon"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <Input
              placeholder="Search"
              className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-black"
              value={searchTerm}
              onChange={(e) => setSearchTermAction(e.target.value)}
            />
          </div>
          <Button
            className="bg-[#1E40AF] hover:bg-[#142457] transition-all duration-300 text-white rounded-[8px] w-[15%]"
            onClick={onFilterApplyAction}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};
