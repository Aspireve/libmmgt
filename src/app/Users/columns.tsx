import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import images from '@/images';
import useDisclosure from '@/hooks/disclosure-hook';
import { useRouter } from 'next/navigation';
import DeletePeriodicalModal from '@/components/periodicals/delete-periodical-modal';
import { AddUserType } from './add-user/data';


export const UserActions = ({
  user,
  refetch,
}: {
    user: Partial<AddUserType>;
  refetch: () => void;
}) => {
  const router = useRouter();
  const { isOpen, close, open } = useDisclosure();
  return (
    <div className="flex gap-2">
      <Button
        className="p-0 shadow-none"
        // onClick={() => {
        //   router.push(`/periodicals-pages/editperiodicalCopy?journal_copy_id=${periodical.journal_copy_id}`);
        // }}
      >
        <Image src={images.EditButton} alt="Edit" height={20} width={20} />
      </Button>
      <Button
        onClick={open}
        className="p-0 shadow-none"
        aria-label="Delete User"
      >
        <Image src={images.DeleteButton} alt="Delete" height={20} width={20} />
      </Button>
      <DeletePeriodicalModal
        data={[user]}
        close={close}
        isOpen={isOpen}
        refetch={refetch}
      />
    </div>
  );
};

export const getUserColumns = (): ColumnDef<AddUserType>[] => {
     return[
            
                { accessorKey: 'user_id', header: 'ID' },
                { accessorKey: 'user_name', header: 'User Name' },
                { accessorKey: 'email', header: 'Email' },
                { accessorKey: 'phone_number', header: 'Phone Number' },
                { accessorKey: 'designation', header: 'Designation' },
        ]
      };

export const getActonsColumns = ({ refetch }:{ refetch: () => void }): ColumnDef<AddUserType>[] => {
        return[
                   {
                     id: 'actions', header: 'Actions',
                     cell: ({ row }) => <UserActions user={row.original} refetch={refetch} />
                   },
           ]
         };