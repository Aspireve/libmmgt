"use client"

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditUserPage from "@/app/Config-page/Users/edit-user/pages";


interface EditUserModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
  }

const EditUserModal: React.FC<EditUserModalProps> = ({ open, setOpen }) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-white rounded-[25px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <EditUserPage />
        </DialogContent>
      </Dialog>
    );
  };

export default EditUserModal;