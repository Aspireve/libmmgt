'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button'


export const booksData: Books[] = [
  {
    book_id: '1',
    book_name: 'The Great Gatsby',
    book_author: 'F. Scott Fitzgerald',
    book_publisher: 'Scribner',
    book_count: '10',
    year_of_publication: '1925'
  },
  {
    book_id: '2',
    book_name: 'To Kill a Mockingbird',
    book_author: 'Harper Lee',
    book_publisher: 'J.B. Lippincott & Co.',
    book_count: '15',
    year_of_publication: '1960'
  },
  {
    book_id: '3',
    book_name: '1984',
    book_author: 'George Orwell',
    book_publisher: 'Secker & Warburg',
    book_count: '8',
    year_of_publication: '1949'
  },
  {
    book_id: '4',
    book_name: 'Pride and Prejudice',
    book_author: 'Jane Austen',
    book_publisher: 'T. Egerton',
    book_count: '12',
    year_of_publication: '1813'
  },
  {
    book_id: '5',
    book_name: 'The Catcher in the Rye',
    book_author: 'J.D. Salinger',
    book_publisher: 'Little, Brown and Company',
    book_count: '9',
    year_of_publication: '1951'
  }
]

export interface Books {
  book_id: string;
  book_name: string;
  book_author: string;
  book_publisher:string
  book_count:string
  year_of_publication:string
}
export const columns: ColumnDef<Books>[] = [
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

const handleEdit = (book: Books) => {
  console.log('Edit book:', book)
}

const handleDelete = (bookId: string) => {
  console.log('Delete book with ID:', bookId)
}
