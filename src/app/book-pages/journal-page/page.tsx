'use client';
import React, { useState } from 'react';
import { useDelete, useList, useInvalidate } from '@refinedev/core';
import { bookRoutes, JournalData } from '../types/data';

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


const JournalPage = () => {

    const [url, setUrl] = useState("all")
    const [title,setTitle] = useState("Journal")
    const { data } = useList<JournalData>({ resource: `book/${url}` });
    const { mutate } = useDelete()
    const invalidate = useInvalidate();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterOpen,setIsFilterOpen] = useState(false)
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  
  
    const handleEdit = (journal: JournalData) => {
      router.push(`/book-pages/edit-journal?journal_id=${journal.journal_id}`);
    };
  
    const handleDeleteClick = (bookId: string) => {
      setSelectedBookId(bookId);
      setIsModalOpen(true);
    };
  
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
   
    const columns: ColumnDef<JournalData>[] = [
      { accessorKey: 'journal_id', header: 'Sr no' },
      { accessorKey: 'name_of_journal', header: 'Name' },
      { accessorKey: 'editor_name', header: 'Name of Editor', },
      { accessorKey: 'name_of_publisher', header: 'Book Publisher' },
      { accessorKey: 'total_count', header: 'Total Count' },
      {
        accessorKey: 'subscription_start_date', header: 'Start Date',
        cell: ({ row }) => <span>{formatDate(row.original.subscription_start_date)}</span>
      },
      {
        accessorKey: 'subscription_end_date', header: 'End Date',
        cell: ({ row }) => <span>{formatDate(row.original.subscription_end_date)}</span>
      },
      {accessorKey:"status", header:"Status"},
      {
        id: 'actions', header: '',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
              <Image src={images.edit} alt='Edit button' />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(row.original.journal_id)}>
              <Image src={images.delete} alt='Delete button' />
            </Button>
          </div>
        )
      },

    ];
  
    return (
      <>
        <Header />
        <Tabbing routes={bookRoutes} className="w-[30%]" />
  
        <section className="border border-[#E0E2E7] rounded-[10px] m-4">
          <div className='container'>
            <div className="grid grid-cols-[30%_70%] p-4">
              <div className='flex items-center gap-[10px]'>
                <h1 className='text-3xl font-bold'>{title}</h1>
                <p className='bg-[#F9F5FF] rounded-2xl text-[#6941C6] p-1'>{data?.data.length || 0}<span> Entries</span></p>
              </div>
              <div className="flex items-center justify-end py-4 gap-3">
                <Link href={"/book-pages/import-book"}>
                  <Button
                    className="shadow-none border border-[#1E40AF] text-[#1E40AF] rounded-[10px]">
                    <Image src={images.import} alt="Import button" />
                    Import
                  </Button>
                </Link>
                <Link href={"/book-pages/add-journal"}>
                  <Button
                    className="shadow-none border border-[#989CA4] rounded-[8px] text-[#BBBBBB] flex items-center px-4 py-2">
                    <Image src={images.addBook} alt="Add button" />
                    Add Journal
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
                    <div className="absolute right-0 mt-2 w-48 border border-gray-300 rounded-md shadow-lg">
                      <ul className="py-2 text-gray-700">
                      <Button 
                        onClick={()=>{setUrl("all"); setTitle("Journals")}}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >Journals
                        </Button>
                        <Button 
                        onClick={()=>{setUrl("ava-jou"); setTitle("Available Journals")}}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >Available Journals
                        </Button>
                        <Button
                        onClick={()=>{setUrl("issued-jou"); setTitle("Issued Journals")}}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Issued Journals</Button>
                      </ul>
                    </div>
                  )}
                </div>
  
                <div className="relative max-w-sm w-72">
                  <Image src={images.search} alt='search-icon' className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
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

export default JournalPage