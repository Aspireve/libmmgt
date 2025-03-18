"use client"

import React, { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-tables/data-table';

import { formatDate } from '../hooks/formatDate'

interface BookData {
    student_id: string,
    student_name: string,
    department: string,
    issued_date: string,
    return_date: string
}
const BookBorrowedDetails = () => {

    const studentData: BookData[] = [
        {
            student_id: "S101",
            student_name: "Aarav Mehta",
            department: "Computer Science",
            issued_date: "2024-02-15",
            return_date: "2024-03-15"
        },
        {
            student_id: "S102",
            student_name: "Ishaan Sharma",
            department: "Mechanical Engineering",
            issued_date: "2024-01-10",
            return_date: "2024-02-10"

        },
        {
            student_id: "S103",
            student_name: "Neha Patel",
            department: "Electronics",
            issued_date: "2024-03-01",
            return_date: "2024-04-01"

        },
        {
            student_id: "S104",
            student_name: "Rohan Verma",
            department: "Civil Engineering",
            issued_date: "2024-02-20",
            return_date: "2024-03-20"

        },
        {
            student_id: "S105",
            student_name: "Simran Kaur",
            department: "Information Technology",
            issued_date: "2024-02-05",
            return_date: "2024-03-05"

        }
    ];


    const [data, setData] = useState<BookData[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);

    useEffect(() => {
        setTimeout(() => setData(studentData), 1000);
    }, []);

    const columns: ColumnDef<BookData>[] = [
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
        }
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={studentData}
                isLoading={false}
                page={0}
                limit={0}
                setLimit={setLimit}
                setPage={setPage}
                totalPages={10} />

        </>
    )
}

export default BookBorrowedDetails