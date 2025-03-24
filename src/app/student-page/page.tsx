"use client";

import React, { useState } from "react";
import { useList, useDelete } from "@refinedev/core";
import { useQueryClient } from "@tanstack/react-query";
import Header from "@/components/custom/header";
import { MainTable } from "@/components/data-tables/main-table";
import { DataTableControls } from "@/components/DataControls/DataTableControls";
import { useStudentColumns, Student } from "../student-page/studentcolumns";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import MasterTable from "../test/table-page";
import { StudentListTable } from "@/constants/students";
import AddStudents from "@/components/students/add-students";
import ImportStudentButton from "@/components/students/import-students-button";
import DeleteStudent from "@/components/students/delete-student";
import ExportStudent from "@/components/students/export-students-button";

export default function StudentDirectory() {
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  // States for selection and deletion
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch student data with server-side filtering
  // const { data, isLoading, error, refetch } = useList<Student>({
  //   resource: "student/all",
  //   pagination: { current: 1, pageSize: 100 },
  //   filters: [
  //     { field: "student_name", operator: "contains", value: searchTerm },
  //     { field: "department", operator: "eq", value: departmentFilter },
  //     { field: "year_of_admission", operator: "eq", value: yearFilter },
  //   ],
  //   queryOptions: {
  //     queryKey: ["students", departmentFilter, yearFilter, searchTerm],
  //     staleTime: 5 * 60 * 1000,
  //     cacheTime: 10 * 60 * 1000,
  //   },
  // });
  // const students = data?.data ?? [];

  // useDelete hook for single deletion
  const { mutate: deleteStudent } = useDelete();

  // Define student columns with selection and actions.
  // onDeleteAction opens the confirmation modal.
  // const studentColumns = useStudentColumns({
  //   selectedStudents,
  //   onToggleStudentAction: (uuid: string) => {
  //     setSelectedStudents((prev) =>
  //       prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
  //     );
  //   },
  //   onSelectAllAction: () => {
  //     if (students.every((s) => selectedStudents.includes(s.student_uuid))) {
  //       setSelectedStudents([]);
  //     } else {
  //       setSelectedStudents(students.map((s) => s.student_uuid));
  //     }
  //   },
  //   isAllSelected:
  //     students.length > 0 &&
  //     students.every((s) => selectedStudents.includes(s.student_uuid)),
  //   isIndeterminate:
  //     selectedStudents.length > 0 && selectedStudents.length < students.length,
  //   onDeleteAction: (uuid: string) => {
  //     // When delete icon is clicked, select that student and open the modal.
  //     setSelectedStudents([uuid]);
  //     setShowConfirmModal(true);
  //   },
  // });

  // Toolbar handlers for DataTableControls.
  // const handleFilterApplyAction = () => {
  //   refetch();
  // };
  // const handleImportAction = () => {
  //   console.log("Import clicked");
  // };
  // const handleAddAction = () => {
  //   console.log("Add Student clicked");
  // };

  // Delete handler – if one student is selected, use deleteStudent; otherwise, use bulk deletion.
  // const handleBulkDelete = async () => {
  //   if (selectedStudents.length === 0) return;
  //   try {
  //     if (selectedStudents.length === 1) {
  //       // Single deletion using useDelete's mutate function.
  //       deleteStudent(
  //         { resource: "student/delete", id: selectedStudents[0] },
  //         {
  //           onSuccess: () => {
  //             toast.success("Student deleted successfully!", {
  //               position: "top-center",
  //             });
  //             setShowConfirmModal(false);
  //             refetch();
  //           },
  //           onError: (error: any) => {
  //             toast.error(
  //               `Error deleting student: ${
  //                 error.response?.data?.message || error.message
  //               }`,
  //               { position: "top-center" }
  //             );
  //             setShowConfirmModal(false);
  //           },
  //         }
  //       );
  //       return;
  //     } else {
  //       // Bulk deletion using a DELETE fetch call.
  //       const response = await fetch(
  //         "https://lms-807p.onrender.com/student/bulk-delete",
  //         {
  //           method: "DELETE",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(selectedStudents),
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to delete student(s)");
  //       }
  //       toast.success("Students deleted successfully!", {
  //         position: "top-center",
  //       });
  //     }
  //     setSelectedStudents([]);
  //     refetch();
  //   } catch (error: any) {
  //     toast.error(`Error deleting student(s): ${error.message}`, {
  //       position: "top-center",
  //     });
  //   }
  // };

  // const handleConfirmDelete = async () => {
  //   setIsArchiving(true);
  //   await handleBulkDelete();
  //   setIsArchiving(false);
  //   setShowConfirmModal(false);
  // };

  // const handleCancelDelete = () => {
  //   setShowConfirmModal(false);
  // };



  return (
    <>
      <Header heading="Student Directory" subheading="Tanvir Chavan" />
      {/* <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6"> */}
      {/* <div className="p-4">
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
            onFilterApplyAction={handleFilterApplyAction}
            onImportAction={handleImportAction}
            onAddAction={handleAddAction}
          />

          <MainTable
            columns={studentColumns}
            resource="student/all"
            search={searchTerm}
          />
        </div> */}
      {/* </section> */}

      {/* Delete Confirmation Modal */}
      {/* {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              {selectedStudents.length === 1
                ? "Are you sure you want to delete this student?"
                : "Are you sure you want to delete these students?"}
            </p>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCancelDelete} variant="outline">
                Cancel
              </Button> 
              <Button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {isArchiving ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </div>
        </div>
      )} */}

      <MasterTable
        title="Students"
        resource="student/all"
        columns={StudentListTable}
        AddedOptions={[DeleteStudent, AddStudents, ImportStudentButton,ExportStudent]}
      />

      {/* <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 w-80 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
          <p className="mb-6">
            {selectedStudents.length === 1
              ? "Are you sure you want to delete this student?"
              : "Are you sure you want to delete these students?"}
          </p>
          <div className="flex justify-end gap-4">
            <Button onClick={() => {}} className="shadow-none">
              Cancel
            </Button>
            <Button
              onClick={() => {}}
              className="bg-red-600 text-white hover:bg-red-700 rounded-xl w-full"
            >
              {isArchiving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
      </div> */}
    </>
  );
}
