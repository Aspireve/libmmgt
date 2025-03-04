'use client';
import React, { useEffect, useState } from 'react';
import { BookData, dummyBooks } from '../types/data';
import { DataTable } from '@/components/data-tables/data-table';
import { useList } from '@refinedev/core';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { bookRoutes } from '../types/data';
import {images} from '../images'
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaTrash } from 'react-icons/fa'


const AvaBooks = () => {
  const columns: ColumnDef<BookData>[] = [
    {
      accessorKey: 'book_id',
      header: 'Sr no'
    },
    {
      accessorKey: 'book_title',
      header: 'Name of Book'
    },
    {
      accessorKey: 'book_author',
      header: 'Name of Author',
    },
    {
      accessorKey: 'name_of_publisher',
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
  // const { data, isLoading } = useList<Books>({ resource: 'all' });
  const [data, setData] = useState<BookData[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData(dummyBooks);
    }, 1000);
  }, []);
  return (
    <>
      <Header />
      <Tabbing routes={bookRoutes} className="w-[30%]" />

      <section className="border border-[#E0E2E7] rounded-[10px] m-4">
        <div className='container'>
          <div className="grid grid-cols-[30%_70%] p-4">
            <div className='flex items-center gap-[10px]'>
              <h1 className=' text-3xl font-bold'>Available Books</h1>
              <p className='bg-[#F9F5FF] rounded-2xl text-[#6941C6]'>{data.length}<span> Enteries</span></p>
            </div>
            <div className="flex items-center justify-end py-4 gap-3">
              {/* Add Book */}
              <Button
                className="shadow-none border border-[#989CA4] rounded-[8px] text-[#BBBBBB] flex items-center px-4 py-2">
                <Image src={images.dropdown} alt="Add button" />
                Department
              </Button>
              {/* Filter Books Button */}
              <Button className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px]">
                <Image src={images.filter} alt="Add button"  />
                Filter
              </Button>

              {/* Search Input with Icon */}
              <div className="relative max-w-sm w-72">
                <Image src={images.search} alt='search-icon' className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search"
                  className="pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
                />
              </div>

              {/* Search Button */}
              <Button className='bg-[#1E40AF] text-white rounded-[8px] w-[10%] p-4 hover:bg-[#1E40AF] hover:text-white'>
                Search
              </Button>
            </div>
          </div>
          
            {/* <DataTable columns={columns} data={data?.data || []} /> */}
            <DataTable columns={columns} data={data} />
        </div>
        </section>
    </>
  );
};

export default AvaBooks;
