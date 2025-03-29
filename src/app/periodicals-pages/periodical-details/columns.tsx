import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import images from '@/images';
import useDisclosure from '@/hooks/disclosure-hook';
import { useRouter } from 'next/navigation';
import { JournalData } from '../types/data';
import DeletePeriodicalModal from '@/components/periodicals/delete-periodical-modal';
import { StatusCell } from '@/app/book-pages/book-details/columns';


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
          router.push(`/periodicals-pages/editperiodicalCopy?journal_copy_id=${periodical.journal_copy_id}`);
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
      <DeletePeriodicalModal
        data={[periodical]}
        close={close}
        isOpen={isOpen}
        refetch={refetch}
      />
    </div>
  );
};

export const getPeriodicalCopyColumns = ({ refetch }:{ refetch: () => void }): ColumnDef<JournalData>[] => {
     return[
            
                { accessorKey: 'journal_copy_id', header: 'ID' },
                { accessorKey: 'editor_name', header: 'Editor Name' },
                { accessorKey: 'issn', header: 'ISSN' },
                
                
                { accessorKey: 'item_type', header: 'Item Type' },
                { accessorKey: 'barcode', header: 'Barcode' },
                { accessorKey: 'is_available',
                  header: 'Status',
                  cell:({row})=><StatusCell isAvailable={Boolean(row.original.is_available)} />
                },
                {
                  id: 'actions', header: '',
                  cell: ({ row }) => <JournalActions periodical={row.original} refetch={refetch} />
                },
            
              
        ]
      };