import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import images from '@/images';
import useDisclosure from '@/hooks/disclosure-hook';
import { useRouter } from 'next/navigation';
import DeleteBookModal from '@/components/books/delete-book-modal';
import { JournalData } from '../types/data';
import { formatDate } from '@/app/book-pages/hooks/formatDate';


export const JournalActions = ({
  periodical,
  refetch,
}: {
  periodical: Partial<JournalData>;
  refetch: () => void;
}) => {
  const router = useRouter();
  const { isOpen, close, open } = useDisclosure();
  return (
    <div className="flex gap-2 ml-10">
      <Button
        className="p-0 shadow-none"
        onClick={() => {
          router.push(`/periodicals-pages/editJournalCopy-page?journal_copy_uuid=${periodical.journal_copy_uuid}`);
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
        data={[periodical]}
        close={close}
        isOpen={isOpen}
        refetch={refetch}
      />
    </div>
  );
};

export const getPeriodicalColumns = ({ refetch }:{ refetch: () => void }): ColumnDef<JournalData>[] => [
    {
        accessorKey: 'journal_copy_id',
        header: 'Journal ID',
    },
   
    {
        id: 'action',
        header: '',
        cell: ({ row }) => {
             return <JournalActions periodical={row.original} refetch={refetch} />
        }
        
    },
];