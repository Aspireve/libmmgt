"use client";

import React, { useState } from "react";
import { useList, useDelete } from "@refinedev/core";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Import sonner toast

const StudentDirectory = () => {
  const { data, isLoading } = useList({
    resource: "all",
    dataProviderName: "default",
  });

  const { mutate: deleteStudent } = useDelete();
  const router = useRouter();

  const [studentsData, setStudentsData] = useState<Student[]>(fallbackData);
  const [searchTerm, setSearchTerm] = useState("");

  const students: Student[] = Array.isArray(data?.data)
    ? data.data.map((item: any) => ({
        student_id: item.student_id,
        full_name: item.full_name,
        department: item.department || null,
        email: item.email,
        phone_no: item.phone_no,
        institute_id: item.institute_id,
        address: item.address || "",
        is_archived: item.is_archived ?? false,
        dob: item.dob || "",
        gender: item.gender || "",
        roll_no: item.roll_no || "",
        year_of_admission: item.year_of_admission || "",
        password: item.password || "",
        confirm_password: item.confirm_password,
      }))
    : studentsData;

  const filteredStudents = searchTerm.trim()
    ? students.filter(
        (student) =>
          student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (student.department?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.phone_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.roll_no.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : students;

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    if (!Array.isArray(studentsData)) {
      console.error("studentsData is not an array:", studentsData);
      toast.error("Student data is not available.", {
        position: "top-center",
      });
      return;
    }

    const originalStudents = [...studentsData];
    const updatedStudents = studentsData.filter((student) => student.student_id !== id);
    setStudentsData(updatedStudents);

    deleteStudent(
      {
        resource: "student",
        id,
      },
      {
        onSuccess: () => {
          console.log(`Deleted student with ID: ${id} from backend`);
          toast.success("Student deleted successfully!", {
            position: "top-center",
          });
        },
        onError: (error: any) => {
          console.error("Failed to delete student from backend:", error);
          setStudentsData(originalStudents);
          toast.error("Error deleting student: " + error.message, {
            position: "top-center",
          });
        },
      }
    );
  };

  const handleEdit = (student: Student) => {
    router.push(`/EditStudent?id=${student.student_id}&student=${encodeURIComponent(JSON.stringify(student))}`);
  };

  const studentColumns = originalStudentColumns.map((col) => {
    if (col.id === "actions") {
      return {
        ...col,
        cell: ({ row }: any) => {
          const student: Student = row.original;
          return (
            <div className="flex gap-2 ml-10">
              <button onClick={() => handleEdit(student)} aria-label="Edit student">
                <img src={EditBtn.src} alt="Edit" />
              </button>
              <button onClick={() => handleDelete(student.student_id)} aria-label="Delete student">
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
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6 h-[555px]">
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
                <Button className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF] pt-2.5 pr-[18px] pb-2.5 pl-[18px]">
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
    </>
  );
};

export default StudentDirectory;