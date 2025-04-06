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
import AddUser from "@/app/Config-page/Users/add-user/page2";

const AddUserButton = ({refetch} : {refetch: any}) => {
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
        <AddUser refetch={refetch} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserButton;
