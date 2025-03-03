'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { bookRoutes, BookData } from './columns';
import { DataTable } from '@/components/data-tables/data-table';
import React, { useState } from 'react';
import { useDelete, useList } from '@refinedev/core';
import { Input } from '@/components/ui/input';
import Search from '../../images/search.png';
import Image from 'next/image';
import Tabbing from '../Tab/Tab';
import Header from '../Header/header';
import Addbook from '../../images/addbook.png';
import Import from '../../images/import.png';
import Filter from '../../images/filter.png';
import { useRouter } from "next/navigation";
import EditIcon from '../../images/edit.png';
import DeleteIcon from '../../images/trash.png';
import { toast } from 'sonner';

const BooksPage = () => {
  const { data } = useList<BookData>({ resource: 'book/all' });
  const router = useRouter();
  const {mutate} = useDelete()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleEdit = (book: BookData) => {
    router.push(`/edit-book?book_id=${book.book_id}`);
  };

  const handleDeleteClick = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBookId) {
      console.log('Deleting book with ID:', selectedBookId);
      mutate({
        resource:'book/delete',
        id:selectedBookId
      },
      {
        onError: (error) => {
          toast.error("There is some Internal Isuues in deleting student",{position:"top-left"})
        },
        onSuccess: () => {
          toast.success("Student deleted sucessfuly!!!",{position:"top-left"})
        },
      },
    )
      
    }
    setIsModalOpen(false);
    setSelectedBookId(null);
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
            <Image src={EditIcon} alt='Edit button' />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(row.original.book_id)}>
            <Image src={DeleteIcon} alt='Delete button' />
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <Header />
      <Tabbing routes={bookRoutes} className="w-[30%]" />

      <section className="border border-[#E0E2E7] rounded-[10px] m-4">
        <div className='container'>
          <div className="grid grid-cols-[30%_70%] p-4">
            <div className='flex items-center gap-[10px]'>
              <h1 className='text-3xl font-bold'>Books</h1>
              <p className='bg-[#F9F5FF] rounded-2xl text-[#6941C6]'>{data?.data.length || 0}<span> Entries</span></p>
            </div>
            <div className="flex items-center justify-end py-4 gap-3">
              <Button
                onClick={() => router.push("/import-book")}
                className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px]">
                <Image src={Import} alt="Import button" />
                Import
              </Button>
              <Button
                onClick={() => router.push("/add-book")}
                className="shadow-none border border-[#989CA4] rounded-[8px] text-[#BBBBBB] flex items-center px-4 py-2">
                <Image src={Addbook} alt="Add button" />
                Add Books
              </Button>
              <Button className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px]">
                <Image src={Filter} alt="Filter button" />
                Filter
              </Button>
              <div className="relative max-w-sm w-72">
                <Image src={Search} alt='search-icon' className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search"
                  className="pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
                />
              </div>
              <Button className='bg-[#1E40AF] text-white rounded-[8px] w-[10%] p-4 hover:bg-[#1E40AF] hover:text-white'>
                Search
              </Button>
            </div>
          </div>
          
            <DataTable columns={columns} data={data?.data || []} />
        
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-600">Do you really want to delete this book? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button className='bg-red-600 text-white hover:bg-red-800 rounded-lg' onClick={confirmDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BooksPage;
