import { ColumnDef } from '@tanstack/react-table';
import { BookData } from '../types/data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import images from "@/images/index";
import { formatDate } from '../hooks/formatDate';

interface BookTitleCellProps {
  book: BookData;
}

const BookTitleCell: React.FC<BookTitleCellProps> = ({ book }) => {
  const router = useRouter();

  return (
    <div
      className="relative group cursor-pointer font-bold text-[#1E40AF]"
      onClick={() => router.push(`/book-pages/book-details?book_uuid=${book.book_uuid}`)}
    >
      {book.book_title}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
        after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800">
        Book Details
      </div>
    </div>
  );
};

interface ActionsCellProps {
  book: BookData;
  handleEdit: (book: BookData) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ book, handleEdit }) => (
  <div className="flex gap-2">
    <Button variant="ghost" size="icon" className='w-[20px]' onClick={() => handleEdit(book)}>
      <Image src={images.EditButton} alt='Edit button' />
    </Button>
  </div>
);

export const getBookColumns = (
  handleEdit: (book: BookData) => void,
): ColumnDef<BookData>[] => {
  return [
    { accessorKey: 'book_title_id', header: 'Book ID' },
    {
      accessorKey: 'book_title',
      header: 'Book Name',
      cell: ({ row }) => <BookTitleCell book={row.original} />,
    },
    { accessorKey: 'book_author', header: 'Book Author' },
    { accessorKey: 'name_of_publisher', header: 'Book Publisher' },
    { accessorKey: 'available_count', header: 'Book Count' },
    { accessorKey: 'isbn', header: 'ISBN' },
    {
      accessorKey: 'year_of_publication',
      header: 'Year of Publication',
      cell: ({ row }) => <span>{formatDate(row.original.year_of_publication)}</span>,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <ActionsCell book={row.original} handleEdit={handleEdit} />,
    },
  ];
};
