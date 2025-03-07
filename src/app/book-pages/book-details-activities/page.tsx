import React, { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-tables/data-table';

import { formatDate } from '../hooks/formatDate'
interface BookActiveData {
    student_id: string,
    student_name: string,
    department: string,
    issued_date: string,
    return_date: string,
    fees_penalties:string,
}
const BookActiveDetails = () => {

    const studentActiveData: BookActiveData[] = [
        {
            student_id: "S101",
            student_name: "Aarav Mehta",
            department: "Computer Science",
            issued_date: "2024-02-15",
            return_date: "2024-03-15",
            fees_penalties:"300"
        },
        {
            student_id: "S102",
            student_name: "Ishaan Sharma",
            department: "Mechanical Engineering",
            issued_date: "2024-01-10",
            return_date: "2024-02-10",
            fees_penalties:"300"

        },
        {
            student_id: "S103",
            student_name: "Neha Patel",
            department: "Electronics",
            issued_date: "2024-03-01",
            return_date: "2024-04-01",
            fees_penalties:"300"

        },
        {
            student_id: "S104",
            student_name: "Rohan Verma",
            department: "Civil Engineering",
            issued_date: "2024-02-20",
            return_date: "2024-03-20",
            fees_penalties:"300"

        },
        {
            student_id: "S105",
            student_name: "Simran Kaur",
            department: "Information Technology",
            issued_date: "2024-02-05",
            return_date: "2024-03-05",
            fees_penalties:"300"

        }
    ];


    const [data, setData] = useState<BookActiveData[]>([]);
    
        useEffect(() => {
            setTimeout(() => setData(studentActiveData), 1000);
        }, []);

     const columns: ColumnDef<BookActiveData>[] = [
            { accessorKey: 'student_id', header: 'Student ID' },
            { accessorKey: 'student_name', header: 'Student Name', },
            { accessorKey: 'department', header: 'Department' },
            {
                accessorKey: 'issued_date', header: 'Issued Date',
                cell: ({ row }) => <span>{formatDate(row.original.issued_date)}</span>
            },
            {
                accessorKey: "return_date", header: "Return Date",
                cell: ({ row }) => <span>{formatDate(row.original.return_date)}</span>
            },
            {   accessorKey:"fees_penalties", header:"Penalties"}
    
        ];
   
  return (
    <>
    <DataTable columns={columns} data={data} />
    </>
  )
}

export default BookActiveDetails