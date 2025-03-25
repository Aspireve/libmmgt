import { ColumnDef } from '@tanstack/react-table';
import { BookData } from '../types/data';
import { Button } from '@/components/ui/button';
import { formatDate } from '../hooks/formatDate';
import Image from 'next/image';
import images from '@/images';
import useDisclosure from '@/hooks/disclosure-hook';
import { useRouter } from 'next/navigation';
import DeleteBookModal from '@/components/books/delete-book-modal';


export const BookActions = ({
  book,
  refetch,
}: {
  book: Partial<BookData>;
  refetch: () => void;
}) => {
  const router = useRouter();
  const { isOpen, close, open } = useDisclosure();
  return (
    <div className="flex gap-2 ml-10">
      <Button
        className="p-0 shadow-none"
        onClick={() => {
          router.push(`/book-pages/editbookCopy-page?book_copy_uuid=${book.book_copy_uuid}`);
        }}
        aria-label="Edit student"
      >
        <Image src={images.EditButton} alt="Edit" height={20} width={20} />
      </Button>
      <Button
        onClick={open}
        className="p-0 shadow-none"
        aria-label="Delete Book"
      >
        <Image src={images.DeleteButton} alt="Delete" height={20} width={20} />
      </Button>
      <DeleteBookModal
        data={[book]}
        close={close}
        isOpen={isOpen}
        refetch={refetch}
      />
    </div>
  );
};

export const getBookColumns = ({ refetch }:{ refetch: () => void }): ColumnDef<BookData>[] => [
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
        cell: ({ row }) => {
             return <BookActions book={row.original} refetch={refetch} />
        }
        
    },
];