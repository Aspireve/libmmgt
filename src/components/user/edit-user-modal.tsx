"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditUserPage from "@/app/Config-page/Users/edit-user/pages";
import { UserData } from "@/types/user";

interface EditUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: Partial<UserData>;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  setOpen,
  userData,
}) => {
  console.log(userData);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-white rounded-[25px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <EditUserPage
          userData={userData}
          setOpen={setOpen}
          refetch={() => {}}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
