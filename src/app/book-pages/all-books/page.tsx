'use client';
import React, { useState } from 'react';
import { useDelete, useList, useInvalidate, useDeleteMany } from '@refinedev/core';
import { bookRoutes, BookData } from '../types/data';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-tables/data-table';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import { images } from "../images";
import Link from 'next/link';

import { formatDate } from '../hooks/formatDate'

const BooksPage = () => {
  const [url, setUrl] = useState("all")
  const [title, setTitle] = useState("Books")
  const { mutate } = useDelete()
  const {mutateAsync} = useDeleteMany()
  const invalidate = useInvalidate();
  const router = useRouter();
  const [DeleteIds, setDeleteIds] = useState<string[]>([])
  const [isshowDeleteButton, setIsShowDeleteButton] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDepartementOpen, setIsDepartmentOpen] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const { data, isLoading } = useList<BookData>({ resource: `book/${url}`});

  const handleEdit = (book: BookData) => {
    router.push(`/book-pages/edit-book?book_uuid=${book.book_uuid}`);
  };

  const handleDeleteClick = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };


  const handleChangeDelete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =e.target.value
    setIsShowDeleteButton(true);
    setDeleteIds((prevIds) => {
      if (prevIds.includes(value)) {
        return prevIds.filter((id) => id !== value);
      } else {
        return [...prevIds, value];
      }
    });
  };
  const handleMultipleDelete = async () =>{
    try {
      const response = await mutateAsync({
        resource: "books/deleteMany",
        ids: DeleteIds,
      });
  
      console.log("Deleted successfully:", response);
      toast.success("Selected records deleted successfully!");
    } catch (error) {
      console.error("DeleteMany Error:",error);
      toast.error("Failed to delete selected items.");
    }
  }
  const confirmDelete = () => {
    if (selectedBookId) {
      mutate({
        resource: 'book/delete',
        id: selectedBookId
      },
        {
          onError: () => {
            toast.error("There is some Internal Isuues in deleting student")
          },
          onSuccess: () => {
            toast.success("Student deleted sucessfuly!!!")
            invalidate({
              resource: 'all', invalidates: ["list"]
            });
          },
        },
      )
    }
    setIsModalOpen(false);
    setSelectedBookId(null);
  };

  const columns: ColumnDef<BookData>[] = [
    { id:'action', header:" ",cell:({row})=>{
      const book = row.original
      return(
        <Input 
        type='checkbox' 
        checked={DeleteIds.includes(book.book_uuid)}
        value={book.book_uuid} 
        onChange={handleChangeDelete}/>
      )
    }

    },
    { accessorKey: 'book_uuid', header: 'Book ID' },
    {
      accessorKey: 'book_title', header: 'Book Name',
      cell: ({ row }) => {
        const book = row.original
        return (
          <div
            className="relative group cursor-pointer"
            onClick={() => router.push(`/book-pages/book-details?name=${book.book_uuid}`
            )}
          >
            {book.book_title}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
        after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800">
              Book Details
            </div>
          </div>
        )
      }
    },
    { accessorKey: 'book_author', header: 'Book Author', },
    { accessorKey: 'name_of_publisher', header: 'Book Publisher' },
    { accessorKey: 'total_count', header: 'Book Count' },
    {
      accessorKey: 'year_of_publication', header: 'Year of Publication',
      cell: ({ row }) => <span>{formatDate(row.original.year_of_publication)}</span>
    },
    { accessorKey: "status", header: "Status" },
    {
      id: 'actions', header: '',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
            <Image src={images.edit} alt='Edit button' />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(row.original.book_uuid)}>
            <Image src={images.delete} alt='Delete button' />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Tabbing routes={bookRoutes} className="w-[30%]" />

      <section className="border border-[#E0E2E7] rounded-[10px] m-4">
        <div className="container">
          <div className="grid grid-cols-[30%_70%] p-4">
            <div className='flex items-center gap-[10px]'>
              <h1 className='text-3xl font-bold'>{title}</h1>
              <p className='bg-[#F9F5FF] rounded-2xl text-[#6941C6] p-1'>{data?.data.length || 0}<span> Entries</span></p>
            </div>
            <div className="flex items-center justify-end py-4 gap-3">
            {isshowDeleteButton && (
                  <Button
                  onClick={handleMultipleDelete}
                  className="bg-red-600 text-white rounded-[8px] px-4 py-2 hover:bg-red-700 hover:text-white">
                  Delete
                </Button>
                )}
              <div className="relative">
                <Button
                  className="bg-[#1E40AF] text-white rounded-[8px] px-4 py-2 hover:bg-[#1E40AF] hover:text-white"
                  onClick={() => setIsDepartmentOpen(!isDepartementOpen)}
                >
                  Department
                </Button>
                {isDepartementOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4 z-10">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Department
                      </label>
                      <select className="w-full border border-gray-300 rounded px-2 py-1">
                        {/* <option value="">All</option>
                        {availableDepartments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))} */}
                      </select>
                    </div>
                    <Button

                      className="w-full bg-[#1E40AF] text-white hover:bg-blue-950"
                    >
                      Apply Filters
                    </Button>
                  </div>
                )}

              </div>
              <Link href={"/book-pages/import-book"}>
                <Button
                  className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px]">
                  <Image src={images.import} alt="Import button" />
                  Import
                </Button>
              </Link>
              <Link href={"/book-pages/add-book"}>
                <Button
                  className="shadow-none border border-[#989CA4] rounded-[8px] text-[#BBBBBB] flex items-center px-4 py-2">
                  <Image src={images.addBook} alt="Add button" />
                  Add Books
                </Button>
              </Link>
              <div className="relative">
                <Button
                  className="bg-[#1E40AF] text-white rounded-[8px] px-4 py-2 hover:bg-[#1E40AF] hover:text-white"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  Filter By
                </Button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <div className=" flex flex-col items-center gap-2 py-2 text-gray-700">
                      <Button
                        onClick={() => { setUrl("all"); setTitle("Books"); setIsFilterOpen(false) }}
                        className="text-[#000] justify-start border border-[#fff]  cursor-pointer shadow-none w-[70%]"
                      >Books
                      </Button>
                      <Button
                        onClick={() => { setUrl("available"); setTitle("Available Books"); setIsFilterOpen(false) }}
                        className="text-[#000] justify-start border border-[#fff]  cursor-pointer shadow-none w-[70%]"
                      >Available Books
                      </Button>
                      <Button
                        onClick={() => { setUrl("unavailable"); setTitle("Issued Books"); setIsFilterOpen(false) }}
                        className="text-[#000] justify-start border border-[#fff]  cursor-pointer shadow-none w-[70%]">
                        Issued Books
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative max-w-sm w-72">
                <Image
                  src={images.search}
                  alt="search-icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  placeholder="Search"
                  className="pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
                />
              </div>
              <Button className="bg-[#1E40AF] text-white rounded-[8px] w-[10%] p-4 hover:bg-[#1E40AF] hover:text-white">
                Search
              </Button>
            </div>
          </div>
          <DataTable columns={columns} data={data?.data || []} isLoading={isLoading} />
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-600">
              Do you really want to delete this book? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-800 rounded-lg"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BooksPage;