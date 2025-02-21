'use client'

import { ColumnDef } from '@tanstack/react-table'



export interface Issue_Books {
    book_id: string;
    book_name: string;
    department: string;
    book_author: string;
    date_of_borrowing: string;
  }

export const columns: ColumnDef<Issue_Books>[] = [
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
    accessorKey:'Publisher',
    header:'book_publisher'
  },
  {
    accessorKey:'book_count',
    header:'Book Count'
  },
  {
    accessorKey:'year_of_publication',
    header:'Year of Publication'
  }
]