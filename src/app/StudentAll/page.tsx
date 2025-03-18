"use client";

import React, { useState } from "react";
import { useList } from "@refinedev/core";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import { DataTableControls } from "@/components/DataControls/DataTableControls";
import { useStudentColumns, Student } from "../student-page/studentcolumns";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StudentDirectory() {
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  // States for selection and deletion (if needed)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  // Fetch student data with server-side filtering
  const { data, isLoading, error, refetch } = useList<Student>({
    resource: "student/all",
    pagination: { current: 1, pageSize: 100 },
    filters: [
      { field: "student_name", operator: "contains", value: searchTerm },
      { field: "department", operator: "eq", value: departmentFilter },
      { field: "year_of_admission", operator: "eq", value: yearFilter },
    ],
    queryOptions: {
      queryKey: ["students", departmentFilter, yearFilter, searchTerm],
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  });
  const students = data?.data ?? [];

  // Define student columns with selection logic
  const studentColumns = useStudentColumns({
    selectedStudents,
    onToggleStudentAction: (uuid: string) => {
      setSelectedStudents((prev) =>
        prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
      );
    },
    onSelectAllAction: () => {
      if (students.every((s) => selectedStudents.includes(s.student_uuid))) {
        setSelectedStudents([]);
      } else {
        setSelectedStudents(students.map((s) => s.student_uuid));
      }
    },
    isAllSelected:
      students.length > 0 &&
      students.every((s) => selectedStudents.includes(s.student_uuid)),
    isIndeterminate:
      selectedStudents.length > 0 && selectedStudents.length < students.length,
  });

  // Toolbar handlers
  const handleFilterApply = () => {
    refetch();
  };
  const handleImport = () => {
    console.log("Import clicked");
  };
  const handleAdd = () => {
    console.log("Add Student clicked");
  };

  // Optional deletion modal handlers (if implementing deletion)
  const handleConfirmDelete = async () => {
    setIsArchiving(true);
    // Deletion logic here…
    setIsArchiving(false);
    setShowConfirmModal(false);
  };
  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  if (error) {
    return <div className="p-4 text-center">Error: {error.message}</div>;
  }

  return (
    <>
      <Header heading="Student Directory" subheading="Tanvir Chavan" />
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
        <div className="p-4">
          {/* DataTableControls now contains all toolbar elements including heading and entry count */}
          <DataTableControls
            heading="Students"
            entryCount={students.length}
            selectedCount={selectedStudents.length}
            onDeleteAction={() => setShowConfirmModal(true)}
            searchTerm={searchTerm}
            setSearchTermAction={setSearchTerm}
            departmentFilter={departmentFilter}
            setDepartmentFilterAction={setDepartmentFilter}
            yearFilter={yearFilter}
            setYearFilterAction={setYearFilter}
            onFilterApplyAction={handleFilterApply}
            onImportAction={handleImport}
            onAddAction={handleAdd}
          />

          {/* DataTable simply displays data */}
          <DataTable
            columns={studentColumns}
            data={students}
            isLoading={isLoading}
            totalItems={data?.pagination?.total}  
          />
        </div>
      </section>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              {selectedStudents.length === 1
                ? "Are you sure you want to Delete this student?"
                : "Are you sure you want to Delete these students?"}
            </p>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCancelDelete} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} className="bg-red-600 text-white hover:bg-red-700">
                {isArchiving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
