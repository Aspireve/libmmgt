'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button'


export const issueBooksData: Issue_Books[] = [
  {
    student_id: '1',
    student_name: 'Aarav Sharma',
    category: 'Science',
    in_use: 'Yes',
    available: 'No',
    no_of_books: '3'
  },
  {
    student_id: '2',
    student_name: 'Ishita Verma',
    category: 'Mathematics',
    in_use: 'No',
    available: 'Yes',
    no_of_books: '2'
  },
  {
    student_id: '3',
    student_name: 'Rahul Desai',
    category: 'Engineering',
    in_use: 'Yes',
    available: 'No',
    no_of_books: '5'
  },
  {
    student_id: '4',
    student_name: 'Meera Iyer',
    category: 'Literature',
    in_use: 'No',
    available: 'Yes',
    no_of_books: '1'
  },
  {
    student_id: '5',
    student_name: 'Vikram Singh',
    category: 'History',
    in_use: 'Yes',
    available: 'No',
    no_of_books: '4'
  }
];


export interface Issue_Books {
    student_id: string;
    student_name: string;
    category: string;
    in_use: string;
    available: string;
    no_of_books:string
  }

export const columns: ColumnDef<Issue_Books>[] = [
  {
    accessorKey: 'student_id',
    header: 'Id'
  },
  {
    accessorKey: 'student_name',
    header: 'Name of Student'
  },
  {
    accessorKey:'category',
    header:"Category"
  },
  {
    accessorKey:"in_use",
    header:'In-use'
  },
  {
    accessorKey:"available",
    header:"Available"
  },
  {
    accessorKey:"no_of_books",
    header:"Number of books"
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
          <FaEdit />
        </Button>
      </div>
    )
  }
]


const handleEdit = (issuebooks: Issue_Books) => {
  console.log('Edit book:', issuebooks)
}