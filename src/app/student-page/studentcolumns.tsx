"use client";

import { useRouter } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import EditBtn from "../../images/EditBtn.png";
import DeleteBtn from "../../images/DeleteBtn.png";

// Student interface
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

// Component for the ID column
const StudentIDCell = ({ student }: { student: Student }) => {
  const router = useRouter();
  return (
    <div
      className="relative group cursor-pointer"
      onClick={() =>
        router.push(
          `/student-page/student-profile?student_uuid=${student.student_uuid}`
        )
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

// Component for the Name column
const StudentNameCell = ({ student }: { student: Student }) => {
  const router = useRouter();
  return (
    <div
      className="relative group cursor-pointer"
      onClick={() =>
        router.push(
          `/student-page/student-profile?student_uuid=${student.student_uuid}`
        )
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

// Define the columns
export const studentColumns: ColumnDef<Student>[] = [
  {
    id: "selection",
    header: ({ table }) => (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => table.toggleAllRowsSelected()}
      >
        {table.getIsAllRowsSelected() ? "Unselect All" : "Select All"}
      </button>
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  },
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

// Edit and Delete handlers
const handleEdit = (student: Student, router: ReturnType<typeof useRouter>) => {
  console.log(student.student_uuid);
  router.push(`/student-page/EditStudent?id=${student.student_uuid.trim()}`);
};

const handleDelete = (uuid: string) => {
  console.log(`Delete student with UUID: ${uuid}`);
};

// Example Table Component
const StudentTable = ({ data }: { data: Student[] }) => {
  const columns = useMemo(() => studentColumns, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Enable row selection
    initialState: {
      rowSelection: {},
    },
    // Enable manual control over row selection if needed
    enableRowSelection: true,
  });

  return (
    <div className="p-4">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border p-2 text-left bg-gray-100"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Example usage
const sampleData: Student[] = [
  {
    student_id: "S001",
    student_uuid: "uuid-001",
    student_name: "John Doe",
    department: "Computer Science",
    email: "john.doe@example.com",
    phone_no: "123-456-7890",
    address: "123 Main St",
    institute_id: "I001",
    institute_name: "Tech University",
    is_archived: false,
    date_of_birth: "2000-01-01",
    gender: "male",
    roll_no: 101,
    year_of_admission: "2020",
    password: "hashedpassword",
  },
  // Add more sample data as needed
];

export default function Page() {
  return <StudentTable data={sampleData} />;
}