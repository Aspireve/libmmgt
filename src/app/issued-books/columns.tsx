'use client'

import { ColumnDef } from '@tanstack/react-table'

export const issuedBooksData: Issuedbooks[] = [
  {
    student_id: '1',
    student_name: 'Aarav Sharma',
    department: 'Computer Science',
    book_borrowed: 'The Pragmatic Programmer',
    date_of_borrowing: '2024-02-20'
  },
  {
    student_id: '2',
    student_name: 'Ishita Verma',
    department: 'Electrical Engineering',
    book_borrowed: 'Introduction to Algorithms',
    date_of_borrowing: '2024-02-18'
  },
  {
    student_id: '3',
    student_name: 'Rahul Desai',
    department: 'Mechanical Engineering',
    book_borrowed: 'Engineering Mechanics',
    date_of_borrowing: '2024-02-22'
  },
  {
    student_id: '4',
    student_name: 'Meera Iyer',
    department: 'Civil Engineering',
    book_borrowed: 'Structural Analysis',
    date_of_borrowing: '2024-02-25'
  },
  {
    student_id: '5',
    student_name: 'Vikram Singh',
    department: 'Biotechnology',
    book_borrowed: 'Molecular Biology of the Cell',
    date_of_borrowing: '2024-02-21'
  }
];

export interface Issuedbooks {
    student_id: string;
    student_name: string;
    department: string;
    book_borrowed: string;
    date_of_borrowing: string;
  }

export const columns: ColumnDef<Issuedbooks>[] = [
  {
    accessorKey: 'student_id',
    header: 'Sr no'
  },
  {
    accessorKey: 'student_name',
    header: 'Name'
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey:'book_borrowed',
    header:'Book Borrowed'
  },
  {
    accessorKey:'date_of_borrowing',
    header:'Date of Borrowing'
  }
]