"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useList, useDelete } from "@refinedev/core";
import Header from "../Header/header";
import { useStudentColumns, Student } from "./studentcolumns";
import Search from "../../images/search.png";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import importdrop from "../../images/importdrop.png";
import { toast } from "sonner";
import { images } from "../book-pages/images";
import { useUpdate } from "@refinedev/core";
import StudentFilterDropdown from "./StudentFilterdropdown";
import { Loader2 } from "lucide-react";
import { MainTable } from "@/components/data-tables/main-table";

const StudentDirectory = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // Read student UUID from query if needed for deletion actions etc.
  const studentUuidFromUrl = searchParams.get("id");

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const {data, isLoading: isDepartmentLoading} = useList({
    resource: "student/departments",
  })

  console.log({data, isDepartmentLoading})
  // Fallback values for filters
  const fallbackDepartments = ["Computer Science", "Mathematics", "Physics", "Chemistry"];
  const fallbackYears = ["2021", "2020", "2019", "2018"];

  // Fetch departments and years (endpoints disabled)
  const { data: departmentResponse } = useList<{ department: string }>({
    resource: "student/departments",
    pagination: { current: 1, pageSize: 100 },
    queryOptions: { enabled: false },
  });
  const availableDepartments =
    departmentResponse?.data.map((item) => item.department) || fallbackDepartments;

  const { data: yearResponse } = useList<{ year: string }>({
    resource: "student/years",
    pagination: { current: 1, pageSize: 100 },
    queryOptions: { enabled: false },
  });
  const availableYears = yearResponse?.data.map((item) => item.year) || fallbackYears;

  // Use refine’s useList hook to fetch students with filters applied.
  const {
    data: studentsResponse,
    isLoading,
    error,
    refetch,
  } = useList<Student>({  
    resource: "student/all",
    pagination: { current: 1, pageSize: 1000 },
    filters: [
      ...(departmentFilter
        ? [{ field: "department", operator: "eq" as "eq", value: departmentFilter }]
        : []),
      ...(yearFilter
        ? [{ field: "year_of_admission", operator: "eq" as "eq", value: yearFilter }]
        : []),
      ...(searchTerm
        ? [{ field: "student_name", operator: "contains" as "contains", value: searchTerm }]
        : []),
    ],
    queryOptions: {
      queryKey: ["students", departmentFilter, yearFilter, searchTerm],
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnMount: "always",
    },
  });
  const students = (studentsResponse?.data as Student[]) ?? [];
  console.log("Fetched students:", students);

  // Delete student mutation
  const { mutate: deleteStudent } = useDelete();
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) =>
      new Promise<void>((resolve, reject) => {
        deleteStudent(
          { resource: "student/delete", id: uuid },
          {
            onSuccess: () => resolve(),
            onError: (error: any) =>
              reject(error.response?.data?.message || error.message),
          }
        );
      }),
    onMutate: async (uuid: string) => {
      await queryClient.cancelQueries({ queryKey: ["students", departmentFilter, yearFilter, searchTerm] });
      const previousStudents = queryClient.getQueryData(["students", departmentFilter, yearFilter, searchTerm]);
      const optimisticStudents = students.filter(
        (student) => student.student_uuid !== uuid
      );
      queryClient.setQueryData(["students", departmentFilter, yearFilter, searchTerm], {
        data: optimisticStudents,
        total: optimisticStudents.length,
      });
      return { previousStudents };
    },
    onError: (err, uuid, context) => {
      queryClient.setQueryData(["students", departmentFilter, yearFilter, searchTerm], context?.previousStudents);
      toast.error(`Error deleting student: ${err}`, { position: "top-center" });
      setShowConfirmModal(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["students", departmentFilter, yearFilter, searchTerm] });
    },
    onSuccess: () => {
      toast.success("Student deleted successfully!", { position: "top-center" });
      setShowConfirmModal(false);
    },
  });

  // Delete function for bulk operations (single or multiple)
  const handleBulkDelete = async () => {
    if (selectedStudents.length === 0) return;
    try {
      let response;
      if (selectedStudents.length === 1) {
        response = await fetch("https://lms-807p.onrender.com/student/Delete", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ student_uuid: selectedStudents[0] }),
        });
      } else {
        response = await fetch("https://lms-807p.onrender.com/student/bulk-Delete", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedStudents),
        });
      }
      if (!response.ok) {
        throw new Error("Failed to Delete student(s)");
      }
      toast.success(
        selectedStudents.length === 1 ? "Student Deleted successfully!" : "Students Deleted successfully!",
        { position: "top-center" }
      );
      setSelectedStudents([]);
      queryClient.invalidateQueries({ queryKey: ["students", departmentFilter, yearFilter, searchTerm] });
    } catch (error: any) {
      toast.error(`Error archiving student(s): ${error.message}`, { position: "top-center" });
    }
  };

  const handleConfirmDelete = async () => {
    setIsArchiving(true);
    await handleBulkDelete();
    setIsArchiving(false);
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  // Toggle individual row selection
  const toggleStudentSelection = (uuid: string) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(uuid)
        ? prevSelected.filter((id) => id !== uuid)
        : [...prevSelected, uuid]
    );
  };

  // For pure server-side filtering, we use the fetched students as is.
  const filteredStudents = students;

  const isAllSelected =
    filteredStudents.length > 0 &&
    filteredStudents.every((student) => selectedStudents.includes(student.student_uuid));
  const isIndeterminate =
    selectedStudents.length > 0 &&
    !isAllSelected &&
    filteredStudents.some((student) => selectedStudents.includes(student.student_uuid));
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedStudents((prev) =>
        prev.filter(
          (uuid) => !filteredStudents.some((student) => student.student_uuid === uuid)
        )
      );
    } else {
      const allUuids = filteredStudents.map((student) => student.student_uuid);
      setSelectedStudents((prev) => Array.from(new Set([...prev, ...allUuids])));
    }
  };

  // Get columns including selection checkboxes.
  const studentColumns = useStudentColumns({
    selectedStudents,
    onToggleStudentAction: toggleStudentSelection,
    onSelectAllAction: handleSelectAll,
    isAllSelected,
    isIndeterminate,
  });

  const handleFilterApply = () => {
    setShowFilterDropdown(false);
    refetch();
  };

  if (error) {
    return <div className="p-4 text-center">Error: {error.message}</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <>
      <Header heading="Student Directory" subheading="Tanvir Chavan" />
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <p className="text-md font-semibold ml-4">Students</p>
              <span className="rounded-full bg-[#F9F5FF] px-3 py-1 text-sm font-medium text-[#6941C6]">
                {filteredStudents.length} Entries
              </span>
            </div>
            <div className="flex items-center gap-4">
              {selectedStudents.length > 0 && (
                <Button
                  className="bg-red-600 text-white hover:bg-red-900 rounded-[10px]"
                  onClick={() => setShowConfirmModal(true)}
                >
                  {selectedStudents.length === 1 ? "Delete" : "Delete All"}
                </Button>
              )}
              <Link href="/student-page/import-students">
                <Button className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]">
                  <img src={importdrop.src} alt="Import" /> Import
                </Button>
              </Link>
              {/* Filter Button with dropdown */}
              <div className="relative">
                <Button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px]"
                >
                  <Image src={images.filter} alt="Filter button" />
                  Filter
                </Button>
                {showFilterDropdown && (
                  <StudentFilterDropdown
                    departmentFilter={departmentFilter}
                    setDepartmentFilter={setDepartmentFilter}
                    yearFilter={yearFilter}
                    setYearFilter={setYearFilter}
                    availableDepartments={availableDepartments}
                    availableYears={availableYears}
                    handleFilterApply={handleFilterApply}
                  />
                )}
              </div>
              <Link href="/student-page/AddStudent">
                <Button className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]">
                  Add Student
                </Button>
              </Link>
              <div className="relative w-72">
                <Image
                  src={Search}
                  alt="search-icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  placeholder="Search"
                  className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* <Button className="bg-[#1E40AF] hover:bg-[#142457] transition-all duration-300 text-white rounded-[8px] w-[15%]">
                Search
              </Button> */}
            </div>
          </div>
          <MainTable
            columns={studentColumns}
            resource="student/all"
            search={searchTerm}
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
    </Suspense>
  );
};

export default StudentDirectory;
