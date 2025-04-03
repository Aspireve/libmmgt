import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { formatDate } from '../hooks/formatDate';
import Image from 'next/image';
import images from '@/images';
import useDisclosure from '@/hooks/disclosure-hook';
import { useRouter } from 'next/navigation';
import DeleteBookModal from '@/components/books/delete-book-modal';
import { BookCopiesData } from '@/types/book';
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewIcon,
  Archive01Icon
} from "@hugeicons/core-free-icons";


export const BookActions = ({
  book,
  refetch,
}: {
  book: Partial<BookCopiesData>;
  refetch: () => void;
}) => {
  const router = useRouter();
  const { isOpen, close, open } = useDisclosure();
  return (
    <div className="flex gap-2">
      <Button
        className="p-0 shadow-none"
        onClick={() => {
          router.push(`/book-pages/editbookCopy?book_copy_uuid=${book.book_copy_uuid}`);
        }}
        aria-label="Edit student"
      >
        <HugeiconsIcon
          icon={ViewIcon}
          color="#1E40AF"
        />
      </Button>
      <Button
        onClick={open}
        className="p-0 shadow-none"
        aria-label="Delete Book"
      >
        <HugeiconsIcon
          icon={Archive01Icon}
          color="#1E40AF"
        />
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
export const StatusCell = ({ isAvailable }: { isAvailable: boolean }) => {
  return (
    <span
      className={`px-2 py-1 rounded text-white ${isAvailable ? 'rounded-full bg-green-200 text-green-700 ' : ' rounded-full bg-purple-200 text-purple-700 '
        }`}
    >
      {isAvailable ? 'Available' : 'Borrowed'}
    </span>
  );
};

export const getBookCopyColumns = ({ refetch }: { refetch: () => void }): ColumnDef<BookCopiesData>[] => [
  {
    accessorKey: 'book_copy_id',
    header: 'ID',
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
    accessorKey: 'is_available',
    header: 'Status',
    cell: ({ row }) => <StatusCell isAvailable={Boolean(row.original.is_available)} />
  }
];

export const getActionColumns = ({ refetch }: { refetch: () => void }): ColumnDef<BookCopiesData>[] => [
  {
    id: 'action', header: 'Actions',
    cell: ({ row }) => {
      return <BookActions book={row.original} refetch={refetch} />
    }

  },
];