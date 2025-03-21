'use client';

import React, { Suspense, useState } from 'react';
import { useDelete, useInvalidate } from '@refinedev/core';


import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import { formatDate } from '../../book-pages/hooks/formatDate'
import { MainTable } from '@/components/data-tables/main-table';
import { JournalData } from '@/app/book-pages/types/data';
import images from '@/images';
import { bookRoutes } from '@/app/book-pages/types/routes';
import MasterTable from '@/app/test/table-page';
import AddBookButton from '@/components/books/add-book-button';
import ImportBookButton from '@/components/books/import-books-button';


const JournalPage = () => {

  const [url, setUrl] = useState("all")
  const [title, setTitle] = useState("Journal")
  const { mutate } = useDelete()
  const invalidate = useInvalidate();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);



  const handleEdit = (journal: JournalData) => {
    router.push(`/periodicals-pages/edit-periodicals?journal_uuid=${journal.journal_uuid}`);
  };

  const handleDeleteClick = (bookId: string) => {
    console.log(bookId)
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBookId) {
      mutate({
        resource: 'journals/delete-journal',
        id: selectedBookId
      },
        {
          onError: () => {
            toast.error("There is some Internal Isuues in deleting student")
          },
          onSuccess: () => {
            toast.success("Student deleted sucessfuly!!!")
            invalidate({
              resource: `journals/${url}`, invalidates: ["list"]
            });
          },
        },
      )
    }
    setIsModalOpen(false);
    setSelectedBookId(null);
  };

  const columns: ColumnDef<JournalData>[] = [
    { accessorKey: 'journal_uuid', header: 'Sr no' },
    { 
      accessorKey: 'name_of_journal', 
      header: 'Name',
      cell:({row})=>{
        const periodical = row.original;
        return (
          <div
            className="relative group cursor-pointer"
            onClick={() => router.push(`/periodicals-pages/edit-periodicals?journal_uuid=${periodical.journal_uuid}`)}
          >
            {periodical.journal_uuid}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
              after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800">
              Periodical Details
            </div>
          </div>
        );
      }
    },
    { accessorKey: 'editor_name', header: 'Name of Editor', },
    { accessorKey: 'name_of_publisher', header: 'Book Publisher' },
    { accessorKey: 'available_count', header: 'Total Count' },
    {
      accessorKey: 'subscription_start_date', header: 'Start Date',
      cell: ({ row }) => <span>{formatDate(row.original.subscription_start_date)}</span>
    },
    {
      accessorKey: 'subscription_end_date', header: 'End Date',
      cell: ({ row }) => <span>{formatDate(row.original.subscription_end_date)}</span>
    },
    {
      id: 'actions', header: '',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" className='w-[20px]' size="icon" onClick={() => handleEdit(row.original)}>
            <Image src={images.EditIcon} alt='Edit button' />
          </Button>
        </div>
      )
    },

  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading="Periodicals" subheading="Tanvir Chavan" />


        <section>
          <div className='container'>
        <Tabbing routes={bookRoutes} className="w-[20%]" />
            

{/* 
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
                          onClick={() => { setUrl("all"); setTitle("Journals") }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >Journals
                        </Button>
                        <Button
                          onClick={() => { setUrl("issued-jou"); setTitle("Issued Journals") }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Issued Journals
                        </Button>
                      </ul>
                    </div>
                  )}*/}
            
            {/* <MainTable columns={columns} resource={`journals/${url}`} /> */}
            <MasterTable
            title='Periodicals'
            columns={()=>columns}
            resource={`journals/${url}`}
            isSelectable={false}
            AddedOptions={[AddBookButton,ImportBookButton]}
            />
          </div>
        </section>
      </>
    </Suspense>
  );
};

export default JournalPage