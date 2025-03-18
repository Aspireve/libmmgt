"use client";

import React, { useRef, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Images from "@/images"; // Ensure this path points to your image exports

export interface Student {
  student_id: string;
  student_uuid: string;
  student_name: string;
  department: string | null;
  email: string;
  phone_no: string;
  address: string;
  institute_id: string;
  institute_name: string;
  is_archived: boolean;
  date_of_birth: string;
  gender: "male" | "female" | "";
  roll_no: number;
  year_of_admission: string;
  password: string;
  current_password?: string;
  confirm_password?: string;
}

// Component for ID Column
const StudentIDCell = ({ student }: { student: Student }) => {
  const router = useRouter();
  return (
    <div
      className="relative group cursor-pointer font-bold"
      onClick={() =>
        router.push(`/student-page/student-profile?student_uuid=${student.student_uuid}`)
      }
    >
      {student.student_id}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
          after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800"
      >
        Student Profile
      </div>
    </div>
  );
};

// Component for Name Column
const StudentNameCell = ({ student }: { student: Student }) => {
  const router = useRouter();
  return (
    <div
      className="relative group cursor-pointer"
      onClick={() =>
        router.push(`/student-page/student-profile?student_uuid=${student.student_uuid}`)
      }
    >
      {student.student_name}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
          after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800"
      >
        Student Profile
      </div>
    </div>
  );
};

/**
 * useStudentColumns hook returns a ColumnDef array that includes a selection column and an actions column.
 * It now accepts an onDeleteAction callback which is called when the delete button is clicked.
 */
export const useStudentColumns = ({
  selectedStudents,
  onToggleStudentAction,
  onSelectAllAction,
  isAllSelected,
  isIndeterminate,
  onDeleteAction, // New callback
}: {
  selectedStudents: string[];
  onToggleStudentAction: (uuid: string) => void;
  onSelectAllAction: () => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onDeleteAction?: (uuid: string) => void;
}): ColumnDef<Student>[] => {
  const router = useRouter();

  const headerCheckboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const selectionColumn: ColumnDef<Student> = {
    id: "select",
    header: () => (
      <input
        type="checkbox"
        ref={headerCheckboxRef}
        checked={isAllSelected}
        onChange={onSelectAllAction}
      />
    ),
    cell: ({ row }) => {
      const student = row.original;
      const isSelected = selectedStudents.includes(student.student_uuid);
      return (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleStudentAction(student.student_uuid)}
        />
      );
    },
  };

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "student_id",
      header: "ID",
      cell: ({ row }) => <StudentIDCell student={row.original} />,
    },
    {
      accessorKey: "student_name",
      header: "Name",
      cell: ({ row }) => <StudentNameCell student={row.original} />,
    },
    { accessorKey: "roll_no", header: "Roll no" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "year_of_admission", header: "Year of Admission" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex gap-2 ml-10">
            <button
              onClick={() => {
                console.log("Navigating with student_uuid:", student.student_uuid);
                router.push(`/student-page/EditStudent?id=${student.student_uuid}`);
              }}
              aria-label="Edit student"
            >
              <Image src={Images.EditButton} alt="Edit" height={20} width={20} />
            </button>
            <button
              onClick={() => {
                if (onDeleteAction) {
                  onDeleteAction(student.student_uuid);
                } else {
                  console.log(`Delete student with UUID: ${student.student_uuid}`);
                }
              }}
              aria-label="Delete student"
            >
              <Image src={Images.DeleteButton} alt="Delete" height={20} width={20} />
            </button>
          </div>
        );
      },
    },
  ];

  return [selectionColumn, ...columns];
};
