import { ColumnDef } from '@tanstack/react-table';
import { BookData } from '../types/data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import images from "@/images/index";
import { formatDate } from '../hooks/formatDate';

export const getBookColumns = (

  handleEdit: (book: BookData) => void,
): ColumnDef<BookData>[] => {
  const router = useRouter();

  return [

    { accessorKey: 'book_uuid', header: 'Book ID' },
    {
      accessorKey: 'book_title',
      header: 'Book Name',
      cell: ({ row }) => {
        const book = row.original;
        return (
          <div
            className="relative group cursor-pointer"
            onClick={() => router.push(`/book-pages/book-details?name=${book.book_uuid}`)}
          >
            {book.book_title}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
              after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800">
              Book Details
            </div>
          </div>
        );
      },
    },
    { accessorKey: 'book_author', header: 'Book Author' },
    { accessorKey: 'name_of_publisher', header: 'Book Publisher' },
    { accessorKey: 'total_count', header: 'Book Count' },
    {
      accessorKey: 'year_of_publication',
      header: 'Year of Publication',
      cell: ({ row }) => <span>{formatDate(row.original.year_of_publication)}</span>,
    },
    { accessorKey: "is_archived", header: "Status" },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)}>
            <Image src={images.Edit} alt='Edit button' />
          </Button>
        </div>
      ),
    },
  ];
};
