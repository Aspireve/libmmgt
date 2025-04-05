import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import EditUserModal from "@/components/user/edit-user-modal";
import { UserData } from "@/types/user";
import TooltipToggle from "@/components/custom/tooltip-toggle";

export const UserActions = ({
  user,
  refetch,
}: {
  user: Partial<UserData>;
  refetch: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex gap-2">
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
      </div>
      <EditUserModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
};

export const getUserColumns = (): ColumnDef<UserData>[] => {
  return [
    { accessorKey: "user_uuid", header: "ID" },
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
      cell: ({ row }) => <UserActions user={row.original} refetch={refetch} />,
    },
  ];
};
