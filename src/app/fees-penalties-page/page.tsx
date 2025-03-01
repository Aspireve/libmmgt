"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import { studentColumns as originalStudentColumns, Student, fallbackData } from "../fees-penalties-page/columns";

// Fetch fees and penalties data from API
const fetchFeesPenalties = async (): Promise<Student[]> => {
  const response = await axios.get("https://your-api-endpoint/feespenalties", {
    params: { page: 1, pageSize: 100 },
  });
  return response.data;
};

// Delete student from API
const deleteStudent = async (id: string): Promise<void> => {
  await axios.delete(`https://your-api-endpoint/feespenalties/${id}`);
};

const FeesPenaltiesPage = () => {
  const queryClient = useQueryClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  const { data: students = fallbackData, isLoading } = useQuery({
    queryKey: ["feespenalties"],
    queryFn: fetchFeesPenalties,
    initialData: fallbackData,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["feespenalties"] });
      const previousStudents = queryClient.getQueryData<Student[]>(["feespenalties"]) || [];
      const updatedStudents = previousStudents.filter((student) => student.student_id !== id);
      queryClient.setQueryData(["feespenalties"], updatedStudents);
      return { previousStudents };
    },
    onError: (err) => {
      queryClient.setQueryData(["feespenalties"], (context: any) => context?.previousStudents);
      console.error("Error deleting student:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feespenalties"] });
    },
  });

  const confirmDelete = (id: string) => {
    setStudentToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (!studentToDelete) return;
    deleteMutation.mutate(studentToDelete);
    setShowConfirmModal(false);
    setStudentToDelete(null);
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
              <button onClick={() => confirmDelete(student.student_id)}>
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
              <button onClick={handleCancelDelete}>Cancel</button>
              <button onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeesPenaltiesPage;