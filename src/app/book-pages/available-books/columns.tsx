'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import {BookData} from '../types/data'


export const columns: ColumnDef<BookData>[] = [
  {
    accessorKey: 'book_id',
    header: 'Sr no'
  },
  {
    accessorKey: 'book_name',
    header: 'Name of Book'
  },
  {
    accessorKey: 'book_author',
    header: 'Name of Author',
  },
  {
    accessorKey: 'book_publisher',
    header: 'Book Publisher'
  },
  {
    accessorKey: 'book_count',
    header: 'Book Count'
  },
  {
    accessorKey: 'year_of_publication',
    header: 'Year of Publication'
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.book_id)}>
          <FaTrash />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
          <FaEdit />
        </Button>
        
      </div>
    )
  }
]

const handleEdit = (book: BookData) => {
  console.log('Edit book:', book)
}

const handleDelete = (bookId: string) => {
  console.log('Delete book with ID:', bookId)
}
