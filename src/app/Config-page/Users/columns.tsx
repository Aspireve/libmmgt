import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon } from '@hugeicons/core-free-icons';
import { useState } from 'react';
import EditUserModal from '@/components/user/edit-user-modal';
import { UserData } from '@/types/user';


export const UserActions = ({
  user,
  refetch,
}: {
  user: Partial<UserData>;
  refetch: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
    <div className="flex gap-2">
      <Button
        className="p-0 shadow-none"
      >
        <HugeiconsIcon
          icon={ViewIcon}
          color="#1E40AF"
          onClick={()=> setIsModalOpen(true)}
        />
      </Button>
    </div>
    <EditUserModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
    
    
  );
};

export const getUserColumns = (): ColumnDef<UserData>[] => {
  return [

    { accessorKey: 'user_id', header: 'ID' },
    { accessorKey: 'user_name', header: 'User Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone_number', header: 'Phone Number' },
    { accessorKey: 'designation', header: 'Designation' },
  ]
};

export const getActonsColumns = ({ refetch }: { refetch: () => void }): ColumnDef<UserData>[] => {
  return [
    {
      id: 'actions', header: 'Actions',
      cell: ({ row }) => <UserActions user={row.original} refetch={refetch} />
    },
  ]
};