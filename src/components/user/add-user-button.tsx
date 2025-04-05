"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddUser from "@/app/Config-page/Users/add-user/page";

const AddUserButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF]"
        >
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white rounded-[25px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <AddUser />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserButton;
