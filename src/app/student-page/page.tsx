"use client";

import React, { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useList, useDelete } from "@refinedev/core";
import { useDeleteMany } from "@refinedev/core";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import {
  studentColumns as originalStudentColumns,
  Student,
} from "./studentcolumns";
import Search from "../../images/search.png";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import importdrop from "../../images/importdrop.png";
import EditBtn from "../../images/EditBtn.png";
import DeleteBtn from "../../images/DeleteBtn.png";
import addBook from "../../images/addbook.png";
import { toast } from "sonner";
import { images } from "../book-pages/images";
import { useUpdate } from "@refinedev/core";
import { useSearchParams } from "next/navigation";

const StudentDirectory = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  // States for filter values
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  // State to toggle filter dropdown visibility
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  // State for delete confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const [validStudentUuid, setValidStudentUuid] = useState<string | null>(null);

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  // Fallback hardcoded data in case the API endpoints are not available
  const fallbackDepartments = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
  ];
  const fallbackYears = ["2021", "2020", "2019", "2018"];

  // Disable fetching departments and years by setting enabled: false
  const { data: departmentResponse } = useList<{ department: string }>({
    resource: "student/departments",
    pagination: { current: 1, pageSize: 100 },
    queryOptions: { enabled: false }, // disabled because endpoint is not available
  });
  const availableDepartments =
    departmentResponse?.data.map((item) => item.department) ||
    fallbackDepartments;

  const { data: yearResponse } = useList<{ year: string }>({
    resource: "student/years",
    pagination: { current: 1, pageSize: 100 },
    queryOptions: { enabled: false }, // disabled because endpoint is not available
  });
  const availableYears =
    yearResponse?.data.map((item) => item.year) || fallbackYears;

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
        ? [
            {
              field: "department",
              operator: "eq" as const,
              value: departmentFilter,
            },
          ]
        : []),
      ...(yearFilter
        ? [
            {
              field: "year_of_admission",
              operator: "eq" as const,
              value: yearFilter,
            },
          ]
        : []),
    ],
    queryOptions: {
      queryKey: ["students", departmentFilter, yearFilter],
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnMount: "always",
    },
  });

  const students = studentsResponse?.data ?? [];
  console.log(students[0]);
  console.log("Fetched students:", studentsResponse?.data);

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
      await queryClient.cancelQueries({
        queryKey: ["students", departmentFilter, yearFilter],
      });
      const previousStudents = queryClient.getQueryData([
        "students",
        departmentFilter,
        yearFilter,
      ]);
      const optimisticStudents = students.filter(
        (student) => student.student_uuid !== uuid
      );
      queryClient.setQueryData(["students", departmentFilter, yearFilter], {
        data: optimisticStudents,
        total: optimisticStudents.length,
      });
      return { previousStudents };
    },
    onError: (err, uuid, context) => {
      queryClient.setQueryData(
        ["students", departmentFilter, yearFilter],
        context?.previousStudents
      );
      toast.error(`Error deleting student: ${err}`, {
        position: "top-center",
      });
      setShowConfirmModal(false);
      setStudentToDelete(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["students", departmentFilter, yearFilter],
      });
    },
    onSuccess: () => {
      toast.success("Student deleted successfully!", {
        position: "top-center",
      });
      setShowConfirmModal(false);
      setStudentToDelete(null);
    },
  });

  const studentUuid = searchParams.get("id");
  console.log("🔍 Retrieved studentUuid from URL:", studentUuid);

  useEffect(() => {
    if (
      studentUuid &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        studentUuid
      )
    ) {
      setValidStudentUuid(studentUuid);
      console.log("✅ Valid student UUID:", studentUuid);
    } else {
      console.error("❌ Invalid or missing student UUID:", studentUuid);
    }
  }, [studentUuid]);

  console.log("🌍 Full searchParams object:", searchParams.toString());
  console.log("🔍 Retrieved studentUuid from URL:", studentUuid);

  // Function to archive a student
  const archiveStudent = () => {
    if (!validStudentUuid) {
      console.error("❌ Invalid student UUID. Cannot archive.");
      return;
    }

    console.log(
      "📤 Sending archive request for student UUID:",
      validStudentUuid
    );
    const { mutate } = useUpdate();
    mutate(
      {
        resource: "student/archive",
        id: "", // No ID needed
        values: { student_uuid: validStudentUuid }, // Send UUID in the body
      },
      {
        onSuccess: (data) => {
          console.log("✅ Student archived successfully:", data);
          setShowConfirmModal(false); // Close modal after success
        },
        onError: (error) =>
          console.error("❌ Failed to archive student:", error.message),
      }
    );
  };

  // Function to open the confirmation modal
  const handleArchiveConfirm = () => {
    setShowConfirmModal(true);
  };

  // Function to close the confirmation modal
  const handleCancelArchive = () => {
    setShowConfirmModal(false);
  };

  const { mutate: bulkDeleteMutation } = useDeleteMany();

  // Toggle row selection
  const toggleStudentSelection = (uuid: string) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(uuid)
        ? prevSelected.filter((id) => id !== uuid)
        : [...prevSelected, uuid]
    );
  };

  // Bulk delete handler
  const handleBulkDelete = async () => {
    console.log(selectedStudents);

    if (selectedStudents.length === 0) return;

    try {
      const response = await fetch(
        "https://lms-807p.onrender.com/student/bulk-delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedStudents), // Sending `ids` in body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete students");
      }

      toast.success("Students deleted successfully!", {
        position: "top-center",
      });

      setSelectedStudents([]);
      queryClient.invalidateQueries({
        queryKey: ["students", departmentFilter, yearFilter],
      });
    } catch (error: any) {
      toast.error(`Error deleting students: ${error.message}`, {
        position: "top-center",
      });
    }
  };

  // Client-side search filter on already retrieved data (optional)
  const filteredStudents = searchTerm.trim()
    ? students.filter((student) =>
        [
          "student_uuid",
          "student_id",
          "student_name",
          "department",
          "email",
          "phone_no",
          "roll_no",
        ].some((key) =>
          (
            student[key as keyof Student]?.toString().toLowerCase() || ""
          ).includes(searchTerm.toLowerCase())
        )
      )
    : students;

  const confirmDelete = (uuid: string) => {
    setStudentToDelete(uuid);
    setShowConfirmModal(true);
  };

  // const handleConfirmDelete = () => {
  //   if (!studentToDelete) return;
  //   deleteMutation.mutate(studentToDelete);
  // };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setStudentToDelete(null);
  };

  // Update the columns to include action buttons.
  const studentColumns = [
    // Add a checkbox column for selecting students for bulk delete
    {
      id: "select",
      header: "",
      cell: ({ row }: any) => (
        <input
          type="checkbox"
          checked={selectedStudents.includes(row.original.student_uuid)}
          onChange={() => toggleStudentSelection(row.original.student_uuid)}
        />
      ),
    },
    // Map the original columns and update the actions column
    ...originalStudentColumns.map((col) => {
      if (col.id === "actions") {
        return {
          ...col,
          header: "",
          cell: ({ row }: any) => {
            const student: Student = row.original;
            return (
              <div className="flex gap-2 ml-10">
                <button
                  onClick={() =>
                    router.push(
                      `/student-page/EditStudent?student_uuid=${student.student_uuid}`
                    )
                  }
                  aria-label="Edit student"
                >
                  <img src={EditBtn.src} alt="Edit" />
                </button>
                <button
                  onClick={() => confirmDelete(student.student_uuid)}
                  aria-label="Delete student"
                >
                  <img src={DeleteBtn.src} alt="Delete" />
                </button>
              </div>
            );
          },
        };
      }
      return col;
    }),
  ];

  // When Apply Filters is clicked, hide the dropdown.
  const handleFilterApply = () => {
    setShowFilterDropdown(false);
    refetch();
  };

  if (error) {
    return <div className="p-4 text-center">Error: {error.message}</div>;
  }

  return (
    <>
      <Header heading="Student Directory" subheading="Tanvir Chavan" />
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold ml-4">Students</p>
              <span className="rounded-full bg-[#F9F5FF] px-3 py-1 text-sm font-medium text-[#6941C6]">
                {filteredStudents.length} Entries
              </span>
            </div>
            <div className="flex items-center gap-4">
              {selectedStudents.length > 0 && (
                <Button
                  className="bg-red-600 text-white hover:bg-red-900"
                  onClick={handleBulkDelete}
                >
                  Delete All
                </Button>
              )}
              <Link href="/student-page/import-students">
                <Button className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]">
                  <img src={importdrop.src} alt="Import" /> Import
                </Button>
              </Link>
              {/* Filter Button with dropdown for both filters */}
              <div className="relative">
                <Button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px]"
                >
                  <Image src={images.filter} alt="Filter button" />
                  Filter
                </Button>
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4 z-10">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Department
                      </label>
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
                      <label className="block text-sm font-medium mb-1">
                        Year of Admission
                      </label>
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
                  className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-[#1E40AF] text-white rounded-[8px] w-[15%]">
                Search
              </Button>
            </div>
          </div>
          <DataTable
            columns={studentColumns}
            data={filteredStudents}
            isLoading={isLoading}
          />
        </div>
      </section>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Archive</h3>
            <p className="mb-6">
              Are you sure you want to archive this student?
            </p>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCancelArchive} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={archiveStudent} // Corrected function call
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDirectory;
