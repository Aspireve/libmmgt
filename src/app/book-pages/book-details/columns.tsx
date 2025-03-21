import { ColumnDef } from '@tanstack/react-table';
import { BookData } from '../types/data';
import { Button } from '@/components/ui/button';
import { formatDate } from '../hooks/formatDate';
import Image from 'next/image';
import images from '@/images';

// handleDelete: (book: BookData) => void

export const getBookColumns = (handleEdit: (book: BookData) => void): ColumnDef<BookData>[] => [
    {
        accessorKey: 'book_copy_id',
        header: 'Book ID',
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
                <Button variant="ghost" size="icon" className='w-[20px]' onClick={() => handleEdit(row.original)}>
                    <Image src={images.EditButton} alt='Edit Icon'/>
                </Button>
                {/* <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original)}>
                <Image src={images.Thrash} alt='Edit Icon'/>
                </Button> */}
            </div>
        )
    },
];