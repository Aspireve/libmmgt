import { formatDate } from "@/app/book-pages/hooks/formatDate";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { JournalData } from "../types/data";
import images from "@/images";
import { useRouter } from "next/navigation";

interface PeriodicalTitleCellProps {
  periodical: JournalData;
}
const JournalTitleCell: React.FC<PeriodicalTitleCellProps> = ({ periodical }) => {
  const router = useRouter();

  return (
    <div
      className="relative group cursor-pointer font-bold text-[#1E40AF]"
      onClick={() => router.push(`/periodicals-pages/periodical-details?journal_uuid=${periodical.journal_uuid}`)}
    >
      {periodical.journal_title}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded-lg px-3 py-1 shadow-md whitespace-nowrap
        after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800">
        Journal Details
      </div>
    </div>
  );
};


interface ActionsCellProps {
    periodical: JournalData;
    handleEdit: (periodical: JournalData) => void;
  }
  
  const ActionsCell: React.FC<ActionsCellProps> = ({ periodical, handleEdit }) => (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon" className='w-[20px]' onClick={() => handleEdit(periodical)}>
        <Image src={images.EditButton} alt='Edit button' />
      </Button>
    </div>
  );
export const getJournalColumns = (handleEdit: (periodical: JournalData) => void): ColumnDef<JournalData>[] => {
    return[
        
            { accessorKey: 'journal_title_id', header: 'ID' },
            { 
              accessorKey: 'journal_title', 
              header: 'Title',
              cell:({row})=> <JournalTitleCell periodical={row.original}/>
            },
            { accessorKey: 'editor_name', header: 'Editor', },
            { accessorKey: 'name_of_publisher', header: 'Book Publisher' },
            // { accessorKey: 'place_of_publication', header: 'Publication Place' },
            { accessorKey: 'available_count', header: 'Total Count' },
            { accessorKey: 'issn', header: 'ISSN' },
            { accessorKey: 'volume_no', header: 'Volume No' },
        
        
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
              cell: ({ row }) => <ActionsCell periodical={row.original} handleEdit={handleEdit}/>
            },
        
          
    ]
}