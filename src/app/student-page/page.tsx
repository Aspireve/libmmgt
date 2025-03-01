"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import {
  studentColumns as originalStudentColumns,
  fallbackData,
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Fetch students from API
const fetchStudents = async (): Promise<Student[]> => {
  const response = await axios.get("https://your-api-endpoint/students"); // Replace with your API endpoint
  return response.data.map((item: any) => ({
    student_id: item.student_id,
    student_name: item.student_name,
    department: item.department || null,
    email: item.email,
    phone_no: item.phone_no,
    institute_id: item.institute_id,
    institute_name: item.institute_name || "",
    address: item.address || "",
    is_archived: item.is_archived ?? false,
    dob: item.dob || "",
    gender: item.gender || "",
    roll_no: item.roll_no || "",
    year_of_admission: item.year_of_admission || "",
    password: item.password || "",
    confirm_password: item.confirm_password,
  }));
};

// Delete student from API
const deleteStudent = async (id: string): Promise<void> => {
  await axios.delete(`https://your-api-endpoint/students/${id}`); // Replace with your API endpoint
};

const StudentDirectory = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  // Fetch students using useQuery
  const { data: students = fallbackData, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    initialData: fallbackData,
  });

  // Mutation for deleting a student with optimistic updates
  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });
      const previousStudents = queryClient.getQueryData<Student[]>(["students"]) || [];
      const updatedStudents = previousStudents.filter((student) => student.student_id !== id);
      queryClient.setQueryData(["students"], updatedStudents);
      return { previousStudents };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["students"], context?.previousStudents);
      toast.error("Error deleting student: " + (err instanceof Error ? err.message : "Unknown error"), {
        position: "top-center",
      });
      setShowConfirmModal(false);
      setStudentToDelete(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Student deleted successfully!", { position: "top-center" });
      setShowConfirmModal(false);
      setStudentToDelete(null);
    },
  });

  const filteredStudents = searchTerm.trim()
    ? students.filter(
        (student) =>
          student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (student.department?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.phone_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.roll_no.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : students;

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

  const studentColumns = originalStudentColumns.map((col) => {
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
                    `/EditStudent?id=${student.student_id}&student=${encodeURIComponent(
                      JSON.stringify(student)
                    )}`
                  )
                }
                aria-label="Edit student"
              >
                <img src={EditBtn.src} alt="Edit" />
              </button>
              <button onClick={() => confirmDelete(student.student_id)} aria-label="Delete student">
                <img src={DeleteBtn.src} alt="Delete" />
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
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold ml-4">Students</p>
              <span className="rounded-full bg-[#F9F5FF] px-3 py-1 text-sm font-medium text-[#6941C6]">
                {filteredStudents.length} Entries
              </span>
            </div>
            <div className="flex items-center justify-end gap-4 m-3">
              <Link href="/import-students">
                <Button className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF] pt-2.5 pr-[18px] pb-2.5 pl-[18px]">
                  <img src={importdrop.src} alt="" /> Import
                </Button>
              </Link>
              <Link href="/AddStudent">
                <Button className="border border-[#989CA4] rounded-[8px] text-[#BBBBBB] pt-2.5 pr-[18px] pb-2.5 pl-[18px]">
                  <img src={addBook.src} alt="" /> Add Student
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
              <Button className="bg-[#1E40AF] text-white rounded-[8px] w-[15%] p-4">
                Search
              </Button>
            </div>
          </div>
          <DataTable columns={studentColumns} data={filteredStudents} />
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this student?</p>
            <div className="flex justify-end gap-4">
              <Button onClick={handleCancelDelete} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} className="bg-red-600 text-white hover:bg-red-600">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDirectory;