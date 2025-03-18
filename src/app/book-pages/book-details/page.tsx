'use client';
import React, { useEffect, useState } from 'react'

import Header from '@/app/Header/header'
import { useSearchParams } from "next/navigation";
import { Skeleton } from '@/components/ui/skeleton';

import { formatDate } from '../hooks/formatDate'

import { MainTable } from '@/components/data-tables/main-table';
import { ColumnDef } from '@tanstack/react-table';
import { BookData } from '../types/data';
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useOne } from '@refinedev/core';

const Book_details = () => {
    const book_uuid = useSearchParams().get("name");

    const handleEdit = (book: BookData) => {
        console.log("EDIT by ID", book)
    }
    const handleDelete = (book: BookData) => {
        console.log("Book Id", book)
    }

    const columns: ColumnDef<BookData>[] = [
        {
            accessorKey: 'book_copy_uuid',
            header: 'Book ID'
        },
        {
            accessorKey: 'source_of_acquisition',
            header: 'Source of acquisition'
        },
        {
            accessorKey: 'language',
            header: 'Language',
        },
        {
            accessorKey: 'date_of_acquisition',
            header: 'Date of acquisition',
            cell: ({ row }) => <span>{formatDate(row.original.date_of_acquisition ?? " ")}</span>,
        },
        {
            accessorKey: 'barcode',
            header: 'Barcode'
        },
        {
            accessorKey: 'item_type',
            header: 'Item Type'
        },
        {
            accessorKey: 'bill_no',
            header: 'Bill No'
        },
        {
            accessorKey: 'inventory_number',
            header: 'Inventory Number'
        },
        {
            accessorKey: 'accession_number',
            header: 'Accession Number'
        },
        {
            id: 'action',
            header: '',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
                        <FaEdit />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original)}>
                        <FaTrash />
                    </Button>
                </div>
            )
        },
    ]

    return (
        <>
            <Header heading="book" subheading="#3456" />
            <section className='border border-[#E0E2E7] rounded-[10px] m-4'>
                <div className="container">
                    <MainTable
                        columns={columns}
                        resource="book_v2/get_copies_with_title"
                        filters={[
                            { field: "_book_uuid", operator: "eq", value: `${book_uuid}` }
                        ]}
                    />

                </div>
            </section>
        </>

    )
}

export default Book_details