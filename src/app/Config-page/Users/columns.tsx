import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon } from "@hugeicons/core-free-icons";
import { use, useState } from "react";
import EditUserModal from "@/components/user/edit-user-modal";
import { UserData } from "@/types/user";
import TooltipToggle from "@/components/custom/tooltip-toggle";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "lucide-react";
import { useDelete } from "@refinedev/core";
import { toast } from "sonner";

export const UserActions = ({
  user,
  refetch,
  userId,
}: {
  user: Partial<UserData>;
  refetch: () => void;
  userId: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex gap-0.5">
        <TooltipToggle content="Edit">
          <Button
            variant="ghost"
            size="icon"
            className="p-0 shadow-none"
            onClick={() => {
              setIsModalOpen(true);
              console.log("working");
            }}
          >
            <HugeiconsIcon icon={Edit02Icon} color="#1E40AF" />
          </Button>
        </TooltipToggle>
        <DeleteUserAlertDialog userId={userId} />
      </div>
      <EditUserModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        userData={user}
      />
    </>
  );
};

export const getUserColumns = (): ColumnDef<UserData>[] => {
  return [
    {
      accessorKey: "user_uuid",
      header: "ID",
      cell: ({ row }) => row.index + 1,
    },
    { accessorKey: "name", header: "User Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone_no", header: "Phone Number" },
    { accessorKey: "designation", header: "Designation" },
    { accessorKey: "address", header: "Address" },
  ];
};

export const getActonsColumns = ({
  refetch,
}: {
  refetch: () => void;
}): ColumnDef<UserData>[] => {
  return [
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <UserActions
          user={row.original}
          refetch={refetch}
          userId={row.original.user_uuid}
        />
      ),
    },
  ];
};

const DeleteUserAlertDialog = ({ userId }: { userId: string }) => {
  const { mutate, isLoading } = useDelete();
  console.log(userId);

  const handleDeleteUser = () => {
    mutate(
      {
        resource: "deleteUser",
        id: userId,
        mutationMode: "pessimistic",
      },
      {
        onSuccess: () => {
          toast.success("User deleted successfully!");
        },
        onError: (error) => {
          toast.error("Error deleting user: " + error.message);
        },
      }
    );
  };
  return (
    <AlertDialog>
      <TooltipToggle content="Delete">
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="p-0 shadow-none">
            <TrashIcon className="text-[#DC2626]" />
          </Button>
        </AlertDialogTrigger>
      </TooltipToggle>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the user. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDeleteUser}
            disabled={isLoading}
          >
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
