'use client';
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { bookRoutes, BookData } from './columns';
import { DataTable } from '@/components/data-tables/data-table';
import React, { useEffect, useState } from 'react';
import { useList } from '@refinedev/core';
import { Input } from '@/components/ui/input';
import Search from '../../images/search.png'
import Image from 'next/image';
import Tabbing from '../Tab/Tab';
import Header from '../Header/header';
import Addbook from '../../images/addbook.png'
import Import from '../../images/import.png'
import Filter from '../../images/filter.png'
import { useRouter } from "next/navigation";
import EditIcon from '../../images/edit.png'
import DeleteIcon from '../../images/trash.png'



const BooksPage = () => {
  const { data, isLoading } = useList<BookData>({ resource: 'all' });
  const router = useRouter();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
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
      header: 'Year of Publication',
      cell: ({ row }) => <span>{formatDate(row.original.year_of_publication)}</span>
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
           <Image src={EditIcon} alt='Edit button'/>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.book_id)}>
          <Image src={DeleteIcon} alt='Edit button'/>
          </Button>
        </div>
      )
    }
  ]

  const handleEdit = (book: BookData) => {
      router.push(`/edit-book?book_id=${book.book_id}`);
    }
    

  const handleDelete = (bookId: string) => {
    console.log('Delete book with ID:', bookId)
  }
  return (
    <>
      <Header />
      <Tabbing routes={bookRoutes} className="w-[30%]" />

      <section className="border border-[#E0E2E7] rounded-[10px] m-4">

        <div className='container'>
          <div className="grid grid-cols-[30%_70%] p-4">
            <div className='flex items-center gap-[10px]'>
              <h1 className=' text-3xl font-bold'>Books</h1>
              <p className='bg-[#F9F5FF] rounded-2xl text-[#6941C6]'>3<span> Enteries</span></p>
            </div>
            <div className="flex items-center justify-end py-4 gap-3">
              {/* Import Book  */}
              <Button
                onClick={() => router.push("/import-book")}
                className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px]">
                <Image src={Import} alt="Add button" />
                Import
              </Button>
              {/* Add Book */}
              <Button
                onClick={() => router.push("/add-book")}
                className="shadow-none border border-[#989CA4] rounded-[8px] text-[#BBBBBB] flex items-center px-4 py-2">
                <Image src={Addbook} alt="Add button" />
                Add Books
              </Button>
              {/* Filter Books Button */}
              <Button className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px]">
                <Image src={Filter} alt="Add button"  />
                Filter
              </Button>

              {/* Search Input with Icon */}
              <div className="relative max-w-sm w-72">
                <Image src={Search} alt='search-icon' className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
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
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <DataTable columns={columns} data={data?.data || []} />
            // <DataTable columns={columns} data={data} />

          )}
        </div>
      </section>
    </>
  );
};

export default BooksPage;
