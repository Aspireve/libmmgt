"use client";

import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useList, useDelete, GetListResponse } from "@refinedev/core";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import { studentColumns as originalStudentColumns, Student, fallbackData } from "../fees-penalties-page/columns";
import { Button } from "@/components/ui/button"; // Assuming you have this component
import { toast } from "sonner"; // Assuming you have toast notifications

const FeesPenaltiesPage = () => {
  const queryClient = useQueryClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  // Fetch fees and penalties data using Refine's useList hook
  const { data: studentsResponse, isLoading } = useList<Student>({
    resource: "feespenalties",
    pagination: { current: 1, pageSize: 100 },
    queryOptions: {
      queryKey: ["feespenalties"],
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      initialData: { 
        data: fallbackData, 
        total: fallbackData.length 
      } as GetListResponse<Student>,
    },
  });

  const students = studentsResponse?.data ?? fallbackData;

  // Delete mutation using Refine's useDelete hook
  const { mutate: deleteStudent } = useDelete();

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      new Promise<void>((resolve, reject) => {
        deleteStudent(
          { resource: "feespenalties", id },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          }
        );
      }),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["feespenalties"] });
      const previousStudents = queryClient.getQueryData<GetListResponse<Student>>(["feespenalties"]) || 
        { data: students, total: students.length };
      const optimisticStudents = previousStudents.data.filter((student) => student.student_id !== id);
      queryClient.setQueryData(["feespenalties"], { 
        ...previousStudents, 
        data: optimisticStudents,
        total: optimisticStudents.length 
      });
      return { previousStudents };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["feespenalties"], context?.previousStudents);
      toast.error("Error deleting student: " + (err instanceof Error ? err.message : "Unknown error"), {
        position: "top-center",
      });
      setShowConfirmModal(false);
      setStudentToDelete(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feespenalties"] });
    },
    onSuccess: () => {
      toast.success("Student deleted successfully!", { position: "top-center" });
      setShowConfirmModal(false);
      setStudentToDelete(null);
    },
  });

  const confirmDelete = (id: string) => {
    setStudentToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (!studentToDelete) return;
    deleteMutation.mutate(studentToDelete);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setStudentToDelete(null);
  };

  const enhancedColumns = originalStudentColumns.map((col) => {
    if (col.id === "actions") {
      return {
        ...col,
        cell: ({ row }: any) => {
          const student: Student = row.original;
          return (
            <div className="flex gap-2">
              <button
                onClick={() => confirmDelete(student.student_id)}
                aria-label="Delete student"
              >
                Delete
              </button>
            </div>
          );
        },
      };
    }
    return col;
  });

  if (isLoading) {
    return <div className="p-4 text-center">Loading data...</div>;
  }

  return (
    <>
      <Header />
      <div className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
        <DataTable columns={enhancedColumns} data={students} />
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this student?</p>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCancelDelete} variant="outline">
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmDelete} 
                className="bg-red-600 text-white hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeesPenaltiesPage;