"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import arrowLeft from "../../images/arrow-left.png";
import arrowRight from "../../images/arrow-right.png";
import editIcon from "../../images/editicon.png";



interface Student {
  student_id: string;
  student_name: string;
  department: string;
}

//  Static fallback data
const fallbackData: Student[] = [
  {
    student_id: "#3066",
    student_name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    student_id: "#3065",
    student_name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    student_id: "#3064",
    student_name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    student_id: "#3063",
    student_name: "Bhumi Jain",
    department: "Electronics",
  },
  {
    student_id: "#3062",
    student_name: "Bhumi Jain",
    department: "Electronics",
  },
];

const StudentDataTable: React.FC = () => {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students");
        if (!response.ok) {
          setStudents(fallbackData);
          return;
        }

        const data: Student[] = await response.json();
        if (data && data.length > 0) {
          setStudents(data);
        } else {
          setStudents(fallbackData);
        }
      } catch (error) {
        console.error("Error fetching students:", error);

        setStudents(fallbackData);
      }
    };

    fetchStudents();
  }, []);

  if (!students) {
    return <div className="p-4 text-center">Loading data...</div>;
  }

  const totalPages = Math.ceil(students.length / pageSize);
  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = students.slice(startIndex, endIndex);

  // 7. Render table with pagination
  return (
    <div className="relative w-full overflow-hidden ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%] bg-slate-50">Student ID</TableHead>
            <TableHead className="w-[35%] bg-slate-50">Student Name</TableHead>
            <TableHead className="w-[40%] bg-slate-50">Department</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.map((student) => (
            <TableRow key={student.student_id}>
              <TableCell>{student.student_id}</TableCell>
              <TableCell>{student.student_name}</TableCell>
              <TableCell>
                <div className="flex items-center justify-between pr-4">
                  <span>{student.department}</span>
                  <div className="flex items-center gap-3">
                    <Image
                      src={editIcon}
                      alt="Edit"
                      className="h-4 w-4 cursor-pointer"
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
      <div className="my-4 flex items-center justify-center">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="mr-4 inline-flex h-9 w-[115px] items-center justify-center gap-2
                     rounded-[8px] border border-gray-300 px-3 py-1 text-sm font-medium
                     text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Image src={arrowLeft} alt="arrowLeft" className="h-4 w-4" />
          Previous
        </button>

        {/* Page Numbers */}
        <ul className="inline-flex items-center space-x-1">
          {pages.map((page) => (
            <li key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-sm transition-colors
                  ${
                    page === currentPage
                      ? "bg-gray-200 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="ml-4 inline-flex h-9 w-[88px] items-center justify-center gap-2
                     rounded-[8px] border border-gray-300 px-3 py-1 text-sm font-medium
                     text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <Image src={arrowRight} alt="arrowRight" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default StudentDataTable;
