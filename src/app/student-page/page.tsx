"use client";

import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useList, useDelete, GetListResponse } from "@refinedev/core";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import { studentColumns as originalStudentColumns, fallbackData, Student } from "./studentcolumns";

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

const StudentDirectory = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

    const { data: studentsResponse, isLoading, error } = useList<Student>({
        resource: "student/all",
        pagination: { current: 1, pageSize: 1000 },
        queryOptions: {
            queryKey: ["students"],
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            initialData: { data: fallbackData, total: fallbackData.length } as GetListResponse<Student>,
        },
    });

    const students = studentsResponse?.data ?? fallbackData;

    const { mutate: deleteStudent } = useDelete();

    const deleteMutation = useMutation({
        mutationFn: (id: string) =>
            new Promise<void>((resolve, reject) => {
                deleteStudent(
                    { resource: "student/delete", id }, 
                    {
                        onSuccess: () => resolve(),
                        onError: (error: any) => reject(error.response?.data?.message || error.message),
                    }
                );
            }),
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ["students"] });
            const previousStudents =
                queryClient.getQueryData<GetListResponse<Student>>(["students"]) || {
                    data: students,
                    total: students.length,
                };
            const optimisticStudents = previousStudents.data.filter(
                (student) => student.student_id !== id
            );
            queryClient.setQueryData(["students"], {
                ...previousStudents,
                data: optimisticStudents,
                total: optimisticStudents.length,
            });
            return { previousStudents };
        },
        onError: (err, id, context) => {
            queryClient.setQueryData(["students"], context?.previousStudents);
            toast.error(`Error deleting student: ${err}`, { position: "top-center" });
            setShowConfirmModal(false);
            setStudentToDelete(null);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
        onSuccess: () => {
            toast.success("Student deleted successfully!", { position: "top-center" });
            setShowConfirmModal(false);
            setStudentToDelete(null);
        },
    });

    const filteredStudents = searchTerm.trim()
        ? students.filter((student) =>
              ["student_id", "student_name", "department", "email", "phone_no", "roll_no"]
                  .some((key) =>
                      (student[key as keyof Student]?.toString().toLowerCase() || "").includes(
                          searchTerm.toLowerCase()
                      )
                  )
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
                            <button
                                onClick={() => confirmDelete(student.student_id)}
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
    });

    if (isLoading && !studentsResponse) {
        return <div className="p-4 text-center">Loading data...</div>;
    }
    if (error) {
        return <div className="p-4 text-center">Error: {error.message}</div>;
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

export default StudentDirectory;