"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import EditBtn from "../../images/EditBtn.png";
import DeleteBtn from "../../images/DeleteBtn.png";

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

// ✅ Component for ID Column
const StudentIDCell = ({ student }: { student: Student }) => {
  const router = useRouter();
  return (
    <div
      className="relative group cursor-pointer  font-bold"
      onClick={() => router.push(
        `/student-page/student-profile?id=${student.student_uuid}&student=${encodeURIComponent(
          JSON.stringify(student)
        )}`
      )}
    >
      {student.student_id}
      {/* Chat bubble tooltip */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
      after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800">
        Student Profile
      </div>
    </div>
  );
};


// ✅ Component for Name Column
const StudentNameCell = ({ student }: { student: Student }) => {
  const router = useRouter();
  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => router.push(
        `/student-page/student-profile?id=${student.student_uuid}&student=${encodeURIComponent(
          JSON.stringify(student)
        )}`
      )}
    >
      {student.student_name}
      {/* Chat bubble tooltip */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
      after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800">
        Student Profile
      </div>
    </div>
  );
};


export const studentColumns: ColumnDef<Student>[] = [
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
  {
    accessorKey: "roll_no",
    header: "Roll no",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "year_of_admission",
    header: "Year of Admission",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;
      const router = useRouter();
      return (
        <div className="flex gap-2 ml-10">
          <button
            onClick={() => handleEdit(student, router)}
            aria-label="Edit student"
          >
            <img src={EditBtn.src} alt="Edit" />
          </button>
          <button
            onClick={() => handleDelete(student.student_uuid)}
            aria-label="Delete student"
          >
            <img src={DeleteBtn.src} alt="Delete" />
          </button>
        </div>
      );
    },
  },
];

const handleEdit = (student: Student, router: ReturnType<typeof useRouter>) => {
  console.log("Navigating with student_uuid:", student.student_uuid);
  router.push(
    `/EditStudent?id=${student.student_uuid}&student=${encodeURIComponent(
      JSON.stringify(student)
    )}`
  );
};

const handleDelete = (uuid: string) => {
  console.log(`Delete student with UUID: ${uuid}`);
};
